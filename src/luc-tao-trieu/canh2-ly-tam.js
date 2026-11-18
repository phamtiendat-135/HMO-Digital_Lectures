// Cảnh 2: vì sao lực ly tâm Fc bằng nhau và song song tại mọi điểm.
import { MAU, TI_SO_CM, TAU, D2R, CM_KM, nghin, nen, chu, tieuDe, chanTrang, tron, doan, matTrang, muiTen, heSoNhan } from './chung.js';

const LAP = 9, GOC0 = 35;
const st = { duong: true, fc: true };
const CX = 720, CY = 590, R = 195, RC = R * TI_SO_CM, DM = 300, RMT = 36;
const DIEM = [
  { ten: 'A', lech: [1, 0], mau: '#C0392B' },
  { ten: 'C', lech: [0, 0], mau: '#B8860B' },
  { ten: 'B', lech: [-0.62, -0.62], mau: MAU.luc },
];

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
    const can = nx < 0 ? 'right' : 'left', goc = ny < 0 ? 'bottom' : 'top';
    const k = heSoNhan();
    nen(g);

    doan(g, ex, ey, mx, my, MAU.slate, 2, [9, 7]);
    matTrang(g, mx, my, RMT);
    chu(g, 'Mặt Trăng', mx, my + RMT + 8, { co: 30, dam: 700, mau: MAU.navy, can: 'center', goc: 'top', khoa: true, vien: MAU.nen });

    tron(g, ex, ey, R, 'rgba(27,78,143,0.88)', MAU.sky, 3);
    chu(g, 'Trái Đất', ex - R * 0.1, ey + R * 0.66, { co: 30, dam: 700, mau: '#FFFFFF', can: 'center', goc: 'middle' });

    tron(g, CX, CY, 9, MAU.navy, '#FFFFFF', 2.5);
    chu(g, 'CM', CX - ux * 40 * k, CY - uy * 36 * k, { co: 32, dam: 700, mau: '#FFFFFF', vien: MAU.navy, can: 'center', goc: 'middle', khoa: true });

    DIEM.forEach((p) => {
      const ox = ex + p.lech[0] * R * 0.78, oy = ey + p.lech[1] * R * 0.78; // vị trí điểm
      const kx = ox - RC * ux, ky = oy - RC * uy;                             // tâm đường tròn của điểm đó
      if (st.duong) {
        g.globalAlpha = 0.6; g.setLineDash([7, 7]); tron(g, kx, ky, RC, null, p.mau, 2.5); g.globalAlpha = 1;
        doan(g, kx, ky, ox, oy, p.mau, 3);
        tron(g, kx, ky, 5, p.mau);
      }
      tron(g, ox, oy, 11, p.mau, '#FFFFFF', 2.5);
      chu(g, p.ten, ox - nx * 18, oy - ny * 18, { co: 32, dam: 700, mau: '#FFFFFF', vien: MAU.navy, can: nx < 0 ? 'left' : 'right', goc: ny < 0 ? 'top' : 'bottom', khoa: true });
      if (st.fc) {
        const L = R * 0.62;
        muiTen(g, ox, oy, ox + ux * L, oy + uy * L, MAU.cam, 6, 22);
        chu(g, 'Fc', ox + ux * L * 0.66 + nx * 14, oy + uy * L * 0.66 + ny * 14, { co: 30, dam: 700, mau: MAU.camChu, vien: '#FFFFFF', can, goc });
      }
    });

    tieuDe(g, 'Vì sao lực ly tâm chỉ có một hướng',
      'Ba mũi tên Fc luôn song song, bằng nhau và chỉ ra xa Mặt Trăng.',
      `Fc = ω²·d, với d = ${nghin(CM_KM)} km là bán kính chung của ba đường tròn.`);
    chanTrang(g, 'Nhìn từ cực Bắc. Không theo tỉ lệ: khoảng cách Trái Đất – Mặt Trăng thu ngắn.');
  },
};
