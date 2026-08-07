import Link from "next/link";

const ONLY_YOU = [
  {
    t: "Doména mamasos.cz",
    d: "Koupit a převést na sebe / firmu, nastavit DNS na hosting. Platbu a vlastnictví domény nemůžu udělat za tebe.",
  },
  {
    t: "Podpis smluv jako jednatelka s.r.o.",
    d: "Obchodní podmínky, smlouva se pečujícími (zprostředkování + přijímání plateb jménem pečující), GDPR dokumenty. Advokát je musí schválit a ty je podepíšeš.",
  },
  {
    t: "Platební brána + obchodní účet",
    d: "Onboarding u GoPay / Comgate / Stripe (KYC na tebe a s.r.o.), firemní účet, nastavení výplat pečujícím. ČNB model „obchodní zástupce“ musí sedět ve smlouvách — to schvaluje právník + platební partner.",
  },
  {
    t: "Skupinové pojištění odpovědnosti",
    d: "Produkt a smlouva přes manžela / pojišťovnu. Já připravím požadavky, ale pojistku sjedná a podepíše člověk.",
  },
  {
    t: "Manuální ověření pečujících",
    d: "Zkontrolovat občanku, IČO v ARES, výpis z RT, pojištění, absolvovat pohovor, rozhodnout o schválení. AI ani kód nemůže legálně „ověřit člověka“ za tebe.",
  },
  {
    t: "První reálné pečující v terénu",
    d: "Nábor, pohovory, foto/ID, domluva. Softwarově jim připravím onboarding — lidi musíš sehnat ty.",
  },
  {
    t: "Daně a účetnictví",
    d: "Účetní / daňový poradce pro fee platformy, DPH podle reality, fakturace pečujícím. Já umím připravit podklady, ne podat přiznání.",
  },
];

export default function ArrangePage() {
  return (
    <div className="shell pb-16 pt-28 md:pb-24 md:pt-32">
      <div className="max-w-2xl">
        <p className="eyebrow">Jen ty</p>
        <h1 className="display mt-2 text-4xl md:text-6xl">
          Co musím zajistit já — a nic víc
        </h1>
        <p className="mt-4 text-ink-soft md:text-lg">
          Všechno ostatní (web, AI, registrace, kalendář, matching, copy, demo
          platby) umím postavit v kódu. Tady je výhradně to, co za tebe
          <strong> 100% nemůžu</strong> udělat.
        </p>
      </div>

      <div className="mt-12 space-y-4">
        {ONLY_YOU.map((item, i) => (
          <article key={item.t} className="panel-solid p-5 md:p-6">
            <p className="display text-3xl text-rose/70">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-2 text-xl font-bold">{item.t}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.d}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-[1.4rem] border border-[var(--line)] bg-white p-6">
        <h2 className="display text-2xl">Co už je v produktu (nemusíš řešit sama)</h2>
        <ul className="mt-4 space-y-2 text-sm text-ink-soft">
          <li>• Landing, ceník, vyhledávání, kalendář, rezervace (demo)</li>
          <li>• Registrace maminky + účet s rezervacemi</li>
          <li>• Multi-step registrace pečující + panel stavu ověření</li>
          <li>• AI asistentka na FAQ + doporučení kandidátek</li>
          <li>• Právní copy hranic (ne zdravotní služba, ne jesle)</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/registrace" className="btn btn-rose">
            Vyzkoušet účet maminky
          </Link>
          <Link href="/nabidnout" className="btn btn-ghost">
            Registrace pečující
          </Link>
          <Link href="/asistent" className="btn btn-ink">
            AI asistentka
          </Link>
        </div>
      </div>
    </div>
  );
}
