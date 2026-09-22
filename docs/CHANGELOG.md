# Changelog

Eventos do projeto, do mais recente para o mais antigo. Fatos, não planos.

## 2026-09-22 — Fase 5 conferida

- O autor validou ao vivo o questionário direto do perfil e o rótulo de live code por empresa. Com canais, empresas e cursos já conferidos no mesmo dia, a Fase 5 fecha.
- Fica anotada, sem código, a próxima tarefa: perguntas indiretas que pré-preenchem o perfil, com o perfil editável depois (D-044).

## 2026-09-22 — Rótulo de live code por empresa

- Cada empresa em `/matching` mostra a política pública de IA na prova: proibida, permitida, esperada ou mista. Sem página pública, o convite da vaga é a regra. O rótulo não esconde o card e não abre editor (D-043).

## 2026-09-22 — Questionário opcional no perfil

- O perfil ganha um bloco opcional: faixa, visto, tipo de empresa, IC ou gestão e domínio (D-042). Em branco, canais e empresas seguem como antes.
- Tipo e domínio filtram empresa. Rede filtra Arc, Turing, Toptal e Gun.io. Faixa não esconde card. Remoto sem visto marca a triagem dos EUA como cedo quando já existe Readiness. Gestão avisa que o catálogo é IC e entra na avaliação.

## 2026-09-22 — Cursos e ícone nos termos

- `/matching` ganha cursos com URL. A stack escolhe; inglês falado entra sempre. Mercado, contrato e nota não escondem o curso (D-040).
- Termo que não é óbvio ganha um ícone. Passar o mouse (ou focar) explica o que é e onde entra. Vale para o que já está na tela e para visto, IC ou gestão, domínio e live code (D-041).

## 2026-09-22 — Aviso em cada salvamento

- Salvar o perfil de novo, avaliar de novo ou encerrar a entrevista de novo mostra o aviso outra vez. O primeiro não esconde os seguintes.

## 2026-09-22 — Tema no header e aviso em cada ação

- O header tem o ícone de tema claro/escuro, à direita. A escolha fica neste navegador.
- Salvar perfil, avaliar currículo, avaliar LinkedIn e encerrar entrevista mostram sucesso ou erro. Falha de microfone, de áudio de backup, de pergunta extra ou de cancelamento também avisa (D-039).

## 2026-09-22 — Quadro de matching conferido

- Canais e empresas foram conferidos ao vivo nos recortes de contrato longo, longo com freela, só freela, contrato curto e um mercado só.

## 2026-09-22 — Empresas no matching, pelo contrato do perfil

- `/matching` ganha empresas agrupadas por contrato longo e freela. O perfil filtra. Processo direto fica para agora a partir de 60; processo longo fica cedo abaixo de 60, depois entre 60 e 74, e para agora a partir de 75 (D-038). Contrato curto não tem empresa neste catálogo.

## 2026-09-22 — Matching segue freela e contrato do perfil

- Canal de freela só aparece com freela marcado. Canal de contrato longo só aparece com contrato longo marcado. Os dois marcados juntam os dois, e o canal que serve aos dois explica os dois movimentos (D-037).

## 2026-09-22 — Fase 5 aberta no quadro de canais

- `/matching` lista plataformas que cruzam mercado e contrato do perfil. Cada uma traz o movimento e três passos de como prospectar (D-036). Sem Readiness, a lista não inventa ritmo. Empresas, cursos e questionário continuam fora deste corte.

## 2026-09-22 — Entrevistas no tempo de uma call real

- RH passa a 30 min e 7 perguntas. Técnica oral, 45 min e 5. Fit, 45 min e 6. Banco continua fixo em inglês-US (D-035). Rodada já aberta não muda no meio.

## 2026-09-22 — Pergunta extra soma tempo ao relógio

- Cada pergunta extra nova alonga o tempo oficial com os segundos que o modelo espera para a resposta (30–120). Sem número, soma 60 s. D-034. Conferência ao vivo fica para depois.

## 2026-09-21 — Pergunta extra depois da resposta do banco

- D-033 no código: no máximo uma pergunta, em inglês-US, só se a resposta pedir. Sem encadear. Relógio parado enquanto ela é decidida e lida. Sem chave, segue o banco. Nota só no encerramento.

## 2026-09-21 — Painel mostra feito e faltando em cada score

- Profile Score, Readiness e a lista de módulos marcam cada parte como feita (com a nota) ou faltando. Desafio continua “em breve”.

## 2026-09-21 — Rodadas curtas das três entrevistas feitas

- RH, técnica e fit geraram nota no contrato. O painel mostra Readiness. A Fase 4 segue aberta para a pergunta extra (D-033).

## 2026-09-21 — Barra de 0 a 100% no envio final

- No clique de Encerrar e avaliar, RH, técnica e fit mostram o quanto da requisição já foi e o quanto falta. A barra some nas trocas de pergunta.

## 2026-09-21 — Pergunta extra fica para depois da validação curta

- D-033: depois de cada resposta do banco, o modelo poderá fazer no máximo uma pergunta, se couber. Sem código agora. Ainda na Fase 4, antes da Fase 5. Não é a conversa contínua da Fase 6.

## 2026-09-21 — Áudio da resposta em pedaços

- A gravação já sai em Opus (~32 kbps). Cada segundo é gravado no arquivo local, então o tamanho da resposta não depende de um único envio.
- A nota continua na transcrição. Falha no arquivo de backup não invalida a entrevista.

## 2026-09-21 — Troca de pergunta sem esperar áudio nem nota

- Entre perguntas a tela não espera upload nem Anthropic. A avaliação continua só no encerramento.
- O 500 `Body exceeded 1 MB limit` era o áudio de backup, não a nota. Limite da Server Action sobe para 12mb.

## 2026-09-21 — Avaliação sem cota de 3+3

- `assertEvaluation` aceita quantos acertos e melhorias o artefato pedir (mínimo 1 de cada). D-031 substitui a cota de D-010/D-030.
- Rodadas de entrevista continuam 5/8/5 min e 3 perguntas, para validar rápido. Alvo realista anotado na spec da Fase 4: RH 30 min/7, técnica oral 45 min/5, fit 45 min/6.

## 2026-09-18 — Entrevista: sem texto ao vivo

- Durante a fala: barras de frequência; transcrição escondida (D-029).
- Depois de encerrar: perguntas + respostas transcritas, então a nota.
- Melhorias 3+3+1 passam a cobrir corrigir / adicionar / remover quando o artefato justificar (D-030), em CV, LinkedIn e entrevistas.
- Matching, cursos e questionário de busca ficam no esboço da Fase 5.

## 2026-09-17 — Fase 4: correções depois do teste de RH

- Transcrição editável; STT reinicia no silêncio; reparo leve de pontuação/termos da stack no Anthropic, sem inventar fala (D-028).
- Confirmar **Começar**; **Parar** e **Reiniciar** com confirmação; abortar não gera nota (D-027).
- **Encerrar** congela o timer na hora. Ao zerar o tempo oficial, 30s extras e envio do que já foi dito (D-026).

## 2026-09-17 — Fase 4 iniciada: entrevistas faladas

- Spec profunda em `docs/phases/04-interviews.md`. Fase 3 arquivada como encerrada.
- Rotas `/interview/rh`, `/interview/tech_vibe`, `/interview/fit`: timer sem pausa, pergunta em inglês-US, gravação + transcrição no browser, nota via Anthropic + `assertEvaluation`. Refresh retoma a sessão `running` pelo `startedAt`.
- D-021 a D-025: turnos (não viva voz), TTS/STT local, banco fixo, fit genérico, Readiness renormalizado em 80.

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
