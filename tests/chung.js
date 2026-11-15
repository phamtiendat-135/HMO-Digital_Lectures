import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const GOC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const SO_DIEM_URL = 'https://so-diem.test/exec';
export const TU_CAM = ['độ mặn', 'South China Sea', 'Biển Nam Trung Hoa'];

/** Danh sách trang cần kiểm: animation mẫu + mọi animation trong manifest.json. */
export function danhSach() {
  const ds = [{ slug: '_mau', tep: path.join(GOC, 'dist-test/_mau/index.html'), loai: '2D' }];
  const m = path.join(GOC, 'manifest.json');
  if (fs.existsSync(m)) for (const a of JSON.parse(fs.readFileSync(m, 'utf8')).animations) ds.push({ slug: a.slug, tep: path.join(GOC, 'animations', a.slug, 'index.html'), loai: a.loai });
  return ds;
}
export const url = (tep, truyVan = '') => pathToFileURL(tep).href + truyVan;

/** Chặn mọi request ra ngoài; trả về mảng URL bị chặn và mảng lỗi console. */
export async function canhGac(page, { choPhepSoDiem = false } = {}) {
  const ngoai = [], loi = [];
  page.on('console', (m) => { if (m.type() === 'error') loi.push(m.text()); });
  page.on('pageerror', (e) => loi.push(String(e)));
  await page.route('**/*', (route) => {
    const u = route.request().url();
    if (/^(file|data|blob|about):/.test(u)) return route.continue();
    if (choPhepSoDiem && u.startsWith(SO_DIEM_URL)) return route.fallback();
    ngoai.push(u);
    return route.abort();
  });
  return { ngoai, loi };
}
export const trangThai = (page) => page.evaluate(() => window.HMO.trangThai());
export const chupSanKhau = (page) => page.locator('#hmo-san-khau').screenshot({ animations: 'allow' });

/** Tỉ lệ điểm ảnh trên sân khấu khác màu phổ biến nhất (0 = một màu phẳng). */
export async function tiLeKhacNen(page) {
  await page.evaluate(() => { document.getElementById('hmo-thong-bao').style.visibility = 'hidden'; });
  const b64 = (await chupSanKhau(page)).toString('base64');
  await page.evaluate(() => { document.getElementById('hmo-thong-bao').style.visibility = ''; });
  return page.evaluate(async (b64) => {
    const anh = new Image(); anh.src = 'data:image/png;base64,' + b64; await anh.decode();
    const c = document.createElement('canvas'); c.width = anh.width; c.height = anh.height;
    const g = c.getContext('2d'); g.drawImage(anh, 0, 0);
    const d = g.getImageData(0, 0, c.width, c.height).data, dem = new Map();
    for (let i = 0; i < d.length; i += 4) { const k = (d[i] >> 3) << 10 | (d[i + 1] >> 3) << 5 | (d[i + 2] >> 3); dem.set(k, (dem.get(k) || 0) + 1); }
    return 1 - Math.max(...dem.values()) / (d.length / 4);
  }, b64);
}
