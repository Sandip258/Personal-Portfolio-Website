# ADR 007: Accessibility and proportionate testing

- Status: Accepted
- Date: 2026-09-05

## Context

The portfolio is evaluated on mobile and desktop, uses theme-dependent colors, includes a collapsible menu and form, and must work without pointer-only interaction. Regressions are most likely around responsive layout, state labels, and interactive controls.

## Decision

Use semantic HTML and native controls, visible focus styles, labeled form fields, comfortable touch targets, reduced-motion handling, and explicit loading/empty/stale messaging. Gate releases with TypeScript, ESLint, Vitest, a production build, and manual viewport/theme/keyboard checks.

## Consequences

- Automated checks cover component contracts and core state behavior; they do not replace browser inspection.
- Every new interaction needs keyboard and screen-reader semantics.
- Responsive review covers 320, 375, 390, 768, and 1024 px plus a large desktop.
- Both themes and placeholder states are release criteria, not optional polish.

