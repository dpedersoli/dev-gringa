import type { Locale } from "@/lib/domain/profile";

const pt = {
  productKicker: "dev na gringa",
  productName: "Prontidão",
  navPanel: "Painel",
  navProfile: "Perfil",
  navCv: "Currículo",
  navLinkedin: "LinkedIn",
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
    "Júnior ficou de fora de propósito: o filtro internacional não é só treino. Sênior não é a rubrica agora.",
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
    "Composto 57% currículo + 43% LinkedIn. Ainda não é o Readiness completo (faltam entrevistas).",
  nextTitle: "Próximo passo",
  nextBody:
    "Envie o currículo em inglês e cole Headline, About e experiências do LinkedIn.",
  nextCv: "Avaliar o currículo agora.",
  nextLinkedin: "Avaliar o LinkedIn agora.",
  nextPhase4:
    "Perfil escrito medido. Entrevistas faladas entram na Fase 4 — ainda não nesta versão.",
  modulesTitle: "Módulos",
  moduleUnmeasured: "Não medido",
  moduleLater: "Em breve",
  phaseBadge: "Fase 3 — bloco de perfil",
  cvTitle: "Currículo",
  cvLead:
    "Cole o texto ou envie um PDF com camada de texto. A nota segue o padrão internacional para pleno remoto — não é fit contra uma vaga.",
  cvText: "Texto do currículo",
  cvPdf: "PDF (opcional)",
  cvSubmit: "Avaliar currículo",
  liTitle: "LinkedIn",
  liLead:
    "Cole Headline, About e experiências. Sem OAuth e sem link mágico — copie do próprio perfil.",
  liHeadline: "Headline",
  liAbout: "About",
  liExperience: "Experiências",
  liSubmit: "Avaliar LinkedIn",
  analyzing: "Avaliando…",
  lastScore: "Última nota",
  strengths: "Acertos",
  improvements: "Melhorias",
  evidenceLabel: "Evidência",
  exampleLabel: "Exemplo reescrito",
  analyzeAgain: "Reavaliar",
  missingKeyHint:
    "Coloque ANTHROPIC_API_KEY em .env.local (veja .env.example). Sem chave não inventamos nota.",
  errorEmpty: "Falta texto suficiente para avaliar.",
  errorKey: "Falta ANTHROPIC_API_KEY no .env.local.",
  errorLlm: "A Anthropic não devolveu uma avaliação. Tente de novo.",
  errorPdf:
    "Não deu para ler o PDF. Use um PDF com texto selecionável ou cole o conteúdo.",
  errorContract: "A resposta do modelo não passou no contrato (nota + 3+3+1). Tente de novo.",
  market_us: "Estados Unidos",
  market_uk: "Reino Unido",
  market_ca: "Canadá",
  market_eu: "Europa",
  market_au: "Austrália",
  contract_short: "Contrato curto",
  contract_long: "Contrato longo",
  contract_freelance: "Freela",
  module_cv: "Currículo",
  module_linkedin: "LinkedIn",
  module_rh: "Entrevista RH",
  module_tech_vibe: "Técnica (Vibe Engineering)",
  module_fit: "Fit cultural",
  module_challenge: "Desafio (enunciado)",
  errorGeneric: "Não deu para salvar. Confira os campos obrigatórios.",
};

export type Dictionary = typeof pt;

const en: Dictionary = {
  productKicker: "working abroad",
  productName: "Readiness",
  navPanel: "Dashboard",
  navProfile: "Profile",
  navCv: "Resume",
  navLinkedin: "LinkedIn",
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
    "Junior is out on purpose: the international filter is not just practice. Senior is not the rubric yet.",
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
    "57% resume + 43% LinkedIn. This is not the full Readiness score (interviews come later).",
  nextTitle: "Next step",
  nextBody:
    "Submit an English resume and paste LinkedIn Headline, About, and experience.",
  nextCv: "Evaluate the resume now.",
  nextLinkedin: "Evaluate LinkedIn now.",
  nextPhase4:
    "Written profile is measured. Spoken interviews are Phase 4 — not in this version yet.",
  modulesTitle: "Modules",
  moduleUnmeasured: "Not measured",
  moduleLater: "Later",
  phaseBadge: "Phase 3 — profile block",
  cvTitle: "Resume",
  cvLead:
    "Paste text or upload a text-based PDF. Scored for international mid-level remote — not fit against a job post.",
  cvText: "Resume text",
  cvPdf: "PDF (optional)",
  cvSubmit: "Evaluate resume",
  liTitle: "LinkedIn",
  liLead:
    "Paste Headline, About, and experience. No OAuth and no magic URL — copy from your own profile.",
  liHeadline: "Headline",
  liAbout: "About",
  liExperience: "Experience",
  liSubmit: "Evaluate LinkedIn",
  analyzing: "Evaluating…",
  lastScore: "Latest score",
  strengths: "Strengths",
  improvements: "Improvements",
  evidenceLabel: "Evidence",
  exampleLabel: "Rewritten example",
  analyzeAgain: "Evaluate again",
  missingKeyHint:
    "Set ANTHROPIC_API_KEY in .env.local (see .env.example). We will not invent a score without it.",
  errorEmpty: "Not enough text to evaluate.",
  errorKey: "ANTHROPIC_API_KEY is missing from .env.local.",
  errorLlm: "Anthropic did not return an evaluation. Try again.",
  errorPdf:
    "Could not read the PDF. Use a text-selectable PDF or paste the contents.",
  errorContract:
    "Model output failed the contract (score + 3+3+1). Try again.",
  market_us: "United States",
  market_uk: "United Kingdom",
  market_ca: "Canada",
  market_eu: "Europe",
  market_au: "Australia",
  contract_short: "Short contract",
  contract_long: "Long contract",
  contract_freelance: "Freelance",
  module_cv: "Resume",
  module_linkedin: "LinkedIn",
  module_rh: "Recruiter interview",
  module_tech_vibe: "Technical (Vibe Engineering)",
  module_fit: "Culture fit",
  module_challenge: "Challenge (prompt only)",
  errorGeneric: "Could not save. Check the required fields.",
};

export const dictionaries: Record<Locale, Dictionary> = {
  "pt-BR": pt,
  "en-US": en,
};

export function getDictionary(locale: Locale | null | undefined): Dictionary {
  return dictionaries[locale ?? "pt-BR"];
}
