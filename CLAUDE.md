# molcrafts-index — Project Context

MolCrafts ecosystem 的落地页站点。多产品单仓库：主页 + 9 个子产品 landing（molpy / molrec / molvis / molcfg / mollog / molq / molrs / molexp / molnex）。

## Stack

- React 18 + TypeScript (strict)
- Rsbuild（构建）
- Biome（lint/format，配置见 `biome.toml`）
- TailwindCSS + `tailwindcss-animate`
- Radix UI（原语） + shadcn-style 变体（`src/components/ui/`，biome 忽略）
- Framer Motion（动画）
- 客户端路由：`App.tsx` 里用 `window.location.pathname` 手写的 switch，不引 react-router

## 目录约定

```
src/
  components/           业务组件（PascalCase.tsx）
    ui/                 shadcn 原语，不要手改，不要 lint
    {product}/          子产品私有组件（如 molpy/, molvis/）
  pages/
    {product}/{Product}Landing.tsx   每个子产品一个入口
    index.ts                          统一 re-export
    NotFound.tsx
  lib/
    utils.ts            只放 cn()
    animations.ts       Framer Motion variants 集中在这里
  types/                .d.ts（images/svg）
  App.tsx               路由 switch + 全局过渡
```

## 强约定（PR 前必须满足）

1. **新子产品落地页**：走 `/new-subpage` skill，不要手动创建（避免漏掉 `pages/index.ts` 或 `App.tsx` 路由）。
2. **样式合并**：`className` 拼接一律用 `cn()`（`@/lib/utils`），禁止字符串模板手拼。
3. **动画**：复用 `src/lib/animations.ts` 里的 variants（`fadeIn` / `slideUp` / `staggerContainer` / `scaleIn` / `sectionTransition`）；新增动画也放这个文件，不要散落组件里。
4. **图标**：业务图标用 `src/components/FeatureIcons.tsx` 或 `Icons.tsx`；lucide-react 用于 UI 微件。
5. **路由**：新 landing 必须在 `App.tsx` 的 `renderContent()` 里加 `currentPath.startsWith("/xxx")` 分支，并在 `pages/index.ts` re-export。
6. **Import 顺序**：Biome `organizeImports` 自动处理，提交前跑 `/verify`。
7. **禁止**：`console.log`（全局规则）、内联 secret、`any` 逃生、直接改 `src/components/ui/`。

## 已知历史遗留

- 源文件混用 tab / 2-space 缩进。`biome.toml` 声明 `indent_style = "space"` 但 `biome check` 不强制。**不要顺手批量改缩进**——会污染 diff。动到哪行修到哪行。
- `App.tsx` 的路由是手写 switch，尚未抽象。不在当前任务范围就别动它。

## 可用资产

- Agent：`frontend-reviewer`（写完 .tsx 后自动用，校验本项目组件约定）
- Skill：`/verify`（commit 前跑，biome + tsc 一把梭）
- Skill：`/new-subpage <name>`（脚手架新子产品落地页）

全局通用能力（planning / security / test / perf / docs）用 `~/.claude/agents/` 下的全局 agent，项目级不再重复。
