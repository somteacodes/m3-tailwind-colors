/**
 * Valid Material Design 3 scheme names
 */
export const VALID_SCHEMES = [
    "content",
    "expressive",
    "fidelity",
    "monochrome",
    "neutral",
    "tonalSpot",
    "vibrant",
] as const;

export type SchemeType = (typeof VALID_SCHEMES)[number];

/**
 * Validate hex color format
 * @param color - Color string to validate
 * @throws Error if color is not a valid hex format
 */
export function validateHexColor(color: string): void {
    if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
        throw new Error(
            `Invalid color: ${color}. Expected hex format (#RRGGBB)`
        );
    }
}

/**
 * Validate scheme name
 * @param scheme - Scheme name to validate
 * @throws Error if scheme is not valid
 */
export function validateScheme(scheme: string): void {
    if (!VALID_SCHEMES.includes(scheme as SchemeType)) {
        throw new Error(
            `Invalid scheme: ${scheme}. Must be one of: ${VALID_SCHEMES.join(", ")}`
        );
    }
}

/**
 * Validate contrast range
 * @param contrast - Contrast value to validate
 * @throws Error if contrast is not in range [-1, 1]
 */
export function validateContrast(contrast: number): void {
    if (contrast < -1 || contrast > 1) {
        throw new Error(`Contrast must be between -1 and 1, got: ${contrast}`);
    }
}

/**
 * Validate an object of colors
 * @param colors - Object with color names and hex values
 * @throws Error if any color is invalid
 */
export function validateColors(colors: Record<string, string>): void {
    Object.entries(colors).forEach(([name, color]) => {
        if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
            throw new Error(
                `Invalid ${name} color: ${color}. Expected hex format (#RRGGBB)`
            );
        }
    });
}
