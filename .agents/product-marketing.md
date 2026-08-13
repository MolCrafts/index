# Product Marketing Context

**Document version:** v6
**Last updated:** 2026-08-13

> MolCrafts 官网定位、中文文案和营销视觉的唯一有效规则。所有营销、首页设计与
> 首页实现工作都必须先读本文件。旧版“开放基金会”“软件目录”“开发者文档入口”
> 定位均已失效；历史文件只保留为 tombstone，不再提供设计依据。

## Product Overview

**One-liner:**
MolCrafts 面向分子与材料研发，提供科学计算、AI 应用与专业合作能力，让复杂研究更快
进入可验证、可延展的实践。

**Website role:**
`molcrafts.org` 是 MolCrafts 的商业公司首页。它建立公司认知、呈现核心能力和应用场景、
建立可信度并促成合作。它不是文档门户、安装入口、包目录或技术架构说明页。

**What MolCrafts offers:**
- 面向分子与材料研发的科学计算与 AI 能力；
- 以真实应用呈现研究问题、工作方式与可获得的结果；
- 开源软件、专业咨询和企业合作三条参与路径；
- 材料预测与性质研究等定制合作方向。

**Internal product context:**
MolCrafts 仍拥有由多个开源产品组成的软件体系。产品名、发布状态、依赖和安装信息是
产品页、文档与内部事实核验的输入，不是首页叙事骨架。

**Business model:** — partially public. Read the boundary carefully.
Open core. The open track (community, academic users, students, developers) drives
adoption and scientific validation. A paid track (private R&D groups) covers private
deployment, custom integration, proprietary methods, and governance/audit.

首页可以明确呈现 Open source、Consulting、Enterprise 三条合作路径，并说明适用对象与
价值。当前不展示价格、套餐表或未经确认的服务承诺；进一步商业信息通过联系与沟通承接。

## Target Audience

**Primary audience:**
- 计算化学、材料科学与分子建模领域的研究负责人、PI 与实验室负责人；
- 评估科学计算、AI 与材料研发合作的企业研发负责人；
- 寻找长期技术伙伴的科研机构、合作方与支持者；
- 需要理解 MolCrafts 实际应用能力的科学家与研发团队。

**Decision-makers:**
首页首先服务公司级与研究级判断：MolCrafts 是否理解问题、是否具备相关能力、是否值得
进一步沟通。技术用户仍是重要受众，但安装与开发者决策由产品页、GitHub 和独立文档站承接。

**Primary use case:**
帮助访问者在短时间内理解 MolCrafts 能解决什么研究问题、这些能力如何落到具体应用，
以及可以通过哪种方式开始合作。

**Jobs to be done:**
- 快速建立对公司定位、科研方向与专业程度的判断；
- 通过应用案例理解能力，而不是阅读技术组成；
- 判断 Open source、Consulting 或 Enterprise 哪条路径适合自己；
- 在形成兴趣后，顺畅进入联系与合作沟通。

## Personas

| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| Scientist / materials researcher | 更快进入可信结果 | 复杂准备与重复流程挤压研究时间 | 从研究问题到可验证结果的完整支持 |
| PI / lab lead | 能力、可靠性与长期合作价值 | 难以从技术名词判断团队是否真正理解科研场景 | 以应用和合作方式建立判断依据 |
| Private R&D lead | 业务相关性、保密性与交付方式 | 通用工具难以贴合私有研究流程 | 咨询、定制集成与企业合作路径 |
| Scientific software team | 开放性与可延展性 | 自研与现有工具之间长期存在割裂 | 可组合的开源能力与专业协作 |
| Collaborator / sponsor | 方向、可信度与影响力 | 需要判断团队是否值得长期支持 | 清晰愿景、真实成果和公开建设 |

## Problems & Pain Points

> 本节是内部策略背景。首页只能把它翻译成研究价值与应用结果，不得照搬技术细节。

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

## Product-page objections

> These answers support product pages, product discovery, and sales conversations.
> They are not homepage copy or homepage content requirements.

| Objection | Response |
|-----------|----------|
| "Do I have to adopt all 17 things?" | No. Every package installs independently and is useful alone. Say this explicitly on relevant product pages or product discovery surfaces. |
| "Is this maintained, or a personal repo collection?" | Nine packages are published on PyPI, crates.io, and npm with CI. Point at the registries, not at adjectives. |
| "Why not use the tool I already have?" | You probably still can — the stack is built to compose, not replace. The gap it fills is what happens *between* tools. |
| "My scripts already work." | They do, until someone else needs to run them. The pitch is transfer and provenance, not raw capability. |
| "MolPy or MolRs — which do I install?" | MolPy. It depends on MolRs. MolRs stands alone only if you are writing Rust or running in the browser. Say this on both pages. |

**Boundary:**
首页可以邀请商业合作，但不得暗示尚未证实的现成交付能力、验证资质、服务等级或客户成果。
咨询、私有部署、定制集成和企业合作的具体范围，以真实沟通和书面约定为准。

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

**中文表达原则：**
- 从访客的研究目标、判断和结果出发，先说“能解决什么”，再说“如何参与”；
- 使用具体但非技术化的词：分子与材料研发、科学计算、AI、预测、模拟、验证、
  应用、合作、咨询、企业研发；
- 句子长短有变化，标题有观点，正文有信息，不写成说明书、功能清单或机械三段式；
- 商业表达可以主动、有吸引力，但必须克制且可被事实支持。

**首页优先使用：**
研究问题、应用场景、研发判断、科学洞察、计算能力、材料预测、验证、协作、定制、
开放生态、长期合作、联系我们。

**首页禁止使用：**
- 安装命令、API、依赖关系、程序语言、调度器、文件格式、包注册表、版本与发布状态；
- Docs、Documentation、Read the docs、API reference 等文档导流语言；
- `INV-01`、`stack.slice`、`channel/*` 一类伪终端、伪系统编号和技术装饰文案；
- “赋能、重塑、颠覆、无缝、下一代、释放潜能、端到端、全栈、10x”等空泛 AI/SaaS 套话；
- 以否定和对手为中心的公开文案。首页用正面陈述表达 MolCrafts 的身份与价值；
- 未经证实的数字、客户、奖项、合作、下载量、引文、口碑和效果承诺。

**产品页边界：**
产品页可以使用准确的产品名、类别词和经核验的技术信息；首页不继承这项许可。

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

**Tone:** 冷静、专业、具有科学判断，同时有清晰的商业邀请。自信来自具体内容，不来自夸张词。

**Style:** 中文原生表达，不逐字翻译英文科技网站。标题负责提出观点或价值，正文负责补足
信息；段落保持短而有节奏，避免每屏都是“一个标题 + 三张同构卡片 + 一句说明”。

**Personality:** 科学 · 清醒 · 有创造力 · 开放 · 值得长期合作。

**Register check:** 如果一句话可以原封不动放到任意 AI、SaaS 或咨询公司首页，就必须重写。

**Operator locks (2026-08-13, overrides all earlier locks):**
- `molcrafts.org` 是 **MolCrafts 商业公司的首页**。公司品牌、科研能力、应用价值和合作转化
  共同构成首页主线。
- **渐变字与光晕必须保留。** 它们是品牌视觉资产，不得因为通用反 AI 模板规则而移除。
  需要通过层级、范围、色彩和动态聚焦进行艺术指导，而不是全页平均铺开。
- Hero 保持沉浸式深色氛围与最强的渐变/光晕表达；**Hero 不放产品截图、界面或设备框**。
- 产品截图、研究图像或应用照片只进入 **Applications 展示区**。桌面端 hover、键盘 focus
  或聚焦某张卡片时，该卡片自动放大、其余卡片退后，并在 2–4 张真实图片间自动轮播/淡入淡出。
  移动端以一个主卡片配合滑动或点按切换，图片轮播继续运行，不依赖 hover。
- 展开后的应用图像直接服务内容，不套伪浏览器、伪设备或假软件界面。收起态可以保留 Moko，
  聚焦态由真实应用视觉接管。
- **首页任何位置都不出现 Docs/Documentation 入口**，包括导航、正文、CTA 与页脚。
  独立文档站和产品页可以继续存在。
- **首页不出现技术细节。** 技术组成、安装、API、依赖、发布状态与架构说明只属于产品页、
  GitHub、文档或内部资料。
- 首页导航使用商业理解路径：Applications、Solutions、Collaboration、About、Contact；
  实际中文标签应自然简洁，避免 Projects/Docs 驱动的信息架构。
- 首页顺序锁定为：Hero → Brand statement → Capabilities → Applications →
  Collaboration → Trust/support → Closing CTA / Footer。
- Open source、Consulting、Enterprise 可以并列出现，但咨询、企业合作和 Contact 承担主要转化；
  GitHub 只作为开源路径或页脚中的次级出口。
- 首页公开文案保持 affirmative-only：直接说 MolCrafts 是什么、能做什么、如何合作；
  不把内部边界规则写给访客看。

## Proof Points

**Metrics:** None invented. Never state download counts, stars, citations, or user numbers
that are not measured.

**Internal verification only; not homepage copy.** Every line below was checked against the
registry API on 2026-08-09, not against a README badge. Re-check time-sensitive facts before use.
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

**Product-page value themes (not homepage wording):**
| Theme | Proof |
|-------|-------|
| Installable today, not a proposal | Nine package artifacts verified on PyPI / npm on 2026-08-09 |
| Take one piece or the stack | Each package installs and runs independently |
| Built for agents as well as people | MolMCP and the MolRec record contract |
| Open all the way down | BSD-3-Clause, public CI, public development |

## Goals

**Business goal:** 让目标访客建立对 MolCrafts 公司、科研能力和应用价值的清晰认知，并将
合适的研究机构与企业研发需求转化为真实合作对话。

**Homepage conversion action (in priority order):**
1. 联系 MolCrafts，讨论研究、咨询或企业合作；
2. 浏览 Applications 与 Capabilities，形成进一步沟通所需的判断；
3. 通过 Open source 路径了解公开建设，GitHub 仅作为次级出口。

联系地址仍由 `src/lib/contact.ts` 统一管理；上线前必须确认真实收件箱。

**Current measurement:** A GA4 page-view adapter exists and only activates when
`PUBLIC_GA_ID` is configured. Access to production data and conversion-event coverage are
unverified; do not claim measured performance until both are confirmed.

## Site requirements this positioning imposes

1. **五秒内说明公司价值。** 首屏必须让人理解 MolCrafts 服务于分子与材料研发，并能看见
   下一步是浏览应用或联系合作；不需要先理解软件体系。
2. **渐变与光晕有明确层级。** Hero 最强，Brand statement 选择性使用，Applications 的光晕
   跟随当前聚焦应用，Closing CTA 呼应 Hero。它们不能被删除，也不能每屏同强度复制。
3. **截图只属于 Applications。** Hero、Capabilities、Collaboration 和 Trust 区不使用产品截图。
4. **Applications 是首页核心交互。** 聚焦卡片放大并轮播真实图片，其他卡片退后；键盘和
   reduced-motion 模式必须有等价、可理解的状态。
5. **商业叙事先于产品目录。** 首页可以在 Applications 中自然出现应用或产品名，但不铺设
   全量产品清单，不展示安装状态、技术层级或依赖图。
6. **首页无 Docs、无技术细节。** 导航、页内链接、页脚与 CTA 都遵守同一边界。
7. **Contact 是主要动作。** 每个关键叙事段落最终应支持 Applications、Collaboration 或
   Contact，而不是把用户送进技术资料。
8. **真实优先。** 不伪造客户、数字、截图、应用成果或合作标志；无素材时使用克制的科学
   视觉或品牌图形，不能用假 UI 填空。
9. **一个字符串只有一个来源。** 首页标题、摘要与 SEO 文案不得在组件和生成脚本中各写一份。

## Product roster

This is the verified internal/product-page roster. It may govern product routes and
product-page exits, but it does **not** govern homepage navigation or footer IA. Only the
Application subset may feed the homepage Applications showcase, where every item is
described through a research use case or outcome rather than package category or status.

**Application** — what a scientist calls directly.

| Product | Role | Status |
|---------|------|--------|
| MolPy | Python toolkit | `molcrafts-molpy` on PyPI |
| MolVis | 3D viewer | `@molcrafts/molvis-core` on npm |
| MolNex | ML framework | not published as of 2026-08-09 · APIs may change between minor releases |
| MolPack | system packing | `molcrafts-molpack` on PyPI · crates.io unverified |
| MolExp | experiment workflows | not published as of 2026-08-09 |
| MolPlot | charting | `@molcrafts/molplot` on npm |
| Atomiverse | simulation engine | **pre-release** — Doxygen docs only, not on the docs site |

**Infrastructure** — what holds the stack up.

| Product | Role | Status |
|---------|------|--------|
| MolRs | Rust core | `molcrafts-molrs` on PyPI · crates.io unverified |
| MolQ | job queue | `molcrafts-molq` on PyPI |
| MolCfg | config layer | `molcrafts-molcfg` on PyPI |
| MolLog | logging layer | `molcrafts-mollog` on PyPI |
| MolMCP | agent APIs | `molcrafts-molmcp` on PyPI |
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

**Atomiverse placement:** keep honest maturity information on its product page. Homepage
Applications inclusion depends on having a truthful use case and real visual material;
publication status is never presented as homepage marketing copy.

## Dependency facts for product pages and internal verification

Verified from the packages' `pyproject.toml` on 2026-08-09. These facts may resolve
product-page questions and internal architecture decisions. They do not belong on the homepage.

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
- **MolPy is the centre of gravity** — three packages depend on it. It may lead product
  discovery surfaces when a package-first order is needed; this does not determine the
  homepage Applications order.

## Open items

- **Deck correction (not blocking the site).** The investor deck labels MolNex
  "connect engines". Confirmed a typo: MolNex is a molecular machine-learning framework
  (`molix`, `molrep`, `molpot`, `molzoo`). Fix the label in the deck.
- **Deck coverage.** The deck omits Atomiverse and MolPlot. Worth aligning the deck to the
  roster above the next time it is edited.
- **Measurement gap.** GA4 page views are supported when configured; conversion events and
  access to production reporting still need verification before homepage performance can be measured.

## Changelog
*Newest first. One line per revision: what changed and why.*
- v6 (2026-08-13) — **Commercial homepage reset.** Replaced the developer-adoption/software
  directory framing with a commercial company homepage; made Chinese outcome-led copy the
  default; removed Docs and technical detail from every homepage surface; retained gradient
  text and glow as required brand devices; restricted product imagery to an interactive
  Applications showcase with focused-card enlargement and automatic image rotation; promoted
  collaboration and Contact to the primary conversion path. This version overrides v5.
- v5 (2026-08-11) — **Operator locks added.** Site framed as the software's homepage, not a
  corporate site; hero kicker/subhead locked verbatim and exempted from the register check;
  affirmative-only copy rule (no negative framing anywhere); offerings extended with
  materials prediction & properties; non-hero copy modeled on Schrödinger + Hugging Face.
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
