// Vật lý sóng tuyến tính (Airy) — giữ nguyên công thức của bản gốc, chỉ đổi thang vẽ sang sân khấu 1440 × 1080.
export const PI2 = 2 * Math.PI;
const G = 9.81;
const T = 10;
export const OMEGA = PI2 / T;
const L_SAU = 156, K_SAU = PI2 / L_SAU;      // nước sâu: L = 156 m, C = 15,6 m/s
const H_NONG = 7.8, H_BAT_DAU = 16;          // vùng chuyển tiếp h = 7,8 m (h/L ≈ 0,09); cận cảnh bắt đầu từ 16 m
const YS = 455;                               // mặt nước tĩnh trên sân khấu (px)
const PHONG_DAI_SAU = 8, PHONG_DAI_NONG = 2;  // hệ số phóng đại biên độ khi vẽ

// Quan hệ tán sắc ω² = g·k·tanh(k·h), giải k theo Newton (T giữ nguyên khi sóng vào vùng nông)
export function kOf(h) {
  let k = OMEGA * OMEGA / G;
  if (k * h < 0.5) k = OMEGA / Math.sqrt(G * h);
  for (let i = 0; i < 50; i++) {
    const th = Math.tanh(k * h), f = G * k * th - OMEGA * OMEGA;
    const df = G * (th + k * h * (1 - th * th));
    const dk = f / df; k -= dk;
    if (Math.abs(dk) < 1e-12) break;
  }
  return k;
}

export function deepScene(a) {
  const s = 5, k = K_SAU, E = PHONG_DAI_SAU;
  return {
    deep: true, s, ys: YS, E, a, k, h: Infinity, L: L_SAU, C: L_SAU / T, xref: 0,
    bedY: YS + 85 * s,
    rows: [0, -L_SAU / 9, -L_SAU / 4, -3 * L_SAU / 8, -L_SAU / 2],
    rowNames: ['Mặt · 0 m', 'L/9 · 17 m', 'L/4 · 39 m', '3L/8 · 59 m', 'L/2 · 78 m'],
    cols: Array.from({ length: 12 }, (_, i) => 250 / s + i * L_SAU / 9),
    buoyX0: 877 / s, redCol: 3, bar: 20,
    // x = x0 − a·e^(k·z0)·sinθ ; z = z0 + a·e^(k·z0)·cosθ  (nhân E để phóng đại khi vẽ)
    Ah(z0) { return a * E * Math.exp(k * z0); },
    Av(z0) { return a * E * Math.exp(k * z0); },
  };
}

const kCache = new Map();
const kNho = (h) => { const key = Math.round(h * 1e4); let k = kCache.get(key); if (k == null) { k = kOf(key / 1e4); kCache.set(key, k); } return k; };

export function shallowScene(a, ramp) {
  const s = 26.4, E = PHONG_DAI_NONG, h = H_BAT_DAU + (H_NONG - H_BAT_DAU) * ramp, k = kNho(h), sh = Math.sinh(k * h);
  return {
    deep: false, s, ys: YS, E, a, k, h, L: PI2 / k, C: PI2 / k / T, xref: 27,
    bedY: YS + h * s,
    rows: [0, -0.25 * h, -0.5 * h, -0.75 * h, -h],
    rowNames: ['Mặt', 'h/4', 'h/2', '3h/4', 'Đáy'],
    cols: Array.from({ length: 12 }, (_, i) => 250 / s + i * 4),
    buoyX0: 984 / s, redCol: 3, bar: 5,
    // x = x0 − a·cosh(k(z0+h))/sinh(kh)·sinθ ; z = z0 + a·sinh(k(z0+h))/sinh(kh)·cosθ
    Ah(z0) { return a * E * Math.cosh(k * (z0 + h)) / sh; },
    Av(z0) { return a * E * Math.sinh(k * (z0 + h)) / sh; },
  };
}

// θ = k·x0 − ω·t ; trả về vị trí (m, đã phóng đại E) và vận tốc
export function pos(sc, x0, z0, t) {
  const th = sc.k * (x0 - sc.xref) - OMEGA * t, Ah = sc.Ah(z0), Av = sc.Av(z0);
  return { x: x0 - Ah * Math.sin(th), z: z0 + Av * Math.cos(th), u: Ah * OMEGA * Math.cos(th), w: Av * OMEGA * Math.sin(th), th };
}
