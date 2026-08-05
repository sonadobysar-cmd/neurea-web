import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteFooter } from "@/components/SiteFooter";
import { brand } from "@/data/content";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const title = "FLAX · Tiny houses na míru";
const description =
  "Navrhujeme a vyrábíme tiny houses na kolech přesně podle vašeho života, pozemku nebo podnikání. Vytvořte si vlastní zadání a orientační cenu online.";
const ogImage = "/media/v2/flax-hero.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s · FLAX",
  },
  description,
  keywords: [
    "tiny house",
    "tiny house na kolech",
    "mobilní domek na kolech",
    "dřevostavba na kolech",
    "FLAX tiny house",
    "tiny house na míru",
    "tiny house konfigurátor",
    "rekonstrukce kempu",
    "glamping jednotky",
  ],
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg" },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "cs_CZ",
    url: "/",
    siteName: brand.name,
    images: [{ url: ogImage, width: 1600, height: 1000, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: brand.name,
  description:
    "Zakázková výroba tiny houses na homologovaném podvozku pro bydlení, pronájem a rekonstrukce rekreačních areálů.",
  url: SITE_URL,
  image: `${SITE_URL}${ogImage}`,
  areaServed: "CZ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className="flax-site grain">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ScrollReveal />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
