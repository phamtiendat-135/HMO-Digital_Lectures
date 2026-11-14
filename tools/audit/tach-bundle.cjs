// Tách bundle Claude Design thành file rời để đọc. Dùng: node tools/audit/tach-bundle.cjs <file.html> <thư mục ra>
const fs = require('fs'), path = require('path'), zlib = require('zlib');
const [, , file, ra] = process.argv;
if (!file || !ra) { console.error('Dùng: tach-bundle.cjs <file.html> <thư mục ra>'); process.exit(1); }
const s = fs.readFileSync(file, 'utf8');
const lay = (t) => { const m = s.match(new RegExp(`<script type="__bundler/${t}">\\s*([\\s\\S]*?)\\s*</script>`)); return m ? JSON.parse(m[1]) : null; };
const manifest = lay('manifest'), template = lay('template'), ext = lay('ext_resources') || [];
if (!manifest || !template) { console.error('Không phải bundle Claude Design'); process.exit(1); }
const tenExt = Object.fromEntries(ext.map((e) => [e.uuid, e.id]));
const duoi = { 'text/jsx': 'jsx', 'text/javascript': 'js', 'application/javascript': 'js', 'font/woff2': 'woff2', 'text/css': 'css' };
fs.mkdirSync(ra, { recursive: true });
fs.writeFileSync(path.join(ra, 'template.html'), template);
for (const [uuid, r] of Object.entries(manifest)) {
  let buf = Buffer.from(r.data, 'base64');
  if (r.compressed) buf = zlib.gunzipSync(buf);
  const ten = uuid.slice(0, 8) + '.' + (duoi[r.mime] || 'bin');
  fs.writeFileSync(path.join(ra, ten), buf);
  console.log(ten.padEnd(16), r.mime.padEnd(24), String(buf.length).padStart(8), tenExt[uuid] || '');
}
console.log('template.html', template.length);
