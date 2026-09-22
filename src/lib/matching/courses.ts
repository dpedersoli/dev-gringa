import type { Locale, Profile } from "@/lib/domain/profile";

type CourseCopy = {
  summary: string;
  applies: string;
};

export type Course = {
  id: string;
  name: string;
  href: string;
  stacks: string[];
  copy: Record<Locale, CourseCopy>;
};

export type ListedCourse = Omit<Course, "copy"> & { copy: CourseCopy };

const COURSES: Course[] = [
  {
    id: "speaking-b2",
    name: "LearnEnglish — Speaking B2",
    href: "https://learnenglish.britishcouncil.org/free-resources/speaking/b2",
    stacks: [],
    copy: {
      "pt-BR": {
        summary:
          "Fala de trabalho em inglês, com vídeo e frase para repetir. O nível é intermediário alto.",
        applies: "Entra em qualquer stack e contrato: a entrevista daqui é falada.",
      },
      "en-US": {
        summary: "Work conversations in English, with a video and phrases to repeat. The level is upper intermediate.",
        applies: "It shows for every stack and contract: the interview here is spoken.",
      },
    },
  },
  {
    id: "fullstack-open",
    name: "Full Stack Open",
    href: "https://fullstackopen.com/en/",
    stacks: ["react", "node"],
    copy: {
      "pt-BR": {
        summary: "Curso da Universidade de Helsinki: React, Node.js e o caminho até TypeScript. É estudo, com exercício.",
        applies: "Entra porque a stack tem React ou Node.js.",
      },
      "en-US": {
        summary: "University of Helsinki course: React, Node.js, and the path into TypeScript. It is study, with exercises.",
        applies: "It shows because the stack has React or Node.js.",
      },
    },
  },
  {
    id: "next-learn",
    name: "Next.js Learn",
    href: "https://nextjs.org/learn",
    stacks: ["next"],
    copy: {
      "pt-BR": {
        summary: "O tutorial oficial do Next.js, no App Router. Serve para sustentar a stack numa call.",
        applies: "Entra porque a stack tem Next.js.",
      },
      "en-US": {
        summary: "The official Next.js tutorial, on the App Router. It is there so you can defend the stack on a call.",
        applies: "It shows because the stack has Next.js.",
      },
    },
  },
  {
    id: "expo-tutorial",
    name: "Expo tutorial",
    href: "https://docs.expo.dev/tutorial/introduction/",
    stacks: ["expo", "react native"],
    copy: {
      "pt-BR": {
        summary: "O tutorial oficial de React Native com Expo: um app que roda no celular e na web.",
        applies: "Entra porque a stack tem Expo ou React Native.",
      },
      "en-US": {
        summary: "The official React Native with Expo tutorial: an app that runs on the phone and on the web.",
        applies: "It shows because the stack has Expo or React Native.",
      },
    },
  },
  {
    id: "total-typescript",
    name: "Total TypeScript",
    href: "https://www.totaltypescript.com/",
    stacks: ["typescript"],
    copy: {
      "pt-BR": {
        summary: "Curso de TypeScript para quem já entrega em JavaScript. A parte funda é paga; o sítio tem o caminho.",
        applies: "Entra porque a stack tem TypeScript.",
      },
      "en-US": {
        summary: "A TypeScript course for people who already ship JavaScript. The deep track is paid; the site has the path.",
        applies: "It shows because the stack has TypeScript.",
      },
    },
  },
];

function words(value: string) {
  return value
    .toLowerCase()
    .replace(/\.js\b/g, "")
    .split(/[^a-z0-9+]+/)
    .filter((word) => word.length > 1);
}

function stackHas(stack: string[], tag: string) {
  const need = words(tag);
  if (need.length === 0) return false;
  return stack.some((item) => {
    const have = new Set(words(item));
    return need.every((word) => have.has(word));
  });
}

export function listCourses(profile: Profile): ListedCourse[] {
  return COURSES.filter((course) => {
    if (course.stacks.length === 0) return true;
    return course.stacks.some((tag) => stackHas(profile.stack, tag));
  }).map((course) => ({
    ...course,
    copy: course.copy[profile.uiLocale],
  }));
}
