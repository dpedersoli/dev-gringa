import { redirect } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { DashboardView } from "@/components/DashboardView";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { readEvaluations, readProfile } from "@/lib/storage/store";

export default async function HomePage() {
  const profile = await readProfile();
  if (!profile) {
    redirect("/onboarding");
  }

  const dict = getDictionary(profile.uiLocale);
  const evaluations = await readEvaluations();

  return (
    <AppShell dict={dict} showNav>
      <DashboardView dict={dict} profile={profile} evaluations={evaluations} />
    </AppShell>
  );
}
