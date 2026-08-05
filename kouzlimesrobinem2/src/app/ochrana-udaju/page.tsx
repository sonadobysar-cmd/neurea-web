import type { Metadata } from "next";
import { LegalPageView } from "@/components/LegalPageView";
import { readSiteContent } from "@/lib/cms/store";
import "./privacy.css";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů | Kouzlíme s Robinem",
  description:
    "Informace o zpracování osobních údajů při poptávce přes web Kouzlíme s Robinem.",
  alternates: { canonical: "/ochrana-udaju" },
  robots: { index: true, follow: true },
};

export const dynamic = "force-dynamic";

export default async function PrivacyPage() {
  const content = await readSiteContent();
  return <LegalPageView page={content.legal.privacy} />;
}
