import { defineConfig, mergeRsbuildConfig } from "@rsbuild/core";
import { RsdoctorRspackPlugin } from "@rsdoctor/rspack-plugin";
import production from "./rsbuild.config";

/** Local bundle report only. Production `npm run build` never loads this file. */
export default mergeRsbuildConfig(
  production,
  defineConfig({
    tools: {
      rspack(config, { appendPlugins }) {
        appendPlugins(new RsdoctorRspackPlugin({ supports: { generateTileGraph: true } }));
        return config;
      },
    },
  }),
);
