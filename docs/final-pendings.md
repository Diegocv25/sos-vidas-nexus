# Pendências finais reais — SOS Vidas (Nexus Automação)

## O que já está forte
- estrutura do app
- auth + assinatura
- confirmação de email por código dentro do app
- recuperação de senha por código dentro do app
- checkout + webhook/simulação de assinatura
- triagem guiada
- integração segura de mapas via Supabase Edge Function
- documentação de publicação
- metadados de loja
- política/termos/ajuda/privacidade dentro do app

## Pendências reais para fechamento final
### 1. Preview e teste visual confiável
- validar o app em dispositivo ou preview estável
- revisar hierarquia visual e legibilidade final
- adicionar botão **Voltar** em cada tela do fluxo onde fizer sentido
- ajustar melhor a distribuição vertical dos elementos para não concentrar conteúdo excessivamente no topo
- padronizar header visual com `🚨 SOS Vidas` + `(Nexus Automação)` nas telas principais

### 2. Branding final
- ícone final
- splash final
- screenshots da loja

### 3. Ambiente final de teste
- preencher `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- preencher `EXPO_PUBLIC_GOOGLE_PLACES_API_KEY`
- liberar/tokenizar a API do Google Maps/Places para funcionamento real da tela de mapas
- validar o checkout e as functions em teste real

### 4. Build/publicação
- login no Expo/EAS no ambiente final
- build preview
- build production
- validação para loja

## Observação
Essas pendências não são mais de estrutura do projeto; são majoritariamente de validação final, arte e publicação.
