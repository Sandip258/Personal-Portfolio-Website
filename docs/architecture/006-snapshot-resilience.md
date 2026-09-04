# ADR 006: Timestamped snapshots and partial-failure resilience

- Status: Accepted
- Date: 2026-09-05

## Context

A channel lookup can fail independently because of configuration, quota, deletion, or transient API errors. One failure must not erase good data for every channel. Trend values also need historical observations.

## Decision

Write a current dataset plus timestamped history. Refresh channels independently. When an approved channel fails, retain its previous valid record when available, mark it stale, log a sanitized reason, and continue. Calculate 7/30-day movement only when a sufficiently old saved baseline exists.

## Consequences

- The page remains useful during partial upstream failure and labels data quality honestly.
- Trend charts are based on durable snapshots rather than invented interpolation.
- History grows by one file per completed refresh and may need a retention policy if repository size becomes material.
- Logs must never include a request URL because it contains the API key.

