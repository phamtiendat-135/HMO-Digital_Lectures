// Bộ khung dùng chung của Kho học liệu số HMO.
// Giữ đồng hồ duy nhất, điều khiển, hai chế độ hiển thị (Tự học / Trình chiếu),
// ba mức sử dụng (Chỉ xem / Tự luyện / Tính điểm), khung giải thích và câu hỏi.
// Animation chỉ gọi HMO.dangKy({...}) — xem docs/STANDARDS.md mục "Hợp đồng".
import { taoSoDiem } from './so-diem.js';

const W = 1440, H = 1080;
const TOC_DO = [0.25, 0.5, 1, 2, 4];
const NGUONG_NHAN = 0.5; // sân khấu co dưới mức này: nhãn 30 px còn < 15 px → chỉ giữ nhãn chính
const ICON = {
  phat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l13-7.5z"/></svg>',
  dung: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h4.5v14H6zM13.5 5H18v14h-4.5z"/></svg>',
  truoc: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h2.5v14H6zM20 5v14L9.5 12z"/></svg>',
  sau: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 5H18v14h-2.5zM4 5v14l10.5-7z"/></svg>',
  toan: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h6v2.4H6.4V10H4zM14 4h6v6h-2.4V6.4H14zM4 14h2.4v3.6H10V20H4zM17.6 14H20v6h-6v-2.4h3.6z"/></svg>',
};
const el = (the, thuocTinh = {}, ...con) => {
  const e = document.createElement(the);
  for (const [k, v] of Object.entries(thuocTinh)) {
    if (k === 'html') e.innerHTML = v; else if (k === 'text') e.textContent = v;
    else if (k.startsWith('on')) e.addEventListener(k.slice(2), v); else if (v !== false && v != null) e.setAttribute(k, v === true ? '' : v);
  }
  e.append(...con.filter(Boolean));
  return e;
};
const vnSo = (x) => String(x).replace('.', ',');

function coWebGL2() {
  try { return !!document.createElement('canvas').getContext('webgl2'); } catch { return false; }
}

const S = {
  dn: null,            // định nghĩa animation đang dùng
  nd: null,            // nội dung tự học (window.HMO_NOIDUNG)
  iCanh: 0, tCanh: 0,  // cảnh hiện tại và thời gian trong cảnh (giây hoạt hình)
  dangPhat: false, iTocDo: 2,
  cheDo: 'tu-hoc', muc: 'xem', maLop: '',
  nhanTat: false, mucNhan: 'day-du', tiLe: 1,
  canVe: true, daKetThuc: false, daDenCuoi: false,
  lanThu: 1, traLoi: {}, giaTriDK: {},
};
const D = {}; // các phần tử DOM
let soDiem = null, rafId = 0, tTruoc = 0, henAn = 0;

const canh = () => S.dn.canh[S.iCanh];
const laTuDo = (c) => c.lap != null;
const doDai = (c) => (laTuDo(c) ? c.lap : c.ketThuc - c.batDau);
const tVe = () => (laTuDo(canh()) ? S.tCanh : canh().batDau + S.tCanh);
const ndCanh = (id) => (S.nd.canh || []).find((c) => c.id === id) || { ten: id, giaiThich: '' };

function ve() {
  S.canVe = false;
  S.dn.ve(tVe(), canh().id);
}

function buoc(bayGio) {
  rafId = requestAnimationFrame(buoc);
  const dt = Math.min(0.1, (bayGio - tTruoc) / 1000); // chặn bước nhảy khi tab vừa hiện lại
  tTruoc = bayGio;
  if (S.dangPhat) {
    const c = canh();
    S.tCanh += dt * TOC_DO[S.iTocDo];
    if (laTuDo(c)) S.tCanh %= c.lap;
    else if (S.tCanh >= doDai(c)) { S.tCanh = doDai(c); denCuoiCanh(); }
    S.canVe = true;
  }
  if (S.canVe) { ve(); capNhatTua(); }
}

function denCuoiCanh() {
  datPhat(false);
  S.daKetThuc = true;
  if (S.iCanh === S.dn.canh.length - 1) danhDauDenCuoi();
}
function danhDauDenCuoi() {
  if (S.daDenCuoi) return;
  S.daDenCuoi = true;
  veHoi();
}

function datPhat(b) {
  if (b && S.daKetThuc) { // đang đứng ở cuối cảnh có giờ: phát = sang cảnh sau (hoặc chạy lại cảnh cuối)
    if (S.iCanh < S.dn.canh.length - 1) { denCanh(S.iCanh + 1, true); return; }
    S.tCanh = 0; S.daKetThuc = false;
  }
  S.dangPhat = b;
  D.phat.innerHTML = b ? ICON.dung : ICON.phat;
  D.phat.setAttribute('aria-label', b ? 'Dừng' : 'Phát');
  D.app.dataset.phat = b ? '1' : '0';
}

function denCanh(i, phat) {
  const n = S.dn.canh.length;
  S.iCanh = Math.max(0, Math.min(n - 1, i));
  S.tCanh = 0; S.daKetThuc = false; S.canVe = true;
  const c = canh();
  if (laTuDo(c) && S.iCanh === n - 1) danhDauDenCuoi();
  veBangCanh();
  datPhat(phat == null ? S.dangPhat : phat);
}

function datTocDo(i) {
  S.iTocDo = Math.max(0, Math.min(TOC_DO.length - 1, i));
  D.tocDo.textContent = vnSo(TOC_DO[S.iTocDo]) + '×';
  D.tocDo.setAttribute('aria-label', 'Tốc độ ' + vnSo(TOC_DO[S.iTocDo]) + ' lần. Bấm để đổi');
}

function capNhatTua() {
  const c = canh();
  D.tua.hidden = laTuDo(c);
  if (!laTuDo(c)) D.tuaDay.style.width = (100 * S.tCanh / doDai(c)).toFixed(2) + '%';
}

function capNhatNhan() {
  const moi = S.nhanTat ? 'tat' : (S.cheDo === 'tu-hoc' && S.tiLe < NGUONG_NHAN ? 'toi-gian' : 'day-du');
  if (moi !== S.mucNhan) { S.mucNhan = moi; if (S.dn.datNhan) S.dn.datNhan(moi); S.canVe = true; }
  D.nhan.setAttribute('aria-pressed', String(!S.nhanTat));
}

function coGian() {
  const r = D.vung.getBoundingClientRect();
  if (!r.width || !r.height) return;
  S.tiLe = Math.min(r.width / W, r.height / H);
  const x = (r.width - W * S.tiLe) / 2, y = (r.height - H * S.tiLe) / 2;
  D.sanKhau.style.transform = `translate(${x}px,${y}px) scale(${S.tiLe})`;
  capNhatNhan();
  if (S.dn.doiCo) S.dn.doiCo(S.tiLe);
  S.canVe = true;
}

function datCheDo(cheDo) {
  S.cheDo = cheDo;
  D.app.dataset.cheDo = cheDo;
  D.cheDo.textContent = cheDo === 'tu-hoc' ? 'Trình chiếu' : 'Tự học';
  (cheDo === 'trinh-chieu' ? D.riengTC : D.riengCho).append(D.rieng);
  hienDK();
  requestAnimationFrame(coGian);
}

function hienDK() {
  D.app.dataset.an = '0';
  clearTimeout(henAn);
  if (S.cheDo === 'trinh-chieu') henAn = setTimeout(() => { D.app.dataset.an = '1'; }, 3000);
}

function toanManHinh() {
  if (document.fullscreenElement) { document.exitFullscreen(); return; }
  datCheDo('trinh-chieu');
  const yc = D.app.requestFullscreen || D.app.webkitRequestFullscreen;
  if (yc) Promise.resolve(yc.call(D.app)).catch(() => {});
}

/* ---------- khung giải thích và điều khiển riêng của cảnh ---------- */
function veBangCanh() {
  const c = canh(), nd = ndCanh(c.id);
  D.tenCanh.textContent = nd.ten;
  D.giaiThich.textContent = nd.giaiThich;
  D.bangSo.replaceChildren(...(nd.bang ? [dungBangSo(nd.bang)] : []));
  D.canhSo.textContent = `Cảnh ${S.iCanh + 1}/${S.dn.canh.length}`;
  D.truoc.disabled = S.iCanh === 0;
  D.sau.disabled = S.iCanh === S.dn.canh.length - 1;
  D.rieng.replaceChildren(...(c.dieuKhien || []).map(taoDieuKhien));
  capNhatTua();
}

// Bảng số tuỳ chọn của cảnh ({cot:[…], dong:[[…]]}). Chỉ dùng textContent, không bao giờ innerHTML.
function dungBangSo(bang) {
  const hang = (o, the) => el('tr', {}, ...o.map((x) => el(the, { text: String(x) })));
  const ds = (bang.cot || []).map(String);
  const t = el('table', {}, el('thead', {}, hang(ds, 'th')), el('tbody', {}, ...(bang.dong || []).map((d) => hang(d, 'td'))));
  return el('div', { class: 'hmo-bang-cuon', tabindex: '0', role: 'region', 'aria-label': 'Bảng số liệu của cảnh' }, t);
}

function doiDK(dk, giaTri) {
  S.giaTriDK[dk.id] = giaTri;
  if (S.dn.khiDoi) S.dn.khiDoi(dk.id, giaTri);
  S.canVe = true;
}

function taoDieuKhien(dk) {
  const gt = dk.id in S.giaTriDK ? S.giaTriDK[dk.id] : dk.giaTri;
  const idDom = 'hmo-dk-' + dk.id;
  if (dk.loai === 'nut') { // nút bấm một lần: không giữ giá trị, chỉ báo cho animation
    return el('div', { class: 'hmo-dkr' }, el('button', { type: 'button', id: idDom, text: dk.nhan, onclick: () => { if (S.dn.khiDoi) S.dn.khiDoi(dk.id, true); S.canVe = true; } }));
  }
  if (dk.loai === 'truot') {
    const dinh = (v) => vnSo(dk.thapPhan != null ? Number(v).toFixed(dk.thapPhan) : v) + (dk.donVi ? ' ' + dk.donVi : '');
    const so = el('span', { text: dinh(gt) });
    const vao = el('input', { type: 'range', id: idDom, min: dk.min, max: dk.max, step: dk.buoc || 1, value: gt,
      oninput: (e) => { const v = Number(e.target.value); so.textContent = dinh(v); doiDK(dk, v); } });
    return el('div', { class: 'hmo-dkr' }, el('label', { for: idDom }, dk.nhan + ': ', so), vao);
  }
  if (dk.loai === 'bat-tat') {
    const nut = el('button', { type: 'button', id: idDom, 'aria-pressed': String(!!gt), text: dk.nhan,
      onclick: () => { const v = nut.getAttribute('aria-pressed') !== 'true'; nut.setAttribute('aria-pressed', String(v)); doiDK(dk, v); } });
    return el('div', { class: 'hmo-dkr' }, nut);
  }
  const nhom = el('div', { class: 'hmo-chon', role: 'group', 'aria-label': dk.nhan });
  for (const lc of dk.luaChon) {
    nhom.append(el('button', { type: 'button', 'aria-pressed': String(lc.giaTri === gt), text: lc.nhan,
      onclick: (e) => { nhom.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', 'false')); e.currentTarget.setAttribute('aria-pressed', 'true'); doiDK(dk, lc.giaTri); } }));
  }
  return el('div', { class: 'hmo-dkr' }, el('label', { text: dk.nhan }), nhom);
}

/* ---------- câu hỏi tự kiểm tra và sổ điểm ---------- */
function baoDiem(tt) {
  if (!D.ttDiem) return;
  const chu = { 'da-luu': 'Đã lưu điểm ✓', cho: 'Chưa gửi được, sẽ tự gửi lại', 'chua-cau-hinh': 'Sổ điểm chưa được cấu hình — điểm không được lưu',
    'tu-choi': 'Không lưu được: ' + (tt.lyDo || '') }[tt.loai];
  D.ttDiem.textContent = chu;
  D.ttDiem.dataset.loai = tt.loai;
}

function veMssv() {
  const mssv = soDiem.docMssv();
  const hop = el('div', { id: 'hmo-mssv' });
  if (mssv) {
    hop.append(el('div', { html: `Đang ghi điểm cho MSSV <b></b> · lớp <b></b>` }),
      el('button', { type: 'button', class: 'phu', text: 'Không phải tôi', onclick: () => { soDiem.xoaMssv(); veHoi(); } }));
    const [a, b] = hop.querySelectorAll('b'); a.textContent = mssv; b.textContent = S.maLop;
  } else {
    const vao = el('input', { id: 'hmo-mssv-o', inputmode: 'numeric', autocomplete: 'off', maxlength: '12', placeholder: 'Ví dụ: 23001234' });
    hop.append(el('label', { for: 'hmo-mssv-o', text: `Nhập MSSV để lưu điểm (lớp ${S.maLop}). Không nhập vẫn làm được, chỉ không lưu điểm.` }), vao,
      el('button', { type: 'button', text: 'Lưu MSSV', onclick: () => { const v = vao.value.trim(); if (/^[0-9A-Za-z]{4,12}$/.test(v)) { soDiem.ghiMssv(v); veHoi(); } else { vao.focus(); vao.setAttribute('aria-invalid', 'true'); } } }));
  }
  return hop;
}

function chonPhuongAn(cau, i, khoi) {
  if (S.traLoi[cau.id] != null) return;
  S.traLoi[cau.id] = i;
  const dung = i === cau.dapAn;
  khoi.querySelectorAll('.hmo-pa').forEach((nut, j) => {
    nut.disabled = true;
    if (j === cau.dapAn) nut.classList.add('dung'); else if (j === i) nut.classList.add('sai');
  });
  khoi.append(el('p', { class: 'hmo-gt', role: 'status', text: (dung ? 'Đúng. ' : `Chưa đúng. Đáp án: ${'ABCD'[cau.dapAn]}. `) + cau.giaiThich }));
  const mssv = S.muc === 'tinh-diem' ? soDiem.docMssv() : '';
  if (mssv) soDiem.gui({ mssv, maLop: S.maLop, slug: S.nd.slug, qid: cau.id, chon: 'ABCD'[i], dung, lanThu: S.lanThu, thoiGian: new Date().toISOString() });
  const ds = S.nd.cauHoi;
  if (ds.every((c) => S.traLoi[c.id] != null)) {
    const soDung = ds.filter((c) => S.traLoi[c.id] === c.dapAn).length;
    D.hoi.append(el('p', { id: 'hmo-ket-qua', role: 'status', text: `Kết quả: ${soDung}/${ds.length} câu đúng.` }),
      el('button', { type: 'button', class: 'hmo-pa', text: 'Làm lại', onclick: () => { S.lanThu += 1; S.traLoi = {}; veHoi(); } }));
  }
}

function veHoi() {
  const ds = S.nd.cauHoi || [];
  D.hoi.replaceChildren();
  if (!ds.length) return;
  if (S.muc === 'xem') {
    if (S.daDenCuoi) D.hoi.append(el('button', { id: 'hmo-moi-hoi', type: 'button', text: `Làm ${ds.length} câu tự kiểm tra (không bắt buộc)`, onclick: () => { S.muc = 'tu-luyen'; D.app.dataset.muc = S.muc; veHoi(); } }));
    return;
  }
  if (S.muc === 'tinh-diem') { D.hoi.append(veMssv()); D.ttDiem = el('div', { id: 'hmo-tt-diem', role: 'status', 'aria-live': 'polite' }); D.hoi.append(D.ttDiem); }
  ds.forEach((cau, n) => {
    const khoi = el('div', { class: 'hmo-cau', 'data-qid': cau.id }, el('h3', { text: `Câu ${n + 1}. ${cau.hoi}` }));
    cau.phuongAn.forEach((pa, i) => khoi.append(el('button', { type: 'button', class: 'hmo-pa', text: `${'ABCD'[i]}. ${pa}`, onclick: () => chonPhuongAn(cau, i, khoi) })));
    D.hoi.append(khoi);
  });
}

/* ---------- dựng DOM và gắn sự kiện ---------- */
function dung() {
  const nut = (id, nhan, noiDung, khiBam) => el('button', { type: 'button', class: 'hmo-nut', id, 'aria-label': nhan, title: nhan, html: noiDung, onclick: khiBam });
  D.sanKhau = el('div', { id: 'hmo-san-khau' });
  D.thongBao = el('div', { id: 'hmo-thong-bao', role: 'status' });
  D.vung = el('div', { id: 'hmo-vung' }, D.sanKhau, D.thongBao);
  // Nút về kho nằm đầu thanh điều khiển, không đè lên tiêu đề vẽ trên sân khấu.
  D.veKho = el('a', { id: 'hmo-ve-kho', class: 'hmo-nut', href: (window.HMO_CONFIG || {}).khoUrl || '../../', 'aria-label': 'Về trang Kho học liệu', text: '← Kho' });
  D.truoc = nut('hmo-truoc', 'Cảnh trước', ICON.truoc, () => denCanh(S.iCanh - 1, false));
  D.phat = nut('hmo-phat', 'Phát', ICON.phat, () => datPhat(!S.dangPhat));
  D.sau = nut('hmo-sau', 'Cảnh sau', ICON.sau, () => denCanh(S.iCanh + 1, false));
  D.tuaDay = el('div', { id: 'hmo-tua-day' });
  D.tua = el('div', { id: 'hmo-tua', role: 'slider', tabindex: '0', 'aria-label': 'Tua trong cảnh' }, el('div', { id: 'hmo-tua-ray' }, D.tuaDay));
  D.canhSo = el('span', { id: 'hmo-canh-so' });
  D.tocDo = nut('hmo-toc-do', 'Tốc độ', '1×', () => datTocDo((S.iTocDo + 1) % TOC_DO.length));
  D.nhan = nut('hmo-nhan', 'Bật/tắt nhãn (L)', 'Nhãn', () => { S.nhanTat = !S.nhanTat; capNhatNhan(); });
  D.cheDo = nut('hmo-che-do', 'Đổi chế độ Tự học / Trình chiếu', '', () => datCheDo(S.cheDo === 'tu-hoc' ? 'trinh-chieu' : 'tu-hoc'));
  D.toan = nut('hmo-toan', 'Toàn màn hình (F)', ICON.toan, toanManHinh);
  D.riengTC = el('div', { id: 'hmo-rieng-tc' });
  D.dk = el('div', { id: 'hmo-dk', role: 'toolbar', 'aria-label': 'Điều khiển' }, D.veKho, D.truoc, D.phat, D.sau, D.canhSo, D.tua, D.tocDo, D.nhan, D.cheDo, D.toan);
  D.tenCanh = el('h2', { id: 'hmo-ten-canh' });
  D.giaiThich = el('p', { id: 'hmo-giai-thich' });
  D.bangSo = el('div', { id: 'hmo-bang-so' });
  D.rieng = el('div', { id: 'hmo-rieng' });
  D.riengCho = el('div', {}, D.rieng);
  D.hoi = el('div', { id: 'hmo-hoi' });
  D.noiDung = el('div', { id: 'hmo-noi-dung' }, D.tenCanh, D.giaiThich, D.bangSo, D.riengCho, D.hoi, S.nd.nguon ? el('p', { id: 'hmo-nguon', text: S.nd.nguon }) : null);
  D.bang = el('div', { id: 'hmo-bang' }, D.riengTC, D.dk, D.noiDung);
  D.app = el('div', { id: 'hmo-app' }, D.vung, el('div', { id: 'hmo-xoay', text: 'Xoay ngang điện thoại để xem rõ hơn' }), D.bang);
  document.body.append(D.app);
}

function ganSuKien() {
  // Tua trong cảnh có giờ
  const tuaTai = (e) => { const r = D.tua.getBoundingClientRect(); const c = canh(); if (laTuDo(c)) return; S.tCanh = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * doDai(c); S.daKetThuc = false; S.canVe = true; };
  D.tua.addEventListener('pointerdown', (e) => { D.tua.setPointerCapture(e.pointerId); tuaTai(e); });
  D.tua.addEventListener('pointermove', (e) => { if (e.buttons || e.pointerType === 'touch') tuaTai(e); });
  D.tua.addEventListener('keydown', (e) => { if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return; e.stopPropagation(); e.preventDefault(); const c = canh(); if (laTuDo(c)) return; S.tCanh = Math.max(0, Math.min(doDai(c), S.tCanh + (e.key === 'ArrowRight' ? 2 : -2))); S.daKetThuc = false; S.canVe = true; });

  // Chạm sân khấu = phát/dừng; vuốt ngang = đổi cảnh. Cảnh có giuCham thì animation tự xử lý chạm.
  let x0 = 0, y0 = 0, t0 = 0, theo = false;
  D.sanKhau.addEventListener('pointerdown', (e) => { theo = !canh().giuCham && e.isPrimary; x0 = e.clientX; y0 = e.clientY; t0 = e.timeStamp; });
  D.sanKhau.addEventListener('pointerup', (e) => {
    if (!theo) return; theo = false;
    const dx = e.clientX - x0, dy = e.clientY - y0;
    if (Math.abs(dx) > 50 && Math.abs(dx) > 1.5 * Math.abs(dy)) denCanh(S.iCanh + (dx < 0 ? 1 : -1), false);
    else if (Math.hypot(dx, dy) < 10 && e.timeStamp - t0 < 500) datPhat(!S.dangPhat);
  });
  D.sanKhau.addEventListener('pointercancel', () => { theo = false; });

  document.addEventListener('keydown', (e) => {
    if (e.target.closest && e.target.closest('input,textarea,select')) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const k = e.key;
    if (k === ' ' || k === 'b' || k === 'B' || k === '.') { if (e.target.closest && e.target.closest('button') && k === ' ') return; datPhat(!S.dangPhat); }
    else if (k === 'ArrowRight' || k === 'PageDown') denCanh(S.iCanh + 1, false);
    else if (k === 'ArrowLeft' || k === 'PageUp') denCanh(S.iCanh - 1, false);
    else if (k === 'ArrowUp') datTocDo(S.iTocDo + 1);
    else if (k === 'ArrowDown') datTocDo(S.iTocDo - 1);
    else if (k === 'f' || k === 'F') toanManHinh();
    else if (k === 'l' || k === 'L') { S.nhanTat = !S.nhanTat; capNhatNhan(); }
    else return;
    e.preventDefault(); hienDK();
  });
  for (const sk of ['pointermove', 'pointerdown']) document.addEventListener(sk, hienDK, { passive: true });
  document.addEventListener('visibilitychange', () => { if (document.hidden) datPhat(false); });
  window.addEventListener('resize', coGian);
  window.addEventListener('orientationchange', () => setTimeout(coGian, 200));
  if (window.ResizeObserver) new ResizeObserver(coGian).observe(D.vung);
}

function khoiDong(dinhNghia) {
  let dn = dinhNghia, thongBao = '';
  const webgl2 = coWebGL2();
  if (dn.canWebGL2 && !webgl2) {
    if (!dn.duPhong) throw new Error('Animation cần WebGL2 nhưng không khai báo duPhong');
    dn = dn.duPhong;
    thongBao = 'Thiết bị này không hỗ trợ WebGL2 — đang hiển thị bản 2D.';
  }
  S.dn = dn;
  S.nd = window.HMO_NOIDUNG || { slug: '', canh: [], cauHoi: [] };
  const q = new URLSearchParams(location.search);
  S.maLop = (q.get('lop') || '').trim().slice(0, 24);
  S.muc = S.maLop ? 'tinh-diem' : 'xem';
  soDiem = taoSoDiem({ url: (window.HMO_CONFIG || {}).soDiemUrl || '' }, baoDiem);

  dung();
  D.app.dataset.muc = S.muc;
  D.thongBao.textContent = thongBao;
  // Thông báo nằm đè dải đáy sân khấu (dòng nguồn): hiện 6 s rồi tự ẩn; trình đọc màn hình đã đọc qua role=status.
  if (thongBao) setTimeout(() => { D.thongBao.textContent = ''; }, 6000);
  const diDong = window.innerWidth < 1024 || matchMedia('(pointer:coarse)').matches;
  const dpr = Math.min(window.devicePixelRatio || 1, diDong ? 1 : 1.5);
  const giam = matchMedia('(prefers-reduced-motion:reduce)').matches;
  dn.khoiTao(D.sanKhau, { rong: W, cao: H, dpr, webgl2, giamChuyenDong: giam });
  datCheDo(q.get('che-do') === 'trinh-chieu' ? 'trinh-chieu' : q.get('che-do') === 'tu-hoc' ? 'tu-hoc' : (diDong ? 'tu-hoc' : 'trinh-chieu'));
  ganSuKien();
  datTocDo(2);
  denCanh(0, false);
  veHoi();
  coGian();
  if (S.muc === 'tinh-diem') soDiem.xaHangDoi();
  tTruoc = performance.now();
  rafId = requestAnimationFrame(buoc);
  // Mọi chế độ đều mở ở trạng thái dừng: người xem bấm phát khi sẵn sàng (đỡ tốn pin và 4G).
}

window.HMO = {
  /** Đăng ký animation. Gọi đúng một lần. */
  dangKy(dinhNghia) {
    if (S.dn) throw new Error('HMO.dangKy chỉ được gọi một lần');
    const chay = () => khoiDong(dinhNghia);
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', chay); else chay();
  },
  /** Animation gọi khi trạng thái ngoài t thay đổi (xoay camera, kéo thả…). */
  yeuCauVe() { S.canVe = true; },
  /** Animation gọi để dừng đồng hồ (ví dụ khi người xem bấm nút "Bước"). */
  tamDung() { datPhat(false); },
  /** Dùng cho test và gỡ lỗi. */
  trangThai: () => ({ t: tVe(), iCanh: S.iCanh, idCanh: S.dn ? canh().id : null, dangPhat: S.dangPhat, tocDo: TOC_DO[S.iTocDo], cheDo: S.cheDo, muc: S.muc, mucNhan: S.mucNhan, tiLe: S.tiLe, daDenCuoi: S.daDenCuoi }),
  denCanh: (i, phat) => denCanh(i, !!phat),
  tua(tTrongCanh) { S.tCanh = Math.max(0, Math.min(doDai(canh()), tTrongCanh)); S.daKetThuc = false; S.canVe = true; },
  phat: (b) => datPhat(b),
};
