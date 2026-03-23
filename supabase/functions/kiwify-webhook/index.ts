import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type KiwifyPayload = {
  order_id?: string;
  order_key?: string;
  product_id?: string | number;
  product_name?: string;
  customer_email?: string;
  Customer?: { email?: string; full_name?: string };
  subscription_id?: string;
  subscription_status?: string;
  webhook_event_type?: string;
  order_status?: string;
  payment_method?: string;
  approved_date?: string;
  [key: string]: unknown;
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

function normalizeEvent(payload: KiwifyPayload) {
  const raw = String(payload.webhook_event_type || payload.order_status || "").toLowerCase().trim();
  if (raw.includes("compra_aprovada") || raw.includes("approved") || raw.includes("aprovada")) return "purchase_approved";
  if (raw.includes("assinatura_cancelada") || raw.includes("subscription_canceled") || raw.includes("cancelada")) return "subscription_canceled";
  if (raw.includes("assinatura_renovada") || raw.includes("subscription_renewed") || raw.includes("renovada")) return "subscription_renewed";
  if (raw.includes("reembolso") || raw.includes("refunded")) return "refunded";
  if (raw.includes("chargeback")) return "chargeback";
  if (raw.includes("pix_gerado")) return "pix_generated";
  if (raw.includes("carrinho_abandonado")) return "abandoned_cart";
  return raw || "unknown";
}

function extractEmail(payload: KiwifyPayload) {
  return String(payload.customer_email || payload.Customer?.email || "").trim().toLowerCase();
}

function mapSubscriptionStatus(eventType: string) {
  switch (eventType) {
    case "purchase_approved":
    case "subscription_renewed":
      return { is_subscribed: true, subscription_status: "active" };
    case "subscription_canceled":
      return { is_subscribed: false, subscription_status: "canceled" };
    case "refunded":
    case "chargeback":
      return { is_subscribed: false, subscription_status: "past_due" };
    default:
      return null;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const expectedSecret = Deno.env.get("KIWIFY_WEBHOOK_SECRET") || Deno.env.get("KIWIFY_WEBHOOK_TOKEN");
  const bodyText = await req.text();
  let payload: KiwifyPayload;
  try {
    payload = JSON.parse(bodyText);
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const providedSecret = req.headers.get("x-kiwify-secret")
    || req.headers.get("x-webhook-token")
    || req.headers.get("x-kiwify-token")
    || req.headers.get("x-kiwify-webhook-token")
    || req.headers.get("authorization")?.replace(/^Bearer\s+/i, "")
    || String((payload as any)?.webhook_token || "")
    || String((payload as any)?.webhooks_event?.token || "");

  if (!expectedSecret) return json({ error: "Missing KIWIFY_WEBHOOK_SECRET" }, 500);
  if (!providedSecret || providedSecret !== expectedSecret) return json({ error: "Unauthorized" }, 401);

  const email = extractEmail(payload);
  const eventType = normalizeEvent(payload);

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });

  const statusUpdate = mapSubscriptionStatus(eventType);

  if (email && statusUpdate) {
    const { error } = await supabase
      .from("profiles")
      .update({
        email,
        is_subscribed: statusUpdate.is_subscribed,
        subscription_status: statusUpdate.subscription_status,
        kiwify_subscriber_id: String(payload.subscription_id || payload.order_id || payload.order_key || "") || null,
        updated_at: new Date().toISOString(),
      })
      .eq("email", email);

    if (error) {
      return json({ error: "Failed to update profile", detail: error.message, eventType, email }, 500);
    }
  }

  return json({ ok: true, eventType, email, handled: Boolean(email && statusUpdate) });
});
