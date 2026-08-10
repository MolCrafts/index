import fs from "node:fs";
import path from "node:path";
import { ecosystemCategories } from "../src/lib/ecosystem.ts";
import { PACKAGE_INSTALL } from "../src/lib/packages.ts";

/**
 * Writes `/llms.txt` — a flat, plain-text answer to "what does MolCrafts publish and how do
 * I install it".
 *
 * The site is client-side rendered: the built HTML carries head metadata and an empty body,
 * so a crawler that does not execute JavaScript sees roughly 30 words per route and none of
 * the catalog. This file closes that gap for LLM crawlers at no runtime cost.
 *
 * Generated from `ecosystem.ts` rather than hand-written, so the roster cannot drift away
 * from what the site itself renders.
 */

const SITE = "https://molcrafts.org";

const productSlug = (href: string) =>
  href.startsWith("/") ? href.slice(1) : href.split("/").pop() || "";

export const generateLlmsTxt = (distDir: string) => {
  const lines: string[] = [
    "# MolCrafts",
    "",
    "> Open-source infrastructure for molecular simulation: packages for building and",
    "> running workflows, keeping every result reusable across people, tools, and agents.",
    "",
    "Each package installs and runs on its own — taking one does not pull in the rest.",
    "They share one record format, so one tool's output is input to the next.",
    "",
  ];

  for (const category of ecosystemCategories) {
    lines.push(`## ${category.title} — ${category.blurb}`, "");
    for (const item of category.items) {
      const slug = productSlug(item.href);
      const install = PACKAGE_INSTALL[slug]?.command;
      const bits = [`- **${item.title}** (${item.role}): ${item.description}`];
      if (install) bits.push(`  Install: \`${install}\``);
      else if (item.status) bits.push(`  Status: ${item.status} — no published package yet.`);
      if (!item.external) bits.push(`  Page: ${SITE}/${slug}/`);
      bits.push(`  Docs: https://docs.molcrafts.org/${slug}/`);
      lines.push(...bits, "");
    }
  }

  lines.push(
    "## Common questions",
    "",
    "- **Do I have to adopt all of them?** No. Every package installs independently.",
    "- **MolPy or MolRs — which do I install?** MolPy. It depends on MolRs. MolRs stands",
    "  alone only if you are writing Rust or running in the browser.",
    "- **Licensing.** BSD-3-Clause on every package except MolQ, which is MIT.",
    "",
    "## Links",
    "",
    `- Site: ${SITE}/`,
    "- Docs: https://docs.molcrafts.org/",
    "- Source: https://github.com/MolCrafts",
    "- Contact: hello@molcrafts.org",
    "",
  );

  const target = path.join(distDir, "llms.txt");
  fs.writeFileSync(target, lines.join("\n"), "utf8");
  process.stdout.write(
    `  llms.txt (${ecosystemCategories.flatMap((c) => c.items).length} packages)\n`,
  );
};
