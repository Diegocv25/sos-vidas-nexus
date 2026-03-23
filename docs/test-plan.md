# Test Plan — SOS Vidas (Nexus Automação)

## Objetivo
Validar o fluxo principal do app antes de build final/publicação.

## Fluxo 1 — Cadastro e autenticação
- [ ] abrir Splash
- [ ] entrar em Criar conta
- [ ] preencher cadastro válido
- [ ] validar máscara de CPF
- [ ] validar máscara e busca de CEP
- [ ] confirmar criação de usuário
- [ ] confirmar tela de confirmação de email
- [ ] reenviar email
- [ ] seguir para pagamento
- [ ] abrir checkout da Kiwify
- [ ] voltar ao login
- [ ] entrar com email/senha
- [ ] validar bloqueio se assinatura inativa

## Fluxo 2 — Home e módulos principais
- [ ] abrir Home
- [ ] abrir Emergências
- [ ] testar ligação 192
- [ ] testar ligação 193
- [ ] abrir Mapas
- [ ] validar permissão de localização
- [ ] validar mensagem sem chave Google Places
- [ ] abrir Primeiros Socorros
- [ ] abrir tema com ficha interna
- [ ] abrir fonte oficial

## Fluxo 3 — Triagem guiada
- [ ] abrir Não sei identificar
- [ ] validar texto do 192
- [ ] validar texto do 193
- [ ] testar botões de ligação

## Fluxo 4 — Institucional
- [ ] abrir Mais opções
- [ ] abrir Sobre
- [ ] abrir Privacidade
- [ ] abrir Termos e avisos
- [ ] abrir Ajuda rápida

## Fluxo 5 — Assinatura
- [ ] validar banner de assinatura na Home
- [ ] validar comportamento de aviso pré-vencimento
- [ ] validar redirecionamento ao pagamento se assinatura não estiver ativa

## Critério mínimo de aceite
- app navega sem crash
- autenticação funciona
- bloqueios de assinatura funcionam
- fichas internas abrem corretamente
- links oficiais abrem
- botões 192/193 funcionam
