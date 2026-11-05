import { defineConfig } from "tsup";
import { vanillaExtractPlugin } from "@vanilla-extract/esbuild-plugin";
import { readdirSync, readFileSync, writeFileSync, statSync } from "fs";
import path from "path";

const aliases: Record<string, string> = {
  "@cinder/lib": path.resolve("src/lib"),
  "@cinder/themes": path.resolve("src/themes"),
  "@cinder/hooks": path.resolve("src/hooks"),
  "@game-library/tokens": path.resolve("../tokens/src/index.ts")
};

/** esbuild plugin that resolves workspace package aliases */
const aliasPlugin = {
  name: "workspace-aliases",
  setup(build: { onResolve: (opts: { filter: RegExp }, cb: (args: { path: string }) => { path: string }) => void }) {
    for (const [alias, target] of Object.entries(aliases)) {
      build.onResolve({ filter: new RegExp(`^${alias.replace("/", "\\/")}$`) }, () => ({
        path: target
      }));
    }
  }
};

/**
 * Collect every emitted .css file (one per entry, plus shared chunks) into a
 * single `dist/styles.css`. Code-splitting fragments the CSS across entries, but
 * consumers still import one global stylesheet — and the class names are
 * identical across files since they all come from this one build.
 */
/** Split CSS into top-level rules, respecting nested at-rules (@media, @keyframes). */
const topLevelRules = (css: string): string[] => {
  const rules: string[] = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < css.length; i++) {
    const c = css[i];
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) {
        rules.push(css.slice(start, i + 1).trim());
        start = i + 1;
      }
    }
  }
  const tail = css.slice(start).trim();
  if (tail) rules.push(tail);
  return rules.filter(Boolean);
};

const bundleCss = () => {
  const dist = path.resolve("dist");
  const cssFiles: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const full = path.join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (name.endsWith(".css") && full !== path.join(dist, "styles.css")) cssFiles.push(full);
    }
  };
  walk(dist);
  // Root index.css (themes + globals) first so theme var definitions precede use.
  cssFiles.sort((a, b) => (a === path.join(dist, "index.css") ? -1 : b === path.join(dist, "index.css") ? 1 : 0));
  // De-duplicate identical top-level rules that splitting repeats across chunks.
  const seen = new Set<string>();
  const out: string[] = [];
  for (const file of cssFiles) {
    for (const rule of topLevelRules(readFileSync(file, "utf8"))) {
      if (seen.has(rule)) continue;
      seen.add(rule);
      out.push(rule);
    }
  }
  writeFileSync(path.join(dist, "styles.css"), out.join("\n"));
};

export default defineConfig({
  // Root barrel + one entry per component dir so importing a single component
  // never drags in another component's heavy deps (recharts, embla, cmdk, …).
  // Plus standalone entries for the provider and theme runtime so apps can pull
  // those without the full barrel.
  entry: [
    "src/index.ts",
    "src/components/base/*/index.ts",
    "src/components/blocks/*/index.ts",
    "src/providers/UISystemProvider.tsx",
    "src/themes/runtime.ts"
  ],
  format: ["cjs", "esm"],
  splitting: true,
  // Types only for the barrel — consumers import from "@game-library/cinder", and
  // generating .d.ts for all 60 entries exhausts the DTS worker's heap.
  dts: { entry: "src/index.ts" },
  clean: true,
  banner: { js: '"use client";' },
  esbuildPlugins: [
    vanillaExtractPlugin({
      esbuildOptions: {
        plugins: [aliasPlugin]
      }
    })
  ],
  external: ["react", "react-dom"],
  esbuildOptions(options) {
    options.alias = aliases;
  },
  onSuccess: async () => {
    bundleCss();
  }
});
