// Cảnh 1: Trái Đất tịnh tiến quanh khối tâm chung CM. Nhìn từ cực Bắc, quay ngược chiều kim đồng hồ.
import { MAU, TI_SO_CM, TAU, nghin, CM_KM, nen, chu, tieuDe, chanTrang, tron, doan, matTrang, heSoNhan } from './chung.js';

const LAP = 7, N = 8;
const st = { ma: true, duong: true, trang: true };
const CX = 720, CY = 600, R = 150, RC = R * TI_SO_CM, RM = R * 2.3, RMT = 24;

// Ba điểm mẫu: độ lệch so với tâm Trái Đất, tính bằng bán kính Trái Đất (y hướng lên).
const DIEM = [
  { ten: 'A', lech: [-1, 0], mau: 'rgba(192,57,43,0.6)', ve(g, x, y, s) { tron(g, x, y, s, '#C0392B', MAU.navy, 2); } },
  { ten: 'B', lech: [-0.35, 0.86], mau: 'rgba(240,120,0,0.65)', ve(g, x, y, s) {
    g.beginPath(); g.moveTo(x, y - s * 1.15); g.lineTo(x + s * 1.1, y + s * 0.8); g.lineTo(x - s * 1.1, y + s * 0.8); g.closePath();
    g.fillStyle = MAU.cam; g.fill(); g.lineWidth = 2; g.strokeStyle = MAU.navy; g.stroke(); } },
  { ten: 'C', lech: [0, 0], mau: 'rgba(140,110,40,0.65)', ve(g, x, y, s) {
    g.fillStyle = MAU.vang; g.fillRect(x - s * 0.9, y - s * 0.9, s * 1.8, s * 1.8);
    g.lineWidth = 2; g.strokeStyle = MAU.navy; g.strokeRect(x - s * 0.9, y - s * 0.9, s * 1.8, s * 1.8); } },
];

/** Tâm Trái Đất tại góc a (rad), toạ độ sân khấu. Mặt Trăng luôn ở phía đối diện qua CM. */
export const tamTraiDat = (a) => [CX + RC * Math.cos(a), CY - RC * Math.sin(a)];
export const viTriTrang = (a) => [CX - RM * Math.cos(a), CY + RM * Math.sin(a)];

export default {
  id: 'tinh-tien', lap: LAP,
  moTa: 'Trái Đất và Mặt Trăng quay quanh khối tâm chung CM. Trái Đất chỉ tịnh tiến: ba điểm A, B, C vẽ ba đường tròn bằng nhau.',
  dieuKhien: [
    { id: 'c1-tam-thoi-diem', loai: 'bat-tat', nhan: '8 thời điểm chồng lên nhau', giaTri: true },
    { id: 'c1-duong-tron', loai: 'bat-tat', nhan: 'Đường tròn của A, B, C', giaTri: true },
    { id: 'c1-mat-trang', loai: 'bat-tat', nhan: 'Mặt Trăng', giaTri: true },
    { id: 'c1-thoi-diem', loai: 'truot', nhan: 'Tua tới thời điểm', min: 0, max: 355, buoc: 5, giaTri: 0, donVi: '°' },
  ],
  khiDoi(id, v) {
    if (id === 'c1-tam-thoi-diem') st.ma = v; else if (id === 'c1-duong-tron') st.duong = v; else if (id === 'c1-mat-trang') st.trang = v;
    else if (id === 'c1-thoi-diem') { window.HMO.phat(false); window.HMO.tua(v / 360 * LAP); }
  },
  ve(g, t) {
    const a = TAU * t / LAP, k = heSoNhan();
    nen(g);
    if (st.ma) {
      for (let i = 0; i < N; i++) {
        const ai = i * TAU / N, [x, y] = tamTraiDat(ai);
        tron(g, x, y, R, i % 2 ? 'rgba(140,110,190,0.16)' : 'rgba(27,78,143,0.16)', 'rgba(96,192,240,0.75)', 1.5);
        const lr = RC + R + 30;
        chu(g, String(i + 1), CX + lr * Math.cos(ai), CY - lr * Math.sin(ai), { co: 30, mau: MAU.slate, can: 'center', goc: 'middle' });
        g.globalAlpha = 0.55;
        DIEM.forEach((m) => m.ve(g, x + m.lech[0] * R, y - m.lech[1] * R, R * 0.055));
        g.globalAlpha = 1;
      }
    }
    if (st.duong) DIEM.forEach((m) => { g.setLineDash([7, 7]); tron(g, CX + m.lech[0] * R, CY - m.lech[1] * R, RC, null, null); g.strokeStyle = m.mau; g.lineWidth = 2.5; g.stroke(); g.setLineDash([]); });

    const [ex, ey] = tamTraiDat(a);
    if (st.trang) {
      for (let i = 0; i < N; i++) { const [x, y] = viTriTrang(i * TAU / N); tron(g, x, y, RMT * 0.72, 'rgba(195,200,208,0.5)', 'rgba(84,110,143,0.5)', 1.5); }
      const [mx, my] = viTriTrang(a);
      doan(g, ex, ey, mx, my, MAU.slate, 2, [9, 7]);
      matTrang(g, mx, my, RMT);
      chu(g, 'Mặt Trăng', mx, my - RMT - 10, { co: 30, dam: 700, mau: MAU.navy, can: 'center', goc: 'bottom', khoa: true, vien: MAU.nen });
    }
    // Trái Đất hiện thời: chỉ tịnh tiến, đường xích đạo giữ nguyên hướng.
    tron(g, ex, ey, R, 'rgba(27,78,143,0.88)', MAU.navy, 3);
    doan(g, ex - R, ey, ex + R, ey, 'rgba(255,255,255,0.4)', 2);
    chu(g, 'Trái Đất', ex, ey + R * 0.52, { co: 30, dam: 700, mau: '#FFFFFF', can: 'center', goc: 'middle', khoa: true });
    DIEM.forEach((m) => {
      const x = ex + m.lech[0] * R, y = ey - m.lech[1] * R;
      m.ve(g, x, y, R * 0.085);
      chu(g, m.ten, x + (m.ten === 'A' ? -22 : m.ten === 'B' ? -24 : 26), y - (m.ten === 'C' ? 0 : 18),
        { co: 32, dam: 700, mau: '#FFFFFF', vien: MAU.navy, can: m.ten === 'C' ? 'left' : 'right', goc: m.ten === 'C' ? 'middle' : 'bottom', khoa: true });
    });
    tron(g, CX, CY, 9, MAU.navy, '#FFFFFF', 2.5);
    chu(g, 'CM', CX - Math.cos(a) * 38 * k, CY + Math.sin(a) * 34 * k, { co: 32, dam: 700, mau: '#FFFFFF', vien: MAU.navy, can: 'center', goc: 'middle', khoa: true });

    tieuDe(g, 'Trái Đất tịnh tiến quanh khối tâm chung CM',
      `A, B trên mặt đất, C ở tâm: ba đường tròn bằng nhau, bán kính ${nghin(CM_KM)} km.`);
    chanTrang(g, 'Nhìn từ cực Bắc. Không theo tỉ lệ: khoảng cách Trái Đất – Mặt Trăng thu ngắn. Số 1–8: tám thời điểm trong một vòng.');
  },
};
