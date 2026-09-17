"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  CONTRACTS,
  LOCALES,
  MARKETS,
  type ContractType,
  type Locale,
  type MarketId,
  type Profile,
} from "@/lib/domain/profile";
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

  if (!displayName || !Number.isFinite(yearsRaw) || yearsRaw < 1) {
    redirect(`${from === "profile" ? "/profile" : "/onboarding"}?error=1`);
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
  };

  await writeProfile(profile);
  revalidatePath("/", "layout");
  redirect("/");
}
