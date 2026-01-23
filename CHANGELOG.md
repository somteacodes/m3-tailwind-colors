# Changelog



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
