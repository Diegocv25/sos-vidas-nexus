# Etapa 8 — Triagem guiada e navegação segura (SOS Vidas)

## Princípio central
O app **não gera laudo, diagnóstico ou aconselhamento médico autoral**.

Ele deve:
- ajudar o usuário a navegar por categorias e subcategorias seguras;
- encaminhar a pessoa para o **órgão público/oficial**;
- sugerir ligação para `192` ou `193` quando necessário;
- reduzir ambiguidade em vez de tentar adivinhar por texto livre.

## Decisão oficial
A etapa 8 deixou de ser um RAG de texto livre como núcleo do produto.

Agora ela passa a ser:
- refinamento das categorias;
- subcategorias;
- tratamento especial de `Outros`;
- fluxo `Não sei identificar`;
- navegação segura até o link oficial correto.

## Regra crítica
O sistema deve devolver o **atalho oficial** (link/bloco) e não um texto solto inventado.

Ou seja:
- a resposta principal é o **encaminhamento para a fonte oficial**;
- o app precisa deixar claro que está encaminhando para conteúdo do órgão público/oficial;
- o usuário continua no controle da suspeita principal do ocorrido.

## Estrutura da etapa 8
### 1. Refinamento das categorias
- revisar categorias principais;
- melhorar rótulos, ícones e agrupamento;
- reduzir confusão em contexto de estresse.

### 2. Subcategorias
Onde o tema for amplo demais, quebrar em subtipos.
Exemplos:
- intoxicação → subtipos específicos;
- queimaduras → tipos/contextos quando fizer sentido;
- reação alérgica → reação alérgica geral / choque anafilático;
- `Outros` → desmembrar em quantas situações forem encontradas.

### 3. Regra de `Outros`
`Outros` não deve permanecer genérico.

Ele deve ser:
- desmembrado em quantas situações forem encontradas;
- mesmo que várias levem ao mesmo link oficial;
- organizado de forma que diferentes metadados possam apontar para o mesmo destino, sem esconder do usuário que são casos distintos.

### 4. Fluxo `Não sei identificar`
Ao clicar em `Não sei identificar`, o app deve abrir uma tela com:
- os números de emergência;
- o que cada um atende;
- orientação clara entre `192` e `193`.

#### 192 — SAMU
Responsável por urgências clínicas e emergências em saúde, como:
- suspeita de AVC;
- infarto;
- convulsão;
- desmaio;
- dificuldade respiratória;
- intoxicação;
- mal súbito.

#### 193 — Bombeiros
Responsável por resgate e salvamento, como:
- afogamento;
- incêndio;
- acidentes com risco físico/ambiental;
- salvamentos;
- ocorrências em que a resposta é mais de resgate do que clínica.

## Sem agente por padrão
Decisão atual:
- **não usar agente no fluxo principal**;
- **não usar n8n no runtime do app**;
- o app deve priorizar navegação previsível, auditável e segura.

## Possível uso futuro do corpus
O trabalho de corpus/fontes ainda pode ser útil para:
- enriquecer subcategorias;
- justificar links oficiais;
- melhorar ordenação e organização interna das categorias.

Mas não será usado como mecanismo principal de decisão automática por texto livre nesta etapa.

## Ordem de implementação da Etapa 8
1. revisar categorias atuais;
2. criar subcategorias onde necessário;
3. desmembrar `Outros`;
4. criar a tela `Não sei identificar`;
5. revisar links oficiais e duplicidades;
6. ajustar mensagens de encaminhamento oficial.

## Critério de aceitação
A etapa 8 só deve ser considerada concluída quando:
- categorias e subcategorias estiverem organizadas;
- `Outros` estiver desmembrado adequadamente;
- a tela `Não sei identificar` estiver pronta e clara;
- o app deixar explícito que encaminha para fonte pública/oficial;
- o fluxo reduzir ambiguidade em vez de forçar classificação automática.
