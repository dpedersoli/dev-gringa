export const MODULE_IDS = [
  "cv",
  "linkedin",
  "rh",
  "tech_vibe",
  "fit",
  "challenge",
] as const;

export type ModuleId = (typeof MODULE_IDS)[number];

export type Locale = "pt-BR" | "en-US";

export type MarketId = "us" | "uk" | "ca" | "eu" | "au";

export type ContractType = "short" | "long" | "freelance";

export type Seniority = "pleno";

export const SALARY_BANDS = ["unsure", "upto_60", "60_90", "90_plus"] as const;
export type SalaryBand = (typeof SALARY_BANDS)[number];

export const VISA_STANCES = ["remote_br", "relocate", "authorized"] as const;
export type VisaStance = (typeof VISA_STANCES)[number];

export const COMPANY_KINDS = ["product", "startup", "network"] as const;
export type CompanyKind = (typeof COMPANY_KINDS)[number];

export const TRACKS = ["ic", "management", "both"] as const;
export type Track = (typeof TRACKS)[number];

export const DOMAINS = ["devtools", "fintech", "productivity", "infra", "publishing"] as const;
export type DomainId = (typeof DOMAINS)[number];

export type Goals = {
  salaryBand?: SalaryBand;
  visa?: VisaStance;
  companyKinds?: CompanyKind[];
  track?: Track;
  domains?: DomainId[];
};

export type Profile = {
  displayName: string;
  yearsExperience: number;
  seniority: Seniority;
  stack: string[];
  targetMarkets: MarketId[];
  contractTypes: ContractType[];
  uiLocale: Locale;
  transcriptLocale: Locale;
  updatedAt: string;
  goals?: Goals;
};

export function hasCompanyGoalFilter(goals: Goals | undefined): boolean {
  if (!goals) return false;
  return Boolean(goals.companyKinds?.length || goals.domains?.length);
}

export const MARKETS: MarketId[] = ["us", "uk", "ca", "eu", "au"];
export const CONTRACTS: ContractType[] = ["short", "long", "freelance"];
export const LOCALES: Locale[] = ["pt-BR", "en-US"];
