/**
 * Public Channel Desk data contract.
 *
 * YouTube returns counters as decimal strings. Keeping them as strings avoids
 * precision loss and makes it explicit that the UI must format, not calculate
 * with, the raw values.
 */
export type ChannelMetricValue = string | null;

export type ChannelRefreshStatus =
  | "ok"
  | "stale"
  | "unavailable"
  | "config-required";

export interface ChannelStatistics {
  subscribers: ChannelMetricValue;
  totalViews: ChannelMetricValue;
  videoCount: ChannelMetricValue;
  hiddenSubscriberCount: boolean;
}

export interface ChannelUpload {
  videoId: string;
  title: string;
  publishedAt: string;
  thumbnailUrl: string | null;
  url: string;
}

export interface PublishingCadence {
  uploadsLast7Days: number | null;
  uploadsLast30Days: number | null;
  averagePerWeek: number | null;
  label: string;
}

export interface MetricMovement {
  baselineAt: string;
  subscribers: ChannelMetricValue;
  totalViews: ChannelMetricValue;
  videoCount: ChannelMetricValue;
}

export interface ChannelTrends {
  days7: MetricMovement | null;
  days30: MetricMovement | null;
}

export interface ChannelMetricRecord {
  key: string;
  displayName: string;
  channelId: string | null;
  publicUrl: string | null;
  relationship: string;
  status: ChannelRefreshStatus;
  statusMessage: string;
  lastSuccessfulSyncAt: string | null;
  statistics: ChannelStatistics;
  latestUploads: ChannelUpload[];
  cadence: PublishingCadence;
  trends: ChannelTrends;
}

export interface ChannelMetricsDataset {
  schemaVersion: 1;
  generatedAt: string | null;
  source: "public-youtube-data-api";
  refreshStatus: "placeholder" | "ok" | "partial" | "error";
  channels: ChannelMetricRecord[];
}

const emptyStatistics: ChannelStatistics = {
  subscribers: null,
  totalViews: null,
  videoCount: null,
  hiddenSubscriberCount: false,
};

const emptyCadence: PublishingCadence = {
  uploadsLast7Days: null,
  uploadsLast30Days: null,
  averagePerWeek: null,
  label: "Awaiting first public-data sync",
};

/** Safe render-time fallback before real, approved channel IDs are configured. */
export const channelMetricsPlaceholder: ChannelMetricsDataset = {
  schemaVersion: 1,
  generatedAt: null,
  source: "public-youtube-data-api",
  refreshStatus: "placeholder",
  channels: [
    {
      key: "campus-chronicles",
      displayName: "Campus Chronicles",
      channelId: null,
      publicUrl: null,
      relationship: "Owned channel · full case study",
      status: "config-required",
      statusMessage: "Public channel ID awaiting confirmation",
      lastSuccessfulSyncAt: null,
      statistics: { ...emptyStatistics },
      latestUploads: [],
      cadence: { ...emptyCadence },
      trends: { days7: null, days30: null },
    },
    {
      key: "class-10-endgame",
      displayName: "Class 10 Endgame",
      channelId: null,
      publicUrl: null,
      relationship: "Selected managed work · public data only",
      status: "config-required",
      statusMessage: "Display approval and channel ID awaiting confirmation",
      lastSuccessfulSyncAt: null,
      statistics: { ...emptyStatistics },
      latestUploads: [],
      cadence: { ...emptyCadence },
      trends: { days7: null, days30: null },
    },
    {
      key: "icse-9-10",
      displayName: "ICSE 9 & 10",
      channelId: null,
      publicUrl: null,
      relationship: "Selected managed work · public data only",
      status: "config-required",
      statusMessage: "Display approval and channel ID awaiting confirmation",
      lastSuccessfulSyncAt: null,
      statistics: { ...emptyStatistics },
      latestUploads: [],
      cadence: { ...emptyCadence },
      trends: { days7: null, days30: null },
    },
  ],
};
