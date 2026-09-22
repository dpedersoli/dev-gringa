# Fase 5 — Matching (encerrada)

**Status:** encerrada e conferida ao vivo em 22 set 2026. No código: canais, como prospectar, empresas por contrato (D-038), cursos com URL (D-040), questionário opcional (D-042) e rótulo de live code × IA (D-043).  
**Código:** `/matching`.  
**Fora desta fase:** a tarefa anotada em D-044 (questionário indireto que pré-preenche o perfil) e a Fase 6.  
**Não fazer:** viva voz contínuo, desafio, mobile (Fase 6), auth, deploy, raspar vaga ou perfil.

## Objetivo desta abertura

A pessoa, com o perfil salvo, vê **onde procurar** e **como** prospectar em cada canal. Não é uma lista de links.

1. O perfil filtra: mercado (`us`, `uk`, `ca`, `eu`, `au`) e contrato (`short`, `long`, `freelance`). Canal sem interseção fica de fora.
2. Cada canal tem um movimento: recrutador chega (inbound), candidatura seletiva, ou triagem da rede.
3. Três passos de como prospectar, na língua da UI.
4. Se não há Readiness, a lista é só pelo perfil. Se há, a nota marca o ritmo e **não esconde** o canal (D-036).
5. O tipo de contrato do perfil recorta a lista (D-037). Freela e contrato marcados juntos trazem os dois, e o canal que serve aos dois explica os dois movimentos. Só um marcado traz só esse.

Empresas, cursos, questionário e a política de live code ficam descritos abaixo. O código desta fase está no repo. Falta a conferência ao vivo. Não é Fase 6.

## Por quê

D-004 deixou o país para esta fase. O perfil já guarda mercado e contrato desde a Fase 2, e o Readiness já existe. O buraco era o “e agora, onde eu mando?”. Mandar para todo quadro do mesmo jeito treina o hábito errado: Easy Apply no LinkedIn, teste da Toptal no mesmo dia de vinte candidaturas.

## Experiência

### Entrada

- Precisa de perfil. Sem perfil → `/onboarding`.
- CV, LinkedIn e entrevistas **não** bloqueiam a página. Sem Readiness o texto diz que a nota ainda não marca ritmo.
- Nav: Matching. O próximo passo do painel, quando as cinco notas existem, aponta para cá.
- Rota: `/matching`.

### A página

- Grupos: canal principal, secundário, cedo. Sem Readiness, um grupo só: pelo perfil.
- Card: nome (link externo), movimento, mercados e contratos que casaram, resumo, três passos.
- Canal que cobre contrato e freela, com os dois marcados no perfil, mostra os dois blocos de passos. Com só um marcado, mostra o bloco daquele tipo.
- Catálogo fixo no repo (`src/lib/matching/platforms.ts`). O modelo não inventa canal nem URL.

### Ritmo (D-036)

| Readiness | Inbound | Candidatura seletiva | Triagem da rede |
| --- | --- | --- | --- |
| ausente | pelo perfil | pelo perfil | pelo perfil |
| &lt; 60 | principal | secundário | cedo |
| 60–74 | principal | principal | secundário |
| ≥ 75 | principal | principal | principal |

60 é a linha em que o composto já sustenta uma candidatura sem queimar o canal. 75 é a linha em que vale gastar uma semana num teste de rede. Abaixo disso, um “não” da Toptal ou da Turing é cooldown, não treino.

## Catálogo desta abertura

| Canal | Movimento | Mercados | Contratos |
| --- | --- | --- | --- |
| LinkedIn | inbound | todos | todos |
| Hacker News — Who is hiring | seletiva | todos | todos |
| Wellfound | seletiva | us, uk, ca, eu | curto, longo |
| We Work Remotely | seletiva | todos | todos |
| Remotive | seletiva | todos | curto, longo |
| Remote OK | seletiva | todos | todos |
| Welcome to the Jungle | seletiva | uk, eu | curto, longo |
| SEEK | seletiva | au | curto, longo |
| Arc | triagem | us | todos |
| Turing | triagem | us | longo |
| Toptal | triagem | todos | freela |
| Gun.io | triagem | us | freela |

A regra de país está nos passos: “worldwide” segue; “must be US-based” ou residência obrigatória não. O app não lê a vaga. A pessoa lê.

## Empresas (D-038)

Abaixo dos canais, a mesma página agrupa empresas pelo contrato marcado no perfil.

| Empresa | Contratos | Mercados | Barra |
| --- | --- | --- | --- |
| Supabase, Deel, Remote, Doist | longo | todos | direta |
| Grafana Labs, Elastic | longo | us, uk, ca, eu, au | direta |
| PostHog | longo e freela | us, uk, ca, eu | direta |
| Canonical, Automattic | longo | todos | longa |
| GitLab, Stripe | longo | us, uk, ca, eu, au | longa |
| Vercel | longo | us, uk, eu | longa |

Contrato curto não tem empresa neste catálogo. O card manda ler o país da vaga. PostHog no freela é a via de contractor onde não há EOR, não um segundo emprego.

| Readiness | Processo direto | Processo longo |
| --- | --- | --- |
| ausente | pelo perfil | pelo perfil |
| &lt; 60 | depois | cedo |
| 60–74 | para agora | depois |
| ≥ 75 | para agora | para agora |

## Cursos (D-040)

Abaixo das empresas, a mesma página lista cursos com URL. A stack do perfil escolhe. Inglês falado entra sempre, porque a entrevista é oral. Mercado e contrato não escondem curso: o material é estudo, não uma vaga num país. A nota não esconde.

| Curso | Entra quando |
| --- | --- |
| LearnEnglish — Speaking B2 | sempre |
| Full Stack Open | stack tem React ou Node.js |
| Next.js Learn | stack tem Next.js |
| Expo tutorial | stack tem Expo ou React Native |
| Total TypeScript | stack tem TypeScript |

## Questionário (D-042)

O bloco fica no perfil, depois do contrato. Começa vazio. Vazio não muda canais nem empresas. Salvar sem marca omite `goals`. Perfil antigo sem esse campo continua válido.

| Campo | O que faz |
| --- | --- |
| Faixa | Não esconde card. Aparece numa linha do matching e entra na avaliação. O modelo não inventa salário. |
| Visto | Não esconde empresa. Remoto sem visto marca Arc e Turing como cedo quando já existe Readiness. Sem Readiness, o ritmo continua pelo perfil e o aviso permanece. Toptal e Gun.io não recebem o aviso. |
| Tipo de empresa | União. Vazio mostra tudo. Produto, startup e rede se combinam. Quadro de vaga não tem tipo e continua. Sem rede, Arc, Turing, Toptal e Gun.io saem. |
| IC ou gestão | Não esconde card. Gestão (ou os dois) avisa que o catálogo é cargo de IC. A avaliação recebe o que foi marcado. |
| Domínio | União. Vazio mostra tudo. Marcado, a empresa entra só se o setor cruzar. Canal de vaga não tem setor e continua. |

Contrato curto continua com a frase de que o catálogo não tem empresa para esse contrato. Contrato longo ou freela vazio por tipo ou domínio usa outra frase.

| Empresa | Tipo | Domínio |
| --- | --- | --- |
| Supabase, PostHog | produto e startup | developer tools |
| Grafana, Elastic, GitLab, Vercel | produto | developer tools |
| Deel, Remote, Stripe | produto | fintech |
| Doist | produto | produtividade |
| Canonical | produto | infra |
| Automattic | produto | publicação na web |

## Live code × IA (D-043)

Cada card de empresa traz um rótulo. Ele não esconde a empresa e não abre editor (D-012). A rede de triagem não recebe este rótulo.

| Rótulo | Quando |
| --- | --- |
| Proibida | A página pública pede para não usar ferramenta de IA na prova. |
| Permitida | Pode usar como ferramenta, explicar, e dizer que usou. |
| Esperada | A página pede para usar IA e explicar o que saiu. |
| Mista | A mesma empresa publica duas regras. A frase do card diz qual rodada é qual. |
| Sem regra pública | Não há página. O convite da vaga é a regra. |

| Empresa | Rótulo |
| --- | --- |
| Elastic, Stripe | proibida |
| Doist | permitida |
| GitLab | esperada |
| PostHog, Vercel | mista |
| Supabase, Deel, Remote, Grafana, Canonical, Automattic | sem regra pública |

## Fora desta fase

- Desafio, viva voz contínuo, mobile, auth, deploy. Fase 6.

## Saída deste corte

1. `/matching` abre com perfil e lista só canais que cruzam mercado e contrato.
2. Cada card tem o movimento e três passos.
3. Com Readiness, os grupos principal / secundário / cedo seguem a tabela. Sem Readiness, não há ritmo inventado.
4. Empresas do contrato marcado aparecem com três passos. Processo direto e processo longo seguem a tabela de D-038. Contrato curto mostra que o catálogo não tem empresa para esse tipo.
5. Cursos da stack aparecem com URL. Inglês falado aparece sempre.
6. Termo que não é óbvio tem ícone: o que é, e onde entra nesta tela (D-041).
7. Questionário vazio não muda a lista. Tipo e domínio filtram. Faixa não esconde. Remoto sem visto avisa em Arc e Turing. Gestão avisa que o catálogo é IC (D-042).
8. Cada empresa mostra o rótulo de live code. Sem página pública, o convite é a regra (D-043).

## Conferência

O autor validou em 22 set 2026. Canais e empresas mais cedo no mesmo dia. Questionário direto e rótulo de live code no fechamento: os testes foram dados como ok.
