import type { ModuleId } from "@/lib/domain/profile";

export const INTERVIEW_MODULE_IDS = ["rh", "tech_vibe", "fit"] as const;

export type InterviewModuleId = (typeof INTERVIEW_MODULE_IDS)[number];

export type InterviewQuestion = {
  id: string;
  text: string;
};

export function isInterviewModule(value: string): value is InterviewModuleId {
  return INTERVIEW_MODULE_IDS.includes(value as InterviewModuleId);
}

export const INTERVIEW_GRACE_SEC = 30;
export const FOLLOW_UP_ANSWER_SEC = 60;
export const FOLLOW_UP_ANSWER_MIN_SEC = 30;
export const FOLLOW_UP_ANSWER_MAX_SEC = 120;

export function followUpAnswerSec(value: unknown): number {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) return FOLLOW_UP_ANSWER_SEC;
  return Math.min(
    FOLLOW_UP_ANSWER_MAX_SEC,
    Math.max(FOLLOW_UP_ANSWER_MIN_SEC, Math.round(parsed)),
  );
}

export function interviewDurationSec(module: InterviewModuleId): number {
  if (module === "rh") return 30 * 60;
  return 45 * 60;
}

export function interviewPrimaryEndMs(
  startedAt: string,
  durationSec: number,
  frozenMs = 0,
): number {
  return Date.parse(startedAt) + durationSec * 1000 + frozenMs;
}

export function interviewHardEndMs(
  startedAt: string,
  durationSec: number,
  frozenMs = 0,
): number {
  return interviewPrimaryEndMs(startedAt, durationSec, frozenMs) + INTERVIEW_GRACE_SEC * 1000;
}

export function followUpQuestionId(bankQuestionId: string) {
  return `followup-${bankQuestionId}`;
}

export function isFollowUpQuestion(questionId: string) {
  return questionId.startsWith("followup-");
}

export function cleanFollowUpQuestion(raw: string): string | null {
  const text = raw.replace(/\s+/g, " ").trim();
  const mark = text.indexOf("?");
  if (mark < 0) return null;
  const question = text.slice(0, mark + 1);
  if (question.length < 12 || question.length > 400) return null;
  return question;
}

export function interviewHref(id: ModuleId): string | null {
  if (id === "cv") return "/cv";
  if (id === "linkedin") return "/linkedin";
  if (id === "rh") return "/interview/rh";
  if (id === "tech_vibe") return "/interview/tech_vibe";
  if (id === "fit") return "/interview/fit";
  return null;
}

const BANKS: Record<InterviewModuleId, InterviewQuestion[]> = {
  rh: [
    {
      id: "rh-1",
      text: "Tell me about a time you had to deliver under an unclear requirement. What did you do, and what was the result?",
    },
    {
      id: "rh-2",
      text: "Describe a conflict with a teammate or stakeholder. How did you handle it?",
    },
    {
      id: "rh-3",
      text: "Tell me about a mistake in production or a missed deadline. What did you learn?",
    },
    {
      id: "rh-4",
      text: "Walk me through your background as a mid-level software engineer. What should I remember after this call?",
    },
    {
      id: "rh-5",
      text: "Why are you pursuing English-speaking remote work now, and what kind of contract are you actually looking for?",
    },
    {
      id: "rh-6",
      text: "What overlap hours can you keep with a team in the US or Europe, and how do you handle a deadline that lands outside those hours?",
    },
    {
      id: "rh-7",
      text: "Tell me about a time you pushed back on scope or timeline with someone who was not your manager. What happened?",
    },
  ],
  tech_vibe: [
    {
      id: "tech-1",
      text: "Walk me through how you would use AI tools to ship a mid-sized feature in your stack this week. What do you still insist on doing yourself, and why?",
    },
    {
      id: "tech-2",
      text: "A production bug appears only for some users after a deploy. How do you investigate and communicate while you still don't have a root cause?",
    },
    {
      id: "tech-3",
      text: "You inherit a service in your stack with almost no tests and a noisy on-call. What do you do in the first two weeks?",
    },
    {
      id: "tech-4",
      text: "Pick a feature you would ship in your stack this month. Talk through the design, the main trade-off, and what you would measure after release. Do not write code.",
    },
    {
      id: "tech-5",
      text: "Tell me about a time an AI suggestion looked right and was wrong. How did you notice, and what did you change in how you review its output?",
    },
  ],
  fit: [
    {
      id: "fit-1",
      text: "This role is async and remote. How do you make your work visible without waiting for a daily stand-up?",
    },
    {
      id: "fit-2",
      text: "Tell me about a time you disagreed with a technical decision and the team went the other way. What did you do next?",
    },
    {
      id: "fit-3",
      text: "What does ownership mean to you when you don't share a timezone with the rest of the team?",
    },
    {
      id: "fit-4",
      text: "Written feedback from a teammate in another timezone landed badly. How do you respond before your next overlap?",
    },
    {
      id: "fit-5",
      text: "Tell me about a time you cut scope so the team could ship. Who did you tell, and what did you drop?",
    },
    {
      id: "fit-6",
      text: "How do you build trust with teammates you have never met in person?",
    },
  ],
};

export function interviewQuestions(module: InterviewModuleId): InterviewQuestion[] {
  return BANKS[module];
}
