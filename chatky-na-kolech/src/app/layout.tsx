import type { Metadata } from "next";
import { Cursor } from "@/components/Cursor";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Chatky na kolech · Moderní tiny house na kolech",
    template: "%s · Chatky na kolech",
  },
  description:
    "Moderní tiny house z teplého dřeva. Bydlení, Airbnb i výměna chatek v kempu. Homologovaná kola. Konfigurátor na chatkynakolech.cz.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Chatky na kolech · Moderní tiny house na kolech",
    description:
      "Teplé dřevo. Moderní střih. Svoboda přemístit dům. Pro bydlení, investice i kempy.",
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
