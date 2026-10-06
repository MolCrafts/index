import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { routes } from "./og-meta.ts";
import { OgCard } from "./og-template.tsx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const bodyDir = path.join(projectRoot, "node_modules/@fontsource/dm-sans/files");

const loadFont = (file: string) => fs.readFileSync(path.join(file));

const fonts = [
  {
    name: "DM Sans",
    data: loadFont(path.join(bodyDir, "dm-sans-latin-400-normal.woff")),
    weight: 400 as const,
    style: "normal" as const,
  },
  {
    name: "DM Sans",
    data: loadFont(path.join(bodyDir, "dm-sans-latin-600-normal.woff")),
    weight: 600 as const,
    style: "normal" as const,
  },
  {
    name: "DM Sans",
    data: loadFont(path.join(bodyDir, "dm-sans-latin-700-normal.woff")),
    weight: 700 as const,
    style: "normal" as const,
  },
  {
    name: "DM Sans",
    data: loadFont(path.join(bodyDir, "dm-sans-latin-400-italic.woff")),
    weight: 400 as const,
    style: "italic" as const,
  },
];

export const generateOgImages = async (outDir: string) => {
  fs.mkdirSync(outDir, { recursive: true });

  for (const route of routes) {
    const svg = await satori(OgCard(route), {
      width: 1200,
      height: 630,
      fonts,
    });

    const png = new Resvg(svg, {
      fitTo: { mode: "width", value: 1200 },
    })
      .render()
      .asPng();

    const outPath = path.join(outDir, `${route.slug}.png`);
    fs.writeFileSync(outPath, png);
    process.stdout.write(`  og ${route.slug}.png\n`);
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const target = path.join(projectRoot, "dist/og");
  generateOgImages(target).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
