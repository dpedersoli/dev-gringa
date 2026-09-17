# Score

## O que 0 e 100 significam

- **0** = não aplique ainda (perfil escrito ou fala derrubam o processo).
- **100** = perfil no padrão internacional **e** consegue sustentar uma entrevista de pleno em inglês-US sob tempo.

## Regra crítica

Dimensão **não medida não vale zero**. Antes das entrevistas, o produto mostra só o **Profile Score** (CV + LinkedIn). Um “Readiness 47” inflado para baixo por buracos ainda não avaliados é mentira.

Na Fase 2 não há nenhuma dimensão medida. A UI diz “não medido”, nunca `0`.

## Pesos — Profile Score (Fases 3+)

Usado quando CV e LinkedIn existirem:

- CV 57
- LinkedIn 43

(Equivalente a 20:15 do score completo, renormalizado.)

## Pesos — Readiness Score completo (depois da Fase 4)

| Dimensão | Peso | Fonte |
| --- | --- | --- |
| CV | 20 | módulo currículo |
| LinkedIn | 15 | módulo LinkedIn |
| Inglês falado | 20 | recorte das transcricões RH + técnica + fit (não é TOEFL) |
| RH / STAR | 15 | entrevista RH |
| Técnica vibe | 20 | entrevista oral Vibe Engineering |
| Fit cultural | 10 | trilha genérica ou empresa |

Pesos são decisão de produto, não estatística empírica. Mudar exige ADR.

## Contrato de toda avaliação (D-010)

Toda avaliação persistida, de qualquer módulo, devolve:

1. `score` inteiro 0–100
2. exatamente 3 `strengths` com `claim` + `evidence` (citação do CV ou da transcrição)
3. exatamente 3 `improvements` ranqueadas, cada uma com `claim` + `example` reescrito
4. um único `nextStep` (string)

Não é hire/no-hire. Não é match contra uma vaga na v1.

Tipos canônicos: `src/lib/domain/evaluation.ts`.
