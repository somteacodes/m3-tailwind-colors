import { generateColors, ColorsMap, ThemeConfig } from "./colors";

/**
 * Convert hex color to space-separated RGB format for NativeWind
 * Example: "#FF5733" -> "255 87 51"
 */
function hexToSpaceRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return "0 0 0";
    return `${Number.parseInt(result[1], 16)} ${Number.parseInt(result[2], 16)} ${Number.parseInt(result[3], 16)}`;
}

/**
 * Options for generating NativeWind CSS
 */
export interface NativeWindCSSOptions {
    colors: ColorsMap;
    scheme?: string;
    contrast?: number;
}

/**
 * Generate NativeWind-compatible CSS with the space-separated RGB variables
 */
export function generateNativeWindCSS(options: NativeWindCSSOptions): string {
    const {
        colors: colorsMap,
        scheme = "content",
        contrast = 0,
    } = options;

    const themeConfig: ThemeConfig = { scheme, contrast };
    const lightColors = generateColors(colorsMap, themeConfig, false, true);
    const darkColors = generateColors(colorsMap, themeConfig, true, true);

    let css = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
`;

    // Light mode variables (iOS format)
    Object.entries(lightColors).forEach(([name, hex]) => {
        css += `    --${name}: ${hexToSpaceRgb(hex)};\n`;
    });

    // Android variables (same as iOS for M3 consistency)
    Object.entries(lightColors).forEach(([name, hex]) => {
        css += `    --android-${name}: ${hexToSpaceRgb(hex)};\n`;
    });

    css += `  }

  @media (prefers-color-scheme: dark) {
    :root {
`;

    // Dark mode variables (iOS format)
    Object.entries(darkColors).forEach(([name, hex]) => {
        css += `      --${name}: ${hexToSpaceRgb(hex)};\n`;
    });

    // Android dark variables
    Object.entries(darkColors).forEach(([name, hex]) => {
        css += `      --android-${name}: ${hexToSpaceRgb(hex)};\n`;
    });

    css += `    }
  }
}
`;

    return css;
}
