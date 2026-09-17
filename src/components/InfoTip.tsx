"use client";

import { useId, useState } from "react";

export function InfoTip({
  label,
  text,
  imageSrc,
  imageAlt,
  align = "start",
}: {
  label: string;
  text: string;
  imageSrc: string;
  imageAlt: string;
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
        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-[11px] font-medium leading-none text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
      >
        i
      </button>
      {open ? (
        <span
          id={tooltipId}
          role="tooltip"
          className={`absolute top-full z-50 w-80 pt-2 ${
            align === "end" ? "right-0" : "left-0"
          }`}
        >
          <span className="block rounded-sm border border-[var(--line)] bg-[var(--card)] p-2 shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageSrc} alt={imageAlt} className="w-full rounded-sm" />
            <p className="mt-2 px-1 text-xs leading-5 text-[var(--foreground)]">
              {text}
            </p>
          </span>
        </span>
      ) : null}
    </span>
  );
}
