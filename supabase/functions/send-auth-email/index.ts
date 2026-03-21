import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const resendKey = Deno.env.get("RESEND_API_KEY");
  const resendFrom = Deno.env.get("RESEND_FROM");
  if (!resendKey || !resendFrom) return json({ error: "Missing RESEND_API_KEY or RESEND_FROM" }, 500);

  const body = await req.json().catch(() => null) as { to?: string; subject?: string; html?: string; text?: string } | null;
  if (!body?.to || !body?.subject || (!body?.html && !body?.text)) {
    return json({ error: "Missing to/subject/content" }, 400);
  }

  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: resendFrom, to: [body.to], subject: body.subject, html: body.html, text: body.text }),
  });

  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) return json({ error: "Resend request failed", detail: data }, 500);

  return json({ ok: true, resend: data });
});
