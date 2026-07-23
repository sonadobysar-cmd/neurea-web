import { chromium } from "playwright";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";

const root = join(dirname(fileURLToPath(import.meta.url)));
const htmlPath = join(root, "index.html");
const framesDir = join(root, "frames");
const qaDir = join(root, "qa");
const outVideo = join(root, "reel.mp4");

const FPS = 24;
const DURATION = 28;
const TOTAL_FRAMES = FPS * DURATION;

const QA_FRAMES = [
  { name: "01-hook.png", frame: Math.round(1.6 * FPS) },
  { name: "02-for-you.png", frame: Math.round(5.2 * FPS) },
  { name: "03-how.png", frame: Math.round(10.5 * FPS) },
  { name: "04-free.png", frame: Math.round(16.2 * FPS) },
  { name: "05-offer.png", frame: Math.round(21.0 * FPS) },
  { name: "06-cta.png", frame: Math.round(26.0 * FPS) },
];

if (!ffmpegPath) {
  throw new Error("ffmpeg-static binary not found");
}

for (const dir of [framesDir, qaDir]) {
  if (existsSync(dir)) rmSync(dir, { recursive: true });
  mkdirSync(dir, { recursive: true });
}

console.log("Launching Chromium…");
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1080, height: 1920 },
  deviceScaleFactor: 1,
});

await page.goto(`file://${htmlPath}`, { waitUntil: "load" });
await page.waitForTimeout(800);

await page.evaluate(() => {
  document.getAnimations().forEach((a) => a.pause());
});

async function syncFrame(timeMs) {
  await page.evaluate((ms) => {
    document.getAnimations().forEach((a) => {
      a.currentTime = ms;
    });
  }, timeMs);
}

console.log(`Rendering ${TOTAL_FRAMES} frames @ ${FPS} fps (${DURATION}s)…`);
for (let i = 0; i < TOTAL_FRAMES; i++) {
  const ms = (i / FPS) * 1000;
  await syncFrame(ms);

  const frameFile = join(framesDir, `f${String(i).padStart(4, "0")}.png`);
  await page.screenshot({ path: frameFile, type: "png" });

  const qa = QA_FRAMES.find((q) => q.frame === i);
  if (qa) {
    await page.screenshot({ path: join(qaDir, qa.name), type: "png" });
  }

  if (i % 48 === 0 || i === TOTAL_FRAMES - 1) {
    console.log(`  frame ${i + 1}/${TOTAL_FRAMES} (${(ms / 1000).toFixed(2)} s)`);
  }
}

await browser.close();

console.log("Encoding MP4…");
const ffmpeg = spawnSync(
  ffmpegPath,
  [
    "-y",
    "-framerate",
    String(FPS),
    "-i",
    join(framesDir, "f%04d.png"),
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-crf",
    "17",
    "-movflags",
    "+faststart",
    outVideo,
  ],
  { stdio: "inherit" },
);

if (ffmpeg.status !== 0) {
  throw new Error(`ffmpeg exited with code ${ffmpeg.status}`);
}

console.log("\n✓ Video:", outVideo);
console.log("✓ QA snímky:");
for (const q of QA_FRAMES) {
  console.log(" ", join(qaDir, q.name));
}
