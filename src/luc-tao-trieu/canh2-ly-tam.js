// Cảnh 2: vì sao lực ly tâm Fc bằng nhau và song song tại mọi điểm.
import { tt, MAU, TI_SO_CM, TAU, D2R, CM_KM, nghin, nen, chu, nhanNgoai, tieuDe, chanTrang, tron, doan, matTrang, muiTen } from './chung.js';

const LAP = 9, GOC0 = 35;
const st = { duong: true, fc: true };
const CX = 720, CY = 590, R = 195, RC = R * TI_SO_CM, DM = 300, RMT = 36;
// A và B cách tâm 0,9 R: đường tròn của chúng cách CM ít nhất 0,9 R − RC ≈ 33 px, không đi qua chấm CM như bản cũ.
// C là tâm Trái Đất. B ở góc 150° (trên trái): đầu mũi tên của B không vươn tới dải tiêu đề.
const DIEM = [
  { ten: 'A', lech: [0.9, 0], mau: '#C0392B' },
  { ten: 'C', lech: [0, 0], mau: '#B8860B' },
  { ten: 'B', lech: [-0.9 * Math.cos(30 * D2R), -0.9 * Math.sin(30 * D2R)], mau: MAU.luc },
];
const L = 88;   // chiều dài mũi tên Fc

// Chú giải cố định: mẫu mũi tên Fc và chấm CM, chữ 30 px. Mức đầy đủ: góc trên phải dưới tiêu đề, tên và giải thích hai
// dòng (vùng này nằm ngoài tầm của nhãn Mặt Trăng, mũi tên Fc và đĩa Trái Đất). Mức tối giản: chỉ mẫu Fc ở dải trên cùng
// (mức này không có tiêu đề; giữ tối đa 6 chữ: Fc, A, B, C, Mặt Trăng, Trái Đất).
function chuGiai(g) {
  const toiGian = tt.muc === 'toi-gian';
  const muc = [];
  if (st.fc) muc.push(['fc', 'Fc', 'lực ly tâm']);
  if (!toiGian) muc.push(['cm', 'CM', 'khối tâm chung']);
  muc.forEach(([k, ten, giai], i) => {
    const x = toiGian ? 48 : 1135, y = toiGian ? 60 : 214 + i * 76;
    if (k === 'fc') muiTen(g, x, y, x + 56, y, MAU.cam, 6, 18);
    else tron(g, x + 28, y, 9, MAU.navy, '#FFFFFF', 2.5);
    chu(g, ten, x + 70, y, { co: 30, dam: 700, mau: k === 'fc' ? MAU.camChu : MAU.navy, goc: 'middle', khoa: true, vien: null });
    chu(g, giai, x + 70, y + 34, { co: 30, dam: 400, mau: MAU.ink, goc: 'middle', vien: null });   // mức tối giản: ẩn
  });
}



export default {
  id: 'ly-tam', lap: LAP,
  moTa: 'Ba điểm A, B, C trên Trái Đất vẽ ba đường tròn bằng nhau; ba mũi tên lực ly tâm Fc luôn song song, bằng nhau và chỉ ra xa Mặt Trăng.',
  dieuKhien: [
    { id: 'c2-duong-tron', loai: 'bat-tat', nhan: 'Đường tròn và bán kính của A, B, C', giaTri: true },
    { id: 'c2-fc', loai: 'bat-tat', nhan: 'Vector lực ly tâm Fc', giaTri: true },
    { id: 'c2-goc', loai: 'truot', nhan: 'Tua tới góc', min: 0, max: 355, buoc: 5, giaTri: GOC0, donVi: '°' },
  ],
  khiDoi(id, v) {
    if (id === 'c2-duong-tron') st.duong = v; else if (id === 'c2-fc') st.fc = v;
    else if (id === 'c2-goc') { window.HMO.phat(false); window.HMO.tua((((v - GOC0) % 360 + 360) % 360) / 360 * LAP); }
  },
  ve(g, t) {
    const a = TAU * t / LAP + GOC0 * D2R;
    const ux = Math.cos(a), uy = -Math.sin(a);       // hướng bán kính chung = hướng ra xa Mặt Trăng (toạ độ màn hình)
    const ex = CX + RC * ux, ey = CY + RC * uy;      // tâm Trái Đất
    const nx = -uy, ny = ux;
    const mx = CX - DM * ux, my = CY - DM * uy;      // Mặt Trăng luôn đối diện Trái Đất qua CM
    nen(g);
    tieuDe(g, 'Vì sao lực ly tâm chỉ có một hướng',
      'Ba mũi tên Fc luôn song song, bằng nhau và chỉ ra xa Mặt Trăng.',
      `Fc = ω²·d, với d = ${nghin(CM_KM)} km là bán kính chung của ba đường tròn.`);
    chanTrang(g, 'Nhìn từ cực Bắc. C là tâm Trái Đất. Không theo tỉ lệ: khoảng cách Trái Đất – Mặt Trăng thu ngắn.');
    chuGiai(g);

    doan(g, ex, ey, mx, my, MAU.slate, 2, [9, 7]);
    matTrang(g, mx, my, RMT);
    tron(g, ex, ey, R, 'rgba(27,78,143,0.88)', MAU.sky, 3);
    tron(g, CX, CY, 9, MAU.navy, '#FFFFFF', 2.5);

    const vt = DIEM.map((p) => [ex + p.lech[0] * R, ey + p.lech[1] * R]);
    DIEM.forEach((p, i) => {
      const [ox, oy] = vt[i];
      const kx = ox - RC * ux, ky = oy - RC * uy;                             // tâm đường tròn của điểm đó
      if (st.duong) {
        g.globalAlpha = 0.6; g.setLineDash([7, 7]); tron(g, kx, ky, RC, null, p.mau, 2.5); g.globalAlpha = 1;
        doan(g, kx, ky, ox, oy, p.mau, 3);
        tron(g, kx, ky, 5, p.mau);
      }
      tron(g, ox, oy, 11, p.mau, '#FFFFFF', 2.5);
      if (st.fc) muiTen(g, ox, oy, ox + ux * L, oy + uy * L, MAU.cam, 6, 22);
    });

    // Nhãn. Trái Đất tịnh tiến nên A, B, C giữ nguyên vị trí tương đối với nhau; nhãn mỗi điểm nằm phía ngược mũi tên Fc của
    // nó, lệch khỏi bán kính một chút (hướng −u + 1,4·n quay cùng u), nên không bao giờ chạm mũi tên của chính nó, các điểm
    // kia hay CM. Tên Fc và CM ở chú giải cố định. Trái Đất không ghi tên: chân trang ghi C là tâm Trái Đất.
    const oDiem = { co: 32, dam: 700, mau: '#FFFFFF', vien: MAU.navy, khoa: true };
    DIEM.forEach((p, i) => nhanNgoai(g, p.ten, vt[i][0], vt[i][1], 11, -ux + 1.4 * nx, -uy + 1.4 * ny, 5, oDiem));
    nhanNgoai(g, 'Mặt Trăng', mx, my, RMT, -ux, -uy, 8, { co: 30, dam: 700, mau: MAU.navy, khoa: true });
    // Mức tối giản (S-17): tên Trái Đất ngay trên đĩa, độ lệch cố định so với tâm (trên mọi điểm, mũi tên và nhãn của B).
    // Mức đầy đủ giữ như cũ: chân trang ghi C là tâm Trái Đất.
    if (tt.muc === 'toi-gian') chu(g, 'Trái Đất', ex, ey - R - 50, { co: 30, dam: 700, mau: MAU.navy, can: 'center', goc: 'middle', khoa: true });
  },
};
