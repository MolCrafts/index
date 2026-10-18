import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useState } from "react";
import { homeReveal, MOTION_EASE } from "@/lib/animations";
import { useHomeCopy } from "@/lib/home/copy";
import type { ApplicationKey } from "@/lib/home/copy/types";
import { APPLICATIONS, applicationHref, applicationStatus } from "@/lib/home/data";
import { HOME_BODY, HOME_H3, HOME_LEAD } from "@/lib/home/stage";
import { localizeStatus } from "@/lib/i18n/catalogCopy";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";
import { ProductMark } from "./ProductMark";

/** One shared timing, so expanding, compressing and the glow all move as one gesture. */
const MORPH = { duration: 0.52, ease: MOTION_EASE } as const;

/** Focus ring shared by every control in the stage. */
const FOCUS_RING =
  "outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[rgb(var(--accent-rgb))]";

const EXTERNAL_LINK = {
  target: "_blank",
  rel: "noreferrer noopener",
} as const;

/** One line of the expanded panel, faded in on its own beat so the text arrives in order. */
function Layer({ step, children }: { step: number; children: ReactNode }) {
  return (
    <motion.div
      variants={homeReveal}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.14 + step * 0.06, duration: 0.42, ease: MOTION_EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * The description an expanded entry carries, shared by both layouts.
 *
 * `heading` is for the layouts where this column stands alone; beside the full
 * brand mark the name and application would say everything twice, so the band
 * drops them and the column carries only the body.
 */
function EntryDetail({
  applicationKey,
  compact = false,
  heading = true,
}: {
  applicationKey: ApplicationKey;
  compact?: boolean;
  heading?: boolean;
}) {
  const { projects } = useHomeCopy();
  const app = APPLICATIONS.find((entry) => entry.key === applicationKey);
  const copy = projects.items[applicationKey];
  if (!app) return null;
  const bodyStep = heading ? 1 : 0;

  return (
    <>
      {heading ? (
        <Layer step={0}>
          <h3 className={cn(HOME_H3, compact && "text-xl md:text-xl")}>{app.product}</h3>
        </Layer>
      ) : null}
      <Layer step={bodyStep}>
        {/* Standing alone the column is supporting copy; on the stage, where the
            mark says the name and this column is the panel's main part, the
            body takes the lead rung. */}
        <p
          className={cn(
            heading
              ? cn(HOME_BODY, "mt-4")
              : cn(HOME_LEAD, "lg:text-[clamp(1.125rem,1.67vw,1.5rem)]"),
          )}
        >
          {copy.description}
        </p>
      </Layer>
    </>
  );
}

/**
 * The application stage: a band of entry points that morphs into a single expanded
 * panel.
 *
 * Everything animates through Framer's `layout`, so moving between entries is one
 * continuous morph rather than a close followed by an open — the point of the screen
 * is that the parts belong to the same stack, and a hard cut would argue otherwise.
 *
 * The band is one continuous field, not a panel: no container border or fill, and
 * it escapes the page measure to take the screen. Each waiting entry is a column
 * of light under its product's name — the page's light vocabulary, where a line
 * of light is a route the work can take — and the stage's glow travels to
 * whichever entry the reader brings forward.
 *
 * Hover brings an entry forward. The whole column is the link to that product's
 * repository — there is no separate control. The band is gated on a fine pointer:
 * a touch tablet wide enough for it would otherwise open a panel on tap and close
 * it again on the next touch.
 */
export function ApplicationStage() {
  const { projects } = useHomeCopy();
  const { locale } = useLocale();
  const [activeKey, setActiveKey] = useState<ApplicationKey>(APPLICATIONS[0].key);
  /* Only one branch is rendered. Shipping both and hiding one left the unused tree
     mounted — and on a touch tablet wide enough for the band, a tap would open a
     panel and the next touch would close it again. */
  const useBand = useMediaQuery("(min-width: 1024px) and (hover: hover) and (pointer: fine)");

  if (useBand) {
    return (
      <section
        /* The band only exists at `lg`, where the container's gutter is `px-16`,
           so `-mx-16` sets the stage flush with the page measure's outer edge. */
        className="application-band mt-16 flex h-[clamp(24rem,52vh,32rem)] gap-3"
        aria-label={projects.stageLabel}
      >
        {APPLICATIONS.map((app) => {
          const active = app.key === activeKey;
          const status = applicationStatus(app.key);
          /* One class, not two: `cn` merges conflicting flex utilities and the last
             one wins, so an active item that also carried `flex-1` collapsed back to
             an even share and never took the stage. */
          const width = active ? "flex-[5.4]" : "flex-[0.42]";

          return (
            <motion.div
              key={app.key}
              layout
              transition={{ layout: MORPH }}
              className={cn("group relative min-w-0", width)}
            >
              {active && (
                /* A blurred solid ellipse, not a radial gradient: a gradient's
                   farthest-corner falloff gets clipped at the element edge and
                   draws a seam, while blur feathers every edge equally. It does
                   not travel with `layout`: moving a `blur-3xl` layer every frame
                   is what made the morph hitch. */
                <div
                  className="pointer-events-none absolute -inset-x-10 -inset-y-4 rounded-full bg-[rgb(var(--accent-rgb))]/12 blur-3xl"
                  aria-hidden="true"
                />
              )}

              {/* The column itself is the link. Hover still brings it forward;
                  `move`, not `enter`, so a morph that slides a column under a
                  still cursor cannot flip the active entry forever. */}
              <a
                href={applicationHref(app.key)}
                {...EXTERNAL_LINK}
                aria-current={active ? "true" : undefined}
                onPointerMove={() => {
                  if (!active) setActiveKey(app.key);
                }}
                onFocus={() => setActiveKey(app.key)}
                className={cn("relative z-20 block h-full", FOCUS_RING)}
              >
                {/* Clips the reflow while a panel's width is mid-morph; the glow
                  stays outside it, so the light still bleeds past the entry. */}
                <div className="h-full overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    {active ? (
                      <motion.div
                        key="expanded"
                        className="grid h-full min-h-0 grid-cols-[1fr_1.618fr] gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.28, ease: MOTION_EASE }}
                      >
                        <div className="min-h-0 py-2">
                          <ProductMark
                            product={app.product}
                            status={status ? localizeStatus(status, locale) : undefined}
                          />
                        </div>
                        <div className="flex min-w-0 max-w-lg flex-col justify-center pr-6">
                          <EntryDetail applicationKey={app.key} heading={false} />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="compact"
                        className="relative z-10 flex h-full flex-col items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.24, ease: MOTION_EASE }}
                      >
                        {/* The waiting entry is a column of light with the name as
                          its lit node: the line brightens toward the centre,
                          carries the name there, and falls away again. */}
                        <span
                          aria-hidden="true"
                          className="w-px flex-1 bg-gradient-to-b from-transparent via-[rgb(var(--accent-rgb))]/12 to-[rgb(var(--accent-rgb))]/35"
                        />
                        <span className="waiting-product my-5 font-display text-xl font-semibold tracking-tight text-home-keyword transition-opacity duration-300 [writing-mode:vertical-rl] group-hover:opacity-80">
                          {app.product}
                        </span>
                        <span
                          aria-hidden="true"
                          className="w-px flex-1 bg-gradient-to-b from-[rgb(var(--accent-rgb))]/35 via-[rgb(var(--accent-rgb))]/12 to-transparent"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </a>
            </motion.div>
          );
        })}
      </section>
    );
  }

  return (
    <div className="mt-6">
      <section
        className="grid grid-cols-2 gap-2 min-[360px]:grid-cols-3"
        aria-label={projects.stageLabel}
      >
        {APPLICATIONS.map((app) => {
          const active = app.key === activeKey;
          return (
            <button
              key={app.key}
              type="button"
              onClick={() => setActiveKey(app.key)}
              aria-pressed={active}
              className={cn(
                "flex min-h-11 min-w-0 items-center text-left font-display text-sm font-semibold underline-offset-8 transition-colors",
                FOCUS_RING,
                active
                  ? "text-foreground underline decoration-primary decoration-2"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {app.product}
            </button>
          );
        })}
      </section>

      {APPLICATIONS.filter((app) => app.key === activeKey).map((app) => {
        const status = applicationStatus(app.key);
        return (
          <motion.div
            key={app.key}
            /* Announced politely: selecting a product replaces this content,
               which a screen reader would otherwise pass over in silence. */
            aria-live="polite"
            className="mt-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: MOTION_EASE }}
          >
            <a
              href={applicationHref(app.key)}
              {...EXTERNAL_LINK}
              className={cn("block space-y-5 py-2", FOCUS_RING)}
            >
              <ProductMark
                product={app.product}
                status={status ? localizeStatus(status, locale) : undefined}
                className="h-auto px-0"
              />
              <EntryDetail applicationKey={app.key} compact heading={false} />
            </a>
          </motion.div>
        );
      })}
    </div>
  );
}
