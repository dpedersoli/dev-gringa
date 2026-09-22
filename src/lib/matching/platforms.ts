import type { ContractType, Locale, MarketId, Profile } from "@/lib/domain/profile";

export type ProspectMotion = "inbound" | "selective" | "screen";

/** Sem Readiness a nota não entra. Com nota, o ritmo não esconde o canal (D-036). */
export type PlatformPace = "profile" | "primary" | "secondary" | "early";

type SideCopy = {
  summary: string;
  steps: [string, string, string];
};

type Copy = SideCopy & {
  freelance?: SideCopy;
};

export type Platform = {
  id: string;
  name: string;
  href: string;
  markets: readonly MarketId[];
  contracts: readonly ContractType[];
  motion: ProspectMotion;
  copy: Record<Locale, Copy>;
  /** Rede de triagem (Arc, Turing, Toptal, Gun.io). Quadro de vaga não tem tipo. */
  kind?: "network";
  /** Triagem de emprego presa aos EUA. Remoto sem visto marca o ritmo como cedo. */
  visaSensitive?: boolean;
};

const ALL_MARKETS: readonly MarketId[] = ["us", "uk", "ca", "eu", "au"];
const ALL_CONTRACTS: readonly ContractType[] = ["short", "long", "freelance"];

export const PLATFORMS: readonly Platform[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    href: "https://www.linkedin.com/jobs/",
    markets: ALL_MARKETS,
    contracts: ALL_CONTRACTS,
    motion: "inbound",
    copy: {
      "pt-BR": {
        summary:
          "O canal em que o recrutador chega até você. Candidatura em massa aqui é o movimento errado.",
        steps: [
          "Headline e Sobre em inglês-US, com a stack e remoto. Open to Work só para recrutadores.",
          "Comente em inglês em posts de engenharia. Responda InMail no mesmo dia, com um projeto seu.",
          "Easy Apply não é o plano. Poucas vagas por semana, cada uma com uma frase sobre o produto.",
        ],
        freelance: {
          summary:
            "O mesmo canal leva contrato avulso. O recrutador continua chegando; agora a conversa pede taxa e disponibilidade.",
          steps: [
            "No Open to Work, marque contract. Headline em inglês-US com a stack e freelance remote.",
            "Responda InMail de contrato com taxa, fuso e um projeto. Sem taxa, a conversa não anda.",
            "Poucos anúncios de contract por semana. Easy Apply em massa não é o plano.",
          ],
        },
      },
      "en-US": {
        summary: "The channel where a recruiter comes to you. Spraying applications here is the wrong motion.",
        steps: [
          "Headline and About in English-US, with your stack and remote. Open to Work for recruiters only.",
          "Comment in English on engineering posts. Answer InMail the same day, with one project of yours.",
          "Easy Apply is not the plan. A few roles a week, each with one sentence about the product.",
        ],
        freelance: {
          summary:
            "The same channel carries contract work. The recruiter still comes to you; the conversation now needs a rate and availability.",
          steps: [
            "On Open to Work, select contract. Headline in English-US with your stack and freelance remote.",
            "Answer a contract InMail with your rate, time zone, and one project. Without a rate, the thread stalls.",
            "A few contract posts a week. Spraying Easy Apply is not the plan.",
          ],
        },
      },
    },
  },
  {
    id: "hn",
    name: "Hacker News — Who is hiring",
    href: "https://news.ycombinator.com/",
    markets: ALL_MARKETS,
    contracts: ALL_CONTRACTS,
    motion: "selective",
    copy: {
      "pt-BR": {
        summary:
          "No começo do mês, fundadores publicam vagas. O contato é um e-mail curto, não um formulário.",
        steps: [
          "Abra o thread Who is hiring do mês. Procure REMOTE e a sua stack.",
          "Escreva para a pessoa que postou: três frases, um projeto, um link.",
          "Três e-mails bons vencem trinta. Pule o que exige morar nos EUA.",
        ],
        freelance: {
          summary: "O mesmo thread traz CONTRACT. O e-mail continua curto, agora com taxa.",
          steps: [
            "Procure REMOTE, CONTRACT e a sua stack.",
            "No e-mail: três frases, um projeto, a taxa e o fuso.",
            "Pule o que exige morar nos EUA ou só emprego fixo.",
          ],
        },
      },
      "en-US": {
        summary: "Early in the month, founders post roles. The contact is a short email, not a form.",
        steps: [
          "Open this month's Who is hiring thread. Look for REMOTE and your stack.",
          "Write the person who posted: three sentences, one project, one link.",
          "Three good emails beat thirty. Skip posts that require living in the US.",
        ],
        freelance: {
          summary: "The same thread has CONTRACT posts. The email stays short, and it includes your rate.",
          steps: [
            "Look for REMOTE, CONTRACT, and your stack.",
            "In the email: three sentences, one project, your rate, and your time zone.",
            "Skip posts that require living in the US or a permanent role only.",
          ],
        },
      },
    },
  },
  {
    id: "wellfound",
    name: "Wellfound",
    href: "https://wellfound.com/",
    markets: ["us", "uk", "ca", "eu"],
    contracts: ["short", "long"],
    motion: "selective",
    copy: {
      "pt-BR": {
        summary: "Startups, muitas remotas, com faixa salarial visível. Volume baixo.",
        steps: [
          "Complete o perfil: stack, faixa e tipo de contrato. Sem isso a candidatura nem entra.",
          "Poucas vagas. Na nota, diga o que você já construiu que parece o produto.",
          "Ignore vaga sem faixa ou sem remoto explícito.",
        ],
      },
      "en-US": {
        summary: "Startups, many of them remote, with salary shown. Low volume.",
        steps: [
          "Finish the profile: stack, range, and contract type. Without that, the application does not enter.",
          "Few roles. In the note, say what you already built that resembles the product.",
          "Skip a role with no range or no explicit remote.",
        ],
      },
    },
  },
  {
    id: "wwr",
    name: "We Work Remotely",
    href: "https://weworkremotely.com/categories/remote-programming-jobs",
    markets: ALL_MARKETS,
    contracts: ALL_CONTRACTS,
    motion: "selective",
    copy: {
      "pt-BR": {
        summary: "Quadro de vagas 100% remotas. A regra é ler a linha de país antes de aplicar.",
        steps: [
          "Só a categoria Programming.",
          "Worldwide ou o seu país: candidate. Must be US-based ou visto obrigatório: pule.",
          "Três a cinco por semana, currículo em inglês. Não é volume.",
        ],
        freelance: {
          summary: "A categoria Programming também publica contract. A regra de país continua valendo.",
          steps: [
            "Leia o anúncio e fique no que diz contract ou freelance.",
            "Worldwide ou o seu país: candidate. Must be US-based: pule.",
            "Três a cinco por semana, com a taxa na candidatura.",
          ],
        },
      },
      "en-US": {
        summary: "A board of fully remote roles. Read the country line before you apply.",
        steps: [
          "Programming category only.",
          "Worldwide or your country: apply. Must be US-based or visa required: skip.",
          "Three to five a week, English resume. This is not volume.",
        ],
        freelance: {
          summary: "The Programming category also posts contract work. The country rule still applies.",
          steps: [
            "Read the post and stay with the ones that say contract or freelance.",
            "Worldwide or your country: apply. Must be US-based: skip.",
            "Three to five a week, with your rate in the application.",
          ],
        },
      },
    },
  },
  {
    id: "remotive",
    name: "Remotive",
    href: "https://remotive.com/remote-jobs/software-dev",
    markets: ALL_MARKETS,
    contracts: ["short", "long"],
    motion: "selective",
    copy: {
      "pt-BR": {
        summary: "Quadro curado de remoto. A vitrine aberta basta para achar o tipo de vaga.",
        steps: [
          "Filtre software. Não pague um plano para desbloquear antes do perfil em inglês estar no ponto.",
          "Mesma regra de país: worldwide segue, residência obrigatória nos EUA não.",
          "Escreva a candidatura no dia. No dia seguinte ela some no meio do quadro.",
        ],
      },
      "en-US": {
        summary: "A curated remote board. The open listings are enough to see the kind of role.",
        steps: [
          "Filter to software. Do not pay to unlock listings before the English profile is in shape.",
          "Same country rule: worldwide proceeds, required US residence does not.",
          "Write the application the same day. The next day it disappears into the board.",
        ],
      },
    },
  },
  {
    id: "remoteok",
    name: "Remote OK",
    href: "https://remoteok.com/remote-dev-jobs",
    markets: ALL_MARKETS,
    contracts: ALL_CONTRACTS,
    motion: "selective",
    copy: {
      "pt-BR": {
        summary: "Muito volume e salário na maioria dos anúncios. O que importa é a data.",
        steps: [
          "Olhe o que foi postado nos últimos dias. Vaga com uma semana já está enterrada.",
          "Use o salário para pular faixa incompatível com pleno.",
          "Uma carta curta, com a primeira frase trocada por vaga. Não escreva uma carta nova do zero toda vez.",
        ],
        freelance: {
          summary: "Contract aparece no mesmo quadro. A data do anúncio continua sendo o filtro.",
          steps: [
            "Olhe os últimos dias e fique no que diz contract.",
            "Use a taxa do anúncio para pular o que não cabe.",
            "Carta curta, com a primeira frase e a sua taxa.",
          ],
        },
      },
      "en-US": {
        summary: "High volume, salary on most posts. The date is what matters.",
        steps: [
          "Look at posts from the last few days. A week-old role is already buried.",
          "Use the salary to skip a range that does not fit mid-level.",
          "One short letter, first sentence swapped per role. Do not write a new letter from scratch each time.",
        ],
        freelance: {
          summary: "Contract posts sit on the same board. The date is still the filter.",
          steps: [
            "Look at the last few days and stay with posts that say contract.",
            "Use the posted rate to skip what does not fit.",
            "A short letter, with the first sentence and your rate.",
          ],
        },
      },
    },
  },
  {
    id: "wttj",
    name: "Welcome to the Jungle",
    href: "https://www.welcometothejungle.com/en/jobs?query=software%20engineer",
    markets: ["uk", "eu"],
    contracts: ["short", "long"],
    motion: "selective",
    copy: {
      "pt-BR": {
        summary: "Empresas na Europa e no Reino Unido. Muitas só contratam quem já mora no país.",
        steps: [
          "Perfil em inglês. Filtre remoto.",
          "Leia se a empresa contrata fora do país. Se não contrata, pule.",
          "Poucas candidaturas, com uma frase sobre o produto.",
        ],
      },
      "en-US": {
        summary: "Companies in Europe and the UK. Many hire only people who already live in the country.",
        steps: [
          "Profile in English. Filter to remote.",
          "Read whether the company hires outside the country. If it does not, skip.",
          "Few applications, with one sentence about the product.",
        ],
      },
    },
  },
  {
    id: "seek",
    name: "SEEK",
    href: "https://www.seek.com.au/software-engineer-jobs",
    markets: ["au"],
    contracts: ["short", "long"],
    motion: "selective",
    copy: {
      "pt-BR": {
        summary: "O quadro grande da Austrália. A maior parte é presencial.",
        steps: [
          "Filtre trabalho remoto. Ignore o resto.",
          "Só avance se a vaga disser que contrata fora do país.",
          "Candidatura seletiva, currículo em inglês.",
        ],
      },
      "en-US": {
        summary: "The large Australian board. Most of it is on-site.",
        steps: [
          "Filter to remote work. Ignore the rest.",
          "Continue only if the role says it hires outside the country.",
          "Selective applications, English resume.",
        ],
      },
    },
  },
  {
    id: "arc",
    name: "Arc",
    href: "https://arc.dev/",
    markets: ["us"],
    contracts: ALL_CONTRACTS,
    motion: "screen",
    kind: "network",
    visaSensitive: true,
    copy: {
      "pt-BR": {
        summary:
          "Uma candidatura à rede, não a cada vaga. Empresas dos EUA. Se passar, o movimento vira inbound.",
        steps: [
          "Candidate uma vez à rede. O teste é o portão.",
          "Inglês falado entra na triagem. Faça isso com a entrevista técnica daqui já medida.",
          "Se não passar, volte aos quadros. Não refaça o teste na mesma semana.",
        ],
        freelance: {
          summary: "A mesma rede cobre freela. Continua uma candidatura, não uma vaga por vez.",
          steps: [
            "Na candidatura, marque freelance, a taxa e a disponibilidade.",
            "O teste é o portão. Inglês falado entra, com a entrevista técnica daqui já medida.",
            "Se passar, espere o cliente. Não cace vaga por vaga.",
          ],
        },
      },
      "en-US": {
        summary: "One application to the network, not to each role. US companies. If you pass, the motion becomes inbound.",
        steps: [
          "Apply once to the network. The test is the gate.",
          "Spoken English is part of the screen. Do it after the technical interview here is already scored.",
          "If you do not pass, go back to the boards. Do not retake the test the same week.",
        ],
        freelance: {
          summary: "The same network covers freelance. It is still one application, not one role at a time.",
          steps: [
            "In the application, select freelance, your rate, and your availability.",
            "The test is the gate. Spoken English is part of it, after the technical interview here is already scored.",
            "If you pass, wait for the client. Do not hunt role by role.",
          ],
        },
      },
    },
  },
  {
    id: "turing",
    name: "Turing",
    href: "https://www.turing.com/jobs",
    markets: ["us"],
    contracts: ["long"],
    motion: "screen",
    kind: "network",
    visaSensitive: true,
    copy: {
      "pt-BR": {
        summary: "Contrato longo com empresa dos EUA, depois de um teste. Não é freela avulso.",
        steps: [
          "Uma candidatura, currículo em inglês, stack que você sustenta numa call.",
          "O teste técnico é o produto deles. Não trate como formulário.",
          "Se o perfil não busca contrato longo nos EUA, este canal não entra.",
        ],
      },
      "en-US": {
        summary: "A long contract with a US company, after a test. Not one-off freelance.",
        steps: [
          "One application, English resume, a stack you can defend on a call.",
          "The technical test is their product. Do not treat it as a form.",
          "If the profile is not seeking a long US contract, this channel stays out.",
        ],
      },
    },
  },
  {
    id: "toptal",
    name: "Toptal",
    href: "https://www.toptal.com/talent/apply",
    markets: ALL_MARKETS,
    contracts: ["freelance"],
    motion: "screen",
    kind: "network",
    copy: {
      "pt-BR": {
        summary:
          "Rede de freela com triagem longa. Entra com um pedaço estreito da stack, não com pleno genérico.",
        steps: [
          "Escolha a parte da stack em que você é forte e candidate só com ela.",
          "Reserve uma semana para teste e entrevistas. Não misture com um dia de candidaturas.",
          "O trabalho é freela. Sem freela no perfil, a plataforma não aparece.",
        ],
      },
      "en-US": {
        summary: "A freelance network with a long screen. Enter with a narrow slice of the stack, not generic mid-level.",
        steps: [
          "Pick the part of the stack you are strong in and apply with only that.",
          "Reserve a week for the test and interviews. Do not mix it with an application day.",
          "The work is freelance. Without freelance on the profile, the platform stays hidden.",
        ],
      },
    },
  },
  {
    id: "gun",
    name: "Gun.io",
    href: "https://gun.io/",
    markets: ["us"],
    contracts: ["freelance"],
    motion: "screen",
    kind: "network",
    copy: {
      "pt-BR": {
        summary: "Freela para clientes dos EUA. Triagem mais curta que a Toptal, ainda assim uma candidatura à rede.",
        steps: [
          "Perfil com disponibilidade e taxa. Sem taxa, o matching não anda.",
          "Confirme que aceitam contractor internacional antes de investir o teste.",
          "Uma candidatura. Se passar, espere o cliente. Não cace vaga por vaga.",
        ],
      },
      "en-US": {
        summary: "Freelance for US clients. A shorter screen than Toptal, still one application to the network.",
        steps: [
          "Profile with availability and a rate. Without a rate, matching does not move.",
          "Confirm they take an international contractor before you invest in the test.",
          "One application. If you pass, wait for the client. Do not hunt role by role.",
        ],
      },
    },
  },
];

export function platformPace(motion: ProspectMotion, readiness: number | null): PlatformPace {
  if (readiness === null) return "profile";
  if (motion === "inbound") return "primary";
  if (motion === "selective") return readiness >= 60 ? "primary" : "secondary";
  if (readiness >= 75) return "primary";
  if (readiness >= 60) return "secondary";
  return "early";
}

const PACE_RANK: Record<PlatformPace, number> = {
  primary: 0,
  profile: 0,
  secondary: 1,
  early: 2,
};

const MOTION_RANK: Record<ProspectMotion, number> = {
  inbound: 0,
  selective: 1,
  screen: 2,
};

export type ListedPlatform = Platform & {
  pace: PlatformPace;
  matchedMarkets: MarketId[];
  matchedContracts: ContractType[];
  visaCaution: boolean;
};

export function listPlatforms(profile: Profile, readiness: number | null): ListedPlatform[] {
  const markets = new Set(profile.targetMarkets);
  const contracts = new Set(profile.contractTypes);
  const kinds = profile.goals?.companyKinds ?? [];
  return PLATFORMS.flatMap((platform) => {
    const matchedMarkets = platform.markets.filter((market) => markets.has(market));
    const matchedContracts = platform.contracts.filter((contract) => contracts.has(contract));
    if (matchedMarkets.length === 0 || matchedContracts.length === 0) return [];
    if (platform.kind === "network" && kinds.length > 0 && !kinds.includes("network")) return [];
    const visaCaution = profile.goals?.visa === "remote_br" && platform.visaSensitive === true;
    let pace = platformPace(platform.motion, readiness);
    if (visaCaution && pace !== "profile") pace = "early";
    return [
      {
        ...platform,
        pace,
        matchedMarkets,
        matchedContracts,
        visaCaution,
      },
    ];
  }).sort((a, b) => {
    const pace = PACE_RANK[a.pace] - PACE_RANK[b.pace];
    if (pace !== 0) return pace;
    const motion = MOTION_RANK[a.motion] - MOTION_RANK[b.motion];
    if (motion !== 0) return motion;
    return a.name.localeCompare(b.name);
  });
}

export type ProspectSide = "employment" | "freelance";

export type ProspectBlock = {
  side: ProspectSide;
  summary: string;
  steps: [string, string, string];
};

/** Passos do card seguem o recorte do perfil: contrato, freela, ou os dois. */
export function prospectBlocks(
  platform: Platform,
  locale: Locale,
  matched: readonly ContractType[],
): ProspectBlock[] {
  const copy = platform.copy[locale];
  const wantsFreelance = matched.includes("freelance");
  const wantsEmployment = matched.some((contract) => contract === "short" || contract === "long");
  const blocks: ProspectBlock[] = [];
  if (wantsEmployment) {
    blocks.push({ side: "employment", summary: copy.summary, steps: copy.steps });
  }
  if (wantsFreelance && copy.freelance) {
    blocks.push({
      side: "freelance",
      summary: copy.freelance.summary,
      steps: copy.freelance.steps,
    });
  } else if (wantsFreelance && !wantsEmployment) {
    blocks.push({ side: "freelance", summary: copy.summary, steps: copy.steps });
  }
  return blocks;
}
