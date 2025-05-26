
---

## 📄 `user_guide/overview.md`

```markdown
# Architecture Overview

MolPot is built as a modular pipeline with pluggable components:

- 🧠 `model/`: network definitions
- 📊 `dataset/`: data loading & batching
- 🔧 `engine/`: trainer and loss logic
- 🧪 `sim/`: simulation engine
- 🔌 `cli/`: command-line interface

Each module is independent and configurable via YAML.
