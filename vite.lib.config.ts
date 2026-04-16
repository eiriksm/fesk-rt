import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  publicDir: false,
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib/index.ts"),
      formats: ["es"],
      fileName: "fesk-rt",
    },
    outDir: "dist-lib",
    emptyOutDir: true,
  },
});
