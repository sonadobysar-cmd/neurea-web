import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ScreeningRunner } from "@/components/screening/ScreeningRunner";
import { getScreening } from "@/lib/screenings";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getScreening(slug);
  if (!s) return {};
  return { title: `${s.title} — screening` };
}

export function generateStaticParams() {
  return [
    { slug: "deprese" },
    { slug: "uzkost" },
    { slug: "insomnie" },
    { slug: "adhd" },
    { slug: "adhd-deti" },
  ];
}

export default async function ScreeningPage({ params }: Props) {
  const { slug } = await params;
  if (!getScreening(slug)) notFound();

  return <ScreeningRunner slug={slug} />;
}
