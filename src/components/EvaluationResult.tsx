import type { Evaluation } from "@/lib/domain/evaluation";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function EvaluationResult({
  dict,
  evaluation,
}: {
  dict: Dictionary;
  evaluation: Evaluation;
}) {
  const improvements = [...evaluation.improvements].sort(
    (a, b) => a.rank - b.rank,
  );

  return (
    <section className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-[var(--muted)]">{dict.lastScore}</p>
        <p className="mt-1 font-[family-name:var(--font-serif)] text-5xl">
          {evaluation.score}
        </p>
        <p className="mt-3 max-w-2xl text-base leading-7">{evaluation.nextStep}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">
            {dict.strengths}
          </h2>
          <ol className="mt-3 flex flex-col gap-4">
            {evaluation.strengths.map((item) => (
              <li key={item.claim} className="text-sm leading-6">
                <p className="font-medium">{item.claim}</p>
                <p className="mt-1 text-[var(--muted)]">
                  {dict.evidenceLabel}: “{item.evidence}”
                </p>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">
            {dict.improvements}
          </h2>
          <ol className="mt-3 flex flex-col gap-4">
            {improvements.map((item) => (
              <li key={item.rank} className="text-sm leading-6">
                <p className="font-medium">
                  {item.rank}. {item.claim}
                </p>
                <p className="mt-1 text-[var(--muted)]">
                  {dict.exampleLabel}: {item.example}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
