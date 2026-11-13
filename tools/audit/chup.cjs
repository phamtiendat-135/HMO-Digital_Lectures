// Chụp bằng chứng hiện trạng: mỗi animation ở 3 khung, giây 0/5/15, có chặn mạng.
// Dùng: node tools/audit/chup.cjs [slug…]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const GOC = path.resolve(__dirname, '../..');
const NGUON = {
  'hat-nuoc-quay-vong': 'Bai5_song_bien_hat_nuoc_quay_vong.html',
  'bien-dang-song-vo': 'bien_dang_song_vo.html',
  'song-than-hut-chim': 'song_than_hut_chim_1.html',
  'khuc-xa-song': 'khuc_xa_song_HMO.html',
  'kenh-sofar': 'Kenh SOFAR.html',
  'luc-tao-trieu': 'Luc tao trieu - offline.html',
  'chu-ky-trieu-mat-trang': 'Chu ky trieu Mat Trang-latest.html',
  'su-hinh-thanh-bao': 'su-hinh-thanh-bao-preview.html',
};
const KHUNG = {
  laptop: { viewport: { width: 1024, height: 768 } },
  doc: { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true },
  ngang: { viewport: { width: 844, height: 390 }, hasTouch: true, isMobile: true },
};
const GIAY = [0, 5, 15];

(async () => {
  const chon = process.argv.slice(2);
  const ds = chon.length ? chon : Object.keys(NGUON);
  const browser = await chromium.launch();
  for (const slug of ds) {
    const file = NGUON[slug];
    if (!file) { console.error('Không có slug', slug); process.exitCode = 1; continue; }
    const thuMuc = path.join(GOC, 'audit/screens', slug);
    fs.mkdirSync(thuMuc, { recursive: true });
    const log = { slug, file, khung: {} };
    for (const [ten, cauHinh] of Object.entries(KHUNG)) {
      const ctx = await browser.newContext({ ...cauHinh, deviceScaleFactor: 1 });
      const page = await ctx.newPage();
      const muc = { consoleErrors: [], pageErrors: [], blocked: [] };
      page.on('console', (m) => { if (m.type() === 'error') muc.consoleErrors.push(m.text().slice(0, 300)); });
      page.on('pageerror', (e) => muc.pageErrors.push(String(e).slice(0, 300)));
      await page.route('**/*', (route) => {
        const u = route.request().url();
        if (/^(file|data|blob|about):/.test(u)) return route.continue();
        muc.blocked.push(u.slice(0, 200));
        return route.abort();
      });
      await page.goto(pathToFileURL(path.join(GOC, '_nguon', file)).href, { waitUntil: 'load' });
      await page.waitForFunction(() => !document.querySelector('#__bundler_thumbnail'), null, { timeout: 20000 })
        .catch(() => muc.pageErrors.push('Thumbnail của bundle không biến mất sau 20 s'));
      const t0 = Date.now();
      for (const g of GIAY) {
        const cho = g * 1000 - (Date.now() - t0);
        if (cho > 0) await page.waitForTimeout(cho);
        await page.screenshot({ path: path.join(thuMuc, `${ten}-t${g}.jpg`), type: 'jpeg', quality: 70 });
      }
      muc.blocked = [...new Set(muc.blocked)];
      log.khung[ten] = muc;
      await ctx.close();
    }
    fs.writeFileSync(path.join(thuMuc, 'log.json'), JSON.stringify(log, null, 2));
    const tong = Object.values(log.khung).reduce((a, k) => a + k.consoleErrors.length + k.pageErrors.length, 0);
    console.log(slug, '| lỗi:', tong, '| host bị chặn:', [...new Set(Object.values(log.khung).flatMap((k) => k.blocked.map((u) => new URL(u).host)))].join(', ') || 'không');
  }
  await browser.close();
})();
