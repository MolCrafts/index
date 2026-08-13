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

The repository has no automated unit, integration, or browser test runner.
The current non-mutating gate is `npm run lint && npm run typecheck`; the
`mol_project.build.test` command intentionally mirrors that established gate
until a test suite exists.

## Harness decisions

- 2026-08-10: Adopted the full Mol project contract at stage `experimental`.
- 2026-08-10: Kept local Claude agents, skills, and settings untracked while
  versioning `.claude/notes/` and `.claude/specs/`.
- 2026-08-13: Reframed `/` as the MolCrafts commercial company homepage.
  Homepage-specific locks live in `.agents/product-marketing.md`: gradient text
  and glow remain; hero product imagery is forbidden; imagery is reserved for
  the interactive Applications showcase; Docs and technical detail are absent
  from every homepage surface; collaboration and Contact are the main conversion.
