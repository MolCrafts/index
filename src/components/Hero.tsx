import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { fadeIn, slideUp, buttonHover } from "../lib/animations";
import { useEffect, useState } from "react";

// Array of molecule images
const moleculeImages = [
	"/Ethanol_Conformer3D_small.png",
	"/Methanol_Conformer3D_small.png",
	"/Cocaine_Conformer3D_small.png",
	"/Carbon-Dioxide_Conformer3D_small.png"
];

export const Hero = () => {
	const [showMolecule, setShowMolecule] = useState(false);
	const [currentMolecule, setCurrentMolecule] = useState(0);
	const [moleculePosition, setMoleculePosition] = useState({ top: "30%", left: "70%" });

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

	// Flash molecule effect
	useEffect(() => {
		// Function to calculate random position based on viewport
		const getRandomPosition = () => {
			// Adjust safe area margins based on screen size
			const safeMarginHorizontal = window.innerWidth < 768 ? 15 : 20;
			const safeMarginVertical = window.innerWidth < 768 ? 20 : 25;
			
			// Calculate safe area percentages 
			const minX = safeMarginHorizontal;
			const maxX = 100 - safeMarginHorizontal - 15; // Extra margin for image width
			const minY = safeMarginVertical;
			const maxY = 70; // Keep in top 70% of screen for visibility
			
			const newTop = Math.floor(Math.random() * (maxY - minY)) + minY + "%";
			const newLeft = Math.floor(Math.random() * (maxX - minX)) + minX + "%";
			
			return { top: newTop, left: newLeft };
		};
		
		// Show molecule for 3 seconds, then hide for 2 seconds
		const showTimer = setInterval(() => {
			// Pick random molecule first (while hidden)
			const randomIndex = Math.floor(Math.random() * moleculeImages.length);
			setCurrentMolecule(randomIndex);
			
			// Generate random position and show
			setMoleculePosition(getRandomPosition());
			setShowMolecule(true);
			
			// Hide after 3 seconds
			setTimeout(() => setShowMolecule(false), 3000);
		}, 5000); // Every 5 seconds
		
		// Start with showing a molecule, after a slight delay
		setTimeout(() => {
			setMoleculePosition(getRandomPosition());
			setCurrentMolecule(Math.floor(Math.random() * moleculeImages.length));
			setShowMolecule(true);
		}, 800);
		
		return () => clearInterval(showTimer);
	}, []);

	return (
		<motion.section
			id="hero"
			className="w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 lg:px-16 space-section relative"
			initial="hidden"
			animate="visible"
			variants={fadeIn}
		>
			{/* Enhanced subtle background blobs with molecular-like shapes */}
			<div className="molecule-blob" style={{ top: '25%', left: '15%' }} />
			<div className="molecule-blob" style={{ top: '35%', right: '20%', animationDelay: '7s' }} />
			<div className="molecule-blob" style={{ bottom: '30%', left: '25%', animationDelay: '4s' }} />
			<div className="molecule-blob" style={{ bottom: '15%', right: '15%', animationDelay: '2s' }} />
			
			{/* Subtle molecular background glow effects */}
			<div className="molecular-glow" style={{ top: '30%', left: '50%', width: '300px', height: '300px' }} />
			<div className="molecular-glow" style={{ top: '60%', left: '30%', width: '200px', height: '200px', animationDelay: '3s' }} />
			<div className="molecular-glow" style={{ top: '20%', right: '20%', width: '250px', height: '250px', animationDelay: '5s' }} />
			
			{/* Random molecule image that flashes */}
			{showMolecule && (
				<motion.img
					src={moleculeImages[currentMolecule]}
					alt="Molecule"
					className="absolute z-10 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain molecule-glow-effect"
					style={{ ...moleculePosition }}
					initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
					animate={{ 
						opacity: 1, 
						scale: 1, 
						rotate: 10,
						transition: {
							opacity: { duration: 0.5 },
							scale: { duration: 0.5 },
							rotate: { 
								duration: 3, 
								repeat: Infinity, 
								repeatType: "reverse" 
							}
						}
					}}
					exit={{ opacity: 0, scale: 0.8 }}
				/>
			)}
			
			<motion.div 
				className="text-center space-y-6 mb-8 z-10 max-w-3xl px-4"
				variants={slideUp}
			>
				<motion.main className="font-bold text-4xl sm:text-2xl">
					<motion.h1 
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
				</motion.main>

				<motion.p 
					className="text-xl text-muted-foreground max-w-md mx-auto"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6, duration: 0.8 }}
				>
					Advancing Molecular Simulation with the Strength of Open-Source
					Collaboration
				</motion.p>

				<motion.div 
					className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8, duration: 0.8 }}
				>
					<motion.div whileHover={buttonHover}>
						<Button className="w-full btn-hover-effect focus-ring">
							Get Started
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
						>
							Github Repository
							<GitHubLogoIcon className="ml-2 w-5 h-5" />
						</a>
					</motion.div>
				</motion.div>
			</motion.div>

			<div className="shadow" />
		</motion.section>
	);
};
