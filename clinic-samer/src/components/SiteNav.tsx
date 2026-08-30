"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/data/i18n/dictionaries";
import { locales, localeMeta, type Locale } from "@/lib/locales";
import { ClinicLogo } from "@/components/ClinicLogo";
import { useScrolled } from "@/components/Reveal";

export function SiteNav({
  locale,
  dict,
  solid = false,
}: {
  locale: Locale;
  dict: Dictionary;
  solid?: boolean;
}) {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/reviews`, label: dict.nav.reviews },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  function swapLocale(next: Locale) {
    const parts = pathname.split("/");
    parts[1] = next;
    return parts.join("/") || `/${next}`;
  }

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`site-nav${scrolled || solid ? " is-solid" : ""}${
        open ? " is-open" : ""
      }`}
    >
      <div className="container nav-inner">
        <Link
          href={`/${locale}`}
          className="brand-lockup"
          onClick={() => setOpen(false)}
        >
          <ClinicLogo className="brand-logo" title={dict.brand.short} />
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav-aside">
          <div className="lang-switch" aria-label="Language">
            {locales.map((l) => (
              <Link
                key={l}
                href={swapLocale(l)}
                className={l === locale ? "is-active" : undefined}
                hrefLang={localeMeta[l].htmlLang}
              >
                {localeMeta[l].label}
              </Link>
            ))}
          </div>

          <Link href={`/${locale}/booking`} className="btn btn-primary nav-cta">
            {dict.nav.book}
          </Link>

          <button
            type="button"
            className="nav-toggle"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
      </div>

      <div className="nav-panel" id="mobile-nav" hidden={!open}>
        <div className="container nav-panel-inner">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link
            href={`/${locale}/booking`}
            className="btn btn-primary"
            onClick={() => setOpen(false)}
          >
            {dict.nav.book}
          </Link>
          <div className="lang-switch">
            {locales.map((l) => (
              <Link
                key={l}
                href={swapLocale(l)}
                className={l === locale ? "is-active" : undefined}
                onClick={() => setOpen(false)}
              >
                {localeMeta[l].label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
