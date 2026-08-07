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
      className="verified-badge"
      title="Co znamená ověření MamaSOS"
    >
      <BadgeCheck className="h-3.5 w-3.5" />
      {compact ? "Ověřená MamaSOS" : "Ověřená MamaSOS"}
    </Link>
  );
}
