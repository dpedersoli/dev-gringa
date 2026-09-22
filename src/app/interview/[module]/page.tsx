import { notFound, redirect } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { EvaluationResult } from "@/components/EvaluationResult";
import { InterviewRunner } from "@/components/InterviewRunner";
import { latestByModule } from "@/lib/domain/evaluation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isInterviewModule } from "@/lib/interview/banks";
import {
  readEvaluations,
  readLatestSubmittedInterviewSession,
  readProfile,
  readRunningInterviewSession,
} from "@/lib/storage/store";
import { InterviewAnswers } from "@/components/InterviewAnswers";

export default async function InterviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ module: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const profile = await readProfile();
  if (!profile) redirect("/onboarding");

  const { module } = await params;
  if (!isInterviewModule(module)) notFound();

  const dict = getDictionary(profile.uiLocale);
  const query = await searchParams;
  const latest = latestByModule(await readEvaluations())[module];
  const running = await readRunningInterviewSession(module);
  const lastSubmitted = running
    ? null
    : await readLatestSubmittedInterviewSession(module);
  const title =
    module === "rh"
      ? dict.module_rh
      : module === "tech_vibe"
        ? dict.module_tech_vibe
        : dict.module_fit;

  return (
    <AppShell dict={dict} showNav>
      <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
        {dict.phaseBadge}
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-serif)] text-4xl tracking-tight">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-[var(--muted)] leading-7">
        {module === "rh"
          ? dict.interviewLeadRh
          : module === "tech_vibe"
            ? dict.interviewLeadTech
            : dict.interviewLeadFit}
      </p>
      {lastSubmitted ? (
        <div className="mt-8">
          <InterviewAnswers
            dict={dict}
            questions={lastSubmitted.questions}
            answers={lastSubmitted.answers}
          />
        </div>
      ) : null}
      {latest && !running ? (
        <div className="mt-8">
          <EvaluationResult dict={dict} evaluation={latest} />
        </div>
      ) : null}
      <InterviewRunner
        dict={dict}
        module={module}
        hasApiKey={Boolean(process.env.ANTHROPIC_API_KEY?.trim())}
        error={query.error}
        initialSession={
          running
            ? {
                id: running.id,
                startedAt: running.startedAt,
                durationSec: running.durationSec,
                frozenMs: running.frozenMs,
                questions: running.questions,
                answers: running.answers,
              }
            : null
        }
      />
    </AppShell>
  );
}
