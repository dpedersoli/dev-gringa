import { analyzeLinkedin } from "@/app/actions/analyze";
import { SubmitButton } from "@/components/SubmitButton";
import { fieldClass, FormError } from "@/components/FormError";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function LinkedinForm({
  dict,
  headline,
  about,
  experience,
  error,
}: {
  dict: Dictionary;
  headline?: string;
  about?: string;
  experience?: string;
  error?: string;
}) {
  return (
    <form action={analyzeLinkedin} className="flex max-w-2xl flex-col gap-5">
      <FormError dict={dict} code={error} />
      {!process.env.ANTHROPIC_API_KEY ? (
        <p className="text-sm text-[var(--muted)]">{dict.missingKeyHint}</p>
      ) : null}
      <label className="block text-sm">
        <span className="text-[var(--muted)]">{dict.liHeadline}</span>
        <input
          name="headline"
          required
          defaultValue={headline ?? ""}
          className={fieldClass}
        />
      </label>
      <label className="block text-sm">
        <span className="text-[var(--muted)]">{dict.liAbout}</span>
        <textarea
          name="about"
          rows={8}
          required
          defaultValue={about ?? ""}
          className={fieldClass}
        />
      </label>
      <label className="block text-sm">
        <span className="text-[var(--muted)]">{dict.liExperience}</span>
        <textarea
          name="experience"
          rows={12}
          required
          defaultValue={experience ?? ""}
          className={fieldClass}
        />
      </label>
      <SubmitButton idle={dict.liSubmit} pending={dict.analyzing} />
    </form>
  );
}
