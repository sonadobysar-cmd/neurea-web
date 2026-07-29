"use client";

import Image from "next/image";

/** SA monogram with integrated fertility symbol — AI-generated mark */
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
      width={96}
      height={96}
      className={className}
      priority
    />
  );
}
