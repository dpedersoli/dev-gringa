# STATUS

Última atualização: 22 set 2026.

## Agora

**Fase 4 — Entrevistas** no tempo de call real (D-035): RH 30 min/7, técnica 45 min/5, fit 45 min/6. Pergunta extra e o tempo somado a ela ainda não foram conferidos ao vivo. Sem matching.

## Fase atual

| Campo | Valor |
| --- | --- |
| Número | 4 |
| Nome | Entrevistas |
| Spec | `docs/phases/04-interviews.md` |
| Código | `/interview/rh`, `/interview/tech_vibe`, `/interview/fit` |
| Falta para fechar | Banco e relógio realistas estão no código (D-035). Pergunta extra (D-033), o tempo somado a cada extra (D-034) e esta rodada longa ainda não foram conferidos ao vivo. O desenvolvimento pode seguir antes dessa conferência. |

## O que já aconteceu

- **Fase 1 — Discovery:** encerrada (`docs/phases/01-discovery.md`).
- **Fase 2 — Fundação:** encerrada (`docs/phases/02-foundation.md`, GitHub `2f55e79`).
- **Fase 3 — Bloco de perfil:** encerrada e conferida ao vivo (`docs/phases/03-profile-block.md`, commit `739eb1a`). CV, LinkedIn, Profile Score.
- **Fase 4:** spec + rotas; rodadas curtas conferidas; banco realista no código (D-035). Pergunta extra e o acréscimo de tempo ainda sem conferência ao vivo. Sem Fase 5/6.

## O que está acontecendo

Rodadas novas usam RH 30 min/7, técnica 45 min/5 e fit 45 min/6. Conferência ao vivo fica para depois. Não começar Fase 5.

## Como rodar

```bash
cd C:\Daniel\Developer\dev-gringa
npm run dev
```

Chrome ou Edge. Microfone ligado. Segredos em `.env` (gitignored). Nomes em `.env.example`.

http://localhost:3000 — entrevistas em `/interview/rh`, `/interview/tech_vibe`, `/interview/fit`.

## Bloqueios

Sem Chromium/microfone a transcrição não roda. Sem `ANTHROPIC_API_KEY` não há nota. Os dois são esperados, não bug. SpeechRecognition do Chrome continua frágil; o texto não é editado na hora.
