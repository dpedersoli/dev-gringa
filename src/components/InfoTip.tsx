"use client";

import { useId, useState } from "react";

export function InfoTip({
  label,
  text,
  what,
  applies,
  whatLabel,
  appliesLabel,
  imageSrc,
  imageAlt,
  align = "start",
}: {
  label: string;
  text?: string;
  what?: string;
  applies?: string;
  whatLabel?: string;
  appliesLabel?: string;
  imageSrc?: string;
  imageAlt?: string;
  align?: "start" | "end";
}) {
  const tooltipId = useId();
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative ml-1 inline-flex align-middle"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-describedby={open ? tooltipId : undefined}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-[11px] font-medium leading-none text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
      >
        i
      </button>
      {open ? (
        <span
          id={tooltipId}
          role="tooltip"
          className={`absolute top-full z-50 w-[min(20rem,calc(100vw-2rem))] pt-2 ${
            align === "end" ? "right-0" : "left-0"
          }`}
        >
          <span className="block rounded-sm border border-[var(--line)] bg-[var(--card)] p-3 shadow-md">
            {imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageSrc} alt={imageAlt ?? ""} className="w-full rounded-sm" />
            ) : null}
            {what ? (
              <span className={imageSrc ? "mt-2 block" : "block"}>
                {whatLabel ? (
                  <span className="block text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
                    {whatLabel}
                  </span>
                ) : null}
                <span className="mt-1 block text-xs leading-5 text-[var(--foreground)]">{what}</span>
              </span>
            ) : null}
            {applies ? (
              <span className="mt-2 block">
                {appliesLabel ? (
                  <span className="block text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
                    {appliesLabel}
                  </span>
                ) : null}
                <span className="mt-1 block text-xs leading-5 text-[var(--foreground)]">
                  {applies}
                </span>
              </span>
            ) : null}
            {text && !what ? (
              <span className={`${imageSrc ? "mt-2" : ""} block px-0.5 text-xs leading-5 text-[var(--foreground)]`}>
                {text}
              </span>
            ) : null}
          </span>
        </span>
      ) : null}
    </span>
  );
}
