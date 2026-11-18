// Cảnh 6: nhìn ngang mặt phẳng xích đạo, xích vĩ Mặt Trăng thay đổi trong một tháng sao.
import { MAU, D2R, TAU, tt, vn, kep, nen, chu, chuTranh, quanh, vatCan, vatCanDoan, tieuDe, chanTrang, tron, doan, matTrang } from './chung.js';

const LAP = 16.39;               // một tháng sao 655,68 h ở nhịp 1 s = 40 h
const st = { i: 25, bao: true, vet: true };
const CX = 720, CY = 430, R = 92, RO = 470;

/**
 * Vị trí Mặt Trăng: x sang phải (trong mặt phẳng xích đạo), y theo trục Trái Đất, z về phía người xem.
 * Nhìn từ cực Bắc, Mặt Trăng quay ngược chiều kim đồng hồ như Trái Đất tự quay: từ bên phải (ψ = 0) nó đi ra
 * phía sau (z < 0), rồi đi qua phía trước từ trái sang phải, cùng chiều mũi tên tự quay ở mặt trước Trái Đất.
 * (Bản gốc đặt z = +cos i·sin ψ nên Mặt Trăng đi ngược chiều; đã sửa.)
 */
export const viTri = (psi, i) => ({ x: Math.cos(psi), y: Math.sin(i * D2R) * Math.sin(psi), z: -Math.cos(i * D2R) * Math.sin(psi) });
export const xichVi = (psi, i) => Math.asin(Math.sin(i * D2R) * Math.sin(psi)) / D2R;
/**
 * Bao hình triều nhìn ngang: nghiêng theo xích vĩ δ (không vượt quá δ), trục dài co lại theo
 * k = độ dài hình chiếu của hướng Mặt Trăng lên mặt phẳng màn hình. Khi Mặt Trăng ở chính trước/sau
 * Trái Đất, góc nghiêng về 0 một cách liên tục và ellip gần tròn.
 */
export function baoHinh(psi, i) {
  const k = Math.hypot(Math.cos(psi), Math.sin(i * D2R) * Math.sin(psi));
  return { nghieng: xichVi(psi, i) * kep(Math.cos(psi) / 0.2, -1, 1), dai: 1.03 + 0.31 * k, ngan: 1.03, k };
}

export default {
  id: 'nhin-ngang', lap: LAP,
  moTa: 'Nhìn ngang mặt phẳng xích đạo: quỹ đạo Mặt Trăng là một ellip nghiêng; Mặt Trăng lên phía bắc rồi xuống phía nam xích đạo, xích vĩ δ dao động trong một tháng.',
  dieuKhien: [
    { id: 'c6-i', loai: 'truot', nhan: 'Độ nghiêng quỹ đạo Mặt Trăng so với xích đạo i', min: 18, max: 28, buoc: 1, giaTri: 25, donVi: '°' },
    { id: 'c6-bao', loai: 'bat-tat', nhan: 'Bao hình triều', giaTri: true },
    { id: 'c6-vet', loai: 'bat-tat', nhan: 'Vết quỹ đạo', giaTri: true },
  ],
  khiDoi(id, v) { if (id === 'c6-i') st.i = v; else if (id === 'c6-bao') st.bao = v; else if (id === 'c6-vet') st.vet = v; },
  ve(g, t) {
    const psi = TAU * t / LAP, m = viTri(psi, st.i), xv = xichVi(psi, st.i);
    const mx = CX + m.x * RO, my = CY - m.y * RO, sau = m.z < 0, rm = R * 0.42;
    nen(g);
    tieuDe(g, 'Xích vĩ thay đổi trong một tháng', 'Mặt Trăng lên phía bắc rồi xuống phía nam xích đạo, mỗi tháng một vòng.');
    chanTrang(g, 'Nhìn ngang mặt phẳng xích đạo. Không theo tỉ lệ: khoảng cách thu ngắn. Nửa quỹ đạo phía sau Trái Đất vẽ nhạt hơn.');

    doan(g, CX - RO * 1.12, CY, CX + RO * 1.12, CY, MAU.vien, 2, [12, 9]);

    if (st.vet) for (let nua = 0; nua < 2; nua++) {
      g.beginPath();
      for (let k = 0; k <= 180; k++) { const q = viTri((nua ? Math.PI : 0) + k / 180 * Math.PI, st.i), x = CX + q.x * RO, y = CY - q.y * RO; if (k) g.lineTo(x, y); else g.moveTo(x, y); }
      g.strokeStyle = nua ? 'rgba(84,110,143,0.85)' : 'rgba(84,110,143,0.28)'; g.lineWidth = 3; g.stroke();
    }
    const veTrang = () => {
      matTrang(g, mx, my, rm);
      if (sau) tron(g, mx, my, rm, 'rgba(247,250,253,0.45)');
    };
    if (sau) veTrang();

    if (st.bao) {
      const b = baoHinh(psi, st.i);
      g.save(); g.translate(CX, CY); g.rotate(-b.nghieng * D2R);
      g.beginPath(); g.ellipse(0, 0, R * b.dai, R * b.ngan, 0, 0, TAU);
      g.fillStyle = 'rgba(232,163,61,0.22)'; g.fill(); g.strokeStyle = MAU.ft; g.lineWidth = 3; g.setLineDash([9, 7]); g.stroke();
      g.restore(); g.setLineDash([]);
    }
    doan(g, CX, CY - R * 1.7, CX, CY + R * 1.7, MAU.slate, 2, [9, 7]);
    tron(g, CX, CY, R, MAU.ocean, MAU.skyNhat, 3);
    doan(g, CX - R, CY, CX + R, CY, 'rgba(255,255,255,0.55)', 3);
    // mũi tên tự quay tây → đông: chuyển động trang trí (Trái Đất quay 27 vòng trong một chu kỳ, không vẽ đúng nhịp)
    const quay = tt.giam ? 0.6 : TAU * t / 4;
    [40, -40].forEach((vd) => {
      const y = CY - R * Math.sin(vd * D2R), hw = R * Math.cos(vd * D2R);
      for (let k = 0; k < 3; k++) {
        const l = quay + k * TAU / 3, c = Math.cos(l);
        if (c <= 0.18) continue;
        const x = CX + hw * Math.sin(l), s = 11 + 8 * c;
        g.globalAlpha = Math.min(1, c * 1.3); g.fillStyle = '#E4D6AE';
        g.beginPath(); g.moveTo(x + s, y); g.lineTo(x - s * 0.55, y - s * 0.62); g.lineTo(x - s * 0.2, y); g.lineTo(x - s * 0.55, y + s * 0.62); g.closePath(); g.fill();
        g.globalAlpha = 1;
      }
    });
    if (!sau) veTrang();

    doan(g, CX, CY, mx, my, MAU.cam, 3);
    chu(g, sau ? 'Mặt Trăng ở phía sau Trái Đất' : 'Mặt Trăng ở phía trước Trái Đất', 48, 230, { co: 30, mau: MAU.slate });

    // đồ thị δ trong một tháng
    const x0 = 130, x1 = 1392, y0 = 790, y1 = 960, yD = (d) => (y0 + y1) / 2 - d / 30 * ((y1 - y0) / 2);
    chu(g, 'Xích vĩ δ trong một tháng sao', 48, 772, { co: 30, mau: MAU.navy });
    g.fillStyle = '#FFFFFF'; g.fillRect(x0, y0, x1 - x0, y1 - y0);
    doan(g, x0, yD(st.i), x1, yD(st.i), MAU.vien, 1); doan(g, x0, yD(-st.i), x1, yD(-st.i), MAU.vien, 1);
    doan(g, x0, yD(0), x1, yD(0), MAU.slate, 2);
    g.beginPath();
    for (let k = 0; k <= 200; k++) { const x = x0 + (x1 - x0) * k / 200, y = yD(xichVi(TAU * k / 200, st.i)); if (k) g.lineTo(x, y); else g.moveTo(x, y); }
    g.strokeStyle = MAU.cam; g.lineWidth = 4; g.lineJoin = 'round'; g.stroke();
    const xp = x0 + (x1 - x0) * t / LAP;
    doan(g, xp, y0, xp, y1, MAU.navy, 3);
    tron(g, xp, yD(xv), 9, MAU.cam, '#FFFFFF', 3);
    chu(g, `+${st.i}°`, x0 - 10, yD(st.i), { co: 30, mau: MAU.slate, can: 'right', goc: 'middle' });
    chu(g, '0°', x0 - 10, yD(0), { co: 30, mau: MAU.slate, can: 'right', goc: 'middle' });
    chu(g, `−${st.i}°`, x0 - 10, yD(-st.i), { co: 30, mau: MAU.slate, can: 'right', goc: 'middle' });
    chu(g, 'ngày 0', x0, y1 + 4, { co: 30, mau: MAU.slate, goc: 'top' });
    chu(g, `ngày ${vn(27.32 * t / LAP, 1)}`, kep(xp, x0 + 200, x1 - 260), y1 + 4, { co: 30, dam: 700, mau: MAU.navy, can: 'center', goc: 'top' });
    chu(g, '27,3', x1, y1 + 4, { co: 30, mau: MAU.slate, can: 'right', goc: 'top' });

    // nhãn quanh hình vẽ sau cùng, chọn chỗ trống: đĩa Mặt Trăng, Trái Đất, đường nối và chữ đã vẽ là vùng cấm
    vatCan(mx, my, rm + 2); vatCan(CX, CY, R + 2); vatCanDoan(CX, CY, mx, my, 4);
    chuTranh(g, `δ = ${vn(Math.abs(xv), 1)}° ${xv >= 0 ? 'B' : 'N'}`, [[1392, 230, { can: 'right' }], [1392, 745, { can: 'right' }], [48, 300, { can: 'left' }]],
      { co: 40, dam: 700, mau: MAU.camChu, khoa: true });
    const oCuc = { co: 30, dam: 700, mau: MAU.navy, vien: MAU.nen };
    chuTranh(g, 'Bắc', [[CX, CY - R * 1.74, { can: 'center', goc: 'bottom' }], [CX + 14, CY - R * 1.55, { can: 'left', goc: 'middle' }], [CX - 14, CY - R * 1.55, { can: 'right', goc: 'middle' }]], oCuc);
    chuTranh(g, 'Nam', [[CX, CY + R * 1.76, { can: 'center', goc: 'top' }], [CX + 14, CY + R * 1.55, { can: 'left', goc: 'middle' }], [CX - 14, CY + R * 1.55, { can: 'right', goc: 'middle' }]], oCuc);
    const xa = RO * 1.12;
    chuTranh(g, 'mặt phẳng xích đạo', [[CX - xa, CY - 10, { can: 'left', goc: 'bottom' }], [CX - xa, CY + 10, { can: 'left', goc: 'top' }],
      [CX + xa, CY - 10, { can: 'right', goc: 'bottom' }], [CX + xa, CY + 10, { can: 'right', goc: 'top' }]], { co: 30, dam: 400, nghieng: true, mau: MAU.slate, vien: MAU.nen });
    chuTranh(g, 'Trái Đất', [[CX - R * 1.2, CY + R * 1.4, { can: 'right', goc: 'middle' }], [CX + R * 1.2, CY + R * 1.4, { can: 'left', goc: 'middle' }],
      [CX - R * 1.2, CY - R * 1.4, { can: 'right', goc: 'middle' }], [CX + R * 1.2, CY - R * 1.4, { can: 'left', goc: 'middle' }]], { co: 30, dam: 700, mau: MAU.navy, khoa: true, vien: MAU.nen });
    chuTranh(g, 'Mặt Trăng', quanh(mx, my, rm + 8, m.y > 0 ? '37620154' : '25413076'), { co: 30, dam: 700, mau: MAU.navy, khoa: true, vien: MAU.nen });

  },
};
