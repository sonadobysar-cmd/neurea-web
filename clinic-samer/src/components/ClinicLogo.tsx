/** Restrained wordmark — no symbol, no decorative medical cliché. */
export function ClinicLogo({
  className = "",
  title = "Clinic Samer",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <span className={`clinic-wordmark ${className}`} role="img" aria-label={title}>
      <span className="clinic-wordmark-kicker" aria-hidden="true">Clinic</span>
      <span className="clinic-wordmark-name" aria-hidden="true">Samer</span>
    </span>
  );
}
