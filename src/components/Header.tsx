"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navMain, navMore, site } from "@/lib/site";

const navLinkDesktop =
  "px-3 py-2 text-[13px] font-light tracking-[0.12em] text-ink/55 transition-colors duration-200 hover:text-gold";

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
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-white">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link href="/" className="relative z-10 flex min-w-0 shrink items-center" aria-label="NEUREA — úvod">
          {site.wordmarkUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={site.wordmarkUrl}
              alt="NEUREA"
              className="h-7 w-auto max-h-7 max-w-[104px] shrink-0 object-contain object-left sm:max-w-[118px] md:h-8 md:max-h-8 md:max-w-[132px]"
              width={180}
              height={48}
              decoding="async"
              fetchPriority="high"
            />
          ) : (
            <span className="font-display text-xl font-light tracking-[0.28em] text-gold">NEUREA</span>
          )}
        </Link>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex"
          aria-label="Hlavní menu"
        >
          {navMain.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkDesktop}>
              {item.label}
            </Link>
          ))}
          <div className="relative pl-1" ref={moreRef}>
            <button
              type="button"
              className={`inline-flex items-center gap-1 px-3 py-2 text-[13px] font-light tracking-[0.12em] transition-colors ${
                moreOpen ? "text-gold" : "text-ink/55 hover:text-gold"
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
                    className="block px-4 py-3 text-[14px] font-normal text-ink/75 transition hover:bg-cream hover:text-gold"
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
