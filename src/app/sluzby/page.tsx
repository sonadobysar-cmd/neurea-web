import type { Metadata } from "next";
import Link from "next/link";
import { CtaButtons } from "@/components/CtaButtons";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Služby",
};

export default function SluzbyPage() {
  return (
    <PageShell variant="wide">
      <p className="eyebrow">Nabídka</p>
      <h1 className="mt-4 font-display text-4xl font-normal tracking-tight text-ink md:text-5xl">
        Služby
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/60">
        Přehled podle vašich podkladů — ceny viz ceník.
      </p>

      <div className="mt-14 space-y-10">
        {/* 01: Vstupní diagnostika */}
        <section className="glass-panel-strong p-9">
          <h2 className="font-display text-2xl font-normal text-ink">
            01 | VSTUPNÍ DIAGNOSTIKA: DATA + PRVNÍ KROK K ŘEŠENÍ
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink/68">
            Povinný start pro nové klienty. Nejen měření, ale i zahájení regulace.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-ink/68">
            Těžištěm naší spolupráce je přesnost. Během 75 minut provedeme komplexní hloubkovou anamnézu a HRV analýzu,
            která nám ukáže, v jakém stavu se nachází vaše nervová soustava „pod kapotou“.
          </p>

          <div className="mt-6">
            <p className="font-heading text-[13px] font-normal uppercase tracking-[0.26em] text-gold">
              Co od nás během diagnostiky dostanete
            </p>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-ink/68">
              <li>
                <strong>Objektivní biomárkry:</strong> Změříme variabilitu vašeho srdečního rytmu a úroveň koherence mezi srdcem a mozkem.
              </li>
              <li>
                <strong>Zahájení řešení:</strong> Součástí diagnostiky je již první terapeutický zásah (např. úvodní stimulace nebo dekomprese),
                abyste okamžitě pocítili vliv technologie na vaši fyziologii.
              </li>
              <li>
                <strong>Individuální protokol:</strong> Na základě naměřených dat sestavíme plán na míru vašim potížím (vyhoření, ADHD, úzkosti, nespavost).
              </li>
              <li>
                <strong>Terapie mluví. Neurea měří.</strong> Z diagnostiky neodejdete jen s diagnózou, ale s jasným směrem a prvním prožitkem neuro-somatické úlevy.
              </li>
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-ink/45">Délka: 75 min</p>
              <p className="text-sm font-medium uppercase tracking-wider text-ink/45 mt-1">Cena: 3 500 Kč</p>
            </div>
            <Link
              href="/rezervace?serviceId=vstupni-diagnostika"
              className="btn-gold inline-flex min-h-[44px] items-center justify-center px-8"
            >
              <span>Rezervovat diagnostiku</span>
            </Link>
          </div>
        </section>

        {/* 03: Terapeutické protokoly */}
        <section className="glass-panel-strong p-9">
          <h2 className="font-display text-2xl font-normal text-ink">
            03 | Terapeutické protokoly (Balíčky)
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink/68">
            Komplexní práce na změně biometrických dat a úlevě od symptomů.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div>
              <p className="eyebrow !text-[10px]">Dospělí</p>
              <div className="mt-5 space-y-6">
                <div className="rounded-xl border border-white/60 bg-white/50 p-6 shadow-luxury backdrop-blur-sm">
                  <h3 className="font-display text-[18px] font-light text-ink">
                    Samostatné terapeutické sezení dospělí (60–90 min) — 3 000 Kč
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/68">
                    Jednotlivá návštěva kombinující technologie a somatickou práci po absolvování diagnostiky.
                  </p>
                  <Link
                    href="/rezervace?serviceId=jedno-dospeli"
                    className="mt-5 inline-flex items-center text-sm text-gold underline decoration-gold/40 hover:decoration-gold"
                  >
                    Rezervovat službu →
                  </Link>
                </div>

                <div className="rounded-xl border border-white/60 bg-white/50 p-6 shadow-luxury backdrop-blur-sm">
                  <h3 className="font-display text-[18px] font-light text-ink">
                    Série 5 sezení dospělí (60–90 min) — 14 000 Kč
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/68">
                    Intenzivní stabilizace a úleva od akutního stresu nebo úzkostných stavů.
                  </p>
                  <Link
                    href="/rezervace?serviceId=serie-5"
                    className="mt-5 inline-flex items-center text-sm text-gold underline decoration-gold/40 hover:decoration-gold"
                  >
                    Rezervovat službu →
                  </Link>
                </div>

                <div className="rounded-xl border border-white/60 bg-white/50 p-6 shadow-luxury backdrop-blur-sm">
                  <h3 className="font-display text-[18px] font-light text-ink">
                    Série 10 sezení dospělí (60–90 min) — 25 000 Kč
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/68">
                    Maximální efekt pro hlubokou restrukturalizaci nervové soustavy a dlouhodobé výsledky.
                  </p>
                  <Link
                    href="/rezervace?serviceId=serie-10"
                    className="mt-5 inline-flex items-center text-sm text-gold underline decoration-gold/40 hover:decoration-gold"
                  >
                    Rezervovat službu →
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <p className="eyebrow !text-[10px]">Děti</p>
              <div className="mt-5 space-y-6">
                <div className="rounded-xl border border-white/60 bg-white/50 p-6 shadow-luxury backdrop-blur-sm">
                  <h3 className="font-display text-[18px] font-light text-ink">
                    Samostatné dětské sezení (45–60 min) — 2 600 Kč
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/68">
                    Jednotlivá návštěva v rámci udržovací fáze nebo krátkodobé podpory pro děti.
                  </p>
                  <Link
                    href="/rezervace?serviceId=jedno-deti"
                    className="mt-5 inline-flex items-center text-sm text-gold underline decoration-gold/40 hover:decoration-gold"
                  >
                    Rezervovat službu →
                  </Link>
                </div>

                <div className="rounded-xl border border-white/60 bg-white/50 p-6 shadow-luxury backdrop-blur-sm">
                  <h3 className="font-display text-[18px] font-light text-ink">
                    Dětský protokol – série 5 (45–60 min) — 12 000 Kč
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/68">
                    Základní cyklus pro nastartování změn v kognitivní flexibilitě a zklidnění u dětí (ADHD, autismus).
                  </p>
                  <Link
                    href="/rezervace?serviceId=detsky-program"
                    className="mt-5 inline-flex items-center text-sm text-gold underline decoration-gold/40 hover:decoration-gold"
                  >
                    Rezervovat službu →
                  </Link>
                </div>

                <div className="rounded-xl border border-white/60 bg-white/50 p-6 shadow-luxury backdrop-blur-sm">
                  <h3 className="font-display text-[18px] font-light text-ink">
                    Dětský protokol – série 10 (45–60 min) — 22 000 Kč
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/68">
                    Dlouhodobý trénink pro trvalé zlepšení pozornosti a emoční regulace u dětí.
                  </p>
                  <Link
                    href="/rezervace?serviceId=detsky-program-10"
                    className="mt-5 inline-flex items-center text-sm text-gold underline decoration-gold/40 hover:decoration-gold"
                  >
                    Rezervovat službu →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Samostatné technologie / Jednotlivé procedury */}
        <section className="glass-panel-strong p-9">
          <h2 className="font-display text-2xl font-normal text-ink">Jednotlivé procedury</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink/68">
            Cílená aplikace konkrétní metody pro klienty, kteří přesně vědí, co jejich tělo a mozek potřebují.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "HRV Biofeedback (45 min) — 1 600 Kč",
                desc: "Aktivní trénink odolnosti nervové soustavy v reálném čase.",
                serviceId: "hrv-biofeedback",
              },
              {
                title: "Kraniální elektrostimulace (CES) (45 min) — 1 800 Kč",
                desc: "Mikroproudy pro rychlou úlevu od nespavosti, úzkosti a tenze.",
                serviceId: "ces",
              },
              {
                title: "Myofasciální práce (60 min) — 2 000 Kč",
                desc: "Manuální uvolnění pojivových tkání pro fyzickou dekompresi bloudivého nervu.",
                serviceId: "myofasciální-práce",
              },
              {
                title: "Transkraniální stimulace (tDCS / tACS) (45 min) — 2 200 Kč",
                desc: "Modulace neuronální aktivity pro řešení deprese, ADHD a chronické bolesti.",
                serviceId: "tdcs",
              },
              {
                title: "Fotobiomodulace mozku (PBM) (45 min) — 2 200 Kč",
                desc: "Světelná stimulace mitochondrií pro zvýšení energie mozku, zlepšení spánku a kognice.",
                serviceId: "fotobiomodulace",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/60 bg-white/50 p-6 shadow-luxury backdrop-blur-sm"
              >
                <h3 className="font-medium text-ink">{item.title}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-ink/64">{item.desc}</p>
                <Link
                  href={`/rezervace?serviceId=${item.serviceId}`}
                  className="mt-5 inline-flex items-center text-sm text-gold underline decoration-gold/40 hover:decoration-gold"
                >
                  Rezervovat službu →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Rezervace a platba */}
        <section className="glass-panel-strong p-9">
          <h2 className="font-display text-2xl font-normal text-ink">Rezervace a platba</h2>

          <p className="mt-4 text-[15px] leading-relaxed text-ink/68">
            Pro potvrzení vašeho termínu je nutné provést online platbu přes bránu Stripe.
          </p>

          <p className="mt-4 font-heading text-[13px] font-normal uppercase tracking-[0.26em] text-gold">
            Můžete si vybrat ze tří možností úhrady
          </p>
          <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-ink/68">
            <li>Záloha 500 Kč</li>
            <li>Záloha 1 000 Kč</li>
            <li>Plná cena služby</li>
          </ul>

          <p className="mt-5 font-heading text-[13px] font-normal uppercase tracking-[0.26em] text-gold">
            Doplatek na místě
          </p>
          <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-ink/68">
            <li>Hotovost</li>
            <li>Platební karty</li>
            <li>QR platbu</li>
          </ul>

          <p className="mt-6 font-heading text-[13px] font-normal uppercase tracking-[0.26em] text-gold">
            Storno podmínky
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-ink/68">
            Změna nebo zrušení termínu je zdarma do 48 hodin předem. Při zrušení méně než 24 hodin před termínem nebo při nedostavení se
            záloha propadá.
          </p>

          <div className="mt-8">
            <Link href="/rezervace" className="btn-gold inline-flex items-center justify-center px-8 min-h-[44px]">
              <span>Rezervovat termín</span>
            </Link>
          </div>
        </section>
      </div>

      <p className="mt-10 text-sm leading-relaxed text-ink/52">
        Zaměření: vyhoření, deprese, úzkosti, nespavost, ADHD (dospělí i děti), autismus (podpora),
        chronická bolest, kognitivní výkon, OCD/PTSD.
      </p>

      <CtaButtons className="mt-12" />
    </PageShell>
  );
}
