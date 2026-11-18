# luc-tao-trieu — Lực tạo triều: vì sao có hai múi triều

## 1. Định danh

| Mục | Giá trị |
|---|---|
| File gốc | `_nguon/Luc tao trieu - offline.html` |
| Học phần · Bài | để trống (TS. Đạt xếp sau) |
| Dung lượng | 1.141 KB (1.168.627 byte) + khoảng 1.200 KB tải từ mạng (three.js 0.160.0 chưa nén + OrbitControls) |
| Công nghệ | Bundle Claude Design: bộ trình chiếu `deck-stage` (web component, 136 KB) + `dc-runtime` (69 KB) + React 18.3.1 UMD (143 KB) + 6 web component Canvas 2D + 1 web component WebGL (three.js 0.160.0 qua importmap trỏ `unpkg.com`). **Không có Babel, không có JSX** (khác 3 bundle còn lại). 21 file woff2 họ Carlito (601 KB). |
| Sân khấu nguồn | 1920 × 1080 (16:9), 12 slide, có ghi chú diễn giả |
| Chạy offline | **Không.** Khi chặn mạng, 2 request bị chặn (`three.module.js`, `OrbitControls.js`) → slide 08 trống (`audit/screens/luc-tao-trieu/log.json`). Tên file ghi "offline" là sai. 11 slide còn lại chạy được. |
| Prompt gốc | Không có |

**Mục tiêu học tập**

1. Giải thích vì sao lực ly tâm Fc trong chuyển động quanh khối tâm chung có cùng độ lớn và cùng hướng tại mọi điểm trên Trái Đất.
2. Xác định hướng của lực tạo triều Ft tại điểm gần Mặt Trăng, điểm đối diện và điểm vuông góc, từ đó giải thích hai múi triều.
3. Tính được vị trí khối tâm chung (≈ 4.671 km) và tỉ số biên độ triều cường / triều kém (≈ 2,7) từ số liệu cho trước.

**Cấu trúc phát hành (đã chốt, mục 4.5 tài liệu thiết kế):** một animation 7 cảnh tự do.

| Cảnh | id | Slide nguồn | Thẻ | File mã (đã tách) | Dòng |
|---|---|---|---|---|---|
| 1 | `tinh-tien` | 06 Tịnh tiến quanh CM | `<tide-cm>` | `a097b37a.js` | 189 |
| 2 | `ly-tam` | 07 Vì sao có lực ly tâm | `<tide-centri>` | `58d7db5f.js` | 172 |
| 3 | `mo-hinh-3d` | 08 Mô hình 3D | `<tide-scene>` | `0562a5fe.js` (ES module, three.js) | 318 |
| 4 | `quy-dao` | 09 Mặt Trăng quay quanh Trái Đất | `<tide-orbit>` | `f16d4494.js` | 241 |
| 5 | `xich-vi` | 10 Xích vĩ và bán nhật triều | `<tide-declination>` | `09e7d090.js` | 309 |
| 6 | `nhin-ngang` | 11 Quỹ đạo nhìn ngang | `<tide-cross>` | `9e112d62.js` | 273 |
| 7 | `trieu-cuong-kem` | 12 Triều cường – triều kém | `<tide-spring>` | `7876a6db.js` | 302 |

Số dòng trong spec này tính theo các file đã tách bằng `tools/audit/tach-bundle.cjs` (tên file = 8 ký tự đầu của uuid) và `template.html`.

**Thumbnail:** cảnh 3 (`mo-hinh-3d`), giây 2, bật "Vành 16 điểm mẫu", camera mặc định. Ở máy CI không có WebGL thì chụp bản dự phòng 2D của cảnh 3.

## 2. Chấm điểm hiện trạng

| Tiêu chí | Điểm | Bằng chứng |
|---|---|---|
| Đúng khoa học | 3 | Lõi vật lý đúng: Fc song song, bằng nhau, ngược hướng Mặt Trăng (`58d7db5f.js:94,143`); Ft = Fg + Fc tính bằng vector thật (`0562a5fe.js:66–74`, `f16d4494.js:7–14`); 103,4% / 96,8% / 0,46 / 29,53 đúng. Nhưng có 10 lỗi ở mục 3, nặng nhất là hoạt hoạ 3D sai (K-01) và dùng "triều cường" cho nước lớn (K-03). |
| Sư phạm | 4 | Trình tự tốt: khối tâm → Fc → Fg → Ft → mô hình → chu kỳ ngày → xích vĩ → tháng. Ghi chú diễn giả nêu đúng chỗ sinh viên hay hiểu sai (template slide 03). Trừ điểm vì là bộ slide cho giảng viên, 5 slide đầu chỉ có chữ. |
| Hình ảnh | 2 | 16:9, không phải 4:3. Font Calibri/Carlito, không phải Be Vietnam Pro. Chữ trên canvas 22–26 px ở khung 1920 (`a097b37a.js:94,167`; `09e7d090.js:169,225`), dưới ngưỡng 30 px. Ở màn dọc 390 px slide chỉ cao khoảng 219 px, không đọc được (`doc-t5.jpg`). Màu brand HMO đúng. |
| Tương tác | 2 | Không có phát/dừng và tốc độ chung; mỗi mô hình một kiểu (ô đánh dấu "Chạy hoạt hoạ", nút "Tạm dừng", nút "×1"). Ô đánh dấu và thanh trượt 22–26 px (`0562a5fe.js:102`), dưới 44 px. Hướng dẫn 3D chỉ nói chuột: "Kéo trái · Lăn · Kéo phải" (`0562a5fe.js:110`). Chạm lên Trái Đất luôn bị bắt làm "đặt điểm cam" nên muốn xoay phải chạm ra ngoài quả cầu (`0562a5fe.js:276–279`). |
| Tự học | 2 | Có bảng chữ bên phải mỗi mô hình và 5 slide lý thuyết, nhưng phần dẫn dắt nằm trong ghi chú diễn giả mà sinh viên không thấy. Không có câu hỏi tự kiểm tra. |
| Hiệu năng | 2 | 1,17 MB + khoảng 1,2 MB tải mạng. 601 KB là font, trong đó 15/21 file là Cyrillic/Hy Lạp/Latin mở rộng không dùng tới. `preserveDrawingBuffer: true` và DPR tới 2 (`0562a5fe.js:142–143`) nặng cho điện thoại. fps chưa đo (kiểm tay ở G2). |
| Khả năng truy cập | 2 | Không xử lý `prefers-reduced-motion`. Màu vàng Ft `#E8A33D` trên nền `#F7FAFD` có tương phản khoảng 2,1:1 (dưới 4,5:1). Ô đánh dấu và thanh trượt dùng được bằng bàn phím; canvas không có `aria-label`. |
| Chất lượng mã | 2 | 7 vòng `requestAnimationFrame` riêng, 3 kiểu đồng hồ (`performance.now()` trực tiếp ở `0562a5fe.js:308` và `7876a6db.js:208`; tích luỹ `dt` ở các file còn lại). Hằng số lặp và lệch nhau giữa các file (4700 và 4671; `rC = 0.733R` và `0.72R`; ngày triều 24 h 50 và 24 h 49). Có 2 lỗi console khi offline. |

**Điểm trung bình: 2,4**

## 3. Lỗi khoa học

Các phép tính đối chiếu (python, G = 6,674×10⁻¹¹; M_TĐ = 5,972×10²⁴ kg; M_MT = 7,342×10²² kg; a = 384.400 km; R = 6.371 km):

| Đại lượng | Tính lại | Trong nguồn | Kết luận |
|---|---|---|---|
| Khối tâm cách tâm Trái Đất | 384.400 × 7,342e22 / (5,972e24 + 7,342e22) = 4.668 km (4.671 km nếu dùng tỉ số khối lượng 81,30) | 4.700 (slide 02, mã 3D) và 4.671 (cảnh 1, 2) | lệch nhau, xem K-06 |
| Độ sâu khối tâm dưới mặt đất | 6.371 − 4.671 = 1.700 km | không ghi | nên thêm vào Giải thích |
| Fg điểm gần / tâm | (384.400/378.029)² = 103,40% | 103,4% | đúng |
| Fg điểm xa / tâm | (384.400/390.771)² = 96,77% | 96,8% | đúng |
| Chênh gần – xa | 6,63 điểm % (so với giá trị tại tâm) | "lớn hơn điểm xa 6,6%" | đúng nếu hiểu là điểm %; so với chính điểm xa là 6,85% |
| Ft điểm gần / Fc | 3,40% | 3,4% (slide 05); chữ tĩnh ban đầu "3,38%" (`0562a5fe.js:118`) bị ghi đè thành 3,40% khi chạy | đúng; sửa chữ tĩnh |
| Ft điểm xa / Fc | 3,23% | không ghi | — |
| Ft tại 90° / Fc | 1,66%, hướng vào tâm | "Hướng vào tâm" | đúng |
| Gia tốc tạo triều tại điểm gần | 2GM·R/a³ = 1,10×10⁻⁶ m/s² ≈ 1,1×10⁻⁷ g | không ghi | nên thêm |
| Fc = GM/a² | 3,32×10⁻⁵ m/s²; ω²·d = (2π/27,32 ngày)² × 4.671 km = 3,31×10⁻⁵ m/s² | hai công thức ở slide 03 và cảnh 2 | nhất quán (lệch 0,3%) |
| Tỉ số Mặt Trời / Mặt Trăng | (1,989e30/7,342e22) × (3,844e8/1,496e11)³ = 0,460 | 0,46 | đúng |
| Ngày triều (ngày Mặt Trăng) | 1/(1/23,9345 − 1/655,72) = 24,841 h = 24 h 50 ph | 24 h 50 (cảnh 4), 24 h 49 (cảnh 5, 6) | xem K-02 |
| Chu kỳ triều cường – triều kém | 29,53/2 = 14,77 ngày | 29,53 (đúng); 14,77 không ghi | nên thêm |
| Tỉ số biên độ triều cường / triều kém | (1 + 0,46)/(1 − 0,46) = 2,70 | 1,46 và 0,54 | đúng |

**Kiểm tra đặc biệt theo yêu cầu:** (a) Fc song song, bằng nhau, không toả ra từ khối tâm — **đạt** ở slide 03, cảnh 1, 2, 3. (b) Hướng và độ lớn tương đối của Ft tại gần/xa/90° — **đạt**. (c) Chiều quay — **không nhất quán**, xem K-05.

**Danh sách lỗi**

- **K-01 — Hoạt hoạ "tịnh tiến quanh CM" trong mô hình 3D sai ba chỗ** (`0562a5fe.js`).
  (i) Dòng 170–173: chấm CM là con của `earthGroup`, nên khi bật hoạt hoạ CM chạy theo Trái Đất; đúng ra CM đứng yên.
  (ii) Dòng 309: tâm Trái Đất đặt tại `CM_SCENE·(cos a − 1, sin a)`, tức quay quanh điểm (−0,74; 0) chứ không quanh CM ở (+0,74; 0); Mặt Trăng (dòng 163) đứng yên trong khi đúng ra phải luôn ở phía đối diện qua CM.
  (iii) Dòng 190–198: ba vòng tròn quỹ đạo vẽ tâm tại vị trí ban đầu của điểm, trong khi điểm thật chạy trên vòng tròn có tâm lệch đi `CM_SCENE` = 0,74 bán kính Trái Đất (≈ 4.700 km) về bên trái.
  Cảnh 1 (`a097b37a.js:92,124–134`) làm đúng cả ba điều này.
- **K-02 — Ngày triều mô phỏng ra 24 h 55 ph, chữ ghi 24 h 50 ph.** `f16d4494.js:4` đặt `T_EARTH = 24` (ngày Mặt Trời) cho góc quay Trái Đất trong hệ quán tính; cùng `T_MOON = 27,32 × 24` cho ra chu kỳ 1/(1/24 − 1/655,68) = 24,912 h = **24 h 55 ph**, hai lần nước lớn cách nhau 12 h 27 ph. Chữ ở dòng 75 ghi "24 h 50 ph … 12 h 25 ph". Đúng: dùng ngày sao 23,934 h → 24,841 h = 24 h 50 ph, nửa chu kỳ 12 h 25 ph. Ngoài ra `09e7d090.js:4,58` và `9e112d62.js:4` ghi "24 h 49 ph"; thống nhất thành 24 h 50 ph.
- **K-03 — Dùng "triều cường" để chỉ nước lớn trong ngày.** `f16d4494.js:68,187` ("Triều cường (Ft ra ngoài)"), dòng 75 ("hai lần triều cường cách nhau 12 h 25 ph"), ghi chú slide 05. "Triều cường" là kỳ triều lớn nửa tháng một lần (cảnh 7 dùng đúng nghĩa này), nên sinh viên sẽ lẫn hai khái niệm. Đề xuất: "nước lớn" / "nước ròng" cho cảnh 4 (xin TS. Đạt xác nhận thuật ngữ, mục Câu hỏi).
- **K-04 — Bao hình triều ở cảnh 6 chĩa lên cực.** `9e112d62.js:156` xoay ellip theo `atan2` của hình chiếu Mặt Trăng trên màn hình. Khi ψ = 90° và i = 25°, hình chiếu là (0; sin 25°) nên ellip xoay **90°**, tức múi triều nằm trên hai cực; đúng ra góc nghiêng không bao giờ vượt quá xích vĩ δ = 25°, và lúc đó trục dài hướng ra phía người xem (ellip gần tròn). Sửa: nghiêng ellip theo δ(ψ) và co trục dài theo |cos ψ| của thành phần nằm trong mặt phẳng màn hình.
- **K-05 — Chiều quay ngược và mũi tên quỹ đạo ngược chiều chuyển động.**
  Cảnh 4 (`f16d4494.js:128,157`): ghi "Nhìn từ trên xuống mặt phẳng quỹ đạo" nhưng Mặt Trăng và điểm P chạy **cùng chiều kim đồng hồ** (trục y của canvas hướng xuống). Nhìn từ phía bắc phải là ngược chiều kim đồng hồ, như cảnh 1 (`a097b37a.js:92` có dấu trừ).
  Cảnh 7 (`7876a6db.js:128–129`): Mặt Trăng chạy cùng chiều kim đồng hồ (sóc → thượng huyền ở phía trên → vọng), trong khi mũi tên chỉ chiều quỹ đạo (dòng 153–155) lại chỉ ngược chiều kim đồng hồ, **ngược với chính chuyển động đang vẽ**.
  Sửa: mọi cảnh nhìn từ cực Bắc, ngược chiều kim đồng hồ.
- **K-06 — Hai giá trị cho khoảng cách khối tâm.** Slide 02 và ghi chú ("4.700 km"), mã 3D `0562a5fe.js:8` (`4700 / 6371`) so với cảnh 1, 2 ("4 671 km", `a097b37a.js:54`, `58d7db5f.js:36,155`). Thống nhất **4.671 km**, và viết dấu phân cách nghìn kiểu Việt Nam "4.671" (nguồn đang viết "4 671").
- **K-07 — Bộ đếm ngày vượt chu kỳ.** `09e7d090.js:296`: `t/24 % 27.32 + 1` hiển thị tới "28,3 / 27,3". Sửa: bỏ `+ 1` (chạy 0,0 → 27,3).
- **K-08 — Nhãn chế độ triều cố định trong khi δ thay đổi.** `09e7d090.js:71–74` ghi "A — 62° B (nhật triều)". Với triều cân bằng η ∝ ½·sin 2φ·sin 2δ·cos H + ½·cos²φ·cos²δ·cos 2H, chỉ còn một đỉnh mỗi ngày khi sin 2φ·sin 2δ ≥ 4·cos²φ·cos²δ. Tại φ = 62°, δ = 25°: 0,635 so với 4 × 0,181 = 0,724 → vẫn **hai đỉnh** (hỗn hợp thiên về nhật triều); chỉ đạt nhật triều khi δ ≥ 28°. Khi bật "Mặt Trăng di chuyển", δ đi qua 0° và cả 4 điểm đều thành bán nhật triều đều. Sửa: nhãn ghi "thiên về nhật triều khi δ lớn" hoặc tính nhãn theo δ hiện thời.
- **K-09 — Đường "biên độ triều" ở cảnh 7 không phải biên độ.** `7876a6db.js:224,254` dùng `AL + AS·cos 2Δ`, là độ cao triều tại điểm dưới Mặt Trăng. Biên độ bán nhật triều tổng hợp là √(AL² + AS² + 2·AL·AS·cos 2Δ). Hai công thức trùng nhau tại sóc/vọng (1,46) và thượng/hạ huyền (0,54), nhưng tại Δ = 45° (ngày 3,7) mã cho **1,00** còn đúng là √(1 + 0,46²) = **1,10**. Ngoài ra dòng 230 gọi đại lượng này là "vector lực … FS = AS·cos(2Δ)". Sửa công thức đường cong và đổi nhãn thành "biên độ triều tương đối".
- **K-10 — Nhãn trục "Ft hướng tâm" sai nghĩa.** `f16d4494.js:62,220`: đại lượng vẽ là thành phần Ft theo phương bán kính, **dương khi hướng ra xa tâm**. Sửa nhãn: "Thành phần Ft theo phương thẳng đứng (dương = hướng lên)".

Ghi chú nhỏ (xếp loại Nhãn-số-chữ, không tính là lỗi khoa học): `58d7db5f.js:41` viết "Fc = ω²·d" không định nghĩa d; `58d7db5f.js:93` dùng `rC = 0.72R` thay vì 0,733R; `9e112d62.js:47–48` gọi i là "độ nghiêng quỹ đạo" (dễ lẫn với 5,1° so với hoàng đạo) và cho kéo về 0° trong khi thực tế i so với xích đạo nằm trong 18,3°–28,6°; ghi chú slide 11 nhắc "slide 7" thay vì slide 9; chữ viết tắt tiếng Anh "TM/AM" (`09e7d090.js:177–179,229`).

## 4. Danh sách thay đổi

| ID | Loại | Vị trí | Mô tả | Tiêu chí nghiệm thu |
|---|---|---|---|---|
| S-01 | Hiệu năng | toàn bộ | Bỏ `deck-stage`, `dc-runtime`, React. Chuyển 7 web component thành 7 mô-đun cảnh trong `src/luc-tao-trieu/` (`canh1-tinh-tien.js` … `canh7-trieu-cuong-kem.js`), không shadow DOM. | Bản build không chứa chuỗi `deck-stage`, `dc-runtime`, `react`. |
| S-02 | Tương tác | toàn bộ | Ghép khung chung: `HMO.dangKy({canh, thoiLuong, ve(t), datNhan, khoiTao, huy})` với 7 cảnh tự do `{id, lap}` (bảng dưới). Bỏ mọi `requestAnimationFrame`, `performance.now()`, nút Tạm dừng, nút tốc độ, ô "Chạy hoạt hoạ" riêng. | `grep -c "requestAnimationFrame\|performance.now" src/luc-tao-trieu/` = 0. Test mục 3 (dừng → khung hình đứng yên) đạt ở cả 7 cảnh. |
| S-03 | Tương tác | 6 cảnh có điều khiển riêng | Trạng thái tương tác nằm ngoài `t`: ô bật/tắt, thanh trượt (δmax, i, thời điểm, ngày), điểm cam và camera 3D. Mỗi thay đổi gọi `HMO.yeuCauVe()`. Điều khiển hiển thị trong khung HTML (không vẽ trên sân khấu), mỗi mục cao ≥ 44 px. **Cần bổ sung hợp đồng khung** để cảnh khai báo điều khiển, xem "Phụ thuộc" bên dưới. | Ở 390 × 844, mọi ô bật/tắt và thanh trượt của cảnh có vùng chạm ≥ 44 × 44 px (đo bằng `getBoundingClientRect`). |
| S-04 | Khoa học | cảnh 3, `0562a5fe.js:163–198,307–310` | Sửa K-01: CM cố định trong `scene`; tâm Trái Đất = CM − 0,733·R·û(a); Mặt Trăng = CM + D·û(a) (luôn đối diện); vòng tròn quỹ đạo của điểm P có tâm = P₀ − (tâm Trái Đất₀ − CM) bán kính 0,733 R. Lực tính với vị trí Mặt Trăng hiện thời. | Ở 4 thời điểm t = 0, lap/4, lap/2, 3lap/4: toạ độ CM không đổi; góc (Trái Đất – CM – Mặt Trăng) = 180° ± 1°; ba điểm mẫu nằm trên vòng tròn vẽ sẵn (sai ≤ 2 px). |
| S-05 | Khoa học | cảnh 4, `f16d4494.js:4,75`; cảnh 5, 6 | Sửa K-02: `T_SAO = 23,934 h` cho góc quay Trái Đất ở cảnh 4; ngày triều thống nhất "24 h 50 ph" ở cả ba cảnh (`T_TRIEU = 24,84`). | Đo trên đường cong cảnh 4: khoảng cách hai đỉnh liên tiếp = 12 h 25 ph ± 2 ph. Chuỗi "24 h 49" không còn trong mã. |
| S-06 | Nhãn-số-chữ | cảnh 4, `f16d4494.js:68,75,187` | Sửa K-03: "Nước lớn (Ft hướng lên)" / "Nước ròng (Ft hướng xuống)"; "hai lần nước lớn cách nhau 12 h 25 ph". Chờ TS. Đạt xác nhận thuật ngữ. | Trong cảnh 1–6 không còn chuỗi "triều cường"; cảnh 7 vẫn dùng. |
| S-07 | Khoa học | cảnh 6, `9e112d62.js:154–162` | Sửa K-04: ellip nghiêng theo δ(ψ) (không theo `atan2` hình chiếu), trục dài = R·(1,03 + 0,31·k) với k = độ dài hình chiếu của vector đơn vị hướng Mặt Trăng lên mặt phẳng màn hình = √(cos²ψ + sin²i·sin²ψ); khi Mặt Trăng ở chính trước/sau thì ellip gần tròn. | Tại ψ = 90°, i = 25°: góc nghiêng ellip ≤ 25° và tỉ số trục dài/ngắn ≤ 1,13 (k = 0,42). Tại ψ = 0°: nghiêng 0°, tỉ số 1,30 ± 0,02. |
| S-08 | Khoa học | cảnh 4 `f16d4494.js:128,157`; cảnh 7 `7876a6db.js:128–129,153–155,208–213` | Sửa K-05: mọi cảnh nhìn từ cực Bắc, quay ngược chiều kim đồng hồ; mũi tên quỹ đạo cùng chiều chuyển động; mũi tên tự quay Trái Đất lấy góc từ `t` (không từ `performance.now()`). Ghi chú trên hình: "Nhìn từ cực Bắc". | Ở cảnh 4 và 7, so hai khung hình cách nhau 1 s: góc cực của Mặt Trăng (trục y hướng lên) tăng. Ở cảnh 7, thượng huyền nằm phía dưới khi Mặt Trời ở bên trái. |
| S-09 | Nhãn-số-chữ | slide 02 (chuyển vào Giải thích), `0562a5fe.js:8`, `a097b37a.js:54`, `58d7db5f.js:36,155` | Sửa K-06: một hằng số `CM_KM = 4671` dùng chung; hiển thị "4.671 km". `58d7db5f.js:93` dùng 4671/6371. | `grep -c "4700\|4 671\|4\.700" src/ noidung/` = 0. |
| S-10 | Nhãn-số-chữ | cảnh 5, `09e7d090.js:296` | Sửa K-07: ngày trong chu kỳ chạy 0,0 → 27,3. | Giá trị hiển thị lớn nhất trong một chu kỳ ≤ 27,3. |
| S-11 | Khoa học | cảnh 5, `09e7d090.js:71–74` | Sửa K-08: nhãn điểm tính theo δ hiện thời bằng tiêu chí ở K-08 (bán nhật đều khi tỉ số nhật/bán nhật < 0,25; hỗn hợp 0,25–4; nhật triều ≥ 4). | δ = 0°: cả 4 điểm ghi "bán nhật triều đều". δ = 25°: A ghi "hỗn hợp, thiên về nhật triều". δ = 28°: A ghi "nhật triều". |
| S-12 | Khoa học | cảnh 7, `7876a6db.js:224,230,241–243,254,269` | Sửa K-09: đường cong và số Ft dùng √(1 + 0,46² + 2·0,46·cos 2Δ); đổi nhãn "Vector lực tại điểm dưới Mặt Trăng" thành "Biên độ triều tương đối"; nhãn FL, FS, Ft thành "Mặt Trăng 1,00", "Mặt Trời 0,46", "Tổng". | Ngày 0: 1,46. Ngày 7,38: 0,54. Ngày 3,69: 1,10 (± 0,01). |
| S-13 | Nhãn-số-chữ | cảnh 4, `f16d4494.js:62,220` | Sửa K-10: nhãn trục "Ft theo phương thẳng đứng (dương = hướng lên)". | Chuỗi "Ft hướng tâm" không còn. |
| S-14 | Nhãn-số-chữ | cảnh 2 `58d7db5f.js:41`; cảnh 6 `9e112d62.js:47–48`; cảnh 5 `09e7d090.js:177–179,229` | "Fc = ω²·d, với d = 4.671 km"; "Độ nghiêng quỹ đạo Mặt Trăng so với xích đạo i" và thanh trượt 18–28° (mặc định 25°); thay "TM/AM" bằng "phía Mặt Trăng" / "phía đối diện". | Thanh trượt i có `min=18`. Không còn "TM", "AM" trên hình. |
| S-15 | Hình ảnh | 7 cảnh | Chuyển từ 1920 × 1080 sang sân khấu 1440 × 1080: bỏ thanh tiêu đề, logo, chân trang của slide (khung chung đã có); bỏ cột bảng bên phải (330–520 px) — chữ chuyển xuống khung Giải thích, điều khiển chuyển sang khung HTML (S-03). Từng cảnh: **1, 2, 3, 4** hình chiếm trọn 1440 × 1080 (dựng lại toạ độ theo W, H; mã đã tính theo tỉ lệ `W*0.44`, `H*0.5` nên chỉ cần đổi hệ số); **4** đường cong Ft đặt thành dải 1440 × 300 phía dưới hình; **5** quả cầu trên (1440 × 600), 4 đường cong dưới (1440 × 480); **6** hình trên, đồ thị δ theo tháng thành dải dưới 1440 × 260; **7** giữ bố cục, đường biên độ đã ở dưới. | Ảnh chụp 1440 × 1080 từng cảnh: không có phần tử bị cắt mép; không còn cột chữ bên phải. |
| S-16 | Hình ảnh | 7 cảnh | Font "Be Vietnam Pro"; cỡ chữ trên sân khấu: nhãn ≥ 30 px, chú thích ≥ 36 px, ghi chú tỉ lệ/nguồn ≥ 22 px. Mỗi chú thích ≤ 20 từ. Đổi màu chữ/nhãn Ft từ `#E8A33D` sang `#B07A1C` (đã dùng ở `0562a5fe.js:118`) trên nền sáng; mũi tên giữ vàng. | Mọi `font` trong mã ≥ 30 px trừ dòng ghi chú (≥ 22 px). Tương phản chữ ≥ 4,5:1. |
| S-17 | Hình ảnh | 7 cảnh | `datNhan('toi-gian')`: ẩn ghi chú tỉ lệ, số 1–8, nhãn "mặt phẳng xích đạo", nhãn trục đồ thị; giữ tên thiên thể và ký hiệu A, B, C, P, CM. `datNhan('tat')`: chỉ hình. | Ở 390 × 844 số nhãn chữ trên sân khấu mỗi cảnh ≤ 6. |
| S-18 | Hiệu năng | cảnh 3 | Bỏ importmap unpkg; `import` three.js từ `node_modules` (ghim `three@0.160.0` trong `package.json`, cùng bản nguồn đang dùng), chỉ nhập các lớp dùng tới để esbuild lược bỏ phần thừa; OrbitControls nhập từ `three/addons`. | Test mục 1: 0 request ra ngoài. Cảnh 3 hiện Trái Đất khi chặn mạng. |
| S-19 | Hiệu năng | font | Bỏ 21 file Carlito và 2 thẻ `preconnect` Google Fonts. Dùng Be Vietnam Pro 400/600/700 cắt còn Latin + tiếng Việt do khung chung cung cấp. | Bản build không chứa "Carlito", "fonts.googleapis", "fonts.gstatic". |
| S-20 | Hiệu năng | cảnh 3, `0562a5fe.js:142–143,159,162` | `preserveDrawingBuffer: false`; DPR ≤ 1,5 (laptop) và 1,0 (thiết bị cảm ứng); Trái Đất 64 × 48 đoạn, Mặt Trăng 32 × 24; texture Trái Đất 1024 × 512. Chỉ vẽ lại khi `ve(t)` được gọi. | `renderer.info.render.triangles` ≤ 20.000. `renderer.getPixelRatio()` ≤ 1,5. |
| S-21 | Tương tác | cảnh 3, `0562a5fe.js:110,264–283` | Chạm: 1 ngón kéo ngoài điểm cam = xoay; 2 ngón = phóng/dịch; chỉ khi chạm trong bán kính 44 px quanh điểm cam mới là kéo điểm; chạm nhanh (không kéo) lên Trái Đất = đặt điểm. Sửa câu hướng dẫn cho cả chuột và chạm. Vuốt đổi cảnh của khung bị tắt trong vùng canvas 3D (dùng nút "Cảnh sau"). | Trên giả lập cảm ứng: kéo 1 ngón từ tâm Trái Đất sang phải 200 px → camera xoay, θ của điểm cam không đổi. |
| S-22 | Truy cập | 7 cảnh | `prefers-reduced-motion`: cảnh mở ra ở trạng thái dừng, người xem tự bấm phát. Canvas có `aria-label` mô tả cảnh. | Bật giả lập reduced-motion: hai ảnh cách 1 s giống nhau khi chưa bấm phát. |
| S-23 | Tương tác | cảnh 3 | Dự phòng WebGL2: `src/luc-tao-trieu/2d.js` cùng hợp đồng, xem mục 6. | Chạy với `--disable-gpu` hoặc chặn `webgl2`: cảnh 3 hiện hình 2D và dòng thông báo; 0 lỗi console. |
| S-24 | Sư phạm | slide 01–05 | Không dựng thành cảnh. Nội dung chuyển vào Giải thích cảnh 1–3 (mục 7). Biểu đồ thanh 103,4 / 100 / 96,8% của slide 04 giữ lại dạng bảng nhỏ trong Giải thích cảnh 3. | `noidung/luc-tao-trieu.json` có 7 đoạn giải thích; đoạn cảnh 1–3 chứa các số 384.400, 4.671, 103,4%, 96,8%, 3,4%. |
| S-25 | Nhãn-số-chữ | toàn bộ | Dòng nguồn trên sân khấu (≥ 22 px) sau khi TS. Đạt cấp nguồn (mục `[CẦN NGUỒN]`). Ghi chú tỉ lệ từng cảnh: "Không theo tỉ lệ: khoảng cách Trái Đất – Mặt Trăng thu ngắn; vector Ft phóng đại 26 lần". | Mỗi cảnh có đúng 1 dòng ghi chú tỉ lệ. |
| S-26 | Hiệu năng | build | Dung lượng sau build ≤ 1,5 MB. Ước lượng: three.js đã lược ≈ 500–650 KB; mã 7 cảnh + 2d.js ≈ 60 KB; khung + sổ điểm ≈ 50 KB; font 3 độ đậm đã cắt, base64 ≈ 100–130 KB; nội dung ≈ 10 KB → **≈ 0,75–0,9 MB**. | `wc -c animations/luc-tao-trieu/index.html` ≤ 1.500.000. |

**Ánh xạ sang hợp đồng cảnh tự do**

| Cảnh | `lap` (giây ở 1×) | `ve(t)` tính gì từ t | Trạng thái ngoài t |
|---|---|---|---|
| 1 `tinh-tien` | 7 | góc = 2π·t/7 | 3 ô bật/tắt (8 thời điểm, đường tròn, Mặt Trăng); thanh "Thời điểm" 0–360° (kéo thì khung chuyển sang dừng) |
| 2 `ly-tam` | 9 | góc = 2π·t/9 + 35° | 2 ô bật/tắt (đường tròn, vector Fc); thanh góc |
| 3 `mo-hinh-3d` | 8 (nguồn 2,6 s, quá nhanh) | góc tịnh tiến = 2π·t/8 khi bật hoạt hoạ | hướng điểm cam; camera; 6 ô bật/tắt |
| 4 `quy-dao` | 327,84 (một tháng sao, 1 s = 2 h) | α = 2π·(2t)/655,68; β = 2π·(2t)/23,934 | ô "Bao hình triều" |
| 5 `xich-vi` | 327,84 (1 s = 2 h) hoặc 16,39 khi chọn nhịp "theo tháng" (1 s = 40 h) | giờ mô phỏng = t × nhịp | δmax 0–28°; ô "Mặt Trăng di chuyển"; nhịp ngày/tháng |
| 6 `nhin-ngang` | 16,39 (1 s = 40 h) | ψ = 2π·t/16,39 | i 18–28°; 2 ô bật/tắt |
| 7 `trieu-cuong-kem` | 16 (một tuần trăng) | ngày = 29,53·t/16 | 3 ô bật/tắt; thanh "Ngày" |

Thanh trượt "thời điểm/ngày" của cảnh 1, 2, 7 là tua trong chu kỳ: thực hiện bằng `HMO.tua(t)` nếu khung có, nếu không thì giữ làm độ lệch pha ngoài `t`. Ở cảnh 4 và 5, P không trở lại đúng chỗ sau một `lap` (27,32 vòng quay không nguyên) nên có một bước nhảy nhỏ mỗi 5,5 phút; chấp nhận.

**Phụ thuộc vào khung chung (báo cho người viết `lib/khung.js`):** hợp đồng ở mục 5 tài liệu thiết kế chưa có chỗ cho cảnh khai báo điều khiển riêng. Animation này có 20 ô bật/tắt và 6 thanh trượt, không thể vẽ trên sân khấu vì ở màn dọc chúng co còn 27%. Đề xuất thêm vào mỗi cảnh trường `dieuKhien: [{id, loai: 'bat-tat' | 'truot' | 'chon', nhan, macDinh, min, max, buoc}]`; khung dựng chúng trong khung HTML và gọi `khiDoi(id, giaTri)` của animation.

## 5. Phân tầng

- **Q1** (chỉ chữ, số, màu?): Không. Phải gỡ bộ trình chiếu, sửa logic hoạt hoạ 3D, đổi chiều quay, đổi bố cục.
- **Q2** (cấu trúc 3D thiết yếu?): Có, cho cảnh 3. "Hai bướu triều trong hệ Trái Đất – Mặt Trăng" là ví dụ đủ điều kiện nêu trong đề bài. Điều kiện (a): mô hình hiện có ≈ 21.500 tam giác (Trái Đất 96 × 64 = 12.096; Mặt Trăng 2.976; 19 mũi tên × 84; 16 chấm × 216; CM và điểm cam ≈ 1.400), dưới trần 80.000; sau S-20 còn < 20.000. Vật liệu Phong, 3 đèn, không bóng đổ: nhẹ với Mali-G52 ở DPR 1,0; fps kiểm tay ở G2. Điều kiện (b): đây là suất 3D thứ nhất trong trần 2/8.
- **Kết luận: T3 (Fable 5.2), khối lượng L (> 4 giờ).** Là nâng cấp bản three.js sẵn có, không dựng 3D từ đầu; nhưng khối lượng lớn vì 7 cảnh, 10 lỗi khoa học, đổi 16:9 sang 4:3 và thêm bản dự phòng 2D. Sáu cảnh 2D đi cùng file nên cũng do tầng T3 làm (quy tắc một file một chủ).

**Trả lời câu hỏi G1 — "3D làm sinh viên hiểu điều gì mà 2D không làm được?"**
Mọi hình 2D trong sách chỉ vẽ một lát cắt qua trục Trái Đất – Mặt Trăng, nên sinh viên dễ nghĩ hai múi triều là hai "cục" nằm trên một đường tròn. Ở mô hình 3D, sinh viên kéo điểm cam ra khỏi lát cắt đó và thấy: (1) Ft chỉ phụ thuộc góc θ với hướng Mặt Trăng, nên vùng Ft hướng vào tâm là **cả một vành đai** quanh Trái Đất chứ không phải hai điểm trên–dưới, còn hai múi triều là hai chỏm đối xứng quanh trục; (2) Fc giữ nguyên hướng và độ dài dù điểm ở đâu trên mặt cầu, trong khi Fg đổi hướng theo cả ba chiều. Hai ý này không thể tự khám phá trên hình phẳng. Sáu cảnh còn lại là 2D và để 2D mới rõ.

## 6. Kịch bản 3D (cảnh 3 `mo-hinh-3d`)

**Thư viện:** `three@0.160.0` ghim cứng trong `package.json`, nhập cục bộ, gộp bằng `tools/build.mjs`; chỉ nhập các lớp dùng tới (Scene, PerspectiveCamera, WebGLRenderer, SphereGeometry, CylinderGeometry, ConeGeometry, BufferGeometry, Mesh, Line, LineLoop, Group, Sprite, các Material, CanvasTexture, Raycaster, Vector2/3, đèn) và `OrbitControls`.

**Đối tượng**

| Đối tượng | Hình học | Tam giác | Ghi chú |
|---|---|---|---|
| Trái Đất | cầu 64 × 48, texture canvas 1024 × 512 tự vẽ (lục địa giản lược, lưới kinh vĩ 30°) | 6.016 | bật/tắt bán trong suốt (0,42) |
| Mặt Trăng | cầu 32 × 24, bán kính 0,3 | 1.472 | đặt cách 4,9 R (thực tế 60,3 R; ghi "không theo tỉ lệ") |
| CM | cầu 16 × 12, `depthTest` tắt, **gắn vào scene** (S-04) | 352 | nhãn "CM – khối tâm chung" |
| Điểm cam | cầu 24 × 18 | 816 | kéo được |
| 3 vector tại điểm cam | trụ 12 cạnh + nón 18 cạnh | 3 × 84 | Fc (lục `#1B7A6E`), Fg (đỏ `#A93226`), Ft (vàng, phóng đại 26 lần) |
| Vành 16 điểm mẫu | 16 × (vector Ft + chấm cầu 12 × 10) | 16 × 300 | chỉ Ft; đặt trong mặt phẳng chứa trục |
| Thêm mới: vành đai θ = 90° | `LineLoop` 72 đoạn vuông góc trục Trái Đất – Mặt Trăng | 0 (đường) | hiện khi bật vành mẫu, minh hoạ ý (1) ở mục 5 |
| 3 vòng quỹ đạo | `LineLoop` 72 đoạn | 0 | hiện khi bật hoạt hoạ |
| Tổng | | **≈ 14.000** | trần 80.000 |

**Camera:** phối cảnh 40°, vị trí mặc định (0,8; 2,1; 6,4), nhìn vào (1,35; 0; 0). Ở màn dọc lùi ra (z = 8,5) để cả Mặt Trăng nằm trong khung. Cảnh tự do nên không có đường camera theo thời gian; có nút "Về góc nhìn ban đầu" và 2 góc đặt sẵn: "Nhìn từ cực Bắc" (0; 7; 0,01) và "Nhìn dọc trục" (−6; 0,6; 0) để thấy vành đai θ = 90° thành vòng tròn.

**Xoay, phóng, dịch:** OrbitControls có giảm chấn. Chuột: kéo trái xoay, lăn phóng, kéo phải dịch. Chạm: 1 ngón xoay, 2 ngón chụm phóng và dịch. Giới hạn khoảng cách 3–14. Kéo điểm cam theo S-21. Chạm vào canvas 3D **không** phát/dừng (ngoại lệ so với chuẩn "chạm sân khấu = phát/dừng", vì chạm đã dùng để xoay); phát/dừng bằng nút của khung.

**Hiển thị số:** θ, |Fg|/|Fc| (%), |Ft|/|Fc| (%), hướng Ft. Ở chế độ Tự học các số này hiện trong khung HTML; ở Trình chiếu hiện thành bảng nổi góc trên phải sân khấu (chữ ≥ 30 px).

**Hiệu năng:** DPR ≤ 1,5 (laptop), 1,0 (thiết bị cảm ứng); `antialias` bật trên laptop, tắt trên cảm ứng; chỉ render khi khung gọi `ve(t)` hoặc có `HMO.yeuCauVe()`; không bóng đổ. Mục tiêu ≥ 30 fps trên Mali-G52/Adreno 610 và ≥ 50 fps trên GPU tích hợp laptop (kiểm tay ở G2).

**Dự phòng không có WebGL2:** khi `canvas.getContext('webgl2')` trả về null hoặc tạo renderer lỗi, khung nạp `2d.js`. Cảnh 3 thay bằng hình 2D: lát cắt qua trục Trái Đất – Mặt Trăng, điểm cam kéo được trên đường tròn, 3 vector Fc/Fg/Ft tính bằng cùng hàm `forces`, vành 16 điểm, hoạt hoạ tịnh tiến; cùng bảng số. Hiện một dòng thông báo: "Thiết bị không hỗ trợ đồ hoạ 3D – đang hiển thị bản 2D." Sáu cảnh còn lại không đổi.

## 7. Nội dung tự học (nháp, chờ duyệt ở G1)

**Cảnh 1 — Trái Đất tịnh tiến quanh khối tâm chung**
Trái Đất và Mặt Trăng cùng quay quanh khối tâm chung CM. CM cách tâm Trái Đất 4.671 km, tức nằm trong lòng đất, sâu khoảng 1.700 km. Trong chuyển động này Trái Đất chỉ tịnh tiến, không xoay: hãy theo dõi ba điểm A, B, C, chúng vẽ ba đường tròn cùng bán kính, cùng chiều, cùng lúc.

**Cảnh 2 — Vì sao lực ly tâm chỉ có một hướng**
Vì ba đường tròn bằng nhau và ba điểm luôn ở cùng vị trí trên đường tròn của mình, lực ly tâm Fc tại mọi điểm có cùng độ lớn và song song với nhau. Fc luôn chỉ ra xa Mặt Trăng. Độ lớn của nó đúng bằng lực hấp dẫn của Mặt Trăng tại tâm Trái Đất: Fc = G·M/a², với a = 384.400 km.

**Cảnh 3 — Mô hình 3D: ba lực tại một điểm**
Lực hấp dẫn Fg của Mặt Trăng mạnh hơn ở phía gần (103,4% so với tại tâm) và yếu hơn ở phía xa (96,8%). Lực tạo triều Ft = Fg + Fc. Hãy kéo điểm cam: gần Mặt Trăng và phía đối diện, Ft hướng ra ngoài; ở vành đai vuông góc, Ft hướng vào tâm. Ft chỉ bằng khoảng 3,4% Fc.

**Cảnh 4 — Một ngày có hai lần nước lớn**
Hai múi triều luôn nằm dọc đường nối Trái Đất – Mặt Trăng. Trái Đất tự quay một vòng gần một ngày nên điểm P lần lượt đi qua cả hai múi: mỗi ngày có hai lần nước lớn, hai lần nước ròng. Vì Mặt Trăng cũng tiến lên trên quỹ đạo, P cần 24 giờ 50 phút mới gặp lại Mặt Trăng.

**Cảnh 5 — Xích vĩ Mặt Trăng làm hai lần nước lớn không bằng nhau**
Mặt Trăng thường không nằm trên xích đạo mà lệch một góc xích vĩ δ, nên hai múi triều nằm chéo so với xích đạo. Một điểm ở vĩ độ trung bình đi qua một múi cao và một múi thấp trong ngày. Hãy kéo δ về 0°: hai lần nước lớn bằng nhau. Tăng δ: chênh lệch lớn dần, ở vĩ độ cao chỉ còn một lần.

**Cảnh 6 — Xích vĩ thay đổi trong một tháng**
Nhìn ngang mặt phẳng xích đạo, quỹ đạo Mặt Trăng là một đường nghiêng. Trong 27,3 ngày, Mặt Trăng lên phía bắc xích đạo rồi xuống phía nam, xích vĩ δ dao động giữa +i và −i. Vì vậy mức chênh giữa hai lần nước lớn trong ngày cũng lớn dần rồi nhỏ dần, mỗi tháng hai lần.

**Cảnh 7 — Triều cường và triều kém**
Mặt Trời cũng tạo triều, bằng 0,46 lần Mặt Trăng. Vào ngày sóc và vọng, ba thiên thể thẳng hàng, hai tác động cộng lại thành 1,46: triều cường. Vào thượng huyền và hạ huyền, hai trục vuông góc, còn 0,54: triều kém. Chu kỳ lặp lại sau 14,77 ngày, tức nửa tuần trăng 29,53 ngày.

**Câu hỏi tự kiểm tra**

- **luc-tao-trieu-q1** (nhớ – hiểu). Vì sao lực ly tâm Fc bằng nhau tại mọi điểm trên Trái Đất?
  A. Vì mọi điểm cách khối tâm chung một khoảng bằng nhau
  B. Vì Trái Đất tịnh tiến quanh khối tâm chung nên mọi điểm vẽ đường tròn cùng bán kính
  C. Vì Trái Đất tự quay quanh trục với tốc độ góc không đổi
  D. Vì lực hấp dẫn của Mặt Trăng như nhau tại mọi điểm
  **Đáp án B.** Chuyển động là tịnh tiến, nên mọi điểm vẽ đường tròn bán kính 4.671 km, cùng pha; gia tốc vì thế giống hệt nhau.

- **luc-tao-trieu-q2** (nhớ – hiểu). Tại điểm trên Trái Đất nằm đối diện với Mặt Trăng, lực tạo triều Ft hướng về đâu?
  A. Về phía Mặt Trăng, xuyên qua tâm Trái Đất
  B. Vào tâm Trái Đất
  C. Ra xa tâm Trái Đất, ngược phía Mặt Trăng
  D. Bằng 0
  **Đáp án C.** Ở đó Fg chỉ còn 96,8% trong khi Fc vẫn 100% và chỉ ra xa Mặt Trăng, nên hợp lực hướng ra ngoài, tạo múi triều thứ hai.

- **luc-tao-trieu-q3** (vận dụng, tính số). Khoảng cách Trái Đất – Mặt Trăng là 384.400 km; Trái Đất nặng gấp 81,3 lần Mặt Trăng. Khối tâm chung cách tâm Trái Đất khoảng bao nhiêu?
  A. 1.700 km  B. 4.671 km  C. 6.371 km  D. 60.336 km
  **Đáp án B.** d = 384.400 / (81,3 + 1) = 384.400 / 82,3 ≈ 4.671 km, nhỏ hơn bán kính Trái Đất 6.371 km nên nằm trong lòng đất.

- **luc-tao-trieu-q4** (vận dụng, tính số). Tác động tạo triều của Mặt Trời bằng 0,46 lần Mặt Trăng. Biên độ triều cường lớn gấp khoảng mấy lần biên độ triều kém?
  A. 1,5 lần  B. 2,2 lần  C. 2,7 lần  D. 3,2 lần
  **Đáp án C.** Triều cường: 1 + 0,46 = 1,46; triều kém: 1 − 0,46 = 0,54; tỉ số 1,46 / 0,54 ≈ 2,7.

## 7b. Bản quyền

| Hình | Vị trí | Nguồn | Kết luận |
|---|---|---|---|
| Logo HMO, JPEG 1000 × 637, 91 KB (`7d90f546.bin`): quả cầu cam – xanh, bản đồ Việt Nam, chữ "HMO", đám mây, có chấm thể hiện Hoàng Sa và Trường Sa | bìa và thanh tiêu đề của cả 12 slide | Logo của Khoa (cần TS. Đạt xác nhận) | **Không đưa vào animation**: thanh tiêu đề slide bị bỏ, khung chung đã có nhận diện HMO. Nếu khung chung muốn dùng logo thì dùng một bản chung đã nén, không nhúng lại 91 KB ở từng animation. |
| Texture Trái Đất | cảnh 3, `0562a5fe.js:11–46` | Tự vẽ bằng canvas từ 8 đa giác giản lược trong mã | Giữ. Không có tên biển, không có đường biên giới. Lục địa rất thô (Đông Nam Á không có Việt Nam rõ hình), chấp nhận vì là sơ đồ; ghi "Lục địa vẽ giản lược". |
| Mọi hình còn lại | 7 cảnh | Vẽ bằng mã (Canvas 2D, three.js) | Giữ. |
| Font Carlito (21 file woff2) | toàn bộ | Giấy phép SIL OFL | Bỏ (S-19). |
| three.js 0.160.0 | cảnh 3 | Giấy phép MIT | Giữ; ghi trong README. |
| "slide 23 trong giáo trình" | ghi chú diễn giả slide 04 | Không rõ giáo trình nào | Không có hình nào chép từ sách; chỉ cần nguồn cho con số 6,6% (`[CẦN NGUỒN]`). |

Không có hình chụp từ sách. Không có bản đồ Biển Đông.

## 8. Checklist nghiệm thu

1. Chặn mạng: 0 request ra ngoài, 0 lỗi console ở cả 3 khung; cảnh 3 hiện Trái Đất, Mặt Trăng và 3 vector.
2. `animations/luc-tao-trieu/index.html` ≤ 1.500.000 byte; không chứa "Carlito", "unpkg", "googleapis", "deck-stage".
3. Đủ 7 cảnh đúng thứ tự; ←/→, PageUp/PageDown và vuốt đổi cảnh; ở cả 7 cảnh, dừng 1 s thì hai ảnh chụp giống nhau.
4. Cảnh 3, bật hoạt hoạ: CM đứng yên; Trái Đất và Mặt Trăng luôn ở hai phía đối diện qua CM (180° ± 1°).
5. Số hiển thị: 4.671 km (không còn 4.700); điểm gần 103,4%; điểm xa 96,8%; Ft điểm gần 3,40%; ngày triều 24 h 50 ph; triều cường 1,46; triều kém 0,54; ngày 3,69 cho 1,10.
6. Cảnh 4: hai đỉnh nước lớn liên tiếp cách nhau 12 h 25 ph ± 2 ph; cảnh 1–6 không có chữ "triều cường".
7. Cảnh 1, 4, 7: Mặt Trăng quay ngược chiều kim đồng hồ; mũi tên quỹ đạo cùng chiều chuyển động.
8. Cảnh 6 tại ψ = 90°, i = 25°: bao hình triều nghiêng ≤ 25° (không chĩa lên cực).
9. Ở 390 × 844: vào chế độ Tự học, mức Chỉ xem, không có ô MSSV; mọi điều khiển cảnh ≥ 44 px; có dải nhắc xoay ngang; cảnh 3 xoay được bằng 1 ngón.
10. Tắt WebGL2: cảnh 3 hiện bản 2D kèm dòng thông báo, 6 cảnh còn lại bình thường. (Kiểm tay ở G2: ≥ 30 fps trên Android tầm trung, ≥ 50 fps trên laptop.)

## 9. Ngoài phạm vi

- Không dựng lại slide 01–05 thành cảnh; không giữ ghi chú diễn giả, thanh thumbnail, chế độ trình chiếu của `deck-stage`.
- Không nâng 6 cảnh 2D lên 3D.
- Không thêm lực tạo triều của Mặt Trời vào mô hình 3D; không thêm quỹ đạo elip (cận điểm, viễn điểm), chu kỳ 18,6 năm, triều động lực, ma sát hay độ trễ triều.
- Không dùng ảnh vệ tinh hay texture Trái Đất tải từ ngoài.
- Không vẽ đúng tỉ lệ khoảng cách Trái Đất – Mặt Trăng (60,3 R).
- Không sửa `_nguon/`; bộ slide gốc giữ nguyên để giảng viên trình chiếu.

## Phụ lục: `[CẦN NGUỒN]` và câu hỏi cho TS. Đạt

**`[CẦN NGUỒN]`** (file không có prompt gốc, không có dòng nguồn nào trên hình):

1. 384.400 km; 6.371 km; tỉ số khối lượng 81,3; GM Mặt Trăng 4,9049×10¹² m³/s² (`0562a5fe.js:7`). Đề xuất dòng nguồn: NASA Moon Fact Sheet — cần thầy xác nhận.
2. 27,32 ngày (tháng sao); 29,53 ngày (tuần trăng); ngày triều 24 h 50 ph.
3. Tỉ số Mặt Trời / Mặt Trăng 0,46.
4. Xích vĩ Mặt Trăng 18,3°–28,6° (mã cho kéo 0–28°, mặc định 25°).
5. "6,6% — đúng con số slide 23 trong giáo trình": giáo trình nào?
6. Hệ số phóng đại vector Ft "×26" là lựa chọn hiển thị, không cần nguồn; chỉ cần ghi rõ.

**Câu hỏi**

1. **Thuật ngữ cảnh 4:** nguồn gọi nước lớn trong ngày là "triều cường". Đề xuất dùng "nước lớn" / "nước ròng", để dành "triều cường" / "triều kém" cho cảnh 7. Thầy đồng ý không?
2. **Thuật ngữ cảnh 5:** nguồn viết "bất đối xứng nhật triều". Đề xuất "bất đẳng nhật triều" (hai lần nước lớn trong ngày không bằng nhau). Thầy muốn dùng từ nào?
3. **Chiều nhìn:** đề xuất mọi cảnh nhìn từ cực Bắc, quay ngược chiều kim đồng hồ. Cảnh 4 và 7 hiện quay cùng chiều kim đồng hồ.
4. **Thành phần nằm ngang của Ft:** bài chỉ nói Ft "hướng ra ngoài / vào tâm". Thực tế nước dồn về hai múi là do thành phần nằm ngang (lực kéo), vì thành phần thẳng đứng chỉ bằng khoảng 10⁻⁷ g. Đề xuất thêm một câu vào Giải thích cảnh 3 và không đổi hình. Thầy có muốn thêm không, hay để cho học phần Thủy triều?
5. **Logo HMO:** có đưa logo vào khung chung của kho không? Nếu có, xin thầy cấp file gốc (SVG hoặc PNG) để dùng một bản duy nhất.
6. **Tiêu đề animation:** đề xuất "Lực tạo triều: vì sao có hai múi triều". Thầy sửa nếu muốn.
