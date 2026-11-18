# song-than-hut-chim — Sóng thần do động đất tại đới hút chìm

## 1. Định danh

| File gốc | Học phần | Bài | Dung lượng | Công nghệ | Chạy offline |
|---|---|---|---|---|---|
| `_nguon/song_than_hut_chim_1.html` (837 dòng) | (để trống, TS. Đạt xếp sau; màn chờ ghi "Hải dương học đại cương · Chương Sóng biển") | (để trống) | 73,5 KB (75.269 byte) | Vanilla JS + Canvas 2D (một canvas 1440 × 1008) + thanh điều khiển HTML; không thư viện | Có. Chặn mạng: 0 request, 0 lỗi console ở cả 3 khung (`audit/screens/song-than-hut-chim/log.json`) |

Prompt gốc: `_nguon/prompts/prompt_tsunami_animation.md`.

**Mục tiêu học tập**
1. Giải thích vì sao sóng thần sinh ra do đáy biển biến dạng vĩnh viễn chứ không do sóng địa chấn.
2. Tính tốc độ sóng thần theo độ sâu bằng c = √(g·h) và độ cao sóng theo định luật Green.
3. Nhận biết dấu hiệu tự nhiên của sóng thần (rung mạnh, nước rút bất thường) và nêu thời gian sóng từ rãnh Manila tới bờ biển Việt Nam.

**Cảnh:** 8 cảnh có giờ, tổng 172 s (dòng 87–97). **Giây chụp thumbnail:** t = 118 s (cảnh 6: bảng tốc độ + đỉnh sóng dồn cao trên sườn lục địa).

## 2. Chấm điểm hiện trạng

| Tiêu chí | Điểm | Bằng chứng |
|---|---|---|
| Đúng khoa học | 4 | Bảng c = √(g·h) tính đúng cả 6 dòng (dòng 651; kiểm lại: 836,2 / 713,1 / 356,6 / 159,5 / 79,7 / 35,7 km/h). Nghiệm số nước nông tính trước (dòng 190–212), sóng ra khơi đo được 232,9 m/s. Trừ điểm: 6 vấn đề ở mục 3, trong đó 2 đáng sửa (đường bờ, bản đồ). |
| Sư phạm | 4 | Trình tự nguyên nhân → dồn nén → đứt gãy → tách sóng → vào nông → leo bờ → Biển Đông; đồng hồ "thời gian thực" đổi thang theo cảnh (dòng 223–230); tự dừng cuối cảnh (dòng 777). Trừ điểm: cảnh 6 dồn bảng 6 dòng + 2 công thức + 2 chú thích trong 35 s. |
| Hình ảnh | 3 | Laptop/máy chiếu đẹp, đúng màu HMO (dòng 8, 84). Điện thoại dọc 390 × 844: **màn hình trống hoàn toàn** (`doc-t0/t5/t15.jpg`). Điện thoại ngang: sân khấu lệch phải, bị cắt (`ngang-t5.jpg`). Chữ dưới chuẩn: số trạm 18 px (dòng 698, 706), đầu bảng 28 px (dòng 649), hộp phép tính 32 px (dòng 586), nút thanh điều khiển 17 px (dòng 15). "Mw 9,3" tràn mép khung (dòng 702). Vùng biển sóng đã qua bị tô nâu, lẫn với màu đất (dòng 668). |
| Tương tác | 3 | Đủ phát/dừng, 5 tốc độ, tua, đổi cảnh, phím tắt, clicker PageUp/PageDown/B/"." (dòng 804–817). Thiếu: chạm sân khấu để phát/dừng, vuốt đổi cảnh; tên cảnh chỉ hiện khi rê chuột (dòng 787); phải bấm "Bắt đầu" mới chạy; trên điện thoại không dùng được vì lỗi bố cục. |
| Tự học | 2 | Chú thích trên hình ngắn, viết cho giảng viên nói thêm. Không có đoạn giải thích từng cảnh, không có câu hỏi tự kiểm tra. Màn tổng kết 4 ý (dòng 716) là điểm cộng. |
| Hiệu năng | 4 | 73,5 KB, không tải gì thêm; nghiệm số và bản đồ tính một lần lúc tải (dòng 831). Trừ điểm: `requestAnimationFrame` vẽ lại liên tục kể cả khi đang dừng (dòng 781); không dừng khi tab ẩn; cảnh 8 ghi lại ảnh 251 × 231 mỗi khung hình khi T đổi (dòng 667–669). fps trên điện thoại: mục kiểm tay. |
| Khả năng truy cập | 2 | Toàn bộ nội dung nằm trong canvas, chỉ có một `aria-label` (dòng 49). Không xử lý `prefers-reduced-motion`. Bàn phím tốt, có `:focus-visible` (dòng 17). Chữ Slate #546E8F trên trắng đạt 5,2:1. |
| Chất lượng mã | 4 | Một đồng hồ `P.t`, mọi hàm vẽ nhận `t` (dòng 756–764); 0 lỗi console. Trừ điểm: nhiều mốc thời gian viết thẳng trong lệnh vẽ (dòng 589–603); nháy đồng hồ và nội suy tốc độ phụ thuộc giờ máy (dòng 738, 767); còn móc gỡ lỗi `window.__seek`, `window.__S` (dòng 832–833). |

**Điểm trung bình: 3,3 / 5.**

## 3. Lỗi khoa học

Không tìm thấy sai công thức hay sai phép tính trong các số hiển thị. Sáu vấn đề dưới đây là sai lệch mô hình hoặc không nhất quán.

- **K-1 (đáng sửa) — Dòng 447, 130 (prompt):** vị trí mép nước tính bằng `xb = 180 + 2,5·η_trạm/10` với η_trạm là mực nước tuyệt đối. Tại t = 0 của nghiệm số, η_trạm = η₀(178,5) = −1,08 m (vùng sụt), nên mép nước đã lùi 2,5 × 1,08 / 0,01 = **271 m** trước khi có sóng nào tới. Thực tế bờ sụt cùng đáy biển nên mực nước tương đối tại bờ không đổi lúc t = 0. Phần rút do sóng thật sự chỉ là 2,5 × (1,65 − 1,08) / 0,01 = **142 m** (η_trạm thấp nhất −1,65 m ở giây 971), không phải 412 m như hình vẽ ở đầu cảnh 7.
- **K-2 — Dòng 205, 210, 548:** tại trạm ven bờ (h = 10 m) nghiệm tuyến tính cho đỉnh η = **11,09 m** (giây 1.847), tức η/h = 1,1; phương trình nước nông tuyến tính không còn đúng khi η không nhỏ so với h. Nhãn "Độ cao sóng leo R ≈ 28 m" (= 2,5 × 11,09 = 27,7 m) và "Khoảng cách ngập ≈ 2,8 km" hiện như kết quả chính xác. Con số cùng bậc với thực tế (Tōhoku 40,5 m) nhưng cần ghi là ước lượng minh họa.
- **K-3 (đáng sửa) — Dòng 260–264 so với 284–286:** thời điểm tô sáng trạm lấy cứng từ bài báo, còn mặt sóng đỏ trên bản đồ lấy từ trường thời gian tự tính với độ sâu giản lược. Hai thứ lệch nhau: Tuy Hòa sáng lúc 7.560 s nhưng mặt sóng tới lúc 8.071 s (trễ 8,5 phút); Nha Trang 8.880 s so với 8.471 s (sớm 6,8 phút); Quy Nhơn 9.120 s so với 8.042 s (sớm 18 phút); Hải Phòng 30.900 s so với 29.123 s (sớm 29,6 phút). Thứ tự cũng ngược: mặt sóng vẽ chạm Quy Nhơn trước Tuy Hòa, trong khi bảng ghi Tuy Hòa trước 26 phút.
- **K-4 — Dòng 644:** "Chu kỳ T ≈ 10 phút … ~120 km ngoài khơi". 120 km ứng với h = 4.000 m (198,1 m/s × 600 s = 118,9 km); ở đồng bằng biển thẳm 5.500 m của chính mô hình là 232,3 × 600 = **139 km**. Trong nghiệm số, pha dương tại trạm kéo dài khoảng 11 phút (giây 1.355 → ~2.010), tức cả chu kỳ khoảng 20 phút. Số 10 phút là giá trị điển hình, không phải kết quả của mô hình này.
- **K-5 — Dòng 429 so với 187:** biến dạng thời kỳ dồn nén đặt chỗ phồng +1,2 m ở x = 115 km, nhưng vùng sụt khi động đất lại ở x = 155 km (−2 m). Theo đàn hồi bật lại, chỗ phồng lên trước động đất chính là chỗ sụt xuống sau động đất; hai vị trí lệch nhau 40 km.
- **K-6 — Dòng 364 so với 369:** thẻ ② ghi trượt lở "≈ 2–3%" nhưng thanh biểu đồ ghi 2%; sóng thần khí tượng có thẻ riêng nhưng không có phần trong biểu đồ (83 + 6 + 6 + 3 + 2 = 100). `[CẦN NGUỒN]` phiên bản và năm truy cập thống kê NOAA NCEI.

**Đã kiểm, đúng:** CFL Δt ≤ 1.000/271,2 = 3,69 s; Green 2 × 400^¼ = 8,94 ≈ 9 m; 200 km × 50 km × 2 m = 20 km³; 8 cm/năm × 300 năm = 24 m; góc chúc tại rãnh arctan(0,268) = 15,0°; vùng khóa x = 9–87 km ứng độ sâu 10,0–39,9 km; sóng P tới làng sau 16,6 s và S sau 29,0 s, khớp ngưỡng rung 16 s và 29 s (dòng 510); đỉnh sóng tới trạm lúc +33 phút 17 s; Usain Bolt 100/9,58 = 37,6 km/h; thang thời gian từng cảnh khớp chữ hiển thị (15 năm, 7,5 s, 10 s, 25 s, 50 s, 40 phút mỗi giây).

**Lệch so với prompt gốc (không phải lỗi):** cảnh 6 chạy 25 s thực/giây và cảnh 7 chạy 50 s thực/giây (prompt: 60); tổng 172 s (prompt: 160) vì màn tổng kết nối vào cảnh 8; ghi chú tỉ lệ tính động theo camera ("16 lần / 99 lần" ở cảnh 6) thay cho câu cố định "25 lần / 200 lần".

**Chưa tự kiểm được bản gốc, nhờ TS. Đạt xác nhận:** các số kịch bản rãnh Manila (Tuy Hòa 2 giờ 06, Nha Trang 2 giờ 28, Quy Nhơn 2 giờ 32, Quảng Ngãi ~18 m, Hải Phòng 3,5 m sau 8 giờ 35; Mw 9,3). `[CẦN NGUỒN]` dung tích hồ Hòa Bình (phép so sánh "≈ 2 lần" đúng nếu dung tích 9,45–9,86 tỉ m³).

## 4. Danh sách thay đổi

| ID | Loại | Vị trí | Mô tả | Tiêu chí nghiệm thu |
|---|---|---|---|---|
| S-01 | Tương tác | Dòng 50–66, 754–833 | Ghép vào bộ khung: bỏ thanh điều khiển, màn chờ, bắt phím, `requestAnimationFrame`, `fit()` riêng; đăng ký `HMO.dangKy({canh, thoiLuong: 172, ve, datNhan, khoiTao, huy})` với 8 cảnh có giờ theo `SCENES`. | Không còn `addEventListener('keydown'` và `requestAnimationFrame` trong `src/song-than-hut-chim/`; 6 kiểm tra smoke qua ở 3 khung. |
| S-02 | Hiệu năng | Dòng 672–675, 737–742, 767 | `ve(t)` thuần: bỏ phụ thuộc giờ máy (nháy đồng hồ tính theo t kể từ mốc đổi cảnh; nội suy tốc độ để khung lo); bộ đệm đường đẳng thời vẽ lại đúng khi tua lui. | Gọi `ve(118)` → `ve(30)` → `ve(118)`: hai ảnh ở t = 118 giống nhau từng điểm ảnh. |
| S-03 | Hình ảnh | Dòng 823–825 | Sửa lỗi bố cục trên điện thoại (do khung lo việc co giãn sân khấu). | Khung 390 × 844 và 844 × 390: sân khấu nằm trọn, không trống, không tràn ngang. |
| S-04 | Hình ảnh | Hàm `label`, `caption`, `drawTable` | `datNhan('toi-gian')`: ẩn bảng số liệu, hộp phép tính, chú thích dài, nhãn phụ; giữ tiêu đề cảnh, đồng hồ thời gian thực, nhãn "BIỂN ĐÔNG", Hoàng Sa, Trường Sa. `datNhan('tat')` thay công tắc Nhãn (phím L). | Ở 390 × 844 không còn chữ nào trên sân khấu nhỏ hơn 30 px (theo khung 1440). |
| S-05 | Khoa học | Dòng 447 (K-1) | Mép nước tính theo mực nước so với bờ đã sụt: dùng η_trạm(t) − η_trạm(0). | Tại đầu cảnh 5 (t = 75 s) mép nước ở x = 180,00 km ± 0,01; khoảng rút lớn nhất trước đỉnh sóng 130–150 m; nước vẫn rút trước rồi mới dâng. |
| S-06 | Khoa học | Dòng 548–549 (K-2) | Nhãn sóng leo và khoảng cách ngập thêm chữ "ước lượng"; đoạn Giải thích cảnh 7 nói rõ mô hình tuyến tính chỉ minh họa. Giá trị hiển thị sau S-05 chờ TS. Đạt chốt (câu hỏi 1). | Nhãn có chữ "ước lượng"; số hiển thị khớp 2,5 × giá trị trạm dùng để vẽ, sai lệch < 0,5 m. |
| S-07 | Khoa học | Dòng 279–286, 260–264 (K-3) | Hiệu chỉnh trường thời gian minh họa để mặt sóng đỏ chạm từng trạm đúng thời điểm trong bảng; giữ nguyên số của bài báo. | Với 4 trạm có giờ: \|thời điểm mặt sóng tới − thời điểm ghi\| ≤ 120 s; Tuy Hòa sáng trước Nha Trang trước Quy Nhơn. |
| S-08 | Nhãn-số-chữ | Dòng 644 (K-4) | Sửa thành "Chu kỳ T ≈ 10–20 phút, gần như không đổi. Bước sóng λ = c·T co lại: ~140 km ở 5.500 m → ~6 km ở 10 m (với T = 10 phút)". | Chuỗi mới xuất hiện đúng; 232,3 × 600 = 139 km. |
| S-09 | Khoa học | Dòng 429 (K-5) | Dời chỗ phồng thời kỳ dồn nén về x = 155 km, bề rộng 30 km. | `wInter(155)` = +1,2 ± 0,1; chỗ phồng trước động đất trùng vùng sụt sau động đất. |
| S-10 | Nhãn-số-chữ | Dòng 364, 369 (K-6) | Thống nhất thẻ ② với biểu đồ sau khi TS. Đạt xác nhận số NOAA NCEI; thêm năm truy cập vào dòng nguồn. | Số trên thẻ và trên thanh trùng nhau; dòng nguồn có năm. |
| S-11 | Hình ảnh | Dòng 586, 649, 698, 702, 706 | Nâng cỡ chữ: số trạm 18 → 30 px (vòng tròn lớn tương ứng), đầu bảng 28 → 32 px, hộp phép tính 32 → 36 px và tách làm 2 chú thích nối tiếp (hiện 24 từ); "Mw 9,3" xuống dòng riêng, không tràn khung. | Không chữ nào trên sân khấu < 30 px trừ dòng nguồn và ghi chú tỉ lệ (≥ 22 px); không chú thích nào > 20 từ. |
| S-12 | Hình ảnh | Dòng 668 | Đổi màu vùng sóng đã qua từ cam-nâu sang lớp phủ Sky nhạt hoặc chỉ giữ đường đẳng thời, để biển không lẫn với đất. | Ở t = 155 s, tương phản giữa biển đã tô và đất liền ≥ 1,5:1 và biển vẫn mang sắc xanh. |
| S-13 | Sư phạm | `noidung/song-than-hut-chim.json` | Đưa 8 đoạn Giải thích và 4 câu hỏi ở mục 7 vào file nội dung; các ví dụ dài của 5 thẻ cảnh 1 có mặt trong đoạn Giải thích. | File JSON hợp lệ, đủ 8 cảnh, 4 câu `song-than-hut-chim-q1…q4`. |
| S-14 | Truy cập | Hàm vẽ gợn sóng (dòng 456), rung nhà (dòng 615), bọt (dòng 518) | Khi `prefers-reduced-motion`: tắt gợn sóng trang trí, rung nhà, nháy thanh ứng suất; giữ chuyển động sóng và mảng. | Bật giả lập reduced-motion: hai ảnh cách nhau 1 s khi đang dừng giống hệt nhau; khi phát, sóng vẫn chạy. |
| S-15 | Chất lượng mã | Dòng 832–833 | Bỏ `window.__seek`, `window.__S`; gom các mốc thời gian chú thích thành một bảng dữ liệu. | Không còn `window.__` trong mã nguồn. |

## 5. Phân tầng: **T2** — khối lượng **M** (khoảng 4 giờ, sát ngưỡng L)

- **Q1** (chỉ sửa số, nhãn, chữ, màu?) → Không. S-05, S-07, S-09 sửa mô hình vật lý; S-01, S-02 thay toàn bộ lớp điều khiển.
- **Q2** (cấu trúc 3D thiết yếu?) → Không. Đây là mặt cắt 1D của sóng thần, thuộc nhóm đề bài nêu là "để 2D mới rõ hơn". Bản đồ cảnh 8 là 2D phẳng.
- **Q3** → T2 (Opus), một chủ cho cả file.

Hệ quả: file này **không còn là ứng viên pilot T1** như tạm tính ở tài liệu thiết kế.

## 6. Kịch bản 3D

Không áp dụng (T2).

## 7. Nội dung tự học (nháp, chờ duyệt ở G1)

### Giải thích từng cảnh

**Cảnh 1 — Điều gì tạo ra sóng thần?**
Sóng thần sinh ra khi một khối nước lớn bị dịch chuyển đột ngột, rồi trọng lực kéo mặt nước về cân bằng. Khoảng 83% trường hợp là do động đất đáy biển; số còn lại do núi lửa, trượt lở đất, hiếm hơn là thiên thạch hoặc biến động khí áp. Bài này đi sâu vào nguyên nhân phổ biến nhất.

**Cảnh 2 — Đới hút chìm: nơi hai mảng gặp nhau**
Ở đới hút chìm, mảng đại dương nặng hơn chui xuống dưới mảng lục địa với tốc độ khoảng 8 cm mỗi năm, nhanh gấp đôi móng tay mọc. Ở độ sâu 10–40 km, mặt tiếp xúc hai mảng dính chặt vào nhau, gọi là vùng khóa. Hai mảng vẫn muốn trượt nhưng bị giữ lại ở đây.

**Cảnh 3 — Hàng trăm năm dồn nén**
Vì bị khóa, mép mảng lục địa bị mảng đại dương kéo cong xuống, giống chiếc thước nhựa bị ép cong dần. Ứng suất tích lại năm này qua năm khác. Sau 300 năm, độ trượt bị "nợ" lên tới 8 cm × 300 = 24 m. Hình vẽ phóng đại biến dạng 1.000 lần để bạn nhìn thấy.

**Cảnh 4 — Đứt gãy: mép mảng bật lên**
Khi ứng suất vượt sức chịu, vùng khóa vỡ trong vài phút và mép mảng bật trở lại. Sóng địa chấn làm mặt đất rung nhưng không tạo ra sóng thần. Sóng thần sinh ra vì đáy biển nâng lên vĩnh viễn, đẩy cả cột nước lên theo. Nước không kịp chảy đi nên mặt biển nhô lên đúng hình đáy biển.

**Cảnh 5 — Một gò nước tách thành hai sóng**
Trọng lực kéo gò nước sụp xuống và gò tách thành hai sóng chạy ngược chiều. Sóng ra khơi có đỉnh đi trước. Sóng vào bờ có hõm đi trước, vì phần đáy biển sụt xuống nằm ở phía bờ. Hãy nhớ chi tiết này: nó quyết định điều người trên bờ nhìn thấy đầu tiên.

**Cảnh 6 — Càng vào nông càng chậm, càng cao**
Tốc độ sóng thần chỉ phụ thuộc độ sâu: c = √(g·h). Ở 5.500 m sóng đi 836 km/h như máy bay; ở 10 m chỉ còn 36 km/h. Khi chậm lại, năng lượng dồn vào đoạn ngắn hơn nên sóng cao lên theo định luật Green. Ngoài khơi sóng chỉ cao 2–3 m trải trên hàng chục km, tàu gần như không nhận ra.

**Cảnh 7 — Nước rút, rồi sóng ập vào**
Hõm sóng tới trước nên biển rút ra xa bất thường, lộ cả đáy. Đó là dấu hiệu tự nhiên của sóng thần: phải chạy ngay lên chỗ cao. Khoảng nửa giờ sau động đất, đỉnh sóng ập vào như bức tường nước và leo lên sườn đồi. Độ cao sóng leo trong hình là ước lượng minh họa; sóng đầu chưa chắc lớn nhất.

**Cảnh 8 — Biển Đông có nguy cơ không?**
Rãnh Manila ở phía tây đảo Luzon là đới hút chìm gần Việt Nam nhất. Theo mô phỏng kịch bản xấu nhất (Mw 9,3), sóng tới Tuy Hòa sau khoảng 2 giờ 06 phút, Nha Trang 2 giờ 28 phút, Quy Nhơn 2 giờ 32 phút; độ cao lớn nhất khoảng 18 m ở Quảng Ngãi. Hai giờ là đủ để sơ tán nếu có cảnh báo kịp thời.

### Câu hỏi tự kiểm tra

**song-than-hut-chim-q1** (nhớ – hiểu). Trong động đất ở đới hút chìm, điều gì trực tiếp tạo ra sóng thần?
A. Sóng địa chấn P và S đẩy nước lên · B. Đáy biển biến dạng vĩnh viễn, nâng hạ cả cột nước · C. Gió mạnh sinh ra sau động đất · D. Lực hút của Mặt Trăng tăng đột ngột
**Đáp án B.** Đáy biển nâng lên nhanh hơn nước kịp chảy đi nên mặt nước nhô theo; sóng địa chấn chỉ gây rung lắc.

**song-than-hut-chim-q2** (nhớ – hiểu). Vì sao ở bờ gần đới hút chìm, biển thường rút ra xa trước khi sóng thần ập vào?
A. Vì thủy triều xuống đúng lúc đó · B. Vì động đất làm nước bốc hơi · C. Vì vùng đáy biển sụt nằm phía bờ nên hõm sóng tới trước · D. Vì gió thổi nước ra khơi
**Đáp án C.** Sóng vào bờ mang hình biến dạng ban đầu: phần sụt ở phía bờ nên hõm đi trước đỉnh.

**song-than-hut-chim-q3** (vận dụng). Ở thềm lục địa sâu 200 m, sóng thần đi nhanh khoảng bao nhiêu? (g = 9,81 m/s²)
A. 44 km/h · B. 159 km/h · C. 357 km/h · D. 713 km/h
**Đáp án B.** c = √(9,81 × 200) ≈ 44,3 m/s = 159 km/h; 44 là giá trị theo m/s chứ không phải km/h.

**song-than-hut-chim-q4** (vận dụng). Sóng thần cao 1 m ở độ sâu 1.600 m. Theo định luật Green A₂ = A₁·(h₁/h₂)^¼, khi vào độ sâu 100 m sóng cao khoảng bao nhiêu?
A. 1,4 m · B. 2 m · C. 4 m · D. 16 m
**Đáp án B.** h₁/h₂ = 16, căn bậc bốn của 16 là 2, nên A₂ = 1 × 2 = 2 m.

## 7b. Bản quyền

| Thành phần | Nguồn | Giữ / thay |
|---|---|---|
| Ảnh raster, SVG nhúng | Không có (0 chuỗi `data:image`) | — |
| Mọi hình trên sân khấu | Vẽ bằng lệnh Canvas trong mã | Giữ |
| Đường bờ sơ đồ Biển Đông (`LAND`, dòng 238–252), rãnh Manila, chấm đảo Hoàng Sa và Trường Sa | Toạ độ nhập tay, giản lược, có ghi "Sơ đồ, không theo tỉ lệ" | Giữ |
| Số liệu | NOAA NCEI; Fujiwara và nnk. (2011); Nguyễn Hồng Phương và nnk. (2014) — có dòng nguồn (dòng 747–748) | Giữ, thêm năm truy cập NOAA |
| Font | Không nhúng; "Be Vietnam Pro" rơi về font hệ thống nếu máy không có | Bộ khung nhúng font subset |

## 8. Checklist nghiệm thu

1. Dung lượng `animations/song-than-hut-chim/index.html` ≤ 500 KB; 0 request mạng ngoài; 0 lỗi console ở 3 khung.
2. Bảng tốc độ hiển thị đúng 6 giá trị: 836, 713, 357, 159, 80, 36 km/h.
3. Nhãn sóng ra khơi ghi "232 m/s ≈ 836 km/h"; tua lui trong cảnh 6 sóng chạy lùi mượt.
4. Đầu cảnh 5 mép nước ở x = 180,00 ± 0,01 km; trong cảnh 7 nước rút 130–150 m trước, rồi mới dâng (S-05).
5. Bản đồ cảnh 8: mặt sóng đỏ chạm Tuy Hòa, Nha Trang, Quy Nhơn, Hải Phòng lệch ≤ 120 s so với 2 giờ 06, 2 giờ 28, 2 giờ 32, 8 giờ 35 (S-07).
6. Cảnh 8 có nhãn "BIỂN ĐÔNG", "Quần đảo Hoàng Sa (Việt Nam)", "Quần đảo Trường Sa (Việt Nam)" ở cả mức nhãn đầy đủ và tối giản; 0 lần xuất hiện tên gọi biển sai.
7. Khung 390 × 844: vào chế độ Tự học, sân khấu không trống, khung Giải thích hiện đúng đoạn của cảnh đang xem, chữ ≥ 16 px.
8. Trên sân khấu không chữ nào < 30 px trừ dòng nguồn và ghi chú tỉ lệ (≥ 22 px); mỗi chú thích ≤ 20 từ.
9. Đủ 8 cảnh có giờ, tổng 172 s; tự dừng ở giây 20, 35, 55, 75, 90, 125, 145.
10. Kiểm tay (TS. Đạt): ≥ 30 fps ở cảnh 6 và cảnh 8 trên điện thoại Android tầm trung.

## 9. Ngoài phạm vi

- Không thay nghiệm số tuyến tính 1D bằng mô hình phi tuyến hay mô hình ngập khô–ướt.
- Không thay bản đồ sơ đồ bằng đường bờ hay độ sâu thật; không chạy lại mô phỏng COMCOT.
- Không thêm cảnh, không đổi thứ tự hay thời lượng 8 cảnh.
- Không dựng 3D.
- Không thêm thư viện.
- Không đổi các số trích từ bài báo; chỗ nào nghi ngờ thì hỏi TS. Đạt.

## Câu hỏi cho TS. Đạt

1. **Đường bờ và sóng leo (K-1, K-2).** Đề xuất: tính mép nước theo mực nước so với bờ đã sụt (S-05) và giữ độ cao sóng leo hiển thị ≈ 28 m, ghi "ước lượng". Phương án khác là tính sóng leo so với bờ đã sụt, khi đó R = 2,5 × (11,09 + 1,08) ≈ 30 m. Thầy chọn cách nào?
2. **Thống kê NOAA NCEI (K-6).** Thầy xác nhận bộ số 83 / 6 / 6 / 3 / 2 và năm truy cập; trượt lở ghi 2% hay "2–3%"?
3. **Số kịch bản rãnh Manila và dung tích hồ Hòa Bình:** thầy xác nhận đúng với bản gốc bài báo 2014 và cho nguồn dung tích hồ (đề xuất ghi 9,45 tỉ m³).
