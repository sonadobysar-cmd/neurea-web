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
    const onScroll = () => setSolid(window.scrollY > 48);
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
      <div className="shell flex items-center justify-between py-6">
        <Link href="/" aria-label="MamaSOS — domů">
          <BrandLockup tone={light ? "light" : "ink"} />
        </Link>

        <div className="flex items-center gap-8">
          <nav
            className={`hidden items-center gap-8 text-[0.68rem] font-semibold uppercase tracking-[0.16em] md:flex ${
              light ? "text-white/70" : "text-ink-soft"
            }`}
          >
            <Link href="/hledat" className="transition hover:text-current hover:opacity-100">
              Služby
            </Link>
            <Link href="/cenik" className="transition hover:opacity-100">
              Ceník
            </Link>
            <Link href="/nabidnout" className="transition hover:opacity-100">
              Pečující
            </Link>
            {ready && (
              <Link href={accountHref} className="transition hover:opacity-100">
                {user ? "Účet" : "Přihlásit"}
              </Link>
            )}
          </nav>
          <Link
            href="/hledat"
            className={`btn !px-5 !py-2.5 !text-[0.65rem] ${
              light ? "btn-ghost-light" : "btn-rose"
            }`}
          >
            Rezervovat
          </Link>
        </div>
      </div>
    </header>
  );
}
