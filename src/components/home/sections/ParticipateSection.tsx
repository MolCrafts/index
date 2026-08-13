import { useHomeCopy } from "@/lib/home/copy";
import { PARTICIPATE_PATHS } from "@/lib/home/data";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { StageShell } from "../StageShell";
import { SnapSection } from "../fullpage/SnapSection";

export function ParticipateSection() {
  const { participate } = useHomeCopy();
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <SnapSection
      id="collaboration"
      aria-labelledby="collaboration-heading"
      className="justify-center"
    >
      <StageShell field={0.1} veil="medium" className="flex min-h-full items-center">
        <div className="mx-auto w-full max-w-[90rem] px-6 py-16 sm:px-10 lg:px-16">
          <div className="grid gap-5 md:grid-cols-[1.15fr_0.85fr] md:items-end md:gap-14">
            <h2
              id="collaboration-heading"
              className="font-display text-[clamp(2.35rem,5vw,5rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-foreground"
            >
              {participate.title}
            </h2>
            <p className="max-w-xl font-body text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              {participate.lead}
            </p>
          </div>

          <div
            className="mt-10 grid border-t border-border/60 md:mt-14 md:grid-cols-[0.8fr_1.1fr_1.1fr]"
            onPointerLeave={() => setFocused(null)}
          >
            {PARTICIPATE_PATHS.map((path, index) => {
              const copy = participate.paths[path.key];
              const active = focused === path.key;
              const dimmed = focused !== null && !active;
              return (
                <a
                  key={path.key}
                  href={path.href}
                  target={path.external ? "_blank" : undefined}
                  rel={path.external ? "noreferrer noopener" : undefined}
                  onPointerEnter={() => setFocused(path.key)}
                  onFocus={() => setFocused(path.key)}
                  className={cn(
                    "group flex min-h-52 flex-col border-b border-border/60 px-1 py-7 no-underline outline-none transition-[opacity,transform,background-color] duration-200 md:min-h-72 md:border-b-0 md:px-7 md:py-9",
                    index > 0 && "md:border-l",
                    index === 0 && "md:pl-0 md:pr-8",
                    index > 0 && "bg-foreground/[0.018]",
                    active && "md:-translate-y-1 md:bg-primary/[0.055]",
                    dimmed && "opacity-35",
                    "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
                  )}
                >
                  <span className="font-body text-xs text-primary/70">{copy.audience}</span>
                  <h3 className="mt-7 max-w-sm font-display text-2xl font-semibold leading-tight text-foreground md:text-3xl">
                    {copy.title}
                  </h3>
                  <p className="mt-4 max-w-md font-body text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
                    {copy.description}
                  </p>
                  <span className="mt-auto inline-flex min-h-11 items-center gap-2 pt-6 font-body text-sm font-semibold text-primary group-hover:text-foreground">
                    {copy.cta}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </StageShell>
    </SnapSection>
  );
}
