import { motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
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

export const MolrecLanding = () => {
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="flex flex-col w-full">
			{/* HERO SECTION */}
			<motion.section
				className="w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 lg:px-16 space-section relative"
				initial="hidden"
				animate="visible"
				variants={fadeIn}
			>
				{/* Background Blobs */}
				<div
					className="molecule-blob"
					style={{
						top: "20%",
						left: "10%",
						background: "rgba(245, 158, 11, 0.1)",
					}}
					aria-hidden="true"
				/>
				<div
					className="molecule-blob"
					style={{
						bottom: "25%",
						right: "15%",
						animationDelay: "3s",
						background: "rgba(245, 158, 11, 0.08)",
					}}
					aria-hidden="true"
				/>
				<div
					className="molecular-glow"
					style={{
						top: "40%",
						left: "55%",
						width: "350px",
						height: "350px",
						background:
							"radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)",
					}}
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
							className="text-2xl sm:text-3xl md:text-4xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-[length:200%_auto] animate-gradient-x text-transparent bg-clip-text font-['Playfair_Display',serif] italic font-medium mb-4 sm:mb-6 pb-2"
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1, duration: 0.4 }}
						>
							The Data Backbone
						</motion.h3>

						<motion.h1
							className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-sans font-extrabold text-center mx-auto tracking-tighter leading-[1.1] w-full mb-4 sm:mb-6 pb-4 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 bg-[length:200%_auto] animate-gradient-x text-transparent bg-clip-text pt-2"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.4 }}
						>
							MolRec
						</motion.h1>

						<motion.h2
							className="text-lg sm:text-xl md:text-2xl font-['Outfit',sans-serif] font-semibold tracking-[0.2em] uppercase w-full max-w-4xl mx-auto bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-[length:200%_auto] animate-gradient-x text-transparent bg-clip-text pb-2"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.4 }}
						>
							A Backend-Neutral Record Specification for Atomistic Data
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
								href="#toolkit"
								className="flex items-center justify-center w-full sm:w-auto text-base sm:text-lg px-8 py-3 font-semibold rounded-md bg-amber-500 text-zinc-950 outline outline-1 outline-amber-500 outline-offset-[3px] transition-all hover:bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
							>
								See the API
							</a>
						</motion.div>

						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<a
								rel="noreferrer noopener"
								href="https://github.com/MolCrafts/molrec"
								target="_blank"
								className="flex items-center justify-center w-full sm:w-auto text-base sm:text-lg px-8 py-3 font-semibold rounded-md bg-[#0a0a0a] text-white outline outline-1 outline-amber-500 outline-offset-[3px] border border-zinc-800 transition-all hover:bg-zinc-900 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
								aria-label="View on GitHub"
							>
								View on GitHub
							</a>
						</motion.div>
					</motion.div>
				</motion.div>

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
						transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
					>
						<ChevronDown className="w-5 h-5 text-muted-foreground/50" />
					</motion.div>
				</motion.div>
			</motion.section>

			{/* FEATURES SECTION */}
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
							className="text-lg sm:text-xl md:text-2xl font-['Outfit',sans-serif] font-semibold tracking-[0.2em] uppercase w-full max-w-4xl mx-auto bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-[length:200%_auto] animate-gradient-x text-transparent bg-clip-text pb-2"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.4 }}
						>
							Unified <span className="text-amber-500">Infrastructure</span>
						</motion.h2>
					</motion.div>

					<motion.div
						className="grid grid-cols-1 md:grid-cols-3 gap-10"
						variants={staggerContainer}
					>
						{[
							{
								icon: <DataIcon className="w-8 h-8" />,
								title: "Backend-Neutral Storage",
								description:
									"The spec defines semantics, not storage. Zarr v3 is the reference implementation, but HDF5, SQL, or other backends can implement the same record model.",
							},
							{
								icon: <WorkflowIcon className="w-8 h-8" />,
								title: "Language-Agnostic Semantics",
								description:
									"A single semantic layer lets one tool interpret another tool's atomistic records without guessing what arrays or dataset names mean.",
							},
							{
								icon: <IntegrationIcon className="w-8 h-8" />,
								title: "First-Class Collections & Grids",
								description:
									"Frames can hold atoms, bonds, angles, beads, fragments, and volumetric grids as first-class record elements.",
							},
						].map((feature, idx) => (
							<motion.div
								key={idx}
								className="flex flex-col items-center text-center group"
								variants={slideUp}
							>
								<div className="text-amber-500 mb-6 group-hover:text-amber-400 transition-colors">
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

			{/* TECHNICAL SPEC SECTION */}
			<section className="space-section relative py-20 bg-[#070707]">
				<div className="container mx-auto px-4">
					<div className="glass-card p-10 md:p-16 rounded-[2rem] overflow-hidden relative">
						<div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[80px] rounded-full -mr-32 -mt-32" />

						<div className="lg:grid lg:grid-cols-2 gap-16 items-center">
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6 }}
								viewport={{ once: true }}
							>
								<h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Playfair_Display',serif] italic text-zinc-100">
									The Atomistic Data Backbone.
								</h2>
								<p className="text-lg text-zinc-400 mb-8 leading-relaxed font-light">
									MolRec defines what a molecular record means, not how it must
									be stored. From canonical snapshots to trajectories and
									observables, metadata stays explicit instead of being inferred
									from array shape or dataset naming.
								</p>
								<ul className="space-y-4">
									{[
										"Language-Agnostic Specification",
										"First-class Grid and Collection Support",
										"Extensible to MD, ML Potentials, and Electronic Structure",
										"Mandatory Metadata for Every Observable",
									].map((item) => (
										<li key={item} className="flex items-center gap-3">
											<div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
											<span className="text-zinc-300 font-medium text-sm tracking-wide lowercase">
												{item}
											</span>
										</li>
									))}
								</ul>
							</motion.div>

							<motion.div
								className="mt-12 lg:mt-0 p-8 bg-zinc-950 rounded-2xl border border-zinc-800 font-mono text-sm shadow-2xl"
								initial={{ opacity: 0, scale: 0.95 }}
								whileInView={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.6 }}
								viewport={{ once: true }}
							>
								<div className="flex gap-2 mb-6">
									<div className="w-3 h-3 rounded-full bg-red-500/30" />
									<div className="w-3 h-3 rounded-full bg-amber-500/30" />
									<div className="w-3 h-3 rounded-full bg-green-500/30" />
								</div>
								<pre className="text-amber-500/80 leading-relaxed overflow-x-auto">
									{`/
+-- meta                  # record-level metadata (required)
+-- frame                 # canonical snapshot (required)
|   +-- atoms/            #   named collection: atoms
|   +-- bonds/            #   named collection: bonds
|   +-- <grids>/          #   named volumetric grids
|   +-- box               #   simulation cell (SimBox)
+-- trajectory            # time-series frames (optional)
+-- observables           # derived quantities (optional)
+-- method                # scientific context (optional)
+-- parameters            # workflow parameters (optional)`}
								</pre>
							</motion.div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
