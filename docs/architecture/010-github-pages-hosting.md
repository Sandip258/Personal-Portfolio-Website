# ADR 010: GitHub Pages as the no-payment hosting target

- Status: Accepted
- Date: 2026-09-05

## Context

The portfolio owner wants a publicly accessible site without purchasing a domain, attaching a payment method, or tying availability to a paid ChatGPT subscription. The source repository is already public on GitHub.

## Decision

Publish the verified Vite `dist/` artifact through GitHub Actions to GitHub Pages. Use `/Personal-Portfolio-Website/` only for the Pages build base path, while retaining `/` for local and DigitalOcean builds. Resolve browser data assets through Vite's `BASE_URL` so the Channel Desk works in either hosting layout.

## Consequences

- The site receives the stable project URL `https://sandip258.github.io/Personal-Portfolio-Website/` without a custom domain or hosting payment method.
- Every push to `main` runs type checking, linting, tests, and the production build before deployment.
- Renaming the GitHub repository requires changing `VITE_BASE_PATH` in the Pages workflow.
- GitHub Pages must be enabled once in repository settings with GitHub Actions as its publishing source.
