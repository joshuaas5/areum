import { chromium } from 'playwright-core';
const url = 'https://www.areumco.com.br/';
const tries = [
  { name: 'msedge', args: [] },
  { name: 'chrome', args: [] },
];
let browser = null;
for (const t of tries) {
  try {
    browser = await chromium.launch({ channel: t.name, headless: true });
    console.log('browser:', t.name);
    break;
  } catch (e) { console.log(t.name, 'failed:', e.message.split('\n')[0]); }
}
if (!browser) { console.error('NO BROWSER'); process.exit(1); }

// DESKTOP
let ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
let page = await ctx.newPage();
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2500);
await page.screenshot({ path: '/tmp/screens/desktop-top.png' });
await page.screenshot({ path: '/tmp/screens/desktop-full.png', fullPage: true });

// MOBILE (iPhone-ish)
ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
page = await ctx.newPage();
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2500);
await page.screenshot({ path: '/tmp/screens/mobile-top.png' });
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
await page.waitForTimeout(1200);
await page.screenshot({ path: '/tmp/screens/mobile-mid.png' });
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1200);
await page.screenshot({ path: '/tmp/screens/mobile-end.png' });
await browser.close();
console.log('DONE');
