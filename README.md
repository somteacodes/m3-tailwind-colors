# M3 Tailwind Colors

![npm version](https://img.shields.io/npm/v/m3-tailwind-colors)
![License](https://img.shields.io/github/license/somteacodes/m3tailwindcolorgenerator)
![Build Status](https://img.shields.io/github/actions/workflow/status/somteacodes/m3tailwindcolorgenerator/ci.yml)

**M3 Tailwind Colors** is a utility package that generates Material 3 colors for use with Tailwind CSS, specifically designed to integrate seamlessly with Tailwind (v3 and v4) and NativeWind (React Native).

## Tailwind CSS v4 Support Now Available

- **Using Tailwind v3?** Your existing setup continues to work.
- **Ready for v4?** Check out our [CLI and CSS theme generation](#tailwind-v4-usage) below.

[View Migration Guide](#migrating-to-v4)

## Demo

[View Live Demo](https://m3-tailwind-colors-demo.vercel.app/) _(Coming Soon)_

## Features

- Generate a full palette of Material 3 colors based on a primary color.
- **NEW:** Tailwind CSS v4 support with native `@theme` CSS variables
- **NEW:** CLI tool for easy theme generation
- Easily integrate with Tailwind CSS or NativeWind projects.
- Supports both light and dark color schemes.
- OKLCH color format support (modern, future-proof)

Read more about how it works [here](https://m3.material.io/styles/color/system/how-the-system-works)

## Installation

Install the package via npm:

```bash
npm install m3-tailwind-colors
```

This will automatically install the necessary dependencies, including `@material/material-color-utilities`.

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

This reads your `m3-colors.config.json` and outputs CSS like:

```css
@import "tailwindcss";

@theme {
  --color-primary: oklch(0.45 0.13 241.52);
  --color-on-primary: oklch(1 0 0);
  --color-surface: oklch(0.98 0.01 264.05);
  /* ... all Material 3 color tokens */
}

@variant dark {
  --color-primary: oklch(0.78 0.17 267.12);
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
  format: "oklch",    // or "hex"
  mode: "combined",   // or "light" or "dark"
  scheme: "content",  // Material scheme type
  contrast: 0,        // -1 to 1
  includeImport: true // Include @import "tailwindcss"
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
  "format": "oklch",
  "mode": "combined",
  "output": "src/m3-theme.css"
}
```

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
