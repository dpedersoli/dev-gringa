"use client";

import { startTransition, useActionState, useEffect, type ReactNode } from "react";
import { saveIntake } from "@/app/actions/intake";
import { TipIcon } from "@/components/Glossary";
import { SubmitButton } from "@/components/SubmitButton";
import {
  COMPANY_KINDS,
  CONTRACTS,
  DOMAINS,
  MARKETS,
  SALARY_BANDS,
  TRACKS,
  VISA_STANCES,
  type CompanyKind,
  type ContractType,
  type DomainId,
  type MarketId,
  type Profile,
  type SalaryBand,
  type Track,
  type VisaStance,
} from "@/lib/domain/profile";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { TipId } from "@/lib/i18n/tips";
import { STACK_CHOICES, YEAR_BANDS, type IntakeGap } from "@/lib/profile/intake";

function Group({
  id,
  gaps,
  dict,
  children,
}: {
  id: IntakeGap;
  gaps: readonly IntakeGap[];
  dict: Dictionary;
  children: ReactNode;
}) {
  const marked = gaps.includes(id);
  return (
    <fieldset
      id={`intake-${id}`}
      className={
        marked ? "scroll-mt-24 border border-[var(--accent)] bg-[var(--chip)] p-3" : undefined
      }
    >
      {children}
      {marked ? (
        <p role="alert" className="mt-3">
          {dict.intakeError}
        </p>
      ) : null}
    </fieldset>
  );
}

function Choice({
  type,
  name,
  value,
  defaultChecked,
  label,
  tip,
  dict,
}: {
  type: "radio" | "checkbox";
  name: string;
  value: string;
  defaultChecked?: boolean;
  label: string;
  tip?: TipId;
  dict: Dictionary;
}) {
  return (
    <span className="inline-flex items-center">
      <label className="inline-flex items-start gap-2">
        <input
          className="mt-1"
          type={type}
          name={name}
          value={value}
          defaultChecked={defaultChecked}
        />
        <span>{label}</span>
      </label>
      {tip ? <TipIcon dict={dict} id={tip} /> : null}
    </span>
  );
}

export function IntakeForm({
  dict,
  profile,
}: {
  dict: Dictionary;
  profile: Profile | null;
}) {
  const [state, submit, pending] = useActionState(saveIntake, null);
  const gaps = state?.gaps ?? [];
  const known = new Set<string>(STACK_CHOICES);
  const extraStack = (profile?.stack ?? []).filter((item) => !known.has(item));
  const yearDefault = profile ? "keep" : "";

  useEffect(() => {
    const first = state?.gaps[0];
    if (!first) return;
    document.getElementById(`intake-${first}`)?.scrollIntoView({ block: "center" });
  }, [state]);

  return (
    <form
      className="flex max-w-xl flex-col gap-8 text-sm"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        startTransition(() => {
          submit(data);
        });
      }}
    >
      <Group id="years" gaps={gaps} dict={dict}>
        <legend className="text-[var(--muted)]">{dict.intakeYears}</legend>
        <div className="mt-2 flex flex-col gap-2">
          {profile ? (
            <Choice
              dict={dict}
              type="radio"
              name="yearBand"
              value="keep"
              defaultChecked={yearDefault === "keep"}
              label={dict.intakeYearsKeep.replace("{n}", String(profile.yearsExperience))}
            />
          ) : null}
          {YEAR_BANDS.map((id) => (
            <Choice
              key={id}
              dict={dict}
              type="radio"
              name="yearBand"
              value={id}
              label={
                id === "under_3"
                  ? dict.intakeYearsUnder3
                  : id === "3_5"
                    ? dict.intakeYears3
                    : id === "5_8"
                      ? dict.intakeYears5
                      : dict.intakeYears8
              }
            />
          ))}
        </div>
      </Group>

      <Group id="stack" gaps={gaps} dict={dict}>
        <legend className="text-[var(--muted)]">{dict.intakeStack}</legend>
        <p className="mt-1 text-[var(--muted)]">{dict.intakeUnsetHint}</p>
        <div className="mt-2 flex flex-col gap-2">
          {STACK_CHOICES.map((id) => (
            <Choice
              key={id}
              dict={dict}
              type="checkbox"
              name="stack"
              value={id}
              defaultChecked={profile?.stack.includes(id) ?? false}
              label={id}
            />
          ))}
          <Choice
            dict={dict}
            type="checkbox"
            name="stackUnset"
            value="1"
            defaultChecked={profile != null && profile.stack.length === 0}
            label={dict.intakeUnset}
          />
        </div>
        <label className="mt-3 block text-[var(--muted)]">
          {dict.intakeStackOther}
          <input
            name="stackOther"
            defaultValue={extraStack.join(", ")}
            className="mt-1 w-full rounded-sm border border-[var(--line)] bg-[var(--card)] px-3 py-2 text-[var(--foreground)] outline-none focus:border-[var(--accent)]"
          />
        </label>
      </Group>

      <Group id="markets" gaps={gaps} dict={dict}>
        <legend className="text-[var(--muted)]">{dict.intakeMarkets}</legend>
        <p className="mt-1 text-[var(--muted)]">{dict.intakeUnsetHint}</p>
        <div className="mt-2 flex flex-col gap-2">
          {MARKETS.map((id) => (
            <Choice
              key={id}
              dict={dict}
              type="checkbox"
              name="targetMarkets"
              value={id}
              defaultChecked={profile?.targetMarkets.includes(id) ?? false}
              label={marketQuestion(dict, id)}
            />
          ))}
          <Choice
            dict={dict}
            type="checkbox"
            name="marketsUnset"
            value="1"
            defaultChecked={profile != null && profile.targetMarkets.length === 0}
            label={dict.intakeUnset}
          />
        </div>
      </Group>

      <Group id="contracts" gaps={gaps} dict={dict}>
        <legend className="text-[var(--muted)]">{dict.intakeContracts}</legend>
        <p className="mt-1 text-[var(--muted)]">{dict.intakeUnsetHint}</p>
        <div className="mt-2 flex flex-col gap-2">
          {CONTRACTS.map((id) => (
            <Choice
              key={id}
              dict={dict}
              type="checkbox"
              name="contractTypes"
              value={id}
              defaultChecked={profile?.contractTypes.includes(id) ?? false}
              label={contractQuestion(dict, id)}
              tip={id === "short" ? "contractShort" : id === "long" ? "contractLong" : "freelance"}
            />
          ))}
          <Choice
            dict={dict}
            type="checkbox"
            name="contractsUnset"
            value="1"
            defaultChecked={profile != null && profile.contractTypes.length === 0}
            label={dict.intakeUnset}
          />
        </div>
      </Group>

      <fieldset>
        <legend className="inline-flex items-center text-[var(--muted)]">
          {dict.intakeSalary}
          <TipIcon dict={dict} id="salary" />
        </legend>
        <div className="mt-2 flex flex-col gap-2">
          {SALARY_BANDS.map((id) => (
            <Choice
              key={id}
              dict={dict}
              type="radio"
              name="salaryBand"
              value={id}
              defaultChecked={profile?.goals?.salaryBand === id}
              label={salaryQuestion(dict, id)}
            />
          ))}
          <Choice
            dict={dict}
            type="radio"
            name="salaryBand"
            value=""
            defaultChecked={!profile?.goals?.salaryBand}
            label={dict.intakeUnset}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend className="inline-flex items-center text-[var(--muted)]">
          {dict.intakeVisa}
          <TipIcon dict={dict} id="visto" />
        </legend>
        <div className="mt-2 flex flex-col gap-2">
          {VISA_STANCES.map((id) => (
            <Choice
              key={id}
              dict={dict}
              type="radio"
              name="visa"
              value={id}
              defaultChecked={profile?.goals?.visa === id}
              label={visaQuestion(dict, id)}
            />
          ))}
          <Choice
            dict={dict}
            type="radio"
            name="visa"
            value=""
            defaultChecked={!profile?.goals?.visa}
            label={dict.intakeUnset}
          />
        </div>
      </fieldset>

      <Group id="kinds" gaps={gaps} dict={dict}>
        <legend className="text-[var(--muted)]">{dict.intakeKind}</legend>
        <p className="mt-1 text-[var(--muted)]">{dict.intakeUnsetHint}</p>
        <div className="mt-2 flex flex-col gap-2">
          {COMPANY_KINDS.map((id) => (
            <Choice
              key={id}
              dict={dict}
              type="checkbox"
              name="companyKinds"
              value={id}
              defaultChecked={profile?.goals?.companyKinds?.includes(id) ?? false}
              label={kindQuestion(dict, id)}
              tip={id === "product" ? "product" : id === "startup" ? "startup" : "network"}
            />
          ))}
          <Choice
            dict={dict}
            type="checkbox"
            name="companyKindsUnset"
            value="1"
            defaultChecked={profile != null && !profile.goals?.companyKinds?.length}
            label={dict.intakeUnset}
          />
        </div>
      </Group>

      <fieldset>
        <legend className="inline-flex items-center text-[var(--muted)]">
          {dict.intakeTrack}
          <TipIcon dict={dict} id="ic" />
        </legend>
        <div className="mt-2 flex flex-col gap-2">
          {TRACKS.map((id) => (
            <Choice
              key={id}
              dict={dict}
              type="radio"
              name="track"
              value={id}
              defaultChecked={profile?.goals?.track === id}
              label={trackQuestion(dict, id)}
            />
          ))}
          <Choice
            dict={dict}
            type="radio"
            name="track"
            value=""
            defaultChecked={!profile?.goals?.track}
            label={dict.intakeUnset}
          />
        </div>
      </fieldset>

      <Group id="domains" gaps={gaps} dict={dict}>
        <legend className="inline-flex items-center text-[var(--muted)]">
          {dict.intakeDomain}
          <TipIcon dict={dict} id="domain" />
        </legend>
        <p className="mt-1 text-[var(--muted)]">{dict.intakeUnsetHint}</p>
        <div className="mt-2 flex flex-col gap-2">
          {DOMAINS.map((id) => (
            <Choice
              key={id}
              dict={dict}
              type="checkbox"
              name="domains"
              value={id}
              defaultChecked={profile?.goals?.domains?.includes(id) ?? false}
              label={domainQuestion(dict, id)}
              tip={
                id === "devtools"
                  ? "devtools"
                  : id === "fintech"
                    ? "fintech"
                    : id === "productivity"
                      ? "productivity"
                      : id === "infra"
                        ? "infra"
                        : "publishing"
              }
            />
          ))}
          <Choice
            dict={dict}
            type="checkbox"
            name="domainsUnset"
            value="1"
            defaultChecked={profile != null && !profile.goals?.domains?.length}
            label={dict.intakeUnset}
          />
        </div>
      </Group>

      <SubmitButton idle={dict.intakeSubmit} pending={dict.saving} busy={pending} />
    </form>
  );
}

function marketQuestion(dict: Dictionary, id: MarketId) {
  if (id === "us") return dict.intakeMarketUs;
  if (id === "uk") return dict.intakeMarketUk;
  if (id === "ca") return dict.intakeMarketCa;
  if (id === "eu") return dict.intakeMarketEu;
  return dict.intakeMarketAu;
}

function contractQuestion(dict: Dictionary, id: ContractType) {
  if (id === "short") return dict.intakeContractShort;
  if (id === "long") return dict.intakeContractLong;
  return dict.intakeContractFreelance;
}

function salaryQuestion(dict: Dictionary, id: SalaryBand) {
  if (id === "unsure") return dict.intakeSalaryUnsure;
  if (id === "upto_60") return dict.intakeSalary60;
  if (id === "60_90") return dict.intakeSalary90;
  return dict.intakeSalaryPlus;
}

function visaQuestion(dict: Dictionary, id: VisaStance) {
  if (id === "remote_br") return dict.intakeVisaRemote;
  if (id === "relocate") return dict.intakeVisaRelocate;
  return dict.intakeVisaAuth;
}

function kindQuestion(dict: Dictionary, id: CompanyKind) {
  if (id === "product") return dict.intakeKindProduct;
  if (id === "startup") return dict.intakeKindStartup;
  return dict.intakeKindNetwork;
}

function trackQuestion(dict: Dictionary, id: Track) {
  if (id === "ic") return dict.intakeTrackIc;
  if (id === "management") return dict.intakeTrackManagement;
  return dict.intakeTrackBoth;
}

function domainQuestion(dict: Dictionary, id: DomainId) {
  if (id === "devtools") return dict.intakeDomainDevtools;
  if (id === "fintech") return dict.intakeDomainFintech;
  if (id === "productivity") return dict.intakeDomainProductivity;
  if (id === "infra") return dict.intakeDomainInfra;
  return dict.intakeDomainPublishing;
}
