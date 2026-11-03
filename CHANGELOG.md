# Changelog



## [0.4.0] - 2026-11-03

### Added
- **M3 fixed color roles**: `primary-fixed`, `primary-fixed-dim`, `on-primary-fixed`,
  `on-primary-fixed-variant`, plus the same four roles for `secondary` and `tertiary`, in every
  output target (Tailwind v3 config, React Native, Tailwind v4 CSS, NativeWind CSS and TypeScript).
  Fixed roles keep the same value in light and dark schemes at the default contrast.
- **Custom color fixed roles**: every custom color now also produces `<name>-fixed`,
  `<name>-fixed-dim`, `on-<name>-fixed` and `on-<name>-fixed-variant` (tones 90/80/10/30 of its
  palette, identical in light and dark).

### Fixed
- **camelCase custom color keys** now start lowercase, matching the built-in camelCase convention:
  - The container key `SuccessContainer` is now `successContainer`.
  - A custom color whose name starts with a capital letter (e.g. `Success`) is now emitted as
    `success` instead of `Success`. Lowercase names are unaffected.
  - The `on*` keys (`onSuccess`, `onSuccessContainer`) are unchanged.

  Code that references the old capitalised keys needs updating.

## [0.3.4] - 2026-01-23

### Fixed
- **Code Cleanup**: Made the code easier to read and understand
- **Lint Warning**: Fixed a warning about how text is replaced
- **Bug Fix**: Fixed a logic error when generating colors
- **Bug Fix**: Fixed an issue with default settings
- **Types**: Added missing Typescript definitions for Node.js

## [0.3.0] - 2026-01-23

### Added
- **NativeWind support** with `--target nativewind` flag
- New generators:
  - `nativewind-css`: Generates `global.css` with space-separated RGB variables
  - `nativewind-colors`: Generates `theme/m3-colors.ts` with TypeScript types
- Dark mode strategy options: `--dark-mode <media|class|none>`
- `--include-tailwind-import` flag to optionally include `@import "tailwindcss"`
- `--generate` flag for `init` command to create config and generate theme in one step
- `--colors-output` flag for custom TypeScript colors file path
- `--target` and `--colors-output` options in `m3-colors.config.json`

### Changed
- **CLI Output**: Now builds to ESM (`.mjs`) to fix CommonJS/ESM warnings
- **Default Format**: CSS generation now defaults to `hex` instead of `oklch`
- **Error Handling**: Improved error messages with actionable suggestions
- **Dark Mode**: Generated CSS now includes `@custom-variant dark` by default for proper v4 dark mode support
- Migrated build system to `tsup`
- Added Vitest for testing

### Fixed
- Fixed missing dark variant declaration in combined mode

## [0.2.0] - 2026-01-22

### Added
- **Tailwind CSS v4 support** with native `@theme` CSS variables
- `generateM3ThemeCSS()` function for programmatic CSS theme generation
- CLI tool with `init` and `generate` commands
- Configuration file support via `m3-colors.config.json`
- OKLCH color format output with hex fallback option
- Flexible output modes: combined, light-only, or dark-only themes
- Input validation for colors, schemes, and contrast values
- New `/v4` export path for v4-specific functionality

### Changed
- Reorganized internal code structure for better maintainability
- Extracted shared color generation logic into reusable modules
- Updated package description and keywords

### Maintained
- Full backward compatibility with Tailwind v3
- All existing `M3TailwindConfigColors` and `M3TailwindRNColors` APIs unchanged
- React Native support remains identical

## [0.1.5] - 2024

### Changed
- Updated repository configuration

## [0.1.4] - 2024

### Changed
- Added .log files to .gitignore
- Updated package.json configuration

## [0.1.3] - 2024

### Changed
- Bumped package version

## [0.1.2] - 2024

### Changed
- Bumped package version to 0.1.2

## [0.1.1] - 2024

### Changed
- Renamed `M3TailwindColors` to `M3TailwindRNColors` for clarity
- Updated documentation

## [0.1.0] - 2024

### Added
- Initial release
- `M3TailwindConfigColors` function for Tailwind CSS configuration
- `M3TailwindRNColors` function for React Native styling
- Support for all Material 3 color schemes: content, expressive, fidelity, monochrome, neutral, tonalSpot, vibrant
- Custom color support with harmonization
- Light and dark mode color generation
- Contrast adjustment (-1 to 1)
- Optional kebab-case output
