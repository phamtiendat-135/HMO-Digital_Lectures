// Cảnh 4: một ngày có hai lần nước lớn. Nhìn từ cực Bắc: Mặt Trăng và điểm P đều quay ngược chiều kim đồng hồ.
import { MAU, A_KM, R_KM, T_THANG_SAO, T_SAO, T_TRIEU, PHONG_DAI_FT, TAU, vn, gioPhut, nen, chu, tieuDe, chanTrang, tron, doan, matTrang, muiTen } from './chung.js';

export const GIO_MOI_GIAY = 2;                 // 1 giây hoạt hình = 2 giờ
const LAP = T_THANG_SAO / GIO_MOI_GIAY;        // một tháng sao
const CUA_SO = 50;                             // giờ trên một màn đồ thị
const st = { bao: true };
const CX = 720, CY = 448, RE = 105, RO = 245, RMT = 24;

/** Ft tại điểm trên xích đạo ở góc phi khi Mặt Trăng ở góc alpha (rad, trong mặt phẳng quỹ đạo), đơn vị |Fc|. */
export function ftPhang(phi, alpha) {
  const px = R_KM * Math.cos(phi), py = R_KM * Math.sin(phi);
  const mx = A_KM * Math.cos(alpha), my = A_KM * Math.sin(alpha);
  const dx = mx - px, dy = my - py, r = Math.hypot(dx, dy), s = A_KM * A_KM / (r * r * r);
  return [dx * s - Math.cos(alpha), dy * s - Math.sin(alpha)];
}
export const gocTrang = (h) => TAU * h / T_THANG_SAO;
export const gocP = (h) => TAU * h / T_SAO;     // Trái Đất tự quay một vòng trong một ngày sao
/** Thành phần Ft theo phương thẳng đứng tại P (dương = hướng lên, ra xa tâm), đơn vị |Fc|. */
export function ftDung(h) {
  const b = gocP(h), [fx, fy] = ftPhang(b, gocTrang(h));
  return fx * Math.cos(b) + fy * Math.sin(b);
}

export default {
  id: 'quy-dao', lap: LAP,
  moTa: 'Nhìn từ cực Bắc: Mặt Trăng quay quanh Trái Đất, điểm P quay theo Trái Đất và lần lượt đi qua hai múi triều; đồ thị bên dưới cho thấy hai lần nước lớn mỗi ngày triều.',
  dieuKhien: [{ id: 'c4-bao', loai: 'bat-tat', nhan: 'Bao hình triều', giaTri: true }],
  khiDoi(id, v) { if (id === 'c4-bao') st.bao = v; },
  ve(g, t) {
    const h = t * GIO_MOI_GIAY, al = gocTrang(h), be = gocP(h);
    const X = (x) => CX + x, Y = (y) => CY - y;   // trục y hướng lên
    nen(g);

    g.setLineDash([8, 8]); tron(g, CX, CY, RO, null, null); g.strokeStyle = MAU.vien; g.lineWidth = 2; g.stroke(); g.setLineDash([]);
    const mx = X(Math.cos(al) * RO), my = Y(Math.sin(al) * RO);
    doan(g, CX, CY, mx, my, MAU.slate, 2, [10, 8]);
    // mũi tên chỉ chiều quỹ đạo: cùng chiều chuyển động (ngược chiều kim đồng hồ)
    const ao = al + 0.34;
    muiTen(g, X(Math.cos(ao) * RO), Y(Math.sin(ao) * RO), X(Math.cos(ao) * RO - Math.sin(ao) * 44), Y(Math.sin(ao) * RO + Math.cos(ao) * 44), MAU.slate, 3.5, 16);

    if (st.bao) {
      g.save(); g.translate(CX, CY); g.rotate(-al);
      g.beginPath(); g.ellipse(0, 0, RE * 1.34, RE * 0.94, 0, 0, TAU);
      g.fillStyle = 'rgba(232,163,61,0.18)'; g.fill();
      g.strokeStyle = MAU.ft; g.lineWidth = 3; g.setLineDash([9, 7]); g.stroke();
      g.restore(); g.setLineDash([]);
    }
    tron(g, CX, CY, RE, MAU.ocean, MAU.skyNhat, 3);

    const K = RE * PHONG_DAI_FT;
    for (let i = 0; i < 16; i++) {
      const phi = i / 16 * TAU, [fx, fy] = ftPhang(phi, al);
      const sx = X(Math.cos(phi) * RE), sy = Y(Math.sin(phi) * RE);
      muiTen(g, sx, sy, sx + fx * K, sy - fy * K, MAU.ft, 4, 14);
      tron(g, sx, sy, 4, MAU.navy);
    }
    chu(g, 'Trái Đất', CX, CY, { co: 30, dam: 700, mau: '#FFFFFF', can: 'center', goc: 'middle' });

    const px = X(Math.cos(be) * RE), py = Y(Math.sin(be) * RE);
    const [pfx, pfy] = ftPhang(be, al);
    muiTen(g, px, py, px + pfx * K, py - pfy * K, MAU.camChu, 8, 18);
    tron(g, px, py, 12, MAU.cam, '#FFFFFF', 3);
    chu(g, 'P', px + Math.cos(be) * 40, py - Math.sin(be) * 40, { co: 32, dam: 700, mau: '#FFFFFF', vien: MAU.navy, can: 'center', goc: 'middle', khoa: true });

    matTrang(g, mx, my, RMT);
    chu(g, 'Mặt Trăng', mx, my - RMT - 10, { co: 30, dam: 700, mau: MAU.navy, can: 'center', goc: 'bottom', khoa: true, vien: MAU.nen });

    // số đọc hai bên hình
    const dung = ftDung(h);
    chu(g, 'Ngày triều', 48, 250, { co: 30, mau: MAU.slate });
    chu(g, gioPhut(T_TRIEU), 48, 296, { co: 40, dam: 700, mau: MAU.navy });
    chu(g, 'Hai lần nước lớn', 48, 590, { co: 30, mau: MAU.slate });
    chu(g, 'cách nhau', 48, 628, { co: 30, mau: MAU.slate });
    chu(g, gioPhut(T_TRIEU / 2), 48, 674, { co: 40, dam: 700, mau: MAU.navy });
    chu(g, 'Thời gian', 1392, 250, { co: 30, mau: MAU.slate, can: 'right' });
    chu(g, gioPhut(h), 1392, 296, { co: 40, dam: 700, mau: MAU.navy, can: 'right' });
    chu(g, 'Tại P', 1392, 590, { co: 30, mau: MAU.slate, can: 'right' });
    chu(g, dung > 0 ? 'Nước lớn' : 'Nước ròng', 1392, 636, { co: 40, dam: 700, mau: dung > 0 ? MAU.camChu : MAU.ocean, can: 'right' });
    chu(g, dung > 0 ? '(Ft hướng lên)' : '(Ft hướng xuống)', 1392, 676, { co: 30, mau: MAU.slate, can: 'right' });

    // dải đồ thị
    const x0 = 100, x1 = 1392, y0 = 772, y1 = 944, DINH = 0.034;
    const yV = (v) => y1 - (v / DINH + 0.55) / 1.6 * (y1 - y0);
    const goc = Math.floor(h / CUA_SO) * CUA_SO;
    g.fillStyle = '#FFFFFF'; g.fillRect(x0, y0, x1 - x0, y1 - y0);
    for (let hh = 0; hh <= CUA_SO; hh += 6) { const x = x0 + (x1 - x0) * hh / CUA_SO; doan(g, x, y0, x, y1, MAU.vien, 1); }
    doan(g, x0, yV(0), x1, yV(0), MAU.slate, 2);
    g.beginPath();
    for (let k = 0; k <= 400; k++) { const hk = goc + k / 400 * CUA_SO, x = x0 + (x1 - x0) * k / 400, y = yV(ftDung(hk)); if (k) g.lineTo(x, y); else g.moveTo(x, y); }
    g.strokeStyle = MAU.ft; g.lineWidth = 5; g.lineJoin = 'round'; g.stroke();
    const xp = x0 + (x1 - x0) * (h - goc) / CUA_SO;
    doan(g, xp, y0, xp, y1, MAU.navy, 3);
    tron(g, xp, yV(dung), 9, MAU.cam, '#FFFFFF', 3);
    chu(g, 'Ft theo phương thẳng đứng tại P (dương = hướng lên)', 48, 754, { co: 30, mau: MAU.navy });
    chu(g, '0', x0 - 12, yV(0), { co: 30, mau: MAU.slate, can: 'right', goc: 'middle' });
    [0, 12, 24, 36, 48].forEach((hh) => chu(g, vn(goc + hh) + ' h', x0 + (x1 - x0) * hh / CUA_SO, y1 + 6, { co: 30, mau: MAU.slate, can: hh ? 'center' : 'left', goc: 'top' }));

    tieuDe(g, 'Một ngày có hai lần nước lớn', 'Điểm P quay theo Trái Đất, lần lượt đi qua hai múi triều.');
    chanTrang(g, `Nhìn từ cực Bắc. Không theo tỉ lệ: khoảng cách Trái Đất – Mặt Trăng thu ngắn; vector Ft phóng đại ${PHONG_DAI_FT} lần.`);
  },
};
