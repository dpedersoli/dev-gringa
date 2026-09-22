import type { CompanyKind, ContractType, DomainId, Locale, MarketId, Profile } from "@/lib/domain/profile";
import { hasCompanyGoalFilter } from "@/lib/domain/profile";

export type CompanyBar = "open" | "high";

/** Mesmas faixas dos canais (D-036): a nota marca o ritmo e não esconde a empresa (D-038). */
export type CompanyPace = "profile" | "primary" | "secondary" | "early";

type Copy = {
  summary: string;
  steps: [string, string, string];
};

export type Company = {
  id: string;
  name: string;
  href: string;
  markets: readonly MarketId[];
  bar: CompanyBar;
  roles: Partial<Record<ContractType, Record<Locale, Copy>>>;
};

const ALL_MARKETS: readonly MarketId[] = ["us", "uk", "ca", "eu", "au"];

export const COMPANIES: readonly Company[] = [
  {
    id: "supabase",
    name: "Supabase",
    href: "https://supabase.com/careers",
    markets: ALL_MARKETS,
    bar: "open",
    roles: {
      long: {
        "pt-BR": {
          summary: "Emprego remoto, time em dezenas de países. Não é freela.",
          steps: [
            "Abra uma vaga de engenharia cujo nível você sustenta. Muitas pedem senior.",
            "A stack da vaga tem que ser a sua. Não candidate para “qualquer backend”.",
            "O time é async. A candidatura é na vaga, não uma mensagem fria.",
          ],
        },
        "en-US": {
          summary: "Remote employment, a team across dozens of countries. Not freelance.",
          steps: [
            "Open an engineering role at a level you can defend. Many ask for senior.",
            "The role's stack has to be yours. Do not apply for “any backend”.",
            "The team is async. Apply on the role, not with a cold message.",
          ],
        },
      },
    },
  },
  {
    id: "deel",
    name: "Deel",
    href: "https://www.deel.com/careers",
    markets: ALL_MARKETS,
    bar: "open",
    roles: {
      long: {
        "pt-BR": {
          summary: "Emprego. Algumas vagas de engenharia listam o Brasil; outras, não.",
          steps: [
            "Filtre engenharia e leia o país da vaga antes de escrever.",
            "Se o país não fecha, pule. Não insista por mensagem.",
            "Uma vaga cuja stack você sustenta. Não é volume.",
          ],
        },
        "en-US": {
          summary: "Employment. Some engineering roles list Brazil; others do not.",
          steps: [
            "Filter to engineering and read the role's country before you write.",
            "If the country does not fit, skip. Do not follow up in a message.",
            "One role whose stack you can defend. This is not volume.",
          ],
        },
      },
    },
  },
  {
    id: "remote",
    name: "Remote",
    href: "https://remote.com/careers",
    markets: ALL_MARKETS,
    bar: "open",
    roles: {
      long: {
        "pt-BR": {
          summary: "A empresa Remote, emprego. Não é o quadro de vagas de outras empresas.",
          steps: [
            "Use o careers da própria Remote.",
            "Leia o país da vaga. Sem o país, não candidate.",
            "Uma vaga de engenharia por vez, com a stack do anúncio.",
          ],
        },
        "en-US": {
          summary: "The company Remote, employment. Not the job board of other companies.",
          steps: [
            "Use Remote's own careers page.",
            "Read the role's country. Without a fit, do not apply.",
            "One engineering role at a time, with the stack in the post.",
          ],
        },
      },
    },
  },
  {
    id: "doist",
    name: "Doist",
    href: "https://doist.com/careers",
    markets: ALL_MARKETS,
    bar: "open",
    roles: {
      long: {
        "pt-BR": {
          summary: "Todoist e Twist. Remoto e async. A vaga diz se é emprego no seu país.",
          steps: [
            "Leia a vaga aberta. Sem vaga aberta, não mande currículo no escuro.",
            "Confira país e tipo de contrato no anúncio.",
            "Escreva sobre um produto que você usa de verdade, em poucas frases.",
          ],
        },
        "en-US": {
          summary: "Todoist and Twist. Remote and async. The role says whether it is employment in your country.",
          steps: [
            "Read the open role. With no open role, do not send a resume into the dark.",
            "Check country and contract type on the post.",
            "Write about a product you actually use, in a few sentences.",
          ],
        },
      },
    },
  },
  {
    id: "grafana",
    name: "Grafana Labs",
    href: "https://grafana.com/careers/",
    markets: ["us", "uk", "ca", "eu", "au"],
    bar: "open",
    roles: {
      long: {
        "pt-BR": {
          summary: "Emprego remoto. Cada vaga lista os países. O seu pode não estar.",
          steps: [
            "Abra a vaga e leia a lista de países.",
            "Se o seu país não está, pule.",
            "O processo tem um exercício prático. Reserve tempo. Não é uma call surpresa.",
          ],
        },
        "en-US": {
          summary: "Remote employment. Each role lists countries. Yours may be absent.",
          steps: [
            "Open the role and read the country list.",
            "If your country is not there, skip.",
            "The process includes a practical exercise. Reserve time. It is not a surprise call.",
          ],
        },
      },
    },
  },
  {
    id: "elastic",
    name: "Elastic",
    href: "https://www.elastic.co/careers/",
    markets: ["us", "uk", "ca", "eu", "au"],
    bar: "open",
    roles: {
      long: {
        "pt-BR": {
          summary: "Empresa distribuída, emprego. A localização está na vaga.",
          steps: [
            "Leia a location antes do currículo.",
            "Candidate só na stack que você opera, não na marca.",
            "Não é contrato avulso. Se a vaga não for emprego, pule.",
          ],
        },
        "en-US": {
          summary: "A distributed company, employment. Location is on the role.",
          steps: [
            "Read the location before the resume.",
            "Apply only for a stack you operate, not for the brand.",
            "This is not a one-off contract. If the role is not employment, skip.",
          ],
        },
      },
    },
  },
  {
    id: "posthog",
    name: "PostHog",
    href: "https://posthog.com/careers",
    markets: ["us", "uk", "ca", "eu"],
    bar: "open",
    roles: {
      long: {
        "pt-BR": {
          summary:
            "Emprego onde eles têm como contratar (EUA, Canadá e parte da Europa e do Reino Unido). No Brasil eles não usam EOR.",
          steps: [
            "Leia o handbook de hiring, a lista de países, antes de candidate.",
            "Emprego só se a vaga incluir o seu país.",
            "Não mande mensagem fria. A porta é a vaga.",
          ],
        },
        "en-US": {
          summary:
            "Employment where they can hire (US, Canada, and parts of Europe and the UK). They do not use an EOR in Brazil.",
          steps: [
            "Read the hiring handbook, the country list, before you apply.",
            "Employment only if the role includes your country.",
            "Do not send a cold message. The door is the role.",
          ],
        },
      },
      freelance: {
        "pt-BR": {
          summary:
            "Onde não há EOR, o handbook diz que eles já contrataram como contractor. O Brasil está nesse grupo.",
          steps: [
            "Leia o trecho “Hired as contractors” no handbook. Sem isso, não invente a via.",
            "Só siga se a vaga aceitar contractor no seu país.",
            "A proposta leva taxa e fuso. Não é currículo em massa.",
          ],
        },
        "en-US": {
          summary:
            "Where there is no EOR, the handbook says they have hired contractors. Brazil is in that group.",
          steps: [
            "Read the “Hired as contractors” section in the handbook. Without that, do not invent the path.",
            "Continue only if the role accepts a contractor in your country.",
            "The proposal carries a rate and a time zone. It is not a resume blast.",
          ],
        },
      },
    },
  },
  {
    id: "canonical",
    name: "Canonical",
    href: "https://canonical.com/careers",
    markets: ALL_MARKETS,
    bar: "high",
    roles: {
      long: {
        "pt-BR": {
          summary: "Ubuntu. Remoto em muitos países, emprego. O processo é longo e escrito.",
          steps: [
            "Candidate a uma vaga. Não mande um e-mail genérico para a empresa.",
            "O formulário e as entrevistas levam semanas. Não misture com um dia de quadros.",
            "Pleno entra em vaga que não pede staff. Leia o nível.",
          ],
        },
        "en-US": {
          summary: "Ubuntu. Remote in many countries, employment. The process is long and written.",
          steps: [
            "Apply to one role. Do not send a generic email to the company.",
            "The form and the interviews take weeks. Do not mix this with a board day.",
            "Mid-level fits a role that does not ask for staff. Read the level.",
          ],
        },
      },
    },
  },
  {
    id: "automattic",
    name: "Automattic",
    href: "https://automattic.com/work-with-us/",
    markets: ALL_MARKETS,
    bar: "high",
    roles: {
      long: {
        "pt-BR": {
          summary: "Emprego mundial. A porta é um trial pago, não uma candidatura de um clique.",
          steps: [
            "Escolha uma vaga aberta.",
            "O trial é o portão. Reserve dias, não uma hora.",
            "Não trate o trial como freela. O destino é emprego.",
          ],
        },
        "en-US": {
          summary: "Worldwide employment. The door is a paid trial, not a one-click application.",
          steps: [
            "Pick one open role.",
            "The trial is the gate. Reserve days, not an hour.",
            "Do not treat the trial as freelance. The destination is employment.",
          ],
        },
      },
    },
  },
  {
    id: "gitlab",
    name: "GitLab",
    href: "https://about.gitlab.com/jobs/",
    markets: ["us", "uk", "ca", "eu", "au"],
    bar: "high",
    roles: {
      long: {
        "pt-BR": {
          summary:
            "Emprego onde há entidade ou PEO. Fora dessa lista eles não estão contratando.",
          steps: [
            "Abra a vaga e o handbook de employment solutions.",
            "Se o seu país não está na lista, pare.",
            "Uma vaga por vez. O processo é longo.",
          ],
        },
        "en-US": {
          summary: "Employment where they have an entity or a PEO. Outside that list they are not hiring.",
          steps: [
            "Open the role and the employment-solutions handbook.",
            "If your country is not on the list, stop.",
            "One role at a time. The process is long.",
          ],
        },
      },
    },
  },
  {
    id: "vercel",
    name: "Vercel",
    href: "https://vercel.com/careers",
    markets: ["us", "uk", "eu"],
    bar: "high",
    roles: {
      long: {
        "pt-BR": {
          summary: "Emprego, concorrido. O país está na vaga e costuma ser restrito.",
          steps: [
            "Leia a location. Residência obrigatória que você não tem: pule.",
            "Uma vaga alinhada à stack, não à marca.",
            "Não é o primeiro lugar para gastar uma semana se o Readiness ainda está na faixa do meio.",
          ],
        },
        "en-US": {
          summary: "Employment, competitive. The country is on the role and is often restricted.",
          steps: [
            "Read the location. A residency you do not have: skip.",
            "One role aligned to the stack, not to the brand.",
            "This is not the first place to spend a week if Readiness is still in the middle band.",
          ],
        },
      },
    },
  },
  {
    id: "stripe",
    name: "Stripe",
    href: "https://stripe.com/jobs",
    markets: ["us", "uk", "ca", "eu", "au"],
    bar: "high",
    roles: {
      long: {
        "pt-BR": {
          summary: "Emprego de barra alta. A vaga quase sempre exige o país listado.",
          steps: [
            "Leia o país antes do resto. Sem encaixe, não candidate.",
            "Pleno só em vaga que não pede staff.",
            "Não é o canal para começar. É uma candidatura, quando o resto já está no ponto.",
          ],
        },
        "en-US": {
          summary: "High-bar employment. The role almost always requires the listed country.",
          steps: [
            "Read the country before the rest. Without a fit, do not apply.",
            "Mid-level only on a role that does not ask for staff.",
            "This is not where you start. It is one application, once the rest is in shape.",
          ],
        },
      },
    },
  },
];

const COMPANY_GOALS: Record<string, { kinds: CompanyKind[]; domains: DomainId[] }> = {
  supabase: { kinds: ["product", "startup"], domains: ["devtools"] },
  deel: { kinds: ["product"], domains: ["fintech"] },
  remote: { kinds: ["product"], domains: ["fintech"] },
  doist: { kinds: ["product"], domains: ["productivity"] },
  grafana: { kinds: ["product"], domains: ["devtools"] },
  elastic: { kinds: ["product"], domains: ["devtools"] },
  posthog: { kinds: ["product", "startup"], domains: ["devtools"] },
  canonical: { kinds: ["product"], domains: ["infra"] },
  automattic: { kinds: ["product"], domains: ["publishing"] },
  gitlab: { kinds: ["product"], domains: ["devtools"] },
  vercel: { kinds: ["product"], domains: ["devtools"] },
  stripe: { kinds: ["product"], domains: ["fintech"] },
};

function companyMatchesGoals(id: string, profile: Profile) {
  if (!hasCompanyGoalFilter(profile.goals)) return true;
  const tagged = COMPANY_GOALS[id];
  if (!tagged) return false;
  const kinds = profile.goals?.companyKinds ?? [];
  const domains = profile.goals?.domains ?? [];
  if (kinds.length && !tagged.kinds.some((kind) => kinds.includes(kind))) return false;
  if (domains.length && !tagged.domains.some((domain) => domains.includes(domain))) return false;
  return true;
}

export type LiveCodeStance = "forbidden" | "allowed" | "expected" | "mixed" | "unspecified";

type LiveCodePolicy = {
  stance: LiveCodeStance;
  note?: Record<Locale, string>;
};

/** Política pública de IA na prova. Sem página da empresa, o convite manda (D-043). */
const LIVE_CODE: Record<string, LiveCodePolicy> = {
  supabase: { stance: "unspecified" },
  deel: { stance: "unspecified" },
  remote: { stance: "unspecified" },
  doist: {
    stance: "allowed",
    note: {
      "pt-BR":
        "Pode usar IA para organizar o pensamento. O que conta é a sua voz. Se usar, diga.",
      "en-US":
        "You can use AI to organize your thinking. What counts is your voice. If you use it, say so.",
    },
  },
  grafana: { stance: "unspecified" },
  elastic: {
    stance: "forbidden",
    note: {
      "pt-BR":
        "A conversa é entre pessoas, sem ferramenta de IA no meio. IA para organizar o texto antes da conversa pode.",
      "en-US":
        "The conversation is person to person, with no AI tool in the middle. AI to organize the text before the conversation is fine.",
    },
  },
  posthog: {
    stance: "mixed",
    note: {
      "pt-BR":
        "No projeto do dia, IA pode, se você explicar a arquitetura. Na sessão de debug, só autocomplete.",
      "en-US":
        "On the day's project, AI is fine if you can explain the architecture. On the debugging session, only autocomplete.",
    },
  },
  canonical: { stance: "unspecified" },
  automattic: { stance: "unspecified" },
  gitlab: {
    stance: "expected",
    note: {
      "pt-BR":
        "O handbook pede para usar IA na entrevista técnica e explicar o que a ferramenta fez.",
      "en-US":
        "The handbook asks you to use AI in the technical interview and explain what the tool did.",
    },
  },
  vercel: {
    stance: "mixed",
    note: {
      "pt-BR":
        "O padrão público de engenharia é usar IA e dizer para quê. Uma rodada que o convite marca sem IA fica proibida.",
      "en-US":
        "The public engineering default is to use AI and say what for. A round the invite marks as no AI stays forbidden.",
    },
  },
  stripe: {
    stance: "forbidden",
    note: {
      "pt-BR":
        "O guia público da prova proíbe ferramenta de IA. Se o convite nomear uma rodada de exercício com IA, essa rodada traz a regra dela.",
      "en-US":
        "The public interview guide prohibits an AI tool. If the invite names an AI exercise round, that round brings its own rule.",
    },
  },
};

function liveCodePolicy(id: string): LiveCodePolicy {
  return LIVE_CODE[id] ?? { stance: "unspecified" };
}

export function companyPace(bar: CompanyBar, readiness: number | null): CompanyPace {
  if (readiness === null) return "profile";
  if (bar === "open") return readiness >= 60 ? "primary" : "secondary";
  if (readiness >= 75) return "primary";
  if (readiness >= 60) return "secondary";
  return "early";
}

const PACE_RANK: Record<CompanyPace, number> = {
  primary: 0,
  profile: 0,
  secondary: 1,
  early: 2,
};

export type ListedCompany = {
  id: string;
  name: string;
  href: string;
  bar: CompanyBar;
  pace: CompanyPace;
  contract: ContractType;
  matchedMarkets: MarketId[];
  copy: Copy;
  liveCode: LiveCodeStance;
  liveCodeNote?: string;
};

export function listCompanies(profile: Profile, readiness: number | null): ListedCompany[] {
  const markets = new Set(profile.targetMarkets);
  const contracts = new Set(profile.contractTypes);
  return COMPANIES.flatMap((company) => {
    const matchedMarkets = company.markets.filter((market) => markets.has(market));
    if (matchedMarkets.length === 0) return [];
    if (!companyMatchesGoals(company.id, profile)) return [];
    return (Object.keys(company.roles) as ContractType[]).flatMap((contract) => {
      if (!contracts.has(contract)) return [];
      const copy = company.roles[contract]?.[profile.uiLocale];
      if (!copy) return [];
      const policy = liveCodePolicy(company.id);
      return [
        {
          id: company.id,
          name: company.name,
          href: company.href,
          bar: company.bar,
          pace: companyPace(company.bar, readiness),
          contract,
          matchedMarkets,
          copy,
          liveCode: policy.stance,
          liveCodeNote: policy.note?.[profile.uiLocale],
        },
      ];
    });
  }).sort((a, b) => {
    const pace = PACE_RANK[a.pace] - PACE_RANK[b.pace];
    if (pace !== 0) return pace;
    return a.name.localeCompare(b.name);
  });
}
