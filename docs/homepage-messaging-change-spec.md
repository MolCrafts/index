# MolCrafts 首页文案改动说明书

日期：2026-11-12

版本：v1.4 短文案

本版按用户对篇幅的纠正，取代 v1.2 的页面目标文案。保持原有品牌、视觉和文字密度，改变表达重点，纳入 Tack、MolQ 并保留 MolPack。原稿中的长解释不用于页面。

## 篇幅与表达

- 首屏品牌与 slogan 保持原样。
- 标题简短；每屏导语只保留一句短句或短语。
- 每个产品只有一条短描述；英文为 5–8 个单词，中文为一句短描述。
- 只讲用户任务，不介绍实现语言、框架与内部接口。
- 详细能力、连接条件和操作要求留在产品资料中；页面通过收窄主张避免冗长限定。例如 Tack 描述研究规划与发现梳理，不承诺脱离所需环境运行计算。
- 中英文与瑞典语表达同样的任务范围。沿用现有文案记录、目录、链接和产品展示，不增设平行结构。

## 各屏文案

### 品牌

保留 MolCrafts 与 Standardizing Materials R&D for the AI Era.

### 基础

标题：面向分子科学的开放基础设施。

导语：面向材料研发的软件、方法与工作流。

- 开源：查看方法，按需调整。
- 互操作：在支持互通的工具间共享数据。
- 可扩展：按研究需要接入新方法。

### 研究积累

标题：让研究持续积累。

导语：让每项发现成为下一步的起点。

- 衔接数据：在支持互通的工具间传递结构与结果。
- 发现有据：让发现关联到方法与证据。
- 复用流程：沿用已有流程，研究下一个问题。

### AI 辅助

标题：AI，辅助你的研究。

导语：AI 辅助研究，科学判断由你掌握。

短句（v1.4，按环上顺时针阅读顺序，自左上起）：

| 中文 | 英文 |
| --- | --- |
| 读文献。 | Read the literature. |
| 复现结果。 | Reproduce results. |
| 规划研究。 | Plan the study. |
| 运行流程。 | Run the workflow. |
| 核验证据。 | Verify the evidence. |
| 积累经验。 | Build on experience. |

六条短句写研究者与 AI 一起做的事，层级高于 v1.3 的操作步骤（梳理研究、预览计算、批准运行、检查结果、记录来源、决定下一步）。瑞典语译文尚未经用户确认。

不增加长段会话条件，不宣称 AI 自动验证科学结论或每一步永久留存。

### 产品

标题：用于分子研究的软件。

导语：建模、模拟、学习、可视化与研究管理。

八个产品按下表顺序呈现；用户按任务选择，不要求依次使用。

| 产品 | 英文描述 | 中文描述 |
| --- | --- | --- |
| MolPy | Build molecular models for computation | 构建用于计算的分子模型 |
| MolPack | Generate initial configurations for molecular simulation | 生成分子模拟所需的初始构型 |
| MolVis | Inspect structures, edit molecules and review trajectories | 查看结构、编辑分子、检查轨迹 |
| MolAb | Keep workflows, runs and findings connected | 关联工作流、运行记录与研究发现 |
| MolNex | Train models for molecular properties and simulations | 训练用于性质预测与模拟的模型 |
| Atomiverse | Simulate molecular behavior and material properties | 模拟分子行为与材料性质 |
| MolQ | Submit and track local and cluster jobs | 提交并跟踪本地与集群计算任务 |
| Tack | Plan research and review findings with AI | 与 AI 一起规划研究、梳理发现 |

MolQ 管理计算任务；MolAb 关联工作流、运行记录与发现；Tack 辅助研究规划与发现梳理。MolPack 独立承担初始构型生成，不与通用建模合并。

### 合作

标题：从开源开始。按需定制。

导语：计算研发、方法开发与内部部署。

- 使用开源工具。用于分子研究的开源软件。
- 共同研发。模拟模型、计算方法与研究报告。
- 内部部署。适配团队计算资源的研究工作流。

沿用现有开源仓库与合作邮件入口。

### 页脚

面向材料研发的软件与研究工作流。

赞助者继续只作致谢。

## 同步与验收

- 八个产品使用现有产品类型、展示列表和共用描述；MolQ 沿用既有目录与链接，Tack 增加一次产品登记和仓库跳转。
- 中文、英文、瑞典语的目录复用各自首页描述，避免两份文案漂移。
- 页面简介、分享简介、生成正文和外部摘要同步定位；清除笼统的独立运行、任意互通和全体许可证声明。
- 保持品牌首屏、七屏顺序、开放排版及移动端单个当前产品的呈现。
- 检查三种语言的桌面与移动端布局，八个产品可发现、可访问且无横向溢出；沿用仓库现有 lint、类型检查、测试和构建。

## 评审历史

v1.1 曾完成独立评审与复核，记录见 [评审报告](homepage-messaging-review.md)。该结论对应旧版说明书，不覆盖本版短文案。v1.2 增加 MolQ；v1.3 按用户明确要求压缩文案并完成实现；v1.4 按用户选定的方案 A 替换 AI 屏的六条短句，其余文案不变。当前实际文案以现有源码为准。视觉与动效见 [首页视觉与动效说明书](homepage-visual-motion-spec.md)。
