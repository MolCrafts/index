import aspirin from "@/assets/molecules/aspirin.webp";
import caffeine from "@/assets/molecules/caffeine.webp";
import dopamine from "@/assets/molecules/dopamine.webp";
import ibuprofen from "@/assets/molecules/ibuprofen.webp";
import nicotine from "@/assets/molecules/nicotine.webp";
import quinine from "@/assets/molecules/quinine.webp";
import { prefersReducedMotion } from "@/lib/animations";
import { useHomeCopy } from "@/lib/home/copy";
import type { ApplicationKey } from "@/lib/home/copy/types";
import { APPLICATIONS } from "@/lib/home/data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useFullpage } from "../fullpage/FullpageProvider";
import { SnapSection } from "../fullpage/SnapSection";

interface MolecularImage {
  readonly src: string;
  readonly width: number;
  readonly height: number;
}

const IMAGE_LIBRARY: Record<string, MolecularImage> = {
  aspirin: { src: aspirin, width: 1886, height: 1270 },
  caffeine: { src: caffeine, width: 1349, height: 1043 },
  dopamine: { src: dopamine, width: 1394, height: 902 },
  ibuprofen: { src: ibuprofen, width: 1496, height: 767 },
  nicotine: { src: nicotine, width: 1459, height: 810 },
  quinine: { src: quinine, width: 1411, height: 786 },
};

const APPLICATION_IMAGES: Record<ApplicationKey, readonly MolecularImage[]> = {
  simulation: [IMAGE_LIBRARY.quinine, IMAGE_LIBRARY.aspirin, IMAGE_LIBRARY.caffeine],
  prediction: [IMAGE_LIBRARY.caffeine, IMAGE_LIBRARY.nicotine, IMAGE_LIBRARY.dopamine],
  systemDesign: [IMAGE_LIBRARY.aspirin, IMAGE_LIBRARY.ibuprofen, IMAGE_LIBRARY.quinine],
  visualAnalysis: [IMAGE_LIBRARY.dopamine, IMAGE_LIBRARY.quinine, IMAGE_LIBRARY.nicotine],
  collaboration: [IMAGE_LIBRARY.ibuprofen, IMAGE_LIBRARY.caffeine, IMAGE_LIBRARY.aspirin],
};

const CAROUSEL_MS = 3200;

export function ProjectsSection() {
  const { projects } = useHomeCopy();
  const { activeIndex, sectionIds } = useFullpage();
  const [activeKey, setActiveKey] = useState<ApplicationKey | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);
  const currentImages = APPLICATION_IMAGES[activeKey ?? APPLICATIONS[0].key];
  const isSectionActive = sectionIds[activeIndex] === "applications";

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      setReducedMotion(prefersReducedMotion());
    };
    syncPreference();
    query.addEventListener("change", syncPreference);
    return () => query.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (!activeKey || !isSectionActive || reducedMotion) return;
    const interval = window.setInterval(() => {
      setImageIndex((current) => (current + 1) % currentImages.length);
    }, CAROUSEL_MS);
    return () => window.clearInterval(interval);
  }, [activeKey, currentImages.length, isSectionActive, reducedMotion]);

  const activate = (key: ApplicationKey) => {
    if (key === activeKey) return;
    setActiveKey(key);
    setImageIndex(0);
  };

  const collapse = () => {
    setActiveKey(null);
    setImageIndex(0);
  };

  const showImage = (offset: number) => {
    setImageIndex((current) => (current + offset + currentImages.length) % currentImages.length);
  };

  const imagePanel = (key: ApplicationKey, compact = false) => {
    const images = APPLICATION_IMAGES[key];
    const copy = projects.items[key];
    const image = images[imageIndex] ?? images[0];
    return (
      <div
        className={cn(
          "relative flex min-h-0 items-center justify-center overflow-hidden",
          compact ? "h-36 sm:h-44" : "h-full",
        )}
      >
        <div className="home-application-glow" aria-hidden="true" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={image.src}
            src={image.src}
            alt={`${copy.imageAlt} ${imageIndex + 1}/${images.length} ${projects.imageCounter}`}
            width={image.width}
            height={image.height}
            draggable={false}
            className="relative z-[1] max-h-full w-full object-contain px-4 py-3 drop-shadow-[0_24px_36px_rgba(0,0,0,0.48)]"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.36 }}
          />
        </AnimatePresence>
      </div>
    );
  };

  return (
    <SnapSection
      id="applications"
      aria-labelledby="applications-heading"
      className="home-snap-fill"
    >
      <div className="home-section-stage mx-auto flex h-full w-full max-w-[100rem] flex-col justify-center px-4 pb-6 pt-24 sm:px-8 md:px-10 md:pb-8 md:pt-20 lg:px-14">
        <div className="mx-auto mb-5 grid w-full max-w-[90rem] gap-3 md:mb-5 md:grid-cols-[1fr_0.8fr] md:items-end md:gap-12">
          <h2
            id="applications-heading"
            className="font-display text-[clamp(2.1rem,4vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-foreground"
          >
            {projects.title}
          </h2>
          <p className="max-w-xl font-body text-sm leading-6 text-muted-foreground md:justify-self-end md:text-base md:leading-7">
            {projects.lead}
          </p>
        </div>

        <div
          className="hidden h-[clamp(21rem,52vh,33rem)] w-full gap-3 md:flex"
          onPointerLeave={(event) => {
            const focused = document.activeElement;
            if (!(focused instanceof Node) || !event.currentTarget.contains(focused)) collapse();
          }}
        >
          {APPLICATIONS.map((app) => {
            const copy = projects.items[app.key];
            const active = app.key === activeKey;
            return (
              <motion.article
                layout
                key={app.key}
                tabIndex={0}
                aria-expanded={active}
                aria-label={`${copy.title} — ${app.product}`}
                onPointerEnter={() => activate(app.key)}
                onFocusCapture={() => activate(app.key)}
                onBlurCapture={(event) => {
                  const next = event.relatedTarget;
                  if (!(next instanceof Node) || !event.currentTarget.contains(next)) collapse();
                }}
                className={cn(
                  "home-application-card relative min-w-0 overflow-hidden outline-none",
                  "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  active && "home-application-card--active z-10",
                )}
                style={{ flex: active ? "2.15 1 0%" : "1 1 0%" }}
                transition={{ layout: { duration: 0.48, ease: [0.16, 1, 0.3, 1] } }}
              >
                {active ? (
                  <div className="grid h-full min-w-0 grid-cols-[minmax(0,1.25fr)_minmax(13rem,1fr)]">
                    {imagePanel(app.key)}
                    <div className="home-application-copy relative z-[2] flex min-w-0 flex-col justify-end border-l border-primary/15 p-6">
                      <span className="font-body text-xs font-semibold text-primary">
                        {app.product}
                      </span>
                      <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-foreground lg:text-3xl">
                        {copy.title}
                      </h3>
                      <p className="mt-3 font-body text-sm leading-6 text-foreground/75 lg:text-base lg:leading-7">
                        {copy.summary}
                      </p>
                      <a
                        href={app.href}
                        className="mt-6 inline-flex min-h-11 items-center gap-2 font-body text-sm font-semibold text-primary no-underline outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        {copy.cta}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                      <div className="mt-auto flex items-center justify-end gap-3 pt-8">
                        <div className="flex items-center gap-2">
                          {currentImages.map((imageItem, index) => (
                            <button
                              key={imageItem.src}
                              type="button"
                              onClick={() => setImageIndex(index)}
                              aria-label={`${index + 1} / ${currentImages.length}`}
                              aria-current={index === imageIndex ? "true" : undefined}
                              className={cn(
                                "h-2.5 rounded-full transition-[width,background-color] duration-200",
                                index === imageIndex
                                  ? "w-6 bg-primary"
                                  : "w-2.5 bg-foreground/30 hover:bg-foreground/60",
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full flex-col px-5 py-6">
                    <span className="font-body text-xs font-semibold text-primary">
                      {app.product}
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold leading-tight text-foreground xl:text-xl">
                      {copy.title}
                    </h3>
                    <p className="mt-3 line-clamp-4 font-body text-sm leading-6 text-foreground/68">
                      {copy.summary}
                    </p>
                    <ArrowRight className="mt-auto h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>

        <div className="home-application-rail flex h-[clamp(18rem,50vh,25rem)] snap-x snap-mandatory items-start gap-3 overflow-x-auto overflow-y-hidden md:hidden">
          {APPLICATIONS.map((app) => {
            const copy = projects.items[app.key];
            const active = app.key === activeKey;
            return (
              <article
                key={app.key}
                className={cn(
                  "home-application-card w-[78vw] max-w-sm shrink-0 snap-center overflow-hidden",
                  active && "home-application-card--active",
                )}
              >
                <button
                  type="button"
                  className="flex min-h-28 w-full flex-col p-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                  onClick={() => (active ? collapse() : activate(app.key))}
                  aria-expanded={active}
                >
                  <span className="font-body text-xs font-semibold text-primary">
                    {app.product}
                  </span>
                  <span className="mt-3 font-display text-xl font-semibold leading-tight text-foreground">
                    {copy.title}
                  </span>
                  {!active && (
                    <span className="mt-2 line-clamp-2 font-body text-sm leading-5 text-foreground/70">
                      {copy.summary}
                    </span>
                  )}
                </button>

                {active && (
                  <div className="border-t border-primary/15">
                    {imagePanel(app.key, true)}
                    <div className="px-5 pb-4">
                      <p className="line-clamp-2 font-body text-sm leading-5 text-foreground/75">
                        {copy.summary}
                      </p>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <a
                          href={app.href}
                          className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap font-body text-sm font-semibold text-primary no-underline"
                        >
                          {copy.cta}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => showImage(-1)}
                            className="home-icon-button"
                            aria-label={projects.previousImage}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => showImage(1)}
                            className="home-icon-button"
                            aria-label={projects.nextImage}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </SnapSection>
  );
}
