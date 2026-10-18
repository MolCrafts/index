# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two visitors carry equal weight.

Researchers in molecular and materials R&D who need to see what the open-source stack does and where a piece of work starts.

Partners and R&D leads who need to see how to work with MolCrafts: use the tools, build together, or deploy in-house.

They arrive at molcrafts.org. English is the source copy. Chinese and Swedish ship from that English.

## Product Purpose

MolCrafts is open infrastructure for molecular and materials computation: scientific computing, AI-assisted research, and collaboration, from property prediction through long-running work with a team.

The homepage's job is the argument. A visit succeeds when the foundation lands and the visitor leaves convinced, whether or not they open a repo or start a conversation.

The page holds both jobs at once: choosing a tool, and seeing a path into collaboration or an in-house deployment.

## Positioning

Published claim, from the approved homepage copy: "Standardizing Materials R&D for the AI Era." The foundation line is "Open infrastructure for molecular science."

The mechanism a neighboring catalog could not copy is the stack plus the three confirmed ways in: use the open-source tools, build together, or deploy in-house. Contact for the commercial paths is hello@molcrafts.org.

## Operating Context

One scrolling homepage. Product slugs redirect to their GitHub repositories. The public menu lists the shipping applications; MolCfg, MolLog, MolRec, and MolMCP stay off that menu.

A visitor either explores the tools or writes to the team. Local development is `npm run dev` (Rsbuild, http://localhost:3000/).

## Capabilities and Constraints

The site is a React / TypeScript client. Rsbuild serves a generated HTML shell; there is no committed `index.html`. Production output is `dist/`.

Locales: English, Chinese, Swedish. English stays the source.

Foundation copy lives in `src/lib/home/copy/foundation.ts`. It describes Open source, Interoperability, and Extensibility, with no pillar numbering or pillar labels. The section marker remains 01 / FOUNDATION.

The homepage presents the company's software, computational R&D, methods and integration services across molecular and materials research. Keep this company-wide scope; do not add illustrative projects or industry-specific demonstrations. Each product has one description. Mobile uses unboxed text selectors and one active product name, status and description, without a duplicate catalog below it. No pill selectors, filled panels, card borders or internal dividers.

## Brand Commitments

Name: MolCrafts. Mark: `src/assets/moko.svg`.

Personality, confirmed: precise, open, editorial. Quiet confidence. Researchers stay in control; AI assists.

The public homepage is the product surface. Design there is the thing being shipped.

Binding constraint, confirmed: no framed card dashboard. The Foundation screen stays open typography. Filled panels, bordered tiles, and card grids do not stand in for the argument.

Shared color anchors live in `src/styles/brand-tokens.css` and are kept in sync with the docs theme by hand.

## Evidence on Hand

Approved copy: `src/lib/home/copy/`. Catalog: `src/lib/ecosystem.ts`. Sponsor acknowledgment is a homepage section fed by `src/lib/home/data.ts`.

Do not invent customers, quotes, benchmarks, pricing, or license claims beyond the MIT license on this repo.

## Product Principles

1. The argument is the page. Conviction comes before the click.
2. Hold both doors open at equal weight: start with the tools, or start a project.
3. Name the thing the software does. Leave the buzzword layer out.
4. Researchers stay in control of the science. AI assists the work; it does not make the decision.

## Accessibility & Inclusion

WCAG 2.2 AA. That covers text contrast, keyboard access, and a real reduced-motion path.

Ship English, Chinese, and Swedish with the same claims.
