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
- **Status:** vigente (constraint; implementação na Fase 4)
- **Decisão:** Pergunta audível + gravação da resposta. Timer global **não pausa**. Gravar e transcrever perguntas e respostas. Viva voz contínuo (call com IA) só depois.
- **Por quê:** A pressão do relógio é o treino. Pausar mentiria o cenário real.
- **Consequências:** Proibido “modo relaxado”. Pode existir rodada curta de 5 min, ainda sem pausa. Sem implementação nesta fase.

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
- **Status:** vigente
- **Decisão:** Todo módulo futuro implementa o mesmo formato: `score` 0–100, 3 acertos com evidência, 3 melhorias ranqueadas com exemplo, um `nextStep`. Dimensão não medida **não vale zero**.
- **Por quê:** Sem isso, cada fase inventa um JSON diferente e o dashboard vira gambiarra.
- **Consequências:** Código da Fase 2 já declara os tipos. Nenhuma avaliação é gerada ainda (lista vazia). Dashboard trata vazio como “não medido”, não como 0.

## D-011 — Sem LLM, upload de CV, áudio ou matching na Fase 2

- **Data:** 16 set 2026
- **Status:** superseded por D-017 (LLM só para CV/LinkedIn na Fase 3). Áudio e matching continuam fora.

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
- **Consequências:** Arquivos `phases/03`–`06` são esboço de uma página. Agente que detalhar Fase 4 durante a 2 está violando o método.

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
- **Status:** vigente
- **Decisão:** Fase 3 chama a API Anthropic (default `claude-sonnet-4-6`, override `ANTHROPIC_MODEL`). A saída é validada por `assertEvaluation` antes de persistir. Sem chave, não há nota.
- **Por quê:** Feedback com evidência e exemplo reescrito não cabe numa rubrica só de regex. Autor escolheu Anthropic. Sonnet 4 (`claude-sonnet-4-20250514`) aposentou em jun/2026.
- **Consequências:** `.env.local` obrigatório para pontuar. Custo por reavaliação. Não usamos LLM para entrevistas ainda (Fase 4).

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
- **Consequências:** A pessoa copia do próprio perfil. Não prometemos “cole o link e magia”.
