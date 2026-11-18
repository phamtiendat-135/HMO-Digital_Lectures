// Cảnh 6: nhìn ngang mặt phẳng xích đạo, xích vĩ Mặt Trăng thay đổi trong một tháng sao.
import { W, MAU, D2R, TAU, tt, vn, kep, nen, chu, nhanNgoai, trongCung, tieuDe, chanTrang, tron, doan, matTrang } from './chung.js';

const LAP = 16.39;               // một tháng sao 655,68 h ở nhịp 1 s = 40 h
const st = { i: 25, bao: true, vet: true };
const CX = 720, CY = 430, R = 92, RO = 395;

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
    const mx = CX + m.x * RO, my = CY - m.y * RO, sau = m.z < 0, rm = R * 0.32;
    nen(g);
    tieuDe(g, 'Xích vĩ thay đổi trong một tháng', 'Mặt Trăng lên phía bắc rồi xuống phía nam xích đạo, mỗi tháng một vòng.');
    chanTrang(g, 'Nhìn ngang mặt phẳng xích đạo. Không theo tỉ lệ: khoảng cách thu ngắn. Nửa quỹ đạo phía sau Trái Đất vẽ nhạt hơn.');

    doan(g, 12, CY, W - 12, CY, MAU.vien, 2, [12, 9]);

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
    // chú thích trạng thái đặt cùng hàng tiêu đề đồ thị (Mặt Trăng không bao giờ xuống tới đây)
    chu(g, sau ? 'Mặt Trăng ở phía sau Trái Đất' : 'Mặt Trăng ở phía trước Trái Đất', 1392, 772, { co: 30, mau: MAU.slate, can: 'right', vien: null });

    // đồ thị δ trong một tháng
    const x0 = 130, x1 = 1392, y0 = 790, y1 = 960, yD = (d) => (y0 + y1) / 2 - d / 30 * ((y1 - y0) / 2);
    chu(g, 'Xích vĩ δ trong một tháng sao', 48, 772, { co: 30, mau: MAU.navy, vien: null });
    g.fillStyle = '#FFFFFF'; g.fillRect(x0, y0, x1 - x0, y1 - y0);
    doan(g, x0, yD(st.i), x1, yD(st.i), MAU.vien, 1); doan(g, x0, yD(-st.i), x1, yD(-st.i), MAU.vien, 1);
    doan(g, x0, yD(0), x1, yD(0), MAU.slate, 2);
    g.beginPath();
    for (let k = 0; k <= 200; k++) { const x = x0 + (x1 - x0) * k / 200, y = yD(xichVi(TAU * k / 200, st.i)); if (k) g.lineTo(x, y); else g.moveTo(x, y); }
    g.strokeStyle = MAU.cam; g.lineWidth = 4; g.lineJoin = 'round'; g.stroke();
    const xp = x0 + (x1 - x0) * t / LAP;
    doan(g, xp, y0, xp, y1, MAU.navy, 3);
    tron(g, xp, yD(xv), 9, MAU.cam, '#FFFFFF', 3);
    chu(g, `+${st.i}°`, x0 - 10, yD(st.i), { co: 30, mau: MAU.slate, can: 'right', goc: 'middle', vien: null });
    chu(g, '0°', x0 - 10, yD(0), { co: 30, mau: MAU.slate, can: 'right', goc: 'middle', vien: null });
    chu(g, `−${st.i}°`, x0 - 10, yD(-st.i), { co: 30, mau: MAU.slate, can: 'right', goc: 'middle', vien: null });
    chu(g, 'ngày 0', x0, y1 + 4, { co: 30, mau: MAU.slate, goc: 'top', vien: null });
    chu(g, `ngày ${vn(27.32 * t / LAP, 1)}`, kep(xp, x0 + 200, x1 - 260), y1 + 4, { co: 30, dam: 700, mau: MAU.navy, can: 'center', goc: 'top' });
    chu(g, '27,3', x1, y1 + 4, { co: 30, mau: MAU.slate, can: 'right', goc: 'top', vien: null });

    // Nhãn đặt theo quy tắc cố định:
    // δ ở góc trên phải (mức tối giản: chữ to, đặt trong khung đồ thị, nằm trên nét phụ)
    const oDelta = { co: 40, dam: 700, mau: MAU.camChu, khoa: true, can: 'right' };
    const chuDelta = `δ = ${vn(Math.abs(xv), 1)}° ${xv >= 0 ? 'B' : 'N'}`;
    if (tt.muc === 'toi-gian') chu(g, chuDelta, 1380, 945, oDelta); else chu(g, chuDelta, 1392, 200, oDelta);
    // Bắc, Nam trong đĩa Trái Đất, sát hai cực: với mọi độ nghiêng 18°–28°, Mặt Trăng không đè lên trong đĩa
    const oCuc = { co: 30, dam: 700, mau: '#FFFFFF', vien: MAU.navy };
    chu(g, 'Bắc', CX, CY - R + 13, { ...oCuc, can: 'center', goc: 'top' });
    chu(g, 'Nam', CX, CY + R - 13, { ...oCuc, can: 'center', goc: 'bottom' });
    // mặt phẳng xích đạo: ở đầu đường kẻ phía không có Mặt Trăng; sang đầu phải khi Mặt Trăng đi qua đầu trái (ψ 120°–240°)
    const oXD = { co: 30, dam: 400, nghieng: true, mau: MAU.slate, goc: 'bottom' };
    if (trongCung(psi, 120, 240)) chu(g, 'mặt phẳng xích đạo', W - 16, CY - 10, { ...oXD, can: 'right' });
    else chu(g, 'mặt phẳng xích đạo', 16, CY - 10, oXD);
    // Trái Đất: bên phải hoặc bên trái đĩa, phía không có Mặt Trăng; đổi phía khi Mặt Trăng ở đỉnh/đáy (ψ = 90°, 270°)
    const traiTrang = trongCung(psi, 90, 270);   // Mặt Trăng ở nửa trái
    chu(g, 'Trái Đất', traiTrang ? CX + R + 14 : CX - R - 14, CY, { co: 30, dam: 700, mau: MAU.navy, khoa: true, can: traiTrang ? 'left' : 'right', goc: 'middle' });
    // Mặt Trăng: phía ngoài đĩa theo hướng bán kính từ tâm Trái Đất. Mức tối giản (chữ to gấp đôi): ngay trên hoặc dưới
    // đĩa, phía xa xích đạo; đổi phía lúc Mặt Trăng cắt xích đạo ở hai đầu quỹ đạo (ψ = 0°, 180°).
    const oMT = { co: 30, dam: 700, mau: MAU.navy, khoa: true };
    if (tt.muc === 'toi-gian') nhanNgoai(g, 'Mặt Trăng', mx, my, rm, 0, trongCung(psi, 0, 180) ? -1 : 1, 8, oMT);
    else nhanNgoai(g, 'Mặt Trăng', mx, my, rm, mx - CX, my - CY, 8, oMT);
  },
};
