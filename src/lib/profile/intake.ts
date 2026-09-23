import {
  COMPANY_KINDS,
  CONTRACTS,
  DOMAINS,
  MARKETS,
  SALARY_BANDS,
  TRACKS,
  VISA_STANCES,
  type CompanyKind,
  type ContractType,
  type DomainId,
  type Goals,
  type MarketId,
  type Profile,
  type SalaryBand,
  type Track,
  type VisaStance,
} from "@/lib/domain/profile";

export const YEAR_BANDS = ["under_3", "3_5", "5_8", "8_plus"] as const;
export type YearBand = (typeof YEAR_BANDS)[number];

export const STACK_CHOICES = [
  "React",
  "Next.js",
  "Node.js",
  "Expo React Native",
  "TypeScript",
  "PostgreSQL",
] as const;

export type IntakeInput = {
  yearBand: string;
  stack: string[];
  stackOther: string;
  stackUnset: boolean;
  markets: string[];
  marketsUnset: boolean;
  contracts: string[];
  contractsUnset: boolean;
  salaryBand: string;
  visa: string;
  companyKinds: string[];
  companyKindsUnset: boolean;
  track: string;
  domains: string[];
  domainsUnset: boolean;
};

function asEnum<T extends string>(value: string, allowed: readonly T[]): T | undefined {
  return allowed.includes(value as T) ? (value as T) : undefined;
}

function onlyAllowed<T extends string>(values: string[], allowed: readonly T[]): T[] {
  return values.filter((item): item is T => allowed.includes(item as T));
}

export function yearsFromBand(band: YearBand): number {
  if (band === "under_3") return 2;
  if (band === "3_5") return 4;
  if (band === "5_8") return 6;
  return 8;
}

function otherStack(text: string, chosen: string[]): string[] {
  const seen = new Set(chosen);
  return text
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0 && !seen.has(item));
}

function listOrClear<T extends string>(
  values: string[],
  unset: boolean,
  allowed: readonly T[],
): T[] | null {
  const picked = onlyAllowed(values, allowed);
  if (picked.length > 0) return picked;
  if (unset) return [];
  return null;
}

export const INTAKE_GROUPS = ["years", "stack", "markets", "contracts", "kinds", "domains"] as const;
export type IntakeGap = (typeof INTAKE_GROUPS)[number];

export function intakeGaps(existing: Profile | null, input: IntakeInput): IntakeGap[] {
  const gaps: IntakeGap[] = [];
  const band = asEnum(input.yearBand, YEAR_BANDS);
  const years =
    input.yearBand === "keep"
      ? existing?.yearsExperience
      : band
        ? yearsFromBand(band)
        : undefined;
  if (!years || years < 1) gaps.push("years");

  const chosenStack = onlyAllowed(input.stack, STACK_CHOICES);
  const extraStack = otherStack(input.stackOther, chosenStack);
  if (chosenStack.length + extraStack.length === 0 && !input.stackUnset) gaps.push("stack");

  if (listOrClear(input.markets, input.marketsUnset, MARKETS) === null) gaps.push("markets");
  if (listOrClear(input.contracts, input.contractsUnset, CONTRACTS) === null) gaps.push("contracts");
  if (listOrClear(input.companyKinds, input.companyKindsUnset, COMPANY_KINDS) === null) {
    gaps.push("kinds");
  }
  if (listOrClear(input.domains, input.domainsUnset, DOMAINS) === null) gaps.push("domains");
  return gaps;
}

export function applyIntake(existing: Profile | null, input: IntakeInput): Profile | null {
  if (intakeGaps(existing, input).length > 0) return null;

  const band = asEnum(input.yearBand, YEAR_BANDS);
  const years =
    input.yearBand === "keep"
      ? existing?.yearsExperience
      : band
        ? yearsFromBand(band)
        : undefined;
  if (!years || years < 1) return null;

  const markets = listOrClear(input.markets, input.marketsUnset, MARKETS);
  const contracts = listOrClear(input.contracts, input.contractsUnset, CONTRACTS);
  const kinds = listOrClear(input.companyKinds, input.companyKindsUnset, COMPANY_KINDS);
  const domains = listOrClear(input.domains, input.domainsUnset, DOMAINS);
  if (!markets || !contracts || !kinds || !domains) return null;

  const chosenStack = onlyAllowed(input.stack, STACK_CHOICES);
  const extraStack = otherStack(input.stackOther, chosenStack);
  const stack = [...chosenStack, ...extraStack];
  if (stack.length === 0) {
    if (!input.stackUnset) return null;
  }

  const salaryBand = asEnum(input.salaryBand, SALARY_BANDS);
  const visa = asEnum(input.visa, VISA_STANCES);
  const track = asEnum(input.track, TRACKS);
  const goals: Goals = {
    ...(salaryBand ? { salaryBand } : {}),
    ...(visa ? { visa } : {}),
    ...(track ? { track } : {}),
    ...(kinds.length ? { companyKinds: kinds } : {}),
    ...(domains.length ? { domains } : {}),
  };

  return {
    displayName: existing?.displayName ?? "",
    yearsExperience: years,
    seniority: "pleno",
    stack,
    targetMarkets: markets,
    contractTypes: contracts,
    uiLocale: existing?.uiLocale ?? "pt-BR",
    transcriptLocale: existing?.transcriptLocale ?? "pt-BR",
    updatedAt: new Date().toISOString(),
    ...(Object.keys(goals).length ? { goals } : {}),
  };
}
