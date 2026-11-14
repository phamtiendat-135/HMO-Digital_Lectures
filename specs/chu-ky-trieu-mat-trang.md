# chu-ky-trieu-mat-trang — Hai chu kỳ nhiều năm của Mặt Trăng chi phối triều cao (18,61 năm và 8,85 năm)

> Số dòng trong spec này trỏ vào mã riêng của animation sau khi tách bundle: `nodal-piece-vi-standalone.jsx` (uuid `6c8933c7…`, 744 dòng), lấy lại bằng `node tools/audit/tach-bundle.cjs "_nguon/Chu ky trieu Mat Trang-latest.html" <thư mục>`. "tpl" = `template.html` của bundle; "v3" = `animations-v3.jsx` (uuid `caff81db…`).
>
> **Lưu ý về tên:** tên file gợi ý "chu kỳ triều theo Mặt Trăng" (ngày triều 24 h 50 phút), nhưng nội dung thật là **biến điệu nhiều năm** của triều cao theo Haigh, Eliot & Pattiaratchi (2011): chu kỳ nút 18,61 năm và chu kỳ cận điểm 8,85 năm. Không có cảnh nào nói về ngày Mặt Trăng, tháng giao hội hay triều cường – triều kém nửa tháng. Slug giữ nguyên; tên hiển thị dùng tiêu đề ở trên.

## 1. Định danh

| Mục | Giá trị |
|---|---|
| File gốc | `_nguon/Chu ky trieu Mat Trang-latest.html` (bản `Chu ky trieu Mat Trang.html` không phát hành) |
| Học phần · Bài | để trống (TS. Đạt sắp xếp sau). Mức nội dung: năm 3 trở lên / cao học, không hợp năm 1 |
| Dung lượng | 2.005 KB (2.053.166 byte) |
| Công nghệ | Bundle Claude Design: React 18.3.1 + ReactDOM 18.3.1 (UMD) + **Babel standalone 7.29.0 dịch JSX lúc tải** (3,14 MB sau giải nén) + dc-runtime (69 KB) + `animations-v3.jsx` (55 KB, khung hoạt hình của Claude Design) + `tweaks-panel.jsx` (25 KB, bảng chỉnh của trình soạn) + mã riêng 52 KB. Vẽ bằng SVG + DOM, phép chiếu 3D tự viết (dòng 26–30), không WebGL. 24 file woff2: Be Vietnam Pro 400/500/600/700, JetBrains Mono 400/500/700, Source Serif 4 (≥ 400/600), mỗi độ đậm 3–6 khối unicode kể cả Cyrillic, Hy Lạp. 1 PNG logo HMO 223 × 131 px, 38 KB |
| Sân khấu | **1920 × 1080 (16:9)**, không phải 1440 × 1080 (dòng 731) |
| Chạy offline | Có. `audit/screens/chu-ky-trieu-mat-trang/log.json`: 0 request bị chặn, 0 lỗi console ở cả 3 khung |

**Mục tiêu học tập**
1. Giải thích vì sao độ xích vĩ cực đại của Mặt Trăng dao động giữa 18°18′ và 28°36′ theo chu kỳ nút 18,61 năm.
2. Tính độ xích vĩ cực đại tại N = 0° và N = 180°, và mức tăng lực tạo triều khi Mặt Trăng ở cận điểm (tỉ lệ 1/r³).
3. So sánh ảnh hưởng của chu kỳ 18,61 năm (vùng nhật triều) và chu kỳ ~4,4 năm (vùng bán nhật triều) lên mực nước triều cao.

**Giây chụp thumbnail:** cảnh "Chu kỳ nút 18,61 năm", 11 s sau đầu cảnh (hiện tại là t = 40 s): thấy đủ quỹ đạo nghiêng, vệt đường nút và đồ thị δ cực đại.

## 2. Chấm điểm hiện trạng

| Tiêu chí | Điểm | Bằng chứng |
|---|---|---|
| Đúng khoa học | 4 | Hình học quỹ đạo, chiều quay, công thức δ cực đại, hệ số nút, 1/r³ đều đúng khi tính lại (mục 3). Hai lỗi: số hiển thị lệch 1′ (dòng 4 so với 180) và câu "Mặt Trời thẳng hàng … 4,4 năm một lần" sai cơ chế (dòng 296, 627, 672) |
| Sư phạm | 3 | Trình tự 11 cảnh hợp lý (hình học → nút → δ → bướu triều → hệ số f → khoảng cách → cận điểm → tổng hợp → vùng). Nhưng chạy liền 119 s không dừng; mỗi cảnh có đoạn văn 40–55 từ trên hình hiện 9–15 s (dòng 221, 265, 296, 415, 459); nội dung vượt mức năm 1 |
| Hình ảnh | 2 | Màu đúng brand (dòng 1). Sân khấu 16:9: ở 1024 × 768 chỉ dùng 576/768 px chiều cao (`laptop-t15.jpg`). Chữ 22–30 px trên khung 1920 (dòng 78, 166, 202, 232, 437), tương đương 16–22 px trên khung 1440, dưới chuẩn nhãn ≥ 30. Màn dọc 390 px: hệ số co 0,20, chữ 24 px còn ~5 px (`doc-t5.jpg`) |
| Tương tác | 1 | Chỉ có phát/dừng, về đầu, kéo thanh tua bằng chuột (v3 dòng 693–694, không nghe sự kiện chạm), nút 24 × 24 px (v3 dòng 832). ←/→ tua 0,1 s chứ không đổi cảnh (v3 dòng 477–480). Không có tốc độ, đổi cảnh, toàn màn hình, PageUp/PageDown. Thanh "Mặt Trăng: 1 vòng / … s" chỉ hiện khi rê chuột (dòng 706) nên điện thoại không dùng được. Nút tải xuống là chức năng xuất video của trình soạn |
| Tự học | 2 | Đoạn văn trên hình giải thích khá đủ, có tóm tắt cuối (dòng 668–693), nhưng không tự dừng, không câu hỏi, và không đọc được trên điện thoại |
| Hiệu năng | 1 | 2.005 KB so với ngưỡng 500 KB. Trình duyệt phải giải nén và chạy Babel 3,14 MB rồi dịch 3 file JSX mỗi lần mở. 24 font, trong đó 2 họ không cần. Vẽ SVG mỗi khung hình nhẹ (≤ 3 đường 160 đoạn) |
| Khả năng truy cập | 1 | Không `prefers-reduced-motion`, không nhãn ARIA, nút 24 px, chữ nghiêng 22 px; điều khiển riêng cần chuột. Tương phản chữ chính đạt (Ink trên trắng) |
| Chất lượng mã | 3 | Điểm tốt: toàn bộ hình là hàm thuần của một biến `T` (dòng 554), 0 lỗi console. Điểm trừ: số "ma" `today = 2026.73` (dòng 336), biên độ `0.4` (dòng 330), `(T - t0) * 3` làm khối thanh trôi 27 px (dòng 455, 474); biến toàn cục `window.__moonPeriod` (dòng 92, 727); `localStorage.getItem` không bọc try/catch (dòng 726); còn `TweaksPanel` và cờ `motionEditor` của trình soạn (dòng 725, 735–740); vị trí phát lưu vào localStorage khoá `animstage-v3:t` dùng chung với mọi bundle khác (v3 dòng 360, 374) |

**Trung bình: 2,1**

## 3. Lỗi khoa học

**K-1 (dòng 4 so với 180–181, 232, 390–391, 599, 671).** Mã dùng độ nghiêng hoàng đạo `EPS = 23.44°` nhưng chữ ghi 23°27′ (= 23,45°). Hệ quả: ô đọc số trực tiếp (`fmtDM(maxDec(N))`, dòng 194 và 226) tại N = 0° cho arccos(cos(23,44° + 5,145°)) = 28,585° → **28°35′**, trong khi ngay bên dưới in "23°27′ + 5°9′ = **28°36′**". Sửa `EPS = 23.45`: N = 0° → 28,595° → 28°36′; N = 180° → 18,305° → 18°18′; khớp với chữ và với Pugh (1987) mà bài báo dùng.

**K-2 (dòng 296, 627, 672).** Chữ: "Mặt Trời thẳng hàng với [đường cận–viễn điểm] hai lần mỗi vòng: khoảng 4,4 năm một lần". Sai cơ chế. Mặt Trời đi 360°/năm, cận điểm đi 40,69°/năm, nên Mặt Trời gặp lại cận điểm sau 360/(360 − 40,69) = 1,127 năm = 411,8 ngày, tức thẳng hàng với đường cận–viễn điểm mỗi **205,9 ngày**, không phải 4,4 năm. Cái lặp lại sau 8,85/2 = 4,42 năm là kinh độ cận điểm p = 0° hoặc 180°, nghĩa là đường cận–viễn điểm **chỉ đúng hướng xuân phân – thu phân**; khi đó triều cận điểm rơi vào lúc Mặt Trăng và Mặt Trời cùng ở gần xích đạo, lực bán nhật triều lớn nhất. Chính mã cũng vẽ đúng điều này: `cos(2·p)` (dòng 290, 590), đạt 1 tại 2015,65; 2020,08; 2024,50 (tính lại: p = 0,2°; 180,5°; 0,3°). Chữ đề xuất: "Cứ khoảng 4,4 năm, đường cận–viễn điểm lại chỉ đúng hướng xuân phân – thu phân. Khi đó Mặt Trăng ở cận điểm đúng lúc nó và Mặt Trời cùng nằm gần xích đạo, nên bán nhật triều lớn nhất." Nhãn dòng 627 đổi thành "Đường cận–viễn điểm trùng hướng xuân phân – thu phân".

**Điểm cần làm rõ (không phải lỗi số, xếp loại Sư phạm ở mục 4)**
- Dòng 329–331: đồ thị "Tổng hợp" cộng dao động nút theo pha vùng **nhật triều** (đỉnh khi N = 0°) với dao động 4,4 năm vốn chỉ đáng kể ở vùng **bán nhật triều**, biên độ 0,4 là số tự chọn. Ở vùng bán nhật triều, thành phần nút ngược pha (M₂: f = 1,037 khi N = 180°). Đã có dòng "Sơ đồ minh họa" (dòng 363) nhưng sinh viên dễ hiểu là một nơi chịu cả hai đỉnh.
- Dòng 92: Mặt Trăng quay 1 vòng/6,5 s trong khi cảnh "Chu kỳ nút" quét 18,61 năm trong 12 s (đúng tỉ lệ thì ~249 vòng). Cần một dòng "Tốc độ quay của Mặt Trăng không theo tỉ lệ thời gian".
- Dòng 502 so với 510: thẻ ghi ảnh hưởng nút lớn nhất ở vùng nhật triều có độ lớn triều **> 4 m**, nhưng ví dụ Bắc Hải ghi độ lớn triều **3,29 m**.

**Đã tính lại và đúng**
- Chu kỳ từ công thức Pugh (dòng 15–16): 360/19,3414 = 18,613 năm; 360/40,6904 = 8,847 năm; nửa chu kỳ 4,424 năm.
- Năm N = 0°: 1969,24; 1987,85; 2006,46; 2025,08. Năm N = 180°: 1978,54; 1997,16; 2015,77; 2034,38 (dòng 213, 242–247, 516–517, 683, 687). "1987" thực ra là cuối 1987.
- Hệ số nút (dòng 257–259): K₁ 1,121 / 0,891; O₁ 1,196 / 0,822; M₂ 0,963 / 1,037 tại N = 0° / 180°.
- Khoảng cách (dòng 447–453, 459): (384.400/363.300)³ = 1,185; (384.400/405.500)³ = 0,852; cận điểm gần hơn trung bình 5,49%.
- Bướu triều cân bằng tại 20°B (dòng 380): hai lần nước lớn 0,825 và 0,825 (δ = 0°); 0,999 và 0,424 (δ = 18,3°); 0,966 và 0,156 (δ = 28,6°). Ngày Mặt Trăng 24,84 h, nước lớn 2 tại 12,42 h (dòng 384, 433).
- Chiều: Mặt Trăng đi ngược kim đồng hồ nhìn từ cực Bắc (dòng 82–86); đường nút lùi về tây (dòng 107, 568); đường cận–viễn điểm tiến về đông (dòng 111). Trục Trái Đất và mặt xích đạo dựng nhất quán (dòng 88, 91).

## 4. Danh sách thay đổi

| ID | Loại | Vị trí | Mô tả | Tiêu chí nghiệm thu |
|---|---|---|---|---|
| S-01 | Khoa học | dòng 4 | `EPS = 23.45` (K-1) | Tua tới N = 0°: ô "δ cực đại" hiện 28°36′; tại N = 180° hiện 18°18′ |
| S-02 | Khoa học | dòng 296, 627, 672 | Viết lại theo K-2 | Không còn cụm "Mặt Trời thẳng hàng … 4,4 năm"; nhãn nổi ghi "trùng hướng xuân phân – thu phân" |
| S-03 | Sư phạm | cảnh Tổng hợp, dòng 326–365 | Thêm điều khiển chọn "Vùng nhật triều / Vùng bán nhật triều" (qua `dieuKhien` của khung): bán nhật triều thì đổi dấu thành phần nút. Ghi "biên độ minh họa, không theo số đo" | Chọn bán nhật triều: đường xanh nhạt đạt đỉnh ở 2015,8 thay vì 2006,5 và 2025,1 |
| S-04 | Sư phạm | cảnh có quỹ đạo | Thêm ghi chú ≥ 22 px "Tốc độ quay của Mặt Trăng không theo tỉ lệ thời gian" cạnh ghi chú phóng đại (dòng 166) | Ghi chú hiện ở mọi cảnh có `OrbitScene` |
| S-05 | Khoa học / Nhãn | dòng 502, 510, 522 | Đối chiếu lại với bài báo các số F = 11,59; 3,29 m; "> 4 m"; "> 6 m"; "10 cm"; "gấp 3 lần" và ghi số bảng/hình. Giải quyết mâu thuẫn 3,29 m so với "> 4 m" (xem câu hỏi cho TS. Đạt) | Mỗi số có số trang/bảng trong spec; không còn `[CẦN NGUỒN]` |
| S-06 | Chất lượng mã | dòng 336 | Bỏ `today = 2026.73` cứng: tính từ ngày mở trang, hoặc bỏ vạch "Hiện tại" | Mở trang với đồng hồ máy đặt năm 2030: vạch nằm ở 2030 (hoặc không có vạch) |
| S-07 | Hình ảnh | toàn bộ | Dựng lại bố cục từ 1920 × 1080 sang **1440 × 1080**: hình quỹ đạo ở trên/trái, bảng số và đồ thị bên phải hoặc dưới; cỡ chữ theo chuẩn (tiêu đề ≥ 44, chú thích ≥ 36, nhãn ≥ 30, nguồn và ghi chú tỉ lệ ≥ 22) | Đo trên ảnh 1440 × 1080: không nhãn nào < 30 px ngoài dòng nguồn/tỉ lệ; không chữ tràn hay đè nhau ở cả 10 cảnh |
| S-08 | Sư phạm / Tự học | dòng 221, 265, 296, 415, 459, 501–503 | Chuyển các đoạn văn dài khỏi sân khấu xuống khung Giải thích (mục 7); trên hình chỉ giữ nhãn, số đọc và chú thích ≤ 20 từ | Không khối chữ nào trên sân khấu > 20 từ |
| S-09 | Tương tác | toàn bộ | Ghép khung chung: `HMO.dangKy({canh, thoiLuong, ve(t), datNhan, khoiTao, huy})`. `ve(t)` render `<Piece>` với `T = t`. Bỏ `CompositionStage`, `PlaybackBar`, bắt phím, rAF và lưu vị trí phát của v3; chỉ giữ `Easing`, `clamp` | 6 kiểm tra smoke của Bước 4 đạt ở 3 khung; ←/→ và PageUp/PageDown đổi cảnh; tự dừng cuối mỗi cảnh |
| S-10 | Tương tác | dòng 700–722, 726–728 | Thay `SpeedControl` (chỉ hiện khi rê chuột) và công tắc "Phóng đại" của TweaksPanel bằng `dieuKhien` của khung: thanh trượt "Mặt Trăng: 1 vòng / 1–15 s" và bật/tắt "Phóng đại độ nghiêng, độ dẹt". Bỏ `window.__moonPeriod` và `localStorage` | Trên điện thoại chạm được cả hai điều khiển, cao ≥ 44 px; `grep localStorage src/chu-ky-trieu-mat-trang/` = 0 |
| S-11 | Tương tác | cảnh có quỹ đạo | Thêm `dieuKhien` thanh trượt "Góc nhìn" (phương vị camera, cộng vào `cam.az` dòng 572) để sinh viên tự xoay nhìn hai mặt phẳng cắt nhau | Kéo thanh trượt: hình quay, phần sau/trước của quỹ đạo đổi nét đúng |
| S-12 | Hình ảnh | màn dọc | `datNhan('toi-gian')`: ẩn nhãn tiếng Anh in nghiêng, chú giải bên phải, đoạn nguồn; giữ hình quỹ đạo, đồ thị và 1–2 số đọc lớn | Ảnh 390 × 844: hình và đồ thị nhận ra được; khung Giải thích có chữ ≥ 16 px; không tràn ngang |
| S-13 | Hiệu năng | build | **Biên dịch sẵn JSX bằng esbuild, bỏ Babel**, bỏ dc-runtime, `tweaks-panel.jsx`, phần không dùng của `animations-v3.jsx` | Bản phát hành không chứa chuỗi `Babel`, `text/babel`, `__bundler` |
| S-14 | Hiệu năng | font | **Chỉ giữ Be Vietnam Pro 400/600/700, cắt còn Latin + tiếng Việt.** Bỏ JetBrains Mono (số đọc dùng Be Vietnam Pro với `font-variant-numeric: tabular-nums`; nếu font không có tnum thì đặt bề rộng cố định cho ô số) và Source Serif 4 (tiêu đề dùng Be Vietnam Pro 700). Độ đậm 500 đổi thành 400 hoặc 600 | Đúng 3 `@font-face`; ký tự δ, ′, °, ×, −, ₁, ₂, ³ hiển thị đúng (nếu thiếu trong font thì vẽ bằng `<sub>`/font dự phòng hệ thống) |
| S-15 | Hiệu năng | tổng | **Mục tiêu ≤ 500 KB** (ngân sách dưới bảng) | `stat` bản phát hành ≤ 512.000 byte |
| S-16 | Truy cập | toàn bộ | `prefers-reduced-motion`: tắt chuyển động trang trí ở bìa (dòng 643–645) và độ trôi 27 px (dòng 455, 474); giữ chuyển động mang nội dung. SVG chính có `role="img"` và `aria-label` theo cảnh | Bật reduced-motion: bìa đứng yên, quỹ đạo vẫn quay |
| S-17 | Nhãn-số-chữ | dòng 634–636 | Bỏ số trang "xx / 11" và "HMO \| HUS VNU" (khung đã có tên cảnh và nút về kho); giữ dòng nguồn Haigh và nnk. (2011) ≥ 22 px | Dòng nguồn có ở mọi cảnh nội dung |
| S-18 | Nhãn-số-chữ | dòng 683 | "1987" → "1987–88" hoặc giữ kèm chú thích "làm tròn năm" | Khớp bảng tính lại ở mục 3 |
| S-19 | Sư phạm | cảnh Vùng | Nếu TS. Đạt cung cấp số liệu: thêm một dòng ví dụ Việt Nam (Hòn Dấu, nhật triều đều) bên cạnh Bắc Hải | Có dòng nguồn cho số Hòn Dấu |

**Ngân sách dung lượng ước lượng (S-15)**

| Thành phần | Giữ React 18 | Đổi Preact |
|---|---|---|
| React + ReactDOM production (hiện 142,6 KB) | ~143 KB | ~12 KB |
| Mã animation (52 KB nguồn, sau minify) | ~26 KB | ~26 KB |
| Phần giữ lại của animations-v3 (Easing, clamp) | ~2 KB | ~2 KB |
| Khung chung + sổ điểm | ~40 KB | ~40 KB |
| Be Vietnam Pro 3 độ đậm, Latin + Việt, base64 | ~90 KB | ~90 KB |
| Logo HMO (thu về ≤ 300 px, WebP/PNG tối ưu, base64) | ~12 KB | ~12 KB |
| Nội dung giải thích + câu hỏi | ~8 KB | ~8 KB |
| **Tổng** | **~320 KB** | **~190 KB** |

Khả thi với cả hai phương án; không cần xin miễn ngưỡng.

## 5. Phân tầng: **T2 (Opus)** · khối lượng **L**

- **Q1 (chỉ nhãn, số, chữ?)** Không. Phải bỏ Babel, dựng lại bố cục 4:3, ghép khung, thêm điều khiển. Quy tắc bundle React cũng đặt mức tối thiểu là T2.
- **Q2 (cấu trúc 3D thiết yếu?)** Hai mặt phẳng quỹ đạo cắt nhau đúng là hình học 3D, nhưng animation đã truyền đạt bằng phép chiếu trục đo tự viết với camera xoay 50° (dòng 571–575), và 6/10 cảnh là đồ thị, thanh so sánh, thẻ chữ. Câu hỏi "3D làm sinh viên hiểu điều gì về chu kỳ triều mà hình chiếu hiện tại không làm được?": thứ duy nhất thêm được là tự xoay góc nhìn, và S-11 làm việc đó bằng một thanh trượt trong SVG, không cần WebGL. Suất 3D còn lại (trần 2/8) không nên dùng ở đây; `luc-tao-trieu` đã nói về bướu triều bằng 3D.
- **Q3** → T2.
- Khối lượng L (> 4 giờ): 10 cảnh phải xếp lại bố cục và nâng cỡ chữ, cộng chuyển đổi build và 3 điều khiển mới.

## 6. Kịch bản 3D

Không áp dụng (T2).

## 7. Nội dung tự học (nháp, chờ duyệt ở G1)

Cấu trúc cảnh đề xuất: 10 cảnh **có giờ**, tổng 119 s. Cảnh bìa 5 s gộp vào cảnh 1.

| # | id | Giây (hiện tại) | Tên cảnh |
|---|---|---|---|
| 1 | hinh-hoc | 0–15 | Quỹ đạo Mặt Trăng và các mặt phẳng tham chiếu |
| 2 | diem-nut | 15–29 | Điểm nút lên là gì? |
| 3 | chu-ky-nut | 29–43 | Chu kỳ nút 18,61 năm |
| 4 | xich-vi | 43–56 | Vì sao độ xích vĩ quan trọng? |
| 5 | he-so-nut | 56–65 | Chu kỳ nút tác động lên các sóng triều thành phần |
| 6 | khoang-cach | 65–74 | Mặt Trăng càng gần, triều càng mạnh |
| 7 | can-diem | 74–89 | Chu kỳ cận điểm 8,85 năm |
| 8 | tong-hop | 89–100 | Tác động tổng hợp lên mực nước triều cao |
| 9 | vung | 100–111 | Mỗi chu kỳ quan trọng ở đâu? |
| 10 | tom-tat | 111–119 | Tóm tắt |

**Giải thích từng cảnh** (mỗi đoạn 57–67 tiếng, tương đương 40–60 từ khi tính từ ghép như "Mặt Trăng", "hoàng đạo" là một từ)

1. **hinh-hoc.** Có ba mặt phẳng cần phân biệt. Hoàng đạo là mặt phẳng Trái Đất quay quanh Mặt Trời. Xích đạo nghiêng 23°27′ so với hoàng đạo vì trục Trái Đất nghiêng. Quỹ đạo Mặt Trăng lại nghiêng thêm 5°9′ so với hoàng đạo. Vì thế Mặt Trăng lúc ở phía bắc, lúc ở phía nam xích đạo; góc lệch đó gọi là độ xích vĩ δ.

2. **diem-nut.** Quỹ đạo Mặt Trăng cắt hoàng đạo tại hai điểm. Điểm nút lên là nơi Mặt Trăng đi từ nam lên bắc, điểm nút xuống thì ngược lại; đường nối hai điểm gọi là đường nút. Kinh độ của điểm nút lên ký hiệu là N. Khi N = 0°, hai độ nghiêng cộng lại thành 28°36′; khi N = 180°, chúng trừ nhau còn 18°18′.

3. **chu-ky-nut.** Lực hút của Mặt Trời làm mặt phẳng quỹ đạo Mặt Trăng xoay chậm về phía tây, giống trục con quay đảo vòng, hết một vòng sau 18,61 năm. Do đó độ xích vĩ cực đại của Mặt Trăng lên xuống đều đặn: lớn nhất vào các năm 2006 và 2025, nhỏ nhất vào năm 2015. Đồ thị bên cạnh vẽ đúng dao động này.

4. **xich-vi.** Trong mô hình triều cân bằng, nước phình về phía Mặt Trăng và phía đối diện. Khi Mặt Trăng ở trên xích đạo, một điểm ở 20°B gặp hai lần nước lớn bằng nhau mỗi ngày. Khi độ xích vĩ lớn, chỗ phình nghiêng đi, một lần nước lớn cao hơn hẳn lần kia: tính nhật triều tăng.

5. **he-so-nut.** Thủy triều thực là tổng của nhiều sóng triều thành phần. K₁ và O₁ là sóng nhật triều, M₂ là sóng bán nhật triều chính. Hệ số nút f cho biết biên độ mỗi sóng thay đổi bao nhiêu theo N. Khi N = 0°, O₁ lớn hơn trung bình khoảng 19%, còn M₂ nhỏ đi khoảng 4%; khi N = 180° thì ngược lại.

6. **khoang-cach.** Quỹ đạo Mặt Trăng là hình elip. Ở cận điểm Mặt Trăng cách Trái Đất khoảng 363.300 km, ở viễn điểm khoảng 405.500 km, trung bình 384.400 km. Lực tạo triều tỉ lệ nghịch với lập phương khoảng cách, nên chỉ cần gần hơn 5,5% là lực đã mạnh hơn khoảng 18%; ở viễn điểm lực yếu đi khoảng 15%.

7. **can-diem.** Đường nối cận điểm và viễn điểm cũng xoay, nhưng về phía đông, hết một vòng sau 8,85 năm. Cứ khoảng 4,4 năm, đường này lại chỉ đúng hướng xuân phân – thu phân. Khi đó Mặt Trăng ở gần nhất đúng lúc nó và Mặt Trời cùng nằm gần xích đạo, nên bán nhật triều lớn nhất. Các mốc gần đây: 2015, 2020, 2024.

8. **tong-hop.** Đường xanh nhạt là dao động 18,61 năm, đường cam là dao động khoảng 4,4 năm, đường xanh đậm là tổng của chúng. Năm nào hai dao động cùng lên đỉnh thì triều cao hơn thường lệ và nguy cơ ngập ven biển tăng. Đây là sơ đồ minh họa: biên độ và pha thực tế khác nhau giữa vùng nhật triều và vùng bán nhật triều.

9. **vung.** Dạng triều được phân loại bằng hệ số F = (K₁ + O₁)/(M₂ + S₂): F nhỏ hơn 0,25 là bán nhật triều, lớn hơn 3 là nhật triều. Chu kỳ 18,61 năm mạnh nhất ở vùng nhật triều triều lớn, như ven Vịnh Bắc Bộ; chu kỳ khoảng 4,4 năm mạnh nhất ở vùng bán nhật triều có độ lớn triều trên 6 m.

10. **tom-tat.** Hai chu kỳ dài của Mặt Trăng điều biến triều cao. Chu kỳ nút 18,61 năm làm độ xích vĩ cực đại dao động từ 18°18′ đến 28°36′, quan trọng nhất ở vùng nhật triều. Chu kỳ cận điểm 8,85 năm tạo dao động khoảng 4,4 năm, quan trọng ở vùng bán nhật triều triều lớn. Dự báo ngập do triều cần tính cả hai.

**Câu hỏi tự kiểm tra**

- **chu-ky-trieu-mat-trang-q1** (nhớ). Mặt phẳng quỹ đạo Mặt Trăng xoay hết một vòng so với hoàng đạo sau bao lâu?
  A. 4,4 năm  B. 8,85 năm  C. 18,61 năm  D. 29,5 ngày
  **Đáp án C.** Đường nút lùi về phía tây khoảng 19,3° mỗi năm, nên 360°/19,34° ≈ 18,61 năm.

- **chu-ky-trieu-mat-trang-q2** (hiểu). Vào những năm N = 0° (ví dụ 2025), điều gì xảy ra với thủy triều?
  A. Sóng bán nhật triều M₂ đạt biên độ lớn nhất
  B. Độ xích vĩ cực đại lớn nhất, các sóng nhật triều K₁ và O₁ mạnh lên
  C. Mặt Trăng ở gần Trái Đất nhất
  D. Triều không thay đổi so với các năm khác
  **Đáp án B.** Khi N = 0°, hai độ nghiêng cộng nhau thành 28°36′, hệ số nút của O₁ là 1,196 còn của M₂ chỉ 0,963.

- **chu-ky-trieu-mat-trang-q3** (vận dụng). Xích đạo nghiêng 23°27′ so với hoàng đạo, quỹ đạo Mặt Trăng nghiêng 5°9′ so với hoàng đạo. Khi N = 180°, độ xích vĩ cực đại của Mặt Trăng là bao nhiêu?
  A. 5°9′  B. 18°18′  C. 23°27′  D. 28°36′
  **Đáp án B.** Khi N = 180° hai độ nghiêng trừ nhau: 23°27′ − 5°9′ = 18°18′.

- **chu-ky-trieu-mat-trang-q4** (vận dụng). Lực tạo triều tỉ lệ với 1/r³. Mặt Trăng ở cận điểm cách Trái Đất 363.300 km, khoảng cách trung bình là 384.400 km. Lực tạo triều ở cận điểm lớn hơn mức trung bình khoảng bao nhiêu?
  A. 5,5%  B. 11%  C. 18%  D. 27%
  **Đáp án C.** (384.400/363.300)³ = 1,058³ ≈ 1,18, tức lớn hơn khoảng 18%.

## 7b. Bản quyền

| Hình / tài nguyên | Nguồn | Xử lý |
|---|---|---|
| Logo HMO, PNG 223 × 131 px (tài nguyên `hmoLogo`, dòng 651) | Logo của Khoa KTTV&HDH | Giữ; tối ưu dung lượng (38 KB là lớn so với kích thước). Có thể bỏ khỏi sân khấu nếu khung chung đã mang nhận diện Khoa |
| Mọi hình quỹ đạo, bướu triều, đồ thị, thanh so sánh | Tự vẽ bằng SVG từ công thức (dòng 15–22, 77–169, 375–442) | Giữ |
| Số liệu và kết luận | Haigh, Eliot & Pattiaratchi (2011), JGR 116, C06025, doi:10.1029/2010JC006645; Pugh (1987, 2004); Eliot (2010); NASA Moon Fact Sheet | Trích dẫn bằng chữ, không sao chép hình của bài báo. Giữ dòng nguồn |
| Font Be Vietnam Pro, JetBrains Mono, Source Serif 4 | Giấy phép SIL OFL | Chỉ giữ Be Vietnam Pro |

Không có ảnh chụp từ sách hay hình của bên thứ ba.

## 8. Checklist nghiệm thu

1. Bản phát hành ≤ 500 KB; không chứa `Babel`, `__bundler`, `JetBrains`, `Source Serif`.
2. 0 lỗi console và 0 request ra ngoài ở 3 khung 1024 × 768, 390 × 844, 844 × 390.
3. Sân khấu 1440 × 1080; ở 1024 × 768 chiếm trọn chiều cao khả dụng, không còn dải đen trên dưới kiểu 16:9.
4. Tại N = 0° ô "δ cực đại" hiện 28°36′; tại N = 180° hiện 18°18′.
5. Chuỗi "Mặt Trời thẳng hàng" xuất hiện 0 lần trong mã và nội dung.
6. 10 cảnh, tổng 119 s (± 2 s); tự dừng cuối mỗi cảnh ở chế độ Tự học; ←/→, PageUp/PageDown, vuốt trái/phải đổi cảnh.
7. Dừng rồi chụp 2 ảnh cách nhau 1 s: giống nhau từng điểm ảnh (kể cả cảnh bìa và cảnh Khoảng cách).
8. Ba điều khiển (tốc độ quay Mặt Trăng, phóng đại, góc nhìn) dùng được bằng chạm, mỗi cái cao ≥ 44 px.
9. Trên ảnh 1440 × 1080 của cả 10 cảnh: nhãn ≥ 30 px, chú thích ≥ 36 px, riêng dòng nguồn và ghi chú tỉ lệ ≥ 22 px; không khối chữ nào > 20 từ.
10. Thanh f ở cảnh Hệ số nút: N = 0° hiện K₁ 1,121; O₁ 1,196; M₂ 0,963.

## 9. Ngoài phạm vi

- Không thêm nội dung chu kỳ ngắn (ngày Mặt Trăng 24 h 50 phút, triều cường – triều kém nửa tháng); đó là animation khác.
- Không chuyển sang WebGL/three.js.
- Không thay công thức Pugh (1987) bằng lịch thiên văn chính xác hơn.
- Không dựng bản đồ; không thêm số liệu trạm Việt Nam khi chưa có nguồn do TS. Đạt cung cấp.
- Không hạ mức nội dung cho năm 1 (không viết lại kịch bản).
- Không sửa `_nguon/`; không phát hành bản `Chu ky trieu Mat Trang.html`.

---

### Phụ lục: bản `-latest` khác bản cũ thế nào

Chỉ khác ở mã riêng (52.083 so với 47.422 byte) và danh sách cảnh; khung, font, logo giống hệt.
- Thêm cảnh "Điểm nút lên là gì?" 14 s (`NodePanel`, dòng 171–208): tổng 119 s thay vì 105 s, đánh số trang /11 thay vì /10.
- Thêm nhãn song ngữ Việt – Anh và nhãn điểm nút xuống, đường nút (dòng 78, 97–103, 137–145).
- Mặt Trăng quay chậm lại: 6,5 s/vòng thay vì 2,5 s (dòng 92, 726).
- Không có số liệu khoa học nào bị đổi; cả hai bản cùng mang K-1 và K-2. **Giữ bản `-latest` là đúng.**

### Câu hỏi cho TS. Đạt

1. **K-2:** thầy đồng ý sửa câu "Mặt Trời thẳng hàng … 4,4 năm một lần" thành "đường cận–viễn điểm trùng hướng xuân phân – thu phân" chứ? (Đề xuất: sửa.)
2. **23°27′ hay 23°26′:** giá trị hiện nay là 23°26′; bài báo và Pugh dùng 23°27′. Đề xuất giữ 23°27′ cho khớp bài báo và các tổng 28°36′, 18°18′.
3. **Bắc Hải 3,29 m so với "> 4 m":** thầy có bản PDF Haigh và nnk. (2011) để xác nhận F = 11,59, 3,29 m và ngưỡng 4 m, 6 m không? Đề xuất: nếu đúng, sửa câu thành "Bắc Hải … dao động 18,61 năm lớn nhất trong 4 trạm ví dụ, dù độ lớn triều chỉ 3,29 m".
4. **Ví dụ Việt Nam:** thầy có muốn thêm Hòn Dấu (nhật triều đều) vào cảnh 9 không, và dùng số F, độ lớn triều nào?
5. **Đối tượng:** nội dung này hợp năm 3 hoặc cao học. Thầy có muốn ghi "nâng cao" trên thẻ ở trang kho không? (Đề xuất: có, thêm tag `nang-cao`.)

`[CẦN NGUỒN]`: F = 11,59 và 3,29 m của Bắc Hải (bảng/hình nào); "> 4 m" và "> 6 m"; "10 cm" và "gấp 3 lần" (Eliot, 2010); biên độ 0,4 của dao động 4,4 năm trong sơ đồ tổng hợp; 363.300 / 405.500 / 384.400 km (đã ghi NASA Moon Fact Sheet, cần ngày truy cập).
