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

/**
 * One depth of working with MolCrafts.
 *
 * `statement` is the phase itself, and the three are held to one rhythm so they
 * read as a single continuum rather than three offers. `line` is what that depth
 * means, and stays back until the reader brings the phase forward.
 */
export interface ParticipatePathCopy {
  readonly statement: string;
  readonly line: string;
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
  /**
   * Collaboration — the screen that answers how we work together, and the only one
   * that answers it. Every commercial route lives here, and each depth is its own
   * way in, which is what lets the page end without a contact screen.
   */
  readonly participate: {
    /** Two lines, the second carried in the accent rather than in a heavier type. */
    readonly title: {
      readonly plain: string;
      readonly accent: string;
    };
    readonly supporting: string;
    readonly paths: {
      readonly startOpen: ParticipatePathCopy;
      readonly buildTogether: ParticipatePathCopy;
      readonly deployInHouse: ParticipatePathCopy;
    };
  };
  /** The closing credit band. Each sponsor's own name is the only other text it carries. */
  readonly sponsors: {
    readonly title: string;
    readonly lead: string;
  };
  readonly footer: {
    readonly tagline: string;
    readonly github: string;
    readonly credit: string;
    readonly backToTop: string;
  };
}

export type ApplicationKey = keyof HomeCopy["projects"]["items"];
export type ParticipatePathKey = keyof HomeCopy["participate"]["paths"];
