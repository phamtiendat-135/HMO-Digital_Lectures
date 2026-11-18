import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import { danhSach, url, canhGac, trangThai, chupSanKhau, tiLeKhacNen, TU_CAM } from './chung.js';

const NGUONG = { '2D': 500 * 1024, '3D': 1536 * 1024 };
// three.js tự đặt window.__THREE__ để cảnh báo khi bị nạp hai lần; không phải móc của ta.
const MOC_THU_VIEN = ['__THREE__'];

for (const a of danhSach()) {
  test.describe(a.slug, () => {
    test('tải trang: không lỗi console, không gọi mạng ngoài, đúng chế độ mặc định', async ({ page }, info) => {
      const gac = await canhGac(page);
      await page.goto(url(a.tep));
      await page.waitForFunction(() => window.HMO && window.HMO.trangThai().idCanh);
      await page.waitForTimeout(1500);
      expect(gac.loi, 'lỗi console').toEqual([]);
      expect(gac.ngoai, 'request ra mạng ngoài').toEqual([]);
      const tt = await trangThai(page);
      expect(tt.muc).toBe('xem');
      await expect(page.locator('#hmo-mssv')).toHaveCount(0);
      if (info.project.name === 'laptop') expect(tt.cheDo).toBe('trinh-chieu');
      else {
        expect(tt.cheDo).toBe('tu-hoc');
        expect(tt.mucNhan).toBe('toi-gian');
        // Không tràn ngang; chữ giải thích ≥ 16 px; nút bấm ≥ 44 px
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
        expect(parseFloat(await page.locator('#hmo-giai-thich').evaluate((e) => getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(16);
        expect((await page.locator('#hmo-giai-thich').textContent()).trim().length).toBeGreaterThan(10);
        for (const nut of await page.locator('#hmo-dk .hmo-nut').all()) {
          const b = await nut.boundingBox();
          expect(Math.min(b.width, b.height), 'kích thước nút').toBeGreaterThanOrEqual(44);
        }
      }
    });

    test('sân khấu không trống ở giây 3', async ({ page }) => {
      await canhGac(page);
      await page.goto(url(a.tep));
      await page.waitForFunction(() => window.HMO && window.HMO.trangThai().idCanh);
      await page.evaluate(() => window.HMO.phat(true));
      await page.waitForTimeout(3000);
      const box = await page.locator('#hmo-san-khau').boundingBox();
      expect(box.width).toBeGreaterThan(200);
      expect(box.x).toBeGreaterThanOrEqual(-1);
      expect(box.y).toBeGreaterThanOrEqual(-1);
      expect(await tiLeKhacNen(page), 'sân khấu gần như một màu phẳng').toBeGreaterThan(0.002);
    });

    test('phát/dừng: dừng thì khung hình đứng yên, phát thì khung hình đổi', async ({ page }, info) => {
      await canhGac(page);
      await page.goto(url(a.tep));
      await page.waitForFunction(() => window.HMO && window.HMO.trangThai().idCanh);
      await page.evaluate(() => window.HMO.phat(true));
      await page.waitForTimeout(600);
      const bam = async () => {
        if (info.project.name === 'laptop') await page.keyboard.press('Space');
        else { const b = await page.locator('#hmo-san-khau').boundingBox(); await page.touchscreen.tap(b.x + b.width / 2, b.y + b.height / 2); }
      };
      await bam();
      if ((await trangThai(page)).dangPhat) await page.locator('#hmo-phat').click(); // cảnh giữ chạm cho riêng nó (3D): dùng nút
      expect((await trangThai(page)).dangPhat).toBe(false);
      await page.waitForTimeout(200);
      const a1 = await chupSanKhau(page);
      await page.waitForTimeout(1000);
      const a2 = await chupSanKhau(page);
      expect(a1.equals(a2), 'đang dừng mà khung hình vẫn đổi').toBe(true);
      await page.locator('#hmo-phat').click();
      expect((await trangThai(page)).dangPhat).toBe(true);
      await page.waitForTimeout(1000);
      const a3 = await chupSanKhau(page);
      expect(a2.equals(a3), 'đang phát mà khung hình không đổi').toBe(false);
    });

    test('đổi cảnh bằng phím, clicker và vuốt', async ({ page }, info) => {
      await canhGac(page);
      await page.goto(url(a.tep));
      await page.waitForFunction(() => window.HMO && window.HMO.trangThai().idCanh);
      const soCanh = await page.evaluate(() => { let n = 0; while (true) { window.HMO.denCanh(n + 1); if (window.HMO.trangThai().iCanh !== n + 1) break; n++; } window.HMO.denCanh(0); return n + 1; });
      test.skip(soCanh < 2, 'animation chỉ có một cảnh');
      if (info.project.name === 'laptop') {
        await page.keyboard.press('ArrowRight'); expect((await trangThai(page)).iCanh).toBe(1);
        await page.keyboard.press('PageUp'); expect((await trangThai(page)).iCanh).toBe(0);
        await page.keyboard.press('PageDown'); expect((await trangThai(page)).iCanh).toBe(1);
        await page.keyboard.press('ArrowUp'); expect((await trangThai(page)).tocDo).toBe(2);
      } else {
        await page.locator('#hmo-sau').tap(); expect((await trangThai(page)).iCanh).toBe(1);
        await page.locator('#hmo-truoc').tap(); expect((await trangThai(page)).iCanh).toBe(0);
      }
    });

    test('không có từ cấm, không còn móc gỡ lỗi window.__; dung lượng trong ngưỡng', async ({ page }) => {
      const ma = fs.readFileSync(a.tep, 'utf8');
      await canhGac(page);
      await page.goto(url(a.tep));
      await page.waitForFunction(() => window.HMO && window.HMO.trangThai().idCanh);
      const dom = await page.evaluate(() => document.body.innerText);
      for (const tu of TU_CAM) {
        expect(ma.toLowerCase().includes(tu.toLowerCase()), `mã nguồn chứa "${tu}"`).toBe(false);
        expect(dom.toLowerCase().includes(tu.toLowerCase()), `DOM chứa "${tu}"`).toBe(false);
      }
      expect(fs.statSync(a.tep).size).toBeLessThanOrEqual(NGUONG[a.loai]);
      // Móc gỡ lỗi (window.__xxx) không được nằm trong bản phát hành. Ngoại lệ: biến của thư viện ngoài.
      const moc = [...ma.matchAll(/\b(?:window|globalThis|self)\.(__[A-Za-z0-9_$]+)/g)].map((m) => m[1]).filter((ten) => !MOC_THU_VIEN.includes(ten));
      expect([...new Set(moc)], 'móc gỡ lỗi window.__ còn trong bản phát hành').toEqual([]);
      expect(await page.locator('html').getAttribute('lang')).toBe('vi');
    });
  });
}
