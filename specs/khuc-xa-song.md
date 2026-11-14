# khuc-xa-song — Khúc xạ sóng: vì sao mũi đất hứng sóng, vịnh lại êm?

## 1. Định danh

| Mục | Giá trị |
|---|---|
| File gốc | `_nguon/khuc_xa_song_HMO.html` (1.477 dòng) |
| Prompt gốc | `_nguon/prompts/prompt_khuc_xa_song_animation.md` |
| Học phần · Bài | để trống (TS. Đạt xếp sau); tiêu đề gốc ghi chương Sóng biển, HDHDC |
| Dung lượng | 407 KB (416.727 byte). Trong đó **316.770 byte (76%) là logo HMO dạng SVG base64 nhúng HAI lần** (dòng 88: 158.404 ký tự; dòng 107: 158.366 ký tự). Mã + CSS + chữ chỉ ≈ 100 KB |
| Công nghệ | Vanilla JS; Canvas 2D (nền độ sâu, đỉnh sóng, tia sóng) + SVG phủ (nhãn, chú thích); không thư viện; font khai báo Calibri/Segoe UI/Arial, không nhúng |
| Chạy offline | Có. `audit/screens/khuc-xa-song/log.json`: 0 lỗi console, 0 request bị chặn ở cả 3 khung |
| Cấu trúc | 8 cảnh trên một đồng hồ `t` (giây vật lý); cảnh 1–7 có giờ, cảnh 8 mở (thanh trượt, nút) |
| Giây chụp thumbnail | cảnh 6, `u` = 80 (đồng hồ gốc `t` = 619): hai ống năng lượng + dải màu dọc bờ |

Mục tiêu học tập:
1. **Giải thích** vì sao đỉnh sóng xoay dần về song song với đường đẳng sâu khi vào nước nông (phần nông chậm, phần sâu nhanh).
2. **Tính** góc tia sóng ở một độ sâu bằng định luật Snell sin θ / c = hằng số, và hệ số khúc xạ Kr = √(b₀/b).
3. **So sánh** độ cao sóng ở mũi đất (tia hội tụ) và đáy vịnh (tia phân kỳ), và nêu hệ quả xói – bồi.

## 2. Chấm điểm hiện trạng (0–5)

| Tiêu chí | Điểm | Bằng chứng |
|---|---|---|
| Đúng khoa học | 4 | Tính lại độc lập bằng Python (phương trình phân tán, Snell, dò tia RK4 bước 2 m trên h(x,y) giải ngược chính xác) khớp mọi số hiển thị: bảng bờ thẳng 7 dòng khớp tới chữ số cuối; tại 3 m mũi đất b = 31,5 m, Kr = 1,26, H = 2,15 m; đáy vịnh b = 95,6 m, Kr = 0,72, H = 1,23 m. Trừ điểm vì 3 lỗi ở mục 3 (nhãn "năng lượng trên 1 m bờ"; biên 50 m không còn là nước sâu khi T > 8 s; nhãn "14°" ghi cứng) |
| Sư phạm | 4 | Trình tự câu hỏi → c(h) → một đỉnh hai tốc độ → Snell → mũi đất/vịnh → năng lượng → hệ quả → thử nghiệm rất mạch lạc; mỗi cảnh quay về một ý. Trừ điểm: cảnh 4 dài 85 s, cảnh 3 dài 88 s ở tốc độ mặc định (dòng 844, 972); cuối cảnh 5 nửa phải sân khấu gần trống (ảnh chụp cảnh 5, u = 230) |
| Hình ảnh | 3 | Đúng màu HMO (dòng 8, 310), bố cục sạch. Nhưng chú thích 34 px (< 36, dòng 388), nhãn trên hình 28 px (< 30, dòng 564, 642…), nhiều chữ 22–26 px ngoài dòng nguồn (dòng 1153, 1168, 1175–1178, 1241). Font Calibri không có trên Android → rơi về font hệ thống (dòng 9). Ở khung 390 px sân khấu co 0,27: nhãn 28 px còn 7,6 px, không đọc được (ảnh `doc` cảnh 6) |
| Tương tác | 2 | Bàn phím đủ: Space/B/., ←/→, PageUp/PageDown, ↑/↓, 1–8, F, R, L, T (dòng 1405–1419). Nhưng nút cao 30 px trên sân khấu (dòng 29, 41) → đo được **8,1 px ở khung 390×844 và 10,8 px ở 844×390**; chạm vào sân khấu không phát/dừng (đo: `t` vẫn chạy 1,93 → 4,07 → 6,07 sau khi bấm); không có vuốt đổi cảnh; nút "Cảnh trước" lỗi (dòng 1365, hai nhánh giống nhau `u < 1 ? k - 1 : k - 1`); thẻ tổng kết chỉ mở bằng phím T hoặc nút ở cảnh 8 |
| Tự học | 2 | Chú thích trên hình tự giải thích khá tốt trên laptop, có câu hỏi mở đầu (dòng 726) và câu hỏi "bấm thử" (dòng 1298). Chưa có khung giải thích, chưa có câu hỏi tự kiểm tra, và trên điện thoại dọc không đọc được chữ nào |
| Hiệu năng | 3 | 407 KB < 500 KB nhưng 76% là logo trùng lặp. Dò 301 tia mất ≈ 200 ms trên máy thử (Node), ước 1–2 s trên điện thoại tầm trung, chặn luồng chính khi tải (dòng 1460) và khi đổi T (dòng 1453). DPR canvas cho tới 2,5 (dòng 328). `requestAnimationFrame` chạy liên tục kể cả khi dừng và khi tab ẩn (dòng 1338–1351; không có `visibilitychange`). fps: kiểm tay |
| Khả năng truy cập | 2 | Không có `prefers-reduced-motion`, không có `aria-label` (grep = 0), canvas không có `role`/mô tả; nút chỉ có `title`. Tương phản chữ chính đạt (Ink trên trắng, trắng trên Navy); chữ Slate 22 px nghiêng trên trắng ≈ 5,0:1, đạt |
| Chất lượng mã | 4 | Một đồng hồ `t`, mỗi cảnh là `draw(u, fd)` gần như thuần (dòng 1318–1333); vật lý tách riêng thành module `PHY` (dòng 115–300), tính một lần; 0 lỗi console. Trừ điểm: toạ độ bố cục rải rác dạng số trần; biểu thức thừa `* 0` (dòng 1262); lỗi nút trước (dòng 1365); nội suy tốc độ theo cảnh trộn với tốc độ người dùng (dòng 1352) |

**Trung bình: 3,0.**

## 3. Lỗi khoa học — có số cụ thể

**K-01 (trung bình) — Nhãn "năng lượng sóng trên 1 m bờ" không khớp với H hiển thị bên cạnh.** Dòng 1159, 1168, 1177–1178 và 1295–1296: cột ghi 1,59 (mũi đất) và 0,52 (đáy vịnh), đây là E = b₀/b = Kr² (dòng 283: `E: DY / b`), tức thông lượng năng lượng trên 1 m **đỉnh sóng** so với ngoài khơi, chưa tính biến dạng nước nông. Ngay cạnh lại ghi H = 2,15 m và 1,23 m. Sinh viên lấy (2,15/1,5)² = 2,05 và (1,23/1,5)² = 0,67 sẽ thấy lệch với 1,59 và 0,52 (chênh đúng hệ số Ks² = 1,136² = 1,29). Tỉ số mũi/vịnh thì đúng theo cả hai cách: 1,59/0,52 = 2,15²/1,23² = 3,03. Sửa: đổi nhãn thành "Mức dồn năng lượng do khúc xạ: Kr² = b₀/b" (xem S-01).

**K-02 (nhỏ) — Biên "ngoài khơi" 50 m không còn là nước sâu khi T > 8 s.** Dòng 1297 nói sóng chu kỳ dài "cảm nhận" đáy từ L₀/2 = 28 · 50 · 112 m, nhưng mô hình đặt đáy phẳng 50 m ở ngoài (dòng 137, 187) và lấy H₀, θ₀, b₀ tại đó. Với T = 12 s: h/L₀ = 50/224,8 = 0,22, c(50 m) = 0,91·c₀; với T = 14 s (thanh trượt cho tới 14, dòng 1432): c(50 m) = 0,84·c₀. Vậy "so với ngoài khơi = 1" thực chất là "so với độ sâu 50 m". Chế độ bờ thẳng đã ghi "θ₀ đo tại độ sâu 50 m" (dòng 1282); chế độ mũi đất chưa ghi. Sửa: S-02.

**K-03 (nhỏ) — Nhãn góc "14°" ghi cứng, hình vẽ 14,9°.** Dòng 725: thước đo góc vẽ theo `S.at(hA(1912)).theta` = 14,94° (h = 2,2 m) nhưng nhãn là chuỗi cứng `'14°'`. Giá trị 14,3° ứng với h = 2,0 m (điểm sóng vỡ: h_b = 2,02 m, x_b = 1.919 m). Sửa: S-03.

Đã kiểm và **đúng** (không cần sửa):
- Bảng bờ thẳng, T = 8 s, θ₀ = 45°: h = 10 m → L = 70,9 m, c = 8,86 m/s, θ = 30,2°, Ks = 0,94, Kr = 0,90, H = 1,28 m; h = 2 m → c = 4,34 m/s, θ = 14,3°, H = 1,59 m, H/h = 0,79. Không khúc xạ: H(10 m) = 1,41 m > 1,28 m, đúng ý prompt.
- Cảnh 3: 11,10 × 8 = 88,8 m; 6,64 × 8 = 53,1 m; chênh 35,7 m. (Phép nhân coi c không đổi trong 8 s; thực tế A đi vào chỗ nông hơn ≈ 1,7 m nên sai ≤ 1%, chấp nhận.)
- Cảnh 4: sin θ = 0,707 × 4,34/12,45 = 0,246 → 14,3°; b = 100 × cos 14,3°/cos 45° = 137 m; Kr = 0,85.
- Cảnh 5: đường 20 m ở x = 27 m (mũi) và 1.173 m (vịnh), chênh 1.146 m; c(10 m) = 8,9 m/s; cùng đỉnh đó trong vịnh ở h = 35,6 m, c = 12,2 m/s ≈ 12.
- Cảnh 6: sóng vỡ ở mũi đất h ≈ 2,7 m, H ≈ 2,2 m; đáy vịnh h ≈ 1,7 m, H ≈ 1,3 m; ống cam 840 m → 600 m, ống xanh 350 m → 600 m (animation tự tính; prompt ghi 850 và 360).
- Cảnh 8: bốn bộ kiểm tra của prompt khớp (ví dụ T = 12 s, θ₀ = 45° → 23,0° · 16,5° · 10,5°; H 1,49 · 1,67 · 2,03 m). T = 12 s: Kr² mũi/vịnh = 6,5; T = 6 s: 1,8 → đúng kết luận "chu kỳ dài khúc xạ mạnh hơn".
- c ≈ √(g·h) tại h = 2 m = 4,43 m/s so với 4,34 m/s chính xác (lệch 2%): dùng dấu "≈" là đủ.

**Prompt gốc sai, animation đúng** (ghi lại để không ai "sửa" animation theo prompt): bảng 4B của prompt ghi tia y₀ = 0 có θ = 4° (đúng là 0° do đối xứng), tia 1200 có b = 42,8 m, Kr = 1,08, H = 1,84 m (đúng: 44,7 m; 1,06; 1,80 m), năng lượng tia 400 = 0,52 (đúng: 0,58), tia 800 = 0,64 (đúng: 0,68).

## 4. Danh sách thay đổi

| ID | Loại | Vị trí | Mô tả | Tiêu chí nghiệm thu |
|---|---|---|---|---|
| S-01 | Khoa học | Cảnh 6 (dòng 1159, 1168, 1177–1178); cảnh 8 (dòng 1295–1296) | Đổi "năng lượng sóng trên 1 m bờ" thành "Mức dồn năng lượng do khúc xạ, Kr² = b₀/b"; cột vẫn 1,59 và 0,52; thêm một dòng "H² tăng thêm do nước nông (Ks² = 1,29)" trong đoạn Giải thích | Không còn chuỗi "trên 1 m bờ"; đoạn Giải thích cảnh 6 có cả Kr² và Ks |
| S-02 | Khoa học | Cảnh 8, chế độ mũi đất (dòng 1293–1297) | Thêm ghi chú 22 px "So với sóng tại độ sâu 50 m; với T = 12 s đó chưa phải nước sâu" | Chuỗi hiện khi T = 12 s |
| S-03 | Nhãn-số-chữ | Cảnh 1 (dòng 725) | Đặt thước đo góc tại điểm sóng vỡ (h = 2,0 m) và sinh nhãn từ giá trị tính (`vn(theta,0)+'°'`) | Nhãn và góc vẽ cùng một số: 14° |
| S-04 | Nhãn-số-chữ | Dòng 1435 | "đang tính lại 61 tia sóng…" → "đang tính lại tia sóng…" (thực tế dò 301 tia, vẽ 61) | Chuỗi mới |
| S-05 | Nhãn-số-chữ | Dòng 1081 | "tạm dừng 3 s" chỉ đúng ở 4×: bỏ số, ghi "tạm dừng để so sánh" | Chuỗi mới |
| S-06 | Hiệu năng | Dòng 88, 107 | Bỏ cả hai bản logo nhúng (317 KB). Logo do bộ khung cung cấp một lần; nếu khung không có logo thì dùng một bản SVG đã tối ưu ≤ 30 KB, giữ nguyên Hoàng Sa, Trường Sa | `animations/khuc-xa-song/index.html` ≤ 250 KB |
| S-07 | Tương tác | Toàn file | Ghép vào khung: gọi `HMO.dangKy({canh, thoiLuong, ve, datNhan, khoiTao, huy})`. Bỏ `#ctl`, `#splash`, `#hdr`, `#ftr`, `#sum`, vòng `loop` (dòng 1338–1351), `keydown` (dòng 1405–1419), `fit` (dòng 325–332), tự ẩn con trỏ (dòng 1421–1425) | Không còn `requestAnimationFrame`, `addEventListener('keydown'` trong `src/khuc-xa-song/`; smoke test 3 khung đạt |
| S-08 | Tương tác | `SC` (dòng 1303–1304) | Khai báo 7 cảnh có giờ theo giây xem: 15 · 25 · 88 · 85 · 60 · 45 · 30 (tổng 348 s) + cảnh 8 tự do `{id:'thu-nghiem', lap: 8}`. `ve(t)` đổi sang `u = (t − batDau) × spd` với spd = 4 · 1 · 0,5 · 2 · 4 · 2 · 1 của từng cảnh, để tốc độ 1× của khung giữ đúng nhịp hiện tại. Bỏ ba điểm dừng giữa cảnh 3 (dòng 844) | Tua tới giây bất kỳ rồi tua lại cho đúng cùng một hình (so ảnh chụp) |
| S-09 | Tương tác | Cảnh 8 (dòng 1428–1455) | Giữ thanh trượt θ₀, T và 3 nút T như trạng thái riêng; mỗi lần đổi gọi `HMO.yeuCauVe()`. Thanh trượt và nút cao ≥ 44 px CSS ở mọi khung (đặt trong khung HTML bên dưới sân khấu khi ở chế độ Tự học, không nằm trong sân khấu co nhỏ) | Ở 390×844 kéo được θ₀ bằng chạm; bảng θ, H đổi theo |
| S-10 | Hiệu năng | `prepHeadland` (dòng 483–502, 1453, 1460) | Dò tia cho T = 8 s khi `khoiTao`; T = 6 và 12 s tính khi người xem bấm, chia nhỏ theo lô 50 tia qua `setTimeout` để không chặn giao diện > 100 ms | Không có tác vụ dài > 200 ms sau khi tải (kiểm tay bằng DevTools) |
| S-11 | Hiệu năng | Dòng 328 | DPR canvas tối đa 1,5 (laptop) và 1,0 khi thiết bị cảm ứng hẹp < 1024 px, hoặc dùng giá trị khung cung cấp | `cv.width` ≤ 2160 |
| S-12 | Hình ảnh | `CAPSTY` (dòng 388–391) và các lệnh `txt` | Chú thích 34 → 36 px; nhãn trên hình 28 → 30 px; chữ 24–26 px không phải dòng nguồn/ghi chú tỉ lệ → 30 px (dòng 1153–1154, 1096–1099, 1168). Font: dùng font của khung (Be Vietnam Pro) | Quét mã: không còn `size: 28`, `size: 26`, `size: 24` ngoài ghi chú tỉ lệ/nguồn |
| S-13 | Hình ảnh | `datNhan(muc)` | `'toi-gian'`: ẩn lớp `gCap` (mọi hộp chú thích), bảng số cảnh 4, 6, 8, thẻ cảnh 7, hộp công thức; giữ nhãn độ sâu, "Hướng sóng tới", A/B, số góc. `'tat'`: ẩn thêm lớp `gLab`. Khi ẩn bảng bên phải, mở rộng khung bản đồ ra giữa sân khấu | Ảnh 390×844 cảnh 6: không còn hộp chữ, bản đồ chiếm ≥ 80% bề ngang sân khấu |
| S-14 | Sư phạm | Toàn bộ chú thích dài | Chuyển nội dung chú thích, 3 thẻ ứng dụng (dòng 1244–1246) và 4 thẻ tổng kết (dòng 1397–1398) vào `noidung/khuc-xa-song.json` (mục 7). Trên sân khấu mỗi cảnh giữ tối đa 1 câu chốt ≤ 20 từ | Mỗi cảnh ≤ 2 hộp chữ cùng lúc ở chế độ Trình chiếu |
| S-15 | Sư phạm | Cảnh 5 (dòng 1083–1089) | Sau u = 175 nửa phải chỉ còn 1 chú thích: hiện thêm bảng nhỏ "Mũi đất: c = 8,9 m/s · Vịnh: c ≈ 12 m/s" cho tới hết cảnh | Ảnh cảnh 5, u = 230: vùng x 730–1420 có ≥ 2 khối nội dung |
| S-16 | Truy cập | Canvas, nút cảnh 8 | Canvas có `role="img"` + `aria-label` theo tên cảnh; nút và thanh trượt có `aria-label`; tôn trọng `prefers-reduced-motion`: tắt bọt sóng lung lay (`foamB`, dòng 694–707) và hiệu ứng mờ dần, giữ chuyển động đỉnh sóng | Bật reduced-motion: bọt đứng yên, đỉnh sóng vẫn chạy |
| S-17 | Tương tác | Công tắc lớp (dòng 1372–1378) | Giữ 4 công tắc nội dung (Đỉnh sóng, Tia sóng, Đường đẳng sâu, Tô màu độ sâu) dưới dạng nút riêng của animation trong khung điều khiển, cao ≥ 44 px; "Nhãn" và "Dừng sau mỗi cảnh" giao cho khung (phím L, R giữ nguyên nghĩa) | Chạm bật/tắt tia sóng được ở 390×844 |
| S-18 | Chất lượng mã | Dòng 1262, 1365, 1471 | Xoá `* (8 / S.T) * 0`; nút trước do khung xử lý; bỏ `window.__KXS` hoặc đổi thành móc test của khung | Không còn ba dòng này |
| S-19 | Nhãn-số-chữ | Dòng 90 | Dòng nguồn giữ nguyên, thêm "· Sóng vỡ khi H/h = 0,78" để tiêu chí vỡ có nguồn hiển thị | Chuỗi có "0,78" |

## 5. Phân tầng: **T2 (2D – Opus)**, khối lượng **L** (> 4 giờ)

- **Q1** (chỉ nhãn, số, chữ?): Không. S-07 đến S-11, S-13 đụng vòng lặp, cấu trúc cảnh, tương tác và bố cục → không phải T1.
- **Q2** (cấu trúc 3D thiết yếu, 2D làm mất ý chính?): **Không.** Đề bài nêu "khúc xạ sóng trên địa hình đáy 2 chiều" là ứng viên, nên trả lời thẳng câu hỏi ở G1:
  - *3D làm sinh viên hiểu thêm điều gì?* Chỉ một điều: thấy trực tiếp đáy biển nhô lên trước mũi đất. Ý này bản 2D đã truyền bằng ba kênh: tô màu độ sâu liên tục, đường đẳng sâu có nhãn 50/20/10/5/3 m, và thước 1.146 m ở cảnh 5.
  - *Ý chính của bài nằm ở đâu?* Ở **mặt bằng**: hướng đỉnh sóng so với đường đẳng sâu, góc θ, khoảng cách b giữa hai tia. Cả ba đều là đại lượng đo trên hình chiếu bằng; phối cảnh 3D làm méo góc và khoảng cách, nên sinh viên không còn đọc được 45° → 14° hay 50 m → 31,5 m trên hình. Sách giáo khoa và bản đồ khúc xạ thực tế cũng dùng hình chiếu bằng.
  - *Phần "theo chiều đứng"* (nông thì chậm) đã có mặt cắt ở cảnh 2, là chỗ 2D rõ hơn 3D.
  - Vì vậy Q2 = Không; không cần xét điều kiện (a), (b). Suất 3D thứ hai của đợt đầu (trần 2/8) để dành cho animation khác.
- **Q3**: sửa nhãn vật lý, ghép khung, làm lại tương tác chạm, tối ưu dung lượng ở 2D → **T2**.
- Khối lượng L: 8 cảnh, ≈ 1.160 dòng JS phải chuyển sang hợp đồng `ve(t)`, lớp SVG phủ cần chế độ `toi-gian`, cảnh 8 có điều khiển riêng. Phần vật lý (`PHY`, dòng 115–300) **giữ nguyên, không viết lại**.

## 6. Kịch bản 3D

Không áp dụng (T2).

## 7. Nội dung tự học (nháp, chờ duyệt ở G1)

**Cảnh 1 — Câu hỏi.** Ngoài khơi, đoàn sóng chạy xiên 45° so với bờ. Càng vào gần, các đỉnh sóng càng xoay, và tới chỗ sóng vỡ chỉ còn lệch khoảng 14°. Bạn hãy nhớ lại lần ra biển: đỉnh sóng hầu như luôn song song với mép nước, dù gió thổi hướng nào. Vì sao lại thế?

**Cảnh 2 — Nước càng nông, sóng càng chậm.** Chu kỳ sóng không đổi, ở đâu cũng là 8 giây. Nhưng khi đáy nông dần, sóng chạy chậm lại và bước sóng ngắn đi: ở độ sâu 50 m sóng đi 12,45 m/s, ở 2 m chỉ còn 4,34 m/s. Ở nước nông có thể ước lượng c ≈ √(g·h). Toàn bộ hiện tượng khúc xạ bắt nguồn từ đây.

**Cảnh 3 — Một đỉnh sóng, hai tốc độ.** Theo dõi một đỉnh sóng: đầu A ở chỗ sâu 20 m, đầu B ở chỗ sâu 5 m. Trong 8 giây, A đi 88,8 m còn B chỉ đi 53,1 m. Đầu ở nước sâu vượt lên, nên cả đỉnh sóng xoay về phía nước nông, giống một hàng người khoác tay đi chéo từ sân bê tông vào bãi cát.

**Cảnh 4 — Tia sóng và định luật Snell.** Tia sóng là đường vuông góc với đỉnh sóng, chỉ hướng năng lượng truyền đi. Góc θ giữa tia và pháp tuyến đường đẳng sâu tuân theo sin θ / c = hằng số, nên c giảm thì θ giảm: 45° ở 50 m còn 14,3° ở 2 m. Hai tia cách nhau 100 m ngoài khơi giãn ra 137 m, sóng thấp đi một chút.

**Cảnh 5 — Mũi đất và vịnh.** Trước mũi đất, đáy nông nhô ra biển: đường đẳng sâu 20 m ở đây nằm xa hơn trong vịnh 1.146 m. Phần đỉnh sóng trước mũi đất vì thế chậm lại sớm, còn hai bên vẫn chạy nhanh. Đỉnh sóng cong lại ôm lấy mũi đất, và các tia sóng dồn về mũi đất, tỏa ra trong vịnh.

**Cảnh 6 — Năng lượng dồn về mũi đất.** Năng lượng giữa hai tia không thoát ra ngoài. Ở mũi đất, 840 m đỉnh sóng ngoài khơi bị ép vào 600 m; trong vịnh, 350 m trải ra 600 m. Tại độ sâu 3 m, sóng ở mũi đất cao 2,15 m, ở đáy vịnh 1,23 m. Khúc xạ không tạo thêm năng lượng, chỉ phân bố lại: mũi đất nhận gấp ba lần đáy vịnh.

**Cảnh 7 — Bờ biển tự "là phẳng".** Sóng lớn bào mòn mũi đất thành vách đá, ghềnh đá; cát được đưa vào vịnh, nơi sóng nhỏ, tạo bãi tắm và chỗ neo tàu. Qua hàng trăm đến hàng nghìn năm, đường bờ thẳng dần. Dọc bờ Biển Đông ở Trung Bộ, kiểu mũi đá xen bãi cát này rất phổ biến. Hình ở đây chỉ minh họa định tính.

**Cảnh 8 — Thử nghiệm.** Bạn tự đổi góc tới θ₀ và chu kỳ T để xem đỉnh sóng xoay thế nào. Ở chế độ mũi đất, hãy so sóng lừng 12 giây với sóng gió 6 giây: sóng chu kỳ dài "cảm nhận" đáy từ xa hơn nên bị bẻ mạnh hơn, và mũi đất phải hứng nhiều năng lượng hơn hẳn.

### Câu hỏi tự kiểm tra

**khuc-xa-song-q1** (nhớ – hiểu). Vì sao đỉnh sóng xoay dần về song song với bờ khi vào nước nông?
A. Gió gần bờ luôn thổi vuông góc với bờ
B. Phần đỉnh sóng ở nước nông chạy chậm hơn phần ở nước sâu
C. Chu kỳ sóng giảm dần khi vào bờ
D. Sóng phản xạ từ bờ đẩy đỉnh sóng xoay lại
Đáp án: **B**. Tốc độ sóng giảm theo độ sâu nên đầu ở nước sâu vượt lên, đỉnh sóng xoay về phía nước nông; chu kỳ không đổi.

**khuc-xa-song-q2** (nhớ – hiểu). Ở mũi đất, các tia sóng và độ cao sóng thay đổi thế nào so với trong vịnh?
A. Tia phân kỳ, sóng thấp hơn
B. Tia song song, sóng bằng nhau
C. Tia hội tụ, sóng cao hơn
D. Tia hội tụ, sóng thấp hơn
Đáp án: **C**. Tia sóng bẻ về phía nước nông nên dồn vào mũi đất; cùng năng lượng bị ép vào đoạn đỉnh sóng ngắn hơn làm sóng cao lên.

**khuc-xa-song-q3** (vận dụng). Sóng chu kỳ 8 s tới xiên 45° ở nơi c = 12,45 m/s. Tại độ sâu 10 m, c = 8,86 m/s. Góc tia sóng ở đó xấp xỉ bao nhiêu?
A. 14°  B. 30°  C. 39°  D. 45°
Đáp án: **B**. sin θ = sin 45° × 8,86/12,45 = 0,707 × 0,712 = 0,503 → θ ≈ 30,2°.

**khuc-xa-song-q4** (vận dụng). Hai tia sóng cách nhau 50 m ở ngoài khơi, tới gần mũi đất chỉ còn cách nhau 31,5 m. Hệ số khúc xạ Kr tại đó là bao nhiêu?
A. 0,63  B. 0,79  C. 1,26  D. 1,59
Đáp án: **C**. Kr = √(b₀/b) = √(50/31,5) = √1,59 = 1,26; 1,59 là Kr², tức mức dồn năng lượng.

## 7b. Bản quyền

| Hình nhúng | Vị trí | Nguồn | Xử lý |
|---|---|---|---|
| Logo Khoa HMO, SVG base64 (vector hoá bằng VTracer, 118 KB sau giải mã), có bản đồ Việt Nam với các chấm Hoàng Sa, Trường Sa | Dòng 88 (thanh tiêu đề) | Logo của Khoa | Giữ quyền dùng; **bỏ bản nhúng**, lấy từ bộ khung (S-06) |
| Cùng logo đó, bản thứ hai | Dòng 107 (màn hình chờ) | như trên | Bỏ cùng màn hình chờ |

Không có ảnh chụp, không có hình từ sách. Mọi hình còn lại (bản đồ độ sâu, đỉnh sóng, tia sóng, hai ví dụ đời thường, bờ biển cảnh 7) vẽ bằng mã. Địa hình mũi đất – vịnh là hàm giải tích tự đặt (dòng 175), không phải địa danh thật, không cần nguồn.

Nguồn số liệu ghi trên hình: "Lý thuyết sóng tuyến tính; tia sóng tính theo Munk & Arthur (1952)" (dòng 90). **[CẦN NGUỒN]** tên đầy đủ công trình Munk & Arthur (1952) để ghi trong khung Giải thích (đề xuất: *Wave intensity along a refracted ray*, trong Gravity Waves, NBS Circular 521, tr. 95–108 — nhờ TS. Đạt xác nhận). **[CẦN NGUỒN]** tiêu chí vỡ H/h = 0,78 (đề xuất ghi: McCowan, 1894, sóng đơn độc).

## 8. Checklist nghiệm thu

1. `animations/khuc-xa-song/index.html` ≤ 250 KB; 0 request ra ngoài; 0 lỗi console ở 3 khung.
2. Chuỗi "data:image/svg+xml;base64" xuất hiện ≤ 1 lần trong bản phát hành.
3. Cảnh 4 (bờ thẳng, T = 8 s, θ₀ = 45°): bảng hiện θ = 30,2° và H = 1,28 m khi đỉnh cam ở h = 10 m; hộp công thức ghi 14,3°; ống năng lượng 100 m → 137 m.
4. Cảnh 6: mũi đất H = 2,15 m, Kr² = 1,59; đáy vịnh H = 1,23 m, Kr² = 0,52; chú thích "gấp 3 lần"; nhãn ống 840 m và 350 m; không còn chuỗi "trên 1 m bờ".
5. Cảnh 8, bờ thẳng: T = 12 s, θ₀ = 45° → θ tại 2 m = 10,5°, H = 2,03 m. Chế độ mũi đất T = 12 s có dòng ghi chú "độ sâu 50 m".
6. Cảnh 1: nhãn góc sát bờ sinh từ giá trị tính và trùng góc vẽ (14°).
7. Khung 390×844: tự vào chế độ Tự học; sân khấu không trống; không có hộp chú thích trên sân khấu; mọi nút và thanh trượt cao ≥ 44 px; kéo θ₀ bằng chạm làm bảng đổi số.
8. Tua tới giây 200 rồi tua về giây 100 rồi lại tới giây 200: hai ảnh chụp ở giây 200 giống nhau (đồng hồ duy nhất, `ve(t)` thuần).
9. Chạm sân khấu: dừng (hai ảnh cách nhau 1 s giống nhau); chạm lần nữa: chạy.
10. Quét bản phát hành: 0 lần "độ mặn", "South China Sea", "Biển Nam Trung Hoa"; chú thích ≥ 36 px, nhãn ≥ 30 px. fps trên điện thoại: kiểm tay.

## 9. Ngoài phạm vi

- Không viết lại module vật lý `PHY` (dòng 115–300); không đổi địa hình, H₀ = 1,5 m, T = 8 s, θ₀ = 45°, bước dò tia.
- Không dựng 3D, không thêm thư viện.
- Không thêm nhiễu xạ, phản xạ, dòng dọc bờ hay vận chuyển bùn cát định lượng; cảnh 7 giữ là minh họa định tính.
- Không thay bản đồ giả định bằng địa danh thật của Việt Nam.
- Không rút ngắn hay đổi thứ tự 8 cảnh (nếu TS. Đạt muốn rút cảnh 3 và 4, đó là yêu cầu riêng).
- Không sửa các con số trong prompt gốc; prompt nằm trong `_nguon/` và bất biến.
