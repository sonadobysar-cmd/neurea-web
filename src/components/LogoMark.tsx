import { site } from "@/lib/site";

/**
 * Logo v hero — čistý obrázek bez stínů a rámečků (dle brandu).
 */
export function LogoMark({
  className = "h-[min(56vw,16rem)] w-[min(56vw,16rem)] sm:h-[min(48vw,18rem)] sm:w-[min(48vw,18rem)]",
}: {
  className?: string;
}) {
  const { width, height } = site.heroSymbolSize;

  return (
    // eslint-disable-next-line @next/next/no-img-element -- asset z public/
    <img
      src={site.heroSymbolUrl}
      alt="NEUREA"
      width={width}
      height={height}
      className={`max-h-[min(70vh,22rem)] object-contain ${className}`.trim()}
      decoding="async"
      draggable={false}
      fetchPriority="high"
    />
  );
}
