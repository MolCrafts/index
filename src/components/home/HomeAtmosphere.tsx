import { MoleculeOverlay } from "@/components/MoleculeOverlay";

/**
 * The homepage's one background — the brand curtain's own treatment, promoted to
 * cover the whole page.
 *
 * The molecules are the 404 overlay, one at a time: fade in on a random edge,
 * turn a little, fade out, then another picture from the ones not just shown.
 * This layer is behind the type. The glows used to stop
 * at the hero's clip edge, while every other block owned a fainter field of its
 * own. Fixed to the viewport, the same treatment now sits behind every block.
 *
 * A cyan focal light and two softer green fields give the inscription depth.
 * These remain static gradients; the molecule carries the ambient motion.
 */
export function HomeAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="home-molecules absolute inset-0">
        <MoleculeOverlay single />
      </div>

      <div className="home-glow absolute left-1/2 top-[44%] h-[min(38rem,68vw)] w-[min(70rem,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(var(--accent-rgb),0.25),hsl(var(--primary)/0.11)_42%,transparent_72%)] blur-[36px]" />
      <div className="home-glow absolute -left-[12%] top-[12%] size-[min(44rem,68vw)] rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.3),transparent_68%)] blur-glow" />
      <div className="home-glow absolute -bottom-[18%] -right-[10%] size-[min(50rem,72vw)] rounded-full bg-[radial-gradient(circle,rgba(var(--accent-rgb),0.24),transparent_70%)] blur-glow" />
    </div>
  );
}
