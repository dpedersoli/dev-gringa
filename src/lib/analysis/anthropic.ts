import Anthropic from "@anthropic-ai/sdk";
import {
  assertEvaluation,
  EvaluationContractError,
  type Evaluation,
} from "@/lib/domain/evaluation";
import type { Locale, ModuleId, Profile } from "@/lib/domain/profile";
import {
  cleanFollowUpQuestion,
  followUpAnswerSec,
  type InterviewModuleId,
} from "@/lib/interview/banks";

const CV_RUBRIC = `Resume / CV rubric for a Brazilian mid-level (pleno) software engineer targeting English-speaking remote companies. Score 0-100 as a single integer using these weights:
- ATS format 25: one column, no photo, no CPF/RG/marital status, contact + LinkedIn/GitHub, text-selectable PDF. Penalize two-column layouts, tables-as-layout, Brazilian CV conventions.
- English 20: natural resume English, action verbs. Penalize Portuguese leftover, calques, "I have responsibility for".
- Impact 25: metrics, outcomes, scope. Penalize duty lists and "responsible for" without results.
- Fit to the stored profile 15: stack and target markets appear with evidence.
- Structure 15: ~1 page if under 10 years, clear sections, dates.

This is NOT a fit score against a job description. Do not invent hire/no-hire.`;

const LINKEDIN_RUBRIC = `LinkedIn rubric for recruiter search (English-speaking remote). Score 0-100 as a single integer:
- Headline 25: role + stack + international/remote signal. Penalize generic "Software Developer" or Portuguese-only title.
- About 25: English narrative with search keywords. Penalize empty/PT/cliché.
- Experience 30: same bar as an international resume (metrics, English).
- Recruiter searchability 20: stack keywords from the stored profile, CV↔LinkedIn consistency.

Do not scrape or assume missing sections exist. Only judge the pasted text.`;

const RH_RUBRIC = `Recruiter / behavioral interview for a Brazilian mid-level software engineer targeting English-speaking remote companies. Score 0-100 as a single integer:
- STAR / structure 30: situation, action, result in order. Penalize vague stories with no outcome.
- Spoken English 25: understandable under time pressure, little calque. Penalize Portuguese or freezes that would sink a real screen.
- Ownership 25: the speaker's decision and consequence. Penalize "the team did" with no personal move.
- Specificity 20: numbers, systems, what THEY did. Penalize interview-book clichés.

Judge the TRANSCRIPT of spoken answers, not a written essay. Empty or tiny answers score very low. This is not hire/no-hire.`;

const TECH_RUBRIC = `Oral Vibe Engineering interview (NO live coding, NO editor) for a mid-level engineer. Score 0-100:
- Oral reasoning 30: hypotheses, next step, trade-off. Penalize buzzword lists.
- AI use 25: what they delegate vs review. Penalize "Copilot will handle it" or total refusal with no criterion.
- Spoken English 25: can explain a system in English-US.
- Mid-level calibration 20: mid-level scope, not staff-architect theater and not junior ticket-taking.

Use the stored profile stack as context. Do not ask them to write code.`;

const FIT_RUBRIC = `Generic remote culture-fit interview (NOT a named company). Score 0-100:
- Remote / async 30: visibility without daily standup, conscious overlap. Penalize "I just like working from home".
- Spoken English 25: colleague tone, not a memorized Portuguese speech.
- Values 25: disagreement then supporting the team, ownership. Penalize always-being-right.
- Specificity 20: a real case. Penalize generic manifesto.

Do not score against Amazon/Google leadership principles by name.`;

export class AnalysisError extends Error {
  constructor(
    message: string,
    readonly code: "missing-key" | "llm" | "contract",
  ) {
    super(message);
    this.name = "AnalysisError";
  }
}

export async function analyzeWithAnthropic(input: {
  module: ModuleId;
  document: string;
  profile: Profile;
  locale: Locale;
  onChars?: (count: number) => void;
}): Promise<Evaluation> {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) {
    throw new AnalysisError(
      "ANTHROPIC_API_KEY is not set",
      "missing-key",
    );
  }

  const model = process.env.ANTHROPIC_MODEL?.trim() || "claude-sonnet-4-6";
  const client = new Anthropic({ apiKey });
  const language =
    input.locale === "en-US" ? "English (US)" : "Brazilian Portuguese";
  const rubric =
    input.module === "cv"
      ? CV_RUBRIC
      : input.module === "linkedin"
        ? LINKEDIN_RUBRIC
        : input.module === "rh"
          ? RH_RUBRIC
          : input.module === "tech_vibe"
            ? TECH_RUBRIC
            : FIT_RUBRIC;

  const userPrompt = `You evaluate one artifact and return ONLY a JSON object (no markdown) with this exact shape:
{
  "score": <integer 0-100>,
  "strengths": [ { "claim": string, "evidence": string } ],
  "improvements": [ { "claim": string, "example": string, "rank": number } ],
  "nextStep": string
}

Rules:
- Write claim, evidence, example, and nextStep in ${language}.
- evidence MUST be a short literal quote from the artifact (or a close paraphrase marked as paraphrase if no clean quote exists).
- example MUST be a rewritten spoken answer (1–4 sentences) the person could say in a real English-US interview, except for CV/LinkedIn artifacts where it is a rewritten bullet/headline they could paste.
- There is NO fixed count. Return as many strengths and improvements as this artifact needs for this person. Do not pad. Do not stop at 3. Do not repeat the same gap. rank 1 is the highest-leverage move; then 2, 3, … with no gaps.
- Each improvement is one real move: rewrite what is weak, add what is missing, or remove what hurts. Skip a kind that does not apply. Do not invent a fake add or remove.
- Judge against what this person is pursuing in the stored profile (seniority, stack, markets, contract types, and goals when they are present). Do not invent a salary band, visa stance, track, company kind, or domain that the profile left blank.
- When goals.salaryBand is set, use it only as context for a recruiter screen. Do not invent a dollar figure.
- When goals.track is management or both, mention people leadership only if the artifact already shows it. The matching catalog they see is IC engineering.
- When goals.visa is remote_br, do not treat a missing US work visa as a defect in the artifact.
- Judge interview transcripts through THIS module's lens only (recruiter STAR vs oral engineering vs generic remote fit). The same life story is a different answer in each stage; a later interviewer does not know the person.
- Be specific to THIS artifact/transcript. No generic coaching. If an answer is empty, say so in evidence and score harshly.

Rubric:
${rubric}

Stored profile (JSON):
${JSON.stringify(
    {
      displayName: input.profile.displayName,
      yearsExperience: input.profile.yearsExperience,
      seniority: input.profile.seniority,
      stack: input.profile.stack,
      targetMarkets: input.profile.targetMarkets,
      contractTypes: input.profile.contractTypes,
      ...(input.profile.goals ? { goals: input.profile.goals } : {}),
    },
    null,
    2,
  )}

Artifact:
"""
${input.document.slice(0, 20_000)}
"""`;

  let text: string;
  try {
    text = await readModelText(
      client,
      {
        model,
        max_tokens: 4000,
        messages: [{ role: "user", content: userPrompt }],
      },
      input.onChars,
    );
  } catch (error) {
    throw new AnalysisError(
      error instanceof Error ? error.message : "Anthropic request failed",
      "llm",
    );
  }

  try {
    return toEvaluation(text, input.module);
  } catch {
    throw new AnalysisError(
      "Model output failed the evaluation contract",
      "contract",
    );
  }
}

/** Repair STT without inventing content. On failure, return the raw answers. */
export async function polishInterviewAnswers(input: {
  answers: { questionId: string; transcript: string }[];
  questions: { id: string; text: string }[];
  profile: Profile;
  onChars?: (count: number) => void;
}): Promise<{ questionId: string; transcript: string }[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) return input.answers;
  if (input.answers.every((item) => !item.transcript.trim())) {
    return input.answers;
  }

  const model = process.env.ANTHROPIC_MODEL?.trim() || "claude-sonnet-4-6";
  const client = new Anthropic({ apiKey });
  const stack = input.profile.stack.join(", ");

  const payload = input.questions.map((question) => {
    const found = input.answers.find((item) => item.questionId === question.id);
    return {
      questionId: question.id,
      question: question.text,
      rawTranscript: found?.transcript ?? "",
    };
  });

  try {
    const text = await readModelText(
      client,
      {
        model,
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: `You repair browser speech-to-text of a mid-level software engineer speaking English in an interview.

Return ONLY JSON:
{ "answers": [ { "questionId": string, "transcript": string } ] }

Rules:
- Do NOT invent facts, numbers, employers, or technologies that are not clearly attempted in rawTranscript.
- You MAY add punctuation, capitalization, and light grammar so it reads like spoken English.
- You MAY restore likely technical tokens when the raw text is a close phonetic miss of the profile stack or common engineering terms.
- Keep hedging, mistakes of meaning, and incomplete thoughts. This is not a rewrite to a better answer.
- Empty rawTranscript stays empty.
- Keep the same questionId values.

Profile stack (preferred spellings): ${stack || "(none)"}

Turns:
${JSON.stringify(payload, null, 2)}`,
          },
        ],
      },
      input.onChars,
    );
    const parsed = parseJsonObject(text) as {
      answers?: { questionId?: string; transcript?: string }[];
    };
    const repaired = parsed.answers ?? [];
    return input.answers.map((item) => {
      const match = repaired.find((row) => row.questionId === item.questionId);
      if (!match) return item;
      const transcript = String(match.transcript ?? "").trim();
      return { ...item, transcript: transcript || item.transcript };
    });
  } catch {
    return input.answers;
  }
}

function textOf(message: {
  content: Array<{ type: string; text?: string }>;
}): string {
  return message.content
    .filter((block) => block.type === "text")
    .map((block) => block.text ?? "")
    .join("\n");
}

async function readModelText(
  client: Anthropic,
  body: {
    model: string;
    max_tokens: number;
    messages: Anthropic.MessageParam[];
  },
  onChars?: (count: number) => void,
): Promise<string> {
  if (!onChars) {
    return textOf(await client.messages.create(body));
  }
  const stream = client.messages.stream(body);
  stream.on("text", (_delta, snapshot) => {
    onChars(snapshot.length);
  });
  return textOf(await stream.finalMessage());
}

export async function suggestInterviewFollowUp(input: {
  module: InterviewModuleId;
  question: string;
  transcript: string;
  profile: Profile;
}): Promise<{ question: string; answerSec: number } | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  const spoken = input.transcript.trim();
  if (!apiKey || !spoken) return null;

  const lens =
    input.module === "rh"
      ? "recruiter behavioral interview: STAR, the speaker's own action, and a concrete result"
      : input.module === "tech_vibe"
        ? "oral engineering interview with no code editor: trade-off, what they verify, and what they delegate to AI versus do themselves"
        : "generic remote culture-fit interview: async visibility and ownership, never a named company";
  const model = process.env.ANTHROPIC_MODEL?.trim() || "claude-sonnet-4-6";
  const client = new Anthropic({ apiKey });

  try {
    const text = await readModelText(client, {
      model,
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `You are the interviewer. The candidate just answered one fixed question in a ${lens}.

Return ONLY JSON: { "ask": boolean, "question": string, "answerSec": number }

Set ask=true only when this answer is too thin for that lens: missing the result, no personal action, no concrete detail, or it opened a thread you would actually probe. If it is already specific enough to judge, set ask=false and question="".

Rules:
- One question, English-US, one or two spoken sentences, ending with ?.
- Probe what they just said. Do not start a new story.
- Do not repeat the fixed question.
- Empty or nearly empty speech: ask=false.
- answerSec is how many seconds a spoken answer to THIS follow-up should take. Integer from 30 to 120. Use 0 when ask=false.
- Profile stack for wording only, do not invent facts they did not attempt: ${input.profile.stack.join(", ") || "(none)"}
- ${
  input.profile.goals?.track
    ? `Candidate track is ${input.profile.goals.track}. Probe inside that track. Do not switch them to another track.`
    : "No IC-or-management track is set. Do not invent one."
}

Fixed question:
${input.question}

Transcript:
${spoken}`,
        },
      ],
    });
    const parsed = parseJsonObject(text) as {
      ask?: boolean;
      question?: string;
      answerSec?: number;
    };
    if (parsed.ask !== true) return null;
    const question = cleanFollowUpQuestion(String(parsed.question ?? ""));
    if (!question) return null;
    return { question, answerSec: followUpAnswerSec(parsed.answerSec) };
  } catch {
    return null;
  }
}

function toEvaluation(raw: string, module: ModuleId): Evaluation {
  const parsed = parseJsonObject(raw) as {
    score?: number;
    strengths?: { claim?: string; evidence?: string }[];
    improvements?: { claim?: string; example?: string; rank?: number }[];
    nextStep?: string;
  };

  const evaluation: Evaluation = {
    id: crypto.randomUUID(),
    module,
    score: Math.round(Number(parsed.score)),
    strengths: (parsed.strengths ?? [])
      .map((item) => ({
        claim: String(item.claim ?? "").trim(),
        evidence: String(item.evidence ?? "").trim(),
      }))
      .filter((item) => item.claim && item.evidence),
    improvements: (parsed.improvements ?? [])
      .map((item) => ({
        claim: String(item.claim ?? "").trim(),
        example: String(item.example ?? "").trim(),
      }))
      .filter((item) => item.claim && item.example)
      .map((item, index) => ({
        ...item,
        rank: index + 1,
      })),
    nextStep: String(parsed.nextStep ?? "").trim(),
    createdAt: new Date().toISOString(),
  };

  try {
    assertEvaluation(evaluation);
  } catch (error) {
    if (error instanceof EvaluationContractError) {
      throw error;
    }
    throw error;
  }
  return evaluation;
}

function parseJsonObject(raw: string): unknown {
  const trimmed = raw.trim();
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  const payload = (fence ? fence[1] : trimmed).trim();
  return JSON.parse(payload);
}
