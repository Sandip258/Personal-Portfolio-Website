# ADR 001: React, Vite, and TypeScript

- Status: Accepted
- Date: 2026-09-05

## Context

The portfolio needs a polished responsive interface, reusable sections for future case-study routes, fast local feedback, and a small production bundle. It does not need a full server-rendered application framework in Phase 1.

## Decision

Build the interface with React and TypeScript, bundle it with Vite, and use native browser capabilities for small interactions. Pin behavior through type checking, linting, and Vitest rather than introducing a heavy component system.

## Consequences

- Components and section boundaries can be reused when case-study routes are added.
- Vite produces a static `dist/` directory that is easy to preview and deploy.
- Client rendering is sufficient for the initial single page; future SEO-sensitive route expansion may justify revisiting prerendering or SSR.
- Dependencies should remain deliberately small and must be reviewed before additions.

