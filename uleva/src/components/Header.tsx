import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(26,46,40,0.06)] bg-[rgba(245,248,246,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--sage-deep)] text-sm font-bold text-[#f7fbf9] shadow-[0_8px_20px_rgba(47,86,72,0.25)] transition group-hover:scale-105">
            Ú
          </span>
          <span className="display text-2xl leading-none tracking-tight text-[var(--ink)]">
            Úleva
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-[var(--ink-soft)] md:flex">
          <Link href="/hledat" className="hover:text-[var(--ink)]">
            Najít pomoc
          </Link>
          <Link href="/cenik" className="hover:text-[var(--ink)]">
            Ceník
          </Link>
          <Link href="/jak-to-funguje" className="hover:text-[var(--ink)]">
            Jak to funguje
          </Link>
          <Link href="/nabidnout" className="hover:text-[var(--ink)]">
            Nabídnout pomoc
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/nabidnout" className="btn-ghost hidden !py-2.5 !text-sm sm:inline-flex">
            Jsem pečující
          </Link>
          <Link href="/hledat" className="btn-primary !py-2.5 !text-sm">
            Najít úlevu
          </Link>
        </div>
      </div>
    </header>
  );
}
