import { access, mkdir, writeFile } from 'node:fs/promises'
import process from 'node:process'
import { chromium } from 'playwright-core'

const targetUrl = process.env.QA_URL || 'http://127.0.0.1:4173/'
const candidates = [
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean)

let executablePath
for (const candidate of candidates) {
  try {
    await access(candidate)
    executablePath = candidate
    break
  } catch {
    // Try the next known browser location.
  }
}

if (!executablePath) {
  console.error('No Chromium browser found. Set PLAYWRIGHT_CHROMIUM_EXECUTABLE and retry.')
  process.exit(1)
}

const cases = [
  { name: '320-light', width: 320, height: 800, colorScheme: 'light' },
  { name: '375-light', width: 375, height: 850, colorScheme: 'light' },
  { name: '390-dark', width: 390, height: 900, colorScheme: 'dark' },
  { name: '768-light', width: 768, height: 900, colorScheme: 'light' },
  { name: '1024-dark', width: 1024, height: 900, colorScheme: 'dark' },
  { name: '1440-light', width: 1440, height: 1000, colorScheme: 'light' },
]

await mkdir('qa-artifacts', { recursive: true })
const browser = await chromium.launch({ executablePath, headless: true })
const results = []

try {
  for (const testCase of cases) {
    const context = await browser.newContext({
      viewport: { width: testCase.width, height: testCase.height },
      colorScheme: testCase.colorScheme,
      reducedMotion: 'reduce',
    })
    const page = await context.newPage()
    const errors = []
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })
    page.on('pageerror', (error) => errors.push(error.message))

    const response = await page.goto(targetUrl, { waitUntil: 'networkidle' })
    const measurements = await page.evaluate(() => ({
      viewportWidth: document.documentElement.clientWidth,
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
      theme: document.documentElement.dataset.theme,
      heading: document.querySelector('h1')?.textContent?.trim() ?? '',
      brokenImages: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0).length,
    }))
    const horizontalOverflow = Math.max(measurements.documentWidth, measurements.bodyWidth) > measurements.viewportWidth

    await page.screenshot({ path: `qa-artifacts/${testCase.name}.png`, fullPage: true })
    results.push({
      ...testCase,
      status: response?.status() ?? null,
      ...measurements,
      horizontalOverflow,
      consoleErrors: errors,
    })
    await context.close()
  }
} finally {
  await browser.close()
}

await writeFile('qa-artifacts/report.json', `${JSON.stringify(results, null, 2)}\n`, 'utf8')
for (const result of results) {
  console.log(`${result.name}: HTTP ${result.status}; theme=${result.theme}; overflow=${result.horizontalOverflow}; brokenImages=${result.brokenImages}; consoleErrors=${result.consoleErrors.length}`)
}

if (results.some((result) => result.status !== 200 || result.horizontalOverflow || result.brokenImages || result.consoleErrors.length)) {
  process.exitCode = 1
}
