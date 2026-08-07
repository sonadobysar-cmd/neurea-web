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
    const onScroll = () => setSolid(window.scrollY > 24);
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
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        light ? "bg-transparent" : "nav-blur"
      }`}
      data-solid={solid || !isHome ? "true" : "false"}
    >
      <div className="shell flex items-center justify-between gap-4 py-4">
        <Link href="/" aria-label="MamaSOS — domů">
          <BrandLockup tone={light ? "light" : "ink"} />
        </Link>

        <nav
          className={`hidden items-center gap-6 text-sm font-semibold lg:flex ${
            light ? "text-white/85" : "text-ink-soft"
          }`}
        >
          <Link href="/hledat" className="opacity-90 transition hover:opacity-100">
            Najít pomoc
          </Link>
          <Link href="/cenik" className="opacity-90 transition hover:opacity-100">
            Ceník
          </Link>
          <Link href="/jak-to-funguje" className="opacity-90 transition hover:opacity-100">
            Jak to funguje
          </Link>
          <Link href="/nabidnout" className="opacity-90 transition hover:opacity-100">
            Chci nabízet pomoc
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {ready && (
            <Link
              href={accountHref}
              className={`btn hidden !py-2.5 !text-sm sm:inline-flex ${
                light ? "btn-ghost-light" : "btn-ghost"
              }`}
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
