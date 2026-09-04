# Channel Desk API notes

The browser never calls YouTube. It reads the committed public snapshot at
`/data/channel-metrics.json`; the API key is used only by the Node refresh job.

## Enable Phase 1 public metrics

1. In Google Cloud, enable **YouTube Data API v3** and create an API key. Restrict
   the key to that API. Do not name it with a `VITE_` prefix.
2. Confirm which managed channels may be shown publicly.
3. In `scripts/youtube-channels.json`, add each exact YouTube channel ID and set
   `publicDisplayApproved` to `true` only after approval. Channel IDs and public
   statistics are not secrets; approval is still required before publishing them.
4. Put `YOUTUBE_API_KEY` in local `.env` or in the GitHub repository
   Actions secret named `YOUTUBE_API_KEY`.
5. Run `node scripts/refresh-youtube-metrics.mjs` (the root package should expose
   this as `npm run metrics:refresh`).

The scheduled workflow runs daily at 03:17 UTC. A successful run updates the
current JSON and adds a timestamped historical snapshot. Seven- and 30-day
movements appear once an old-enough saved baseline exists.

If one approved channel fails, the job keeps that channel's last valid values,
marks it `stale`, and continues refreshing the others. Error messages never log
the request URL or key. Until IDs and approval exist, the UI receives explicitly
labelled placeholder records rather than fabricated live numbers.

## Phase 2 (not enabled)

Private Analytics metrics such as impressions, CTR, average view duration, watch
time, and subscriber gains require OAuth and explicit authorization from each
channel owner. Do not add employer-managed channels or OAuth tokens without that
approval. Tokens belong in encrypted server-side storage, never in the repository,
GitHub artifacts, `public/`, or client-side environment variables.
