import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

type HookPayload = {
  user?: {
    email?: string;
    user_metadata?: Record<string, unknown>;
  };
  email_data?: {
    token?: string;
    token_hash?: string;
    redirect_to?: string;
    email_action_type?: string;
    site_url?: string;
    token_new?: string;
    token_hash_new?: string;
    old_email?: string;
  };
};

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

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildActionUrl(supabaseUrl: string, tokenHash: string, actionType: string, redirectTo?: string) {
  const url = new URL("/auth/v1/verify", supabaseUrl);
  url.searchParams.set("token_hash", tokenHash);
  url.searchParams.set("type", actionType);
  if (redirectTo) url.searchParams.set("redirect_to", redirectTo);
  return url.toString();
}

function buildEmail(payload: HookPayload) {
  const userEmail = payload.user?.email;
  const actionType = payload.email_data?.email_action_type ?? "signup";
  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "https://vzufohjzqjcncvcysjej.supabase.co";
  const redirectTo = payload.email_data?.redirect_to ?? "http://31.97.82.110:8090";
  const tokenHash = payload.email_data?.token_hash;
  const token = payload.email_data?.token ?? "";
  const firstName = String(payload.user?.user_metadata?.nome_completo ?? "").trim();
  const greeting = firstName ? `Olá, ${escapeHtml(firstName)}!` : "Olá!";

  if (!userEmail || !tokenHash) {
    throw new Error("Missing user.email or email_data.token_hash");
  }

  const actionUrl = buildActionUrl(supabaseUrl, tokenHash, actionType, redirectTo);

  let subject = "SOS Vidas - confirme seu email";
  let title = "Confirme seu cadastro no SOS Vidas";
  let intro = "Clique no botão abaixo para confirmar seu email e continuar para o pagamento.";

  if (actionType === "recovery") {
    subject = "SOS Vidas - redefina sua senha";
    title = "Redefina sua senha";
    intro = "Clique no botão abaixo para criar uma nova senha.";
  }

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f5f7fb;padding:24px;color:#111827;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;padding:32px;border:1px solid #e5e7eb;">
        <div style="margin-bottom:24px;">
          <div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#009688;font-weight:700;">SOS Vidas</div>
          <h1 style="margin:10px 0 0;font-size:28px;line-height:1.2;color:#0f172a;">${title}</h1>
        </div>
        <p style="font-size:16px;line-height:1.6;margin:0 0 16px;">${greeting}</p>
        <p style="font-size:16px;line-height:1.6;margin:0 0 24px;">${intro}</p>
        <p style="margin:0 0 24px;">
          <a href="${actionUrl}" style="display:inline-block;padding:14px 22px;background:#009688;color:#ffffff;text-decoration:none;border-radius:10px;font-weight:700;">${actionType === "recovery" ? "Redefinir senha" : "Confirmar email"}</a>
        </p>
        <p style="font-size:14px;line-height:1.6;color:#4b5563;margin:0 0 8px;">Se o botão não abrir, use este link:</p>
        <p style="font-size:14px;line-height:1.6;word-break:break-all;margin:0 0 20px;"><a href="${actionUrl}">${actionUrl}</a></p>
        ${token ? `<p style="font-size:14px;line-height:1.6;color:#4b5563;margin:0 0 20px;">Código de verificação: <strong>${escapeHtml(token)}</strong></p>` : ""}
        <p style="font-size:13px;line-height:1.6;color:#6b7280;margin:0;">Se você não solicitou esta ação, pode ignorar esta mensagem.</p>
      </div>
    </div>
  `;

  const text = `${title}\n\n${greeting}\n\n${intro}\n\nLink: ${actionUrl}${token ? `\nCódigo: ${token}` : ""}`;

  return { to: userEmail, subject, html, text };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const resendKey = Deno.env.get("RESEND_API_KEY");
  const resendFrom = Deno.env.get("RESEND_FROM") || "SOS Vidas <sos@mail.ias-nexus-automacao.com.br>";
  if (!resendKey) return json({ error: "Missing RESEND_API_KEY" }, 500);

  const body = await req.json().catch(() => null) as HookPayload | null;
  if (!body) return json({ error: "Invalid JSON body" }, 400);

  let email;
  try {
    email = buildEmail(body);
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Invalid payload sent to hook", body }, 400);
  }

  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: resendFrom,
      to: [email.to],
      subject: email.subject,
      html: email.html,
      text: email.text,
    }),
  });

  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) return json({ error: "Resend request failed", detail: data }, 500);

  return json({ ok: true }, 200);
});
