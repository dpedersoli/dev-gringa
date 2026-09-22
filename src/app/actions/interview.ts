"use server";

import { redirect } from "next/navigation";
import { suggestInterviewFollowUp } from "@/lib/analysis/anthropic";
import {
  followUpQuestionId,
  interviewDurationSec,
  interviewHardEndMs,
  interviewQuestions,
  isFollowUpQuestion,
  isInterviewModule,
  type InterviewModuleId,
} from "@/lib/interview/banks";
import { completeInterviewFinish, InterviewFinishError } from "@/lib/interview/finish";
import {
  readInterviewSession,
  readRunningInterviewSession,
  readProfile,
  saveInterviewAudioFile,
  writeInterviewSession,
  type InterviewAnswer,
} from "@/lib/storage/store";

function fail(module: InterviewModuleId, code: string): never {
  redirect(`/interview/${module}?error=${code}`);
}

export async function startInterview(module: InterviewModuleId) {
  const profile = await readProfile();
  if (!profile) redirect("/onboarding");
  if (!isInterviewModule(module)) redirect("/");

  const existing = await readRunningInterviewSession(module);
  if (existing) {
    const hardEnd = interviewHardEndMs(
      existing.startedAt,
      existing.durationSec,
      existing.frozenMs ?? 0,
    );
    if (Date.now() < hardEnd) return existing;
    await writeInterviewSession({ ...existing, status: "abandoned" });
  }

  const session = {
    id: crypto.randomUUID(),
    module,
    startedAt: new Date().toISOString(),
    durationSec: interviewDurationSec(module),
    questions: interviewQuestions(module),
    answers: [] as InterviewAnswer[],
    status: "running" as const,
  };
  await writeInterviewSession(session);
  return session;
}

export async function addInterviewFreeze(sessionId: string, deltaMs: number) {
  const session = await readInterviewSession(sessionId);
  if (!session || session.status !== "running") return;
  const extra = Math.max(0, Math.round(deltaMs));
  if (extra === 0) return;
  await writeInterviewSession({
    ...session,
    frozenMs: (session.frozenMs ?? 0) + extra,
  });
}

export async function abandonInterview(sessionId: string) {
  const session = await readInterviewSession(sessionId);
  if (!session || session.status !== "running") return;
  await writeInterviewSession({ ...session, status: "abandoned" });
}

export async function saveInterviewProgress(
  sessionId: string,
  answers: InterviewAnswer[],
) {
  const session = await readInterviewSession(sessionId);
  if (!session || session.status !== "running") return;
  await writeInterviewSession({ ...session, answers });
}

export async function saveInterviewAudio(
  sessionId: string,
  questionId: string,
  formData: FormData,
) {
  const file = formData.get("audio");
  if (!(file instanceof File) || file.size === 0) return;
  const buffer = new Uint8Array(await file.arrayBuffer());
  await saveInterviewAudioFile(
    sessionId,
    questionId,
    buffer,
    formData.get("append") === "1",
  );
}

export async function maybeInterviewFollowUp(
  sessionId: string,
  questionId: string,
  transcript: string,
) {
  const session = await readInterviewSession(sessionId);
  if (!session || session.status !== "running") return null;
  const spoken = transcript.trim();
  const answers = [
    ...session.answers.filter((item) => item.questionId !== questionId),
    { questionId, transcript: spoken },
  ];
  const bank = session.questions.find((item) => item.id === questionId);
  const followId = followUpQuestionId(questionId);
  const already = session.questions.find((item) => item.id === followId);
  const current = await readInterviewSession(sessionId);
  if (!current || current.status !== "running") return null;
  if (!bank || isFollowUpQuestion(questionId) || already || !spoken) {
    await writeInterviewSession({ ...current, answers });
    return already && !isFollowUpQuestion(questionId)
      ? { ...already, answerSec: 0 }
      : null;
  }

  await writeInterviewSession({ ...current, answers });
  const profile = await readProfile();
  if (!profile) return null;
  const suggestion = await suggestInterviewFollowUp({
    module: session.module,
    question: bank.text,
    transcript: spoken,
    profile,
  });
  if (!suggestion) return null;

  const extra = {
    id: followId,
    text: suggestion.question,
    answerSec: suggestion.answerSec,
  };
  const at = session.questions.findIndex((item) => item.id === questionId);
  const questions = [
    ...session.questions.slice(0, at + 1),
    { id: extra.id, text: extra.text },
    ...session.questions.slice(at + 1),
  ];
  const latest = await readInterviewSession(sessionId);
  if (!latest || latest.status !== "running") return null;
  await writeInterviewSession({
    ...latest,
    questions,
    answers,
    durationSec: latest.durationSec + suggestion.answerSec,
  });
  return extra;
}

export async function finishInterview(
  sessionId: string,
  answers: InterviewAnswer[],
) {
  try {
    const module = await completeInterviewFinish(sessionId, answers, () => {});
    redirect(`/interview/${module}`);
  } catch (error) {
    if (error instanceof InterviewFinishError) {
      if (error.code === "onboarding") redirect("/onboarding");
      if (!error.module) redirect("/");
      fail(error.module, error.code);
    }
    throw error;
  }
}
