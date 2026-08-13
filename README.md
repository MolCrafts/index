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
- On desktop, the focused Application card enlarges and automatically rotates
  through real images while neighboring cards recede. Mobile uses one active
  card with swipe/tap navigation and equivalent image rotation.
- Keep Docs links, install instructions, APIs, dependencies, release status,
  architecture details, and fake terminal language off every homepage surface.
- Lead visitors toward Applications, capabilities, collaboration, and Contact.
  GitHub remains a secondary exit within the open-source route or footer.
- Use only verifiable facts, real imagery, and confirmed supporters. Do not
  invent customers, results, metrics, testimonials, or product UI.

Canonical positioning and Chinese-copy rules live in
[`.agents/product-marketing.md`](.agents/product-marketing.md).

## Homepage narrative

1. Hero — company thesis and primary action
2. Brand statement — the point of view behind MolCrafts
3. Capabilities — what the company can help research teams accomplish
4. Applications — interactive, image-led application stories
5. Collaboration — Open source, Consulting, and Enterprise paths
6. Trust and support — verified signals only
7. Closing CTA and footer — a direct route to Contact

## Development

```bash
npm install        # install dependencies
npm run dev        # start the Rsbuild dev server
npm run build      # production build (runs postbuild prerender + OG generation)
npm run preview    # preview the production build locally
npm run lint       # Biome lint over src/
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
