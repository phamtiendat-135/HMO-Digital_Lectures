// Sóng biển: hạt nước quay vòng, năng lượng truyền đi (HDHDC · Bài 5).
// Nghiệm sóng tuyến tính Airy, T = 10 s. Mọi hình là hàm thuần của t (xem docs/STANDARDS.md mục 2).
import { deepScene, shallowScene, pos, OMEGA, PI2 } from './vatly.js';

/* ===================== HẰNG SỐ ===================== */
const W = 1440, HS = 1080;
const T = 10;                       // chu kỳ sóng (s)
const L_SAU = 156;                  // bước sóng nước sâu (m)
const C_SAU = L_SAU / T;            // 15,6 m/s
const TG = T / 4;                   // 1 giây hoạt hình = 2,5 giây thực (1 chu kỳ chiếu trong 4 s)
const DAI_CANH = 16;                // mỗi cảnh có giờ = 4 chu kỳ hiển thị, nối cảnh liền pha
const LAP_TU_DO = 4;                // cảnh tự do lặp đúng 1 chu kỳ
const BUOC = 0.5;                   // 1/8 chu kỳ = 0,5 s hoạt hình
const HIEN_LOP = 0.4;               // lớp mới hiện trong 0,4 s đầu cảnh
const BLEND = [48, 49], RAMP = [49, 57]; // cảnh 4: hoà sang vùng nông, rồi đáy nâng dần 16 → 7,8 m
const FONT = '"Be Vietnam Pro","Segoe UI",Arial,sans-serif';
const MAU = { navy: '#0A2E5C', ocean: '#1B4E8F', sky: '#60C0F0', orange: '#F07800', ink: '#0F1E3A', slate: '#546E8F', red: '#D62828', cat: '#E3CC98', vienCat: '#B8975A', chuCat: '#5A4520' };

// Độ mờ các lớp ở cuối mỗi cảnh; cảnh sau bắt đầu từ giá trị của cảnh trước.
const LOP0 = { grid: 0, red: 0, depth: 0, wave: 0, focus: 0 };
const LOP = {
  phao: LOP0,
  'quay-vong': { grid: 1, red: 1, depth: 0, wave: 0, focus: 0 },
  'theo-do-sau': { grid: 1, red: 1, depth: 1, wave: 1, focus: 1 },
  'nong-dan': { grid: 1, red: 1, depth: 1, wave: 1, focus: 0.5 },
  'tu-kham-pha': { grid: 1, red: 1, depth: 1, wave: 1, focus: 0 },
};
const TRUOC = { phao: LOP0, 'quay-vong': LOP.phao, 'theo-do-sau': LOP['quay-vong'], 'nong-dan': LOP['theo-do-sau'], 'tu-kham-pha': LOP['tu-kham-pha'] };

const CHU = {
  phao: ['Phao có bị sóng đẩy vào bờ không?', 'Nhìn mốc nét đứt: sóng đi qua, phao gần như quay về chỗ cũ.'],
  'quay-vong': ['Hạt nước quay vòng tròn tại chỗ', 'Sau mỗi chu kỳ (10 s) hạt đỏ gần như về chỗ cũ, còn đỉnh sóng đã đi 156 m.'],
  'theo-do-sau': ['Càng xuống sâu, vòng quay càng nhỏ', 'Bán kính quỹ đạo giảm theo hàm mũ: 100% → 50% → 21% → 9% → 4% ở độ sâu L/2.'],
  'nong-dan': ['Vào vùng nước nông dần, quỹ đạo bị đáy ép bẹt', 'T vẫn 10 s; sóng ngắn lại (L ≈ 83 m) và chậm lại (C ≈ 8,3 m/s).'],
  'tu-kham-pha': ['Tự khám phá', 'Đổi độ cao sóng, vùng nước, vectơ vận tốc bằng điều khiển của cảnh.'],
};
const NGUON = 'Lý thuyết sóng tuyến tính (Airy); T = 10 s, H = 2 m là giá trị minh hoạ.';

/* ===================== TRẠNG THÁI NGOÀI t (chỉ cảnh tự do) ===================== */
let cv, ctx, off, octx, dpr = 1, giam = false, mucNhan = 'day-du';
const DK = { H: 2, nong: false, vet: true, vanToc: false, lech: 0 };
let quangNong = null; // bảng quãng đường đỉnh sóng trong cảnh 4 (tính sẵn)

/* ===================== TIỆN ÍCH ===================== */
const kep = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const em = (x) => 1 - Math.pow(1 - kep(x), 3);
const fmt = (x, d) => x.toFixed(d).replace('.', ',');
const fmtNguyen = (x) => String(Math.round(x)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const font = (dam, co) => `${dam} ${co}px ${FONT}`;

function rrect(c, x, y, w, h, r) {
  c.beginPath(); c.moveTo(x + r, y); c.lineTo(x + w - r, y); c.quadraticCurveTo(x + w, y, x + w, y + r);
  c.lineTo(x + w, y + h - r); c.quadraticCurveTo(x + w, y + h, x + w - r, y + h); c.lineTo(x + r, y + h);
  c.quadraticCurveTo(x, y + h, x, y + h - r); c.lineTo(x, y + r); c.quadraticCurveTo(x, y, x + r, y); c.closePath();
}
// Nhãn nền Navy chữ trắng, 30 px
function pill(c, text, x, y, alpha, align) {
  if (alpha < 0.02) return;
  c.save(); c.globalAlpha = alpha; c.font = font(600, 30);
  const w = c.measureText(text).width + 20, x0 = align === 'right' ? x - w : x;
  rrect(c, x0, y - 22, w, 44, 8); c.fillStyle = 'rgba(10,46,92,0.9)'; c.fill();
  c.fillStyle = '#FFFFFF'; c.textBaseline = 'middle'; c.textAlign = 'left'; c.fillText(text, x0 + 10, y + 1); c.restore();
}
function arrow(c, x1, y1, x2, y2, head, color, width) {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  c.strokeStyle = color; c.fillStyle = color; c.lineWidth = width; c.lineCap = 'round';
  c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2 - Math.cos(ang) * head * 0.6, y2 - Math.sin(ang) * head * 0.6); c.stroke();
  c.beginPath(); c.moveTo(x2, y2);
  c.lineTo(x2 - head * Math.cos(ang - 0.45), y2 - head * Math.sin(ang - 0.45));
  c.lineTo(x2 - head * Math.cos(ang + 0.45), y2 - head * Math.sin(ang + 0.45)); c.closePath(); c.fill();
}
function dot(c, X, Y, r, fill, stroke, lw, alpha) {
  if (alpha < 0.02) return;
  c.globalAlpha = alpha; c.beginPath(); c.arc(X, Y, r, 0, PI2);
  c.fillStyle = fill; c.fill(); c.lineWidth = lw; c.strokeStyle = stroke; c.stroke(); c.globalAlpha = 1;
}
// Ngắt dòng theo bề rộng
function ngatDong(c, text, rong) {
  const tu = text.split(' '), dong = [];
  let cur = '';
  for (const w of tu) {
    const thu = cur ? cur + ' ' + w : w;
    if (c.measureText(thu).width > rong && cur) { dong.push(cur); cur = w; } else cur = thu;
  }
  if (cur) dong.push(cur);
  return dong;
}

/* ===================== TRẠNG THÁI TẠI t ===================== */
// Trả về mọi thứ cần vẽ tại t — không đọc gì ngoài t, id cảnh và giá trị điều khiển.
function trangThaiTai(t, id) {
  const tuDo = id === 'tu-kham-pha';
  const batDau = { phao: 0, 'quay-vong': 16, 'theo-do-sau': 32, 'nong-dan': 48 }[id] ?? 0;
  const tc = tuDo ? t : t - batDau;              // thời gian trong cảnh
  const tp = TG * (tuDo ? t + DK.lech : t);      // thời gian vật lý (s)
  const den = LOP[id], tu = TRUOC[id], k = giam ? 1 : em(tc / HIEN_LOP);
  const ly = {};
  for (const key in den) ly[key] = tuDo ? den[key] : tu[key] + (den[key] - tu[key]) * k;
  let blend = 0, ramp = 0;
  if (id === 'nong-dan') {
    blend = giam ? (t >= (BLEND[0] + BLEND[1]) / 2 ? 1 : 0) : kep((t - BLEND[0]) / (BLEND[1] - BLEND[0]));
    ramp = kep((t - RAMP[0]) / (RAMP[1] - RAMP[0]));
  } else if (tuDo && DK.nong) { blend = 1; ramp = 1; }
  const H = tuDo ? DK.H : 2;
  return { id, tuDo, tc, tp, ly, blend, ramp, H, vet: tuDo ? DK.vet : true, vanToc: tuDo && DK.vanToc };
}

// Quãng đường đỉnh sóng đi được trong cảnh 4 (tốc độ pha đổi khi đáy nâng) — tích phân sẵn, bước 0,01 s.
function tinhQuangNong() {
  const n = DAI_CANH * 100, bang = new Float64Array(n + 1);
  let s = 0;
  for (let i = 1; i <= n; i++) {
    const t = BLEND[0] + (i - 0.5) / 100;
    const blend = kep((t - BLEND[0]) / (BLEND[1] - BLEND[0])), ramp = kep((t - RAMP[0]) / (RAMP[1] - RAMP[0]));
    const C = blend >= 0.5 ? shallowScene(1, ramp).C : C_SAU;
    s += C * TG / 100; bang[i] = s;
  }
  return bang;
}

/* ===================== VẼ VÙNG NƯỚC (một cảnh vật lý) ===================== */
function trail(c, sc, x0, z0, tp, color, amax, width) {
  if (amax < 0.02) return;
  const N = 48, s = sc.s; c.strokeStyle = color; c.lineWidth = width; c.lineCap = 'round';
  let p = pos(sc, x0, z0, tp - T);
  for (let j = 1; j <= N; j++) {
    const q = pos(sc, x0, z0, tp - T + T * j / N);
    c.globalAlpha = amax * j / N; c.beginPath();
    c.moveTo(p.x * s, sc.ys - p.z * s); c.lineTo(q.x * s, sc.ys - q.z * s); c.stroke(); p = q;
  }
  c.globalAlpha = 1;
}
function guide(c, sc, x0, z0, alpha) {
  if (alpha < 0.02) return;
  const s = sc.s; c.save(); c.globalAlpha = alpha; c.setLineDash([5, 5]); c.lineWidth = 1.6; c.strokeStyle = '#FFFFFF';
  c.beginPath(); c.ellipse(x0 * s, sc.ys - z0 * s, Math.max(0.01, sc.Ah(z0) * s), Math.max(0.01, sc.Av(z0) * s), 0, 0, PI2); c.stroke(); c.restore();
}
function buoy(c, X, Y, ang) {
  c.save(); c.translate(X, Y); c.rotate(ang); c.scale(1.35, 1.35);
  c.lineJoin = 'round';
  c.beginPath(); c.moveTo(0, -36); c.lineTo(0, -22); c.strokeStyle = MAU.navy; c.lineWidth = 2; c.stroke();
  c.beginPath(); c.moveTo(0, -37); c.lineTo(13, -32.5); c.lineTo(0, -28); c.closePath(); c.fillStyle = MAU.navy; c.fill();
  c.beginPath(); c.moveTo(-9, -7); c.lineTo(0, -23); c.lineTo(9, -7); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(-16, -7); c.lineTo(16, -7); c.quadraticCurveTo(15, 12, 0, 13); c.quadraticCurveTo(-15, 12, -16, -7); c.closePath();
  c.fillStyle = '#FFFFFF'; c.fill(); c.strokeStyle = MAU.navy; c.lineWidth = 2; c.stroke();
  c.beginPath(); c.rect(-15.5, -2, 31, 5); c.fillStyle = MAU.sky; c.fill();
  c.restore();
}

function veNuoc(c, sc, st) {
  const s = sc.s, ys = sc.ys, tp = st.tp, ly = st.ly, Ah0 = sc.Ah(0), Av0 = sc.Av(0);
  const nhan = mucNhan === 'day-du';
  c.setTransform(dpr, 0, 0, dpr, 0, 0);
  c.globalAlpha = 1; c.setLineDash([]);
  c.fillStyle = '#FFFFFF'; c.fillRect(0, 0, W, HS);

  // Mặt sóng theo đường của các hạt mặt (z0 = 0)
  const pts = [];
  for (let X = -90; X <= W + 90; X += 3) {
    const x0 = X / s, th = sc.k * (x0 - sc.xref) - OMEGA * tp;
    pts.push((x0 - Ah0 * Math.sin(th)) * s, ys - Av0 * Math.cos(th) * s);
  }
  c.beginPath(); c.moveTo(pts[0], pts[1]);
  for (let i = 2; i < pts.length; i += 2) c.lineTo(pts[i], pts[i + 1]);
  c.lineTo(W + 90, sc.bedY + 2); c.lineTo(-90, sc.bedY + 2); c.closePath();
  const g = c.createLinearGradient(0, ys - Av0 * s, 0, sc.bedY);
  g.addColorStop(0, MAU.sky); g.addColorStop(1, MAU.ocean); c.fillStyle = g; c.fill();

  // Đáy cát, nhãn đáy, thước tỉ lệ
  const dayCat = 965;
  c.fillStyle = MAU.cat; c.fillRect(0, sc.bedY, W, dayCat - sc.bedY);
  c.strokeStyle = MAU.vienCat; c.lineWidth = 2.4; c.beginPath(); c.moveTo(0, sc.bedY); c.lineTo(W, sc.bedY); c.stroke();
  if (nhan) {
    c.font = font(600, 30); c.fillStyle = MAU.chuCat; c.textBaseline = 'alphabetic'; c.textAlign = 'left';
    c.fillText(sc.deep ? 'Đáy biển (sâu hơn L/2)' : 'Đáy biển · h = ' + fmt(sc.h, 1) + ' m', 20, sc.bedY + 60);
    const bw = sc.bar * s, x2 = W - 24, x1 = x2 - bw, yb = sc.bedY + 52;
    c.strokeStyle = MAU.chuCat; c.lineWidth = 3; c.beginPath();
    c.moveTo(x1, yb - 8); c.lineTo(x1, yb); c.lineTo(x2, yb); c.lineTo(x2, yb - 8); c.stroke();
    c.textAlign = 'right'; c.fillText(sc.bar + ' m', x1 - 12, yb + 10); c.textAlign = 'left';
  }

  // Độ sâu tác động của sóng L/2
  let yL2 = 0;
  if (sc.deep && ly.wave > 0.02) {
    yL2 = ys + (L_SAU / 2) * s;
    c.save(); c.globalAlpha = ly.wave; c.setLineDash([12, 8]); c.strokeStyle = '#FFFFFF'; c.lineWidth = 2.4;
    c.beginPath(); c.moveTo(0, yL2); c.lineTo(W, yL2); c.stroke(); c.restore();
  }

  // Viền mặt sóng
  c.beginPath(); c.moveTo(pts[0], pts[1]);
  for (let i = 2; i < pts.length; i += 2) c.lineTo(pts[i], pts[i + 1]);
  c.strokeStyle = MAU.navy; c.lineWidth = 3.6; c.lineJoin = 'round'; c.stroke();

  // Mốc vị trí ban đầu của phao
  { const X = sc.buoyX0 * s;
    c.save(); c.setLineDash([7, 6]); c.strokeStyle = MAU.slate; c.lineWidth = 2;
    c.beginPath(); c.moveTo(X, ys - 92); c.lineTo(X, ys + 60); c.stroke(); c.restore();
    if (nhan) { c.font = font(600, 30); c.fillStyle = MAU.slate; c.textAlign = 'left'; c.textBaseline = 'alphabetic'; c.fillText('mốc ban đầu', X + Ah0 * s + 34, ys - 66); } }

  // Lưới hạt nước
  const dim = 1 - 0.7 * ly.focus, x0r = sc.cols[sc.redCol];
  if (ly.grid > 0.02) {
    for (let r = 0; r < sc.rows.length; r++) for (let i = 0; i < sc.cols.length; i++) {
      if (i === sc.redCol) continue;
      const p = pos(sc, sc.cols[i], sc.rows[r], tp);
      dot(c, p.x * s, ys - p.z * s, 6.6, '#FFFFFF', MAU.navy, 2.4, ly.grid * dim);
    }
    for (let r = 0; r < sc.rows.length; r++) {
      if (r === 0 && ly.red > 0.02) continue;
      if (st.vet) trail(c, sc, x0r, sc.rows[r], tp, MAU.red, 0.8 * ly.depth * ly.grid, 2.8);
      guide(c, sc, x0r, sc.rows[r], 0.6 * ly.depth);
      const p = pos(sc, x0r, sc.rows[r], tp);
      dot(c, p.x * s, ys - p.z * s, 6.6, '#FFFFFF', ly.depth > 0.5 ? MAU.red : MAU.navy, 2.8, ly.grid);
    }
  }
  // Mốc của hạt đỏ + hạt đỏ + vệt
  if (ly.red > 0.02) {
    const X = x0r * s;
    c.save(); c.globalAlpha = 0.7 * ly.red; c.setLineDash([6, 6]); c.strokeStyle = MAU.red; c.lineWidth = 2;
    c.beginPath(); c.moveTo(X, ys - 72); c.lineTo(X, ys + 56); c.stroke(); c.restore();
    guide(c, sc, x0r, 0, 0.6 * ly.depth);
    if (st.vet) trail(c, sc, x0r, 0, tp, MAU.red, 0.95 * ly.red, 3.6);
    const p = pos(sc, x0r, 0, tp);
    dot(c, p.x * s, ys - p.z * s, 10, MAU.red, '#FFFFFF', 3, ly.red);
  }
  // Nhãn L/2 (vẽ sau lưới để không bị hạt che)
  if (yL2 && nhan && ly.wave > 0.02) {
    c.save(); c.globalAlpha = ly.wave; c.font = font(700, 30); c.fillStyle = '#FFFFFF'; c.textAlign = 'right'; c.textBaseline = 'alphabetic';
    c.fillText('Độ sâu tác động của sóng (L/2): chuyển động chỉ còn 4%', W - 24, yL2 - 26); c.restore();
  }
  // Nhãn độ sâu (lề trái) và nhãn % / elip cạnh cột hạt đỏ
  if (nhan && ly.depth > 0.02) {
    for (let r = 0; r < sc.rows.length; r++) {
      const z0 = sc.rows[r], Y = ys - z0 * s;
      pill(c, sc.rowNames[r], 14, Y, ly.depth);
      const Xl = (x0r + sc.Ah(z0)) * s + 16;
      if (sc.deep) pill(c, Math.round(100 * Math.exp(sc.k * z0)) + '%', Xl, Y, ly.depth);
      else if (r === 0) pill(c, 'elip ' + fmt(2 * sc.Ah(0) / sc.E, 1) + ' × ' + fmt(2 * sc.Av(0) / sc.E, 1) + ' m', Xl, Y - 2, ly.depth);
      else if (r === sc.rows.length - 1) pill(c, 'sát đáy: chỉ tới – lui ' + fmt(2 * sc.Ah(z0) / sc.E, 1) + ' m', Xl, Y - 30, ly.depth);
    }
  }
  // Vectơ vận tốc: ở đỉnh hạt tiến cùng chiều sóng, ở chân lùi lại
  if (st.vanToc && ly.grid > 0.02) {
    const sv = (sc.deep ? 36 : 24) / (sc.a * sc.E * OMEGA);
    c.globalAlpha = ly.grid;
    for (let r = 0; r < sc.rows.length; r++) for (let i = 0; i < sc.cols.length; i++) {
      const p = pos(sc, sc.cols[i], sc.rows[r], tp), X = p.x * s, Y = ys - p.z * s;
      const dx = p.u * sv, dy = -p.w * sv;
      if (Math.hypot(dx, dy) < 5) continue;
      arrow(c, X, Y, X + dx, Y + dy, 10, MAU.navy, 5.4);
      arrow(c, X, Y, X + dx, Y + dy, 8, '#FFFFFF', 2.4);
    }
    c.globalAlpha = 1;
    if (nhan) {
      const base = OMEGA * tp, Lp = sc.L * s;
      const n = Math.ceil(((360 / s - sc.xref) * sc.k - base) / PI2);
      const xc = (sc.xref + (base + PI2 * n) / sc.k) * s;
      if (xc < 1200) {
        pill(c, 'Ở đỉnh: hạt tiến →', xc - 16, ys - Av0 * s + 60, ly.grid, 'right');
        const xt = xc + Lp / 2 < 1150 ? xc + Lp / 2 : xc - Lp / 2;
        if (xt > 150) pill(c, '← Ở chân: hạt lùi', xt + 16, ys + Av0 * s + 44, ly.grid);
      }
    }
  }
  // Phao: nhấp nhô theo quỹ đạo của hạt mặt, không trôi
  { const p = pos(sc, sc.buoyX0, 0, tp);
    const dX = 1 - Ah0 * sc.k * Math.cos(p.th), dZ = -Av0 * sc.k * Math.sin(p.th);
    buoy(c, p.x * s, ys - p.z * s, Math.atan2(-dZ, dX)); }
}

/* ===================== VẼ CHỮ CHUNG (không hoà, không di chuyển) ===================== */
function veChu(c, st, sc) {
  c.setTransform(dpr, 0, 0, dpr, 0, 0);
  c.globalAlpha = 1; c.textBaseline = 'alphabetic'; c.textAlign = 'left';
  const [tieuDe, phuDe] = CHU[st.id];

  // Mũi tên hướng truyền năng lượng: cố định ở góc trên trái vùng nước
  const ya = 372;
  arrow(c, 36, ya, 250, ya, 26, MAU.orange, 8);
  if (mucNhan === 'day-du') { c.font = font(700, 30); c.fillStyle = MAU.navy; c.fillText('Hướng truyền năng lượng', 268, ya + 11); }

  if (mucNhan === 'tat') return;
  if (mucNhan === 'toi-gian') {
    // Chỉ giữ tiêu đề, cỡ gấp đôi chuẩn tối thiểu
    c.font = font(700, 64); c.fillStyle = MAU.navy;
    ngatDong(c, tieuDe, W - 80).slice(0, 2).forEach((d, i) => c.fillText(d, 40, 76 + i * 76));
    return;
  }
  c.font = font(700, 48); c.fillStyle = MAU.navy; c.fillText(tieuDe, 40, 66);
  const aPhu = st.id === 'phao' ? (giam ? (st.tc >= 7 ? 1 : 0) : em((st.tc - 7) / HIEN_LOP)) : 1;
  if (aPhu > 0.02) {
    c.globalAlpha = aPhu; c.font = font(400, 36); c.fillStyle = MAU.ink;
    ngatDong(c, phuDe, W - 80).slice(0, 2).forEach((d, i) => c.fillText(d, 40, 118 + i * 46));
    c.globalAlpha = 1;
  }

  // Bộ đếm
  const dH = 2 * sc.Ah(0) / sc.E, dV = 2 * sc.Av(0) / sc.E;
  let d1;
  if (st.tuDo) d1 = `Mỗi chu kỳ 10 s, đỉnh sóng đi ${fmtNguyen(sc.C * T)} m`;
  else {
    const tSau = st.tc;
    const quang = st.id === 'nong-dan' ? quangNong[Math.round(kep(tSau, 0, DAI_CANH) * 100)] : C_SAU * TG * tSau;
    d1 = `Đỉnh sóng đã đi: ${fmtNguyen(quang)} m · ${Math.floor(TG * tSau / T + 0.003)} chu kỳ`;
  }
  const ai = st.id === 'phao' ? 'Phao' : 'Hạt đỏ';
  const d2 = sc.deep ? `${ai}: quay vòng Ø ${fmt(dH, 1)} m` : `${ai}: quay elip ${fmt(dH, 1)} × ${fmt(dV, 1)} m`;
  const d3 = 'Dịch chuyển thực ≈ 0 m (lý thuyết tuyến tính)';
  c.font = font(400, 36);
  const rong = Math.max(...[d1, d2, d3].map((d) => c.measureText(d).width)) + 40;
  const xb = W - 20 - rong, yb = 200;
  rrect(c, xb, yb, rong, 150, 12); c.fillStyle = 'rgba(255,255,255,0.95)'; c.fill();
  c.lineWidth = 2; c.strokeStyle = '#D5E1F0'; c.stroke();
  c.fillStyle = MAU.orange; c.fillRect(xb, yb + 10, 7, 130);
  c.fillStyle = MAU.ink; c.fillText(d1, xb + 24, yb + 44);
  c.fillStyle = MAU.red; c.font = font(600, 36); c.fillText(d2, xb + 24, yb + 90);
  c.fillStyle = MAU.ink; c.font = font(400, 36); c.fillText(d3, xb + 24, yb + 136);

  // Dòng thông số
  const hL = sc.h / sc.L;
  const thongSo = sc.deep
    ? `Nước sâu · H = ${fmt(st.H, 1)} m · T = 10 s · L = 156 m · C = 15,6 m/s`
    : `Vùng chuyển tiếp · h = ${fmt(sc.h, 1)} m · h/L ≈ ${fmt(hL, 2)} · H = ${fmt(st.H, 1)} m · L ≈ ${Math.round(sc.L)} m · C ≈ ${fmt(sc.C, 1)} m/s`;
  c.font = font(600, 30); c.fillStyle = MAU.ink; c.fillText(thongSo, 24, 1004);
  // Ghi chú tỉ lệ và dòng nguồn
  c.font = font(400, 24); c.fillStyle = MAU.slate;
  c.fillText('1 giây hoạt hình = 2,5 giây thực · ' + (sc.deep ? 'biên độ phóng đại 8 lần' : 'biên độ phóng đại 2 lần, thang cận cảnh (xem thước)'), 24, 1038);
  c.fillText(NGUON, 24, 1068);
}

/* ===================== ĐĂNG KÝ ===================== */
HMO.dangKy({
  canh: [
    { id: 'phao', batDau: 0, ketThuc: DAI_CANH },
    { id: 'quay-vong', batDau: DAI_CANH, ketThuc: 2 * DAI_CANH },
    { id: 'theo-do-sau', batDau: 2 * DAI_CANH, ketThuc: 3 * DAI_CANH },
    { id: 'nong-dan', batDau: 3 * DAI_CANH, ketThuc: 4 * DAI_CANH },
    { id: 'tu-kham-pha', lap: LAP_TU_DO, dieuKhien: [
      { id: 'do-cao', loai: 'truot', nhan: 'Độ cao sóng H', min: 0.5, max: 3, buoc: 0.1, thapPhan: 1, giaTri: 2, donVi: 'm' },
      { id: 'vung-nuoc', loai: 'chon', nhan: 'Vùng nước', giaTri: 'sau', luaChon: [{ giaTri: 'sau', nhan: 'Nước sâu' }, { giaTri: 'nong', nhan: 'Nước nông dần' }] },
      { id: 'vet', loai: 'bat-tat', nhan: 'Vệt quỹ đạo', giaTri: true },
      { id: 'van-toc', loai: 'bat-tat', nhan: 'Vectơ vận tốc', giaTri: false },
      { id: 'buoc', loai: 'nut', nhan: 'Bước 1/8 chu kỳ ▸' },
    ] },
  ],
  thoiLuong: 4 * DAI_CANH,
  khoiTao(sanKhau, mt) {
    dpr = mt.dpr; giam = !!mt.giamChuyenDong;
    const tao = () => { const c = document.createElement('canvas'); c.width = Math.round(W * dpr); c.height = Math.round(HS * dpr); c.style.width = W + 'px'; c.style.height = HS + 'px'; return c; };
    cv = tao(); ctx = cv.getContext('2d');
    cv.setAttribute('role', 'img');
    cv.setAttribute('aria-label', 'Mặt cắt thẳng đứng của sóng truyền từ trái sang phải: hạt nước quay vòng tại chỗ, phao nhấp nhô');
    off = tao(); octx = off.getContext('2d');
    sanKhau.append(cv);
    quangNong = tinhQuangNong();
    // Vẽ lại khi font nhúng đã sẵn (canvas không tự vẽ lại khi font về)
    if (document.fonts && document.fonts.load) {
      Promise.all([400, 600, 700].map((w) => document.fonts.load(`${w} 36px "Be Vietnam Pro"`, 'Sóng ạ'))).then(() => HMO.yeuCauVe(), () => {});
    }
  },
  ve(t, id) {
    const st = trangThaiTai(t, id), a = st.H / 2;
    const sau = deepScene(a), nong = shallowScene(a, st.ramp);
    // Ngoài khoảng hoà chỉ vẽ một cảnh (S-15)
    if (st.blend <= 0) veNuoc(ctx, sau, st);
    else if (st.blend >= 1) veNuoc(ctx, nong, st);
    else {
      veNuoc(ctx, sau, st); veNuoc(octx, nong, st);
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = st.blend; ctx.drawImage(off, 0, 0); ctx.globalAlpha = 1;
    }
    veChu(ctx, st, st.blend >= 0.5 ? nong : sau);
  },
  datNhan(muc) { mucNhan = muc; },
  khiDoi(id, v) {
    if (id === 'do-cao') DK.H = v;
    else if (id === 'vung-nuoc') DK.nong = v === 'nong';
    else if (id === 'vet') DK.vet = v;
    else if (id === 'van-toc') DK.vanToc = v;
    else if (id === 'buoc') {
      HMO.tamDung();
      DK.lech = (DK.lech + BUOC) % LAP_TU_DO;
    }
    HMO.yeuCauVe();
  },
  huy() { cv.remove(); },
});

