import { motion } from "framer-motion";
import { 
	AnalysisIcon, 
	CollaborationIcon, 
	DataIcon, 
	IntegrationIcon, 
	SimulationIcon, 
	WorkflowIcon 
} from "./FeatureIcons";
import { staggerContainer, fadeIn, slideUp } from "../lib/animations";
import { useInView } from "framer-motion";
import { useRef, FC } from "react";

interface FeatureCardProps {
	icon: FC<{ className?: string }>;
	title: string;
	description: string;
}

const FeatureCard: FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	
	return (
		<motion.div
			ref={ref}
			className={`flex flex-col p-6 rounded-xl hover:shadow-lg transition-shadow duration-300 glass-card ${isInView ? 'scroll-fade active' : 'scroll-fade'}`}
			variants={fadeIn}
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
			whileHover={{ y: -5, transition: { duration: 0.2 } }}
		>
			<div className="h-14 w-14 mb-4 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
				<Icon className="h-8 w-8" />
			</div>
			<h3 className="text-xl font-semibold mb-2">{title}</h3>
			<p className="text-muted-foreground">{description}</p>
		</motion.div>
	);
};

export const Features = () => {
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
	
	const features: FeatureCardProps[] = [
		{
			icon: SimulationIcon,
			title: "Advanced Simulation",
			description: "Powerful molecular dynamics simulation capabilities with optimized performance."
		},
		{
			icon: AnalysisIcon,
			title: "Data Analysis",
			description: "Comprehensive tools for analyzing molecular simulation results and structures."
		},
		{
			icon: WorkflowIcon,
			title: "Workflow Management",
			description: "Streamline your molecular research with automated and customizable workflows."
		},
		{
			icon: DataIcon,
			title: "Data Management",
			description: "Organize, store, and share your molecular data securely and efficiently."
		},
		{
			icon: CollaborationIcon,
			title: "Collaboration",
			description: "Work together with colleagues through our open-source collaborative environment."
		},
		{
			icon: IntegrationIcon,
			title: "Seamless Integration",
			description: "Easily integrate with existing tools and frameworks in the molecular sciences ecosystem."
		}
	];

	return (
		<section id="features" className="space-section gradient-bg-1 relative">
			{/* Background blob */}
			<div className="blob-animation" style={{ top: '30%', right: '10%', opacity: '0.1' }} />
			
			<motion.div 
				ref={sectionRef}
				className="container mx-auto px-4 relative z-10"
				variants={staggerContainer}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
			>
				<motion.div 
					className="text-center mb-12"
					variants={slideUp}
				>
					<motion.h2 
						className="text-3xl md:text-4xl font-bold mb-4"
						variants={fadeIn}
					>
						<span className="gradient-text-secondary">Powerful Features</span>
					</motion.h2>
					<motion.p 
						className="text-xl text-muted-foreground max-w-2xl mx-auto"
						variants={fadeIn}
					>
						MolCrafts provides a comprehensive suite of tools for molecular sciences research
					</motion.p>
				</motion.div>

				<motion.div 
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
					variants={staggerContainer}
				>
					{features.map((feature, index) => (
						<FeatureCard
							key={index}
							icon={feature.icon}
							title={feature.title}
							description={feature.description}
						/>
					))}
				</motion.div>
			</motion.div>
		</section>
	);
};
