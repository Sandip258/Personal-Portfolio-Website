# ADR 002: Static frontend hosting

- Status: Accepted
- Date: 2026-09-05

## Context

The application is a content-led portfolio. Runtime server computation is not needed for page rendering, and a server would add cost, operations, and attack surface.

## Decision

Deploy the Vite output as a DigitalOcean App Platform Static Site. Build with `npm run build`, publish `dist/`, use `/` as the route, and allow optional deploy-on-push from `main`.

## Consequences

- The site can use CDN delivery and requires no application server.
- Runtime secrets cannot and should not exist in the frontend.
- The project form needs an external HTTPS form service or a separately approved backend before it can deliver submissions.
- Any future client-side routes must be paired with an appropriate static fallback or prerendering strategy.

