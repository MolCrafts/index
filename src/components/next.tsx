import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export const NextSection = () => {
	const [sections, setSections] = useState<HTMLElement[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const buttonRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const all = Array.from(
			document.querySelectorAll("section"),
		) as HTMLElement[];
		setSections(all);
	}, []);

	useEffect(() => {
		if (!sections.length) return;
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

				if (visible[0]) {
					const index = sections.findIndex((s) => s === visible[0].target);
					if (index !== -1) setCurrentIndex(index);
				}
			},
			{ threshold: 0.5 },
		);

		for (const s of sections) {
			observer.observe(s);
		}
		return () => observer.disconnect();
	}, [sections]);

	const scrollToNext = () => {
		if (currentIndex + 1 < sections.length) {
			sections[currentIndex + 1].scrollIntoView({ behavior: "smooth" });
		}
	};

	if (!sections.length || currentIndex === sections.length - 1) return null;

	return (
		<div
			ref={buttonRef}
			onClick={scrollToNext}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") scrollToNext();
			}}
			className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 cursor-pointer animate-bounce text-center flex flex-col items-center"
		>
			<span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-green-400 opacity-30 blur-2xl pointer-events-none"
                style={{ width: 64, height: 64, left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
            />
			<span className="block text-sm text-green-400/70 mb-1 text-center">
				Explore
			</span>
			<ChevronDown
				size={24}
				className="text-green-500 hover:scale-105 transition"
			/>
		</div>
	);
};
