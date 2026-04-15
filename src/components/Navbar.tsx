import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ChevronDown, Menu } from "lucide-react";
import { ecosystemCategories } from "../lib/ecosystem";
import { Button } from "./ui/button";
import { LogoIcon } from "./Icons";
import { ModeToggle } from "./mode-toggle";

export const Navbar = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
	const [currentPath, setCurrentPath] = useState(
		typeof window !== "undefined" ? window.location.pathname : "/",
	);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const handleLocationChange = () => {
			setCurrentPath(window.location.pathname);
		};
		window.addEventListener("popstate", handleLocationChange);
		return () => window.removeEventListener("popstate", handleLocationChange);
	}, []);

	const isSubpage = currentPath !== "/";
	const packageName = isSubpage ? currentPath.split("/")[1] : "";
	const docsLink = packageName ? `https://${packageName}.molcrafts.org/` : "#";

	const handleMouseEnter = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		setDropdownOpen(true);
	};

	const handleMouseLeave = () => {
		timeoutRef.current = setTimeout(() => {
			setDropdownOpen(false);
		}, 300);
	};

	return (
		<motion.header
			className="sticky border-b top-0 z-50 w-full bg-background/80 backdrop-blur-xl dark:border-b-zinc-800/50 border-zinc-200"
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<div className="container h-16 px-4 mx-auto flex justify-between items-center relative">
				{/* Logo */}
				<div className="flex items-center">
					<motion.a
						rel="noreferrer noopener"
						href="/"
						className="font-bold text-2xl flex items-center space-x-2"
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
					>
						<LogoIcon />
						<span className="gradient-text-primary">MolCrafts</span>
					</motion.a>
				</div>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center gap-2 h-full">
					<motion.a
						href="/"
						className={`text-sm font-medium px-4 py-2 rounded-md transition-colors ${
							currentPath === "/"
								? "text-primary bg-primary/5"
								: "text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
						}`}
						whileHover={{ y: -1 }}
					>
						Home
					</motion.a>

					{/* Ecosystem Dropdown with Hover Bridge */}
					<div
						className="relative"
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<button
							type="button"
							className={`flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-md transition-colors ${
								dropdownOpen
									? "text-foreground bg-zinc-100 dark:bg-zinc-800/50"
									: "text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
							}`}
						>
							{isSubpage ? "Ecosystems" : "Ecosystem"}
							<ChevronDown
								className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
							/>
						</button>

						{/* Hover Bridge - Invisible div to bridge any gap between button and menu */}
						{dropdownOpen && (
							<div
								className="absolute top-full left-0 w-full h-8 z-10"
								aria-hidden="true"
							/>
						)}

						<AnimatePresence>
							{dropdownOpen && (
								<motion.div
									initial={{ opacity: 0, y: 10, scale: 0.95 }}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									exit={{ opacity: 0, y: 10, scale: 0.95 }}
									transition={{ duration: 0.2, ease: "easeOut" }}
									className="absolute top-full left-1/2 -translate-x-1/2 w-max p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-50 overflow-hidden"
								>
									{/* Glow inside dropdown */}
									<div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 blur-[60px] rounded-full pointer-events-none" />

									<div className="relative flex flex-row gap-6 px-2 py-1">
										{ecosystemCategories.map((category, catIdx) => (
											<div
												key={category.title}
												className="flex flex-col gap-1 w-44"
											>
												<div className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
													{category.title}
												</div>
												<div className="flex flex-col gap-1">
													{category.items.map((item, itemIdx) => (
														<motion.a
															key={item.title}
															href={item.href}
															initial={{ opacity: 0, x: -10 }}
															animate={{ opacity: 1, x: 0 }}
															transition={{
																delay:
																	(catIdx * category.items.length + itemIdx) *
																	0.05,
															}}
															className={`flex items-baseline gap-2 px-3 py-2 rounded-lg transition-all ${item.bg} group`}
														>
															<span
																className={`text-sm font-semibold transition-colors group-hover:translate-x-1 duration-200 ${item.color}`}
															>
																{item.title}
															</span>
															<span className="text-xs text-muted-foreground">
																· {item.role}
															</span>
														</motion.a>
													))}
												</div>
											</div>
										))}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>

					{isSubpage ? (
						<motion.a
							href={docsLink}
							target="_blank"
							rel="noreferrer noopener"
							className="text-sm font-medium px-4 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
							whileHover={{ y: -1 }}
						>
							Docs
						</motion.a>
					) : (
						<motion.a
							href="#manifesto"
							className="text-sm font-medium px-4 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
							whileHover={{ y: -1 }}
						>
							Manifesto
						</motion.a>
					)}
				</nav>

				{/* Right Side Actions */}
				<div className="flex items-center gap-3">
					<div className="hidden md:flex items-center gap-3">
						<Button asChild variant="ghost" size="icon" className="ghost">
							<a
								rel="noreferrer noopener"
								href="https://github.com/MolCrafts"
								target="_blank"
							>
								<GitHubLogoIcon className="h-[1.1rem] w-[1.2rem]" />
								<span className="sr-only">GitHub</span>
							</a>
						</Button>
						<ModeToggle />
					</div>

					{/* Mobile Menu Toggle */}
					<div className="md:hidden flex items-center gap-2">
						<ModeToggle />
						<Sheet open={isOpen} onOpenChange={setIsOpen}>
							<SheetTrigger className="p-2 -mr-2">
								<Menu className="h-6 w-6" />
								<span className="sr-only">Toggle Menu</span>
							</SheetTrigger>
							<SheetContent
								side="right"
								className="w-[300px] border-l dark:border-zinc-800"
							>
								<SheetHeader className="text-left mb-8">
									<SheetTitle className="text-xl font-bold gradient-text-primary">
										MolCrafts
									</SheetTitle>
								</SheetHeader>
								<div className="flex flex-col gap-3">
									<a
										href="/"
										onClick={() => setIsOpen(false)}
										className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent transition-all font-medium"
									>
										Home
									</a>

									<div className="flex flex-col gap-4">
										{ecosystemCategories.map((category) => (
											<div key={category.title} className="flex flex-col gap-1">
												<div className="px-4 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
													{category.title}
												</div>
												<div className="grid gap-1 px-2">
													{category.items.map((item) => (
														<a
															key={item.title}
															href={item.href}
															onClick={() => setIsOpen(false)}
															className={
																"flex items-baseline gap-2 p-3 rounded-lg hover:bg-accent transition-all"
															}
														>
															<span
																className={`text-sm font-semibold ${item.color}`}
															>
																{item.title}
															</span>
															<span className="text-xs text-muted-foreground">
																· {item.role}
															</span>
														</a>
													))}
												</div>
											</div>
										))}
									</div>

									{isSubpage ? (
										<a
											href={docsLink}
											target="_blank"
											rel="noreferrer noopener"
											onClick={() => setIsOpen(false)}
											className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent transition-all font-medium"
										>
											Docs
										</a>
									) : (
										<a
											href="#manifesto"
											onClick={() => setIsOpen(false)}
											className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent transition-all font-medium"
										>
											Manifesto
										</a>
									)}

									<div className="mt-8 pt-6 border-t dark:border-zinc-800 flex flex-col gap-4">
										<a
											href="https://github.com/MolCrafts"
											target="_blank"
											className="flex items-center gap-3 px-4 py-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-center justify-center font-bold text-sm"
											rel="noreferrer"
										>
											<GitHubLogoIcon className="w-5 h-5" />
											GitHub
										</a>
									</div>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</motion.header>
	);
};
