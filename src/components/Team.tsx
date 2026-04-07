import { Github, Twitter } from "lucide-react";

interface ContributorProps {
	imageUrl: string;
	name: string;
	role: string;
	githubUrl: string;
}

const contributors: ContributorProps[] = [
	{
		imageUrl: "https://avatars.githubusercontent.com/u/101?v=4", // Placeholder GitHub-like avatars
		name: "Alexey R.",
		role: "Core Maintainer · MolPy",
		githubUrl: "https://github.com/",
	},
	{
		imageUrl: "https://avatars.githubusercontent.com/u/102?v=4",
		name: "Sarah Chen",
		role: "Lead Architect · MolPot",
		githubUrl: "https://github.com/",
	},
	{
		imageUrl: "https://avatars.githubusercontent.com/u/103?v=4",
		name: "Dr. James O.",
		role: "AI Integration Lead",
		githubUrl: "https://github.com/",
	},
	{
		imageUrl: "https://avatars.githubusercontent.com/u/104?v=4",
		name: "Elena M.",
		role: "WebGL & Visualization",
		githubUrl: "https://github.com/",
	},
];

export const Team = () => {
	return (
		<section
			id="team"
			className="py-24 sm:py-32 bg-[#0a0a0a] border-t border-border/40 relative overflow-hidden"
		>
			{/* Subtle background glow */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[200px] bg-[#03a3d7]/5 blur-[120px] rounded-full point-events-none" />

			<div className="container mx-auto px-4 md:px-8 relative z-10">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
						Built by Scientists
					</h2>
					<p className="mt-4 max-w-2xl mx-auto text-lg text-zinc-500 font-light">
						A global community of computational chemists and AI engineers.
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
					{contributors.map(
						({ imageUrl, name, role, githubUrl }: ContributorProps) => (
							<div
								key={name}
								className="group flex flex-col items-center text-center pb-8"
							>
								<div className="w-24 h-24 rounded-full overflow-hidden mb-5 relative z-10 transition-transform duration-500 group-hover:scale-105">
									<img
										src={imageUrl}
										alt={`${name} avatar`}
										className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
									/>
								</div>

								<div className="relative z-10 w-full">
									<h3 className="text-lg font-semibold text-zinc-100">
										{name}
									</h3>
									<p className="text-sm text-zinc-500 mt-1 font-light">
										{role}
									</p>

									<div className="mt-4 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
										<a
											rel="noreferrer noopener"
											href={githubUrl}
											target="_blank"
											className="text-zinc-500 hover:text-white transition-colors"
											aria-label={`${name}'s GitHub`}
										>
											<Github size={16} />
										</a>
										<a
											rel="noreferrer noopener"
											href="#"
											target="_blank"
											className="text-zinc-500 hover:text-[#1da1f2] transition-colors"
											aria-label={`${name}'s Twitter`}
										>
											<Twitter size={16} />
										</a>
									</div>
								</div>
							</div>
						),
					)}
				</div>

				<div className="mt-12 text-center">
					<p className="text-zinc-500 mb-4">Want to see your name here?</p>
					<a
						href="#community"
						className="text-[#10b981] font-semibold hover:underline"
					>
						Read the Contribution Guide →
					</a>
				</div>
			</div>
		</section>
	);
};
