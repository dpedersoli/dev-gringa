import { Copy } from "@/components/Glossary";
import { CONTRACTS, hasCompanyGoalFilter, type ContractType, type MarketId, type Profile } from "@/lib/domain/profile";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import {
  listCompanies,
  type CompanyPace,
  type ListedCompany,
  type LiveCodeStance,
} from "@/lib/matching/companies";

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

function paceLabel(dict: Dictionary, pace: CompanyPace) {
  if (pace === "primary") return dict.matchingCompanyPrimary;
  if (pace === "secondary") return dict.matchingCompanySecondary;
  if (pace === "early") return dict.matchingCompanyEarly;
  return dict.matchingCompanyProfile;
}

function liveCodeLabel(dict: Dictionary, stance: LiveCodeStance) {
  if (stance === "forbidden") return dict.matchingLiveCodeForbidden;
  if (stance === "allowed") return dict.matchingLiveCodeAllowed;
  if (stance === "expected") return dict.matchingLiveCodeExpected;
  if (stance === "mixed") return dict.matchingLiveCodeMixed;
  return dict.matchingLiveCodeUnspecified;
}

const PACES: CompanyPace[] = ["primary", "profile", "secondary", "early"];

function CompanyCard({
  dict,
  company,
}: {
  dict: Dictionary;
  company: ListedCompany;
}) {
  return (
    <li className="border border-[var(--line)] bg-[var(--card)] p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <a
          href={company.href}
          target="_blank"
          rel="noreferrer"
          className="font-[family-name:var(--font-serif)] text-2xl underline-offset-4 hover:underline"
        >
          {company.name}
        </a>
        <span className="text-sm text-[var(--muted)]">
          <Copy
            dict={dict}
            text={company.bar === "high" ? dict.matchingBarHigh : dict.matchingBarOpen}
            align="end"
          />
        </span>
      </div>
      <p className="mt-2 text-sm text-[var(--muted)]">
        {company.matchedMarkets.map((market) => marketLabel(dict, market)).join(" · ")}
        {" · "}
        {contractLabel(dict, company.contract)}
      </p>
      <p className="mt-3 text-sm leading-6">
        <Copy dict={dict} text={liveCodeLabel(dict, company.liveCode)} />
      </p>
      {company.liveCodeNote ? (
        <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
          <Copy dict={dict} text={company.liveCodeNote} />
        </p>
      ) : null}
      <p className="mt-3 leading-7">
        <Copy dict={dict} text={company.copy.summary} />
      </p>
      <p className="mt-4 text-sm uppercase tracking-[0.14em] text-[var(--muted)]">
        {dict.matchingHow}
      </p>
      <ol className="mt-2 list-decimal space-y-2 pl-5 leading-7">
        {company.copy.steps.map((step) => (
          <li key={step}>
            <Copy dict={dict} text={step} />
          </li>
        ))}
      </ol>
    </li>
  );
}

export function MatchingCompanies({
  dict,
  profile,
  readiness,
}: {
  dict: Dictionary;
  profile: Profile;
  readiness: number | null;
}) {
  const companies = listCompanies(profile, readiness);
  const sought = CONTRACTS.filter((contract) => profile.contractTypes.includes(contract));

  return (
    <section className="flex flex-col gap-8">
      <div>
        <h2 className="font-[family-name:var(--font-serif)] text-3xl tracking-tight">
          {dict.matchingCompaniesTitle}
        </h2>
        <p className="mt-3 max-w-xl leading-7 text-[var(--muted)]">
          <Copy dict={dict} text={dict.matchingCompaniesLead} />
        </p>
      </div>
      {sought.map((contract) => {
        const group = companies.filter((company) => company.contract === contract);
        return (
          <div key={contract}>
            <h3 className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">
              <Copy dict={dict} text={contractLabel(dict, contract)} />
            </h3>
            {group.length === 0 ? (
              <p className="mt-3 leading-7 text-[var(--muted)]">
                <Copy
                  dict={dict}
                  text={
                    contract !== "short" && hasCompanyGoalFilter(profile.goals)
                      ? dict.matchingCompaniesGoalsEmpty
                      : dict.matchingCompaniesEmpty
                  }
                />
              </p>
            ) : (
              PACES.map((pace) => {
                const rows = group.filter((company) => company.pace === pace);
                if (rows.length === 0) return null;
                return (
                  <div key={pace} className="mt-4">
                    <p className="text-sm text-[var(--muted)]">
                      <Copy dict={dict} text={paceLabel(dict, pace)} />
                    </p>
                    <ul className="mt-3 flex flex-col gap-4">
                      {rows.map((company) => (
                        <CompanyCard
                          key={`${company.id}-${company.contract}`}
                          dict={dict}
                          company={company}
                        />
                      ))}
                    </ul>
                  </div>
                );
              })
            )}
          </div>
        );
      })}
    </section>
  );
}
