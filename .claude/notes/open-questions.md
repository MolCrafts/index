# Open questions

- Should `regressions/` gain a browser harness? The homepage now depends on
  runtime behaviour that lint, types and unit tests cannot see: the fixed
  canvas sizing itself against the viewport, the scroll-spy rail, and the
  applications band's pointer/keyboard/touch branches. Each of those regressed
  at least once with every existing gate green.
