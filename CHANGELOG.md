# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Migrated build system from Rollup to tsup for faster, simpler builds
- Added Vitest for testing
- Added GitHub Actions for CI/CD
- Added Dependabot for dependency updates

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
