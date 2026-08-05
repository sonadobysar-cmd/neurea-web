import type { Metadata } from "next";
import { Cursor } from "@/components/Cursor";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteFooter } from "@/components/SiteFooter";
import { brand } from "@/data/content";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const title = "Chatky na kolech · Moderní tiny house na kolech";
const description =
  "Moderní tiny house na kolech z přírodního dřeva. Nový dům na míru, renovace, Airbnb i kempy. Sestavte si návrh a orientační cenu online.";
const ogImage = "/media/hero/hero-forest-dusk.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s · Chatky na kolech",
  },
  description,
  keywords: [
    "tiny house",
    "tiny house na kolech",
    "mobilní domek na kolech",
    "dřevostavba na kolech",
    "chatky na kolech",
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
    "Výroba tiny houses na homologovaném podvozku — nové domy na míru, renovace, Airbnb jednotky a rekonstrukce kempů.",
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
      <body className="grain">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Cursor />
        <ScrollReveal />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
