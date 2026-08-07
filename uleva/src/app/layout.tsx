import type { Metadata } from "next";
import { Fraunces, Sora } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin", "latin-ext"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "MamaSOS — ověřená pomoc pro maminky po porodu",
  description:
    "Najdi blízko sebe ověřenou ženu s volným termínem. Úleva doma, dula nebo laktační poradkyně. Stejná služba, stejná cena. Bez předplatného.",
  metadataBase: new URL("https://mamasos.cz"),
  openGraph: {
    title: "MamaSOS — když potřebuješ úlevu teď",
    description:
      "Ověřená poporodní pomoc s reálným kalendářem. Rezervace bez dopisování po celé ČR.",
    locale: "cs_CZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${sora.variable} ${fraunces.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
