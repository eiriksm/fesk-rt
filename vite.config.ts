import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "public");
const srcDir = resolve(__dirname, "src");

export default defineConfig({
  root: publicDir,
  plugins: [
    react(),
    {
      name: "rewrite-app-entry",
      transformIndexHtml(html) {
        return html.replace(/src="\.\/app\.js"/, 'src="/src/main.tsx"');
      },
    },
  ],
  server: {
    host: "0.0.0.0",
    port: 5173,
    open: false,
    fs: {
      allow: [publicDir, srcDir],
    },
  },
  resolve: {
    alias: {
      src: srcDir,
    },
  },
});
