import Link from "next/link";
import { latestByModule, profileScore, type Evaluation } from "@/lib/domain/evaluation";
import { MODULE_IDS, type ModuleId, type Profile } from "@/lib/domain/profile";
import type { Dictionary } from "@/lib/i18n/dictionaries";

function moduleLabel(dict: Dictionary, id: ModuleId) {
  const key = `module_${id}` as const;
  return dict[key];
}

function nextStepText(
  dict: Dictionary,
  cv?: Evaluation,
  linkedin?: Evaluation,
) {
  if (!cv) return dict.nextCv;
  if (!linkedin) return dict.nextLinkedin;
  return dict.nextPhase4;
}

export function DashboardView({
  dict,
  profile,
  evaluations,
}: {
  dict: Dictionary;
  profile: Profile;
  evaluations: Evaluation[];
}) {
  const latest = latestByModule(evaluations);
  const composite = profileScore(latest.cv, latest.linkedin);
  const partial = Boolean(latest.cv || latest.linkedin) && composite === null;

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
          {dict.phaseBadge}
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-serif)] text-4xl tracking-tight">
          {dict.hello}, {profile.displayName}
        </h1>
        <p className="mt-2 max-w-xl text-[var(--muted)]">
          {profile.stack.length ? profile.stack.join(" · ") : "—"} ·{" "}
          {profile.yearsExperience}y · {profile.seniority}
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="border border-[var(--line)] bg-[var(--card)] p-5">
          <p className="text-sm text-[var(--muted)]">{dict.scoreTitle}</p>
          <p className="mt-3 font-[family-name:var(--font-serif)] text-4xl">
            {composite !== null
              ? composite
              : partial
                ? dict.scorePartial
                : dict.scoreUnmeasured}
          </p>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            {composite !== null
              ? dict.scoreHintReady
              : partial
                ? dict.scoreHintPartial
                : dict.scoreHint}
          </p>
        </article>
        <article className="border border-[var(--line)] bg-[var(--card)] p-5">
          <p className="text-sm text-[var(--muted)]">{dict.nextTitle}</p>
          <p className="mt-3 text-base leading-7">
            {nextStepText(dict, latest.cv, latest.linkedin)}
          </p>
        </article>
      </section>

      <section>
        <h2 className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">
          {dict.modulesTitle}
        </h2>
        <ul className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {MODULE_IDS.map((id) => {
            const evaluation = latest[id];
            const href = id === "cv" ? "/cv" : id === "linkedin" ? "/linkedin" : null;
            const status = evaluation
              ? String(evaluation.score)
              : href
                ? dict.moduleUnmeasured
                : dict.moduleLater;
            const label = moduleLabel(dict, id);
            return (
              <li
                key={id}
                className="flex items-baseline justify-between gap-4 py-3"
              >
                {href ? (
                  <Link href={href} className="underline-offset-4 hover:underline">
                    {label}
                  </Link>
                ) : (
                  <span>{label}</span>
                )}
                <span className="text-sm text-[var(--muted)]">{status}</span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
