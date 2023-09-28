import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  outExtension: () => ({ js: ".cjs" }),
  splitting: false,
  clean: true,
  bundle: true,
  minify: true,
  target: "node16",
  format: ["cjs"],
});
