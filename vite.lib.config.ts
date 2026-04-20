import { defineConfig } from "vite";
import { resolve } from "path";
import { readFileSync } from "fs";
import type { Plugin } from "vite";

function copyWorkletPlugin(): Plugin {
  return {
    name: "copy-worklet",
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "mb-fesk-worklet.js",
        source: readFileSync(
          resolve(__dirname, "public/mb-fesk-worklet.js"),
          "utf-8",
        ),
      });
    },
  };
}

export default defineConfig({
  plugins: [copyWorkletPlugin()],
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
