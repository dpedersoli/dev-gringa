# STATUS

Última atualização: 23 set 2026.

## Agora

**Fase 5 — Matching.** Encerrada e conferida ao vivo em 22 set 2026. Canais, empresas, cursos, questionário direto e o rótulo de live code × IA estão em `/matching`.

**Tarefa conferida, sem fase nova e ainda fora do git (D-044, D-045, D-046).** O questionário de `/questions` foi conferido ao vivo em 23 set 2026. Uma resposta faltando avisa no grupo e mantém as marcas. O perfil continua editável. A Fase 6 continua esboço.

## Fase atual

| Campo | Valor |
| --- | --- |
| Número | 5, encerrada |
| Nome | Matching |
| Spec | `docs/phases/05-matching.md` |
| Código | `/matching` |
| Falta para fechar | Nada na Fase 5. O questionário em `/questions` foi conferido e ainda não entrou no git. |

## O que já aconteceu

- **Fase 1 — Discovery:** encerrada (`docs/phases/01-discovery.md`).
- **Fase 2 — Fundação:** encerrada (`docs/phases/02-foundation.md`, GitHub `2f55e79`).
- **Fase 3 — Bloco de perfil:** encerrada e conferida ao vivo (`docs/phases/03-profile-block.md`, commit `739eb1a`). CV, LinkedIn, Profile Score.
- **Fase 4 — Entrevistas:** código no git (`55fa8a6`, `4639121`, `843d876`). Rodadas curtas conferidas. Rodada longa, pergunta extra (D-033) e o tempo somado (D-034) ainda sem conferência ao vivo. O autor seguiu para a Fase 5 mesmo assim.
- **Fase 5 — Matching:** encerrada e conferida ao vivo em 22 set 2026 (`docs/phases/05-matching.md`).

## O que está acontecendo

O questionário indireto está em código (`/questions`, D-045). A Fase 6 (desafio, viva voz, mobile) continua esboço.

O perfil e o primeiro acesso ligam para essas perguntas. As respostas substituem o campo. “Ainda não sei” apaga só aquele campo quando nenhuma outra opção do grupo está marcada. Nome e idioma da tela ficam no perfil. Se faltar uma resposta, o aviso fica no grupo e as marcas da tela continuam (D-046).

## Como rodar

```bash
cd C:\Daniel\Developer\dev-gringa
npm run dev
```

http://localhost:3000 — matching em `/matching`.

## Bloqueios

Sem `ANTHROPIC_API_KEY` não há nota nova. O matching em si não chama a API: o catálogo está no repo.
