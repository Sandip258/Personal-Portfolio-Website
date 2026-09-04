# ADR 005: Server-side scheduled public metrics

- Status: Accepted
- Date: 2026-09-05

## Context

The Channel Desk needs current public YouTube statistics. Calling the YouTube Data API from browser code would expose the API key, couple page availability to the API, and consume quota on visitor traffic.

## Decision

Run a Node.js refresh script on a daily GitHub Actions schedule. Store `YOUTUBE_API_KEY` only in the Actions secret or an untracked local `.env`. Commit a browser-readable public JSON dataset that the static frontend fetches.

## Consequences

- Visitors never receive the API key and do not consume API quota.
- Displayed public data is as recent as the last successful scheduled run rather than request-time live.
- The workflow needs repository contents write permission to commit updated snapshots.
- Adding a channel requires an exact ID and explicit `publicDisplayApproved` confirmation.
- Private Analytics remains out of scope until OAuth, secure token storage, and owner approval exist.

