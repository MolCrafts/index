import { Button } from "@/components/ui/button";
import { useHomeCopy } from "@/lib/home/copy";
import { heroLinks } from "@/lib/home/data";
import { HOME_BODY, HOME_H3 } from "@/lib/home/stage";
import { HOME_GRADIENT_TEXT } from "@/lib/styleTokens";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { HomeBlock } from "../HomeBlock";
import { Reveal } from "../Reveal";

/** The commercial claim and the brand statement. */
export function ApproachSection() {
  const { hero, approach } = useHomeCopy();
  const [titleBeforeOpenSource, titleAfterOpenSource] = hero.title.split("open-source");

  const claim = (
    <>
      <span className="block">
        {titleAfterOpenSource === undefined ? (
          hero.title
        ) : (
          <>
            {titleBeforeOpenSource}
            <span className="whitespace-nowrap">open-source</span>
            {titleAfterOpenSource}
          </>
        )}
      </span>
      <span className={cn(HOME_GRADIENT_TEXT, "mt-3 block pb-2")}>{hero.accent}</span>
    </>
  );

  return (
    <HomeBlock id="about" title={claim} lead={approach.lead} scale="statement">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] md:gap-12">
        <Reveal delay={0.08}>
          <h3 className={HOME_H3}>{approach.title}</h3>
          <p className={cn(HOME_BODY, "mt-4 max-w-[62ch]")}>{approach.statement}</p>
          <Button
            asChild
            size="lg"
            className="mt-7 rounded-full shadow-[0_18px_42px_-20px_hsl(var(--primary)/0.75)] hover:-translate-y-0.5"
          >
            <a href={heroLinks.primaryHref}>
              {hero.primaryCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </Reveal>

        <Reveal delay={0.16}>
          <ul className="grid gap-0 self-start border-t border-border/55 sm:grid-cols-3 md:grid-cols-1 md:border-t-0">
            {approach.promises.map((promise) => (
              <li
                key={promise}
                className="border-b border-border/45 py-3.5 font-body text-base font-semibold leading-7 text-foreground sm:border-b-0 sm:border-r sm:px-3 sm:first:pl-0 sm:last:border-r-0 md:border-b md:border-r-0 md:px-0 md:first:pt-0 md:last:border-b-0"
              >
                {promise}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </HomeBlock>
  );
}
