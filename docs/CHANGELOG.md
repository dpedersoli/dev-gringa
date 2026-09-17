# Changelog

Eventos do projeto, do mais recente para o mais antigo. Fatos, não planos.

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
