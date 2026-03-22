# RAG — Primeiros Socorros

Esta pasta reúne o corpus oficial, o manifesto de fontes e os artefatos de chunking/metadata do módulo de primeiros socorros.

## Estrutura prevista
- `sources/manifest.json` — mapa das fontes oficiais por categoria
- `sources/raw/` — texto bruto extraído das páginas oficiais
- `chunks/` — chunks já normalizados por bloco
- `eval/` — casos de teste, consultas ambíguas e avaliação de rerank

## Regra principal
O RAG deve devolver **atalhos oficiais** e blocos rastreáveis, não respostas livres autorais.
