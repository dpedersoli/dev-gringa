# Como não perder o contexto

## Para um agente (Cursor) numa conversa nova

Antes de escrever código ou mudar produto:

1. Ler `docs/STATUS.md`.
2. Ler `docs/DECISIONS.md`.
3. Ler o arquivo da fase atual em `docs/phases/`.
4. Se a tarefa for de visão (persona, score, anti-escopo), ler `docs/product/`.
5. Não usar canvases temporários do Cursor nem o arquivo `.cursor/plans/` como fonte da verdade — eles podem sumir. Este repositório é o arquivo.

No fim da sessão:

1. Atualizar `docs/STATUS.md` (o que mudou, o que falta).
2. Acrescentar uma entrada em `docs/CHANGELOG.md`.
3. Se houve decisão nova, um ADR em `docs/DECISIONS.md`.
4. Se a fase atual avançou de spec para código (ou fechou), dizer isso explicitamente no STATUS.

## Para um humano

Abra o repo em `C:\Daniel\Developer\dev-gringa`. O README da raiz aponta para cá. O app é ferramenta pessoal: rode `npm run dev` e use no browser.

## O que já existia fora deste repo

- Canvas de discovery da Fase 1 (pasta temporária do Cursor) — conteúdo **arquivado** em `phases/01-discovery.md` e `product/`.
- `VISION-DEV-GRINGA.md` na store pessoal do Cursor — substituído por este `docs/`. Não atualizar a store como fonte da verdade daqui pra frente.
- Plano `discovery_dev_gringa_*.plan.md` — histórico de planejamento da Fase 1. Decisões posteriores (sem auth, Profile Score primeiro, ferramenta pessoal) **prevalecem** sobre o texto antigo do plano que ainda cita “auth” na Fase 2.

## Nome

Pasta e repo: `dev-gringa` (nome de trabalho). Produto ainda **sem nome comercial**. Na UI usamos “Prontidão” como rótulo funcional, não como marca travada.
