# Etapa 8 — RAG de Primeiros Socorros (SOS Vidas)

## Princípio central
O app **não gera laudo, diagnóstico ou aconselhamento médico autoral**.

Ele deve:
- classificar a descrição do usuário dentro de um conjunto fechado de ocorrências;
- recuperar o **bloco oficial** mais compatível;
- encaminhar a pessoa para o **órgão público/oficial**;
- sugerir ligação para `192` ou `193` quando necessário;
- cair para fallback conservador quando não houver confiança suficiente.

## Objetivo do RAG
Dado um texto livre do usuário (ex.: “meu filho engoliu algo e não consegue respirar”), o sistema deve retornar:
- `topic_id`
- `topic_name`
- `official_url`
- `emergency_number`
- `matched_block_id`
- `matched_block_title`
- `matched_block_excerpt`
- `confidence`
- `fallback_used`

## Regra crítica
O sistema deve devolver o **atalho oficial** (link/bloco) e não um texto solto inventado.

Ou seja:
- a resposta principal é o **encaminhamento para a fonte oficial**;
- o trecho recuperado serve como orientação rápida e auditável;
- o app precisa deixar claro que está encaminhando para conteúdo do órgão público/oficial.

## Estratégia recomendada
### 1. Base fechada de fontes oficiais
Usar apenas links oficiais/confiáveis mapeados para cada categoria.

### 2. Chunking por blocos semânticos
Cada documento deve ser quebrado por blocos como:
- definição/contexto;
- como agir;
- o que não fazer;
- quando procurar emergência;
- observações especiais (bebês, idosos, eletricidade etc.).

### 3. Metadata forte
Cada chunk deve carregar, no mínimo:
- `topic_id`
- `topic_name`
- `aliases`
- `symptoms_keywords`
- `action_keywords`
- `age_group`
- `urgency_level`
- `official_url`
- `source_title`
- `block_title`
- `emergency_number`
- `public_body`
- `source_type=official`

### 4. Busca híbrida
O motor deve combinar:
- busca semântica (embeddings)
- filtros por metadata
- match lexical básico

### 5. Rerank
Aplicar rerank nos candidatos para aumentar o acerto final.

### 6. Thresholds e fallback
Se a confiança não passar no threshold:
- não forçar categoria específica;
- abrir página geral oficial;
- sugerir `192` ou `193` conforme o caso conservador;
- marcar `fallback_used=true`.

## Sem agente por padrão
Decisão atual:
- **não usar agente no começo**;
- **não usar n8n no runtime do app**;
- n8n pode ser usado futuramente só para ingestão offline/manutenção, se necessário.

## Ordem de implementação da Etapa 8
1. mapear todos os links oficiais das categorias;
2. extrair texto bruto;
3. separar em blocos/chunks auditáveis;
4. adicionar metadata;
5. persistir corpus/chunks no projeto e depois no banco vetorial;
6. gerar embeddings;
7. aplicar rerank;
8. testar com bateria de prompts reais/ambíguos;
9. definir threshold de fallback.

## Critério de aceitação
A etapa 8 só deve ser considerada concluída quando:
- as fontes oficiais estiverem mapeadas e versionadas;
- o corpus estiver chunkado com metadata auditável;
- o mecanismo retornar link oficial + bloco correspondente;
- o fallback estiver funcionando em casos ambíguos;
- a taxa de acerto for alta o suficiente para não exigir agente no fluxo principal.
