# Installation

## 1. System Requirements

- Python ≥ 3.8
- PyTorch ≥ 2.0 (CUDA optional)
- gcc, cmake, Git

## 2. Install from Source

```bash
git clone https://github.com/MolCrafts/molpot.git
cd molpot
pip install -e .

# With CUDA
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

# CPU only
pip install torch torchvision torchaudio