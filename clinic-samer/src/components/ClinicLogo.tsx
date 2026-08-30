"use client";

import Image from "next/image";

/** Quiet, modern SA monogram that follows the original lilac identity. */
export function ClinicLogo({
  className = "",
  title = "Clinic Samer",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <Image
      src="/logo.svg"
      alt={title}
      width={120}
      height={120}
      className={className}
      priority
    />
  );
}
