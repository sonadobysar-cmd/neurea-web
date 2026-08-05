import { LuxuryLanding } from "@/components/LuxuryLanding";
import { renderLuxuryBody } from "@/lib/cms/render";
import { readSiteContent } from "@/lib/cms/store";
import { luxuryBodyTemplate } from "@/lib/luxuryBody";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await readSiteContent();
  const html = renderLuxuryBody(content, luxuryBodyTemplate);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://kouzlimesrobinem2.vercel.app/#robin",
        name: "Robin Panuš",
        jobTitle: "Kouzelník, balónkář a mentalista",
        url: "https://kouzlimesrobinem2.vercel.app/",
        image: "https://kouzlimesrobinem2.vercel.app/luxury/img-01.jpg",
        telephone: content.contact.phoneDisplay,
        email: content.contact.email,
      },
      {
        "@type": "Service",
        "@id": "https://kouzlimesrobinem2.vercel.app/#kouzelnicka-show",
        name: "Kouzelnická show Robina Panuše",
        serviceType: "Kouzelnická show, mentalismus a balónková zvířátka",
        provider: { "@id": "https://kouzlimesrobinem2.vercel.app/#robin" },
        areaServed: { "@type": "Country", name: "Česká republika" },
        audience: [
          { "@type": "Audience", audienceType: "Děti a rodiny" },
          { "@type": "Audience", audienceType: "Školy, firmy a pořadatelé akcí" },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <LuxuryLanding html={html} marquee={content.marquee} />
    </>
  );
}
