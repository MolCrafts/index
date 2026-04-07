import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

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
			className="py-20 border-t border-zinc-800/30 bg-zinc-950/20"
		>
			<div className="container mx-auto px-4 max-w-5xl">
				<div className="flex flex-col md:flex-row items-center justify-between gap-10">
					<div className="flex-1 text-center md:text-left">
						<h2 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight font-['Outfit',sans-serif]">
							Stay <span className="gradient-text-primary">Updated</span>
						</h2>
						<p className="text-muted-foreground text-sm uppercase tracking-[0.2em] font-bold opacity-60">
							Join our research mailing list
						</p>
					</div>

					<div className="w-full md:w-auto min-w-[300px]">
						{subscribed ? (
							<motion.div
								initial={{ scale: 0.9, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								className="bg-primary/10 text-primary py-3 px-6 rounded-full font-medium inline-block flex items-center gap-2 border border-primary/20"
							>
								<span className="text-sm">Subscribed successfully!</span>
							</motion.div>
						) : (
							<form
								onSubmit={handleSubmit}
								className="relative group max-w-md w-full"
							>
								<input
									type="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter your email"
									className="w-full bg-zinc-900/50 border border-zinc-800 text-white py-4 pl-6 pr-32 rounded-full focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all text-sm font-medium"
								/>
								<button
									type="submit"
									className="absolute right-1 top-1 bottom-1 bg-white text-black font-bold px-6 rounded-full hover:bg-primary hover:text-black transition-all flex items-center gap-2 text-xs uppercase tracking-widest"
								>
									Join
									<ArrowRight className="w-3 h-3" />
								</button>
							</form>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};
