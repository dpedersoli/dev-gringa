import {
  COMPANY_KINDS,
  CONTRACTS,
  DOMAINS,
  LOCALES,
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
import { saveProfile } from "@/app/actions/profile";
import { Copy, TipIcon } from "@/components/Glossary";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { TipId } from "@/lib/i18n/tips";
import { SubmitButton } from "@/components/SubmitButton";

const fieldClass =
  "mt-1 w-full rounded-sm border border-[var(--line)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)]";

function marketLabel(dict: Dictionary, id: MarketId) {
  return dict[`market_${id}`];
}

function contractLabel(dict: Dictionary, id: ContractType) {
  return dict[`contract_${id}`];
}

function salaryLabel(dict: Dictionary, id: SalaryBand) {
  if (id === "unsure") return dict.goalSalaryUnsure;
  if (id === "upto_60") return dict.goalSalary60;
  if (id === "60_90") return dict.goalSalary90;
  return dict.goalSalaryPlus;
}

function visaLabel(dict: Dictionary, id: VisaStance) {
  if (id === "remote_br") return dict.goalVisaRemote;
  if (id === "relocate") return dict.goalVisaRelocate;
  return dict.goalVisaAuth;
}

function trackLabel(dict: Dictionary, id: Track) {
  if (id === "ic") return dict.goalTrackIc;
  if (id === "management") return dict.goalTrackManagement;
  return dict.goalTrackBoth;
}

function kindLabel(dict: Dictionary, id: CompanyKind) {
  if (id === "product") return dict.goalKindProduct;
  if (id === "startup") return dict.goalKindStartup;
  return dict.goalKindNetwork;
}

function kindTip(id: CompanyKind): TipId {
  if (id === "product") return "product";
  if (id === "startup") return "startup";
  return "network";
}

function domainLabel(dict: Dictionary, id: DomainId) {
  if (id === "devtools") return dict.goalDomainDevtools;
  if (id === "fintech") return dict.goalDomainFintech;
  if (id === "productivity") return dict.goalDomainProductivity;
  if (id === "infra") return dict.goalDomainInfra;
  return dict.goalDomainPublishing;
}

function domainTip(id: DomainId): TipId {
  if (id === "devtools") return "devtools";
  if (id === "fintech") return "fintech";
  if (id === "productivity") return "productivity";
  if (id === "infra") return "infra";
  return "publishing";
}

export function ProfileForm({
  dict,
  profile,
  mode,
  error,
}: {
  dict: Dictionary;
  profile: Profile | null;
  mode: "onboarding" | "profile";
  error?: boolean;
}) {
  const selectedMarkets = new Set<MarketId>(
    profile?.targetMarkets ?? ["us"],
  );
  const selectedContracts = new Set<ContractType>(
    profile?.contractTypes ?? ["long"],
  );

  return (
    <form action={saveProfile} className="flex max-w-xl flex-col gap-6">
      <input type="hidden" name="from" value={mode} />
      {error ? (
        <p className="border border-[var(--accent)] bg-[var(--chip)] px-3 py-2 text-sm">
          {dict.errorGeneric}
        </p>
      ) : null}

      <label className="block text-sm">
        <span className="text-[var(--muted)]">{dict.displayName}</span>
        <input
          name="displayName"
          required
          defaultValue={profile?.displayName ?? ""}
          className={fieldClass}
        />
      </label>

      <label className="block text-sm">
        <span className="text-[var(--muted)]">{dict.years}</span>
        <input
          name="yearsExperience"
          type="number"
          min={1}
          max={20}
          required
          defaultValue={profile?.yearsExperience ?? 5}
          className={fieldClass}
        />
      </label>

      <div className="text-sm">
        <p className="text-[var(--muted)]">{dict.seniority}</p>
        <p className="mt-1 font-medium">{dict.seniorityValue}</p>
        <p className="mt-1 text-[var(--muted)]">
          <Copy dict={dict} text={dict.seniorityHint} />
        </p>
      </div>

      <label className="block text-sm">
        <span className="text-[var(--muted)]">{dict.stack}</span>
        <input
          name="stack"
          defaultValue={profile?.stack.join(", ") ?? ""}
          className={fieldClass}
        />
        <span className="mt-1 block text-[13px] text-[var(--muted)]">
          {dict.stackHint}
        </span>
      </label>

      <fieldset className="text-sm">
        <legend className="text-[var(--muted)]">{dict.markets}</legend>
        <div className="mt-2 flex flex-col gap-2">
          {MARKETS.map((id) => (
            <label key={id} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="targetMarkets"
                value={id}
                defaultChecked={selectedMarkets.has(id)}
              />
              {marketLabel(dict, id)}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="text-sm">
        <legend className="text-[var(--muted)]">{dict.contracts}</legend>
        <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{dict.contractsHint}</p>
        <div className="mt-2 flex flex-col gap-2">
          {CONTRACTS.map((id) => (
            <span key={id} className="inline-flex items-center">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  name="contractTypes"
                  value={id}
                  defaultChecked={selectedContracts.has(id)}
                />
                {contractLabel(dict, id)}
              </label>
              <TipIcon
                dict={dict}
                id={
                  (id === "short"
                    ? "contractShort"
                    : id === "long"
                      ? "contractLong"
                      : "freelance") satisfies TipId
                }
              />
            </span>
          ))}
        </div>
      </fieldset>

      <fieldset className="text-sm">
        <legend className="text-[var(--muted)]">{dict.goalTitle}</legend>
        <p className="mt-1 leading-6 text-[var(--muted)]">{dict.goalHint}</p>

        <div className="mt-4">
          <span className="inline-flex items-center text-[var(--muted)]">
            {dict.goalSalary}
            <TipIcon dict={dict} id="salary" />
          </span>
          <select
            name="salaryBand"
            defaultValue={profile?.goals?.salaryBand ?? ""}
            className={fieldClass}
          >
            <option value="">{dict.goalUnset}</option>
            {SALARY_BANDS.map((id) => (
              <option key={id} value={id}>
                {salaryLabel(dict, id)}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <span className="inline-flex items-center text-[var(--muted)]">
            {dict.goalVisa}
            <TipIcon dict={dict} id="visto" />
          </span>
          <select
            name="visa"
            defaultValue={profile?.goals?.visa ?? ""}
            className={fieldClass}
          >
            <option value="">{dict.goalUnset}</option>
            {VISA_STANCES.map((id) => (
              <option key={id} value={id}>
                {visaLabel(dict, id)}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <span className="inline-flex items-center text-[var(--muted)]">
            {dict.goalTrack}
            <TipIcon dict={dict} id="ic" />
          </span>
          <select
            name="track"
            defaultValue={profile?.goals?.track ?? ""}
            className={fieldClass}
          >
            <option value="">{dict.goalUnset}</option>
            {TRACKS.map((id) => (
              <option key={id} value={id}>
                {trackLabel(dict, id)}
              </option>
            ))}
          </select>
        </div>

        <fieldset className="mt-4">
          <legend className="text-[var(--muted)]">{dict.goalKind}</legend>
          <div className="mt-2 flex flex-col gap-2">
            {COMPANY_KINDS.map((id) => (
              <span key={id} className="inline-flex items-center">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="companyKinds"
                    value={id}
                    defaultChecked={profile?.goals?.companyKinds?.includes(id) ?? false}
                  />
                  {kindLabel(dict, id)}
                </label>
                <TipIcon dict={dict} id={kindTip(id)} />
              </span>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-4">
          <legend className="inline-flex items-center text-[var(--muted)]">
            {dict.goalDomain}
            <TipIcon dict={dict} id="domain" />
          </legend>
          <div className="mt-2 flex flex-col gap-2">
            {DOMAINS.map((id) => (
              <span key={id} className="inline-flex items-center">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="domains"
                    value={id}
                    defaultChecked={profile?.goals?.domains?.includes(id) ?? false}
                  />
                  {domainLabel(dict, id)}
                </label>
                <TipIcon dict={dict} id={domainTip(id)} />
              </span>
            ))}
          </div>
        </fieldset>
      </fieldset>

      <label className="block text-sm">
        <span className="text-[var(--muted)]">{dict.uiLocale}</span>
        <select
          name="uiLocale"
          defaultValue={profile?.uiLocale ?? "pt-BR"}
          className={fieldClass}
        >
          {LOCALES.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        <span className="text-[var(--muted)]">{dict.transcriptLocale}</span>
        <select
          name="transcriptLocale"
          defaultValue={profile?.transcriptLocale ?? "pt-BR"}
          className={fieldClass}
        >
          {LOCALES.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
        <span className="mt-1 block text-[13px] text-[var(--muted)]">
          {dict.transcriptHint}
        </span>
      </label>

      <SubmitButton
        idle={mode === "onboarding" ? dict.save : dict.saveProfile}
        pending={dict.saving}
      />
    </form>
  );
}
