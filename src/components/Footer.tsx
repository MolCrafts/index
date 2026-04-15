import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { Boxes, ChevronRight, FileCode2, Server, Users } from "lucide-react";
import { fadeIn, staggerContainer } from "../lib/animations";
import { ecosystemCategories } from "../lib/ecosystem";
import { cn } from "../lib/utils";
import { LogoIcon } from "./Icons";

const categoryMeta: Record<
	string,
	{ icon: typeof Boxes; color: string; bg: string }
> = {
	Application: {
		icon: Boxes,
		color: "text-purple-400",
		bg: "bg-purple-500/10",
	},
	Infrastructure: {
		icon: Server,
		color: "text-emerald-400",
		bg: "bg-emerald-500/10",
	},
	Specification: {
		icon: FileCode2,
		color: "text-amber-400",
		bg: "bg-amber-500/10",
	},
};

export const Footer = () => {
	const currentYear = new Date().getFullYear();
	const scrollToTop = () =>
		window.scrollTo({ top: 0, behavior: "smooth" });

	return (
		<footer
			id="footer"
			className="w-full bg-gradient-to-b from-background to-card/10 mt-auto border-t border-zinc-800/40"
		>
			<motion.section
				className="container py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8"
				variants={staggerContainer}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
			>
				{/* Brand column */}
				<motion.div className="flex flex-col gap-4" variants={fadeIn}>
					<a
						href="/"
						className="font-bold text-xl flex items-center gap-2"
					>
						<LogoIcon />
						<span className="gradient-text-primary">MolCrafts</span>
					</a>
					<p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
						Open molecular software,
						<br />
						built in public.
					</p>
					<a
						href="https://github.com/MolCrafts"
						rel="noreferrer noopener"
						target="_blank"
						aria-label="View on GitHub"
						className="self-start text-zinc-400 hover:text-zinc-100 transition-colors"
					>
						<GitHubLogoIcon className="w-5 h-5" />
					</a>
				</motion.div>

				{/* Category columns */}
				{ecosystemCategories.map((category) => {
					const meta = categoryMeta[category.title];
					const Icon = meta.icon;
					return (
						<motion.div
							key={category.title}
							className="flex flex-col gap-3"
							variants={fadeIn}
						>
							<div className="flex items-center gap-2">
								<div
									className={cn(
										"w-7 h-7 rounded-md flex items-center justify-center",
										meta.bg,
									)}
								>
									<Icon className={cn("w-4 h-4", meta.color)} />
								</div>
								<span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
									{category.title}
								</span>
							</div>
							<div className="flex flex-col gap-2">
								{category.items.map((item) => (
									<motion.a
										key={item.title}
										href={item.href}
										whileHover={{ x: 3 }}
										className="group flex items-center justify-between rounded-lg border border-zinc-800/50 bg-zinc-900/30 px-3 py-2 hover:bg-zinc-900/60 hover:border-zinc-700 transition-colors"
									>
										<span
											className={cn("text-sm font-semibold", item.color)}
										>
											{item.title}
										</span>
										<ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
									</motion.a>
								))}
							</div>
						</motion.div>
					);
				})}

				{/* Community column */}
				<motion.div className="flex flex-col gap-3" variants={fadeIn}>
					<div className="flex items-center gap-2">
						<div className="w-7 h-7 rounded-md flex items-center justify-center bg-cyan-500/10">
							<Users className="w-4 h-4 text-cyan-400" />
						</div>
						<span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
							Community
						</span>
					</div>
					<p className="text-sm text-muted-foreground italic leading-relaxed">
						Built in public.
						<br />
						Organized for reuse.
					</p>
				</motion.div>
			</motion.section>

			<div className="container pb-8 pt-6 flex items-center justify-between text-sm text-muted-foreground border-t border-zinc-800/30">
				<span>
					&copy; {currentYear} MolCrafts. All rights reserved.
				</span>
				<button
					type="button"
					onClick={scrollToTop}
					className="hover:text-foreground transition-colors"
				>
					Back to top
				</button>
			</div>
		</footer>
	);
};
