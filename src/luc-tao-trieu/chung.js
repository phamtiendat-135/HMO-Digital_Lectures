// Hằng số, màu và hàm vẽ dùng chung cho 7 cảnh của animation "Lực tạo triều".
export const W = 1440, H = 1080;
export const FONT = '"Be Vietnam Pro","Segoe UI",Arial,sans-serif';
export const MAU = {
  navy: '#0A2E5C', ocean: '#1B4E8F', sky: '#60C0F0', skyNhat: '#A8D8F0', cam: '#F07800', camChu: '#A85A00',
  ink: '#0F1E3A', slate: '#546E8F', nen: '#F7FAFD', vien: '#D5E1F0', trang: '#C3C8D0',
  do: '#A93226', vang: '#F2C14E', ft: '#E8A33D', ftChu: '#8A5D0B', luc: '#1B7A6E',
};

// Số liệu thiên văn (nguồn: xem NGUON; chờ TS. Đạt xác nhận).
export const A_KM = 384400;            // khoảng cách Trái Đất – Mặt Trăng
export const R_KM = 6371;              // bán kính Trái Đất
export const CM_KM = 4671;             // khối tâm chung cách tâm Trái Đất = 384.400 / (81,3 + 1)
export const TI_SO_CM = CM_KM / R_KM;  // 0,733 bán kính Trái Đất
export const T_THANG_SAO = 27.32 * 24; // giờ
export const T_SAO = 23.934;           // ngày sao (giờ): một vòng tự quay trong hệ quán tính
export const T_TRIEU = 24.84;          // ngày triều = 24 h 50 ph
export const TUAN_TRANG = 29.53;       // ngày
export const TI_SO_MT = 0.46;          // tác động tạo triều Mặt Trời / Mặt Trăng
export const PHONG_DAI_FT = 26;        // lựa chọn hiển thị
export const NGUON = 'Nguồn: NASA Moon Fact Sheet; Pugh & Woodworth (2014), Sea-Level Science.';
export const D2R = Math.PI / 180, TAU = Math.PI * 2;

/** Trạng thái hiển thị chung: mức nhãn và chế độ giảm chuyển động. */
export const tt = { muc: 'day-du', giam: false };

export const vn = (x, soLe = 0) => x.toFixed(soLe).replace('.', ',').replace('-', '−');
export const nghin = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
export const gioPhut = (h) => { const p = Math.round(h * 60); return Math.floor(p / 60) + ' h ' + String(p % 60).padStart(2, '0') + ' ph'; };
export const kep = (x, a, b) => Math.max(a, Math.min(b, x));

/**
 * Ba lực tại điểm p (toạ độ tính bằng bán kính Trái Đất, gốc ở tâm Trái Đất) khi Mặt Trăng ở hướng u (vector đơn vị).
 * Kết quả tính theo đơn vị |Fc| = G·M/a² (lực hấp dẫn của Mặt Trăng tại tâm Trái Đất).
 */
export function baLuc(p, u) {
  const k = A_KM / R_KM;
  const d = [u[0] * k - p[0], u[1] * k - p[1], (u[2] || 0) * k - (p[2] || 0)];
  const r = Math.hypot(d[0], d[1], d[2]), s = (k * k) / (r * r * r);
  const fg = [d[0] * s, d[1] * s, d[2] * s];
  const fc = [-u[0], -u[1], -(u[2] || 0)];
  return { fg, fc, ft: [fg[0] + fc[0], fg[1] + fc[1], fg[2] + fc[2]] };
}
export const doDai = (v) => Math.hypot(v[0], v[1], v[2] || 0);

/* ---------- vẽ 2D ---------- */
export function nen(g) { g.setLineDash([]); g.globalAlpha = 1; g.fillStyle = MAU.nen; g.fillRect(0, 0, W, H); }

/**
 * Viết chữ theo mức nhãn. o: co (px, mặc định 30), dam, mau, can, goc ('top'|'middle'|'bottom'|'alphabetic'),
 * khoa (nhãn then chốt: còn hiện ở mức tối giản, vẽ to gấp đôi), nghieng, vien (màu viền quanh chữ).
 */
export function chu(g, s, x, y, o = {}) {
  if (tt.muc === 'tat') return;
  let co = o.co || 30;
  if (tt.muc === 'toi-gian') { if (!o.khoa) return; co = Math.max(60, co * 2); }
  g.font = `${o.nghieng ? 'italic ' : ''}${o.dam || 600} ${co}px ${FONT}`;
  g.textAlign = o.can || 'left'; g.textBaseline = o.goc || 'alphabetic';
  if (o.vien) { g.lineWidth = co * 0.2; g.lineJoin = 'round'; g.strokeStyle = o.vien; g.strokeText(s, x, y); }
  g.fillStyle = o.mau || MAU.ink; g.fillText(s, x, y);
}
/** Hệ số phóng nhãn then chốt ở mức tối giản, để tính khoảng cách đặt nhãn. */
export const heSoNhan = () => (tt.muc === 'toi-gian' ? 2 : 1);

/** Tiêu đề cảnh (≥ 44 px) và tối đa 2 dòng chú thích (36 px). */
export function tieuDe(g, ten, ...dong) {
  chu(g, ten, 48, 72, { co: 46, dam: 700, mau: MAU.navy });
  dong.forEach((d, i) => chu(g, d, 48, 124 + i * 46, { co: 36, dam: 400 }));
}
/** Một dòng ghi chú tỉ lệ và dòng nguồn ở đáy sân khấu. */
export function chanTrang(g, ghiChu) {
  chu(g, ghiChu, 48, 1036, { co: 24, dam: 400, nghieng: true, mau: MAU.slate });
  chu(g, NGUON, 48, 1066, { co: 22, dam: 400, mau: MAU.slate });
}

export function muiTen(g, x1, y1, x2, y2, mau, day, dau = 20) {
  const L = Math.hypot(x2 - x1, y2 - y1); if (L < 3) return;
  const ux = (x2 - x1) / L, uy = (y2 - y1) / L, h = Math.min(dau, L * 0.42);
  g.setLineDash([]); g.strokeStyle = mau; g.fillStyle = mau; g.lineWidth = day; g.lineCap = 'butt';
  g.beginPath(); g.moveTo(x1, y1); g.lineTo(x1 + ux * (L - h), y1 + uy * (L - h)); g.stroke();
  g.beginPath(); g.moveTo(x2, y2);
  g.lineTo(x2 - ux * h - uy * h * 0.42, y2 - uy * h + ux * h * 0.42);
  g.lineTo(x2 - ux * h + uy * h * 0.42, y2 - uy * h - ux * h * 0.42);
  g.closePath(); g.fill();
}
export function tron(g, x, y, r, to, vien, day = 2) {
  g.beginPath(); g.arc(x, y, r, 0, TAU);
  if (to) { g.fillStyle = to; g.fill(); }
  if (vien) { g.setLineDash([]); g.strokeStyle = vien; g.lineWidth = day; g.stroke(); }
}
export function doan(g, x1, y1, x2, y2, mau, day = 2, net = null) {
  g.setLineDash(net || []); g.strokeStyle = mau; g.lineWidth = day;
  g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); g.setLineDash([]);
}
/** Mặt Trăng: đĩa xám có viền. */
export function matTrang(g, x, y, r) { tron(g, x, y, r, MAU.trang, MAU.slate, 2.5); }
