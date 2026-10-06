// Renders teaser/index.html to an MP4, frame by frame.
// Usage: node teaser/render.mjs [out.mp4] [--stills 1,4,8]
// Needs Playwright (Chromium) and ffmpeg on PATH.
import { execSync, spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  ({ chromium } = createRequire(`${execSync("npm root -g").toString().trim()}/`)("playwright"));
}

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const stillsIdx = args.indexOf("--stills");
const stills = stillsIdx >= 0 ? args[stillsIdx + 1].split(",").map(Number) : null;
const out = resolve(args.find((a, i) => !a.startsWith("--") && i !== stillsIdx + 1) ?? join(here, "molcrafts-teaser-15s.mp4"));
const FPS = 30, DURATION = 15;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
await page.goto(`${pathToFileURL(join(here, "index.html")).href}?capture`);
await page.evaluate(() => window.teaserReady);
const canvas = page.locator("#c");

if (stills) {
  const dir = join(here, "stills");
  mkdirSync(dir, { recursive: true });
  for (const t of stills) {
    await page.evaluate((t) => window.renderFrame(t), t);
    await canvas.screenshot({ path: join(dir, `t${t.toFixed(2)}.png`) });
  }
  console.log(`stills → ${dir}`);
} else {
  const tmp = mkdtempSync(join(tmpdir(), "teaser-"));
  const total = FPS * DURATION;
  for (let i = 0; i < total; i++) {
    await page.evaluate((t) => window.renderFrame(t), i / FPS);
    await canvas.screenshot({ path: join(tmp, `f${String(i).padStart(4, "0")}.png`) });
  }
  await new Promise((ok, fail) => {
    const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-framerate", String(FPS), "-i", join(tmp, "f%04d.png"),
      "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out], { stdio: "inherit" });
    ff.on("exit", (code) => (code === 0 ? ok() : fail(new Error(`ffmpeg exited ${code}`))));
  });
  rmSync(tmp, { recursive: true, force: true });
  console.log(`video → ${out}`);
}
await browser.close();
