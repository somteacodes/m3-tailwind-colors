import fs from "node:fs";
import path from "node:path";
import { generateM3ThemeCSS } from "../generators/v4-css";
import { generateNativeWindCSS } from "../generators/nativewind-css";
import { generateNativeWindColors } from "../generators/nativewind-colors";
import { loadConfig, mergeConfigWithFlags, M3ColorsConfig } from "./config";
import { validateColors, validateScheme, validateContrast } from "../utils/validators";
import type { ColorsMap } from "../generators/colors";

interface GenerateOptions {
    primary?: string;
    secondary?: string;
    tertiary?: string;
    scheme?: string;
    contrast?: string;
    format?: "hex" | "oklch";
    mode?: "combined" | "light" | "dark";
    output?: string;
    config?: string;
    includeTailwindImport?: boolean;
    darkMode?: "media" | "class" | "none";
    target?: "web" | "nativewind";
    colorsOutput?: string;
}

/**
 * Build a valid ColorsMap from config colors, filtering out undefined values
 */
function buildColorsMap(colors: M3ColorsConfig["colors"]): ColorsMap {
    const result: Record<string, string> = {};

    Object.entries(colors).forEach(([key, value]) => {
        if (value !== undefined) {
            result[key] = value;
        }
    });

    return result as ColorsMap;
}

/**
 * Resolve configuration from file and flags
 */
function resolveConfig(options: GenerateOptions): M3ColorsConfig {
    const loadedConfig = loadConfig(options.config);

    if (loadedConfig) {
        // Merge loaded config with CLI flags
        const flagColors: Partial<M3ColorsConfig["colors"]> = {};
        if (options.primary) flagColors.primary = options.primary;
        if (options.secondary) flagColors.secondary = options.secondary;
        if (options.tertiary) flagColors.tertiary = options.tertiary;

        return mergeConfigWithFlags(loadedConfig, {
            colors: Object.keys(flagColors).length > 0 ? flagColors : undefined,
            scheme: options.scheme,
            contrast: options.contrast ? Number.parseFloat(options.contrast) : undefined,
            format: options.format,
            mode: options.mode,
            output: options.output,
            target: options.target,
            colorsOutput: options.colorsOutput,
        });
    }

    if (options.primary) {
        // Use flags only - build config from scratch
        return {
            colors: {
                primary: options.primary,
                secondary: options.secondary,
                tertiary: options.tertiary,
            },
            scheme: options.scheme || "content",
            contrast: options.contrast ? Number.parseFloat(options.contrast) : 0,
            format: options.format || "hex",
            mode: options.mode || "combined",
            output: options.output || "src/m3-theme.css",
            target: options.target || "web",
            colorsOutput: options.colorsOutput || "theme/m3-colors.ts",
        };
    }

    console.error("Error: Primary color is required.");
    console.error("  Use --primary \"#HEXCODE\" flag, or create a config file with: npx m3-tailwind-colors init");
    process.exit(1);
}

/**
 * Write file with directory creation
 */
function writeFile(filePath: string, content: string): void {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content, "utf-8");
}

/**
 * Handle the generate command
 * @param options - CLI options
 */
export function handleGenerate(options: GenerateOptions): void {
    // Build config from flags or loaded config
    const config = resolveConfig(options);

    // Build colors map for validation (filter out undefined)
    const colorsMap = buildColorsMap(config.colors);

    // Validate configuration
    try {
        validateColors(colorsMap as Record<string, string>);
        if (config.scheme) {
            validateScheme(config.scheme);
        }
        if (config.contrast !== undefined) {
            validateContrast(config.contrast);
        }
    } catch (error) {
        console.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
    }

    const target = options.target ?? config.target ?? "web";

    if (target === "nativewind") {
        // Generate NativeWind CSS
        const css = generateNativeWindCSS({
            colors: colorsMap,
            scheme: config.scheme,
            contrast: config.contrast,
        });

        const outputPath = config.output || "global.css";
        writeFile(outputPath, css);
        console.log(`Success: Generated NativeWind CSS at ${outputPath}`);

        // Generate TypeScript colors file
        const tsColors = generateNativeWindColors({
            colors: colorsMap,
            scheme: config.scheme,
            contrast: config.contrast,
        });

        const colorsPath = options.colorsOutput ?? config.colorsOutput ?? "theme/m3-colors.ts";
        writeFile(colorsPath, tsColors);
        console.log(`  Generated colors file at ${colorsPath}`);
    } else {
        // Generate web CSS (default)
        const css = generateM3ThemeCSS({
            colors: colorsMap,
            scheme: config.scheme,
            contrast: config.contrast,
            format: config.format,
            mode: config.mode,
            includeTailwindImport: options.includeTailwindImport ?? false,
            darkModeStrategy: options.darkMode ?? "media",
        });

        const outputPath = config.output || "src/m3-theme.css";
        writeFile(outputPath, css);

        const colorNames = Object.keys(colorsMap);
        console.log(`Success: Generated M3 theme at ${outputPath}`);
        console.log(`  Colors: ${colorNames.join(", ")}`);
        console.log(`  Format: ${config.format} (${config.mode} mode)`);
    }
}

