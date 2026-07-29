# molcrafts-index — Project Context

MolCrafts ecosystem 落地页（品牌站）。多产品单仓：主页 + 子产品 landing。

Deploy：**Cloudflare Pages** 项目 `index` → `molcrafts.org`（源 `MolCrafts/index` @ `master`）。

## Stack

- React 18 + TypeScript (strict)
- Rsbuild（构建）
- Biome（lint/format，`biome.json`）
- TailwindCSS v4 + `tw-animate-css`
- Radix UI 原语 + shadcn-style 变体（`src/components/ui/`）
- Framer Motion
- 客户端路由：`App.tsx` + `src/lib/routes.ts` 产品表，不引 react-router

## 目录约定

```
src/
  components/           业务组件（PascalCase.tsx）
    ui/                 shadcn 原语，不要手改，不要 lint
  pages/
    {product}/{Product}Landing.tsx
    atomiverse/         Atomiverse 落地页
    index.ts            统一 re-export
    NotFound.tsx
  lib/
    utils.ts            cn()
    animations.ts       Framer Motion variants
    routes.ts           PRODUCT_SLUGS / pathProductSlug / FEATURED_LINKS
    ecosystem.ts        首页/页脚产品目录
    productAccents.ts   各产品营销色（非品牌锚点）
  styles/
    brand-tokens.css    共享品牌锚点（与 zensical-theme tokens.css 必须完全一致）
    tailwind.css        把锚点映射到 shadcn HSL UI 变量
  App.tsx               路由 + 全局过渡
```

## 品牌 tokens（与 zensical-theme 手动对齐）

**无 npm/包耦合。无 React 进 docs theme。改一边就整文件拷到另一边。**

| 本仓 | 对齐仓 |
|------|--------|
| `src/styles/brand-tokens.css` | `molcrafts-zensical-theme/.../assets/stylesheets/tokens.css` |

`brand-tokens.css` 含：

- Hex 锚点：`--molcrafts-forest` / cream / sand / slate / radius …
- HSL channels：`--molcrafts-*-hsl`（给 `hsl(var(--primary))` 用）

消费方式：

1. `tailwind.css`：`@import "./brand-tokens.css"` → 映射 `--primary` / `--background` / `--brand-*`
2. `productAccents.ts`：仅产品页装饰色，**不要**写进 brand-tokens

锚点速查：

| Token | Hex |
|-------|-----|
| forest | `#18432b` |
| forest-light | `#2a6744` |
| forest-dark | `#0e2b1b` |
| cream | `#fbf6e4` |
| sand | `#f2da9d` |
| sand-strong | `#c8841d` |
| slate | `#101811` |
| radius | `0.4rem` |

Cyan（`--molcrafts-cyan-spark`）只做 display 光晕，**不做**按钮主色。

漂移检查（monorepo 同级 checkout 时）：

```bash
cd ../molcrafts-zensical-theme && uv run --extra dev tox -e py
# tests/test_tokens_contract.py 会字节比对两边 tokens 文件
```

## 强约定（PR 前必须满足）

1. **新子产品落地页**：在 `routes.ts` 的 `PRODUCT_SLUGS`、`PRODUCT_PAGES`（`App.tsx`）、`pages/index.ts`、`ecosystem.ts`、`scripts/og-meta.ts`、`public/sitemap.xml` 一并挂上；有 accent 就改 `productAccents.ts`。
2. **样式合并**：`className` 一律 `cn()`（`@/lib/utils`）。
3. **动画**：复用 `src/lib/animations.ts`；新增 variants 也放该文件。
4. **图标**：业务用 `FeatureIcons.tsx` / `Icons.tsx`；UI 微件用 lucide-react。
5. **Import 顺序**：Biome `organizeImports`；提交前 lint。
6. **禁止**：`console.log`、内联 secret、`any` 逃生、直接改 `src/components/ui/`。
7. **品牌 tokens**：只改 `brand-tokens.css` 后**整文件**同步到 theme `tokens.css`；不要只改一边。

## URL 约定

- 产品页：`molcrafts.org/<product>/`（无 `/products/` 前缀）
- 文档：`docs.molcrafts.org/<product>/`（Navbar Docs 链接）
- 应用：`app.molcrafts.org/<product>/`

## 已知历史遗留

- 源文件可能混用 tab / 2-space。`biome.json` 为 space/2。**不要顺手批量改缩进**。
- 旧 skill 文案可能仍写「App.tsx 手写 switch」；现以 `routes.ts` + `PRODUCT_PAGES` 为准。

## 可用资产

- Skill：`/verify`（commit 前 biome + tsc）
- 全局 agent：`~/.claude/agents/`
