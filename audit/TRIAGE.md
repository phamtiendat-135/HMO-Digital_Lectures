# TRIAGE — kết quả Bước 1 (chờ duyệt ở CỔNG G1)

Ngày: 14/11/2026. Mỗi dòng tóm tắt một spec trong `specs/`. Điểm chấm theo chuẩn đích (STANDARDS + tài liệu thiết kế), thang 0–5, 8 tiêu chí.

## 1. Bảng phân tầng

| Slug | Điểm TB | Lỗi khoa học | Tầng | Khối lượng | Lý do |
|---|---|---|---|---|---|
| `song-than-hut-chim` | 3,3 | 6 | T2 | M | Sửa mô hình mép nước và đồng bộ giờ sóng tới trên bản đồ; thay lớp điều khiển để ghép khung. |
| `bien-dang-song-vo` | 3,0 | 4 | T2 | L | Số liệu đúng; sửa logic chọn kiểu vỡ, hai câu sai cơ chế, dàn lại cỡ chữ. |
| `khuc-xa-song` | 3,0 | 3 | T2 | L | Vật lý đúng; làm lại tương tác chạm, bỏ 317 KB logo nhúng trùng. Không lên 3D (mục 3). |
| `hat-nuoc-quay-vong` | 2,9 | 3 | T2 | M | Nội dung chỉ đáng T1, nhưng ghép khung buộc viết lại vòng lặp và toạ độ. |
| `kenh-sofar` | 2,4 | 2 (+1 chờ xác nhận) | T2 | M | Bỏ Babel, cắt font, sửa công thức góc tia, tăng cỡ chữ gần gấp đôi. |
| `luc-tao-trieu` | 2,4 | 10 | **T3** | L | Cảnh 3 là mô hình 3D thiết yếu; nâng cấp bản three.js sẵn có; 7 cảnh, đổi 16:9 sang 4:3. |
| `su-hinh-thanh-bao` | 2,3 | 3 | T2 | L | Bản phác thảo khái niệm; phải dựng lại trên sân khấu 4:3, sửa chiều quay. |
| `chu-ky-trieu-mat-trang` | 2,1 | 2 | T2 | L | Bundle 2,05 MB trên sân khấu 16:9; dựng lại bố cục 4:3, bỏ Babel. |

**Thống kê:** T1: 0 · T2: 7 · T3: 1. Tỉ lệ 3D: 1/8 = 12,5% (trần đã chốt 2/8). Tổng 33 lỗi khoa học. Khối lượng: 3 file M, 5 file L.

**Điểm trung bình theo tiêu chí (8 file):**

| Khoa học | Sư phạm | Hình ảnh | Tương tác | Tự học | Hiệu năng | Truy cập | Mã |
|---|---|---|---|---|---|---|---|
| 3,6 | 3,8 | 2,3 | 2,0 | 2,0 | 2,8 | 1,9 | 3,0 |

Nội dung khoa học và trình tự sư phạm là phần tốt nhất của bộ nguồn. Phần yếu là những thứ đề bài nhắm tới: dùng trên điện thoại, tự học, khả năng truy cập.

## 2. Vì sao không có file T1

Cách dựng đã chọn ở G0 (một bộ khung dùng chung) buộc mọi animation chuyển sang `ve(t)` thuần và bỏ lớp điều khiển riêng. Đó là sửa logic, nên theo câu Q1 của cây quyết định không file nào còn là T1. `hat-nuoc-quay-vong` là trường hợp rõ nhất: nội dung chỉ cần sửa chữ, nhưng ghép khung kéo lên T2.

Hệ quả: agent `anim-label` (Sonnet) không có việc ở đợt đầu. Nó vẫn được tạo để dùng cho các lần sửa chữ, số về sau trên animation đã ghép khung (khi đó nội dung nằm trong `noidung/<slug>.json`, sửa không đụng logic).

## 3. Câu hỏi 3D

- **`luc-tao-trieu` (T3):** 3D cho sinh viên thấy lực tạo triều tại một điểm bất kỳ trên mặt cầu, kéo điểm đó đi quanh Trái Đất và đọc số; hình 2D chỉ cho một lát cắt qua trục Trái Đất – Mặt Trăng. Mô hình hiện có khoảng 21.500 tam giác, dưới trần 80.000.
- **`khuc-xa-song` (T2):** góc sóng θ và khoảng cách tia b là đại lượng đo trên hình chiếu bằng; phối cảnh 3D làm méo chúng. Ý "nông thì chậm" đã có mặt cắt ở cảnh 2.
- **`chu-ky-trieu-mat-trang` (T2):** phép chiếu SVG có sẵn đã đủ; thêm thanh trượt góc nhìn.
- **`su-hinh-thanh-bao` (T2):** mặt cắt đứng và hình nhìn từ trên đặt cạnh nhau truyền đủ hai hoàn lưu.

Đề xuất: để trống suất 3D thứ hai ở đợt này.

## 4. Pilot đề xuất

| Tầng | Pilot | Thử được gì |
|---|---|---|
| T3 | `luc-tao-trieu` | three.js nhúng cục bộ, dự phòng không WebGL2, 7 cảnh tự do, 26 điều khiển riêng |
| T2 (bundle) | `kenh-sofar` | bỏ Babel, cắt font, ngưỡng 500 KB (ước lượng 294 KB giữ React 18, 167 KB với Preact) |
| T2 (vanilla, thay cho T1) | `hat-nuoc-quay-vong` | file nhỏ nhất; có cả cảnh có giờ, cảnh tự do và thanh trượt; có lỗi màn dọc trống |

## 5. Phát hiện chung cho cả bộ

1. **Màn dọc điện thoại trống hoàn toàn ở 3 file** (`song-than-hut-chim`, `bien-dang-song-vo`, `hat-nuoc-quay-vong`) trong giả lập 390 × 844: sân khấu rộng cố định làm khung bố cục di động nới ra, sân khấu nằm ngoài vùng nhìn. Chưa kiểm trên điện thoại thật.
2. **Không file nào dùng được bằng chạm.** Nút đo được cao 8–24 px; thanh tua chỉ nghe chuột; chạm sân khấu không dừng.
3. **Hợp đồng khung thiếu chỗ cho điều khiển riêng của cảnh.** Đã bổ sung trường `dieuKhien` vào tài liệu thiết kế (mục 5): khung dựng thanh trượt, ô bật/tắt bằng HTML ngoài sân khấu.
4. **Hai bundle dùng chung khung phát của Claude Design** lưu vị trí phát vào bộ nhớ trình duyệt với cùng một khoá, nên trên cùng tên miền chúng ghi đè lên nhau. Bỏ khi ghép khung.
5. **Prompt gốc cũng có lỗi.** Ở `khuc-xa-song` và `bien-dang-song-vo`, vài chỗ animation đúng còn prompt sai; spec ghi rõ để worker không sửa ngược.
6. **Bản quyền:** không có hình chụp từ sách. Ảnh nhúng duy nhất là logo HMO (PNG trong `hat-nuoc-quay-vong` và `chu-ky-trieu-mat-trang`, JPEG trong `luc-tao-trieu`, SVG trong `khuc-xa-song`).
7. **Bản đồ Biển Đông** chỉ có ở cảnh 8 của `song-than-hut-chim`: đạt quy tắc (ghi "Biển Đông", có quần đảo Hoàng Sa và quần đảo Trường Sa (Việt Nam)).

## 6. Hai quyết định cần TS. Đạt

**Q-A. `su-hinh-thanh-bao` có vào đợt này không?** Bằng chứng cho thấy đây là bản phác thảo: tự ghi "Mô phỏng khái niệm", chỉ có một con số (26,5 °C), không dòng nguồn, khung 16:9, chữ 14 px; xuất từ công cụ visualization của ChatGPT/Codex. Đề xuất: đưa vào nhưng coi là dựng lại, xếp cuối hàng; nếu thiếu thời gian thì hoãn file này trước.

**Q-B. `chu-ky-trieu-mat-trang` nói về nội dung khác tên gọi.** Animation trình bày biến điệu nhiều năm của triều cao (chu kỳ nút 18,61 năm, chu kỳ cận điểm 8,85 năm, theo Haigh và nnk. 2011), không phải ngày Mặt Trăng 24 h 50 phút hay triều cường – triều kém. Mức nội dung hợp năm 3 hoặc cao học. Đề xuất: đổi slug thành `chu-ky-trieu-18-6-nam`, tên hiển thị "Chu kỳ triều 18,6 năm và 4,4 năm", gắn tag "nâng cao" trên trang kho.

## 7. Câu hỏi khoa học và `[CẦN NGUỒN]`

Chi tiết và phương án đề xuất nằm ở cuối từng spec. Tóm tắt những câu thay đổi nội dung hiển thị:

| Slug | Câu hỏi | Đề xuất |
|---|---|---|
| `song-than-hut-chim` | Mép nước "rút" 271 m trước khi sóng tới vì tính so với bờ chưa sụt | Tính so với bờ đã sụt, giữ R ≈ 28 m, ghi "ước lượng" |
| `song-than-hut-chim` | Trượt lở ghi 2% (biểu đồ) hay "2–3%" (thẻ); phiên bản thống kê NOAA NCEI | Thầy xác nhận bộ số |
| `song-than-hut-chim` | Dung tích hồ Hòa Bình; số kịch bản rãnh Manila (Nguyễn Hồng Phương và nnk. 2014) | Thầy xác nhận từ bản gốc |
| `bien-dang-song-vo` | "Ma sát với đáy hãm chân sóng" (mô hình không có ma sát) | "Đáy cản chuyển động của nước → sóng chậm lại, bắt đầu biến dạng" |
| `bien-dang-song-vo` | "Nước nông h < L₀/20 = 5 m": tại 5 m thì h/L = 0,094, vẫn là vùng trung gian | Đổi dải thành "GẦN BỜ", ghi riêng ngưỡng nước nông thật (1,52 m) |
| `hat-nuoc-quay-vong` | h = 7,8 m gọi là "Nước nông" (h/L = 0,094) | "Vùng chuyển tiếp", hiện h/L |
| `hat-nuoc-quay-vong` | "Đáy sóng (L/2)" dễ lẫn với chân sóng | "Độ sâu tác động của sóng (L/2)" |
| `hat-nuoc-quay-vong` | Dòng nguồn: giáo trình nào | Thầy cho tên |
| `khuc-xa-song` | Cột "1,59 / 0,52" là Kr² = b₀/b, không phải "năng lượng trên 1 m bờ" | Đổi nhãn, giữ số |
| `khuc-xa-song` | Cảnh 3 (88 s) và cảnh 4 (85 s) dài cho điện thoại | Giữ, trừ khi thầy muốn rút |
| `kenh-sofar` | Dải "Kênh SOFAR" 513–1.926 m chỉ là giới hạn tia 6°; độ sâu đáy tại 12,0°N, 114,5°E | Ghi "kênh thực rộng hơn dải này", không nêu số đáy |
| `kenh-sofar` | Thêm cột độ muối vào bảng profile; câu trích dẫn Argo | Thêm; thầy cho câu trích dẫn |
| `luc-tao-trieu` | Cảnh 4 gọi nước lớn hằng ngày là "triều cường" | "Nước lớn" / "nước ròng" |
| `luc-tao-trieu` | "Bất đối xứng nhật triều" hay "bất đẳng nhật triều" | Thầy chọn |
| `luc-tao-trieu` | Cảnh 4 và 7 quay cùng chiều kim đồng hồ | Thống nhất nhìn từ cực Bắc, ngược chiều kim đồng hồ |
| `luc-tao-trieu` | "6,6% — slide 23 trong giáo trình": giáo trình nào | Thầy cho nguồn |
| `chu-ky-trieu-mat-trang` | "Mặt Trời thẳng hàng với đường cận–viễn điểm 4,4 năm một lần" sai cơ chế | "Đường cận–viễn điểm trùng hướng xuân phân – thu phân" |
| `chu-ky-trieu-mat-trang` | 23°27′ hay 23°26′; số Bắc Hải 3,29 m mâu thuẫn ngưỡng "> 4 m" | Giữ 23°27′; thầy xác nhận từ PDF Haigh và nnk. (2011) |
| `chu-ky-trieu-mat-trang` | Thêm ví dụ Hòn Dấu (nhật triều đều) | Thầy cho số F và độ lớn triều |
| `su-hinh-thanh-bao` | Thêm cảnh 6 "Bão mạnh cỡ nào?" theo thang cấp bão Việt Nam | Thêm; ngưỡng km/h cần đối chiếu Quyết định 18/2021/QĐ-TTg |
| `su-hinh-thanh-bao` | "Nhiệt ẩn / ngưng tụ" hay "ẩn nhiệt ngưng kết / ngưng kết" | Dùng "ẩn nhiệt ngưng kết" |

Câu nào thầy không trả lời, worker dùng phương án đề xuất; mục `[CẦN NGUỒN]` chưa có nguồn thì số đó không được hiển thị.

## 8. Giới hạn của lần review này

- Mỗi file do một bản sao của phiên chính đọc và chấm; ba phát hiện đã được phiên chính tính lại độc lập và khớp (h/L = 0,094 ở `hat-nuoc-quay-vong`; Kr² = 1,59 và 0,52 ở `khuc-xa-song`; ngày triều 24 h 55 ph khi dùng ngày 24 h ở `luc-tao-trieu`). Các phát hiện còn lại chưa được kiểm chéo.
- Chưa đọc trọn: bảng chỉnh `tweaks-panel.jsx` và khối CSS design system của hai bundle (đều bị bỏ khi ghép khung).
- `luc-tao-trieu` chỉ có ảnh chụp slide bìa, chưa có ảnh riêng 7 mô hình.
- fps và hành vi trên điện thoại thật chưa đo; mọi nhận xét về điện thoại là từ giả lập Chromium.
