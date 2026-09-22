import { Copy } from "@/components/Glossary";
import type { Profile } from "@/lib/domain/profile";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { listCourses } from "@/lib/matching/courses";

export function MatchingCourses({
  dict,
  profile,
}: {
  dict: Dictionary;
  profile: Profile;
}) {
  const courses = listCourses(profile);

  return (
    <section>
      <h2 className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">
        {dict.matchingCoursesTitle}
      </h2>
      <p className="mt-3 max-w-xl leading-7 text-[var(--muted)]">
        <Copy dict={dict} text={dict.matchingCoursesLead} />
      </p>
      {courses.length === 0 ? (
        <p className="mt-4 text-[var(--muted)]">{dict.matchingCoursesEmpty}</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-4">
          {courses.map((course) => (
            <li key={course.id} className="border border-[var(--line)] bg-[var(--card)] p-5">
              <a
                href={course.href}
                target="_blank"
                rel="noreferrer"
                className="font-[family-name:var(--font-serif)] text-2xl underline-offset-4 hover:underline"
              >
                {course.name}
              </a>
              <p className="mt-3 leading-7">
                <Copy dict={dict} text={course.copy.summary} />
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                <Copy dict={dict} text={course.copy.applies} />
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
