import type { Metadata } from "next";
import { Manrope, Noto_Sans_Arabic, Syne } from "next/font/google";
import "./globals.css";

const display = Syne({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
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
  title: "MUDr. Samer Asad · Gynekologie & IVF",
  description: "Diskrétní gynekologická péče a IVF v Praze.",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
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
