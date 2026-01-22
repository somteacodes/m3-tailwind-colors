import { Hct, argbFromHex } from "@material/material-color-utilities";

/**
 * Convert a hex color to OKLCH format
 * @param hex - Hex color string (e.g., "#0062A8")
 * @returns OKLCH color string (e.g., "oklch(0.45 0.13 241.52)")
 */
export function hexToOklch(hex: string): string {
    const hct = Hct.fromInt(argbFromHex(hex));

    // Convert HCT to OKLCH
    // HCT (Hue, Chroma, Tone) maps to OKLCH (Lightness, Chroma, Hue)
    const l = hct.tone / 100;           // Lightness: 0-1
    const c = hct.chroma / 100;         // Chroma: 0-1
    const h = hct.hue;                  // Hue: 0-360

    return `oklch(${l.toFixed(2)} ${c.toFixed(2)} ${h.toFixed(2)})`;
}

/**
 * Format a color value based on the desired format
 * @param hex - Hex color string
 * @param format - Desired output format
 * @returns Formatted color string
 */
export function formatColorValue(hex: string, format: "hex" | "oklch"): string {
    if (format === "oklch") {
        return hexToOklch(hex);
    }
    return hex.toLowerCase();
}
