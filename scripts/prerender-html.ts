import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ecosystemCategories, ecosystemItems } from "../src/lib/ecosystem.ts";
import { PACKAGE_INSTALL } from "../src/lib/packages.ts";
import { type OgRoute, routes } from "./og-meta.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const SITE = "https://molcrafts.org";

const escapeAttr = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const replaceMeta = (
  html: string,
  match: { attr: "property" | "name"; key: string },
  content: string,
) => {
  // Match: <meta property="og:title" content="..."> OR <meta name="og:title" content="...">
  // Case: attr value quoted, content attr in either order.
  const escaped = content.replace(/"/g, "&quot;");
  const pattern = new RegExp(`<meta\\s+[^>]*${match.attr}=["']${match.key}["'][^>]*>`, "i");
  const replacement = `<meta ${match.attr}="${match.key}" content="${escaped}">`;
  if (pattern.test(html)) return html.replace(pattern, replacement);
  // Inject just before </head> if missing
  return html.replace(/<\/head>/i, `${replacement}</head>`);
};

const replaceTitle = (html: string, title: string) =>
  html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeAttr(title)}</title>`);

/** rsbuild emits a bare <html>. Without lang, assistive tech and translation guess. */
const setLang = (html: string, lang: string) =>
  /<html[^>]*\slang=/i.test(html)
    ? html
    : html.replace(/<html([^>]*)>/i, `<html$1 lang="${lang}">`);

/**
 * Cloudflare Pages serves `/molpy/` and 308-redirects `/molpy`. Publishing the bare form
 * in og:url and the sitemap made every product URL a redirect hop, so the canonical form
 * carries the trailing slash.
 */
const canonicalUrl = (routePath: string) =>
  routePath === "/" ? `${SITE}/` : `${SITE}${routePath.replace(/\/$/, "")}/`;

/** There was no canonical link on any route. Insert one, or replace an existing one. */
const setCanonical = (html: string, url: string) => {
  const tag = `<link rel="canonical" href="${escapeAttr(url)}">`;
  const existing = /<link[^>]*rel=["']canonical["'][^>]*>/i;
  if (existing.test(html)) return html.replace(existing, tag);
  return html.replace(/<\/head>/i, `${tag}</head>`);
};

const escapeHtml = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Fills `<div id="root">` with real prose.
 *
 * The app is client-side rendered, so every built page shipped an empty body: about thirty
 * crawler-visible words per route, all of it head metadata. Google executes JavaScript;
 * most LLM crawlers do not, so none of the argument — the roster, the roles, the layers —
 * was reachable by the tools that increasingly decide whether a project gets recommended.
 *
 * React's createRoot clears the container on mount, so this is replaced the moment the
 * bundle runs. Users never see it, except as something better than a blank screen while
 * the bundle downloads.
 */
const rootContent = (route: OgRoute) => {
  const parts: string[] = [`<h1>${escapeHtml(route.title)}</h1>`];
  parts.push(`<p>${escapeHtml(route.kicker)}</p>`);
  // Several routes open their description with the subtitle verbatim; printing both
  // would hand a crawler the same sentence twice.
  if (!route.ogDescription.startsWith(route.subtitle)) {
    parts.push(`<p>${escapeHtml(route.subtitle)}</p>`);
  }
  parts.push(`<p>${escapeHtml(route.ogDescription)}</p>`);

  if (route.path === "/") {
    for (const category of ecosystemCategories) {
      parts.push(`<h2>${escapeHtml(category.title)}</h2>`);
      parts.push(`<p>${escapeHtml(category.blurb)}</p>`);
      const items = category.items
        .map((i) => {
          const status = i.status ? ` (${escapeHtml(i.status)})` : "";
          const href = i.href.startsWith("/") ? `${i.href}/` : i.href;
          return `<li><a href="${escapeAttr(href)}"><strong>${escapeHtml(i.title)}</strong></a> — ${escapeHtml(i.role)}${status}. ${escapeHtml(i.description)}</li>`;
        })
        .join("");
      parts.push(`<ul>${items}</ul>`);
    }
  } else {
    const slug = route.slug;
    const item = ecosystemItems.find((i) => i.href === `/${slug}`);
    if (item) parts.push(`<p>${escapeHtml(item.role)} — ${escapeHtml(item.description)}</p>`);
    const pkg = PACKAGE_INSTALL[slug];
    if (pkg?.command) parts.push(`<p>Install: <code>${escapeHtml(pkg.command)}</code></p>`);
    else if (pkg?.note) parts.push(`<p>${escapeHtml(pkg.note)}</p>`);
    parts.push(
      `<p><a href="https://docs.molcrafts.org/${escapeAttr(slug)}/">Documentation</a> · <a href="https://github.com/MolCrafts">Source on GitHub</a> · <a href="/#projects">All MolCrafts packages</a></p>`,
    );
  }
  return `<main>${parts.join("")}</main>`;
};

const setRootContent = (html: string, route: OgRoute) =>
  html.replace(
    /(<div id="root"[^>]*>)(\s*)(<\/div>)/i,
    (_m, open, _ws, close) => `${open}${rootContent(route)}${close}`,
  );

const buildHtml = (shell: string, route: OgRoute) => {
  const url = canonicalUrl(route.path);
  const image = `${SITE}/og/${route.slug}.png`;

  let html = shell;
  html = setLang(html, "en");
  html = setCanonical(html, url);
  html = setRootContent(html, route);
  html = replaceTitle(html, route.ogTitle);
  html = replaceMeta(html, { attr: "name", key: "description" }, route.ogDescription);
  html = replaceMeta(html, { attr: "property", key: "og:title" }, route.ogTitle);
  html = replaceMeta(html, { attr: "property", key: "og:description" }, route.ogDescription);
  html = replaceMeta(html, { attr: "property", key: "og:url" }, url);
  html = replaceMeta(html, { attr: "property", key: "og:image" }, image);
  html = replaceMeta(html, { attr: "property", key: "og:image:alt" }, route.ogTitle);
  html = replaceMeta(html, { attr: "name", key: "twitter:title" }, route.ogTitle);
  html = replaceMeta(html, { attr: "name", key: "twitter:description" }, route.ogDescription);
  html = replaceMeta(html, { attr: "name", key: "twitter:image" }, image);
  return html;
};

export const prerenderHtml = (distDir: string) => {
  const shellPath = path.join(distDir, "index.html");
  const shell = fs.readFileSync(shellPath, "utf8");

  for (const route of routes) {
    const html = buildHtml(shell, route);
    const outPath = route.path === "/" ? shellPath : path.join(distDir, route.slug, "index.html");
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html);
    process.stdout.write(`  html ${route.path === "/" ? "index" : route.slug}/index.html\n`);
  }

  /**
   * Without a 404.html, Cloudflare Pages falls back to the SPA shell and answers every
   * unknown path with `200 text/html` — a soft 404. Crawlers then index garbage paths, and
   * probes for files that do not exist (`/llms.txt` before it existed, `/pricing.md`) come
   * back looking like real pages. Shipping this file makes those responses a real 404.
   */
  let notFound = shell;
  notFound = setLang(notFound, "en");
  notFound = setCanonical(notFound, `${SITE}/404`);
  notFound = replaceTitle(notFound, "Page not found – MolCrafts");
  notFound = replaceMeta(
    notFound,
    { attr: "name", key: "description" },
    "That page does not exist. Browse the MolCrafts packages instead.",
  );
  notFound = replaceMeta(notFound, { attr: "name", key: "robots" }, "noindex, follow");
  fs.writeFileSync(path.join(distDir, "404.html"), notFound);
  process.stdout.write("  html 404.html\n");
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const target = path.join(projectRoot, "dist");
  prerenderHtml(target);
}
