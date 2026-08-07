import type { Metadata } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AiAssistant } from "@/components/AiAssistant";
import { AuthProvider } from "@/lib/auth";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const bodoni = Bodoni_Moda({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "MamaSOS",
  description:
    "Ověřená pečující u vás doma. Úleva, dula nebo laktace — s volným termínem.",
  metadataBase: new URL("https://mamasos.cz"),
  icons: {
    icon: "/brand/mamasos-icon.png",
    apple: "/brand/mamasos-icon.png",
  },
  openGraph: {
    title: "MamaSOS",
    description: "Pomoc, když to jako máma nestíháš.",
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
      className={`${manrope.variable} ${bodoni.variable} h-full`}
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
