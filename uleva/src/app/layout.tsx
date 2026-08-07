import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AiAssistant } from "@/components/AiAssistant";
import { AuthProvider } from "@/lib/auth";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
  axes: ["SOFT", "WONK"],
});

export const metadata: Metadata = {
  title: "MamaSOS — ověřená pomoc pro maminky",
  description:
    "Najdi blízko sebe ověřenou pečující s volným termínem. Úleva doma, dula nebo laktace. Bez předplatného — platíš jen rezervaci.",
  metadataBase: new URL("https://mamasos.cz"),
  icons: {
    icon: "/brand/mamasos-mark.svg",
    apple: "/brand/mamasos-icon.png",
  },
  openGraph: {
    title: "MamaSOS — ověřená pomoc pro maminky",
    description:
      "Úklid, vaření, sourozenci, dula nebo laktace. Rezervace s kalendářem po celé ČR.",
    locale: "cs_CZ",
    type: "website",
    images: [{ url: "/media/hero-mamasos-v2.png", width: 1680, height: 942 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${outfit.variable} ${fraunces.variable} h-full`}
    >
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
