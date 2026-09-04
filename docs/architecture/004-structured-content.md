# ADR 004: Structured portfolio content

- Status: Accepted
- Date: 2026-09-05

## Context

Scattered JSX strings make claims difficult to audit, media difficult to replace, and future case-study routes expensive to create. Several production values are not yet available and must remain unmistakable placeholders.

## Decision

Keep portfolio copy, navigation, proof points, service descriptions, contact routes, media references, and SEO metadata in typed structures under `src/data/`. Components receive that data and focus on presentation.

## Consequences

- Factual review and placeholder replacement have a single primary location.
- Case studies can be reused in future detail routes without copying claims.
- Unknown values stay as explicit tokens such as `YOUR_EMAIL` and `REEL_URL_01`.
- Changes to data shape require TypeScript-compatible component updates and tests.

