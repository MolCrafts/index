import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "@rstest/core";
import { ecosystemItems } from "@/lib/ecosystem";
import { PACKAGE_INSTALL } from "@/lib/packages";
import { PRODUCT_ACCENTS } from "@/lib/productAccents";
import { PRODUCT_SLUGS } from "@/lib/routes";
import { routes as ogRoutes } from "../../scripts/og-meta";

/**
 * A product page is registered across seven surfaces. CLAUDE.md forbids updating
 * only some of them ("Never partially register a product page"), which is exactly
 * the kind of mistake nothing else in the toolchain catches: a missing entry is
 * valid TypeScript and builds green, it just renders a 404 or a blank OG card.
 */

const ROOT = resolve(__dirname, "../..");
const read = (rel: string) => readFileSync(resolve(ROOT, rel), "utf8");

describe("product page registration", () => {
  for (const slug of PRODUCT_SLUGS) {
    it(`${slug} has an accent entry`, () => {
      expect(Object.keys(PRODUCT_ACCENTS)).toContain(slug);
    });

    it(`${slug} has an install entry`, () => {
      expect(Object.keys(PACKAGE_INSTALL)).toContain(slug);
    });

    it(`${slug} has an ecosystem entry linking to its route`, () => {
      expect(ecosystemItems.find((i) => i.href === `/${slug}`)).toBeDefined();
    });

    it(`${slug} has an OG route so its social card renders`, () => {
      expect(ogRoutes.map((r) => r.slug)).toContain(slug);
    });

    it(`${slug} is exported from the page barrel`, () => {
      expect(read("src/pages/index.ts")).toContain(`/${slug}/`);
    });

    it(`${slug} is wired into the App route map`, () => {
      // App.tsx builds Record<ProductSlug, ComponentType>; a missing key is a 404.
      expect(read("src/App.tsx")).toMatch(new RegExp(`\\b${slug}:\\s*\\w+Landing`));
    });
  }
});

describe("catalog integrity", () => {
  it("has no accent entry for a product that is not routed", () => {
    const routed = new Set<string>(PRODUCT_SLUGS);
    expect(Object.keys(PRODUCT_ACCENTS).filter((k) => !routed.has(k))).toEqual([]);
  });

  it("points every internal ecosystem link at a real route", () => {
    const routed = new Set<string>(PRODUCT_SLUGS);
    const broken = ecosystemItems
      .filter((i) => !i.external && i.href.startsWith("/"))
      .map((i) => i.href)
      .filter((href) => href !== "/" && !routed.has(href.replace(/^\//, "")));
    expect(broken).toEqual([]);
  });

  it("gives every ecosystem item the copy the homepage renders", () => {
    const incomplete = ecosystemItems
      .filter((i) => !i.title || !i.role || !i.description || !i.color)
      .map((i) => i.href);
    expect(incomplete).toEqual([]);
  });

  it("keeps ecosystem entries unique by href", () => {
    const hrefs = ecosystemItems.map((i) => i.href);
    expect(hrefs).toEqual([...new Set(hrefs)]);
  });
});
