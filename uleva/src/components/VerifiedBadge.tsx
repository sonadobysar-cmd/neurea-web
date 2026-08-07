import Link from "next/link";
import { BadgeCheck } from "lucide-react";

export function VerifiedBadge({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <Link
      href="/bezpecnost"
      className="inline-flex items-center gap-1 rounded-full bg-[rgba(92,122,114,0.12)] px-2.5 py-1 text-[0.7rem] font-bold text-moss hover:bg-[rgba(92,122,114,0.18)]"
      title="Co znamená ověření MamaSOS"
    >
      <BadgeCheck className="h-3.5 w-3.5" />
      {compact ? "Ověřená MamaSOS" : "Ověřená MamaSOS"}
    </Link>
  );
}
