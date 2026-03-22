# Distribuição — SOS Vidas (Nexus Automação)

## Estratégia inicial
O projeto será preparado primeiro para Android e, em seguida, mantido compatível com iOS.

## Canais previstos
- Google Play
- distribuição interna por build preview
- possibilidade futura de iOS/App Store

## Identificadores definidos inicialmente
- Android package: `com.nexusautomacao.sosvidas`
- iOS bundle identifier: `com.nexusautomacao.sosvidas`
- Scheme: `sosvidasnexus`

## Build profiles
Definidos em `eas.json`:
- `development`
- `preview`
- `production`

## O que ainda falta
- login/autenticação do EAS no ambiente de build
- gerar primeiro build preview
- testar em dispositivo
- preparar assets finais de loja
- revisar política de privacidade final hospedada
- revisar descrição e screenshots finais

## Observação
A etapa 9 pode ser considerada tecnicamente madura antes do build final, desde que toda a base de configuração, documentos de publicação e checklist estejam prontos.
