# Changelog

Eventos do projeto, do mais recente para o mais antigo. Fatos, não planos.

## 2026-09-17 — Fase 3 conferida ao vivo

- CV (PDF), LinkedIn colado e Profile Score numérico no painel, neste computador.
- Critério de saída da Fase 3 atendido. Sem entrevistas.

## 2026-09-17 — LinkedIn: copiar texto, não o link

- Texto da página explica que não dá para avaliar pela URL do perfil (D-019).
- Balões de ajuda em Headline, About e no texto de introdução, com ilustração.
- Enter quebra linha nos formulários; Shift+Enter envia.

## 2026-09-17 — Segredos em `.env`

- Valores reais em `.env` (gitignored). `.env.example` só com os nomes das variáveis (D-020).
- UI, regras e docs deixam de apontar para `.env.local`.

## 2026-09-17 — Fase 3: análise de CV e LinkedIn

- Spec profunda em `docs/phases/03-profile-block.md`.
- Rotas `/cv` e `/linkedin`; rubrica no prompt Anthropic (`claude-sonnet-4-6`); saída passa por `assertEvaluation`.
- Profile Score só com os dois módulos (57/43). Sem chave: erro `missing-key`, sem nota inventada.
- PDF via `unpdf`. LinkedIn = três campos colados (D-018, D-019).
- Fundação anterior enviada a `origin/master` (`2f55e79`).

## 2026-09-16 — Fase 2 conferida no browser e encerrada

- Fluxo real: `/` redireciona para onboarding sem perfil; salvar grava `data/profile.json`; painel mostra Profile Score **Não medido** (não zero); `/profile` reedita; `uiLocale: en-US` troca o chrome para inglês.
- Critério de saída da Fase 2 atendido. Sem CV, LLM, áudio ou auth.

## 2026-09-16 — Fase 2 iniciada: repo, docs, scaffold

- Criado o repositório em `C:\Daniel\Developer\dev-gringa` (Next.js 16.3, App Router, TypeScript, Tailwind 4).
- Documentação permanente em `docs/` (STATUS, DECISIONS, CHANGELOG, product, phases).
- Aprofundamento da Fase 2 escrito em `docs/phases/02-foundation.md`.
- Fase 1 arquivada em `docs/phases/01-discovery.md` (conteúdo que estava no canvas temporário + PRD da store).
- Decisão D-008: sem auth (supersede o “auth” do plano-esboço da Fase 1).
- Decisão D-009: JSON local em vez de SQLite.
- Código da fundação: onboarding, perfil, dashboard com módulos não medidos, contrato TypeScript de avaliação.
- Regra Cursor `alwaysApply` para ler STATUS/DECISIONS e respeitar o método de fases.

## 2026-09-16 — Fase 1 encerrada (discovery)

Aconteceu numa conversa Cursor, antes deste repo existir.

- Teardown de concorrentes: interviewing.io, Aced/Exponent, Final Round AI, DevInterview.AI, VagaNaGringa, prepara.cv, Arc/Toptal.
- Funil internacional mapeado (ATS → LinkedIn → recruiter → OA/live code → técnica → fit → offer).
- Persona primária: pleno BR, gargalo em inglês falado sob pressão.
- Posicionamento: coach de prontidão; não é copilot, mentoria 1:1, nem só gerador de CV.
- Primeira nota: CV + LinkedIn. Entrevista: inglês-US, timer sem pausa.
- Intenção: ferramenta pessoal.
- Canal: só web.
- Canvas temporário + `VISION-DEV-GRINGA.md` na store pessoal — depois migrados para este `docs/` (ver entrada acima).

## Antes de 2026-09-16 — Esboço na cabeça

- Ideia inicial: entrevistas RH + técnica (Vibe Engineering, sem live code) + fit cultural, análise de CV e LinkedIn, indicação de plataformas/empresas, desafio só com enunciado, pontuação e feedback em tudo.
- Ainda não havia persona travada, nem fase, nem repo.
