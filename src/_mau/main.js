// Animation mẫu để thử bộ khung: 2 cảnh có giờ + 1 cảnh tự do có điều khiển riêng.
let cv, ctx, R = 60, hienVet = true, mucNhan = 'day-du';
HMO.dangKy({
  canh: [
    { id: 'di-ngang', batDau: 0, ketThuc: 4 },
    { id: 'di-doc', batDau: 4, ketThuc: 8 },
    { id: 'quay-vong', lap: 3, dieuKhien: [
      { id: 'ban-kinh', loai: 'truot', nhan: 'Bán kính', min: 20, max: 120, buoc: 10, giaTri: 60, donVi: 'px' },
      { id: 'vet', loai: 'bat-tat', nhan: 'Hiện quỹ đạo', giaTri: true },
      { id: 'mau', loai: 'chon', nhan: 'Màu', giaTri: 'cam', luaChon: [{ giaTri: 'cam', nhan: 'Cam' }, { giaTri: 'xanh', nhan: 'Xanh' }] },
    ] },
  ],
  thoiLuong: 8,
  khoiTao(sanKhau, mt) {
    cv = document.createElement('canvas');
    cv.width = mt.rong * mt.dpr; cv.height = mt.cao * mt.dpr;
    cv.style.width = mt.rong + 'px'; cv.style.height = mt.cao + 'px';
    ctx = cv.getContext('2d'); ctx.scale(mt.dpr, mt.dpr);
    sanKhau.append(cv);
  },
  ve(t, idCanh) {
    ctx.fillStyle = '#EAF4FB'; ctx.fillRect(0, 0, 1440, 1080);
    let x = 720, y = 540;
    if (idCanh === 'di-ngang') x = 200 + 1040 * (t / 4);
    else if (idCanh === 'di-doc') y = 200 + 680 * ((t - 4) / 4);
    else {
      const a = 2 * Math.PI * t / 3;
      if (hienVet) { ctx.strokeStyle = '#546E8F'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(720, 540, R * 3, 0, 7); ctx.stroke(); }
      x = 720 + R * 3 * Math.cos(a); y = 540 + R * 3 * Math.sin(a);
    }
    ctx.fillStyle = mauHat; ctx.beginPath(); ctx.arc(x, y, 40, 0, 7); ctx.fill();
    if (mucNhan !== 'tat') { ctx.fillStyle = '#0F1E3A'; ctx.font = '600 44px "Be Vietnam Pro",sans-serif'; ctx.fillText('Cảnh: ' + idCanh, 60, 90); }
    if (mucNhan === 'day-du') { ctx.font = '400 30px "Be Vietnam Pro",sans-serif'; ctx.fillText('nhãn phụ t = ' + t.toFixed(2), 60, 140); }
  },
  datNhan(muc) { mucNhan = muc; },
  khiDoi(id, v) { if (id === 'ban-kinh') R = v; else if (id === 'vet') hienVet = v; else if (id === 'mau') mauHat = v === 'cam' ? '#F07800' : '#1B4E8F'; },
  huy() { cv.remove(); },
});
let mauHat = '#F07800';
