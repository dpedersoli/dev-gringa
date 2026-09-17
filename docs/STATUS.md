# STATUS

Última atualização: 17 set 2026.

## Agora

**Fase 3 — Bloco de perfil** está implementada (spec + UI + Anthropic). A pontuação **real** ainda não foi conferida neste computador porque não há `.env.local` com `ANTHROPIC_API_KEY`. Sem chave o app recusa inventar nota (conferido: `/cv?error=missing-key`).

## Fase atual

| Campo | Valor |
| --- | --- |
| Número | 3 |
| Nome | Bloco de perfil |
| Spec | `docs/phases/03-profile-block.md` |
| Código | `/cv`, `/linkedin`, `src/lib/analysis` |
| Falta para fechar | Colocar a chave Anthropic e gerar uma nota válida no contrato |

## O que já aconteceu

- **Fase 1 — Discovery:** encerrada.
- **Fase 2 — Fundação:** encerrada e no GitHub (`2f55e79`).
- **Fase 3:** spec + rotas + chamada Anthropic + `assertEvaluation`. Sem entrevistas.

## O que está acontecendo

Esperando `ANTHROPIC_API_KEY` em `.env.local` para fechar o critério de saída da nota. Não começar Fase 4.

## Como rodar

```bash
cd C:\Daniel\Developer\dev-gringa
copy .env.example .env.local
# editar .env.local e colar a chave
npm run dev
```

http://localhost:3000 — CV em `/cv`, LinkedIn em `/linkedin`. Dados em `data/` (gitignored).

## Bloqueios

Sem `ANTHROPIC_API_KEY` não há Profile Score. Comportamento correto, não é bug.
