import Image from "next/image";

/** Bespoke AI-generated S/A signet paired with the original restrained wordmark. */
export function ClinicLogo({
  className = "",
  title = "Clinic Samer",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <span className={`clinic-logo-lockup ${className}`} role="img" aria-label={title}>
      <span className="clinic-ai-mark" aria-hidden="true">
        <Image
          src="/clinic-samer-ai-mark.png"
          alt=""
          width={1254}
          height={1254}
          priority
        />
      </span>
      <span className="clinic-wordmark" aria-hidden="true">
        <span className="clinic-wordmark-kicker">Clinic</span>
        <span className="clinic-wordmark-name">Samer</span>
      </span>
    </span>
  );
}
