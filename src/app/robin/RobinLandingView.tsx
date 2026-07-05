import { MagicCanvas } from "@/components/robin/MagicCanvas";
import { RobinContact } from "@/components/robin/RobinContact";
import { RobinFooter } from "@/components/robin/RobinFooter";
import { RobinGallery } from "@/components/robin/RobinGallery";
import { RobinHero } from "@/components/robin/RobinHero";
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
      <div className="robin-landing relative min-h-[100dvh] overflow-x-hidden bg-robin-dark text-white">
        <RobinNav />
        <RobinHero />

        <RobinServices />

        {/* About strip */}
        <section className="relative py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <ScrollReveal>
                <div className="relative aspect-square max-w-lg overflow-hidden rounded-3xl border border-white/10">
                  <Image
                    src="/robin/IMG_0584.jpg"
                    alt="Kouzelník Robin Panuš interaktivně vystupuje s plyšovým mývalcem"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-robin-gold">O mně</p>
                <h2 className="mt-3 font-robin-display text-4xl font-black uppercase text-white md:text-5xl">
                  Robin Panuš
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-white/65">
                  Jsem profesionální kouzelník, balonkář a mentalista. Vystupuji na narozeninových
                  oslavách, ve školách, na firemních akcích i svatbách po celé Praze a České
                  republice. Moje představení jsou interaktivní — diváci nejsou jen pozorovatelé,
                  ale spolutvůrci kouzel.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-white/65">
                  Každý program přizpůsobím věku publika, prostoru i charakteru akce. Ať už
                  hledáte zábavu pro děti, elegantní mikromagii pro dospělé, nebo kombinaci obojího
                  — společně vytvoříme nezapomenutelný zážitek.
                </p>
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
