import { motion } from "framer-motion";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { fadeIn } from "../lib/animations";
import { LogoIcon } from "./Icons";

export const Footer = () => {
	const currentYear = new Date().getFullYear();
	
	return (
		<footer id="footer" className="w-full bg-gradient-to-b from-background to-card/10 mt-auto">
			<hr className="w-11/12 mx-auto opacity-30" />

			<motion.section 
				className="container py-12 md:py-16 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-8 gap-y-8"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7 }}
				viewport={{ once: true }}
			>
				<motion.div 
					className="col-span-full xl:col-span-2 space-y-4"
					variants={fadeIn}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					<motion.a
						href="/"
						className="font-bold text-xl flex items-center space-x-2"
						whileHover={{ scale: 1.03 }}
					>
						<LogoIcon />
						<span className="gradient-text-primary">MolCrafts</span>
					</motion.a>
					
					<p className="text-muted-foreground max-w-xs mt-2">
						Open-source molecular sciences toolbox for advanced research and education.
					</p>
				</motion.div>

				<motion.div 
					className="flex flex-col gap-2"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ delay: 0.1, duration: 0.7 }}
					viewport={{ once: true }}
				>
					<h3 className="font-bold text-lg">Follow Us</h3>
					<div>
						<motion.a
							href="https://github.com/MolCrafts"
							className="opacity-60 hover:opacity-100 flex items-center"
							whileHover={{ x: 5 }}
						>
							<GitHubLogoIcon className="mr-2 h-4 w-4" />
							Github
						</motion.a>
					</div>
				</motion.div>
				
				<motion.div 
					className="flex flex-col gap-2"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.7 }}
					viewport={{ once: true }}
				>
					<h3 className="font-bold text-lg">Resources</h3>
					<div className="space-y-2">
						<div>
							<motion.a
								href="#features"
								className="opacity-60 hover:opacity-100 block"
								whileHover={{ x: 5 }}
							>
								Features
							</motion.a>
						</div>
						<div>
							<motion.a
								href="#about"
								className="opacity-60 hover:opacity-100 block"
								whileHover={{ x: 5 }}
							>
								About
							</motion.a>
						</div>
					</div>
				</motion.div>

				<motion.div 
					className="flex flex-col gap-2"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ delay: 0.3, duration: 0.7 }}
					viewport={{ once: true }}
				>
					<h3 className="font-bold text-lg">Documentation</h3>
					<div className="space-y-2">
						<div>
							<motion.a
								href="/docs/molpy"
								className="opacity-60 hover:opacity-100 block"
								whileHover={{ x: 5 }}
							>
								<span className="text-blue-600 dark:text-blue-400">MolPy</span>
							</motion.a>
						</div>
						<div>
							<motion.a
								href="/docs/molplot"
								className="opacity-60 hover:opacity-100 block"
								whileHover={{ x: 5 }}
							>
								<span className="text-green-600 dark:text-green-400">MolPlot</span>
							</motion.a>
						</div>
						<div>
							<motion.a
								href="/docs/molvis"
								className="opacity-60 hover:opacity-100 block"
								whileHover={{ x: 5 }}
							>
								<span className="text-purple-600 dark:text-purple-400">MolVis</span>
							</motion.a>
						</div>
					</div>
				</motion.div>
				
				<motion.div 
					className="flex flex-col gap-2"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ delay: 0.4, duration: 0.7 }}
					viewport={{ once: true }}
				>
					<h3 className="font-bold text-lg">Newsletter</h3>
					<div className="space-y-3">
						<p className="text-sm text-muted-foreground">
							Subscribe for updates
						</p>
						<div className="flex flex-col gap-2 newsletter-form">
							<input 
								type="email" 
								placeholder="Email" 
								className="py-1 px-2 rounded-md border border-input bg-background text-sm w-full"
							/>
							<motion.button 
								className="newsletter-btn bg-primary text-primary-foreground py-1.5 rounded-md text-sm w-full"
								whileHover={{ backgroundColor: "hsl(var(--primary) / 0.8)" }}
								whileTap={{ scale: 0.97 }}
							>
								Subscribe
							</motion.button>
						</div>
					</div>
				</motion.div>
			</motion.section>

			<motion.section 
				className="container pb-8 text-center text-sm text-muted-foreground"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ delay: 0.4, duration: 0.7 }}
				viewport={{ once: true }}
			>
				<h3>
					&copy; {currentYear} MolCrafts. All rights reserved.
				</h3>
			</motion.section>
		</footer>
	);
};
