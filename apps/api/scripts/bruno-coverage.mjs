#!/usr/bin/env node
/**
 * Verifies that every service registered in @game-library/types ApiServicePath
 * has a matching folder under apps/api/bruno/. Run via `pnpm bruno:check`.
 */
import { readdirSync, existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const apiTypesPath = resolve(__dirname, "../../../packages/types/src/api.types.ts");
const collectionDir = resolve(__dirname, "../bruno");

const apiTypes = readFileSync(apiTypesPath, "utf-8");
const enumMatch = apiTypes.match(/export enum ApiServicePath \{([\s\S]*?)\}/);
if (!enumMatch) {
  console.error("error: could not find `export enum ApiServicePath` in api.types.ts");
  process.exit(2);
}
const enumValues = [...enumMatch[1].matchAll(/=\s*"([^"]+)"/g)].map((m) => m[1]);

const missing = enumValues.filter((value) => !existsSync(resolve(collectionDir, value)));

const collectionFolders = readdirSync(collectionDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name !== "environments")
  .map((d) => d.name);
const orphaned = collectionFolders.filter((name) => !enumValues.includes(name));

if (missing.length > 0) {
  console.error(`✗ Bruno coverage failed — missing folder(s) for service path(s):`);
  for (const m of missing) console.error(`    bruno/${m}/`);
  console.error(`  Add at least one .yml request per CRUD method, then re-run.`);
  process.exit(1);
}

if (orphaned.length > 0) {
  console.warn(`! Bruno folder(s) without a matching ApiServicePath value:`);
  for (const o of orphaned) console.warn(`    bruno/${o}/`);
  console.warn(`  Either remove them or add the matching enum value to ApiServicePath.`);
}

console.log(`✓ Bruno coverage OK — ${enumValues.length} service path(s) covered`);
