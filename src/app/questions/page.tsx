import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { IntakeForm } from "@/components/IntakeForm";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { readProfile } from "@/lib/storage/store";

export default async function QuestionsPage() {
  const profile = await readProfile();
  const dict = getDictionary(profile?.uiLocale ?? "pt-BR");

  return (
    <AppShell dict={dict} showNav={Boolean(profile)}>
      <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
        {dict.intakeKicker}
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-serif)] text-4xl tracking-tight">
        {dict.intakeTitle}
      </h1>
      <p className="mt-3 max-w-xl leading-7 text-[var(--muted)]">{dict.intakeLead}</p>
      <p className="mt-3 max-w-xl leading-7">{dict.intakeNameNote}</p>
      <p className="mt-3 text-sm">
        <Link href={profile ? "/profile" : "/onboarding"} className="underline underline-offset-4">
          {dict.intakeEditInstead}
        </Link>
      </p>
      <div className="mt-8">
        <IntakeForm dict={dict} profile={profile} />
      </div>
    </AppShell>
  );
}
