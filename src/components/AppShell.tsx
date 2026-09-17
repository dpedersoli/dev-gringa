import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";

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
          {showNav ? (
            <nav className="flex flex-wrap gap-1 text-sm">
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
                href="/profile"
                className="rounded-sm px-3 py-1.5 text-[var(--foreground)] hover:bg-[var(--chip)]"
              >
                {dict.navProfile}
              </Link>
            </nav>
          ) : null}
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">{children}</main>
    </div>
  );
}
