import { chromium } from 'playwright-core';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://www.areumco.com.br/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(3000);
// check announcement bar
const bar = await page.textContent('body').then(t => t.includes('FRETE PROMOCIONAL'));
// check UGC section
const ugc = await page.evaluate(() => {
  const s = document.getElementById('videos');
  const vids = s ? [...s.querySelectorAll('video')] : [];
  return { exists: !!s, count: vids.length, srcs: vids.map(v => v.getAttribute('src')) };
});
// check whatsapp
const wa = await page.evaluate(() => !!document.querySelector('a[href*="wa.me"]'));
console.log(JSON.stringify({ bar, ugc, wa }, null, 1));
await page.screenshot({ path: '/c/tmp/screens/desktop-v2-top.png' });
await browser.close();
