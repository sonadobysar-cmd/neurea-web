"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [solid, setSolid] = useState(!isHome);

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        light ? "bg-transparent" : "nav-blur"
      }`}
      data-solid={solid || !isHome ? "true" : "false"}
    >
      <div className="shell flex items-center justify-between gap-4 py-4">
        <Link href="/" className="group flex items-center gap-2.5">
          <span
            className={`grid h-10 w-10 place-items-center rounded-full text-[0.7rem] font-extrabold tracking-wide transition group-hover:scale-105 ${
              light
                ? "bg-white/15 text-white ring-1 ring-white/35 backdrop-blur"
                : "bg-ink text-snow shadow-[0_10px_24px_rgba(22,19,17,0.2)]"
            }`}
          >
            SOS
          </span>
          <span
            className={`display text-[1.7rem] leading-none ${
              light ? "text-white" : "text-ink"
            }`}
          >
            MamaSOS
          </span>
        </Link>

        <nav
          className={`hidden items-center gap-7 text-sm font-semibold md:flex ${
            light ? "text-white/82" : "text-ink-soft"
          }`}
        >
          <Link href="/hledat" className="hover:opacity-100 opacity-90 transition">
            Najít pomoc
          </Link>
          <Link href="/cenik" className="hover:opacity-100 opacity-90 transition">
            Ceník
          </Link>
          <Link href="/jak-to-funguje" className="hover:opacity-100 opacity-90 transition">
            Jak to funguje
          </Link>
          <Link href="/nabidnout" className="hover:opacity-100 opacity-90 transition">
            Nabídnout pomoc
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/nabidnout"
            className={`btn hidden !py-2.5 !text-sm sm:inline-flex ${
              light ? "btn-ghost !bg-white/10 !text-white !border-white/25" : "btn-ghost"
            }`}
          >
            Jsem pečující
          </Link>
          <Link href="/hledat" className="btn btn-rose !py-2.5 !text-sm">
            Potřebuju úlevu
          </Link>
        </div>
      </div>
    </header>
  );
}
