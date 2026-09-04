# Repository instructions for agents

## Product scope

Maintain this as Sandip Ghosh's proof-of-work portfolio for YouTube growth, content strategy, creative operations, recruiter evaluation, and focused freelance enquiries. Do not turn it into a generic agency site, video-editing gallery, or dense analytics dashboard.

The supplied `README_FOR_CODEX.md` and two HTML wireframes are the original product handoff. Preserve their information hierarchy while following the production requirements documented in the repository README.

## Required checks

Use Node.js 22. Before handing off any code change, run the checks relevant to it; before a release, run all four:

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
# With preview running in another terminal:
npm run qa:visual
```

Do not commit `node_modules/`, `dist/`, coverage, local editor settings, logs, or `.env` files.

## Code ownership and structure

- Keep reusable controls in `src/components/` and page-level composition in `src/sections/`.
- Keep copy, confirmed proof points, contact routes, and media references centralized in `src/data/content.ts`.
- Keep Channel Desk models separate from UI and browser-fetch logic.
- Keep the YouTube refresh job in `scripts/`; the browser must read committed JSON and must never call YouTube with credentials.
- Keep global tokens and responsive behavior in `src/styles/`; avoid adding a large UI dependency for a small interaction.
- Record material architectural changes as the next numbered file in `docs/architecture/`.

## Content integrity

Do not invent achievements, clients, testimonials, channel relationships, or live metrics. Treat these as the only approved supplied proof points unless Sandip provides a new source:

- Selected six-month portfolio: 13.07M views, 421.7K watch hours, 49.1K net subscribers, 102M+ impressions, and 2,500+ launches across live, long-form, and Shorts.
- Class 10 Endgame: +310% average monthly views, +630% monthly watch time, +73% AVD, and 8.7x peak concurrency.
- 30-day sprint: 5K to 25K subscribers and 111K watch hours.
- Campus Chronicles: personal/independent channel; no performance metric was supplied.

Use explicit placeholders for unknown links, images, channels, and contact details. Keep managed channels hidden from public live-data display until approval is recorded.

## Security boundaries

- `YOUTUBE_API_KEY` is server-side only. Never create a `VITE_` version.
- Never commit API keys, OAuth secrets/tokens, private analytics exports, or employer-confidential data.
- Do not set `publicDisplayApproved` to true without explicit owner approval.
- Phase 2 YouTube Analytics requires explicit authorization and secure backend token storage; a static frontend is not sufficient.
- Before committing, inspect staged files and search for likely credentials and unresolved production placeholders.

## UX quality bar

- Preserve semantic landmarks, native controls, labels, focus states, and keyboard operation.
- Respect system color preference on first visit and persisted manual theme selection thereafter.
- Keep both themes readable and avoid black/cyberpunk styling, auto-playing media, excessive animation, and horizontal overflow.
- Check 320, 375, 390, 768, and 1024 px plus a large desktop.
- When reduced motion is requested, do not introduce decorative motion.
- Placeholder media must remain deliberately styled and must not generate broken-image requests.

## Deployment

The production target is a DigitalOcean App Platform Static Site built with `npm run build` and served from `dist/`. GitHub Actions owns the scheduled public-metrics refresh. Do not add the YouTube API key to the DigitalOcean static-site build environment.
