"use client";

import Image from "next/image";

/** Luxury serif SA monogram with bloom */
export function ClinicLogo({
  className = "",
  title = "Clinic Samer",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <Image
      src="/logo-mark.png"
      alt={title}
      width={120}
      height={120}
      className={className}
      priority
    />
  );
}
