# M3 Tailwind Colors

![npm version](https://img.shields.io/npm/v/m3-tailwind-colors)
![License](https://img.shields.io/github/license/somteacodes/m3tailwindcolorgenerator)
![Build Status](https://img.shields.io/github/actions/workflow/status/somteacodes/m3tailwindcolorgenerator/ci.yml)

**M3 Tailwind Colors** is a utility package that generates Material 3 colors for use with Tailwind CSS, specifically designed to integrate seamlessly with Tailwind and NativeWind (React Native).

## Demo

[View Live Demo](https://m3-tailwind-colors-demo.vercel.app/) _(Coming Soon)_

## Features

- Generate a full palette of Material 3 colors based on a primary color.
- Easily integrate with Tailwind CSS or NativeWind projects.
- Supports both light and dark color schemes.

Read more about how it works [here](https://m3.material.io/styles/color/system/how-the-system-works)

## Installation

First, install the package via npm:

```bash
npm install m3-tailwind-colors
```

This will automatically install the necessary dependencies, including `@material/material-color-utilities`.

## Usage

To use the generated colors in your Tailwind CSS configuration, follow these steps:

- **Import and Generate Colors:** Use the `M3TailwindColor` function to generate your Material 3 color palette based on a primary color.

- **Extend Tailwind's Colors:** Add the generated colors to the extend.colors section of your Tailwind configuration.

Example Tailwind Configuration

Here's an example of how to set up your tailwind.config.js file:

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

### Usage with React Native Styling

The package exports a function that can be used to generate colors for react native

- Example usage

```typescript
/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/),
 * [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { M3TailwindRNColors } from "m3-tailwind-colors";

const M3colors = M3TailwindRNColors(
  { primary: "#CE7E00" },
  {
    scheme: "content", // Replace with your desired scheme
    contrast: 0, // Adjust the contrast as needed
  }
);

export const Colors = M3colors;
```

Then it can be used as style values in your react native files like so

```typescript
      <View
        style={{
          backgroundColor:
            colorScheme === "dark" ? Colors.dark.surface : Colors.light.surface,
        }}
      >
      {children}
      <View>
```

## Generated Colors

The generated color palette will include various shades and tones derived from the primary color, ready to be used in both light and dark modes.

## Parameters

The M3TailwindConfigColors and M3TailwindRNColors functions accepts an object with the following parameters:

```typescript
const M3colors = M3TailwindRNColors(

 {
   primary: '#ff0000', //The base color in hexadecimal format. This will be used to generate the Material 3 color scheme.
   // secondary and/or tertiary are optional, if not given, they will be generated automatically
   secondary: '#ffff00',
   tertiary: '#0000ff',
   // add any other colors you need, it can be named anything
   customname: '#00ff00',
   },
   {
   scheme: 'content',   //optional. options are 'content', 'expressive', 'fidelity', 'monochrome', 'neutral', 'tonalSpot' or 'vibrant'
   contrast: 0, // contrast is optional, any number between -1 (less contrast) to 1 (more contrast).
 }
 true // class names with kebab case, this is optional, the default is false. This will output the class name as 'on-surface' instead of 'onSurface'
)
 ```

