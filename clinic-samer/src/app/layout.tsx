import type { Metadata } from "next";
import { Noto_Sans_Arabic, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const display = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clinic-samer.vercel.app"),
  title: "MUDr. Samer Asad · Gynekologie & IVF",
  description: "Diskrétní gynekologická péče a IVF v Praze.",
  icons: {
    icon: "/clinic-samer-ai-mark.png",
    apple: "/clinic-samer-ai-mark.png",
  },
  openGraph: {
    title: "Clinic Samer",
    description: "Gynekologie · IVF · Praha",
    type: "website",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "Clinic Samer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clinic Samer",
    description: "Gynekologie · IVF · Praha",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body className={`${display.variable} ${sans.variable} ${arabic.variable}`}>
        {children}
      </body>
    </html>
  );
}
