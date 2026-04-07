import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
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
				className="text-center w-full max-w-7xl mx-auto px-4 z-10 mb-12 mt-12"
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

				<motion.div
					className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-8 mt-12"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5, duration: 0.4 }}
				>
					<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
						<a
							href="#features"
							className="flex items-center justify-center w-full sm:w-auto text-base sm:text-lg px-8 py-3 font-semibold rounded-md bg-[#10b981] text-zinc-950 outline outline-1 outline-[#10b981] outline-offset-[3px] transition-all hover:bg-[#34d399] shadow-[0_0_15px_rgba(16,185,129,0.3)]"
						>
							Explore
						</a>
					</motion.div>

					<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
						<a
							rel="noreferrer noopener"
							href="https://github.com/MolCrafts"
							target="_blank"
							className="flex items-center justify-center w-full sm:w-auto text-base sm:text-lg px-8 py-3 font-semibold rounded-md bg-[#0a0a0a] text-white outline outline-1 outline-[#10b981] outline-offset-[3px] border border-zinc-800 transition-all hover:bg-zinc-900 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
							aria-label="View on GitHub"
						>
							Open Source
						</a>
					</motion.div>
				</motion.div>
			</motion.div>

			<div className="shadow" aria-hidden="true" />

			{/* Scroll indicator */}
			<motion.div
				className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1, duration: 1 }}
			>
				<span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold font-['Outfit',sans-serif]">
					Scroll
				</span>
				<motion.div
					animate={{ y: [0, 5, 0] }}
					transition={{
						duration: 2,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
				>
					<ChevronDown className="w-5 h-5 text-muted-foreground/50" />
				</motion.div>
			</motion.div>
		</motion.section>
	);
};
