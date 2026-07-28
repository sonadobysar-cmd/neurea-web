import type { Metadata } from "next";
import { Cursor } from "@/components/Cursor";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "FLAX · Tiny houses se surovým teplem",
    template: "%s · FLAX",
  },
  description:
    "Tiny House FLAX — surové dřevo, teplý kámen, domov na kolech. Interaktivní konfigurátor a česká dílna.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "FLAX · Tiny houses se surovým teplem",
    description: "Surové dřevo. Teplý kámen. Domov na kolech.",
    type: "website",
    locale: "cs_CZ",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className="grain">
        <Cursor />
        <ScrollReveal />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
