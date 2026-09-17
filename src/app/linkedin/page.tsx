import { redirect } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { EvaluationResult } from "@/components/EvaluationResult";
import { LinkedinForm } from "@/components/LinkedinForm";
import { latestByModule } from "@/lib/domain/evaluation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { readArtifacts, readEvaluations, readProfile } from "@/lib/storage/store";

export default async function LinkedinPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const profile = await readProfile();
  if (!profile) redirect("/onboarding");

  const dict = getDictionary(profile.uiLocale);
  const params = await searchParams;
  const latest = latestByModule(await readEvaluations());
  const artifacts = await readArtifacts();

  return (
    <AppShell dict={dict} showNav>
      <h1 className="font-[family-name:var(--font-serif)] text-4xl tracking-tight">
        {dict.liTitle}
      </h1>
      <p className="mt-3 max-w-2xl text-[var(--muted)] leading-7">{dict.liLead}</p>
      {latest.linkedin ? (
        <div className="mt-8">
          <EvaluationResult dict={dict} evaluation={latest.linkedin} />
        </div>
      ) : null}
      <div className="mt-10">
        <LinkedinForm
          dict={dict}
          headline={artifacts?.linkedinHeadline}
          about={artifacts?.linkedinAbout}
          experience={artifacts?.linkedinExperience}
          error={params.error}
        />
      </div>
    </AppShell>
  );
}
