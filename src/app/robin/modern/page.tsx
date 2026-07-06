import type { Metadata } from "next";
import { RobinModernLanding } from "@/components/robin/RobinModernLanding";
import { robinSite } from "@/lib/robinSite";
import "../robin-modern.css";

export const metadata: Metadata = {
  title: "Kouzlíme s Robinem — moderní náhled",
  description: robinSite.description,
  robots: { index: false, follow: false },
};

/** Alternativní / experimentální verze webu — ne hlavní produkce. */
export default function RobinModernPage() {
  return <RobinModernLanding />;
}
