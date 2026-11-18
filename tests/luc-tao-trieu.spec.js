// luc-tao-trieu, cảnh 3 bản 3D, S-21 (cảm ứng): kéo một ngón từ tâm Trái Đất là xoay camera, không kéo điểm cam,
// ở mọi góc θ có nút đặt sẵn; kéo bắt đầu ngay trên điểm cam thì kéo được điểm cam.
// Không dùng móc gỡ lỗi: vị trí trên màn hình tính từ camera đặt sẵn "Về góc nhìn ban đầu" (vị trí, đích, góc nhìn 40°),
// camera giữ hay đổi đọc từ điểm ảnh tại Mặt Trăng, điểm cam giữ hay đổi đọc từ ảnh sân khấu sau khi về camera đặt sẵn.
import { test, expect } from '@playwright/test';
import path from 'node:path';
import { GOC, url, canhGac } from './chung.js';

const TEP = path.join(GOC, 'animations', 'luc-tao-trieu', 'index.html');
const CAM = [1.0, 6.9, 11.4], DICH = [1.6, 0.55, 0.3], FOV = 40, TI_LE = 1440 / 1080;
const THETA = [0, 60, 90, 120, 210, 300];

const tru = (a, b) => a.map((v, i) => v - b[i]);
const cham = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cheo = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const donVi = (a) => { const l = Math.hypot(...a); return a.map((v) => v / l); };
/** Điểm thế giới → toạ độ CSS trên trang, với camera đặt sẵn và hộp sân khấu b. */
function chieu(X, b) {
  const f = donVi(tru(DICH, CAM)), r = donVi(cheo(f, [0, 1, 0])), u = cheo(r, f), d = tru(X, CAM);
  const tg = Math.tan(FOV / 2 * Math.PI / 180), z = cham(d, f);
  const x = cham(d, r) / (z * tg * TI_LE), y = cham(d, u) / (z * tg);
  return { x: b.x + (x + 1) / 2 * b.width, y: b.y + (1 - y) / 2 * b.height };
}
test.describe('luc-tao-trieu', () => {
  test('S-21 cảm ứng: kéo từ tâm Trái Đất xoay camera, kéo điểm cam đổi điểm cam', async ({ page, context }, info) => {
    test.skip(info.project.name === 'laptop', 'tiêu chí cảm ứng: chỉ khung dọc và ngang');
    await canhGac(page);
    await page.goto(url(TEP));
    await page.waitForFunction(() => window.HMO && window.HMO.trangThai().idCanh);
    const coGL = await page.evaluate(() => !!document.createElement('canvas').getContext('webgl2'));
    test.skip(!coGL, 'máy không có WebGL2: cảnh 3 chạy bản 2D');
    await page.evaluate(() => { window.HMO.denCanh(2); window.HMO.phat(false); window.scrollTo(0, 0); });
    await page.waitForTimeout(500);
    const cdp = await context.newCDPSession(page);
    const touch = (type, pts) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: pts.map((p, i) => ({ x: p.x, y: p.y, id: i })) });
    const keo = async (a, b, n = 12) => {
      await touch('touchStart', [a]);
      for (let k = 1; k <= n; k++) { await touch('touchMove', [{ x: a.x + (b.x - a.x) * k / n, y: a.y + (b.y - a.y) * k / n }]); await page.waitForTimeout(16); }
      await touch('touchEnd', []);
      await page.waitForTimeout(300);
    };
    // mẫu điểm ảnh 6 × 6 px quanh một điểm (để biết camera có đổi không: Mặt Trăng đứng yên trên màn hình khi camera giữ nguyên)
    const mau = (p) => page.screenshot({ clip: { x: p.x - 3, y: p.y - 3, width: 6, height: 6 } });
    const san = page.locator('#hmo-san-khau');
    // về camera đặt sẵn: chọn góc khác rồi chọn lại (nút đang chọn có thể không gọi lại khiDoi)
    const veGocBanDau = async () => {
      await page.getByRole('button', { name: 'Nhìn từ cực Bắc' }).click();
      await page.getByRole('button', { name: 'Về góc nhìn ban đầu' }).click();
      await page.waitForTimeout(300);
    };
    for (const th of THETA) {
      await veGocBanDau();
      await page.evaluate((v) => { const e = document.getElementById('hmo-dk-c3-theta'); e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, th);
      await page.waitForTimeout(300);
      const b = await san.boundingBox();
      const tam = chieu([0, 0, 0], b), diem = chieu([Math.cos(th * Math.PI / 180), Math.sin(th * Math.PI / 180), 0], b);
      const trang = chieu([3.3, 0, 0], b);   // Mặt Trăng lúc t = 0 (hoạt hoạ tắt)
      const anh0 = await san.screenshot(), mt0 = await mau(trang);
      // 1) kéo từ tâm Trái Đất sang phải 200 px sân khấu: camera xoay (Mặt Trăng rời chỗ cũ), điểm cam giữ nguyên
      await keo(tam, { x: tam.x + 200 * b.width / 1440, y: tam.y });
      expect((await mau(trang)).equals(mt0), `θ = ${th}°: kéo từ tâm Trái Đất phải xoay camera`).toBe(false);
      await veGocBanDau();
      expect((await san.screenshot()).equals(anh0), `θ = ${th}°: kéo từ tâm Trái Đất không được đổi điểm cam`).toBe(true);
      // 2) kéo bắt đầu trên điểm cam (khi điểm cam ở nửa cầu hướng camera và cách tâm đủ xa để bắt được):
      //    camera giữ nguyên, hình đổi (điểm cam và ba mũi tên dời chỗ)
      if (Math.hypot(diem.x - tam.x, diem.y - tam.y) >= 20 && th <= 120) {
        await keo(diem, { x: diem.x - 8, y: diem.y - 20 });
        expect((await mau(trang)).equals(mt0), `θ = ${th}°: kéo điểm cam không được xoay camera`).toBe(true);
        expect((await san.screenshot()).equals(anh0), `θ = ${th}°: kéo trên điểm cam phải đổi điểm cam`).toBe(false);
      }
    }
  });
});
