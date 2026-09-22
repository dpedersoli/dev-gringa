"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const STORAGE_KEY = "dev-gringa-theme";

function isDark() {
  return document.documentElement.getAttribute("data-theme") === "dark";
}

export function ThemeToggle({ dict }: { dict: Dictionary }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(isDark());
  }, []);

  function toggle() {
    const next = !isDark();
    if (next) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? dict.themeToLight : dict.themeToDark}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-[var(--line)] text-[var(--foreground)] hover:bg-[var(--chip)]"
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M9.2 1.4a6.2 6.2 0 1 0 5.4 9.1 5.2 5.2 0 0 1-5.4-9.1Z"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="2.4" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M8 1.4v1.8M8 12.8v1.8M1.4 8h1.8M12.8 8h1.8M3.2 3.2l1.3 1.3M11.5 11.5l1.3 1.3M12.8 3.2l-1.3 1.3M4.5 11.5l-1.3 1.3" />
      </g>
    </svg>
  );
}
