import claudeLogoUrl from "@/assets/claude.svg";
import { useHomeCopy } from "@/lib/home/copy";
import { sponsorItems } from "@/lib/home/data";
import { ArrowUpRight } from "lucide-react";
import { StageShell } from "../StageShell";
import { SnapSection } from "../fullpage/SnapSection";

export function SponsorsSection() {
  const { sponsors } = useHomeCopy();

  return (
    <SnapSection id="trust" aria-labelledby="trust-heading" className="justify-center">
      <StageShell field={0.16} veil="strong" className="flex min-h-full items-center">
        <div className="mx-auto grid w-full max-w-[90rem] gap-12 px-6 py-20 sm:px-10 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-20 lg:px-16">
          <div>
            <h2
              id="trust-heading"
              className="max-w-4xl font-display text-[clamp(2.5rem,5.6vw,5.8rem)] font-semibold leading-[1.01] tracking-[-0.055em] text-foreground"
            >
              {sponsors.title}
            </h2>
            <p className="mt-7 max-w-2xl font-body text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              {sponsors.lead}
            </p>
          </div>

          <div className="border-y border-border/55 py-7 md:border-l md:border-y-0 md:py-12 md:pl-12">
            {sponsorItems.map((supporter) => (
              <a
                key={supporter.name}
                href={supporter.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-5 no-underline outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <img
                  src={claudeLogoUrl}
                  alt={supporter.logoAlt}
                  width={48}
                  height={48}
                  className="h-12 w-12"
                />
                <span>
                  <span className="block font-display text-2xl font-semibold text-foreground md:text-3xl">
                    {supporter.name}
                  </span>
                  <span className="mt-2 flex items-center gap-2 font-body text-sm text-muted-foreground group-hover:text-foreground">
                    {sponsors.supporterNote}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </StageShell>
    </SnapSection>
  );
}
