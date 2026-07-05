import { MagicCanvas } from "@/components/robin/MagicCanvas";
import { MagicMindGame } from "@/components/robin/MagicMindGame";
import { RobinContact } from "@/components/robin/RobinContact";
import { RobinFooter } from "@/components/robin/RobinFooter";
import { RobinGallery } from "@/components/robin/RobinGallery";
import { RobinHero } from "@/components/robin/RobinHero";
import { RobinMarquee } from "@/components/robin/RobinMarquee";
import { RobinNav } from "@/components/robin/RobinNav";
import { RobinPerformances } from "@/components/robin/RobinPerformances";
import { RobinPricing } from "@/components/robin/RobinPricing";
import { RobinServices } from "@/components/robin/RobinServices";
import { ScrollReveal } from "@/components/robin/ScrollReveal";
import { robinSite } from "@/lib/robinSite";
import Image from "next/image";

export function RobinLandingView() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: robinSite.name,
    description: robinSite.description,
    url: robinSite.url,
    telephone: robinSite.phone,
    email: robinSite.email,
    image: `${robinSite.url}/robin/IMG_0872.jpg`,
    priceRange: "$$",
    areaServed: { "@type": "Country", name: "Czech Republic" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Praha",
      addressCountry: "CZ",
    },
    founder: {
      "@type": "Person",
      name: robinSite.magician,
      jobTitle: "Kouzelník, balonkář a mentalista",
    },
    sameAs: [robinSite.url],
    knowsAbout: ["Kouzelnické představení", "Balonkové tvoření", "Mentalismus", "Mikromagie"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MagicCanvas />
      <div className="robin-landing relative min-h-[100dvh] overflow-x-hidden text-white">
        <RobinNav />
        <RobinHero />

        <RobinMarquee />

        <MagicMindGame />

        <RobinServices />

        {/* About — colorful split */}
        <section className="robin-section-orange relative skew-y-[-1deg] py-24 md:py-32">
          <div className="skew-y-[1deg]">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 md:px-8">
              <ScrollReveal>
                <div className="relative rotate-[-3deg] overflow-hidden rounded-[2rem] border-4 border-black shadow-[10px_10px_0_#000]">
                  <Image
                    src="/robin/IMG_0584.jpg"
                    alt="Kouzelník Robin Panuš interaktivně vystupuje s plyšovým mývalcem"
                    width={600}
                    height={600}
                    className="aspect-square w-full object-cover"
                  />
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <h2 className="font-robin-display text-4xl font-black uppercase text-black md:text-6xl">
                  Robin Panuš
                </h2>
                <p className="mt-6 text-lg font-medium leading-relaxed text-black/85">
                  Profesionální kouzelník, balonkář a mentalista. Vystupuji na narozeninách, ve
                  školách, na firemních akcích i svatbách — po celé Praze a ČR.
                </p>
                <p className="mt-4 text-lg font-medium leading-relaxed text-black/85">
                  Moje show nejsou pasivní — diváci kouzla spolutvoří. A na webu si můžeš rovnou
                  vyzkoušet, jak mentalismus funguje.
                </p>
                <a
                  href="#hra"
                  className="mt-8 inline-flex rounded-2xl border-4 border-black bg-black px-6 py-3 font-black uppercase text-robin-gold shadow-[5px_5px_0_#333]"
                >
                  Zkus kouzlo ↑
                </a>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <RobinPerformances />
        <RobinGallery />
        <RobinPricing />
        <RobinContact />
        <RobinFooter />
      </div>
    </>
  );
}
