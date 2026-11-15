// Số liệu và hình học của kênh SOFAR (tính một lần lúc tải, không phụ thuộc t).
// Nguồn: phao Argo 2902696, Biển Đông (12,0°N, 114,5°E), 22/9/2016; c tính bằng TEOS-10.
// Quỹ đạo tia lấy nguyên từ bản gốc (dò tia trên profile đầy đủ, figs2.py) — không dò lại.

export const W = 1440, H = 1080;
export const MAU = { navy: '#0A2E5C', ocean: '#1B4E8F', sky: '#60C0F0', orange: '#F07800', ink: '#0F1E3A', slate: '#546E8F' };
export const MAU_TIA = { 2: '#FFB04D', 4: '#F07800', 6: '#D9480F', 18: '#F07800' };

export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const Easing = {
  easeOutCubic: (t) => (--t) * t * t + 1,
  easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  easeOutQuart: (t) => 1 - (--t) * t * t * t,
  easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
};

// độ sâu (m), T (°C), ρ tại chỗ (kg/m³), c (m/s)
export const PROF = [[0, 29.5, 1020.6, 1542.4], [50, 27.9, 1021.8, 1540.4], [100, 22.1, 1024.2, 1528.0], [200, 14.7, 1026.5, 1508.4], [300, 11.8, 1027.5, 1500.2], [500, 8.7, 1029.0, 1492.6], [700, 6.5, 1030.3, 1487.3], [900, 5.0, 1031.5, 1484.8], [1140, 3.7, 1032.7, 1483.5], [1300, 3.3, 1033.5, 1484.1], [1500, 2.9, 1034.5, 1486.0], [1700, 2.7, 1035.4, 1488.3], [2000, 2.5, 1036.8, 1492.5]];
export const BND = [0, 25, 75, 150, 250, 400, 600, 800, 1020, 1220, 1400, 1600, 1850, 2000];
export const AXIS = 1140, CMIN = 1483.5, CMAT = 1542.4;

// Bố cục sân khấu. Tỉ lệ phóng đại trục đứng = (KY·1000)/KX = 350/10 = 35 lần.
export const SX0 = 510, SX1 = 1410, SY0 = 190, SY1 = 890;
export const KX = (SX1 - SX0) / 90, KY = (SY1 - SY0) / 2000;
export const X = (km) => SX0 + km * KX, Y = (z) => SY0 + z * KY;
export const CX0 = 150, CX1 = 400, CX = (c) => CX0 + (c - 1480) / 65 * (CX1 - CX0);
export const RX0 = 412, RX1 = 442;

export function vn(v, d = 0) {
  const s = Math.abs(v).toFixed(d); let [i, f] = s.split('.');
  i = i.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return (v < 0 ? '−' : '') + i + (f ? ',' + f : '');
}

function herm(y0, y1, d0, d1, h, t) {
  const t2 = t * t, t3 = t2 * t;
  return (2 * t3 - 3 * t2 + 1) * y0 + (t3 - 2 * t2 + t) * h * d0 + (-2 * t3 + 3 * t2) * y1 + (t3 - t2) * h * d1;
}
function spline(xs, ys, d) {
  const n = xs.length;
  return (x) => {
    let i = 0;
    if (x >= xs[n - 1]) i = n - 2; else while (i < n - 2 && x > xs[i + 1]) i++;
    const h = xs[i + 1] - xs[i];
    return herm(ys[i], ys[i + 1], d[i], d[i + 1], h, clamp((x - xs[i]) / h, 0, 1));
  };
}
function pchip(xs, ys) {
  const n = xs.length, h = [], m = [];
  for (let i = 0; i < n - 1; i++) { h[i] = xs[i + 1] - xs[i]; m[i] = (ys[i + 1] - ys[i]) / h[i]; }
  const d = new Array(n); d[0] = m[0]; d[n - 1] = m[n - 2];
  for (let i = 1; i < n - 1; i++) {
    if (m[i - 1] * m[i] <= 0) d[i] = 0;
    else { const w1 = 2 * h[i] + h[i - 1], w2 = h[i] + 2 * h[i - 1]; d[i] = (w1 + w2) / (w1 / m[i - 1] + w2 / m[i]); }
  }
  return spline(xs, ys, d);
}
export const cOf = pchip(PROF.map((p) => p[0]), PROF.map((p) => p[3]));

/** Đường gấp khúc màn hình → chuỗi d và độ dài cộng dồn (để lộ dần bằng stroke-dasharray). */
function duong(sp) {
  let d = '', cum = [0];
  for (let i = 0; i < sp.length; i++) {
    d += (i ? 'L' : 'M') + sp[i][0].toFixed(1) + ' ' + sp[i][1].toFixed(1);
    if (i) cum[i] = cum[i - 1] + Math.hypot(sp[i][0] - sp[i - 1][0], sp[i][1] - sp[i - 1][1]);
  }
  return { d, cum };
}

// Đường c(z) vẽ dần theo độ sâu: mẫu mỗi 10 m.
export const DUONG_C = (() => {
  const sp = []; for (let z = 0; z <= 2000; z += 10) sp.push([CX(cOf(z)), Y(z)]);
  const { d, cum } = duong(sp);
  return { d, dai: (z) => { const k = clamp(z / 10, 0, sp.length - 1), i = Math.min(sp.length - 2, Math.floor(k)); return cum[i] + (cum[i + 1] - cum[i]) * (k - i); } };
})();

function archFn(pts, s0, s1) {
  const xs = pts.map((p) => p[0]), zs = pts.map((p) => p[1]), n = pts.length, d = [s0];
  for (let i = 1; i < n - 1; i++) d[i] = (zs[i + 1] - zs[i - 1]) / (xs[i + 1] - xs[i - 1]);
  d[n - 1] = s1;
  return spline(xs, zs, d);
}
export const ARCH = {
  4: { lo: [[0, 1140], [2.8, 1327], [5.6, 1471], [8.4, 1560], [11.2, 1591], [14.0, 1560], [16.9, 1471], [19.7, 1327], [22.5, 1140]],
       up: [[0, 1140], [2.8, 952], [5.6, 812], [8.4, 740], [11.1, 714], [13.9, 740], [16.7, 812], [19.5, 953], [22.3, 1140]] },
  2: { lo: [[0, 1140], [4.3, 1276], [8.7, 1322], [13.0, 1276], [17.4, 1140]],
       up: [[0, 1140], [4.4, 1003], [8.8, 927], [13.1, 1003], [17.5, 1140]] },
  6: { lo: [[0, 1140], [3.3, 1465], [6.6, 1717], [9.8, 1873], [13.1, 1926], [16.4, 1873], [19.7, 1716], [23.0, 1465], [26.2, 1140]],
       up: [[0, 1140], [2.2, 910], [4.5, 716], [6.7, 576], [8.9, 513], [11.2, 576], [13.4, 717], [15.7, 911], [17.9, 1140]] },
};
const BUOC = 0.15; // km giữa hai mẫu
function taoTia(theta, dir) {
  const A = ARCH[theta], tn = 1000 * Math.tan(theta * Math.PI / 180);
  const lo = archFn(A.lo, tn, -tn), up = archFn(A.up, -tn, tn);
  const Llo = A.lo[A.lo.length - 1][0], Lup = A.up[A.up.length - 1][0];
  const segs = []; let x = 0, cur = dir > 0 ? 'lo' : 'up';
  while (x < 92) { const L = cur === 'lo' ? Llo : Lup; segs.push({ x0: x, L, f: cur === 'lo' ? lo : up }); x += L; cur = cur === 'lo' ? 'up' : 'lo'; }
  const seg = (xx) => segs.find((s) => xx <= s.x0 + s.L) || segs[segs.length - 1];
  const z = (xx) => { const s = seg(xx); return s.f(xx - s.x0); };
  const pts = []; for (let i = 0; i <= 600; i++) { const xx = i * BUOC; pts.push([xx, z(xx)]); }
  const cross = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, z1] = pts[i], [x2, z2] = pts[i + 1];
    for (let k = 1; k < BND.length - 1; k++) { const b = BND[k]; if ((z1 - b) * (z2 - b) < 0) cross.push({ x: x1 + (b - z1) / (z2 - z1) * (x2 - x1), b }); }
  }
  const { d, cum } = duong(pts.map((p) => [X(p[0]), Y(p[1])]));
  // Độ dài trên màn hình từ nguồn tới hoành độ xx (nội suy giữa hai mẫu).
  const dai = (xx) => { const k = clamp(xx / BUOC, 0, 600), i = Math.min(599, Math.floor(k)); return cum[i] + (cum[i + 1] - cum[i]) * (k - i); };
  /** Vị trí trong múi hiện tại: 0 ở trục, 0,5 ở điểm quay đầu. */
  const viTriMui = (xx) => { const s = seg(xx); return (xx - s.x0) / s.L; };
  return { theta, dir, z, cross, d, dai, viTriMui };
}
export const RAYS = { p4: taoTia(4, 1), m4: taoTia(4, -1), p2: taoTia(2, 1), m2: taoTia(2, -1), p6: taoTia(6, 1), m6: taoTia(6, -1) };

export function tiepTuyen(ray, x) {
  const a = [X(x - 0.05), Y(ray.z(x - 0.05))], b = [X(x + 0.05), Y(ray.z(x + 0.05))];
  const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1;
  return [dx / l, dy / l];
}

// Lịch chạy chậm của tia 4° (giây sau mốc Tia 4°): chậm còn 30% trong 15% múi quanh đỉnh, dừng 1,5 s ở đỉnh.
const V = 3.1, S0 = 1.0;
const SCHED = (() => {
  const seg = []; let t = S0, x = 0;
  const push = (dx, dt) => { seg.push({ t0: t, t1: t + dt, x0: x, x1: x + dx }); t += dt; x += dx; };
  for (const L of [22.5, 22.3]) {
    push(0.35 * L, 0.35 * L / V); push(0.15 * L, 0.15 * L / (0.3 * V)); push(0, 1.5);
    push(0.15 * L, 0.15 * L / (0.3 * V)); push(0.35 * L, 0.35 * L / V);
  }
  return seg;
})();
export const SLOW_END_X = 44.8;
export function slowX(s) {
  if (s <= S0) return 0;
  for (const g of SCHED) if (s <= g.t1) return g.x0 + (g.x1 - g.x0) * ((s - g.t0) / (g.t1 - g.t0));
  return SLOW_END_X;
}
function slowT(x) {
  for (const g of SCHED) if (g.x1 > g.x0 && x <= g.x1) return g.t0 + (x - g.x0) / (g.x1 - g.x0) * (g.t1 - g.t0);
  return SCHED[SCHED.length - 1].t1;
}
export const SLOW_CROSS = RAYS.p4.cross.filter((c) => c.x < SLOW_END_X).map((c) => ({ ...c, s: slowT(c.x) }));

// Bó tia (giây sau mốc Bó tia)
const BV = 9;
export const BUNDLE = [{ k: 'm4', st: 0.6 }, { k: 'p2', st: 1.8 }, { k: 'm2', st: 3.0 }, { k: 'p6', st: 4.2 }, { k: 'm6', st: 5.4 }];
const P4_EXT = 0.3;
export const bundleX = (k, u) => {
  if (k === 'p4') return clamp(SLOW_END_X + (u - P4_EXT) * BV, SLOW_END_X, 90);
  const b = BUNDLE.find((r) => r.k === k); return clamp((u - b.st) * BV, 0, 90);
};
export const BUNDLE_CROSS = [];
for (const r of BUNDLE) for (const c of RAYS[r.k].cross) BUNDLE_CROSS.push({ ...c, k: r.k, u: r.st + c.x / BV });
for (const c of RAYS.p4.cross) if (c.x > SLOW_END_X) BUNDLE_CROSS.push({ ...c, k: 'p4', u: P4_EXT + (c.x - SLOW_END_X) / BV });

// Tia 18° thoát kênh
export const R18 = (() => {
  const th = 18 * Math.PI / 180, c18 = Math.cos(th);
  const thS = Math.acos(Math.min(1, c18 * CMAT / CMIN));
  const f = archFn([[0, 1140], [1.0, 814], [2.0, 497], [3.0, 204], [3.6, 84], [4.1, 0]], -1000 * Math.tan(th), -1000 * Math.tan(thS));
  const pts = [];
  for (let x = 0; x < 4.1; x += 0.04) pts.push([x, f(x)]);
  pts.push([4.1, 0]); const iTouch = pts.length - 1;
  for (let x = 4.14; x < 8.2; x += 0.04) pts.push([x, f(8.2 - x)]);
  pts.push([8.2, AXIS]);
  let x = 8.2;
  for (let z = 1145; z <= 2000; z += 5) {
    const co = Math.min(0.99999, c18 * cOf(z - 2.5) / CMIN), tn = Math.sqrt(1 - co * co) / co;
    x += 5 / (1000 * tn); pts.push([x, z]);
  }
  const sp = pts.map((p) => [X(p[0]), Y(p[1])]);
  const { d, cum } = duong(sp);
  return { c18, pts, sp, cum, d, iTouch, Lt: cum[iTouch], Ltot: cum[cum.length - 1] };
})();
export function at18(L) {
  const { sp, cum, pts } = R18; let i = 0;
  while (i < cum.length - 2 && cum[i + 1] < L) i++;
  const f = clamp((L - cum[i]) / ((cum[i + 1] - cum[i]) || 1), 0, 1);
  return { sx: sp[i][0] + (sp[i + 1][0] - sp[i][0]) * f, sy: sp[i][1] + (sp[i + 1][1] - sp[i][1]) * f, z: pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f };
}

// Góc tia so với phương ngang theo định luật Snell: cos θ = cos θ₀ · c(z) / c_trục (S-06, không chuẩn hoá).
const COS4 = Math.cos(4 * Math.PI / 180);
export const goc4 = (z) => Math.acos(Math.min(1, COS4 * cOf(z) / CMIN)) * 180 / Math.PI;
export const goc18 = (z) => Math.acos(Math.min(1, R18.c18 * cOf(z) / CMIN)) * 180 / Math.PI;

// Màu lớp theo c (c nhỏ = xanh đậm), cột ρ (nhẹ = nhạt, đặc = đậm)
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a, b, t) => { const A = hex(a), B = hex(b); return 'rgb(' + A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',') + ')'; };
export const LAYERS = PROF.map((p, i) => ({
  z0: BND[i], z1: BND[i + 1], T: p[1], rho: p[2], c: p[3],
  fill: mix('#17457F', '#E3F3FB', Math.sqrt((p[3] - CMIN) / (CMAT - CMIN))),
  rfill: mix('#EEF1F5', '#0A2E5C', (p[2] - 1020.6) / (1036.8 - 1020.6)),
}));
