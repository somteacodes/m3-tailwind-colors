# M3 Tailwind Colors

**M3 Tailwind Colors** is a utility package that generates Material 3 colors for use with Tailwind CSS, specifically designed to integrate seamlessly with Tailwind (v3 and v4) and NativeWind (React Native).

## Tailwind CSS v4 Support Now Available

- **Using Tailwind v3?** Your existing setup continues to work.
- **Ready for v4?** Check out our [CLI and CSS theme generation](#tailwind-v4-usage) below.

[View Migration Guide](#migrating-to-v4)

## Demo

[View Live Demo](#) _(Coming Soon)_

## Features

- Generate a full palette of Material 3 colors based on a primary color.
- **NEW:** Tailwind CSS v4 support with native `@theme` CSS variables
- **NEW:** CLI tool for easy theme generation
- Easily integrate with Tailwind CSS or NativeWind projects.
- Supports both light and dark color schemes.
- OKLCH color format support (modern, future-proof)

Read more about how it works [here](https://m3.material.io/styles/color/system/how-the-system-works)

> **How it works:** When only a primary color is provided, it is used as a seed color to generate the entire Material 3 palette including secondary, tertiary, surface, and all other color tokens according to Material Design 3 guidelines.

## Installation

Install the package via npm:

```bash
npm install m3-tailwind-colors
```

This will automatically install the necessary dependencies, including `@material/material-color-utilities`.

> **Note:** Tailwind CSS must already be set up in your project before using this package.

## Quick Start

### For Tailwind v4

```bash
# Initialize configuration
npx m3-tailwind-colors init --primary "#0062A8"

# Generate CSS theme
npx m3-tailwind-colors generate

# Import in your main CSS file
# @import "./src/m3-theme.css";
```

### For Tailwind v3

```javascript
// tailwind.config.js
const { M3TailwindConfigColors } = require("m3-tailwind-colors");

module.exports = {
  theme: {
    extend: {
      colors: M3TailwindConfigColors({ primary: "#0062A8" })
    }
  }
};
```

---

## Tailwind v4 Usage

### CLI Commands

#### Initialize Configuration

Creates a `m3-colors.config.json` file with default values:

```bash
npx m3-tailwind-colors init --primary "#0062A8"
```

**Options:**
- `--primary <color>` - Primary color (hex format)
- `--secondary <color>` - Secondary color (optional)
- `--tertiary <color>` - Tertiary color (optional)
- `--scheme <name>` - Color scheme (content, expressive, etc.)
- `--contrast <number>` - Contrast level (-1 to 1)
- `--format <format>` - Color format (hex or oklch)
- `--mode <mode>` - Output mode (combined, light, or dark)
- `--output <path>` - Output CSS file path
- `--config <path>` - Config file path

#### Generate Theme

Generates the CSS theme file:

```bash
npx m3-tailwind-colors generate
```

**Options:**
- `--include-tailwind-import` - Include `@import "tailwindcss"` in output
- `--no-dark-variant` - Exclude `@custom-variant dark` from output

This reads your `m3-colors.config.json` and outputs CSS like:

```css
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-primary: #3b82f6;
  --color-on-primary: #ffffff;
  --color-surface: #fafafa;
  /* ... all Material 3 color tokens */
}

@variant dark {
  --color-primary: #60a5fa;
  /* ... dark mode colors */
}
```

### Programmatic API

```typescript
import { generateM3ThemeCSS } from 'm3-tailwind-colors/v4';
import fs from 'fs';

const css = generateM3ThemeCSS({
  colors: {
    primary: "#0062A8",
    secondary: "#CBF7ED",
    tertiary: "#F98948"
  },
  format: "hex",      // or "oklch"
  mode: "combined",   // or "light" or "dark"
  scheme: "content",  // Material scheme type
  contrast: 0,        // -1 to 1
  includeTailwindImport: false, // Include @import "tailwindcss"
  includeDarkVariant: true      // Include @custom-variant dark
});

fs.writeFileSync('./src/theme.css', css);
```

### Configuration File

Example `m3-colors.config.json`:

```json
{
  "colors": {
    "primary": "#0062A8",
    "secondary": "#CBF7ED",
    "tertiary": "#F98948"
  },
  "scheme": "content",
  "contrast": 0,
  "format": "hex",
  "mode": "combined",
  "output": "src/m3-theme.css"
}
```

---

## NativeWind Usage (React Native)

Generate Material 3 colors for NativeWind projects with the `--target nativewind` flag.

### Quick Start

```bash
npx m3-tailwind-colors generate --target nativewind --primary "#0062A8"
```

This generates two files:
- `global.css` - CSS variables in NativeWind format
- `theme/m3-colors.ts` - TypeScript colors for React Native

### Generated CSS Format

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --primary: 0 74 129;
    --on-primary: 255 255 255;
    --android-primary: 0 74 129;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --primary: 160 201 255;
    }
  }
}
```

### Generated TypeScript Colors

```typescript
export const COLORS = {
  light: {
    primary: 'rgb(0, 74, 129)',
    onPrimary: 'rgb(255, 255, 255)',
  },
  dark: {
    primary: 'rgb(160, 201, 255)',
  },
} as const;
```

### Custom Output Paths

```bash
npx m3-tailwind-colors generate \
  --target nativewind \
  --primary "#0062A8" \
  --output "src/global.css" \
  --colors-output "src/theme/colors.ts"
```

### Configuration File

Add `target` to your `m3-colors.config.json`:

```json
{
  "colors": { "primary": "#0062A8" },
  "target": "nativewind",
  "colorsOutput": "theme/m3-colors.ts"
}
```

### Migrating from NativeWindUI Starter

If you're using the NativeWindUI starter template, the generated M3 colors use different names. Update your `theme/index.ts`:

```typescript
// theme/index.ts
import { Theme, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { COLORS } from './colors';

const NAV_THEME: { light: Theme; dark: Theme } = {
  light: {
    dark: false,
    colors: {
      background: COLORS.light.background,
      border: COLORS.light.outlineVariant,     // was: grey5
      card: COLORS.light.surface,               // was: card
      notification: COLORS.light.error,         // was: destructive
      primary: COLORS.light.primary,
      text: COLORS.light.onBackground,          // was: COLORS.black
    },
    fonts: DefaultTheme.fonts,
  },
  dark: {
    dark: true,
    colors: {
      background: COLORS.dark.background,
      border: COLORS.dark.outlineVariant,       // was: grey5
      card: COLORS.dark.surfaceContainer,       // was: grey6
      notification: COLORS.dark.error,          // was: destructive
      primary: COLORS.dark.primary,
      text: COLORS.dark.onBackground,           // was: COLORS.white
    },
    fonts: DarkTheme.fonts,
  },
};

export { NAV_THEME };
```

**Color name mappings:**

| NativeWindUI | M3 Equivalent |
|--------------|---------------|
| `grey6` | `surfaceContainerLowest` |
| `grey5` | `outlineVariant` |
| `card` | `surface` or `surfaceContainer` |
| `destructive` | `error` |
| `COLORS.white` | Hardcode `'rgb(255,255,255)'` or use `onPrimary` |
| `COLORS.black` | Hardcode `'rgb(0,0,0)'` or use `onBackground` |

---

## Tailwind v3 Usage

To use the generated colors in your Tailwind CSS configuration, follow these steps:

- **Import and Generate Colors:** Use the `M3TailwindConfigColors` function to generate your Material 3 color palette based on a primary color.

- **Extend Tailwind's Colors:** Add the generated colors to the extend.colors section of your Tailwind configuration.

Example Tailwind Configuration:

```javascript
/** @type {import('tailwindcss').Config} */

const { M3TailwindConfigColors } = require("m3-tailwind-colors");

const generatedColors = M3TailwindConfigColors({
  primary: "#CE7E00", // Replace with your primary color
  otherCustomColor: "#65ff34", //optional
});

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ...generatedColors,
      },
    },
  },
  plugins: [],
};
```

---

## Usage with React Native Styling

The package exports a function that can be used to generate colors for React Native:

```typescript
import { M3TailwindRNColors } from "m3-tailwind-colors";

const M3colors = M3TailwindRNColors(
  { primary: "#CE7E00" },
  {
    scheme: "content",
    contrast: 0,
  }
);

export const Colors = M3colors;
```

Then use in your React Native files:

```typescript
<View
  style={{
    backgroundColor:
      colorScheme === "dark" ? Colors.dark.surface : Colors.light.surface,
  }}
>
  {children}
</View>
```

---

## Migrating to v4

### Prerequisites

```bash
npm install tailwindcss@next
```

### Step-by-step Migration

**1. Generate v4 theme:**

```bash
npx m3-tailwind-colors init --primary "#0062A8"
npx m3-tailwind-colors generate
```

**2. Update your CSS entry file:**

```css
/* Add to your main CSS file */
@import "./m3-theme.css";
```

**3. Remove Tailwind config (optional):**

```bash
# tailwind.config.js can be deleted if only used for colors
rm tailwind.config.js
```

**4. No class name changes needed!**

Your existing utility classes continue to work:
- `bg-primary` - Still works
- `text-on-primary` - Still works
- All Material 3 color tokens remain the same

---

## Generated Colors

The generated color palette includes all Material 3 color tokens:

- **Primary:** primary, on-primary, primary-container, on-primary-container
- **Secondary:** secondary, on-secondary, secondary-container, on-secondary-container
- **Tertiary:** tertiary, on-tertiary, tertiary-container, on-tertiary-container
- **Error:** error, on-error, error-container, on-error-container
- **Surface:** surface, on-surface, surface-variant, surface-dim, surface-bright
- **Background:** background, on-background
- **Outline:** outline, outline-variant

---

## Parameters

The `M3TailwindConfigColors` and `M3TailwindRNColors` functions accept:

```typescript
M3TailwindRNColors(
  {
    primary: '#ff0000', // Required: Primary color in hex format
    secondary: '#ffff00', // Optional: Auto-generated if not provided
    tertiary: '#0000ff', // Optional: Auto-generated if not provided
    customname: '#00ff00', // Optional: Any custom colors
  },
  {
    scheme: 'content', // Optional: 'content', 'expressive', 'fidelity', 'monochrome', 'neutral', 'tonalSpot', 'vibrant'
    contrast: 0, // Optional: -1 (less contrast) to 1 (more contrast)
  },
  true // Optional: Use kebab-case (default: false)
)
```

---

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](LICENSE) for details.
