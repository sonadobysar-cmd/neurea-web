import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AiAssistant } from "@/components/AiAssistant";
import { AuthProvider } from "@/lib/auth";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  axes: ["SOFT", "WONK"],
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
    <html lang="cs" className={`${jakarta.variable} ${fraunces.variable} h-full`}>
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
