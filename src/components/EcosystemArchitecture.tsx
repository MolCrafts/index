import { motion } from "framer-motion";
import { slideUp } from "../lib/animations";

interface NodeDetail {
	id: string;
	title: string;
	description: string;
	features: string[];
	color: string;
	glow: string;
}

interface Capability {
	id: string;
	name: string;
	desc: string;
	color: string;
}

const originalNodes: NodeDetail[] = [
	{
		id: "molpy",
		title: "MolPy",
		description:
			"Programmable toolkit for building, editing, typing, and exporting molecular systems in Python.",
		features: ["Python", "Polymers", "Force Fields"],
		color: "text-blue-500",
		glow: "bg-blue-500",
	},
	{
		id: "molvis",
		title: "MolVis",
		description:
			"Interactive molecular visualization toolkit for the web, desktop, and Jupyter notebooks.",
		features: ["Babylon.js", "WASM", "Jupyter"],
		color: "text-purple-500",
		glow: "bg-purple-500",
	},
	{
		id: "molrec",
		title: "MolRec",
		description:
			"Backend-neutral record specification for atomistic data semantics.",
		features: ["Spec", "Zarr v3", "Observables"],
		color: "text-amber-500",
		glow: "bg-amber-500",
	},
	{
		id: "molcfg",
		title: "MolCfg",
		description: "Zero-dependency configuration library for Python.",
		features: ["Layered", "Type-Safe", "Tracking"],
		color: "text-emerald-500",
		glow: "bg-emerald-500",
	},
	{
		id: "mollog",
		title: "MolLog",
		description: "Zero-dependency structured logging for Python.",
		features: ["Structured", "Scoped", "Handlers"],
		color: "text-sky-500",
		glow: "bg-sky-500",
	},
	{
		id: "molq",
		title: "MolQ",
		description: "Unified job queue for Python workloads.",
		features: ["HPC", "Local", "Lineage"],
		color: "text-pink-500",
		glow: "bg-pink-500",
	},
	{
		id: "molrs",
		title: "MolRs",
		description: "Molecular modeling toolkit with Rust, Python, npm, and FFI interfaces.",
		features: ["Rust", "WASM", "Packing"],
		color: "text-red-500",
		glow: "bg-red-500",
	},
	{
		id: "molexp",
		title: "MolExp",
		description: "Workflow-and-agent platform for research experiment management.",
		features: ["Workflow", "Workspace", "Assets"],
		color: "text-indigo-500",
		glow: "bg-indigo-500",
	},
	{
		id: "molnex",
		title: "MolNex",
		description: "Layered molecular ML framework split into execution, representation, potential, and model-family packages.",
		features: ["molix", "molrep", "molpot"],
		color: "text-cyan-500",
		glow: "bg-cyan-500",
	},
];

const capabilities: Capability[] = [
	{
		id: "mod",
		name: "Modeling",
		desc: "Architectures",
		color: "text-emerald-500",
	},
	{
		id: "sim",
		name: "Simulation",
		desc: "Dynamics & Orbits",
		color: "text-blue-500",
	},
	{
		id: "ana",
		name: "Analysis",
		desc: "Scientific Insights",
		color: "text-purple-500",
	},
	{
		id: "vis",
		name: "Visualization",
		desc: "3D Rendering",
		color: "text-amber-500",
	},
	{
		id: "cfg",
		name: "Infrastructure",
		desc: "Configuration",
		color: "text-teal-500",
	},
	{
		id: "ops",
		name: "Operations",
		desc: "Execution",
		color: "text-pink-500",
	},
];

export const EcosystemArchitecture = () => {
	// Single robust card component
	const NodeCard = ({ node }: { node: NodeDetail }) => (
		<div className="w-[320px] h-[340px] shrink-0 bg-zinc-900/40 hover:bg-zinc-800/60 border border-white/5 hover:border-white/10 rounded-2xl p-8 flex flex-col gap-4 transition-transform duration-300 transform-gpu hover:-translate-y-1 cursor-pointer">
			<div className="flex items-center gap-3">
				<div
					className={`w-10 h-10 rounded-full ${node.glow} bg-opacity-10 flex items-center justify-center`}
				>
					<div className={`w-3 h-3 rounded-full ${node.glow}`} />
				</div>
				<h3 className={`text-2xl font-bold tracking-tight ${node.color}`}>
					{node.title}
				</h3>
			</div>

			<p className="text-base text-zinc-400 font-light leading-relaxed min-h-[70px]">
				{node.description}
			</p>

			<div className="flex flex-wrap gap-2 mt-auto">
				{node.features.map((feature) => (
					<span
						key={feature}
						className="px-2 py-1 bg-white/5 rounded-md text-[11px] uppercase tracking-wider font-semibold text-zinc-300"
					>
						{feature}
					</span>
				))}
			</div>
		</div>
	);

	// Text capability node acting as a vertical structural divider between cards
	const TextNode = ({ item }: { item: Capability }) => (
		<div className="flex items-center justify-center shrink-0 mx-2 md:mx-4 h-[450px] md:h-[500px] select-none group">
			<span
				className={`text-3xl md:text-4xl font-black tracking-[0.4em] uppercase font-sans ${item.color} opacity-20 group-hover:opacity-60 transition-opacity duration-500 [writing-mode:vertical-rl] rotate-180`}
			>
				{item.name}
			</span>
		</div>
	);

	// One full loop segment that mixes apps and capabilities intricately together
	const MarqueeSequence = () => (
		<div className="flex gap-4 md:gap-8 pr-4 md:pr-8 items-center">
			<TextNode item={capabilities[0]} />
			<NodeCard node={originalNodes[0]} />
			<TextNode item={capabilities[1]} />
			<NodeCard node={originalNodes[1]} />
			<TextNode item={capabilities[2]} />
			<NodeCard node={originalNodes[2]} />
			<TextNode item={capabilities[3]} />
			<NodeCard node={originalNodes[3]} />
			<TextNode item={capabilities[4]} />
			<NodeCard node={originalNodes[4]} />
			<TextNode item={capabilities[5]} />
			<NodeCard node={originalNodes[5]} />
		</div>
	);

	return (
		<section
			id="architecture"
			className="py-20 md:py-32 relative bg-transparent overflow-hidden flex flex-col justify-center"
		>
			{/* CSS for perfect seamless marquee loop */}
			<style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); } 
                }
                .animate-marquee {
                    animation: marquee 50s linear infinite;
                }
            `}</style>

			<div className="container mx-auto px-4 lg:px-8 max-w-5xl z-10 mb-16">
				<div className="flex flex-col gap-6">
					<motion.div
						variants={slideUp}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						{/* Eyebrow to perfectly match Manifesto's alignment style */}
						<div className="flex items-center gap-4 text-primary font-bold tracking-[0.3em] uppercase text-sm mb-6">
							<div className="w-12 h-[1px] bg-primary opacity-50" />
							Ecosystem
						</div>
						<h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-foreground leading-[1.05]">
							Atomic{" "}
							<span className="gradient-text-primary text-transparent bg-clip-text">
								Architecture
							</span>
						</h2>
						<p className="text-xl md:text-2xl text-muted-foreground font-light mt-6 max-w-3xl">
							MolCrafts components stay separate on purpose so modeling,
							workflow, data semantics, visualization, and infrastructure can
							evolve without collapsing into one layer.
						</p>
					</motion.div>
				</div>
			</div>

			{/* Full-width Automatic Marquee completely decoupled from the container alignment */}
			<div className="w-full relative z-10 group overflow-hidden py-4">
				{/* Visual fade edges, using pointer-events-none so it doesn't block hover pause */}
				<div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
				<div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

				<div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] items-center">
					{/* Two sequences allow -50% translateX to loop perfectly */}
					<MarqueeSequence />
					<MarqueeSequence />
				</div>
			</div>
		</section>
	);
};
