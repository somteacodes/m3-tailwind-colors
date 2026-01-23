import { describe, it, expect } from "vitest";
import { M3TailwindConfigColors, M3TailwindRNColors } from "../src/index";

describe("M3TailwindConfigColors", () => {
    it("should generate colors with DEFAULT and dark keys", () => {
        const colors = M3TailwindConfigColors(
            { primary: "#6750A4" },
            { scheme: "content", contrast: 0 }
        );

        expect(colors).toHaveProperty("primary");
        expect(colors.primary).toHaveProperty("DEFAULT");
        expect(colors.primary).toHaveProperty("dark");
        expect(colors.primary.DEFAULT).toMatch(/^#[0-9A-Fa-f]{6}$/);
        expect(colors.primary.dark).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });

    it("should generate all Material 3 color keys", () => {
        const colors = M3TailwindConfigColors(
            { primary: "#6750A4" },
            { scheme: "content", contrast: 0 }
        );

        const expectedKeys = [
            "background",
            "on-background",
            "surface",
            "on-surface",
            "primary",
            "on-primary",
            "primary-container",
            "on-primary-container",
            "secondary",
            "on-secondary",
            "tertiary",
            "on-tertiary",
            "error",
            "on-error",
        ];

        expectedKeys.forEach((key) => {
            expect(colors).toHaveProperty(key);
        });
    });

    it("should generate custom colors", () => {
        const colors = M3TailwindConfigColors(
            { primary: "#6750A4", customColor: "#FF5722" },
            { scheme: "content", contrast: 0 }
        );

        expect(colors).toHaveProperty("custom-color");
        expect(colors).toHaveProperty("on-custom-color");
        expect(colors).toHaveProperty("custom-color-container");
        expect(colors).toHaveProperty("on-custom-color-container");
    });

    it("should use camelCase when useKebabCase is false", () => {
        const colors = M3TailwindConfigColors(
            { primary: "#6750A4" },
            { scheme: "content", contrast: 0 },
            false
        );

        expect(colors).toHaveProperty("onBackground");
        expect(colors).toHaveProperty("primaryContainer");
        expect(colors).not.toHaveProperty("on-background");
    });
});

describe("M3TailwindRNColors", () => {
    it("should generate light and dark color objects", () => {
        const colors = M3TailwindRNColors(
            { primary: "#6750A4" },
            { scheme: "content", contrast: 0 }
        );

        expect(colors).toHaveProperty("light");
        expect(colors).toHaveProperty("dark");
        expect(typeof colors.light).toBe("object");
        expect(typeof colors.dark).toBe("object");
    });

    it("should have different colors for light and dark modes", () => {
        const colors = M3TailwindRNColors(
            { primary: "#6750A4" },
            { scheme: "content", contrast: 0 }
        );

        // Light and dark primary colors should be different
        expect(colors.light.primary).not.toEqual(colors.dark.primary);
        expect(colors.light.background).not.toEqual(colors.dark.background);
    });

    it("should use camelCase by default", () => {
        const colors = M3TailwindRNColors(
            { primary: "#6750A4" },
            { scheme: "content", contrast: 0 }
        );

        expect(colors.light).toHaveProperty("onBackground");
        expect(colors.light).toHaveProperty("primaryContainer");
        expect(colors.light).not.toHaveProperty("on-background");
    });

    it("should use kebab-case when useKebabCase is true", () => {
        const colors = M3TailwindRNColors(
            { primary: "#6750A4" },
            { scheme: "content", contrast: 0 },
            true
        );

        expect(colors.light).toHaveProperty("on-background");
        expect(colors.light).toHaveProperty("primary-container");
        expect(colors.light).not.toHaveProperty("onBackground");
    });
});

describe("Scheme Options", () => {
    const schemes = [
        "content",
        "expressive",
        "fidelity",
        "monochrome",
        "neutral",
        "tonalSpot",
        "vibrant",
    ];

    schemes.forEach((scheme) => {
        it(`should work with ${scheme} scheme`, () => {
            const colors = M3TailwindRNColors(
                { primary: "#6750A4" },
                { scheme, contrast: 0 }
            );

            expect(colors.light).toHaveProperty("primary");
            expect(colors.dark).toHaveProperty("primary");
        });
    });
});

describe("Contrast Levels", () => {
    it("should generate colors with different contrast levels", () => {
        const lowContrast = M3TailwindRNColors(
            { primary: "#6750A4" },
            { scheme: "content", contrast: -1 }
        );

        const highContrast = M3TailwindRNColors(
            { primary: "#6750A4" },
            { scheme: "content", contrast: 1 }
        );

        // Colors should be generated for both
        expect(lowContrast.light.primary).toMatch(/^#[0-9A-Fa-f]{6}$/);
        expect(highContrast.light.primary).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
});
