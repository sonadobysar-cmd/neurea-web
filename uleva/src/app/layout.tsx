import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AiAssistant } from "@/components/AiAssistant";
import { AuthProvider } from "@/lib/auth";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
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
    icon: "/brand/mamasos-icon.png",
    apple: "/brand/mamasos-icon.png",
  },
  openGraph: {
    title: "MamaSOS — ověřená pomoc pro maminky",
    description:
      "Úklid, vaření, sourozenci, dula nebo laktace. Rezervace s kalendářem po celé ČR.",
    locale: "cs_CZ",
    type: "website",
    images: [{ url: "/brand/mamasos-lockup.png", width: 1200, height: 630 }],
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
      className={`${jakarta.variable} ${fraunces.variable} h-full`}
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
