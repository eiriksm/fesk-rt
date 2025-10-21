import { build } from "esbuild";
import { mkdir } from "fs/promises";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const outDir = resolve(projectRoot, "public");

await mkdir(outDir, { recursive: true });

await build({
  absWorkingDir: projectRoot,
  bundle: true,
  entryPoints: ["src/main.tsx"],
  outfile: "public/app.js",
  format: "esm",
  platform: "browser",
  sourcemap: true,
  target: ["es2020"],
  jsx: "automatic",
  logLevel: "info",
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV ?? "production"),
  },
});
