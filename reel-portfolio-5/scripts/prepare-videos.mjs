import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const assets = join(root, "assets");
const srcDir = "/Users/soni/Downloads/Návrh bez názvu-15";

/** ~5 s clip (20 s zdroje @ 4×) — stačí na delší ukázky */
const clips = [
  { n: 1, out: "web-01.mp4", take: 20, scale: "540:-2" },
  { n: 2, out: "web-02.mp4", take: 20, scale: "540:-2" },
  { n: 3, out: "web-03.mp4", take: 20, scale: "540:-2" },
  { n: 4, out: "web-04.mp4", take: 20, scale: "540:-2" },
  { n: 5, out: "web-05.mp4", take: 20, scale: "720:-2" },
  { n: 6, out: "web-06.mp4", take: 20, scale: "720:-2" },
  { n: 7, out: "web-07.mp4", take: 20, scale: "720:-2" },
];

const SPEED = 4;

if (!ffmpegPath) throw new Error("ffmpeg-static not found");
if (!existsSync(assets)) mkdirSync(assets, { recursive: true });

for (const clip of clips) {
  const input = join(srcDir, `${clip.n}.mp4`);
  const output = join(assets, clip.out);
  if (!existsSync(input)) throw new Error(`Missing: ${input}`);

  console.log(`→ ${clip.out} (${SPEED}×, first ${clip.take}s)…`);
  const r = spawnSync(
    ffmpegPath,
    [
      "-y",
      "-ss",
      "0.4",
      "-t",
      String(clip.take),
      "-i",
      input,
      "-vf",
      `setpts=PTS/${SPEED},scale=${clip.scale}`,
      "-an",
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      "-crf",
      "20",
      "-movflags",
      "+faststart",
      output,
    ],
    { stdio: "inherit" },
  );
  if (r.status !== 0) throw new Error(`ffmpeg failed for ${clip.out}`);
}

console.log("✓ All clips ready in assets/");
