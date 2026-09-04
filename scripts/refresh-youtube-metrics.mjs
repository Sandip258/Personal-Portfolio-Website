import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "..");
const outputDirectory = path.join(repositoryRoot, "public", "data");
const historyDirectory = path.join(outputDirectory, "channel-metrics-history");
const currentFile = path.join(outputDirectory, "channel-metrics.json");
const configFile = path.resolve(
  repositoryRoot,
  process.env.YOUTUBE_CHANNEL_CONFIG || "scripts/youtube-channels.json",
);

// Node 22 can load a local environment file without a third-party dependency.
// GitHub Actions and DigitalOcean inject the same variable directly.
try {
  process.loadEnvFile(path.join(repositoryRoot, ".env"));
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}

const apiKey = process.env.YOUTUBE_API_KEY;
const now = new Date();
const nowIso = now.toISOString();

if (!apiKey) {
  console.error("YOUTUBE_API_KEY is required. No output files were changed.");
  process.exit(1);
}

const clientExposedKeyName = Object.keys(process.env).find(
  (name) => name.startsWith("VITE_") && name.includes("YOUTUBE") && name.includes("KEY"),
);
if (clientExposedKeyName) {
  console.error(`Refusing client-exposed secret variable ${clientExposedKeyName}. Use server-only YOUTUBE_API_KEY.`);
  process.exit(1);
}

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function validateConfig(config) {
  if (!Array.isArray(config)) throw new Error("Channel config must be a JSON array.");
  const seen = new Set();
  for (const channel of config) {
    if (!channel || typeof channel !== "object") throw new Error("Each channel config must be an object.");
    if (!channel.key || !channel.displayName) throw new Error("Each channel requires key and displayName.");
    if (seen.has(channel.key)) throw new Error(`Duplicate channel key: ${channel.key}`);
    seen.add(channel.key);
  }
  return config;
}

async function youtubeRequest(resource, parameters) {
  const url = new URL(`https://www.googleapis.com/youtube/v3/${resource}`);
  for (const [key, value] of Object.entries(parameters)) url.searchParams.set(key, value);
  url.searchParams.set("key", apiKey);

  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) {
    let reason = `HTTP ${response.status}`;
    try {
      const payload = await response.json();
      reason = payload?.error?.errors?.[0]?.reason || payload?.error?.message || reason;
    } catch {
      // Use the status-only error. Never print the request URL because it has the API key.
    }
    throw new Error(reason);
  }
  return response.json();
}

function emptyRecord(config, status, statusMessage) {
  return {
    key: config.key,
    displayName: config.displayName,
    channelId: config.channelId || null,
    publicUrl: config.channelId ? `https://www.youtube.com/channel/${config.channelId}` : null,
    relationship: config.relationship || "Public channel data",
    status,
    statusMessage,
    lastSuccessfulSyncAt: null,
    statistics: { subscribers: null, totalViews: null, videoCount: null, hiddenSubscriberCount: false },
    latestUploads: [],
    cadence: {
      uploadsLast7Days: null,
      uploadsLast30Days: null,
      averagePerWeek: null,
      label: "Awaiting first public-data sync",
    },
    trends: { days7: null, days30: null },
  };
}

function calculateCadence(uploads) {
  const ageInDays = (publishedAt) => (now.getTime() - new Date(publishedAt).getTime()) / 86_400_000;
  const uploadsLast7Days = uploads.filter((upload) => {
    const age = ageInDays(upload.publishedAt);
    return age >= 0 && age <= 7;
  }).length;
  const uploadsLast30Days = uploads.filter((upload) => {
    const age = ageInDays(upload.publishedAt);
    return age >= 0 && age <= 30;
  }).length;
  const averagePerWeek = Number(((uploadsLast30Days / 30) * 7).toFixed(1));
  let label = "No uploads in the last 30 days";
  if (uploadsLast30Days > 0) label = `${averagePerWeek} uploads/week · trailing 30 days`;
  return { uploadsLast7Days, uploadsLast30Days, averagePerWeek, label };
}

async function fetchRecentUploads(playlistId) {
  const uploads = [];
  let pageToken;

  // Read enough pages to cover the trailing 30-day cadence window. The hard cap
  // prevents an unexpected playlist response from consuming unbounded quota.
  for (let page = 0; page < 10; page += 1) {
    const parameters = {
      part: "snippet,contentDetails",
      playlistId,
      maxResults: "50",
    };
    if (pageToken) parameters.pageToken = pageToken;
    const payload = await youtubeRequest("playlistItems", parameters);

    const pageUploads = (payload.items || []).map((item) => {
      const videoId = item.contentDetails?.videoId || item.snippet?.resourceId?.videoId;
      const thumbnails = item.snippet?.thumbnails || {};
      const thumbnail = thumbnails.medium || thumbnails.high || thumbnails.default;
      return {
        videoId,
        title: item.snippet?.title || "Untitled upload",
        publishedAt: item.contentDetails?.videoPublishedAt || item.snippet?.publishedAt,
        thumbnailUrl: thumbnail?.url || null,
        url: `https://www.youtube.com/watch?v=${videoId}`,
      };
    }).filter((upload) => upload.videoId && upload.publishedAt);

    uploads.push(...pageUploads);
    const oldestOnPage = pageUploads.at(-1)?.publishedAt;
    const coversThirtyDays = oldestOnPage
      && now.getTime() - new Date(oldestOnPage).getTime() >= 30 * 86_400_000;
    pageToken = payload.nextPageToken;
    if (!pageToken || coversThirtyDays) break;
  }

  return uploads;
}

async function fetchChannel(config) {
  const channelPayload = await youtubeRequest("channels", {
    part: "snippet,statistics,contentDetails",
    id: config.channelId,
  });
  const channel = channelPayload.items?.[0];
  if (!channel) throw new Error("Channel was not found or is not public");

  const uploadsPlaylist = channel.contentDetails?.relatedPlaylists?.uploads;
  const recentUploads = uploadsPlaylist ? await fetchRecentUploads(uploadsPlaylist) : [];

  const hiddenSubscriberCount = Boolean(channel.statistics?.hiddenSubscriberCount);
  return {
    key: config.key,
    displayName: config.displayName,
    channelId: channel.id,
    publicUrl: `https://www.youtube.com/channel/${channel.id}`,
    relationship: config.relationship || "Public channel data",
    status: "ok",
    statusMessage: "Public YouTube data synced",
    lastSuccessfulSyncAt: nowIso,
    statistics: {
      subscribers: hiddenSubscriberCount ? null : channel.statistics?.subscriberCount || null,
      totalViews: channel.statistics?.viewCount || null,
      videoCount: channel.statistics?.videoCount || null,
      hiddenSubscriberCount,
    },
    latestUploads: recentUploads.slice(0, 6),
    cadence: calculateCadence(recentUploads),
    trends: { days7: null, days30: null },
  };
}

async function loadHistory() {
  await mkdir(historyDirectory, { recursive: true });
  const fileNames = await readdir(historyDirectory);
  const snapshots = await Promise.all(
    fileNames
      .filter((name) => name.endsWith(".json"))
      .map((name) => readJson(path.join(historyDirectory, name), null)),
  );
  return snapshots.filter((snapshot) => snapshot?.generatedAt && Array.isArray(snapshot.channels));
}

function subtractDecimalStrings(current, previous) {
  if (current === null || previous === null || current === undefined || previous === undefined) return null;
  try {
    return (BigInt(current) - BigInt(previous)).toString();
  } catch {
    return null;
  }
}

function movementFrom(channel, baselineSnapshot) {
  if (!baselineSnapshot) return null;
  const baseline = baselineSnapshot.channels.find((item) => item.key === channel.key && item.status === "ok");
  if (!baseline) return null;
  return {
    baselineAt: baselineSnapshot.generatedAt,
    subscribers: subtractDecimalStrings(channel.statistics.subscribers, baseline.statistics?.subscribers),
    totalViews: subtractDecimalStrings(channel.statistics.totalViews, baseline.statistics?.totalViews),
    videoCount: subtractDecimalStrings(channel.statistics.videoCount, baseline.statistics?.videoCount),
  };
}

function baselineFor(history, days) {
  const cutoff = now.getTime() - days * 86_400_000;
  return history
    .filter((snapshot) => new Date(snapshot.generatedAt).getTime() <= cutoff)
    .sort((left, right) => new Date(right.generatedAt) - new Date(left.generatedAt))[0] || null;
}

const config = validateConfig(await readJson(configFile, null));
const previousDataset = await readJson(currentFile, { channels: [] });
const history = await loadHistory();
if (previousDataset?.generatedAt) history.push(previousDataset);
const previousByKey = new Map((previousDataset.channels || []).map((channel) => [channel.key, channel]));

const results = await Promise.all(
  config.map(async (channelConfig) => {
    if (!channelConfig.publicDisplayApproved) {
      return emptyRecord(channelConfig, "config-required", "Public display approval awaiting confirmation");
    }
    if (!channelConfig.channelId) {
      return emptyRecord(channelConfig, "config-required", "Public channel ID awaiting confirmation");
    }

    try {
      const channel = await fetchChannel(channelConfig);
      console.log(`[ok] ${channelConfig.key}`);
      return channel;
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Unknown API error";
      console.error(`[failed] ${channelConfig.key}: ${reason}`);
      const previous = previousByKey.get(channelConfig.key);
      if (previous?.lastSuccessfulSyncAt && previous?.statistics) {
        return {
          ...previous,
          displayName: channelConfig.displayName,
          relationship: channelConfig.relationship || previous.relationship,
          status: "stale",
          statusMessage: `Refresh failed; showing last valid public snapshot (${reason})`,
        };
      }
      return emptyRecord(channelConfig, "unavailable", `Public data unavailable (${reason})`);
    }
  }),
);

const baseline7 = baselineFor(history, 7);
const baseline30 = baselineFor(history, 30);
for (const channel of results) {
  if (channel.status === "ok" || channel.status === "stale") {
    channel.trends = {
      days7: movementFrom(channel, baseline7),
      days30: movementFrom(channel, baseline30),
    };
  }
}

const approved = config.filter((channel) => channel.publicDisplayApproved);
const successfulCount = results.filter((channel) => channel.status === "ok").length;
const refreshStatus = approved.length === 0
  ? "placeholder"
  : successfulCount === approved.length
    ? "ok"
    : successfulCount > 0
      ? "partial"
      : "error";

const dataset = {
  schemaVersion: 1,
  generatedAt: nowIso,
  source: "public-youtube-data-api",
  refreshStatus,
  channels: results,
};

await mkdir(historyDirectory, { recursive: true });
const serialized = `${JSON.stringify(dataset, null, 2)}\n`;
await writeFile(currentFile, serialized, "utf8");
const timestamp = nowIso.replaceAll(":", "-").replace(".000Z", "Z");
await writeFile(path.join(historyDirectory, `${timestamp}.json`), serialized, "utf8");
console.log(`Wrote ${results.length} channels; refresh status: ${refreshStatus}`);
