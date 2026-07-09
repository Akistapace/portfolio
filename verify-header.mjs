import { chromium } from 'playwright'

const url = 'http://localhost:5177/portfolio/'
const outDir = 'C:\\Users\\ferna\\AppData\\Local\\Temp\\claude\\c--Users-ferna-portfolio\\deddf92e-82bb-4f63-87bf-4f066e2928b6\\scratchpad'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1400, height: 500 } })
await page.goto(url, { waitUntil: 'networkidle' })
await page.waitForTimeout(2000)
await page.screenshot({ path: `${outDir}/header-light.png` })

await page.evaluate(() => document.documentElement.classList.add('dark'))
await page.waitForTimeout(1500)
await page.screenshot({ path: `${outDir}/header-dark.png` })

await browser.close()
