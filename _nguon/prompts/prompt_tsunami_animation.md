# Prompt Claude Design – Animation sóng thần do động đất đới hút chìm (HDHDC, chương Sóng biển)

Cách dùng: mở Claude Design → chọn Design System **HMO** → dán toàn bộ khối prompt bên dưới.
Số liệu đã đối chiếu nguồn: NOAA NCEI (thống kê nguyên nhân), Fujiwara và nnk. 2011 (biến dạng đáy biển Tōhoku), Nguyễn Hồng Phương và nnk. 2014 (kịch bản rãnh Manila).
Ứng với file HTML: song_than_hut_chim_1.html

```
Tạo MỘT FILE HTML ĐỘC LẬP (animation tương tác, tiếng Việt) mô phỏng các nguyên nhân gây sóng thần, tập trung vào sóng thần do động đất tại đới hút chìm. Người xem: sinh viên năm 1 ngành Hải dương học; giảng viên trình chiếu trên lớp, vừa chạy vừa dừng để giảng.

=====================================================================
1. KỸ THUẬT (bắt buộc)
=====================================================================
- Một file .html duy nhất, chạy OFFLINE (không CDN, không tải font/ảnh từ mạng). Vanilla JS + SVG/Canvas 2D. Font: "Be Vietnam Pro", "Segoe UI", Arial, sans-serif — hiển thị đúng dấu tiếng Việt.
- Sân khấu cố định 1440 × 1080 px (4:3), tự co giãn vừa cửa sổ, giữ tỉ lệ; nút toàn màn hình.
- 60 fps bằng requestAnimationFrame. MỌI chuyển động là hàm của MỘT đồng hồ hoạt hình toàn cục: t_anim += dt_khung × tốc_độ. Nhờ vậy đổi tốc độ, tua, quay lui đều mượt; ở 0,25× chuyển động vẫn liền mạch, không giật.
- Khi đổi tốc độ, nội suy tốc độ trong 0,3 s (không nhảy đột ngột).
- Dùng Design System HMO. Nếu thiếu, dùng: Navy #0A2E5C, Ocean #1B4E8F, Sky #60C0F0, Orange #F07800 (điểm nhấn, đứt gãy), Ink #0F1E3A, Slate #546E8F, đỏ cảnh báo #D7263D.
- CỠ CHỮ CHO MÁY CHIẾU 4:3 (độ phân giải thật thường 1024 × 768): tiêu đề cảnh ≥ 44 px; chú thích và hộp thông điệp ≥ 36 px; nhãn trên hình ≥ 30 px; số trong bảng số liệu ≥ 32 px; dòng nguồn và ghi chú tỉ lệ ≥ 22 px (chỉ hai loại này được nhỏ). Chú thích viết ngắn, tối đa 2 dòng, ≤ 20 từ — nếu dài hơn thì tách thành 2 chú thích nối tiếp. Mỗi lúc tối đa 2 chú thích; chú thích là hộp trắng bo góc, viền mảnh, có đường dẫn trỏ đúng vị trí; hiện/ẩn bằng fade 0,4 s.

=====================================================================
2. BẢNG ĐIỀU KHIỂN (thanh dưới đáy, cao 72 px)
=====================================================================
- ⏮ Cảnh trước | ⏯ Phát/Dừng | ⏭ Cảnh sau | ↺ Chạy lại.
- Tốc độ: 0,25× · 0,5× · 1× · 2× · 4× (nút bấm, nút đang chọn tô cam).
- Thanh thời gian kéo được, có 8 mốc cảnh bấm để nhảy tới; rê chuột lên mốc hiện tên cảnh.
- Công tắc: [Nhãn] [Bảng số liệu] [Dừng sau mỗi cảnh] (mặc định BẬT — tự dừng cuối mỗi cảnh để giảng).
- Phím tắt: Space phát/dừng; ←/→ đổi cảnh; ↑/↓ tăng/giảm tốc độ; 1–8 nhảy cảnh; F toàn màn hình; L bật/tắt nhãn.
- Hỗ trợ bút trình chiếu (clicker): PageDown = cảnh sau, PageUp = cảnh trước, phím "B" hoặc "." = phát/dừng (các clicker phổ biến gửi đúng các phím này).
- Chế độ trình chiếu: khi toàn màn hình, thanh điều khiển và con trỏ chuột tự ẩn sau 3 s không di chuột, hiện lại khi di chuột. Phần hình không bị thanh điều khiển che.
- Màn hình chờ: khi mở file, hiện màn hình tiêu đề với nút lớn "▶ Bắt đầu" (để giảng viên mở sẵn trước giờ, bấm khi bắt đầu giảng).
- Góc trên phải: ĐỒNG HỒ THỜI GIAN THỰC, ví dụ "Thời gian thực: +12 phút 30 s" và dòng nhỏ "1 giây hoạt hình = 60 giây thực". Thang thời gian đổi theo cảnh (năm → giây → phút → giờ); khi đổi thang, đồng hồ nháy cam 0,5 s. Đây là ý giảng dạy quan trọng: ứng suất tích hàng trăm năm, đứt gãy trong vài phút, sóng lan trong hàng chục phút đến hàng giờ.

=====================================================================
3. PHONG CÁCH HÌNH ẢNH
=====================================================================
- Hiện đại, sạch, dạng khối 2,5D: mặt cắt đứng phía trước + một dải mặt trên phối cảnh nhẹ (như sơ đồ khối địa chất trong sách giáo khoa hiện đại).
- Nước biển: gradient Sky (mặt) → Ocean → Navy (đáy). Mặt nước có gợn sóng gió rất nhỏ, chậm để cảnh "sống".
- Vỏ đại dương: xám lục sẫm (bazan); vỏ lục địa: nâu vàng ấm; quyển mềm: gradient cam → đỏ trầm. Thêm vân hạt mịn để có chiều sâu, không lòe loẹt.
- Chuyển động dùng easing cubic in-out; không lắc khung hình, không âm thanh.
- Chuyển cảnh bằng chuyển động camera (zoom/pan mượt), không cắt cảnh đột ngột.
- Thanh tiêu đề Navy trên cùng, cao 80 px, sọc cam 6 px phía dưới; tiêu đề đổi theo cảnh.
- Dòng nguồn ở đáy (trên thanh điều khiển), chữ nghiêng màu Slate: "Số liệu: NOAA NCEI Global Historical Tsunami Database; Fujiwara và nnk. (2011), Science; Nguyễn Hồng Phương và nnk. (2014), Physics of the Earth and Planetary Interiors 236: 95–108."

=====================================================================
4. HÌNH HỌC VÀ VẬT LÝ (dùng đúng các số này)
=====================================================================
Trục ngang x (km): rãnh đại dương tại x = 0; đại dương mở bên TRÁI, đất liền bên PHẢI; đường bờ tại x = +180 km. Miền hiển thị x = −300 → +220 km.

Địa hình đáy (độ sâu h):
- x ≤ −50 km: 5.500 m (đồng bằng biển thẳm)
- −50 → 0 km: sâu dần 5.500 → 7.500 m (đáy rãnh tại x = 0)
- 0 → 150 km: nông dần tuyến tính 7.500 → 200 m (sườn lục địa)
- 150 → 180 km: 200 → 0 m (thềm lục địa)
- x > 180 km: đất liền, dốc 1:100, có làng ven biển + cây + một ngọn đồi cao ở x ≈ 200 km.

Biến dạng đáy biển khi động đất (cũng là mặt nước ban đầu η₀, đơn vị m):
  η₀(x) = 5·exp(−((x − 50)/25)²) − 2·exp(−((x − 155)/30)²)
→ Đỉnh nâng +5 m ở x = 50 km; vùng sụt −2 m ở x = 155 km; tại bờ (x = 180) sụt ≈ −1 m.
(Đối chiếu thực tế Tōhoku 2011: đáy biển gần rãnh Nhật Bản dịch ngang ~50 m và nâng ~5–10 m; bán đảo Oshika sụt ~1,2 m.)

Lan truyền sóng — dùng nghiệm số, KHÔNG vẽ sóng bằng hàm sin tự chế:
- Phương trình nước nông tuyến tính 1D trên lưới so le:
  ∂η/∂t + ∂(h·u)/∂x = 0 ;  ∂u/∂t + g·∂η/∂x = 0 ;  g = 9,81 m/s²
- Δx = 1 km; Δt = 1 s (điều kiện CFL: c_max = √(9,81 × 7.500) = 271 m/s → Δt ≤ 1.000/271 = 3,7 s).
- Biên trái: biên hở (bức xạ Sommerfeld) để sóng đi ra không phản xạ.
- Giải đến điểm h = 10 m (x ≈ 178,5 km). Ghi chuỗi η tại đây (trạm đo ảo "Trạm ven bờ") để điều khiển cảnh sóng leo.
- TÍNH TRƯỚC toàn bộ 2.400 s thời gian thực khi tải trang, lưu η mỗi 5 s (480 ảnh chụp × ~480 ô — rất nhẹ), khi vẽ thì nội suy theo thời gian. Như vậy tua tới/lui ở mọi tốc độ đều mượt.
- Kết quả kiểm tra: sóng tách đôi; sóng đi về bờ mở đầu bằng HÕM (vì vùng sụt nằm phía bờ); tới trạm ven bờ sau ≈ 30 phút; sóng đi ra khơi đi với 232 m/s.

Tỉ lệ hiển thị (ghi rõ ở góc dưới trái): "Không theo tỉ lệ: độ sâu phóng đại 25 lần; độ cao sóng phóng đại 200 lần".

=====================================================================
5. KỊCH BẢN (tổng ≈ 160 s ở tốc độ 1×)
=====================================================================

CẢNH 1 (0–20 s) — "Điều gì tạo ra sóng thần?"
- 5 thẻ xếp ngang, mỗi thẻ có một hoạt hình nhỏ chạy lặp 4 s:
  ① Động đất đáy biển — đáy biển bật lên, mặt nước nhô theo. "83% (thêm 6% do động đất gây trượt lở)". Ví dụ: Sumatra–Andaman 26/12/2004, Mw 9,1; Tōhoku 11/3/2011, Mw 9,0.
  ② Trượt lở đất (dưới nước hoặc từ vách núi rơi xuống) — khối đất trượt đẩy nước. "≈ 2–3%". Ví dụ: vịnh Lituya (Alaska) 9/7/1958, sóng leo 524 m.
  ③ Núi lửa phun trào — sụp miệng núi lửa/dòng nham vụn đổ xuống biển. "≈ 6%". Ví dụ: Krakatau 1883; Hunga Tonga–Hunga Ha'apai 15/1/2022.
  ④ Thiên thạch va chạm — "rất hiếm; chưa ghi nhận trong lịch sử loài người". Ví dụ: Chicxulub, 66 triệu năm trước.
  ⑤ Khí tượng (sóng thần khí tượng) — một bước nhảy khí áp vài hPa di chuyển cùng tốc độ sóng, cộng hưởng. "Hiếm, biên độ thường nhỏ hơn".
- Dưới các thẻ: biểu đồ thanh ngang tỉ lệ nguyên nhân (động đất 83 · núi lửa 6 · động đất gây trượt lở 6 · không rõ 3 · trượt lở 2), chú thích "Nguồn: NOAA NCEI".
- Hộp thông điệp chung (hiện ở giây 14): "Điểm chung: một khối nước lớn bị dịch chuyển ĐỘT NGỘT → trọng lực kéo mặt nước về cân bằng → sinh ra sóng rất dài."
- Kết cảnh: thẻ ① phóng to chiếm toàn màn hình, chuyển mượt sang cảnh 2.

CẢNH 2 (20–35 s) — "Đới hút chìm: nơi hai mảng gặp nhau"
- Mặt cắt sâu 0–60 km. Mảng đại dương (vỏ bazan dày ~7 km, đặc ~3,0 g/cm³) chui xuống dưới mảng lục địa (vỏ dày ~35 km, nhẹ ~2,7 g/cm³), góc chúc ~15° rồi dốc dần. Bên dưới là quyển mềm.
- Mũi tên trên mảng đại dương: "≈ 8 cm/năm — gấp đôi tốc độ mọc móng tay". Mũi tên chuyển động liên tục, chậm.
- Mặt tiếp xúc hai mảng ở độ sâu 10–40 km tô sọc đỏ, nhãn "VÙNG KHÓA: hai mảng dính chặt, không trượt được".
- Nhãn: rãnh đại dương, mảng đại dương, mảng lục địa, quyển mềm, đường bờ.

CẢNH 3 (35–55 s) — "Hàng trăm năm dồn nén" (đồng hồ: "Năm 0 → Năm 300", 1 giây = 15 năm)
- Mảng đại dương trượt vào, kéo mép mảng lục địa cong xuống (phóng đại ×1.000, ghi rõ); phía sau mép bị phồng lên nhẹ.
- Một thanh "Ứng suất" bên phải đầy dần từ xanh → vàng → đỏ.
- Hình minh họa nhỏ góc trên: thước nhựa bị ép cong dần.
- Chú thích: "8 cm/năm × 300 năm = 24 m độ trượt bị 'nợ' lại."
- Cuối cảnh, thanh ứng suất nhấp nháy đỏ.

CẢNH 4 (55–75 s) — "Đứt gãy: mép mảng bật lên" (tự chuyển CHẬM; đồng hồ: "+0 s → +150 s thực", 1 giây = 7,5 s)
- Vết vỡ (vệt sáng cam) chạy dọc vùng khóa từ tâm chấn lên phía rãnh. Nhãn: "Vết vỡ lan 2–3 km/s; toàn bộ đứt gãy kéo dài ~2–3 phút".
- Mép mảng lục địa bật lên và lao về phía biển; phần phồng phía sau xẹp xuống. Thanh ứng suất tụt về 0.
- Từ tâm chấn tỏa các vòng sóng địa chấn mảnh (P nhanh hơn, S chậm hơn), tới làng ven biển làm nhà rung. Hộp chú thích: "Sóng địa chấn (P ≈ 6–8 km/s, S ≈ 3,5–4,5 km/s) gây rung lắc — nhưng KHÔNG phải thứ tạo ra sóng thần."
- Ngay sau đó: các mũi tên đứng xuyên suốt CẢ CỘT NƯỚC từ đáy lên mặt ở vùng nâng (mũi tên lên) và vùng sụt (mũi tên xuống). Mặt nước nhô lên đúng hình η₀. Hộp chú thích: "Sóng thần sinh ra do ĐÁY BIỂN BIẾN DẠNG VĨNH VIỄN. Đứt gãy chỉ vài phút — quá nhanh để nước kịp chảy đi — nên mặt nước nhô lên giống hệt đáy biển."
- Phép tính hiện ở góc: "Chỉ riêng một dải 200 km × 50 km nâng trung bình 2 m = 20 km³ nước ≈ 2 lần dung tích hồ Hòa Bình."

CẢNH 5 (75–90 s) — "Một gò nước tách thành hai sóng"
- Camera zoom dọc từ mặt cắt 60 km lên khung đại dương 0–8 km (chuyển mượt 2 s).
- Gò nước sụp xuống dưới tác dụng trọng lực, tách thành 2 sóng chạy ngược chiều (bắt đầu chạy nghiệm số từ đây).
- Nhãn sóng trái: "Sóng ra khơi — đỉnh đi trước". Nhãn sóng phải: "Sóng vào bờ — HÕM đi trước (do vùng sụt nằm phía bờ)".

CẢNH 6 (90–125 s) — "Càng vào nông càng chậm, càng cao" (1 giây hoạt hình = 60 giây thực)
- Nghiệm số chạy liên tục. Camera bám theo sóng vào bờ.
- Các hạt nước (chấm trắng nhỏ, 4 cột × 6 hàng ở 3 vị trí: ngoài khơi, sườn lục địa, thềm) dao động NGANG đều nhau từ mặt xuống đáy — khác sóng gió chỉ lay động lớp mặt. Chú thích: "Sóng thần làm chuyển động cả cột nước từ mặt tới đáy."
- BẢNG SỐ LIỆU nổi bên phải (cập nhật theo vị trí đỉnh sóng vào bờ):
  Độ sâu h | Tốc độ c = √(g·h) | So sánh
  5.500 m | 836 km/h | máy bay phản lực
  4.000 m | 713 km/h |
  1.000 m | 357 km/h | tàu cao tốc
    200 m | 159 km/h |
     50 m |  80 km/h | ô tô trên quốc lộ
     10 m |  36 km/h | ≈ Usain Bolt chạy 100 m (37,6 km/h) — không ai chạy thoát
- Dòng thứ hai của bảng: "Chu kỳ T ≈ 10 phút — KHÔNG ĐỔI. Bước sóng λ = c·T co lại: ~120 km ngoài khơi → ~6 km ở độ sâu 10 m."
- Dòng thứ ba: "Định luật Green: A₂ = A₁·(h₁/h₂)^¼ → 2 m × (4.000/10)^¼ ≈ 9 m."
- Một con tàu nhỏ ngoài khơi (x ≈ −150 km) nhấp nhô rất chậm khi sóng ra khơi đi qua. Chú thích: "Ngoài khơi: nước dâng 2–3 m trải trên hàng chục km — tàu gần như không nhận ra."
- Sóng ra khơi chạy hết về bên trái, ra khỏi khung không phản xạ.

CẢNH 7 (125–145 s) — "Nước rút, rồi sóng ập vào"
- Camera zoom vào đoạn bờ x = 160–215 km.
- Đường bờ dịch theo trạm ven bờ: vị trí mép nước x_bờ(t) = 180 km + R(t)/0,01, với R(t) = 2,5 × η_trạm(t) (hệ số sóng leo 2,5; dốc bờ 1:100).
- HÕM tới trước: nước rút ra hàng trăm mét, lộ đáy biển, cá mắc cạn, thuyền nghiêng trên cát. Chú thích đỏ: "NƯỚC RÚT BẤT THƯỜNG = DẤU HIỆU TỰ NHIÊN CỦA SÓNG THẦN. Chạy ngay lên chỗ cao!"
- Sau đó đỉnh sóng tới dạng bức tường nước dựng đứng (sóng dạng bore), tràn qua làng, leo lên sườn đồi. Hai thước đo xuất hiện: "Độ cao sóng leo R" (đo theo phương đứng so với mực nước tĩnh) và "Khoảng cách ngập" (đo theo phương ngang).
- Chú thích: "Sóng thần là CHUỖI sóng cách nhau hàng chục phút — sóng đầu chưa chắc lớn nhất." Thêm: "Tōhoku 2011: sóng leo cao nhất 40,5 m."

CẢNH 8 (145–160 s) — "Biển Đông có nguy cơ không?"
- Bản đồ sơ đồ Biển Đông (ghi "Sơ đồ, không theo tỉ lệ" nếu không có đường bờ chính xác). BẮT BUỘC thể hiện quần đảo Hoàng Sa và quần đảo Trường Sa (Việt Nam). Chỉ dùng tên gọi "Biển Đông".
- Rãnh Manila (đường răng cưa đỏ dọc phía tây Luzon, khoảng 14–21°N). Mặt sóng lan ra theo các đường đẳng thời mỗi 30 phút.
- Nhãn các điểm (kịch bản xấu nhất Mw 9,3): Tuy Hòa 2 giờ 06 phút; Nha Trang 2 giờ 28 phút; Quy Nhơn 2 giờ 32 phút; Quảng Ngãi — độ cao sóng lớn nhất ~18 m; Hải Phòng — 3,5 m, sau 8 giờ 35 phút.
- Chú thích nguồn: "Mô phỏng COMCOT — Nguyễn Hồng Phương và nnk. (2014), Viện Vật lý Địa cầu."

MÀN TỔNG KẾT (giữ hình nền cảnh 8 làm mờ, phủ 4 thẻ hiện lần lượt):
1. "~83% sóng thần do động đất đáy biển, chủ yếu ở đới hút chìm."
2. "Sóng thần do đáy biển biến dạng vĩnh viễn nâng cả cột nước — không phải do sóng địa chấn."
3. "c = √(g·h): ngoài khơi nhanh như máy bay, vào bờ chậm lại, dồn năng lượng thành sóng cao."
4. "Rung mạnh hoặc nước rút bất thường → lên chỗ cao ngay, không chờ."

=====================================================================
6. LỖI KHOA HỌC CẦN TRÁNH
=====================================================================
- KHÔNG vẽ sóng thần ngoài khơi thành sóng cuộn bạc đầu cao; ngoài khơi nó thấp và rất dài.
- KHÔNG để sóng địa chấn "đẩy" nước lên; nước nâng lên do đáy biển dịch chuyển.
- KHÔNG gọi là "sóng thủy triều".
- Mảng lục địa chỉ bật lại vài mét đến vài chục mét, không trượt lên xa.
- Sóng vào bờ phải mở đầu bằng hõm (nước rút) theo đúng η₀ đã cho.
- Thuật ngữ: đới hút chìm, rãnh đại dương, vùng khóa, tâm chấn, sóng leo, khoảng cách ngập; dùng "độ muối" (không dùng "độ mặn") nếu có nhắc tới.
```

## Kiểm tra sau khi Claude Design dựng xong
1. Kéo tốc độ về 0,25× ở cảnh 4 — chuyển động phải liền, không giật bậc thang.
2. Tua ngược thanh thời gian ở cảnh 6 — sóng phải chạy lùi mượt (dấu hiệu đã tính trước nghiệm số).
3. Đồng hồ thời gian thực tại lúc hõm sóng chạm trạm ven bờ ≈ +30 phút.
4. Bảng số liệu: 4.000 m → 713 km/h; 10 m → 36 km/h.
5. Ở cảnh 7, nước RÚT trước rồi mới dâng.
6. Cảnh 8 có Hoàng Sa, Trường Sa; chỉ ghi "Biển Đông".
7. Chú thích ≥ 36 px, nhãn ≥ 30 px (trừ dòng nguồn); đứng cách màn chiếu 10 m vẫn đọc được; chạy được khi rút mạng.
8. Thử bằng clicker thật: PageDown/PageUp phải đổi cảnh.
