import { motion } from "framer-motion";
import { fadeIn, slideUp, staggerContainer } from "../lib/animations";

export const Impact = () => {
	return (
		<section
			id="impact"
			className="container py-24 sm:py-32 relative text-center"
		>
			{/* Subtle glow background */}
			<div
				className="molecular-glow opacity-30 pointer-events-none"
				style={{
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: "400px",
					height: "400px",
				}}
			/>

			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}
				variants={staggerContainer}
				className="relative z-10"
			>
				<motion.div variants={slideUp} className="mb-8">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						Building the Runway for{" "}
						<span className="gradient-text-secondary">Discovery.</span>
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						We are not just building tools; we are creating the infrastructure
						that allows researchers to focus entirely on discovery. This is the
						open foundation tailored for the incoming wave of generative
						chemistry, material design, and sustainable innovation.
					</p>
				</motion.div>

				<motion.div
					variants={fadeIn}
					className="mt-16 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16"
				>
					<div className="flex flex-col items-center">
						<div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-lg border border-primary/20">
							<span className="text-3xl font-bold">1</span>
						</div>
						<h3 className="text-lg font-medium">Collaborative Foundation</h3>
					</div>

					<div className="hidden md:block w-16 h-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full" />

					<div className="flex flex-col items-center">
						<div className="h-20 w-20 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-4 shadow-lg border border-secondary/20">
							<span className="text-3xl font-bold">2</span>
						</div>
						<h3 className="text-lg font-medium">Built in the Open</h3>
					</div>

					<div className="hidden md:block w-16 h-1 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full" />

					<div className="flex flex-col items-center">
						<div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-lg border border-primary/20">
							<span className="text-3xl font-bold">3</span>
						</div>
						<h3 className="text-lg font-medium">Designed to Evolve</h3>
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
};
