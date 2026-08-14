import { MOTION_EASE, homeReveal } from "@/lib/animations";
import { useHomeCopy } from "@/lib/home/copy";
import type { ApplicationKey } from "@/lib/home/copy/types";
import { APPLICATIONS, applicationHref } from "@/lib/home/data";
import { HOME_BODY, HOME_H3 } from "@/lib/home/stage";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Boxes, BrainCircuit, Eye, FlaskConical, Orbit, Package } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { type ReactNode, useState } from "react";
import { ProductMark } from "./ProductMark";

const ICONS: Record<ApplicationKey, LucideIcon> = {
  molpy: Boxes,
  molpack: Package,
  molvis: Eye,
  molexp: FlaskConical,
  molnex: BrainCircuit,
  atomiverse: Orbit,
};

/** One shared timing, so expanding, compressing and the glow all move as one gesture. */
const MORPH = { duration: 0.52, ease: MOTION_EASE } as const;

/** Focus ring shared by every control in the stage. */
const FOCUS_RING =
  "outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[rgb(var(--accent-rgb))]";

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

/** The description and link an expanded entry carries, shared by both layouts. */
function EntryDetail({
  applicationKey,
  compact = false,
}: {
  applicationKey: ApplicationKey;
  compact?: boolean;
}) {
  const { projects } = useHomeCopy();
  const app = APPLICATIONS.find((entry) => entry.key === applicationKey);
  const copy = projects.items[applicationKey];
  if (!app) return null;

  return (
    <>
      <Layer step={0}>
        <h3 className={cn(HOME_H3, compact && "text-xl md:text-xl")}>{app.product}</h3>
      </Layer>
      <Layer step={1}>
        <span className="mt-1.5 block font-body text-sm text-[rgb(var(--accent-rgb))]">
          {copy.applicationTitle}
        </span>
      </Layer>
      <Layer step={2}>
        <p className={cn(HOME_BODY, "mt-4")}>{copy.long}</p>
      </Layer>
      <Layer step={3}>
        <a
          href={applicationHref(app.key)}
          className={cn(
            "relative z-30 mt-6 inline-flex min-h-11 items-center gap-2 font-body text-sm font-semibold text-[rgb(var(--accent-rgb))] no-underline hover:text-foreground",
            FOCUS_RING,
          )}
        >
          {projects.cta} {app.product}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
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
 * The band is the reader's only route from `/` to a product page, so it activates on
 * click and keyboard as well as hover, and the whole thing is gated on a fine
 * pointer: a touch tablet wide enough for the band would otherwise open a panel on
 * tap and close it again on the very next touch.
 */
export function ApplicationStage() {
  const { projects } = useHomeCopy();
  const [activeKey, setActiveKey] = useState<ApplicationKey>(APPLICATIONS[0].key);
  /* Only one branch is rendered. Shipping both and hiding one left the unused tree
     mounted — and on a touch tablet wide enough for the band, a tap would open a
     panel and the next touch would close it again. */
  const useBand = useMediaQuery("(min-width: 1024px) and (hover: hover) and (pointer: fine)");

  if (useBand) {
    return (
      <section
        className="flex h-[clamp(21rem,44vh,28rem)] w-full overflow-hidden rounded-2xl border border-border/70 bg-foreground/[0.015]"
        aria-label={projects.stageLabel}
      >
        {APPLICATIONS.map((app) => {
          const copy = projects.items[app.key];
          const Icon = ICONS[app.key];
          const active = app.key === activeKey;
          /* One class, not two: `cn` merges conflicting flex utilities and the last
             one wins, so an active item that also carried `flex-1` collapsed back to
             an even share and never took the stage. */
          const width = active ? "flex-[5.4]" : "flex-[0.42]";

          return (
            <motion.div
              key={app.key}
              layout
              transition={{ layout: MORPH }}
              className={cn(
                "relative min-w-0 border-r border-border/70 transition-colors duration-300 last:border-r-0",
                width,
                active && "bg-foreground/[0.035]",
              )}
            >
              {active && (
                <motion.div
                  layoutId="application-stage-glow"
                  transition={{ layout: MORPH }}
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(var(--accent-rgb),0.14),transparent_62%)] shadow-[0_0_60px_-12px_rgba(var(--accent-rgb),0.5)_inset]"
                  aria-hidden="true"
                />
              )}

              {!active && (
                <button
                  type="button"
                  aria-label={`${app.product} — ${copy.applicationTitle}`}
                  onClick={() => setActiveKey(app.key)}
                  onPointerEnter={() => setActiveKey(app.key)}
                  onFocus={() => setActiveKey(app.key)}
                  className={cn("absolute inset-0 z-20 h-full w-full cursor-pointer", FOCUS_RING)}
                />
              )}

              <AnimatePresence mode="wait" initial={false}>
                {active ? (
                  <motion.div
                    key="expanded"
                    className="relative z-10 grid h-full min-h-0 grid-cols-[1.95fr_1fr]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28, ease: MOTION_EASE }}
                  >
                    <div className="min-h-0 p-4">
                      <ProductMark
                        product={app.product}
                        applicationTitle={copy.applicationTitle}
                        icon={Icon}
                      />
                    </div>
                    <div className="flex min-w-0 flex-col justify-center border-l border-border/60 p-6">
                      <EntryDetail applicationKey={app.key} />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="compact"
                    className="relative z-10 flex h-full flex-col p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.24, ease: MOTION_EASE }}
                  >
                    <Icon className="h-5 w-5 shrink-0 text-foreground/60" aria-hidden="true" />
                    <span className="mt-4 font-display text-base font-semibold tracking-tight text-foreground/80 [writing-mode:vertical-rl]">
                      {app.product}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </section>
    );
  }

  return (
    <div>
      <section
        className="-mx-6 flex snap-x snap-mandatory gap-2 overflow-x-auto px-6 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label={projects.stageLabel}
      >
        {APPLICATIONS.map((app) => {
          const Icon = ICONS[app.key];
          const active = app.key === activeKey;
          return (
            <button
              key={app.key}
              type="button"
              onClick={() => setActiveKey(app.key)}
              aria-pressed={active}
              className={cn(
                "flex min-h-11 shrink-0 snap-start items-center gap-2 rounded-full border px-4 font-display text-sm font-semibold transition-colors",
                FOCUS_RING,
                active
                  ? "border-[rgb(var(--accent-rgb))]/60 bg-[rgb(var(--accent-rgb))]/10 text-foreground"
                  : "border-border/70 text-muted-foreground",
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {app.product}
            </button>
          );
        })}
      </section>

      {APPLICATIONS.filter((app) => app.key === activeKey).map((app) => (
        <motion.div
          key={app.key}
          /* Announced politely: tapping a chip replaces this panel's whole contents,
               which a screen reader would otherwise pass over in silence. */
          aria-live="polite"
          className="mt-3 overflow-hidden rounded-2xl border border-[rgb(var(--accent-rgb))]/40 bg-foreground/[0.03]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: MOTION_EASE }}
        >
          <div className="h-40 p-3">
            <ProductMark
              product={app.product}
              applicationTitle={projects.items[app.key].applicationTitle}
              icon={ICONS[app.key]}
              className="px-6"
            />
          </div>
          <div className="border-t border-border/60 p-5">
            <EntryDetail applicationKey={app.key} compact />
          </div>
        </motion.div>
      ))}

      {/* The headline asks the reader to weigh one against the stack, so the whole
            roster stays legible here even though only one entry is expanded. */}
      <ul className="mt-6 border-t border-border/60">
        {APPLICATIONS.map((app) => (
          <li
            key={app.key}
            className="flex items-baseline justify-between gap-4 border-b border-border/60 py-3"
          >
            <span className="font-display text-sm font-semibold text-foreground">
              {app.product}
            </span>
            <span className="text-right font-body text-sm text-muted-foreground">
              {projects.items[app.key].short}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
