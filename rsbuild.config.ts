import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
    plugins: [pluginReact()],
    html: {
        favicon: './src/assets/moko.svg',
        title: 'MolCrafts – Open-Source Molecular Simulation Toolbox',
        meta: {
            charset: "UTF-8",
            viewport: "width=device-width, initial-scale=1.0",
            description: "MolCrafts is an open-source suite (MolPy, MolPot, MolVis) for molecular simulations and data analysis in computational chemistry.",
            keywords: "molcrafts, molecular simulation toolbox, computational chemistry tools, open-source molecular research, molecular data management, molecular dynamics simulation, MolPy library, molecular visualization",
            author: "MolCrafts Team",
            "og:title": "MolCrafts – Open-Source Molecular Simulation Toolbox",
            "og:description": "MolCrafts is an open-source suite (MolPy, MolPot, MolVis) for molecular simulations and data analysis in computational chemistry.",
            "og:type": "website",
            "twitter:card": "summary_large_image",
            "twitter:title": "MolCrafts – Open-Source Molecular Simulation Toolbox",
            "twitter:description": "MolCrafts is an open-source suite (MolPy, MolPot, MolVis) for molecular simulations and data analysis in computational chemistry."
        },
    },
    source: {
        entry: {
            index: './src/main.tsx',
        },
    }
});