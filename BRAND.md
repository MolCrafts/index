# MolCrafts brand tokens

**No React in the docs theme. Manual token sync only.**

## Source files (must be identical)

| Repo | Path |
|------|------|
| zensical-theme | `…/templates/assets/stylesheets/tokens.css` |
| **this repo** | `src/styles/brand-tokens.css` |

Edit → copy the **entire file** to the other repo. Do not add an npm/Python dependency between the packages.

## Local mapping

| File | Role |
|------|------|
| `src/styles/brand-tokens.css` | Shared anchors (hex + HSL channels) |
| `src/styles/tailwind.css` | Maps anchors → shadcn-style `--primary`, `--background`, … |
| `src/lib/productAccents.ts` | Per-product marketing accents only |

## Sync checklist

1. Change `brand-tokens.css` (or theme `tokens.css`)
2. Copy to the sibling path
3. In a monorepo checkout, theme tests assert the two files match:

   ```bash
   cd ../molcrafts-zensical-theme && uv run --extra dev tox -e py
   ```

## Deploy

Cloudflare Pages project **index** → `molcrafts.org` (`MolCrafts/index` @ `master`).
