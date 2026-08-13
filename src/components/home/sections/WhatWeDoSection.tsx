import { useHomeCopy } from "@/lib/home/copy";
import { StageShell } from "../StageShell";
import { SnapSection } from "../fullpage/SnapSection";

export function WhatWeDoSection() {
  const { whatWeDo } = useHomeCopy();

  return (
    <SnapSection id="solutions" aria-labelledby="solutions-heading" className="justify-center">
      <StageShell
        field={0.12}
        veil="medium"
        className="flex min-h-full items-center justify-center"
      >
        <div className="home-section-stage mx-auto w-full max-w-[78rem] px-6 py-20 sm:px-10 sm:py-24 md:px-12 lg:px-16">
          <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1.18fr)_minmax(19rem,0.82fr)] md:gap-10 lg:gap-12">
            <h2
              id="solutions-heading"
              className="max-w-[46rem] font-display text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-foreground md:text-[clamp(3.25rem,3.5vw,3.5rem)]"
            >
              {whatWeDo.title}
            </h2>
            <p className="max-w-[31rem] font-body text-base leading-7 text-muted-foreground md:justify-self-end">
              {whatWeDo.lead}
            </p>
          </div>

          <div className="mt-10 grid border-t border-border/60 md:grid-cols-3 md:gap-10 lg:gap-12">
            {whatWeDo.pillars.map((pillar) => {
              return (
                <article
                  key={pillar.title}
                  className="border-b border-border/60 py-6 last:border-b-0 md:border-b-0 md:py-8"
                >
                  <h3 className="max-w-md font-display text-2xl font-semibold leading-tight text-foreground md:min-h-[4.5rem] md:text-[1.75rem]">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 max-w-md font-body text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
                    {pillar.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </StageShell>
    </SnapSection>
  );
}
