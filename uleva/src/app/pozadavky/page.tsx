import Link from "next/link";

export default function Page() {
  return (
    <div className="shell pb-16 pt-28 md:pb-24 md:pt-32">
      <div className="max-w-2xl">
        <p className="eyebrow">Pro pečující</p>
        <h1 className="display mt-2 text-4xl md:text-6xl">Požadavky na pečující</h1>
      </div>
      <div className="mt-10 space-y-4">
        {[
          ["IČO a živnost", "Musíte podnikat (typicky služby pro rodinu a domácnost / odpovídající činnost)."],
          ["Ověření", "Totožnost, výpis z RT, pohovor, pojištění odpovědnosti."],
          ["Kalendář", "Bez aktivního a potvrzovaného kalendáře profil nezveřejníme."],
          ["Úleva doma", "Spolehlivost a zkušenost s běžnou domácí pomocí u rodin."],
          ["Dula", "Odpovídající kurz / kvalifikace. Nezdravotní podpora."],
          ["Laktace", "Doložená kvalifikace; na profilu typ vzdělání (např. PA / laická)."],
        ].map(([t, d]) => (
          <article key={t} className="panel-solid p-5">
            <h2 className="font-bold">{t}</h2>
            <p className="mt-2 text-sm text-ink-soft">{d}</p>
          </article>
        ))}
      </div>
      <Link href="/nabidnout#registrace" className="btn btn-rose mt-8">
        Přejít k registraci
      </Link>
    </div>
  );
}
