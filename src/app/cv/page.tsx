import { redirect } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { CvForm } from "@/components/CvForm";
import { EvaluationResult } from "@/components/EvaluationResult";
import { latestByModule } from "@/lib/domain/evaluation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { readArtifacts, readEvaluations, readProfile } from "@/lib/storage/store";

export default async function CvPage({
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
        {dict.cvTitle}
      </h1>
      <p className="mt-3 max-w-2xl text-[var(--muted)] leading-7">{dict.cvLead}</p>
      {latest.cv ? (
        <div className="mt-8">
          <EvaluationResult dict={dict} evaluation={latest.cv} />
        </div>
      ) : null}
      <div className="mt-10">
        <CvForm
          dict={dict}
          defaultText={artifacts?.cvText}
          error={params.error}
        />
      </div>
    </AppShell>
  );
}
