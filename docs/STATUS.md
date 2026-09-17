# STATUS

Última atualização: 17 set 2026.

## Agora

**Fase 3 — Bloco de perfil** conferida ao vivo neste computador (17 set 2026): CV, LinkedIn colado (não URL) e Profile Score numérico. Critério de saída da nota atendido. Sem entrevistas.

## Fase atual

| Campo | Valor |
| --- | --- |
| Número | 3 |
| Nome | Bloco de perfil |
| Spec | `docs/phases/03-profile-block.md` |
| Código | `/cv`, `/linkedin`, `src/lib/analysis` |
| Falta para fechar | Nada desta fase. Não começar Fase 4 até o autor pedir. |

## O que já aconteceu

- **Fase 1 — Discovery:** encerrada.
- **Fase 2 — Fundação:** encerrada e no GitHub (`2f55e79`).
- **Fase 3:** spec + rotas + Anthropic + `assertEvaluation`. Teste ao vivo OK (CV, LinkedIn, Profile Score). Sem entrevistas.

## O que está acontecendo

Fase 3 fechada no critério de saída. Não começar Fase 4.

## Como rodar

```bash
cd C:\Daniel\Developer\dev-gringa
npm run dev
```

Segredos em `.env` (gitignored). Nomes das variáveis em `.env.example`. Depois de criar ou editar `.env`, reinicie o `npm run dev`.

http://localhost:3000 — CV em `/cv`, LinkedIn em `/linkedin`. Dados em `data/` (gitignored).

## Bloqueios

Nenhum para a Fase 3. Sem chave Anthropic o app continua recusando inventar nota — esperado, não é bug.
