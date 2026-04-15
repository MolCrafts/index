export interface EcosystemItem {
	title: string;
	href: string;
	role: string;
	description: string;
	color: string;
	bg: string;
}

export interface EcosystemCategory {
	title: string;
	items: EcosystemItem[];
}

export const ecosystemCategories: EcosystemCategory[] = [
	{
		title: "Application",
		items: [
			{
				title: "MolPy",
				href: "/molpy",
				role: "toolkit",
				description:
					"Programmable Python toolkit for molecular simulation workflows.",
				color: "text-blue-500",
				bg: "hover:bg-blue-500/10",
			},
			{
				title: "MolVis",
				href: "/molvis",
				role: "visualization",
				description: "Interactive 3D molecules — web, desktop, Jupyter.",
				color: "text-purple-500",
				bg: "hover:bg-purple-500/10",
			},
			{
				title: "MolNex",
				href: "/molnex",
				role: "ML framework",
				description:
					"Layered ML framework: training, representation, potentials, model zoo.",
				color: "text-cyan-500",
				bg: "hover:bg-cyan-500/10",
			},
			{
				title: "MolPack",
				href: "/molpack",
				role: "system builder",
				description:
					"Packmol-grade molecular packing engine — CLI, Rust crate, Python package.",
				color: "text-orange-500",
				bg: "hover:bg-orange-500/10",
			},
		],
	},
	{
		title: "Infrastructure",
		items: [
			{
				title: "MolCfg",
				href: "/molcfg",
				role: "config",
				description: "Layered config with source tracking. Zero deps.",
				color: "text-emerald-500",
				bg: "hover:bg-emerald-500/10",
			},
			{
				title: "MolLog",
				href: "/mollog",
				role: "logging",
				description: "Structured Python logging. Zero dependencies.",
				color: "text-sky-500",
				bg: "hover:bg-sky-500/10",
			},
			{
				title: "MolQ",
				href: "/molq",
				role: "job queue",
				description: "One job-queue API: local, slurm, pbs, lsf.",
				color: "text-pink-500",
				bg: "hover:bg-pink-500/10",
			},
			{
				title: "MolExp",
				href: "/molexp",
				role: "experiments",
				description:
					"Typed workflows, asset dedup, agent layer for experiments.",
				color: "text-indigo-500",
				bg: "hover:bg-indigo-500/10",
			},
		],
	},
	{
		title: "Specification",
		items: [
			{
				title: "MolRec",
				href: "/molrec",
				role: "record spec",
				description: "Backend-neutral record spec for atomistic data.",
				color: "text-amber-500",
				bg: "hover:bg-amber-500/10",
			},
			{
				title: "MolRs",
				href: "/molrs",
				role: "Rust kernel",
				description: "Rust molecular kernel — Python, WASM, C bindings.",
				color: "text-red-500",
				bg: "hover:bg-red-500/10",
			},
		],
	},
];
