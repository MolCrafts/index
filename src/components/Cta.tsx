import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { slideUp, staggerContainer } from "../lib/animations";
import { cn } from "../lib/utils";

const ACCENT = "#03a3d7";

export const Cta = () => {
	return (
		<section id="cta" className="py-16 md:py-20 relative overflow-hidden">
			<div className="container mx-auto px-4 lg:px-8 max-w-5xl relative z-10">
				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-80px" }}
					className="flex flex-col gap-3"
				>
					<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
						<motion.div
							variants={slideUp}
							className="flex flex-col gap-3 shrink-0"
						>
							<div className="flex items-center gap-4 text-primary font-bold tracking-[0.3em] uppercase text-sm">
								<div className="w-12 h-[1px] bg-primary opacity-50" />
								Repositories
							</div>
							<p className="text-xl md:text-2xl text-foreground font-light leading-snug">
								Use the layer you need.{" "}
								<span className="text-muted-foreground">Leave the rest.</span>
							</p>
						</motion.div>

						<motion.a
							href="https://github.com/MolCrafts"
							target="_blank"
							rel="noreferrer noopener"
							variants={slideUp}
							className="group flex items-center gap-4 shrink-0 no-underline"
						>
							<div
								className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
								style={{
									backgroundColor: `${ACCENT}1f`,
									boxShadow: `0 0 24px ${ACCENT}30`,
								}}
							>
								<Github className="w-5 h-5" style={{ color: ACCENT }} />
							</div>

							<div className="flex flex-col">
								<span
									className="text-[10px] font-bold tracking-[0.35em] uppercase"
									style={{ color: ACCENT }}
								>
									github.com/MolCrafts
								</span>
								<span className="text-base font-light text-foreground transition-colors group-hover:text-primary">
									Browse all repos
								</span>
							</div>

							<ArrowUpRight
								className={cn(
									"w-4 h-4 ml-1 transition-transform",
									"group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
								)}
								style={{ color: ACCENT }}
							/>
						</motion.a>
					</div>

					<motion.div
						variants={slideUp}
						className="hidden md:flex items-center gap-2"
					>
						<div
							className="flex-1 h-px"
							style={{
								background: `linear-gradient(90deg, transparent 0%, ${ACCENT}30 30%, ${ACCENT}cc 100%)`,
								boxShadow: `0 0 12px ${ACCENT}80, 0 0 24px ${ACCENT}40`,
							}}
						/>
						<div
							className="w-1.5 h-1.5 rounded-full shrink-0"
							style={{
								backgroundColor: ACCENT,
								boxShadow: `0 0 8px ${ACCENT}, 0 0 16px ${ACCENT}80`,
							}}
						/>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};
