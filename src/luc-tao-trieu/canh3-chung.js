// Phần dùng chung của cảnh 3 cho bản 3D (three.js) và bản dự phòng 2D: trạng thái, điều khiển, số đọc, bảng số.
import { MAU, D2R, PHONG_DAI_FT, tt, vn, baLuc, doDai, chu } from './chung.js';

export const LAP3 = 8;
/** Trạng thái ngoài t của cảnh 3. huong: hướng điểm cam nhìn từ tâm Trái Đất (x về phía Mặt Trăng lúc đầu, y = cực Bắc). */
export const st3 = { fc: true, fg: true, ft: true, vanh: true, trong: false, hoatHoa: false, huong: [1, 0, 0] };

const CHUNG = [
  { id: 'c3-fc', loai: 'bat-tat', nhan: 'Vector Fc', giaTri: true },
  { id: 'c3-fg', loai: 'bat-tat', nhan: 'Vector Fg', giaTri: true },
  { id: 'c3-ft', loai: 'bat-tat', nhan: 'Vector Ft', giaTri: true },
  { id: 'c3-vanh', loai: 'bat-tat', nhan: 'Vành 16 điểm mẫu (chỉ Ft)', giaTri: true },
  { id: 'c3-hoat-hoa', loai: 'bat-tat', nhan: 'Hoạt hoạ tịnh tiến quanh CM', giaTri: false },
  { id: 'c3-theta', loai: 'truot', nhan: 'Đặt điểm cam ở góc', min: 0, max: 355, buoc: 5, giaTri: 0, donVi: '°' },
];
export const DIEU_KHIEN_3D = CHUNG.concat([
  { id: 'c3-trong', loai: 'bat-tat', nhan: 'Trái Đất bán trong suốt', giaTri: false },
  { id: 'c3-goc-nhin', loai: 'chon', nhan: 'Góc nhìn', giaTri: 'ban-dau', luaChon: [
    { giaTri: 'ban-dau', nhan: 'Về góc nhìn ban đầu' }, { giaTri: 'cuc-bac', nhan: 'Nhìn từ cực Bắc' }, { giaTri: 'doc-truc', nhan: 'Nhìn dọc trục' }] },
]);
export const DIEU_KHIEN_2D = CHUNG;

/** Xử lý các điều khiển chung; trả về true nếu đã xử lý. */
export function khiDoiChung(id, v) {
  const k = { 'c3-fc': 'fc', 'c3-fg': 'fg', 'c3-ft': 'ft', 'c3-vanh': 'vanh', 'c3-hoat-hoa': 'hoatHoa', 'c3-trong': 'trong' }[id];
  if (k) { st3[k] = v; return true; }
  if (id === 'c3-theta') { st3.huong = [Math.cos(v * D2R), Math.sin(v * D2R), 0]; return true; }
  return false;
}

/** Số đọc tại điểm cam khi Mặt Trăng ở hướng u. */
export function soDoc(u, p = st3.huong) {
  const f = baLuc(p, u);
  const cos = p[0] * u[0] + p[1] * u[1] + p[2] * u[2];
  return { luc: f, theta: Math.acos(Math.max(-1, Math.min(1, cos))) / D2R, fg: doDai(f.fg) * 100, ft: doDai(f.ft) * 100,
    raNgoai: f.ft[0] * p[0] + f.ft[1] * p[1] + f.ft[2] * p[2] > 0 };
}

/** Bảng số nổi ở góc trên phải sân khấu (chỉ ở mức nhãn đầy đủ). */
export function veBang(g, sd) {
  if (tt.muc !== 'day-du') return;
  const x = 1000, y = 172, w = 392, h = 244;
  g.fillStyle = 'rgba(255,255,255,0.92)'; g.fillRect(x, y, w, h);
  g.strokeStyle = MAU.vien; g.lineWidth = 2; g.strokeRect(x, y, w, h);
  const hang = [['Góc θ', vn(sd.theta) + '°', MAU.ink], ['Fc', '100,0% Fc', MAU.luc], ['Fg', vn(sd.fg, 1) + '% Fc', MAU.do], ['Ft', vn(sd.ft, 2) + '% Fc', MAU.ftChu]];
  hang.forEach(([ten, gt, mau], i) => {
    chu(g, ten, x + 20, y + 44 + i * 46, { co: 30, dam: 700, mau });
    chu(g, gt, x + w - 20, y + 44 + i * 46, { co: 30, dam: 700, mau, can: 'right' });
  });
  chu(g, sd.raNgoai ? 'Ft hướng ra xa tâm' : 'Ft hướng vào tâm', x + 20, y + 44 + 4 * 46, { co: 30, mau: MAU.ink });
}
export const GHI_CHU_3 = `Không theo tỉ lệ: khoảng cách Trái Đất – Mặt Trăng thu ngắn; vector Ft phóng đại ${PHONG_DAI_FT} lần. Lục địa vẽ giản lược.`;
export const MO_TA_3 = 'Mô hình Trái Đất và Mặt Trăng: tại điểm cam trên mặt Trái Đất có ba mũi tên lực ly tâm Fc, lực hấp dẫn Fg và lực tạo triều Ft; vành 16 điểm mẫu cho thấy hai múi triều.';
