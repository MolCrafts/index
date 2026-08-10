/**
 * Product landing routes for the brand site.
 * Single registry used by App routing (no long if-chain).
 */
export const PRODUCT_SLUGS = [
  "molpy",
  "molrs",
  "molpack",
  "molnex",
  "molrec",
  "molexp",
  "molq",
  "molvis",
  "molcfg",
  "mollog",
  "atomiverse",
] as const;

export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

export function pathProductSlug(pathname: string): ProductSlug | null {
  const slug = pathname.split("/").filter(Boolean)[0]?.toLowerCase();
  if (!slug) return null;
  return (PRODUCT_SLUGS as readonly string[]).includes(slug) ? (slug as ProductSlug) : null;
}

/** Quick links shown on 404 and empty states. */
export const FEATURED_LINKS = [
  { href: "/", label: "Home" },
  { href: "/molpy", label: "MolPy" },
  { href: "/atomiverse", label: "Atomiverse" },
  { href: "/molvis", label: "MolVis" },
  { href: "/molrs", label: "MolRs" },
  { href: "https://docs.molcrafts.org/", label: "Docs", external: true },
] as const;
