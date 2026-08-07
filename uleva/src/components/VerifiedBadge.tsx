import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

export function VerifiedBadge({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <Link
      href="/bezpecnost"
      className="verified-badge"
      title="Co znamená ověření MamaSOS"
    >
      <span className="verified-badge__mark" aria-hidden>
        <svg viewBox="0 0 32 32" fill="none">
          <path
            d="M6.5 24V9.2c0-.7.8-1.1 1.35-.7L16 14.8l8.15-6.3c.55-.4 1.35 0 1.35.7V24"
            stroke="currentColor"
            strokeWidth="2.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 14.8V24"
            stroke="currentColor"
            strokeWidth="2.35"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {compact ? "Ověřená MamaSOS" : "Ověřená MamaSOS"}
    </Link>
  );
}
