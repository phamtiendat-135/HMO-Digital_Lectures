# hat-nuoc-quay-vong — Sóng biển: hạt nước quay vòng, năng lượng truyền đi

Số dòng trong spec này là số dòng của `_nguon/Bai5_song_bien_hat_nuoc_quay_vong.html`. Ảnh bằng chứng nằm ở `audit/screens/hat-nuoc-quay-vong/`.

## 1. Định danh

| Mục | Giá trị |
|---|---|
| File gốc | `_nguon/Bai5_song_bien_hat_nuoc_quay_vong.html` (518 dòng) |
| Học phần · Bài | File tự ghi "Hải dương học đại cương · Bài 5 · Sóng biển" (dòng 64, 93). Đề xuất điền `hocPhan: "HDHDC"`, `bai: 5` vào manifest; TS. Đạt quyết định sau. |
| Dung lượng | 38 KB (38.535 byte), trong đó logo PNG nhúng 9.260 ký tự base64 ≈ 6,9 KB |
| Công nghệ | Vanilla JS + Canvas 2D (một canvas chính, một canvas phụ để hoà hình); chữ và nút là HTML. Không thư viện. |
| Chạy offline | Có. `log.json`: 0 lỗi console, 0 request bị chặn ở cả 3 khung. Font Calibri/Carlito không nhúng, rơi về font hệ thống. |
| Không có prompt gốc | Số liệu đối chiếu bằng tính lại độc lập (mục 3). |

Mục tiêu học tập:
1. **Giải thích** vì sao sóng truyền năng lượng đi xa trong khi hạt nước (và cái phao) chỉ quay vòng gần như tại chỗ.
2. **Tính** bước sóng và tốc độ pha nước sâu từ chu kỳ (L = gT²/2π, C = L/T) và bán kính quỹ đạo theo độ sâu (r = (H/2)·e^{kz}).
3. **So sánh** quỹ đạo hạt nước ở nước sâu (tròn, tắt dần tới L/2) với khi sóng vào vùng nông hơn (elip bị đáy ép bẹt, sát đáy chỉ tới – lui).

Cấu trúc hiện có (khác với nhận định ban đầu "vòng lặp vô hạn không có cảnh"): file có **kịch bản 60 s gồm 4 pha × 15 s** (dòng 164–177, 442–451) tự lặp lại, cộng một **chế độ xem tự do** (bấm "Bỏ qua" hoặc đổi vùng nước) có thanh trượt H, nút Nước sâu/Nước nông, Vệt quỹ đạo, Vectơ vận tốc.

Giây chụp thumbnail (theo dòng thời gian mới ở mục 4, S-10): **giây 44** — cảnh 3, cột hạt đỏ với 5 vòng quỹ đạo nhỏ dần và đường "L/2".

## 2. Chấm điểm hiện trạng

| Tiêu chí | Điểm | Bằng chứng |
|---|---|---|
| Đúng khoa học | 4 | Nghiệm Airy viết đúng (dòng 127–129, 142–144, 149–152); chiều quay đúng (đỉnh: u = Aω > 0, cùng chiều truyền). Tính lại: L₀ = 9,81 × 10²/2π = 156,1 m; C = 15,6 m/s; e^{kz} = 100/50/21/9/4%; nước nông h = 7,8 m → L = 82,9 m, C = 8,29 m/s: đều khớp chữ hiển thị. Trừ điểm: gọi h = 7,8 m là "nước nông" (thật ra h/L = 0,094, vùng chuyển tiếp), và mũi tên "năng lượng" chạy theo đỉnh sóng với tốc độ pha (mục 3). |
| Sư phạm | 4 | Mở bằng câu hỏi "Phao có bị sóng đẩy vào bờ không?" (dòng 172, ảnh `laptop-t5.jpg`), rồi lần lượt lộ lưới hạt → cột hạt theo độ sâu → vùng nông. Mỗi pha một ý. Thiếu: không tự dừng cuối pha, không quay lại pha trước được. |
| Hình ảnh | 2 | Sân khấu 1200 × 900 (dòng 12), chuẩn đích 1440 × 1080. Quy đổi sang 1440: tiêu đề 34 px → 41 (< 44); phụ đề 17 → 20 (< 36); nhãn trên hình 14–18 → 17–22 (< 30) (dòng 15, 21, 259, 326, 340, 353, 430). Font Calibri, không phải Be Vietnam Pro (dòng 11, 251). **Màn dọc 390 × 844: trang trống hoàn toàn** (`doc-t0/t5/t15.jpg`). Nguyên nhân đo bằng Playwright: sân khấu rộng cố định 1200 px (dòng 12) làm trình duyệt di động nới khung bố cục thành 1200 × 2597, nên `fit()` (dòng 185) tính F = 1 và đẩy sân khấu xuống y = 848 px, ngoài vùng nhìn 390 × 844. Màu brand đúng. |
| Tương tác | 2 | Có Phát/Tạm dừng, Bước tiếp 1/8 chu kỳ, 3 tốc độ 0,25/0,5/1× (thiếu 2×, 4×), không có cảnh trước/sau, không tua. Phím: chỉ Space và → (dòng 245–248); không có ←, ↑/↓, F, L, PageUp/PageDown. Điện thoại ngang: nút cao 48 px × 0,5 = 24 px (< 44) và **cả thanh điều khiển nằm dưới mép màn hình, không cuộn tới được** (đo bằng Playwright: sân khấu cao 449 px trong khung nhìn 390 px; `ngang-t5.jpg`). Không có chạm-để-dừng, không vuốt. |
| Tự học | 2 | Có tiêu đề + 1 dòng phụ cho mỗi pha (dòng 171–177), đủ ý chính nhưng không giải thích "vì sao"; không có câu hỏi tự kiểm tra; pha tự trôi qua sau 15 s, người học không kịp đọc. |
| Hiệu năng | 4 | 38 KB; mỗi khung vẽ ~60 hạt + 6 vệt × 48 đoạn, nhẹ. Trừ điểm: `devicePixelRatio` không giới hạn (dòng 186–188); rAF chạy liên tục kể cả khi dừng hoặc tab ẩn (dòng 490–508, không có `visibilitychange`); lúc chuyển vùng nước vẽ hai cảnh mỗi khung (dòng 499–505). |
| Khả năng truy cập | 2 | Tốt: tôn trọng `prefers-reduced-motion` (dòng 56, 155–157, 237, 439), nút có `aria-pressed`, thanh trượt có `aria-label`, `focus-visible`. Kém: cỡ chữ nhỏ như trên; chữ cam #F07800 trên nền trắng/xanh nhạt chỉ đạt 2,9:1 (dòng 430–431); chữ nghiêng Slate 14–15 px (dòng 32, 353); bàn phím không đổi được cảnh. |
| Chất lượng mã | 3 | Vật lý tách riêng, có chú thích công thức, 0 lỗi console. Nhưng: hai đồng hồ (`S.t` vật lý và `S.sc` kịch bản, dòng 494–495) cộng trạng thái lớp `LY` tiến theo thời gian thực (dòng 438–441) nên hình không phải hàm thuần của t, không tua lui được; số "ma" 15,6 trong móc kiểm thử (dòng 515); giới hạn H/L ≤ 1/7 là mã chết (dòng 242: L/7 = 22,3 m hoặc 11,8 m, thanh trượt tối đa 3 m); "dịch chuyển thực 0 m" là hằng đúng theo cách tính chứ không phải phép đo (dòng 466–467). |

**Điểm trung bình: 2,9** (23/8).

## 3. Lỗi khoa học — có số cụ thể

Đã tính lại độc lập bằng Python (g = 9,81 m/s², T = 10 s). Những gì ĐÚNG, không sửa: L = 156 m; C = 15,6 m/s; dãy 100% → 50% → 21% → 9% → 4% tại 0, L/9 (17,3 m), L/4 (39 m), 3L/8 (58,5 m), L/2 (78 m), cụ thể e^{kz} = 100,0 / 49,8 / 20,8 / 9,5 / 4,3%; với h = 7,8 m: L = 82,9 m, C = 8,29 m/s, elip mặt 3,77 × 2,0 m (H = 2 m), sát đáy tới – lui 3,19 m; chiều quay của hạt.

**KH-1 (lỗi phân loại). Dòng 87, 103, 175, 477, 480: gọi h = 7,8 m là "Nước nông".** Chú thích dòng 103 lấy h = L/20 với L là bước sóng **nước sâu** (156/20 = 7,8 m). Tiêu chí nước nông phải dùng bước sóng **tại chỗ**: h/L = 7,8/82,9 = 0,094 > 1/20 = 0,05, tức đây là **vùng nước chuyển tiếp** (1/20 < h/L < 1/2). Hai dấu hiệu trên chính màn hình: C hiển thị 8,3 m/s trong khi công thức nước nông √(g·h) = √(9,81 × 7,8) = 8,75 m/s (lệch 5,5%); và độ dịch ngang giảm từ 3,77 m ở mặt xuống 3,19 m ở đáy, trong khi ở nước nông thật độ dịch ngang gần như không đổi theo độ sâu. Với T = 10 s, nước nông thật cần h < 0,0025·g·T² ≈ 2,5 m; khi đó H = 2–3 m sẽ vượt giới hạn vỡ H/h ≈ 0,78 nên không thể chỉ giảm h. → Sửa cách gọi (S-01).

**KH-2 (dễ gây hiểu sai). Dòng 419–434: mũi tên "Năng lượng sóng truyền đi" gắn trên đỉnh sóng và chạy cùng đỉnh với tốc độ pha C = 15,6 m/s.** Năng lượng sóng truyền với tốc độ nhóm; ở nước sâu C_g = C/2 = 7,8 m/s. Hình hiện tại ngầm nói "năng lượng đi cùng đỉnh sóng". → Mũi tên chỉ hướng, đứng yên, không cưỡi trên đỉnh (S-02).

**KH-3 (chính xác hoá). Dòng 172–173, 471: "phao vẫn quay về chỗ cũ", "về đúng chỗ cũ", "dịch chuyển thực: 0 m".** Đúng với lý thuyết tuyến tính (Airy) mà chân trang đã ghi. Thực tế có trôi Stokes: tại mặt u_S = a²·k·ω = 1² × 0,0403 × 0,628 = 0,025 m/s, tức 0,25 m mỗi chu kỳ khi H = 2 m (0,57 m khi H = 3 m), bằng 0,16% quãng đường 156 m của đỉnh sóng. → Thêm chữ "gần như" và nói rõ trong đoạn Giải thích (S-03). Không vẽ trôi Stokes.

**Thuật ngữ cần TS. Đạt xác nhận. Dòng 341: "Đáy sóng (L/2)".** Ý là *wave base*. Trong cùng file, bụng sóng được gọi là "chân" (dòng 412), nên "đáy sóng" dễ bị hiểu là bụng sóng. Đề xuất: "Độ sâu tác động của sóng (L/2)". Xem câu hỏi 2 ở cuối spec.

Thiếu ghi chú tỉ lệ thời gian: 1 chu kỳ 10 s được chiếu trong 4 s (dòng 101), tức 1 giây hoạt hình = 2,5 giây thực; không ghi ở đâu trên màn hình (S-04).

`[CẦN NGUỒN]`: file không có dòng nguồn nào. Các con số đều suy ra từ lý thuyết Airy với T = 10 s, H = 2 m do tác giả chọn, nên không cần nguồn số liệu đo; cần một dòng nguồn lý thuyết (đề xuất ở S-05) và TS. Đạt xác nhận tên tài liệu.

## 4. Danh sách thay đổi

| ID | Loại | Vị trí | Mô tả | Tiêu chí nghiệm thu |
|---|---|---|---|---|
| S-01 | Khoa học | Dòng 87, 175, 327, 477, 480 | Đổi "Nước nông" thành "Nước nông dần" trên nút và nhãn; dòng thông tin ghi "Vùng chuyển tiếp · h = 7,8 m · h/L ≈ 0,09"; tiêu đề cảnh 4: "Vào vùng nước nông dần, quỹ đạo bị đáy ép bẹt." Giữ h = 7,8 m. | Không còn chuỗi "Nước nông ·" đứng trước h = 7,8 m; có hiển thị "h/L ≈ 0,09". |
| S-02 | Khoa học | Dòng 419–434 | Mũi tên "Hướng truyền năng lượng" đặt cố định ở góc trên trái vùng nước, không di chuyển theo đỉnh sóng. | Hai ảnh chụp cách nhau 1 s khi đang phát: vị trí mũi tên trùng nhau (sai khác 0 px). |
| S-03 | Khoa học | Dòng 172–173, 471 | "quay về chỗ cũ" → "gần như quay về chỗ cũ"; bộ đếm ghi "dịch chuyển thực ≈ 0 m (lý thuyết tuyến tính)". | Chuỗi "gần như" có trong phụ đề cảnh 1 và 2. |
| S-04 | Nhãn-số-chữ | Góc dưới trái sân khấu | Thêm ghi chú tỉ lệ ≥ 22 px: "1 giây hoạt hình = 2,5 giây thực · biên độ phóng đại 8 lần" (cảnh nước sâu) hoặc "… 2 lần, thang cận cảnh" (cảnh 4). Bỏ dòng `infoNote` cũ. | Chuỗi có mặt ở mọi cảnh; cỡ chữ ≥ 22 px theo khung 1440. |
| S-05 | Nhãn-số-chữ | Đáy sân khấu | Thêm dòng nguồn ≥ 22 px, chữ nghiêng Slate: "Lý thuyết sóng tuyến tính (Airy); T = 10 s, H = 2 m là giá trị minh hoạ." + tên giáo trình do TS. Đạt cung cấp `[CẦN NGUỒN]`. | Dòng nguồn hiển thị ở mọi cảnh. |
| S-06 | Nhãn-số-chữ | Dòng 341 | Đổi "Đáy sóng (L/2)" theo câu trả lời của TS. Đạt (đề xuất: "Độ sâu tác động của sóng (L/2): chuyển động chỉ còn 4%"). | Chuỗi mới hiển thị ở cảnh 3; không còn "Đáy sóng". |
| S-07 | Hình ảnh | Dòng 12–55, 102, toàn bộ toạ độ vẽ | Chuyển sân khấu sang 1440 × 1080 (nhân mọi toạ độ với 1,2 rồi bố trí lại). Bỏ header, sọc cam, footer, logo, thanh điều khiển trong sân khấu (bộ khung lo). Sân khấu chỉ còn: tiêu đề cảnh, hình, bộ đếm, ghi chú tỉ lệ, dòng nguồn. | Canvas logic 1440 × 1080; không còn phần tử `header`, `#bar`, `footer` trong sân khấu. |
| S-08 | Hình ảnh | Dòng 11, 251 và mọi `font` | Font "Be Vietnam Pro", "Segoe UI", Arial. Cỡ chữ theo khung 1440: tiêu đề cảnh ≥ 44; bộ đếm và phụ đề ≥ 36; nhãn độ sâu, nhãn %, "mốc ban đầu", nhãn đáy, thước tỉ lệ ≥ 30. Phụ đề mỗi cảnh ≤ 20 từ, ≤ 2 dòng; phần dài hơn chuyển xuống đoạn Giải thích. | Quét mã: không có cỡ chữ < 30 px ngoài dòng nguồn và ghi chú tỉ lệ (≥ 22). |
| S-09 | Truy cập | Dòng 430–431, 32, 353 | Chữ cam trên nền sáng đổi sang Navy #0A2E5C (giữ mũi tên cam); bỏ chữ nghiêng cỡ nhỏ. | Mọi cặp chữ/nền đạt tương phản ≥ 4,5:1 (đo bằng công thức WCAG). |
| S-10 | Tương tác | Dòng 156–177, 438–451 | Chia thành **5 cảnh**. Cảnh 1–4 có giờ, mỗi cảnh 16 s = đúng 4 chu kỳ hiển thị (thay cho 15 s = 3,75 chu kỳ) để điểm nối giữa các cảnh liền pha: `phao` 0–16, `quay-vong` 16–32, `theo-do-sau` 32–48, `nong-dan` 48–64. Cảnh 5 tự do `{id:'tu-kham-pha', lap:4}`. `thoiLuong = 64`. Trong cảnh 1–4, H cố định 2 m. | Bấm "Cảnh sau" 4 lần từ đầu tới được cảnh 5; khung tự dừng tại t = 16, 32, 48, 64. |
| S-11 | Tương tác | Dòng 78–92, 204–248 | Ghép bộ khung: `HMO.dangKy({canh, thoiLuong, ve(t), datNhan, khoiTao, huy})`. Bỏ rAF riêng (dòng 489–511), bắt phím riêng (245–248), nút Phát/Tốc độ/Bỏ qua, hàm `fit()` (184–190). | Trong `src/hat-nuoc-quay-vong/` không còn `requestAnimationFrame`, `addEventListener('keydown'`, `addEventListener('resize'`. |
| S-12 | Tương tác | Dòng 86–91, 232–244 | Điều khiển riêng của cảnh 5 làm bằng HTML **ngoài sân khấu**, cao ≥ 44 CSS px: thanh trượt "Độ cao sóng H" 0,5–3,0 m bước 0,1; nút gạt Nước sâu / Nước nông dần; nút gạt Vệt quỹ đạo, Vectơ vận tốc; nút "Bước 1/8 chu kỳ". Các giá trị này là trạng thái ngoài `t`; đổi giá trị thì gọi `HMO.yeuCauVe()`. Ở cảnh 1–4 các điều khiển này ẩn. | Ở khung 390 × 844 và 844 × 390: mỗi điều khiển có `getBoundingClientRect().height ≥ 44`; kéo thanh trượt khi đang dừng làm hình đổi ngay. |
| S-13 | Chất lượng mã | Dòng 162–170, 438–451, 462–487 | `ve(t)` thuần: độ mờ từng lớp (`grid`, `red`, `depth`, `wave`, `focus`), `blend`, `ramp`, bộ đếm "đỉnh sóng đã đi", phụ đề đều tính trực tiếp từ t (dùng hàm ease theo thời gian cảnh, ví dụ lớp mới hiện trong 0,4 s đầu cảnh; `blend` 48–49 s; `ramp` 49–57 s). Thời gian vật lý = 2,5 × t. Bỏ `S.sc`, `S.crest` tích luỹ, `approach()`. Gom hằng số (T, L, h, hệ số phóng đại, thời lượng cảnh) vào một khối đầu file; xoá mã chết dòng 242 và móc `window.__wave`. | Gọi `ve(40)`, `ve(10)`, rồi `ve(40)`: hai ảnh tại t = 40 giống nhau từng điểm ảnh. |
| S-14 | Hình ảnh | Toàn bộ nhãn | `datNhan('toi-gian')` (màn dọc): ẩn nhãn độ sâu, nhãn %, "mốc ban đầu", nhãn đáy, bộ đếm, ghi chú tỉ lệ; giữ mặt sóng, hạt, vệt đỏ, phao, mũi tên. `datNhan('tat')`: ẩn thêm tiêu đề cảnh. Nội dung nhãn bị ẩn phải có trong đoạn Giải thích (mục 7). | Ở 390 × 844 sân khấu không trống ở giây 3 và không có chữ nào trên canvas cao < 8 CSS px. |
| S-15 | Hiệu năng | Dòng 186–188, 499–505 | Giới hạn DPR: 1,5 trên laptop, 1,0 trên thiết bị cảm ứng (nếu khung chưa làm). Khi `blend` nằm giữa 0 và 1 vẫn được vẽ hai cảnh, ngoài khoảng đó chỉ vẽ một. | Bản build ≤ 500 KB; kích thước bộ đệm canvas ≤ 1440 × 1080 × DPR giới hạn. |
| S-16 | Truy cập | Dòng 155–157 | `prefers-reduced-motion`: giữ chuyển động sóng (mang nội dung), bỏ hiệu ứng trượt chữ; lớp hiện/ẩn tức thời. | Với `reducedMotion: 'reduce'`, phụ đề không có transition. |
| S-17 | Nhãn-số-chữ | `noidung/hat-nuoc-quay-vong.json` | Đưa 5 đoạn Giải thích và 4 câu hỏi ở mục 7 vào file nội dung (sau khi TS. Đạt duyệt ở G1). | File JSON có 5 cảnh, 4 câu hỏi ID `hat-nuoc-quay-vong-q1…q4`. |

## 5. Phân tầng: **T2 (2D – Opus)** · khối lượng **M** (1–4 giờ)

- **Q1** (chỉ sửa số, nhãn, chữ, màu?): Không. S-01…S-06, S-08, S-09 thuộc mức T1, nhưng S-10…S-14 viết lại vòng lặp, dòng thời gian và hệ toạ độ. Nội dung mức T1, **ghép khung kéo lên T2**.
- **Q2** (cấu trúc 3D thiết yếu?): Không. Quỹ đạo hạt nằm trọn trong mặt phẳng thẳng đứng dọc hướng truyền; mặt cắt 2D chính là cách nhìn đúng. Thêm chiều thứ ba không thêm ý nào.
- **Q3** → T2.
- Khối lượng M: vật lý giữ nguyên (khoảng 60 dòng, đã đúng); việc chính là chuyển `drawScene` sang toạ độ 1440 × 1080 và thay cơ chế trạng thái bằng hàm của t. Không có mô phỏng tích luỹ nên `ve(t)` thuần làm được trực tiếp.

## 6. Kịch bản 3D

Không áp dụng (T2).

## 7. Nội dung tự học (nháp, chờ TS. Đạt duyệt ở G1)

**Cảnh 1 — Phao có bị sóng đẩy vào bờ không?** (0–16 s)
Giải thích: Sóng đang chạy từ trái sang phải, mỗi đỉnh sóng đi 156 m trong 10 giây. Hãy nhìn cái phao và vạch mốc nét đứt. Phao nhô lên, tiến một chút, hạ xuống, lùi lại, rồi gần như trở về chỗ cũ. Sóng đi qua nhưng không mang nước và phao đi theo.

**Cảnh 2 — Hạt nước quay vòng tròn tại chỗ** (16–32 s)
Giải thích: Mỗi chấm trắng là một hạt nước. Hạt đỏ ở mặt biển vẽ nên một vòng tròn có đường kính đúng bằng độ cao sóng, ở đây là 2 m. Trên đỉnh sóng hạt tiến cùng chiều sóng, dưới chân sóng hạt lùi lại. Thứ được truyền đi xa là năng lượng, còn nước gần như ở lại.

**Cảnh 3 — Càng xuống sâu, vòng quay càng nhỏ** (32–48 s)
Giải thích: Năm hạt đỏ nằm trên cùng một cột nước. Bán kính vòng quay giảm theo hàm mũ e^{kz}: còn 50% ở 17 m, 21% ở 39 m, 9% ở 59 m và chỉ 4% ở 78 m, tức nửa bước sóng. Dưới độ sâu L/2, nước gần như không biết có sóng ở trên. Tàu ngầm lặn sâu vì thế rất êm.

**Cảnh 4 — Vào vùng nước nông dần, quỹ đạo bị đáy ép bẹt** (48–64 s)
Giải thích: Đáy biển chỉ còn sâu 7,8 m, nông hơn L/2, nên sóng "chạm đáy". Chu kỳ vẫn là 10 giây, nhưng sóng chậm lại còn 8,3 m/s và ngắn lại còn 83 m. Vòng tròn bị ép thành elip rộng 3,8 m, cao 2 m. Sát đáy, hạt nước chỉ chạy tới rồi lui 3,2 m, đủ sức khuấy cát.

**Cảnh 5 — Tự khám phá** (tự do)
Giải thích: Bạn hãy kéo thanh "Độ cao sóng H" và xem đường kính vòng quay ở mặt thay đổi theo đúng H. Bật "Vectơ vận tốc" để thấy hạt ở đỉnh tiến, hạt ở chân lùi. Chuyển qua lại giữa nước sâu và nước nông dần để so sánh vòng tròn với elip. Dùng "Bước 1/8 chu kỳ" để xem từng pha.

Ghi chú cho người làm nội dung: trong đoạn cảnh 1–2 có chữ "gần như" là chủ ý (KH-3); nếu TS. Đạt muốn, thêm một câu "thực tế hạt trôi theo sóng khoảng 0,25 m mỗi chu kỳ, gọi là trôi Stokes" vào cảnh 2.

**Câu hỏi tự kiểm tra**

`hat-nuoc-quay-vong-q1` (nhớ – hiểu). Khi một con sóng nước sâu đi qua, hạt nước ở mặt biển chuyển động thế nào?
A. Trôi theo sóng với tốc độ bằng tốc độ sóng
B. Quay vòng gần tròn tại chỗ, đường kính bằng độ cao sóng
C. Chỉ dao động thẳng đứng lên xuống
D. Đứng yên, chỉ mặt nước đổi hình
Đáp án: **B**. Hạt nước quay một vòng mỗi chu kỳ rồi gần như về chỗ cũ; sóng truyền năng lượng chứ không chở nước đi.

`hat-nuoc-quay-vong-q2` (nhớ – hiểu). Ở độ sâu bằng nửa bước sóng (L/2), bán kính quỹ đạo hạt nước còn khoảng bao nhiêu so với ở mặt?
A. 50%  B. 21%  C. 9%  D. 4%
Đáp án: **D**. Bán kính giảm theo e^{kz}; tại z = −L/2 thì e^{−π} ≈ 0,043, tức khoảng 4%.

`hat-nuoc-quay-vong-q3` (vận dụng). Một sóng lừng nước sâu có chu kỳ T = 8 s. Bước sóng và tốc độ truyền của nó gần nhất với cặp giá trị nào? (g = 9,81 m/s²)
A. 50 m và 6,2 m/s  B. 100 m và 12,5 m/s  C. 156 m và 15,6 m/s  D. 200 m và 25 m/s
Đáp án: **B**. L = gT²/2π = 9,81 × 64/6,283 ≈ 100 m; C = L/T = 100/8 = 12,5 m/s.

`hat-nuoc-quay-vong-q4` (vận dụng). Sóng nước sâu có H = 2 m, L = 156 m. Đường kính quỹ đạo của hạt nước ở độ sâu 39 m (bằng L/4) là khoảng bao nhiêu?
A. 1,0 m  B. 0,42 m  C. 0,18 m  D. 0,09 m
Đáp án: **B**. Đường kính = H·e^{kz} = 2 × e^{−π/2} = 2 × 0,208 ≈ 0,42 m.

## 7b. Bản quyền

| Hình nhúng | Vị trí | Là gì | Nguồn | Giữ hay thay |
|---|---|---|---|---|
| PNG 282 × 176, ≈ 6,9 KB | Dòng 62, `<img>` trong header | **Logo Khoa (HMO)**: hình tròn cam – xanh có dáng bản đồ Việt Nam, chữ "HMO", đám mây và dải sóng. Không phải hình chụp từ sách. | Khoa KTTV&HDH | Không có vấn đề bản quyền. Gỡ khỏi sân khấu (S-07) vì header thuộc bộ khung; nếu khung dùng logo thì lấy một bản dùng chung trong `lib/`, không nhúng lặp ở từng animation. |

Mọi hình còn lại (sóng, hạt, phao, đáy cát) vẽ bằng Canvas trong mã, là hình tự vẽ. Không có hình nào lấy từ Segar hay sách khác.

## 8. Checklist nghiệm thu

1. Bản build `animations/hat-nuoc-quay-vong/index.html` ≤ 500 KB; 0 lỗi console; 0 request ra ngoài ở cả 3 khung.
2. Ở khung 390 × 844 (cảm ứng), sân khấu không trống ở giây 3 (hiện tại trống hoàn toàn) và trang vào chế độ Tự học; ở 844 × 390 mọi nút điều khiển nằm trong khung nhìn.
3. Có đúng 5 cảnh; khung tự dừng tại t = 16, 32, 48, 64 s; cảnh 5 chạy lặp, không tự dừng.
4. `ve(40)` → `ve(10)` → `ve(40)` cho hai ảnh tại t = 40 trùng nhau từng điểm ảnh; dừng 1 s thì hai ảnh chụp giống nhau.
5. Số hiển thị: cảnh nước sâu "L = 156 m", "C = 15,6 m/s"; cảnh 3 có dãy 100% / 50% / 21% / 9% / 4%; cảnh 4 có "L ≈ 83 m", "C ≈ 8,3 m/s", "h/L ≈ 0,09", elip "3,8 × 2,0 m", sát đáy "3,2 m".
6. Không còn chuỗi "Nước nông ·" gắn với h = 7,8 m; mũi tên năng lượng đứng yên khi đang phát.
7. Ở cảnh 5, kéo H từ 2,0 lên 3,0 m: nhãn đổi thành "H = 3,0 m" và đường kính quỹ đạo mặt đổi thành 3,0 m; mọi điều khiển cao ≥ 44 CSS px ở hai khung điện thoại.
8. Theo khung 1440 × 1080: tiêu đề cảnh ≥ 44 px, phụ đề và bộ đếm ≥ 36 px, nhãn trên hình ≥ 30 px, dòng nguồn và ghi chú tỉ lệ ≥ 22 px; có ghi "1 giây hoạt hình = 2,5 giây thực" và "biên độ phóng đại 8 lần".
9. Mọi cặp chữ/nền trên sân khấu đạt tương phản ≥ 4,5:1.
10. Quét mã và DOM: 0 lần "độ mặn", "South China Sea", "Biển Nam Trung Hoa".

## 9. Ngoài phạm vi

- Không thêm vật lý mới: không vẽ trôi Stokes, không thêm sóng vỡ, khúc xạ, nhóm sóng, tốc độ nhóm (chỉ nhắc bằng chữ nếu TS. Đạt yêu cầu).
- Không đổi tham số gốc T = 10 s, L = 156 m, h = 7,8 m, dải H 0,5–3,0 m, hệ số phóng đại 8 và 2.
- Không hạ h xuống mức nước nông thật (< 2,5 m); chỉ sửa cách gọi (S-01).
- Không dựng 3D, không thêm thư viện.
- Không làm bố cục dọc riêng; màn dọc chỉ co sân khấu và ẩn nhãn theo S-14.
- Không sửa `_nguon/Bai5_song_bien_hat_nuoc_quay_vong.html`.

## Câu hỏi cho TS. Đạt (trả lời ở G1)

1. **"Nước nông" với h = 7,8 m (KH-1).** Đề xuất: giữ h = 7,8 m, đổi cách gọi thành "nước nông dần / vùng chuyển tiếp" và hiện h/L ≈ 0,09. Thầy đồng ý, hay muốn giữ chữ "nước nông" cho sinh viên năm 1 kèm một dòng chú thích?
2. **"Đáy sóng (L/2)".** Đề xuất đổi thành "Độ sâu tác động của sóng (L/2)" để khỏi lẫn với chân sóng. Thầy dùng thuật ngữ nào trong bài giảng?
3. **Mũi tên năng lượng (KH-2).** Đề xuất cho mũi tên đứng yên, chỉ hướng. Thầy có muốn thêm một câu về tốc độ nhóm (C_g = C/2 ở nước sâu) trong đoạn Giải thích không, hay để dành cho bài sau?
4. **Dòng nguồn (S-05).** Thầy muốn ghi giáo trình nào (ví dụ Segar, chương sóng) `[CẦN NGUỒN]`?
5. **Trôi Stokes (KH-3).** Đề xuất chỉ thêm chữ "gần như"; có nên nêu con số 0,25 m mỗi chu kỳ cho sinh viên năm 1 không?
