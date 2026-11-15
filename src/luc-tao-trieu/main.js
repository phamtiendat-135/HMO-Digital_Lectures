// Lực tạo triều: 7 cảnh tự do. Cảnh 3 là mô hình 3D (three.js); bản dự phòng 2D ở 2d.js.
import { W, H, tt } from './chung.js';
import c1 from './canh1-tinh-tien.js';
import c2 from './canh2-ly-tam.js';

function taoDinhNghia(dsCanh) {
  const ds = dsCanh.slice();
  let cv = null, g = null, idTruoc = null;
  const tim = (id) => ds.find((c) => c.id === id);
  return {
    canh: ds.map((c) => ({ id: c.id, lap: c.lap, dieuKhien: c.dieuKhien, giuCham: !!c.giuCham })),
    thoiLuong: 0,
    khoiTao(sanKhau, mt) {
      tt.giam = !!mt.giamChuyenDong;
      for (const c of ds) if (c.khoiTao) c.khoiTao(sanKhau, mt);
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

window.HMO.dangKy(taoDinhNghia([c1, c2]));
