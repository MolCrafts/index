import { useEffect } from "react";

interface SEOSchemaProps {
	path: string;
}

export const SEOSchema = ({ path }: SEOSchemaProps) => {
	useEffect(() => {
		// Create and inject the JSON-LD schema
		const script = document.createElement("script");
		script.type = "application/ld+json";

		// Determine which schema to use based on current path
		if (path === "/") {
			// Organization and SoftwareApplication schema for homepage
			script.innerHTML = JSON.stringify({
				"@context": "https://schema.org",
				"@graph": [
					{
						"@type": "Organization",
						"@id": "https://molcrafts.org/#organization",
						name: "MolCrafts",
						url: "https://molcrafts.org",
						description:
							"An open-source molecular sciences toolbox that advances molecular simulation with the strength of open-source collaboration.",
						sameAs: ["https://github.com/MolCrafts"],
					},
					{
						"@type": "SoftwareApplication",
						"@id": "https://molcrafts.org/#software",
						name: "MolCrafts",
						applicationCategory: "Scientific",
						operatingSystem: "Cross-platform",
						offers: {
							"@type": "Offer",
							price: "0",
							priceCurrency: "USD",
						},
					},
					{
						"@type": "WebSite",
						"@id": "https://molcrafts.org/#website",
						url: "https://molcrafts.org",
						name: "MolCrafts – AI Infrastructure for Molecular Science",
						description:
							"MolCrafts is an open-source AI infrastructure suite (MolPy, MolVis, MolRec) for molecular simulations and data analysis.",
						publisher: {
							"@id": "https://molcrafts.org/#organization",
						},
					},
					{
						"@type": "WebPage",
						"@id": "https://molcrafts.org/#webpage",
						url: "https://molcrafts.org",
						name: "MolCrafts – AI Infrastructure for Molecular Science",
						description:
							"MolCrafts is an open-source AI infrastructure suite (MolPy, MolVis, MolRec) for molecular simulations and data analysis.",
						isPartOf: {
							"@id": "https://molcrafts.org/#website",
						},
						about: {
							"@id": "https://molcrafts.org/#software",
						},
					},
				],
			});
		} else if (path.startsWith("/molpy")) {
			// Software schema for MolPy landing
			script.innerHTML = JSON.stringify({
				"@context": "https://schema.org",
				"@type": "SoftwareSourceCode",
				name: "MolPy",
				applicationCategory: "Scientific",
				programmingLanguage: "Python",
				description:
					"MolPy is a Python library for molecular simulations and data management in computational chemistry.",
				codeRepository: "https://github.com/MolCrafts/MolPy",
				isPartOf: {
					"@type": "SoftwareApplication",
					name: "MolCrafts",
					url: "https://molcrafts.org",
				},
			});
		} else if (path.startsWith("/molrec")) {
			// Software schema for MolRec landing
			script.innerHTML = JSON.stringify({
				"@context": "https://schema.org",
				"@type": "SoftwareApplication",
				name: "MolRec",
				applicationCategory: "Scientific Software",
				operatingSystem: "Cross-platform",
				description:
					"MolRec is a molecular simulation data model providing standardized schemas for interoperability.",
				codeRepository: "https://github.com/MolCrafts/MolRec",
				programmingLanguage: ["Python", "TypeScript"],
				license: "MIT",
				author: {
					"@type": "Organization",
					name: "MolCrafts",
					url: "https://molcrafts.org",
				},
			});
		} else if (path.startsWith("/molvis")) {
			// Software schema for MolVis landing
			script.innerHTML = JSON.stringify({
				"@context": "https://schema.org",
				"@type": "SoftwareSourceCode",
				name: "MolVis",
				applicationCategory: "Scientific",
				programmingLanguage: "JavaScript",
				description:
					"MolVis is a molecular visualization tool for rendering 3D molecular structures.",
				codeRepository: "https://github.com/MolCrafts/MolVis",
				isPartOf: {
					"@type": "SoftwareApplication",
					name: "MolCrafts",
					url: "https://molcrafts.org",
				},
			});
		}

		// Remove any existing schema script
		const existingScript = document.querySelector(
			'script[type="application/ld+json"]',
		);
		if (existingScript) {
			existingScript.remove();
		}

		// Add the new schema
		document.head.appendChild(script);

		return () => {
			// Clean up when component unmounts
			script.remove();
		};
	}, [path]);

	// This component doesn't render anything visible
	return null;
};

export default SEOSchema;
