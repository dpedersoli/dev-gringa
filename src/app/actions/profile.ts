"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  COMPANY_KINDS,
  CONTRACTS,
  DOMAINS,
  LOCALES,
  MARKETS,
  SALARY_BANDS,
  TRACKS,
  VISA_STANCES,
  type CompanyKind,
  type ContractType,
  type DomainId,
  type Goals,
  type Locale,
  type MarketId,
  type Profile,
  type SalaryBand,
  type Track,
  type VisaStance,
} from "@/lib/domain/profile";
import { feedbackHref } from "@/lib/feedback";
import { writeProfile } from "@/lib/storage/store";

function asLocale(value: FormDataEntryValue | null): Locale {
  const raw = String(value ?? "pt-BR");
  return LOCALES.includes(raw as Locale) ? (raw as Locale) : "pt-BR";
}

function parseList<T extends string>(
  formData: FormData,
  key: string,
  allowed: readonly T[],
): T[] {
  return formData
    .getAll(key)
    .map((item) => String(item))
    .filter((item): item is T => (allowed as readonly string[]).includes(item));
}

function asEnum<T extends string>(
  value: FormDataEntryValue | null,
  allowed: readonly T[],
): T | undefined {
  const raw = String(value ?? "");
  return allowed.includes(raw as T) ? (raw as T) : undefined;
}

export async function saveProfile(formData: FormData) {
  const displayName = String(formData.get("displayName") ?? "").trim();
  const yearsRaw = Number(formData.get("yearsExperience"));
  const stack = String(formData.get("stack") ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const targetMarkets = parseList<MarketId>(formData, "targetMarkets", MARKETS);
  const contractTypes = parseList<ContractType>(
    formData,
    "contractTypes",
    CONTRACTS,
  );
  const from = String(formData.get("from") ?? "onboarding");
  const salaryBand = asEnum<SalaryBand>(formData.get("salaryBand"), SALARY_BANDS);
  const visa = asEnum<VisaStance>(formData.get("visa"), VISA_STANCES);
  const track = asEnum<Track>(formData.get("track"), TRACKS);
  const companyKinds = parseList<CompanyKind>(formData, "companyKinds", COMPANY_KINDS);
  const domains = parseList<DomainId>(formData, "domains", DOMAINS);
  const goals: Goals = {
    ...(salaryBand ? { salaryBand } : {}),
    ...(visa ? { visa } : {}),
    ...(track ? { track } : {}),
    ...(companyKinds.length ? { companyKinds } : {}),
    ...(domains.length ? { domains } : {}),
  };

  if (!displayName || !Number.isFinite(yearsRaw) || yearsRaw < 1) {
    redirect(feedbackHref(from === "profile" ? "/profile" : "/onboarding", "error", "1"));
  }

  const profile: Profile = {
    displayName,
    yearsExperience: Math.round(yearsRaw),
    seniority: "pleno",
    stack,
    targetMarkets: targetMarkets.length ? targetMarkets : ["us"],
    contractTypes: contractTypes.length ? contractTypes : ["long"],
    uiLocale: asLocale(formData.get("uiLocale")),
    transcriptLocale: asLocale(formData.get("transcriptLocale")),
    updatedAt: new Date().toISOString(),
    ...(Object.keys(goals).length ? { goals } : {}),
  };

  await writeProfile(profile);
  revalidatePath("/", "layout");
  redirect(feedbackHref("/", "ok", "profile"));
}
