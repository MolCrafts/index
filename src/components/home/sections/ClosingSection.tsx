import { Button } from "@/components/ui/button";
import { useHomeCopy } from "@/lib/home/copy";
import { closingLinks } from "@/lib/home/data";
import { ArrowRight } from "lucide-react";
import { HomeBlock } from "../HomeBlock";
import { Reveal } from "../Reveal";

/** Contact — the closing call to action. The page footer is its own sibling block. */
export function ClosingSection() {
  const { cta } = useHomeCopy();

  return (
    <HomeBlock id="contact" title={cta.title} lead={cta.lead} scale="statement">
      <Reveal delay={0.08}>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="rounded-full">
            <a href={closingLinks.contactHref}>
              {cta.primaryCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full bg-card/70">
            <a href={closingLinks.applicationsHref}>{cta.secondaryCta}</a>
          </Button>
        </div>
      </Reveal>
    </HomeBlock>
  );
}
