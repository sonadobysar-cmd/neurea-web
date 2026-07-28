import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";
import { SiteNav } from "@/components/SiteNav";
import { realizations } from "@/data/content";

export const metadata: Metadata = {
  title: "Realizace",
  description: "Vybrané tiny houses z naší dílny — projekty napříč Českem.",
};

export default function RealizacePage() {
  return (
    <>
      <SiteNav />
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Portfolio</p>
          <h1>Realizace</h1>
          <p>
            Domy, které už stojí na loukách, v lesích a na glampingových
            pozemcích. Každý s jiným charakterem — stejnou precizností.
          </p>
        </div>
      </header>

      <section className="section section-paper">
        <div className="wrap">
          <div className="gallery">
            {realizations.map((r, i) => {
              const span = i === 0;
              const tall = i === 3 || i === 5;
              return (
                <figure
                  key={r.id}
                  className={`gallery-item reveal${span ? " span-2" : ""}${
                    tall ? " tall" : ""
                  }`}
                >
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    sizes={span ? "100vw" : "(max-width:700px) 100vw, 50vw"}
                  />
                  <figcaption>
                    <div>
                      <h3>{r.title}</h3>
                      <span>
                        {r.place} · {r.year}
                      </span>
                    </div>
                    <span>{r.tag}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          <div className="mt-3" style={{ textAlign: "center" }}>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                marginBottom: "1.25rem",
              }}
            >
              Chcete být další na seznamu?
            </p>
            <Link href="/konfigurator" className="btn btn-ink btn-arrow">
              Sestavit svůj dům
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
