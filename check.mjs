import { chromium } from 'playwright-core';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://www.areumco.com.br/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2000);
const info = await page.evaluate(() => {
  const secs = [...document.querySelectorAll('section, footer, [id]')];
  return secs.map(s => ({
    id: s.id || '(sem id)',
    tag: s.tagName.toLowerCase(),
    h: Math.round(s.getBoundingClientRect().height),
    textLen: (s.innerText || '').trim().length
  })).filter(x => x.h > 50);
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
