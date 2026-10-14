import { HOME_H2_SECTION } from "@/lib/home/stage";
import { cn } from "@/lib/utils";

interface ProductMarkProps {
  product: string;
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
 *
 * It is not a box: the stage it opens inside is one continuous field, so the mark
 * floats in that field's own light — the product name — with no border
 * or fill of its own.
 */
export function ProductMark({ product, className }: ProductMarkProps) {
  return (
    <div
      className={cn(
        "relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden px-8",
        className,
      )}
    >
      <span
        lang="en"
        className={cn(
          HOME_H2_SECTION,
          "product-name relative block text-[clamp(2rem,4.45vw,4rem)]",
        )}
      >
        {product}
      </span>
    </div>
  );
}
