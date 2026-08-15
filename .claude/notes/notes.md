# Project notes

## Product

`molcrafts-index` is the commercial company and product website for MolCrafts.
The homepage establishes the brand, presents scientific capabilities and
Applications, and converts suitable research and enterprise interest into
collaboration. Cloudflare Pages project `index` serves `molcrafts.org` from the
`master` branch.

## Stack

- React 18 and strict TypeScript
- Rsbuild with static HTML prerendering
- Tailwind CSS v4 and Radix/shadcn UI primitives
- Framer Motion using shared variants
- Biome linting and `tsc --noEmit` type checking

## Application layout

- `src/components/`: shared product UI
- `src/components/ui/`: generated shadcn primitives
- `src/pages/{product}/{Product}Landing.tsx`: product landing pages
- `src/lib/routes.ts`: route parsing and product slugs
- `src/lib/ecosystem.ts`: navigation and footer product catalog
- `src/lib/productAccents.ts`: product-specific marketing accents
- `src/styles/brand-tokens.css`: brand anchors shared with the docs theme
- `src/styles/tailwind.css`: mapping from brand anchors to shadcn variables

## Public URL split

- Product marketing: `molcrafts.org/<product>/`
- Documentation: `docs.molcrafts.org/<product>/`
- Applications: `app.molcrafts.org/<product>/`

## Current verification

The non-mutating gate is `npm run lint && npm run typecheck && npm test`.
Rstest (`@rstest/core`) runs the unit suites under `tests/`; `npm run build`
additionally exercises the postbuild prerender and OG generation, which is the
only gate that covers `scripts/`. Both `lint` and `typecheck` cover `src/` and
`scripts/` — `scripts/` sat outside them once, and a copy-shape rename shipped a
build-breaking stale reference with the other two gates green.

`regressions/` is reserved for browser-driven checks and does not exist yet;
the homepage hot paths (fixed canvas, scroll-spy, the applications band) have
no automated guard.

## Harness decisions

- 2026-08-14: Ran the full-site visual audit against the operator's
  Apple-discipline brief; verdicts, the shared light-language direction, and
  work tracking live in `.claude/notes/visual-audit.md`. Capabilities (02) was
  rebuilt first: statement-scale heading, diagonal station cascade, and a
  drawn thread of light with constructed quarter-circle geometry
  (`src/lib/home/thread.ts`, unit-tested).

- 2026-08-14: Replaced the homepage fullpage pager with one continuously
  scrolling document. Each block is `min-h-svh` in normal flow; one fixed
  `MoleculeField` plus the hero's former glows became the page-wide background
  (`HomeAtmosphere`); scroll-spy and in-view gating replaced the pager's active
  index; `src/lib/home/stage.ts` holds the shared container/type/rule rungs and
  composes locale behaviour from `typeStyles.ts` rather than restating it.
  Applications was rebuilt as a six-entry band. Real product captures do not
  exist, so expanded entries carry brand panels — `.claude/notes/law.md` still
  forbids invented product UI, and no carve-out was recorded.

- 2026-08-10: Adopted the full Mol project contract at stage `experimental`.
- 2026-08-10: Kept local Claude agents, skills, and settings untracked while
  versioning `.claude/notes/` and `.claude/specs/`.
- 2026-08-13: Reframed `/` as the MolCrafts commercial company homepage.
  Homepage-specific locks live in `.agents/product-marketing.md`: gradient text
  and glow remain; hero product imagery is forbidden; imagery is reserved for
  the interactive Applications showcase; Docs and technical detail are absent
  from every homepage surface; collaboration's three routes are the conversion
  close, with no Contact screen.
