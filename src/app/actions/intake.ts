"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { feedbackHref } from "@/lib/feedback";
import { applyIntake, intakeGaps, type IntakeGap } from "@/lib/profile/intake";
import { readProfile, writeProfile } from "@/lib/storage/store";

export type IntakeResult = { gaps: IntakeGap[] };

function flagged(formData: FormData, key: string) {
  return formData.get(key) === "1";
}

export async function saveIntake(
  _prev: IntakeResult | null,
  formData: FormData,
): Promise<IntakeResult | null> {
  const existing = await readProfile();
  const input = {
    yearBand: String(formData.get("yearBand") ?? ""),
    stack: formData.getAll("stack").map(String),
    stackOther: String(formData.get("stackOther") ?? ""),
    stackUnset: flagged(formData, "stackUnset"),
    markets: formData.getAll("targetMarkets").map(String),
    marketsUnset: flagged(formData, "marketsUnset"),
    contracts: formData.getAll("contractTypes").map(String),
    contractsUnset: flagged(formData, "contractsUnset"),
    salaryBand: String(formData.get("salaryBand") ?? ""),
    visa: String(formData.get("visa") ?? ""),
    companyKinds: formData.getAll("companyKinds").map(String),
    companyKindsUnset: flagged(formData, "companyKindsUnset"),
    track: String(formData.get("track") ?? ""),
    domains: formData.getAll("domains").map(String),
    domainsUnset: flagged(formData, "domainsUnset"),
  };
  const gaps = intakeGaps(existing, input);
  if (gaps.length > 0) return { gaps };

  const profile = applyIntake(existing, input);
  if (!profile) return { gaps };

  await writeProfile(profile);
  revalidatePath("/", "layout");
  redirect(feedbackHref("/profile", "ok", "questions"));
}
