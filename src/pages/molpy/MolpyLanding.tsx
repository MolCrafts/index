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

export const MolpyLanding = () => {
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="flex flex-col w-full">
			{/* HERO SECTION */}
			<motion.section
				className="w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 lg:px-16 space-section relative"
				initial="hidden"
				animate="visible"
				variants={fadeIn}
			>
				{/* Background Blobs */}
				<div
					className="molecule-blob"
					style={{ top: "25%", left: "15%" }}
					aria-hidden="true"
				/>
				<div
					className="molecule-blob"
					style={{ bottom: "30%", right: "20%", animationDelay: "4s" }}
					aria-hidden="true"
				/>
				<div
					className="molecular-glow"
					style={{ top: "30%", left: "50%", width: "300px", height: "300px" }}
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
							className="text-2xl sm:text-3xl md:text-4xl text-blue-400 font-['Playfair_Display',serif] italic font-medium mb-4"
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1, duration: 0.4 }}
						>
							The Orchestrator
						</motion.h3>

						<motion.h1
							className="text-5xl sm:text-6xl md:text-8xl font-sans font-extrabold text-center mx-auto tracking-tighter leading-[1] w-full mb-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 bg-[length:200%_auto] animate-gradient-x text-transparent bg-clip-text"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.4 }}
						>
							MolPy
						</motion.h1>

						<motion.h2
							className="text-lg sm:text-xl md:text-2xl text-zinc-300 font-light tracking-wide max-w-2xl mx-auto"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.4 }}
						>
							A seamless, memory-efficient protocol to interconnect molecular
							topologies and manage massive datasets via MolStore.
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
							className="px-8 py-3 rounded-md bg-blue-500 text-white font-semibold outline outline-1 outline-blue-500 outline-offset-[3px] hover:bg-blue-400 transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]"
						>
							View Repository
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

			{/* FEATURES SECTION */}
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
							Core <span className="text-blue-400">Capabilities</span>
						</motion.h2>
					</motion.div>

					<motion.div
						className="grid grid-cols-1 md:grid-cols-3 gap-10"
						variants={staggerContainer}
					>
						{[
							{
								icon: <DataIcon className="w-8 h-8" />,
								title: "Topology Management",
								description:
									"Easily load, modify, and query molecular graphs and topologies with Python.",
							},
							{
								icon: <WorkflowIcon className="w-8 h-8" />,
								title: "MolStore Integration",
								description:
									"Handle large-scale trajectory and attribute datasets efficiently through HDF5 integration.",
							},
							{
								icon: <IntegrationIcon className="w-8 h-8" />,
								title: "Ecosystem Backbone",
								description:
									"Serves as the central translation layer between MolPot potentials and MolVis rendering.",
							},
						].map((feature, idx) => (
							<motion.div
								key={idx}
								className="flex flex-col items-center text-center group"
								variants={slideUp}
							>
								<div className="text-blue-500 mb-6 group-hover:text-blue-400 transition-colors">
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
