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
      { find: "@pages", replacement: resolve("src/pages") },
      { find: "@api", replacement: resolve("src/api") },
      { find: "@store", replacement: resolve("src/store") },
    ],
  },
  server: {
    proxy: {
      "/v1": {
        target: "http://152.67.205.177:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
