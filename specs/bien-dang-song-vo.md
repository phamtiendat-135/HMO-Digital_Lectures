# bien-dang-song-vo — Sóng vào bờ: biến dạng và sóng vỡ

Review ngày 13/11/2026. Bằng chứng: số dòng của `_nguon/bien_dang_song_vo.html`; ảnh `audit/screens/bien-dang-song-vo/`; phép tính lại độc lập bằng Python (lý thuyết sóng tuyến tính, g = 9,81 m/s²).

## 1. Định danh

| Mục | Giá trị |
|---|---|
| File gốc | `_nguon/bien_dang_song_vo.html` (637 dòng) |
| Prompt gốc | `_nguon/prompts/prompt_bien_dang_song_animation.md` |
| Học phần · Bài | để trống (TS. Đạt xếp sau); màn hình chờ đang ghi "Hải dương học đại cương · Chương Sóng biển" (dòng 80) |
| Dung lượng | 58 KB (59.438 byte) |
| Công nghệ | Vanilla JS + Canvas 2D (một canvas 1440 × 1008), thanh điều khiển HTML; không thư viện |
| Chạy offline | Có. `log.json`: 0 lỗi console, 0 request bị chặn ở cả 3 khung |
| Cấu trúc | 7 cảnh có giờ, tổng 256 s (dòng 186–195); màn hình chờ có nút "Bắt đầu" (dòng 79–88) |
| Giây chụp thumbnail | Cảnh 3, sóng cam ở h ≈ 20 m: t nguồn = 90 s (= giây 65 trên dòng thời gian mới, xem S-07) |

**Mục tiêu học tập**
1. Giải thích vì sao khi sóng vào nông thì chu kỳ T giữ nguyên còn bước sóng L và tốc độ pha c giảm.
2. Tính L₀ = gT²/2π và độ sâu sóng vỡ theo tiêu chuẩn H/h = 0,78.
3. Nhận biết ba kiểu sóng vỡ (tràn, cuộn, dâng) từ độ dốc bờ và số Iribarren ξ₀.

## 2. Chấm điểm hiện trạng

| Tiêu chí | Điểm | Bằng chứng |
|---|---|---|
| Đúng khoa học | 3 | Mọi con số hiển thị khớp phép tính lại (bảng ở mục 3). Nhưng có 4 lỗi: chú thích "ma sát với đáy hãm chân sóng" (dòng 507), ngưỡng nước nông "h < L₀/20 = 5 m" (dòng 337), kiểu vỡ vẽ ra không theo ξ₀ ở cảnh Thử nghiệm (dòng 218 so với 481), "quỹ đạo còn 4%" không khớp hình vẽ (dòng 505). |
| Sư phạm | 4 | Trình tự 7 cảnh hợp lý; có sóng cam để mắt bám theo (dòng 322–325), kính lúp tỉ lệ thật (dòng 376–401), ví dụ dòng ô tô (dòng 515), ba lý do sóng vỡ đánh số (dòng 519–521). Trừ điểm vì cảnh 3 dài 120 s và phụ thuộc lời giảng. |
| Hình ảnh | 3 | Laptop 1024 × 768 đẹp, đúng màu HMO (dòng 8, 96), có ghi chú "Không theo tỉ lệ" (dòng 344). Cỡ chữ dưới chuẩn: chú thích 34 px (dòng 121, chuẩn ≥ 36), nhãn mặc định 28 px (dòng 128, chuẩn ≥ 30), nhiều nhãn 20–24 px (dòng 336–339, 341, 350, 356–358, 416–417, 424–425), chữ 16–18 px (dòng 394, 434, 454, 458, 478). Điện thoại: xem "Tương tác". |
| Tương tác | 3 | Bàn phím và clicker đủ (dòng 607–621): Space/B/., ←/→, PageUp/PageDown, ↑/↓, 1–7, F, L, T. Có 5 tốc độ, thanh tua, chọn bờ, 2 thanh trượt. **Điện thoại dọc hỏng**: ảnh `doc-t0/t5/t15.jpg` đen hoàn toàn; đo được `innerWidth` = 1440 nên `fit()` (dòng 625) đặt SCALE = 1 và sân khấu nằm ngoài màn hình. Điện thoại ngang: sân khấu lệch phải, bị cắt (`ngang-t5.jpg`), nút cao 22 px (chuẩn ≥ 44). Không có chạm sân khấu để phát/dừng, không vuốt. Tên cảnh chỉ hiện khi rê chuột (dòng 590). |
| Tự học | 2 | Chú thích ngắn trên hình đủ ý cho người đã nghe giảng; không có đoạn giải thích, không có câu hỏi. Phải bấm "Bắt đầu" mới thấy nội dung (ba ảnh t0/t5/t15 giống hệt nhau). |
| Hiệu năng | 4 | 58 KB, tính trước trên lưới 0,5 m một lần (dòng 152–174, 633). Trừ điểm: `requestAnimationFrame` chạy liên tục kể cả khi đang dừng hoặc tab ẩn (dòng 585), không có `visibilitychange`. fps trên điện thoại thật: kiểm tay. |
| Khả năng truy cập | 2 | Có `aria-label` cho canvas và nút (dòng 57, 63–77), có `focus-visible` (dòng 17). Không có `prefers-reduced-motion`; toàn bộ nội dung nằm trong canvas nên trình đọc màn hình không đọc được; chữ Slate 16–18 px quá nhỏ. |
| Chất lượng mã | 3 | Có một đồng hồ `PB.t` và ánh xạ `tauOf(t)` (dòng 199–200), tua lui được. Nhưng `render(t, now)` còn phụ thuộc đồng hồ tường `performance.now()` cho chuyển bờ và nội suy tốc độ (dòng 207, 213, 549, 574) nên chưa là hàm thuần của t; số "ma": `TAU_B = 166` (dòng 151), bảng `TAUK` (dòng 199), các mốc giây rải trong `overlays` (dòng 501–538); nhiều số kết quả viết cứng trong chuỗi (dòng 416–417, 433, 519–521, 528). Còn hook gỡ lỗi `window.__seek` (dòng 634). 0 lỗi console. |

**Điểm trung bình: 3,0**

## 3. Lỗi khoa học

**Bảng kiểm tra số (H₀ = 1,5 m, T = 8 s) — tất cả khớp:**

| Đại lượng | Animation / prompt | Tính lại |
|---|---|---|
| L₀, c₀ | 99,9 m; 12,5 m/s | 99,92 m; 12,49 m/s (45,0 km/h) |
| h = 50 m: L, c, H | 99,6; 12,45; 1,49 | 99,56; 12,445; 1,486 |
| h = 20 m | 88,8; 11,10; 1,38 | 88,79; 11,099; 1,377 |
| H nhỏ nhất | 1,37 m tại h ≈ 16 m | 1,369 m tại h = 15,9 m (Ks = 0,913; cg tăng 6,25 → 7,49 m/s) |
| h = 10 m | 70,9; 8,86; 1,40 | 70,90; 8,862; 1,399 |
| h = 5 m | 53,1; 6,64; 1,53 | 53,08; 6,635; 1,534 |
| Điểm vỡ | h_b 2,29; H_b 1,79; L_b 37,0 | 2,289; 1,786; 37,0 |
| H/L tăng | 0,015 → 0,048 (gấp 3,2) | 0,0150 → 0,0482 (gấp 3,21) |
| c đỉnh, c chân | 5,6; 3,7 m/s (~50%) | √(9,81 × 3,18) = 5,59; √(9,81 × 1,40) = 3,70; nhanh hơn 51% |
| Cách bờ | 114 m (1:50); 23 m (1:10) | 114,5 m; 22,9 m |
| Thời gian x = 0 → điểm vỡ | 126 s (1:50); 81 s (1:10) | 125,6 s; 80,7 s |
| ξ₀ | 0,16; 0,82; 4,1 | 0,163; 0,816; 4,08 |
| Sau vỡ H = 0,78h | 1,56 m; 0,78 m | 1,56; 0,78 |
| Thử nghiệm (T 12 s; H₀ 3 m; H₀ 1 m, T 5 s) | h_b 2,65; 4,08; 1,39 | 2,655; 4,078; 1,394 |

**Lỗi:**

- **K-01 (dòng 507, cảnh 2).** Chú thích: "Ma sát với đáy hãm chân sóng — sóng bắt đầu biến dạng." Sai cơ chế. Toàn bộ mô hình trong file là lý thuyết tuyến tính **không ma sát** (dòng 149–150) và vẫn cho c giảm 12,45 → 4,63 m/s. Sóng chậm lại vì quan hệ tán sắc ω² = g·k·tanh(kh): khi h giảm thì c giảm, không cần ma sát. Đề xuất: "Đáy cản chuyển động của nước → sóng chậm lại, bắt đầu biến dạng."
- **K-02 (dòng 336–337, cảnh 2).** Dải "NƯỚC NÔNG: h < L₀/20 = 5 m". Tiêu chuẩn nước nông dùng bước sóng tại chỗ: h < L/20. Tại h = 5 m, L = 53,1 m nên h/L = 0,094 > 0,05: vẫn là vùng trung gian (c = 6,64 m/s, trong khi √(g·h) = 7,00 m/s, lệch 5,5%). Với T = 8 s, h = L/20 chỉ đạt ở h = 1,52 m, tức **sau** điểm vỡ (2,29 m). Ngưỡng nước sâu h > L₀/2 = 50 m thì đúng (h = L/2 tại 49,8 m).
- **K-03 (dòng 218 so với dòng 481, cảnh 7).** Kiểu vỡ được **vẽ** lấy cứng theo độ dốc bờ (`SHORES[].type`), còn kiểu vỡ được **ghi** trong bảng Thử nghiệm tính theo ξ₀. Hai cái lệch nhau khi kéo thanh trượt. Ví dụ H₀ = 3,0 m, T = 5 s: bờ 1:10 có ξ₀ = 0,36 → bảng ghi "VỠ TRÀN" nhưng hình vẽ ống cuộn; bờ 1:2 có ξ₀ = 1,80 → bảng ghi "VỠ CUỘN" nhưng hình vẽ vỡ dâng.
- **K-04 (dòng 505, cảnh 1).** "Ở độ sâu L/2 = 50 m, quỹ đạo chỉ còn 4%." Con số e^(−π) = 4,3% đúng cho nước sâu vô hạn. Trong animation đáy nằm đúng ở 50 m và hạt được vẽ bằng công thức độ sâu hữu hạn (dòng 231–233): sát đáy hạt chỉ đi ngang, biên độ 1/cosh(kh) = 8,5% so với mặt, thẳng đứng bằng 0. Chữ và hình không khớp. Đề xuất: "Ở độ sâu L/2, chuyển động chỉ còn dưới 1/10 so với mặt."

**Giản lược cần ghi rõ (không tính là lỗi):** chỉ số vỡ 0,78 dùng chung cho cả ba độ dốc, nên h_b = 2,29 m ở mọi bờ; thực tế chỉ số vỡ tăng theo độ dốc. Ước lượng tốc độ đỉnh/chân bằng √(g·(h ± H/2)) là minh hoạ định tính.

## 4. Danh sách thay đổi

| ID | Loại | Vị trí | Mô tả | Tiêu chí nghiệm thu |
|---|---|---|---|---|
| S-01 | Khoa học | dòng 507, cảnh 2 | Sửa K-01: bỏ "ma sát", viết lại theo phương án TS. Đạt chọn ở G1 | Chuỗi "ma sát" xuất hiện 0 lần trong bản phát hành |
| S-02 | Khoa học | dòng 311, 336–337, cảnh 2 | Sửa K-02 theo phương án TS. Đạt chọn (đề xuất: dải thứ ba đổi thành "GẦN BỜ" và ghi "nước nông thật sự: h < L/20 ≈ 1,5 m") | Không còn chuỗi "h < L₀/20 = 5 m"; nhãn mới đúng với L tại chỗ |
| S-03 | Khoa học | dòng 218, 267, 364, cảnh 7 | Sửa K-03: ở cảnh Thử nghiệm, kiểu vỡ vẽ ra lấy từ ξ₀ (ngưỡng 0,5 và 3,3), cùng nguồn với bảng | H₀ = 3,0 m, T = 5 s, bờ 1:10: bảng ghi "VỠ TRÀN" và hình không có ống cuộn |
| S-04 | Khoa học | dòng 505, cảnh 1 | Sửa K-04 | Chú thích không còn "4%"; hạt sát đáy trong hình vẫn đi ngang |
| S-05 | Nhãn-số-chữ | dòng 416 | "ĐỈNH (nước sâu h + H/2 = 3,18 m)" → "ĐỈNH (độ sâu nước h + H/2 = 3,18 m)" | Đúng chuỗi mới |
| S-06 | Tương tác | toàn file | Ghép vào bộ khung chung: đăng ký `HMO.dangKy({canh, thoiLuong, ve(t), datNhan, khoiTao, huy})`. Bỏ thanh điều khiển, màn hình chờ, bắt phím, `requestAnimationFrame`, `fit()`, toàn màn hình riêng (dòng 62–88, 572–626). Giữ lại như điều khiển riêng của animation: chọn bờ (3 nút) và 2 thanh trượt, gọi `HMO.yeuCauVe()` khi đổi | Không còn `requestAnimationFrame` và `addEventListener('keydown'` trong `src/bien-dang-song-vo/`; qua 6 kiểm tra smoke ở 3 khung |
| S-07 | Tương tác | dòng 186–195 | Dòng thời gian mới ở tốc độ 1×: cảnh 1–2 mỗi cảnh 20 s; cảnh 3 dài 60 s (nhúng tốc độ 2× vào ánh xạ t → τ); cảnh 4 dài 84 s (nhúng 0,25×); cảnh 5 dài 30 s; cảnh 6 dài 20 s; cảnh 7 là **cảnh tự do** `lap: 8` (một chu kỳ sóng). Bỏ việc tự đổi tốc độ theo cảnh (dòng 584) | `thoiLuong` phần có giờ = 234 s; ở 1× sóng cam tới điểm vỡ đúng cuối cảnh 3 |
| S-08 | Hiệu năng | dòng 207–213, 549, 574 | `ve(t)` thuần: chuyển bờ mượt 1 s và mọi nội suy tính theo t hoạt hình, không theo `performance.now()`. Gọi `ve(t)` hai lần với cùng t và cùng lựa chọn bờ phải ra cùng hình | Test: hai ảnh chụp cùng t giống nhau từng điểm ảnh; tua lui từ cảnh 5 về cảnh 3 không sai hình |
| S-09 | Hình ảnh | dòng 121, 128 và các nhãn nêu ở mục 2 | Cỡ chữ theo chuẩn: chú thích ≥ 36 px, nhãn ≥ 30 px, số trong bảng ≥ 32 px, ghi chú tỉ lệ và nguồn ≥ 22 px. Nhãn không đủ chỗ thì chuyển xuống khung Giải thích | Không còn cỡ chữ < 22 px trên sân khấu; không nhãn nào đè nhau ở 7 ảnh chụp giữa cảnh |
| S-10 | Hình ảnh | `datNhan` | `'toi-gian'` (màn dọc): ẩn bảng số liệu, biểu đồ, công thức, hộp ξ₀, các hộp lý do và chú thích; giữ panel toàn cảnh, kính lúp, sóng cam, vạch điểm vỡ. `'tat'`: như phím L cũ | Ở 390 × 844 sân khấu không trống, không có chữ nhỏ hơn 8 px CSS còn hiển thị |
| S-11 | Sư phạm | dòng 484–492 | Bỏ 4 thẻ tổng kết và phím T khỏi sân khấu; nội dung đưa vào đoạn Giải thích cảnh 7 | Không còn hàm `cards` |
| S-12 | Tương tác | dòng 589–591 | Bỏ thông tin chỉ hiện khi rê chuột (tên cảnh do khung hiển thị) | Không còn `mouseenter` |
| S-13 | Truy cập | toàn file | `prefers-reduced-motion`: tắt bọt bắn và vệt cam trang trí (dòng 323, 367–368, 409), giữ chuyển động sóng và hạt | Bật reduced-motion: không còn các chấm bọt bay ở cảnh 4 |
| S-14 | Nhãn-số-chữ | dòng 553 | Dòng nguồn giữ nguyên nội dung, thêm "Sóng mẫu: H₀ = 1,5 m, T = 8 s" và ghi chú "chỉ số vỡ 0,78 dùng chung cho mọi độ dốc (giản lược)" | Có đủ hai ý trên sân khấu hoặc trong khung Giải thích |
| S-15 | Chất lượng mã | dòng 151, 199, 501–538, 634 | Gom các mốc giây vào một bảng hằng số có tên; bỏ `window.__seek` | Không còn `__seek`; các mốc giây của chú thích nằm trong một đối tượng cấu hình |

## 5. Phân tầng

- **Q1** (chỉ sửa nhãn, số, chữ?): Không. S-03 sửa logic chọn kiểu vỡ; S-06 đến S-08 thay vòng lặp và ánh xạ thời gian.
- **Q2** (cấu trúc 3D thiết yếu?): Không. Sóng truyền vuông góc bờ, mặt cắt 1D là cách thể hiện rõ nhất; đề bài cũng nêu mặt cắt 1D là ví dụ không đủ điều kiện.
- **Q3** → **T2 (Opus)**.

**Khối lượng: L (ước 5–7 giờ).** Phần nặng là S-06 đến S-08 (tách khung, viết lại ánh xạ thời gian, làm `ve(t)` thuần trong khi vẫn giữ chọn bờ và thanh trượt) và S-09/S-10 (dàn lại chữ). Phần vật lý giữ nguyên.

## 6. Kịch bản 3D

Không áp dụng (T2).

## 7. Nội dung tự học (nháp, chờ duyệt ở G1)

**Cảnh 1 — Sóng ở nước sâu.**
Ngoài khơi, mỗi hạt nước chỉ quay một vòng tròn rồi trở về chỗ cũ: sóng mang năng lượng đi, không mang nước đi. Vòng tròn nhỏ dần theo độ sâu. Xuống tới nửa bước sóng (khoảng 50 m với sóng chu kỳ 8 s), nước gần như đứng yên, nên đáy chưa ảnh hưởng tới sóng.

**Cảnh 2 — Sóng chạm đáy.**
Khi độ sâu nhỏ hơn nửa bước sóng, đáy bắt đầu cản chuyển động của nước. Quỹ đạo hạt nước bị ép dẹt thành hình elip, sát đáy chỉ còn chuyển động tới – lui. Từ đây tốc độ sóng phụ thuộc vào độ sâu: càng nông sóng càng chậm, và sóng bắt đầu biến dạng.

**Cảnh 3 — H, L, c thay đổi thế nào?**
Hãy theo con sóng cam. Hai máy đếm ở độ sâu 50 m và 5 m đều đo chu kỳ 8 s: chu kỳ không đổi. Sóng chậm dần nên các đỉnh dồn lại, bước sóng từ 100 m còn 53 m. Độ cao sóng giảm nhẹ còn 1,37 m quanh độ sâu 16 m, sau đó tăng dần vì năng lượng bị dồn lại.

**Cảnh 4 — Vì sao sóng vỡ?**
Có ba lý do cùng lúc. Sóng dốc lên gấp ba lần so với ngoài khơi. Đỉnh sóng nằm ở chỗ nước sâu hơn chân sóng nên chạy nhanh hơn khoảng 50%, mặt trước dựng đứng. Khi độ cao sóng bằng 0,78 lần độ sâu, ở đây là 1,79 m trên 2,29 m nước, không còn đủ nước đỡ đỉnh sóng và sóng đổ.

**Cảnh 5 — Ba kiểu sóng vỡ.**
Độ dốc bờ quyết định kiểu vỡ, đo bằng số Iribarren ξ₀. Bờ thoải 1:50 (ξ₀ = 0,16): sóng vỡ tràn, bọt lan dần, cách bờ 114 m. Bờ vừa 1:10 (ξ₀ = 0,82): sóng vỡ cuộn thành ống, chỉ cách bờ 23 m. Bờ dốc 1:2 (ξ₀ = 4,1): sóng không đổ mà dâng lên mặt bờ rồi rút.

**Cảnh 6 — Vùng sóng đổ và vùng sóng vỗ.**
Sau điểm vỡ là vùng sóng đổ: sóng thành dải bọt trắng chạy vào bờ, độ cao giảm dần theo độ sâu (H = 0,78·h). Trong cùng là vùng sóng vỗ, nơi nước trườn lên bãi rồi rút xuống. Chỉ từ đây nước mới thật sự chảy vào bờ, sinh ra dòng chảy ven bờ và mang theo bùn cát.

**Cảnh 7 — Thử nghiệm.**
Kéo hai thanh trượt để đổi độ cao sóng H₀ và chu kỳ T, rồi chọn độ dốc bờ. Sóng cao hơn hoặc chu kỳ dài hơn sẽ vỡ ở chỗ sâu hơn, xa bờ hơn. Tóm lại: vào nông thì T giữ nguyên, L và c giảm, H tăng; khi H/h chạm 0,78 thì sóng vỡ, và độ dốc bờ quyết định kiểu vỡ.

**Câu hỏi tự kiểm tra**

- **bien-dang-song-vo-q1** (nhớ). Khi sóng đi từ nước sâu vào nước nông, đại lượng nào KHÔNG đổi?
  A. Độ cao sóng H · B. Bước sóng L · C. Tốc độ pha c · **D. Chu kỳ T**
  Giải thích: số đỉnh sóng đi qua mỗi điểm trong một giây không thể thay đổi, nên T giữ nguyên còn L và c cùng giảm.
- **bien-dang-song-vo-q2** (hiểu). Vì sao độ cao sóng tăng lên khi sóng tới gần bờ?
  A. Gió gần bờ thổi mạnh hơn · **B. Sóng chậm lại nên năng lượng dồn lại** · C. Chu kỳ sóng ngắn đi · D. Nước gần bờ nhẹ hơn
  Giải thích: thông lượng năng lượng E·cg không đổi, nên khi tốc độ nhóm cg giảm thì E (tỉ lệ với H²) phải tăng.
- **bien-dang-song-vo-q3** (vận dụng). Một sóng lừng có chu kỳ T = 10 s. Bước sóng của nó ở nước sâu là bao nhiêu?
  A. 78 m · B. 98 m · **C. 156 m** · D. 312 m
  Giải thích: L₀ = g·T²/(2π) = 9,81 × 10² / 6,28 ≈ 156 m.
- **bien-dang-song-vo-q4** (vận dụng). Gần bờ, một con sóng cao H = 1,2 m. Theo tiêu chuẩn H/h = 0,78, nó vỡ ở độ sâu khoảng bao nhiêu?
  A. 0,9 m · **B. 1,5 m** · C. 2,4 m · D. 4,7 m
  Giải thích: h = H/0,78 = 1,2/0,78 ≈ 1,54 m.

## 7b. Bản quyền

Không có ảnh, hình chụp hay font nhúng. Toàn bộ hình vẽ bằng mã Canvas; biểu tượng nút là SVG tự vẽ (dòng 63–77). Giữ nguyên. Trích dẫn trên sân khấu: McCowan (1894), Battjes (1974).

## 8. Checklist nghiệm thu

1. Bảng số liệu khi sóng cam ở h = 10 m: L = 70,9 m; c = 8,86 m/s; H = 1,40 m.
2. Đường H/H₀ có điểm trũng 0,91 quanh h ≈ 16 m rồi mới tăng.
3. Bờ 1:50: vỡ tại h = 2,29 m, cách bờ 114 m. Bờ 1:10: cách bờ 23 m. ξ₀ lần lượt 0,16 · 0,82 · 4,08.
4. Thử nghiệm: H₀ 1,5 m, T 12 s → h_b = 2,65 m, H_b = 2,07 m; H₀ 3,0 m, T 5 s, bờ 1:10 → ghi "VỠ TRÀN" và hình không có ống cuộn.
5. Chuỗi "ma sát", "h < L₀/20 = 5 m", "4%" không còn trong bản phát hành; "độ mặn" và tên biển sai = 0.
6. Hai máy đếm đỉnh đều ghi T = 8,0 s; ở 1× chu kỳ sóng trên màn hình là 8 s thật ở cảnh 1, 2, 5, 6, 7.
7. Khung 390 × 844: sân khấu hiển thị đủ, không tràn ngang, vào chế độ Tự học; khung 844 × 390: sân khấu nằm trọn màn hình; nút ≥ 44 px.
8. Chạm sân khấu = phát/dừng; khi dừng, hai ảnh chụp cách nhau 1 s giống hệt nhau.
9. Dung lượng bản phát hành ≤ 500 KB; 0 lỗi console; 0 request mạng ngoài.
10. Tua lui từ cảnh 6 về giữa cảnh 3: sóng cam đứng đúng vị trí, không có bọt trước điểm vỡ.

## 9. Ngoài phạm vi

- Không đổi mô hình vật lý: giữ lý thuyết tuyến tính, hài bậc 2 theo số Ursell, chỉ số vỡ 0,78 dùng chung.
- Không thêm khúc xạ, ma sát đáy, sóng không đều hay dòng chảy ven bờ.
- Không thêm độ dốc bờ thứ tư, không mở rộng khoảng thanh trượt (H₀ 0,5–3,0 m; T 5–14 s).
- Không dựng 3D, không dựng bố cục dọc riêng.
- Không viết lại phần khung, câu hỏi hay gửi điểm trong file này (thuộc `lib/`).
- Không đổi địa hình (dốc 1:20 từ 50 m lên 10 m) và sóng mẫu H₀ = 1,5 m, T = 8 s.

## Câu hỏi cho TS. Đạt (G1)

1. **K-01:** chú thích cảnh 2 bỏ "ma sát với đáy" được không? Đề xuất: "Đáy cản chuyển động của nước → sóng chậm lại, bắt đầu biến dạng."
2. **K-02:** ngưỡng nước nông dùng L tại chỗ (h < L/20 ≈ 1,5 m, nằm sau điểm vỡ) hay giữ L₀/20 = 5 m như giáo trình thầy đang dùng? Đề xuất: đổi dải thứ ba thành "GẦN BỜ" và ghi riêng "nước nông thật sự: h < L/20 ≈ 1,5 m". `[CẦN NGUỒN]` giáo trình cho hai ngưỡng L/2 và L/20.
3. Có ghi chú "chỉ số vỡ 0,78 dùng chung cho mọi độ dốc (giản lược)" không? Đề xuất: có, một dòng trong khung Giải thích cảnh 5.
4. `[CẦN NGUỒN]` nếu muốn viết "H₀ = 1,5 m, T = 8 s là cỡ sóng thường gặp ở bãi biển miền Trung" (hiện chỉ có trong prompt gốc, chưa lên hình; bản nháp Giải thích không dùng câu này).
