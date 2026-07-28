"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { brand, nav } from "@/data/content";
import { LogoMark } from "./Icons";

export function SiteNav({ darkHero = false }: { darkHero?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const dark = darkHero && !scrolled && !open;

  return (
    <>
      <header
        className={`site-nav${scrolled ? " is-scrolled" : ""}${dark ? " is-dark" : ""}`}
      >
        <div className="wrap nav-inner">
          <Link href="/" className="brand" onClick={() => setOpen(false)}>
            <LogoMark className="brand-mark" />
            <span className="brand-text">
              <strong>{brand.name}</strong>
              <span>{brand.domain}</span>
            </span>
          </Link>

          <nav className="nav-links" aria-label="Hlavní">
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href="/#kontakt" className="btn btn-ink nav-cta">
            Domluvit hovor
          </Link>

          <button
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobileNav"
            aria-label={open ? "Zavřít menu" : "Otevřít menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        id="mobileNav"
        className={`nav-mobile${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        {nav.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <Link href="/#kontakt" onClick={() => setOpen(false)}>
          Kontakt
        </Link>
      </div>
    </>
  );
}
