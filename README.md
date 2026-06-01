<div align="center">

<h1>
  <img src=".github/assets/moko.svg" alt="" height="48" align="absmiddle">
  &nbsp;molcrafts-index
</h1>

<p><strong>The MolCrafts ecosystem landing-page website — molcrafts.org</strong></p>

<p>
  <img src="https://img.shields.io/badge/license-MIT-18432B?style=flat-square" alt="License">
</p>

</div>

`molcrafts-index` is the React/TypeScript single-page application that renders
[molcrafts.org](https://molcrafts.org) — the home page for the MolCrafts open
molecular software ecosystem. A single repository serves both the main landing
page and a dedicated landing page for every product in the ecosystem.

It is built with [Rsbuild](https://rsbuild.dev), React 18, TailwindCSS, and
Radix UI primitives, with static HTML prerendering and Open Graph image
generation at build time.

## Development

```bash
npm install        # install dependencies
npm run dev        # start the Rsbuild dev server
npm run build      # production build (runs postbuild prerender + OG generation)
npm run preview    # preview the production build locally
npm run lint       # Biome lint over src/
npm run typecheck  # TypeScript type-check (tsc --noEmit)
```

## MolCrafts ecosystem

This site showcases the products of the MolCrafts ecosystem:

| Project | Role |
|---------|------|
| [molpy](https://github.com/MolCrafts/molpy)     | Python toolkit — the shared molecular data model & workflow layer |
| [molrs](https://github.com/MolCrafts/molrs)     | Rust core — molecular data structures & compute kernels (native + WASM) |
| [molpack](https://github.com/MolCrafts/molpack) | Packmol-grade molecular packing (Rust + Python) |
| [molvis](https://github.com/MolCrafts/molvis)   | WebGL molecular visualization & editing |
| [molexp](https://github.com/MolCrafts/molexp)   | Workflow & experiment-management platform |
| [molnex](https://github.com/MolCrafts/molnex)   | Molecular machine-learning framework |
| [molq](https://github.com/MolCrafts/molq)       | Unified job queue — local / SLURM / PBS / LSF |
| [molcfg](https://github.com/MolCrafts/molcfg)   | Layered configuration library |
| [mollog](https://github.com/MolCrafts/mollog)   | Structured logging, stdlib-compatible |
| [molhub](https://github.com/MolCrafts/molhub)   | Molecular dataset hub |
| [molmcp](https://github.com/MolCrafts/molmcp)   | MCP server for the ecosystem |
| [molqrc](https://github.com/MolCrafts/molqrc)   | QR Code generator with a C core, Python API, and CLI |
| [molcrafts-symphony](https://github.com/MolCrafts/molcrafts-symphony) | GitHub Project agent runner for plan / implement / review workflows |
| [molrec](https://github.com/MolCrafts/molrec)   | Atomistic record specification |

## License

MIT — see [LICENSE](LICENSE).

<hr>

<div align="center">
<sub>Crafted with 💚 by <a href="https://github.com/MolCrafts">MolCrafts</a></sub>
</div>
