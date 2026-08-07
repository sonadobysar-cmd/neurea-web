import Link from "next/link";
import { BrandLockup } from "@/components/BrandMark";
import { COMPANY } from "@/data/company";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-snow">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <BrandLockup size="lg" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-soft">
            Ověřená péče pro maminky. Rezervace s reálným termínem — po celé ČR.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm text-ink-soft md:col-span-2 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <p className="eyebrow mb-1">Objevte</p>
            <Link href="/hledat">Najít pomoc</Link>
            <Link href="/cenik">Ceník</Link>
            <Link href="/jak-to-funguje">Jak to funguje</Link>
            <Link href="/bezpecnost">Ověření</Link>
          </div>
          <div className="flex flex-col gap-3">
            <p className="eyebrow mb-1">Pečující</p>
            <Link href="/nabidnout">Přidat se</Link>
            <Link href="/jak-spoluprace">Spolupráce</Link>
            <Link href="/kontakt">Kontakt</Link>
          </div>
          <div className="flex flex-col gap-3">
            <p className="eyebrow mb-1">Právní</p>
            <Link href="/obchodni-podminky">Podmínky</Link>
            <Link href="/ochrana-udaju">Soukromí</Link>
            <Link href="/storno">Storno</Link>
            <Link href="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
      <div className="shell flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] py-5 text-[0.7rem] text-ink-soft">
        <p>
          © {new Date().getFullYear()} MamaSOS · {COMPANY.legalName}
        </p>
        <p>IČO {COMPANY.ico}</p>
      </div>
    </footer>
  );
}
