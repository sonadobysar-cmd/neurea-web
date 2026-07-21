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
const DURATION = 30;
const TOTAL_FRAMES = FPS * DURATION;

const QA_FRAMES = [
  { name: "01-hook.png", frame: Math.round(1.4 * FPS) },
  { name: "02-price.png", frame: Math.round(3.8 * FPS) },
  { name: "03-mock-gloss.png", frame: Math.round(6.6 * FPS) },
  { name: "04-mock-reality.png", frame: Math.round(9.4 * FPS) },
  { name: "05-mock-void.png", frame: Math.round(12.2 * FPS) },
  { name: "06-mock-lume.png", frame: Math.round(15.0 * FPS) },
  { name: "07-mock-matcha.png", frame: Math.round(17.8 * FPS) },
  { name: "08-mock-rokyne.png", frame: Math.round(20.6 * FPS) },
  { name: "09-mock-vini.png", frame: Math.round(23.4 * FPS) },
  { name: "10-filter.png", frame: Math.round(25.8 * FPS) },
  { name: "11-cta.png", frame: Math.round(28.5 * FPS) },
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

console.log("Waiting for fonts & videos…");
await page.waitForFunction(() => document.fonts.ready.then(() => true));
await page.waitForFunction(() => {
  const videos = [...document.querySelectorAll("video.mock-vid")];
  return videos.length === 7 && videos.every((v) => v.readyState >= 2);
}, { timeout: 90_000 });
await page.waitForTimeout(800);

await page.evaluate(() => {
  document.getAnimations().forEach((a) => a.pause());
  document.querySelectorAll("video").forEach((v) => {
    v.pause();
    v.currentTime = 0;
  });
});

function syncFrame(timeMs) {
  return page.evaluate((ms) => {
    document.getAnimations().forEach((a) => {
      a.currentTime = ms;
    });

    document.querySelectorAll("video.mock-vid").forEach((v) => {
      const sceneStart = Number(v.dataset.sceneStart || 0) * 1000;
      const sceneEnd = Number(v.dataset.sceneEnd || 0) * 1000;
      const localMs = ms - sceneStart;
      const dur = v.duration && Number.isFinite(v.duration) ? v.duration : 3.5;

      if (localMs < 0 || ms > sceneEnd) {
        v.currentTime = 0;
        return;
      }

      const windowMs = sceneEnd - sceneStart;
      const progress = Math.min(Math.max(localMs / windowMs, 0), 1);
      v.currentTime = Math.min(progress * dur, Math.max(dur - 0.04, 0));
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
