import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./luxury.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kouzlimesrobinem2.vercel.app"),
  title: "Kouzlíme s Robinem — kouzelník, balónkář a mentalista | Praha",
  description:
    "Kouzelnická show, balónková zvířátka a mentalismus pro dětské oslavy, školky i firemní akce v Praze a okolí. Robin Panuš — 11 let na jevišti.",
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    title: "Kouzlíme s Robinem — kouzelník, balónkář a mentalista",
    description:
      "Kouzelnická show, balónková zvířátka a mentalismus pro dětské oslavy, školky i firemní akce v Praze a okolí.",
    images: [{ url: "/luxury/img-01.jpg", width: 800, height: 1000, alt: "Kouzelník Robin Panuš" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}
