# Fase 4 — Entrevistas (código entregue)

**Status:** código no git (22 set 2026). Rodadas curtas conferidas. Rodada longa, pergunta extra e o tempo somado ainda sem conferência ao vivo — o autor abriu a Fase 5 mesmo assim.  
**Código:** permitido, limitado a RH + técnica oral (Vibe Engineering) + fit genérico, com timer, áudio e transcrição.  
**Não fez:** matching (feito depois, na Fase 5), viva voz contínuo, live code, copilot na call real, entrevista em português, pausar o timer.

## Objetivo

A pessoa treina **fala em inglês-US sob relógio** e sai com nota no mesmo contrato da Fase 3 (`assertEvaluation`):

1. Completa uma rodada de **RH** (STAR / behavioral).
2. Completa uma rodada **técnica oral** (Vibe Engineering, sem editor).
3. Completa uma rodada de **fit cultural genérico** (remoto/async — não é empresa nomeada).
4. Vê, para cada uma: nota 0–100, acertos com evidência na transcrição, melhorias com exemplo reescrito (quantas o artefato pedir — D-031), 1 próximo passo.
5. Quando CV, LinkedIn e as três entrevistas existem, o painel mostra o **Readiness Score** (pesos em `docs/product/score.md`, renormalizados — D-025). Um módulo que falta nunca vira zero.

## Por quê

D-006 já deu a primeira nota (perfil escrito). O gargalo da persona é **inglês falado sob pressão** (D-007, D-005). Sem esta fase o produto para no ATS e não treina a call.

## Experiência

### Entrada

- Precisa de perfil (Fase 2). Sem perfil → `/onboarding`.
- CV/LinkedIn **não** são obrigatórios para começar a falar (dimensão não medida não zera a entrevista). O Readiness composto só aparece com os cinco.
- Painel: RH, Técnica e Fit viram links. Desafio continua “em breve” (Fase 6).
- Rotas: `/interview/rh`, `/interview/tech_vibe`, `/interview/fit`.

### Antes de começar (tela da rodada)

Chrome ou Edge (API de fala do Chromium). Microfone obrigatório. A pessoa lê, em português ou inglês da UI:

- A **pergunta** (texto e áudio) é inglês-US.
- A **resposta** tem que ser falada em inglês-US.
- O timer **não pausa**. Fechar a aba não zera o relógio: a sessão `running` guarda `startedAt` e é retomada (inclusive nos 30s de graça).
- Feedback escrito sai no `uiLocale`. Transcrição **não** aparece durante a fala.

Botão **Começar** pede confirmação (“tem certeza?”). Só então pede o microfone e dispara o timer.

### Durante

1. Pergunta aparece em inglês. TTS (`speechSynthesis`, `en-US`) lê em voz alta. Dá para ouvir de novo.
2. Gravação + transcrição em segundo plano (MediaRecorder + SpeechRecognition). O Chrome costuma parar no silêncio: reiniciamos a captura até a pessoa avançar.
3. A UI mostra **barras de frequência**, não o texto falado (D-029).
4. Sete perguntas de RH, cinco de técnica e seis de fit, banco fixo em inglês-US (D-035). Depois de cada resposta do banco pode haver uma pergunta extra (D-033).
5. **Parar** cancela sem nota. **Reiniciar** descarta e começa do zero. Os dois pedem confirmação. Não há pausa.
6. **Encerrar e avaliar** congela o relógio em 0:00 na hora e abre uma barra de 0 a 100% até essa requisição terminar. A nota (Anthropic) só começa aqui. Trocar de pergunta não avalia, não mostra essa barra e não espera o upload do áudio. Depois de uma resposta do banco, com tempo oficial ainda correndo, o relógio para enquanto o modelo decide se faz uma pergunta extra (D-033).
7. Se o timer oficial zera: **30 segundos extras** (D-026). No fim da graça, enviamos o que já foi dito na pergunta em curso.

Não há botão pausa. Não há editor de código. Não há chat com a IA durante a fala (isso seria viva voz — Fase 6).

### Depois

- Anthropic repara pontuação/termos da stack na transcrição (sem inventar fala) e avalia contra a rubrica **desta** etapa (RH ≠ técnica ≠ fit).
- A página mostra **perguntas + transcrições** e depois a nota no contrato. `assertEvaluation` antes de gravar.
- Sem chave ou JSON inválido: erro visível, sem nota inventada.
- Botão para **recomeçar** (nova sessão, novo timer). Histórico em `evaluations.json`.

### Painel

- Profile Score: igual à Fase 3 (só CV+LinkedIn).
- Readiness Score: número só com CV + LinkedIn + RH + técnica + fit. Senão “Não medido” ou “Parcial”.
- Próximo passo: o primeiro módulo oral que falta; se os três existem, texto aponta para a Fase 5 (ainda não implementada).

## Formato da rodada

| Módulo | Duração | Perguntas | Foco |
| --- | --- | --- | --- |
| `rh` | 30 min | 7 | Abertura, STAR, contrato e overlap, pushback |
| `tech_vibe` | 45 min | 5 | IA no fluxo, bug, herança de sistema, desenho falado, revisão de sugestão — **oral** |
| `fit` | 45 min | 6 | Remoto async, visibilidade, ownership, feedback escrito, corte de escopo, confiança |

A rodada curta (RH 5 min/3, técnica 8 min/3, fit 5 min/3) foi a validação e já foi conferida. Sessão `running` antiga guarda o relógio e as perguntas com que começou.

Base do formato vigente:

| Módulo | Base |
| --- | --- |
| `rh` | Tela de recrutador de engenharia: 20–30 min; o miolo cabe em ~5 perguntas, a call real chega a ~7–10 com logística ([OneShot](https://coach.oneshothiring.com/guides/software-engineer-hr-screen), [Pass4Sure](https://pass4-sure.us/interviews/hr-recruiter/recruiter-phone-screen-what-they-are-assessing-and-how-to-pass)). |
| `tech_vibe` | Rodada técnica de mercado: 45–60 min, em geral 1–2 problemas **com editor** ([InterviewCrafted](https://interviewcrafted.com/essays/interview-rounds-at-top-companies), [GhOst](https://www.ghostai.one/blog/what-is-a-technical-screen)). Aqui não há editor (D-012): o mesmo relógio vira 5 falas longas. |
| `fit` | Behavioral / hiring manager: 45–60 min ([InterviewCrafted](https://interviewcrafted.com/essays/interview-rounds-at-top-companies)). 6 perguntas, não um questionário de 10 rasas. |

Perguntas do banco são texto travado em inglês-US (D-023, D-035). O avaliador recebe o perfil (stack, mercados) para julgar se a resposta usa o contexto da pessoa.

### Pergunta extra (D-033)

- O banco continua inteiro, na ordem.
- Após cada resposta do banco, o modelo pode acrescentar **uma** pergunta, em inglês-US, só se achar que a resposta pede aprofundamento na lente da etapa.
- Não gera pergunta sobre essa extra. Não interrompe a fala. Não avalia no meio.
- O relógio fica parado enquanto a extra é decidida e lida. A captura começa depois da leitura.
- Tempo oficial já em zero: não abre pergunta nova.
- Sem chave: segue o banco, sem inventar pergunta.
- No fim, a nota cobre banco e extras.
- Cada extra nova soma ao tempo oficial o que o modelo espera para a resposta (30–120 s). Sem número, soma 60 s (D-034). Isso ainda não foi conferido ao vivo.

## Rubrica — RH (100)

| Critério | Peso | Alto | Baixo |
| --- | --- | --- | --- |
| STAR / estrutura | 30 | Situação, ação, resultado, na ordem | História vaga, sem resultado |
| Inglês falado | 25 | Compreensível sob tempo, pouco calque | Português, travas que derrubam a call |
| Ownership | 25 | Decisão e consequência | “a gente”, culpa no outro |
| Especificidade | 20 | Números, nomes de sistema, o que *você* fez | Clichê de livro de entrevista |

## Rubrica — Técnica vibe (100)

| Critério | Peso | Alto | Baixo |
| --- | --- | --- | --- |
| Raciocínio oral | 30 | Hipóteses, próximo passo, trade-off | Lista de buzzwords |
| Uso de IA | 25 | Sabe o que delega e o que revisa | “o Copilot resolve” ou recusa total sem critério |
| Inglês falado | 25 | Explica sistema em inglês-US | Não sustenta a explicação |
| Calibração pleno | 20 | Escopo de mid-level, não arquitetura de staff | Junior demais ou teatro de sênior |

Isto **não** é live code (D-012). Não pedimos para abrir editor.

## Rubrica — Fit (100)

| Critério | Peso | Alto | Baixo |
| --- | --- | --- | --- |
| Remoto / async | 30 | Visibilidade sem daily, overlap consciente | Só “eu gosto de home office” |
| Inglês falado | 25 | Tom de colega, não de apresentação decorada | Resposta decorada em PT no meio |
| Valores | 25 | Desacordo + seguir o time, ownership | “eu sempre estou certo” |
| Especificidade | 20 | Caso real | Manifesto genérico |

Não simulamos Amazon/Google com nome (D-024). Matching de empresa é Fase 5.

## Contrato de saída (obrigatório)

Igual à Fase 3: `assertEvaluation` antes de persistir. `claim`/`evidence`/`example`/`nextStep` no `uiLocale`. Evidência cita trecho da **transcrição** (ou marca paráfrase). `example` é uma fala reescrita em inglês-US que a pessoa poderia usar na call.

## Stack desta fase

| Escolha | Por quê |
| --- | --- |
| Turnos pergunta→resposta, não call contínua | D-021. Viva voz é Fase 6. |
| `speechSynthesis` + `SpeechRecognition` (Chromium) + MediaRecorder | D-022. Sem nova chave paga. Áudio fica na máquina. |
| Anthropic só na transcrição | Já existe (D-017). Não envia o arquivo de áudio. |
| Banco fixo de perguntas | D-023. Pergunta extra (D-033) no máximo uma por resposta do banco. |
| JSON em `data/` + `data/audio/` | D-009, gitignored. |
| Timer no cliente com âncora `startedAt` no servidor | D-007: refresh não pausa. Encerrar congela. Graça de 30s (D-026). |
| Transcrição editável + reparo leve Anthropic | D-028. Sem Whisper pago. |

## Dados

`data/interview-sessions.json` (gitignored):

```ts
{
  items: Array<{
    id: string
    module: "rh" | "tech_vibe" | "fit"
    startedAt: string
    durationSec: number
    questions: Array<{ id: string; text: string }>
    answers: Array<{ questionId: string; transcript: string }>
    status: "running" | "submitted" | "abandoned"
  }>
}
```

`data/audio/*.webm` — backup local em Opus, escrito em pedaços de cerca de 1 s. A nota usa a transcrição. Uma resposta longa não precisa caber num único envio.

`evaluations.json.items[]` ganha `module: "rh" | "tech_vibe" | "fit"`.

Readiness (só UI, não é um `module`):

`round((cv*20 + linkedin*15 + rh*15 + tech_vibe*20 + fit*10) / 80)`

quando os cinco existem (D-025).

## Fora desta fase

- Viva voz contínuo / interrupção da IA no meio da fala (Fase 6)
- Fit contra empresa famosa nomeada / matching (Fase 5)
- Live code, Monaco, juiz
- Copilot na entrevista real (D-016)
- STT/TTS pagos (Whisper, ElevenLabs) — exigiria ADR
- App mobile, auth, deploy
- Pausar o timer
- Entrevista em português

## Critério de saída

1. Sem microfone ou sem Chromium: erro claro, sem nota inventada.
2. Sem API key: erro claro na hora de pontuar.
3. Timer visível, sem pausa; **Encerrar** congela em 0:00; zerar o tempo oficial abre 30s de graça e depois avalia.
4. Pergunta em inglês-US no texto e no áudio; resposta esperada em inglês-US.
5. Cada um dos três módulos gera avaliação válida no contrato.
6. Dashboard: notas nos módulos; Readiness só com os cinco; Profile Score continua só CV+LI.
7. Recomeçar cria sessão nova (histórico append).
8. Docs atualizados. Nenhuma rota de matching ou viva voz.
9. Pergunta extra (D-033) **não** entra neste critério. Entra depois do reteste das três rodadas curtas, ainda na Fase 4, antes da Fase 5.

## Riscos

- SpeechRecognition é frágil (sotaque, Chrome). Áudio local fica de backup; a nota ainda depende da transcrição.
- Sem Chromium a fase não roda — esperado na v1.
- Modelo pode ser gentil demais com transcrição pobre: o prompt pede rigor de call real.
- Custo: 1 call Anthropic por rodada.
