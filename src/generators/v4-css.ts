import { formatColorValue } from "../utils/color-converter";
import { generateColors, ColorsMap, ThemeConfig } from "./colors";

/**
 * Options for generating Tailwind v4 CSS theme
 */
export interface V4ThemeOptions {
    /** Color map with primary and optional custom colors */
    colors: ColorsMap;
    /** Material Design scheme type */
    scheme?: string;
    /** Contrast level (-1 to 1) */
    contrast?: number;
    /** Color format for output */
    format?: "hex" | "oklch";
    /** Output mode */
    mode?: "combined" | "light" | "dark";
    /** Include @import "tailwindcss" directive */
    includeTailwindImport?: boolean;
    /** Dark mode strategy: media (prefers-color-scheme) or class (.dark) */
    darkModeStrategy?: "media" | "class" | "none";
}

/**
 * Generate @theme block with color variables
 */
function generateThemeBlock(
    colors: Record<string, string>,
    format: "hex" | "oklch"
): string {
    const colorVars = Object.entries(colors)
        .map(([name, hex]) => {
            const value = formatColorValue(hex, format);
            return `  --color-${name}: ${value};`;
        })
        .join("\n");

    return `@theme {\n${colorVars}\n}`;
}

/**
 * Generate @variant dark block with color variables (class strategy)
 */
function generateVariantBlock(
    colors: Record<string, string>,
    format: "hex" | "oklch"
): string {
    const colorVars = Object.entries(colors)
        .map(([name, hex]) => {
            const value = formatColorValue(hex, format);
            return `  --color-${name}: ${value};`;
        })
        .join("\n");

    return `@variant dark {\n${colorVars}\n}`;
}

/**
 * Generate @media prefers-color-scheme block (media strategy)
 */
function generateMediaDarkBlock(
    colors: Record<string, string>,
    format: "hex" | "oklch"
): string {
    const colorVars = Object.entries(colors)
        .map(([name, hex]) => {
            const value = formatColorValue(hex, format);
            return `    --color-${name}: ${value};`;
        })
        .join("\n");

    return `@media (prefers-color-scheme: dark) {\n  :root {\n${colorVars}\n  }\n}`;
}

/**
 * Generate Material 3 theme CSS for Tailwind v4
 * 
 * @param options - Configuration options
 * @returns CSS string with @theme variables
 * 
 * @example
 * ```typescript
 * const css = generateM3ThemeCSS({
 *   colors: { primary: "#0062A8" },
 *   format: "hex",
 *   mode: "combined"
 * });
 * ```
 */
export function generateM3ThemeCSS(options: V4ThemeOptions): string {
    const {
        colors: colorsMap,
        scheme = "content",
        contrast = 0,
        format = "hex",
        mode = "combined",
        includeTailwindImport = false,
        darkModeStrategy = "media",
    } = options;

    const themeConfig: ThemeConfig = { scheme, contrast };
    const lightColors = generateColors(colorsMap, themeConfig, false, true);

    let css = "";

    // Add import directive
    if (includeTailwindImport) {
        css += '@import "tailwindcss";\n\n';
    }

    // Add dark mode custom variant declaration (only for class strategy)
    if (darkModeStrategy === "class" && mode === "combined") {
        css += '@custom-variant dark (&:where(.dark, .dark *));\n\n';
    }

    // Generate based on mode
    if (mode === "light") {
        css += generateThemeBlock(lightColors, format);
    } else if (mode === "dark") {
        const darkColors = generateColors(colorsMap, themeConfig, true, true);
        css += generateThemeBlock(darkColors, format);
    } else {
        // combined mode
        const darkColors = generateColors(colorsMap, themeConfig, true, true);
        css += generateThemeBlock(lightColors, format);
        css += "\n\n";

        if (darkModeStrategy === "media") {
            css += generateMediaDarkBlock(darkColors, format);
        } else if (darkModeStrategy === "class") {
            css += generateVariantBlock(darkColors, format);
        }
        // darkModeStrategy === "none" - no dark mode output
    }

    return css;
}

