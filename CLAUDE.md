# molcrafts-index

Brand site for MolCrafts. CF Pages project `index` → `molcrafts.org` (`MolCrafts/index` @ `master`).

## Stack

React 18 + TS strict, Rsbuild, Biome, Tailwind v4, Radix/shadcn UI, Framer Motion. Routing: `src/lib/routes.ts` + `PRODUCT_PAGES` in `App.tsx` (no react-router).

## Layout

```
src/components/     product UI (PascalCase)
  ui/               shadcn primitives — do not edit
src/pages/{product}/{Product}Landing.tsx
src/lib/routes.ts   PRODUCT_SLUGS, pathProductSlug
src/lib/ecosystem.ts  nav/footer catalog
src/lib/productAccents.ts  per-product marketing colors only
src/styles/brand-tokens.css  brand anchors (must match theme tokens.css)
src/styles/tailwind.css      maps anchors → shadcn CSS vars
```

## Brand tokens (manual sync)

No package link to the docs theme. Files must be **byte-identical**:

| This repo | Sibling |
|-----------|---------|
| `src/styles/brand-tokens.css` | `molcrafts-zensical-theme/.../stylesheets/tokens.css` |

Copy the whole file when either side changes. Cyan is display-only; buttons use forest.

Drift check (if both checkouts sit under `molcrafts/`):

```bash
cd ../molcrafts-zensical-theme && uv run --extra dev tox -e py
```

## Rules

1. New product: wire `routes.ts`, `App.tsx` `PRODUCT_PAGES`, `pages/index.ts`, `ecosystem.ts`, `og-meta.ts`, `sitemap.xml`; accents in `productAccents.ts` if needed.
2. `className` via `cn()` from `@/lib/utils`.
3. Reuse `src/lib/animations.ts` variants; add new ones there.
4. No `console.log`, secrets, `any`, or hand-edits under `src/components/ui/`.
5. Do not bulk-reindent mixed tabs/spaces.

## URLs

- Product: `molcrafts.org/<product>/`
- Docs: `docs.molcrafts.org/<product>/`
- Apps: `app.molcrafts.org/<product>/`

## Gate

`/verify` → `npm run lint` + `npm run typecheck`.
