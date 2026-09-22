export function ConfirmDialog({
  title,
  body,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: {
  title: string;
  body: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        className="w-full max-w-md border border-[var(--line)] bg-[var(--card)] p-5"
      >
        <h2
          id="confirm-title"
          className="font-[family-name:var(--font-serif)] text-2xl tracking-tight"
        >
          {title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{body}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex h-11 items-center justify-center rounded-sm bg-[var(--accent)] px-5 text-sm font-medium text-[var(--accent-fg)]"
          >
            {confirmLabel}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-11 items-center justify-center rounded-sm border border-[var(--line)] px-5 text-sm hover:bg-[var(--chip)]"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
