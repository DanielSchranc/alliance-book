import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import viteTsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    host: "localhost",
  },
  plugins: [
    react(),
    viteTsConfigPaths(),
    svgr({
      // USAGE: In `.tsx` files `import { default as ProfileIcon } from "@material-design-icons/svg/filled/person.svg";`
      // Learn more about the change in vite v5: https://github.com/pd4d10/vite-plugin-svgr/issues/109
      include: "**/*.svg",
      svgrOptions: {
        svgProps: {
          fill: "currentColor",
        },
      },
    }),
  ],
});
