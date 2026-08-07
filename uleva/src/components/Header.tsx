"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { BrandLockup } from "@/components/BrandMark";

export function Header() {
  const { user, ready } = useAuth();
  const accountHref = user
    ? user.role === "mom"
      ? "/ucet"
      : "/ucet-pecujici"
    : "/prihlaseni";

  return (
    <header className="nav-blur fixed inset-x-0 top-0 z-50" data-solid="true">
      <div className="shell flex items-center justify-between gap-4 py-3.5 md:py-4">
        <Link href="/" aria-label="MamaSOS — domů">
          <BrandLockup />
        </Link>

        <nav className="hidden items-center gap-7 text-[0.9rem] font-semibold text-ink-soft lg:flex">
          <Link href="/hledat" className="transition hover:text-ink">
            Najít pomoc
          </Link>
          <Link href="/cenik" className="transition hover:text-ink">
            Ceník
          </Link>
          <Link href="/jak-to-funguje" className="transition hover:text-ink">
            Jak to funguje
          </Link>
          <Link href="/nabidnout" className="transition hover:text-ink">
            Pro pečující
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {ready && (
            <Link
              href={accountHref}
              className="btn btn-ghost hidden !py-2.5 !text-sm sm:inline-flex"
            >
              {user ? "Můj účet" : "Přihlásit"}
            </Link>
          )}
          <Link href="/hledat" className="btn btn-rose !py-2.5 !text-sm">
            Potřebuju úlevu
          </Link>
        </div>
      </div>
    </header>
  );
}
