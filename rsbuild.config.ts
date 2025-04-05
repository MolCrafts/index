import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
    plugins: [pluginReact()],
    html: {
        favicon: './src/assets/moko.svg',
        title: 'Molcrafts',
        meta: {
            charset: "UTF-8",
            viewport: "width=device-width, initial-scale=1.0",
            description: "Molcrafts is a seamless molecular sciences toolbox that advances molecular simulation with the strength of open-source collaboration.",
            keywords: "Molcrafts, molecular sciences, open-source, collaboration, molecular simulation"
        },

    },
    source: {
        entry: {
            index: './src/main.tsx',
        },
    }
});