import { motion } from "framer-motion";
import { BookOpen, Github, MessageSquare } from "lucide-react";

export const Community = () => {
  return (
    <section id="community" className="py-24 sm:py-32 bg-[#050505] relative overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-[#10b981]/5 blur-[150px] rounded-full point-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Join the <span className="text-[#10b981]">Community</span>
          </motion.h2>

          <motion.p
            className="mt-4 max-w-2xl mx-auto text-lg text-zinc-500 font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            MolCrafts is open-source. Your contributions drive the future of materials design.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* GitHub Card */}
          <motion.a
            href="https://github.com/MolCrafts"
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col items-center text-center p-6 transition-all"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-zinc-500 mb-5 group-hover:text-[#10b981] group-hover:-translate-y-1 transition-all duration-300">
              <Github size={32} />
            </div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-2">Contribute Code</h3>
            <p className="text-sm text-zinc-500 mb-4 font-light">
              Help build the core computational engine.
            </p>
            <div className="text-[#10b981] text-sm font-medium flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>View Repository</span>
              <span>→</span>
            </div>
          </motion.a>

          {/* Discord/Forum Card */}
          <motion.a
            href="https://github.com/MolCrafts"
            target="_blank"
            rel="noreferrer noopener"
            className="group flex flex-col items-center text-center p-6 transition-all"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-zinc-500 mb-5 group-hover:text-[#03a3d7] group-hover:-translate-y-1 transition-all duration-300">
              <MessageSquare size={32} />
            </div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-2">Discuss & Plan</h3>
            <p className="text-sm text-zinc-500 mb-4 font-light">
              Join our developer discussions and shape the architecture.
            </p>
            <div className="text-[#03a3d7] text-sm font-medium flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>Join Discord</span>
              <span>→</span>
            </div>
          </motion.a>

          {/* Projects Card */}
          <motion.a
            href="/molpy"
            className="group flex flex-col items-center text-center p-6 transition-all"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-zinc-500 mb-5 group-hover:text-[#1fc0f1] group-hover:-translate-y-1 transition-all duration-300">
              <BookOpen size={32} />
            </div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-2">Explore MolPy</h3>
            <p className="text-sm text-zinc-500 mb-4 font-light">
              Understand the implementation and design philosophy.
            </p>
            <div className="text-[#1fc0f1] text-sm font-medium flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>Learn More</span>
              <span>→</span>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};
