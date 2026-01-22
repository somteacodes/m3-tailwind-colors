import {
    argbFromHex,
    hexFromArgb,
    customColor,
    DynamicColor,
} from "@material/material-color-utilities";
import { AllMaterialDynamicColors, getSchemeObject } from "./scheme-utils";

type ColorConfig = {
    hex?: string;
    harmonize?: boolean;
};

export type ColorsMap = {
    primary: string;
    [key: string]: string | ColorConfig;
};

export type ThemeConfig = {
    scheme: string;
    contrast: number;
};

const toKebabCase = (str: string): string => {
    return str
        .split("")
        .map((char, index) => {
            if (char.toUpperCase() === char) {
                return `${index !== 0 ? "-" : ""}${char.toLowerCase()}`;
            }
            return char;
        })
        .join("");
};

/**
 * Generate Material 3 colors for a given theme configuration
 * @param colorsMap - Map of color names to hex values or color configs
 * @param themeConfig - Theme configuration (scheme, contrast)
 * @param isDark - Whether to generate dark mode colors
 * @param useKebabCase - Whether to use kebab-case naming
 * @returns Object with color names and hex values
 */
export const generateColors = (
    colorsMap: ColorsMap,
    themeConfig: ThemeConfig = { scheme: "content", contrast: 0 },
    isDark = false,
    useKebabCase = false
): Record<string, string> => {
    const { primary, ...extraColors } = colorsMap;
    const { scheme, contrast } = themeConfig;

    const source = argbFromHex(primary);
    const colorScheme = getSchemeObject(scheme, source, isDark, contrast);

    const colors: Record<string, string> = {};

    Object.entries(AllMaterialDynamicColors).forEach(([name, colorName]) => {
        const hex = hexFromArgb((colorName as DynamicColor).getArgb(colorScheme));

        if (useKebabCase) {
            const kebabName = toKebabCase(name);
            colors[kebabName] = hex;
        } else {
            colors[name] = hex;
        }
    });

    Object.entries(extraColors).forEach(([colorName, value]) => {
        const colorConfig: ColorConfig =
            typeof value === "string" ? { hex: value } : value;
        const hex = colorConfig.hex || "";
        const blend = colorConfig.harmonize ?? true;
        const customScheme = customColor(source, {
            value: argbFromHex(hex),
            blend,
            name: "",
        })[isDark ? "dark" : "light"];

        if (useKebabCase) {
            const kebabName = toKebabCase(colorName);
            colors[kebabName] = hexFromArgb(customScheme.color);
            colors[`on-${kebabName}`] = hexFromArgb(customScheme.onColor);
            colors[`${kebabName}-container`] = hexFromArgb(
                customScheme.colorContainer
            );
            colors[`on-${kebabName}-container`] = hexFromArgb(
                customScheme.onColorContainer
            );
        } else {
            const camelCaseName =
                colorName.charAt(0).toUpperCase() + colorName.slice(1);
            colors[colorName] = hexFromArgb(customScheme.color);
            colors[`on${camelCaseName}`] = hexFromArgb(customScheme.onColor);
            colors[`${camelCaseName}Container`] = hexFromArgb(
                customScheme.colorContainer
            );
            colors[`on${camelCaseName}Container`] = hexFromArgb(
                customScheme.onColorContainer
            );
        }
    });

    return colors;
};
