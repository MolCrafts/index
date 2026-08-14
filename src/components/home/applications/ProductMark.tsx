import { HOME_GRADIENT_TEXT } from "@/lib/styleTokens";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface ProductMarkProps {
  product: string;
  applicationTitle: string;
  icon: LucideIcon;
  className?: string;
}

/**
 * The brand panel an expanded application entry opens with.
 *
 * It is deliberately not a picture of the product. The homepage contract admits
 * only real captures in this showcase and bans invented technical chrome, so until
 * real screenshots exist this panel says what the entry *is* in brand type rather
 * than implying a screen that nobody has shipped. When captures land, swap this for
 * the image; nothing else in the stage has to change.
 */
export function ProductMark({
  product,
  applicationTitle,
  icon: Icon,
  className,
}: ProductMarkProps) {
  return (
    <div
      className={cn(
        "relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden rounded-xl border border-border/45 bg-background/40 px-8",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_25%,rgba(var(--accent-rgb),0.12),transparent_65%)]"
        aria-hidden="true"
      />
      <Icon
        className="relative h-7 w-7 text-[rgb(var(--accent-rgb))]/70"
        aria-hidden="true"
        strokeWidth={1.5}
      />
      <span
        lang="en"
        className={cn(
          HOME_GRADIENT_TEXT,
          "relative mt-5 block font-display text-[clamp(2rem,3.4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.035em]",
        )}
      >
        {product}
      </span>
      <span className="relative mt-4 block h-px w-16 bg-[rgb(var(--accent-rgb))]/45" />
      <span className="relative mt-4 block font-body text-sm text-muted-foreground">
        {applicationTitle}
      </span>
    </div>
  );
}
