# Prompt Claude Design – Animation kênh SOFAR (Bài 4, slide 11)
Số liệu: phao Argo 2902696, Biển Đông (12,0°N, 114,5°E), 22/9/2016; quỹ đạo tia tính bằng dò tia (figs2.py).
Ứng với file HTML: Kenh SOFAR.html

```
Tạo một animation giáo dục (tiếng Việt) mô phỏng sự hình thành KÊNH ÂM NGẦM SOFAR trong Biển Đông, dành cho sinh viên năm 1 ngành Hải dương học. Animation sẽ chèn vào bài giảng PowerPoint 4:3.

ĐỊNH DẠNG
- Khung 1440 × 1080 px (4:3), nền trắng, 30 fps, tổng thời lượng khoảng 100 giây, xuất được MP4.
- Màu: Navy #0A2E5C (tiêu đề, chữ chính), Ocean #1B4E8F, Sky #60C0F0, Orange #F07800 (tia âm, điểm nhấn), Ink #0F1E3A (chữ thân), Slate #546E8F (chú thích). Font sans-serif hiển thị đúng dấu tiếng Việt (Be Vietnam Pro hoặc Calibri); chữ thân nhỏ nhất 20 px, nhãn trên hình nhỏ nhất 18 px.
- Thanh tiêu đề navy trên cùng (cao 80 px, sọc cam 6 px bên dưới): "Kênh SOFAR hình thành như thế nào?". Chú thích nguồn dưới đáy, chữ nghiêng màu Slate: "Số liệu: phao Argo 2902696, Biển Đông (12,0°N, 114,5°E), 22/9/2016 — tốc độ âm tính bằng TEOS-10".

BỐ CỤC
- Bên trái (rộng ~300 px): biểu đồ profile tốc độ âm c(z). Trục đứng là độ sâu 0–2.000 m, hướng xuống; trục ngang c từ 1.480 đến 1.545 m/s. Ngay cạnh là một cột hẹp thể hiện mật độ ρ bằng dải màu nhạt → đậm (nhẹ ở trên, đặc ở dưới).
- Bên phải (phần còn lại): mặt cắt đại dương, trục đứng độ sâu 0–2.000 m (cùng thang với panel trái), trục ngang khoảng cách 0–90 km. Ghi nhỏ ở góc: "Trục đứng phóng đại ~35 lần".
- Mặt cắt chia thành các LỚP NƯỚC NẰM NGANG. Tô màu mỗi lớp theo tốc độ âm: c lớn = xanh nhạt, c nhỏ = xanh đậm, nên lớp đậm nhất nằm quanh 1.140 m. Ranh giới giữa các lớp là đường mảnh màu trắng. Mép phải mỗi lớp ghi "ρ = … kg/m³ · c = … m/s".

SỐ LIỆU PROFILE (dùng đúng các giá trị này)
Độ sâu (m) | T (°C) | ρ (kg/m³) | c (m/s)
0     | 29,5 | 1.020,6 | 1.542,4
50    | 27,9 | 1.021,8 | 1.540,4
100   | 22,1 | 1.024,2 | 1.528,0
200   | 14,7 | 1.026,5 | 1.508,4
300   | 11,8 | 1.027,5 | 1.500,2
500   | 8,7  | 1.029,0 | 1.492,6
700   | 6,5  | 1.030,3 | 1.487,3
900   | 5,0  | 1.031,5 | 1.484,8
1.140 | 3,7  | 1.032,7 | 1.483,5  ← TRỤC SOFAR (c nhỏ nhất)
1.300 | 3,3  | 1.033,5 | 1.484,1
1.500 | 2,9  | 1.034,5 | 1.486,0
1.700 | 2,7  | 1.035,4 | 1.488,3
2.000 | 2,5  | 1.036,8 | 1.492,5
Ranh giới lớp nằm giữa các độ sâu trên. Nối các điểm c bằng đường cong mượt.

QUỸ ĐẠO TIA ÂM (đã tính bằng dò tia, KHÔNG thay bằng đường sin)
Nguồn âm đặt tại x = 0 km, z = 1.140 m. Mỗi tia đi theo các "múi" luân phiên: một múi dưới trục, một múi trên trục, cứ thế lặp lại. Các điểm (x km, z m) dưới đây mô tả một múi; nối bằng đường cong mượt, rồi tịnh tiến theo x để lặp.

• Tia 4° (tia chính, dùng cho phần chậm):
  Múi dưới (dài 22,5 km): (0; 1140) (2,8; 1327) (5,6; 1471) (8,4; 1560) (11,2; 1591) (14,0; 1560) (16,9; 1471) (19,7; 1327) (22,5; 1140)
  Múi trên (dài 22,3 km): (0; 1140) (2,8; 952) (5,6; 812) (8,4; 740) (11,1; 714) (13,9; 740) (16,7; 812) (19,5; 953) (22,3; 1140)
• Tia 2°:
  Múi dưới (17,4 km): (0; 1140) (4,3; 1276) (8,7; 1322) (13,0; 1276) (17,4; 1140)
  Múi trên (17,5 km): (0; 1140) (4,4; 1003) (8,8; 927) (13,1; 1003) (17,5; 1140)
• Tia 6°:
  Múi dưới (26,2 km): (0; 1140) (3,3; 1465) (6,6; 1717) (9,8; 1873) (13,1; 1926) (16,4; 1873) (19,7; 1716) (23,0; 1465) (26,2; 1140)
  Múi trên (17,9 km): (0; 1140) (2,2; 910) (4,5; 716) (6,7; 576) (8,9; 513) (11,2; 576) (13,4; 717) (15,7; 911) (17,9; 1140)
• Tia 18° (tia "thoát kênh", đi lên): (0; 1140) (1,0; 814) (2,0; 497) (3,0; 204) (3,6; 84) (4,1; 0). Chạm mặt biển rồi phản xạ, đối xứng gương qua mặt nước.
Tia +θ (phát hướng xuống) bắt đầu bằng múi dưới; tia −θ (phát hướng lên) bắt đầu bằng múi trên.

CÁCH VẼ TIA
- Tia là một chấm cam sáng (đường kính ~14 px, có quầng mờ) chạy dọc quỹ đạo và để lại vệt cam phía sau. Vệt tia đã đi qua giữ lại ở độ trong suốt 60%.
- Mỗi khi chấm vượt qua một ranh giới lớp: ranh giới đó lóe sáng 0,4 s và một mũi tên nhỏ chỉ hướng tia bị bẻ.
- Gần điểm quay đầu (khoảng 15% chiều dài múi hai bên đỉnh), chấm chậm lại còn 30% tốc độ, rồi dừng 1,5 giây ngay tại điểm quay đầu.
- Hiển thị góc tia so với phương ngang ở góc dưới bên phải: "Góc tia: 4,0°". Con số cập nhật liên tục theo vị trí, tính bằng cos θ = cos 4° × c / 1.483,5. Các giá trị tham chiếu: ở 1.300 m là 3,6°; ở 1.500 m là 2,2°; ở 900 m là 3,2°; ở 1.591 m và 714 m là 0°.

KỊCH BẢN THỜI GIAN
0–8 s — Mặt cắt hiện dần; các lớp nước xuất hiện lần lượt từ trên xuống, mỗi lớp kèm nhãn ρ và c.
8–18 s — Đường c(z) được vẽ dần từ mặt biển xuống 2.000 m. Đến 1.140 m: đặt chấm cam và nhãn "Trục SOFAR: c nhỏ nhất = 1.483,5 m/s"; một đường đứt nét cam kéo ngang toàn mặt cắt. Cùng lúc, cột ρ tô đậm dần từ trên xuống, kèm nhãn "Mật độ tăng liên tục từ mặt xuống đáy". Hộp thông điệp: "Mật độ chỉ tăng đều, nhưng tốc độ âm GIẢM rồi lại TĂNG. Tia âm bị bẻ theo tốc độ âm c."
18–22 s — Nguồn âm (biểu tượng loa) xuất hiện trên trục, phát 3 vòng sóng đồng tâm. Nhãn: "Nguồn âm đặt trên trục SOFAR".
22–55 s — TIA 4° PHÁT HƯỚNG XUỐNG, CHẠY CHẬM qua đúng một múi dưới và một múi trên (khoảng 45 km). Các chú thích hiện đúng vị trí, mỗi cái giữ ~3 giây rồi mờ đi:
  (1) Khi đi xuống từ trục: "↓ Xuống lớp ĐẶC HƠN (ρ 1.032,7 → 1.034,5 kg/m³). Nước bị nén nên 'cứng' lên nhanh hơn mức nặng thêm → c TĂNG (1.483,5 → 1.486,0 m/s) → tia bị bẻ dần về phương ngang."
  (2) Tại 1.591 m: "Điểm quay đầu: c = 1.483,5 / cos 4° = 1.487,1 m/s → tia nằm ngang rồi đi lên."
  (3) Khi đi lên về phía trục: "↑ Về lớp có c nhỏ hơn → tia dốc lại."
  (4) Khi cắt trục: "Qua trục SOFAR — chỗ âm đi chậm nhất."
  (5) Khi đi lên trên trục: "↑ Lên lớp NHẸ HƠN (ρ 1.032,7 → 1.030,3 kg/m³) nhưng ẤM HƠN (3,7 → 6,5 °C) → c TĂNG → tia bị bẻ xuống."
  (6) Tại 714 m: "Điểm quay đầu phía trên → tia quay xuống."
  Kết đoạn, hộp tổng kết: "Lên hay xuống, tia đều gặp nước có c lớn hơn → luôn bị đẩy về trục SOFAR."
55–72 s — Phát thêm các tia ±2°, ±6° và −4° với tốc độ bình thường, mỗi góc một sắc độ cam riêng; tất cả chạy tới 90 km, tạo thành bó tia đan nhau quanh trục. Vùng giữa 513 m và 1.926 m tô một dải xanh nhạt trong suốt, nhãn "KÊNH SOFAR: âm bị 'nhốt' trong dải này". Chú giải góc: 2° quay đầu ở 927 / 1.322 m; 4° ở 714 / 1.591 m; 6° ở 513 / 1.926 m.
72–84 s — Tia 18° phát hướng lên: không quay đầu được, chạm mặt biển ở x ≈ 4 km rồi phản xạ. Vệt tia mờ dần sau mỗi lần chạm. Nhãn: "Góc lớn hơn ~16°: tia thoát khỏi kênh, chạm mặt biển và mất năng lượng."
84–100 s — Màn tổng kết (giữ nguyên hình nền, phủ 3 thẻ):
  1. "Tốc độ âm nhỏ nhất ở ~1.140 m (Biển Đông) = trục SOFAR."
  2. "Tia âm luôn bẻ về phía nước có tốc độ âm nhỏ hơn. Nước đặc hơn chưa chắc làm âm chậm hơn: c = √(K/ρ)."
  3. "Âm bị nhốt quanh trục, không chạm mặt, không chạm đáy → âm tần thấp đi được hàng nghìn km."

YÊU CẦU CHUNG
- Chuyển động mượt, dễ chịu; không lắc khung hình, không nhạc nền.
- Một lúc chỉ hiện tối đa 2 chú thích. Chú thích đặt trong hộp trắng viền mảnh, có đường dẫn trỏ tới đúng vị trí trên tia.
- Thuật ngữ: dùng "độ muối" (không dùng "độ mặn"); tên vùng biển chỉ ghi "Biển Đông".
- Có điều khiển phát/dừng và tua để giảng viên dừng ở từng chú thích.
```

## Kiểm tra sau khi dựng
- Tia 4° quay đầu ở ~714 m và ~1.591 m.
- Múi dưới tia 6° (26,2 km) dài hơn múi trên (17,9 km) — đặc trưng thật của profile Biển Đông.
