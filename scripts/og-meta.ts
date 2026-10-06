import { readFileSync } from "node:fs";

// Share previews read the same source swatches as the website.
const styles = readFileSync(new URL("../src/styles/tailwind.css", import.meta.url), "utf8");
const swatch = (name: string) => {
  const value = styles.match(new RegExp(`--home-${name}:\\s*(#[0-9a-f]{6})`, "i"))?.[1];
  if (!value) throw new Error(`Missing homepage swatch: ${name}`);
  return value;
};
const mix = (a: string, b: string, amount: number) =>
  `#${[1, 3, 5]
    .map((index) =>
      Math.round(
        Number.parseInt(a.slice(index, index + 2), 16) * (1 - amount) +
          Number.parseInt(b.slice(index, index + 2), 16) * amount,
      )
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;

export const OG_PALETTE = { blue: swatch("blue"), green: swatch("green"), white: swatch("white") };
export const OG_SURFACE = mix(OG_PALETTE.green, "#000000", 0.9);

export interface OgRoute {
  path: string;
  slug: string;
  kicker: string;
  title: string;
  subtitle: string;
  gradient: [string, string, string];
  subGradient: [string, string, string];
  ogTitle: string;
  ogDescription: string;
}

export const routes: OgRoute[] = [
  {
    path: "/",
    slug: "index",
    kicker: "Molecular and materials R&D",
    title: "MolCrafts",
    subtitle: "Scientific computing, AI applications, and research collaboration",
    gradient: [OG_PALETTE.blue, mix(OG_PALETTE.blue, OG_PALETTE.white, 0.55), OG_PALETTE.blue],
    subGradient: [OG_PALETTE.green, mix(OG_PALETTE.green, OG_PALETTE.white, 0.3), OG_PALETTE.green],
    ogTitle: "MolCrafts – Molecular and materials R&D",
    ogDescription:
      "Open-source tools for molecular modeling, simulation, machine learning, and AI-assisted research workflows.",
  },
];
