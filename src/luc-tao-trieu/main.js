// Lực tạo triều: 7 cảnh tự do. Cảnh 3 là mô hình 3D (three.js); bản dự phòng 2D ở 2d.js.
import { W, H, tt } from './chung.js';
import c1 from './canh1-tinh-tien.js';
import c2 from './canh2-ly-tam.js';
import c3 from './canh3-mo-hinh-3d.js';
import c3Phang from './2d.js';
import c4 from './canh4-quy-dao.js';
import c5 from './canh5-xich-vi.js';
import c6 from './canh6-nhin-ngang.js';
import c7 from './canh7-trieu-cuong-kem.js';

function taoDinhNghia(dsCanh) {
  const ds = dsCanh.slice();
  let cv = null, g = null, idTruoc = null;
  const tim = (id) => ds.find((c) => c.id === id);
  return {
    canh: ds.map((c) => ({ id: c.id, lap: c.lap, dieuKhien: c.dieuKhien, giuCham: !!c.giuCham })),
    thoiLuong: 0,
    khoiTao(sanKhau, mt) {
      tt.giam = !!mt.giamChuyenDong;
      ds.forEach((c, i) => {
        if (!c.khoiTao) return;
        try { c.khoiTao(sanKhau, mt); } catch (loi) {
          // three.js không tạo được WebGL dù trình duyệt báo có: tự chuyển cảnh 3 sang bản 2D
          if (c !== c3) throw loi;
          c3Phang.tuBao = true; c3Phang.khoiTao(sanKhau, mt); ds[i] = c3Phang;
        }
      });
      cv = document.createElement('canvas');
      cv.width = Math.round(W * mt.dpr); cv.height = Math.round(H * mt.dpr);
      cv.style.cssText = `position:absolute;left:0;top:0;width:${W}px;height:${H}px;pointer-events:none`;
      cv.setAttribute('role', 'img');
      g = cv.getContext('2d'); g.scale(mt.dpr, mt.dpr);
      sanKhau.append(cv);
    },
    ve(t, id) {
      const c = tim(id);
      if (id !== idTruoc) {
        const cu = tim(idTruoc);
        if (cu && cu.ra) cu.ra();
        if (c.vao) c.vao();
        cv.setAttribute('aria-label', c.moTa);
        idTruoc = id;
      }
      c.ve(g, t);
    },
    datNhan(muc) { tt.muc = muc; },
    khiDoi(id, v) { for (const c of ds) if (c.dieuKhien.some((d) => d.id === id)) c.khiDoi(id, v); },
    doiCo(tiLe) { for (const c of ds) if (c.doiCo) c.doiCo(tiLe); },
    huy() { for (const c of ds) if (c.huy) c.huy(); if (cv) cv.remove(); },
  };
}

const dinhNghia = taoDinhNghia([c1, c2, c3, c4, c5, c6, c7]);
dinhNghia.canWebGL2 = true;
dinhNghia.duPhong = taoDinhNghia([c1, c2, c3Phang, c4, c5, c6, c7]);
window.HMO.dangKy(dinhNghia);
