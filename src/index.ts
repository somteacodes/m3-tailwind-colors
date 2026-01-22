import { generateColors, ColorsMap, ThemeConfig } from "./generators/colors";

type ColorConfig = {
  hex?: string;
  harmonize?: boolean;
};

const M3TailwindConfigColors = (
  colorsMap: ColorsMap,
  themeConfig: ThemeConfig,
  useKebabCase: boolean = true
): Record<string, { DEFAULT: string; dark: string }> => {
  const lightColors = generateColors(
    colorsMap,
    themeConfig,
    false,
    useKebabCase
  );
  const darkColors = generateColors(colorsMap, themeConfig, true, useKebabCase);

  const colors: Record<string, { DEFAULT: string; dark: string }> = {};
  Object.keys(lightColors).forEach((key) => {
    colors[key] = {
      DEFAULT: lightColors[key],
      dark: darkColors[key],
    };
  });

  return colors;
};

const M3TailwindRNColors = (
  colorsMap: ColorsMap,
  themeConfig: ThemeConfig,
  useKebabCase: boolean = false
): { light: Record<string, string>; dark: Record<string, string> } => {
  return {
    light: generateColors(colorsMap, themeConfig, false, useKebabCase),
    dark: generateColors(colorsMap, themeConfig, true, useKebabCase),
  };
};

export { M3TailwindRNColors, M3TailwindConfigColors };
