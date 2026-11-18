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

/* ---------- đặt nhãn ----------
 * Quy tắc (STANDARDS mục 4): vị trí nhãn là hàm liên tục, xác định của hình học, không dò chỗ trống lại ở từng khung.
 * Nhãn thiên thể đặt phía ngoài đĩa theo một hướng cố định của hình (ví dụ hướng bán kính), cách mép đĩa một khe;
 * nhãn điểm có độ lệch cố định. Khi buộc phải đổi phía, dùng cung đổi phía có độ trễ 10° (hàm của góc, vẫn thuần).
 */
/** Rộng, cao (px sân khấu) của nhãn ở mức nhãn hiện tại; null nếu nhãn bị ẩn. */
export function kichThuoc(g, s, o = {}) {
  if (tt.muc === 'tat') return null;
  let co = o.co || 30;
  if (tt.muc === 'toi-gian') { if (!o.khoa) return null; co = Math.max(60, co * 2); }
  g.font = `${o.nghieng ? 'italic ' : ''}${o.dam || 600} ${co}px ${FONT}`;
  return [g.measureText(s).width, co];
}
/**
 * Nhãn phía ngoài một đĩa (tâm cx, cy, bán kính r) theo hướng (ux, uy): hộp chữ nằm hẳn ngoài đĩa, cách mép khe px.
 * Khoảng cách từ tâm tính bằng hàm tựa của hộp chữ theo hướng đó, nên nhãn trượt liên tục khi hướng đổi.
 */
export function nhanNgoai(g, s, cx, cy, r, ux, uy, khe, o = {}) {
  const p = viTriNgoai(g, s, cx, cy, r, ux, uy, khe, o);
  if (p) chu(g, s, p[0], p[1], { ...o, can: 'center', goc: 'middle' });
}
/** Tâm nhãn mà nhanNgoai sẽ dùng (null nếu nhãn bị ẩn). */
const LECH = 2;
export function viTriNgoai(g, s, cx, cy, r, ux, uy, khe, o = {}) {
  const k = kichThuoc(g, s, o);
  if (!k) return null;
  const dat = (ux, uy) => {
    const l = Math.hypot(ux, uy) || 1; ux /= l; uy /= l;
    const d = r + khe + Math.abs(ux) * (k[0] / 2 + 5) + Math.abs(uy) * (k[1] * 0.6 + 5);   // nửa hộp chữ cộng viền
    return [cx + ux * d, cy + uy * d];
  };
  const p = dat(ux, uy);
  // Tuỳ chọn tránh (liên tục, không đổi phương án): hướng nhãn được cộng dần một thành phần xuống dưới theo độ gần giữa vật
  // cản và vùng nhãn có thể chiếm quanh đĩa (đĩa nới thêm một bề rộng/bề cao nhãn). Độ gần chỉ phụ thuộc vị trí đĩa nên đổi
  // chậm theo chuyển động của vật. o.mep: mép trái/phải sân khấu; o.tranh: các hộp [x0, y0, x1, y1] cần tránh.
  const nw = k[0] / 2 + 5, nh = k[1] * 0.6 + 5, G = 200;
  const X0 = cx - r - 2 * nw, X1 = cx + r + 2 * nw, Y0 = cy - r - 2 * nh, Y1 = cy + r + 2 * nh;
  let gan = o.mep ? Math.max(0, 1 - (X0 - 12) / G, 1 - (W - 12 - X1) / G) : 0;
  for (const b of o.tranh || []) gan = Math.max(gan, 1 - Math.max(b[0] - X1, X0 - b[2], b[1] - Y1, Y0 - b[3]) / G);
  if (gan <= 0) return p;
  const l = Math.hypot(ux, uy) || 1;
  return dat(ux / l, uy / l + LECH * Math.min(gan, 1.6));
}
/**
 * Xếp một nhóm nhãn chuyển động bằng phép đẩy mềm có số vòng cố định: mỗi nhãn có điểm neo (hàm của hình), bị kéo về neo
 * như lò xo và bị đẩy khỏi nhãn khác, khỏi chấm/đĩa ({x, y, r}) và hộp ([x0, y0, x1, y1]) trong `vat`. Lực đẩy đổi liên tục
 * theo vị trí nên kết quả là hàm liên tục, xác định của hình: không có bước dò chỗ trống hay nhảy giữa các phương án.
 * ds: [{ s, x, y, o }] (x, y: tâm nhãn mong muốn). Vẽ luôn các nhãn.
 */
export function xepNhan(g, ds, vat = [], lan = 40) {
  const L = [];
  for (const d of ds) {
    const k = kichThuoc(g, d.s, d.o);
    if (k) L.push({ d, w: k[0] + 12, h: k[1] * 1.12 + 12, x: d.x, y: d.y });
  }
  for (let it = 0; it < lan; it++) {
    for (const a of L) {
      let fx = (a.d.x - a.x) * 0.12, fy = (a.d.y - a.y) * 0.12;
      for (const b of L) {
        if (b === a) continue;
        const dx = a.x - b.x, dy = a.y - b.y, ox = (a.w + b.w) / 2 - Math.abs(dx), oy = (a.h + b.h) / 2 - Math.abs(dy);
        if (ox > 0 && oy > 0) { const l = Math.hypot(dx, dy) || 1, m = Math.min(ox, oy) * 0.5; fx += dx / l * m; fy += dy / l * m; }
      }
      for (const v of vat) {
        if (Array.isArray(v)) {
          const cx = (v[0] + v[2]) / 2, cy = (v[1] + v[3]) / 2, dx = a.x - cx, dy = a.y - cy;
          const ox = (a.w + v[2] - v[0]) / 2 - Math.abs(dx), oy = (a.h + v[3] - v[1]) / 2 - Math.abs(dy);
          if (ox > 0 && oy > 0) { const l = Math.hypot(dx, dy) || 1, m = Math.min(ox, oy) * 0.6; fx += dx / l * m; fy += dy / l * m; }
        } else {
          const nx = kep(v.x, a.x - a.w / 2, a.x + a.w / 2), ny = kep(v.y, a.y - a.h / 2, a.y + a.h / 2);
          const sau = v.r - Math.hypot(v.x - nx, v.y - ny);
          if (sau > 0) { const dx = a.x - v.x, dy = a.y - v.y, l = Math.hypot(dx, dy) || 1; fx += dx / l * sau * 0.6; fy += dy / l * sau * 0.6; }
        }
      }
      a.x = kep(a.x + fx, 12 + a.w / 2, W - 12 - a.w / 2);
      a.y = kep(a.y + fy, 140 + a.h / 2, 950 - a.h / 2);
    }
  }
  for (const a of L) chu(g, a.d.s, a.x, a.y, { ...a.d.o, can: 'center', goc: 'middle' });
}
/** Góc a (rad, mọi giá trị) có nằm trong cung [tu, den) (độ, đi theo chiều tăng) không. */
export function trongCung(a, tu, den) {
  const x = (((a / D2R - tu) % 360) + 360) % 360, dai = (((den - tu) % 360) + 360) % 360;
  return x < dai;
}

/* ---------- vẽ 2D ---------- */
export function nen(g) { g.setLineDash([]); g.globalAlpha = 1; g.fillStyle = MAU.nen; g.fillRect(0, 0, W, H); }

/**
 * Viết chữ theo mức nhãn. o: co (px, mặc định 30), dam, mau, can, goc ('top'|'middle'|'bottom'|'alphabetic'),
 * khoa (nhãn then chốt: còn hiện ở mức tối giản, vẽ to gấp đôi), nghieng, vien (màu viền; mặc định màu nền, null: không viền).
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
  // viền sáng (mặc định màu nền) dày ≥ 4,5 px mỗi bên: chữ vẫn đọc được khi nằm trên nét phụ (quỹ đạo, vết, dấu mờ)
  const vien = o.vien === undefined ? MAU.nen : o.vien;
  if (vien) { g.lineWidth = Math.max(9, co * 0.24); g.lineJoin = 'round'; g.strokeStyle = vien; g.strokeText(s, x, y); }
  g.fillStyle = o.mau || MAU.ink; g.fillText(s, x, y);
}

/** Tiêu đề cảnh (≥ 44 px) và tối đa 2 dòng chú thích (36 px). */
export function tieuDe(g, ten, ...dong) {
  chu(g, ten, 48, 72, { co: 46, dam: 700, mau: MAU.navy, vien: null });
  dong.forEach((d, i) => chu(g, d, 48, 124 + i * 46, { co: 36, dam: 400, vien: null }));
}
/** Một dòng ghi chú tỉ lệ và dòng nguồn ở đáy sân khấu. */
export function chanTrang(g, ghiChu) {
  chu(g, ghiChu, 48, 1036, { co: 24, dam: 400, nghieng: true, mau: MAU.slate, vien: null });
  chu(g, NGUON, 48, 1066, { co: 22, dam: 400, mau: MAU.slate, vien: null });
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

/* TẠM trong lúc chuyển các cảnh sang quy tắc cố định; xoá khi xong. */
export const vatCan = () => {}, vatCanDoan = () => {}, moiKhung = () => {};
export function quanh(x, y, r, thuTu = '01234567') {
  const d = [[x + r, y, { can: 'left', goc: 'middle' }], [x - r, y, { can: 'right', goc: 'middle' }], [x, y + r, { can: 'center', goc: 'top' }], [x, y - r, { can: 'center', goc: 'bottom' }],
    [x + r * 0.75, y + r * 0.75, { can: 'left', goc: 'top' }], [x - r * 0.75, y + r * 0.75, { can: 'right', goc: 'top' }], [x + r * 0.75, y - r * 0.75, { can: 'left', goc: 'bottom' }], [x - r * 0.75, y - r * 0.75, { can: 'right', goc: 'bottom' }]];
  return [...thuTu].map((c) => d[+c]);
}
export function chuTranh(g, s, ds, o = {}) { const [x, y, r] = ds[0]; if (!o.tuyChon) chu(g, s, x, y, r ? { ...o, ...r } : o); }
