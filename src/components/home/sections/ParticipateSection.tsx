import { useHomeCopy } from "@/lib/home/copy";
import { PARTICIPATE_PATHS } from "@/lib/home/data";
import { HOME_BODY, HOME_CONTAINER, HOME_H2_STATEMENT, HOME_H3, HOME_LEAD } from "@/lib/home/stage";
import { cn } from "@/lib/utils";
import { HomeSection } from "../HomeSection";
import { Reveal } from "../Reveal";
import { SectionMarker } from "../SectionMarker";

/** A full-width invitation followed by open, horizontal collaboration routes. */
export function ParticipateSection() {
  const { participate } = useHomeCopy();
  return (
    <HomeSection id="collaboration">
      <SectionMarker sectionId="collaboration" />
      <div className={cn(HOME_CONTAINER, "py-24 md:pb-20 md:pt-40")}>
        <Reveal className="text-center">
          <h2
            id="collaboration-heading"
            className={cn(HOME_H2_STATEMENT, "lg:text-[clamp(3rem,5.4vw,4.875rem)]")}
          >
            {participate.title.plain} {participate.title.accent}
          </h2>
          <p className={cn(HOME_LEAD, "mx-auto mt-7 max-w-[52.5rem] md:text-[1.375rem]")}>
            {participate.supporting}
          </p>
        </Reveal>
        <ul className="mt-16 md:mt-20">
          {PARTICIPATE_PATHS.map((path, index) => {
            const copy = participate.paths[path.key];
            return (
              <li key={path.key} className="border-t border-primary/20">
                <Reveal delay={0.65 + index * 0.3}>
                  <a
                    href={path.href}
                    target={path.external ? "_blank" : undefined}
                    rel={path.external ? "noreferrer noopener" : undefined}
                    className="group grid gap-4 py-7 no-underline outline-none focus-visible:ring-2 focus-visible:ring-primary md:grid-cols-[3rem_1fr_1fr] md:items-start md:gap-8 md:py-8"
                  >
                    <span className="home-subtitle font-mono text-xs md:pt-3">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className={cn(HOME_H3, "md:text-[2.625rem]")}>{copy.statement}</h3>
                    <p className={cn(HOME_BODY, "max-w-xl md:pt-2 md:text-lg")}>{copy.line}</p>
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </HomeSection>
  );
}
