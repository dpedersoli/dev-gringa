import { redirect } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ProfileForm } from "@/components/ProfileForm";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { readProfile } from "@/lib/storage/store";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const profile = await readProfile();
  if (!profile) {
    redirect("/onboarding");
  }

  const dict = getDictionary(profile.uiLocale);
  const params = await searchParams;

  return (
    <AppShell dict={dict} showNav>
      <h1 className="font-[family-name:var(--font-serif)] text-4xl tracking-tight">
        {dict.profileTitle}
      </h1>
      <p className="mt-3 max-w-xl text-[var(--muted)] leading-7">
        {dict.profileLead}
      </p>
      <div className="mt-8">
        <ProfileForm
          dict={dict}
          profile={profile}
          mode="profile"
          error={params.error === "1"}
        />
      </div>
    </AppShell>
  );
}
