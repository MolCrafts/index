import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "../lib/animations";

export const Manifesto = () => {
	return (
		<section
			id="manifesto"
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
							Manifesto
						</div>
					</motion.div>

					<motion.div
						variants={slideUp}
						className="text-lg md:text-xl lg:text-2xl text-foreground font-light leading-[1.5] max-w-5xl space-y-6"
					>
						<p className="font-medium text-foreground">
							Molcrafts is an open foundation for molecular and materials
							science.
						</p>
						<p>We bring methods, data, and workflows onto common ground.</p>
						<p>We keep scientific work open, FAIR, and reproducible.</p>
						<p>We help researchers go further, with less repetition.</p>
						<p className="font-medium text-primary">
							Molcrafts exists to extend the frontiers of knowledge.
						</p>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};
