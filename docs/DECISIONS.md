# Decisões

Formato: número, data, status, contexto, decisão, porquê, consequências. Não apagar decisões velhas — marcar `superseded` e apontar para a nova.

---

## D-001 — Ferramenta pessoal, não startup

- **Data:** 16 set 2026
- **Status:** vigente
- **Contexto:** Fase 1, pergunta bloqueante de intenção.
- **Decisão:** O produto é ferramenta para o autor (e talvez amigos). Sem waitlist, Stripe, marketing, plano gratuito vs pago.
- **Por quê:** Monetização agora distorce o MVP. A dor real é o próprio processo seletivo, não um negócio.
- **Consequências:** Sem auth de multi-tenant. Sem landing pública obrigatória. Dados podem viver na máquina. Fase 2 do plano original citava “auth”; isso ficou **inválido** — ver D-008.

## D-002 — Só web na v1 (Next.js)

- **Data:** 16 set 2026
- **Status:** vigente
- **Decisão:** Canal = Next.js. Expo / React Native só numa fase posterior (Fase 6, esboço).
- **Por quê:** CV/LinkedIn são melhores no desktop; entrevista por áudio funciona no browser depois; um canal só até validar o loop nota+feedback.
- **Consequências:** Nada de React Native, stores, microfone nativo.

## D-003 — Pleno como único foco da v1

- **Data:** 16 set 2026
- **Status:** vigente
- **Decisão:** Senioridade inicial = pleno (3–7 anos). Júnior fora. Sênior não é persona primária.
- **Por quê:** Melhor fit para remoto internacional; júnior sofre filtro extra de visto/experiência que o produto não resolve.
- **Consequências:** Campo `seniority` no perfil é `pleno` e não é um seletor aberto na v1.

## D-004 — Mercado = qualquer empresa de língua inglesa

- **Data:** 16 set 2026
- **Status:** vigente
- **Decisão:** US, UK, CA, EU, AU — sem priorizar um país no produto.
- **Por quê:** A entrevista é em inglês-US de qualquer forma; matching fino de país é Fase 5.
- **Consequências:** Perfil guarda `targetMarkets` como lista, não um enum único obrigatório.

## D-005 — Idiomas

- **Data:** 16 set 2026
- **Status:** vigente
- **Decisão:** UI e transcrição: o usuário escolhe a qualquer momento (`pt-BR` ou `en-US`). Entrevista (texto na tela, áudio da pergunta, resposta falada) = **100% inglês-US**.
- **Por quê:** A call real é em inglês. Feedback escrito pode ser na língua da UI para ser acionável. Transcrição exibida pode ser traduzida/legendada na UI; o áudio original não.
- **Consequências:** Fase 2 já persiste `uiLocale` e `transcriptLocale`. TTS/STT só na Fase 4, sempre EN-US na captura.

## D-006 — Primeira nota útil = CV + LinkedIn

- **Data:** 16 set 2026
- **Status:** vigente
- **Decisão:** Time-to-value = bloco de perfil (Fase 3). Não começa pela entrevista.
- **Por quê:** Sem microfone, sem conta, filtro real do processo (ATS + busca passiva) acontece antes da call. Entrevista sem perfil calibrado gera nota menos útil.
- **Consequências:** Fase 2 só deixa o lugar da nota (“não medido”). Fase 3 é o primeiro módulo avaliável.

## D-007 — Entrevista cronometrada, sem pausa, áudio + transcrição

- **Data:** 16 set 2026
- **Status:** vigente; implementado na Fase 4
- **Decisão:** Pergunta audível + gravação da resposta. Timer global **não pausa**. Gravar e transcrever perguntas e respostas. Viva voz contínuo (call com IA) só depois.
- **Por quê:** A pressão do relógio é o treino. Pausar mentiria o cenário real.
- **Consequências:** Proibido “modo relaxado”. Rodada curta (5 ou 8 min) ainda sem pausa. O relógio ancora em `startedAt` no servidor: fechar a aba não zera o tempo; a sessão `running` é retomada. **Encerrar** congela o countdown na hora. Ao zerar o tempo oficial, há 30s extras (D-026) — isso não é pausa.

## D-008 — Sem autenticação na Fase 2

- **Data:** 16 set 2026
- **Status:** vigente
- **Contexto:** O plano da Fase 1 listava “auth” na fundação. Isso era esboço, anterior a D-001.
- **Decisão:** Um único perfil local. Sem login, OAuth, magic link, sessão.
- **Por quê:** Um usuário na máquina. Auth é custo e teatro.
- **Consequências:** Qualquer um com o `npm run dev` neste computador vê os dados. Aceitável para ferramenta pessoal. Se um dia virar multi-user, esta decisão é revertida **antes** de expor a rede.

## D-009 — Persistência = JSON local, não SQLite/Postgres

- **Data:** 16 set 2026
- **Status:** vigente até haver motivo para migrar
- **Decisão:** `data/profile.json` e `data/evaluations.json` via repositório server-side. Interface de repositório isolada do resto do app.
- **Por quê:** Ferramenta pessoal no Windows. `better-sqlite3` exige toolchain nativo. Postgres é overkill. JSON é inspecionável e fácil de backup.
- **Consequências:** Sem queries complexas. Volume baixo (um perfil, dezenas de avaliações). Fase 3+ pode trocar o adapter sem mudar UI, se o contrato em `src/lib/domain` permanecer.

## D-010 — Contrato de avaliação é a espinha, mesmo sem nota ainda

- **Data:** 16 set 2026
- **Status:** vigente na forma (nota, evidência, exemplo, nextStep, não medido ≠ 0). A contagem fixa de 3+3 foi substituída por D-031.
- **Decisão:** Todo módulo futuro implementa o mesmo formato: `score` 0–100, 3 acertos com evidência, 3 melhorias ranqueadas com exemplo, um `nextStep`. Dimensão não medida **não vale zero**.
- **Por quê:** Sem isso, cada fase inventa um JSON diferente e o dashboard vira gambiarra.
- **Consequências:** Código da Fase 2 já declara os tipos. Nenhuma avaliação é gerada ainda (lista vazia). Dashboard trata vazio como “não medido”, não como 0.

## D-011 — Sem LLM, upload de CV, áudio ou matching na Fase 2

- **Data:** 16 set 2026
- **Status:** superseded por D-017 (LLM na Fase 3) e D-022 (áudio na Fase 4). Matching continua fora (Fase 5).

- **Decisão:** Fundação não chama modelo, não parseia PDF, não pede microfone.
- **Por quê:** Método do projeto: só a fase atual. CV é Fase 3. Entrevista é Fase 4.
- **Consequências:** Módulos no dashboard aparecem travados/“em breve”, exceto perfil (editável).

## D-012 — Sem live code no produto (visão)

- **Data:** 16 set 2026
- **Status:** vigente
- **Decisão:** Não há editor/juiz de código. Desafio futuro = enunciado + tempo + onde fazer + plano oral.
- **Por quê:** Live code é caro de construir e o diferencial é Vibe Engineering **falada**. Mercado de IA no live code está misto — isso vira curadoria (Fase 5), não um CoderPad.
- **Consequências:** Não instalar Monaco, Judge0, etc.

## D-013 — Nome comercial adiado; pasta `dev-gringa`; UI “Prontidão”

- **Data:** 16 set 2026
- **Status:** vigente
- **Decisão:** Não batizar o produto agora. Repo = `C:\Daniel\Developer\dev-gringa`. Chrome da UI usa o rótulo funcional “Prontidão”.
- **Por quê:** Nome cedo trava identidade à toa. Pasta precisa existir hoje.
- **Consequências:** Metadata, `<title>` e docs usam “Prontidão” / “dev na gringa” como descritores.

## D-014 — Método de fases (aprofundar só a atual)

- **Data:** 16 set 2026
- **Status:** vigente
- **Decisão:** Visão completa em esboço. Spec profunda + código **somente** da fase marcada em STATUS. Cada fase seguinte é reaberta e aprofundada na hora dela.
- **Por quê:** Evita desenhar entrevistas, TTS e matching no papel agora e construir errado.
- **Consequências:** Só a fase marcada em STATUS recebe spec profunda e código novo. `phases/01`–`04` já foram aprofundadas quando eram atuais; `05`–`06` continuam esboço. Detalhar a próxima fase cedo viola o método.

## D-015 — Documentação vive no git do produto

- **Data:** 16 set 2026
- **Status:** vigente
- **Decisão:** `docs/` neste repositório é a memória permanente. Canvas Cursor e Agent Stores são rascunho.
- **Por quê:** A Fase 1 quase ficou presa numa pasta temp do Cursor.
- **Consequências:** Toda sessão que decidir algo atualiza `docs/`. Regra em `.cursor/rules/`.

## D-016 — Copilot de entrevista real é anti-escopo ético

- **Data:** 16 set 2026
- **Status:** vigente
- **Decisão:** Não construir modo stealth / respostas ao vivo na call verdadeira (o que o Final Round AI vende).
- **Por quê:** Não é o produto. Contamina posicionamento e risco.
- **Consequências:** Qualquer feature “ajudar durante a entrevista real” é recusada, mesmo como “opcional”.

## D-017 — Anthropic gera as avaliações de CV e LinkedIn

- **Data:** 17 set 2026
- **Status:** vigente (CV/LinkedIn na Fase 3; transcrições de entrevista na Fase 4 — D-022)
- **Decisão:** Fase 3 chama a API Anthropic (default `claude-sonnet-4-6`, override `ANTHROPIC_MODEL`). A saída é validada por `assertEvaluation` antes de persistir. Sem chave, não há nota.
- **Por quê:** Feedback com evidência e exemplo reescrito não cabe numa rubrica só de regex. Autor escolheu Anthropic. Sonnet 4 (`claude-sonnet-4-20250514`) aposentou em jun/2026.
- **Consequências:** `.env` obrigatório para pontuar. Custo por reavaliação. A restrição “sem LLM em entrevista” valia só enquanto a Fase 3 era a atual; a Fase 4 envia transcrição (não o áudio) ao mesmo pipeline.

## D-018 — CV entra como texto e/ou PDF; não reescrevemos o arquivo

- **Data:** 17 set 2026
- **Status:** vigente
- **Decisão:** Colar texto e/ou upload de PDF (extração `unpdf`). O produto devolve gaps e um exemplo reescrito **no feedback**, não um novo PDF para candidatura.
- **Por quê:** Time-to-value. Gerar kit de candidatura é o território do prepara.cv (anti-escopo).
- **Consequências:** Scan/imagem sem camada de texto falha de forma explícita.

## D-019 — LinkedIn é colar Headline + About + experiências, sem OAuth

- **Data:** 17 set 2026
- **Status:** vigente
- **Decisão:** Três campos de texto. Sem login LinkedIn, sem scrape de URL.
- **Por quê:** OAuth é escopo e conta de app. URL pública costuma vir bloqueada. Colar é suficiente para ferramenta pessoal.
- **Consequências:** A pessoa copia do próprio perfil. A UI explica com texto claro e balões de ajuda. Não prometemos “cole o link e magia”.

## D-020 — Segredos em `.env`; `.env.example` só com nomes

- **Data:** 17 set 2026
- **Status:** vigente
- **Decisão:** Valores reais (`ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`) ficam em `.env`. `.env.example` só documenta os nomes. Não exigimos `.env.local`.
- **Por quê:** Next.js carrega `.env` em todos os ambientes. `.env.local` também funciona e sobrescreve `.env`, mas o autor já criou `.env`. Um arquivo só, gitignored.
- **Consequências:** `.env` nunca vai para o git. Depois de criar ou editar `.env`, o `npm run dev` precisa ser reiniciado. `.env.example` pode (e deve) ser commitado.

## D-021 — Entrevista em turnos; viva voz contínuo é Fase 6

- **Data:** 17 set 2026
- **Status:** vigente
- **Decisão:** Cada pergunta toca, a pessoa responde gravando, depois avança. Não há conversa contínua com a IA no meio da fala.
- **Por quê:** D-007 pede pergunta audível + gravação. Call fluida é outro produto (Fase 6) e outro risco de “copilot”.
- **Consequências:** Sem stream de diálogo. Sem a IA interromper a resposta.

## D-022 — TTS/STT no browser; Anthropic só vê transcrição

- **Data:** 17 set 2026
- **Status:** vigente
- **Decisão:** Pergunta em voz = `speechSynthesis` en-US. Resposta = MediaRecorder + `SpeechRecognition` (Chromium). Arquivo em `data/audio/`. A API Anthropic recebe texto, não o áudio.
- **Por quê:** Ferramenta pessoal; o autor não quis nova assinatura paga. Áudio não sai para um segundo vendor de STT.
- **Consequências:** Chrome/Edge. Sotaque pode quebrar a transcrição. A pessoa pode editar o texto na hora; um reparo leve no Anthropic tenta pontuação e termos da stack sem inventar conteúdo (D-028). Whisper/ElevenLabs exigiria ADR e chave nova.

## D-023 — Banco fixo de perguntas em inglês-US

- **Data:** 17 set 2026
- **Status:** vigente
- **Decisão:** 3 perguntas por módulo, texto travado no repo. O LLM não inventa a pergunta; só avalia a transcrição (e o perfil).
- **Por quê:** Barato, repetível, inglês estável. Gerar pergunta via modelo na hora mistura falha de geração com falha de fala.
- **Consequências:** A pessoa pode “decorar” o banco. A cota de 3 perguntas era só a validação; o banco vigente está em D-035. Pergunta extra: D-033.

## D-024 — Fit desta fase é genérico, sem empresa nomeada

- **Data:** 17 set 2026
- **Status:** vigente
- **Decisão:** Perguntas de remoto/async/ownership. Não simulamos Amazon, Google, etc. pelo nome.
- **Por quê:** Empresa famosa é matching (Fase 5) e vira teatro. O gap da persona agora é sustentar inglês sob tempo.
- **Consequências:** Módulo `fit` não recebe um seletor de empresa.

## D-025 — Inglês falado entra nas rubricas orais; Readiness sem 6ª nota zerada

- **Data:** 17 set 2026
- **Status:** vigente
- **Decisão:** Não criamos `ModuleId` de inglês falado. Cada entrevista já pesa inglês (~25). O Readiness Score só aparece com CV+LinkedIn+RH+técnica+fit: `round((cv*20 + li*15 + rh*15 + tech*20 + fit*10) / 80)`.
- **Por quê:** Uma 4ª avaliação só de sotaque seria outro passo e outro custo. Punir o composto com 20 pontos “não medidos” violaria D-010.
- **Consequências:** A linha “Inglês falado 20” de `score.md` fica **dentro** das três orais nesta fase. Recorte dedicado exigiria ADR.

## D-026 — 30 segundos de graça quando o timer zera

- **Data:** 17 set 2026
- **Status:** vigente
- **Contexto:** Teste ao vivo da Fase 4 (RH). Encerrar no zero cortava a última fala.
- **Decisão:** O tempo oficial não pausa. Quando chega a 0:00, a pessoa ganha **30 segundos extras**. No fim desse acréscimo (ou se encerrar antes), enviamos o que já foi transcrito/corrigido, inclusive a pergunta em curso.
- **Por quê:** Pressão do relógio permanece; um corte seco no último segundo punia quem estava no meio da frase.
- **Consequências:** Não é botão de pausa. O composto de tempo da rodada passa a ser duração + 30s no máximo. Refresh no meio da graça continua no `startedAt` + duração + 30s.

## D-027 — Confirmar começar; parar e reiniciar com confirmação

- **Data:** 17 set 2026
- **Status:** vigente
- **Contexto:** Teste ao vivo. Começar disparava o timer sem um segundo clique; não havia saída depois de iniciar.
- **Decisão:** **Começar** pede confirmação. Durante a rodada existem **Parar** (cancela sem nota) e **Reiniciar** (descarta e começa do zero), cada um com confirmação. Isso não pausa o timer.
- **Por quê:** Timer sem pausa continua verdadeiro; abortar a sessão é diferente de pausar.
- **Consequências:** Sessão abortada vira `abandoned` e não entra em `evaluations.json`.

## D-028 — Transcrição editável + reparo leve; STT continua no Chromium

- **Data:** 17 set 2026
- **Status:** superseded por D-029
- **Contexto:** Teste ao vivo. SpeechRecognition errou pontuação, tom e termos técnicos (React, Expo, etc.).
- **Decisão:** A transcrição é um campo editável. O reconhecimento é reiniciado se o Chrome parar no silêncio. Na hora de pontuar, o Anthropic pode só reparar pontuação/gramática e nomes da stack que soem como o texto cru — sem inventar fala. Sem vendor novo de STT.
- **Por quê:** D-022 vale: sem segunda assinatura. A qualidade da nota depende do texto; o autor precisa poder corrigir o que o Chrome distorceu.
- **Consequências:** Superado: o autor não quer gastar o relógio editando texto.

## D-029 — Sem texto ao vivo; barras de áudio; transcrição só no fim

- **Data:** 18 set 2026
- **Status:** vigente
- **Contexto:** O campo editável durante a fala desviava atenção e gastava o timer.
- **Decisão:** Enquanto a pessoa fala, a UI **não** mostra o texto. Só barras de frequência (Web Audio) para provar que o microfone capta. STT + reparo leve continuam em segundo plano. Depois de encerrar, a página mostra cada pergunta com a transcrição (já reparada, se o reparo rodou) e a avaliação.
- **Por quê:** A call real não tem teleprompter da própria fala. Corrigir texto no relógio treina o documento, não a entrevista.
- **Consequências:** A pessoa não corrige STT na hora. O reparo Anthropic (pontuação/termos da stack, sem inventar) e as rubricas carregam a qualidade da nota.

## D-030 — Melhorias cobrem corrigir + adicionar + remover, ainda em 3+3+1

- **Data:** 18 set 2026
- **Status:** superseded por D-031 (os três tipos de movimento continuam; a cota de exatamente 3 não).
- **Contexto:** Feedback só no que já estava escrito/falado omitia o que falta e o que sobra.
- **Decisão:** O contrato continua `assertEvaluation` (3 acertos, 3 melhorias ranqueadas, 1 nextStep). As 3 melhorias, quando o artefato justificar, cobrem: reescrever o que existe, **adicionar** o que falta, **remover** o que prejudica. Vale para CV, LinkedIn e as três orais.
- **Por quê:** Recrutador também julga omissão e ruído, não só o parágrafo ruim.
- **Consequências:** Slot sem “remover” real não inventa um. A cota de 3 foi retirada em D-031.

## D-031 — Sem cota de acertos e melhorias

- **Data:** 21 set 2026
- **Status:** vigente
- **Contexto:** O teto de 3+3 cortava o que o modelo via e inventava enchimento para fechar a cota.
- **Decisão:** `assertEvaluation` exige nota 0–100, pelo menos 1 acerto com evidência, pelo menos 1 melhoria com exemplo, ranks 1..n sem buraco, e 1 `nextStep`. Não há máximo. O modelo devolve quantos pontos o artefato pedir, na ordem do que mais ajuda esta pessoa (perfil salvo: senioridade, stack, mercados, contrato). Corrigir, adicionar e remover continuam sendo tipos de melhoria, sem cota de um de cada.
- **Por quê:** O julgamento útil varia por CV, por entrevista e pelo que a pessoa busca. Três é um formulário, não uma análise.
- **Consequências:** Avaliações antigas com exatamente 3 continuam válidas. Questionário opcional de objetivos ainda não existe (Fase 5); até lá o “o que busca” é o perfil salvo.

## D-032 — Backup de áudio em Opus, em pedaços

- **Data:** 21 set 2026
- **Status:** vigente
- **Contexto:** A resposta inteira ia num único envio e estourava o limite de 1 MB da Server Action. A pessoa pode falar o tempo que a resposta pedir.
- **Decisão:** A gravação sai em Opus (~32 kbps). Cada segundo é anexado ao arquivo em `data/audio/`. A nota não usa esse arquivo.
- **Por quê:** Compactar na captura é o formato certo para voz. Compactar de novo depois não tira o teto de um envio único. Pedacos pequenos não têm esse teto.
- **Consequências:** Falha num pedaço não cancela a entrevista. O arquivo é só backup.

## D-033 — Pergunta extra depois da resposta do banco

- **Data:** 21 set 2026
- **Status:** vigente
- **Contexto:** O banco fixo (D-023) treina o roteiro, mas uma call real aprofunda o que a pessoa acabou de dizer. O autor quer isso no produto, sem obrigar a fazer na rodada curta de validação.
- **Decisão:** Continua possível e fica na Fase 4, depois que RH, técnica e fit curtas forem retestadas, e antes da Fase 5. Cada pergunta do banco é dita. Em seguida o modelo pode fazer **no máximo uma** pergunta nova, em inglês-US, só se a resposta pedir aprofundamento na lente daquela etapa (RH, técnica ou fit). Se não couber, segue a próxima do banco. Não há pergunta sobre a pergunta extra. A nota continua só no encerramento e inclui essas falas.
- **Por quê:** Uma call de verdade não é um questionário cego. Encadear várias perguntas geradas vira a conversa contínua da Fase 6. Gerar no meio da validação curta atrasaria de novo a troca de pergunta, que acabou de deixar de esperar a IA.
- **Consequências:** Sem chave, não inventa pergunta: segue o banco. O relógio fica parado enquanto a pergunta extra é decidida e lida; a captura só começa depois da leitura. Se o tempo oficial já zerou (graça ou encerramento), não abre pergunta nova. O tempo somado por essa pergunta está em D-034.

## D-034 — Pergunta extra aumenta o timer

- **Data:** 22 set 2026
- **Status:** vigente, ainda sem conferência ao vivo
- **Contexto:** Uma pergunta extra no mesmo relógio da rodada curta cortava a resposta. O autor quer o tempo total alongado a cada pergunta que a IA fizer, e seguir o desenvolvimento antes de validar isso.
- **Decisão:** Cada pergunta extra nova soma ao tempo oficial os segundos que o modelo espera para aquela resposta. O número vem na mesma chamada que decide a pergunta. Vale de 30 a 120 segundos. Se o modelo não devolver um número, somam 60 segundos. A mesma extra não soma de novo.
- **Por quê:** O relógio deve caber a fala que a pergunta pede. Uma segunda chamada só para estimar o tempo não se paga.
- **Consequências:** A graça de 30 segundos continua no fim do tempo oficial já alongado. Sem tempo oficial restante, não há extra e não há acréscimo. Conferência ao vivo fica para depois.

## D-035 — Rodada no tempo de uma call real

- **Data:** 22 set 2026
- **Status:** vigente
- **Contexto:** As rodadas curtas (5/8/5 min, 3 perguntas) já foram conferidas. O alvo pesquisado estava só na spec.
- **Decisão:** RH dura 30 minutos e tem 7 perguntas. Técnica oral dura 45 minutos e tem 5. Fit dura 45 minutos e tem 6. O texto continua travado no repo, em inglês-US. O modelo não inventa essas perguntas.
- **Por quê:** A validação curta já cumpriu o papel. Uma call de recrutador, uma técnica sem editor e um fit de hiring manager não cabem em cinco ou oito minutos.
- **Consequências:** Sessão já em andamento guarda a duração e as perguntas com que começou. Pergunta extra (D-033) e o acréscimo de tempo (D-034) continuam valendo em cima deste banco. Conferência ao vivo desta rodada longa fica para depois.

## D-036 — Matching começa pelos canais, e a nota marca o ritmo

- **Data:** 22 set 2026
- **Status:** vigente
- **Contexto:** A Fase 4 está no código. A conferência ao vivo da rodada longa ainda não foi feita. O autor abriu a Fase 5 assim mesmo. O esboço pedia plataformas, o como prospectar, empresas, cursos e um questionário.
- **Decisão:** O primeiro corte é só canais. O perfil filtra mercado e contrato; canal sem interseção fica de fora. Cada canal tem um movimento — recrutador chega, candidatura seletiva, ou triagem da rede — e três passos. Sem Readiness, a lista é só pelo perfil. Com Readiness, a nota não esconde canal: abaixo de 60 a triagem fica cedo e o quadro é secundário; de 60 a 74 o quadro é principal e a triagem é secundária; de 75 em diante os três são principais. O catálogo é fixo no repo. Empresas, cursos com URL, questionário opcional e live code × IA continuam nesta fase, sem código neste corte.
- **Por quê:** O buraco imediato é “onde mando e de que jeito”. Tratar LinkedIn, quadro e Toptal como o mesmo gesto queima o canal. 60 é a linha em que o composto sustenta uma candidatura. 75 é a linha em que vale uma semana de teste. Esconder o canal cedo tira a explicação; marcar o ritmo deixa a pessoa ver por que ainda não é a hora.
- **Consequências:** `/matching` não chama Anthropic e não raspa vaga. A pessoa lê a linha de país no anúncio. A conferência da rodada longa da Fase 4 segue adiada e não trava este corte. O recorte freela × contrato está em D-037.

## D-037 — Freela e contrato seguem o que está marcado no perfil

- **Data:** 22 set 2026
- **Status:** vigente
- **Contexto:** O quadro já escondia canal sem interseção de contrato. O perfil desta máquina só tinha contrato longo, então Toptal e Gun.io não apareciam. O autor quer freela quando o perfil pede freela, contrato longo quando pede contrato longo, e os dois quando os dois estão marcados.
- **Decisão:** A lista oferece a união do que está marcado. Só freela: canais de freela, com os passos de freela. Só contrato longo ou curto: canais desse contrato, sem passos de freela. Os dois marcados: os dois conjuntos. Um canal que cobre os dois (LinkedIn, quadros, Arc) explica os dois movimentos no mesmo card. Contrato curto continua sendo um terceiro tipo, com a mesma regra.
- **Por quê:** Tratar “ambos” como um catálogo fixo ignoraria o perfil. Esconder freela quando ele está marcado também. O passo de freela num card de emprego fixo manda a pessoa para o gesto errado.
- **Consequências:** Mudar o perfil muda a lista na hora. Sem freela marcado, rede de freela não entra. Sem contrato longo, Turing não entra. Empresas seguem a mesma regra em D-038.

## D-038 — Empresas seguem o contrato, e a barra marca o ritmo

- **Data:** 22 set 2026
- **Status:** vigente
- **Contexto:** Os canais já respeitam freela e contrato (D-037). O resto da Fase 5 pedia empresas agrupadas por contrato curto, longo e freela, filtradas pelo perfil e pela nota.
- **Decisão:** A empresa entra só se o contrato dela está marcado e o mercado cruza o perfil. A nota não esconde. Processo direto (Supabase, Deel, Remote, Doist, Grafana, Elastic, PostHog) fica para agora com Readiness de 60 em diante e depois abaixo disso. Processo longo (Canonical, Automattic, GitLab, Vercel, Stripe) fica cedo abaixo de 60, depois de 60 a 74, e para agora de 75 em diante. PostHog aparece nos dois quando emprego e freela estão marcados: emprego onde há como contratar, contractor onde o handbook cita a falta de EOR. Contrato curto não ganha empresa inventada; o caminho desse contrato continua nos canais.
- **Por quê:** Nomear uma empresa de contrato curto sem vaga de prazo definido mente o catálogo. Tratar Stripe e Supabase como o mesmo gesto queima a semana. A lista de países muda; o card manda ler a vaga, não promete o Brasil.
- **Consequências:** O catálogo é fixo no repo. Cursos, questionário e a política de live code × IA continuam nesta fase, sem código neste corte. Live code passa a poder existir por empresa, mas ainda não entra.

## D-039 — Tema no header e aviso em cada ação

- **Data:** 22 set 2026
- **Status:** vigente
- **Contexto:** O quadro de matching foi conferido. A tela clara cansava, e salvar perfil, avaliar currículo ou LinkedIn e encerrar entrevista não diziam se a ação tinha terminado.
- **Decisão:** O header, à direita, troca tema claro e escuro. A escolha fica em `localStorage` neste navegador. Cada ação que grava ou avalia mostra um aviso: sucesso, erro ou aviso. O áudio de backup, se falhar, avisa uma vez e não cancela a entrevista. A nota continua na transcrição.
- **Por quê:** O resultado da ação não pode depender de a pessoa adivinhar pelo redirect. Um aviso a cada pedaço de áudio cobriria a tela; uma vez basta.
- **Consequências:** Erro de formulário continua escrito no formulário e também no aviso. Tema não entra no perfil.

## D-040 — Cursos com URL, pela stack

- **Data:** 22 set 2026
- **Status:** vigente
- **Contexto:** Canais e empresas já estão no matching. O próximo corte da fase pedia cursos com link, calibrados no perfil.
- **Decisão:** O catálogo é fixo no repo. Curso sem tag de stack entra para todo perfil (inglês falado). Curso com tag entra quando a stack do perfil contém essas palavras. Mercado e contrato não escondem curso. A nota não esconde. O modelo não inventa URL.
- **Por quê:** O material é estudo, não uma vaga num país. Esconder o curso de Next.js porque o contrato é longo treinaria o filtro errado. Inventar link quebra o catálogo.
- **Consequências:** Questionário e o rótulo de live code × IA continuam nesta fase, sem código neste corte.

## D-041 — Ícone no termo que não é óbvio

- **Data:** 22 set 2026
- **Status:** vigente
- **Contexto:** Visto, IC ou gestão, domínio, EOR, Readiness e outros nomes do processo não são vocabulário comum. A pessoa não deve precisar sair da tela para saber o que significam.
- **Decisão:** Cada termo desses tem um ícone. Passar o mouse ou focar abre o que é e onde entra nesta tela. O glossário cobre o que já aparece e o que ainda vai aparecer (visto, IC ou gestão, domínio, live code). Texto novo usa esse glossário.
- **Por quê:** Uma frase solta no meio do card não explica o nome. O ícone fica no termo, no contexto em que ele aparece.
- **Consequências:** Headline e About do LinkedIn continuam com a figura que já existia. O questionário, quando entrar, usa os mesmos termos visto, IC ou gestão e domínio.

## D-042 — Questionário opcional no perfil

- **Data:** 22 set 2026
- **Status:** vigente
- **Contexto:** Canais, empresas, cursos e o ícone dos termos já estão no matching. O esboço pedia um questionário para calibrar o que a pessoa busca, sem tornar o onboarding uma barreira.
- **Decisão:** O bloco fica no perfil e começa vazio. Vazio não muda a lista. Faixa não filtra: o catálogo não tem salário; ela entra na avaliação e numa linha do matching. Visto não esconde empresa. Remoto sem visto marca Arc e Turing como cedo quando já existe Readiness; sem Readiness o ritmo continua pelo perfil e o aviso permanece. Gun.io e Toptal não recebem esse aviso. Tipo de empresa e domínio filtram por união: vazio mostra tudo; marcado, a empresa entra se cruzar. Quadro de vaga não tem tipo nem domínio e continua. Rede marcada é o que mantém Arc, Turing, Toptal e Gun.io quando algum tipo está marcado. Gestão não esconde card de IC: o catálogo é cargo de quem entrega código, e a avaliação recebe o que foi marcado. Salvar sem nada marcado omite `goals`. Perfil antigo sem `goals` continua válido.
- **Por quê:** A nota de Readiness não pode esconder card (D-036). Uma escolha explícita de setor ou de tipo é outro recorte: a pessoa pediu para não ver o resto. Esconder por salário ou por visto mentiria, porque o catálogo não traz salário e a empresa internacional às vezes contrata remoto do Brasil.
- **Consequências:** Contrato curto continua sem empresa no catálogo, com a frase que já existia. Lista vazia por tipo ou domínio usa outra frase.

## D-043 — Rótulo de live code × IA por empresa

- **Data:** 22 set 2026
- **Status:** vigente
- **Contexto:** D-012 tirou o editor do produto e deixou a política de IA na prova como curadoria desta fase. O card da empresa já existe.
- **Decisão:** Cada empresa do catálogo mostra um rótulo. Proibida, permitida ou esperada só quando há página pública. Mista quando a mesma página (ou o convite público) parte o processo em duas regras. Sem página, o card diz que o convite da vaga é a regra. O rótulo não esconde empresa e não abre editor. Rede de triagem fica sem este rótulo: a regra dela não está no mesmo tipo de página.
- **Por quê:** Marcar Stripe e PostHog com a mesma palavra treinaria a semana errada. Inventar “proibida” para Supabase, Deel, Remote, Grafana, Canonical ou Automattic também. O app não lê a vaga.
- **Consequências:** Fontes no catálogo: PostHog handbook (projeto permite, debug só autocomplete), GitLab handbook (encoraja IA na entrevista técnica), Elastic blog de 16 jul 2026 (conversa sem ferramenta de IA), Doist handbook (pode usar e dizer), Vercel em entrevista pública da VP de engenharia (encoraja, e o convite pode marcar uma rodada sem IA), interviewing.io com engenheiros da Stripe (prova proíbe; o convite pode nomear outra rodada). Fase 6 continua fora: desafio, viva voz, auth, deploy.

## D-044 — Questionário indireto pré-preenche o perfil

- **Data:** 22 set 2026
- **Status:** anotada, sem código
- **Contexto:** A Fase 5 fechou com o questionário direto no perfil (D-042): a pessoa marca faixa, visto, tipo, trilha e domínio pelo nome do campo. O autor pediu outro caminho, ainda não construído.
- **Decisão:** Haverá um formulário com várias perguntas indiretas. As respostas pré-definem os campos do perfil. O perfil em `/profile` continua editável depois, também quando o questionário já tiver preenchido esses campos. Refazer o questionário não trava o perfil. Isto não é a Fase 6 e não entra em código até essa tarefa ser a fase aberta.
- **Por quê:** Quem não conhece o vocabulário (visto, IC, domínio) ainda precisa de um perfil inicial. A correção manual tem de continuar disponível, porque a inferência pode errar o que a pessoa quer.
- **Consequências:** O bloco direto de D-042 permanece. A Fase 6 (desafio, viva voz, mobile) não absorve esta tarefa.

## D-045 — Mapa fixo das perguntas indiretas

- **Data:** 23 set 2026
- **Status:** vigente
- **Contexto:** O autor abriu a tarefa de D-044 e fechou o desenho: escolha fixa, página própria, anos e stack entram, responder de novo substitui o campo.
- **Decisão:** A página `/questions` liga do perfil e do primeiro acesso. Não há modelo. Cada pergunta vira um campo por um mapa no repositório: anos, stack, mercados, contratos, faixa, visto, tipo de empresa, IC ou gestão, domínio. Nome e idioma da tela ficam só no formulário do perfil. A senioridade continua pleno. Anos viram 2, 4, 6 ou 8; se o perfil já existe, uma opção mantém o número exato. “Ainda não sei” apaga só aquele campo quando nenhuma outra opção do grupo está marcada; se as duas coisas vierem juntas, a opção marcada vale. Os objetivos saem só desta resposta. Depois o app abre `/profile`.
- **Por quê:** A pergunta não pode pedir o nome do campo, e a resposta não pode inventar mercado ou contrato quando a pessoa marcou que ainda não sabe.
- **Consequências:** Mercado e contrato vazios nesta página não viram EUA nem contrato longo. O formulário direto continua com esse padrão quando o campo vai vazio. Refazer as perguntas não trava o perfil. A Fase 6 continua fora.

## D-046 — Erro nas perguntas mantém o que já foi marcado

- **Data:** 23 set 2026
- **Status:** vigente
- **Contexto:** No questionário de D-045, uma resposta faltando recarregava `/questions`. A página voltava ao perfil salvo e apagava o que a pessoa tinha acabado de marcar.
- **Decisão:** A resposta faltando fica anunciada no próprio grupo, e as marcas da tela continuam. Sair da página desiste, sem gravar.
- **Por quê:** A pessoa precisa completar o grupo ou corrigir uma marca. Perder o resto do formulário empurra ela a desistir ou a marcar de novo o que já estava certo.
- **Consequências:** Gravar só acontece quando cada grupo tem uma opção ou Ainda não sei. A Fase 6 continua fora.

