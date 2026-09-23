"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  idle,
  pending,
  busy = false,
}: {
  idle: string;
  pending: string;
  busy?: boolean;
}) {
  const status = useFormStatus();
  const waiting = busy || status.pending;
  return (
    <button
      type="submit"
      disabled={waiting}
      className="inline-flex h-11 w-fit items-center justify-center rounded-sm bg-[var(--accent)] px-5 text-sm font-medium text-[var(--accent-fg)] transition-opacity disabled:opacity-60"
    >
      {waiting ? pending : idle}
    </button>
  );
}
