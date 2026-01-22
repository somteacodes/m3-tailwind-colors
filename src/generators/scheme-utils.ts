import {
    Hct,
    MaterialDynamicColors,
    SchemeContent,
    SchemeExpressive,
    SchemeFidelity,
    SchemeMonochrome,
    SchemeNeutral,
    SchemeTonalSpot,
    SchemeVibrant,
    DynamicColor,
} from "@material/material-color-utilities";

type SchemeObject =
    | SchemeContent
    | SchemeExpressive
    | SchemeFidelity
    | SchemeMonochrome
    | SchemeNeutral
    | SchemeTonalSpot
    | SchemeVibrant;

export const AllMaterialDynamicColors: Record<
    string,
    (typeof MaterialDynamicColors)[keyof typeof MaterialDynamicColors]
> = {
    background: MaterialDynamicColors.background,
    onBackground: MaterialDynamicColors.onBackground,
    surface: MaterialDynamicColors.surface,
    surfaceDim: MaterialDynamicColors.surfaceDim,
    surfaceBright: MaterialDynamicColors.surfaceBright,
    surfaceContainerLowest: MaterialDynamicColors.surfaceContainerLowest,
    surfaceContainerLow: MaterialDynamicColors.surfaceContainerLow,
    surfaceContainer: MaterialDynamicColors.surfaceContainer,
    surfaceContainerHigh: MaterialDynamicColors.surfaceContainerHigh,
    surfaceContainerHighest: MaterialDynamicColors.surfaceContainerHighest,
    onSurface: MaterialDynamicColors.onSurface,
    surfaceVariant: MaterialDynamicColors.surfaceVariant,
    onSurfaceVariant: MaterialDynamicColors.onSurfaceVariant,
    inverseSurface: MaterialDynamicColors.inverseSurface,
    onInverseSurface: MaterialDynamicColors.inverseOnSurface,
    outline: MaterialDynamicColors.outline,
    outlineVariant: MaterialDynamicColors.outlineVariant,
    primary: MaterialDynamicColors.primary,
    onPrimary: MaterialDynamicColors.onPrimary,
    primaryContainer: MaterialDynamicColors.primaryContainer,
    onPrimaryContainer: MaterialDynamicColors.onPrimaryContainer,
    inversePrimary: MaterialDynamicColors.inversePrimary,
    secondary: MaterialDynamicColors.secondary,
    onSecondary: MaterialDynamicColors.onSecondary,
    secondaryContainer: MaterialDynamicColors.secondaryContainer,
    onSecondaryContainer: MaterialDynamicColors.onSecondaryContainer,
    tertiary: MaterialDynamicColors.tertiary,
    onTertiary: MaterialDynamicColors.onTertiary,
    tertiaryContainer: MaterialDynamicColors.tertiaryContainer,
    onTertiaryContainer: MaterialDynamicColors.onTertiaryContainer,
    error: MaterialDynamicColors.error,
    onError: MaterialDynamicColors.onError,
    errorContainer: MaterialDynamicColors.errorContainer,
    onErrorContainer: MaterialDynamicColors.onErrorContainer,
    scrim: MaterialDynamicColors.scrim,
    shadow: MaterialDynamicColors.shadow,
    surfaceTint: MaterialDynamicColors.surfaceTint,
};

export const getSchemeObject = (
    scheme: string,
    source: number,
    isDark: boolean,
    contrast: number
): SchemeObject => {
    const SchemeObjects: Record<
        string,
        new (hct: Hct, isDark: boolean, contrast: number) => SchemeObject
    > = {
        content: SchemeContent,
        expressive: SchemeExpressive,
        fidelity: SchemeFidelity,
        monochrome: SchemeMonochrome,
        neutral: SchemeNeutral,
        tonalSpot: SchemeTonalSpot,
        vibrant: SchemeVibrant,
    };

    const SchemeClass = SchemeObjects[scheme] || SchemeObjects.content;
    return new SchemeClass(Hct.fromInt(source), isDark, contrast);
};
