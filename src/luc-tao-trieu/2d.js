// Bản dự phòng 2D của cảnh 3 khi thiết bị không có WebGL2: lát cắt qua trục Trái Đất – Mặt Trăng, nhìn từ cực Bắc.
import { W, H, MAU, TI_SO_CM, PHONG_DAI_FT, TAU, baLuc, nen, chu, tieuDe, chanTrang, tron, doan, matTrang, muiTen } from './chung.js';
import { LAP3, st3, DIEU_KHIEN_2D, khiDoiChung, soDoc, veBang, GHI_CHU_3, MO_TA_3 } from './canh3-chung.js';

const CX = 640, CY = 590, R = 150, K = TI_SO_CM * R, DM = 2.4 * R, DAI = 0.9 * R, RMT = 30;
let sk = null, dangHien = false, tamX = CX - K, tamY = CY;
const gocCam = () => Math.atan2(st3.huong[1], st3.huong[0]);

function ganCham(sanKhau) {
  let dangKeo = false, cham = null;
  const toaDo = (ev) => { const r = sanKhau.getBoundingClientRect(); return [(ev.clientX - r.left) / r.width * W, (ev.clientY - r.top) / r.height * H, r.width / W]; };
  const dat = (x, y) => { const a = Math.atan2(-(y - tamY), x - tamX); st3.huong = [Math.cos(a), Math.sin(a), 0]; window.HMO.yeuCauVe(); };
  sanKhau.addEventListener('pointerdown', (ev) => {
    if (!dangHien || !ev.isPrimary) return;
    const [x, y, tiLe] = toaDo(ev), a = gocCam();
    if (Math.hypot(x - (tamX + R * Math.cos(a)), y - (tamY - R * Math.sin(a))) * tiLe <= 44) { dangKeo = true; sanKhau.setPointerCapture(ev.pointerId); ev.preventDefault(); }
    else cham = { x: ev.clientX, y: ev.clientY, t: ev.timeStamp };
  });
  sanKhau.addEventListener('pointermove', (ev) => { if (dangKeo && ev.isPrimary) { const [x, y] = toaDo(ev); dat(x, y); } });
  const thoi = (ev) => {
    if (dangKeo) dangKeo = false;
    else if (dangHien && cham && ev.type === 'pointerup' && Math.hypot(ev.clientX - cham.x, ev.clientY - cham.y) < 8 && ev.timeStamp - cham.t < 400) {
      const [x, y] = toaDo(ev); if (Math.hypot(x - tamX, y - tamY) <= R * 1.15) dat(x, y);
    }
    cham = null;
  };
  sanKhau.addEventListener('pointerup', thoi);
  sanKhau.addEventListener('pointercancel', thoi);
}

export default {
  id: 'mo-hinh-3d', lap: LAP3, giuCham: true, moTa: MO_TA_3 + ' Bản 2D: lát cắt qua trục Trái Đất – Mặt Trăng.', dieuKhien: DIEU_KHIEN_2D,
  tuBao: false,   // true khi main.js tự chuyển sang bản này vì three.js không tạo được WebGL
  khoiTao(sanKhau) { sk = sanKhau; ganCham(sanKhau); },
  vao() { dangHien = true; if (sk) sk.style.touchAction = 'none'; },
  ra() { dangHien = false; if (sk) sk.style.touchAction = ''; },
  khiDoi(id, v) { khiDoiChung(id, v); },
  ve(g, t) {
    const a = st3.hoatHoa ? TAU * t / LAP3 : 0, u = [Math.cos(a), Math.sin(a), 0];
    const ex = CX - K * u[0], ey = CY + K * u[1], mx = CX + DM * u[0], my = CY - DM * u[1];
    tamX = ex; tamY = ey;
    const gc = gocCam(), p = [Math.cos(gc), Math.sin(gc), 0], sd = soDoc(u, p), f = sd.luc;
    nen(g);

    doan(g, ex - u[0] * R * 1.5, ey + u[1] * R * 1.5, mx, my, MAU.slate, 2, [10, 8]);
    matTrang(g, mx, my, RMT);
    chu(g, 'Mặt Trăng', mx, my - RMT - 10, { co: 30, dam: 700, mau: MAU.navy, can: 'center', goc: 'bottom', khoa: true, vien: MAU.nen });
    if (st3.hoatHoa) [p, [0, 0, 0], [0, -1, 0]].forEach((l) => { g.setLineDash([7, 7]); tron(g, CX + l[0] * R, CY - l[1] * R, K, null, 'rgba(240,120,0,0.8)', 2.5); g.setLineDash([]); });
    tron(g, ex, ey, R, 'rgba(27,78,143,0.88)', MAU.skyNhat, 3);
    chu(g, 'Trái Đất', ex, ey + R * 0.5, { co: 30, dam: 700, mau: '#FFFFFF', can: 'center', goc: 'middle', khoa: true });
    if (st3.hoatHoa) { tron(g, ex, ey, 7, MAU.vang, MAU.navy, 2); tron(g, ex, ey + R, 7, MAU.vang, MAU.navy, 2); }
    if (st3.vanh) {
      doan(g, ex - u[1] * R, ey - u[0] * R, ex + u[1] * R, ey + u[0] * R, 'rgba(255,255,255,0.85)', 3);   // vành đai θ = 90° nhìn nghiêng
      for (let i = 0; i < 16; i++) {
        const b = a + i / 16 * TAU, q = [Math.cos(b), Math.sin(b), 0], ft = baLuc(q, u).ft, x = ex + q[0] * R, y = ey - q[1] * R;
        muiTen(g, x, y, x + ft[0] * DAI * PHONG_DAI_FT, y - ft[1] * DAI * PHONG_DAI_FT, MAU.ft, 4, 14);
        tron(g, x, y, 5, MAU.navy);
      }
    }
    tron(g, CX, CY, 9, MAU.navy, '#FFFFFF', 2.5);
    chu(g, 'CM', CX, CY + 16, { co: 30, dam: 700, mau: '#FFFFFF', vien: MAU.navy, can: 'center', goc: 'top', khoa: true });

    const px = ex + p[0] * R, py = ey - p[1] * R, nx = -p[1] * 12, ny = -p[0] * 12;
    const ve1 = (k, ten, mau, mauChu, hs, ox, oy) => {
      if (!st3[k]) return;
      const dx = f[k][0] * DAI * hs, dy = -f[k][1] * DAI * hs, L = Math.hypot(dx, dy) || 1;
      muiTen(g, px + ox, py + oy, px + ox + dx, py + oy + dy, mau, 7, 22);
      chu(g, ten, px + ox + dx + dx / L * 26, py + oy + dy + dy / L * 26, { co: 30, dam: 700, mau: mauChu, vien: '#FFFFFF', can: 'center', goc: 'middle', khoa: true });
    };
    ve1('fc', 'Fc', MAU.luc, MAU.luc, 1, nx, ny);
    ve1('fg', 'Fg', MAU.do, MAU.do, 1, 0, 0);
    ve1('ft', 'Ft', MAU.ft, MAU.ftChu, PHONG_DAI_FT, -nx, -ny);
    tron(g, px, py, 13, MAU.cam, '#FFFFFF', 3);

    veBang(g, sd);
    tieuDe(g, 'Ba lực tại một điểm (bản 2D)', 'Kéo điểm cam quanh Trái Đất, hoặc chạm lên Trái Đất để đặt điểm.');
    if (this.tuBao) chu(g, 'Thiết bị không hỗ trợ đồ hoạ 3D – đang hiển thị bản 2D.', 48, 996, { co: 30, dam: 600, mau: MAU.camChu });
    chanTrang(g, GHI_CHU_3.replace(' Lục địa vẽ giản lược.', ' Lát cắt nhìn từ cực Bắc.'));
  },
};
