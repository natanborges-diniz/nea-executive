# WhatsApp Architecture Recommendation

## Decisão recomendada
Usar **suporte nativo do OpenClaw para WhatsApp** como caminho principal.

## Motivo
Para o cenário atual do Natan, o objetivo não é apenas abrir mais um canal, e sim criar uma integração operacional confiável. O suporte nativo do OpenClaw oferece o melhor equilíbrio entre:
- simplicidade de implantação
- aderência ao ecossistema já em uso
- menor complexidade inicial
- governança centralizada
- menor número de peças externas para manter

## Leitura prática
### Melhor caminho agora
1. usar WhatsApp nativo do OpenClaw
2. operar preferencialmente em modo controlado / allowlist
3. usar Telegram como canal principal de comando
4. usar WhatsApp como camada operacional complementar

### Quando considerar Evolution API
Usar Evolution só se houver necessidade real de:
- arquitetura externa independente do OpenClaw
- integração com outros sistemas fora do fluxo principal
- requisitos específicos de API/webhook que o nativo não cubra bem
- necessidade operacional que justifique mais manutenção e mais superfície de risco

## Comparativo objetivo
### OpenClaw nativo
**Vantagens**
- integração direta com o runtime atual
- menos componentes para operar
- governança centralizada
- política de allowlist nativa
- menor esforço para ativar

**Riscos / limites**
- depende da sessão WhatsApp Web
- precisa de cuidado com número pessoal
- exige desenho claro de escopo operacional

### Evolution API
**Vantagens**
- flexibilidade de integração externa
- API dedicada
- pode servir outros fluxos além do OpenClaw

**Riscos / limites**
- mais infraestrutura
- mais manutenção
- mais pontos de falha
- mais superfície de segurança
- pode ser exagero para a fase atual

## Recomendação de governança
- se possível, usar número dedicado no futuro
- se usar número pessoal, ativar com política restrita
- manter menor privilégio possível
- não automatizar ações sensíveis sem aprovação

## Ordem de implantação sugerida
1. mapear se o WhatsApp será número pessoal ou dedicado
2. instalar/ativar plugin nativo do OpenClaw
3. fazer login via QR
4. restringir allowlist
5. validar fluxo mínimo
6. só depois avaliar necessidade de Evolution API

## Conclusão
O melhor caminho agora é **OpenClaw nativo primeiro**.
Evolution API fica como opção futura, não como passo inicial.
