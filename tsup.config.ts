import { defineConfig } from "tsup";

export default defineConfig([
    // Library exports (dual CJS/ESM for compatibility)
    {
        entry: ["src/index.ts", "src/v4.ts"],
        format: ["cjs", "esm"],
        dts: true,
        sourcemap: true,
        clean: true,
        external: ["@material/material-color-utilities"],
    },
    // CLI (ESM only to avoid CommonJS/ESM warning)
    {
        entry: ["src/cli.ts"],
        format: ["esm"],
        sourcemap: true,
        external: ["@material/material-color-utilities"],
    },
]);
