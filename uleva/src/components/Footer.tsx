import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-[#ece7e1]">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.45fr_1fr_1fr]">
        <div>
          <p className="display text-3xl text-ink">MamaSOS</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
            Zprostředkování ověřené poporodní pomoci po celé ČR. Stejná služba —
            stejná cena. Vidíš termíny, rezervuješ bez dopisování.
          </p>
        </div>
        <div>
          <p className="eyebrow">Pro maminky</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-ink-soft">
            <Link href="/hledat" className="hover:text-ink">
              Najít pomoc
            </Link>
            <Link href="/asistent" className="hover:text-ink">
              AI asistentka
            </Link>
            <Link href="/registrace" className="hover:text-ink">
              Registrace maminky
            </Link>
            <Link href="/cenik" className="hover:text-ink">
              Jednotný ceník
            </Link>
            <Link href="/zajistit" className="hover:text-ink">
              Co musím zajistit
            </Link>
            <Link href="/rust" className="hover:text-ink">
              Kde sehnat pečující i klientky
            </Link>
          </div>
        </div>
        <div>
          <p className="eyebrow">Pro pečující</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-ink-soft">
            <Link href="/nabidnout" className="hover:text-ink">
              Registrace pečující
            </Link>
            <Link href="/prihlaseni" className="hover:text-ink">
              Přihlášení
            </Link>
            <p className="text-xs leading-relaxed opacity-80">
              MamaSOS je zprostředkovatel. Péči poskytují samostatné podnikatelky
              s IČO. Nejde o zdravotní službu.
            </p>
          </div>
        </div>
      </div>
      <div className="shell border-t border-[var(--line)] py-5 text-xs text-ink-soft">
        © {new Date().getFullYear()} MamaSOS · mamasos.cz
      </div>
    </footer>
  );
}
