import aspirin from "@/assets/molecules/aspirin.webp";
import caffeine from "@/assets/molecules/caffeine.webp";
import dopamine from "@/assets/molecules/dopamine.webp";
import ibuprofen from "@/assets/molecules/ibuprofen.webp";
import nicotine from "@/assets/molecules/nicotine.webp";
import quinine from "@/assets/molecules/quinine.webp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
const MotionCard = motion.create(Card);

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
    const syncPreference = () => setReducedMotion(prefersReducedMotion());
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
      <CardContent
        className={cn(
          "relative flex min-h-0 items-center justify-center overflow-hidden bg-primary/[0.04] p-0",
          compact ? "h-32 sm:h-36 [@media(max-height:30rem)]:hidden" : "h-full",
        )}
      >
        <div
          className="pointer-events-none absolute inset-[18%_12%] rounded-full bg-primary/15 blur-3xl"
          aria-hidden="true"
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={image.src}
            src={image.src}
            alt={`${copy.imageAlt} ${imageIndex + 1}/${images.length} ${projects.imageCounter}`}
            width={image.width}
            height={image.height}
            draggable={false}
            className="relative z-1 max-h-full w-full object-contain px-5 py-4 drop-shadow-molecule"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.36 }}
          />
        </AnimatePresence>
      </CardContent>
    );
  };

  const productBadge = (product: string) => (
    <Badge
      variant="outline"
      className="w-fit border-primary/20 bg-primary/[0.06] font-body text-chip font-semibold text-primary"
    >
      {product}
    </Badge>
  );

  const imageDots = () => (
    <div className="flex items-center gap-0.5">
      {currentImages.map((imageItem, index) => (
        <Button
          key={imageItem.src}
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setImageIndex(index)}
          aria-label={`${index + 1} / ${currentImages.length}`}
          aria-current={index === imageIndex ? "true" : undefined}
          className="h-8 w-8 rounded-full p-0 hover:bg-primary/10"
        >
          <span
            className={cn(
              "block h-1.5 rounded-full transition-[width,background-color] duration-200",
              index === imageIndex ? "w-5 bg-primary" : "w-1.5 bg-foreground/30",
            )}
          />
        </Button>
      ))}
    </div>
  );

  return (
    <SnapSection
      id="applications"
      aria-labelledby="applications-heading"
      className="h-[var(--home-view,100cqb)]"
    >
      <div className="relative mx-auto flex h-full w-full max-w-[100rem] flex-col justify-center px-4 pb-6 pt-24 sm:px-8 md:px-10 md:pb-8 md:pt-20 lg:px-14 [@media(max-height:30rem)]:pt-20">
        <div
          className="pointer-events-none absolute left-1/2 top-[58%] -z-10 h-[44vh] w-[86vw] max-w-[80rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.06] blur-3xl"
          aria-hidden="true"
        />

        <div className="mx-auto mb-6 grid w-full max-w-[90rem] gap-3 md:mb-7 md:grid-cols-[1fr_0.8fr] md:items-end md:gap-12 [@media(max-height:30rem)]:mb-3">
          <h2
            id="applications-heading"
            className="font-display text-[clamp(2.1rem,4vw,4.2rem)] font-semibold leading-display tracking-[-0.04em] text-foreground [@media(max-height:30rem)]:text-2xl"
          >
            {projects.title}
          </h2>
          <p className="max-w-xl font-body text-sm leading-6 text-muted-foreground md:justify-self-end md:text-base md:leading-7 [@media(max-height:30rem)]:hidden">
            {projects.lead}
          </p>
        </div>

        <div
          className="hidden h-[clamp(21rem,52vh,31rem)] w-full gap-3 md:flex"
          onPointerLeave={(event) => {
            const focused = document.activeElement;
            if (!(focused instanceof Node) || !event.currentTarget.contains(focused)) collapse();
          }}
        >
          {APPLICATIONS.map((app) => {
            const copy = projects.items[app.key];
            const active = app.key === activeKey;
            const compressed = activeKey !== null && !active;

            return (
              <MotionCard
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
                  "relative min-w-0 flex-[1_1_0%] overflow-hidden rounded-xl border-primary/20 bg-card/60 shadow-none outline-none transition-[border-color,background-color,box-shadow] duration-300",
                  "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  active &&
                    "z-10 flex-[2.35_1_0%] border-primary/55 bg-card/85 shadow-xl shadow-primary/10",
                )}
                transition={{ layout: { duration: 0.48, ease: [0.16, 1, 0.3, 1] } }}
              >
                {active ? (
                  <div className="grid h-full min-w-0 grid-cols-[minmax(0,1.3fr)_minmax(15rem,0.9fr)]">
                    {imagePanel(app.key)}
                    <CardContent className="flex min-w-0 flex-col border-l border-primary/15 bg-card/80 p-6 pt-6">
                      {productBadge(app.product)}
                      <CardTitle className="mt-auto pt-8 font-display text-2xl leading-tight tracking-tight lg:text-3xl">
                        {copy.title}
                      </CardTitle>
                      <CardDescription className="mt-3 font-body text-sm leading-6 text-foreground/75 lg:text-base lg:leading-7">
                        {copy.summary}
                      </CardDescription>
                      <Button
                        asChild
                        variant="link"
                        className="mt-5 h-auto w-fit justify-start gap-2 p-0 font-body text-sm font-semibold text-primary hover:text-foreground hover:no-underline"
                      >
                        <a href={app.href}>
                          {copy.cta}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                      </Button>
                      <div className="mt-auto flex justify-end pt-6">{imageDots()}</div>
                    </CardContent>
                  </div>
                ) : (
                  <CardHeader className="relative h-full p-5 xl:p-6">
                    <div
                      className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl"
                      aria-hidden="true"
                    />
                    {productBadge(app.product)}
                    <div className="mt-auto">
                      <CardTitle
                        className={cn(
                          "font-display leading-tight tracking-[-0.02em] [word-break:normal] [overflow-wrap:normal] hyphens-auto [html[lang=sv]_&]:text-lg",
                          compressed
                            ? "text-[clamp(0.9rem,1.05vw,1.05rem)]"
                            : "text-[clamp(1.1rem,1.45vw,1.35rem)]",
                        )}
                      >
                        {copy.title}
                      </CardTitle>
                      {!compressed && (
                        <CardDescription className="mt-3 line-clamp-4 font-body text-sm leading-6 text-foreground/70">
                          {copy.summary}
                        </CardDescription>
                      )}
                      <ArrowRight
                        className="mt-6 h-5 w-5 text-primary transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </div>
                  </CardHeader>
                )}
              </MotionCard>
            );
          })}
        </div>

        <div className="flex h-[clamp(19rem,50vh,26rem)] snap-x snap-mandatory items-stretch gap-3 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden [@media(max-height:30rem)]:h-56">
          {APPLICATIONS.map((app) => {
            const copy = projects.items[app.key];
            const active = app.key === activeKey;

            return (
              <Card
                key={app.key}
                className={cn(
                  "h-full w-[80vw] max-w-sm shrink-0 snap-center overflow-hidden rounded-xl border-primary/20 bg-card/65 shadow-none sm:w-[64vw] sm:max-w-md md:w-[48vw]",
                  active && "border-primary/55 bg-card/85 shadow-lg shadow-primary/10",
                )}
              >
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => (active ? collapse() : activate(app.key))}
                  aria-expanded={active}
                  className={cn(
                    "w-full items-stretch justify-start whitespace-normal rounded-none p-0 text-left hover:bg-primary/[0.03]",
                    active ? "h-auto" : "h-full",
                  )}
                >
                  <CardHeader className="w-full p-5 text-left">
                    {productBadge(app.product)}
                    <CardTitle className="mt-3 font-display text-[1.45rem] leading-headline tracking-tight [word-break:normal] [overflow-wrap:normal] hyphens-auto [html[lang=sv]_&]:text-xl">
                      {copy.title}
                    </CardTitle>
                    {!active && (
                      <>
                        <CardDescription className="mt-auto line-clamp-3 pt-8 font-body text-sm leading-6 text-foreground/72">
                          {copy.summary}
                        </CardDescription>
                        <ArrowRight className="mt-5 h-5 w-5 text-primary" aria-hidden="true" />
                      </>
                    )}
                  </CardHeader>
                </Button>

                {active && (
                  <CardContent className="border-t border-primary/15 p-0">
                    {imagePanel(app.key, true)}
                    <div className="p-5 pt-4 [@media(max-height:30rem)]:pt-3">
                      <CardDescription className="line-clamp-2 font-body text-sm leading-5 text-foreground/75 [@media(max-height:30rem)]:hidden">
                        {copy.summary}
                      </CardDescription>
                      <div className="mt-3 flex items-center justify-between gap-3 [@media(max-height:30rem)]:mt-0">
                        <Button
                          asChild
                          variant="link"
                          className="h-auto gap-2 p-0 font-body text-sm font-semibold text-primary hover:no-underline"
                        >
                          <a href={app.href}>
                            {copy.cta}
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </a>
                        </Button>
                        <div className="flex gap-1">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => showImage(-1)}
                            className="h-10 w-10 rounded-full border-primary/20 bg-background/40"
                            aria-label={projects.previousImage}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => showImage(1)}
                            className="h-10 w-10 rounded-full border-primary/20 bg-background/40"
                            aria-label={projects.nextImage}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </SnapSection>
  );
}
