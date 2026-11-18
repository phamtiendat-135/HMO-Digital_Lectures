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

/* ---------- xếp nhãn ----------
 * Mỗi khung hình giữ danh sách hộp đã chiếm: mọi chữ vẽ bằng chu() tự ghi vào, chấm và vùng cấm ghi bằng vatCan().
 * Nhãn di động vẽ bằng chuTranh(): thử lần lượt các vị trí ứng viên, chọn chỗ chồng ít nhất (hoà thì lấy ứng viên
 * đứng trước). Kết quả chỉ phụ thuộc hình đang vẽ, tức là hàm của t: ve(t) vẫn thuần.
 */
const KE = [];
/** Bắt đầu khung hình mới (nen() gọi sẵn). */
export function moiKhung() { KE.length = 0; }
/** Ghi một chấm tròn (tâm, bán kính) hoặc một hộp [x0, y0, x1, y1] là vùng nhãn không được đè. */
export function vatCan(x, y, r) { KE.push(r == null ? x : [x - r, y - r, x + r, y + r]); }

/** Ghi một đoạn thẳng (mũi tên, trục) làm vùng cấm: chuỗi chấm bán kính r dọc đoạn. */
export function vatCanDoan(x1, y1, x2, y2, r = 6) {
  const n = Math.max(1, Math.ceil(Math.hypot(x2 - x1, y2 - y1) / (r * 1.5)));
  for (let i = 0; i <= n; i++) vatCan(x1 + (x2 - x1) * i / n, y1 + (y2 - y1) * i / n, r);
}

/** Hộp chữ [x0, y0, x1, y1] mà chu() sẽ vẽ với cùng tham số; null nếu ở mức nhãn hiện tại chữ này bị ẩn. */
export function hopChu(g, s, x, y, o = {}) {
  if (tt.muc === 'tat') return null;
  let co = o.co || 30;
  if (tt.muc === 'toi-gian') { if (!o.khoa) return null; co = Math.max(60, co * 2); }
  g.font = `${o.nghieng ? 'italic ' : ''}${o.dam || 600} ${co}px ${FONT}`;
  const rong = g.measureText(s).width, can = o.can || 'left';
  let trai = can === 'center' ? x - rong / 2 : can === 'right' ? x - rong : x;
  trai += Math.max(0, 12 - trai) - Math.max(0, trai + rong - (W - 12));
  const goc = o.goc || 'alphabetic', tren = goc === 'top' ? y : goc === 'middle' ? y - co * 0.5 : goc === 'bottom' ? y - co : y - co * 0.78;
  const v = o.vien ? co * 0.1 : 0;   // nét viền quanh chữ
  return [trai - v, tren - co * 0.06 - v, trai + rong + v, tren + co * 1.02 + v];   // cả dấu thanh tiếng Việt phía trên và chân chữ g, y phía dưới
}
const chong = (a, b) => Math.max(0, Math.min(a[2], b[2]) - Math.max(a[0], b[0])) * Math.max(0, Math.min(a[3], b[3]) - Math.max(a[1], b[1]));

/**
 * Vẽ nhãn ở vị trí ứng viên chồng ít nhất lên những gì đã có trong khung. ds: mảng [x, y, oRieng?] theo thứ tự ưu tiên,
 * oRieng ghi đè o (thường là can, goc). o.tuyChon: chỉ vẽ nếu có chỗ không chồng chút nào (nhãn thêm ở mức tối giản).
 * Hộp chạm vào dải đáy (y > dayToiDa, mặc định 950) hoặc ra ngoài sân khấu bị tính là chồng.
 */
export function chuTranh(g, s, ds, o = {}) {
  let tot = null, diemTot = Infinity;
  const day = o.dayToiDa || 950;
  for (const [x, y, rieng] of ds) {
    const oo = rieng ? { ...o, ...rieng } : o, h0 = hopChu(g, s, x, y, oo);
    if (!h0) return;
    // điểm phạt: chồng thật (nặng) + chồng vào vùng lề quanh chữ (nhẹ, để nhãn không dính sát nhau)
    const h = [h0[0] - 14, h0[1] - 6, h0[2] + 14, h0[3] + 6];
    let d = 0;
    for (const k of KE) d += 1000 * chong(h0, k) + 20 * chong(h, k);
    d += 1000 * (Math.max(0, h0[3] - day) + Math.max(0, -h0[1])) * (h0[2] - h0[0]);
    if (d < diemTot - 0.5) { diemTot = d; tot = [x, y, oo]; }
  }
  if (!tot || (o.tuyChon && diemTot >= 1000)) return;
  chu(g, s, tot[0], tot[1], tot[2]);
}
/**
 * Các vị trí ứng viên quanh điểm (x, y) cách khoảng r. Chỉ số: 0 phải, 1 trái, 2 dưới, 3 trên,
 * 4 dưới-phải, 5 dưới-trái, 6 trên-phải, 7 trên-trái. thuTu: chuỗi chỉ số theo thứ tự ưu tiên (mặc định '01234567').
 */
export function quanh(x, y, r, thuTu = '01234567') {
  const d = [
    [x + r, y, { can: 'left', goc: 'middle' }], [x - r, y, { can: 'right', goc: 'middle' }],
    [x, y + r, { can: 'center', goc: 'top' }], [x, y - r, { can: 'center', goc: 'bottom' }],
    [x + r * 0.75, y + r * 0.75, { can: 'left', goc: 'top' }], [x - r * 0.75, y + r * 0.75, { can: 'right', goc: 'top' }],
    [x + r * 0.75, y - r * 0.75, { can: 'left', goc: 'bottom' }], [x - r * 0.75, y - r * 0.75, { can: 'right', goc: 'bottom' }],
  ];
  return [...thuTu].map((c) => d[+c]);
}

/* ---------- vẽ 2D ---------- */
export function nen(g) { moiKhung(); g.setLineDash([]); g.globalAlpha = 1; g.fillStyle = MAU.nen; g.fillRect(0, 0, W, H); }

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
  // giữ chữ trong sân khấu (nhãn bám theo vật thể có thể chạm mép)
  const rong = g.measureText(s).width, trai = g.textAlign === 'center' ? x - rong / 2 : g.textAlign === 'right' ? x - rong : x;
  x += Math.max(0, 12 - trai) - Math.max(0, trai + rong - (W - 12));
  if (o.vien) { g.lineWidth = co * 0.2; g.lineJoin = 'round'; g.strokeStyle = o.vien; g.strokeText(s, x, y); }
  g.fillStyle = o.mau || MAU.ink; g.fillText(s, x, y);
  const tren = g.textBaseline === 'top' ? y : g.textBaseline === 'middle' ? y - co * 0.5 : g.textBaseline === 'bottom' ? y - co : y - co * 0.78;
  const trai2 = g.textAlign === 'center' ? x - rong / 2 : g.textAlign === 'right' ? x - rong : x;
  const v = o.vien ? co * 0.1 : 0;
  KE.push([trai2 - v, tren - co * 0.06 - v, trai2 + rong + v, tren + co * 1.02 + v]);
}

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
