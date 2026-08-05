import Link from "next/link";
import type { LegalPageContent } from "@/lib/cms/types";
import { escapeHtml } from "@/lib/cms/escape";

function renderInline(text: string, keyPrefix: string) {
  if (text.includes("{{privacy-link}}")) {
    const [before = "", after = ""] = text.split("{{privacy-link}}");
    return (
      <p key={keyPrefix}>
        {before}
        <Link href="/ochrana-udaju">Ochrana osobních údajů</Link>
        {after}
      </p>
    );
  }

  return <p key={keyPrefix}>{text}</p>;
}

function renderBody(body: string, sectionKey: string) {
  return body
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, blockIndex) => {
      const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
      const key = `${sectionKey}-${blockIndex}`;

      if (lines.length > 0 && lines.every((line) => line.startsWith("- "))) {
        return (
          <ul key={key}>
            {lines.map((line, lineIndex) => (
              <li key={`${key}-${lineIndex}`}>{line.slice(2)}</li>
            ))}
          </ul>
        );
      }

      return lines.map((line, lineIndex) => renderInline(line, `${key}-${lineIndex}`));
    });
}

export function LegalPageView({ page }: { page: LegalPageContent }) {
  return (
    <main className="privacy-page">
      <div className="privacy-wrap">
        <p className="privacy-back">
          <Link href="/#kontakt">← Zpět na web</Link>
        </p>
        <h1>{escapeHtml(page.title)}</h1>
        <p className="privacy-lead">{escapeHtml(page.lead)}</p>

        {page.sections.map((section, index) => (
          <section key={`${section.heading}-${index}`}>
            <h2>{escapeHtml(section.heading)}</h2>
            {renderBody(section.body, `s${index}`)}
          </section>
        ))}

        <p className="privacy-updated">{escapeHtml(page.updated)}</p>
      </div>
    </main>
  );
}
