import atomOrbitalMoko from "@/assets/moko/atom_obital.png";
import coffeeMoko from "@/assets/moko/coffee.png";
import flaskMoko from "@/assets/moko/flask.png";
import happyMoko from "@/assets/moko/happy.png";
import masterMoko from "@/assets/moko/master.png";
import mokoMoko from "@/assets/moko/moko.png";
import molcfgMoko from "@/assets/moko/molcfg.png";
import mollogMoko from "@/assets/moko/mollog.png";
import molnexMoko from "@/assets/moko/molnex.png";
import molpackMoko from "@/assets/moko/molpack.png";
import molpyMoko from "@/assets/moko/molpy.png";
import molrecMoko from "@/assets/moko/molrec.png";
import molrsMoko from "@/assets/moko/molrs.png";
import movisMoko from "@/assets/moko/movis.png";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { slideUp, staggerContainer } from "../lib/animations";
import { type EcosystemItem, ecosystemCategories } from "../lib/ecosystem";
import {
  sectionBody,
  sectionContainer,
  sectionHeader,
  sectionLabel,
  sectionLabelRule,
  sectionLead,
  sectionTitle,
} from "../lib/sectionStyles";
import { cn } from "../lib/utils";

/** Moko art keyed by product slug (href path or title fallback). */
const MOKO_BY_SLUG: Record<string, string> = {
  atomiverse: masterMoko,
  molpy: molpyMoko,
  molrs: molrsMoko,
  molpack: molpackMoko,
  molnex: molnexMoko,
  molrec: molrecMoko,
  molexp: flaskMoko,
  molq: atomOrbitalMoko,
  molhub: coffeeMoko,
  molvis: movisMoko,
  molplot: happyMoko,
  molmcp: masterMoko,
  molcfg: molcfgMoko,
  mollog: mollogMoko,
};

function itemSlug(item: EcosystemItem): string {
  if (item.href.startsWith("/")) return item.href.replace(/^\//, "").split("/")[0] ?? "";
  return item.title.toLowerCase().replace(/\s+/g, "-");
}

function mokoFor(item: EcosystemItem): string {
  return MOKO_BY_SLUG[itemSlug(item)] ?? mokoMoko;
}

/**
 * Borderless product entry — glyph and name share a row, type sits under the name.
 * Hover lifts the glyph and brightens copy; nothing draws a frame.
 * Arrow only for external destinations (leaves the site).
 */
function ProjectEntry({ item }: { item: EcosystemItem }) {
  return (
    <motion.a
      variants={slideUp}
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noreferrer noopener" : undefined}
      className={cn(
        "group relative flex flex-col gap-3.5 rounded-2xl p-4 no-underline outline-none sm:p-5",
        "transition-[background,box-shadow,transform] duration-300",
        "hover:bg-card/45 hover:shadow-[0_24px_56px_-28px_rgba(0,0,0,0.5)]",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background",
      )}
      draggable={false}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <span
        className="pointer-events-none absolute -inset-x-2 -inset-y-1 -z-10 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${item.hex}45, transparent 65%)`,
        }}
        aria-hidden
      />

      <div className="flex items-center gap-3.5">
        <img
          src={mokoFor(item)}
          alt=""
          className="h-14 w-14 shrink-0 object-contain transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16"
          draggable={false}
        />
        <div className="flex min-w-0 flex-col gap-0.5">
          <span
            className={cn("flex items-center gap-1.5 text-lg font-bold tracking-tight", item.color)}
          >
            {item.title}
            {item.external && (
              <ArrowUpRight className="h-3.5 w-3.5 opacity-40 transition-opacity group-hover:opacity-90" />
            )}
          </span>
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground transition-colors group-hover:text-foreground/70">
              {item.role}
            </span>
            {item.status && (
              <span className="rounded-full border border-border/60 bg-muted/50 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                {item.status}
              </span>
            )}
          </span>
        </div>
      </div>

      <p className="text-sm font-light leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/85 sm:text-[0.9375rem] sm:leading-[1.65]">
        {item.description}
      </p>
    </motion.a>
  );
}

export const EcosystemArchitecture = () => {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-transparent pb-24 pt-4 md:pb-32 md:pt-6"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(var(--accent-rgb), 0.08), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className={sectionContainer}>
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={cn(
            sectionHeader,
            "mb-16 lg:mb-20 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16",
          )}
        >
          <div className="flex flex-col gap-5 md:gap-6">
            <div className={sectionLabel}>
              <div className={sectionLabelRule} aria-hidden="true" />
              Projects
            </div>
            <p className={cn(sectionTitle, "lg:max-w-none")}>
              Take one package. Or take the stack.
            </p>
          </div>
          <p className={cn(sectionLead, "lg:max-w-none lg:pb-1")}>
            Each one installs and runs on its own — nothing drags in the rest. They agree on one
            record format, so what comes out of one tool is readable by the next, and by an agent.
          </p>
        </motion.div>

        <div className="flex flex-col gap-16 md:gap-20">
          {ecosystemCategories.map((group) => (
            <div key={group.title} className="flex flex-col gap-8">
              <div className="flex flex-col gap-2 border-t border-border/55 pt-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <h3 className="text-sm font-bold uppercase tracking-[0.28em] text-foreground/85">
                  {group.title}
                </h3>
                <p className={cn(sectionBody, "max-w-xl text-sm sm:text-right")}>{group.blurb}</p>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-12 xl:gap-y-12"
              >
                {group.items.map((item) => (
                  <ProjectEntry key={item.title} item={item} />
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border/55 pt-10 md:mt-20"
        >
          <a
            href="https://docs.molcrafts.org/"
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary no-underline transition-opacity hover:opacity-90"
          >
            Read the docs
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
          <a
            href="https://github.com/MolCrafts"
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm font-medium text-muted-foreground no-underline transition-colors hover:text-foreground"
          >
            All repositories on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};
