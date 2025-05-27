
---

## 📄 `tutorials/training.md`

```markdown
# Training a Potential

## Overview

This tutorial walks through how to train a new potential using your data.

## 1. Dataset Format

Describe accepted input formats: `.xyz`, `.npz`, custom JSON, etc.

## 2. Configuration File

Explain key fields of the YAML config file:
- `model`
- `training`
- `dataset`
- `losses`
- `scheduler`

## 3. Run Training

```bash
molpot train --config configs/my_config.yaml
