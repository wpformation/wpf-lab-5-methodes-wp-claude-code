#!/usr/bin/env node
/*
 * Capture desktop (1440x900) et mobile (375x812) d'une URL donnée.
 *
 * Usage :
 *   node scripts/screenshot.js <url> <slug-base>
 *
 * Exemple :
 *   node scripts/screenshot.js https://test.wpformation.com/lab-accueil-claudeus scenario-01-claudeus
 *
 * Produit :
 *   captures/scenario-01-claudeus-desktop.png
 *   captures/scenario-01-claudeus-mobile.png
 *
 * Pré-requis : npx playwright install chromium (une fois au démarrage du projet).
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function main() {
  const [,, url, slugBase] = process.argv;

  if (!url || !slugBase) {
    console.error('Usage: node scripts/screenshot.js <url> <slug-base>');
    process.exit(1);
  }

  const capturesDir = path.resolve(__dirname, '..', 'captures');
  if (!fs.existsSync(capturesDir)) {
    fs.mkdirSync(capturesDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });

  try {
    const desktopCtx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      userAgent: 'Mozilla/5.0 (WPF-AI-LAB Playwright desktop)',
    });
    const desktopPage = await desktopCtx.newPage();
    await desktopPage.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await desktopPage.waitForTimeout(1500);
    const desktopPath = path.join(capturesDir, `${slugBase}-desktop.png`);
    await desktopPage.screenshot({ path: desktopPath, fullPage: true });
    console.log(`OK desktop: ${desktopPath}`);
    await desktopCtx.close();

    const mobileCtx = await browser.newContext({
      viewport: { width: 375, height: 812 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
    });
    const mobilePage = await mobileCtx.newPage();
    await mobilePage.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await mobilePage.waitForTimeout(1500);
    const mobilePath = path.join(capturesDir, `${slugBase}-mobile.png`);
    await mobilePage.screenshot({ path: mobilePath, fullPage: true });
    console.log(`OK mobile: ${mobilePath}`);
    await mobileCtx.close();
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
