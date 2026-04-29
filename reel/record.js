// Headless capture of reel/index.html into a WebM at 1080×1920.
// Run: node record.js
// Output: reel.webm in this directory.

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const WIDTH = 1080;
const HEIGHT = 1920;
const FPS = 60;
// Total runtime of the reel: title 2.8s + 6 posts (5.4+5.4+5.8+5.2+5.6+5.2) + outro 4.6s = 40.0s
// Plus the 800ms auto-start delay → ~40.8s. Record 43s for safety, then trim.
const RECORD_MS = 43_000;

(async () => {
  const url = 'file://' + path.resolve(__dirname, 'index.html') + '?record=1';
  // Use a fresh, unique capture dir per run to avoid clobbering / picking up
  // stale .webm files from previous runs.
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outDir = path.resolve(__dirname, 'capture-' + stamp);
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--font-render-hinting=none',
      '--force-color-profile=srgb',
    ],
  });

  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
    recordVideo: {
      dir: outDir,
      size: { width: WIDTH, height: HEIGHT },
    },
  });

  const page = await context.newPage();
  console.log('Loading page...');
  await page.goto(url, { waitUntil: 'load' });

  // Wait for fonts to be ready so the first card renders cleanly
  await page.evaluate(() => document.fonts.ready);
  // Tiny additional settle
  await page.waitForTimeout(300);

  console.log(`Recording for ${RECORD_MS}ms at ${WIDTH}x${HEIGHT}@${FPS}fps...`);
  await page.waitForTimeout(RECORD_MS);

  await page.close();
  await context.close();
  await browser.close();

  // Find the produced webm
  const files = fs.readdirSync(outDir).filter((f) => f.endsWith('.webm'));
  if (!files.length) {
    console.error('No video produced.');
    process.exit(1);
  }
  const src = path.join(outDir, files[0]);
  const dst = path.resolve(__dirname, 'reel-' + stamp + '.webm');
  fs.renameSync(src, dst);
  // Clean up the now-empty capture dir.
  try { fs.rmdirSync(outDir); } catch {}
  console.log('Wrote', dst);
  // Emit just the path on the last line so the shell can capture it.
  console.log('OUTPUT_PATH=' + dst);
})();
