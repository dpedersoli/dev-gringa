import Link from "next/link";
import { Copy } from "@/components/Glossary";
import { MatchingCompanies } from "@/components/MatchingCompanies";
import { MatchingCourses } from "@/components/MatchingCourses";
import { latestByModule, readinessScore, type Evaluation } from "@/lib/domain/evaluation";
import { CONTRACTS, type ContractType, type Locale, type MarketId, type Profile, type SalaryBand } from "@/lib/domain/profile";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import {
  listPlatforms,
  prospectBlocks,
  type PlatformPace,
  type ProspectMotion,
} from "@/lib/matching/platforms";

function marketLabel(dict: Dictionary, market: MarketId) {
  if (market === "us") return dict.market_us;
  if (market === "uk") return dict.market_uk;
  if (market === "ca") return dict.market_ca;
  if (market === "eu") return dict.market_eu;
  return dict.market_au;
}

function contractLabel(dict: Dictionary, contract: ContractType) {
  if (contract === "short") return dict.contract_short;
  if (contract === "long") return dict.contract_long;
  return dict.contract_freelance;
}

function motionLabel(dict: Dictionary, motion: ProspectMotion) {
  if (motion === "inbound") return dict.matchingMotionInbound;
  if (motion === "selective") return dict.matchingMotionSelective;
  return dict.matchingMotionScreen;
}

function paceLabel(dict: Dictionary, pace: PlatformPace) {
  if (pace === "primary") return dict.matchingPacePrimary;
  if (pace === "secondary") return dict.matchingPaceSecondary;
  if (pace === "early") return dict.matchingPaceEarly;
  return dict.matchingPaceProfile;
}

function joinList(items: string[], locale: Locale) {
  if (items.length <= 1) return items[0] ?? "";
  const and = locale === "pt-BR" ? "e" : "and";
  if (items.length === 2) return `${items[0]} ${and} ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} ${and} ${items[items.length - 1]}`;
}

function salaryBandLabel(dict: Dictionary, band: SalaryBand) {
  if (band === "unsure") return dict.goalSalaryUnsure;
  if (band === "upto_60") return dict.goalSalary60;
  if (band === "60_90") return dict.goalSalary90;
  return dict.goalSalaryPlus;
}

export function MatchingView({
  dict,
  profile,
  evaluations,
}: {
  dict: Dictionary;
  profile: Profile;
  evaluations: Evaluation[];
}) {
  const readiness = readinessScore(latestByModule(evaluations));
  const platforms = listPlatforms(profile, readiness);
  const paces: PlatformPace[] =
    readiness === null ? ["profile"] : ["primary", "secondary", "early"];

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
          {dict.phaseBadge}
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-serif)] text-4xl tracking-tight">
          {dict.matchingTitle}
        </h1>
        <p className="mt-3 max-w-xl leading-7 text-[var(--muted)]">
          <Copy dict={dict} text={dict.matchingLead} />
        </p>
        <p className="mt-4 text-sm leading-6">
          <Copy
            dict={dict}
            text={dict.matchingSeeking.replace(
              "{types}",
              joinList(
                CONTRACTS.filter((id) => profile.contractTypes.includes(id)).map((id) =>
                  contractLabel(dict, id),
                ),
                profile.uiLocale,
              ),
            )}
          />{" "}
          <Link href="/profile" className="underline underline-offset-4">
            {dict.matchingEditProfile}
          </Link>
        </p>
        <p className="mt-2 text-sm leading-6">
          <Copy
            dict={dict}
            text={
              readiness === null
                ? dict.matchingProfileOnly
                : dict.matchingReadiness.replace("{score}", String(readiness))
            }
          />
        </p>
        {profile.goals?.salaryBand ? (
          <p className="mt-2 text-sm leading-6">
            <Copy
              dict={dict}
              text={dict.matchingSalaryNote.replace(
                "{band}",
                salaryBandLabel(dict, profile.goals.salaryBand),
              )}
            />
          </p>
        ) : null}
        {profile.goals?.track === "management" || profile.goals?.track === "both" ? (
          <p className="mt-2 text-sm leading-6">
            <Copy dict={dict} text={dict.matchingTrackIc} />
          </p>
        ) : null}
      </div>

      {platforms.length === 0 ? (
        <p className="text-[var(--muted)]">{dict.matchingEmpty}</p>
      ) : (
        paces.map((pace) => {
          const group = platforms.filter((platform) => platform.pace === pace);
          if (group.length === 0) return null;
          return (
            <section key={pace}>
              <h2 className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">
                <Copy dict={dict} text={paceLabel(dict, pace)} />
              </h2>
              <ul className="mt-4 flex flex-col gap-4">
                {group.map((platform) => {
                  const blocks = prospectBlocks(
                    platform,
                    profile.uiLocale,
                    platform.matchedContracts,
                  );
                  return (
                    <li key={platform.id} className="border border-[var(--line)] bg-[var(--card)] p-5">
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <a
                          href={platform.href}
                          target="_blank"
                          rel="noreferrer"
                          className="font-[family-name:var(--font-serif)] text-2xl underline-offset-4 hover:underline"
                        >
                          {platform.name}
                        </a>
                        <span className="text-sm text-[var(--muted)]">
                          <Copy
                            dict={dict}
                            text={motionLabel(dict, platform.motion)}
                            align="end"
                          />
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-[var(--muted)]">
                        {platform.matchedMarkets.map((market) => marketLabel(dict, market)).join(" · ")}
                        {" · "}
                        {platform.matchedContracts
                          .map((contract) => contractLabel(dict, contract))
                          .join(" · ")}
                      </p>
                      {platform.visaCaution ? (
                        <p className="mt-3 text-sm leading-6">
                          <Copy dict={dict} text={dict.matchingVisaCaution} />
                        </p>
                      ) : null}
                      {blocks.map((block) => (
                        <div key={block.side}>
                          <p className="mt-3 leading-7">
                            <Copy dict={dict} text={block.summary} />
                          </p>
                          <p className="mt-4 text-sm uppercase tracking-[0.14em] text-[var(--muted)]">
                            {blocks.length > 1
                              ? block.side === "freelance"
                                ? dict.matchingHowFreelance
                                : dict.matchingHowEmployment
                              : dict.matchingHow}
                          </p>
                          <ol className="mt-2 list-decimal space-y-2 pl-5 leading-7">
                            {block.steps.map((step) => (
                              <li key={step}>
                                <Copy dict={dict} text={step} />
                              </li>
                            ))}
                          </ol>
                        </div>
                      ))}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })
      )}
      <MatchingCompanies dict={dict} profile={profile} readiness={readiness} />
      <MatchingCourses dict={dict} profile={profile} />
    </div>
  );
}
