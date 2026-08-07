import Link from "next/link";

const CAREGIVERS = [
  {
    t: "ČAD / školy dul + laktační kurzy",
    d: "Česká asociace dul, absolventky poporodních kurzů, MAMILA / Laktační liga. Napiš školám: nabídka prvních profilů zdarma + kalendář.",
  },
  {
    t: "Facebook skupiny pečujících",
    d: "„Duly ČR“, „Laktační poradkyně“, „Chůvy a hlídání“, lokální „Maminky [město] nabízím hlídání“. Post + DM 20 nejlepším týdně.",
  },
  {
    t: "Instagram / TikTok outreach",
    d: "Hledej #dula #laktačníporadkyně #poporodnípéče #chůva. Komentář + DM: ověření, jednotná cena, kalendář místo chatu.",
  },
  {
    t: "Porodnice a ambulantní duly (B2B soft)",
    d: "Ne inzerát na chodbě — krátký leták pro duly/porodní asistentky: „posílej maminky, které potřebují úlevu doma“.",
  },
  {
    t: "Tvoje síť + 10 zakládajících žen",
    d: "Prvních 8–12 pečujících musíš sehnat ručně (Praha + Brno). Bez supply nemá smysl tahat traffic.",
  },
];

const CLIENTS = [
  {
    t: "Maminky skupiny (organicky)",
    d: "„Maminky Praha/Brno“, šestinedělí, kojení, po císaři. Hodnota first: checklist úlevy, ne spam „kupte appku“.",
  },
  {
    t: "Instagram Reels / TikTok",
    d: "Formát: „3 hodiny spánku, zatímco někdo uklidí a pohlídá“ · before/after dne · „co dula NENÍ“. Cíl: trust + CTA na termín.",
  },
  {
    t: "Gynekologie / laktační ambulance / baby-friendly místa",
    d: "Stojánek + QR na „ověřená úleva doma“. Domluv 5 ordinací ve svém městě.",
  },
  {
    t: "Partnerství s doplňky / body / photo newborn",
    d: "Cross-promo s newborn fotografkami, masážemi v šestinedělí, půjčovnami pomůcek — stejná audience, nízká cena.",
  },
  {
    t: "Paid ads až když máš supply",
    d: "Meta ads na 20–30 km radius + lookalike až když v lokalitě jsou 3+ ověřené ženy s kalendářem. Jinak spaluješ peníze.",
  },
];

export default function GrowthPage() {
  return (
    <div className="shell pb-16 pt-28 md:pb-24 md:pt-32">
      <div className="max-w-2xl">
        <p className="eyebrow">Růst</p>
        <h1 className="display mt-2 text-4xl md:text-6xl">
          Kde sehnat ženy do služeb — a kde maminky
        </h1>
        <p className="mt-4 text-ink-soft md:text-lg">
          Pořadí je důležité: nejdřív supply (pečující s kalendářem), pak poptávka.
          Jinak maminky přijdou, uvidí prázdno a už se nevrátí.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="display text-3xl">Pečující (supply)</h2>
          <div className="mt-5 space-y-4">
            {CAREGIVERS.map((item, i) => (
              <article key={item.t} className="panel-solid p-5">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-gold">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-bold">{item.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.d}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="display text-3xl">Klientky (demand)</h2>
          <div className="mt-5 space-y-4">
            {CLIENTS.map((item, i) => (
              <article key={item.t} className="panel-solid p-5">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-gold">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-bold">{item.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.d}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-12 rounded-[1.6rem] bg-ink px-6 py-8 text-white md:px-10">
        <h2 className="display text-3xl">Praktický start na 30 dní</h2>
        <ol className="mt-5 space-y-3 text-sm leading-relaxed text-white/80">
          <li>1. Ručně získej 10 pečujících (5 Praha, 3 Brno, 2 další).</li>
          <li>2. Každá musí mít kalendář + ověření — jinak nepublikuj.</li>
          <li>3. Soft launch do 5 maminek skupin + 10 IG stories denně.</li>
          <li>4. Cíl: prvních 20 placených rezervací, pak teprve ads.</li>
        </ol>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/nabidnout" className="btn btn-gold">
            Onboarding pečující
          </Link>
          <Link href="/zajistit" className="btn btn-ghost !border-white/20 !bg-white/10 !text-white">
            Co musím zajistit já
          </Link>
        </div>
      </div>
    </div>
  );
}
