/** @jsxImportSource preact */
// Kênh SOFAR — Biển Đông (phao Argo 2902696). Mọi thứ là hàm thuần của t (giây hoạt hình, 0–100).
// Dựng bằng Preact (JSX biên dịch sẵn lúc build); bộ khung giữ đồng hồ và gọi ve(t).
import { render } from 'preact';
import {
  W, H, MAU, MAU_TIA, clamp, Easing, PROF, BND, AXIS, CMIN, SX0, SX1, SY0, SY1, X, Y, CX0, CX1, CX, RX0, RX1, vn,
  cOf, DUONG_C, RAYS, tiepTuyen, slowX, SLOW_CROSS, BUNDLE, bundleX, BUNDLE_CROSS, R18, at18, goc4, goc18, LAYERS,
} from './du-lieu.js';

const FONT = '"Be Vietnam Pro","Segoe UI",Arial,sans-serif';
// Mốc giây của 7 cảnh
const L = 0, P = 8, S = 18, R = 22, B = 55, E = 72, Z = 84, HET = 100;

const MOTION = {
  enter: (T, a, d = 0.5) => Easing.easeOutCubic(clamp((T - a) / d, 0, 1)),
  draw: (T, a, b) => Easing.easeInOutCubic(clamp((T - a) / (b - a), 0, 1)),
  pop: (T, a, d = 0.45) => Easing.easeOutQuart(clamp((T - a) / d, 0, 1)),
};
const win = (T, a, b, f = 0.4) => Math.min(MOTION.enter(T, a, f), 1 - MOTION.enter(T, b - f, f));

// Chú thích của tia 4° (giây sau mốc R). Mỗi chú thích ≤ 20 từ, đúng các dòng ghi sẵn (≤ 2 dòng).
// Vùng đặt: khi tia ở múi dưới (x 510–735 px) dùng góc dưới-phải hoặc nửa trên; khi tia ở múi trên dùng nửa trên-phải hoặc góc dưới-phải.
const CALLOUTS = [
  { a: 1.2, b: 5.6, x: 770, top: 628, tx: 4.0, dong: ['↓ Xuống lớp ĐẶC HƠN:', 'ρ 1.032,7 → 1.034,5 kg/m³'] },
  { a: 3.2, b: 5.8, x: 770, top: 766, dong: ['Nhưng c TĂNG: 1.483,5 → 1.486,0 m/s', '→ tia bị bẻ dần về phương ngang.'] },
  { a: 6.4, b: 10.6, x: 540, bot: 548, tx: 11.25, dong: ['Điểm quay đầu: c = 1.483,5 / cos 4°', '= 1.487,1 m/s → tia nằm ngang rồi đi lên.'] },
  { a: 10.8, b: 14.0, x: 770, top: 700, tx: 17.0, dong: ['↑ Về lớp có c nhỏ hơn', '→ tia dốc lại.'] },
  { a: 14.2, b: 17.4, x: 790, top: 640, tx: 22.5, dong: ['Qua trục SOFAR —', 'chỗ âm đi chậm nhất.'] },
  { a: 16.6, b: 21.0, x: 960, bot: 408, tx: 26.5, dong: ['↑ Lên lớp NHẸ HƠN:', 'ρ 1.032,7 → 1.030,3 kg/m³'] },
  { a: 18.4, b: 21.0, x: 790, top: 766, dong: ['nhưng ẤM HƠN: 3,7 → 6,5 °C', '→ c TĂNG → tia bị bẻ xuống.'] },
  { a: 21.2, b: 25.4, x: 960, bot: 400, tx: 33.65, dong: ['Điểm quay đầu phía trên', '→ tia quay xuống.'] },
];
const THE_TONG_KET = [
  ['Tốc độ âm nhỏ nhất ở ≈ 1.140 m (Biển Đông) = trục SOFAR.'],
  ['Tia âm luôn bẻ về phía c nhỏ hơn, không phải phía nước', 'đặc hơn: c = √(K/ρ).'],
  ['Âm bị nhốt quanh trục, không chạm mặt, không chạm đáy', '→ âm tần thấp đi được hàng nghìn km.'],
];
// Nhãn ρ · c chỉ cho 4 lớp mốc (S-10): mặt, 200 m, trục 1.140 m, 2.000 m. Các lớp khác ở khung Giải thích.
const NHAN_LOP = [{ i: 0, top: 198 }, { i: 3, top: 286 }, { i: 8, top: 540 }, { i: 12, top: 798 }];
const VOLUME = 'M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6M19.364 18.364a9 9 0 0 0 0-12.728';

const st = { goc: null, muc: 'day-du', giam: false, tenCanh: {} };

const BOX = { position: 'absolute', background: '#FFFFFF', border: '1.5px solid rgba(84,110,143,0.55)', borderRadius: '10px', padding: '10px 18px', font: '400 36px/1.3 ' + FONT, color: MAU.ink, boxShadow: '0 4px 12px rgba(10,46,92,0.12)', whiteSpace: 'nowrap', pointerEvents: 'none' };
function Box({ x, top, bot, op, style, dong, cls }) {
  if (op <= 0.001) return null;
  const pos = top != null ? { top: top + 'px' } : { bottom: (H - bot) + 'px' };
  return <div class={cls || 'chu-thich'} style={{ ...BOX, left: x + 'px', ...pos, opacity: op, transform: `translateY(${((1 - op) * 8).toFixed(2)}px)`, ...style }}>
    {dong.map((d, i) => <div key={i}>{d}</div>)}
  </div>;
}
function Leader({ x1, y1, x2, y2, op }) {
  if (op <= 0.001) return null;
  return <g opacity={op}>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={MAU.slate} stroke-width="2" />
    <circle cx={x2} cy={y2} r="6" fill="#fff" stroke={MAU.navy} stroke-width="2.5" />
  </g>;
}
function Dot({ x, y, color, op = 1, T }) {
  if (op <= 0.001) return null;
  const pulse = st.giam ? 1 : 1 + 0.12 * Math.sin(T * Math.PI * 2);
  return <g opacity={op}>
    <circle cx={x} cy={y} r={(20 * pulse).toFixed(2)} fill={color} opacity="0.16" />
    <circle cx={x} cy={y} r="12" fill={color} opacity="0.3" />
    <circle cx={x} cy={y} r="7" fill={color} stroke="#fff" stroke-width="1.5" />
  </g>;
}
function BendArrow({ ray, x, op }) {
  const Pt = [X(x), Y(ray.z(x))], u = tiepTuyen(ray, x), toward = Pt[1] > Y(AXIS) ? -1 : 1;
  let n = [-u[1], u[0]]; if (n[1] * toward < 0) n = [u[1], -u[0]];
  const s = 6 + 4 * (1 - op);
  const S0 = [Pt[0] + u[0] * s, Pt[1] + u[1] * s], Cc = [Pt[0] + u[0] * 28, Pt[1] + u[1] * 28], En = [Pt[0] + u[0] * 34 + n[0] * 14, Pt[1] + u[1] * 34 + n[1] * 14];
  const dx = En[0] - Cc[0], dy = En[1] - Cc[1], l = Math.hypot(dx, dy), ux = dx / l, uy = dy / l;
  const head = `M${En[0] - ux * 9 - uy * 5} ${En[1] - uy * 9 + ux * 5}L${En[0]} ${En[1]}L${En[0] - ux * 9 + uy * 5} ${En[1] - uy * 9 - ux * 5}`;
  const cung = `M${S0[0]} ${S0[1]}Q${Cc[0]} ${Cc[1]} ${En[0]} ${En[1]}`;
  return <g opacity={op} transform={`translate(${n[0] * 10} ${n[1] * 10})`} fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d={cung} stroke={MAU.navy} stroke-width="5" opacity="0.5" />
    <path d={head} stroke={MAU.navy} stroke-width="5" opacity="0.5" />
    <path d={cung} stroke="#fff" stroke-width="2.5" />
    <path d={head} stroke="#fff" stroke-width="2.5" />
  </g>;
}
// Lộ dần một đường tính sẵn: từ độ dài a tới b (đơn vị px màn hình).
const lo = (a, b) => (a <= 0 ? `${b.toFixed(1)} 99999` : `0 ${a.toFixed(1)} ${(b - a).toFixed(1)} 99999`);
const SVGT = (props) => <text font-family={FONT} {...props} />;

function Piece({ T }) {
  const du = st.muc === 'day-du', coChu = st.muc !== 'tat', giam = st.giam;

  // ---- Lớp nước / profile
  const frameOp = MOTION.enter(T, L + 0.2, 0.6);
  const layerOp = (i) => MOTION.enter(T, L + 0.8 + i * 0.5, 0.6);
  const zMax = clamp((T - (P + 0.6)) / 8, 0, 1) * 2000;
  const tAxis = P + 0.6 + AXIS / 2000 * 8;
  const axisPop = MOTION.pop(T, tAxis);
  const dashDraw = MOTION.draw(T, tAxis + 0.3, tAxis + 1.4);
  const axisLabelOp = MOTION.enter(T, tAxis + 0.3);
  const rhoLabelOp = MOTION.enter(T, P + 1.4);
  const msgOp = win(T, P + 6.2, S + 3.6);
  const nhanLopTat = 1 - MOTION.enter(T, R, 0.5);

  // ---- Nguồn âm
  const srcOp = MOTION.pop(T, S + 0.2);
  const srcLabelOp = win(T, S + 0.8, R + 1.0);
  const rings = giam ? [] : [0.6, 1.3, 2.0].map((o) => clamp((T - (S + o)) / 1.4, 0, 1));

  // ---- Tia 4° chạy chậm, rồi tiếp tục trong bó tia
  const s = T - R, u = T - B, e = T - E;
  const xp4 = T < B ? slowX(s) : bundleX('p4', u);
  const rayVis = T >= R + 0.3;
  const dimBundle = 1 - 0.65 * MOTION.enter(T, E, 0.8);
  const flash = {};
  if (!giam) for (const c of SLOW_CROSS) { const d = T - (R + c.s); if (d >= 0 && d < 0.4) flash[c.b] = Math.max(flash[c.b] || 0, Math.sin((1 - d / 0.4) * Math.PI / 2)); }
  const arrows = SLOW_CROSS.filter((c) => { const d = T - (R + c.s); return d >= 0 && d < 1.4; }).map((c) => ({ c, op: win(T, R + c.s, R + c.s + 1.4, 0.3) }));
  const localFlash = giam ? [] : BUNDLE_CROSS.filter((c) => { const d = T - (B + c.u); return d >= 0 && d < 0.4; });

  const call = CALLOUTS.map((c) => ({ ...c, op: win(T, R + c.a, R + c.b) }));
  const sumOp = win(T, R + 28.6, B + 0.6);

  // ---- Bó tia
  const legendOp = win(T, B + 6.0, E + 0.6);
  const bandOp = MOTION.enter(T, B + 8.0, 1.0);
  const bandLabelOp = win(T, B + 8.5, E + 0.8, 0.5);

  // ---- Tia 18° thoát kênh
  let L18 = 0;
  if (e > 0.8) L18 = e < 3.8 ? R18.Lt * Easing.easeInOutSine(clamp((e - 0.8) / 3.0, 0, 1)) : e < 4.4 ? R18.Lt : R18.Lt + (R18.Ltot - R18.Lt) * clamp((e - 4.4) / 3.9, 0, 1);
  const p18 = at18(L18);
  const touched = e >= 3.8;
  const preOp = touched ? 1 - 0.65 * MOTION.enter(T, E + 3.8, 1.2) : 1;
  const dot18Op = MOTION.enter(T, E + 0.6, 0.3) * (touched ? 1 - 0.4 * MOTION.enter(T, E + 3.8, 0.6) : 1) * (1 - MOTION.enter(T, E + 7.9, 0.5));
  const splash = giam ? [] : [0, 0.35].map((o) => clamp((e - 3.8 - o) / 1.2, 0, 1));
  const escLabelOp = win(T, E + 4.0, E + 8.4);
  const esc2Op = win(T, E + 8.4, Z + 0.6);

  // ---- Ô góc tia (S-06): Snell thuần, gần đỉnh múi làm tròn về 0,0° khi < 0,8°
  let angTitle = 'Tia 4°', ang = 4;
  if (T >= E) { angTitle = 'Tia 18°'; ang = goc18(p18.z); }
  else {
    ang = goc4(RAYS.p4.z(xp4));
    const vt = RAYS.p4.viTriMui(xp4);
    if (Math.abs(vt - 0.5) <= 0.15 && ang < 0.8) ang = 0;
  }
  st.goc = { tieuDe: angTitle, giaTri: vn(ang, 1) };
  const angOp = st.muc !== 'tat' ? Math.max(win(T, R + 0.3, B + 0.8), win(T, E + 0.6, Z + 0.5)) : 0;

  // ---- Tổng kết: tối đa 2 thẻ cùng lúc. Thẻ 1 ở ô trên, thẻ 2 ô dưới; thẻ 1 rút đi, thẻ 2 lên ô trên, thẻ 3 vào ô dưới.
  const veil = MOTION.enter(T, Z, 1.0);
  const O_TREN = 330, O_DUOI = 560;
  const len2 = MOTION.draw(T, Z + 8.3, Z + 9.0);
  const the = [
    { op: Math.min(MOTION.enter(T, Z + 0.6, 0.6), 1 - MOTION.enter(T, Z + 8.0, 0.4)), y: O_TREN },
    { op: MOTION.enter(T, Z + 3.0, 0.6), y: O_DUOI + (O_TREN - O_DUOI) * len2 },
    { op: MOTION.enter(T, Z + 9.2, 0.6), y: O_DUOI },
  ];

  const p4Dot = rayVis && xp4 < 89.5 ? MOTION.pop(T, R + 0.3) * (1 - MOTION.enter(T, B + 5.0, 0.4) * (xp4 >= 89 ? 1 : 0)) : 0;
  const cDai = zMax > 0 ? DUONG_C.dai(zMax) : 0;
  const tenCanh = st.tenCanh[T >= Z ? 'tong-ket' : T >= E ? 'tia-thoat' : T >= B ? 'bo-tia' : T >= R ? 'tia-4' : T >= S ? 'nguon-am' : T >= P ? 'profile' : 'lop-nuoc'] || '';

  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', background: '#FFFFFF', fontFamily: FONT, color: MAU.ink, overflow: 'hidden' }}>
      {/* thanh tiêu đề */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: W + 'px', height: '96px', background: MAU.navy, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', boxSizing: 'border-box' }}>
        {coChu && <div class="tieu-de" style={{ font: (du ? '700 44px/1.2 ' : '700 60px/1.2 ') + FONT, color: '#FFFFFF', whiteSpace: 'nowrap' }}>Kênh SOFAR hình thành như thế nào?</div>}
        {du && <div class="ten-canh" style={{ font: '600 30px/1.2 ' + FONT, color: MAU.sky, whiteSpace: 'nowrap' }}>{tenCanh}</div>}
      </div>
      <div style={{ position: 'absolute', left: 0, top: '96px', width: W + 'px', height: '6px', background: MAU.orange }}></div>

      <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0 }}>
        <defs>
          <clipPath id="sofar-sec"><rect x={SX0} y={SY0} width={SX1 - SX0} height={SY1 - SY0} /></clipPath>
        </defs>

        {/* ===== PANEL TRÁI: c(z) và cột ρ ===== */}
        <g opacity={frameOp}>
          {[1480, 1490, 1500, 1510, 1520, 1530, 1540].map((v) => <line key={'g' + v} x1={CX(v)} y1={SY0} x2={CX(v)} y2={SY1} stroke={MAU.slate} stroke-opacity="0.15" />)}
          {[1480, 1510, 1540].map((v) => <line key={'t' + v} x1={CX(v)} y1={SY0 - 8} x2={CX(v)} y2={SY0} stroke={MAU.slate} stroke-width="1.5" />)}
          {[0, 500, 1000, 1500, 2000].map((z) => <g key={z}>
            <line x1={CX0} y1={Y(z)} x2={CX1} y2={Y(z)} stroke={MAU.slate} stroke-opacity="0.15" />
            <line x1={CX0 - 8} y1={Y(z)} x2={CX0} y2={Y(z)} stroke={MAU.slate} stroke-width="1.5" />
          </g>)}
          <rect x={CX0} y={SY0} width={CX1 - CX0} height={SY1 - SY0} fill="none" stroke={MAU.slate} stroke-opacity="0.5" />
          <rect x={RX0} y={SY0} width={RX1 - RX0} height={SY1 - SY0} fill="none" stroke={MAU.slate} stroke-opacity="0.5" />
          {du && <g class="nhan-truc">
            <SVGT x={24} y={142} font-size="30" font-weight="600" fill={MAU.navy}>Tốc độ âm c (m/s)</SVGT>
            <SVGT x={(RX0 + RX1) / 2} y={142} font-size="30" font-weight="600" fill={MAU.navy} text-anchor="middle">ρ</SVGT>
            {[1480, 1510, 1540].map((v) => <SVGT key={v} x={CX(v)} y={178} font-size="30" fill={MAU.slate} text-anchor="middle">{vn(v)}</SVGT>)}
            {[0, 500, 1000, 1500, 2000].map((z) => <SVGT key={z} x={CX0 - 12} y={Y(z) + 10} font-size="30" fill={MAU.slate} text-anchor="end">{vn(z)}</SVGT>)}
            <SVGT transform={`translate(30 ${(SY0 + SY1) / 2}) rotate(-90)`} font-size="30" fill={MAU.slate} text-anchor="middle">Độ sâu (m)</SVGT>
          </g>}
        </g>
        {LAYERS.map((l, i) => zMax > l.z0 && <rect key={'r' + i} x={RX0} y={Y(l.z0)} width={RX1 - RX0} height={Y(Math.min(l.z1, zMax)) - Y(l.z0)} fill={l.rfill} />)}
        {cDai > 0 && <path d={DUONG_C.d} fill="none" stroke={MAU.navy} stroke-width="4" stroke-linejoin="round" stroke-dasharray={lo(0, cDai)} />}
        {PROF.map((p) => zMax > 0 && zMax >= p[0] && <circle key={'c' + p[0]} cx={CX(p[3])} cy={Y(p[0])} r="5" fill={MAU.navy} />)}
        {dashDraw > 0 && <line x1={CX(CMIN)} y1={Y(AXIS)} x2={CX(CMIN) + (SX1 - CX(CMIN)) * dashDraw} y2={Y(AXIS)} stroke={MAU.orange} stroke-width="3" stroke-dasharray="12 8" />}
        {axisPop > 0 && <circle cx={CX(CMIN)} cy={Y(AXIS)} r={9 * axisPop} fill={MAU.orange} stroke="#fff" stroke-width="2" />}

        {/* ===== MẶT CẮT ===== */}
        <g opacity={frameOp}>
          <rect x={SX0} y={SY0} width={SX1 - SX0} height={SY1 - SY0} fill="#F4F8FB" />
          {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90].map((k) => <line key={k} x1={X(k)} y1={SY1} x2={X(k)} y2={SY1 + 8} stroke={MAU.slate} stroke-width="1.5" />)}
          {du && <g class="nhan-truc">
            <SVGT x={SX0} y={142} font-size="30" font-weight="600" fill={MAU.navy}>Mặt cắt đại dương</SVGT>
            <SVGT class="ghi-chu" x={SX1} y={140} font-size="22" fill={MAU.slate} text-anchor="end">Không theo tỉ lệ: trục đứng phóng đại ≈ 35 lần</SVGT>
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90].map((k) => <SVGT key={k} x={X(k)} y={SY1 + 40} font-size="30" fill={MAU.slate} text-anchor="middle">{k}</SVGT>)}
            <SVGT x={SX0} y={SY1 + 78} font-size="30" fill={MAU.slate}>Khoảng cách (km)</SVGT>
          </g>}
        </g>
        {LAYERS.map((l, i) => <rect key={'l' + i} x={SX0} y={Y(l.z0)} width={SX1 - SX0} height={Y(l.z1) - Y(l.z0)} fill={l.fill} opacity={layerOp(i)} />)}
        {BND.slice(1, -1).map((b, i) => {
          const k = flash[b] || 0;
          return <g key={'b' + b} opacity={Math.min(layerOp(i), layerOp(i + 1))}>
            {k > 0 && <line x1={SX0} y1={Y(b)} x2={SX1} y2={Y(b)} stroke={MAU.orange} stroke-width="10" stroke-opacity={0.35 * k} />}
            <line x1={SX0} y1={Y(b)} x2={SX1} y2={Y(b)} stroke="#fff" stroke-width={1 + 2.5 * k} stroke-opacity={0.7 + 0.3 * k} />
          </g>;
        })}
        <line x1={SX0} y1={SY0} x2={SX1} y2={SY0} stroke={MAU.navy} stroke-width="2" opacity={frameOp} />
        {/* dải các tia ≤ 6° (không phải toàn bộ kênh — S-07) */}
        {bandOp > 0 && <g opacity={bandOp}>
          <rect x={SX0} y={Y(513)} width={SX1 - SX0} height={Y(1926) - Y(513)} fill={MAU.sky} opacity="0.22" />
          <line x1={SX0} y1={Y(513)} x2={SX1} y2={Y(513)} stroke={MAU.sky} stroke-width="3" stroke-dasharray="8 6" />
          <line x1={SX0} y1={Y(1926)} x2={SX1} y2={Y(1926)} stroke={MAU.sky} stroke-width="3" stroke-dasharray="8 6" />
        </g>}
        {/* đường nối nhãn lớp */}
        {du && NHAN_LOP.map(({ i, top }) => {
          const op = layerOp(i) * MOTION.enter(T, L + 1.0 + i * 0.5, 0.5) * nhanLopTat; if (op <= 0) return null;
          const cy = Y((LAYERS[i].z0 + LAYERS[i].z1) / 2);
          return <g key={'n' + i} opacity={op}><line x1={1384} y1={top + 40} x2={1402} y2={cy} stroke={MAU.navy} stroke-width="1.5" /><circle cx={1402} cy={cy} r="3.5" fill={MAU.navy} /></g>;
        })}

        {/* tia */}
        <g clip-path="url(#sofar-sec)">
          {rings.map((r, i) => r > 0 && r < 1 && <circle key={'g' + i} cx={X(0)} cy={Y(AXIS)} r={22 + 90 * r} fill="none" stroke={MAU.orange} stroke-width="3" opacity={0.8 * (1 - r)} />)}
          {BUNDLE.map((r) => {
            const x = bundleX(r.k, u), ray = RAYS[r.k]; if (x <= 0) return null;
            const col = MAU_TIA[ray.theta], l1 = ray.dai(x);
            return <g key={r.k} opacity={dimBundle}>
              <path d={ray.d} fill="none" stroke={col} stroke-width="3.5" stroke-opacity="0.45" stroke-dasharray={lo(0, l1)} />
              {x < 90 && <path d={ray.d} fill="none" stroke={col} stroke-width="3.5" stroke-dasharray={lo(ray.dai(Math.max(0, x - 5)), l1)} />}
            </g>;
          })}
          {rayVis && xp4 > 0 && <g opacity={dimBundle}>
            <path d={RAYS.p4.d} fill="none" stroke={MAU_TIA[4]} stroke-width="4" stroke-opacity="0.45" stroke-dasharray={lo(0, RAYS.p4.dai(xp4))} />
            {xp4 < 90 && <path d={RAYS.p4.d} fill="none" stroke={MAU_TIA[4]} stroke-width="4" stroke-dasharray={lo(RAYS.p4.dai(Math.max(0, xp4 - 4)), RAYS.p4.dai(xp4))} />}
          </g>}
          {localFlash.map((c, i) => { const k = 1 - (T - (B + c.u)) / 0.4, x = X(c.x); return <g key={'f' + i}>
            <line x1={x - 30} y1={Y(c.b)} x2={x + 30} y2={Y(c.b)} stroke={MAU.orange} stroke-width="8" stroke-opacity={0.3 * k} />
            <line x1={x - 30} y1={Y(c.b)} x2={x + 30} y2={Y(c.b)} stroke="#fff" stroke-width="3" stroke-opacity={k} />
          </g>; })}
          {arrows.map((a, i) => <BendArrow key={'a' + i} ray={RAYS.p4} x={a.c.x} op={a.op} />)}
          {BUNDLE.map((r) => { const x = bundleX(r.k, u); if (x <= 0 || x >= 89.5) return null; const ray = RAYS[r.k];
            return <Dot key={'d' + r.k} x={X(x)} y={Y(ray.z(x))} color={MAU_TIA[ray.theta]} T={T} op={MOTION.pop(T, B + r.st, 0.3)} />; })}
          <Dot x={X(xp4)} y={Y(RAYS.p4.z(xp4))} color={MAU_TIA[4]} T={T} op={p4Dot} />
          {L18 > 0 && <g>
            <path d={R18.d} fill="none" stroke={MAU_TIA[18]} stroke-width="4" opacity={preOp} stroke-dasharray={lo(0, Math.min(L18, R18.Lt))} />
            {L18 > R18.Lt && <path d={R18.d} fill="none" stroke={MAU_TIA[18]} stroke-width="3.5" opacity="0.4" stroke-dasharray={lo(R18.Lt, L18)} />}
          </g>}
          {splash.map((r, i) => r > 0 && r < 1 && <circle key={'s' + i} cx={X(4.1)} cy={SY0} r={8 + 50 * r} fill="none" stroke={MAU.orange} stroke-width="3" opacity={0.9 * (1 - r)} />)}
          <Dot x={p18.sx} y={p18.sy} color={MAU_TIA[18]} T={T} op={dot18Op} />
        </g>
        {srcOp > 0 && <g transform={`translate(${X(0)} ${Y(AXIS)}) scale(${0.6 + 0.4 * srcOp})`} opacity={srcOp}>
          <circle r="24" fill="#fff" stroke={MAU.navy} stroke-width="2" />
          <g transform="translate(-12 -12)"><path d={VOLUME} fill="none" stroke={MAU.navy} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></g>
        </g>}

        {/* đường dẫn chú thích */}
        {du && call.map((c, i) => {
          if (c.tx == null) return null;
          const tx = X(c.tx), ty = Y(RAYS.p4.z(c.tx));
          return <Leader key={'ld' + i} x1={c.x + 24} y1={c.top != null ? c.top : c.bot} x2={tx} y2={ty} op={c.op} />;
        })}
        {du && <Leader x1={656} y1={206} x2={X(4.1)} y2={SY0 + 2} op={escLabelOp} />}
      </svg>

      {/* nhãn ρ · c của 4 lớp mốc */}
      {du && NHAN_LOP.map(({ i, top }) => {
        const op = layerOp(i) * MOTION.enter(T, L + 1.0 + i * 0.5, 0.5) * nhanLopTat; if (op <= 0) return null;
        const l = LAYERS[i];
        return <div key={'nl' + i} class="nhan" style={{ position: 'absolute', right: (W - 1384) + 'px', top: top + 'px', padding: '2px 12px', background: 'rgba(255,255,255,0.95)', borderRadius: '6px', font: '600 30px/38px ' + FONT, color: MAU.navy, whiteSpace: 'nowrap', opacity: op, fontVariantNumeric: 'tabular-nums' }}>
          <div>ρ = {vn(l.rho, 1)} kg/m³</div><div>c = {vn(l.c, 1)} m/s</div>
        </div>;
      })}

      {/* nhãn panel trái */}
      {du && <Box cls="nhan" x={176} top={Y(AXIS) + 18} op={axisLabelOp} dong={['Trục SOFAR', '1.483,5 m/s']} style={{ padding: '4px 10px', font: '600 30px/1.25 ' + FONT, color: MAU.navy, border: '2px solid ' + MAU.orange, boxShadow: 'none' }} />}
      {du && <div class="nhan" style={{ position: 'absolute', left: '24px', top: (SY1 + 26) + 'px', font: '600 30px/1.2 ' + FONT, color: MAU.navy, opacity: rhoLabelOp, whiteSpace: 'nowrap' }}><div>Mật độ tăng liên tục</div><div>từ mặt xuống đáy</div></div>}

      {du && <Box x={530} top={392} op={msgOp} dong={['Mật độ chỉ tăng đều, nhưng tốc độ âm', 'GIẢM rồi lại TĂNG. Tia âm bị bẻ theo c.']} />}
      {du && <Box x={540} top={Y(AXIS) + 30} op={srcLabelOp} dong={['Nguồn âm đặt trên trục SOFAR']} />}

      {du && call.map((c, i) => <Box key={'cb' + i} x={c.x} top={c.top} bot={c.bot} op={c.op} dong={c.dong} />)}
      {du && <Box x={540} top={208} op={sumOp} dong={['Lên hay xuống, tia đều gặp nước có c lớn hơn', '→ luôn bị đẩy về trục SOFAR.']} style={{ background: MAU.navy, color: '#fff', border: 'none', font: '600 36px/1.3 ' + FONT }} />}

      {/* bó tia */}
      {du && <Box cls="nhan" x={1086} top={196} op={legendOp} dong={[]} style={{ padding: '6px 14px', font: '400 30px/1.2 ' + FONT, boxShadow: 'none' }} />}
      {du && legendOp > 0.001 && <div class="nhan" style={{ position: 'absolute', left: '1086px', top: '196px', width: '316px', padding: '6px 14px', boxSizing: 'border-box', background: '#fff', border: '1.5px solid rgba(84,110,143,0.55)', borderRadius: '10px', font: '400 30px/1.2 ' + FONT, color: MAU.ink, opacity: legendOp, whiteSpace: 'nowrap' }}>
        <div style={{ font: '600 30px/1.2 ' + FONT, color: MAU.navy }}>Độ sâu quay đầu</div>
        {[[2, '927 / 1.322 m'], [4, '714 / 1.591 m'], [6, '513 / 1.926 m']].map(([k, t]) =>
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ width: '26px', height: '6px', borderRadius: '3px', background: MAU_TIA[k], flexShrink: '0' }}></span>{k}°: {t}</div>)}
      </div>}
      {du && <Box cls="nhan" x={524} bot={Y(513) - 8} op={bandLabelOp} dong={['Bó tia ±6° đi trong dải 513–1.926 m']} style={{ padding: '4px 14px', font: '600 30px/1.25 ' + FONT, color: MAU.navy, border: '2px solid ' + MAU.sky, boxShadow: 'none' }} />}

      {/* tia thoát */}
      {du && <Box x={640} top={206} op={escLabelOp} dong={['Góc lớn hơn ≈ 16°: tia thoát khỏi kênh,', 'chạm mặt biển và mất năng lượng.']} />}
      {du && <Box x={640} top={206} op={esc2Op} dong={['Tia dưới ≈ 16° vẫn bị giữ trong kênh.']} />}

      {/* ô góc tia */}
      {angOp > 0 && <div class="o-goc" style={{ position: 'absolute', right: (W - SX1) + 'px', top: du ? '942px' : '948px', display: 'flex', alignItems: 'baseline', gap: '14px', padding: du ? '4px 18px' : '6px 22px', background: '#fff', border: '2px solid rgba(84,110,143,0.55)', borderRadius: '10px', opacity: angOp, whiteSpace: 'nowrap' }}>
        {du && <span style={{ font: '400 30px/1.3 ' + FONT, color: MAU.slate }}>{angTitle}</span>}
        <span style={{ font: (du ? '700 36px/1.3 ' : '700 60px/1.2 ') + FONT, color: MAU.navy, fontVariantNumeric: 'tabular-nums' }}>Góc tia: {vn(ang, 1)}°</span>
      </div>}

      {/* tổng kết */}
      {du && veil > 0 && <div style={{ position: 'absolute', left: 0, top: '102px', width: W + 'px', height: (H - 102 - 64) + 'px', background: '#FFFFFF', opacity: 0.82 * veil }}></div>}
      {du && the.map((c, i) => c.op > 0.001 && <div key={'th' + i} class="chu-thich" style={{ position: 'absolute', left: '80px', top: c.y + 'px', width: (W - 160) + 'px', boxSizing: 'border-box', background: '#fff', border: '1.5px solid rgba(10,46,92,0.18)', borderRadius: '14px', boxShadow: '0 8px 24px rgba(10,46,92,0.14)', padding: '24px 30px', display: 'flex', alignItems: 'center', gap: '26px', opacity: c.op, transform: `translateY(${((1 - c.op) * 16).toFixed(2)}px)` }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '32px', background: MAU.orange, color: MAU.navy, font: '700 36px/64px ' + FONT, textAlign: 'center', flexShrink: '0' }}>{i + 1}</div>
        <div style={{ font: '600 36px/1.3 ' + FONT, color: MAU.ink, whiteSpace: 'nowrap' }}>{THE_TONG_KET[i].map((d, j) => <div key={j}>{d}</div>)}</div>
      </div>)}

      {/* dòng nguồn */}
      {du && <div class="nguon" style={{ position: 'absolute', left: '24px', top: '1022px', font: '400 22px/1.3 ' + FONT, color: MAU.slate, whiteSpace: 'nowrap' }}>
        <div>Số liệu: phao Argo 2902696, Biển Đông (12,0°N, 114,5°E), 22/9/2016 — tốc độ âm tính bằng TEOS-10; ρ: mật độ tại chỗ.</div>
        <div>Quỹ đạo tia dò trên profile đầy đủ; hình chỉ vẽ 13 mức đại diện.</div>
      </div>}
    </div>
  );
}

let goc = null;
HMO.dangKy({
  canh: [
    { id: 'lop-nuoc', batDau: L, ketThuc: P },
    { id: 'profile', batDau: P, ketThuc: S },
    { id: 'nguon-am', batDau: S, ketThuc: R },
    { id: 'tia-4', batDau: R, ketThuc: B },
    { id: 'bo-tia', batDau: B, ketThuc: E },
    { id: 'tia-thoat', batDau: E, ketThuc: Z },
    { id: 'tong-ket', batDau: Z, ketThuc: HET },
  ],
  thoiLuong: HET,
  khoiTao(sanKhau, mt) {
    st.giam = !!mt.giamChuyenDong;
    for (const c of (window.HMO_NOIDUNG || {}).canh || []) st.tenCanh[c.id] = c.ten;
    goc = document.createElement('div');
    goc.style.cssText = 'position:absolute;left:0;top:0;width:1440px;height:1080px';
    sanKhau.append(goc);
  },
  ve(t) { render(<Piece T={t} />, goc); },
  datNhan(muc) { st.muc = muc; },
  huy() { render(null, goc); goc.remove(); },
});
// Dùng cho kiểm thử: giá trị ô góc tia ở khung hình vừa vẽ.
window.__sofar = { goc: () => st.goc, cOf };
