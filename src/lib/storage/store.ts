import fs from "node:fs/promises";
import path from "node:path";
import { assertEvaluation, type Evaluation } from "@/lib/domain/evaluation";
import type { Profile } from "@/lib/domain/profile";

const dataDir = path.join(process.cwd(), "data");
const profilePath = path.join(dataDir, "profile.json");
const evaluationsPath = path.join(dataDir, "evaluations.json");

type EvaluationFile = { items: Evaluation[] };

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

function isNotFound(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: string }).code === "ENOENT"
  );
}
