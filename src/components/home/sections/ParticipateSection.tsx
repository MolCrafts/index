import { useHomeCopy } from "@/lib/home/copy";
import { PARTICIPATE_PATHS } from "@/lib/home/data";
import { HOME_BODY, HOME_H3 } from "@/lib/home/stage";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { HomeBlock } from "../HomeBlock";
import { Reveal } from "../Reveal";

export function ParticipateSection() {
  const { participate } = useHomeCopy();
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <HomeBlock
      id="collaboration"
      title={participate.title}
      lead={participate.lead}
      scale="statement"
    >
      <div
        className="grid md:grid-cols-[0.8fr_1.1fr_1.1fr]"
        onPointerLeave={() => setFocused(null)}
      >
        {PARTICIPATE_PATHS.map((path, index) => {
          const copy = participate.paths[path.key];
          const active = focused === path.key;
          const dimmed = focused !== null && !active;
          return (
            <Reveal key={path.key} delay={index * 0.08} className="h-full">
              <a
                href={path.href}
                target={path.external ? "_blank" : undefined}
                rel={path.external ? "noreferrer noopener" : undefined}
                onPointerEnter={() => setFocused(path.key)}
                onFocus={() => setFocused(path.key)}
                onBlur={(event) => {
                  const next = event.relatedTarget;
                  if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
                    setFocused(null);
                  }
                }}
                className={cn(
                  "group flex h-full flex-col border-b border-border/60 px-1 py-5 no-underline outline-none transition-[opacity,transform,background-color] duration-200 md:min-h-72 md:border-b-0 md:px-7 md:py-9",
                  index > 0 && "md:border-l",
                  index === 0 && "md:pl-0 md:pr-8",
                  index > 0 && "bg-foreground/[0.018]",
                  active && "md:-translate-y-1 md:bg-primary/[0.055]",
                  dimmed && "opacity-75",
                  "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
                )}
              >
                <span className="font-body text-xs text-muted-foreground">{copy.audience}</span>
                <h3 className={cn(HOME_H3, "mt-4 max-w-sm md:mt-7")}>{copy.title}</h3>
                <p className={cn(HOME_BODY, "mt-3 max-w-md md:mt-4")}>{copy.description}</p>
                <span className="mt-auto inline-flex min-h-11 items-center gap-2 pt-3 font-body text-sm font-semibold text-[rgb(var(--accent-rgb))] group-hover:text-foreground md:pt-6">
                  {copy.cta}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </Reveal>
          );
        })}
      </div>
    </HomeBlock>
  );
}
