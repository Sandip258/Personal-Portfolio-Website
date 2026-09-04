import { describe, expect, it } from 'vitest'
import {
  formatChannelMetric,
  formatLastUpdated,
  formatMetricMovement,
} from './channelMetrics'

describe('channel metric formatters', () => {
  it('formats public counters without inventing missing values', () => {
    expect(formatChannelMetric('13070000')).toBe('13.1M')
    expect(formatChannelMetric(null)).toBe('—')
    expect(formatChannelMetric('not-a-number')).toBe('—')
  })

  it('labels movement and invalid history clearly', () => {
    expect(formatMetricMovement('1200')).toBe('+1,200')
    expect(formatMetricMovement('-20')).toBe('-20')
    expect(formatMetricMovement(null)).toBe('Not enough history')
  })

  it('handles absent and invalid update timestamps', () => {
    expect(formatLastUpdated(null)).toBe('Awaiting first sync')
    expect(formatLastUpdated('not-a-date')).toBe('Update time unavailable')
  })
})
