# STATUS

Última atualização: 22 set 2026.

## Agora

**Fase 5 — Matching.** Encerrada e conferida ao vivo em 22 set 2026. Canais, empresas, cursos, questionário direto e o rótulo de live code × IA estão em `/matching`.

**Próxima tarefa, sem fase aberta e sem código (D-044).** Um questionário de perguntas indiretas pré-preenche os campos do perfil. Depois disso o perfil continua editável. Não é a Fase 6.

## Fase atual

| Campo | Valor |
| --- | --- |
| Número | 5, encerrada |
| Nome | Matching |
| Spec | `docs/phases/05-matching.md` |
| Código | `/matching` |
| Falta para fechar | Nada. A próxima tarefa está anotada e ainda não é uma fase. |

## O que já aconteceu

- **Fase 1 — Discovery:** encerrada (`docs/phases/01-discovery.md`).
- **Fase 2 — Fundação:** encerrada (`docs/phases/02-foundation.md`, GitHub `2f55e79`).
- **Fase 3 — Bloco de perfil:** encerrada e conferida ao vivo (`docs/phases/03-profile-block.md`, commit `739eb1a`). CV, LinkedIn, Profile Score.
- **Fase 4 — Entrevistas:** código no git (`55fa8a6`, `4639121`, `843d876`). Rodadas curtas conferidas. Rodada longa, pergunta extra (D-033) e o tempo somado (D-034) ainda sem conferência ao vivo. O autor seguiu para a Fase 5 mesmo assim.
- **Fase 5 — Matching:** encerrada e conferida ao vivo em 22 set 2026 (`docs/phases/05-matching.md`).

## O que está acontecendo

Nada em construção. A Fase 6 (desafio, viva voz, mobile) continua esboço.

A tarefa anotada para a próxima abertura: um formulário com várias perguntas indiretas. As respostas pré-definem os campos do perfil. O usuário edita o perfil quando quiser, também depois que o questionário já definiu esses campos (D-044).

## Como rodar

```bash
cd C:\Daniel\Developer\dev-gringa
npm run dev
```

http://localhost:3000 — matching em `/matching`.

## Bloqueios

Sem `ANTHROPIC_API_KEY` não há nota nova. O matching em si não chama a API: o catálogo está no repo.
