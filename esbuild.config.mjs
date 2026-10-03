import esbuild from "esbuild";
import { fileURLToPath } from "node:url";
import path from "node:path";

const watch = process.argv.includes("--watch");
const projectRoot = fileURLToPath(new URL(".", import.meta.url));
const context = await esbuild.context({
  entryPoints: [fileURLToPath(new URL("./src/main.ts", import.meta.url))],
  bundle: true,
  external: ["obsidian", "electron"],
  format: "cjs",
  platform: "browser",
  target: "es2022",
  absWorkingDir: projectRoot,
  outfile: path.join(projectRoot, "main.js"),
  sourcemap: "inline",
  logLevel: "info"
});

if (watch) {
  await context.watch();
  console.log("Watching for changes...");
} else {
  await context.rebuild();
  await context.dispose();
}
