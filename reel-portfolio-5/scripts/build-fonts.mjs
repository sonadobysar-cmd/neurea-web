import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const fonts = [
  {
    family: "Bodoni Moda",
    weight: 700,
    style: "normal",
    url: "https://raw.githubusercontent.com/google/fonts/main/ofl/bodonimoda/BodoniModa%5Bopsz%2Cwght%5D.ttf",
  },
  {
    family: "Bodoni Moda",
    weight: 700,
    style: "italic",
    url: "https://raw.githubusercontent.com/google/fonts/main/ofl/bodonimoda/BodoniModa-Italic%5Bopsz%2Cwght%5D.ttf",
  },
  {
    family: "Outfit",
    weight: 300,
    style: "normal",
    url: "https://raw.githubusercontent.com/google/fonts/main/ofl/outfit/Outfit%5Bwght%5D.ttf",
  },
  {
    family: "Outfit",
    weight: 600,
    style: "normal",
    url: "https://raw.githubusercontent.com/google/fonts/main/ofl/outfit/Outfit%5Bwght%5D.ttf",
  },
  {
    family: "Outfit",
    weight: 800,
    style: "normal",
    url: "https://raw.githubusercontent.com/google/fonts/main/ofl/outfit/Outfit%5Bwght%5D.ttf",
  },
];

const blocks = [];
for (const font of fonts) {
  const res = await fetch(font.url);
  if (!res.ok) throw new Error(`Font download failed: ${font.url} (${res.status})`);
  const b64 = Buffer.from(await res.arrayBuffer()).toString("base64");
  blocks.push(`@font-face {
  font-family: '${font.family}';
  font-style: ${font.style};
  font-weight: ${font.weight};
  src: url(data:font/ttf;base64,${b64}) format('truetype');
}`);
  console.log(`✓ ${font.family} ${font.style} ${font.weight}`);
}

writeFileSync(join(root, "fonts.css"), blocks.join("\n\n") + "\n");
console.log("fonts.css written");
