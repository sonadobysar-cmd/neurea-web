import type { Metadata } from "next";
import { Cormorant_Garamond, Sora } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AiAssistant } from "@/components/AiAssistant";
import { AuthProvider } from "@/lib/auth";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin", "latin-ext"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MamaSOS — ověřená pomoc pro maminky po porodu",
  description:
    "Najdi blízko sebe ověřenou ženu s volným termínem. Úklid, pohlídání, dula nebo laktace. Stejná služba, stejná cena. Bez předplatného.",
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
    <html lang="cs" className={`${sora.variable} ${cormorant.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <AiAssistant />
        </AuthProvider>
      </body>
    </html>
  );
}
