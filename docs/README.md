# Documentação permanente

Esta pasta é a **memória do projeto**. Conversas no Cursor, canvases temporários e o plano da Fase 1 **não** são a fonte da verdade. Se um agente ou uma pessoa nova chegar, começa aqui.

## Ordem de leitura (obrigatória)

1. [STATUS.md](STATUS.md) — fase atual, o que está acontecendo, o que falta.
2. [DECISIONS.md](DECISIONS.md) — o que foi decidido e **por quê**.
3. [CHANGELOG.md](CHANGELOG.md) — o que já aconteceu, em ordem.
4. A fase marcada em STATUS. A Fase 5 está encerrada: [05-matching.md](phases/05-matching.md). A próxima tarefa (D-044) ainda não tem spec de fase.
5. Produto em `product/` se a dúvida for de visão, não de implementação.

## Mapa

| Arquivo | Papel |
| --- | --- |
| [CONTEXT.md](CONTEXT.md) | Como carregar contexto numa conversa nova |
| [STATUS.md](STATUS.md) | Agora. Atualizar em **toda** sessão que mudar o produto |
| [DECISIONS.md](DECISIONS.md) | Decisões com data, contexto, porquê e consequências |
| [CHANGELOG.md](CHANGELOG.md) | Histórico factual |
| [product/vision.md](product/vision.md) | Posicionamento |
| [product/persona.md](product/persona.md) | Quem é o usuário |
| [product/anti-scope.md](product/anti-scope.md) | O que o produto não é |
| [product/score.md](product/score.md) | Filosofia do Readiness / Profile Score |
| [product/modules.md](product/modules.md) | Catálogo (esboço das fases futuras, detalhe só da atual) |
| [phases/01-discovery.md](phases/01-discovery.md) | Arquivo da Fase 1 (encerrada) |
| [phases/02-foundation.md](phases/02-foundation.md) | Arquivo da Fase 2 (encerrada) |
| [phases/03-profile-block.md](phases/03-profile-block.md) | Arquivo da Fase 3 (encerrada) |
| [phases/04-interviews.md](phases/04-interviews.md) | Arquivo da Fase 4 (código entregue) |
| [phases/05-matching.md](phases/05-matching.md) | Arquivo da Fase 5 (encerrada) |
| [phases/06-later.md](phases/06-later.md) | Esboço — não implementar |

## Regra de ouro

Toda decisão nova entra em `DECISIONS.md` **no mesmo dia**, com o porquê. Toda mudança visível entra no `CHANGELOG.md`. O `STATUS.md` nunca pode mentir sobre a fase atual.

Fases futuras não são detalhadas nem construídas. Só a fase marcada como atual em `STATUS.md` pode ganhar código e spec profunda.
