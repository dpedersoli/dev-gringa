import { latestByModule, type Evaluation } from "@/lib/domain/evaluation";
import { MODULE_IDS, type ModuleId, type Profile } from "@/lib/domain/profile";
import type { Dictionary } from "@/lib/i18n/dictionaries";

function moduleLabel(dict: Dictionary, id: ModuleId) {
  const key = `module_${id}` as const;
  return dict[key];
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
  const profileMeasured = Boolean(latest.cv && latest.linkedin);

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
            {profileMeasured ? "—" : dict.scoreUnmeasured}
          </p>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            {dict.scoreHint}
          </p>
        </article>
        <article className="border border-[var(--line)] bg-[var(--card)] p-5">
          <p className="text-sm text-[var(--muted)]">{dict.nextTitle}</p>
          <p className="mt-3 text-base leading-7">{dict.nextBody}</p>
        </article>
      </section>

      <section>
        <h2 className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">
          {dict.modulesTitle}
        </h2>
        <ul className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {MODULE_IDS.map((id) => {
            const evaluation = latest[id];
            const status = evaluation
              ? String(evaluation.score)
              : id === "cv" || id === "linkedin"
                ? dict.moduleUnmeasured
                : dict.moduleLater;
            return (
              <li
                key={id}
                className="flex items-baseline justify-between gap-4 py-3"
              >
                <span>{moduleLabel(dict, id)}</span>
                <span className="text-sm text-[var(--muted)]">{status}</span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
