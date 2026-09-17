import Anthropic from "@anthropic-ai/sdk";
import {
  assertEvaluation,
  EvaluationContractError,
  type Evaluation,
} from "@/lib/domain/evaluation";
import type { Locale, ModuleId, Profile } from "@/lib/domain/profile";

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
  module: "cv" | "linkedin";
  document: string;
  profile: Profile;
  locale: Locale;
}): Promise<Evaluation> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new AnalysisError(
      "ANTHROPIC_API_KEY is not set",
      "missing-key",
    );
  }

  const model = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6";
  const client = new Anthropic({ apiKey });
  const language =
    input.locale === "en-US" ? "English (US)" : "Brazilian Portuguese";
  const rubric = input.module === "cv" ? CV_RUBRIC : LINKEDIN_RUBRIC;

  const userPrompt = `You evaluate one artifact and return ONLY a JSON object (no markdown) with this exact shape:
{
  "score": <integer 0-100>,
  "strengths": [
    { "claim": string, "evidence": string },
    { "claim": string, "evidence": string },
    { "claim": string, "evidence": string }
  ],
  "improvements": [
    { "claim": string, "example": string, "rank": 1 },
    { "claim": string, "example": string, "rank": 2 },
    { "claim": string, "example": string, "rank": 3 }
  ],
  "nextStep": string
}

Rules:
- Write claim, evidence, example, and nextStep in ${language}.
- evidence MUST be a short literal quote from the artifact (or a close paraphrase marked as paraphrase if no clean quote exists).
- example MUST be a rewritten bullet/headline/sentence the person could paste, in English if the artifact should be in English.
- Exactly 3 strengths and 3 improvements. ranks must be 1, 2, 3.
- Be specific to THIS text. No generic coaching.

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
    const message = await client.messages.create({
      model,
      max_tokens: 1600,
      messages: [{ role: "user", content: userPrompt }],
    });
    text = message.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n");
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
    strengths: (parsed.strengths ?? []).slice(0, 3).map((item) => ({
      claim: String(item.claim ?? "").trim(),
      evidence: String(item.evidence ?? "").trim(),
    })),
    improvements: (parsed.improvements ?? []).slice(0, 3).map((item, index) => ({
      claim: String(item.claim ?? "").trim(),
      example: String(item.example ?? "").trim(),
      rank: ([1, 2, 3].includes(Number(item.rank))
        ? Number(item.rank)
        : index + 1) as 1 | 2 | 3,
    })),
    nextStep: String(parsed.nextStep ?? "").trim(),
    createdAt: new Date().toISOString(),
  };

  if (evaluation.improvements.length === 3) {
    evaluation.improvements = evaluation.improvements.map((item, index) => ({
      ...item,
      rank: (index + 1) as 1 | 2 | 3,
    }));
  }

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
