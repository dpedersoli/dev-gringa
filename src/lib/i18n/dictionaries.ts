import type { Locale } from "@/lib/domain/profile";
import { TIPS } from "@/lib/i18n/tips";

const pt = {
  locale: "pt-BR" as Locale,
  tips: TIPS["pt-BR"],
  tipWhat: "O que é",
  tipApplies: "Onde entra",
  productKicker: "dev na gringa",
  productName: "Prontidão",
  navPanel: "Painel",
  navProfile: "Perfil",
  navCv: "Currículo",
  navLinkedin: "LinkedIn",
  navRh: "RH",
  navTech: "Técnica",
  navFit: "Fit",
  navMatching: "Matching",
  onboardingTitle: "Antes da nota, o perfil",
  onboardingLead:
    "Ferramenta pessoal. Nada de conta. Esses dados calibram as avaliações das próximas fases — currículo, LinkedIn e entrevistas em inglês-US.",
  profileTitle: "Perfil",
  profileLead: "Um único perfil nesta máquina. Senioridade da v1 é pleno.",
  displayName: "Como te chamar",
  years: "Anos de experiência",
  seniority: "Senioridade",
  seniorityValue: "Pleno (fixo na v1)",
  seniorityHint:
    "Júnior ficou de fora: o filtro de visto e de experiência não é o que esta tela treina. Sênior não é a rubrica agora.",
  goalTitle: "O que você busca",
  goalHint:
    "Opcional. Em branco, a lista segue mercado, contrato e stack.",
  goalUnset: "Não marcar",
  goalSalary: "Faixa",
  goalSalaryUnsure: "Ainda sem número",
  goalSalary60: "Até 60 mil dólares por ano",
  goalSalary90: "De 60 a 90 mil dólares por ano",
  goalSalaryPlus: "Acima de 90 mil dólares por ano",
  goalVisa: "Visto",
  goalVisaRemote: "Remoto, sem visto",
  goalVisaRelocate: "Posso me mudar com patrocínio",
  goalVisaAuth: "Já tenho autorização",
  goalKind: "Tipo de empresa",
  goalKindProduct: "Produto",
  goalKindStartup: "Startup",
  goalKindNetwork: "Rede",
  goalTrack: "IC ou gestão",
  goalTrackIc: "IC",
  goalTrackManagement: "Gestão",
  goalTrackBoth: "Os dois",
  goalDomain: "Domínio",
  goalDomainDevtools: "Developer tools",
  goalDomainFintech: "Fintech",
  goalDomainProductivity: "Produtividade",
  goalDomainInfra: "Infra",
  goalDomainPublishing: "Publicação na web",
  stack: "Stack",
  stackHint: "Separe por vírgula. Ex.: React, Node.js, PostgreSQL",
  markets: "Mercados-alvo",
  contracts: "Tipo de contrato",
  uiLocale: "Idioma da interface",
  transcriptLocale: "Idioma da transcrição (quando existir entrevista)",
  transcriptHint:
    "A entrevista em si continua 100% inglês-US. Isto só escolhe como o texto vai aparecer na UI.",
  save: "Salvar e ir ao painel",
  saveProfile: "Salvar perfil",
  saving: "Salvando…",
  hello: "Olá",
  scoreTitle: "Profile Score",
  scoreUnmeasured: "Não medido",
  scorePartial: "Parcial",
  scoreHint:
    "CV e LinkedIn ainda não foram avaliados. Dimensão sem medida não vira zero.",
  scoreHintPartial:
    "Um dos dois módulos já tem nota. O Profile Score só aparece quando currículo e LinkedIn estiverem medidos.",
  scoreHintReady:
    "Composto 57% currículo + 43% LinkedIn. Entrevistas entram no Readiness ao lado.",
  scoreDone: "Feito",
  scoreMissing: "Faltando",
  nextTitle: "Próximo passo",
  nextBody:
    "Envie o currículo em inglês e cole o texto do Headline, do Sobre e das experiências do LinkedIn.",
  nextCv: "Avaliar o currículo agora.",
  nextLinkedin: "Avaliar o LinkedIn agora.",
  nextRh: "Fazer a entrevista de RH agora (inglês-US, timer sem pausa).",
  nextTech: "Fazer a entrevista técnica oral agora.",
  nextFit: "Fazer o fit cultural agora.",
  nextPhase5: "Entrevistas medidas. Abra o matching: onde procurar e como prospectar em cada canal.",
  modulesTitle: "Módulos",
  moduleUnmeasured: "Não medido",
  moduleLater: "Em breve",
  phaseBadge: "Fase 5 — matching",
  readinessTitle: "Readiness Score",
  readinessHint:
    "Falta falar. O composto só aparece com CV, LinkedIn e as três entrevistas. O que não foi medido não vira zero.",
  readinessHintPartial:
    "Já tem fala medida. O Readiness só fecha quando RH, técnica e fit existirem junto com o perfil escrito.",
  readinessHintReady:
    "Composto das dimensões medidas (CV, LinkedIn, RH, técnica, fit). Inglês falado já entra nas rubricas orais.",
  cvTitle: "Currículo",
  cvLead:
    "Cole o texto ou envie um PDF com camada de texto. A nota segue o padrão internacional para pleno remoto — não é fit contra uma vaga.",
  cvText: "Texto do currículo",
  cvPdf: "PDF (opcional)",
  cvSubmit: "Avaliar currículo",
  liTitle: "LinkedIn",
  liLead:
    "Abra seu LinkedIn, copie o texto de cada seção e cole abaixo.",
  liLeadHelpLabel: "Por que copiar o texto",
  liLeadHint:
    "Não cole o link do perfil. O LinkedIn bloqueia a leitura automática. Copie o texto da tela e cole aqui.",
  liLeadImageAlt:
    "Ilustração: copie Headline, About e Experiência do perfil; não cole o link.",
  liHeadline: "Headline",
  liHeadlineHelpLabel: "O que é Headline",
  liHeadlineHint:
    "A frase embaixo do seu nome. Perfil → lápis no topo → copie essa linha.",
  liHeadlineImageAlt: "Ilustração da Headline, a linha abaixo do nome no perfil.",
  liAbout: "About",
  liAboutHelpLabel: "O que é About",
  liAboutHint:
    "A seção Sobre. Role o perfil até Sobre, abra o lápis e copie o texto.",
  liAboutImageAlt: "Ilustração da seção About no perfil.",
  liExperience: "Experiências",
  liSubmit: "Avaliar LinkedIn",
  composerHint: "Enter quebra a linha. Shift+Enter envia.",
  analyzing: "Avaliando…",
  lastScore: "Última nota",
  strengths: "Acertos",
  improvements: "Melhorias",
  evidenceLabel: "Evidência",
  exampleLabel: "Exemplo reescrito",
  analyzeAgain: "Reavaliar",
  missingKeyHint:
    "Coloque ANTHROPIC_API_KEY em .env. Sem chave não inventamos nota.",
  errorEmpty: "Falta texto suficiente para avaliar.",
  errorKey: "Falta ANTHROPIC_API_KEY no .env.",
  errorLlm: "A Anthropic não devolveu uma avaliação. Tente de novo.",
  errorPdf:
    "Não deu para ler o PDF. Use um PDF com texto selecionável ou cole o conteúdo.",
  errorContract: "A resposta do modelo não passou no contrato (nota, acertos, melhorias, próximo passo). Tente de novo.",
  errorMic: "Sem acesso ao microfone. Permita o microfone e tente de novo.",
  errorStt:
    "Este browser não transcreve fala. Use Chrome ou Edge.",
  interviewLeadRh:
    "Tela de RH: sete perguntas em inglês-US, trinta minutos, sem pausa.",
  interviewLeadTech:
    "Técnica oral de Vibe Engineering, sem live code: cinco perguntas, quarenta e cinco minutos, sem pausa. Explique em voz alta.",
  interviewLeadFit:
    "Fit genérico de remoto/async. Não é uma empresa famosa. Seis perguntas, quarenta e cinco minutos, sem pausa.",
  interviewChrome: "Use Chrome ou Edge, com microfone. A pergunta é em inglês; a resposta também.",
  interviewRules:
    "O timer não pausa. Se zerar, você ganha 30 segundos extras e depois enviamos o que já foi falado. Encerrar congela o relógio na hora. Fechar a aba não zera o tempo. O feedback escrito sai no idioma da interface.",
  interviewStart: "Começar",
  interviewStartConfirmTitle: "Começar a entrevista?",
  interviewStartConfirmBody:
    "O timer dispara na hora e não pausa. Microfone em Chrome ou Edge. Tem certeza?",
  interviewStop: "Parar",
  interviewRestart: "Reiniciar",
  interviewStopConfirmTitle: "Parar a entrevista?",
  interviewStopConfirmBody:
    "A sessão é cancelada sem nota. O que você já falou nesta rodada não será avaliado.",
  interviewRestartConfirmTitle: "Reiniciar a entrevista?",
  interviewRestartConfirmBody:
    "A rodada atual é descartada sem nota e o timer começa do zero.",
  interviewConfirmYes: "Sim, tenho certeza",
  interviewConfirmNo: "Cancelar",
  interviewGrace:
    "Tempo extra: 30 segundos. Ao terminar, enviamos as respostas de até agora.",
  interviewQuestion: "Pergunta",
  interviewSpeakAgain: "Ouvir de novo",
  interviewListening: "O microfone está ativo. Fale em inglês-US.",
  interviewCapturing: "Captando o áudio — fale, o texto só aparece no fim.",
  interviewReviewTitle: "Perguntas e o que você falou",
  interviewYourAnswer: "Sua resposta (transcrita)",
  interviewEmptyAnswer: "(nenhuma fala transcrita nesta pergunta)",
  interviewTranscriptHint:
    "A transcrição é feita em segundo plano. Você não corrige o texto durante a fala.",
  interviewStackHint: "Termos do seu perfil:",
  interviewNext: "Próxima",
  interviewFinish: "Encerrar e avaliar",
  interviewFollowUp: "Pergunta extra",
  interviewFollowUpWait:
    "Relógio parado. Se a sua resposta pedir, vem uma pergunta sobre o que você disse.",
  interviewFollowUpAdded: "Mais tempo para esta resposta:",
  interviewSending: "Enviando",
  interviewSendingLeft: "faltam",
  market_us: "Estados Unidos",
  market_uk: "Reino Unido",
  market_ca: "Canadá",
  market_eu: "Europa",
  market_au: "Austrália",
  contract_short: "Contrato curto",
  contract_long: "Contrato longo",
  contract_freelance: "Freela",
  contractsHint:
    "Pode marcar mais de um. Freela e contrato juntos mostram os dois. Só um marcado mostra só esse.",
  module_cv: "Currículo",
  module_linkedin: "LinkedIn",
  module_rh: "Entrevista RH",
  module_tech_vibe: "Técnica (Vibe Engineering)",
  module_fit: "Fit cultural",
  module_challenge: "Desafio (enunciado)",
  matchingTitle: "Onde procurar",
  matchingLead:
    "Canais filtrados pelos mercados e pelos contratos do perfil. Cada um diz o movimento: recrutador chega, candidatura seletiva, ou uma triagem da rede.",
  matchingProfileOnly:
    "Ainda não há Readiness. A lista segue só o perfil. A nota, quando existir, marca o ritmo e não esconde canal.",
  matchingReadiness:
    "Readiness {score}. Abaixo de 60 a triagem fica cedo. De 60 a 74 os quadros são o canal principal. De 75 em diante a triagem também é.",
  matchingEmpty: "Nenhum canal cruza os mercados e os contratos deste perfil.",
  matchingSeeking:
    "O perfil busca {types}. A lista oferece o que está marcado: os dois quando os dois estão, ou só um quando só um está.",
  matchingEditProfile: "Mudar no perfil",
  matchingHow: "Como prospectar",
  matchingHowEmployment: "Como prospectar no contrato",
  matchingHowFreelance: "Como prospectar no freela",
  matchingMotionInbound: "Recrutador chega",
  matchingMotionSelective: "Candidatura seletiva",
  matchingMotionScreen: "Triagem da rede",
  matchingPacePrimary: "Canal principal",
  matchingPaceSecondary: "Canal secundário",
  matchingPaceEarly: "Cedo para este canal",
  matchingPaceProfile: "Pelo perfil",
  matchingCompaniesTitle: "Empresas",
  matchingCompaniesLead:
    "Agrupadas pelo contrato marcado no perfil. A nota marca o ritmo e não esconde a empresa. O país da vaga continua sendo lido por você.",
  matchingCompaniesEmpty:
    "Nenhuma empresa deste catálogo entra nesse contrato. Para contrato curto, o caminho segue nos canais acima.",
  matchingCompaniesGoalsEmpty:
    "Nenhuma empresa deste catálogo cruza o tipo ou o domínio marcado. Os canais acima continuam.",
  matchingSalaryNote:
    "A faixa marcada é {band}. Ela não tira empresa da lista. Entra na entrevista de RH e na leitura da vaga.",
  matchingVisaCaution:
    "Você marcou remoto sem visto. Este canal é triagem para empresa dos EUA. Leia se a vaga exige residência.",
  matchingTrackIc:
    "Você marcou gestão. Este catálogo é cargo de IC: quem entrega o código. Gestão de pessoas não tem empresa aqui.",
  matchingCompanyPrimary: "Para agora",
  matchingCompanySecondary: "Depois",
  matchingCompanyEarly: "Cedo",
  matchingCompanyProfile: "Pelo perfil",
  matchingBarOpen: "Processo direto",
  matchingBarHigh: "Processo longo",
  matchingLiveCodeForbidden:
    "Live code: proibida. A página pública deste processo pede para não usar ferramenta de IA na prova.",
  matchingLiveCodeAllowed:
    "Live code: permitida. Pode usar IA como ferramenta. A nota é o seu raciocínio, e você diz que usou.",
  matchingLiveCodeExpected:
    "Live code: esperada. Eles pedem para usar IA e explicar o que saiu.",
  matchingLiveCodeMixed:
    "Live code: mista. Uma parte do processo permite IA e outra proíbe. Leia qual rodada é qual.",
  matchingLiveCodeUnspecified:
    "Live code: sem regra pública. O convite desta vaga é a regra.",
  matchingCoursesTitle: "Cursos",
  matchingCoursesLead:
    "Links filtrados pela stack do perfil. Inglês falado entra sempre: a entrevista é oral.",
  matchingCoursesEmpty: "Nenhum curso cruza a stack deste perfil.",
  toastProfile: "Perfil salvo.",
  toastCv: "Currículo avaliado.",
  toastLinkedin: "LinkedIn avaliado.",
  toastInterview: "Entrevista avaliada.",
  toastInterviewStarted: "Entrevista aberta.",
  toastInterviewStopped: "Entrevista cancelada.",
  toastInterviewStopWarn: "A tela foi zerada. O cancelamento não foi gravado.",
  toastFollowUp: "Não deu para decidir a pergunta extra. Seguimos o banco.",
  toastAudio: "O áudio de backup não foi gravado. A nota segue na transcrição.",
  errorSession: "Essa entrevista não está mais aberta.",
  themeToDark: "Usar tema escuro",
  themeToLight: "Usar tema claro",
  errorGeneric: "Não deu para salvar. Confira os campos obrigatórios.",
};

export type Dictionary = typeof pt;

const en: Dictionary = {
  locale: "en-US",
  tips: TIPS["en-US"],
  tipWhat: "What it is",
  tipApplies: "Where it applies",
  productKicker: "working abroad",
  productName: "Readiness",
  navPanel: "Dashboard",
  navProfile: "Profile",
  navCv: "Resume",
  navLinkedin: "LinkedIn",
  navRh: "Recruiter",
  navTech: "Technical",
  navFit: "Fit",
  navMatching: "Matching",
  onboardingTitle: "Profile first, score later",
  onboardingLead:
    "Personal tool. No account. This calibrates later evaluations — resume, LinkedIn, and English-US interviews.",
  profileTitle: "Profile",
  profileLead: "Single profile on this machine. v1 seniority is mid-level (pleno).",
  displayName: "What to call you",
  years: "Years of experience",
  seniority: "Seniority",
  seniorityValue: "Mid-level / pleno (locked in v1)",
  seniorityHint:
    "Junior is out: the visa and experience filter is not what this screen trains. Senior is not the rubric yet.",
  goalTitle: "What you are looking for",
  goalHint: "Optional. Blank, the list still follows market, contract, and stack.",
  goalUnset: "Leave unset",
  goalSalary: "Salary band",
  goalSalaryUnsure: "No number yet",
  goalSalary60: "Up to 60 thousand dollars a year",
  goalSalary90: "From 60 to 90 thousand dollars a year",
  goalSalaryPlus: "Above 90 thousand dollars a year",
  goalVisa: "Visa",
  goalVisaRemote: "Remote, no visa",
  goalVisaRelocate: "I can relocate with sponsorship",
  goalVisaAuth: "I already have authorization",
  goalKind: "Company kind",
  goalKindProduct: "Product",
  goalKindStartup: "Startup",
  goalKindNetwork: "Network",
  goalTrack: "IC or management",
  goalTrackIc: "IC",
  goalTrackManagement: "Management",
  goalTrackBoth: "Both",
  goalDomain: "Domain",
  goalDomainDevtools: "Developer tools",
  goalDomainFintech: "Fintech",
  goalDomainProductivity: "Productivity",
  goalDomainInfra: "Infra",
  goalDomainPublishing: "Web publishing",
  stack: "Stack",
  stackHint: "Comma-separated. e.g. React, Node.js, PostgreSQL",
  markets: "Target markets",
  contracts: "Contract type",
  uiLocale: "Interface language",
  transcriptLocale: "Transcript language (when interviews exist)",
  transcriptHint:
    "The interview itself stays 100% English-US. This only chooses how text shows up in the UI.",
  save: "Save and go to dashboard",
  saveProfile: "Save profile",
  saving: "Saving…",
  hello: "Hi",
  scoreTitle: "Profile Score",
  scoreUnmeasured: "Not measured",
  scorePartial: "Partial",
  scoreHint:
    "Resume and LinkedIn have not been evaluated yet. Unmeasured does not become zero.",
  scoreHintPartial:
    "One module already has a score. Profile Score only appears when both resume and LinkedIn are measured.",
  scoreHintReady:
    "57% resume + 43% LinkedIn. Interviews feed Readiness next to this card.",
  scoreDone: "Done",
  scoreMissing: "Missing",
  nextTitle: "Next step",
  nextBody:
    "Submit an English resume and paste LinkedIn Headline, About, and experience.",
  nextCv: "Evaluate the resume now.",
  nextLinkedin: "Evaluate LinkedIn now.",
  nextRh: "Take the recruiter interview now (English-US, timer does not pause).",
  nextTech: "Take the oral technical interview now.",
  nextFit: "Take the culture-fit interview now.",
  nextPhase5:
    "Spoken interviews are measured. Open matching: where to look and how to prospect on each channel.",
  modulesTitle: "Modules",
  moduleUnmeasured: "Not measured",
  moduleLater: "Later",
  phaseBadge: "Phase 5 — matching",
  readinessTitle: "Readiness Score",
  readinessHint:
    "Speaking is still unmeasured. The composite appears only with resume, LinkedIn, and all three interviews. Unmeasured does not become zero.",
  readinessHintPartial:
    "Some speaking is scored. Readiness closes when recruiter, technical, and fit exist together with the written profile.",
  readinessHintReady:
    "Composite of measured dimensions (resume, LinkedIn, recruiter, technical, fit). Spoken English is already inside the oral rubrics.",
  cvTitle: "Resume",
  cvLead:
    "Paste text or upload a text-based PDF. Scored for international mid-level remote — not fit against a job post.",
  cvText: "Resume text",
  cvPdf: "PDF (optional)",
  cvSubmit: "Evaluate resume",
  liTitle: "LinkedIn",
  liLead:
    "Open your LinkedIn, copy the text of each section, and paste it below.",
  liLeadHelpLabel: "Why paste the text",
  liLeadHint:
    "Do not paste your profile URL. LinkedIn blocks automatic reading. Copy the text on screen and paste it here.",
  liLeadImageAlt:
    "Illustration: copy Headline, About, and Experience from the profile; do not paste the link.",
  liHeadline: "Headline",
  liHeadlineHelpLabel: "What Headline is",
  liHeadlineHint:
    "The line under your name. Profile → pencil at the top → copy that line.",
  liHeadlineImageAlt: "Illustration of the Headline, the line under the name.",
  liAbout: "About",
  liAboutHelpLabel: "What About is",
  liAboutHint:
    "The About section. Scroll to About, open the pencil, and copy the text.",
  liAboutImageAlt: "Illustration of the About section on a profile.",
  liExperience: "Experience",
  liSubmit: "Evaluate LinkedIn",
  composerHint: "Enter inserts a new line. Shift+Enter submits.",
  analyzing: "Evaluating…",
  lastScore: "Latest score",
  strengths: "Strengths",
  improvements: "Improvements",
  evidenceLabel: "Evidence",
  exampleLabel: "Rewritten example",
  analyzeAgain: "Evaluate again",
  missingKeyHint:
    "Set ANTHROPIC_API_KEY in .env. We will not invent a score without it.",
  errorEmpty: "Not enough text to evaluate.",
  errorKey: "ANTHROPIC_API_KEY is missing from .env.",
  errorLlm: "Anthropic did not return an evaluation. Try again.",
  errorPdf:
    "Could not read the PDF. Use a text-selectable PDF or paste the contents.",
  errorContract:
    "Model output failed the contract (score, strengths, improvements, next step). Try again.",
  errorMic: "No microphone access. Allow the mic and try again.",
  errorStt: "This browser cannot transcribe speech. Use Chrome or Edge.",
  interviewLeadRh:
    "Recruiter screen: seven questions in English-US, thirty minutes, no pause.",
  interviewLeadTech:
    "Oral Vibe Engineering, with no live code: five questions, forty-five minutes, no pause. Think out loud.",
  interviewLeadFit:
    "Generic remote/async fit. Not a named company. Six questions, forty-five minutes, no pause.",
  interviewChrome:
    "Use Chrome or Edge, with a microphone. The question is in English; so is the answer.",
  interviewRules:
    "The timer does not pause. When it hits zero you get 30 extra seconds, then we send whatever you already said. Finish freezes the clock immediately. Closing the tab does not reset the clock. Written feedback uses the UI language.",
  interviewStart: "Start",
  interviewStartConfirmTitle: "Start the interview?",
  interviewStartConfirmBody:
    "The timer starts immediately and does not pause. Microphone in Chrome or Edge. Are you sure?",
  interviewStop: "Stop",
  interviewRestart: "Restart",
  interviewStopConfirmTitle: "Stop the interview?",
  interviewStopConfirmBody:
    "This session is cancelled with no score. What you already said in this round will not be evaluated.",
  interviewRestartConfirmTitle: "Restart the interview?",
  interviewRestartConfirmBody:
    "The current round is discarded with no score and the timer starts from zero.",
  interviewConfirmYes: "Yes, I am sure",
  interviewConfirmNo: "Cancel",
  interviewGrace:
    "Extra time: 30 seconds. When it ends, we send the answers so far.",
  interviewQuestion: "Question",
  interviewSpeakAgain: "Play again",
  interviewListening: "The microphone is on. Speak in English-US.",
  interviewCapturing: "Capturing audio — the text appears only at the end.",
  interviewReviewTitle: "Questions and what you said",
  interviewYourAnswer: "Your answer (transcript)",
  interviewEmptyAnswer: "(no spoken answer captured for this question)",
  interviewTranscriptHint:
    "Transcription runs in the background. You do not edit text while speaking.",
  interviewStackHint: "Terms from your profile:",
  interviewNext: "Next",
  interviewFinish: "Finish and score",
  interviewFollowUp: "Follow-up",
  interviewFollowUpWait:
    "Clock paused. If your answer needs it, one question about what you just said comes next.",
  interviewFollowUpAdded: "More time for this answer:",
  interviewSending: "Sending",
  interviewSendingLeft: "left",
  market_us: "United States",
  market_uk: "United Kingdom",
  market_ca: "Canada",
  market_eu: "Europe",
  market_au: "Australia",
  contract_short: "Short contract",
  contract_long: "Long contract",
  contract_freelance: "Freelance",
  contractsHint:
    "You can check more than one. Freelance and a contract together show both. One checked shows only that.",
  module_cv: "Resume",
  module_linkedin: "LinkedIn",
  module_rh: "Recruiter interview",
  module_tech_vibe: "Technical (Vibe Engineering)",
  module_fit: "Culture fit",
  module_challenge: "Challenge (prompt only)",
  matchingTitle: "Where to look",
  matchingLead:
    "Channels filtered by the markets and contract types on the profile. Each one names the motion: the recruiter comes to you, a selective application, or a network screen.",
  matchingProfileOnly:
    "There is no Readiness yet. The list follows the profile only. When a score exists, it marks the pace and does not hide a channel.",
  matchingReadiness:
    "Readiness {score}. Below 60 a network screen is early. From 60 to 74 the boards are the main channel. From 75 up the screen is too.",
  matchingEmpty: "No channel crosses this profile's markets and contract types.",
  matchingSeeking:
    "The profile is seeking {types}. The list offers what is checked: both when both are checked, or only one when only one is.",
  matchingEditProfile: "Change on the profile",
  matchingHow: "How to prospect",
  matchingHowEmployment: "How to prospect for a contract",
  matchingHowFreelance: "How to prospect for freelance",
  matchingMotionInbound: "Recruiter comes to you",
  matchingMotionSelective: "Selective application",
  matchingMotionScreen: "Network screen",
  matchingPacePrimary: "Main channel",
  matchingPaceSecondary: "Secondary channel",
  matchingPaceEarly: "Early for this channel",
  matchingPaceProfile: "From the profile",
  matchingCompaniesTitle: "Companies",
  matchingCompaniesLead:
    "Grouped by the contract checked on the profile. The score marks the pace and does not hide the company. You still read the role's country.",
  matchingCompaniesEmpty:
    "No company in this catalog fits that contract. For a short contract, the path stays on the channels above.",
  matchingCompaniesGoalsEmpty:
    "No company in this catalog crosses the kind or domain you marked. The channels above stay.",
  matchingSalaryNote:
    "The marked band is {band}. It does not remove a company. It informs the recruiter interview and how you read a role.",
  matchingVisaCaution:
    "You marked remote with no visa. This channel screens for a US company. Read whether the role requires residence.",
  matchingTrackIc:
    "You marked management. This catalog is an IC role: the person who ships the code. People management has no company here.",
  matchingCompanyPrimary: "For now",
  matchingCompanySecondary: "Later",
  matchingCompanyEarly: "Early",
  matchingCompanyProfile: "From the profile",
  matchingBarOpen: "Direct process",
  matchingBarHigh: "Long process",
  matchingLiveCodeForbidden:
    "Live code: forbidden. The public page for this process asks you not to use an AI tool on the test.",
  matchingLiveCodeAllowed:
    "Live code: allowed. You may use AI as a tool. The score is your reasoning, and you say that you used it.",
  matchingLiveCodeExpected:
    "Live code: expected. They ask you to use AI and explain what came out.",
  matchingLiveCodeMixed:
    "Live code: mixed. One part of the process allows AI and another forbids it. Read which round is which.",
  matchingLiveCodeUnspecified:
    "Live code: no public rule. The invite for this role is the rule.",
  matchingCoursesTitle: "Courses",
  matchingCoursesLead:
    "Links filtered by the profile stack. Spoken English always shows: the interview is oral.",
  matchingCoursesEmpty: "No course matches this profile's stack.",
  toastProfile: "Profile saved.",
  toastCv: "Resume evaluated.",
  toastLinkedin: "LinkedIn evaluated.",
  toastInterview: "Interview evaluated.",
  toastInterviewStarted: "Interview opened.",
  toastInterviewStopped: "Interview cancelled.",
  toastInterviewStopWarn: "The screen was reset. The cancellation was not saved.",
  toastFollowUp: "Could not decide the extra question. Continuing the bank.",
  toastAudio: "The backup audio was not saved. The score still uses the transcript.",
  errorSession: "That interview is no longer open.",
  themeToDark: "Use dark theme",
  themeToLight: "Use light theme",
  errorGeneric: "Could not save. Check the required fields.",
};

export const dictionaries: Record<Locale, Dictionary> = {
  "pt-BR": pt,
  "en-US": en,
};

export function getDictionary(locale: Locale | null | undefined): Dictionary {
  return dictionaries[locale ?? "pt-BR"];
}
