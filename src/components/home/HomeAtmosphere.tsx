/**
 * The homepage's one background light, fixed to the viewport so the same
 * treatment sits behind every block.
 *
 * A cyan focal light and two softer green fields give the page depth. They are
 * static gradients: each screen draws its own structure over them — the lattice,
 * the arcs, the energy surface — and that drawing carries the motion.
 */
export function HomeAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="home-glow absolute left-1/2 top-[44%] h-[min(38rem,68vw)] w-[min(70rem,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(var(--accent-rgb),0.25),hsl(var(--primary)/0.11)_42%,transparent_72%)] blur-[36px]" />
      <div className="home-glow absolute -left-[12%] top-[12%] size-[min(44rem,68vw)] rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.3),transparent_68%)] blur-glow" />
      <div className="home-glow absolute -bottom-[18%] -right-[10%] size-[min(50rem,72vw)] rounded-full bg-[radial-gradient(circle,rgba(var(--accent-rgb),0.24),transparent_70%)] blur-glow" />
    </div>
  );
}
