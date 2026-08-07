import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[rgba(26,46,40,0.08)] bg-[rgba(255,255,255,0.45)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <p className="display text-3xl text-[var(--ink)]">Úleva</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--ink-soft)]">
            Zprostředkování ověřené poporodní pomoci po celé ČR. Stejná služba —
            stejná cena. Vidíš termíny, rezervuješ bez dopisování.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--sage)]">
            Pro maminky
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-[var(--ink-soft)]">
            <Link href="/hledat">Najít pomoc</Link>
            <Link href="/cenik">Jednotný ceník</Link>
            <Link href="/jak-to-funguje">Jak to funguje</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--sage)]">
            Pro pečující
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-[var(--ink-soft)]">
            <Link href="/nabidnout">Nabídnout pomoc</Link>
            <p className="text-xs leading-relaxed opacity-80">
              Úleva je zprostředkovatel. Péči poskytují samostatné podnikatelky
              s IČO. Nejde o zdravotní službu.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
