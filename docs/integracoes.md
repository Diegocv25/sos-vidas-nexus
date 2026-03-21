# Integrações — SOS Vidas (Nexus Automação)

## Resend
Variáveis esperadas no ambiente de Edge Functions:
- `RESEND_API_KEY`
- `RESEND_FROM`
- `RESEND_DOMAIN`

Remetente oficial definido:
- `SOS Vidas <sos@mail.ias-nexus-automacao.com.br>`

Função prevista:
- `send-auth-email`

Objetivos:
- confirmação de email
- recuperação de senha
- mensagens transacionais do app

## Kiwify
Checkout definido no app:
- `EXPO_PUBLIC_KIWIFY_CHECKOUT_URL=https://pay.kiwify.com.br/cYIyOen`

Webhook configurado para apontar para:
- `https://vzufohjzqjcncvcysjej.supabase.co/functions/v1/kiwify-webhook`

Secret esperado no ambiente:
- `KIWIFY_WEBHOOK_SECRET`

Eventos habilitados no painel da Kiwify:
- Pix gerado
- Carrinho abandonado
- Compra aprovada
- Reembolso
- Chargeback
- Assinatura cancelada
- Assinatura renovada

Função prevista:
- `kiwify-webhook`

Eventos tratados inicialmente como críticos:
- compra aprovada
- assinatura cancelada
- assinatura renovada
- reembolso
- chargeback

## Observação
Se a Kiwify usar header/token diferente do esperado, ajustar a leitura do header na função webhook após primeiro teste real de payload.
