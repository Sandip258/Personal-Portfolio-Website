import {
  channelMetricsPlaceholder,
  type ChannelMetricValue,
  type ChannelMetricsDataset,
} from "../data/channelMetrics";

const METRICS_URL = "/data/channel-metrics.json";

function isMetricsDataset(value: unknown): value is ChannelMetricsDataset {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<ChannelMetricsDataset>;
  return (
    candidate.schemaVersion === 1 &&
    candidate.source === "public-youtube-data-api" &&
    Array.isArray(candidate.channels)
  );
}

/**
 * Loads the committed public snapshot. Failure is intentionally non-fatal:
 * the Channel Desk can always render an honest, labelled placeholder state.
 */
export async function loadChannelMetrics(
  signal?: AbortSignal,
): Promise<ChannelMetricsDataset> {
  try {
    const response = await fetch(METRICS_URL, {
      headers: { Accept: "application/json" },
      signal,
    });
    if (!response.ok) return channelMetricsPlaceholder;

    const payload: unknown = await response.json();
    return isMetricsDataset(payload) ? payload : channelMetricsPlaceholder;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    return channelMetricsPlaceholder;
  }
}

export function formatChannelMetric(value: ChannelMetricValue): string {
  if (value === null) return "—";
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return "—";

  return new Intl.NumberFormat("en", {
    notation: numericValue >= 10_000 ? "compact" : "standard",
    maximumFractionDigits: numericValue >= 10_000 ? 1 : 0,
  }).format(numericValue);
}

export function formatMetricMovement(value: ChannelMetricValue): string {
  if (value === null) return "Not enough history";
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return "Not enough history";
  const prefix = numericValue > 0 ? "+" : "";
  return `${prefix}${new Intl.NumberFormat("en", {
    notation: Math.abs(numericValue) >= 10_000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(numericValue)}`;
}

export function formatLastUpdated(isoDate: string | null): string {
  if (!isoDate) return "Awaiting first sync";
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "Update time unavailable";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
