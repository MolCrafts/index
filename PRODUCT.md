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

MolCrafts is a company, and this is its commercial website, not the page of an open-source organization. Open source is how the software is built and how a visitor can start; it is not the category.

Published claim, from the approved homepage copy: "Standardizing Materials R&D for the AI Era." The foundation line is "Open infrastructure for molecular science." The hero carries the wordmark and the claim only.

The hero is always centred on the MolCrafts wordmark. Nothing on that screen may pull attention from it: no product visualization, no buttons, no second focal point.

Market and method are different words on purpose. The market is materials R&D. The method is molecular computation. The page uses "materials" for who it serves and "molecular" for what the software does.

Eight products appear on the homepage: MolPy, MolPack, MolVis, MolAb, MolNex, Atomiverse, MolQ and Tack. MolPy prepares models; MolPack generates initial configurations; MolVis supports inspection and editing; MolAb connects workflows, runs and findings; MolNex trains models; Atomiverse runs simulations; MolQ submits and tracks jobs; Tack helps people plan research and review findings with AI. This is a browsing order, not a required pipeline. MolRs, MolHub and MolRec support the product line.

What a neighboring catalog could not copy, in three parts:

1. Shared conventions connect supported research tools. This is what "standardizing" means on this site; it does not claim universal compatibility or industry adoption.
2. Built for AI assistance. AI helps with research tasks; researchers keep the scientific judgment. Do not claim that every action is recorded or that AI verifies scientific conclusions.
3. Three ways in: use the open-source tools, build together, or deploy in-house. Contact for the commercial paths is hello@molcrafts.org, written out on the Collaboration screen.

The alternatives a visitor compares against are a patchwork of single-purpose tools joined by scripts, or a closed commercial suite. Do not name either on the page.

## Operating Context

One scrolling homepage. Product slugs redirect to their GitHub repositories. The public menu lists the shipping applications; MolCfg, MolLog, MolRec, and MolMCP stay off that menu.

A visitor either explores the tools or writes to the team. Local development is `npm run dev` (Rsbuild, http://localhost:3000/).

## Capabilities and Constraints

The site is a React / TypeScript client. Rsbuild serves a generated HTML shell; there is no committed `index.html`. Production output is `dist/`.

Locales: English, Chinese, Swedish. English stays the source.

Foundation copy lives in `src/lib/home/copy/foundation.ts`. It describes Open source, Interoperability, and Extensibility, with no pillar numbering or pillar labels. The section marker remains 01 / FOUNDATION.

The homepage presents the company's software, computational R&D, methods and integration services across molecular and materials research. Keep this company-wide scope; do not add illustrative projects or industry-specific demonstrations. Each product has one short description. Preserve the original page density: English product descriptions use 5–8 words, each section lead is one short sentence or phrase, and statements remain short. Public copy names the task; implementation details and operational prerequisites stay in product documentation. Narrow a claim instead of adding long qualifications. Mobile uses unboxed text selectors and one active product name, status and description, without a duplicate catalog below it. No pill selectors, filled panels, card borders or internal dividers.

## Brand Commitments

Name: MolCrafts. Mark: `src/assets/moko.svg`.

Personality, confirmed: precise, open, editorial. Quiet confidence. Researchers stay in control; AI assists.

The public homepage is the product surface. Design there is the thing being shipped.

Motion leads the eye, confirmed: every moving light travels in the order its screen is read and ends on what the reader should look at next. Details: `docs/homepage-visual-motion-spec.md`.

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

WCAG 2.2 AA for text contrast and keyboard access.

Motion always runs, decided 2026-11-12: it carries the reading order of each screen, so the site keeps it on under the system “reduce motion” setting. It stays slow and continuous, one light per line at a breathing pace, with no flashing.

Ship English, Chinese, and Swedish with the same claims.
