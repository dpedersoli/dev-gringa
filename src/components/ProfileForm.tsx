import {
  CONTRACTS,
  LOCALES,
  MARKETS,
  type ContractType,
  type MarketId,
  type Profile,
} from "@/lib/domain/profile";
import { saveProfile } from "@/app/actions/profile";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { SubmitButton } from "@/components/SubmitButton";

const fieldClass =
  "mt-1 w-full rounded-sm border border-[var(--line)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)]";

function marketLabel(dict: Dictionary, id: MarketId) {
  return dict[`market_${id}`];
}

function contractLabel(dict: Dictionary, id: ContractType) {
  return dict[`contract_${id}`];
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
        <p className="mt-1 text-[var(--muted)]">{dict.seniorityHint}</p>
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
        <div className="mt-2 flex flex-col gap-2">
          {CONTRACTS.map((id) => (
            <label key={id} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="contractTypes"
                value={id}
                defaultChecked={selectedContracts.has(id)}
              />
              {contractLabel(dict, id)}
            </label>
          ))}
        </div>
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
