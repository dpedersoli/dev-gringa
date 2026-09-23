"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export type ToastKind = "success" | "error" | "warn";

type ToastItem = {
  id: number;
  kind: ToastKind;
  message: string;
};

let seq = 0;
let current: ToastItem[] = [];
const listeners = new Set<(items: ToastItem[]) => void>();
let lastNotice = "";

function emit() {
  for (const listener of listeners) listener(current);
}

export function pushToast(kind: ToastKind, message: string) {
  const item = { id: ++seq, kind, message };
  current = [...current, item].slice(-3);
  emit();
  window.setTimeout(() => {
    current = current.filter((entry) => entry.id !== item.id);
    emit();
  }, 4500);
}

export function subscribeToasts(listener: (items: ToastItem[]) => void) {
  listeners.add(listener);
  listener(current);
  return () => {
    listeners.delete(listener);
  };
}

export function feedbackError(dict: Dictionary, code: string) {
  if (code === "empty") return dict.errorEmpty;
  if (code === "missing-key") return dict.errorKey;
  if (code === "llm") return dict.errorLlm;
  if (code === "pdf") return dict.errorPdf;
  if (code === "contract") return dict.errorContract;
  if (code === "mic") return dict.errorMic;
  if (code === "stt") return dict.errorStt;
  if (code === "session") return dict.errorSession;
  return dict.errorGeneric;
}

function feedbackSuccess(dict: Dictionary, code: string) {
  if (code === "profile") return dict.toastProfile;
  if (code === "questions") return dict.toastQuestions;
  if (code === "cv") return dict.toastCv;
  if (code === "linkedin") return dict.toastLinkedin;
  if (code === "interview") return dict.toastInterview;
  if (code === "interview-started") return dict.toastInterviewStarted;
  return dict.toastProfile;
}

export function ToastHost({ dict }: { dict: Dictionary }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => subscribeToasts(setItems), []);

  useEffect(() => {
    const ok = searchParams.get("ok");
    const error = searchParams.get("error");
    const nonce = searchParams.get("n");
    if (!nonce || (!ok && !error)) return;

    const stamp = `${pathname}:${nonce}`;
    if (lastNotice !== stamp) {
      lastNotice = stamp;
      if (ok) pushToast("success", feedbackSuccess(dict, ok));
      else if (error) pushToast("error", feedbackError(dict, error));
    }

    const next = new URLSearchParams(searchParams.toString());
    next.delete("ok");
    next.delete("n");
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [dict, pathname, router, searchParams]);

  if (items.length === 0) return null;

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex w-[min(22rem,calc(100vw-2rem))] flex-col gap-2">
      {items.map((item) => (
        <p
          key={item.id}
          role="status"
          className="pointer-events-auto border px-3 py-2 text-sm leading-6 shadow-md"
          style={{
            borderColor: "var(--line)",
            background:
              item.kind === "success"
                ? "var(--ok-bg)"
                : item.kind === "warn"
                  ? "var(--warn-bg)"
                  : "var(--danger-bg)",
            color:
              item.kind === "success"
                ? "var(--ok)"
                : item.kind === "warn"
                  ? "var(--warn)"
                  : "var(--danger)",
          }}
        >
          {item.message}
        </p>
      ))}
    </div>
  );
}
