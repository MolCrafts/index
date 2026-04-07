import { motion, useInView } from "framer-motion";
import { Suspense, lazy, useEffect, useRef } from "react";
import {
	DataIcon,
	IntegrationIcon,
	WorkflowIcon,
} from "../../components/FeatureIcons";
import { fadeIn, slideUp, staggerContainer } from "../../lib/animations";

const MoleculeOverlay = lazy(() =>
	import("../../components/MoleculeOverlay").then((module) => ({
		default: module.MoleculeOverlay,
	})),
);

export const MolVisLanding = () => {
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="flex flex-col w-full">
			<motion.section
				className="w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 lg:px-16 space-section relative"
				initial="hidden"
				animate="visible"
				variants={fadeIn}
			>
				<div
					className="molecule-blob"
					style={{ top: "35%", right: "25%", animationDelay: "2s" }}
					aria-hidden="true"
				/>
				<div
					className="molecule-blob"
					style={{ bottom: "15%", left: "15%", animationDelay: "6s" }}
					aria-hidden="true"
				/>
				<div
					className="molecular-glow"
					style={{ top: "50%", left: "60%", width: "200px", height: "200px" }}
					aria-hidden="true"
				/>

				<Suspense fallback={null}>
					<MoleculeOverlay />
				</Suspense>

				<motion.div
					className="text-center w-full max-w-7xl mx-auto px-4 z-10"
					variants={slideUp}
				>
					<motion.header className="flex flex-col items-center justify-center w-full">
						<motion.h3
							className="text-2xl sm:text-3xl md:text-4xl text-purple-400 font-['Playfair_Display',serif] italic font-medium mb-4"
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1, duration: 0.4 }}
						>
							The Visual Lens
						</motion.h3>

						<motion.h1
							className="text-5xl sm:text-6xl md:text-8xl font-sans font-extrabold text-center mx-auto tracking-tighter leading-[1] w-full mb-6 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 bg-[length:200%_auto] animate-gradient-x text-transparent bg-clip-text"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.4 }}
						>
							MolVis
						</motion.h1>

						<motion.h2
							className="text-lg sm:text-xl md:text-2xl text-zinc-300 font-light tracking-wide max-w-3xl mx-auto"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.4 }}
						>
							An open-source, Babylon.js-powered 3D visualization and analysis
							application for atomistic and particle-based simulation data.
							Built to handle million-particle datasets.
						</motion.h2>
					</motion.header>

					<motion.div
						className="flex flex-col sm:flex-row justify-center mt-12 gap-6"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5, duration: 0.4 }}
					>
						<a
							href="https://github.com/MolCrafts"
							target="_blank"
							rel="noreferrer noopener"
							className="px-8 py-3 rounded-md bg-purple-500 text-white font-semibold outline outline-1 outline-purple-500 outline-offset-[3px] hover:bg-purple-400 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
						>
							View Open Source
						</a>
						<a
							href="#features"
							className="px-8 py-3 rounded-md bg-zinc-900 border border-zinc-800 text-white font-semibold hover:bg-zinc-800 transition-all"
						>
							Learn More
						</a>
					</motion.div>
				</motion.div>
			</motion.section>

			<section
				id="features"
				className="space-section gradient-bg-1 relative py-24 sm:py-32"
			>
				<motion.div
					ref={sectionRef}
					className="container mx-auto px-4 relative z-10"
					variants={staggerContainer}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
				>
					<motion.div className="text-center mb-20" variants={slideUp}>
						<motion.h2
							className="text-3xl md:text-5xl font-bold tracking-tight"
							variants={fadeIn}
						>
							Visual <span className="text-purple-400">Excellence</span>
						</motion.h2>
					</motion.div>

					<motion.div
						className="grid grid-cols-1 md:grid-cols-3 gap-10"
						variants={staggerContainer}
					>
						{[
							{
								icon: <WorkflowIcon className="w-8 h-8" />,
								title: "Powered by Babylon.js",
								description:
									"High-performance WebGL & WebGPU rendering capable of delivering smooth interactions with massive structural domains.",
							},
							{
								icon: <DataIcon className="w-8 h-8" />,
								title: "Trajectory Analysis",
								description:
									"Playback and scrub through long simulation trajectories dynamically, featuring built-in OVITO-style pipeline modifiers.",
							},
							{
								icon: <IntegrationIcon className="w-8 h-8" />,
								title: "Structural Identification",
								description:
									"Color and visually filter domains instantly based on localized structural environments like FCC, BCC, and HCP.",
							},
						].map((feature, idx) => (
							<motion.div
								key={idx}
								className="flex flex-col items-center text-center group"
								variants={slideUp}
							>
								<div className="text-purple-500 mb-6 group-hover:text-purple-400 transition-colors">
									{feature.icon}
								</div>
								<h3 className="text-xl md:text-2xl font-semibold mb-3 text-zinc-100">
									{feature.title}
								</h3>
								<p className="text-zinc-500 leading-relaxed font-light">
									{feature.description}
								</p>
							</motion.div>
						))}
					</motion.div>
				</motion.div>
			</section>
		</div>
	);
};
