import { RobinStage } from "@/components/robin/RobinStage";
import { robinSite } from "@/lib/robinSite";

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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RobinStage />
    </>
  );
}
