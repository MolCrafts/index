import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "../lib/animations";

export const Vision = () => {
  return (
    <section
      id="vision"
      className="py-32 md:py-48 relative flex flex-col justify-center overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-16"
        >
          <motion.div variants={slideUp} className="flex flex-col gap-6">
            <div className="flex items-center gap-4 text-primary font-bold tracking-[0.3em] uppercase text-sm">
              <div className="w-12 h-[1px] bg-primary opacity-50" />
              Vision
            </div>
          </motion.div>

          <motion.div
            variants={slideUp}
            className="text-lg md:text-xl lg:text-2xl text-foreground font-light leading-[1.5] max-w-5xl space-y-6"
          >
            <p>
              Molecular and materials science is full of brilliant ideas trapped between formats,
              scripts, folders, notebooks, cluster jobs, datasets, and half-remembered decisions.
              Discovery should compound: a structure, a run, a model, a result — handed to the next
              person or agent with its scientific context still alive.
            </p>
            <p>
              MolCrafts is building a next-generation open foundation for collaborative science.
              Scientists turn ideas into runnable studies; builders turn methods into tools others
              can trust, reuse, and extend; AI agents join the same shared ground — so research
              stays open, FAIR, and reproducible, and the frontiers of knowledge keep moving.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
