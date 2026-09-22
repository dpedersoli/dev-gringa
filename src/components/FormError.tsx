import type { Dictionary } from "@/lib/i18n/dictionaries";

const fieldClass =
  "mt-1 w-full rounded-sm border border-[var(--line)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)]";

export function FormError({
  dict,
  code,
}: {
  dict: Dictionary;
  code?: string;
}) {
  if (!code) return null;
  const message =
    code === "empty"
      ? dict.errorEmpty
      : code === "missing-key"
        ? dict.errorKey
        : code === "llm"
          ? dict.errorLlm
          : code === "pdf"
            ? dict.errorPdf
            : code === "contract"
              ? dict.errorContract
              : code === "mic"
                ? dict.errorMic
                : code === "stt"
                  ? dict.errorStt
              : dict.errorGeneric;
  return (
    <p className="border border-[var(--accent)] bg-[var(--chip)] px-3 py-2 text-sm">
      {message}
    </p>
  );
}

export { fieldClass };
