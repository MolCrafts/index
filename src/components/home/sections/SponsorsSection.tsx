import claudeLogoUrl from "@/assets/claude.svg";
import { useHomeCopy } from "@/lib/home/copy";
import { sponsorItems } from "@/lib/home/data";
import { HOME_H3 } from "@/lib/home/stage";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { HomeBlock } from "../HomeBlock";
import { Reveal } from "../Reveal";

/** Trust — who backs the open-source work. */
export function SponsorsSection() {
  const { sponsors } = useHomeCopy();

  return (
    <HomeBlock id="trust" title={sponsors.title} lead={sponsors.lead} scale="statement">
      <Reveal delay={0.08}>
        {sponsorItems.map((supporter) => (
          <a
            key={supporter.name}
            href={supporter.href}
            target="_blank"
            rel="noreferrer noopener"
            className="group flex items-center gap-5 no-underline outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {/* Empty alt: the supporter's name sits right beside the mark. */}
            <img src={claudeLogoUrl} alt="" width={48} height={48} className="h-12 w-12" />
            <span>
              <span className={cn(HOME_H3, "block")}>{supporter.name}</span>
              <span className="mt-2 flex items-center gap-2 font-body text-sm text-muted-foreground group-hover:text-foreground">
                {sponsors.supporterNote}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </span>
          </a>
        ))}
      </Reveal>
    </HomeBlock>
  );
}
