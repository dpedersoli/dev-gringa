import type { InterviewQuestion } from "@/lib/interview/banks";
import { isFollowUpQuestion } from "@/lib/interview/banks";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function InterviewAnswers({
  dict,
  questions,
  answers,
}: {
  dict: Dictionary;
  questions: InterviewQuestion[];
  answers: Array<{ questionId: string; transcript: string }>;
}) {
  return (
    <section className="flex max-w-2xl flex-col gap-6">
      <h2 className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">
        {dict.interviewReviewTitle}
      </h2>
      <ol className="flex flex-col gap-6">
        {questions.map((question, index) => {
          const found = answers.find((item) => item.questionId === question.id);
          const text = found?.transcript.trim();
          return (
            <li key={question.id} className="border border-[var(--line)] bg-[var(--card)] p-4">
              <p className="text-sm text-[var(--muted)]">
                {dict.interviewQuestion} {index + 1}
                {isFollowUpQuestion(question.id) ? ` · ${dict.interviewFollowUp}` : ""}
              </p>
              <p className="mt-2 text-base leading-7">{question.text}</p>
              <p className="mt-4 text-sm text-[var(--muted)]">{dict.interviewYourAnswer}</p>
              <p className="mt-1 whitespace-pre-wrap text-sm leading-6">
                {text || dict.interviewEmptyAnswer}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
