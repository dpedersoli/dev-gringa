import Link from "next/link";
import { Suspense } from "react";
import { TipIcon } from "@/components/Glossary";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ToastHost } from "@/components/ToastHost";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { TipId } from "@/lib/i18n/tips";

export function AppShell({
  dict,
  children,
  showNav,
}: {
  dict: Dictionary;
  children: React.ReactNode;
  showNav: boolean;
}) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-[var(--line)]">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
              {dict.productKicker}
            </p>
            <p className="font-[family-name:var(--font-serif)] text-xl leading-tight text-[var(--foreground)]">
              {dict.productName}
            </p>
          </div>
          <div className="flex flex-1 items-start justify-end gap-2">
            {showNav ? (
              <nav className="flex flex-wrap justify-end gap-1 text-sm">
              <Link
                href="/"
                className="rounded-sm px-3 py-1.5 text-[var(--foreground)] hover:bg-[var(--chip)]"
              >
                {dict.navPanel}
              </Link>
              <Link
                href="/cv"
                className="rounded-sm px-3 py-1.5 text-[var(--foreground)] hover:bg-[var(--chip)]"
              >
                {dict.navCv}
              </Link>
              <Link
                href="/linkedin"
                className="rounded-sm px-3 py-1.5 text-[var(--foreground)] hover:bg-[var(--chip)]"
              >
                {dict.navLinkedin}
              </Link>
              <Link
                href="/interview/rh"
                className="rounded-sm px-3 py-1.5 text-[var(--foreground)] hover:bg-[var(--chip)]"
              >
                {dict.navRh}
              </Link>
              <Link
                href="/interview/tech_vibe"
                className="rounded-sm px-3 py-1.5 text-[var(--foreground)] hover:bg-[var(--chip)]"
              >
                {dict.navTech}
              </Link>
              <span className="inline-flex items-center">
                <Link
                  href="/interview/fit"
                  className="rounded-sm px-3 py-1.5 text-[var(--foreground)] hover:bg-[var(--chip)]"
                >
                  {dict.navFit}
                </Link>
                <TipIcon dict={dict} id={"fit" satisfies TipId} align="end" />
              </span>
              <span className="inline-flex items-center">
                <Link
                  href="/matching"
                  className="rounded-sm px-3 py-1.5 text-[var(--foreground)] hover:bg-[var(--chip)]"
                >
                  {dict.navMatching}
                </Link>
                <TipIcon dict={dict} id={"matching" satisfies TipId} align="end" />
              </span>
              <Link
                href="/profile"
                className="rounded-sm px-3 py-1.5 text-[var(--foreground)] hover:bg-[var(--chip)]"
              >
                {dict.navProfile}
              </Link>
              </nav>
            ) : null}
            <ThemeToggle dict={dict} />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">{children}</main>
      <Suspense fallback={null}>
        <ToastHost dict={dict} />
      </Suspense>
    </div>
  );
}
