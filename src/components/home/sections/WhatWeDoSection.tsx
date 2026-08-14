import { useHomeCopy } from "@/lib/home/copy";
import { HOME_BODY, HOME_H3 } from "@/lib/home/stage";
import { cn } from "@/lib/utils";
import { HomeBlock } from "../HomeBlock";
import { Reveal } from "../Reveal";

/** Capabilities — three pillars under the shared block opening. */
export function WhatWeDoSection() {
  const { whatWeDo } = useHomeCopy();

  return (
    <HomeBlock id="solutions" title={whatWeDo.title} lead={whatWeDo.lead} scale="section">
      <div className="grid md:grid-cols-3 md:gap-10 lg:gap-12">
        {whatWeDo.pillars.map((pillar, index) => (
          <Reveal key={pillar.title} delay={index * 0.08}>
            <article className="border-b border-border/60 py-6 last:border-b-0 md:border-b-0 md:py-8">
              <h3 className={cn(HOME_H3, "max-w-md md:min-h-[4.5rem]")}>{pillar.title}</h3>
              <p className={cn(HOME_BODY, "mt-3 max-w-md")}>{pillar.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </HomeBlock>
  );
}
