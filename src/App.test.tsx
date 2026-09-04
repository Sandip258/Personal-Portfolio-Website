import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { channelMetricsPlaceholder } from './data/channelMetrics'

describe('portfolio application', () => {
  beforeEach(() => {
    document.documentElement.dataset.theme = 'light'
    localStorage.clear()
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => channelMetricsPlaceholder,
    }))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders the core proof, service and conversion content', async () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /I turn audience insight into/i, level: 1 })).toBeInTheDocument()
    expect(screen.getByText('13.07M')).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { name: 'Class 10 Endgame' })).toHaveLength(2)
    expect(screen.getByRole('heading', { name: 'Channel Growth Reset' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Tell me the channel/i })).toBeInTheDocument()

    await waitFor(() => expect(fetch).toHaveBeenCalledWith('/data/channel-metrics.json', expect.any(Object)))
    expect(screen.getByText('Channel data is not connected yet.')).toBeInTheDocument()
  })

  it('supports the mobile menu and Escape-key dismissal', async () => {
    render(<App />)
    await screen.findByText('Channel data is not connected yet.')
    const menuButton = screen.getByRole('button', { name: 'Open navigation menu' })

    menuButton.focus()
    fireEvent.click(menuButton)
    expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    fireEvent.keyDown(window, { key: 'Escape' })
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    expect(menuButton).toHaveFocus()
  })

  it('persists a manually selected theme', async () => {
    render(<App />)
    await screen.findByText('Channel data is not connected yet.')
    fireEvent.click(screen.getByRole('button', { name: 'Switch to dark theme' }))

    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(localStorage.getItem('sandip-theme')).toBe('dark')
    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument()
  })

  it('keeps an unconfigured project form on-page and explains the placeholder state', async () => {
    render(<App />)
    await screen.findByText('Channel data is not connected yet.')
    const submitButton = screen.getByRole('button', { name: /Send project brief/i })
    const form = submitButton.closest('form')
    expect(form).not.toBeNull()

    fireEvent.submit(form!)
    expect(screen.getByText(/Add the production form endpoint/i)).toBeInTheDocument()
  })
})
