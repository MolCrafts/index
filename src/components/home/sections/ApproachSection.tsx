import {
  type ApproachBuildMotion,
  approachLineLay,
  approachRise,
  prefersReducedMotion,
} from "@/lib/animations";
import { useHomeCopy } from "@/lib/home/copy";
import { heroLinks } from "@/lib/home/data";
import { HOME_BLOCK, HOME_BODY, HOME_CONTAINER, HOME_H3 } from "@/lib/home/stage";
import { HOME_EMPHASIS, HOME_KEYWORD, HOME_TEXT_LINK } from "@/lib/styleTokens";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { HomeSection } from "../HomeSection";
import { SectionHeader } from "../SectionHeader";
import { SectionMarker } from "../SectionMarker";

/**
 * The build sequence, stated in one place: the claim settles, then the two
 * columns go up in parallel.
 */
const BUILD = {
  titleLine: { delay: 0.2 },
  titleAccent: { delay: 0.32 },
  lead: { delay: 0.46 },
  approachTitle: { delay: 0.6 },
  statement: { delay: 0.72 },
  cta: { delay: 0.86 },
} as const satisfies Record<string, ApproachBuildMotion>;

/**
 * The three promises as three courses of a structure: the bottom course is the
 * foundation — widest, brightest, laid first — and each one above it is
 * narrower and lands later, so the stack visibly goes up brick over brick.
 * Order follows the copy top-to-bottom; depth runs bottom-to-top.
 */
const COURSES = [
  { width: "w-2/5", strength: "opacity-60", rise: 0.9, lay: 1.05 },
  { width: "w-3/5", strength: "opacity-80", rise: 0.7, lay: 0.85 },
  { width: "w-full", strength: "opacity-100", rise: 0.5, lay: 0.65 },
] as const;

/**
 * The commercial claim and the brand statement.
 *
 * The three promises are the only lines on this screen — green courses of
 * light, widest at the foundation. The way in is an underline, not a button,
 * so nothing outshines the headline.
 */
export function ApproachSection() {
  const { hero, approach } = useHomeCopy();
  const reduceMotion = prefersReducedMotion();
  const [titleBeforeOpenSource, titleAfterOpenSource] = hero.title.split("open-source");

  const claim = (
    <>
      <motion.span className="block" custom={BUILD.titleLine} variants={approachRise}>
        {titleAfterOpenSource === undefined ? (
          hero.title
        ) : (
          <>
            {titleBeforeOpenSource}
            <span className="whitespace-nowrap">open-source</span>
            {titleAfterOpenSource}
          </>
        )}
      </motion.span>
      <motion.span
        className={cn(HOME_EMPHASIS, "mt-3 block pb-2")}
        custom={BUILD.titleAccent}
        variants={approachRise}
      >
        {hero.accent}
      </motion.span>
    </>
  );

  return (
    <HomeSection id="about">
      <SectionMarker sectionId="about" />
      <motion.div
        className={cn(HOME_CONTAINER, HOME_BLOCK, "relative isolate")}
        initial={reduceMotion ? "illuminated" : "dormant"}
        whileInView="illuminated"
        viewport={{ once: true, amount: 0.3 }}
      >
        <SectionHeader
          sectionId="about"
          title={claim}
          lead={
            <motion.span className="block" custom={BUILD.lead} variants={approachRise}>
              {approach.lead}
            </motion.span>
          }
          scale="statement"
        />
        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] md:gap-12">
          <div>
            <motion.h3 className={HOME_H3} custom={BUILD.approachTitle} variants={approachRise}>
              {approach.title}
            </motion.h3>
            <motion.p
              className={cn(HOME_BODY, "mt-4 max-w-[62ch]")}
              custom={BUILD.statement}
              variants={approachRise}
            >
              {approach.statement}
            </motion.p>
            {/* An underline of light, not a button: the route in stays quieter
                than the claim it follows. */}
            <motion.div custom={BUILD.cta} variants={approachRise}>
              <a href={heroLinks.primaryHref} className={cn(HOME_TEXT_LINK, "mt-7")}>
                <span className="border-b border-current pb-1">{hero.primaryCta}</span>
              </a>
            </motion.div>
          </div>

          {/* Three green courses of light; the stack bottom-aligns so the
              foundation is the widest course. */}
          <ul className="grid gap-7 self-end">
            {approach.promises.map((promise, index) => (
              <motion.li
                key={promise}
                custom={{ delay: COURSES[index].rise }}
                variants={approachRise}
              >
                <span className={cn("font-body text-base font-semibold leading-7", HOME_KEYWORD)}>
                  {promise}
                </span>
                <motion.span
                  aria-hidden="true"
                  className={cn(
                    "mt-3 block h-0.5 origin-left rounded-full bg-gradient-to-r from-primary via-primary/70 to-transparent [box-shadow:0_0_12px_hsl(var(--primary)/0.45)]",
                    COURSES[index].width,
                    COURSES[index].strength,
                  )}
                  custom={{ delay: COURSES[index].lay }}
                  variants={approachLineLay}
                />
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </HomeSection>
  );
}
