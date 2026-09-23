<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Projeto (fonte da verdade)

Antes de qualquer trabalho: `docs/STATUS.md`, `docs/DECISIONS.md`, `docs/phases/` da fase atual.

Fase 3 = CV + LinkedIn via Anthropic (`assertEvaluation` antes de persistir). Encerrada.
Fase 4 = entrevistas faladas (timer, inglês-US, transcrição, `assertEvaluation`, pergunta extra D-033). Código entregue.
Fase 5 = matching, encerrada e conferida. Canais, empresas e cursos filtrados pelo perfil (D-036, D-037, D-038, D-040). Questionário opcional no perfil (D-042). Rótulo de live code × IA por empresa (D-043). Termo que não é óbvio tem ícone (D-041). Questionário indireto em `/questions` conferido em 23 set 2026: pré-preenche o perfil e deixa o perfil editável (D-044, D-045, D-046). Ainda fora do git. Sem viva voz contínuo, auth. Fase 6 não aberta.

Persistência: `data/*.json` via `src/lib/storage`. Avaliação: `assertEvaluation` em `src/lib/domain/evaluation.ts`. Segredos em `.env` (não commitar). Nomes das variáveis em `.env.example`.
