<div align="center">

<h1>
  <img src=".github/assets/moko.svg" alt="" height="48" align="absmiddle">
  &nbsp;molcrafts-index
</h1>

<p><strong>The MolCrafts commercial company website — molcrafts.org</strong></p>

<p>
  <img src="https://img.shields.io/badge/license-MIT-18432B?style=flat-square" alt="License">
</p>

</div>

`molcrafts-index` is the React/TypeScript application behind
[molcrafts.org](https://molcrafts.org). The root route is MolCrafts' commercial
company homepage; the same repository also serves dedicated product landing
pages.

It is built with [Rsbuild](https://rsbuild.dev), React 18, TailwindCSS, and
Radix UI primitives, with static HTML prerendering and Open Graph image
generation at build time.

## Homepage contract

The root route is designed for company-level understanding and collaboration:

- Tell a clear brand story around molecular and materials R&D, scientific
  computing, AI applications, and professional collaboration.
- Keep gradient typography and atmospheric glow as intentional MolCrafts brand
  devices. The hero carries the strongest expression.
- Keep product screenshots out of the hero. Screenshots and research imagery
  appear only in the Applications showcase.
- On a pointer-capable desktop, the Applications band expands the focused entry
  into the whole stage while its neighbours compress to vertical labels; hover,
  click, and keyboard focus all activate it. Narrower and touch viewports get a
  chip row, one expanded entry, and the full roster as a list. Entries currently
  open on a brand panel — real product captures have not been taken yet.
- Keep Docs links, install instructions, APIs, dependencies, release status,
  architecture details, and fake terminal language off every homepage surface.
- Lead visitors toward Applications, capabilities, collaboration, and Contact.
  GitHub remains a secondary exit within the open-source route or footer.
- Use only verifiable facts, real imagery, and confirmed supporters. Do not
  invent customers, results, metrics, testimonials, or product UI.

Canonical positioning and Chinese-copy rules live in
[`.agents/product-marketing.md`](.agents/product-marketing.md).

## Homepage narrative

1. Hero — the brand curtain; wordmark, kicker, and subtitle only
2. Brand statement (`#about`) — the point of view behind MolCrafts, and the
   page's first call to action
3. Capabilities (`#solutions`) — what the company can help research teams
   accomplish
4. AI editorial (`#assist`) — the approved ambient product constellation
5. Applications — the interactive entry-point band
6. Collaboration — Open source, Consulting, and Enterprise paths
7. Trust and support — verified signals only
8. Closing CTA and footer — a direct route to Contact

## Development

```bash
npm install        # install dependencies
npm run dev        # start the Rsbuild dev server
npm run build      # production build (runs postbuild prerender + OG generation)
npm run preview    # preview the production build locally
npm run lint       # Biome lint over src/ and scripts/
npm run typecheck  # tsc over src/ and scripts/
npm test           # Rstest unit suite
npm run typecheck  # TypeScript type-check (tsc --noEmit)
```

## Repository map

- `src/components/` — homepage and shared presentation components
- `src/pages/` — dedicated product landing pages
- `src/lib/` — route, product, contact, and visual registries
- `src/styles/` — MolCrafts brand tokens and global presentation
- `scripts/` — prerendering, metadata, and social-image generation
- `.agents/product-marketing.md` — canonical homepage positioning and copy rules
- `.claude/notes/` — passive project and architecture knowledge

## License

MIT — see [LICENSE](LICENSE).

<hr>

<div align="center">
<sub>Crafted with 💚 by <a href="https://github.com/MolCrafts">MolCrafts</a></sub>
</div>
