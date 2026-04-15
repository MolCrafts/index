import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";
import { slideUp, staggerContainer } from "../lib/animations";
import { cn } from "../lib/utils";

const ACCENT = "#a855f7";

export const Newsletter = () => {
	const [email, setEmail] = useState("");
	const [subscribed, setSubscribed] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (email) {
			setSubscribed(true);
			setEmail("");
		}
	};

	return (
		<section
			id="newsletter"
			className="py-16 md:py-20 relative overflow-hidden"
		>
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
								Updates
							</div>
							<p className="text-xl md:text-2xl text-foreground font-light leading-snug">
								Follow the work as it ships.
							</p>
						</motion.div>

						<motion.div
							variants={slideUp}
							className="flex items-center gap-4 shrink-0"
						>
							<div
								className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
								style={{
									backgroundColor: `${ACCENT}1f`,
									boxShadow: `0 0 24px ${ACCENT}30`,
								}}
							>
								<Mail className="w-5 h-5" style={{ color: ACCENT }} />
							</div>

							{subscribed ? (
								<div
									className="text-xs font-bold tracking-[0.2em] uppercase"
									style={{ color: ACCENT }}
								>
									Subscribed · Talk soon.
								</div>
							) : (
								<form
									onSubmit={handleSubmit}
									className="flex items-center gap-3"
								>
									<input
										type="email"
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="you@lab.edu"
										className={cn(
											"w-[220px] bg-transparent",
											"px-1 py-2 text-base font-light text-foreground",
											"placeholder:text-muted-foreground/70 focus:outline-none",
										)}
										style={{ caretColor: ACCENT }}
									/>
									<button
										type="submit"
										className={cn(
											"group inline-flex items-center gap-2",
											"text-sm font-bold tracking-[0.2em] uppercase",
											"transition-all hover:gap-3",
										)}
										style={{ color: ACCENT }}
									>
										Join
										<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
									</button>
								</form>
							)}
						</motion.div>
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
