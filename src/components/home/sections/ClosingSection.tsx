import { useHomeCopy } from "@/lib/home/copy";
import { closingLinks } from "@/lib/home/data";
import { ArrowRight, Github } from "lucide-react";
import { LogoIcon } from "../../Icons";
import { StageShell } from "../StageShell";
import { useFullpage } from "../fullpage/FullpageProvider";
import { SnapSection } from "../fullpage/SnapSection";

export function ClosingSection() {
  const { cta, footer } = useHomeCopy();
  const { goTo } = useFullpage();
  const year = new Date().getFullYear();

  return (
    <SnapSection id="contact" aria-labelledby="contact-heading" className="home-snap-fill">
      <StageShell field={0.24} veil="strong" className="flex h-full min-h-0 flex-col">
        <div className="mx-auto flex min-h-0 w-full max-w-[90rem] flex-1 flex-col justify-center px-6 pb-10 pt-24 sm:px-10 lg:px-16">
          <h2
            id="contact-heading"
            className="max-w-6xl font-display text-[clamp(2.7rem,6.2vw,6.6rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-foreground"
          >
            {cta.title}
          </h2>
          <p className="mt-7 max-w-2xl font-body text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
            {cta.lead}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 md:mt-10">
            <a href={closingLinks.contactHref} className="home-button home-button--primary">
              {cta.primaryCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={closingLinks.applicationsHref} className="home-button home-button--quiet">
              {cta.secondaryCta}
            </a>
          </div>
        </div>

        <footer className="shrink-0 border-t border-border/50 px-6 py-5 sm:px-10 lg:px-16">
          <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <LogoIcon className="!h-9 !w-9" />
              <span className="home-gradient-text font-display text-xl font-semibold">
                MolCrafts
              </span>
            </div>
            <p className="max-w-lg font-body text-sm leading-6 text-muted-foreground md:text-right">
              {footer.tagline}
            </p>
          </div>
          <div className="mx-auto mt-4 flex w-full max-w-[90rem] flex-wrap items-center justify-between gap-3 font-body text-xs text-muted-foreground">
            <span>
              © {year} MolCrafts · {footer.license}
            </span>
            <div className="flex items-center gap-5">
              <a
                href={closingLinks.githubHref}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-11 items-center gap-2 text-muted-foreground no-underline hover:text-foreground"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                {footer.github}
              </a>
              <button
                type="button"
                onClick={() => goTo(0, "start")}
                className="min-h-11 text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary"
              >
                {footer.backToTop}
              </button>
            </div>
          </div>
        </footer>
      </StageShell>
    </SnapSection>
  );
}
