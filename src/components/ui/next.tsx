import { cn } from "@/lib/utils";
import { useState } from "react";

const findNextSection = (currentSection: Element) => {
	const nextSection = currentSection.nextElementSibling;
	if (nextSection) {
		return nextSection;
	}
	return null;
};

export function ExploreArrow(startSectionId: string) {
	const [isLastSection, setIsLastSection] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const handleScroll = (sectionId: string) => {
		const currentEl = document.getElementById(sectionId);
		const nextEl = currentEl?.nextElementSibling;
		if (nextEl) {
			nextEl.scrollIntoView({ behavior: "smooth" });
		} else {
			setIsLastSection(true);
		}
	};

	return (
		<div
			className="flex flex-col items-center cursor-pointer"
			onClick={() => handleScroll(startSectionId)}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					handleScroll(startSectionId);
				}
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
				Explore Molcrafts
			</p>
			<div className="flex flex-col items-center space-y-1">
				{[...Array(3)].map((_, index) => (
					<div
						key={crypto.randomUUID()}
						className={cn(
							"w-6 h-6 border-b-2 border-l-2 transform rotate-45",
							"border-green-700 dark:border-green-500",
							isHovered ? "animate-none brightness-150" : "animate-pulse",
						)}
					/>
				))}
			</div>
		</div>
	);
}
