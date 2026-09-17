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
};

export const MARKETS: MarketId[] = ["us", "uk", "ca", "eu", "au"];
export const CONTRACTS: ContractType[] = ["short", "long", "freelance"];
export const LOCALES: Locale[] = ["pt-BR", "en-US"];
