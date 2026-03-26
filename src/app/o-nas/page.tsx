import type { Metadata } from "next";
import Image from "next/image";
import { CtaButtons } from "@/components/CtaButtons";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "O nás",
};

export default function ONasPage() {
  return (
    <PageShell variant="wide">
      <p className="eyebrow">O nás</p>
      <h1 className="mt-4 font-display text-4xl font-normal tracking-tight text-ink md:text-5xl">
        O nás
      </h1>
      <div className="mt-12 glass-panel-strong p-9 md:p-11">
        <div className="space-y-8 md:space-y-10">
          <p className="font-display text-[2.1rem] font-light leading-[1.08] tracking-[-0.03em] text-gold md:text-[2.6rem]">
            Terapie mluví. Neurea měří.
          </p>

          <p className="text-[15px] leading-relaxed text-ink/72">
            Většina lidí, kteří k nám přicházejí, už „kolečko“ u psychologa, psychiatra nebo neurologa absolvovala.
            Často slyšeli, že mají odpočívat, brát léky nebo o svých problémech více mluvit. My v Neurea věříme,
            že mluvení je jen polovina cesty. Tou druhou je neuro-somatická regulace – tedy přímá práce s nervovou
            soustavou podložená daty.
          </p>

          <p className="text-[15px] leading-relaxed text-ink/72">
            Jsme první a jediné neuro-somatické pracoviště svého druhu v České republice. Nejsme klasické
            zdravotnické zařízení, ale expertní poradenské pracoviště, které kombinuje nejmodernější klinicky
            ověřené technologie s hlubokou znalostí lidské fyziologie.
          </p>

          <div className="pt-6 md:pt-7">
            <h3 className="font-display text-[22px] md:text-[26px] font-light tracking-[-0.02em] text-gold uppercase">
              PROČ NEUREA?
            </h3>
            <div className="mt-6 space-y-6">
              <div>
                <p className="font-heading text-[13px] font-normal uppercase tracking-[0.26em] text-gold">
                  Objektivní data
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/72">
                  Pomocí diagnostiky HRV (variability srdečního rytmu) vidíme přesný stav vaší nervové soustavy v reálném čase.
                  Nemusíme se spoléhat jen na to, jak se cítíte – my to změříme.
                </p>
              </div>

              <div>
                <p className="font-heading text-[13px] font-normal uppercase tracking-[0.26em] text-gold">
                  Moderní technologie
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/72">
                  Využíváme metody jako transkraniální stimulace (tDCS/tACS), fotobiomodulace mozku nebo kardiální elektrostimulace (CES).
                  Jde o postupy s vysokou úspěšností (např. až 94,6 % u klinického zlepšení depresí), které využívají instituce jako Harvard Medical School nebo armáda USA.
                </p>
              </div>

              <div>
                <p className="font-heading text-[13px] font-normal uppercase tracking-[0.26em] text-gold">
                  Neuro-somatická synergie
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/72">
                  Propojujeme stimulaci mozku s manuální myofasciální terapií. Uvolněním fascií mechanicky dekomprimujeme bloudivý nerv (nervus vagus),
                  což okamžitě aktivuje regenerační procesy těla – výsledek vidíte v datech hned po sezení.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <h3 className="font-display text-[22px] md:text-[26px] font-light tracking-[-0.02em] text-ink uppercase">
              CO ŘEŠÍME
            </h3>
            <div className="mt-6 space-y-6">
              <div>
                <p className="font-heading text-[13px] font-normal uppercase tracking-[0.26em] text-gold">
                  Dospělí (25–45 let)
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/72">
                  Vyhoření, chronický stres, úzkosti, nespavost, deprese, chronické bolesti a další.
                </p>
              </div>

              <div>
                <p className="font-heading text-[13px] font-normal uppercase tracking-[0.26em] text-gold">
                  Děti
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/72">
                  ADHD, úzkosti a autismus. Nabízíme bezpečnou cestu bez vedlejších účinků medikace, podloženou studiemi o zlepšení pozornosti
                  a kognitivní flexibility.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gold/30">
            <div className="grid gap-10 md:grid-cols-[420px_1fr] md:items-start">
              {/* Fotka: přímo u sekce zakladatelky */}
              <div className="flex justify-center md:justify-start">
                <div className="rounded-[1.25rem] border border-gold/25 bg-white/70 p-3 shadow-glow-gold">
                  <div
                    className="relative overflow-hidden rounded-[1.1rem] h-[420px] w-[320px] md:h-[520px] md:w-[380px]"
                    aria-hidden
                  >
                    <Image
                      src="/portraits/o-nas-nia.png"
                      alt="Nia Dobyšar"
                      fill
                      sizes="(max-width: 768px) 320px, 380px"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>

              <div>
                <p className="eyebrow !text-[10px]">Zakladatelka</p>
                <h2 className="mt-4 font-display text-3xl font-normal text-ink">Nia Dobyšar</h2>
                <p className="mt-2 text-sm text-ink/50">
                  Neuro-somatická praktička se specializací na neuroplasticitu, myofascií a vagal toning.
                  Její vzdělání zahrnuje certifikace v NLP, KBT, krizové komunikaci a pokročilé tréninky pro práci s technologiemi,
                  které v Neurea používáme.
                </p>
                <blockquote className="mt-5 text-[15px] leading-relaxed text-ink/72">
                  &quot;Věřím, že cesta z úzkosti nebo vyhoření nemusí být nekonečná. Když přestaneme jen hádat a začneme měřit, cesta k výsledkům se dramaticky zkrátí.&quot;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CtaButtons className="mt-12" />
    </PageShell>
  );
}
