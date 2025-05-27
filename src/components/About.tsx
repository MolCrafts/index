import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { fadeIn, slideUp, staggerContainer } from "../lib/animations";
import { LazyImage } from "./LazyImage";
import molcraftsLogo from "../assets/molcrafts.webp";
import { EcosystemLogos } from "./EcosystemLogos";

export const About = () => {
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

	return (
		<>
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
						
						{/* Image with MolCraft Ecosystem */}
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

					{/* MolCrafts Logo and Stats Section at the bottom */}
					<motion.div 
						className="mt-20 p-8 bg-black/30 rounded-xl glass-card"
						variants={fadeIn}
						whileInView={{ y: [20, 0], opacity: [0, 1] }}
						transition={{ duration: 0.8 }}
					>
						<div className="flex flex-col lg:flex-row items-center gap-8">
							{/* Logo - Minimalist styling */}
							<div className="lg:w-1/3 flex justify-center">
								<LazyImage 
									src={molcraftsLogo} 
									alt="MolCrafts Logo" 
									className="w-full max-w-[220px] rounded-lg"
								/>
							</div>
							
							{/* About Text */}
							<div className="lg:w-2/3">
								<h2 className="text-2xl md:text-3xl font-bold mb-2">
									<span className="text-green-500">About</span> <span className="text-white">MolCrafts</span>
								</h2>
								<p className="text-muted-foreground mb-4">
									MolCrafts is an open-source, engineering-oriented toolkit that accelerates molecular research by offering reusable and robust components. Free from lab-specific design or philosophy, it focuses on modularity, reliability, and clarity to support real scientific work.
								</p>
								<p className="text-green-400 italic">Less boilerplate, more science.</p>
								
								{/* Stats */}
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
									<div className="text-center">
										<p className="text-3xl font-bold">Research</p>
										<p className="text-muted-foreground">Focus</p>
									</div>
									<div className="text-center">
										<p className="text-3xl font-bold">Open</p>
										<p className="text-muted-foreground">Source</p>
									</div>
									<div className="text-center">
										<p className="text-3xl font-bold">Modular</p>
										<p className="text-muted-foreground">Design</p>
									</div>
									<div className="text-center">
										<p className="text-3xl font-bold">Global</p>
										<p className="text-muted-foreground">Community</p>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			</section>
			
			{/* Add the EcosystemLogos component below the main about section */}
			<div className="container mx-auto px-4 md:px-8">
				<EcosystemLogos />
			</div>
		</>
	);
};
