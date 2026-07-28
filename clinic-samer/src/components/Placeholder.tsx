export function Placeholder({
  label,
  mark = "CS",
  className = "",
}: {
  label: string;
  mark?: string;
  className?: string;
}) {
  return (
    <div className={`placeholder-shot ${className}`} data-label={label}>
      {mark ? (
        <span className="ph-mark" aria-hidden>
          {mark}
        </span>
      ) : null}
    </div>
  );
}
