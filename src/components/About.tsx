import { Statistics } from "./Statistics";
import molcrafts from "../assets/molcrafts.png";

export const About = () => {
	return (
		<section id="about" className="container py-24 sm:py-32">
			<div className="bg-muted/50 border rounded-lg py-12">
				<div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
					<img
						src={molcrafts}
						alt=""
						className="w-[300px] object-contain rounded-lg"
					/>
					<div className="bg-green-0 flex flex-col justify-between">
						<div className="pb-6">
							<h2 className="text-3xl md:text-4xl font-bold">
								<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
									About{" "}
								</span>
								MolCrafts
							</h2>
							<p className="text-lg">
								<strong>MolCrafts</strong> is an open-source,
								engineering-oriented toolkit that accelerates molecular research
								by offering reusable and robust components. Free from
								lab-specific design or philosophy, it focuses on modularity,
								reliability, and clarity to support real scientific work.
							</p>
							<p className="mt-4 text-green-800 font-semibold text-xl italic">
								Less boilerplate, more science.
							</p>
						</div>

						<Statistics />
					</div>
				</div>
			</div>
		</section>
	);
};
