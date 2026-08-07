import Link from "next/link";

const FAQ = [
  {
    q: "Je MamaSOS katalog kontaktů?",
    a: "Ne. Je to rezervační platforma: vidíte volné termíny, rezervujete bez dopisování a platíte předem přes platformu.",
  },
  {
    q: "Kdo poskytuje péči?",
    a: "Samostatné podnikatelky s IČO. MamaSOS je zprostředkovatel — zajišťuje ověření, kalendář, rezervaci a platbu.",
  },
  {
    q: "Co znamená Ověřená MamaSOS?",
    a: "Povinné ověření totožnosti, IČO, RT, pohovor, pojištění a u odborných služeb kvalifikace. Podrobnosti na stránce Bezpečnost.",
  },
  {
    q: "Jaké jsou ceny?",
    a: "Jednotné podle typu služby. Vidíte konečnou cenu za objednané hodiny — bez předplatného.",
  },
  {
    q: "Co když pečující nepřijede?",
    a: "Pomůžeme najít náhradní termín nebo vrátíme platbu podle storno podmínek. Detaily na stránce Storno.",
  },
  {
    q: "Je to zdravotní služba?",
    a: "Ne. Při zdravotních potížích kontaktujte lékaře, pohotovost nebo 155.",
  },
];

export default function FaqPage() {
  return (
    <div className="shell max-w-3xl pb-16 pt-28 md:pb-24 md:pt-32">
      <p className="eyebrow">Časté otázky</p>
      <h1 className="display mt-2 text-4xl md:text-5xl">FAQ pro maminky</h1>
      <div className="mt-10 space-y-4">
        {FAQ.map((item) => (
          <article key={item.q} className="panel-solid p-5">
            <h2 className="font-bold">{item.q}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.a}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/bezpecnost" className="btn btn-ghost">
          Bezpečnost
        </Link>
        <Link href="/kontakt" className="btn btn-rose">
          Kontaktovat podporu
        </Link>
      </div>
    </div>
  );
}
