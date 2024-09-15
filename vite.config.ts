import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";

const resolve = (src: string) => path.resolve(__dirname, src);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      { find: "@", replacement: resolve("src") },
      { find: "@components", replacement: resolve("src/components") },
      { find: "@assets", replacement: resolve("src/assets") },
    ],
  },
});
