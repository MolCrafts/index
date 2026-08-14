/** Locale-safe homepage copy. Structure and links live in `../data.ts`. */

import type { HomeSectionId } from "../data";

export interface PillarCopy {
  readonly title: string;
  readonly body: string;
}

/**
 * One entry in the application stage.
 *
 * `short` is what the compact band shows; `long` is what the expanded stage adds.
 * Both are held to a steady length across the roster so the band reads as one row
 * and the expanded panel never jumps height when the reader moves between entries.
 */
export interface ApplicationCopy {
  /** What you do with it, as a noun phrase — distinct from the product name. */
  readonly applicationTitle: string;
  readonly short: string;
  readonly long: string;
}

export interface ParticipatePathCopy {
  readonly title: string;
  readonly audience: string;
  readonly description: string;
  readonly cta: string;
}

export interface HomeCopy {
  readonly sectionLabels: Readonly<Record<HomeSectionId, string>>;
  readonly brandHero: {
    readonly kicker: string;
    readonly title: string;
    readonly subtitle: string;
  };
  readonly hero: {
    readonly title: string;
    readonly accent: string;
    readonly subtitle: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
    readonly scrollHint: string;
  };
  readonly approach: {
    readonly title: string;
    readonly lead: string;
    readonly statement: string;
    readonly promises: readonly string[];
  };
  readonly whatWeDo: {
    readonly title: string;
    readonly lead: string;
    readonly pillars: readonly PillarCopy[];
  };
  readonly assist: {
    readonly title: {
      readonly subject: string;
      readonly action: string;
    };
    readonly subline: string;
    readonly statements: readonly [string, string, string, string, string, string];
    readonly concepts: readonly [string, string, string, string];
    readonly products: readonly [string, string, string, string, string];
  };
  readonly projects: {
    readonly title: string;
    readonly lead: string;
    /** Link label on the expanded panel. */
    readonly cta: string;
    /** Accessible name for the applications band. */
    readonly stageLabel: string;
    readonly items: {
      readonly molpy: ApplicationCopy;
      readonly molpack: ApplicationCopy;
      readonly molvis: ApplicationCopy;
      readonly molexp: ApplicationCopy;
      readonly molnex: ApplicationCopy;
      readonly atomiverse: ApplicationCopy;
    };
  };
  readonly participate: {
    readonly title: string;
    readonly lead: string;
    readonly paths: {
      readonly openSource: ParticipatePathCopy;
      readonly consulting: ParticipatePathCopy;
      readonly enterprise: ParticipatePathCopy;
    };
  };
  readonly sponsors: {
    readonly title: string;
    readonly lead: string;
    readonly supporterNote: string;
  };
  readonly cta: {
    readonly title: string;
    readonly lead: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
  };
  readonly footer: {
    readonly tagline: string;
    readonly github: string;
    readonly license: string;
    readonly backToTop: string;
  };
}

export type ApplicationKey = keyof HomeCopy["projects"]["items"];
export type ParticipatePathKey = keyof HomeCopy["participate"]["paths"];
