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
				className="w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 lg:px-16 space-section relative"
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
							className="text-2xl sm:text-3xl md:text-4xl text-amber-500 font-['Playfair_Display',serif] italic font-medium mb-4"
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1, duration: 0.4 }}
						>
							The Data Backbone
						</motion.h3>

						<motion.h1
							className="text-5xl sm:text-6xl md:text-8xl font-sans font-extrabold text-center mx-auto tracking-tighter leading-[1] w-full mb-6 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-[length:200%_auto] animate-gradient-x text-transparent bg-clip-text"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.4 }}
						>
							MolRec
						</motion.h1>

						<motion.h2
							className="text-lg sm:text-xl md:text-2xl text-zinc-300 font-light tracking-wide max-w-2xl mx-auto"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.4 }}
						>
							Standardized schemas and high-performance storage for molecular
							simulation interoperability and AI-ready datasets.
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
							className="px-8 py-3 rounded-md bg-amber-600 text-white font-semibold outline outline-1 outline-amber-600 outline-offset-[3px] hover:bg-amber-500 transition-all shadow-[0_0_15px_rgba(217,119,6,0.3)]"
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
								title: "Unified Storage",
								description:
									"Efficient storage backends supporting HDF5 and Zarr for local and cloud-based molecular datasets.",
							},
							{
								icon: <WorkflowIcon className="w-8 h-8" />,
								title: "Schema Enforcement",
								description:
									"Strict validation ensuring data integrity and interoperability across different simulation engines.",
							},
							{
								icon: <IntegrationIcon className="w-8 h-8" />,
								title: "AI Integration",
								description:
									"Seamlessly prepare simulation trajectories for deep learning pipelines and neural network potentials.",
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
									Standardizing the Data Lifecycle.
								</h2>
								<p className="text-lg text-zinc-400 mb-8 leading-relaxed font-light">
									MolRec provides a set of core primitives that encapsulate
									complex molecular topologies and trajectories. It's designed
									to be the "source of truth" for your AI models and analysis
									pipelines.
								</p>
								<ul className="space-y-4">
									{[
										"Compact binary serialization",
										"Lazy loading for multi-terabyte datasets",
										"Pandas & Xarray integration",
										"Extensible metadata support",
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
									{`import molrec as mr

# Open standardized trajectory
traj = mr.load("run01.zarr")

# Add frame with strict schema
traj.append(
    positions=pos,
    topology=top,
    params={"temp": 300}
)

# Export for AI training
dataset = traj.to_torch_dataset()`}
								</pre>
							</motion.div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
