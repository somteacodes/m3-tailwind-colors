# Contributing to m3-tailwind-colors

Thank you for your interest in contributing! This document provides guidelines and instructions.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/m3tailwindcolorgenerator.git
   cd m3tailwindcolorgenerator
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Building

```bash
npm run build
```

This uses [tsup](https://github.com/egoist/tsup) to build CommonJS, ESM, and TypeScript declaration files.

### Testing

```bash
# Run tests once
npm test

# Run tests in watch mode during development
npm run test:watch
```

### Testing in Another Project

To test your local changes in another project, use `npm link`:

```bash
# In the m3tailwindcolorgenerator directory
npm run build
npm link

# In your test project
npm link m3-tailwind-colors
```

After testing, unlink:
```bash
# In test project
npm unlink m3-tailwind-colors

# In m3tailwindcolorgenerator
npm unlink
```

## Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

### Format

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, semicolons, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat: add support for custom color harmonization
fix: correct hex color validation
docs: update README with new API examples
test: add tests for monochrome scheme
```

## Pull Request Process

1. Ensure your code passes all tests: `npm test`
2. Update documentation if you're adding/changing functionality
3. Fill out the PR template completely
4. Request a review from the maintainers

## Code Style

- Use TypeScript for all source code
- Keep functions focused and well-documented
- Add tests for new functionality

## Questions?

Feel free to open an issue for any questions or discussions.
