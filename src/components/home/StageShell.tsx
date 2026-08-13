import { cn } from "@/lib/utils";
import type { CSSProperties, ReactNode } from "react";
import { MoleculeField } from "./MoleculeField";

interface StageShellProps {
  children: ReactNode;
  className?: string;
  /** 0–1 field strength. 0 skips the canvas. */
  field?: number;
  /** Optional ambient grid, unused by the commercial homepage. */
  grid?: boolean;
  /** Darken field so type stays readable. */
  veil?: "soft" | "medium" | "strong" | "none";
}

const VEIL: Record<NonNullable<StageShellProps["veil"]>, string> = {
  none: "",
  soft: "bg-background/55 dark:bg-background/50",
  medium: "bg-background/78 dark:bg-background/72",
  strong:
    "bg-gradient-to-b from-background/55 via-background/88 to-background dark:from-background/50 dark:via-background/90 dark:to-background",
};

/**
 * Shared molecular stage with an optional field and a readability veil.
 */
export function StageShell({
  children,
  className,
  field = 0.16,
  grid = false,
  veil = "medium",
}: StageShellProps) {
  return (
    <>
      {grid && (
        <div
          className="home-tech-grid pointer-events-none absolute inset-0 z-0 opacity-70 dark:opacity-90"
          aria-hidden="true"
        />
      )}
      {field > 0 && <MoleculeField intensity={field} interactive={false} className="z-0" />}
      {veil !== "none" && (
        <div
          className={cn("pointer-events-none absolute inset-0 z-[1]", VEIL[veil])}
          aria-hidden="true"
        />
      )}
      <div
        className={cn(
          "home-section-stage relative z-10 h-full min-h-full w-full min-w-0",
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}

/** System chrome label — mono, tracked, primary-tinted. Not marketing copy. */
export function MonoLabel({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={cn("type-label font-mono text-[10px] font-medium text-primary/85", className)}
      style={style}
    >
      {children}
    </span>
  );
}

/** 1px hairline used as panel dividers / rails. */
export function Hairline({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-border/60", className)} aria-hidden="true" />;
}
