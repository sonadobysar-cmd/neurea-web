import type { Metadata } from "next";
import { Cursor } from "@/components/Cursor";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Chatky na kolech · Prémiové tiny houses",
    template: "%s · Chatky na kolech",
  },
  description:
    "Prémiové tiny houses na míru. Česká řemeslná výroba, homologovaný podvozek a interaktivní konfigurátor.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Chatky na kolech · Prémiové tiny houses",
    description:
      "Život ve dřevě. Na kolech. Navrženo přírodou, postaveno mistry.",
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
