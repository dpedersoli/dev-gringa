<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Projeto (fonte da verdade)

Antes de qualquer trabalho: `docs/STATUS.md`, `docs/DECISIONS.md`, `docs/phases/` da fase atual.

Fase 2 = perfil local + dashboard + contrato de avaliação.
Fase 3 = CV + LinkedIn via Anthropic (`assertEvaluation` antes de persistir). Sem entrevistas, áudio, auth.

Persistência: `data/*.json` via `src/lib/storage`. Avaliação: `assertEvaluation` em `src/lib/domain/evaluation.ts`. Chave: `ANTHROPIC_API_KEY` em `.env.local`.
