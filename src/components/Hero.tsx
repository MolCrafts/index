import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { fadeIn, slideUp, buttonHover } from "../lib/animations";
import { useEffect, lazy, Suspense } from "react";

// Lazy load the MoleculeOverlay component
const MoleculeOverlay = lazy(() => import('./MoleculeOverlay').then(module => ({ 
	default: module.MoleculeOverlay 
})));

export const Hero = () => {
	// Inicjalizacja animacji po załadowaniu strony
	useEffect(() => {
		const handleScroll = () => {
			const elements = document.querySelectorAll('.scroll-fade');
			elements.forEach(element => {
				const position = element.getBoundingClientRect();
				if(position.top < window.innerHeight) {
					element.classList.add('active');
				}
			});
		};
		
		window.addEventListener('scroll', handleScroll);
		handleScroll(); // Wywołaj raz na początku, aby aktywować widoczne elementy
		
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<motion.section
			id="hero"
			className="w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 lg:px-16 space-section relative"
			initial="hidden"
			animate="visible"
			variants={fadeIn}
			aria-labelledby="main-heading"
		>
			{/* Enhanced subtle background blobs with molecular-like shapes */}
			<div className="molecule-blob" style={{ top: '25%', left: '15%' }} aria-hidden="true" />
			<div className="molecule-blob" style={{ top: '35%', right: '20%', animationDelay: '7s' }} aria-hidden="true" />
			<div className="molecule-blob" style={{ bottom: '30%', left: '25%', animationDelay: '4s' }} aria-hidden="true" />
			<div className="molecule-blob" style={{ bottom: '15%', right: '15%', animationDelay: '2s' }} aria-hidden="true" />
			
			{/* Subtle molecular background glow effects */}
			<div className="molecular-glow" style={{ top: '30%', left: '50%', width: '300px', height: '300px' }} aria-hidden="true" />
			<div className="molecular-glow" style={{ top: '60%', left: '30%', width: '200px', height: '200px', animationDelay: '3s' }} aria-hidden="true" />
			<div className="molecular-glow" style={{ top: '20%', right: '20%', width: '250px', height: '250px', animationDelay: '5s' }} aria-hidden="true" />
			
			{/* Molecule overlay - now directly in Hero */}
			<Suspense fallback={null}>
				<MoleculeOverlay />
			</Suspense>
			
			<motion.div 
				className="text-center space-y-6 mb-8 z-10 max-w-3xl px-4"
				variants={slideUp}
			>
				<motion.header className="font-bold text-4xl sm:text-2xl">
					<motion.h1 
						id="main-heading"
						className="inline text-5xl sm:text-6xl md:text-7xl"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.8 }}
					>
						<span className="gradient-text-primary">
							MolCrafts
						</span>
					</motion.h1>
					<br />
					<motion.h2 
						className="inline text-3xl md:text-4xl lg:text-5xl sm:text-2xl mt-3"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.8 }}
					>
						<span className="gradient-text-secondary">
							Seamless Molecular Sciences toolbox
						</span>
					</motion.h2>
				</motion.header>

				<motion.p 
					className="text-xl text-muted-foreground max-w-md mx-auto"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6, duration: 0.8 }}
				>
					Advancing Molecular Simulation with the Strength of Open-Source
					Collaboration for Computational Chemistry and Molecular Data Analysis
				</motion.p>

				<motion.div 
					className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8, duration: 0.8 }}
				>
					<motion.div whileHover={buttonHover}>
						<Button className="w-full btn-hover-effect focus-ring">
							Get Started with MolCrafts
						</Button>
					</motion.div>

					<motion.div whileHover={buttonHover}>
						<a
							rel="noreferrer noopener"
							href="https://github.com/MolCrafts"
							target="_blank"
							className={`w-full btn-hover-effect focus-ring ${buttonVariants({
								variant: "outline",
							})}`}
							aria-label="Visit MolCrafts GitHub Repository"
						>
							Github Repository
							<GitHubLogoIcon className="ml-2 w-5 h-5" aria-hidden="true" />
						</a>
					</motion.div>
				</motion.div>
			</motion.div>

			<div className="shadow" aria-hidden="true" />
		</motion.section>
	);
};
