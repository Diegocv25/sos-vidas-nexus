# Supabase — SOS Vidas (Nexus Automação)

## Projeto alvo
- Supabase: `SUPABASE_FUNIL_IA`
- ref: `vzufohjzqjcncvcysjej`

## Regra obrigatória
Toda alteração feita no Supabase deve ser refletida neste repositório:
- migrations SQL
- Edge Functions
- documentação de schema
- regras RLS
- contratos de integração
- variáveis de ambiente

## Estado atual
### Etapa 3 — base inicial
- migration inicial criada: `migrations/20260321_000001_init_profiles.sql`
- tabela inicial: `public.profiles`
- trigger de `updated_at`
- RLS aplicada para leitura/edição do próprio perfil
- campos de assinatura preparados para integração com Kiwify

## Próximos itens esperados nesta pasta
- Edge Functions de confirmação e webhook
- documentação de auth
- documentação de fluxo Kiwify
- possíveis migrations adicionais para notificações, eventos ou RAG
