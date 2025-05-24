import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { fadeIn, slideUp, buttonHover } from "../lib/animations";
import { useEffect } from "react";
import { MoleculeFlash } from "./molecules/MoleculeFlash";

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
			
			{/* Zoptymalizowane molekuły z lepszymi animacjami */}
			<MoleculeFlash 
				width="20vw" 
				height="20vw" 
				top="5%" 
				left="7%" 
				interval={5500} 
				zIndex={3}
				opacity={0.7}
				scale={0.95}
				initialDelay={300}
				avoidMolecules={['cocaine', 'caffeine']}
			/>
			<MoleculeFlash 
				width="16vw" 
				height="16vw" 
				top="10%" 
				right="6%" 
				interval={6800} 
				zIndex={2}
				opacity={0.65}
				scale={0.9}
				initialDelay={800}
				avoidMolecules={['methanol', 'formicAcid']}
			/>
			<MoleculeFlash 
				width="18vw" 
				height="18vw" 
				bottom="8%" 
				left="9%" 
				interval={6200} 
				zIndex={4}
				opacity={0.7}
				scale={0.93}
				initialDelay={1100}
				avoidMolecules={['nitrobenzene', 'penicillin']}
			/>
			<MoleculeFlash 
				width="17vw" 
				height="17vw" 
				bottom="11%" 
				right="8%" 
				interval={5200} 
				zIndex={3}
				opacity={0.75}
				scale={0.95}
				initialDelay={500}
				avoidMolecules={['nitricAcid', 'carbonMonoxide']}
			/>
			<MoleculeFlash 
				width="14vw" 
				height="14vw" 
				top="7%" 
				left="38%" 
				interval={7500} 
				zIndex={2}
				opacity={0.6}
				scale={0.85}
				initialDelay={1500}
				hideOnMobile={true}
				avoidMolecules={['carbonDioxide', 'caffeine']}
			/>
			<MoleculeFlash 
				width="15vw" 
				height="15vw" 
				bottom="6%" 
				right="40%" 
				interval={7100} 
				zIndex={2}
				opacity={0.65}
				scale={0.87}
				initialDelay={1900}
				hideOnMobile={true}
				avoidMolecules={['carbonDioxide', 'methanol']}
			/>
			
			{/* Zredukowana liczba molekuł dla lepszej wydajności */}
			<MoleculeFlash 
				width="16vw" 
				height="16vw" 
				top="40%" 
				left="5%" 
				interval={6700} 
				zIndex={2}
				opacity={0.68}
				scale={0.9}
				initialDelay={700}
				avoidMolecules={['penicillin', 'nitricAcid']}
			/>
			<MoleculeFlash 
				width="15vw" 
				height="15vw" 
				top="33%" 
				right="4%" 
				interval={5800} 
				zIndex={3}
				opacity={0.63}
				scale={0.88}
				initialDelay={1200}
				avoidMolecules={['methanol', 'nitrobenzene']}
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
