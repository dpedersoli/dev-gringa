import { analyzeLinkedin } from "@/app/actions/analyze";
import { ComposerForm } from "@/components/ComposerForm";
import { SubmitButton } from "@/components/SubmitButton";
import { fieldClass, FormError } from "@/components/FormError";
import { InfoTip } from "@/components/InfoTip";
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
    <ComposerForm
      action={analyzeLinkedin}
      className="flex max-w-2xl flex-col gap-5"
    >
      <FormError dict={dict} code={error} />
      {!process.env.ANTHROPIC_API_KEY ? (
        <p className="text-sm text-[var(--muted)]">{dict.missingKeyHint}</p>
      ) : null}
      <label className="block text-sm">
        <span className="inline-flex items-center text-[var(--muted)]">
          {dict.liHeadline}
          <InfoTip
            label={dict.liHeadlineHelpLabel}
            text={dict.liHeadlineHint}
            imageSrc="/help/linkedin-headline.png"
            imageAlt={dict.liHeadlineImageAlt}
          />
        </span>
        <textarea
          name="headline"
          rows={3}
          required
          defaultValue={headline ?? ""}
          className={fieldClass}
        />
      </label>
      <label className="block text-sm">
        <span className="inline-flex items-center text-[var(--muted)]">
          {dict.liAbout}
          <InfoTip
            label={dict.liAboutHelpLabel}
            text={dict.liAboutHint}
            imageSrc="/help/linkedin-about.png"
            imageAlt={dict.liAboutImageAlt}
          />
        </span>
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
      <p className="text-xs text-[var(--muted)]">{dict.composerHint}</p>
      <SubmitButton idle={dict.liSubmit} pending={dict.analyzing} />
    </ComposerForm>
  );
}
