import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="shell pb-16 pt-28 md:pb-24 md:pt-32">
      <div className="max-w-2xl">
        <p className="eyebrow">Jak to funguje</p>
        <h1 className="display mt-2 text-4xl md:text-6xl">Jednoduše a férově</h1>
        <p className="mt-4 text-ink-soft md:text-lg">
          MamaSOS propojuje maminky s ověřenými podnikatelkami. Transparentně,
          s kalendářem a jednotnými cenami.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {[
          {
            t: "Jen zprostředkovatel",
            d: "MamaSOS propojuje maminky s ověřenými podnikatelkami. Službu poskytuje pečující, ne platforma.",
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
        ].map((item, i) => (
          <article
            key={item.t}
            className="rounded-[1.5rem] border border-[var(--line)] bg-white p-6 transition hover:shadow-[var(--shadow-soft)]"
          >
            <p className="display text-3xl text-rose/70">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-3 text-lg font-bold">{item.t}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.d}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link href="/hledat" className="btn btn-rose">
          Najít pomoc
        </Link>
        <Link href="/nabidnout" className="btn btn-ghost">
          Chci nabízet pomoc
        </Link>
      </div>
    </div>
  );
}
