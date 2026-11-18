// Ghép src/<slug>/ + noidung/<slug>.json + lib/ thành animations/<slug>/index.html (một file tự chứa).
// Dùng: node tools/build.mjs [slug…]      build các animation thật (mặc định: tất cả) và ghi manifest.json
//       node tools/build.mjs --test       thêm animation mẫu src/_mau vào dist-test/ để thử bộ khung
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const GOC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const NGUONG = { '2D': 500 * 1024, '3D': 1536 * 1024 };
const thamSo = process.argv.slice(2);
const kemMau = thamSo.includes('--test');
const chon = thamSo.filter((a) => !a.startsWith('--'));
const cauHinhGoc = (await import(pathToFileURL(path.join(GOC, 'config.js')).href)).default;

const timEntry = (thuMuc) => ['main.js', 'main.jsx'].map((f) => path.join(thuMuc, f)).find((f) => fs.existsSync(f));
const anToan = (s) => s.replace(/<\/(script|style)/gi, '<\\/$1').replace(/<!--/g, '<\\!--');
const html = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

async function buildMot(slug, thuMucRa, cauHinh = cauHinhGoc) {
  const thuMuc = path.join(GOC, 'src', slug);
  const entry = timEntry(thuMuc);
  if (!entry) throw new Error(`${slug}: thiếu src/${slug}/main.js hoặc main.jsx`);
  const tepND = path.join(GOC, 'noidung', slug + '.json');
  if (!fs.existsSync(tepND)) throw new Error(`${slug}: thiếu noidung/${slug}.json`);
  const nd = JSON.parse(fs.readFileSync(tepND, 'utf8'));
  if (nd.slug !== slug) throw new Error(`${slug}: trường slug trong noidung không khớp`);
  for (const c of nd.canh || []) { // bảng số tuỳ chọn: {cot:[chuỗi], dong:[[ô…]]}, mỗi dòng đủ số cột
    if (c.bang == null) continue;
    const { cot, dong } = c.bang;
    const oHopLe = (x) => typeof x === 'string' || typeof x === 'number';
    if (!Array.isArray(cot) || !cot.length || !cot.every(oHopLe)) throw new Error(`${slug}: cảnh ${c.id}: bang.cot phải là mảng chuỗi không rỗng`);
    if (!Array.isArray(dong) || !dong.every((d) => Array.isArray(d) && d.length === cot.length && d.every(oHopLe))) throw new Error(`${slug}: cảnh ${c.id}: mỗi dòng của bang.dong phải có đúng ${cot.length} ô (chuỗi hoặc số)`);
  }
  const kq = await build({
    stdin: {
      contents: `import ${JSON.stringify(path.join(GOC, 'lib/fonts/fonts.css'))};\nimport ${JSON.stringify(path.join(GOC, 'lib/khung.css'))};\nimport ${JSON.stringify(path.join(GOC, 'lib/khung.js'))};\nimport ${JSON.stringify(entry)};\n`,
      resolveDir: GOC, loader: 'js',
    },
    bundle: true, minify: true, format: 'iife', target: 'es2020',
    write: false, outdir: path.join(GOC, 'dist-test'), legalComments: 'none',
    loader: { '.woff2': 'dataurl', '.png': 'dataurl', '.jpg': 'dataurl', '.svg': 'dataurl', '.glsl': 'text' },
    jsx: 'automatic', define: { 'process.env.NODE_ENV': '"production"' }, logLevel: 'warning',
  });
  const js = kq.outputFiles.find((f) => f.path.endsWith('.js')).text;
  const css = (kq.outputFiles.find((f) => f.path.endsWith('.css')) || { text: '' }).text;
  const trang = `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#0A2E5C">
<title>${html(nd.ten)} — Kho học liệu số HMO</title>
<meta name="description" content="${html(nd.moTa || nd.ten)}">
<style>${anToan(css)}</style>
</head>
<body>
<noscript>Animation này cần JavaScript.</noscript>
<script>window.HMO_CONFIG=${anToan(JSON.stringify(cauHinh))};window.HMO_NOIDUNG=${anToan(JSON.stringify({ slug: nd.slug, ten: nd.ten, canh: nd.canh, cauHoi: nd.cauHoi, nguon: nd.nguon }))};</script>
<script>${anToan(js)}</script>
</body>
</html>
`;
  const ra = path.join(thuMucRa, slug);
  fs.mkdirSync(ra, { recursive: true });
  fs.writeFileSync(path.join(ra, 'index.html'), trang);
  const byte = Buffer.byteLength(trang);
  const loai = nd.loai === '3D' ? '3D' : '2D';
  const dat = byte <= NGUONG[loai];
  console.log(`${dat ? '✓' : '✗'} ${slug.padEnd(26)} ${loai} ${(byte / 1024).toFixed(0).padStart(5)} KB (ngưỡng ${NGUONG[loai] / 1024} KB)`);
  return { nd, byte, loai, dat };
}

const tatCa = fs.readdirSync(path.join(GOC, 'src'), { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith('_') && timEntry(path.join(GOC, 'src', d.name))).map((d) => d.name).sort();
const ds = chon.length ? chon : tatCa;
let loi = false;
const muc = [];
for (const slug of ds) {
  const { nd, byte, loai, dat } = await buildMot(slug, path.join(GOC, 'animations'));
  if (!dat) loi = true;
  muc.push({ slug, ten: nd.ten, hocPhan: nd.hocPhan || '', bai: nd.bai || '', moTa: nd.moTa || '', tags: nd.tags || [], loai,
    ngayCapNhat: nd.ngayCapNhat || '', phienBan: nd.phienBan || '1.0.0', dungLuong: byte, giayThumb: nd.giayThumb ?? 0, canhThumb: nd.canhThumb ?? 0 });
}
if (!chon.length) fs.writeFileSync(path.join(GOC, 'manifest.json'), JSON.stringify({ animations: muc }, null, 2) + '\n');
else if (fs.existsSync(path.join(GOC, 'manifest.json'))) { // build lẻ: cập nhật riêng các mục đó
  const m = JSON.parse(fs.readFileSync(path.join(GOC, 'manifest.json'), 'utf8'));
  for (const x of muc) { const i = m.animations.findIndex((a) => a.slug === x.slug); if (i >= 0) m.animations[i] = x; else m.animations.push(x); }
  m.animations.sort((a, b) => a.slug.localeCompare(b.slug));
  fs.writeFileSync(path.join(GOC, 'manifest.json'), JSON.stringify(m, null, 2) + '\n');
}
// Bản mẫu dùng URL sổ điểm giả để test gửi điểm bằng route của Playwright.
if (kemMau) await buildMot('_mau', path.join(GOC, 'dist-test'), { ...cauHinhGoc, soDiemUrl: 'https://so-diem.test/exec' });
if (loi) { console.error('Có animation vượt ngưỡng dung lượng.'); process.exit(1); }
