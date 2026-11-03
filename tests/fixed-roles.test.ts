import { describe, it, expect } from "vitest";
import {
    CorePalette,
    Hct,
    MaterialDynamicColors,
    argbFromHex,
    customColor,
    hexFromArgb,
} from "@material/material-color-utilities";
import { generateColors } from "../src/generators/colors";
import { getSchemeObject } from "../src/generators/scheme-utils";
import { M3TailwindConfigColors, M3TailwindRNColors } from "../src/index";
import { generateM3ThemeCSS } from "../src/generators/v4-css";
import { generateNativeWindCSS } from "../src/generators/nativewind-css";
import { generateNativeWindColors } from "../src/generators/nativewind-colors";

const PRIMARY = "#6750A4";
const CUSTOM_HEX = "#4CAF50";
const colorsMap = { primary: PRIMARY, success: CUSTOM_HEX };

const FIXED_ROLES = [
    "primaryFixed",
    "primaryFixedDim",
    "onPrimaryFixed",
    "onPrimaryFixedVariant",
    "secondaryFixed",
    "secondaryFixedDim",
    "onSecondaryFixed",
    "onSecondaryFixedVariant",
    "tertiaryFixed",
    "tertiaryFixedDim",
    "onTertiaryFixed",
    "onTertiaryFixedVariant",
] as const;

const toKebab = (name: string) =>
    name.replaceAll(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);

const toneOf = (hex: string) => Hct.fromInt(argbFromHex(hex)).tone;

const expectTone = (hex: string, tone: number) => {
    expect(Math.abs(toneOf(hex) - tone)).toBeLessThanOrEqual(1);
};

const cssVarValues = (css: string, name: string): string[] =>
    [...css.matchAll(new RegExp(`--color-${name}:\\s*([^;]+);`, "g"))].map(
        (match) => match[1].trim()
    );

describe("built-in fixed roles: values", () => {
    const schemes = ["content", "tonalSpot", "expressive"] as const;
    const contrasts = [0, 0.5, 1];

    schemes.forEach((scheme) => {
        it(`match MaterialDynamicColors for ${scheme}`, () => {
            contrasts.forEach((contrast) => {
                const light = generateColors(
                    { primary: PRIMARY },
                    { scheme, contrast },
                    false,
                    true
                );
                const dark = generateColors(
                    { primary: PRIMARY },
                    { scheme, contrast },
                    true,
                    true
                );

                for (const isDark of [false, true]) {
                    const schemeObject = getSchemeObject(
                        scheme,
                        argbFromHex(PRIMARY),
                        isDark,
                        contrast
                    );
                    const actual = isDark ? dark : light;

                    FIXED_ROLES.forEach((role) => {
                        expect(actual[toKebab(role)]).toBe(
                            hexFromArgb(
                                MaterialDynamicColors[role].getArgb(schemeObject)
                            )
                        );
                    });
                }
            });
        });
    });

    it("are identical in light and dark at contrast 0", () => {
        for (const scheme of [
            "content",
            "expressive",
            "fidelity",
            "monochrome",
            "neutral",
            "tonalSpot",
            "vibrant",
        ]) {
            const light = generateColors(
                { primary: PRIMARY },
                { scheme, contrast: 0 },
                false,
                true
            );
            const dark = generateColors(
                { primary: PRIMARY },
                { scheme, contrast: 0 },
                true,
                true
            );

            FIXED_ROLES.forEach((role) => {
                expect(light[toKebab(role)]).toBe(dark[toKebab(role)]);
            });
        }
    });

    it("use monochrome tones 40 / 30 / 100 / 90", () => {
        const tones = generateColors(
            { primary: PRIMARY },
            { scheme: "monochrome", contrast: 0 },
            false,
            true
        );

        expectTone(tones["primary-fixed"], 40);
        expectTone(tones["primary-fixed-dim"], 30);
        expectTone(tones["on-primary-fixed"], 100);
        expectTone(tones["on-primary-fixed-variant"], 90);
    });

    it("use standard tones 90 / 80 / 10 / 30", () => {
        const tones = generateColors(
            { primary: PRIMARY },
            { scheme: "content", contrast: 0 },
            false,
            true
        );

        expectTone(tones["primary-fixed"], 90);
        expectTone(tones["primary-fixed-dim"], 80);
        expectTone(tones["on-primary-fixed"], 10);
        expectTone(tones["on-primary-fixed-variant"], 30);
    });
});

describe("built-in fixed roles: every output target", () => {
    const themeConfig = { scheme: "content", contrast: 0 };

    it("v3 config (kebab)", () => {
        const config = M3TailwindConfigColors(colorsMap, themeConfig, true);
        FIXED_ROLES.forEach((role) => {
            expect(config).toHaveProperty(toKebab(role));
            expect(config[toKebab(role)].DEFAULT).toBe(
                config[toKebab(role)].dark
            );
        });
    });

    it("v3 config (camel)", () => {
        const config = M3TailwindConfigColors(colorsMap, themeConfig, false);
        FIXED_ROLES.forEach((role) => {
            expect(config).toHaveProperty(role);
        });
    });

    it("React Native", () => {
        const rn = M3TailwindRNColors(colorsMap, themeConfig, false);
        FIXED_ROLES.forEach((role) => {
            expect(rn.light[role]).toBe(rn.dark[role]);
        });
    });

    it("v4 CSS @theme and dark block", () => {
        const lightCss = generateM3ThemeCSS({
            colors: colorsMap,
            mode: "light",
            darkModeStrategy: "media",
        });
        const darkCss = generateM3ThemeCSS({
            colors: colorsMap,
            mode: "dark",
            darkModeStrategy: "media",
        });
        const combinedMedia = generateM3ThemeCSS({
            colors: colorsMap,
            mode: "combined",
            darkModeStrategy: "media",
        });
        const combinedClass = generateM3ThemeCSS({
            colors: colorsMap,
            mode: "combined",
            darkModeStrategy: "class",
        });

        FIXED_ROLES.forEach((role) => {
            const kebab = toKebab(role);
            const [lightValue] = cssVarValues(lightCss, kebab);
            const [darkValue] = cssVarValues(darkCss, kebab);

            expect(lightValue).toBeDefined();
            expect(darkValue).toBe(lightValue);

            // combined output contains both the theme block and the dark block
            expect(cssVarValues(combinedMedia, kebab)).toHaveLength(2);
            expect(cssVarValues(combinedClass, kebab)).toHaveLength(2);
        });
    });

    it("NativeWind CSS", () => {
        const css = generateNativeWindCSS({ colors: colorsMap });
        FIXED_ROLES.forEach((role) => {
            const kebab = toKebab(role);
            const valuesFor = (prefix: string) =>
                [
                    ...css.matchAll(
                        new RegExp(`--${prefix}${kebab}: ([^;]+);`, "g")
                    ),
                ].map((match) => match[1]);

            const ios = valuesFor("");
            const android = valuesFor("android-");

            // light + dark, same value in both
            expect(ios).toHaveLength(2);
            expect(android).toHaveLength(2);
            expect(ios[0]).toBe(ios[1]);
            expect(android[0]).toBe(android[1]);
            expect(android[0]).toBe(ios[0]);
        });
    });

    it("NativeWind TypeScript", () => {
        const ts = generateNativeWindColors({ colors: colorsMap });
        FIXED_ROLES.forEach((role) => {
            const light = new RegExp(`${role}: '([^']+)'`, "g");
            const matches = [...ts.matchAll(light)].map((match) => match[1]);
            // light + dark object
            expect(matches).toHaveLength(2);
            expect(matches[0]).toBe(matches[1]);
        });
    });
});

describe("custom color fixed roles", () => {
    const blend = true;
    const group = customColor(argbFromHex(PRIMARY), {
        value: argbFromHex(CUSTOM_HEX),
        blend,
        name: "",
    });
    const palette = CorePalette.of(group.value).a1;

    it("use tones 90 / 80 / 10 / 30 of the harmonized palette (kebab)", () => {
        const light = generateColors(
            colorsMap,
            { scheme: "content", contrast: 0 },
            false,
            true
        );
        const dark = generateColors(
            colorsMap,
            { scheme: "content", contrast: 0 },
            true,
            true
        );

        expect(light["success-fixed"]).toBe(hexFromArgb(palette.tone(90)));
        expect(light["success-fixed-dim"]).toBe(hexFromArgb(palette.tone(80)));
        expect(light["on-success-fixed"]).toBe(hexFromArgb(palette.tone(10)));
        expect(light["on-success-fixed-variant"]).toBe(
            hexFromArgb(palette.tone(30))
        );

        expectTone(light["success-fixed"], 90);
        expectTone(light["success-fixed-dim"], 80);
        expectTone(light["on-success-fixed"], 10);
        expectTone(light["on-success-fixed-variant"], 30);

        // same values in dark mode
        expect(dark["success-fixed"]).toBe(light["success-fixed"]);
        expect(dark["success-fixed-dim"]).toBe(light["success-fixed-dim"]);
        expect(dark["on-success-fixed"]).toBe(light["on-success-fixed"]);
        expect(dark["on-success-fixed-variant"]).toBe(
            light["on-success-fixed-variant"]
        );
    });

    it("share the palette with the custom container role", () => {
        const light = generateColors(
            colorsMap,
            { scheme: "content", contrast: 0 },
            false,
            true
        );

        // light colorContainer is tone 90 and onColorContainer tone 10
        expect(light["success-fixed"]).toBe(light["success-container"]);
        expect(light["on-success-fixed"]).toBe(
            light["on-success-container"]
        );
    });

    it("use the unharmonized palette when harmonize is false", () => {
        const unharmonized = generateColors(
            { primary: PRIMARY, success: { hex: CUSTOM_HEX, harmonize: false } },
            { scheme: "content", contrast: 0 },
            false,
            true
        );
        const palette = CorePalette.of(argbFromHex(CUSTOM_HEX)).a1;

        expect(unharmonized["success-fixed"]).toBe(
            hexFromArgb(palette.tone(90))
        );
        expect(unharmonized["success-fixed-dim"]).toBe(
            hexFromArgb(palette.tone(80))
        );
        expect(unharmonized["on-success-fixed"]).toBe(
            hexFromArgb(palette.tone(10))
        );
        expect(unharmonized["on-success-fixed-variant"]).toBe(
            hexFromArgb(palette.tone(30))
        );
    });

    it("emit camelCase names with a lowercase first letter", () => {
        const camel = generateColors(
            colorsMap,
            { scheme: "content", contrast: 0 },
            false,
            false
        );

        expect(camel).toHaveProperty("successFixed");
        expect(camel).toHaveProperty("successFixedDim");
        expect(camel).toHaveProperty("onSuccessFixed");
        expect(camel).toHaveProperty("onSuccessFixedVariant");
        expect(camel).not.toHaveProperty("SuccessFixed");
    });

    it("are emitted in every output target", () => {
        const themeConfig = { scheme: "content", contrast: 0 };
        const config = M3TailwindConfigColors(colorsMap, themeConfig, true);
        const rn = M3TailwindRNColors(colorsMap, themeConfig, false);
        const css = generateM3ThemeCSS({ colors: colorsMap });
        const nativewindCss = generateNativeWindCSS({ colors: colorsMap });
        const nativewindTs = generateNativeWindColors({ colors: colorsMap });

        for (const name of [
            "success-fixed",
            "success-fixed-dim",
            "on-success-fixed",
            "on-success-fixed-variant",
        ]) {
            expect(config).toHaveProperty(name);
            expect(css).toContain(`--color-${name}:`);
            expect(nativewindCss).toContain(`--${name}:`);
        }

        for (const name of [
            "successFixed",
            "successFixedDim",
            "onSuccessFixed",
            "onSuccessFixedVariant",
        ]) {
            expect(rn.light).toHaveProperty(name);
            expect(nativewindTs).toContain(`${name}:`);
        }
    });
});

describe("camelCase custom container key", () => {
    it("starts with a lowercase letter", () => {
        const camel = generateColors(
            colorsMap,
            { scheme: "content", contrast: 0 },
            false,
            false
        );

        expect(camel).toHaveProperty("successContainer");
        expect(camel).toHaveProperty("onSuccessContainer");
        expect(camel).not.toHaveProperty("SuccessContainer");
    });

    it("keeps the same value as the kebab-case container", () => {
        const camel = generateColors(
            colorsMap,
            { scheme: "content", contrast: 0 },
            false,
            false
        );
        const kebab = generateColors(
            colorsMap,
            { scheme: "content", contrast: 0 },
            false,
            true
        );

        expect(camel.successContainer).toBe(kebab["success-container"]);
        expect(camel.onSuccessContainer).toBe(
            kebab["on-success-container"]
        );
    });
});
