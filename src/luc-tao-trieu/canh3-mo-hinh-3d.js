// Cảnh 3: mô hình 3D (three.js). Trục y = cực Bắc; chuyển động tịnh tiến quanh CM nằm trong mặt phẳng xz,
// ngược chiều kim đồng hồ khi nhìn từ cực Bắc. Camera và hướng điểm cam là trạng thái ngoài t.
import {
  Scene, PerspectiveCamera, WebGLRenderer, SphereGeometry, CylinderGeometry, ConeGeometry, BufferGeometry, Mesh, Line, LineLoop, Group,
  MeshPhongMaterial, MeshBasicMaterial, LineBasicMaterial, LineDashedMaterial, CanvasTexture, Raycaster, Vector2, Vector3,
  AmbientLight, DirectionalLight, Color, SRGBColorSpace,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { W, H, MAU, TI_SO_CM, PHONG_DAI_FT, TAU, kep, baLuc, doDai, chu, tieuDe, chanTrang } from './chung.js';
import { LAP3, st3, DIEU_KHIEN_3D, khiDoiChung, soDoc, veBang, GHI_CHU_3, MO_TA_3 } from './canh3-chung.js';

const D_TRANG = 4.9;      // khoảng cách vẽ Trái Đất – Mặt Trăng (thực tế 60,3 bán kính Trái Đất)
const K = TI_SO_CM;       // CM cách tâm Trái Đất 0,733 bán kính
const DAI = 1.15;         // độ dài mũi tên ứng với |Fc|
const CM = new Vector3(K, 0, 0);
const GOC_NHIN = {
  'ban-dau': [[0.97, 2.81, 7.93], [1.65, 0.2, 0]],
  'cuc-bac': [[1.6, 10.5, 0.01], [1.6, 0, 0]],
  'doc-truc': [[-6, 0.6, 0], [1.6, 0, 0]],
};
const TRUC_Y = new Vector3(0, 1, 0);
const TACH_NHAN = { fc: 1.5, fg: 1.5, ft: -2.5 };   // nhãn lệch thêm theo phương lệch gốc mũi tên (đơn vị 0,1)

let renderer = null, scene, camera, controls, cvGL, earth, earthMat, moon, nhomTruc, nhomVanh, diemCam, vetNhom, vet = [], chamVet = [];
const tia = new Raycaster(), ndc = new Vector2(), v1 = new Vector3(), v2 = new Vector3(), tamTD = new Vector3();
const yeuCau = () => window.HMO.yeuCauVe();

function texTraiDat() {
  const w = 1024, h = 512, c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d');
  g.fillStyle = '#1B4E8F'; g.fillRect(0, 0, w, h);
  const gr = g.createLinearGradient(0, 0, 0, h);
  gr.addColorStop(0, 'rgba(168,216,240,0.55)'); gr.addColorStop(0.5, 'rgba(255,255,255,0)'); gr.addColorStop(1, 'rgba(168,216,240,0.55)');
  g.fillStyle = gr; g.fillRect(0, 0, w, h);
  const px = (kd, vd) => [(kd + 180) / 360 * w, (90 - vd) / 180 * h];
  // Lục địa giản lược (sơ đồ, không có đường biên hay tên gọi).
  const dat = [
    [[-17, 15], [-5, 25], [0, 35], [10, 37], [22, 32], [34, 31], [36, 20], [43, 12], [51, 12], [42, -2], [40, -16], [33, -26], [20, -35], [16, -28], [12, -6], [9, 4], [-8, 4]],
    [[26, 36], [45, 40], [60, 52], [80, 50], [100, 48], [118, 45], [135, 45], [141, 35], [122, 23], [105, 10], [97, 17], [88, 22], [70, 20], [60, 25], [48, 30], [36, 36]],
    [[8, 54], [28, 70], [60, 72], [95, 76], [135, 72], [170, 68], [178, 62], [145, 55], [110, 52], [80, 50], [55, 52], [30, 58]],
    [[-166, 62], [-150, 66], [-135, 58], [-124, 49], [-100, 49], [-80, 45], [-65, 47], [-70, 38], [-76, 34], [-82, 27], [-92, 29], [-98, 20], [-88, 15], [-83, 9], [-95, 17], [-107, 24], [-118, 32], [-125, 42], [-132, 55], [-150, 58]],
    [[-78, 8], [-62, 10], [-50, 0], [-36, -6], [-38, -22], [-48, -30], [-58, -38], [-66, -45], [-73, -52], [-76, -44], [-71, -30], [-70, -18], [-78, -4]],
    [[113, -22], [122, -17], [131, -12], [142, -11], [147, -19], [153, -27], [150, -37], [140, -38], [129, -32], [115, -34]],
    [[-47, 60], [-22, 70], [-20, 80], [-40, 83], [-62, 81], [-70, 70]],
    [[-180, -72], [180, -72], [180, -90], [-180, -90]],
  ];
  g.fillStyle = '#E4D6AE';
  dat.forEach((da) => { g.beginPath(); da.forEach((p, i) => { const [x, y] = px(p[0], p[1]); if (i) g.lineTo(x, y); else g.moveTo(x, y); }); g.closePath(); g.fill(); });
  g.strokeStyle = 'rgba(255,255,255,0.22)'; g.lineWidth = 1.5;
  for (let vd = -60; vd <= 60; vd += 30) { const y = px(0, vd)[1]; g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
  for (let kd = -150; kd <= 180; kd += 30) { const x = px(kd, 0)[0]; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, h); g.stroke(); }
  g.strokeStyle = 'rgba(255,255,255,0.5)'; g.lineWidth = 2.5; g.beginPath(); g.moveTo(0, h / 2); g.lineTo(w, h / 2); g.stroke();
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; return t;
}

let hinhThan, hinhDau;
function taoMuiTen(mau) {
  const nhom = new Group(), vl = new MeshBasicMaterial({ color: mau, transparent: true, depthTest: false });
  const than = new Mesh(hinhThan, vl), dau = new Mesh(hinhDau, vl);
  than.renderOrder = dau.renderOrder = 20;
  nhom.add(than, dau); nhom.userData = { than, dau };
  return nhom;
}
function datMuiTen(m, goc, vec, dai) {
  const dau = kep(dai * 0.34, 0.04, 0.2), than = Math.max(dai - dau, 0.002), r = kep(dai * 0.045, 0.008, 0.028);
  m.userData.than.scale.set(r, than, r); m.userData.than.position.y = than / 2;
  m.userData.dau.scale.set(r * 2.7, dau, r * 2.7); m.userData.dau.position.y = than + dau / 2;
  m.position.copy(goc); m.quaternion.setFromUnitVectors(TRUC_Y, v2.copy(vec).normalize());
}
function vongTron(r, mau, doMo, matPhang) {
  const d = [];
  for (let i = 0; i < 72; i++) { const a = i / 72 * TAU, c = r * Math.cos(a), s = r * Math.sin(a); d.push(matPhang === 'xz' ? new Vector3(c, 0, s) : new Vector3(0, c, s)); }
  return new LineLoop(new BufferGeometry().setFromPoints(d), new LineBasicMaterial({ color: mau, transparent: true, opacity: doMo }));
}

function datGocNhin(ten) {
  const [vt, dich] = GOC_NHIN[ten] || GOC_NHIN['ban-dau'];
  const giamChan = controls.enableDamping;
  controls.enableDamping = false; controls.update();   // xoá quán tính còn lại của lần kéo trước
  camera.position.set(vt[0], vt[1], vt[2]); controls.target.set(dich[0], dich[1], dich[2]); controls.update();
  controls.enableDamping = giamChan;
}

const mauTrenStage = (v) => { v1.copy(v).project(camera); return [(v1.x + 1) / 2 * W, (1 - v1.y) / 2 * H, v1.z < 1]; };
function tiaTu(ev) {
  const r = cvGL.getBoundingClientRect();
  ndc.set((ev.clientX - r.left) / r.width * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
  tia.setFromCamera(ndc, camera);
  return r;
}
/** Đặt điểm cam theo vị trí con trỏ. batBuoc: nếu tia trượt khỏi Trái Đất thì lấy điểm trên mép gần tia nhất. */
function datDiem(ev, batBuoc) {
  tiaTu(ev);
  const trung = tia.intersectObject(earth, false)[0];
  if (trung) v1.copy(trung.point).sub(tamTD).normalize();
  else if (batBuoc) { const o = tia.ray.origin, d = tia.ray.direction; v1.copy(o).addScaledVector(d, v2.copy(tamTD).sub(o).dot(d)).sub(tamTD).normalize(); }
  else return false;
  st3.huong = [v1.x, v1.y, v1.z]; yeuCau();
  return true;
}
function ganChuot() {
  let dangKeo = false, cham = null;
  cvGL.addEventListener('pointerdown', (ev) => {
    if (!ev.isPrimary || ev.button > 0) { cham = null; return; }
    const r = cvGL.getBoundingClientRect();
    v1.copy(diemCam.position).project(camera);
    const dx = r.left + (v1.x + 1) / 2 * r.width - ev.clientX, dy = r.top + (1 - v1.y) / 2 * r.height - ev.clientY;
    if (Math.hypot(dx, dy) <= 44) { dangKeo = true; controls.enabled = false; cvGL.setPointerCapture(ev.pointerId); cham = null; }
    else cham = { x: ev.clientX, y: ev.clientY, t: ev.timeStamp };
  });
  cvGL.addEventListener('pointermove', (ev) => { if (dangKeo && ev.isPrimary) datDiem(ev, true); });
  const thoi = (ev) => {
    if (dangKeo) { dangKeo = false; controls.enabled = true; }
    else if (cham && ev.type === 'pointerup' && Math.hypot(ev.clientX - cham.x, ev.clientY - cham.y) < 8 && ev.timeStamp - cham.t < 400) datDiem(ev, false);
    cham = null;
  };
  cvGL.addEventListener('pointerup', thoi);
  cvGL.addEventListener('pointercancel', thoi);
}

export default {
  id: 'mo-hinh-3d', lap: LAP3, giuCham: true, moTa: MO_TA_3, dieuKhien: DIEU_KHIEN_3D,

  /** Dựng cảnh three.js. Ném lỗi nếu không tạo được WebGL (main.js sẽ chuyển sang bản 2D). */
  khoiTao(sanKhau, mt) {
    const camUng = typeof matchMedia === 'function' && matchMedia('(pointer:coarse)').matches;
    renderer = new WebGLRenderer({ antialias: !camUng, preserveDrawingBuffer: false, powerPreference: 'default' });
    renderer.setPixelRatio(Math.min(mt.dpr, 1.5));
    renderer.setSize(W, H, false);
    cvGL = renderer.domElement;
    cvGL.style.cssText = `position:absolute;left:0;top:0;width:${W}px;height:${H}px;display:none;touch-action:none`;
    cvGL.setAttribute('aria-hidden', 'true');
    sanKhau.append(cvGL);

    scene = new Scene(); scene.background = new Color(0xF7FAFD);
    camera = new PerspectiveCamera(40, W / H, 0.1, 200);
    ganChuot();   // gắn trước OrbitControls để kéo điểm cam được ưu tiên
    controls = new OrbitControls(camera, cvGL);
    controls.enableDamping = !mt.giamChuyenDong; controls.minDistance = 3; controls.maxDistance = 14;
    controls.addEventListener('change', yeuCau);
    datGocNhin('ban-dau');

    scene.add(new AmbientLight(0xffffff, 0.85));
    const d1 = new DirectionalLight(0xffffff, 1.1); d1.position.set(4, 5, 6); scene.add(d1);
    const d2 = new DirectionalLight(0xffffff, 0.35); d2.position.set(-5, -2, -4); scene.add(d2);

    earthMat = new MeshPhongMaterial({ map: texTraiDat(), shininess: 12, transparent: true, opacity: 1 });
    earth = new Mesh(new SphereGeometry(1, 64, 48), earthMat); scene.add(earth);
    moon = new Mesh(new SphereGeometry(0.3, 32, 24), new MeshPhongMaterial({ color: 0xC3C8D0, shininess: 4 })); scene.add(moon);
    const cm = new Mesh(new SphereGeometry(0.06, 16, 12), new MeshBasicMaterial({ color: 0x0A2E5C, depthTest: false, transparent: true }));
    cm.position.copy(CM); cm.renderOrder = 15; scene.add(cm);   // CM gắn vào scene: đứng yên khi Trái Đất tịnh tiến
    diemCam = new Mesh(new SphereGeometry(0.075, 24, 18), new MeshBasicMaterial({ color: 0xF07800, depthTest: false, transparent: true }));
    diemCam.renderOrder = 21; scene.add(diemCam);

    hinhThan = new CylinderGeometry(1, 1, 1, 12); hinhDau = new ConeGeometry(1, 1, 18);
    this.mt = { fc: taoMuiTen(0x1B7A6E), fg: taoMuiTen(0xA93226), ft: taoMuiTen(0xE8A33D) };
    scene.add(this.mt.fc, this.mt.fg, this.mt.ft);

    // Nhóm quay theo hướng Mặt Trăng: trục Trái Đất – Mặt Trăng, vành 16 điểm mẫu, vành đai θ = 90°.
    nhomTruc = new Group(); scene.add(nhomTruc);
    const truc = new Line(new BufferGeometry().setFromPoints([new Vector3(-1.6, 0, 0), new Vector3(D_TRANG, 0, 0)]), new LineDashedMaterial({ color: 0x546E8F, dashSize: 0.16, gapSize: 0.1 }));
    truc.computeLineDistances(); nhomTruc.add(truc);
    nhomVanh = new Group(); nhomTruc.add(nhomVanh);
    const hinhCham = new SphereGeometry(0.035, 12, 10), vlCham = new MeshBasicMaterial({ color: 0x0A2E5C, depthTest: false, transparent: true });
    for (let i = 0; i < 16; i++) {
      const a = i / 16 * TAU, p = [Math.cos(a), Math.sin(a), 0], f = baLuc(p, [1, 0, 0]).ft, m = taoMuiTen(0xE8A33D);
      datMuiTen(m, v1.set(p[0], p[1], 0), new Vector3(f[0], f[1], f[2]), Math.max(doDai(f) * DAI * PHONG_DAI_FT, 0.05));
      const c = new Mesh(hinhCham, vlCham); c.position.set(p[0], p[1], 0); c.renderOrder = 20;
      nhomVanh.add(m, c);
    }
    nhomVanh.add(vongTron(1.012, 0xFFFFFF, 0.95, 'yz'));

    // Ba vòng tròn quỹ đạo bán kính 0,733 R (của điểm cam, tâm Trái Đất và cực Bắc) và hai chấm chạy trên đó.
    vetNhom = new Group(); scene.add(vetNhom);
    for (let i = 0; i < 3; i++) { const l = vongTron(K, 0xF07800, 0.8, 'xz'); vet.push(l); vetNhom.add(l); }
    for (let i = 0; i < 2; i++) { const c = new Mesh(hinhCham, new MeshBasicMaterial({ color: 0xF2C14E, depthTest: false, transparent: true })); c.renderOrder = 20; c.scale.setScalar(1.6); chamVet.push(c); vetNhom.add(c); }

  },
  vao() { cvGL.style.display = 'block'; },
  ra() { cvGL.style.display = 'none'; },
  doiCo(tiLe) { if (controls) { controls.rotateSpeed = kep(1 / tiLe, 0.5, 2); } },
  khiDoi(id, v) { if (!khiDoiChung(id, v) && id === 'c3-goc-nhin') datGocNhin(v); },
  huy() { if (controls) controls.dispose(); if (renderer) { renderer.dispose(); cvGL.remove(); } },

  ve(g, t) {
    const a = st3.hoatHoa ? TAU * t / LAP3 : 0;
    const u = [Math.cos(a), 0, -Math.sin(a)];                 // hướng Trái Đất → Mặt Trăng
    tamTD.set(K - K * u[0], 0, -K * u[2]);                     // tâm Trái Đất = CM − 0,733·u
    earth.position.copy(tamTD);
    moon.position.set(K + (D_TRANG - K) * u[0], 0, (D_TRANG - K) * u[2]);  // Mặt Trăng = CM + D·u: luôn đối diện qua CM
    nhomTruc.position.copy(tamTD); nhomTruc.rotation.y = a;
    nhomVanh.visible = st3.vanh;
    earthMat.opacity = st3.trong ? 0.42 : 1;

    const h = st3.huong, sd = soDoc(u), f = sd.luc;
    diemCam.position.set(tamTD.x + h[0], tamTD.y + h[1], tamTD.z + h[2]);
    const lech = Math.abs(h[1]) < 0.88 ? [0, 0.1, 0] : [0, 0, 0.1];
    const goc = { fc: [lech[0], lech[1], lech[2]], fg: [0, 0, 0], ft: [-lech[0], -lech[1], -lech[2]] };
    const dai = { fc: DAI, fg: doDai(f.fg) * DAI, ft: Math.max(doDai(f.ft) * DAI * PHONG_DAI_FT, 0.05) };
    const dinh = {};
    for (const k of ['fc', 'fg', 'ft']) {
      const m = this.mt[k]; m.visible = st3[k];
      const o = new Vector3(diemCam.position.x + goc[k][0], diemCam.position.y + goc[k][1], diemCam.position.z + goc[k][2]);
      const vec = new Vector3(f[k][0], f[k][1], f[k][2]);
      datMuiTen(m, o, vec, dai[k]);
      dinh[k] = o.addScaledVector(vec.normalize(), dai[k] + 0.12).add(v2.set(lech[0], lech[1], lech[2]).multiplyScalar(TACH_NHAN[k]));
    }
    vetNhom.visible = st3.hoatHoa;
    if (st3.hoatHoa) {
      const lechDiem = [h, [0, 0, 0], [0, 1, 0]];
      vet.forEach((l, i) => l.position.set(K + lechDiem[i][0], lechDiem[i][1], lechDiem[i][2]));  // tâm vòng = CM + độ lệch của điểm
      chamVet[0].position.copy(tamTD); chamVet[1].position.set(tamTD.x, 1, tamTD.z);
    }
    controls.update();
    renderer.render(scene, camera);

    // lớp chữ 2D phía trên
    g.clearRect(0, 0, W, H);
    const nhan = (s, v, o) => { const [x, y, truoc] = mauTrenStage(v); if (truoc) chu(g, s, x, y, o); };
    nhan('Trái Đất', v2.set(tamTD.x, 1.22, tamTD.z), { co: 30, dam: 700, mau: MAU.navy, vien: '#FFFFFF', can: 'center', goc: 'bottom', khoa: true });
    nhan('Mặt Trăng', v2.copy(moon.position).setY(0.42), { co: 30, dam: 700, mau: MAU.navy, vien: '#FFFFFF', can: 'center', goc: 'bottom', khoa: true });
    nhan('CM', v2.set(K, -0.16, 0), { co: 30, dam: 700, mau: '#FFFFFF', vien: MAU.navy, can: 'center', goc: 'top', khoa: true });
    if (st3.vanh) nhan('vành đai θ = 90°', v2.set(0, -1.1, 0).applyAxisAngle(TRUC_Y, a).add(tamTD), { co: 30, mau: MAU.slate, vien: '#FFFFFF', can: 'center', goc: 'top' });
    const mauChu = { fc: MAU.luc, fg: MAU.do, ft: MAU.ftChu }, ten = { fc: 'Fc', fg: 'Fg', ft: 'Ft' };
    for (const k of ['fc', 'fg', 'ft']) if (st3[k]) nhan(ten[k], dinh[k], { co: 30, dam: 700, mau: mauChu[k], vien: '#FFFFFF', can: 'center', goc: 'middle', khoa: true });
    veBang(g, sd);
    tieuDe(g, 'Mô hình 3D: ba lực tại một điểm', 'Kéo để xoay · chụm hoặc lăn để phóng · chạm Trái Đất để đặt điểm cam.');
    chanTrang(g, GHI_CHU_3);
  },
};
