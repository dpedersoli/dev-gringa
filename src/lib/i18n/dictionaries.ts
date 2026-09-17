import type { Locale } from "@/lib/domain/profile";

const pt = {
  productKicker: "dev na gringa",
  productName: "Prontidão",
  navPanel: "Painel",
  navProfile: "Perfil",
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
  scoreHint:
    "CV e LinkedIn ainda não foram avaliados. Dimensão sem medida não vira zero — a nota nasce na Fase 3.",
  nextTitle: "Próximo passo",
  nextBody:
    "Quando a Fase 3 abrir: enviar o currículo em inglês e colar Headline, About e experiências do LinkedIn.",
  modulesTitle: "Módulos",
  moduleUnmeasured: "Não medido",
  moduleLater: "Em breve",
  phaseBadge: "Fase 2 — fundação",
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
  scoreHint:
    "Resume and LinkedIn have not been evaluated yet. Unmeasured does not become zero — the score starts in Phase 3.",
  nextTitle: "Next step",
  nextBody:
    "When Phase 3 opens: upload an English resume and paste LinkedIn Headline, About, and experience.",
  modulesTitle: "Modules",
  moduleUnmeasured: "Not measured",
  moduleLater: "Later",
  phaseBadge: "Phase 2 — foundation",
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
