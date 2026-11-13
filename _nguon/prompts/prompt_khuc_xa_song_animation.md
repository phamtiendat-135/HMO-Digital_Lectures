# Prompt Claude Design – Animation khúc xạ sóng: đường đẳng sâu, mũi đất và vịnh (HDHDC, chương Sóng biển)

Cách dùng: mở Claude Design → chọn Design System **HMO** → dán toàn bộ khối prompt bên dưới.
Mọi con số đã tính sẵn bằng lý thuyết sóng tuyến tính: phương trình phân tán ω² = g·k·tanh(kh), định luật Snell cho sóng, dò tia sóng (RK4, bước 4 m) trên địa hình mũi đất – vịnh, hệ số khúc xạ Kr = √(b₀/b). Sóng mẫu giống prompt "biến dạng sóng" trước: H₀ = 1,5 m, T = 8 s, để hai animation nối tiếp nhau.
Ứng với file HTML: khuc_xa_song_HMO.html

```
Tạo MỘT FILE HTML ĐỘC LẬP (animation tương tác, tiếng Việt) giải thích hiện tượng KHÚC XẠ SÓNG: vì sao đỉnh sóng bị bẻ cong khi đi qua các đường đẳng sâu, vì sao sóng vào bờ gần như song song với bờ, và vì sao năng lượng sóng TẬP TRUNG VÀO MŨI ĐẤT trong khi VỊNH lại êm sóng. Người xem: sinh viên năm 1 ngành Hải dương học, đây là phần các em thấy khó nhất của chương Sóng. Giảng viên chiếu trên trình duyệt qua máy chiếu 4:3, vừa chạy vừa dừng để giảng.

Ý TƯỞNG XUYÊN SUỐT (mọi cảnh đều quay về câu này): "Phần đỉnh sóng ở nước nông chạy chậm, phần ở nước sâu vẫn chạy nhanh → đỉnh sóng xoay dần về phía nước nông."

=====================================================================
1. KỸ THUẬT (bắt buộc)
=====================================================================
- Một file .html duy nhất, chạy OFFLINE (không CDN, không tải font/ảnh ngoài; logo HMO nhúng base64 hoặc SVG inline từ Design System). Vanilla JS + Canvas 2D (mặt nước, đỉnh sóng, tia sóng) + SVG (nhãn, chú thích).
- Sân khấu cố định 1440 × 1080 px (4:3), tự co giãn vừa cửa sổ, giữ tỉ lệ.
- 60 fps bằng requestAnimationFrame. MỌI chuyển động là hàm của MỘT đồng hồ toàn cục: t += dt_khung × tốc_độ. Ở 1×, sóng chạy ĐÚNG THỜI GIAN THỰC (chu kỳ 8 s là 8 giây thật). Đổi tốc độ nội suy trong 0,3 s. Tua ngược được (thanh thời gian).
- Toàn bộ tia sóng và đỉnh sóng tính MỘT LẦN khi tải trang (và khi đổi thông số ở cảnh thử nghiệm), không tính lại mỗi khung hình.

=====================================================================
2. NHẬN DIỆN HMO (theo Design System HMO / skill hmo-brand-apply)
=====================================================================
Màu (dùng đúng mã):
- Navy #0A2E5C (thanh tiêu đề, chân trang, nước sâu nhất) · Ocean #1B4E8F (nước sâu vừa, tia sóng) · Sky #60C0F0 (điểm nhấn phụ, số liệu, năng lượng thấp) · SkyLight #A8D8F0 (nước nông, nền thẻ) · Orange #F07800 (CHỈ là điểm nhấn: đỉnh sóng được theo dõi, mũi tên tốc độ, năng lượng cao) · White #FFFFFF (nền mọi cảnh) · Ink #0F1E3A (chữ thân) · Slate #546E8F (chú thích, trục) · Line #D5E1F0 (lưới, khung).
- Màu phụ ngoài brand, chỉ dùng cho địa hình: cát #E8D3A2, ghềnh đá mũi đất #9C8F80, bọt sóng vỡ #FFFFFF viền Slate.
- KHÔNG dùng #000000; KHÔNG dùng Orange làm nền; KHÔNG gạch chân tiêu đề; KHÔNG căn giữa chữ thân (căn trái).

Khung cố định mỗi cảnh (tỉ lệ đúng theo slide HMO 720×540 pt, nhân 2):
- Thanh tiêu đề Navy: x 0, y 0, 1440 × 122 px. Logo HMO (bản không có URL) góc trái: x 8, y 8, cao 106 px, rộng theo tỉ lệ 1,60:1 (≈ 170 px). Không đổi màu, không kéo méo, không thêm bóng, giữ nguyên quần đảo Hoàng Sa, Trường Sa trên quả cầu.
- Tiêu đề cảnh: bắt đầu x = 184, chữ trắng, đậm, căn trái, căn giữa theo chiều dọc thanh.
- Sọc cam: y 122, cao 12 px, Orange.
- Chân trang Navy: y 1040, cao 40 px. Trái: "HMO | HUS VNU" chữ trắng 22 px. Phải: "Cảnh 3/8 · Khúc xạ sóng" chữ Sky 22 px.
- Vùng nội dung: y = 146 → 960. Thanh điều khiển: y = 968 → 1036 (trên chân trang).
- Font: Calibri, "Segoe UI", Arial, sans-serif.

CỠ CHỮ CHO MÁY CHIẾU 4:3: tiêu đề cảnh 44 px; chú thích và hộp thông điệp ≥ 34 px; nhãn trên hình ≥ 28 px; số trong bảng ≥ 30 px; dòng nguồn, ghi chú tỉ lệ ≥ 22 px (nghiêng, Slate). Chú thích tối đa 2 dòng, ≤ 20 từ; dài hơn thì tách thành 2 chú thích nối tiếp. Mỗi lúc tối đa 2 chú thích (hộp trắng bo góc 12 px, viền Line, đường dẫn trỏ đúng vị trí, fade 0,4 s).

=====================================================================
3. BẢNG ĐIỀU KHIỂN
=====================================================================
- ⏮ Cảnh trước | ⏯ Phát/Dừng | ⏭ Cảnh sau | ↺ Chạy lại cảnh.
- Tốc độ: 0,25× · 0,5× · 1× · 2× · 4× · 8×.
- Thanh thời gian kéo được, 8 mốc cảnh bấm để nhảy tới.
- Công tắc: [Đỉnh sóng] [Tia sóng] [Đường đẳng sâu] [Tô màu độ sâu] [Nhãn] [Dừng sau mỗi cảnh] (mặc định tất cả BẬT, riêng "Tia sóng" bật từ cảnh 4).
- Phím: Space hoặc "B" hoặc "." phát/dừng; ←/→ và PageUp/PageDown đổi cảnh (bút trình chiếu); ↑/↓ tốc độ; 1–8 nhảy cảnh; F toàn màn hình; R bật/tắt tia sóng; L nhãn; T thẻ tổng kết.
- Toàn màn hình: thanh điều khiển và con trỏ tự ẩn sau 3 s không di chuột.
- Màn hình chờ khi mở file: nền Navy, logo HMO lớn ở giữa (cao 200 px), tiêu đề trắng "KHÚC XẠ SÓNG — Vì sao mũi đất hứng sóng, vịnh lại êm?", nút lớn "▶ Bắt đầu" viền Orange.

=====================================================================
4. VẬT LÝ (dùng đúng các số này)
=====================================================================
Sóng: H₀ = 1,5 m; T = 8 s; g = 9,81 m/s²; ω = 2π/T = 0,785 rad/s. Biên ngoài khơi là độ sâu 50 m (≈ nước sâu: L₀/2 = 50 m).
Tại mỗi độ sâu h: giải k từ ω² = g·k·tanh(k·h) bằng Newton (5–8 vòng). L = 2π/k; c = ω/k; n = ½·(1 + 2kh/sinh 2kh); cg = n·c.
Biến dạng: Ks = √(cg₅₀/cg). Khúc xạ: Kr = √(b₀/b), b là khoảng cách giữa hai tia sóng kề nhau. H = H₀·Ks·Kr.
Sóng vỡ khi H/h = 0,78.

4A. BỜ THẲNG, ĐƯỜNG ĐẲNG SÂU SONG SONG (cảnh 1, 3, 4)
- Hệ tọa độ: x vuông góc bờ (dương hướng vào bờ), y dọc bờ. h(x) = 50 m khi x ≤ 0; h = 0,025·(2000 − x) khi 0 < x < 2000 (dốc 1:40, đường bờ x = 2000 m). Đường đẳng sâu 20 m ở x = 1200; 10 m ở x = 1600; 5 m ở x = 1800.
- Sóng tới xiên θ₀ = 45° so với pháp tuyến bờ tại h = 50 m.
- Định luật Snell: sinθ / c = sin45° / 12,45 = hằng số → θ giảm dần khi c giảm.
- Pha chính xác (đỉnh sóng liền mạch, không đứt): k_y = k₅₀·sin45° (không đổi); k_x(x) = √(k(x)² − k_y²); S(x,y) = k_y·y + ∫₀ˣ k_x dx. Mặt nước η = (H/2)·cos(S − ω·t). Đỉnh sóng thứ n là đường S − ω·t = −2π·n.
- Bảng kiểm tra (phải khớp):
  h (m) | L (m) | c (m/s) | θ (°) | Ks   | Kr   | H (m)
  50    | 99,6  | 12,45   | 45,0  | 1,00 | 1,00 | 1,50
  30    | 96,1  | 12,01   | 43,0  | 0,96 | 0,98 | 1,41
  20    | 88,8  | 11,10   | 39,1  | 0,93 | 0,96 | 1,33
  10    | 70,9  |  8,86   | 30,2  | 0,94 | 0,91 | 1,28
  5     | 53,1  |  6,64   | 22,1  | 1,03 | 0,87 | 1,35
  3     | 42,0  |  5,25   | 17,4  | 1,14 | 0,86 | 1,47
  2     | 34,7  |  4,34   | 14,3  | 1,24 | 0,85 | 1,59  (H/h = 0,79 → sóng vỡ quanh đây)
- Khoảng cách tia: hai tia cách nhau b₀ = 100 m ngoài khơi → tại h = 2 m cách nhau b = 100·cos14,3°/cos45° = 137 m.

4B. MŨI ĐẤT – VỊNH (cảnh 5, 6, 7)
- Cùng hệ tọa độ, miền y = 0 → 3000 m, x = −1100 → 2300 m. Mũi đất ở giữa (y = 1500), hai nửa vịnh ở hai bên (y = 0 và y = 3000 là đáy vịnh; điều kiện đối xứng ở hai biên).
- Địa hình cho dưới dạng VỊ TRÍ ĐƯỜNG ĐẲNG SÂU (đường đẳng sâu nhô ra biển ở mũi đất, lõm vào ở vịnh, độ nhô giảm dần ra khơi):
  x_c(h, y) = 1400 − 40·h − 800·e^(−h/60)·cos(2π·(y − 1500)/3000), với 0 ≤ h ≤ 50; h = 50 m ở phía ngoài.
  Để có h(x, y): với mỗi cột y, lấy mẫu h từ 0 đến 50 bước 0,025 m, tính x_c rồi nội suy ngược (x_c giảm đơn điệu theo h). Lưu lưới 5 m × 5 m; c(x,y) và gradient ∂c/∂x, ∂c/∂y tính sẵn trên lưới, nội suy song tuyến tính.
- Vị trí đường đẳng sâu (kiểm tra):
  h (m)      | 50    | 20    | 10    | 5     | 3     | 0 (đường bờ)
  Mũi đất    | −948  |   27  |  323  |  464  |  520  |  600
  Đáy vịnh   | −252  | 1173  | 1677  | 1936  | 2041  | 2200
  → Phần đỉnh sóng trước mũi đất "chạm" đường đẳng sâu 20 m sớm hơn phần trước vịnh 1.146 m.
- Dò tia sóng: 61 tia, xuất phát x = −1100, y₀ = 0, 50, 100 … 3000 m, hướng ban đầu θ = 0 (sóng tới vuông góc bờ chung). Tích phân RK4 theo quãng đường s, bước 4 m, dừng khi h ≤ 1,5 m:
  dx/ds = cosθ;  dy/ds = sinθ;  dθ/ds = (1/c)·(sinθ·∂c/∂x − cosθ·∂c/∂y).
  Trên mỗi tia lưu pha S(s) = ∫ k ds. Đỉnh sóng thứ n tại thời điểm t = nối các điểm có S = ω·t − 2π·n trên các tia kề nhau (nội suy dọc tia) → đỉnh sóng luôn LIỀN MẠCH và luôn VUÔNG GÓC với tia sóng.
- Bảng kiểm tra tại đường đẳng sâu 3 m (phải khớp ±3%):
  Tia xuất phát y₀ | Cắt đường 3 m tại (x, y) | Góc tia θ | b (m) | Kr   | H (m) | Năng lượng/m bờ (so với ngoài khơi)
  1500 (mũi đất)  | (520, 1500)              |  0°       | 31,5  | 1,26 | 2,15  | 1,58
  1400            | (527, 1436)              |  6°       | 32,4  | 1,24 | 2,12  | 1,54
  1200            | (591, 1296)              | 19°       | 42,8  | 1,08 | 1,84  | 1,12
  1000            | (735, 1133)              | 29°       | 58,6  | 0,92 | 1,57  | 0,81
  800             | (962,  956)              | 33°       | 72,4  | 0,83 | 1,42  | 0,64
  400             | (1561, 573)              | 33°       | 86,4  | 0,76 | 1,30  | 0,52
  0 (đáy vịnh)    | (2044,    0)             |  4°       | 95,3  | 0,72 | 1,23  | 0,52
  (Ks tại 3 m = 1,136; b₀ = 50 m.)
- Dọc tia mũi đất: h 20 m → Kr 1,03, H 1,43 m; h 10 m → Kr 1,10, H 1,56 m; h 5 m → Kr 1,20, H 1,85 m.
  Dọc tia đáy vịnh: h 20 m → Kr 0,96, H 1,33 m; h 10 m → Kr 0,86, H 1,22 m; h 5 m → Kr 0,77, H 1,20 m.
- Hội tụ năng lượng: dải đỉnh sóng rộng 850 m ngoài khơi (y₀ = 1080 → 1920) đổ vào 600 m bờ quanh mũi đất (y = 1200 → 1800); trong khi 600 m bờ ở đáy vịnh chỉ nhận 360 m đỉnh sóng ngoài khơi.
- Sóng vỡ: mũi đất vỡ ở h ≈ 2,8 m, H_b ≈ 2,2 m; đáy vịnh vỡ ở h ≈ 1,75 m, H_b ≈ 1,3 m. Năng lượng tỉ lệ H²: (2,2/1,3)² ≈ 2,9 lần.

=====================================================================
5. KỊCH BẢN (≈ 6 phút ở tốc độ mặc định)
=====================================================================
Hình chính là HÌNH NHÌN TỪ TRÊN XUỐNG: biển ở trên, đất liền ở dưới, sóng chạy từ trên xuống. Tô màu độ sâu theo dải liên tục: 50 m Navy → 20 m Ocean → 5 m SkyLight → 0 m gần trắng; đường đẳng sâu nét chấm trắng mảnh, có nhãn "50 m · 20 m · 10 m · 5 m · 3 m". Đỉnh sóng vẽ bằng đường trắng dày 3 px; MỘT đỉnh sóng được theo dõi vẽ Orange dày 6 px ("đỉnh cam"). Có thước tỉ lệ "500 m" và mũi tên "Hướng sóng tới".

CẢNH 1 — "Câu hỏi" (≈ 15 s, bờ thẳng 4A, chạy 4×)
- Đoàn sóng ngoài khơi chạy xiên 45°; càng vào gần bờ đỉnh sóng càng xoay song song bờ.
- Hai thước đo góc nhỏ: ngoài khơi "45°", sát bờ "14°".
- Hộp câu hỏi lớn: "Ngoài khơi sóng chạy xiên 45°. Vì sao vào tới bờ gần như song song bờ?"
- Ghi chú nhỏ: "Bạn có thể kiểm chứng: ra bãi biển nhìn, đỉnh sóng hầu như luôn song song với mép nước."

CẢNH 2 — "Nước càng nông, sóng càng chậm" (≈ 25 s)
- Nửa trên: mặt cắt đứng, đáy dốc từ 50 m lên 2 m; trên đó 5 con sóng cùng chu kỳ 8 s, bước sóng ngắn dần.
- Nửa dưới: biểu đồ cột tốc độ c theo độ sâu: 50 m → 12,45 m/s · 20 m → 11,10 · 10 m → 8,86 · 5 m → 6,64 · 2 m → 4,34 m/s. Cột tô Ocean, số Orange.
- Chú thích 1: "Ở nước nông, c ≈ √(g·h): h = 2 m → √(9,81 × 2) = 4,4 m/s."
- Chú thích 2: "Đáy nông hơn → sóng chậm hơn. Đó là toàn bộ bí mật của khúc xạ."

CẢNH 3 — "Một đỉnh sóng, hai tốc độ" (CẢNH TRỌNG TÂM; tự chạy 0,5×, dừng mỗi bước)
- Bờ thẳng 4A, phóng to vùng x = 1100 → 1900 m. Chỉ còn đỉnh cam.
- Hai chấm trên cùng đỉnh cam: A ở chỗ sâu 20 m, B ở chỗ sâu 5 m. Mũi tên tốc độ: A "11,1 m/s" (dài), B "6,6 m/s" (ngắn, tỉ lệ đúng).
- Bước 1: vẽ "bóng mờ" vị trí đỉnh tại t; cho chạy đúng 8 s (một chu kỳ); vẽ vị trí mới. Đo: A đi 88,8 m; B chỉ đi 53,1 m. Chú thích: "Trong 8 giây, đầu A đi xa hơn đầu B 35,7 m."
- Bước 2: tô vùng tam giác chênh lệch giữa hai vị trí đỉnh (Orange 25% độ đậm). Đỉnh xoay một góc, hiện cung tròn góc xoay. Chú thích: "Đầu ở nước sâu 'vượt lên', đỉnh sóng xoay về phía nước nông."
- Bước 3 — hai ví dụ đời thường (khung nhỏ bên phải, hoạt hình đơn giản bằng hình tròn và hình chữ nhật):
  (a) Hàng 5 sinh viên khoác tay nhau đi chéo từ sân bê tông vào bãi cát: người chạm cát trước bước chậm lại → cả hàng tự xoay, cuối cùng song song với mép cát.
  (b) Ô tô chạy xiên, bánh phải sa vào cát lún trước → xe bị kéo quay về phía bánh chậm.
- Thông điệp chốt (hộp Navy chữ trắng): "Phần ở nước nông đi chậm, phần ở nước sâu đi nhanh → đỉnh sóng luôn bẻ cong về phía nước nông."

CẢNH 4 — "Tia sóng và định luật Snell" (≈ 40 s, chạy 2×)
- Bật tia sóng: đường Ocean mảnh, mũi tên, luôn vuông góc với đỉnh sóng. Chú thích: "Tia sóng chỉ hướng truyền năng lượng — luôn vuông góc với đỉnh sóng."
- Tại mỗi đường đẳng sâu 30 · 20 · 10 · 5 · 3 m: thước đo góc nhỏ giữa tia và pháp tuyến đường đẳng sâu, số θ hiện lần lượt: 43,0° · 39,1° · 30,2° · 22,1° · 17,4°.
- Bảng bên phải theo dõi đỉnh cam: h, c, θ, Kr, H (cập nhật liên tục, dùng đúng bảng 4A).
- Công thức (hộp góc): "sinθ / c = hằng số (định luật Snell — giống ánh sáng đi qua lăng kính)". Ví dụ tính: "h = 2 m: sinθ = 0,707 × 4,34 / 12,45 = 0,246 → θ = 14,3°."
- Hai tia kề nhau được tô dải "ống năng lượng" SkyLight 40%: ngoài khơi rộng 100 m, sát bờ rộng 137 m. Chú thích: "Năng lượng giữa hai tia không thoát ra ngoài. Ống rộng ra → năng lượng mỗi mét loãng đi → H nhỏ hơn (Kr = 0,85)."

CẢNH 5 — "Khi đường đẳng sâu cong: mũi đất và vịnh" (≈ 60 s, chạy 4×)
- Chuyển sang địa hình 4B. Mũi đất vẽ màu ghềnh đá, hai bên vịnh là bãi cát. Hiện đường đẳng sâu lần lượt từ 50 m vào bờ.
- Chú thích 1: "Trước mũi đất, các đường đẳng sâu nhô ra biển; trong vịnh, chúng lùi sâu vào trong."
- Thước đo dọc hai bên: đường 20 m trước mũi đất ở x = 27 m; trong vịnh ở x = 1.173 m — lùi vào trong 1.146 m. Chú thích 2: "Phần đỉnh sóng trước mũi đất 'chạm đáy' sớm hơn 1,1 km."
- Đỉnh sóng thẳng ngoài khơi chạy vào: phần giữa (trước mũi đất) chậm lại trước, hai bên vẫn nhanh → đỉnh sóng cong lại, ÔM LẤY mũi đất như hình chữ U úp ngược.
- Dừng 3 s khi đỉnh cam cắt đường 10 m ở mũi đất (x = 323 m); hiện hai mũi tên tốc độ: tại mũi đất "8,9 m/s", cùng đỉnh đó trong vịnh (vẫn ở nước sâu hơn) "≈ 12 m/s".
- Bật tia sóng: 61 tia hội tụ về mũi đất, tỏa ra trong vịnh. Chú thích 3: "Tia sóng bẻ về phía nước nông → dồn vào mũi đất, tỏa ra trong vịnh."

CẢNH 6 — "Năng lượng dồn về mũi đất" (≈ 45 s)
- Tô 2 "ống năng lượng": ống cam từ dải ngoài khơi rộng 850 m thu lại vào 600 m bờ mũi đất; ống xanh Sky: 360 m ngoài khơi trải ra 600 m bờ đáy vịnh. Nhãn số rõ ràng.
- Dải màu năng lượng chạy dọc đường bờ (dày 18 px): Sky (thấp) → Orange (cao), có chú giải "Năng lượng sóng trên 1 m bờ, so với ngoài khơi: 0,5 … 1,6".
- Hai cột so sánh (tại độ sâu 3 m): MŨI ĐẤT H = 2,15 m, năng lượng 1,58 · ĐÁY VỊNH H = 1,23 m, năng lượng 0,52. Chú thích: "Cùng một đoàn sóng, mũi đất nhận năng lượng gấp 3 lần đáy vịnh."
- Hiện sóng vỡ: bọt trắng ở mũi đất xuất hiện sớm (h ≈ 2,8 m, sóng cao 2,2 m), trong vịnh muộn và nhỏ (h ≈ 1,75 m, sóng cao 1,3 m).
- Ví dụ đời thường: "Mũi đất như kính lúp hội tụ ánh nắng vào một điểm; vịnh như thấu kính phân kỳ làm tia sáng tỏa ra."
- Câu nhắc quan trọng: "Khúc xạ KHÔNG tạo thêm năng lượng — chỉ phân bố lại: chỗ này dồn lại thì chỗ khác loãng đi."

CẢNH 7 — "Hệ quả: bờ biển tự 'là phẳng'" (≈ 30 s)
- Tua nhanh minh họa (không phải mô phỏng, ghi rõ "minh họa định tính"): mũi đất bị xói thành vách đá, ghềnh đá; cát được đưa vào vịnh thành bãi cát rộng; đường bờ dần thẳng hơn.
- Ba thẻ ứng dụng:
  1. "Mũi đất: sóng lớn, xói lở mạnh → vách đá, ghềnh đá; câu cá trên ghềnh rất nguy hiểm."
  2. "Vịnh: sóng nhỏ, cát bồi → bãi tắm, nơi neo đậu tàu thuyền, bến cảng."
  3. "Kỹ sư bờ biển tính khúc xạ trước khi đặt kè, đê chắn sóng, khu nuôi trồng."
- Ghi chú: "Dọc bờ Biển Đông của Việt Nam, kiểu 'mũi đá xen bãi cát' rất phổ biến ở Trung Bộ."

CẢNH 8 — "Thử nghiệm" + tổng kết
- Chế độ bờ thẳng: thanh trượt θ₀ (0–60°) và T (6–14 s). Bảng hiện θ, H tại 10 · 5 · 2 m. Giá trị kiểm tra (θ₀ đo tại 50 m):
  T 8 s, θ₀ 30° → θ 20,9° · 15,5° · 10,0°; H 1,36 · 1,47 · 1,74 m.
  T 8 s, θ₀ 60° → θ 38,1° · 27,5° · 17,6°; H 1,13 · 1,16 · 1,34 m.
  T 12 s, θ₀ 45° → θ 23,0° · 16,5° · 10,5°; H 1,49 · 1,67 · 2,03 m.
  T 6 s, θ₀ 45° → θ 37,5° · 28,6° · 18,8°; H 1,29 · 1,27 · 1,41 m.
- Chế độ mũi đất: nút T = 6 · 8 · 12 s, tính lại tia sóng (≤ 1 s, có biểu tượng chờ). Chú thích: "Sóng chu kỳ dài 'cảm nhận' đáy từ xa hơn (L₀/2: 28 m · 50 m · 112 m) → bị khúc xạ mạnh hơn."
- Câu hỏi cho lớp (hộp góc): "Sóng lừng chu kỳ 12 s và sóng gió chu kỳ 6 s — loại nào dồn vào mũi đất mạnh hơn? Bấm thử."
- 4 thẻ tổng kết (phím T hiện/ẩn):
  1. "Nước nông → sóng chậm (c ≈ √(gh))."
  2. "Phần nông chậm, phần sâu nhanh → đỉnh sóng xoay về phía nước nông."
  3. "Tia sóng hội tụ ở mũi đất (sóng lớn), phân kỳ trong vịnh (sóng nhỏ)."
  4. "Năng lượng không mất đi, chỉ phân bố lại → mũi đất bị xói, vịnh được bồi."
- Dòng nguồn (nghiêng, Slate, phía trên thanh điều khiển, hiện ở mọi cảnh): "Lý thuyết sóng tuyến tính; tia sóng tính theo Munk & Arthur (1952); số liệu minh họa với H₀ = 1,5 m, T = 8 s."

=====================================================================
6. LỖI CẦN TRÁNH
=====================================================================
- Đỉnh sóng KHÔNG được đứt đoạn, gãy khúc hay tách rời; số đỉnh sóng giữa biên ngoài khơi và đường vỡ không đổi.
- Tia sóng LUÔN vuông góc với đỉnh sóng; tia bẻ về phía nước NÔNG (không bao giờ ngược lại).
- Chu kỳ KHÔNG đổi; chỉ L và c thay đổi.
- KHÔNG nhầm khúc xạ với nhiễu xạ (sóng vòng qua vật cản) hay phản xạ; animation này không vẽ nhiễu xạ, không vẽ sóng phản xạ từ vách đá.
- KHÔNG cho sóng vỡ ngoài khơi; trước đường vỡ mặt nước liền, không bọt.
- KHÔNG vẽ năng lượng "sinh ra" ở mũi đất — luôn thể hiện bằng ống năng lượng thu hẹp/mở rộng.
- Ở bờ thẳng, H tại 10 m phải NHỎ hơn khi không có khúc xạ (1,28 m so với 1,40 m) — khúc xạ ở bờ thẳng làm sóng yếu đi chút ít.
- Thuật ngữ: khúc xạ sóng, đỉnh sóng, tia sóng, đường đẳng sâu, độ sâu, tốc độ pha c, độ cao sóng H, bước sóng L, chu kỳ T, mũi đất, vịnh, hội tụ, phân kỳ, đường sóng vỡ; nếu nhắc đến muối dùng "độ muối" (không dùng "độ mặn"); tên vùng biển chỉ ghi "Biển Đông".
```

## Kiểm tra sau khi Claude Design dựng xong
1. Cảnh 3: trong 8 s, chấm A đi 88,8 m, chấm B đi 53,1 m (chênh 35,7 m).
2. Cảnh 4: góc tia tại đường 10 m = 30,2°, tại 2 m = 14,3°; bảng H tại 10 m = 1,28 m.
3. Cảnh 5: đường đẳng sâu 20 m ở x = 27 m (mũi đất) và x = 1.173 m (đáy vịnh); đỉnh sóng ôm lấy mũi đất, không gãy.
4. Cảnh 6: tại 3 m, mũi đất H = 2,15 m, Kr = 1,26; đáy vịnh H = 1,23 m, Kr = 0,72; tỉ lệ năng lượng ≈ 3.
5. Tia y₀ = 800 m cắt đường 3 m tại khoảng (962, 956) với góc ≈ 33°.
6. Cảnh 8: T = 12 s, θ₀ = 45° cho θ = 10,5° tại 2 m.
7. Logo HMO đúng màu, đủ Hoàng Sa – Trường Sa; nền trắng; Orange chỉ là điểm nhấn.
8. Chú thích ≥ 34 px, nhãn ≥ 28 px; chạy được khi rút mạng; PageDown/PageUp đổi cảnh; 0,25× vẫn mượt, tua ngược được.
