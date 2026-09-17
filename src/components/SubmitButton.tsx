"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  idle,
  pending,
}: {
  idle: string;
  pending: string;
}) {
  const status = useFormStatus();
  return (
    <button
      type="submit"
      disabled={status.pending}
      className="inline-flex h-11 items-center justify-center rounded-sm bg-[var(--accent)] px-5 text-sm font-medium text-[var(--accent-fg)] transition-opacity disabled:opacity-60"
    >
      {status.pending ? pending : idle}
    </button>
  );
}
