"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navMain, navMore, site } from "@/lib/site";

const navLinkDesktop =
  "inline-flex items-center whitespace-nowrap border-b border-transparent px-3 py-2 text-[13px] font-normal uppercase tracking-[0.12em] text-ink/70 transition-all duration-200 hover:border-gold/50 hover:text-gold";

export function Header() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!moreOpen) return;
    const handle = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [moreOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/75 shadow-[0_1px_0_0_rgba(184,150,62,0.12)] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/65">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link
          href="/"
          className="relative z-10 flex shrink-0 items-center"
          aria-label="NEUREA — úvod"
        >
          <span className="select-none font-sans text-lg font-light uppercase leading-none tracking-[0.32em] text-gold sm:text-xl sm:tracking-[0.34em] md:text-2xl md:tracking-[0.36em]">
            {site.name}
          </span>
        </Link>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 lg:flex"
          aria-label="Hlavní menu"
        >
          {navMain.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${navLinkDesktop} ${
                item.href === "/testy"
                  ? "border-gold/55 text-gold hover:border-gold hover:text-gold-bright"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="relative pl-1" ref={moreRef}>
            <button
              type="button"
              className={`inline-flex items-center gap-1 whitespace-nowrap border-b border-transparent px-3 py-2 text-[13px] font-normal uppercase tracking-[0.12em] transition-all ${
                moreOpen ? "border-gold/55 text-gold" : "text-ink/70 hover:border-gold/50 hover:text-gold"
              }`}
              aria-expanded={moreOpen}
              aria-haspopup="menu"
              onClick={() => setMoreOpen((v) => !v)}
            >
              Více
              <span className="text-gold/80" aria-hidden>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M6 8.5L1 3.5h10L6 8.5z" />
                </svg>
              </span>
            </button>
            {moreOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full z-[60] mt-2 min-w-[15rem] rounded-lg border border-gold/20 bg-white py-2 shadow-luxury-lg"
              >
                {navMore.map((item) => (
                  <Link
                    key={item.href}
                    role="menuitem"
                    href={item.href}
                    className="block px-4 py-3 text-[13px] font-normal uppercase tracking-[0.12em] text-ink/75 transition hover:bg-cream hover:text-gold"
                    onClick={() => setMoreOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="relative z-10 flex shrink-0 items-center gap-3">
          <Link
            href="/rezervace"
            className="btn-gold !min-h-0 hidden !py-2.5 !px-5 !text-[11px] !tracking-[0.14em] sm:inline-flex"
          >
            <span>Rezervovat</span>
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-gold/25 bg-white text-ink transition hover:border-gold/40 lg:hidden"
            aria-label={open ? "Zavřít menu" : "Menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-lg leading-none">{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-gold/15 bg-white px-5 py-6 lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-0.5">
            {navMain.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 text-[15px] font-normal text-ink/85 transition hover:bg-cream hover:text-gold"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <p className="mb-1 mt-4 px-3 font-heading text-[10px] font-normal uppercase tracking-[0.35em] text-gold">
              Další
            </p>
            {navMore.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 text-[15px] font-normal text-ink/85 transition hover:bg-cream hover:text-gold"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/rezervace"
              className="btn-gold mt-5 w-full justify-center !py-3"
              onClick={() => setOpen(false)}
            >
              <span>Rezervovat</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
