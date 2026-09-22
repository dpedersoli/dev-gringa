import Link from "next/link";
import { Copy, TipIcon } from "@/components/Glossary";
import { latestByModule, profileScore, readinessScore, type Evaluation } from "@/lib/domain/evaluation";
import { MODULE_IDS, type ModuleId, type Profile } from "@/lib/domain/profile";
import { interviewHref } from "@/lib/interview/banks";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { TipId } from "@/lib/i18n/tips";

const MODULE_TIP: Partial<Record<ModuleId, TipId>> = {
  tech_vibe: "vibe",
  fit: "fit",
  challenge: "challenge",
};

function moduleLabel(dict: Dictionary, id: ModuleId) {
  if (id === "cv") return dict.module_cv;
  if (id === "linkedin") return dict.module_linkedin;
  if (id === "rh") return dict.module_rh;
  if (id === "tech_vibe") return dict.module_tech_vibe;
  if (id === "fit") return dict.module_fit;
  return dict.module_challenge;
}

function nextStepText(
  dict: Dictionary,
  latest: Partial<Record<ModuleId, Evaluation>>,
) {
  if (!latest.cv) return dict.nextCv;
  if (!latest.linkedin) return dict.nextLinkedin;
  if (!latest.rh) return dict.nextRh;
  if (!latest.tech_vibe) return dict.nextTech;
  if (!latest.fit) return dict.nextFit;
  return dict.nextPhase5;
}

function ScoreParts({
  dict,
  ids,
  latest,
}: {
  dict: Dictionary;
  ids: ModuleId[];
  latest: Partial<Record<ModuleId, Evaluation>>;
}) {
  return (
    <ul className="mt-4 flex flex-col gap-1.5 text-sm">
      {ids.map((id) => {
        const score = latest[id]?.score;
        const done = score !== undefined;
        return (
          <li key={id} className="flex items-baseline justify-between gap-3">
            <span>
              <Copy dict={dict} text={moduleLabel(dict, id)} />
            </span>
            <span className={done ? "" : "text-[var(--muted)]"}>
              {done ? `${dict.scoreDone} · ${score}` : dict.scoreMissing}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

const PROFILE_PARTS: ModuleId[] = ["cv", "linkedin"];
const READINESS_PARTS: ModuleId[] = ["cv", "linkedin", "rh", "tech_vibe", "fit"];

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
  const readiness = readinessScore(latest);
  const readinessPartial =
    Boolean(latest.rh || latest.tech_vibe || latest.fit) && readiness === null;

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
          <p className="text-sm text-[var(--muted)]">
            <Copy dict={dict} text={dict.scoreTitle} />
          </p>
          <p className="mt-3 font-[family-name:var(--font-serif)] text-4xl">
            {composite !== null
              ? composite
              : partial
                ? dict.scorePartial
                : dict.scoreUnmeasured}
          </p>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            <Copy
              dict={dict}
              text={
                composite !== null
                  ? dict.scoreHintReady
                  : partial
                    ? dict.scoreHintPartial
                    : dict.scoreHint
              }
            />
          </p>
          <ScoreParts dict={dict} ids={PROFILE_PARTS} latest={latest} />
        </article>
        <article className="border border-[var(--line)] bg-[var(--card)] p-5">
          <p className="text-sm text-[var(--muted)]">
            <Copy dict={dict} text={dict.readinessTitle} />
          </p>
          <p className="mt-3 font-[family-name:var(--font-serif)] text-4xl">
            {readiness !== null
              ? readiness
              : readinessPartial
                ? dict.scorePartial
                : dict.scoreUnmeasured}
          </p>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            <Copy
              dict={dict}
              text={
                readiness !== null
                  ? dict.readinessHintReady
                  : readinessPartial
                    ? dict.readinessHintPartial
                    : dict.readinessHint
              }
            />
          </p>
          <ScoreParts dict={dict} ids={READINESS_PARTS} latest={latest} />
        </article>
        <article className="border border-[var(--line)] bg-[var(--card)] p-5 md:col-span-2">
          <p className="text-sm text-[var(--muted)]">{dict.nextTitle}</p>
          <p className="mt-3 text-base leading-7">{nextStepText(dict, latest)}</p>
        </article>
      </section>

      <section>
        <h2 className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">
          {dict.modulesTitle}
        </h2>
        <ul className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {MODULE_IDS.map((id) => {
            const evaluation = latest[id];
            const href = interviewHref(id);
            const status = evaluation
              ? `${dict.scoreDone} · ${evaluation.score}`
              : href
                ? dict.scoreMissing
                : dict.moduleLater;
            const label = moduleLabel(dict, id);
            const tip = MODULE_TIP[id];
            const name = (
              <span className="inline-flex items-center">
                {href ? (
                  <Link href={href} className="underline-offset-4 hover:underline">
                    {label}
                  </Link>
                ) : (
                  <span>{label}</span>
                )}
                {tip ? <TipIcon dict={dict} id={tip} /> : null}
              </span>
            );
            return (
              <li
                key={id}
                className="flex items-baseline justify-between gap-4 py-3"
              >
                {name}
                <span className="text-sm text-[var(--muted)]">{status}</span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
