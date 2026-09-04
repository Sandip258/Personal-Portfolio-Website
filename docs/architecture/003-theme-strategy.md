# ADR 003: CSS-variable theme strategy

- Status: Accepted
- Date: 2026-09-05

## Context

The brief requires a light editorial default direction plus an accessible soft-navy dark mode. First paint must respect the visitor's system preference without flashing the wrong theme, and manual choice must persist.

## Decision

Represent color roles as CSS custom properties. Resolve the initial theme before React renders, use `prefers-color-scheme` when no preference exists, and persist only an explicit user choice in local storage. Expose the control as a labeled native button.

## Consequences

- Components use semantic color roles instead of duplicating palette values.
- Both themes must be checked whenever a new state or surface is introduced.
- Inline bootstrapping in the document head is a deliberate exception to component ownership because it prevents first-paint theme flash.
- System-theme changes can remain meaningful for visitors who have not manually selected a theme.

