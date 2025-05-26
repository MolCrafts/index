
---

## 📄 `tutorials/integration.md`

```markdown
# Integration with External Tools

## Use with ASE

```python
from ase import Atoms
from molpot.ase import MolPotCalculator

atoms = Atoms("H2O", ...)
atoms.calc = MolPotCalculator(model="model.pt")
atoms.get_forces()
