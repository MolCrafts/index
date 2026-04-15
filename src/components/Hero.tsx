import { motion } from "framer-motion";
import { Suspense, lazy, useEffect } from "react";
import { fadeIn, slideUp } from "../lib/animations";

// Lazy load the MoleculeOverlay component
const MoleculeOverlay = lazy(() =>
	import("./MoleculeOverlay").then((module) => ({
		default: module.MoleculeOverlay,
	})),
);

export const Hero = () => {
	// Inicjalizacja animacji po załadowaniu strony
	useEffect(() => {
		const handleScroll = () => {
			const elements = document.querySelectorAll(".scroll-fade");
			for (const element of elements) {
				const position = element.getBoundingClientRect();
				if (position.top < window.innerHeight) {
					element.classList.add("active");
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll(); // Wywołaj raz na początku, aby aktywować widoczne elementy

		return () => window.removeEventListener("scroll", handleScroll);
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
			<div
				className="molecule-blob"
				style={{ top: "25%", left: "15%" }}
				aria-hidden="true"
			/>
			<div
				className="molecule-blob"
				style={{ top: "35%", right: "20%", animationDelay: "7s" }}
				aria-hidden="true"
			/>
			<div
				className="molecule-blob"
				style={{ bottom: "30%", left: "25%", animationDelay: "4s" }}
				aria-hidden="true"
			/>
			<div
				className="molecule-blob"
				style={{ bottom: "15%", right: "15%", animationDelay: "2s" }}
				aria-hidden="true"
			/>

			{/* Subtle molecular background glow effects */}
			<div
				className="molecular-glow"
				style={{ top: "30%", left: "50%", width: "300px", height: "300px" }}
				aria-hidden="true"
			/>
			<div
				className="molecular-glow"
				style={{
					top: "60%",
					left: "30%",
					width: "200px",
					height: "200px",
					animationDelay: "3s",
				}}
				aria-hidden="true"
			/>
			<div
				className="molecular-glow"
				style={{
					top: "20%",
					right: "20%",
					width: "250px",
					height: "250px",
					animationDelay: "5s",
				}}
				aria-hidden="true"
			/>

			{/* Molecule overlay - now directly in Hero */}
			<Suspense fallback={null}>
				<MoleculeOverlay />
			</Suspense>

			<motion.div
				className="text-center w-full max-w-7xl mx-auto px-4 z-10 mb-32"
				variants={slideUp}
			>
				<motion.header className="flex flex-col items-center justify-center w-full">
					{/* Kicker: Elegant French-style cursive/serif (Playfair Display Italic), subtle and refined */}
					<motion.h3
						className="text-2xl sm:text-3xl md:text-4xl gradient-text-secondary font-['Playfair_Display',serif] italic font-medium mb-4 sm:mb-6"
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1, duration: 0.4 }}
					>
						Simulate. Learn. Create.
					</motion.h3>

					{/* Head: Modern bold sans-serif, slightly reduced size, still the visual anchor */}
					<motion.h1
						id="main-heading"
						className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-sans font-extrabold text-center mx-auto tracking-tighter leading-[1] w-full mb-6 sm:mb-8 bg-gradient-to-r from-[#03a3d7] via-[#8ce4ff] to-[#03a3d7] bg-[length:200%_auto] animate-gradient-x text-transparent bg-clip-text"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.4 }}
					>
						MolCrafts
					</motion.h1>

					{/* Subhead: Clean minimal sans-serif, describing the platform clearly, with sliding gradient animation restored */}
					<motion.h2
						className="text-lg sm:text-xl md:text-2xl font-['Outfit',sans-serif] font-semibold tracking-[0.2em] uppercase w-full max-w-4xl mx-auto bg-gradient-to-r from-[#10b981] via-[#1fc0f1] to-[#10b981] bg-[length:200%_auto] animate-gradient-x text-transparent bg-clip-text"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.4 }}
					>
						AI Infrastructure for Molecular Science
					</motion.h2>
				</motion.header>

			</motion.div>

			<div className="shadow" aria-hidden="true" />
		</motion.section>
	);
};
