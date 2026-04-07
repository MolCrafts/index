import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "../lib/animations";

export const Manifesto = () => {
	return (
		<section
			id="manifesto"
			className="py-24 md:py-32 relative flex flex-col justify-center overflow-hidden"
		>
			<div className="container mx-auto px-4 lg:px-8 max-w-5xl relative z-10">
				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					className="flex flex-col gap-12"
				>
					<motion.div variants={slideUp} className="flex flex-col gap-6">
						<div className="flex items-center gap-4 text-primary font-bold tracking-[0.3em] uppercase text-sm">
							<div className="w-12 h-[1px] bg-primary opacity-50" />
							Our Manifesto
						</div>
					</motion.div>

					<motion.div
						variants={slideUp}
						className="text-xl md:text-3xl text-foreground font-light leading-relaxed max-w-4xl space-y-8 mt-2"
					>
						<p>
							Molcrafts is an open-source toolkit for molecular and materials
							science. We build tools for modeling, simulation, analysis,
							visualization, and automation that work together as one system.
						</p>
						<p>
							Our goal is to give researchers more freedom to devote their
							energy to pushing the frontiers of knowledge. We believe
							scientific computing should be open, composable, reproducible, and
							usable by both humans and intelligent agents.
						</p>
						<p className="font-medium text-primary">
							Molcrafts exists to make scientific work easier to build, easier
							to reuse, and easier to turn into discovery.
						</p>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};
