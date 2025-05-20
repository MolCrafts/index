import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { fadeIn, slideUp, staggerContainer } from "../lib/animations";
import { LazyImage } from "./LazyImage";

export const About = () => {
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

	return (
		<section id="about" className="space-section gradient-bg-2 relative">
			{/* Background blob */}
			<div className="blob-animation" style={{ bottom: '20%', left: '5%', opacity: '0.1', animationDelay: '1s' }} />
			
			<motion.div
				ref={sectionRef}
				className="container mx-auto px-4 md:px-8 relative z-10"
				variants={staggerContainer}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
			>
				<div className="flex flex-col lg:flex-row gap-12 items-center">
					{/* Content */}
					<motion.div 
						className="lg:w-1/2 space-y-6"
						variants={slideUp}
					>
						<motion.h2 
							className="text-3xl md:text-4xl font-bold"
							variants={fadeIn}
						>
							<span className="gradient-text-accent">Open Source Molecular Sciences</span>
						</motion.h2>
						
						<motion.p 
							className="text-lg text-muted-foreground"
							variants={fadeIn}
						>
							MolCrafts is an open-source initiative dedicated to advancing molecular sciences through collaborative software development. Our mission is to create accessible, powerful tools for researchers, educators, and students working in the field of molecular modeling and simulation.
						</motion.p>
						
						<motion.div 
							className="space-y-4 glass-card p-4 rounded-lg"
							variants={staggerContainer}
						>
							<motion.div 
								className="flex items-start space-x-2"
								variants={fadeIn}
							>
								<div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-1">
									<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
									</svg>
								</div>
								<p>Open-source and community-driven development</p>
							</motion.div>
							
							<motion.div 
								className="flex items-start space-x-2"
								variants={fadeIn}
							>
								<div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-1">
									<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
									</svg>
								</div>
								<p>Built by scientists for scientists</p>
							</motion.div>
							
							<motion.div 
								className="flex items-start space-x-2"
								variants={fadeIn}
							>
								<div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-1">
									<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
									</svg>
								</div>
								<p>Modern, modular architecture for extensibility</p>
							</motion.div>
						</motion.div>
					</motion.div>
					
					{/* Image */}
					<motion.div 
						className="lg:w-1/2 glass-card p-4 rounded-xl"
						variants={fadeIn}
						whileInView={{ y: [20, 0], opacity: [0, 1] }}
						transition={{ duration: 0.8 }}
					>
						<div className="rounded-xl overflow-hidden border border-border shadow-lg">
							<LazyImage
								src="https://images.unsplash.com/photo-1581093458791-9d25a5a0dd24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
								alt="Molecular Science Research"
								className="w-full h-auto rounded-xl transition-all duration-500 hover:scale-105"
							/>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
};
