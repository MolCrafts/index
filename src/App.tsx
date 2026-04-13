import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Cta } from "./components/Cta";
import { EcosystemArchitecture } from "./components/EcosystemArchitecture";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Manifesto } from "./components/Manifesto";
import { Navbar } from "./components/Navbar";
import { Newsletter } from "./components/Newsletter";
import { ScrollToTop } from "./components/ScrollToTop";
import { MolVisLanding, MolpyLanding, MolrecLanding, MolcfgLanding, MollogLanding, MolqLanding, MolrsLanding, MolexpLanding, MolnexLanding } from "./pages";

import { SEOSchema } from "./components/SEOSchema";
import "./App.css";

function App() {
	const [currentPath, setCurrentPath] = useState(window.location.pathname);
	const [isLoading, setIsLoading] = useState(true);

	// Symulacja początkowego ładowania aplikacji
	useEffect(() => {
		// Reduce loading time to improve SEO and initial page load
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 500);

		return () => clearTimeout(timer);
	}, []);

	// Handle route changes and history
	useEffect(() => {
		const handleLocationChange = () => {
			setCurrentPath(window.location.pathname);
			window.scrollTo(0, 0);
		};

		// Handle browser back/forward navigation
		window.addEventListener("popstate", handleLocationChange);

		return () => {
			window.removeEventListener("popstate", handleLocationChange);
		};
	}, []);

	// Modify links to use client-side routing
	useEffect(() => {
		const handleLinkClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const anchor = target.closest("a");

			if (anchor?.href?.startsWith(window.location.origin) && !anchor.target) {
				const url = new URL(anchor.href);

				// Handle anchor links on the same page naturally
				if (url.pathname === window.location.pathname && url.hash) {
					return; // Let the browser handle the scroll
				}

				e.preventDefault();
				const newPath = url.pathname;

				if (newPath !== currentPath) {
					// Update URL without full page reload
					window.history.pushState({}, "", newPath);

					// Reduce page transition loading time
					setTimeout(() => {
						setCurrentPath(newPath);
						window.scrollTo(0, 0);
						setIsLoading(false);
					}, 500); // Reduced from 1200ms to improve UX and SEO
				}
			}
		};

		document.addEventListener("click", handleLinkClick);
		return () => {
			document.removeEventListener("click", handleLinkClick);
		};
	}, [currentPath]);

	useEffect(() => {
		const handleScroll = () => {
			const elements = document.querySelectorAll(".scroll-fade");
			for (const element of elements) {
				const position = element.getBoundingClientRect();
				// Aktywuj efekt, gdy element jest widoczny w oknie przeglądarki
				if (position.top < window.innerHeight - 100) {
					element.classList.add("active");
				}
			}
		};

		// Only add scroll handler for the landing page
		if (currentPath === "/") {
			window.addEventListener("scroll", handleScroll);
			// Wywołaj raz na początku, aby aktywować widoczne elementy
			handleScroll();

			return () => window.removeEventListener("scroll", handleScroll);
		}
	}, [currentPath]);

	// Render content based on the current path
	const renderContent = () => {
		if (currentPath.startsWith("/molpy")) {
			return <MolpyLanding />;
		}
		if (currentPath.startsWith("/molrec")) {
			return <MolrecLanding />;
		}
		if (currentPath.startsWith("/molvis")) {
			return <MolVisLanding />;
		}
		if (currentPath.startsWith("/molcfg")) {
			return <MolcfgLanding />;
		}
		if (currentPath.startsWith("/mollog")) {
			return <MollogLanding />;
		}
		if (currentPath.startsWith("/molq")) {
			return <MolqLanding />;
		}
		if (currentPath.startsWith("/molrs")) {
			return <MolrsLanding />;
		}
		if (currentPath.startsWith("/molexp")) {
			return <MolexpLanding />;
		}
		if (currentPath.startsWith("/molnex")) {
			return <MolnexLanding />;
		}
		// Default landing page
		return (
			<>
				<Hero />
				<EcosystemArchitecture />
				<Manifesto />
				<Newsletter />
				<Cta />
			</>
		);
	};

	return (
		<>
			{/* SEO Structured Data */}
			<SEOSchema path={currentPath} />

			<AnimatePresence mode="wait">
				{!isLoading && (
					<motion.div
						key={currentPath}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
						className="flex flex-col min-h-screen"
					>
						<Navbar />
						<main className="flex-grow">{renderContent()}</main>
						<Footer />
						<ScrollToTop />
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

export default App;
