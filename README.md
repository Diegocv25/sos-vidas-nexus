# SOS Vidas (Nexus Automação)

Aplicativo mobile de primeiros socorros da Nexus Automação.

## Fonte de verdade
- **GitHub/repositório** = fonte principal de verdade do projeto
- **Painel Jarvis** = RAG operacional / backup de contexto

## Estado atual
- Etapas 1 a 8 fechadas no bloco principal; etapa 9 em andamento
- Planejamento mestre em `docs/sos-vidas-nexus-planejamento.md`
- App alvo: Expo + React Native
- Backend alvo: Supabase + Edge Functions
- Banco alvo: projeto Supabase vazio `SUPABASE_FUNIL_IA` (`vzufohjzqjcncvcysjej`)

## Regra operacional principal
- Toda mudança em Supabase também deve ser refletida no repositório
- README e planejamento devem permanecer atualizados
- O fluxo oficial e as decisões do produto devem ser registrados antes de mudanças estruturais relevantes
- Este README deve explicar o funcionamento do app de forma operacional, para qualquer pessoa entender o que o produto faz sem depender de conversa externa

---

# Funcionamento do app — visão completa

## Objetivo do produto
O `SOS Vidas (Nexus Automação)` é um app mobile focado em emergências e primeiros socorros.

Ele serve para 3 coisas principais:
1. mostrar os **10 locais de socorro mais próximos**;
2. permitir ligação rápida para **números de emergência**;
3. direcionar o usuário para **orientações oficiais de primeiros socorros**.

O app **não cria conteúdo médico próprio**.
Ele apenas:
- identifica ou classifica a situação;
- direciona para páginas oficiais;
- facilita o contato com os serviços corretos.

---

# Fluxo do app, tela por tela, clique por clique

## TELA 1 — Entrada / Login
### O que aparece
- campo **Email**
- campo **Senha**
- botão **Entrar**
- botão **Criar cadastro**
- link **Esqueci minha senha**
- opção **Lembrar meu email**

### O que acontece em cada clique
#### Clique em **Entrar**
- valida email e senha
- se email confirmado e assinatura ativa: abre a **Tela 6 — Home**
- se email confirmado e assinatura inativa: abre a **Tela 4 — Pagamento**
- se email ainda não confirmado: abre a **Tela 3 — Confirmação de Email**

#### Clique em **Criar cadastro**
- abre a **Tela 2 — Cadastro**

#### Clique em **Esqueci minha senha**
- inicia fluxo de recuperação de senha por email

---

## TELA 2 — Cadastro
### O que aparece
Campos obrigatórios:
1. Nome completo
2. CPF
3. Email
4. CEP
5. Endereço / logradouro
6. Número
7. Bairro
8. Cidade
9. Estado
10. Senha
11. Confirmação de senha

### Comportamentos obrigatórios
- CPF com máscara e validação matemática real
- CEP com máscara
- senha com mostrar/esconder
- confirmação de senha com mostrar/esconder

### Comportamento do CEP
Quando o usuário sai do campo CEP:
- o app consulta a API ViaCEP
- preenche automaticamente:
  - logradouro
  - bairro
  - cidade
  - estado

O campo **número** continua manual.

### Clique no botão de cadastro
Ao tentar avançar, o app valida:
- se todos os campos obrigatórios foram preenchidos
- se o CPF é válido
- se senha e confirmação são idênticas
- se o CEP é válido

Se tudo estiver certo:
1. cria o usuário no Supabase Auth
2. cria o registro do perfil na tabela `profiles`
3. envia email de confirmação
4. redireciona para a **Tela 3 — Confirmação de Email**

---

## TELA 3 — Confirmação de Email
### O que aparece
- mensagem informando que o código foi enviado por email
- campo **Código recebido**
- botão **Reenviar email**
- botão **Continuar**

### O que acontece em cada clique
#### Clique em **Reenviar email**
- reenviar código de confirmação para o email cadastrado

#### Clique em **Continuar**
- validar o código informado dentro do app
- se o código estiver correto:
  - confirmar o email
  - abrir o checkout da Kiwify
- se o código estiver incorreto:
  - permanecer nesta tela com aviso correspondente

### Regra importante
- confirmação de email existe **somente após o cadastro**
- a confirmação deve acontecer **dentro do app por código**, não por dependência de navegador
- depois que o usuário confirmou e pagou, ele não precisa repetir isso no login futuro

---

## TELA 4 — Pagamento
### O que aparece
- nome do app
- valor da assinatura: **R$ 5,00 bimestral**
- 3 benefícios do app:
  1. mapas dos 10 locais de socorro mais próximos
  2. números diretos de todas as emergências
  3. primeiros socorros e orientações para pedir socorro
- botão **ASSINAR AGORA**

### O que acontece em cada clique
#### Clique em **ASSINAR AGORA**
- redireciona para o checkout da Kiwify

### O que acontece após pagamento aprovado
- a Kiwify envia um webhook
- o backend / Edge Function atualiza a assinatura no Supabase
- depois disso o acesso fica liberado
- o usuário volta ao app e entra direto na navegação principal se a sessão ainda estiver ativa
- se sair e voltar depois, usa email e senha normalmente pela Tela 1

### Regra importante
Sem assinatura ativa:
- o usuário não tem acesso ao app principal

---

## TELA 5 — Retorno futuro / Login recorrente
### O que aparece
- reaproveita a **Tela 1 — Entrada / Login**
- não existe uma tela separada para login recorrente

### Regra de “Lembrar minha senha”
A intenção do produto é facilitar o acesso em emergência.
Então o comportamento desejado é:
- auto complete / sugestão facilitada quando o usuário tiver marcado essa opção
- não é para tratar isso como armazenamento inseguro literal da senha em texto livre

### O que acontece em cada clique
#### Clique em **Entrar**
- validar credenciais no Supabase Auth
- verificar situação da assinatura no perfil

Se assinatura estiver ativa:
- abrir a **Tela 6 — Home**

Se assinatura estiver inativa, vencida ou bloqueada:
- bloquear acesso
- redirecionar para fluxo de pagamento / regularização

#### Clique em **Esqueci minha senha**
- iniciar fluxo de recuperação de senha via email

### Regra importante
- “Esqueci minha senha” existe **somente nesta tela**

---

## Regras de assinatura após o login
### Aviso pré-vencimento
A partir de **5 dias antes do vencimento**:
- o app deve exibir um aviso permanente
- com contagem regressiva de dias restantes
- no estilo do aviso que já existe no app de gestão

### Assinatura inativa / vencida
- bloquear acesso ao app principal
- manter o usuário no fluxo de regularização

---

## TELA 6 — Home
### O que aparece
3 botões grandes:
1. **Mapas**
2. **Emergências**
3. **Primeiros Socorros**

### O que acontece em cada clique
#### Clique em **Mapas**
- abre a **Tela 7 — Mapas**

#### Clique em **Emergências**
- abre a **Tela 8 — Números de Emergência**

#### Clique em **Primeiros Socorros**
- abre a **Tela 9 — Primeiros Socorros**

---

## TELA 7 — Mapas
### O que aparece
3 opções principais:
- **Hospitais**
- **UPAs 24h**
- **Centros de Saúde**

### O que acontece em cada clique de categoria
1. solicitar permissão de localização
2. pegar a localização atual do usuário
3. consultar Google Places API
4. listar até 10 resultados
5. ordenar do mais próximo para o mais distante

### O que cada resultado mostra
- nome da unidade
- endereço
- telefone, se existir
- distância em km
- botão **Ver no mapa**

#### Clique em **Ver no mapa**
- abrir Google Maps nativo com a unidade como destino

### Regra importante
A integração deve ficar pronta para funcionar assim que a chave for inserida em:
- `EXPO_PUBLIC_GOOGLE_PLACES_API_KEY`

Essa chave **vai existir com certeza**.

---

## TELA 8 — Números de Emergência
### O que aparece
Cartões com:
- nome do serviço
- número
- ícone
- botão **LIGAR AGORA**

### Lista principal
- SAMU — 192
- Corpo de Bombeiros — 193
- Polícia Militar — 190
- Polícia Civil — 197
- Defesa Civil — 199
- Central de Regulação em Saúde — 136
- Disque Denúncia — 100
- Disque Idoso — 080 197 0001
- CVV — 188
- CIATox — (11) 3081-3400

### O que acontece em cada clique
#### Clique em **LIGAR AGORA**
- abrir discagem nativa do aparelho via `tel://`

---

## TELA 9 — Primeiros Socorros
Esta tela possui **2 modos de acesso**.

---

## MODO 1 — Busca por descrição (RAG semântico)
### O que aparece
- campo de texto: “Descreva o que está acontecendo...”
- botão de voz
- botão **Buscar**

### O que acontece em cada clique
#### Clique no botão de voz
- ativa speech-to-text nativo
- transforma a fala em texto dentro do campo

#### Clique em **Buscar**
- o texto digitado pelo usuário é enviado para um mecanismo de busca semântica / RAG
- prioridade atual: resolver isso **sem agente de IA**
- se a busca semântica for suficiente, agente é descartado
- se não for confiável, aí avaliar fallback com agente/LLM

### Resultado esperado da busca
O mecanismo deve retornar:
- situação identificada
- URL oficial correspondente
- telefone de emergência recomendado
- orientação rápida

### O que aparece após o resultado
- card com a situação identificada
- orientação rápida em destaque
- botão **VER ORIENTAÇÕES OFICIAIS**
- botão **LIGAR [NÚMERO]**

#### Clique em **VER ORIENTAÇÕES OFICIAIS**
- abrir o link oficial da situação

#### Clique em **LIGAR [NÚMERO]**
- abrir a discagem nativa

### Regra quando a busca não identificar com segurança
Fazer os 2:
1. orientar o usuário a ligar **192** ou **193**
2. abrir também a página geral oficial de primeiros socorros

---

## MODO 2 — Categorias rápidas
### O que aparece
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

### O que acontece em cada clique
#### Clique em qualquer categoria
- abrir o link oficial da categoria escolhida

### Regra especial para “Outros”
A categoria “Outros” ainda precisa de pesquisa do conteúdo oficial antes de ser fechada com exatidão.

Ou seja:
- o comportamento final será definido depois de analisar corretamente esse conteúdo

---

# Banco de dados inicial
## Projeto definido
- Supabase: `SUPABASE_FUNIL_IA`
- ref: `vzufohjzqjcncvcysjej`

## Tabela inicial obrigatória
### `profiles`
Campos previstos:
- id
- nome_completo
- cpf
- email
- cep
- logradouro
- numero
- bairro
- cidade
- estado
- is_subscribed
- kiwify_subscriber_id
- subscription_status
- created_at
- updated_at

## Regras de acesso
- usuário só lê e edita o próprio perfil
- service role / Edge Functions atualizam status de assinatura

---

# Arquitetura definida
## Frontend
- Expo
- React Native
- Expo Router

## Backend
- Supabase
- Edge Functions

## Integrações
- ViaCEP
- Resend
- Kiwify
- Google Places API
- RAG semântico para primeiros socorros

---

# Regra documental do projeto
Sempre que houver mudança em:
- fluxo
- tela
- clique
- Supabase
- migrations
- Edge Functions
- integrações
- documentação

é obrigatório atualizar:
1. o repositório GitHub
2. este README, se a mudança afetar entendimento do produto
3. o planejamento mestre em `docs/sos-vidas-nexus-planejamento.md`
4. a tarefa correspondente no Painel Jarvis

---

# Etapas do projeto
- [x] Etapa 1 — documentação mestre + criação do repositório + estrutura base
- [x] Etapa 2 — setup base Expo e estrutura técnica inicial
- [x] Etapa 3 — setup Supabase/Auth/profiles/RLS
- [ ] Etapa 4 — Edge Functions de confirmação, cobrança e webhook (código pronto, deploy pendente por autenticação do CLI)
- [x] Etapa 5 — telas núcleo
- [x] Etapa 6 — RAG semântico / primeiros socorros
- [x] Etapa 7 — acabamento para publicação em loja *(entregue no que depende do projeto; pendências restantes são externas: branding final, preview/teste confiável e build/publicação)*

## Publicação e branding
- `app.json` já aponta para o nome real do app: **SOS Vidas (Nexus Automação)**
- `eas.json` já existe para preparar builds
- package/bundle definidos inicialmente como `com.nexusautomacao.sosvidas`
- ainda faltam branding final (ícone/splash definitivos), revisão em dispositivo e build de publicação
- pendências de UX já registradas: botão voltar no fluxo principal, melhor distribuição vertical do conteúdo e header padronizado com a marca do app
- pendência técnica externa atual: liberação/token da API do Google Maps/Places
