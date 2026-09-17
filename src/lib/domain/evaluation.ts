import type { ModuleId } from "./profile";

export type EvaluationStrength = {
  claim: string;
  evidence: string;
};

export type EvaluationImprovement = {
  claim: string;
  example: string;
  rank: 1 | 2 | 3;
};

export type Evaluation = {
  id: string;
  module: ModuleId;
  score: number;
  strengths: EvaluationStrength[];
  improvements: EvaluationImprovement[];
  nextStep: string;
  createdAt: string;
};

export class EvaluationContractError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EvaluationContractError";
  }
}

/** Fases 3+ devem passar por aqui antes de persistir. */
export function assertEvaluation(value: Evaluation): void {
  if (!Number.isInteger(value.score) || value.score < 0 || value.score > 100) {
    throw new EvaluationContractError(
      `score must be an integer 0–100, got ${value.score}`,
    );
  }
  if (value.strengths.length !== 3) {
    throw new EvaluationContractError("exactly 3 strengths are required");
  }
  for (const item of value.strengths) {
    if (!item.claim.trim() || !item.evidence.trim()) {
      throw new EvaluationContractError("each strength needs claim and evidence");
    }
  }
  if (value.improvements.length !== 3) {
    throw new EvaluationContractError("exactly 3 improvements are required");
  }
  const ranks = value.improvements.map((item) => item.rank).sort();
  if (ranks[0] !== 1 || ranks[1] !== 2 || ranks[2] !== 3) {
    throw new EvaluationContractError("improvements must be ranked 1, 2 and 3");
  }
  for (const item of value.improvements) {
    if (!item.claim.trim() || !item.example.trim()) {
      throw new EvaluationContractError(
        "each improvement needs claim and rewritten example",
      );
    }
  }
  if (!value.nextStep.trim()) {
    throw new EvaluationContractError("nextStep is required");
  }
}

export function latestByModule(
  items: Evaluation[],
): Partial<Record<ModuleId, Evaluation>> {
  const map: Partial<Record<ModuleId, Evaluation>> = {};
  const sorted = [...items].sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1,
  );
  for (const item of sorted) {
    if (!map[item.module]) {
      map[item.module] = item;
    }
  }
  return map;
}

/** Profile Score: only when both modules exist. Weights match docs/product/score.md (20:15). */
export function profileScore(
  cv?: Evaluation,
  linkedin?: Evaluation,
): number | null {
  if (!cv || !linkedin) return null;
  return Math.round((cv.score * 20 + linkedin.score * 15) / 35);
}
