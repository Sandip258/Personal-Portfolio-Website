import { useEffect, useState } from 'react';
import type { ChannelMetricRecord, ChannelMetricsDataset, MetricMovement } from '../data/channelMetrics';
import { channelMetricsPlaceholder } from '../data/channelMetrics';
import { formatChannelMetric, formatLastUpdated, formatMetricMovement, loadChannelMetrics } from '../lib/channelMetrics';
import { ArrowIcon } from '../components/ArrowIcon';

interface ChannelDeskCopy {
  eyebrow: string;
  title: string;
  description: string;
  connectedLabel: string;
  partialLabel: string;
  configurationLabel: string;
  unavailableLabel: string;
  loadingLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  staleLabel: string;
  updatedLabel: string;
  cadenceLabel: string;
  trend7DayLabel: string;
  trend30DayLabel: string;
  privacyNote: string;
}

function Trend({ label, movement }: { label: string; movement: MetricMovement | null }) {
  return (
    <div className="channel-trend">
      <span>{label}</span>
      <strong>{formatMetricMovement(movement?.totalViews ?? null)} views</strong>
    </div>
  );
}

function ChannelCard({ channel, copy }: { channel: ChannelMetricRecord; copy: ChannelDeskCopy }) {
  return (
    <article className="channel-card">
      <div className="channel-card__identity">
        <div>
          <h3>{channel.displayName}</h3>
          <p>{channel.relationship}</p>
        </div>
        <span className={`channel-state channel-state--${channel.status}`}>{channel.status === 'ok' ? 'Live' : channel.status.replace('-', ' ')}</span>
      </div>
      <dl className="channel-card__metrics">
        <div><dt>Subscribers</dt><dd>{channel.statistics.hiddenSubscriberCount ? 'Hidden' : formatChannelMetric(channel.statistics.subscribers)}</dd></div>
        <div><dt>Total views</dt><dd>{formatChannelMetric(channel.statistics.totalViews)}</dd></div>
        <div><dt>Videos</dt><dd>{formatChannelMetric(channel.statistics.videoCount)}</dd></div>
      </dl>
      <div className="channel-card__rail" aria-label="Recent public performance movement">
        <Trend label={copy.trend7DayLabel} movement={channel.trends.days7} />
        <Trend label={copy.trend30DayLabel} movement={channel.trends.days30} />
        <div className="channel-trend"><span>{copy.cadenceLabel}</span><strong>{channel.cadence.label}</strong></div>
      </div>
      {channel.latestUploads.length > 0 && (
        <div className="channel-uploads">
          <p className="meta-label">Latest uploads</p>
          <div className="channel-uploads__list">
            {channel.latestUploads.slice(0, 3).map((upload) => (
              <a href={upload.url} target="_blank" rel="noreferrer" key={upload.videoId}>
                {upload.thumbnailUrl && <img src={upload.thumbnailUrl} alt="" loading="lazy" />}
                <span>{upload.title}</span>
              </a>
            ))}
          </div>
        </div>
      )}
      <div className="channel-card__footer">
        <span>{channel.statusMessage}</span>
        {channel.publicUrl && <a className="text-link" href={channel.publicUrl} target="_blank" rel="noreferrer">Open channel<ArrowIcon /></a>}
      </div>
    </article>
  );
}

export function ChannelDesk({ copy }: { copy: ChannelDeskCopy }) {
  const [data, setData] = useState<ChannelMetricsDataset>(channelMetricsPlaceholder);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    loadChannelMetrics(controller.signal)
      .then((nextData) => {
        if (!controller.signal.aborted) setData(nextData);
      })
      .catch(() => {
        // Abort is expected during unmount; other failures already map to the safe placeholder.
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  const waiting = data.refreshStatus === 'placeholder';
  const connected = data.refreshStatus === 'ok' || data.refreshStatus === 'partial';
  const statusLabel = loading
    ? copy.loadingLabel
    : data.refreshStatus === 'ok'
      ? copy.connectedLabel
      : data.refreshStatus === 'partial'
        ? copy.partialLabel
        : data.refreshStatus === 'error'
          ? copy.unavailableLabel
          : copy.configurationLabel;

  return (
    <section className="section shell" id="channel-desk" aria-labelledby="channel-desk-heading">
      <div className="channel-desk">
        <header className="channel-desk__head">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 id="channel-desk-heading">{copy.title}</h2>
            <p>{copy.description}</p>
          </div>
          <div className="channel-desk__status" aria-live="polite">
            <span className={connected && !loading ? 'live-label' : 'meta-label'}>{statusLabel}</span>
            <span>{copy.updatedLabel}: {formatLastUpdated(data.generatedAt)}</span>
          </div>
        </header>

        {waiting && !loading && (
          <div className="channel-desk__empty">
            <strong>{copy.emptyTitle}</strong>
            <span>{copy.emptyDescription}</span>
          </div>
        )}

        <div className={`channel-list ${loading ? 'channel-list--loading' : ''}`} aria-busy={loading}>
          {data.channels.map((channel) => <ChannelCard key={channel.key} channel={channel} copy={copy} />)}
        </div>
        <p className="channel-desk__privacy">{copy.privacyNote}</p>
      </div>
    </section>
  );
}
