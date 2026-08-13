import { useChromeCopy } from "@/lib/i18n/chromeCopy";
import { cn } from "@/lib/utils";
import { useFullpage } from "./FullpageProvider";

interface SectionDotsProps {
  labels: readonly { id: string; label: string }[];
  className?: string;
}

export function SectionDots({ labels, className }: SectionDotsProps) {
  const { activeIndex, goTo, sectionIds } = useFullpage();
  const chrome = useChromeCopy();

  return (
    <nav
      aria-label={chrome.sectionNav}
      className={cn(
        "pointer-events-none fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2.5 sm:right-5 md:flex",
        className,
      )}
    >
      {sectionIds.map((id, index) => {
        const meta = labels.find((l) => l.id === id);
        const active = index === activeIndex;
        return (
          <button
            key={id}
            type="button"
            aria-label={meta?.label ?? id}
            aria-current={active ? "true" : undefined}
            onClick={() => goTo(index)}
            className={cn(
              "pointer-events-auto group relative flex h-3 w-3 items-center justify-center rounded-full",
              "outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-rgb))] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
          >
            <span
              className={cn(
                "block rounded-full transition-all duration-200 ease-out",
                active
                  ? "h-2.5 w-2.5 bg-[rgb(var(--accent-rgb))] shadow-[0_0_16px_rgba(var(--accent-rgb),0.75)]"
                  : "h-1.5 w-1.5 bg-muted-foreground/45 group-hover:h-2 group-hover:w-2 group-hover:bg-muted-foreground/80",
              )}
            />
            <span
              className={cn(
                "pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 whitespace-nowrap",
                "type-label bg-background/90 px-2 py-1 font-mono text-[10px] text-muted-foreground backdrop-blur-sm",
                "opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100",
              )}
            >
              {meta?.label ?? id}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
