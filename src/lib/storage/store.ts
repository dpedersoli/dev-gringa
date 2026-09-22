import type { InterviewModuleId, InterviewQuestion } from "@/lib/interview/banks";
import fs from "node:fs/promises";
import path from "node:path";
import { assertEvaluation, type Evaluation } from "@/lib/domain/evaluation";
import type { Profile } from "@/lib/domain/profile";

const dataDir = path.join(process.cwd(), "data");
const audioDir = path.join(dataDir, "audio");
const profilePath = path.join(dataDir, "profile.json");
const evaluationsPath = path.join(dataDir, "evaluations.json");
const artifactsPath = path.join(dataDir, "artifacts.json");
const sessionsPath = path.join(dataDir, "interview-sessions.json");

type EvaluationFile = { items: Evaluation[] };

export type InterviewAnswer = {
  questionId: string;
  transcript: string;
};

export type InterviewSession = {
  id: string;
  module: InterviewModuleId;
  startedAt: string;
  durationSec: number;
  questions: InterviewQuestion[];
  answers: InterviewAnswer[];
  /** Milliseconds the clock stayed frozen between questions. */
  frozenMs?: number;
  status: "running" | "submitted" | "abandoned";
};

type SessionFile = { items: InterviewSession[] };

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
  await fs.mkdir(audioDir, { recursive: true });
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

export async function readInterviewSessions(): Promise<InterviewSession[]> {
  try {
    const raw = await fs.readFile(sessionsPath, "utf8");
    const parsed = JSON.parse(raw) as SessionFile;
    return parsed.items ?? [];
  } catch (error) {
    if (isNotFound(error)) return [];
    throw error;
  }
}

export async function writeInterviewSession(
  session: InterviewSession,
): Promise<void> {
  const items = await readInterviewSessions();
  const index = items.findIndex((item) => item.id === session.id);
  if (index >= 0) {
    items[index] = session;
  } else {
    items.push(session);
  }
  await ensureDataDir();
  const file: SessionFile = { items };
  await fs.writeFile(sessionsPath, JSON.stringify(file, null, 2), "utf8");
}

export async function readInterviewSession(
  id: string,
): Promise<InterviewSession | null> {
  const items = await readInterviewSessions();
  return items.find((item) => item.id === id) ?? null;
}

export async function readRunningInterviewSession(
  module: InterviewModuleId,
): Promise<InterviewSession | null> {
  const items = await readInterviewSessions();
  const running = items.filter(
    (item) => item.module === module && item.status === "running",
  );
  return running.at(-1) ?? null;
}

export async function readLatestSubmittedInterviewSession(
  module: InterviewModuleId,
): Promise<InterviewSession | null> {
  const items = await readInterviewSessions();
  const submitted = items.filter(
    (item) => item.module === module && item.status === "submitted",
  );
  return submitted.at(-1) ?? null;
}

export async function saveInterviewAudioFile(
  sessionId: string,
  questionId: string,
  bytes: Uint8Array,
  append = false,
): Promise<string> {
  await ensureDataDir();
  const fileName = `${sessionId}-${questionId}.webm`;
  const target = path.join(audioDir, fileName);
  if (append) await fs.appendFile(target, bytes);
  else await fs.writeFile(target, bytes);
  return fileName;
}

function isNotFound(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: string }).code === "ENOENT"
  );
}
