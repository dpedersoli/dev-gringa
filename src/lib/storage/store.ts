import fs from "node:fs/promises";
import path from "node:path";
import { assertEvaluation, type Evaluation } from "@/lib/domain/evaluation";
import type { Profile } from "@/lib/domain/profile";

const dataDir = path.join(process.cwd(), "data");
const profilePath = path.join(dataDir, "profile.json");
const evaluationsPath = path.join(dataDir, "evaluations.json");
const artifactsPath = path.join(dataDir, "artifacts.json");

type EvaluationFile = { items: Evaluation[] };

export type ProfileArtifacts = {
  cvText?: string;
  cvSource?: "paste" | "pdf";
  cvFileName?: string;
  linkedinHeadline?: string;
  linkedinAbout?: string;
  linkedinExperience?: string;
  updatedAt: string;
};

async function ensureDataDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

export async function readProfile(): Promise<Profile | null> {
  try {
    const raw = await fs.readFile(profilePath, "utf8");
    return JSON.parse(raw) as Profile;
  } catch (error) {
    if (isNotFound(error)) return null;
    throw error;
  }
}

export async function writeProfile(profile: Profile): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(profilePath, JSON.stringify(profile, null, 2), "utf8");
}

export async function readEvaluations(): Promise<Evaluation[]> {
  try {
    const raw = await fs.readFile(evaluationsPath, "utf8");
    const parsed = JSON.parse(raw) as EvaluationFile;
    const items = parsed.items ?? [];
    for (const item of items) {
      assertEvaluation(item);
    }
    return items;
  } catch (error) {
    if (isNotFound(error)) return [];
    throw error;
  }
}

export async function appendEvaluation(evaluation: Evaluation): Promise<void> {
  assertEvaluation(evaluation);
  const items = await readEvaluations();
  items.push(evaluation);
  await ensureDataDir();
  const file: EvaluationFile = { items };
  await fs.writeFile(evaluationsPath, JSON.stringify(file, null, 2), "utf8");
}

export async function readArtifacts(): Promise<ProfileArtifacts | null> {
  try {
    const raw = await fs.readFile(artifactsPath, "utf8");
    return JSON.parse(raw) as ProfileArtifacts;
  } catch (error) {
    if (isNotFound(error)) return null;
    throw error;
  }
}

export async function writeArtifacts(
  patch: Omit<ProfileArtifacts, "updatedAt">,
): Promise<void> {
  const current = (await readArtifacts()) ?? { updatedAt: "" };
  const next: ProfileArtifacts = {
    ...current,
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  await ensureDataDir();
  await fs.writeFile(artifactsPath, JSON.stringify(next, null, 2), "utf8");
}

function isNotFound(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: string }).code === "ENOENT"
  );
}
