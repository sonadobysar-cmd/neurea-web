import type { Metadata } from "next";
import Image from "next/image";
import { CtaButtons } from "@/components/CtaButtons";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "O nás",
};

export default function ONasPage() {
  return (
    <PageShell>
      <p className="eyebrow">O nás</p>
      <h1 className="mt-4 font-display text-4xl font-normal tracking-tight text-ink md:text-5xl">
        O nás
      </h1>
      <div className="mt-12 glass-panel-strong p-9 md:p-11">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          {/* Fotka: světlý rámeček, aby se hodila k prosvětlenému panelu */}
          <div className="flex justify-center md:justify-start">
            <div className="rounded-[1.25rem] border border-gold/25 bg-white/70 p-2 shadow-glow-gold">
              <div className="relative overflow-hidden rounded-[1.1rem]">
                {/* Nahraj fotku č. 4 (bílá košile) do public/ pod tímto názvem */}
                <Image
                  src="/portraits/o-nas-nia.jpg"
                  alt="Nia Dobyšar"
                  width={720}
                  height={900}
                  className="h-[320px] w-[240px] object-cover md:h-[420px] md:w-[280px]"
                  priority
                />
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-6">
              <p className="text-[15px] leading-relaxed text-ink/72">
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

              <div className="pt-2">
                <h3 className="font-display text-[18px] font-light text-ink">Proč Neurea?</h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="font-heading text-[13px] font-normal uppercase tracking-[0.26em] text-gold">
                      Objektivní data
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink/72">
                      Pomocí diagnostiky HRV (variability srdečního rytmu) vidíme přesný stav vaší nervové soustavy v reálném čase.
                      Nemusíme se spoléhat jen na to, jak se cítíte – my to změříme.
                    </p>
                  </div>

                  <div>
                    <p className="font-heading text-[13px] font-normal uppercase tracking-[0.26em] text-gold">
                      Moderní technologie
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink/72">
                      Využíváme metody jako transkraniální stimulace (tDCS/tACS), fotobiomodulace mozku nebo kardiální elektrostimulace (CES).
                      Jde o postupy s vysokou úspěšností (např. až 94,6 % u klinického zlepšení depresí), které využívají instituce jako Harvard Medical School nebo armáda USA.
                    </p>
                  </div>

                  <div>
                    <p className="font-heading text-[13px] font-normal uppercase tracking-[0.26em] text-gold">
                      Neuro-somatická synergie
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink/72">
                      Propojujeme stimulaci mozku s manuální myofasciální terapií. Uvolněním fascií mechanicky dekomprimujeme bloudivý nerv (nervus vagus),
                      což okamžitě aktivuje regenerační procesy těla – výsledek vidíte v datech hned po sezení.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <h3 className="font-display text-[18px] font-light text-ink">Co řešíme</h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="font-heading text-[13px] font-normal uppercase tracking-[0.26em] text-gold">
                      Dospělí (25–45 let)
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink/72">
                      Vyhoření, chronický stres, úzkosti, nespavost, deprese, chronické bolesti a další.
                    </p>
                  </div>

                  <div>
                    <p className="font-heading text-[13px] font-normal uppercase tracking-[0.26em] text-gold">
                      Děti
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink/72">
                      ADHD, úzkosti a autismus. Nabízíme bezpečnou cestu bez vedlejších účinků medikace, podloženou studiemi o zlepšení pozornosti
                      a kognitivní flexibility.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gold/30">
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
