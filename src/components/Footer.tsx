import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-0 border-t border-gold/25 bg-cream text-ink">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-3 md:px-8 md:py-20">
        <div>
          <p className="font-display text-lg font-light tracking-[0.22em] text-gold">NEUREA</p>
          <p className="mt-4 text-sm font-normal leading-relaxed text-ink/70">
            Poradenské a podpůrné pracoviště zaměřené na neuro-somatickou diagnostiku a terapii.
            Služby nejsou zdravotní péčí ve smyslu zákona č. 372/2011 Sb.
          </p>
        </div>
        <div>
          <p className="eyebrow">Právní</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link href="/obchodni-podminky" className="text-ink/65 transition hover:text-gold">
                Obchodní podmínky
              </Link>
            </li>
            <li>
              <Link href="/zasady-ochrany-udaju" className="text-ink/65 transition hover:text-gold">
                Zásady ochrany osobních údajů
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="text-ink/65 transition hover:text-gold">
                Cookie politika
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-ink/65 transition hover:text-gold">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Kontakt</p>
          <p className="mt-5 text-sm text-ink/75">
            <a href={`mailto:${site.email}`} className="transition hover:text-gold">
              {site.email}
            </a>
          </p>
          <p className="mt-2 text-xs text-ink/45">
            IČO {site.ico} · {site.operator}
          </p>
        </div>
      </div>
      <div className="border-t border-gold/15 py-6 text-center text-[11px] font-normal uppercase tracking-[0.2em] text-ink/40">
        © {new Date().getFullYear()} NEUREA · neurea.cz
      </div>
    </footer>
  );
}
