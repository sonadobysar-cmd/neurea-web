import Link from "next/link";
import { COMPANY } from "@/data/company";

const MOM_LINKS = [
  { href: "/hledat", label: "Najít pomoc" },
  { href: "/jak-to-funguje", label: "Jak to funguje" },
  { href: "/cenik", label: "Ceník" },
  { href: "/bezpecnost", label: "Bezpečnost a ověřování" },
  { href: "/razeni", label: "Jak řadíme výsledky" },
  { href: "/faq", label: "Časté otázky" },
  { href: "/kontakt", label: "Kontakt" },
];

const CARE_LINKS = [
  { href: "/nabidnout", label: "Chci nabízet pomoc" },
  { href: "/jak-spoluprace", label: "Jak spolupráce funguje" },
  { href: "/pozadavky", label: "Požadavky na pečující" },
  { href: "/prihlaseni", label: "Přihlášení" },
];

const LEGAL_LINKS = [
  { href: "/obchodni-podminky", label: "Obchodní podmínky" },
  { href: "/ochrana-udaju", label: "Ochrana osobních údajů" },
  { href: "/storno", label: "Storno podmínky" },
  { href: "/reklamace", label: "Reklamace" },
  { href: "/cookies", label: "Cookies" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-[#eef2f0]">
      <div className="shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="display text-3xl text-ink">MamaSOS</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
            Online tržiště ověřené poporodní pomoci. Smlouva o péči vzniká mezi
            klientkou a pečující (OSVČ). MamaSOS zprostředkuje rezervaci, platbu
            a podporu. Nejde o zdravotní službu.
          </p>
          <div className="mt-4 space-y-1 text-xs leading-relaxed text-ink-soft">
            <p className="font-bold text-ink">{COMPANY.legalName}</p>
            <p>IČO: {COMPANY.ico}</p>
            <p>{COMPANY.seat}</p>
            <p>
              <a href={`mailto:${COMPANY.email}`} className="underline">
                {COMPANY.email}
              </a>
            </p>
            <p>{COMPANY.phone}</p>
            <p>{COMPANY.registry}</p>
            <p>
              ADR / ČOI:{" "}
              <a
                href={COMPANY.coiUrl}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                coi.cz
              </a>
            </p>
          </div>
          <Link
            href="/darovat-ulevu"
            className="mt-4 inline-block text-sm font-bold text-moss hover:underline"
          >
            Darovat úlevu
          </Link>
        </div>
        <div>
          <p className="eyebrow">Pro maminky</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-ink-soft">
            {MOM_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-ink">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">Pro pečující</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-ink-soft">
            {CARE_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-ink">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">Právní</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-ink-soft">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-ink">
                {l.label}
              </Link>
            ))}
            <Link href="/kontakt" className="hover:text-ink">
              Hlášení nezákonného obsahu / služby
            </Link>
          </div>
        </div>
      </div>
      <div className="shell border-t border-[var(--line)] py-5 text-xs text-ink-soft">
        © {new Date().getFullYear()} MamaSOS · mamasos.cz · provozovatel:{" "}
        {COMPANY.legalName}
      </div>
    </footer>
  );
}
