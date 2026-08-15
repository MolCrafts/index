# Law — never violated

Every rule here outranks scope, minimal-diff, and convenience. There is no
"just this once". `CLAUDE.md` carries the one-line index under
`## Law (never violated)`.

**Carve-outs are written, not inferred.** If a subsystem is exempt from a law,
the operator records that exemption here and names the subsystem. An agent
never grants itself one.

Adding, changing, or repealing a law is the operator's act via `/mol:note`.

<!-- mol:law:id:no-silent-debt -->
## No silent debt

Discover an anti-pattern, failing check, broken invariant, or clear bug in the
surface you touch or depend on: fix it when local and stage-allowed, or stop and
report the exact blocker. Never skip-mark it, weaken an assertion, or omit it
from the summary.

<!-- mol:law:id:cohesion-coupling -->
## High cohesion, low coupling

Every module has one coherent responsibility and depends only on narrow,
explicit interfaces. Do not reach through sibling internals, depend on ambient
global state, or require an external process to exercise a unit.

A module's unit tests must pass with fakes for outbound dependencies. If only a
full application or cross-module integration can prove it, redesign the seam.

<!-- mol:law:id:tests-unit-only -->
## `tests/` holds unit tests only

Never place an end-to-end or full-stack scenario under `tests/`. Unit tests
mirror source modules and fake outbound dependencies. End-to-end work belongs
in `regressions/` or an explicit integration/browser harness.

<!-- mol:law:id:owning-type -->
## Never a free function where a type owns the concept

A domain concept is a type with methods. Keep module-level functions only for
genuinely free operations or thin re-exports.

<!-- mol:law:id:one-concern -->
## Never more than one concern in a public method

Public APIs are primitive: construct, configure, perform one concern, or read a
result. Let callers compose multiple steps.

<!-- mol:law:id:no-premature-extraction -->
## Never extract a helper with one call site

Inline until a second real use appears, unless a unit test must target the
logic directly.

<!-- mol:law:id:no-factory-primary -->
## Never hide primary construction behind a factory wrapper

`Foo(...)` constructs `Foo`. Use an alternate constructor only when it carries
distinct semantics such as `Foo.from_file` or `Foo.empty`.

<!-- mol:law:id:no-god-context -->
## Never a god context bag

Do not thread an ambient `context`, `state`, or `env` blob through the app. Pass
the fields the call needs or define a smaller cohesive type.

<!-- mol:law:id:no-facade -->
## Never an all-in-one facade

Do not hide a pipeline behind a `do_everything(config)` entry point. Expose the
primitives and let the caller compose them.

<!-- mol:law:id:product-registration -->
## Never leave a catalog product pointing at a site path

Product marketing pages are retired. Every public catalog entry must link at
its GitHub repository (`packageGithubHref`), including `ecosystem.ts`, the
homepage Applications stage, 404 featured links, and `public/_redirects` for
the old `/<slug>` URLs. If a product page is added again, update `routes.ts`,
`App.tsx`, `src/pages/index.ts`, `ecosystem.ts`, `scripts/og-meta.ts`, and
`public/sitemap.xml` together, and add `productAccents.ts` when the product
needs a distinct marketing accent.

<!-- mol:law:id:classname-cn -->
## Never build `className` ad hoc

Compose class names through `cn()` from `@/lib/utils`. Do not use string
concatenation or array joins for conditional classes.

<!-- mol:law:id:motion-variants -->
## Never duplicate motion variants in components

Reuse variants from `src/lib/animations.ts`; add a shared variant there only
when a genuinely reusable motion concept is missing.

<!-- mol:law:id:shadcn-generated-primitives -->
## Never hand-edit shadcn primitives

Do not manually edit `src/components/ui/`. Generate appropriate shadcn
primitives and compose or wrap them in product components elsewhere.

<!-- mol:law:id:brand-token-sync -->
## Never let brand tokens drift from the docs theme

`src/styles/brand-tokens.css` and the sibling
`molcrafts-zensical-theme/.../stylesheets/tokens.css` must remain byte-identical.
Copy the whole file when either side changes. Cyan is display-only; interactive
buttons use forest.

<!-- mol:law:id:source-bans -->
## Never add prohibited source constructs

Do not add `console.log`, secrets, TypeScript `any`, or a bare `@ts-ignore`.
Use `@ts-expect-error` only with a concrete reason when unavoidable.

<!-- mol:law:id:no-bulk-reindent -->
## Never bulk-reindent mixed-format files

Keep diffs semantically scoped. Do not normalize unrelated tabs, spaces, or
line wrapping while making a functional change.

<!-- mol:law:id:url-contract -->
## Never break the public URL split

Keep product marketing at `molcrafts.org/<product>/`, documentation at
`docs.molcrafts.org/<product>/`, and applications at
`app.molcrafts.org/<product>/`.

<!-- mol:law:id:commercial-homepage-contract -->
## Never violate the commercial homepage contract

The root route `/` is MolCrafts' commercial company homepage. Preserve gradient
typography and atmospheric glow as deliberate brand devices. Keep the hero free
of product screenshots, UI, and device frames. Product screenshots and research
images may appear only in the interactive Applications showcase, where focus
enlarges the active card and advances real imagery with desktop, keyboard,
mobile, reduced-motion, and touch-appropriate behavior.

Do not place Docs or Documentation links, install instructions, APIs,
dependencies, package status, architecture detail, or fake technical chrome on
any homepage surface, including its navigation and footer. Dedicated product
pages, GitHub, and `docs.molcrafts.org` keep their existing technical roles.
The AI editorial section is the sole product-name carve-out: it may show
`MolPy`, `MolExp`, `MolVis`, `MolPack`, and `Atomiverse` as non-interactive
ambient context labels. Those labels must not include links, descriptions,
status, installation, dependency, or architecture information.
`.agents/product-marketing.md` is the canonical copy, hierarchy, and conversion
contract for this route.

<!-- mol:law:id:single-page-change -->
## Never modify more than one website page per task

Each implementation task may change user-facing code for at most one website
page or route. A homepage and all of its sections count as one page. Shared
components, styles, configuration, and infrastructure may change only when the
selected page requires it, and those changes must not alter another page's
behavior or presentation. If a request spans multiple pages, split it into
separate tasks and wait for a new operator instruction before starting the next
page.

The sole carve-out is an explicit operator request for a repository-wide style
system migration. That task may update every route and shared component needed
to replace legacy CSS with Tailwind and generated shadcn primitives, but it must
remain presentation-only: preserve copy, public APIs, route behavior, and
interactions. The copy-approval law continues to apply without exception.

<!-- mol:law:id:copy-approval -->
## Never change user-facing copy without prior operator approval

Before editing any user-facing wording, present the exact proposed wording to
the operator and wait for explicit approval. A general request to redesign,
polish, implement, or improve a page is not approval to change its copy. Visual
work may change typography, spacing, color, imagery, responsive behavior, and
interaction while preserving every word verbatim. This approval requirement
applies to homepage copy, product pages, navigation, buttons, labels, metadata,
accessibility text, and all other visitor-facing language.

## Shape check before adding a public symbol

1. Put the concept on its natural owning type when it has one.
2. Split public methods that perform multiple user-visible concerns.
3. Keep one-call-site helpers inline unless a unit test needs the seam.
4. Pass precise fields instead of extending a context bag.
5. Redesign boundaries that cannot be tested with fakes.
