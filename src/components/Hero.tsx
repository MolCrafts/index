import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { fadeIn, slideUp, buttonHover } from "../lib/animations";
import { useEffect } from "react";
import { MoleculeFlash } from "./MoleculeFlash";

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
			
			{/* Randomly scattered molecules across the hero section */}
			<MoleculeFlash 
				width="19vw" 
				height="19vw" 
				top="7%" 
				left="6%" 
				interval={5100} 
				zIndex={3}
				opacity={0.68}
				scale={0.93}
				avoidMolecules={['cocaine', 'caffeine']}
			/>
			<MoleculeFlash 
				width="14.5vw" 
				height="14.5vw" 
				top="12%" 
				right="8%" 
				interval={6200} 
				zIndex={2}
				opacity={0.55}
				scale={0.85}
				avoidMolecules={['methanol', 'formicAcid']}
			/>
			<MoleculeFlash 
				width="17.2vw" 
				height="17.2vw" 
				bottom="7%" 
				left="11%" 
				interval={5700} 
				zIndex={4}
				opacity={0.63}
				scale={0.88}
				avoidMolecules={['nitrobenzene', 'penicillin']}
			/>
			<MoleculeFlash 
				width="15.7vw" 
				height="15.7vw" 
				bottom="13%" 
				right="9%" 
				interval={4900} 
				zIndex={3}
				opacity={0.72}
				scale={0.92}
				avoidMolecules={['nitricAcid', 'carbonMonoxide']}
			/>
			<MoleculeFlash 
				width="13.8vw" 
				height="13.8vw" 
				top="3%" 
				left="37%" 
				interval={7200} 
				zIndex={2}
				opacity={0.52}
				scale={0.78}
				hideOnMobile={true}
				avoidMolecules={['carbonDioxide', 'caffeine']}
			/>
			<MoleculeFlash 
				width="14.3vw" 
				height="14.3vw" 
				bottom="4%" 
				right="41%" 
				interval={6600} 
				zIndex={2}
				opacity={0.54}
				scale={0.82}
				hideOnMobile={true}
				avoidMolecules={['carbonDioxide', 'methanol']}
			/>
			<MoleculeFlash 
				width="16.4vw" 
				height="16.4vw" 
				top="43%" 
				left="3%" 
				interval={6500} 
				zIndex={2}
				opacity={0.62}
				scale={0.87}
				avoidMolecules={['penicillin', 'nitricAcid']}
			/>
			<MoleculeFlash 
				width="15.2vw" 
				height="15.2vw" 
				top="35%" 
				right="6%" 
				interval={5300} 
				zIndex={3}
				opacity={0.58}
				scale={0.86}
				avoidMolecules={['methanol', 'nitrobenzene']}
			/>
			{/* Additional molecules for more random scattered effect */}
			<MoleculeFlash 
				width="12.5vw" 
				height="12.5vw" 
				top="29%" 
				left="17%" 
				interval={7800} 
				zIndex={2}
				opacity={0.48}
				scale={0.75}
				avoidMolecules={['cocaine', 'nitricAcid']}
			/>
			<MoleculeFlash 
				width="13.1vw" 
				height="13.1vw" 
				top="22%" 
				right="16%" 
				interval={5900} 
				zIndex={2}
				opacity={0.51}
				scale={0.79}
				avoidMolecules={['carbonDioxide', 'formicAcid']}
			/>
			
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
