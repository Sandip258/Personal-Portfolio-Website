# ADR 008: GitHub-led deployment and release

- Status: Accepted
- Date: 2026-09-05

## Context

Source control, scheduled metric generation, and hosting need clear ownership. The deploy target should update predictably without placing server credentials in a static build environment.

## Decision

Use GitHub `main` as the production source. Let GitHub Actions refresh and commit public metric snapshots. Let DigitalOcean App Platform build the static site from `main`, optionally on every push, using the checked-in `.do/app.yaml` specification.

## Consequences

- A snapshot commit can trigger a fresh static deployment, keeping the Channel Desk current.
- The DigitalOcean component needs no secret environment variable.
- Changes should pass local quality checks before pushing to `main`; branch protection can be added once collaboration expands.
- Deployment failures are inspected independently in GitHub Actions and DigitalOcean build logs.
- Pricing and platform behavior are external terms and should be reviewed before production changes.

