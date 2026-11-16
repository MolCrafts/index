import { type AtomFieldArt, atomField } from "@/lib/home/art/atomField";
import { cn } from "@/lib/utils";
import { useDeferred } from "./useDeferred";

let cached: AtomFieldArt | null = null;

/** Built once: placing the atoms is a few thousand rejection-sampling attempts. */
function fieldArt(): AtomFieldArt {
  cached ??= atomField();
  return cached;
}

/**
 * The ground under the application lines: one disordered sheet of atoms that
 * every tool's line comes down into. It is drawn across the full width of the
 * screen, whatever measure the band above it keeps.
 */
export function GroundNetwork({ className }: { className?: string }) {
  /* Placed once the page is quiet: the band is four screens below the hero. */
  const art = useDeferred(fieldArt);
  if (!art) return null;
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${art.width} ${art.height}`}
      preserveAspectRatio="xMidYMax slice"
      className={cn("application-ground pointer-events-none", className)}
    >
      <g fill="none" stroke="hsl(var(--primary))" strokeWidth="1">
        {art.bonds.map((layer) => (
          <path key={layer.opacity} d={layer.d} strokeOpacity={layer.opacity} />
        ))}
      </g>
      <g fill="var(--home-blue-tint)">
        {art.atoms.map((layer) => (
          <path key={layer.opacity} d={layer.d} fillOpacity={layer.opacity} />
        ))}
      </g>
    </svg>
  );
}
