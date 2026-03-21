# SOS Vidas (Nexus Automação) — Especificação Mestre do Projeto

## Status do documento
- Versão inicial consolidada a partir do checklist DOCX enviado por Diego em 2026-03-21.
- Este documento deve ser atualizado sempre que houver mudança de fluxo, regra, integração, monetização, UX obrigatória ou arquitetura.
- Este documento é a fonte de verdade operacional do projeto e deve permanecer alinhado com a tarefa mestre no Painel Jarvis.

---

## 1. Nome oficial do app
**SOS Vidas (Nexus Automação)**

Outras sugestões foram descartadas oficialmente.

---

## 2. Objetivo do app
Construir um aplicativo mobile completo de primeiros socorros em **React Native com Expo**, publicável em **Google Play** e preparado para **App Store**, com backend e lógica segura baseados em **Supabase + Edge Functions**, usando o projeto Supabase vazio da empresa.

O app deve ajudar o usuário em emergências com três pilares principais:
1. localizar os 10 pontos de socorro mais próximos;
2. acessar rapidamente números de emergência com discagem nativa;
3. consultar primeiros socorros via links oficiais e mecanismo de busca semântica/RAG.

O app **não gera aconselhamento médico próprio**. Ele direciona para conteúdo oficial e contatos de emergência.

---

## 3. Infraestrutura definida
### 3.1. Banco principal do projeto
Usar o projeto Supabase vazio da empresa:
- **SUPABASE_FUNIL_IA**
- project ref: `vzufohjzqjcncvcysjej`

### 3.2. Arquitetura definida
Decisão consolidada:
- **Frontend mobile:** Expo + React Native + Expo Router
- **Backend:** Supabase
- **Lógica protegida / integrações sensíveis:** **Supabase Edge Functions**
- **Auth:** Supabase Auth
- **Banco:** Supabase Postgres
- **Email:** Resend
- **Pagamento:** Kiwify
- **Busca em primeiros socorros:** primeiro RAG/busca semântica; se não ficar confiável, avaliar fallback com agente/LLM

### 3.3. Publicação
Deixar o projeto preparado para:
- loja Android (Google Play)
- estrutura compatível com App Store
- build via EAS

### 3.4. Domínio
Definir e usar subdomínio em `ias-nexus-automacao.com.br` para apoiar:
- páginas auxiliares
- callbacks/links de confirmação
- política de privacidade/termos se necessário
- possíveis rotas web para distribuição complementar

---

## 4. Fluxo oficial do app

### TELA 1 — Splash / Onboarding
Elementos:
- logo centralizado
- botão **Criar conta**
- botão **Já tenho conta — Entrar**

Regra confirmada:
- **não existe “Esqueci minha senha” aqui**

Fluxo:
- Criar conta → Tela 2 (Cadastro)
- Já tenho conta — Entrar → Tela 5 (Login)

---

### TELA 2 — Cadastro
Campos obrigatórios:
1. Nome completo
2. CPF com máscara e validação matemática real
3. Email
4. Confirmação de email
5. CEP com máscara
6. Logradouro (autopreenchido via ViaCEP)
7. Número (manual)
8. Bairro (autopreenchido via ViaCEP)
9. Cidade (autopreenchido via ViaCEP)
10. Estado/UF (autopreenchido via ViaCEP)
11. Senha (mínimo 8 caracteres, com mostrar/esconder)
12. Confirmação de senha (com mostrar/esconder)

Validações obrigatórias:
- todos os campos obrigatórios precisam estar válidos antes de avançar;
- CPF com validação matemática real;
- email e confirmação de email devem ser idênticos;
- senha e confirmação de senha devem ser idênticas;
- CEP com 8 dígitos válidos.

Comportamento do CEP:
- ao sair do campo CEP, consultar ViaCEP e preencher logradouro, bairro, cidade e estado automaticamente.

Ao submeter cadastro:
1. criar usuário no Supabase Auth com email e senha;
2. criar registro completo na tabela `profiles`;
3. enviar email de confirmação via Resend;
4. redirecionar para Tela 3.

---

### TELA 3 — Confirmação de email
Elementos:
- mensagem informando envio do email de confirmação;
- botão **Reenviar email de confirmação**;
- botão **Já confirmei — Continuar**.

Fluxo oficial:
- após confirmação do email, o usuário segue obrigatoriamente para a Tela 4 (Pagamento).
- essa confirmação acontece **somente no cadastro**.
- depois que confirmou e pagou, o usuário não precisa repetir confirmação ao logar.

---

### TELA 4 — Pagamento (Kiwify)
Exibir:
- nome do app;
- valor: **R$ 5,00 bimestral**;
- os 3 benefícios oficiais do app:
  1. mapas dos 10 locais de socorro mais próximos (hospital, UPA 24h, centro de saúde);
  2. números diretos de todas as emergências;
  3. primeiros socorros e orientações de pedir socorro;
- botão **ASSINAR AGORA**.

Fluxo:
- botão redireciona para checkout da Kiwify.
- webhook da Kiwify atualiza assinatura no Supabase.
- após pagamento, o usuário deve cair na **Tela 5 — Login** para entrar com email/senha definidos no cadastro.

Regras de webhook esperadas:
- `order.approved` → ativa assinatura/acesso;
- `subscription.canceled` → bloqueia acesso;
- `subscription.overdue` → marca status compatível com bloqueio e aviso.

---

### TELA 5 — Login
Elementos:
- campo email
- campo senha
- botão Entrar
- link **Esqueci minha senha**
- opção **Lembrar minha senha**

Regra oficial para “Lembrar minha senha”:
- não guardar senha em texto livre;
- o comportamento desejado é **auto complete/sugestão facilitada**, para ajudar o usuário em situação de emergência;
- a experiência deve sugerir/preencher de forma prática quando o usuário tiver optado por isso.

Fluxo:
- se login válido e assinatura ativa → entra no app;
- se login válido mas assinatura inativa/inexistente → redireciona para pagamento/bloqueio de acesso;
- recuperação de senha existe **somente nesta tela**.

---

### Regra de confirmação de email após cadastro
- confirmação de email é exigida apenas após o cadastro;
- depois de confirmado e pago, o fluxo passa a ser login direto com email/senha.

---

### Regra de vencimento / bloqueio de acesso
Quando a assinatura estiver perto do vencimento:
- exibir aviso permanente com contagem regressiva de dias restantes **5 dias antes do vencimento**, no mesmo espírito do app de gestão.

Quando a assinatura estiver vencida/inativa:
- bloquear acesso ao app principal;
- manter fluxo de renovação/pagamento.

---

### TELA 6 — Home
Três botões grandes e visíveis:
1. **Mapas**
2. **Emergências**
3. **Primeiros Socorros**

---

### TELA 7 — Mapas
Botões/categorias:
- Hospitais
- UPAs 24h
- Centros de Saúde

Fluxo:
- solicitar geolocalização;
- consultar Google Places Nearby Search;
- retornar até 10 resultados por categoria;
- ordenar por distância;
- exibir nome, endereço, telefone (se houver), distância e botão para abrir no mapa nativo.

Chave da Google Places:
- haverá chave com certeza;
- integração deve ser deixada 100% pronta para funcionar assim que for inserida em `EXPO_PUBLIC_GOOGLE_PLACES_API_KEY`.

---

### TELA 8 — Números de Emergência
Exibir cartões com botão de discagem nativa para:
- SAMU 192
- Corpo de Bombeiros 193
- Polícia Militar 190
- Polícia Civil 197
- Defesa Civil 199
- Central de Regulação em Saúde 136
- Disque Denúncia 100
- Disque Idoso 080 197 0001
- CVV 188
- CIATox (11) 3081-3400

Cada cartão deve ter:
- ícone
- nome
- número
- botão **LIGAR AGORA**

---

### TELA 9 — Primeiros Socorros
Existem dois modos na mesma tela.

#### Modo 1 — Busca semântica / RAG
Objetivo:
- o usuário descreve o que está acontecendo;
- a escrita dele deve buscar semanticamente no RAG;
- se a busca semântica funcionar de forma confiável, **descartar agente de IA**;
- se não ficar confiável, aí avaliar agente/LLM.

Input:
- campo de texto
- botão de voz (speech-to-text nativo)
- botão Buscar

Saída esperada do motor:
- situação
- url_oficial
- telefone_emergencia
- orientacao_rapida

Fallback oficial quando não identificar:
- mostrar orientação de ligar 192/193;
- abrir também a página geral de primeiros socorros.

#### Modo 2 — Categorias rápidas
Grid com categorias:
- Queimadura
- Engasgo
- Afogamento
- Infarto
- AVC
- Choque Elétrico
- Sangramento
- Desmaio
- Intoxicação
- Picada
- Fratura
- Convulsão
- Acidente Criança
- Queda Idoso
- Reação Alérgica
- Parada Cardíaca
- Febre Alta
- Outros

Regra oficial ao clicar em uma categoria:
- abrir o link oficial da categoria escolhida.

#### Categoria “Outros”
Ainda depende de pesquisa do conteúdo oficial.
Decisão atual:
- na hora de montar os links e páginas, pesquisar corretamente esse conteúdo antes de fechar o comportamento definitivo.

---

## 5. Banco de dados inicial
### Tabela `profiles`
Campos:
- id (uuid, FK para auth.users)
- nome_completo (text)
- cpf (text, unique)
- email (text)
- cep (text)
- logradouro (text)
- numero (text)
- bairro (text)
- cidade (text)
- estado (text)
- is_subscribed (boolean, default false)
- kiwify_subscriber_id (text, nullable)
- subscription_status (text, nullable)
- created_at (timestamp)
- updated_at (timestamp)

### Regras de acesso (RLS)
- usuário lê e edita apenas o próprio registro;
- service role / edge functions podem atualizar assinatura e status financeiros.

### Possível expansão posterior
Dependendo da estratégia de cobrança/avisos e rastreabilidade, avaliar tabelas auxiliares como:
- `subscription_events`
- `billing_notifications`
- `rag_sources`
- `rag_chunks`
- `first_aid_topics`

Sem criar nada além do que for confirmado no fluxo incremental.

---

## 6. Integrações externas
### ViaCEP
- auto-preenchimento do endereço no cadastro.

### Resend
- confirmação de email;
- recuperação de senha;
- eventuais avisos de assinatura, sem interferir nos fluxos existentes de outras aplicações.

### Kiwify
- checkout do plano bimestral;
- webhook para ativar/cancelar/atrasar assinatura.

### Google Places API
- mapa de unidades próximas;
- configuração obrigatória por variável de ambiente.

### RAG / busca semântica
- prioridade em solução sem agente;
- usar semântica + metadata + mecanismos confiáveis para garantir acerto;
- só avaliar agente se o mecanismo semântico não atingir confiança adequada.

---

## 7. Estrutura de pastas de referência
```txt
sos-vidas-nexus/
├── app/
│   ├── (auth)/
│   │   ├── cadastro.tsx
│   │   ├── confirmar-email.tsx
│   │   ├── pagamento.tsx
│   │   └── login.tsx
│   ├── (app)/
│   │   ├── index.tsx
│   │   ├── mapas/index.tsx
│   │   ├── emergencias/index.tsx
│   │   └── primeiros-socorros/index.tsx
│   └── _layout.tsx
├── components/
├── services/
├── constants/
├── hooks/
└── supabase/
    └── migrations/
```

Observação:
- esta estrutura é referência inicial e pode ser refinada tecnicamente, desde que sem violar fluxos já definidos.

---

## 8. Variáveis de ambiente previstas
```env
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
KIWIFY_WEBHOOK_SECRET=
EXPO_PUBLIC_KIWIFY_CHECKOUT_URL=
EXPO_PUBLIC_GOOGLE_PLACES_API_KEY=
LLM_ESCOLHIDA_API_KEY=
```

Observação:
- se o modo RAG puro funcionar sem LLM, a variável de LLM pode ficar opcional ou nem ser usada.

---

## 9. Regras críticas de segurança e produto
1. O app não cria conteúdo médico próprio.
2. Todas as telas de primeiros socorros devem incluir disclaimer de emergência.
3. Nunca expor segredos no cliente.
4. Botões grandes, uso sob estresse, feedback visual imediato.
5. Suporte a dark mode.
6. Funcional em 3G.
7. Projeto preparado para EAS Build e publicação.

---

## 10. App metadata / publicação
Preparar `app.json` / equivalente com:
- package/bundle id a definir
- permissões:
  - ACCESS_FINE_LOCATION
  - CALL_PHONE
  - INTERNET
- ícone e splash alinhados à marca Nexus Automação

---

## 11. Ordem de execução com menor risco
### Fase 1 — especificação e rastreabilidade
- manter este MD como fonte de verdade;
- criar tarefa mestre no Painel Jarvis;
- organizar etapas, logs e relatórios diários.

### Fase 2 — base técnica
- criar projeto/repo;
- configurar Expo;
- configurar Supabase vazio;
- definir Edge Functions base.

### Fase 3 — dados e autenticação
- auth;
- tabela `profiles`;
- RLS;
- confirmação de email;
- reset de senha.

### Fase 4 — assinatura
- tela de pagamento;
- integração Kiwify;
- webhook e estados de assinatura;
- bloqueio de acesso e aviso pré-vencimento.

### Fase 5 — telas núcleo
- home;
- emergências;
- mapas;
- primeiros socorros por categoria.

### Fase 6 — busca inteligente
- projetar e implantar RAG semântico confiável;
- fallback para página geral + 192/193 quando não identificar;
- avaliar agente apenas se necessário.

### Fase 7 — acabamento de publicação
- branding final;
- assets de loja;
- EAS build;
- preparação para Play Store / App Store.

---

## 12. Regra operacional de documentação contínua
A cada mudança de plano, decisão, blocker, erro ou ajuste de fluxo:
- atualizar este MD;
- atualizar o README do repositório quando a mudança impactar visão geral, setup, arquitetura ou uso;
- atualizar a tarefa no Painel Jarvis;
- registrar nos relatórios diários;
- registrar erros relevantes em logs.

Regra obrigatória adicional:
- qualquer alteração em Supabase (schema, migrations, RLS, Edge Functions, webhooks, seeds, documentação de variáveis e integrações) deve ser refletida também no GitHub;
- a estrutura do projeto no repositório deve espelhar a estrutura real usada na implementação.

Este conjunto deve funcionar como o **RAG de emergência do projeto**, permitindo entender rapidamente:
- o que foi decidido;
- o que já foi feito;
- o que falta;
- o que quebrou;
- como retomar.
