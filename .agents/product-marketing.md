# Product Marketing Context

**Document version:** v4
**Last updated:** 2026-08-09

> Canonical positioning for MolCrafts. Every marketing skill reads this file.
> It supersedes `.claude/product-marketing.superseded-2026-08-09.md`, which framed
> MolCrafts as an "open foundation" and explicitly forbade naming products on the
> homepage. That framing is retired — see Changelog.

## Product Overview

**One-liner:**
MolCrafts is open-source infrastructure for molecular simulation workflows — build the
system, run the engine, keep every run traceable, and hand the result to the next person
or agent without rebuilding it.

**What it does:**
MolCrafts is a family of open-source packages covering the whole path of a molecular
simulation: representing and building structures, packing systems, running engines,
training models, submitting cluster jobs, visualizing results, and recording all of it in
a portable format. Packages are independently installable — take one, or take the stack.
Every layer is designed so both humans and AI agents read and write the same records.

**Product category:**
Research software infrastructure for computational chemistry and materials science.
The shelf people search from is concrete and per-package, not organizational: "molecular
dynamics Python library", "packmol alternative", "SLURM job submission from Python",
"molecular viewer for Jupyter", "interatomic potential training framework". Nobody
searches for "open foundation".

**Product type:**
Multi-package open-source ecosystem across Python, Rust, C++/CUDA, and TypeScript.
Fourteen packages are public-facing; see Product roster. Licensing: see Proof Points.

**Business model:** — partially public. Read the boundary carefully.
Open core. The open track (community, academic users, students, developers) drives
adoption and scientific validation. A paid track (private R&D groups) covers private
deployment, custom integration, proprietary methods, and governance/audit.

Decided 2026-08-09, revised the same day. The site **does** name three routes in the
Participate section — Open source, Consulting, Enterprise — each stating who it is for and
what it covers. The site **does not** carry pricing, tier tables, packaged offerings, or a
dedicated enterprise page. Commercial detail stays in the investor deck and in private
conversation. If a future brief asks for a pricing page, that is a new decision, not an
extension of this one.

## Target Audience

**Target companies / institutions:**
Academic and national-lab research groups in computational chemistry, materials science,
and molecular modeling. Private R&D groups running simulation in-house. Scientific
software teams building on top of simulation stacks.

**Decision-makers:**
This is developer-adoption, not committee procurement. The person who decides is the
person who runs `pip install`. PI/lab-lead buy-in matters for standardizing a group on
the stack, but adoption starts bottom-up.

**Primary use case:**
Turning a molecular idea into computational evidence that someone else — a colleague,
a reviewer, a future self, or an agent — can rerun and trust.

**Jobs to be done:**
- Build and prepare a simulation system without hand-rolling setup scripts every time.
- Run work across engines and schedulers without rewriting the workflow for each.
- Keep parameters, environment, and provenance attached to results instead of lost.
- Make simulation output machine-actionable so tooling and agents can consume it.

**Use cases:**
- Prepare and pack a system, type it, and export a deck to a simulation engine.
- Submit and track the same job across a laptop and three different cluster schedulers.
- Train and compose machine-learned interatomic potentials without a monolithic ML repo.
- Inspect, measure, and replay trajectories in a browser, VS Code, or a notebook.
- Give an AI agent structured access to molecular records, APIs, and documentation.

## Personas

| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| Computational chemist / materials scientist | Getting to a defensible result | Setup and bookkeeping eat the time that should go to science | Less manual setup; results you can hand off intact |
| Method developer | Extending, not fighting, the stack | Monolithic libraries built around one preferred model resist extension | Separated layers that can be replaced one at a time |
| Research software engineer | Composability and maintenance cost | Every group reinvents glue between tools | Independently installable packages on shared contracts |
| AI / agent practitioner | Structured, machine-actionable state | Files first, structure later — agents get no clean surface | Records and agent APIs as first-class, not bolted on |
| Lab lead / sponsor | Seriousness, openness, longevity | Judging whether a project is real and maintained | Open source, published packages, visible development |

## Problems & Pain Points

**Core problem:**
The bottleneck is not running one simulation. It is making workflows reusable, traceable,
and scalable. Most molecular simulation work still runs as scripts, files, and manual
choices.

**Why alternatives fall short:**
- **Manual setup** — system building, force fields, packing, inputs, and analysis are
  reassembled by hand for every project.
- **Weak provenance** — parameters, environment, scheduler details, and manual choices are
  not attached to the result.
- **Poor workflow reuse** — work does not transfer across teams, molecule classes, or
  engines.
- **Not AI-ready** — files come first and structured records come later, so there is no
  clean surface for tooling or agents.

**What it costs them:**
Time spent on operations rather than science; results that cannot be reproduced or
defended; knowledge that dies with the project rather than compounding.

**Emotional tension:**
The quiet doubt about whether a result can actually be reproduced — and the knowledge that
the answer depends on a script nobody kept.

## Competitive Landscape

**Direct:** Single-purpose open-source packages that solve one stage well.
Falls short because the user still writes the glue between stages, and nothing carries
provenance across the boundaries.

**Secondary:** Commercial integrated simulation suites.
Falls short because methods are locked inside a proprietary stack, the science is not
inspectable, and extension is on the vendor's schedule.

**Indirect and by far the largest:** the lab's own accumulated scripts.
Falls short because it is invisible, unmaintained, and unshareable — but it is free, it
already exists, and it is what MolCrafts actually has to displace.

## Differentiation

**Key differentiators:**
- Modular by construction — take one package or the whole stack; nothing forces adoption
  of the rest.
- A record specification (MolRec) so tools read each other's output without guessing.
- Agent access designed in (MolMCP), not retrofitted onto a file-based workflow.
- Layers stay separable, so a scientific method can be replaced without rewriting the
  infrastructure under it.

**How we do it differently:**
Infrastructure first, methods second. The contracts between stages are the product; the
individual capabilities plug into them.

**Why that's better:**
Work compounds instead of being rebuilt. A structure, a run, or a result moves to the next
person — or agent — with its context intact.

**Why customers choose us:**
Open source and installable today; no lock-in at any layer; and it is the only stack in
this space designed from the start for humans and agents to share the same surface.

## Objections

| Objection | Response |
|-----------|----------|
| "Do I have to adopt all 17 things?" | No. Every package installs independently and is useful alone. Say this explicitly on the site — it is a real and frequent worry. |
| "Is this maintained, or a personal repo collection?" | Nine packages are published on PyPI, crates.io, and npm with CI. Point at the registries, not at adjectives. |
| "Why not use the tool I already have?" | You probably still can — the stack is built to compose, not replace. The gap it fills is what happens *between* tools. |
| "My scripts already work." | They do, until someone else needs to run them. The pitch is transfer and provenance, not raw capability. |
| "MolPy or MolRs — which do I install?" | MolPy. It depends on MolRs. MolRs stands alone only if you are writing Rust or running in the browser. Say this on both pages. |

**Anti-persona:**
Someone who needs a finished, GUI-driven, validated commercial application with support
SLAs today. Also: anyone looking for a single all-in-one simulation product — that is not
what this is, and pretending otherwise sets up a bad first experience.

## Switching Dynamics

**Push:** Setup and bookkeeping consuming the time meant for science; a result that cannot
be reproduced; a workflow that cannot be handed to a colleague.

**Pull:** Installable today; packages that do one thing; provenance that comes for free;
an agent-ready surface that does not exist elsewhere.

**Habit:** The existing pile of scripts works well enough for the person who wrote it, and
rewriting has no immediate payoff.

**Anxiety:** "Will this be maintained?" "Am I locking myself into someone's ecosystem?"
"Do I have to learn all of it?" — the last one is answered by modularity and should be
answered visibly.

## Customer Language

**How they describe the problem:**
- "I spend more time setting up the run than analyzing it."
- "I can't reproduce what I did six months ago."
- "Every group writes the same glue code."
- "I have to rewrite the submission script for every cluster."

**How they describe us:**
- Per-package and concrete: "the Python toolkit", "the Rust core", "the job queue",
  "the viewer". These are the words that already work — they come from `ecosystem.ts`
  role strings and they are the clearest writing in the repo.

**Words to use:**
Category nouns, always: library, package, toolkit, framework, engine, job queue, viewer,
data format, workflow platform. Concrete verbs: build, pack, run, submit, train, inspect,
record, install. Plain statements of fact: open source, BSD-3-Clause, on PyPI.

**Words to avoid:**
- "open foundation", "shared ground", "on common ground" — metaphors that replaced the
  category noun and caused this rewrite. Retired.
- "next-generation", "cutting-edge", "revolutionary", "seamless", "streamline",
  "unlock", "10x", "ship faster" — unprovable or SaaS-growth register.
- Poetic "The X" constructions ("The Atomistic Data Backbone").
- Named algorithms, force fields, distributions, or third-party libraries in marketing
  copy and snippets (Schulz–Zimm, OPLS, Packmol, Vega-Lite, matplotlib, MACE, Allegro).
  Category words only. Docs are where specifics belong.
- Binding a product to one capability (molpy ↔ polymers). Every product page must read as
  the general tool it is.
- Internal package names as explanation (`molix` / `molrep` / `molpot` / `molzoo` in a nav
  card or search snippet). Four unknowns do not explain one unknown.
- Editorial policy addressed to visitors ("we do not treat the homepage as a catalog",
  "the Projects menu lists every package", "without a funnel").

**Glossary:**
| Term | Meaning |
|------|---------|
| Application layer | Packages a scientist uses directly: MolPy, MolVis, MolNex, MolPack, MolExp |
| Infrastructure layer | Packages underneath: MolRs, MolCfg, MolLog, MolQ, MolMCP, MolHub |
| Specification layer | MolRec — the portable, machine-actionable record contract |
| Provenance | Parameters, environment, and choices travelling attached to a result |
| Agent-ready | Structured records and APIs an AI agent can read and write directly |
| FAIR | Findable, Accessible, Interoperable, Reusable. Expand it on first public use — never ship the bare acronym in a headline or meta description |

## Brand Voice

**Tone:** Calm, specific, scientific. Confident without hype. Never salesy, never coy.

**Style:** Short declarative sentences. Plain verbs. Concrete nouns before abstractions —
say what the thing is, then why it is built that way. Second person is allowed and
encouraged on product pages.

**Personality:** Precise · unpretentious · engineering-led · open · long-term.

**Register check:** if a sentence could appear on any B2B site in any industry, it is wrong.

## Proof Points

**Metrics:** None invented. Never state download counts, stars, citations, or user numbers
that are not measured.

**What is true and currently unused on the site** — every line below was checked against the
registry API on 2026-08-09, not against a README badge. Badges were wrong three times.
- Nine packages are published and installable today:
  `molcrafts-molpy`, `molcrafts-molrs`, `molcrafts-molpack`, `molcrafts-molq`,
  `molcrafts-molcfg`, `molcrafts-mollog`, `molcrafts-molmcp` (PyPI);
  `@molcrafts/molvis-core`, `@molcrafts/molplot` (npm).
- **Not published, despite earlier claims here:** `molexp` and `molnex` both 404 on PyPI.
  `@molcrafts/molvis-stage` does not exist — the npm package is `@molcrafts/molvis-core`.
  MolRec, MolHub and Atomiverse have no package under any name tried.
- crates.io could not be verified (API returns 403 to this client). Check before claiming.
- Open source throughout: BSD-3-Clause on every package except MolQ, which is MIT.
  The website repo is MIT. Do not write "BSD-3-Clause across the stack" — it is not true.
- CI running publicly on the package repos.
- Sponsor: Claude for Open Source.

**Maturity — state honestly, do not imply otherwise:**
- Atomiverse is pre-release. Docs are Doxygen-only and not yet on the site.
- MolNex is under active development; public APIs may change between minor releases.
- MolRec, MolHub, MolPlot, and MolMCP have no published package badge yet.

**Testimonials:** None. Do not fabricate.

**Value themes:**
| Theme | Proof |
|-------|-------|
| Installable today, not a proposal | Nine packages live on PyPI / crates.io / npm |
| Take one piece or the stack | Each package installs and runs independently |
| Built for agents as well as people | MolMCP and the MolRec record contract |
| Open all the way down | BSD-3-Clause, public CI, public development |

## Goals

**Business goal:** Adoption and scientific validation of the open stack. Enterprise
conversations follow adoption; they are not what the site sells.

**Conversion action (in priority order):**
1. Install a package, or open its docs at `docs.molcrafts.org/<product>/`.
2. Reach the GitHub repository for a specific package — not the bare org list.
3. For labs and companies: reach a human, via the Consulting or Enterprise route in
   Participate. The address lives in exactly one place, `src/lib/contact.ts`. It is still
   an unverified placeholder — confirm the real inbox before launch.

**Current metrics:** Not instrumented. No analytics found in the repo.

## Site requirements this positioning imposes

These replace the "Homepage IA (binding)" section of the superseded document, which
mandated abstraction and is the direct cause of the current copy problem.

1. **The homepage must name products.** A curated block of flagship packages — name, role,
   one line, link — is mandatory, not optional. Source it from `src/lib/ecosystem.ts`,
   which already holds good copy.
2. **The first viewport must contain a category noun.** A visitor must be able to say
   "it's open-source software for molecular simulation" after five seconds.
3. **Every product page must have an exit** — its docs URL and its repository, at minimum.
4. **Docs must be reachable from the homepage navigation.**
5. **Abstraction is allowed only after the concrete.** Values and approach sections are
   welcome once the page has said what the thing is. Never before.
6. **One source of truth per string.** Kickers and subheads currently exist in both
   `scripts/og-meta.ts` and the landing page with no shared constant, and have already
   drifted. Consolidate before rewriting.

## Product roster

Settled 2026-08-09. Grouping follows the investor deck's three layers. This roster governs
the navigation, the footer, and the homepage product block. The site's previous
Core / Workflow / Interfaces / Libraries / Tools grouping is retired — `Libraries` was
indistinguishable from `Core` to a reader.

**Application** — what a scientist calls directly.

| Product | Role | Status |
|---------|------|--------|
| MolPy | Python toolkit | `molcrafts-molpy` on PyPI |
| MolVis | 3D viewer | `@molcrafts/molvis-stage` on npm |
| MolNex | ML framework | `molnex` on PyPI · APIs may change between minor releases |
| MolPack | system packing | `molcrafts-molpack` on crates.io + PyPI |
| MolExp | experiment workflows | `molexp` on PyPI |
| MolPlot | charting | not yet published |
| Atomiverse | simulation engine | **pre-release** — Doxygen docs only, not on the docs site |

**Infrastructure** — what holds the stack up.

| Product | Role | Status |
|---------|------|--------|
| MolRs | Rust core | `molcrafts-molrs` on crates.io + PyPI |
| MolQ | job queue | `molcrafts-molq` on PyPI |
| MolCfg | config layer | `molcrafts-molcfg` on PyPI |
| MolLog | logging layer | `molcrafts-mollog` on PyPI |
| MolMCP | agent APIs | not yet published |
| MolHub | dataset access | not yet published |

**Specification**

| Product | Role | Status |
|---------|------|--------|
| MolRec | record contract | not yet published |

**Removed from the public catalog** (still open source on GitHub, just not in the product
menu or footer): **MolQRC** — a QR-code generator, unrelated to molecular science;
**Harness** — our own agent tooling; **Zensical Theme** — our own docs theme. Shipping
internal tooling in a public product menu makes the org read as a personal repo
collection.

**Atomiverse placement:** kept in the catalog, not in first position, and always carrying
an honest pre-release marker. The homepage product block leads with packages a visitor can
install today — a newcomer's first click must not land on something they cannot run.

## Dependency facts that answer real questions

Verified from the packages' `pyproject.toml` on 2026-08-09. These settle two positioning
questions with evidence rather than opinion, and both answers belong in the copy.

```
molcfg, mollog  ←  molpy, molnex, molexp, molq
molrs           ←  molpy, molrec
molpy           ←  molnex, molexp, molhub
molq            ←  molexp
```

- **MolCfg and MolLog are load-bearing, not strays.** Four packages depend on them. Their
  pages currently contain no molecular word and read as another company's products; the
  fix is to say what they are — the configuration and logging layer the MolCrafts stack
  runs on — not to hide them.
- **"MolPy or MolRs — which do I install?"** was the site's worst ambiguity. The graph
  answers it: `molpy` depends on `molrs`. You install MolPy; MolRs is the Rust core
  underneath it, and stands alone for Rust and browser users. Both pages must say this.
- **MolPy is the centre of gravity** — three packages depend on it. It leads the homepage
  product block.

## Open items

- **Deck correction (not blocking the site).** The investor deck labels MolNex
  "connect engines". Confirmed a typo: MolNex is a molecular machine-learning framework
  (`molix`, `molrep`, `molpot`, `molzoo`). Fix the label in the deck.
- **Deck coverage.** The deck omits Atomiverse and MolPlot. Worth aligning the deck to the
  roster above the next time it is edited.
- **No analytics.** Nothing is instrumented, so none of this can be measured yet.

## Changelog
*Newest first. One line per revision: what changed and why.*
- v4 (2026-08-09) — **Business model is now partially public**, reversing v2's
  "INTERNAL ONLY" rule: Participate names Open source / Consulting / Enterprise, still with
  no pricing or tier detail. Homepage order set to Hero → What we do → Manifesto →
  Approach + Projects → Sponsors → Participate → Newsletter → Cta; the Foundation and
  Progress sections were dropped from the homepage. Corrected the licensing claim — MolQ is
  MIT, not BSD-3-Clause.
- v3 (2026-08-09) — Settled the roster. Adopted the deck's Application / Infrastructure /
  Specification grouping over the site's five groups; placed Atomiverse (kept, pre-release
  marker, not first) and MolPlot in Application; removed MolQRC, Harness, and Zensical
  Theme from the public catalog. Added Dependency facts, which resolve the MolPy-vs-MolRs
  ambiguity and establish MolCfg/MolLog as load-bearing rather than off-brand.
- v2 (2026-08-09) — **Repositioning.** Replaced the "open foundation for molecular science"
  institutional framing with the investor-deck positioning: open-source infrastructure for
  molecular simulation workflows. Root cause of the site's copy failure was the prior
  document's binding rule "Foundation — abstract layers only (not product catalog)", which
  removed every product name from the homepage. Added audience, pain points, competitive
  landscape, objections, proof points, and site requirements. Business model captured as
  internal-only per decision of 2026-08-09.
- v1 (2026-08-09, superseded) — Institutional brand-site context at
  `.claude/product-marketing.md`. Identity: "an open foundation for molecular and materials
  science". No products, no pain points, no business model.
