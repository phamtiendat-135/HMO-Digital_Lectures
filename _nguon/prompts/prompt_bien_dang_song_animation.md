# Prompt Claude Design – Animation biến dạng sóng vùng nước nông và sóng vỡ (HDHDC, chương Sóng biển)

Cách dùng: mở Claude Design → chọn Design System **HMO** → dán toàn bộ khối prompt bên dưới.
Mọi con số đã tính bằng lý thuyết sóng tuyến tính (giải phương trình phân tán ω² = g·k·tanh(kh), hệ số biến dạng Ks = √(cg₀/cg), tiêu chuẩn vỡ McCowan H/h = 0,78). Sóng mẫu: H₀ = 1,5 m, T = 8 s — cỡ sóng thường gặp ở bãi biển miền Trung.
Ứng với file HTML: bien_dang_song_vo.html

```
Tạo MỘT FILE HTML ĐỘC LẬP (animation tương tác, tiếng Việt) mô phỏng sự BIẾN ĐỔI CỦA SÓNG GIÓ KHI ĐI TỪ NƯỚC SÂU VÀO BỜ: độ cao sóng H, bước sóng L, tốc độ pha c thay đổi thế nào, và TẠI SAO SÓNG VỠ trong vùng sóng đổ. Người xem: sinh viên năm 1 ngành Hải dương học; giảng viên chiếu trực tiếp trên trình duyệt qua máy chiếu 4:3, vừa chạy vừa dừng để giảng.

=====================================================================
1. KỸ THUẬT (bắt buộc)
=====================================================================
- Một file .html duy nhất, chạy OFFLINE (không CDN, không tải font/ảnh). Vanilla JS + Canvas 2D (sóng) + SVG (nhãn). Font: "Be Vietnam Pro", "Segoe UI", Arial, sans-serif.
- Sân khấu cố định 1440 × 1080 px (4:3), tự co giãn vừa cửa sổ, giữ tỉ lệ.
- 60 fps bằng requestAnimationFrame. MỌI chuyển động là hàm của MỘT đồng hồ toàn cục: t += dt_khung × tốc_độ. Ở tốc độ 1×, sóng chạy ĐÚNG THỜI GIAN THỰC (chu kỳ 8 s là 8 giây thật). Đổi tốc độ nội suy trong 0,3 s.
- Dùng Design System HMO. Nếu thiếu: Navy #0A2E5C, Ocean #1B4E8F, Sky #60C0F0, Orange #F07800 (con sóng được đánh dấu, điểm nhấn), Ink #0F1E3A, Slate #546E8F, đỏ #D7263D (điểm vỡ), cát #E8D3A2.
- CỠ CHỮ CHO MÁY CHIẾU 4:3: tiêu đề cảnh ≥ 44 px; chú thích và hộp thông điệp ≥ 36 px; nhãn trên hình ≥ 30 px; số trong bảng ≥ 32 px; dòng nguồn và ghi chú tỉ lệ ≥ 22 px. Chú thích tối đa 2 dòng, ≤ 20 từ; dài hơn thì tách thành 2 chú thích nối tiếp. Mỗi lúc tối đa 2 chú thích (hộp trắng bo góc, đường dẫn trỏ đúng vị trí, fade 0,4 s).

=====================================================================
2. BẢNG ĐIỀU KHIỂN (thanh dưới đáy, cao 72 px)
=====================================================================
- ⏮ Cảnh trước | ⏯ Phát/Dừng | ⏭ Cảnh sau | ↺ Chạy lại.
- Tốc độ: 0,25× · 0,5× · 1× · 2× · 4×.
- Thanh thời gian kéo được, 7 mốc cảnh bấm để nhảy tới.
- Chọn bờ: [Thoải 1:50] [Vừa 1:10] [Dốc 1:2] — mặc định Thoải 1:50 (đổi bờ thì tính lại toàn bộ, chuyển hình mượt 1 s).
- Công tắc: [Nhãn] [Quỹ đạo hạt nước] [Dừng sau mỗi cảnh] (mặc định BẬT).
- Phím: Space phát/dừng; ←/→ và PageUp/PageDown đổi cảnh (hỗ trợ bút trình chiếu); "B" hoặc "." phát/dừng; ↑/↓ tốc độ; 1–7 nhảy cảnh; F toàn màn hình; L nhãn.
- Khi toàn màn hình: thanh điều khiển và con trỏ tự ẩn sau 3 s không di chuột.
- Màn hình chờ khi mở file: tiêu đề + nút lớn "▶ Bắt đầu".
- Góc trên phải: đồng hồ "Thời gian thực: 1 phút 24 s" (1× = thời gian thật).

=====================================================================
3. VẬT LÝ VÀ HÌNH HỌC (dùng đúng các số này)
=====================================================================
Sóng tới (nước sâu): H₀ = 1,5 m; T = 8 s; g = 9,81 m/s².
→ L₀ = g·T²/(2π) = 99,9 m; c₀ = L₀/T = 12,5 m/s (45 km/h); cg₀ = c₀/2 = 6,25 m/s; độ dốc H₀/L₀ = 0,015.

Địa hình (truyền sóng vuông góc bờ, không xét khúc xạ):
- x = 0 → 800 m: h giảm 50 → 10 m (dốc 1:20).
- x > 800 m: mặt bờ dốc theo lựa chọn — 1:50 (đường bờ ở x = 1.300 m), 1:10 (x = 900 m), 1:2 (x = 820 m). Sau đường bờ là bãi cát khô dốc lên.

Tính toán (thực hiện khi tải trang, lưới Δx = 0,5 m):
- Tại mỗi điểm giải k từ ω² = g·k·tanh(k·h), ω = 2π/T, bằng lặp Newton (5–8 vòng). L = 2π/k; c = ω/k; n = ½·(1 + 2kh/sinh 2kh); cg = n·c.
- Hệ số biến dạng Ks = √(cg₀/cg); H = H₀·Ks.
- Pha tích lũy θ(x) = ∫₀ˣ k dx. Mặt nước: η(x,t) = (H/2)·cos(θ(x) − ω·t) — nhờ đó các đỉnh sóng LIÊN TỤC, bước sóng tự co lại, không bị "đứt" khi đổi độ sâu.
- Làm nhọn đỉnh khi vào nông: cộng hài bậc 2 a₂·cos(2(θ − ωt)) với a₂ = 0,35·(H/2)·min(1, Ur/150), Ur = H·L²/h³ (số Ursell). Kết quả: đỉnh nhọn, chân sóng bẹt — đúng hình dạng sóng nước nông.
- Điểm vỡ x_b: nơi H/h đạt 0,78 lần đầu. Trong 30 m trước x_b, mặt trước của sóng dốc dần đến thẳng đứng (méo pha: φ' = φ − s·sin φ, s tăng 0 → 0,9).
- Sau điểm vỡ: H = 0,78·h (sóng bão hòa, giảm dần theo độ sâu), đỉnh thành dải bọt trắng (sóng dạng bore).

Bảng kiểm tra (phải khớp, bờ 1:50):
 h (m) | L (m) | c (m/s) | H (m) | H/L   | H/h
 50    | 99,6  | 12,45   | 1,49  | 0,015 | 0,03
 20    | 88,8  | 11,10   | 1,38  | 0,016 | 0,07
 ≈16   |  —    |  —      | 1,37  ← H NHỎ NHẤT (giảm nhẹ trước khi tăng)
 10    | 70,9  |  8,86   | 1,40  | 0,020 | 0,14
 5     | 53,1  |  6,64   | 1,53  | 0,029 | 0,31
 3     | 42,0  |  5,25   | 1,69  | 0,040 | 0,56
 2,29  | 37,0  |  4,62   | 1,79  | 0,048 | 0,78  ← SÓNG VỠ
Điểm vỡ: h_b = 2,29 m; cách đường bờ 114 m (bờ 1:50) hoặc 23 m (bờ 1:10). Một đỉnh sóng đi từ x = 0 tới điểm vỡ mất 126 s (bờ 1:50) hoặc 81 s (bờ 1:10).

=====================================================================
4. BỐ CỤC (1440 × 1080)
=====================================================================
- Thanh tiêu đề Navy cao 80 px, sọc cam 6 px; tiêu đề đổi theo cảnh.
- PANEL TOÀN CẢNH (y = 90–520): mặt cắt từ x = 0 đến bãi cát. Ghi góc dưới trái: "Không theo tỉ lệ: độ sâu phóng đại 6 lần, độ cao sóng phóng đại 18 lần". Trục trên ghi độ sâu tại các mốc 50 · 20 · 10 · 5 · 2 m. Một đỉnh sóng được đánh dấu bằng chấm cam và vệt cam mảnh (gọi là "sóng cam") để mắt theo dõi.
- KÍNH LÚP TỈ LỆ THẬT (góc dưới trái, 700 × 380 px): khung 60 m × 30 m, tỉ lệ 1:1, camera bám theo sóng cam. Khi còn ở nước sâu, đáy nằm ngoài khung: hiện mũi tên "đáy ở độ sâu … m". Ghi chú: "Tỉ lệ thật — sóng ngoài khơi trông rất thoải là đúng."
- BẢNG SỐ LIỆU (góc dưới phải, 680 × 380 px): số đo tại vị trí sóng cam — h, L, c, H, T, H/L, H/h (cập nhật liên tục, mỗi dòng có thanh ngang nhỏ). Bên dưới: biểu đồ 3 đường H/H₀ (cam), L/L₀ (xanh Sky), c/c₀ (Navy) theo khoảng cách x, vẽ dần theo sóng cam; vạch đỏ đứng tại x_b.
- Dòng nguồn (chữ nghiêng Slate, trên thanh điều khiển): "Lý thuyết sóng tuyến tính; tiêu chuẩn vỡ McCowan (1894); phân loại sóng vỡ theo số Iribarren — Battjes (1974)."

=====================================================================
5. KỊCH BẢN (≈ 4 phút ở tốc độ 1×)
=====================================================================

CẢNH 1 — "Sóng ở nước sâu" (≈ 20 s)
- Đoàn sóng đều chạy từ trái sang. Các hạt nước (chấm trắng, 5 cột × 6 hàng) chuyển động theo QUỸ ĐẠO TRÒN; vòng tròn nhỏ dần theo độ sâu.
- Chú thích 1: "Hạt nước chỉ quay tròn tại chỗ — sóng truyền năng lượng, không mang nước đi."
- Chú thích 2: "Ở độ sâu L/2 = 50 m, quỹ đạo chỉ còn 4% — đáy không 'cảm thấy' sóng."
- Góc trên: L₀ = 9,81 × 8² / 6,28 = 99,9 m; c₀ = 12,5 m/s.

CẢNH 2 — "Sóng chạm đáy" (≈ 20 s)
- Panel toàn cảnh tô 3 dải màu nhạt theo độ sâu: NƯỚC SÂU (h > L₀/2 = 50 m) · TRUNG GIAN · NƯỚC NÔNG (h < L₀/20 = 5 m).
- Quỹ đạo hạt nước đổi dần: tròn → elip dẹt → sát đáy chỉ còn đường thẳng tới–lui.
- Chú thích: "Ma sát với đáy hãm chân sóng — sóng bắt đầu biến dạng."

CẢNH 3 — "H, L, c thay đổi thế nào?" (126 s thời gian thực; mặc định chạy 2×)
- Sóng cam đi từ x = 0 tới điểm vỡ. Bảng số liệu và biểu đồ cập nhật liên tục.
- Hai "máy đếm đỉnh" đặt ở h = 50 m và h = 5 m, mỗi lần đỉnh đi qua nháy sáng và đếm. Cả hai đều ghi "T = 8,0 s". Chú thích: "Chu kỳ KHÔNG ĐỔI. c = L/T: L ngắn lại thì c giảm."
- Khi sóng cam tới h ≈ 16 m: dừng 2 s. Chú thích: "H giảm nhẹ còn 1,37 m — năng lượng tạm dàn mỏng vì cg tăng." (Chi tiết tinh tế: H không tăng ngay.)
- Khi tới h = 5 m: chú thích "L: 100 → 53 m; c: 12,5 → 6,6 m/s; H: 1,5 → 1,53 m."
- Hộp ví dụ đời thường (hiện ở h ≈ 5 m): "Như dòng ô tô từ cao tốc 100 km/h vào đường làng 30 km/h: xe chậm lại thì dồn sát nhau. Sóng chậm lại → năng lượng dồn lại → sóng cao lên."
- Công thức nhỏ góc bảng: "Thông lượng năng lượng E·cg không đổi, E = ρgH²/8 → H = H₀·√(cg₀/cg)."

CẢNH 4 — "Vì sao sóng vỡ?" (tự chạy 0,25×, kính lúp phóng to chiếm nửa dưới màn hình)
Trình bày 3 lý do, mỗi lý do một hộp đánh số, hiện lần lượt:
 ① "Sóng dốc lên: H/L tăng từ 0,015 lên 0,048 (gấp 3,2 lần)."
    Hiển thị hai hình sóng chồng nhau: sóng ngoài khơi (thoải) và sóng tại h = 2,3 m (dốc), cùng tỉ lệ thật.
 ② "Đỉnh đi nhanh hơn chân sóng."
    Hai mũi tên tốc độ trên sóng cam: ĐỈNH (nước sâu h + H/2 = 3,18 m) → c ≈ √(9,81 × 3,18) = 5,6 m/s; CHÂN SÓNG (h − H/2 = 1,40 m) → c ≈ √(9,81 × 1,40) = 3,7 m/s. Chú thích: "Đỉnh nhanh hơn chân ~50% → mặt trước dựng đứng, đỉnh đổ về phía trước."
 ③ "Không đủ nước bên dưới: H/h = 1,79/2,29 = 0,78 → VỠ."
    Thước đứng so sánh H và h ngay dưới sóng; khi tỉ số chạm 0,78 thước chuyển đỏ.
- Đoạn kết: mặt trước thẳng đứng, đỉnh vươn ra thành lưỡi nước cuộn xuống, bắn bọt trắng. Hạt nước ở đỉnh tách khỏi quỹ đạo, bay về trước. Chú thích: "Nước ở đỉnh chạy nhanh hơn chính con sóng → đổ nhào."

CẢNH 5 — "Ba kiểu sóng vỡ" (≈ 30 s; ba bờ hiện lần lượt, mỗi bờ 10 s, sau đó cho phép bấm chọn tự do)
- Số Iribarren ξ₀ = tanβ / √(H₀/L₀), với √0,015 = 0,122:
  • Bờ 1:50 → ξ₀ = 0,16 → VỠ TRÀN: bọt trắng tràn dần trên đỉnh, vỡ kéo dài trên quãng rộng (bãi tắm phẳng).
  • Bờ 1:10 → ξ₀ = 0,82 → VỠ CUỘN: đỉnh cuộn thành ống, đổ ập mạnh (sóng lướt ván).
  • Bờ 1:2 → ξ₀ = 4,1 → VỠ DÂNG: đỉnh không đổ, cả khối nước dâng lên mặt bờ rồi rút (kè, bờ đá).
- Thanh ngang ξ₀ có ngưỡng 0,5 và 3,3 (Battjes 1974), con trỏ trượt theo bờ đang chọn.
- Chú thích: "Bờ càng dốc, sóng vỡ càng gần bờ và càng mạnh: bờ 1:50 vỡ cách bờ 114 m; bờ 1:10 vỡ cách bờ 23 m."

CẢNH 6 — "Vùng sóng đổ và vùng sóng vỗ" (≈ 20 s)
- Sau điểm vỡ: dải bọt trắng (bore) chạy vào; H giảm theo H = 0,78·h (h = 2 m → 1,56 m; h = 1 m → 0,78 m).
- Nước trườn lên bãi cát rồi rút xuống (vùng sóng vỗ), để lại vệt ướt.
- Thanh phân vùng phía trên panel toàn cảnh: NGOÀI KHƠI · VÙNG BIẾN DẠNG SÓNG · ĐƯỜNG SÓNG VỠ · VÙNG SÓNG ĐỔ · VÙNG SÓNG VỖ.
- Chú thích: "Sau khi vỡ, nước mới thực sự chảy vào bờ — tạo dòng chảy ven bờ và vận chuyển bùn cát."

CẢNH 7 — "Thử nghiệm" + tổng kết
- Hai thanh trượt: H₀ (0,5–3,0 m) và T (5–14 s). Tính lại tức thì; bảng hiện h_b, H_b, L_b, khoảng cách điểm vỡ tới bờ, ξ₀ và kiểu vỡ.
  Giá trị kiểm tra: H₀ 1,5 m, T 8 s → h_b 2,29 m, H_b 1,79 m · H₀ 1,5 m, T 12 s → h_b 2,65 m, H_b 2,07 m · H₀ 3,0 m, T 8 s → h_b 4,08 m, H_b 3,18 m · H₀ 1,0 m, T 5 s → h_b 1,39 m, H_b 1,09 m.
- Gợi ý câu hỏi cho lớp (hộp góc): "Sóng lừng chu kỳ dài vỡ ở chỗ sâu hơn hay nông hơn? Thử kéo T lên 12 s."
- 4 thẻ tổng kết (bấm phím T để hiện/ẩn):
  1. "Vào nông: T giữ nguyên; L và c giảm."
  2. "Năng lượng dồn lại → H tăng (sau một đoạn giảm nhẹ)."
  3. "Đỉnh nhanh hơn chân, H/h chạm 0,78 → sóng vỡ."
  4. "Độ dốc bờ quyết định kiểu vỡ: tràn, cuộn hoặc dâng."

=====================================================================
6. LỖI CẦN TRÁNH
=====================================================================
- KHÔNG cho chu kỳ thay đổi; KHÔNG cho các đỉnh sóng sinh thêm hay biến mất trước điểm vỡ.
- KHÔNG cho H tăng đều ngay từ ngoài khơi — phải có đoạn giảm nhẹ quanh h ≈ 16 m.
- KHÔNG vẽ sóng cuộn bạc đầu ngoài khơi; trước điểm vỡ mặt nước liền, không bọt.
- Trước khi vỡ, hạt nước đi theo quỹ đạo khép kín (không trôi vào bờ).
- Thuật ngữ: độ cao sóng H (từ chân đến đỉnh), bước sóng L, chu kỳ T, tốc độ pha c, tốc độ nhóm cg, chân sóng, đỉnh sóng, đường sóng vỡ, vùng sóng đổ, vùng sóng vỗ; dùng "độ muối" (không dùng "độ mặn") nếu có nhắc tới; tên vùng biển chỉ ghi "Biển Đông".
```

## Kiểm tra sau khi Claude Design dựng xong
1. Bảng số liệu tại h = 10 m: L = 70,9 m, c = 8,86 m/s, H = 1,40 m.
2. Biểu đồ H/H₀ có điểm trũng (0,91) quanh h ≈ 16 m rồi mới tăng.
3. Bờ 1:50: sóng vỡ tại h = 2,29 m, cách bờ 114 m; bờ 1:10: cách bờ 23 m.
4. Hai máy đếm đỉnh đều ghi 8,0 s.
5. Kính lúp tỉ lệ thật: sóng ngoài khơi trông rất thoải (H/L = 0,015).
6. 0,25× ở cảnh 4 vẫn mượt; tua ngược được.
7. Thanh trượt T = 12 s cho h_b = 2,65 m.
8. Chú thích ≥ 36 px, nhãn ≥ 30 px; chạy được khi rút mạng; PageDown/PageUp đổi cảnh.
