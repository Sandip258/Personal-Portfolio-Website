# ADR 009: Browser-driven responsive release check

- Status: Accepted
- Date: 2026-09-05

## Context

Type checks and DOM unit tests cannot detect layout overflow, a wrong first-paint theme, broken images, or browser-console failures. The release brief names six viewport widths and requires both color schemes to be verified.

## Decision

Keep a lightweight Playwright Core script that launches an already-installed Chromium-family browser against the production preview. Check 320, 375, 390, 768, 1024, and 1440 px viewports across light and dark preferences; capture full-page screenshots; and fail when HTTP status, horizontal overflow, broken images, or console errors are detected.

## Consequences

- Responsive acceptance is repeatable with `npm run qa:visual` instead of relying only on visual memory.
- The script does not download or bundle a browser; contributors either use Edge, Chrome, Chromium, or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE`.
- Screenshot artifacts and the machine-readable report stay local under the ignored `qa-artifacts/` directory.
- Human review is still required for hierarchy, readability, and aesthetic quality even when automated measurements pass.
