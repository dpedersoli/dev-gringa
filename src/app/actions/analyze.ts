"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { AnalysisError, analyzeWithAnthropic } from "@/lib/analysis/anthropic";
import { extractPdfText } from "@/lib/analysis/pdf";
import { feedbackHref } from "@/lib/feedback";
import {
  appendEvaluation,
  readProfile,
  writeArtifacts,
} from "@/lib/storage/store";

function fail(path: "/cv" | "/linkedin", code: string): never {
  redirect(feedbackHref(path, "error", code));
}

export async function analyzeCv(formData: FormData) {
  const profile = await readProfile();
  if (!profile) redirect("/onboarding");

  const pasted = String(formData.get("cvText") ?? "").trim();
  const file = formData.get("cvFile");
  let cvText = pasted;
  let cvSource: "paste" | "pdf" = "paste";
  let cvFileName: string | undefined;

  if (file instanceof File && file.size > 0) {
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      fail("/cv", "pdf");
    }
    if (file.size > 4 * 1024 * 1024) {
      fail("/cv", "pdf");
    }
    try {
      const extracted = await extractPdfText(await file.arrayBuffer());
      if (extracted.length < 80) {
        fail("/cv", "pdf");
      }
      cvText = extracted;
      cvSource = "pdf";
      cvFileName = file.name;
    } catch {
      fail("/cv", "pdf");
    }
  }

  if (cvText.length < 80) {
    fail("/cv", "empty");
  }

  try {
    const evaluation = await analyzeWithAnthropic({
      module: "cv",
      document: cvText,
      profile,
      locale: profile.uiLocale,
    });
    await appendEvaluation(evaluation);
    await writeArtifacts({ cvText, cvSource, cvFileName });
  } catch (error) {
    if (error instanceof AnalysisError) {
      fail("/cv", error.code);
    }
    throw error;
  }

  revalidatePath("/", "layout");
  redirect(feedbackHref("/cv", "ok", "cv"));
}

export async function analyzeLinkedin(formData: FormData) {
  const profile = await readProfile();
  if (!profile) redirect("/onboarding");

  const linkedinHeadline = String(formData.get("headline") ?? "").trim();
  const linkedinAbout = String(formData.get("about") ?? "").trim();
  const linkedinExperience = String(formData.get("experience") ?? "").trim();

  if (
    linkedinHeadline.length < 8 ||
    linkedinAbout.length < 40 ||
    linkedinExperience.length < 40
  ) {
    fail("/linkedin", "empty");
  }

  const document = [
    `HEADLINE:\n${linkedinHeadline}`,
    `ABOUT:\n${linkedinAbout}`,
    `EXPERIENCE:\n${linkedinExperience}`,
  ].join("\n\n");

  try {
    const evaluation = await analyzeWithAnthropic({
      module: "linkedin",
      document,
      profile,
      locale: profile.uiLocale,
    });
    await appendEvaluation(evaluation);
    await writeArtifacts({
      linkedinHeadline,
      linkedinAbout,
      linkedinExperience,
    });
  } catch (error) {
    if (error instanceof AnalysisError) {
      fail("/linkedin", error.code);
    }
    throw error;
  }

  revalidatePath("/", "layout");
  redirect(feedbackHref("/linkedin", "ok", "linkedin"));
}
