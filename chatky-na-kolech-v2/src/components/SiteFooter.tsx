"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand, nav } from "@/data/content";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/konfigurator")) return null;

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <div className="footer-brand">{brand.name}</div>
            <p>{brand.tagline}</p>
            <p className="footer-note">Každý dům začíná rozhovorem, ne katalogovým číslem.</p>
          </div>
          <div className="footer-col">
            <h4>Objevte FLAX</h4>
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="footer-col">
            <h4>Kontakt</h4>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
            <p>{brand.address}</p>
            <Link href="/ochrana-osobnich-udaju">Ochrana osobních údajů</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {brand.legal ?? brand.name}</span>
          <span>{brand.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
