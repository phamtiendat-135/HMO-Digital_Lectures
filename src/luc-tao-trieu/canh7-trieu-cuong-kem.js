// Cảnh 7: triều cường và triều kém trong một tuần trăng. Nhìn từ cực Bắc, Mặt Trời ở bên trái.
import { tt, MAU, TUAN_TRANG, TI_SO_MT, TAU, vn, nen, chu, nhanNgoai, tieuDe, chanTrang, tron, doan, muiTen } from './chung.js';

const LAP = 16;
const st = { bao: true, thanh: true, duong: true };
const SX = 120, SY = 460, SR = 58, EX = 830, EY = 460, R = 110, RQ = R * 2.0, RMT = 33;
const PHA = [
  { ngay: 0, ten: 'Sóc', trieu: 'Triều cường' }, { ngay: TUAN_TRANG / 4, ten: 'Thượng huyền', trieu: 'Triều kém' },
  { ngay: TUAN_TRANG / 2, ten: 'Vọng', trieu: 'Triều cường' }, { ngay: TUAN_TRANG * 3 / 4, ten: 'Hạ huyền', trieu: 'Triều kém' },
];

/** Biên độ bán nhật triều tổng hợp (Mặt Trăng = 1) tại ngày d của tuần trăng. */
export const bienDo = (d) => Math.sqrt(1 + TI_SO_MT * TI_SO_MT + 2 * TI_SO_MT * Math.cos(2 * TAU * d / TUAN_TRANG));
/** Góc của Mặt Trăng quanh Trái Đất (rad, trục y hướng lên): sóc ở bên trái (phía Mặt Trời), quay ngược chiều kim đồng hồ. */
export const gocTrang = (d) => Math.PI + TAU * d / TUAN_TRANG;

function tenPha(d) {
  const x = d / TUAN_TRANG * 4, i = Math.round(x) % 4;
  return Math.abs(x - Math.round(x)) < 0.16 ? PHA[i].ten : 'Giữa hai pha';
}

export default {
  id: 'trieu-cuong-kem', lap: LAP,
  moTa: 'Nhìn từ cực Bắc: Mặt Trăng quay quanh Trái Đất trong một tuần trăng; bao triều của Mặt Trăng và Mặt Trời cộng nhau lúc sóc, vọng (triều cường) và bù nhau lúc thượng huyền, hạ huyền (triều kém).',
  dieuKhien: [
    { id: 'c7-bao', loai: 'bat-tat', nhan: 'Bao triều thành phần', giaTri: true },
    { id: 'c7-thanh', loai: 'bat-tat', nhan: 'Biên độ triều tương đối', giaTri: true },
    { id: 'c7-duong', loai: 'bat-tat', nhan: 'Đường biên độ triều theo ngày', giaTri: true },
    { id: 'c7-ngay', loai: 'truot', nhan: 'Tua tới ngày trong tuần trăng', min: 0, max: 29.5, buoc: 0.1, giaTri: 0, donVi: 'ngày' },
  ],
  khiDoi(id, v) {
    if (id === 'c7-bao') st.bao = v; else if (id === 'c7-thanh') st.thanh = v; else if (id === 'c7-duong') st.duong = v;
    else if (id === 'c7-ngay') { window.HMO.phat(false); window.HMO.tua(v / TUAN_TRANG * LAP); }
  },
  ve(g, t) {
    const d = TUAN_TRANG * t / LAP, gm = gocTrang(d), gs = Math.PI, bd = bienDo(d);
    const mx = EX + RQ * Math.cos(gm), my = EY - RQ * Math.sin(gm);
    nen(g);
    tieuDe(g, 'Triều cường và triều kém', 'Sóc, vọng: hai tác động cộng lại. Thượng huyền, hạ huyền: bù nhau.');
    chanTrang(g, 'Nhìn từ cực Bắc. Không theo tỉ lệ: khoảng cách, kích thước thu gọn; bao triều phóng đại.');

    // Mặt Trời
    const gr = g.createRadialGradient(SX, SY, SR * 0.2, SX, SY, SR * 1.9);
    gr.addColorStop(0, '#FFD34D'); gr.addColorStop(0.45, 'rgba(240,180,40,0.55)'); gr.addColorStop(1, 'rgba(240,180,40,0)');
    tron(g, SX, SY, SR * 1.9, gr);
    tron(g, SX, SY, SR, '#F5C043', '#D89A16', 2);
    // nhãn Mặt Trời ngay trên Mặt Trời (nhãn Mặt Trăng, kể cả cỡ gấp đôi, không vươn tới đây)
    const toiGian = tt.muc === 'toi-gian';
    chu(g, 'Mặt Trời', SX, SY - SR * 1.9, { co: 30, dam: 700, mau: MAU.navy, can: 'center', goc: 'bottom', khoa: true });

    doan(g, SX + SR, SY, EX - R * 1.5, EY, MAU.slate, 2, [9, 7]);
    doan(g, EX, EY, mx, my, MAU.slate, 2, [9, 7]);
    g.setLineDash([6, 8]); g.strokeStyle = 'rgba(84,110,143,0.4)'; g.lineWidth = 2; g.beginPath(); g.arc(EX, EY, RQ, 0, TAU); g.stroke(); g.setLineDash([]);
    // mũi tên chỉ chiều quỹ đạo, đi trước Mặt Trăng, cùng chiều chuyển động; đặt phía trong vòng quỹ đạo
    // (giữa bao triều và quỹ đạo) để nhãn Mặt Trăng, luôn ở phía ngoài, không bao giờ chạm tới
    const ao = gm + 0.42, rq = RQ - 42;
    muiTen(g, EX + rq * Math.cos(ao), EY - rq * Math.sin(ao), EX + rq * Math.cos(ao) - Math.sin(ao) * 44, EY - rq * Math.sin(ao) - Math.cos(ao) * 44, '#B03A5B', 4, 18);

    const AL = R * 0.30, AS = AL * TI_SO_MT;
    const bao = (f) => { g.beginPath(); for (let i = 0; i <= 240; i++) { const th = i / 240 * TAU, r = R + f(th); const x = EX + r * Math.cos(th), y = EY - r * Math.sin(th); if (i) g.lineTo(x, y); else g.moveTo(x, y); } g.closePath(); };
    if (st.bao) {
      bao((th) => AL * Math.cos(2 * (th - gm))); g.fillStyle = 'rgba(27,78,143,0.14)'; g.fill(); g.strokeStyle = 'rgba(27,78,143,0.75)'; g.lineWidth = 2.5; g.stroke();
      bao((th) => AS * Math.cos(2 * (th - gs))); g.fillStyle = 'rgba(232,163,61,0.16)'; g.fill(); g.strokeStyle = 'rgba(200,140,30,0.8)'; g.lineWidth = 2.5; g.stroke();
    }
    bao((th) => AL * Math.cos(2 * (th - gm)) + AS * Math.cos(2 * (th - gs)));
    g.fillStyle = 'rgba(240,120,0,0.13)'; g.fill(); g.strokeStyle = MAU.cam; g.lineWidth = 4; g.stroke();

    tron(g, EX, EY, R, MAU.ocean, MAU.sky, 3);
    // mũi tên chỉ chiều tự quay của Trái Đất (ngược chiều kim đồng hồ); vẽ tĩnh vì 29,5 vòng mỗi chu kỳ là quá nhanh để nhìn
    const q = 0.6;
    g.strokeStyle = 'rgba(255,255,255,0.9)'; g.lineWidth = 3; g.beginPath(); g.arc(EX, EY, R * 0.72, -q - 1.5, -q); g.stroke();
    const xe = EX + R * 0.72 * Math.cos(q + 1.5), ye = EY - R * 0.72 * Math.sin(q + 1.5);
    muiTen(g, xe, ye, xe - Math.sin(q + 1.5) * 26, ye - Math.cos(q + 1.5) * 26, '#FFFFFF', 3, 18);

    // Mặt Trăng nhìn từ trên xuống: nửa hướng về Mặt Trời luôn sáng
    tron(g, mx, my, RMT, '#8A93A3');
    g.beginPath(); g.arc(mx, my, RMT, Math.PI / 2, Math.PI * 1.5); g.closePath(); g.fillStyle = '#EDF3F8'; g.fill();
    tron(g, mx, my, RMT, null, MAU.slate, 2);

    // Số đọc, xếp ở góc dưới trái (Mặt Trăng và nhãn của nó không bao giờ tới đây).
    // Loại triều chỉ hai trạng thái, theo pha gần hơn: mỗi trạng thái kéo dài nửa chu kỳ (4 s), không nhấp nháy.
    const cuong = Math.cos(2 * TAU * d / TUAN_TRANG) >= 0;
    const loai = cuong ? 'Kỳ triều cường' : 'Kỳ triều kém';
    chu(g, `Ngày ${vn(d, 1)}`, 48, 536, { co: 30, mau: MAU.slate });
    chu(g, loai, 48, toiGian ? 950 : 592, { co: 40, dam: 700, mau: cuong ? MAU.camChu : MAU.ocean, khoa: true });
    if (st.thanh && !toiGian) {
      const wb = 170, hang = [['Mặt Trăng', 1, MAU.ocean, MAU.ocean], ['Mặt Trời', TI_SO_MT, MAU.ft, MAU.ftChu], ['Tổng', bd, MAU.cam, MAU.camChu]];
      chu(g, 'Biên độ triều tương đối', 48, 642, { co: 30, mau: MAU.navy, vien: null });
      hang.forEach(([ten, v, mau, mauChu], i) => {
        const y = 686 + i * 42;
        chu(g, `${ten} ${vn(v, 2)}`, 48, y, { co: 30, dam: 700, mau: mauChu, vien: null });
        g.fillStyle = mau; g.fillRect(290, y - 18, wb * v, 10);   // thanh nằm bên phải chữ, không chạm chữ
      });
    }

    if (st.duong) {
      const x0 = 90, x1 = 1380, yb = 962, hh = 130, xD = (dd) => x0 + (x1 - x0) * dd / TUAN_TRANG, yB = (b) => yb - b / (1 + TI_SO_MT) * hh;
      doan(g, x0, yb, x1, yb, '#C6D4E4', 2);
      PHA.concat([{ ngay: TUAN_TRANG, ten: 'Sóc', trieu: 'Triều cường' }]).forEach((p, i) => {
        const x = xD(p.ngay), can = i === 0 ? 'left' : i === 4 ? 'right' : 'center';
        doan(g, x, yb, x, yb - hh - 6, 'rgba(84,110,143,0.35)', 1.5);
        chu(g, p.trieu, x, yb - hh - 12, { co: 30, mau: p.trieu === 'Triều cường' ? MAU.camChu : MAU.slate, can, goc: 'bottom' });
        chu(g, p.ten, x, yb + 4, { co: 30, dam: 400, mau: MAU.slate, can, goc: 'top' });
      });
      g.beginPath();
      for (let i = 0; i <= 300; i++) { const dd = i / 300 * TUAN_TRANG; if (i) g.lineTo(xD(dd), yB(bienDo(dd))); else g.moveTo(xD(dd), yB(bienDo(dd))); }
      g.strokeStyle = MAU.cam; g.lineWidth = 4; g.lineJoin = 'round'; g.stroke();
      doan(g, xD(d), yb, xD(d), yb - hh - 6, MAU.navy, 2.5);
      tron(g, xD(d), yB(bd), 9, MAU.navy, '#FFFFFF', 3);
    }

    // Trái Đất: giữa đĩa. Mặt Trăng: phía ngoài đĩa theo hướng bán kính từ tâm Trái Đất.
    chu(g, 'Trái Đất', EX, EY, { co: 30, dam: 700, mau: '#FFFFFF', vien: MAU.navy, can: 'center', goc: 'middle', khoa: true });
    // Mức tối giản (chữ to gấp đôi): khi Mặt Trăng ở phía Mặt Trời, hướng nhãn nghiêng lên/xuống để khỏi chạm nhãn Mặt Trời;
    // chỉ đổi phía một lần mỗi vòng, lúc Mặt Trăng đi qua đường nối Mặt Trời – Trái Đất.
    let hx = (mx - EX) / RQ, hy = (my - EY) / RQ;
    if (toiGian) hy += (hy >= 0 ? 1 : -1) * 1.2 * Math.max(0, -hx);
    nhanNgoai(g, 'Mặt Trăng', mx, my, RMT, hx, hy, 8, { co: 30, dam: 700, mau: MAU.navy, khoa: true });
  },
};
