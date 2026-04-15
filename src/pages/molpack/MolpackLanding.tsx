import { motion, useInView } from "framer-motion";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
	DataIcon,
	IntegrationIcon,
	SimulationIcon,
	WorkflowIcon,
} from "../../components/FeatureIcons";
import { fadeIn, slideUp, staggerContainer } from "../../lib/animations";

const MoleculeOverlay = lazy(() =>
	import("../../components/MoleculeOverlay").then((module) => ({
		default: module.MoleculeOverlay,
	})),
);

const FEATURES = [
	{
		icon: <IntegrationIcon className="w-8 h-8" />,
		title: "Packmol-Compatible Scripts",
		description:
			"Reads the same `.inp` keyword script Packmol uses — drop in existing decks unchanged.",
	},
	{
		icon: <SimulationIcon className="w-8 h-8" />,
		title: "Geometric Restraints",
		description:
			"Box, sphere, half-space planes, fixed positions, and per-atom-subset restraints out of the box.",
	},
	{
		icon: <DataIcon className="w-8 h-8" />,
		title: "Extended Format Support",
		description:
			"Reads PDB, XYZ, SDF/MOL, LAMMPS dump, LAMMPS data; writes PDB, XYZ, LAMMPS dump.",
	},
	{
		icon: <WorkflowIcon className="w-8 h-8" />,
		title: "Three Surfaces, One Engine",
		description:
			"Same kernel exposed as a CLI binary, a Rust crate, and a Python package.",
	},
	{
		icon: <SimulationIcon className="w-8 h-8" />,
		title: "Reproducible Packings",
		description:
			"Seedable RNG, explicit tolerance, configurable outer-loop iterations — same inputs, same configuration.",
	},
	{
		icon: <IntegrationIcon className="w-8 h-8" />,
		title: "Pairs With MolRs",
		description:
			"Python API consumes MolRs frames directly; share a single in-memory representation across the toolkit.",
	},
];

const API_SNIPPETS = [
	{
		title: "Drop-in Packmol Script",
		filename: "mixture.inp",
		description:
			"Same `.inp` format as Packmol — bring your existing scripts, the binary takes a file or stdin.",
		language: "bash",
		code: `# molpack mixture.inp   (or:  molpack < mixture.inp)
tolerance 2.0
seed 42
filetype pdb
output mixture.pdb

structure water.pdb
  number 500
  inside box 0. 0. 0. 40. 40. 40.
end structure

structure ethanol.pdb
  number 50
  inside box 0. 0. 0. 40. 40. 40.
end structure`,
	},
	{
		title: "Pack From Python",
		filename: "pack_water.py",
		description:
			"Read a frame with MolRs, declare a Target with restraints, call `Molpack().pack(...)`.",
		language: "python",
		code: `import molrs
from molpack import InsideBox, Molpack, Target

frame = molrs.read_pdb("water.pdb")

water = (
    Target("water", frame, count=500)
    .with_restraint(InsideBox([0, 0, 0], [40, 40, 40]))
)

result = Molpack(tolerance=2.0).pack(
    [water], max_loops=200, seed=42,
)`,
	},
	{
		title: "Native Rust API",
		filename: "pack.rs",
		description:
			"Same engine as a Rust crate — build Targets from raw coords, compose restraints, get a typed result.",
		language: "rust",
		code: `use molpack::{InsideBoxRestraint, Molpack, Target};

let positions = [[0.0, 0.0, 0.0], [0.96, 0.0, 0.0], [-0.24, 0.93, 0.0]];
let radii = [1.52, 1.20, 1.20];

let target = Target::from_coords(&positions, &radii, 100)
    .with_name("water")
    .with_restraint(InsideBoxRestraint::new([0.0; 3], [40.0; 3]));

let result = Molpack::new()
    .tolerance(2.0)
    .pack(&[target], 200, Some(42))?;`,
	},
	{
		title: "Beyond PDB & XYZ",
		filename: "formats.inp",
		description:
			"Beyond Packmol's PDB/XYZ, molpack reads SDF/MOL and LAMMPS dump/data — by extension or `filetype`.",
		language: "bash",
		code: `# Mix file types: ligand from SDF, solvent from a LAMMPS dump
output system.pdb

structure ligand.sdf
  number 1
  fixed 20. 20. 20. 0. 0. 0.
end structure

structure water.lammpstrj
  filetype lammps_dump
  number 800
  inside box 0. 0. 0. 40. 40. 40.
end structure`,
	},
];

export const MolpackLanding = () => {
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
	const [activeCodeIdx, setActiveCodeIdx] = useState(0);

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
							className="text-2xl sm:text-3xl md:text-4xl bg-gradient-to-r from-amber-400 via-orange-300 to-amber-400 bg-[length:200%_auto] animate-gradient-x text-transparent bg-clip-text font-['Playfair_Display',serif] italic font-medium mb-4 sm:mb-6 pb-2"
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1, duration: 0.4 }}
						>
							Flexible 
						</motion.h3>

						<motion.h1
							className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-sans font-extrabold text-center mx-auto tracking-tighter leading-[1.1] w-full mb-4 sm:mb-6 pb-4 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 bg-[length:200%_auto] animate-gradient-x text-transparent bg-clip-text pt-2"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.4 }}
						>
							MolPack
						</motion.h1>

						<motion.h2
							className="text-lg sm:text-xl md:text-2xl font-['Outfit',sans-serif] font-semibold tracking-[0.2em] uppercase w-full max-w-4xl mx-auto bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 bg-[length:200%_auto] animate-gradient-x text-transparent bg-clip-text pb-2"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.4 }}
						>
							Extensible molecule packing for initial configuration generation
						</motion.h2>
					</motion.header>
				</motion.div>
			</motion.section>

			{/* API / SNIPPETS SECTION */}
			<section id="toolkit" className="relative py-24 sm:py-32">
				<motion.div
					ref={sectionRef}
					className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl"
					variants={staggerContainer}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
				>
					<motion.div
						className="text-center mb-16 lg:mb-20 max-w-4xl mx-auto"
						variants={slideUp}
					>
						<motion.h2
							className="text-lg sm:text-xl md:text-2xl font-['Outfit',sans-serif] font-semibold tracking-[0.2em] uppercase w-full max-w-4xl mx-auto bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 bg-[length:200%_auto] animate-gradient-x text-transparent bg-clip-text pb-2"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.4 }}
						>
							What the{" "}
							<span className="bg-gradient-to-r from-orange-400 to-amber-400 text-transparent bg-clip-text leading-relaxed">
								API
							</span>{" "}
							Feels Like
						</motion.h2>
						<p className="text-zinc-400 text-base md:text-lg leading-relaxed font-light">
							The same engine, three ways in: a Packmol-compatible binary, a
							Rust crate, a Python package.
						</p>
					</motion.div>

					<div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
						<div className="w-full lg:w-5/12 relative pt-2">
							<div className="absolute left-[8px] top-6 bottom-6 w-[1px] bg-zinc-800/80" />

							<div className="flex flex-col gap-10 relative">
								{API_SNIPPETS.map((cap, idx) => (
									<button
										key={cap.title}
										type="button"
										onClick={() => setActiveCodeIdx(idx)}
										className={`text-left pl-10 transition-all duration-300 relative group outline-none ${
											activeCodeIdx === idx
												? "opacity-100"
												: "opacity-40 hover:opacity-80"
										}`}
									>
										<div
											className={`absolute left-0 top-1 w-4 h-4 rounded-full transition-all duration-300 flex items-center justify-center ${
												activeCodeIdx === idx
													? "bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
													: "bg-zinc-900 border border-zinc-700"
											}`}
										>
											{activeCodeIdx === idx && (
												<div className="w-1.5 h-1.5 rounded-full bg-white" />
											)}
										</div>

										<div
											className={`mb-2 transition-colors duration-300 ${activeCodeIdx === idx ? "text-orange-400" : "text-zinc-500 group-hover:text-zinc-300"}`}
										>
											<span className="font-bold text-lg md:text-xl tracking-wide font-sans">
												{cap.title}
											</span>
										</div>
										<p className="text-[15px] leading-relaxed text-zinc-400 font-light max-w-sm">
											{cap.description}
										</p>
									</button>
								))}
							</div>
						</div>

						<motion.div
							key={activeCodeIdx}
							initial={{ opacity: 0, y: 15 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4 }}
							className="w-full lg:w-7/12 sticky top-32"
						>
							<div className="rounded-2xl overflow-hidden bg-[#070707] border border-zinc-800/60 shadow-2xl relative">
								<div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
								<div className="flex px-6 py-4 border-b border-zinc-800/40 items-center justify-between bg-[#0A0A0A]">
									<div className="flex space-x-2">
										<div className="w-3 h-3 rounded-full bg-zinc-700" />
										<div className="w-3 h-3 rounded-full bg-zinc-700" />
										<div className="w-3 h-3 rounded-full bg-zinc-700" />
									</div>
									<div className="text-[11px] text-zinc-500 font-mono tracking-[0.15em] uppercase font-medium">
										{API_SNIPPETS[activeCodeIdx].filename}
									</div>
								</div>

								<div
									className="p-6 md:p-8 overflow-x-auto text-[13px] sm:text-sm md:text-[15px] font-mono leading-relaxed bg-[#030303] min-h-[420px] flex items-center"
									style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
								>
									<SyntaxHighlighter
										language={API_SNIPPETS[activeCodeIdx].language}
										style={vscDarkPlus}
										customStyle={{
											background: "transparent",
											padding: 0,
											margin: 0,
											width: "100%",
											textShadow: "none",
										}}
										wrapLines={true}
										showLineNumbers={false}
									>
										{API_SNIPPETS[activeCodeIdx].code}
									</SyntaxHighlighter>
								</div>
							</div>
						</motion.div>
					</div>
				</motion.div>
			</section>

			{/* FEATURES SECTION */}
			<section
				id="features"
				className="space-section gradient-bg-1 relative py-24 sm:py-32"
			>
				<motion.div
					className="container mx-auto px-4 relative z-10"
					variants={staggerContainer}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
				>
					<motion.div className="text-center mb-20" variants={slideUp}>
						<motion.h2
							className="text-lg sm:text-xl md:text-2xl font-['Outfit',sans-serif] font-semibold tracking-[0.2em] uppercase w-full max-w-4xl mx-auto bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 bg-[length:200%_auto] animate-gradient-x text-transparent bg-clip-text pb-2"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.4 }}
						>
							What MolPack{" "}
							<span className="bg-gradient-to-r from-orange-400 to-amber-400 text-transparent bg-clip-text leading-relaxed">
								Covers
							</span>
						</motion.h2>
						<p className="text-zinc-400 text-base md:text-lg leading-relaxed font-light max-w-4xl mx-auto">
							From a single `.inp` script to a typed Rust API — one packing
							engine, surfaced where you need it.
						</p>
					</motion.div>

					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
						variants={staggerContainer}
					>
						{FEATURES.map((feature) => (
							<motion.div
								key={feature.title}
								className="flex flex-col items-center text-center group"
								variants={slideUp}
							>
								<div className="text-orange-500 mb-6 group-hover:text-orange-400 transition-colors">
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
