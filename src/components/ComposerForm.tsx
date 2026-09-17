"use client";

import type { KeyboardEvent, ReactNode } from "react";

export function ComposerForm({
  action,
  className,
  children,
}: {
  action: (formData: FormData) => void | Promise<void>;
  className?: string;
  children: ReactNode;
}) {
  function onKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.key !== "Enter" || event.nativeEvent.isComposing) return;
    const target = event.target;
    if (
      !(target instanceof HTMLTextAreaElement) &&
      !(target instanceof HTMLInputElement)
    ) {
      return;
    }
    if (target instanceof HTMLInputElement && target.type === "file") return;

    if (event.shiftKey) {
      event.preventDefault();
      event.currentTarget.requestSubmit();
      return;
    }

    if (target instanceof HTMLInputElement) {
      event.preventDefault();
    }
  }

  return (
    <form action={action} className={className} onKeyDown={onKeyDown}>
      {children}
    </form>
  );
}
