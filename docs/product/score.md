# Score

## O que 0 e 100 significam

- **0** = não aplique ainda (perfil escrito ou fala derrubam o processo).
- **100** = perfil no padrão internacional **e** consegue sustentar uma entrevista de pleno em inglês-US sob tempo.

## Regra crítica

Dimensão **não medida não vale zero**. Antes das entrevistas, o produto mostra só o **Profile Score** (CV + LinkedIn). Um “Readiness 47” inflado para baixo por buracos ainda não avaliados é mentira.

Na Fase 3, CV e LinkedIn passam a ser medidos. O composto **Profile Score** só aparece quando os dois existem. Um módulo sozinho mostra a nota dele, nunca zera o outro.

## Pesos — Profile Score (Fase 3)

Usado quando CV e LinkedIn existirem:

- CV 57
- LinkedIn 43

(Equivalente a 20:15 do score completo, renormalizado.)

## Pesos — Readiness Score (Fase 4)

Quando CV, LinkedIn, RH, técnica e fit existem (D-025):

`round((cv*20 + linkedin*15 + rh*15 + tech_vibe*20 + fit*10) / 80)`

A linha “Inglês falado 20” do desenho completo **não** é um sexto módulo nesta fase: cada entrevista já pesa inglês na rubrica. Um recorte dedicado exigiria ADR. Dimensão que ainda falta (desafio, matching) **não** entra como zero.

## Pesos — Readiness Score completo (visão, depois das falas + inglês dedicado)

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
2. um ou mais `strengths` com `claim` + `evidence` (citação do CV ou da transcrição) — sem cota (D-031)
3. um ou mais `improvements` ranqueadas, cada uma com `claim` + `example` reescrito — sem cota
4. um único `nextStep` (string)

Não é hire/no-hire. Não é match contra uma vaga na v1.

Tipos canônicos: `src/lib/domain/evaluation.ts`.
