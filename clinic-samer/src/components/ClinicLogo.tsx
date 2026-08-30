/** Typographic SA monogram — quiet, clinical and intentionally minimal. */
export function ClinicLogo({
  className = "",
  title = "Clinic Samer",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <span className={`clinic-monogram ${className}`} role="img" aria-label={title}>
      <span className="clinic-monogram-frame" aria-hidden="true">
        <span className="clinic-monogram-s">S</span>
        <span className="clinic-monogram-a">A</span>
        <span className="clinic-monogram-dot" />
      </span>
    </span>
  );
}
