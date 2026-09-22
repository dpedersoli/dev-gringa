import { revalidatePath } from "next/cache";
import {
  AnalysisError,
  analyzeWithAnthropic,
  polishInterviewAnswers,
} from "@/lib/analysis/anthropic";
import { isFollowUpQuestion, type InterviewModuleId } from "@/lib/interview/banks";
import {
  appendEvaluation,
  readInterviewSession,
  readProfile,
  writeInterviewSession,
  type InterviewAnswer,
} from "@/lib/storage/store";

export class InterviewFinishError extends Error {
  constructor(
    readonly code: "onboarding" | "session" | "missing-key" | "llm" | "contract",
    readonly module?: InterviewModuleId,
  ) {
    super(code);
    this.name = "InterviewFinishError";
  }
}

function approach(start: number, end: number, chars: number, scale: number) {
  const span = end - start - 1;
  const moved = span * (1 - Math.exp(-chars / scale));
  return Math.min(end - 1, Math.round(start + moved));
}

export async function completeInterviewFinish(
  sessionId: string,
  answers: InterviewAnswer[],
  onProgress: (pct: number) => void,
): Promise<InterviewModuleId> {
  let last = -1;
  const report = (pct: number) => {
    const next = Math.max(0, Math.min(100, Math.round(pct)));
    if (next <= last) return;
    last = next;
    onProgress(next);
  };

  report(2);

  const profile = await readProfile();
  if (!profile) throw new InterviewFinishError("onboarding");

  const session = await readInterviewSession(sessionId);
  if (!session || session.status !== "running") {
    throw new InterviewFinishError("session");
  }

  report(8);

  const cleaned = session.questions.map((question) => {
    const found = answers.find((item) => item.questionId === question.id);
    return {
      questionId: question.id,
      transcript: String(found?.transcript ?? "").trim(),
    };
  });

  const polished = await polishInterviewAnswers({
    answers: cleaned,
    questions: session.questions,
    profile,
    onChars: (count) => report(approach(8, 40, count, 700)),
  });
  report(40);

  await writeInterviewSession({
    ...session,
    answers: polished,
  });

  const document = session.questions
    .map((question, index) => {
      const answer =
        polished.find((item) => item.questionId === question.id)?.transcript ??
        "";
      return `QUESTION ${index + 1}${isFollowUpQuestion(question.id) ? " (follow-up)" : ""}:\n${question.text}\n\nANSWER ${index + 1}:\n${answer || "(no spoken answer)"}`;
    })
    .join("\n\n---\n\n");

  try {
    const evaluation = await analyzeWithAnthropic({
      module: session.module,
      document,
      profile,
      locale: profile.uiLocale,
      onChars: (count) => report(approach(40, 96, count, 900)),
    });
    await appendEvaluation(evaluation);
    await writeInterviewSession({
      ...session,
      answers: polished,
      status: "submitted",
    });
  } catch (error) {
    if (error instanceof AnalysisError) {
      throw new InterviewFinishError(error.code, session.module);
    }
    throw new InterviewFinishError("llm", session.module);
  }

  revalidatePath("/", "layout");
  report(100);
  return session.module;
}
