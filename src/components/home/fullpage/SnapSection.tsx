import { cn } from "@/lib/utils";
import { type PointerEventHandler, type ReactNode, useLayoutEffect, useRef } from "react";
import { useFullpage } from "./FullpageProvider";

interface SnapSectionProps {
  id: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  /** When true, inner content can scroll without advancing the fullpage. */
  allowScroll?: boolean;
  className?: string;
  onPointerMove?: PointerEventHandler<HTMLElement>;
  children: ReactNode;
}

export function SnapSection({
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  allowScroll = false,
  className,
  onPointerMove,
  children,
}: SnapSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { registerSection, activeIndex, arrivingId, sectionIds } = useFullpage();
  const active = sectionIds[activeIndex] === id;
  const arriving = arrivingId === id;

  // Register before paint so the first wheel event can resolve this section.
  useLayoutEffect(() => {
    registerSection(id, ref.current);
    return () => registerSection(id, null);
  }, [id, registerSection]);

  return (
    <section
      ref={ref}
      id={id}
      data-section-id={id}
      data-active={active ? "true" : undefined}
      data-arriving={arriving ? "true" : undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      onPointerMove={onPointerMove}
      className={cn(
        "group relative box-border flex min-h-[var(--home-view,100cqb)] w-full shrink-0 flex-col overflow-clip",
        "after:pointer-events-none after:absolute after:inset-x-[14%] after:top-0 after:z-20 after:h-px after:origin-center after:scale-x-0 after:bg-[linear-gradient(90deg,transparent,hsl(var(--primary)/0.7),rgba(var(--accent-rgb),0.7),hsl(var(--primary)/0.7),transparent)] after:opacity-0",
        "data-[active=true]:after:animate-home-wake motion-reduce:data-[active=true]:after:animate-none force-motion:data-[active=true]:after:animate-home-wake",
        className,
      )}
    >
      {allowScroll ? (
        <div
          data-scroll-allow
          className="flex h-full min-h-0 w-full flex-1 flex-col overflow-y-auto overscroll-contain [touch-action:pan-y]"
        >
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
