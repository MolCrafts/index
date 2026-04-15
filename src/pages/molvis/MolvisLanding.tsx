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
				className="w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 lg:px-16 space-section relative"
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
							className="text-2xl sm:text-3xl md:text-4xl bg-gradient-to-r from-fuchsia-400 via-pink-300 to-fuchsia-400 bg-[length:200%_auto] animate-gradient-x text-transparent bg-clip-text font-['Playfair_Display',serif] italic font-medium mb-4 sm:mb-6 pb-2"
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1, duration: 0.4 }}
						>
							Shape What You See.
						</motion.h3>

						<motion.h1
							className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-sans font-extrabold text-center mx-auto tracking-tighter leading-[1.1] w-full mb-4 sm:mb-6 pb-4 bg-gradient-to-r from-purple-500 via-fuchsia-400 to-purple-500 bg-[length:200%_auto] animate-gradient-x text-transparent bg-clip-text pt-2"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.4 }}
						>
							MolVis
						</motion.h1>

						<motion.h2
							className="text-lg sm:text-xl md:text-2xl font-['Outfit',sans-serif] font-semibold tracking-[0.2em] uppercase w-full max-w-4xl mx-auto bg-gradient-to-r from-violet-400 via-indigo-300 to-violet-400 bg-[length:200%_auto] animate-gradient-x text-transparent bg-clip-text pb-2"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.4 }}
						>
							Interactive molecular visualization toolkit
						</motion.h2>
					</motion.header>
				</motion.div>

			</motion.section>

			<section
				id="toolkit"
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
							className="text-lg sm:text-xl md:text-2xl font-['Outfit',sans-serif] font-semibold tracking-[0.2em] uppercase w-full max-w-4xl mx-auto bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 bg-[length:200%_auto] animate-gradient-x text-transparent bg-clip-text pb-2"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.4 }}
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
								title: "Web, Desktop, and Notebook Ready",
								description:
									"MolVis targets the web, desktop, and Jupyter notebooks with Babylon.js rendering and WebAssembly-backed molecular data processing.",
							},
							{
								icon: <DataIcon className="w-8 h-8" />,
								title: "Interactive Rendering Modes",
								description:
									"View, select, edit, manipulate, measure, and scrub trajectories through one interactive 3D graphics toolkit.",
							},
							{
								icon: <IntegrationIcon className="w-8 h-8" />,
								title: "Multiple Interfaces",
								description:
									"The same codebase ships a core package, React web app, Python Jupyter widget, and VSCode extension with a modular modifier pipeline.",
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
