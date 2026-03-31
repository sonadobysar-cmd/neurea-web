import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { syncBookingPaymentFromSessionId } from "@/lib/stripeServer";

export const metadata: Metadata = {
  title: "Děkujeme za platbu",
};

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function DekujemePage({ searchParams }: Props) {
  const params = await searchParams;
  if (params.session_id) {
    try {
      await syncBookingPaymentFromSessionId(params.session_id);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <PageShell className="max-w-xl text-center">
      <p className="eyebrow">Platba</p>
      <h1 className="mt-4 font-display text-3xl font-normal tracking-tight text-ink md:text-4xl">
        Děkujeme
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-ink/60">
        Platba byla přijata a rezervace je potvrzena. Potvrzení je odesláno na uvedený e-mail.
      </p>
      <Link href="/rezervace" className="btn-secondary mt-8 inline-flex">
        <span>Zpět na rezervace</span>
      </Link>
    </PageShell>
  );
}
