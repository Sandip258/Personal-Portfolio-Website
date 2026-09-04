# Sandip Ghosh — YouTube Growth Portfolio

A lightweight, responsive proof-of-work portfolio for YouTube growth, content strategy, and creative operations. It serves recruiter evaluation and freelance enquiries from one focused React application.

The production frontend is static. Public YouTube data is fetched outside the browser by a scheduled GitHub Actions job, saved as JSON snapshots, and then rendered by the site. No API key or OAuth token is shipped to visitors.

## What is included

- Responsive single-page portfolio following the supplied desktop and mobile wireframes
- Light and soft-navy dark themes, system preference detection, and persisted manual choice
- Case studies, six-month impact metrics, personal media placeholders, operating system, services, and project brief
- Channel Desk with explicit loading, empty, stale, and last-updated states
- Daily public YouTube Data API refresh with historical 7/30-day snapshot comparisons
- TypeScript, lint, unit-test, and production-build commands
- GitHub and DigitalOcean App Platform deployment configuration
- GitHub Pages deployment with a permanent, payment-method-free project URL

## Prerequisites

- [Node.js 22](https://nodejs.org/) or the current Node.js LTS
- npm (included with Node.js)
- A Google Cloud project and YouTube Data API v3 key only when enabling live public metrics

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints, normally `http://localhost:5173`.

To test the production output locally:

```bash
npm run build
npm run preview
```

## Quality commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run typecheck` | Check TypeScript project references |
| `npm run lint` | Run ESLint with zero warnings allowed |
| `npm test` | Run the Vitest suite once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run build` | Type-check and create the production bundle in `dist/` |
| `npm run preview` | Serve the built bundle locally |
| `npm run metrics:refresh` | Refresh approved public YouTube metrics and snapshots |
| `npm run qa:visual` | Check required Chromium viewports, both themes, overflow, broken images, and console errors against the production preview |

Before publishing, run:

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
# In a second terminal, while preview is running:
npm run qa:visual
```

The visual script checks 320, 375, 390, 768, 1024, and 1440 px viewports. It uses an installed Edge, Chrome, or Chromium browser; set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` if the browser is installed elsewhere. Set `QA_URL` only when the preview is not at `http://127.0.0.1:4173/`. Generated screenshots and the JSON report are ignored under `qa-artifacts/`.

## Configuration and placeholders

Portfolio copy, links, case-study data, and media references live in [`src/data/content.ts`](src/data/content.ts). Replace these explicit placeholders before launch:

- `YOUR_DOMAIN`
- `YOUR_EMAIL`
- `YOUR_WHATSAPP_LINK`
- `YOUR_CALENDAR_LINK`
- `LINKEDIN_URL`, `INSTAGRAM_URL`, and `YOUTUBE_URL`
- `DOWNLOAD_CV_URL`
- `REEL_URL_01`, `REEL_URL_02`, and `REEL_URL_03`
- `PORTRAIT_IMAGE`, `BTS_IMAGE_01`, and `BTS_IMAGE_02`

Put final images and the CV under `public/` and reference them with root-relative paths such as `/media/sandip-portrait.webp` and `/sandip-ghosh-cv.pdf`. Use optimized WebP or AVIF images where practical. Reels link out and never autoplay.

The project form remains visibly unavailable while its action contains a placeholder. Set `siteContent.contact.form.action` to a production HTTPS form endpoint and update the direct-contact routes. Verify submissions end to end before launch. Never embed private mail-provider credentials in this repository.

The following still require Sandip's confirmation:

- Final domain and contact destinations
- LinkedIn, Instagram, YouTube, and any other public profiles
- Three featured Reel/Short URLs and their cover images
- Portrait and two behind-the-scenes images
- Exact public channel IDs/handles and approval for each managed channel shown
- Whether any channel owner approves a future private YouTube Analytics integration

## Environment variables

Copy `.env.example` to `.env` only when refreshing metrics locally:

```bash
Copy-Item .env.example .env
```

On macOS or Linux, use `cp .env.example .env`.

| Variable | Required | Used by | Notes |
| --- | --- | --- | --- |
| `YOUTUBE_API_KEY` | For metric refreshes | Node refresh script / GitHub Actions | Server-side only; restrict it to YouTube Data API v3 |
| `YOUTUBE_CHANNEL_CONFIG` | No | Node refresh script | Optional path relative to the repository root; defaults to `scripts/youtube-channels.json` |

Do not prefix the key with `VITE_`. Vite exposes `VITE_*` values to client code. Never place credentials in `src/`, `public/`, a snapshot, a commit, or a DigitalOcean static-site build variable.

## Enable Phase 1 YouTube metrics

1. Create or select a project in [Google Cloud Console](https://console.cloud.google.com/).
2. Enable **YouTube Data API v3**.
3. Create an API key and restrict it to YouTube Data API v3. Add appropriate usage restrictions for the environment running the refresh.
4. Confirm public-display approval for every managed channel. Public availability does not replace owner/employer approval.
5. Edit [`scripts/youtube-channels.json`](scripts/youtube-channels.json): add the exact channel ID and set `publicDisplayApproved` to `true` only for approved channels.
6. Put `YOUTUBE_API_KEY=...` in the untracked local `.env` file.
7. Run `npm run metrics:refresh`.
8. Review the generated current file and timestamped history under `public/data/` before committing them.

The script fetches public subscriber count (unless hidden), total views, video count, recent uploads, and publishing cadence. Seven- and 30-day movement appears after a saved snapshot is old enough to be a baseline.

If one channel fails, the script continues with the others. It retains that channel's last valid values when available and labels them stale. Request URLs are not logged because they contain the API key.

### Scheduled refresh on GitHub

Add the key at **Repository → Settings → Secrets and variables → Actions → New repository secret**:

```text
Name: YOUTUBE_API_KEY
Value: <restricted API key>
```

The workflow in [`.github/workflows/refresh-youtube-metrics.yml`](.github/workflows/refresh-youtube-metrics.yml) runs daily at 03:17 UTC and can also be started from **Actions → Refresh public YouTube metrics → Run workflow**. It commits only changed metric files. The workflow needs repository `contents: write`; if organization policy blocks this, allow read/write workflow permissions in repository Actions settings.

### Phase 2 is deliberately disabled

Private metrics such as impressions, CTR, average view duration, watch time, and subscriber gains require the YouTube Analytics API, OAuth, secure server-side token storage, and explicit authorization from each channel owner. Do not place OAuth tokens in GitHub artifacts, static-host environment variables, the repository, or frontend code. Employer-managed data must remain private unless its owner approves publication.

## Publish the repository to GitHub

The intended remote is `https://github.com/Sandip258/Personal-Portfolio-Website.git`. After the local quality checks pass:

```bash
git init
git add .
git commit -m "feat: build Sandip Ghosh portfolio"
git branch -M main
git remote add origin https://github.com/Sandip258/Personal-Portfolio-Website.git
git push -u origin main
```

If the repository or remote already exists, do not repeat `git init` or `git remote add`. Verify with `git remote -v`, then use:

```bash
git branch -M main
git push -u origin main
```

Authenticate with GitHub CLI (`gh auth login`), Git Credential Manager, or a scoped personal access token. Never put a token in the remote URL or a tracked file.

## Deploy to GitHub Pages

The workflow in [`.github/workflows/deploy-github-pages.yml`](.github/workflows/deploy-github-pages.yml) verifies and builds the application on every push to `main`, then publishes `dist/` to GitHub Pages. The build uses `/Personal-Portfolio-Website/` as its base path, while local and DigitalOcean builds continue to use `/`.

One-time repository setting:

1. Open **Settings → Pages** in GitHub.
2. Under **Build and deployment**, select **GitHub Actions** as the source.
3. Run **Actions → Deploy GitHub Pages → Run workflow**, or push to `main`.

The production URL is:

```text
https://sandip258.github.io/Personal-Portfolio-Website/
```

GitHub Pages is available for public repositories on GitHub Free and does not require a hosting payment method.

## Deploy to DigitalOcean App Platform

This repository includes [`.do/app.yaml`](.do/app.yaml) for a frontend-only Static Site. The YouTube API job stays in GitHub Actions; the DigitalOcean build does not need `YOUTUBE_API_KEY`.

### Dashboard setup

1. In DigitalOcean, open **App Platform → Create App** and connect GitHub.
2. Select `Sandip258/Personal-Portfolio-Website` and branch `main`.
3. Set the resource type to **Static Site**.
4. Set the build command to `npm run build`.
5. Set the output directory to `dist` and the route to `/`.
6. Keep automatic deployment enabled if every push to `main` should publish.
7. Create the app and verify the generated `.ondigitalocean.app` URL.
8. Add the final custom domain under the app's **Settings → Domains**, follow the displayed DNS instructions, and update `YOUR_DOMAIN` in the site metadata.

DigitalOcean currently documents a free tier for up to three apps that consist only of static-site components. Static sites are served through its global CDN and do not have a selectable region. Review the latest [App Platform pricing](https://docs.digitalocean.com/products/app-platform/details/pricing/) before launch because terms can change. See also the official guides to [create an app](https://docs.digitalocean.com/products/app-platform/how-to/create-apps/) and [manage static sites](https://docs.digitalocean.com/products/app-platform/how-to/manage-static-sites/).

### Deploy from the app spec

With the [DigitalOcean CLI](https://docs.digitalocean.com/reference/doctl/how-to/install/) authenticated:

```bash
doctl apps create --spec .do/app.yaml
```

For an existing app, replace `<APP_ID>` after reviewing the diff:

```bash
doctl apps update <APP_ID> --spec .do/app.yaml
```

The spec points to the public GitHub repository and deploys the `main` branch. If the repository is private, connect the GitHub account in App Platform and authorize repository access first.

## Repository map

```text
src/components/               Shared UI controls
src/sections/                 Page sections
src/data/content.ts           Portfolio copy, links, and media configuration
src/data/channelMetrics.ts    Channel Desk types and placeholder data
src/lib/                      Data loading and transformation
src/styles/                   Theme and responsive styles
scripts/                      Server-side public-metric refresh and channel config
public/data/                  Browser-readable current and historical snapshots
.github/workflows/            Daily refresh automation
.github/workflows/deploy-github-pages.yml  GitHub Pages release workflow
.do/app.yaml                  DigitalOcean static-site specification
docs/architecture/            Numbered architecture decision records
```

## Security and publishing checklist

- Confirm all displayed achievements and channel relationships with Sandip.
- Keep `publicDisplayApproved` false until channel publication is authorized.
- Search for placeholder tokens and replace only those with confirmed values.
- Confirm `.env` is ignored and no secrets appear in `git diff --cached`.
- Run the full quality command set and test at 320, 375, 390, 768, and 1024 px plus a large desktop.
- Check light/dark mode, keyboard navigation, focus visibility, form behavior, external links, and browser console output.
- Verify the live deployment after every configuration change.

## Architecture

Key decisions and their trade-offs are recorded in [`docs/architecture/`](docs/architecture/). Start with [ADR 001](docs/architecture/001-react-vite-typescript.md).
