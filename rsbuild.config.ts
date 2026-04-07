import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
	plugins: [pluginReact()],
	html: {
		favicon: "./src/assets/moko.svg",
		title: "MolCrafts – AI Infrastructure for Molecular Science",
		tags: [
			{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
			{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' } },
			{ tag: 'link', attrs: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital@1&display=swap' } }
		],
		meta: {
			charset: "UTF-8",
			viewport: "width=device-width, initial-scale=1.0",
			description:
				"MolCrafts is an open-source AI infrastructure suite (MolPy, MolVis, MolRec) for molecular simulations and data analysis.",
			keywords:
				"molcrafts, molecular science, AI infrastructure, molecular dynamics, MolPy, MolVis, MolRec, open-source",
			author: "MolCrafts Team",
			"og:title": "MolCrafts – AI Infrastructure for Molecular Science",
			"og:description":
				"MolCrafts is an open-source AI infrastructure suite (MolPy, MolVis, MolRec) for molecular simulations and data analysis.",
			"og:type": "website",
			"twitter:card": "summary_large_image",
			"twitter:title": "MolCrafts – AI Infrastructure for Molecular Science",
			"twitter:description":
				"MolCrafts is an open-source AI infrastructure suite (MolPy, MolVis, MolRec) for molecular simulations and data analysis.",
		},
	},
	source: {
		entry: {
			index: "./src/main.tsx",
		},
	},
});
