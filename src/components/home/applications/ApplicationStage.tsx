import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useState } from "react";
import { homeReveal, MOTION_EASE } from "@/lib/animations";
import { useHomeCopy } from "@/lib/home/copy";
import type { ApplicationKey } from "@/lib/home/copy/types";
import { APPLICATIONS, applicationHref, applicationStatus } from "@/lib/home/data";
import { HOME_BODY, HOME_H3, HOME_LEAD } from "@/lib/home/stage";
import { localizeStatus, useLocalizedEcosystem } from "@/lib/i18n/catalogCopy";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { HOME_KEYWORD } from "@/lib/styleTokens";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";
import { GroundNetwork } from "../art/GroundNetwork";
import { MonoLabel } from "../MonoLabel";
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
  const catalog = useLocalizedEcosystem();
  if (!app) return null;
  const bodyStep = heading ? 1 : 0;
  /* The catalog already names what each product is and where it lives; the stage
     reads both from there rather than keeping a second copy. */
  const href = applicationHref(app.key);
  const role = catalog.flatMap((group) => group.items).find((item) => item.href === href)?.role;

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
      {heading ? null : (
        <Layer step={bodyStep + 1}>
          {/* What the entry is, and where the link goes: the whole entry is the
              link, and without its destination written out it read as a caption. */}
          <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1">
            {role ? <MonoLabel className={HOME_KEYWORD}>{role}</MonoLabel> : null}
            <MonoLabel className="whitespace-nowrap normal-case tracking-normal">
              {href.replace("https://", "")} <span aria-hidden="true">↗</span>
            </MonoLabel>
          </p>
        </Layer>
      )}
    </>
  );
}

/**
 * How far above the band's foot each entry's line lands, in roster order.
 * Uneven on purpose: the lines come down into a disordered sheet of atoms, and
 * a row of equal lengths would read as a fence in front of it.
 */
const LANDINGS = ["mb-20", "mb-0", "mb-8", "mb-24", "mb-20", "mb-12", "mb-12", "mb-6"] as const;

/**
 * The line an entry stands on, down to an atom of the ground below. A light
 * rises up it in turn — the first entry, then the next, one every few seconds
 * (the delays are set per column in `styles/tailwind.css`) — so the motion
 * runs toward the name it belongs to, and across the names in reading order.
 */
function StandingLine({ landing }: { landing: string }) {
  return (
    <span aria-hidden="true" className={cn("flex min-h-0 flex-1 flex-col", landing)}>
      <span className="relative block w-px flex-1 overflow-hidden bg-gradient-to-b from-[rgb(var(--accent-rgb))]/15 to-[rgb(var(--accent-rgb))]/55">
        <span className="application-rise absolute inset-0 bg-gradient-to-t from-transparent from-60% to-[var(--home-blue-tint)]" />
      </span>
      <span className="relative block h-0 w-px">
        <span className="application-send absolute left-1/2 top-0 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgb(var(--accent-rgb))]/70" />
        <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--home-blue-tint)]" />
      </span>
    </span>
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
 * The band is one continuous field, not a panel: no container border or fill. Each
 * entry is a product's name standing on a line from one shared sheet of atoms —
 * eight tools, one system — with a light rising from the sheet to each name in
 * turn, and the stage's glow travels to whichever entry the reader brings forward.
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
        className="application-band relative isolate mt-12 flex h-[clamp(26rem,58vh,36rem)] gap-3"
        aria-label={projects.stageLabel}
      >
        {/* The ground starts halfway down the band and runs on below it, across
            the whole screen rather than the page measure. */}
        <GroundNetwork className="absolute left-1/2 top-1/2 -z-10 h-3/4 w-screen -translate-x-1/2" />
        {APPLICATIONS.map((app, index) => {
          const active = app.key === activeKey;
          const status = applicationStatus(app.key);
          /* One class, not two: `cn` merges conflicting flex utilities and the last
             one wins, so an active item that also carried `flex-1` collapsed back to
             an even share and never took the stage. */
          const width = active ? "flex-[5] xl:flex-[4]" : "flex-[1]";

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
                  className="pointer-events-none absolute -inset-x-10 -top-4 bottom-1/3 rounded-full bg-[rgb(var(--accent-rgb))]/12 blur-3xl"
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
                className={cn("relative z-20 flex h-full flex-col", FOCUS_RING)}
              >
                {/* An expanded panel is clipped while its width is mid-morph; a
                    waiting name is not, because the names sit on two rows and may
                    run on past their own column. */}
                <div
                  className={cn("application-wake shrink-0", active && "overflow-hidden")}
                  data-active={active}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {active ? (
                      <motion.div
                        key="expanded"
                        className="max-w-md pb-5 pr-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.28, ease: MOTION_EASE }}
                      >
                        <ProductMark
                          product={app.product}
                          status={status ? localizeStatus(status, locale) : undefined}
                          className="h-auto px-0 pb-4"
                        />
                        <EntryDetail applicationKey={app.key} heading={false} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="compact"
                        /* Two rows, alternating, so neighbouring names never meet. */
                        className={cn("pb-3", index % 2 === 0 ? "pt-14" : "pt-1")}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.24, ease: MOTION_EASE }}
                      >
                        <span className="block whitespace-nowrap font-display text-xl font-semibold tracking-tight text-home-keyword">
                          {app.product}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <StandingLine landing={LANDINGS[index] ?? "mb-0"} />
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
