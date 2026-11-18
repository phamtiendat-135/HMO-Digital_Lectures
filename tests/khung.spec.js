// Kiểm tra bộ khung và sổ điểm trên animation mẫu.
import { test, expect } from '@playwright/test';
import path from 'node:path';
import { GOC, url, canhGac, trangThai, SO_DIEM_URL } from './chung.js';

const MAU = path.join(GOC, 'dist-test/_mau/index.html');
const mo = async (page, truyVan = '') => { await page.goto(url(MAU, truyVan)); await page.waitForFunction(() => window.HMO && window.HMO.trangThai().idCanh); };
const denCuoi = (page) => page.evaluate(() => window.HMO.denCanh(2));

for (const cheDo of ['tu-hoc', 'trinh-chieu']) {
  test(`mở trang ở trạng thái dừng (${cheDo})`, async ({ page }) => {
    await canhGac(page); await mo(page, '?che-do=' + cheDo);
    await page.waitForTimeout(300);
    expect((await trangThai(page)).dangPhat).toBe(false);
    const a1 = await page.locator('#hmo-san-khau').screenshot();
    await page.waitForTimeout(800);
    const a2 = await page.locator('#hmo-san-khau').screenshot();
    expect(a1.equals(a2), 'chưa bấm phát mà khung hình đã đổi').toBe(true);
    expect((await trangThai(page)).t).toBe(0);
  });
}

test('tự dừng cuối cảnh có giờ, phát tiếp thì sang cảnh sau', async ({ page }) => {
  await canhGac(page); await mo(page, '?che-do=tu-hoc');
  await page.evaluate(() => { window.HMO.phat(false); window.HMO.tua(3.7); window.HMO.phat(true); });
  await page.waitForTimeout(900);
  let tt = await trangThai(page);
  expect(tt.dangPhat).toBe(false); expect(tt.iCanh).toBe(0); expect(tt.t).toBeCloseTo(4, 3);
  await page.locator('#hmo-phat').click();
  tt = await trangThai(page);
  expect(tt.iCanh).toBe(1); expect(tt.dangPhat).toBe(true);
});

test('tua lui: vẽ lại đúng trạng thái tại t', async ({ page }) => {
  await canhGac(page); await mo(page, '?che-do=tu-hoc');
  await page.evaluate(() => { window.HMO.phat(false); window.HMO.tua(1); });
  await page.waitForTimeout(150);
  const a1 = await page.locator('#hmo-san-khau').screenshot();
  await page.evaluate(() => window.HMO.tua(3)); await page.waitForTimeout(150);
  await page.evaluate(() => window.HMO.tua(1)); await page.waitForTimeout(150);
  const a2 = await page.locator('#hmo-san-khau').screenshot();
  expect(a1.equals(a2)).toBe(true);
});

test('điều khiển riêng của cảnh: thanh trượt đổi hình, dùng được bằng bàn phím', async ({ page }) => {
  await canhGac(page); await mo(page, '?che-do=tu-hoc');
  await denCuoi(page); await page.evaluate(() => window.HMO.phat(false)); await page.waitForTimeout(150);
  const a1 = await page.locator('#hmo-san-khau').screenshot();
  const truot = page.locator('#hmo-dk-ban-kinh');
  await expect(truot).toBeVisible();
  await truot.focus(); await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(150);
  expect((await trangThai(page)).iCanh, 'mũi tên trên thanh trượt không được đổi cảnh').toBe(2);
  const a2 = await page.locator('#hmo-san-khau').screenshot();
  expect(a1.equals(a2)).toBe(false);
  expect((await truot.boundingBox()).height).toBeGreaterThanOrEqual(44);
});

test('mức Chỉ xem → Tự luyện: nút hiện khi tới cảnh cuối, không gửi gì', async ({ page }) => {
  const gac = await canhGac(page); await mo(page, '?che-do=tu-hoc');
  await expect(page.locator('#hmo-moi-hoi')).toHaveCount(0);
  await denCuoi(page);
  await page.locator('#hmo-moi-hoi').click();
  expect((await trangThai(page)).muc).toBe('tu-luyen');
  await expect(page.locator('#hmo-mssv')).toHaveCount(0);
  await page.locator('[data-qid="_mau-q1"] .hmo-pa').nth(1).click();
  await expect(page.locator('[data-qid="_mau-q1"] .hmo-gt')).toContainText('Đúng');
  await page.locator('[data-qid="_mau-q2"] .hmo-pa').nth(2).click();
  await expect(page.locator('[data-qid="_mau-q2"] .hmo-gt')).toContainText('Chưa đúng');
  await expect(page.locator('#hmo-ket-qua')).toContainText('1/2');
  expect(gac.ngoai).toEqual([]);
});

test('tính điểm: gửi thành công với ?lop=', async ({ page }) => {
  const gac = await canhGac(page, { choPhepSoDiem: true });
  const nhan = [];
  await page.route(SO_DIEM_URL + '*', async (route) => {
    const rq = route.request();
    expect(rq.method()).toBe('POST');
    expect(rq.headers()['content-type']).toContain('text/plain');
    nhan.push(JSON.parse(rq.postData()));
    await route.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ ok: true }) });
  });
  await mo(page, '?lop=TEST&che-do=tu-hoc');
  expect((await trangThai(page)).muc).toBe('tinh-diem');
  await page.locator('#hmo-mssv-o').fill('23001234');
  await page.locator('#hmo-mssv button').click();
  await expect(page.locator('#hmo-mssv')).toContainText('23001234');
  await page.locator('[data-qid="_mau-q1"] .hmo-pa').nth(1).click();
  await expect(page.locator('#hmo-tt-diem')).toHaveText('Đã lưu điểm ✓');
  expect(nhan).toHaveLength(1);
  expect(nhan[0]).toMatchObject({ mssv: '23001234', maLop: 'TEST', slug: '_mau', qid: '_mau-q1', chon: 'B', dung: true, lanThu: 1 });
  expect(typeof nhan[0].thoiGian).toBe('string');
  expect(gac.ngoai).toEqual([]);
  // Mở lại: không phải nhập MSSV; "Không phải tôi" xoá MSSV
  await page.reload(); await page.waitForFunction(() => window.HMO && window.HMO.trangThai().idCanh);
  await expect(page.locator('#hmo-mssv')).toContainText('23001234');
  await page.getByRole('button', { name: 'Không phải tôi' }).click();
  await expect(page.locator('#hmo-mssv-o')).toBeVisible();
});

test('tính điểm: mất mạng thì xếp hàng, có mạng tự gửi lại', async ({ page }) => {
  await canhGac(page, { choPhepSoDiem: true });
  let coMang = false; const nhan = [];
  await page.route(SO_DIEM_URL + '*', async (route) => {
    if (!coMang) return route.abort('internetdisconnected');
    nhan.push(JSON.parse(route.request().postData()));
    await route.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ ok: true }) });
  });
  await mo(page, '?lop=TEST&che-do=tu-hoc');
  await page.locator('#hmo-mssv-o').fill('23001234'); await page.locator('#hmo-mssv button').click();
  await page.locator('[data-qid="_mau-q1"] .hmo-pa').nth(0).click();
  await expect(page.locator('#hmo-tt-diem')).toHaveText('Chưa gửi được, sẽ tự gửi lại');
  expect(nhan).toHaveLength(0);
  coMang = true;
  await page.evaluate(() => window.dispatchEvent(new Event('online')));
  await expect(page.locator('#hmo-tt-diem')).toHaveText('Đã lưu điểm ✓');
  expect(nhan).toHaveLength(1);
  expect(nhan[0]).toMatchObject({ qid: '_mau-q1', chon: 'A', dung: false });
});

test('tính điểm: hàng đợi còn lại được gửi khi mở lần sau', async ({ page }) => {
  await canhGac(page, { choPhepSoDiem: true });
  let coMang = false; const nhan = [];
  await page.route(SO_DIEM_URL + '*', async (route) => {
    if (!coMang) return route.abort('internetdisconnected');
    nhan.push(JSON.parse(route.request().postData()));
    await route.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ ok: true }) });
  });
  await mo(page, '?lop=TEST&che-do=tu-hoc');
  await page.locator('#hmo-mssv-o').fill('23001234'); await page.locator('#hmo-mssv button').click();
  await page.locator('[data-qid="_mau-q1"] .hmo-pa').nth(1).click();
  await expect(page.locator('#hmo-tt-diem')).toHaveText('Chưa gửi được, sẽ tự gửi lại');
  coMang = true;
  await page.reload(); await page.waitForFunction(() => window.HMO && window.HMO.trangThai().idCanh);
  await expect.poll(() => nhan.length).toBe(1);
});

test('tính điểm: máy chủ từ chối thì hiện lý do và không gửi lại', async ({ page }) => {
  await canhGac(page, { choPhepSoDiem: true });
  let lan = 0;
  await page.route(SO_DIEM_URL + '*', async (route) => {
    lan++;
    await route.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ ok: false, lyDo: 'MSSV không có trong danh sách lớp.' }) });
  });
  await mo(page, '?lop=TEST&che-do=tu-hoc');
  await page.locator('#hmo-mssv-o').fill('99999999'); await page.locator('#hmo-mssv button').click();
  await page.locator('[data-qid="_mau-q1"] .hmo-pa').nth(1).click();
  await expect(page.locator('#hmo-tt-diem')).toContainText('MSSV không có trong danh sách lớp.');
  await page.waitForTimeout(2500);
  expect(lan).toBe(1);
});

test('không nhập MSSV vẫn làm được câu hỏi, không gửi gì', async ({ page }) => {
  const gac = await canhGac(page, { choPhepSoDiem: true });
  let lan = 0; await page.route(SO_DIEM_URL + '*', (route) => { lan++; return route.abort(); });
  await mo(page, '?lop=TEST&che-do=tu-hoc');
  await page.locator('[data-qid="_mau-q1"] .hmo-pa').nth(1).click();
  await expect(page.locator('[data-qid="_mau-q1"] .hmo-gt')).toContainText('Đúng');
  expect(lan).toBe(0); expect(gac.ngoai).toEqual([]);
});

test('trình chiếu: thanh điều khiển tự ẩn sau 3 s, hiện lại khi di chuột; tự dừng khi tab ẩn', async ({ page }, info) => {
  test.skip(info.project.name !== 'laptop', 'chỉ áp dụng cho laptop');
  await canhGac(page); await mo(page);
  await page.mouse.move(100, 100);
  await expect(page.locator('#hmo-app')).toHaveAttribute('data-an', '0');
  await page.waitForTimeout(3300);
  await expect(page.locator('#hmo-app')).toHaveAttribute('data-an', '1');
  await page.mouse.move(200, 200);
  await expect(page.locator('#hmo-app')).toHaveAttribute('data-an', '0');
  await page.evaluate(() => { window.HMO.phat(true); Object.defineProperty(document, 'hidden', { value: true, configurable: true }); document.dispatchEvent(new Event('visibilitychange')); });
  expect((await trangThai(page)).dangPhat).toBe(false);
});

test('vuốt ngang trên sân khấu đổi cảnh', async ({ page }, info) => {
  test.skip(info.project.name === 'laptop', 'chỉ áp dụng cho màn cảm ứng');
  await canhGac(page); await mo(page);
  const b = await page.locator('#hmo-san-khau').boundingBox();
  const vuot = (x1, x2) => page.locator('#hmo-san-khau').evaluate((e, [x1, x2, y]) => {
    const p = (loai, x) => e.dispatchEvent(new PointerEvent(loai, { bubbles: true, isPrimary: true, pointerType: 'touch', clientX: x, clientY: y }));
    p('pointerdown', x1); p('pointerup', x2);
  }, [x1, x2, b.y + b.height / 2]);
  await vuot(b.x + b.width * 0.8, b.x + b.width * 0.2);
  expect((await trangThai(page)).iCanh).toBe(1);
  await vuot(b.x + b.width * 0.2, b.x + b.width * 0.8);
  expect((await trangThai(page)).iCanh).toBe(0);
});

test('nút bấm một lần: dừng đồng hồ và đổi hình; thanh trượt hiện số theo thapPhan', async ({ page }) => {
  await canhGac(page); await mo(page, '?che-do=tu-hoc');
  await denCuoi(page); await page.evaluate(() => window.HMO.phat(true)); await page.waitForTimeout(200);
  await expect(page.locator('label[for="hmo-dk-ban-kinh"]')).toContainText('60,0 px');
  await page.locator('#hmo-dk-buoc').click();
  expect((await trangThai(page)).dangPhat).toBe(false);
  await page.waitForTimeout(150);
  const a1 = await page.locator('#hmo-san-khau').screenshot();
  await page.locator('#hmo-dk-buoc').click(); await page.waitForTimeout(150);
  const a2 = await page.locator('#hmo-san-khau').screenshot();
  expect(a1.equals(a2)).toBe(false);
});
