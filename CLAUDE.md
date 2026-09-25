# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@mitchallen/grid` is a scoped npm package providing 2D grid implementations (Square, Circle, Hexagon, Triangle) with zero-based indexing. It targets both Node.js and browsers via an esbuild bundle. Hexagon and Triangle are currently mapped to the Square implementation.

## Commands

- **Build + Test**: `npm test` (runs `build.js`, then the Node.js built-in test runner)
- **Build only**: `npm run build` (esbuild via `build.js`)
- **Coverage**: `npm run coverage` — fails unless line, branch and function coverage are all 100%
- **Lint**: `npm run lint` (ESLint)
- **Tarball check**: `node scripts/check-pack.js`
- **Watch mode**: `npm run watch` (rebuilds on src changes)
- **Test a specific grid type**: `npm run test-square`, `npm run test-circle`, `npm run test-hexagon`, `npm run test-triangle`, `npm run test-create`
- **Run a single test file**: `node --test test/square/square-smoke-test.js`
- **Run tests matching a pattern**: `node --test --test-name-pattern='pattern' $(find test -name '*-test.js')`
- **Debug-tagged tests**: `npm run test-debug` (runs tests tagged `@DEBUG`)

Note: CI (`.github/workflows/ci.yml`) runs `npm run coverage` and the pack check on pushes and PRs to `main`, and fails below 100% coverage; `test-on-branch-push.yml` runs `npm test` on other branches.

## Architecture

- **`src/index.js`** — Main entry point. Exports factory functions: `Square`, `Circle`, `Hexagon`, `Triangle`, and a deprecated `create`.
- **`src/circle.js`** — Circle grid built on `@mitchallen/grid-core`. Models concentric rings where each ring's cell count is calculated from circumference ratios.
- **`@mitchallen/grid-core`** — External dependency providing the base grid class (rows, get/set, fill, clone, isCell, clampRecursive, etc.).
- **`@mitchallen/grid-square`** — External dependency providing the square grid factory.
- **`dist/`** — esbuild output from `build.js` (browser global: `MitchAllen.Grid`). Generated, do not edit directly.

## Code Conventions

- CommonJS modules (`require`/`module.exports`), ES6 features (arrow functions, destructuring, `const`/`let`)
- `"use strict"` in all source files
- Legacy JSHint directives remain at the top of source files (`/*jshint node: true */`, `/*jshint esversion: 6 */`); linting is ESLint now
- Factory pattern — grids are created via factory functions (e.g., `Square({ x: 5, y: 5 })`), not constructors
- Immutable public properties defined via `Object.defineProperties()`
- Tests use the Node.js built-in test runner (`node:test`) with `node:assert`
- Test files follow `*-smoke-test.js` / `*-test.js` naming pattern
