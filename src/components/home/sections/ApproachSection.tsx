import { useHomeCopy } from "@/lib/home/copy";
import { heroLinks } from "@/lib/home/data";
import { ArrowRight } from "lucide-react";
import { StageShell } from "../StageShell";
import { SnapSection } from "../fullpage/SnapSection";

/** The former commercial hero and the brand statement, combined into one decision screen. */
export function ApproachSection() {
  const { hero, approach } = useHomeCopy();
  const [titleBeforeOpenSource, titleAfterOpenSource] = hero.title.split("open-source");

  return (
    <SnapSection id="about" aria-labelledby="about-heading" className="justify-center">
      <StageShell field={0.1} veil="medium" className="flex min-h-full items-center justify-center">
        <div className="home-section-stage mx-auto grid w-full max-w-[78rem] items-center gap-12 px-6 py-20 sm:px-10 sm:py-24 md:grid-cols-[minmax(0,1.18fr)_minmax(19rem,0.82fr)] md:gap-10 md:px-12 lg:gap-12 lg:px-16">
          <div className="min-w-0">
            <h2
              id="about-heading"
              className="home-hero-title min-w-0 max-w-[46rem] font-display text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-foreground md:text-[clamp(3.25rem,3.5vw,3.5rem)]"
            >
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
              <span className="home-gradient-text mt-3 block pb-2">{hero.accent}</span>
            </h2>

            <p className="mt-6 max-w-[54ch] font-body text-base leading-7 text-muted-foreground">
              {approach.lead}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={heroLinks.primaryHref} className="home-button home-button--primary">
                {hero.primaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="min-w-0 md:w-full md:max-w-[31rem] md:justify-self-end">
            <h3 className="max-w-xl font-display text-3xl font-semibold leading-[1.15] tracking-[-0.03em] text-foreground md:text-[2rem]">
              {approach.title}
            </h3>
            <p className="mt-5 max-w-[62ch] font-body text-base leading-7 text-muted-foreground">
              {approach.statement}
            </p>
            <ul className="mt-6 grid gap-0 border-t border-border/55 sm:grid-cols-3 md:grid-cols-1">
              {approach.promises.map((promise) => (
                <li
                  key={promise}
                  className="border-b border-border/45 py-3.5 font-body text-base font-semibold leading-7 text-foreground sm:border-b-0 sm:border-r sm:px-3 sm:first:pl-0 sm:last:border-r-0 md:border-b md:border-r-0 md:px-0 md:first:pt-4 md:last:border-b-0"
                >
                  {promise}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </StageShell>
    </SnapSection>
  );
}
