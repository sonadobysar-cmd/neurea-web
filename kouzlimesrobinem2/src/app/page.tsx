import { LuxuryLanding } from "@/components/LuxuryLanding";
import { renderLuxuryBody } from "@/lib/cms/render";
import { readSiteContent } from "@/lib/cms/store";
import { luxuryBodyTemplate } from "@/lib/luxuryBody";
import { getSiteUrl } from "@/lib/siteUrl";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await readSiteContent();
  const html = renderLuxuryBody(content, luxuryBodyTemplate);
  const siteUrl = getSiteUrl();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#robin`,
        name: "Robin Panuš",
        jobTitle: "Kouzelník, balónkář a mentalista",
        url: `${siteUrl}/`,
        image: `${siteUrl}/luxury/img-01.jpg`,
        telephone: content.contact.phoneDisplay,
        email: content.contact.email,
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#kouzelnicka-show`,
        name: "Kouzelnická show Robina Panuše",
        serviceType: "Kouzelnická show, mentalismus a balónková zvířátka",
        provider: { "@id": `${siteUrl}/#robin` },
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
        id="robin-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <LuxuryLanding html={html} marquee={content.marquee} />
    </>
  );
}
