// Cảnh 2: vì sao lực ly tâm Fc bằng nhau và song song tại mọi điểm.
import { tt, MAU, TI_SO_CM, TAU, D2R, CM_KM, nghin, nen, chuTranh, quanh, vatCan, vatCanDoan, tieuDe, chanTrang, tron, doan, matTrang, muiTen } from './chung.js';

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
    const L = R * 0.62;
    nen(g);
    tieuDe(g, 'Vì sao lực ly tâm chỉ có một hướng',
      'Ba mũi tên Fc luôn song song, bằng nhau và chỉ ra xa Mặt Trăng.',
      `Fc = ω²·d, với d = ${nghin(CM_KM)} km là bán kính chung của ba đường tròn.`);
    chanTrang(g, 'Nhìn từ cực Bắc. Không theo tỉ lệ: khoảng cách Trái Đất – Mặt Trăng thu ngắn.');

    doan(g, ex, ey, mx, my, MAU.slate, 2, [9, 7]);
    matTrang(g, mx, my, RMT);
    tron(g, ex, ey, R, 'rgba(27,78,143,0.88)', MAU.sky, 3);
    tron(g, CX, CY, 9, MAU.navy, '#FFFFFF', 2.5);

    const vt = DIEM.map((p) => [ex + p.lech[0] * R * 0.78, ey + p.lech[1] * R * 0.78]);
    DIEM.forEach((p, i) => {
      const [ox, oy] = vt[i];
      const kx = ox - RC * ux, ky = oy - RC * uy;                             // tâm đường tròn của điểm đó
      if (st.duong) {
        g.globalAlpha = 0.6; g.setLineDash([7, 7]); tron(g, kx, ky, RC, null, p.mau, 2.5); g.globalAlpha = 1;
        doan(g, kx, ky, ox, oy, p.mau, 3);
        tron(g, kx, ky, 5, p.mau);
        vatCan(kx, ky, 7);
      }
      tron(g, ox, oy, 11, p.mau, '#FFFFFF', 2.5);
      if (st.fc) muiTen(g, ox, oy, ox + ux * L, oy + uy * L, MAU.cam, 6, 22);
    });

    // nhãn: chấm, mũi tên và đĩa là vùng cấm; mỗi nhãn chọn chỗ trống gần vật của nó
    vt.forEach(([ox, oy]) => { vatCan(ox, oy, 14); if (st.fc) vatCanDoan(ox, oy, ox + ux * L, oy + uy * L, 8); });
    vatCan(CX, CY, 11); vatCan(mx, my, RMT + 2);
    const oDiem = { co: 32, dam: 700, mau: '#FFFFFF', vien: MAU.navy, khoa: true };
    DIEM.forEach((p, i) => chuTranh(g, p.ten, quanh(vt[i][0], vt[i][1], 22, '57461302'), oDiem));
    chuTranh(g, 'CM', quanh(CX, CY, 18, '25417063').concat(quanh(CX, CY, 50, '25417063')), oDiem);
    chuTranh(g, 'Mặt Trăng', quanh(mx, my, RMT + 8, '23014567'), { co: 30, dam: 700, mau: MAU.navy, khoa: true, vien: MAU.nen });
    if (st.fc) vt.forEach(([ox, oy]) => {
      const gx = ox + ux * L * 0.62, gy = oy + uy * L * 0.62;
      chuTranh(g, 'Fc', [[gx + nx * 16, gy + ny * 16, { can: 'center', goc: 'middle' }], [gx - nx * 16, gy - ny * 16, { can: 'center', goc: 'middle' }],
        [gx + nx * 26, gy + ny * 26, { can: 'center', goc: 'middle' }], [gx - nx * 26, gy - ny * 26, { can: 'center', goc: 'middle' }]],
      { co: 30, dam: 700, mau: MAU.camChu, vien: '#FFFFFF' });
    });
    const uvTD = [[ex - R * 0.1, ey + R * 0.66]];
    for (const r of [0.62, 0.35, 1.18]) for (let i = 0; i < 12; i++) { const b = i * TAU / 12; uvTD.push([ex + Math.cos(b) * R * r, ey + Math.sin(b) * R * r]); }
    chuTranh(g, 'Trái Đất', uvTD,
    { co: 30, dam: 700, mau: '#FFFFFF', vien: MAU.navy, can: 'center', goc: 'middle', khoa: true, tuyChon: tt.muc === 'toi-gian' });
  },
};
