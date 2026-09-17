import { redirect } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ProfileForm } from "@/components/ProfileForm";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { readProfile } from "@/lib/storage/store";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const profile = await readProfile();
  if (profile) {
    redirect("/");
  }

  const dict = getDictionary("pt-BR");
  const params = await searchParams;

  return (
    <AppShell dict={dict} showNav={false}>
      <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
        {dict.phaseBadge}
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-serif)] text-4xl tracking-tight">
        {dict.onboardingTitle}
      </h1>
      <p className="mt-3 max-w-xl text-[var(--muted)] leading-7">
        {dict.onboardingLead}
      </p>
      <div className="mt-8">
        <ProfileForm
          dict={dict}
          profile={null}
          mode="onboarding"
          error={params.error === "1"}
        />
      </div>
    </AppShell>
  );
}
