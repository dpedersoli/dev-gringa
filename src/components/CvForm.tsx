import { analyzeCv } from "@/app/actions/analyze";
import { ComposerForm } from "@/components/ComposerForm";
import { SubmitButton } from "@/components/SubmitButton";
import { fieldClass, FormError } from "@/components/FormError";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function CvForm({
  dict,
  defaultText,
  error,
}: {
  dict: Dictionary;
  defaultText?: string;
  error?: string;
}) {
  return (
    <ComposerForm action={analyzeCv} className="flex max-w-2xl flex-col gap-5">
      <FormError dict={dict} code={error} />
      {!process.env.ANTHROPIC_API_KEY ? (
        <p className="text-sm text-[var(--muted)]">{dict.missingKeyHint}</p>
      ) : null}
      <label className="block text-sm">
        <span className="text-[var(--muted)]">{dict.cvText}</span>
        <textarea
          name="cvText"
          rows={14}
          defaultValue={defaultText ?? ""}
          className={fieldClass}
        />
      </label>
      <label className="block text-sm">
        <span className="text-[var(--muted)]">{dict.cvPdf}</span>
        <input
          name="cvFile"
          type="file"
          accept="application/pdf,.pdf"
          className={`${fieldClass} file:mr-3 file:border-0 file:bg-transparent file:text-sm`}
        />
      </label>
      <p className="text-xs text-[var(--muted)]">{dict.composerHint}</p>
      <SubmitButton idle={dict.cvSubmit} pending={dict.analyzing} />
    </ComposerForm>
  );
}
