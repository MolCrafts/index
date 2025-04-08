import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const Hero = () => {
	return (
		<section
			id="hero"
			className="w-full h-screen flex items-center justify-center overflow-hidden"
		>
			<div className="text-center space-y-6">
				<main className="font-bold text-4xl sm:text-2xl">
					<h1 className="inline text-7xl sm:text-8xl">
						<span className="inline bg-gradient-to-r from-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
							MolCrafts
						</span>
					</h1>
					<br />
					<h2 className="inline text-5xl md:text-5xl sm:text-2xl">
						<span className="inline bg-gradient-to-r from-[#34D399] via-[#10B981] to-[#059669] text-transparent bg-clip-text">
							Seamless Molecular Sciences toolbox
						</span>
					</h2>
				</main>

				<p className="text-xl text-muted-foreground mx-auto">
					Advancing Molecular Simulation with the Strength of Open-Source
					Collaboration
				</p>

				<div className="space-y-4 md:space-y-0 md:space-x-4">
					<Button className="w-full md:w-1/3">Get Started</Button>

					<a
						rel="noreferrer noopener"
						href="https://github.com/MolCrafts"
						target="_blank"
						className={`w-full md:w-1/3 ${buttonVariants({
							variant: "outline",
						})}`}
					>
						Github Repository
						<GitHubLogoIcon className="ml-2 w-5 h-5" />
					</a>
				</div>
			</div>

			<div className="shadow" />
		</section>
	);
};
