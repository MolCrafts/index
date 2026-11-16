import fs from "node:fs";
import path from "node:path";
import { ecosystemCategories } from "../src/lib/ecosystem.ts";
import { HOME_DESCRIPTION, en as homeCopy } from "../src/lib/home/copy/en.ts";

/**
 * Writes `/llms.txt` with the homepage positioning, product tasks and source links.
 *
 * Generated from `ecosystem.ts` rather than hand-written, so the roster cannot drift away
 * from what the site itself renders.
 */

const SITE = "https://molcrafts.org";

export const generateLlmsTxt = (distDir: string) => {
  const lines: string[] = [
    "# MolCrafts",
    "",
    "> Standardizing Materials R&D for the AI Era.",
    `> ${HOME_DESCRIPTION}`,
    "",
    "Choose tools for your current task. Some research workflows use connected products.",
    "",
    `## ${homeCopy.whatWeDo.title}`,
    homeCopy.whatWeDo.lead,
    ...homeCopy.whatWeDo.pillars.map((pillar) => `- ${pillar.title}: ${pillar.body}`),
    "",
    `## ${homeCopy.assist.title.subject} ${homeCopy.assist.title.action}`,
    homeCopy.assist.subline,
    "",
  ];

  for (const category of ecosystemCategories) {
    lines.push(`## ${category.title} — ${category.blurb}`, "");
    for (const item of category.items) {
      const bits = [`- **${item.title}** (${item.role}): ${item.description}`];
      if (item.status) bits.push(`  Status: ${item.status}`);
      bits.push(`  Source: ${item.href}`);
      lines.push(...bits, "");
    }
  }

  lines.push(
    `## ${homeCopy.participate.title.plain} ${homeCopy.participate.title.accent}`,
    "",
    ...Object.values(homeCopy.participate.paths).map((item) => `- ${item.statement} ${item.line}`),
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
