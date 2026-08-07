"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { BrandLockup } from "@/components/BrandMark";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [solid, setSolid] = useState(!isHome);
  const { user, ready } = useAuth();

  useEffect(() => {
    if (!isHome) {
      setSolid(true);
      return;
    }
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const light = isHome && !solid;
  const accountHref = user
    ? user.role === "mom"
      ? "/ucet"
      : "/ucet-pecujici"
    : "/prihlaseni";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-500 ${
        light ? "bg-transparent" : "nav-blur"
      }`}
      data-solid={solid || !isHome ? "true" : "false"}
    >
      <div className="shell flex items-center justify-between gap-6 py-5">
        <Link href="/" className="group" aria-label="MamaSOS — domů">
          <BrandLockup tone={light ? "light" : "ink"} />
        </Link>

        <nav
          className={`absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-[0.78rem] font-semibold tracking-[0.04em] lg:flex ${
            light ? "text-white/75" : "text-ink-soft"
          }`}
        >
          <Link href="/hledat" className="transition hover:text-current hover:opacity-100 opacity-90">
            Najít pomoc
          </Link>
          <Link href="/cenik" className="transition hover:opacity-100 opacity-90">
            Ceník
          </Link>
          <Link href="/bezpecnost" className="transition hover:opacity-100 opacity-90">
            Důvěra
          </Link>
          <Link href="/nabidnout" className="transition hover:opacity-100 opacity-90">
            Pro pečující
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {ready && (
            <Link
              href={accountHref}
              className={`hidden text-[0.78rem] font-semibold tracking-[0.04em] sm:inline ${
                light ? "text-white/80" : "text-ink-soft"
              }`}
            >
              {user ? "Účet" : "Přihlásit"}
            </Link>
          )}
          <Link
            href="/hledat"
            className={`btn !px-5 !py-2.5 !text-[0.8rem] ${
              light ? "btn-ghost-light" : "btn-rose"
            }`}
          >
            Potřebuju úlevu
          </Link>
        </div>
      </div>
    </header>
  );
}
