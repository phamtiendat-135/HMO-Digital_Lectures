// Cảnh 5: xích vĩ Mặt Trăng làm hai lần nước lớn trong ngày không bằng nhau (bất đẳng nhật triều).
import { tt, MAU, T_THANG_SAO, T_TRIEU, D2R, TAU, vn, gioPhut, nen, chu, nhanNgoai, tieuDe, chanTrang, tron, doan, matTrang } from './chung.js';

const LAP = T_THANG_SAO / 2;     // 327,84 s
const st = { dmax: 25, diChuyen: true, nhip: 2 };
const CX = 600, CY = 385, R = 135;
export const DIEM = [
  { ten: 'A', vd: 62, mau: '#0A2E5C', chu: '#0A2E5C', nhan: 'A · 62° B' },
  { ten: 'C', vd: 34, mau: '#1B4E8F', chu: '#1B4E8F', nhan: 'C · 34° B' },
  { ten: 'B', vd: 0, mau: '#F07800', chu: '#A85A00', nhan: 'B · xích đạo' },
  { ten: 'D', vd: -34, mau: '#8C4A00', chu: '#7A3E00', nhan: 'D · 34° N' },
];

/** Triều cân bằng tại vĩ độ vd (độ), góc giờ Mặt Trăng H (rad), xích vĩ xv (độ). */
export function eta(vd, H, xv) {
  const c = Math.sin(vd * D2R) * Math.sin(xv * D2R) + Math.cos(vd * D2R) * Math.cos(xv * D2R) * Math.cos(H);
  return (3 * c * c - 1) / 2;
}
/** Tỉ số biên độ thành phần nhật triều / bán nhật triều của triều cân bằng = 4·|tan φ·tan δ|. */
export const tiSoNhat = (vd, xv) => 4 * Math.abs(Math.tan(vd * D2R) * Math.tan(xv * D2R));
export function cheDo(vd, xv) {
  const r = tiSoNhat(vd, xv);
  if (r < 0.25) return 'bán nhật triều đều';
  if (r >= 4 - 1e-9) return 'nhật triều';   // φ + δ = 90° cho đúng 4 (trừ sai số dấu phẩy động)
  return r >= 1 ? 'hỗn hợp, thiên về nhật triều' : 'hỗn hợp, thiên về bán nhật triều';
}
/** Xích vĩ tại giờ h: bắt đầu ở cực đại bắc, chu kỳ một tháng sao. */
export const xichVi = (h, dmax, diChuyen) => (diChuyen ? dmax * Math.cos(TAU * h / T_THANG_SAO) : dmax);
export const ngayTrongChuKy = (h) => (h % T_THANG_SAO) / 24;

export default {
  id: 'xich-vi', lap: LAP,
  moTa: 'Nhìn ngang Trái Đất: bao hình triều nghiêng theo xích vĩ δ của Mặt Trăng; bốn đường cong mực triều tại bốn vĩ độ cho thấy hai lần nước lớn trong ngày không bằng nhau.',
  dieuKhien: [
    { id: 'c5-dmax', loai: 'truot', nhan: 'Xích vĩ cực đại δmax', min: 0, max: 28, buoc: 1, giaTri: 25, donVi: '°' },
    { id: 'c5-di-chuyen', loai: 'bat-tat', nhan: 'Mặt Trăng di chuyển (chu kỳ 27,3 ngày)', giaTri: true },
    { id: 'c5-nhip', loai: 'chon', nhan: 'Nhịp thời gian', giaTri: 2, luaChon: [{ giaTri: 2, nhan: 'Theo ngày (1 s = 2 h)' }, { giaTri: 40, nhan: 'Theo tháng (1 s = 40 h)' }] },
  ],
  khiDoi(id, v) { if (id === 'c5-dmax') st.dmax = v; else if (id === 'c5-di-chuyen') st.diChuyen = v; else if (id === 'c5-nhip') st.nhip = v; },
  ve(g, t) {
    const h = t * st.nhip, xv = xichVi(h, st.dmax, st.diChuyen), lam = TAU * h / T_TRIEU;
    const bx = Math.cos(xv * D2R), by = -Math.sin(xv * D2R);   // hướng Mặt Trăng trên màn hình
    nen(g);
    tieuDe(g, 'Xích vĩ Mặt Trăng và bất đẳng nhật triều', 'Múi triều nghiêng theo xích vĩ δ: hai lần nước lớn trong ngày không bằng nhau.');
    chanTrang(g, 'Nhìn ngang, Mặt Trăng ở bên phải. Không theo tỉ lệ: khoảng cách thu ngắn, bao hình triều phóng đại.');

    g.save(); g.translate(CX, CY); g.rotate(-xv * D2R);
    g.beginPath(); g.ellipse(0, 0, R * 1.30, R * 1.02, 0, 0, TAU);
    g.fillStyle = 'rgba(96,192,240,0.30)'; g.fill(); g.strokeStyle = MAU.ocean; g.lineWidth = 3; g.stroke();
    g.restore();

    doan(g, CX, CY - R * 1.45, CX, CY + R * 1.45, MAU.slate, 2, [9, 7]);
    chu(g, 'Bắc', CX, CY - R * 1.48, { co: 30, dam: 700, mau: MAU.navy, can: 'center', goc: 'bottom' });
    chu(g, 'Nam', CX, CY + R * 1.46, { co: 30, dam: 700, mau: MAU.navy, can: 'center', goc: 'top' });

    tron(g, CX, CY, R, MAU.ocean, MAU.skyNhat, 3);
    [-60, -30, 0, 30, 60].forEach((vd) => { const y = CY - R * Math.sin(vd * D2R), hw = R * Math.cos(vd * D2R); doan(g, CX - hw, y, CX + hw, y, 'rgba(255,255,255,0.45)', vd === 0 ? 3 : 1.5); });
    // mũi tên trôi từ tây sang đông trên nửa cầu nhìn thấy (chỉ khi nhịp chậm)
    if (st.nhip === 2) [42, -42].forEach((vd) => {
      const y = CY - R * Math.sin(vd * D2R), hw = R * Math.cos(vd * D2R);
      for (let k = 0; k < 3; k++) {
        const l = lam + Math.PI / 3 + k * TAU / 3, c = -Math.sin(l);
        if (c <= 0.18) continue;
        const x = CX + hw * Math.cos(l), s = 13 + 9 * c;
        g.globalAlpha = Math.min(1, c * 1.3); g.fillStyle = '#E4D6AE';
        g.beginPath(); g.moveTo(x + s, y); g.lineTo(x - s * 0.55, y - s * 0.62); g.lineTo(x - s * 0.2, y); g.lineTo(x - s * 0.55, y + s * 0.62); g.closePath(); g.fill();
        g.globalAlpha = 1;
      }
    });

    chu(g, 'phía đối diện', CX - bx * R * 1.36 - 12, CY - by * R * 1.36, { co: 30, mau: MAU.navy, can: 'right', goc: 'middle' });
    
    if (st.diChuyen) { g.setLineDash([6, 6]); g.strokeStyle = 'rgba(84,110,143,0.5)'; g.lineWidth = 2; g.beginPath(); g.arc(CX, CY, R * 2.05, -st.dmax * D2R, st.dmax * D2R); g.stroke(); g.setLineDash([]); }
    const mx = CX + bx * R * 2.05, my = CY + by * R * 2.05;
    doan(g, CX, CY, mx, my, MAU.slate, 2, [8, 6]);
    doan(g, CX + R, CY, CX + R * 2.3, CY, MAU.vien, 2, [4, 6]);
    matTrang(g, mx, my, 26);
    g.strokeStyle = MAU.cam; g.lineWidth = 4; g.beginPath(); g.arc(CX, CY, R * 1.66, Math.min(0, -xv * D2R), Math.max(0, -xv * D2R)); g.stroke();
    // δ đặt cố định ở góc trên trái (không nằm trên đường đi của Mặt Trăng như trước)
    chu(g, `δ = ${vn(Math.abs(xv), 1)}° ${xv >= 0 ? 'B' : 'N'}`, 48, tt.muc === 'toi-gian' ? 222 : 238, { co: 36, dam: 700, mau: MAU.camChu, khoa: true });

    // bốn điểm quan trắc quay theo Trái Đất; góc giờ 0 = ngay dưới Mặt Trăng (mép phải)
    DIEM.forEach((p) => {
      const x = CX + R * Math.cos(p.vd * D2R) * Math.cos(lam), y = CY - R * Math.sin(p.vd * D2R), truoc = -Math.sin(lam) > 0;
      g.globalAlpha = truoc ? 1 : 0.32;
      tron(g, x, y, 12, p.mau, '#FFFFFF', 3);
      // nhãn tròn đặt ngang hàng bên phải điểm: các điểm cách nhau ≥ 43 px theo chiều dọc nên nhãn không đè điểm khác
      tron(g, x + 34, y, 19, 'rgba(255,255,255,0.94)', p.mau, 2);
      chu(g, p.ten, x + 34, y + 1, { co: 30, dam: 700, mau: p.chu, can: 'center', goc: 'middle' });
      g.globalAlpha = 1;
    });

    chu(g, 'Trái Đất tự quay', 48, 520, { co: 30, mau: MAU.slate, vien: null });
    chu(g, 'từ tây sang đông', 48, 558, { co: 30, mau: MAU.slate, vien: null });
    chu(g, 'Ngày trong chu kỳ', 1392, 480, { co: 30, mau: MAU.slate, can: 'right', vien: null });
    chu(g, `${vn(ngayTrongChuKy(h), 1)} / 27,3`, 1392, 528, { co: 40, dam: 700, mau: MAU.navy, can: 'right', vien: null });
    chu(g, 'Ngày triều ' + gioPhut(T_TRIEU), 1392, 574, { co: 30, mau: MAU.slate, can: 'right', vien: null });

    // bốn đường cong mực triều trong một ngày triều
    const x0 = 560, x1 = 1392, yT = 656, bH = 80, goc = Math.floor(h / T_TRIEU) * T_TRIEU;
    const xvTai = (hh) => xichVi(hh, st.dmax, st.diChuyen);
    chu(g, 'Mực triều tại 4 điểm trong một ngày triều', 48, 640, { co: 30, mau: MAU.navy, vien: null });
    g.fillStyle = '#FFFFFF'; g.fillRect(x0, yT, x1 - x0, bH * 4);
    const xp = x0 + (x1 - x0) * (h - goc) / T_TRIEU;
    DIEM.forEach((p, i) => {
      const yM = yT + i * bH + bH * 0.58, bd = bH * 0.36;
      doan(g, x0, yM, x1, yM, MAU.vien, 1);
      if (i) doan(g, 48, yT + i * bH, x1, yT + i * bH, MAU.vien, 1);
      g.beginPath();
      for (let k = 0; k <= 260; k++) { const hk = goc + k / 260 * T_TRIEU, x = x0 + (x1 - x0) * k / 260, y = yM - eta(p.vd, TAU * hk / T_TRIEU, xvTai(hk)) * bd; if (k) g.lineTo(x, y); else g.moveTo(x, y); }
      g.strokeStyle = p.mau; g.lineWidth = 4; g.lineJoin = 'round'; g.stroke();
      tron(g, xp, yM - eta(p.vd, lam, xv) * bd, 8, p.mau, '#FFFFFF', 3);
      chu(g, p.nhan, 48, yT + i * bH + 34, { co: 30, dam: 700, mau: p.chu, vien: null });
      if (tt.muc === 'toi-gian') chu(g, p.ten, x0 - 24, yT + i * bH + bH / 2, { co: 30, dam: 700, mau: p.chu, can: 'right', goc: 'middle', khoa: true });
      chu(g, `${p.ten}: ${cheDo(p.vd, xv)}`, 48, yT + i * bH + 70, { co: 30, dam: 400, mau: MAU.ink, vien: null });
    });
    doan(g, xp, yT, xp, yT + bH * 4, MAU.navy, 3);
    // trục giờ tính từ đầu ngày triều đang xem (nhãn đứng yên, không nhảy khi sang ngày triều mới)
    chu(g, '0 h', x0, yT + bH * 4 + 4, { co: 30, mau: MAU.slate, goc: 'top', vien: null });
    chu(g, gioPhut(T_TRIEU), x1, yT + bH * 4 + 4, { co: 30, mau: MAU.slate, can: 'right', goc: 'top', vien: null });

    // Mặt Trăng: phía ngoài đĩa theo hướng bán kính từ tâm Trái Đất (đĩa Mặt Trăng đã tự chỉ "phía Mặt Trăng" của bao hình triều)
    nhanNgoai(g, 'Mặt Trăng', mx, my, 26, bx, by, 8, { co: 30, dam: 700, mau: MAU.navy, khoa: true });
  },
};
