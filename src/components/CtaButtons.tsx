import Link from "next/link";

type Props = {
  className?: string;
  reserveHref?: string;
};

export function CtaButtons({ className = "", reserveHref = "/rezervace" }: Props) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <Link href={reserveHref} className="btn-gold px-7">
        <span>Rezervovat</span>
      </Link>
      <Link href="/jak-to-funguje" className="btn-outline-gold px-7">
        <span>Jak to funguje</span>
      </Link>
    </div>
  );
}
