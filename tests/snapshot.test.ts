import { describe, it, expect } from "vitest";
import { M3TailwindConfigColors, M3TailwindRNColors } from "../src/index";
import { generateM3ThemeCSS } from "../src/generators/v4-css";
import { generateNativeWindCSS } from "../src/generators/nativewind-css";
import { generateNativeWindColors } from "../src/generators/nativewind-colors";

const colors = { primary: "#6750A4", success: "#4CAF50" };
const scheme = "content";
const contrast = 0;

describe("snapshot: Tailwind v3 config", () => {
    it("kebab-case", () => {
        expect(
            M3TailwindConfigColors(colors, { scheme, contrast }, true)
        ).toMatchSnapshot();
    });

    it("camelCase", () => {
        expect(
            M3TailwindConfigColors(colors, { scheme, contrast }, false)
        ).toMatchSnapshot();
    });
});

describe("snapshot: React Native", () => {
    it("camelCase", () => {
        expect(
            M3TailwindRNColors(colors, { scheme, contrast }, false)
        ).toMatchSnapshot();
    });

    it("kebab-case", () => {
        expect(
            M3TailwindRNColors(colors, { scheme, contrast }, true)
        ).toMatchSnapshot();
    });
});

describe("snapshot: Tailwind v4 CSS", () => {
    it("combined media hex", () => {
        expect(
            generateM3ThemeCSS({ colors, scheme, contrast, darkModeStrategy: "media" })
        ).toMatchSnapshot();
    });

    it("combined class hex", () => {
        expect(
            generateM3ThemeCSS({ colors, scheme, contrast, darkModeStrategy: "class" })
        ).toMatchSnapshot();
    });

    it("light only hex", () => {
        expect(
            generateM3ThemeCSS({ colors, scheme, contrast, mode: "light" })
        ).toMatchSnapshot();
    });

    it("dark only hex", () => {
        expect(
            generateM3ThemeCSS({ colors, scheme, contrast, mode: "dark" })
        ).toMatchSnapshot();
    });

    it("combined media oklch", () => {
        expect(
            generateM3ThemeCSS({
                colors,
                scheme,
                contrast,
                format: "oklch",
                darkModeStrategy: "media",
            })
        ).toMatchSnapshot();
    });
});

describe("snapshot: NativeWind", () => {
    it("global.css", () => {
        expect(generateNativeWindCSS({ colors, scheme, contrast })).toMatchSnapshot();
    });

    it("m3-colors.ts", () => {
        expect(generateNativeWindColors({ colors, scheme, contrast })).toMatchSnapshot();
    });
});
