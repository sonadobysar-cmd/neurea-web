import Link from "next/link";

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
      {compact ? "Ověřená MamaSOS" : "Ověřená MamaSOS"}
    </Link>
  );
}
