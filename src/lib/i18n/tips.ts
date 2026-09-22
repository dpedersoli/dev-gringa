import type { Locale } from "@/lib/domain/profile";

export const TIP_IDS = [
  "profileScore",
  "readiness",
  "vibe",
  "fit",
  "challenge",
  "matching",
  "contractShort",
  "contractLong",
  "freelance",
  "motionInbound",
  "motionSelective",
  "motionScreen",
  "barOpen",
  "barHigh",
  "paceEarly",
  "paceProfile",
  "eor",
  "peo",
  "async",
  "staff",
  "inmail",
  "easyApply",
  "openToWork",
  "ats",
  "liveCode",
  "visto",
  "ic",
  "domain",
  "rubric",
  "salary",
  "product",
  "startup",
  "network",
  "devtools",
  "fintech",
  "productivity",
  "infra",
  "publishing",
] as const;

export type TipId = (typeof TIP_IDS)[number];

export type TipCopy = {
  label: string;
  what: string;
  applies: string;
};

export type TipMark = {
  id: TipId;
  pattern: string;
  flags?: string;
};

const pt: Record<TipId, TipCopy> = {
  profileScore: {
    label: "O que é Profile Score",
    what: "A nota do perfil escrito: currículo e LinkedIn juntos. Sem os dois, o número não aparece.",
    applies: "No painel, ao lado do Readiness. Entrevista não entra nesta conta.",
  },
  readiness: {
    label: "O que é Readiness",
    what: "A nota de prontidão para o processo: currículo, LinkedIn e as três entrevistas faladas.",
    applies: "No painel é o composto. No matching ela marca o ritmo da semana e não esconde canal nem empresa.",
  },
  vibe: {
    label: "O que é Vibe Engineering",
    what: "Entrevista técnica falada: você explica sistema, bug e uso de IA em voz alta, sem editor.",
    applies: "Na entrevista Técnica. Não é uma prova de digitar código.",
  },
  fit: {
    label: "O que é fit cultural",
    what: "Encaixe de jeito de trabalhar: remoto, assíncrono, dono do problema. Não é simpatia nem uma empresa famosa.",
    applies: "Na entrevista Fit e na nota do currículo, que não é encaixe numa vaga só.",
  },
  challenge: {
    label: "O que é o desafio com enunciado",
    what: "Um problema escrito para você explicar em voz. Ainda não abre nesta versão.",
    applies: "No painel, o módulo que está em breve. Não é um editor de código.",
  },
  matching: {
    label: "O que é matching",
    what: "A lista do que procurar com o perfil que você salvou: canais, empresas e cursos.",
    applies: "No menu Matching e na página Onde procurar.",
  },
  contractShort: {
    label: "O que é contrato curto",
    what: "Trabalho com prazo fechado, em geral alguns meses, sem virar emprego nem freela avulso.",
    applies: "No perfil, muda canais. Neste catálogo não há empresa desse tipo.",
  },
  contractLong: {
    label: "O que é contrato longo",
    what: "Emprego contínuo, remoto, sem data para acabar. Não é nota fiscal de projeto.",
    applies: "No perfil, abre os canais e as empresas de emprego. A vaga é que diz se o país contrata daí.",
  },
  freelance: {
    label: "O que é freela",
    what: "Contrato por projeto ou por hora, com você ou a sua empresa emitindo. Não é CLT nem emprego fixo.",
    applies: "No perfil, abre Toptal, Gun.io e o caminho de contractor. Sozinho, esconde a lista de emprego.",
  },
  motionInbound: {
    label: "O que é recrutador chega",
    what: "O movimento em que a pessoa de recrutamento escreve para você. Você não manda currículo em massa.",
    applies: "Em canais como o LinkedIn, quando o perfil já está em inglês e encontrável.",
  },
  motionSelective: {
    label: "O que é candidatura seletiva",
    what: "Você escolhe poucas vagas e escreve para cada uma. Não é aplicar em tudo que aparece.",
    applies: "Nos quadros de vaga, como Hacker News, We Work Remotely e Remote OK.",
  },
  motionScreen: {
    label: "O que é triagem da rede",
    what: "Uma candidatura à rede, com teste, e não a cada vaga. Se passar, as empresas vêm até você.",
    applies: "Em Arc, Turing, Toptal e Gun.io. Com Readiness baixo, fica cedo porque um não gera espera.",
  },
  barOpen: {
    label: "O que é processo direto",
    what: "A porta é a vaga aberta: ler o país, escrever, esperar a resposta. Não é um trial de semanas.",
    applies: "Em empresas como Supabase, Deel, Doist, Grafana, Elastic, Remote e PostHog.",
  },
  barHigh: {
    label: "O que é processo longo",
    what: "A seleção leva semanas e pede exercício, trial ou várias etapas. Uma vaga dessas ocupa a semana.",
    applies: "Em Canonical, Automattic, GitLab, Stripe e Vercel. Com Readiness no meio, fica para depois.",
  },
  paceEarly: {
    label: "O que é cedo",
    what: "O canal ou a empresa existe para o seu perfil, mas a nota diz para não gastar a semana ali agora.",
    applies: "No matching, no grupo Cedo. O card continua visível.",
  },
  paceProfile: {
    label: "O que é pelo perfil",
    what: "Ainda não há Readiness. A lista usa mercado, contrato e stack, sem inventar ritmo.",
    applies: "No matching, enquanto faltar currículo, LinkedIn ou alguma das três entrevistas.",
  },
  eor: {
    label: "O que é EOR",
    what: "Employer of Record: uma empresa no meio que te emprega no seu país para você trabalhar na outra.",
    applies: "No card da empresa, quando o texto diz se eles contratam o Brasil por esse caminho ou não.",
  },
  peo: {
    label: "O que é PEO",
    what: "Professional Employer Organization: parceiro que emprega no país onde a empresa não tem escritório.",
    applies: "No card de empresas como o GitLab, na lista de países em que elas de fato contratam.",
  },
  async: {
    label: "O que é async",
    what: "Assíncrono: o trabalho segue por escrito, sem depender de todo mundo online na mesma hora.",
    applies: "Na entrevista de fit e em empresas que dizem que o time é remoto e async.",
  },
  staff: {
    label: "O que é staff",
    what: "Nível acima de sênior: escopo de várias equipes. Não é o pleno que esta ferramenta treina.",
    applies: "No card da empresa, para pular vaga que pede staff.",
  },
  inmail: {
    label: "O que é InMail",
    what: "Mensagem paga do LinkedIn, em geral de recrutador, que chega mesmo sem conexão.",
    applies: "No passo do LinkedIn: responder no dia, com um projeto, em inglês.",
  },
  easyApply: {
    label: "O que é Easy Apply",
    what: "O botão do LinkedIn que envia a candidatura em um clique, para muita gente ao mesmo tempo.",
    applies: "No passo do LinkedIn: não é o plano. Poucas vagas, cada uma com uma frase sobre o produto.",
  },
  openToWork: {
    label: "O que é Open to Work",
    what: "O aviso verde do LinkedIn de que você está aberto a propostas.",
    applies: "No passo do LinkedIn: só para recrutadores, não no modo público para todo mundo.",
  },
  ats: {
    label: "O que é ATS",
    what: "Applicant Tracking System: o programa que a empresa usa para ler e filtrar currículos.",
    applies: "Na nota do currículo. Coluna única e texto selecionável passam; tabela e foto atrapalham.",
  },
  liveCode: {
    label: "O que é live code",
    what: "Prova ao vivo em que você escreve código enquanto alguém observa. Esta ferramenta não tem editor.",
    applies:
      "No card da empresa e na entrevista técnica, que é falada. Proibida: sem ferramenta de IA na prova. Permitida: pode, e você explica. Esperada: eles querem ver o uso. Mista: uma rodada de cada. Sem regra pública: o convite manda.",
  },
  visto: {
    label: "O que é visto",
    what: "Autorização do país para você trabalhar lá. Remoto nem sempre pede visto; algumas vagas pedem residência.",
    applies:
      "No questionário. Remoto sem visto marca como cedo a triagem que é só dos EUA, quando já existe Readiness. A empresa continua na lista. Sem Readiness, o card fica pelo perfil e o aviso continua.",
  },
  ic: {
    label: "O que é IC ou gestão",
    what: "IC é contribuinte individual: você entrega código, sem time para gerir. Gestão é cargo de pessoas.",
    applies:
      "No questionário. Gestão não esconde os cards: este catálogo é cargo de IC. A avaliação usa o que você marcou.",
  },
  domain: {
    label: "O que é domínio",
    what: "O setor do produto. Não é o domínio do site.",
    applies:
      "No questionário. Se você marca um setor, a empresa fora dele sai da lista. Canal de vaga não tem setor e continua.",
  },
  salary: {
    label: "O que é faixa",
    what: "Quanto você quer ganhar por ano, em dólares.",
    applies:
      "No questionário. Não tira empresa da lista: este catálogo não tem salário. Entra na entrevista de RH como contexto, sem inventar um número. Num quadro que mostra salário, serve para pular vaga fora do pleno.",
  },
  product: {
    label: "O que é produto",
    what: "Empresa que vende o próprio software, não um projeto sob encomenda de um cliente.",
    applies:
      "No questionário. Marcado, a empresa de produto entra. A rede de triagem só entra se Rede também estiver marcada.",
  },
  startup: {
    label: "O que é startup",
    what: "Empresa nova, ainda montando o produto e o time.",
    applies:
      "No questionário. Marcada, ficam as empresas novas do catálogo. Empresa grande de produto sai, a menos que Produto também esteja marcado.",
  },
  network: {
    label: "O que é rede",
    what: "Canal que te apresenta a várias empresas depois de uma triagem. Não é um quadro de vagas.",
    applies:
      "No questionário. Sem Rede marcada, Arc, Turing, Toptal e Gun.io saem. Quadro de vaga não tem esse tipo e continua.",
  },
  devtools: {
    label: "O que é developer tools",
    what: "Ferramenta para quem programa: banco, observabilidade, deploy, editor.",
    applies: "No domínio do questionário. Marcado, a empresa de outro setor sai.",
  },
  fintech: {
    label: "O que é fintech",
    what: "Empresa de dinheiro: pagamento, banco, folha, contratação internacional.",
    applies: "No domínio do questionário. Marcado, a empresa de outro setor sai.",
  },
  productivity: {
    label: "O que é produtividade",
    what: "Produto para organizar o trabalho do dia, como lista e calendário.",
    applies: "No domínio do questionário. Marcado, a empresa de outro setor sai.",
  },
  infra: {
    label: "O que é infra",
    what: "A base onde o software roda: sistema operacional, nuvem, distribuição.",
    applies: "No domínio do questionário. Marcado, a empresa de outro setor sai.",
  },
  publishing: {
    label: "O que é publicação na web",
    what: "Produto para escrever e publicar na web, como WordPress.",
    applies: "No domínio do questionário. Marcado, a empresa de outro setor sai.",
  },
  rubric: {
    label: "O que é rubrica",
    what: "A régua da nota: o que a avaliação olha e quanto pesa. Pleno é a régua desta versão.",
    applies: "No perfil, na senioridade. Sênior e júnior não usam esta régua.",
  },
};

const en: Record<TipId, TipCopy> = {
  profileScore: {
    label: "What Profile Score is",
    what: "The written-profile score: resume and LinkedIn together. Without both, the number stays hidden.",
    applies: "On the dashboard, beside Readiness. Interviews are not in this number.",
  },
  readiness: {
    label: "What Readiness is",
    what: "The readiness score for the process: resume, LinkedIn, and the three spoken interviews.",
    applies: "On the dashboard it is the composite. On matching it marks the week's pace and does not hide a channel or a company.",
  },
  vibe: {
    label: "What Vibe Engineering is",
    what: "A spoken technical interview: you explain a system, a bug, and how you use AI, with no editor.",
    applies: "On the Technical interview. It is not a test where you type code.",
  },
  fit: {
    label: "What culture fit is",
    what: "A match of working style: remote, asynchronous, owner of the problem. Not charm, and not a famous company.",
    applies: "On the Fit interview, and on the resume score, which is not a match against one job.",
  },
  challenge: {
    label: "What the written challenge is",
    what: "A written problem you explain out loud. It does not open in this version.",
    applies: "On the dashboard, the module marked later. It is not a code editor.",
  },
  matching: {
    label: "What matching is",
    what: "The list of where to look with the profile you saved: channels, companies, and courses.",
    applies: "On the Matching item in the menu and on the Where to look page.",
  },
  contractShort: {
    label: "What a short contract is",
    what: "Work with a fixed end, usually a few months, that is neither employment nor a one-off freelance gig.",
    applies: "On the profile, it changes channels. This catalog has no company of that type.",
  },
  contractLong: {
    label: "What a long contract is",
    what: "Ongoing remote employment, with no end date. It is not an invoice for a project.",
    applies: "On the profile, it opens employment channels and companies. The role says whether that country hires from yours.",
  },
  freelance: {
    label: "What freelance is",
    what: "Project or hourly work, billed by you or your company. It is not employment.",
    applies: "On the profile, it opens Toptal, Gun.io, and the contractor path. Alone, it hides the employment list.",
  },
  motionInbound: {
    label: "What recruiter-inbound is",
    what: "The motion where a recruiter writes to you. You do not spray applications.",
    applies: "On channels such as LinkedIn, once the profile is in English and findable.",
  },
  motionSelective: {
    label: "What a selective application is",
    what: "You pick a few roles and write for each one. It is not applying to everything on the board.",
    applies: "On job boards such as Hacker News, We Work Remotely, and Remote OK.",
  },
  motionScreen: {
    label: "What a network screen is",
    what: "One application to a network, with a test, not one per job. If you pass, companies come to you.",
    applies: "On Arc, Turing, Toptal, and Gun.io. At a low Readiness it stays early, because a no creates a wait.",
  },
  barOpen: {
    label: "What a direct process is",
    what: "The door is the open role: read the country, write, wait. It is not a multi-week trial.",
    applies: "At companies such as Supabase, Deel, Doist, Grafana, Elastic, Remote, and PostHog.",
  },
  barHigh: {
    label: "What a long process is",
    what: "Hiring takes weeks and asks for an exercise, a trial, or several rounds. One of these roles spends the week.",
    applies: "At Canonical, Automattic, GitLab, Stripe, and Vercel. In the middle Readiness band it waits.",
  },
  paceEarly: {
    label: "What early means",
    what: "The channel or company fits the profile, and the score says not to spend the week there yet.",
    applies: "On matching, in the Early group. The card stays visible.",
  },
  paceProfile: {
    label: "What from the profile means",
    what: "There is no Readiness yet. The list uses market, contract, and stack, and does not invent a pace.",
    applies: "On matching, while resume, LinkedIn, or one of the three interviews is still missing.",
  },
  eor: {
    label: "What an EOR is",
    what: "Employer of Record: a company in the middle that employs you in your country so you can work for the other one.",
    applies: "On a company card, when the text says whether they hire Brazil that way.",
  },
  peo: {
    label: "What a PEO is",
    what: "Professional Employer Organization: a partner that employs you where the company has no entity.",
    applies: "On company cards such as GitLab, in the list of countries where they actually hire.",
  },
  async: {
    label: "What async means",
    what: "Asynchronous: the work moves in writing, without everyone online at the same hour.",
    applies: "On the fit interview and at companies that say the team is remote and async.",
  },
  staff: {
    label: "What staff means",
    what: "A level above senior: scope across several teams. It is not the mid-level this tool trains.",
    applies: "On a company card, so you skip a role that asks for staff.",
  },
  inmail: {
    label: "What InMail is",
    what: "A paid LinkedIn message, usually from a recruiter, that arrives even without a connection.",
    applies: "On the LinkedIn step: answer the same day, with one project, in English.",
  },
  easyApply: {
    label: "What Easy Apply is",
    what: "The LinkedIn button that sends an application in one click, to a lot of people at once.",
    applies: "On the LinkedIn step: it is not the plan. A few roles, each with one sentence about the product.",
  },
  openToWork: {
    label: "What Open to Work is",
    what: "The green LinkedIn frame that says you are open to offers.",
    applies: "On the LinkedIn step: recruiters only, not the public frame everyone can see.",
  },
  ats: {
    label: "What an ATS is",
    what: "Applicant Tracking System: the software a company uses to read and filter resumes.",
    applies: "On the resume score. One column and selectable text pass; tables and a photo get in the way.",
  },
  liveCode: {
    label: "What live code is",
    what: "A live test where you type code while someone watches. This tool has no editor.",
    applies:
      "On the company card and on the technical interview, which is spoken. Forbidden: no AI tool on the test. Allowed: you may, and you explain. Expected: they want to see the use. Mixed: one round of each. No public rule: the invite decides.",
  },
  visto: {
    label: "What a visa is",
    what: "A country's permission for you to work there. Remote does not always need a visa; some roles require residence.",
    applies:
      "On the questionnaire. Remote with no visa marks a US-only screen as early once Readiness exists. The company stays on the list. Without Readiness, the card stays on the profile and the note stays.",
  },
  ic: {
    label: "What IC or management is",
    what: "IC means individual contributor: you ship code, with no team to manage. Management is a people role.",
    applies:
      "On the questionnaire. Management does not hide the cards: this catalog is an IC role. The evaluation uses what you marked.",
  },
  domain: {
    label: "What domain means",
    what: "The product's industry. It is not a website domain.",
    applies:
      "On the questionnaire. If you mark a sector, a company outside it leaves the list. A job board has no sector and stays.",
  },
  salary: {
    label: "What a salary band is",
    what: "What you want to earn per year, in dollars.",
    applies:
      "On the questionnaire. It does not remove a company: this catalog has no salary. It informs the recruiter interview as context, without inventing a number. On a board that shows pay, use it to skip a role outside mid-level.",
  },
  product: {
    label: "What a product company is",
    what: "A company that sells its own software, not a client project built to order.",
    applies:
      "On the questionnaire. Marked, a product company stays. A screening network stays only if Network is marked too.",
  },
  startup: {
    label: "What a startup is",
    what: "A young company, still building the product and the team.",
    applies:
      "On the questionnaire. Marked, the young companies in the catalog stay. A large product company leaves unless Product is marked too.",
  },
  network: {
    label: "What a network is",
    what: "A channel that introduces you to several companies after a screen. It is not a job board.",
    applies:
      "On the questionnaire. Without Network marked, Arc, Turing, Toptal, and Gun.io leave. A job board has no kind and stays.",
  },
  devtools: {
    label: "What developer tools are",
    what: "A tool for people who write software: database, observability, deploy, editor.",
    applies: "On the questionnaire domain. Marked, a company in another sector leaves.",
  },
  fintech: {
    label: "What fintech is",
    what: "A money company: payments, banking, payroll, international hiring.",
    applies: "On the questionnaire domain. Marked, a company in another sector leaves.",
  },
  productivity: {
    label: "What productivity means",
    what: "A product for organizing the workday, such as a list or a calendar.",
    applies: "On the questionnaire domain. Marked, a company in another sector leaves.",
  },
  infra: {
    label: "What infra is",
    what: "The base software runs on: operating system, cloud, distribution.",
    applies: "On the questionnaire domain. Marked, a company in another sector leaves.",
  },
  publishing: {
    label: "What web publishing is",
    what: "A product for writing and publishing on the web, such as WordPress.",
    applies: "On the questionnaire domain. Marked, a company in another sector leaves.",
  },
  rubric: {
    label: "What a rubric is",
    what: "The score's ruler: what the evaluation looks at and how much it weighs. Mid-level is this version's ruler.",
    applies: "On the profile, at seniority. Senior and junior do not use this ruler.",
  },
};

export const TIPS: Record<Locale, Record<TipId, TipCopy>> = {
  "pt-BR": pt,
  "en-US": en,
};

export const TIP_MARKS: Record<Locale, TipMark[]> = {
  "pt-BR": [
    { id: "openToWork", pattern: "Open to Work" },
    { id: "easyApply", pattern: "Easy Apply" },
    { id: "vibe", pattern: "Vibe Engineering" },
    { id: "motionSelective", pattern: "candidatura seletiva", flags: "gi" },
    { id: "motionInbound", pattern: "recrutador chega", flags: "gi" },
    { id: "motionScreen", pattern: "triagem da rede", flags: "gi" },
    { id: "motionScreen", pattern: "triagem", flags: "gi" },
    { id: "contractShort", pattern: "contrato curto", flags: "gi" },
    { id: "contractLong", pattern: "contrato longo", flags: "gi" },
    { id: "barOpen", pattern: "processo direto", flags: "gi" },
    { id: "barHigh", pattern: "processo longo", flags: "gi" },
    { id: "readiness", pattern: "Readiness Score" },
    { id: "readiness", pattern: "Readiness" },
    { id: "profileScore", pattern: "Profile Score" },
    { id: "liveCode", pattern: "live code", flags: "gi" },
    { id: "ic", pattern: "IC ou gestão" },
    { id: "ic", pattern: "gestão", flags: "gi" },
    { id: "ic", pattern: "IC" },
    { id: "salary", pattern: "faixa", flags: "gi" },
    { id: "startup", pattern: "startup", flags: "gi" },
    { id: "fintech", pattern: "fintech", flags: "gi" },
    { id: "devtools", pattern: "developer tools", flags: "gi" },
    { id: "publishing", pattern: "publicação na web", flags: "gi" },
    { id: "publishing", pattern: "publicação", flags: "gi" },
    { id: "productivity", pattern: "produtividade", flags: "gi" },
    { id: "infra", pattern: "infra", flags: "gi" },
    { id: "domain", pattern: "domínio", flags: "gi" },
    { id: "inmail", pattern: "InMail" },
    { id: "eor", pattern: "EOR" },
    { id: "peo", pattern: "PEO" },
    { id: "ats", pattern: "ATS" },
    { id: "async", pattern: "async", flags: "gi" },
    { id: "staff", pattern: "staff", flags: "gi" },
    { id: "visto", pattern: "visto", flags: "gi" },
    { id: "rubric", pattern: "rubricas", flags: "gi" },
    { id: "rubric", pattern: "rubrica", flags: "gi" },
    { id: "fit", pattern: "fit cultural", flags: "gi" },
    { id: "fit", pattern: "fit contra uma vaga", flags: "gi" },
    { id: "fit", pattern: "fit", flags: "gi" },
    { id: "paceEarly", pattern: "Cedo para este canal" },
    { id: "paceEarly", pattern: "Cedo" },
    { id: "paceProfile", pattern: "Pelo perfil" },
  ],
  "en-US": [
    { id: "openToWork", pattern: "Open to Work" },
    { id: "easyApply", pattern: "Easy Apply" },
    { id: "vibe", pattern: "Vibe Engineering" },
    { id: "motionSelective", pattern: "Selective application" },
    { id: "motionInbound", pattern: "Recruiter comes to you" },
    { id: "motionScreen", pattern: "Network screen" },
    { id: "contractShort", pattern: "short contract", flags: "gi" },
    { id: "contractLong", pattern: "long contract", flags: "gi" },
    { id: "barOpen", pattern: "Direct process" },
    { id: "barHigh", pattern: "Long process" },
    { id: "readiness", pattern: "Readiness Score" },
    { id: "readiness", pattern: "Readiness" },
    { id: "profileScore", pattern: "Profile Score" },
    { id: "liveCode", pattern: "live code", flags: "gi" },
    { id: "ic", pattern: "IC or management" },
    { id: "ic", pattern: "management", flags: "gi" },
    { id: "ic", pattern: "IC" },
    { id: "salary", pattern: "salary band", flags: "gi" },
    { id: "startup", pattern: "startup", flags: "gi" },
    { id: "fintech", pattern: "fintech", flags: "gi" },
    { id: "devtools", pattern: "developer tools", flags: "gi" },
    { id: "publishing", pattern: "web publishing", flags: "gi" },
    { id: "productivity", pattern: "productivity", flags: "gi" },
    { id: "infra", pattern: "infra", flags: "gi" },
    { id: "domain", pattern: "domain", flags: "gi" },
    { id: "inmail", pattern: "InMail" },
    { id: "eor", pattern: "EOR" },
    { id: "peo", pattern: "PEO" },
    { id: "ats", pattern: "ATS" },
    { id: "async", pattern: "async", flags: "gi" },
    { id: "staff", pattern: "staff", flags: "gi" },
    { id: "visto", pattern: "visa", flags: "gi" },
    { id: "rubric", pattern: "rubrics", flags: "gi" },
    { id: "rubric", pattern: "rubric", flags: "gi" },
    { id: "fit", pattern: "not fit against a job post", flags: "gi" },
    { id: "fit", pattern: "Culture fit" },
    { id: "fit", pattern: "culture fit", flags: "gi" },
    { id: "fit", pattern: "fit", flags: "gi" },
    { id: "paceEarly", pattern: "Early for this channel" },
    { id: "paceEarly", pattern: "Early" },
    { id: "paceProfile", pattern: "From the profile" },
    { id: "matching", pattern: "Matching" },
  ],
};
