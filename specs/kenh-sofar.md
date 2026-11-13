# kenh-sofar — Kênh SOFAR hình thành như thế nào?

## 1. Định danh

| Mục | Giá trị |
|---|---|
| File gốc | `_nguon/Kenh SOFAR.html` (prompt gốc: `_nguon/prompts/prompt_sofar_animation.md`) |
| Học phần · Bài | để trống trong manifest (prompt gốc ghi "Bài 4, slide 11"; TS. Đạt sắp xếp sau) |
| Dung lượng | 1.919.313 byte = 1.874 KB |
| Công nghệ | Bundle Claude Design. React 18.3.1 + ReactDOM 18.3.1 (UMD, nhúng) · **Babel standalone 7.29.0 dịch JSX trên trình duyệt** (3.137.752 byte chưa nén) · `dc-runtime` (69 KB, bộ nạp `<x-dc>/<x-import>` của Claude Design) · `animations-v3.jsx` (55 KB, khung hoạt hình dùng chung) · `tweaks-panel.jsx` (25 KB, bảng chỉnh của trình soạn) · `sofar-scene.jsx` (32 KB, mã riêng của animation) · hình vẽ bằng SVG + HTML trong `foreignObject` · 27 file woff2 (633 KB) |
| Chạy offline | Có. `audit/screens/kenh-sofar/log.json`: 0 lỗi console, 0 request bị chặn ở cả 3 khung. Thẻ `<link rel="preconnect" href="https://fonts.googleapis.com">` (template dòng 11) không sinh request nhưng phải bỏ. |
| Giây chụp thumbnail | **70 s** (bó tia ±2°, ±4°, ±6° đan quanh trục, có dải kênh) |

Ghi chú về số dòng: "scene:N" là dòng N của `sofar-scene.jsx` (tài nguyên `0492317b…` trong bundle); "engine:N" là dòng N của `animations-v3.jsx` (`b6419697…`); "template:N" là dòng N của template đã giải mã. Tách bằng `node tools/audit/tach-bundle.cjs`.

**Mục tiêu học tập**
1. Giải thích vì sao tốc độ âm có cực tiểu ở độ sâu trung gian (nhiệt độ giảm làm c giảm, áp suất tăng làm c tăng) dù mật độ tăng đều theo độ sâu.
2. Tính tốc độ âm tại điểm quay đầu của một tia bằng định luật Snell: c_quay đầu = c_trục / cos θ₀.
3. So sánh tia bị giữ trong kênh (2°, 4°, 6°) với tia thoát kênh (18°) và nêu góc tới hạn ≈ 16° của profile Biển Đông này.

## 2. Chấm điểm hiện trạng

| Tiêu chí | Điểm | Bằng chứng |
|---|---|---|
| Đúng khoa học | 4 | Bảng profile khớp TEOS-10 tính lại (lệch ≤ 0,2 m/s, mục 3). Tia vẽ từ điểm dò tia nhúng sẵn (scene:62–69), không phải hàm sin. Trừ điểm: ô "Góc tia" mở đầu ở 3,9° (scene:171–172); dải "KÊNH SOFAR" 513–1.926 m mâu thuẫn với "góc lớn hơn ~16°" (scene:381, 462, 465). |
| Sư phạm | 4 | 7 cảnh đi đúng mạch: lớp nước → profile c(z) → nguồn → một tia chạy chậm có 6 chú thích → bó tia → tia thoát → tổng kết. Trừ điểm: chú thích 1 và 5 dài 38 và 25 từ (scene:187, 191), vượt chuẩn ≤ 20 từ. |
| Hình ảnh | 2 | Màu HMO đúng (scene:4). Nhưng mọi cỡ chữ dưới chuẩn đích: tiêu đề 36 px (scene:323, chuẩn ≥ 44), chú thích 20 px (scene:195, chuẩn ≥ 36), nhãn lớp, trục, nguồn 18 px (scene:339, 442, 486, chuẩn ≥ 30 và ≥ 22). Ở khung dọc 390 px nhãn 18 px còn ~5 px, không đọc được (`doc-t5.jpg`). |
| Tương tác | 1 | Chỉ có phát/dừng, về đầu, thanh tua (engine:732–796). Nút 24 × 24 px (đo bằng Playwright; chuẩn ≥ 44). Thanh tua chỉ nghe sự kiện chuột (engine:764–766), không kéo được bằng ngón tay. Chạm sân khấu không dừng (đã thử). ←/→ tua 0,1 s chứ không đổi cảnh (engine:478–481). Không có tốc độ, F, L. Có N/P và PageDown/PageUp nhảy tới 13 điểm dừng (scene:240–256). |
| Tự học | 2 | Chú thích trên hình giải thích khá đủ khi đọc được, nhưng tự chạy ngay khi mở, không tự dừng cuối cảnh, không có khung giải thích, không có câu hỏi. Trên điện thoại dọc gần như không đọc được chữ nào. |
| Hiệu năng | 1 | 1.874 KB (gấp 3,7 lần ngưỡng 500 KB). Babel dịch ~113 KB JSX lúc tải: 0,8 s trên máy thử, **3,2 s khi giảm CPU 4 lần** (giả lập điện thoại tầm trung). Mỗi khung hình React dựng lại toàn bộ cây, gồm đường tia tới 600 điểm × 6 tia (scene:90–95). 441 KB font Source Serif 4 và 66 KB JetBrains Mono không dùng trong cảnh. |
| Khả năng truy cập | 2 | Tương phản đạt: Slate #546E8F trên trắng ≈ 5,2:1; Navy trên trắng ≈ 13:1. Không có `prefers-reduced-motion`; nút không có `aria-label` (chỉ `title` tiếng Anh, engine:732, 744); `<html>` không có `lang="vi"` (template:2); thanh tua không dùng được bằng bàn phím ngoài ←/→. |
| Chất lượng mã | 3 | Một đồng hồ duy nhất, mọi thứ là hàm thuần của `T` (scene:234, engine:1017–1030) — rất hợp hợp đồng `ve(t)`. Trừ điểm: nhiều số "ma" (toạ độ hộp chú thích, thời điểm, scene:186–193, 240); vị trí phát lưu vào `localStorage` khoá `animstage-v3:t` (engine:360, 374, 398) nên mở lại sẽ chạy từ giữa chừng và **dùng chung khoá với mọi animation cùng khung trên cùng tên miền**; quay lại tab sau khi ẩn thì đồng hồ nhảy vọt (engine:437–439 không đặt lại mốc thời gian). |

**Điểm trung bình: 2,4 / 5**

## 3. Lỗi khoa học — có số cụ thể

Kết quả tính lại độc lập (python + `gsw` 3.x, TEOS-10; độ muối suy ngược từ ρ và T của bảng vì bảng không cho S):

| Kiểm tra | Trong file | Tính lại | Kết luận |
|---|---|---|---|
| c(z) 13 mức | 1.542,4 … 1.483,5 … 1.492,5 m/s (scene:9) | TEOS-10 lệch −0,2 … +0,2 m/s; Mackenzie (1981) lệch −0,2 … +0,2 m/s; S suy ra 33,3 (mặt) → 34,4–34,6 | Đúng |
| Hệ số phóng đại trục đứng | "~35 lần" (scene:362) | (780 px / 2 km) ÷ (980 px / 90 km) = 35,8 | Đúng |
| c tại điểm quay đầu tia 4° | 1.487,1 m/s (scene:188) | 1.483,5 / cos 4° = 1.487,12 | Đúng |
| Góc tới hạn chạm mặt | "~16°" (scene:465) | arccos(1.483,5 / 1.542,4) = 15,9° | Đúng |
| Tia 18° chạm mặt | x = 4,1 km (scene:141) | tích phân Snell trên profile: 4,08 km | Đúng |
| Múi tia 6° | dưới 26,2 km, trên 17,9 km; quay đầu 1.926 / 513 m | dò tia trên 13 điểm: 26,6 và 17,6 km; 1.942 / 530 m | Khớp trong sai số nội suy |
| Múi tia 4° | dưới 22,5 km, trên 22,3 km; 1.591 / 714 m | 22,7 và 19,7 km; 1.602 / 711 m | Múi trên lệch 2,6 km — xem câu hỏi C-1 |
| Tia 2° | quay đầu 1.322 / 927 m; múi 17,4 / 17,5 km | 1.345 / 951 m; 19,3 / 18,1 km | Lệch — xem lỗi K-3 |

**K-1. Ô "Góc tia" hiển thị sai giá trị ban đầu và giá trị giữa đường (scene:171–172).** Mã chia thêm cho hệ số chuẩn hoá `F_LO`, `F_UP` để ép góc về 0° đúng tại 1.591 m và 714 m. Hệ quả: lúc tia vừa rời trục, ô ghi "Tia 4° — Góc tia: 3,9°" (tính lại: 3,93° phía dưới trục, 3,97° phía trên, tức còn nhảy bậc khi cắt trục); tại 1.500 m ghi 2,1° trong khi Snell cho arccos(cos 4° × 1.486,0 / 1.483,5) = 2,23° và prompt gốc ghi 2,2°. Đúng phải là 4,0° tại trục và 2,2° tại 1.500 m.

**K-2. Dải "KÊNH SOFAR: âm bị 'nhốt' trong dải này" vẽ ở 513–1.926 m (scene:381–383, 462) mâu thuẫn với chú thích cảnh sau "Góc lớn hơn ~16°: tia thoát khỏi kênh" (scene:465).** 513 m và 1.926 m chỉ là độ sâu quay đầu của tia 6°. Tia 10° hay 15° vẫn bị giữ trong kênh (15° < 15,9°) nhưng đi ra ngoài dải này: tia 6,3° đã chạm đáy khung 2.000 m vì arccos(1.483,5 / 1.492,5) = 6,3°. Sinh viên sẽ hiểu sai rằng kênh chỉ dày 1,4 km. Nhãn đúng: "Bó tia ±6° nằm gọn trong dải 513–1.926 m; kênh thực rộng hơn" hoặc đổi tên dải thành "Vùng các tia ≤ 6° đi qua".

**K-3 (chờ xác nhận, câu hỏi C-1). Độ sâu quay đầu của tia 2° trong chú giải "927 / 1.322 m" (scene:459) không khớp với đường c(z) đang vẽ trên chính màn hình.** Tia 2° quay đầu ở nơi c = 1.483,5 / cos 2° = 1.484,40 m/s. Trên đường cong 13 điểm hiển thị, c = 1.484,40 ở 951 m và 1.345 m, lệch 24 m và 23 m so với chú giải. Nguyên nhân nhiều khả năng: quỹ đạo được dò trên profile Argo đầy đủ (`figs2.py`), còn hình chỉ vẽ 13 mức. Không phải lỗi vật lý, nhưng sinh viên đối chiếu hình với số sẽ thấy lệch.

**Số lỗi khoa học: 2 chắc chắn (K-1, K-2) + 1 chờ xác nhận (K-3).**

Nhận xét không tính là lỗi: (a) ρ trong bảng là mật độ tại chỗ (in situ, 1.036,8 kg/m³ ở 2.000 m), nên nói rõ một lần để sinh viên không nhầm với σ_θ; (b) ranh giới lớp "loé sáng" khi tia đi qua (scene:284) gợi ý tia chỉ gãy ở ranh giới, trong khi thực tế c đổi liên tục và tia cong đều — cần một câu trong phần Giải thích; (c) ký tự "~" ở cỡ 18 px trông như dấu trừ ("phóng đại -35 lần", `laptop-t5.jpg`), đổi thành "≈".

## 4. Danh sách thay đổi

| ID | Loại | Vị trí | Mô tả | Tiêu chí nghiệm thu |
|---|---|---|---|---|
| S-01 | Hiệu năng | toàn bundle | Tách `sofar-scene.jsx` vào `src/kenh-sofar/`, **biên dịch sẵn JSX bằng esbuild lúc build; bỏ Babel standalone, `dc-runtime`, `tweaks-panel.jsx`** và phần Watercolor, Stage, PlaybackBar của `animations-v3.jsx` (chỉ giữ `Easing`, `clamp`). | Bản phát hành không chứa chuỗi `Babel`, `text/babel`, `x-dc`, `x-import`, `TweaksPanel`. |
| S-02 | Hiệu năng | template:12–579 | **Chỉ giữ Be Vietnam Pro, bộ ký tự Latin + tiếng Việt, 3 độ đậm 400/600/700** (6 file, 54.660 byte). Bỏ 21 file: Be Vietnam Pro italic 400 (3 file), 500 (3 file), toàn bộ latin-ext (3 file còn lại), JetBrains Mono (6 file, 66 KB), Source Serif 4 (6 file, 441 KB). Chữ 500 trong mã đổi thành 600; dòng nguồn nghiêng dùng 400 thường màu Slate. | Bản phát hành có đúng 6 `@font-face`; chữ "ρ", "→", "≈", "°", "³" và mọi dấu tiếng Việt hiển thị không rơi về font hệ thống. |
| S-03 | Hiệu năng | — | **Mục tiêu ≤ 500 KB.** Ngân sách ở mục 5. | `animations/kenh-sofar/index.html` ≤ 500.000 byte; test mục 5 xanh. |
| S-04 | Tương tác | scene:233–257, 491–506 | Ghép vào khung chung: `HMO.dangKy({canh, thoiLuong: 100, ve(t), datNhan, khoiTao, huy})`. 7 cảnh có giờ theo giây: Lớp nước 0–8, Profile 8–18, Nguồn âm 18–22, Tia 4° 22–55, Bó tia 55–72, Tia thoát 72–84, Tổng kết 84–100. `ve(t)` dựng `<Piece>` với `T = t` (đồng bộ, không rAF riêng). Bỏ `CompositionStage`, bỏ trình nghe phím N/P/PageUp/PageDown riêng. | Tua lui từ 60 s về 30 s rồi tới 60 s cho ảnh giống hệt lần đầu ở 60 s; Space, ←/→, ↑/↓, F, L, PageUp/PageDown hoạt động theo STANDARDS. |
| S-05 | Chất lượng mã | engine:372–399 | Không lưu vị trí phát vào `localStorage`; mở trang luôn ở t = 0, trạng thái dừng. | Sau khi tải lại trang, `localStorage` không có khoá `animstage-v3:t`; khung hình đầu là t = 0. |
| S-06 | Khoa học | scene:171–172, 308–311 | Sửa K-1: `angle4(z) = arccos(min(1, cos 4° × c(z) / 1.483,5))`, bỏ `F_LO`, `F_UP`. Trong 15% chiều dài múi quanh điểm quay đầu, làm tròn hiển thị về 0,0° khi giá trị < 0,8°. | Tại t ứng với tia ở trục: "4,0°"; ở 1.500 m: "2,2°"; ở 1.300 m: "3,6°"; ở 900 m: "3,2°"; ở điểm quay đầu: "0,0°". |
| S-07 | Khoa học | scene:381–383, 462 | Sửa K-2: đổi nhãn dải thành "Bó tia ±6° đi trong dải 513–1.926 m"; thêm ở cảnh Tia thoát một dòng "Tia dưới ≈ 16° vẫn bị giữ trong kênh". | Không còn chuỗi "âm bị 'nhốt' trong dải này" gắn với dải 513–1.926 m. |
| S-08 | Khoa học | scene:459 | K-3: thực hiện theo trả lời câu hỏi C-1. | Theo phương án được duyệt. |
| S-09 | Hình ảnh | scene:323, 195, 334–368, 442–486 | Nâng cỡ chữ theo STANDARDS: tiêu đề 36 → 44 px; hộp chú thích 20 → 36 px; nhãn trục, nhãn nguồn, nhãn trục SOFAR, chú giải góc 18–20 → 30 px; ô góc tia 26 → 36 px; dòng nguồn và ghi chú phóng đại 18 → 22 px. Bố cục lại: panel trái rộng thêm (105–335 → khoảng 120–400), bỏ số trên vạch chia phụ. | Đo trên DOM ở khung 1440 × 1080: không phần tử chữ nào < 30 px trừ dòng nguồn và ghi chú tỉ lệ (≥ 22 px). |
| S-10 | Hình ảnh | scene:440–445 | 13 nhãn "ρ = … · c = …" không thể lên 30 px (13 × 36 px = 468 px, nhưng 4 lớp trên cùng chỉ cao 10–39 px). Thay bằng: chỉ ghi nhãn cho 4 lớp mốc (mặt 0 m, 200 m, trục 1.140 m, 2.000 m) ở 30 px; giá trị các lớp còn lại đưa vào bảng trong khung Giải thích. | Tối đa 4 nhãn lớp trên sân khấu, không chồng nhau, không che tia. |
| S-11 | Sư phạm | scene:186–193 | Tách chú thích 1 (38 từ) và 5 (25 từ) thành các chú thích ≤ 20 từ, ≤ 2 dòng; phần lý giải "nước bị nén nên 'cứng' lên nhanh hơn mức nặng thêm" chuyển xuống đoạn Giải thích. Mỗi lúc tối đa 2 chú thích. | Đếm từ từng chú thích ≤ 20. |
| S-12 | Tương tác | — | `datNhan('toi-gian')` (màn dọc): ẩn nhãn lớp, hộp chú thích, chú giải góc, ghi chú phóng đại; giữ tiêu đề, đường c(z), tia, dải kênh, ô góc tia. `datNhan('tat')` (phím L): ẩn thêm ô góc tia. | Ở khung 390 × 844 không có phần tử chữ nào trên sân khấu có chiều cao hiển thị < 8 px, trừ tiêu đề. |
| S-13 | Truy cập | template:2; engine | `lang="vi"`; khi `prefers-reduced-motion`: tắt nhịp đập của chấm tia (scene:210), vòng sóng nguồn (scene:276) và loé sáng ranh giới (scene:284); giữ chuyển động của tia. | Bật giả lập reduced-motion: chấm tia không đổi bán kính; tia vẫn chạy. |
| S-14 | Nhãn-số-chữ | scene:362, 465, 476 | "~35 lần" → "≈ 35 lần"; "~16°" → "≈ 16°"; "~1.140 m" → "≈ 1.140 m". Thêm vào dòng nguồn: "ρ: mật độ tại chỗ". | Không còn ký tự "~" trên sân khấu. |
| S-15 | Hiệu năng | scene:90–95, 397–408 | Tính sẵn chuỗi `d` của 6 tia một lần lúc khởi tạo; mỗi khung hình chỉ đổi `stroke-dasharray`/`clip` để lộ dần, không dựng lại chuỗi 600 điểm. | Thời gian một lần `ve(t)` ≤ 4 ms trên laptop (đo `performance.now()` trung bình 100 lần ở t = 65 s). |
| S-16 | Chất lượng mã | template:11, 881–883 | Bỏ `<link rel="preconnect">`, `OM_SCENES`, `OM_PLAYBACK`, `TWEAK_DEFAULTS`; danh sách cảnh chuyển vào `noidung/kenh-sofar.json`. | Không còn chuỗi `googleapis`, `OM_`. |

## 5. Phân tầng

- **Q1** (chỉ nhãn, số, chữ?): Không. Phải thay cách dựng (bỏ Babel, đổi khung phát), sửa công thức góc, bố cục lại vì cỡ chữ tăng gần gấp đôi.
- **Q2** (cấu trúc 3D thiết yếu?): Không. Kênh âm là hiện tượng phân tầng theo độ sâu; mặt cắt đứng 2D là cách biểu diễn chuẩn. 3D không thêm ý nào.
- **Q3**: sửa vật lý nhỏ + dựng lại bố cục + ghép khung + tối ưu → **T2 (Opus)**. Cũng là mức tối thiểu theo quy tắc bundle React + Babel.
- **Khối lượng: M** (1–4 giờ). Mã cảnh đã là hàm thuần của `T` nên ghép `ve(t)` gần như trực tiếp; phần nặng là bố cục lại ở cỡ chữ mới (S-09, S-10, S-11).

**Ngân sách dung lượng (ước lượng, byte chưa nén trong một file HTML)**

| Phần | Giữ React 18 | Đổi Preact |
|---|---|---|
| Thư viện dựng hình | 142.600 (react 10.751 + react-dom 131.835) | ≈ 16.000 (preact + hooks + compat tối thiểu) |
| Mã animation sau minify (từ 31.943 byte JSX) | ≈ 24.000 | ≈ 24.000 |
| `Easing`, `clamp` | ≈ 2.000 | ≈ 2.000 |
| Font: 6 file × base64 (54.660 × 4/3) | ≈ 73.000 | ≈ 73.000 |
| Khung chung `lib/khung.js` + CSS + `so-diem.js` (ước lượng) | ≈ 45.000 | ≈ 45.000 |
| `noidung` (giải thích + câu hỏi) | ≈ 7.000 | ≈ 7.000 |
| **Tổng** | **≈ 294.000 (0,29 MB)** | **≈ 167.000 (0,17 MB)** |

Kết luận: **ngưỡng 500 KB khả thi, còn dư khoảng 200 KB ngay cả khi giữ React 18**. Phần giảm chính: Babel (−3,1 MB chưa nén; trong file hiện tại chiếm ~880 KB sau gzip + base64), font thừa (−578 KB), `dc-runtime` + tweaks (−95 KB). Không cần đổi Preact để đạt ngưỡng; đổi chỉ khi muốn nhẹ hơn cho 4G. Con số thật sẽ có sau pilot.

## 6. Kịch bản 3D

Không áp dụng (T2).

## 7. Nội dung tự học (nháp, chờ duyệt ở G1)

**Cảnh 1 — Các lớp nước (0–8 s).** Mặt cắt cho thấy nước Biển Đông từ mặt xuống 2.000 m, chia thành các lớp nằm ngang. Màu càng đậm thì âm truyền càng chậm. Bạn hãy để ý: lớp đậm nhất không nằm ở mặt, cũng không nằm ở đáy, mà ở lưng chừng, quanh độ sâu 1.140 m. Số liệu do một phao Argo đo ngày 22/9/2016.

**Cảnh 2 — Profile tốc độ âm (8–18 s).** Mật độ nước tăng đều từ mặt xuống đáy, nhưng tốc độ âm thì không. Từ mặt xuống 1.140 m, nước lạnh dần nên âm chậm lại, từ 1.542 còn 1.483,5 m/s. Sâu hơn nữa, nhiệt độ gần như không đổi, còn áp suất tiếp tục tăng làm âm nhanh trở lại. Nơi chậm nhất gọi là trục SOFAR.

**Cảnh 3 — Nguồn âm trên trục (18–22 s).** Ta đặt một nguồn âm ngay trên trục SOFAR. Âm lan ra mọi hướng, nhưng để dễ theo dõi, ta chỉ vẽ từng tia âm: đường đi của một phần nhỏ mặt sóng. Mỗi tia rời nguồn với một góc nghiêng khác nhau so với phương ngang. Hình dài 90 km, trục đứng phóng đại khoảng 35 lần.

**Cảnh 4 — Một tia 4° (22–55 s).** Tia rời trục chúc xuống 4°. Càng xuống, tốc độ âm càng lớn nên tia bị bẻ dần về phương ngang, nằm ngang ở 1.591 m rồi quay lên. Qua trục, tia gặp nước ấm hơn, âm nhanh hơn, và bị bẻ xuống ở 714 m. Thực tế tia cong đều về phía âm chậm hơn, không gãy khúc.

**Cảnh 5 — Bó tia (55–72 s).** Phát thêm các tia 2°, 4°, 6° cả hướng lên lẫn hướng xuống. Tia nghiêng ít dao động hẹp quanh trục; tia nghiêng nhiều đi xa hơn mới quay đầu: tia 6° lên tới 513 m và xuống tới 1.926 m. Không tia nào chạm mặt biển hay đáy biển, nên âm gần như không mất năng lượng.

**Cảnh 6 — Tia thoát kênh (72–84 s).** Tia 18° quá dốc. Tốc độ âm ở mặt biển, 1.542 m/s, chưa đủ lớn để bẻ nó nằm ngang, nên tia chạm mặt biển sau khoảng 4 km rồi phản xạ. Mỗi lần chạm mặt hoặc đáy, âm mất bớt năng lượng. Với profile này, tia nghiêng dưới khoảng 16° bị giữ lại, tia dốc hơn thì thoát.

**Cảnh 7 — Tổng kết (84–100 s).** Ba ý cần nhớ. Một: ở Biển Đông, tốc độ âm nhỏ nhất ở khoảng 1.140 m, đó là trục SOFAR. Hai: tia âm luôn cong về phía nước có tốc độ âm nhỏ hơn, không phải về phía nước đặc hơn. Ba: âm bị giữ quanh trục nên âm tần số thấp truyền được hàng nghìn kilômét.

**Câu hỏi tự kiểm tra**

- **kenh-sofar-q1** (nhớ). Theo profile phao Argo trong animation, trục SOFAR ở Biển Đông nằm ở độ sâu khoảng bao nhiêu?
  A. 100 m  B. 500 m  **C. 1.140 m**  D. 2.000 m
  Giải thích: tốc độ âm nhỏ nhất, 1.483,5 m/s, đo được ở 1.140 m; đó là trục kênh.

- **kenh-sofar-q2** (hiểu). Vì sao bên dưới trục SOFAR tốc độ âm lại tăng theo độ sâu?
  A. Vì nước ấm lên  B. Vì độ muối giảm mạnh  **C. Vì áp suất tăng trong khi nhiệt độ gần như không đổi**  D. Vì mật độ giảm
  Giải thích: từ 1.140 m xuống 2.000 m nhiệt độ chỉ giảm 3,7 → 2,5 °C, còn áp suất tăng thêm khoảng 86 bar, làm c tăng từ 1.483,5 lên 1.492,5 m/s.

- **kenh-sofar-q3** (vận dụng). Một tia âm rời trục SOFAR (c = 1.483,5 m/s) với góc 4° so với phương ngang. Tia quay đầu ở nơi tốc độ âm bằng bao nhiêu? (cos 4° = 0,99756)
  A. 1.479,9 m/s  B. 1.483,5 m/s  **C. 1.487,1 m/s**  D. 1.542,4 m/s
  Giải thích: theo định luật Snell, tia nằm ngang khi c = c_trục / cos θ₀ = 1.483,5 / 0,99756 ≈ 1.487,1 m/s.

- **kenh-sofar-q4** (vận dụng). Tốc độ âm ở trục là 1.483,5 m/s, ở mặt biển là 1.542,4 m/s. Tia phát từ trục phải nghiêng hơn góc nào thì mới chạm được mặt biển?
  A. Khoảng 4°  B. Khoảng 6°  **C. Khoảng 16°**  D. Khoảng 45°
  Giải thích: cos θ = 1.483,5 / 1.542,4 = 0,9618 nên θ ≈ 15,9°; tia nghiêng ít hơn sẽ quay đầu trước khi tới mặt.

## 7b. Bản quyền

| Thành phần | Nguồn | Xử lý |
|---|---|---|
| Ảnh raster nhúng | Không có | — |
| Biểu tượng loa (đường SVG `VOLUME`, scene:231) | Trùng hình biểu tượng "volume-2" của Lucide (giấy phép ISC, cho phép dùng lại) | Giữ; ghi nguồn trong `docs/` hoặc thay bằng hình tự vẽ (S, 5 phút) |
| SVG thumbnail của bundle (`#__bundler_thumbnail`) | Sinh tự động khi xuất | Bỏ cùng bundle |
| Font Be Vietnam Pro | SIL Open Font License 1.1 | Giữ, nhúng subset |
| Font JetBrains Mono, Source Serif 4 | SIL OFL 1.1 | Bỏ (không dùng) |
| React 18.3.1 | MIT | Giữ hoặc thay Preact (MIT) |
| Số liệu phao Argo 2902696 | Dữ liệu Argo công khai; cần ghi lời cảm ơn chuẩn của chương trình Argo và DOI của GDAC `[CẦN NGUỒN: câu trích dẫn Argo TS. Đạt muốn dùng]` | Thêm vào dòng nguồn hoặc khung Giải thích |

## 8. Checklist nghiệm thu

1. `animations/kenh-sofar/index.html` ≤ 500.000 byte; không chứa `Babel`, `x-dc`, `googleapis`, `Source Serif`, `JetBrains`.
2. 0 lỗi console và 0 request ra ngoài ở 3 khung 1024 × 768, 390 × 844, 844 × 390.
3. Đúng 7 cảnh, tổng 100 s; tự dừng ở cuối mỗi cảnh trong chế độ Tự học.
4. Ô góc tia: 4,0° khi tia ở trục; 2,2° ở 1.500 m; 0,0° ở 1.591 m và 714 m; khi tia 18° chạm mặt: 8,6°.
5. Tia 4° quay đầu ở 1.591 m (± 10 m theo trục hình) và 714 m; tia 18° chạm mặt ở x = 4,1 km.
6. Không còn nhãn nào nói dải 513–1.926 m là toàn bộ kênh; có câu "tia dưới ≈ 16° vẫn bị giữ".
7. Ở khung 1440 × 1080: tiêu đề ≥ 44 px, chú thích ≥ 36 px, nhãn ≥ 30 px, dòng nguồn ≥ 22 px; mỗi chú thích ≤ 20 từ; không quá 2 chú thích cùng lúc.
8. Tua từ 60 s về 30 s rồi lại 60 s: ảnh chụp trùng ảnh lần đầu ở 60 s (sai khác điểm ảnh = 0 khi tắt nhịp đập).
9. Tải lại trang: bắt đầu ở t = 0, đang dừng; không ghi `animstage-v3:t`.
10. Văn bản và mã nguồn phát hành: 0 lần "độ mặn", 0 lần tên biển sai; "Biển Đông" xuất hiện trong dòng nguồn.

## 9. Ngoài phạm vi

- Không dò tia lại, không đổi toạ độ các múi tia (scene:62–69, 141) trừ khi TS. Đạt trả lời C-1 theo hướng đó.
- Không đổi 13 giá trị profile.
- Không thêm thanh trượt chọn góc tia, không thêm profile vùng biển khác, không thêm âm thanh.
- Không giữ chức năng xuất MP4, bảng Tweaks, motion editor.
- Không dựng 3D.
- Không viết bản tiếng Anh.

## Câu hỏi cho TS. Đạt

- **C-1 (K-3).** Độ sâu quay đầu và chiều dài múi của tia 2° và múi trên tia 4° lệch với đường c(z) 13 điểm đang vẽ (2°: 927 / 1.322 m so với 951 / 1.345 m; múi trên 4°: 22,3 km so với 19,7 km). Tôi đoán `figs2.py` dò tia trên profile Argo đầy đủ. Đề xuất: giữ nguyên quỹ đạo, thêm một dòng ở dòng nguồn "Quỹ đạo tia dò trên profile đầy đủ; hình chỉ vẽ 13 mức đại diện". Phương án khác: thầy gửi `figs2.py` hoặc profile đầy đủ để vẽ đường c(z) mịn đúng như dữ liệu dò tia.
- **C-2 (K-2).** Độ sâu đáy tại 12,0°N, 114,5°E là bao nhiêu `[CẦN NGUỒN]`? Nếu khoảng 4.000 m thì kênh ở đây bị giới hạn bởi đáy trước khi tới độ sâu liên hợp của mặt (nơi c = 1.542,4 m/s). Đề xuất: không nêu số, chỉ ghi "kênh thực rộng hơn dải này".
- **C-3.** Bảng không có cột độ muối. Giá trị suy ngược từ ρ và T là 33,3 (mặt) đến 34,4–34,6 (dưới 100 m). Thầy có muốn thêm cột S vào bảng trong khung Giải thích không? Đề xuất: có, lấy từ file phao gốc `[CẦN NGUỒN]`.
- **C-4.** Câu trích dẫn dữ liệu Argo thầy muốn dùng (mục 7b).
