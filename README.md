# SOS Vidas (Nexus Automação)

Aplicativo mobile de primeiros socorros da Nexus Automação.

## Fonte de verdade
- **GitHub/repositório** = fonte principal de verdade do projeto
- **Painel Jarvis** = RAG operacional / backup de contexto

## Estado atual
- Etapa 1 iniciada: base documental + repositório + estrutura inicial
- Planejamento mestre em `docs/sos-vidas-nexus-planejamento.md`
- App alvo: Expo + React Native
- Backend alvo: Supabase + Edge Functions
- Banco alvo: projeto Supabase vazio `SUPABASE_FUNIL_IA` (`vzufohjzqjcncvcysjej`)

## Regras operacionais
- Toda mudança em Supabase também deve ser refletida no repositório
- README e planejamento devem permanecer atualizados
- O fluxo oficial e as decisões do produto devem ser registrados antes de mudanças estruturais relevantes

## Etapas
- [x] Etapa 1 — documentação mestre + criação do repositório + estrutura base
- [ ] Etapa 2 — setup base Expo e estrutura técnica inicial
- [ ] Etapa 3 — setup Supabase/Auth/profiles/RLS
- [ ] Etapa 4 — Edge Functions de confirmação, cobrança e webhook
- [ ] Etapa 5 — telas núcleo
- [ ] Etapa 6 — RAG semântico / primeiros socorros
- [ ] Etapa 7 — acabamento para publicação em loja
