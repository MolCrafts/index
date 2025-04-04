import { Badge } from "./ui/badge";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import image from "../assets/growth.png";
import image3 from "../assets/reflecting.png";
import image4 from "../assets/looking-ahead.png";

interface FeatureProps {
	title: string;
	description: string;
	image: string;
	hcolor: string;
}

const features: FeatureProps[] = [
	{
		title: "py",
		description: "A fundamental package for molecular system",
		image: image4,
		hcolor: "#03a3d7",
	},
	{
		title: "pot",
		description: "One-stop solution for molecular forcefield training",
		image: image3,
		hcolor: "#34D399",
	},
	{
		title: "vis",
		description: "An interactive molecule visualization library",
		image: image,
		hcolor: "#AAA3CE",
	},
];

const featureList: string[] = [
	"Open source",
	"Modern",
	"Seamless",
	"User-friendly",
];

export const Features = () => {
	return (
		<section id="features" className="container py-24 sm:py-32 space-y-8">
			<h2 className="text-3xl lg:text-4xl font-bold md:text-center">
				Molcrafts' {" "}
				<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
					Ecosystem
				</span>
			</h2>

			<div className="flex flex-wrap md:justify-center gap-4">
				{featureList.map((feature: string) => (
					<div key={feature}>
						<Badge variant="secondary" className="text-sm">
							{feature}
						</Badge>
					</div>
				))}
			</div>

			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{features.map(({ title, description, image, hcolor }: FeatureProps) => (
					<Card key={title}>
						<CardHeader>
							<CardTitle title={title} hcolor={hcolor} />
						</CardHeader>

						<CardContent>{description}</CardContent>

						<CardFooter>
							<img
								src={image}
								alt="About feature"
								className="w-[200px] lg:w-[300px] mx-auto"
							/>
						</CardFooter>
					</Card>
				))}
			</div>
		</section>
	);
};
