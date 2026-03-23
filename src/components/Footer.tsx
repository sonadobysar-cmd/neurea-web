import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative mt-0 border-t border-white/80 bg-white/85 text-ink shadow-[inset_0_1px_0_0_rgba(184,150,62,0.1)] backdrop-blur-md supports-[backdrop-filter]:bg-white/75">
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
          <div className="mt-5 space-y-2 text-sm text-ink/75">
            <p>NEUREA</p>
            <p>
              <a href="mailto:info@neurea.cz" className="transition hover:text-gold">
                info@neurea.cz
              </a>
            </p>
            <p>
              <a href="tel:+420735887773" className="transition hover:text-gold">
                +420 735 887 773
              </a>
            </p>
            <p>IČO: MS Luxury s.r.o. 14392704</p>
            <p>Datová sch.: 9h7uxuz</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gold/15 py-6 text-center text-[11px] font-normal uppercase tracking-[0.2em] text-ink/40">
        <p>© {new Date().getFullYear()} NEUREA · neurea.cz</p>
        {/* Na Vercelu je při buildu k dispozici — ověření, že vidíš nejnovější nasazení (srovnej s commitem na GitHubu). */}
        {process.env.VERCEL_GIT_COMMIT_SHA ? (
          <p className="mt-2 font-mono text-[10px] normal-case tracking-normal text-ink/35">
            Build {process.env.VERCEL_GIT_COMMIT_SHA.slice(0, 7)}
          </p>
        ) : null}
      </div>
    </footer>
  );
}
