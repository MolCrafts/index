import { FileText, Github } from "lucide-react";

export const Cta = () => {
	return (
		<section
			id="cta"
			className="bg-[#050505] py-24 sm:py-32 border-t border-border/40 relative"
		>
			{/* Subtle glow */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[200px] bg-[#03a3d7]/5 blur-[100px] rounded-full point-events-none" />

			<div className="container lg:grid lg:grid-cols-2 place-items-center gap-12 relative z-10">
				<div className="lg:col-start-1 text-center lg:text-left">
					<h2 className="text-3xl md:text-5xl font-bold tracking-tight">
						Start Building with
						<span className="block mt-2 bg-gradient-to-r from-[#03a3d7] via-[#8ce4ff] to-[#03a3d7] text-transparent bg-clip-text animate-gradient-x">
							MolCrafts
						</span>
					</h2>
					<p className="text-muted-foreground text-lg md:text-xl mt-6 mb-8 lg:mb-0 leading-relaxed max-w-xl mx-auto lg:mx-0">
						Ready to integrate modern, high-performance molecular tools into
						your workflow? Grab the source code, check out the examples, and
						start running your first simulation today.
					</p>
				</div>

				<div className="lg:col-start-2 w-full flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-end h-auto">
					<a
						href="https://github.com/MolCrafts"
						target="_blank"
						rel="noreferrer noopener"
						className="flex items-center justify-center w-[220px] h-[52px] text-base font-semibold rounded-md bg-[#03a3d7] text-black outline outline-1 outline-[#03a3d7] outline-offset-[3px] transition-all hover:bg-[#8ce4ff] shadow-[0_0_15px_rgba(3,163,215,0.3)] box-border"
					>
						<Github className="mr-2 h-5 w-5" />
						View on GitHub
					</a>
					<a
						href="/papers"
						className="flex items-center justify-center w-[220px] h-[52px] text-base font-semibold rounded-md bg-[#0a0a0a] text-white outline outline-1 outline-zinc-700 outline-offset-[3px] border border-zinc-800 transition-all hover:bg-zinc-900 box-border"
					>
						<FileText className="mr-2 h-5 w-5" />
						Papers
					</a>
				</div>
			</div>
		</section>
	);
};
