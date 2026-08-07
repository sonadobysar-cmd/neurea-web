import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--sage)]">
          Jak to funguje
        </p>
        <h1 className="display mt-1 text-4xl md:text-5xl">Jednoduše a férově</h1>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {[
          {
            t: "Jen zprostředkovatel",
            d: "Úleva propojuje maminky s ověřenými podnikatelkami. Službu poskytuje pečující, ne platforma.",
          },
          {
            t: "Povinné ověření",
            d: "IČO, totožnost, výpis z RT, pohovor, pojištění. Bez toho profil neuvidíš ve výsledcích.",
          },
          {
            t: "Kalendář místo chatu",
            d: "Každá pečující musí mít rezervační kalendář. Vidíš termíny a rezervuješ bez dopisování.",
          },
          {
            t: "Jednotné ceny",
            d: "Úleva / dula / laktace — stejná sazba pro všechny v segmentu. Platíš jen hodiny, žádné předplatné.",
          },
          {
            t: "Celá ČR",
            d: "Hledáš podle lokality. Zobrazíme nejbližší ověřené ženy s volnými sloty.",
          },
          {
            t: "Jasné hranice",
            d: "Nejsme zdravotní služba ani jesle. Dula a laická laktace nejsou lékařská péče. PA mají samostatný badge.",
          },
        ].map((item) => (
          <article key={item.t} className="card p-6">
            <h2 className="text-lg font-bold">{item.t}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{item.d}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/hledat" className="btn-primary">
          Najít pomoc
        </Link>
        <Link href="/nabidnout" className="btn-ghost">
          Chci nabízet pomoc
        </Link>
      </div>
    </div>
  );
}
