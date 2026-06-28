# Contributing to YieldLens

Thank you for your interest in contributing to **YieldLens** — a lightweight portfolio tracker for Stellar DeFi. We welcome contributions from the community!

This document outlines the guidelines and workflow for contributing to this project.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Project Overview](#project-overview)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Coding Guidelines](#coding-guidelines)
- [Commit Conventions](#commit-conventions)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)

---

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone. Please:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community

---

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/YieldLens-Frontend-Development.git
   cd YieldLens-Frontend-Development
   ```
3. **Install dependencies** (this project uses **pnpm**):
   ```bash
   pnpm install
   ```
4. **Start the development server**:
   ```bash
   pnpm dev
   ```
   The app will be available at `http://localhost:5173` (or the port shown in your terminal).

---

## Project Overview

YieldLens is a React + TypeScript frontend application built with:

- **Vite** — Build tool and dev server
- **React 18** — UI library
- **TypeScript** — Type-safe JavaScript
- **Tailwind CSS v4** — Utility-first CSS framework (via `@tailwindcss/vite`)
- **MUI (Material UI)** — Component library for icons and some UI elements
- **Radix UI** — Accessible, unstyled UI primitives
- **Recharts** — Charting library for APY trends
- **React Router** — Client-side routing

The app tracks Stellar DeFi liquidity positions across protocols like **Soroswap**, **Phoenix Hub**, **Aquarius**, and **Stellar Native Pools**, displaying portfolio summaries, impermanent loss calculations, and historical APY trends.

---

## Project Structure

```
YieldLens Frontend Development/
├── index.html                  # Entry HTML file
├── package.json                # Dependencies and scripts
├── vite.config.ts              # Vite configuration
├── postcss.config.mjs          # PostCSS configuration
├── guidelines/                 # Project guidelines
│   └── Guidelines.md
├── src/
│   ├── main.tsx                # React entry point
│   ├── app/
│   │   ├── App.tsx             # Root application component
│   │   ├── components/         # Application components
│   │   │   ├── Header.tsx
│   │   │   ├── PortfolioOverview.tsx
│   │   │   ├── PositionCard.tsx
│   │   │   ├── APYChart.tsx
│   │   │   ├── ProtocolFilter.tsx
│   │   │   ├── figma/         # Figma-generated components
│   │   │   └── ui/            # Shared UI primitives
│   │   ├── data/
│   │   │   └── mockData.ts    # Mock data for development
│   │   └── types/
│   │       └── portfolio.ts   # TypeScript type definitions
│   └── styles/
│       ├── index.css           # Main stylesheet (imports below)
│       ├── fonts.css           # Font definitions
│       ├── tailwind.css        # Tailwind CSS entry
│       └── theme.css           # Design tokens and theme variables
```

---

## Development Setup

### Prerequisites

- **Node.js** >= 18.x
- **pnpm** >= 8.x (install via `npm install -g pnpm` if needed)

### Available Scripts

| Command         | Description                        |
|-----------------|------------------------------------|
| `pnpm dev`      | Start the Vite development server  |
| `pnpm build`    | Build the project for production   |

---

## Development Workflow

1. **Create a branch** for your work:
   ```bash
   git checkout -b feat/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes** following the coding guidelines below.

3. **Test your changes** by running the dev server and verifying the app works as expected.

4. **Commit your changes** following the commit conventions.

5. **Push your branch** and open a Pull Request.

---

## Coding Guidelines

### General

- Write clean, readable, and maintainable code.
- Keep components focused and single-responsibility.
- Extract reusable logic into helper functions or custom hooks.
- Use meaningful variable and function names.

### TypeScript

- Use TypeScript for all new files. Avoid `any` where possible.
- Define types/interfaces in the `src/app/types/` directory.
- Use the `@` path alias to reference the `src/` directory (e.g., `import { Position } from '@/app/types/portfolio'`).

### React

- Use functional components with hooks.
- Keep components small and composable.
- Use `useMemo` and `useCallback` for expensive computations.
- Prefer lifting state up over prop drilling.

### Styling

- Use **Tailwind CSS utility classes** for styling.
- Use CSS custom properties (design tokens) from `theme.css` for colors and spacing.
- Avoid inline styles unless absolutely necessary.
- Follow the existing theme conventions (light/dark mode via `.dark` class).

### Imports

- Group imports in this order:
  1. External libraries (React, MUI, etc.)
  2. Internal modules (components, types, utils)
  3. Stylesheets
- Use named exports for components and utilities.

### File Organization

- Place new components in `src/app/components/`.
- Place shared UI primitives in `src/app/components/ui/`.
- Place data/mock files in `src/app/data/`.
- Place type definitions in `src/app/types/`.

---

## Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/) for clear and structured commit messages:

```
<type>(<scope>): <description>

[optional body]
```

### Types

| Type       | Description                                      |
|------------|--------------------------------------------------|
| `feat`     | A new feature                                    |
| `fix`      | A bug fix                                        |
| `chore`    | Build process, tooling, or dependency changes    |
| `docs`     | Documentation changes                            |
| `style`    | Code style changes (formatting, missing semicolons) |
| `refactor` | Code refactoring without feature or fix changes  |
| `test`     | Adding or updating tests                         |
| `perf`     | Performance improvements                         |

### Examples

```
feat(portfolio): add impermanent loss calculation
fix(header): correct mobile menu alignment
docs(readme): update installation instructions
chore(deps): upgrade vite to 6.3.5
```

---

## Pull Request Process

1. Ensure your branch is up to date with the target branch (usually `main`).
2. Run `pnpm build` to verify the project builds without errors.
3. Write a clear PR title and description explaining:
   - What changes were made
   - Why they were made
   - How to test them (if applicable)
4. Link any related issues in the PR description (e.g., "Closes #12").
5. Request a review from a maintainer.
6. Address any feedback from code reviews.

### PR Title Format

Follow the same convention as commit messages:

```
feat(scope): brief description
```

---

## Reporting Issues

If you find a bug or have a feature request, please [open an issue](https://github.com/your-org/YieldLens-Frontend-Development/issues) with:

- A clear, descriptive title
- Steps to reproduce (for bugs)
- Expected vs. actual behavior
- Screenshots or screen recordings (if applicable)
- Environment details (browser, OS, etc.)

---

## Questions?

If you have any questions about contributing, feel free to reach out by opening a discussion or issue.

Thank you for helping make YieldLens better! 🚀
