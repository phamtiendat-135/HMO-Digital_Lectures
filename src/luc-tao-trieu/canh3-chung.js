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
  // thay cho chụm hai ngón / lăn chuột
  { id: 'c3-phong-to', loai: 'nut', nhan: 'Phóng to' },
  { id: 'c3-thu-nho', loai: 'nut', nhan: 'Thu nhỏ' },
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

// Màu ba mũi tên (dùng chung cho hình, bảng số và chú giải).
export const MAU_LUC = { fc: MAU.luc, fg: MAU.do, ft: MAU.ft };
const mauMau = (g, k, x, y, dai) => {   // mẫu mũi tên nhỏ làm chú giải
  if (k === 'cm') { g.beginPath(); g.arc(x + dai / 2, y, 7, 0, Math.PI * 2); g.fillStyle = MAU.navy; g.fill(); g.lineWidth = 2.5; g.strokeStyle = '#FFFFFF'; g.stroke(); return; }
  g.strokeStyle = g.fillStyle = MAU_LUC[k]; g.lineWidth = 6; g.lineCap = 'butt';
  g.beginPath(); g.moveTo(x, y); g.lineTo(x + dai - 14, y); g.stroke();
  g.beginPath(); g.moveTo(x + dai, y); g.lineTo(x + dai - 16, y - 8); g.lineTo(x + dai - 16, y + 8); g.closePath(); g.fill();
};

/**
 * Bảng số nổi ở góc trên phải sân khấu (chỉ ở mức nhãn đầy đủ). Bảng cũng là chú giải: mỗi dòng Fc, Fg, Ft có mẫu mũi tên
 * cùng màu, thêm dòng CM. Tên lực không vẽ cạnh mũi tên trên hình nữa: ba mũi tên chung gốc quay đủ mọi hướng nên nhãn
 * đặt cạnh chúng theo bất kỳ quy tắc cố định nào cũng có lúc đè đầu mũi tên khác.
 */
export const BANG3 = [1000, 172, 1392, 462];
export function veBang(g, sd) {
  if (tt.muc !== 'day-du') return;
  const [x, y, x2, y2] = BANG3, w = x2 - x, h = y2 - y;
  g.fillStyle = 'rgba(255,255,255,0.94)'; g.fillRect(x, y, w, h);
  g.strokeStyle = MAU.vien; g.lineWidth = 2; g.strokeRect(x, y, w, h);
  const o = { co: 30, dam: 700, vien: null };
  chu(g, 'Góc θ', x + 20, y + 44, { ...o, mau: MAU.ink });
  chu(g, vn(sd.theta) + '°', x + w - 20, y + 44, { ...o, mau: MAU.ink, can: 'right' });
  [['fc', 'Fc', '100,0% Fc', MAU.luc], ['fg', 'Fg', vn(sd.fg, 1) + '% Fc', MAU.do], ['ft', 'Ft', vn(sd.ft, 2) + '% Fc', MAU.ftChu]].forEach(([k, ten, gt, mau], i) => {
    const yy = y + 90 + i * 46;
    mauMau(g, k, x + 20, yy - 10, 40);
    chu(g, ten, x + 72, yy, { ...o, mau });
    chu(g, gt, x + w - 20, yy, { ...o, mau, can: 'right' });
  });
  mauMau(g, 'cm', x + 20, y + 228 - 10, 40);
  chu(g, 'CM – khối tâm chung', x + 72, y + 228, { co: 30, dam: 600, mau: MAU.navy, vien: null });
  // chiều Ft: cả hai cụm chữ luôn hiện, cụm đúng tô đậm (chữ không đổi nên không nhấp nháy khi Ft đổi chiều)
  chu(g, 'Ft:', x + 20, y + 274, { co: 30, dam: 700, mau: MAU.ftChu, vien: null });
  chu(g, 'ra ngoài', x + 78, y + 274, { co: 30, dam: sd.raNgoai ? 700 : 400, mau: sd.raNgoai ? MAU.ink : MAU.slate, vien: null });
  chu(g, '/', x + 210, y + 274, { co: 30, dam: 400, mau: MAU.slate, vien: null });
  chu(g, 'vào tâm', x + 232, y + 274, { co: 30, dam: sd.raNgoai ? 400 : 700, mau: sd.raNgoai ? MAU.slate : MAU.ink, vien: null });
}
/** Chú giải cho mức tối giản (không có bảng số): ba mẫu mũi tên với tên lực, xếp dọc tại (x, y), chữ to gấp đôi. */
export function veChuGiai(g, x, y) {
  if (tt.muc !== 'toi-gian') return;
  [['fc', 'Fc', MAU.luc], ['fg', 'Fg', MAU.do], ['ft', 'Ft', MAU.ftChu]].forEach(([k, ten, mau], i) => {
    const yy = y + i * 74;
    mauMau(g, k, x, yy, 56);
    chu(g, ten, x + 70, yy, { co: 30, dam: 700, mau, goc: 'middle', khoa: true, vien: null });
  });
}
export const GHI_CHU_3 = `Không theo tỉ lệ: khoảng cách Trái Đất – Mặt Trăng thu ngắn; vector Ft phóng đại ${PHONG_DAI_FT} lần. Lục địa vẽ giản lược.`;
export const MO_TA_3 = 'Mô hình Trái Đất và Mặt Trăng: tại điểm cam trên mặt Trái Đất có ba mũi tên lực ly tâm Fc, lực hấp dẫn Fg và lực tạo triều Ft; vành 16 điểm mẫu cho thấy hai múi triều.';
