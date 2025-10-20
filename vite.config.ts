import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  publicDir: false,
  build: {
    outDir: "public/build",
    emptyOutDir: true,
    sourcemap: false,
    lib: {
      entry: "src/react-app.tsx",
      formats: ["es"],
      fileName: () => "react-app.js",
    },
    rollupOptions: {
      external: [],
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  plugins: [react()],
});
