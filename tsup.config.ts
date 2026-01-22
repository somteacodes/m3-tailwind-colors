import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts", "src/v4.ts", "src/cli.ts"],
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ["@material/material-color-utilities"],
});
