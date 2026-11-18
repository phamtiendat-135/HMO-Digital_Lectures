# su-hinh-thanh-bao — Sự hình thành bão nhiệt đới

> Số dòng trong spec này là số dòng của file gốc `_nguon/su-hinh-thanh-bao-preview.html`. Nội dung thật nằm trong thuộc tính `data-srcdoc` (đã escape HTML) của một iframe, bắt đầu ở dòng 12; dòng n của tài liệu bên trong = dòng n + 11 của file gốc.

## 1. Định danh

| Mục | Giá trị |
|---|---|
| File gốc | `_nguon/su-hinh-thanh-bao-preview.html` (2.236 dòng) |
| Học phần | chưa xếp (TS. Đạt sắp xếp sau); nội dung thuộc khí tượng biển / khí tượng nhiệt đới |
| Bài | chưa xếp |
| Dung lượng | 79.852 byte ≈ 78 KB. Nội dung thật (khối `#bao-explainer`, dòng 1329–1642) chỉ 18,8 KB ≈ 24%; phần còn lại là vỏ của công cụ sinh widget (CSS hệ thống thiết kế dòng 20–1039, script hạ tầng dòng 1043–1328 và 1646–2031, script bọc iframe dòng 2036–2234) |
| Công nghệ | SVG tĩnh `viewBox 0 0 1000 560` + 4 keyframe CSS chạy lặp + ~75 dòng JS đổi giai đoạn. Thư viện gọi từ CDN: `@floating-ui/core@1.7.3`, `@floating-ui/dom@1.7.4`, `lucide@1.17.0` (đều từ unpkg.com). Font hệ thống (`-apple-system, system-ui, "Segoe UI"`, dòng 112), không tải font mạng |
| Nguồn gốc | Widget xuất từ công cụ "visualization" của ChatGPT/Codex, **không phải Claude Design**: id `codex-visualization` (dòng 12), gọi `window.openai.setWidgetState` (dòng 1590–1591, 1633–1638) |
| Chạy offline | Chạy được phần chính, nhưng có 3 request bị chặn và 3 lỗi console ở cả 3 khung (`audit/screens/su-hinh-thanh-bao/log.json`). Mất mạng thì mất biểu tượng ở nút Phát và ở dòng mô tả; chữ và hình vẫn hiện |

**Mục tiêu học tập**
1. Kể tên 5 điều kiện cần để bão nhiệt đới hình thành và nêu ngưỡng số của ít nhất 3 điều kiện (nhiệt độ mặt biển ≥ 26,5 °C, cách xích đạo ≥ 5° vĩ, độ đứt gió thẳng đứng < 10 m/s).
2. Giải thích vòng phản hồi "bốc hơi → ngưng kết → toả ẩn nhiệt → khí áp giảm → hút thêm không khí ẩm" nuôi cơn bão.
3. Xác định chiều quay của bão ở Bắc bán cầu (ngược chiều kim đồng hồ ở tầng thấp) từ hướng lệch của lực Coriolis, và nhận biết mắt bão, thành mắt bão trên hình.

## 2. Chấm điểm hiện trạng

| Tiêu chí | Điểm | Bằng chứng |
|---|---|---|
| Đúng khoa học | 3 | Chuỗi nhân quả đúng; ngưỡng 26,5 °C đúng (dòng 1484); 3 mũi tên xoáy ở cảnh 4 đúng chiều ngược kim đồng hồ (dòng 1524–1526). Nhưng thành mắt bão quay **thuận** kim đồng hồ (dòng 1431 + 1537), mũi tên "lệch sang phải" lại cong sang **trái** (dòng 1530–1531). Cả animation chỉ có 1 con số, không có dòng nguồn |
| Sư phạm | 3 | 5 giai đoạn theo đúng trình tự nhân quả, mỗi giai đoạn 1 ý. Trừ điểm: cảnh 4–5 vẽ hình nhìn từ trên xuống chồng lên nền mặt cắt đứng (biển ở đáy, nhãn "Tầng đối lưu"), cảnh 5 trộn mũi tên bốc lên của mặt cắt với vòng thành mắt nhìn từ trên; thiếu 3/5 điều kiện hình thành |
| Hình ảnh | 1 | Không dùng màu HMO (xanh `rgb(51 156 255)`, nền theo chế độ sáng/tối của máy, dòng 20–60); khung 1000 × 560 chứ không phải 4:3; chữ trên hình 14 px (dòng 97) so với chuẩn ≥ 30 px. 4 giai đoạn không được chọn vẫn hiện mờ 12% (dòng 1404) nên chữ chồng lên nhau (`laptop-t5.jpg`). Màn dọc 390 px: chữ trên hình còn ≈ 5 px, và media query dòng 1442 còn **giảm** cỡ chữ xuống 13 đơn vị (`doc-t5.jpg`) |
| Tương tác | 2 | Bấm/chạm 5 nút giai đoạn hoạt động. Không có phím tắt, không tốc độ, không tua; "Phát" chỉ nhảy giai đoạn mỗi 2,2 s (dòng 1628), không dừng được chuyển động CSS. Nút cao tối thiểu 28 px (dòng 514) < 44 px. Màn ngang 844 × 390: hình và nút điều khiển nằm ngoài màn, phải cuộn (`ngang-t5.jpg`); laptop 1024 × 768: dòng mô tả bị cắt ở mép dưới (`laptop-t5.jpg`) |
| Tự học | 2 | Mỗi giai đoạn có 1 câu mô tả 20–28 từ (dòng 1571–1575), đủ làm gợi ý nhưng chưa thay được lời giảng; không có câu hỏi tự kiểm tra; 2,2 s/giai đoạn không đủ để đọc |
| Hiệu năng | 3 | 78 KB, SVG nhẹ, không lo fps. Trừ điểm: 3 request CDN, 76% dung lượng là vỏ không dùng |
| Khả năng truy cập | 2 | Có `aria-label`, `aria-live`, `aria-pressed`, `<title>/<desc>` cho SVG (dòng 1465–1467) và tôn trọng `prefers-reduced-motion` (dòng 1433–1436). Trừ điểm: `lang="en"` (dòng 2) làm trình đọc màn hình đọc sai tiếng Việt; chữ 14 px; chữ mờ 12% không đạt tương phản; tiêu đề trang không dấu |
| Chất lượng mã | 2 | Không có đồng hồ toàn cục: 4 animation CSS `infinite` (dòng 1406–1409) + `setInterval` (dòng 1625). `.spin` đặt `transform-origin: 500px 250px` (dòng 1408) trong khi tâm vòng tròn là (500, 276) (dòng 1537) nên vòng thành mắt quay lệch tâm 26 đơn vị. `.pulse` dùng `transform-origin: center` (dòng 1406) nên elip ở y = 452 co giãn quanh tâm khung hình chứ không quanh tâm của nó. Mã `window.openai` chết ngoài môi trường chat. 3 lỗi console khi offline |

**Điểm trung bình: 2,3 / 5.**

## 3. Lỗi khoa học

- **L-01 — Thành mắt bão quay sai chiều (dòng 1431, 1537).** `@keyframes baoSpin { to { transform: rotate(360deg) } }`: góc dương trong CSS là quay **thuận** chiều kim đồng hồ trên màn hình. Vòng `eye-wall spin` vì thế quay thuận kim đồng hồ, trong khi nhãn góc trên ghi "Bắc bán cầu" (dòng 1453) và chính cảnh 4 ghi "quay ngược chiều kim đồng hồ ↺" (dòng 1533). Đúng: ở Bắc bán cầu, hoàn lưu tầng thấp của bão quay ngược chiều kim đồng hồ → phải là `rotate(-360deg)`.
- **L-02 — Mũi tên "lệch sang phải do lực Coriolis" cong sang trái (dòng 1530–1532).** Đường `M752 176 C706 140 660 126 620 132`: hướng lúc đầu (−46, −36), hướng lúc cuối (−40, +6); tích có hướng = (−46)(6) − (−36)(−40) = −1.716 < 0, trong hệ toạ độ màn hình (y hướng xuống) nghĩa là rẽ **trái** so với hướng đi. Mũi tên này thực ra vẽ theo đường cong của xoáy (ngược kim đồng hồ) chứ không vẽ độ lệch Coriolis. Sinh viên nhìn hình sẽ thấy "lệch phải" mà đường lại cong trái. Đúng: vẽ một phần tử khí đi thẳng về tâm áp thấp, quỹ đạo thực lệch sang **phải** hướng đi (đường đứt = hướng gradient khí áp, đường liền = quỹ đạo lệch phải), rồi mới cho thấy vì luôn bị lệch phải nên khí vòng quanh tâm theo chiều ngược kim đồng hồ.
- **L-03 — Trộn hai hình chiếu trong cảnh 5 (dòng 1536–1546).** Vòng thành mắt và "Mắt bão — khí hạ xuống" là hình nhìn từ trên xuống, nhưng hai mũi tên cam "bốc lên" (dòng 1541–1542, từ y = 422 ở mặt biển lên y = 222) và hai mũi tên tím "thổi ra tầng cao" (dòng 1543–1544) là của mặt cắt đứng. Trên hình nhìn từ trên, chúng bị đọc thành dòng khí thổi từ nam vào tâm và từ tâm ra hai phía đông–tây, sai với thực tế (thổi vào xoáy ốc từ mọi phía ở tầng thấp; thổi ra thuận kim đồng hồ ở tầng cao). Cảnh 4 cũng đặt đĩa xoáy nhìn từ trên (bán kính 184, tâm y = 276, chạm tới y = 460) đè lên đường mặt biển y = 430 của mặt cắt.

**Thiếu sót (không sai nhưng thiếu so với mục tiêu học tập):**
- Chỉ nêu 2/5 điều kiện hình thành (biển ấm, đứt gió yếu). Thiếu: cách xích đạo ≥ ~5° vĩ để lực Coriolis đủ lớn (f = 2Ω·sin φ; ở 5°N f = 2 × 7,292×10⁻⁵ × sin 5° = 1,27×10⁻⁵ s⁻¹; ở xích đạo f = 0), tầng đối lưu giữa ẩm, và nhiễu động ban đầu (sóng đông, rãnh gió mùa).
- "Lớp nước ấm đủ sâu" (dòng 1571) không có số; thường dùng ~50 m. `[CẦN NGUỒN]`
- Không có số về cường độ, không phân cấp áp thấp nhiệt đới / bão.
- Không có dòng nguồn cho ngưỡng 26,5 °C. `[CẦN NGUỒN]` (đề xuất: Gray, 1968, *Monthly Weather Review* 96: 669–700).

**Thuật ngữ:** "nhiệt ẩn" (dòng 1502, 1572) và "ngưng tụ" → xem câu hỏi Q-2 ở cuối mục 4. Không có "độ mặn", không có tên biển, không có bản đồ.

## 4. Danh sách thay đổi

| ID | Loại | Vị trí | Mô tả | Tiêu chí nghiệm thu |
|---|---|---|---|---|
| S-01 | Khoa học | cảnh 5; dòng 1431, 1537 | Thành mắt bão và các dải mây xoắn quay ngược chiều kim đồng hồ khi chọn Bắc bán cầu | Chụp 2 khung hình cách nhau 0,5 s ở cảnh 5: một điểm đánh dấu trên thành mắt dịch chuyển ngược chiều kim đồng hồ |
| S-02 | Khoa học | cảnh 4; dòng 1530–1532 | Vẽ lại minh hoạ Coriolis: đường đứt hướng thẳng vào tâm, đường liền là quỹ đạo lệch sang phải hướng đi | Tại mọi điểm trên đường liền, tích có hướng giữa hướng đi và hướng đường đứt cho thấy lệch phải (kiểm bằng mắt: đứng theo hướng mũi tên, đường liền nằm bên tay phải đường đứt) |
| S-03 | Khoa học / Sư phạm | cảnh 4–5; dòng 1516–1546 | Tách hẳn hai hình chiếu: sân khấu chia đôi, **trái = mặt cắt đứng** (thổi vào tầng thấp → bốc lên ở thành mắt → thổi ra tầng cao → giáng trong mắt), **phải = nhìn từ trên xuống** (xoáy ngược kim đồng hồ). Mỗi nửa có nhãn tên hình chiếu. Cảnh 1–3 chỉ dùng mặt cắt đứng, toàn khung | Không còn phần tử nào của hình nhìn từ trên đè lên đường mặt biển; mỗi nửa có nhãn "Mặt cắt đứng" / "Nhìn từ trên xuống" |
| S-04 | Khoa học | cảnh 1 | Bổ sung thẻ "5 điều kiện cần": (1) mặt biển ≥ 26,5 °C, lớp ấm dày ~50 m; (2) cách xích đạo ≥ 5° vĩ; (3) đứt gió thẳng đứng < 10 m/s; (4) tầng đối lưu giữa ẩm; (5) có nhiễu động ban đầu. Ở màn dọc thẻ này chuyển xuống khung Giải thích | Đủ 5 dòng, 3 ngưỡng số đúng như ghi; có dòng nguồn |
| S-05 | Sư phạm | cảnh 6 (mới) — **chờ TS. Đạt duyệt, xem Q-1** | Thêm cảnh "Bão mạnh cỡ nào?": thang phân cấp Việt Nam theo tốc độ gió mạnh nhất: áp thấp nhiệt đới cấp 6–7 (39–61 km/h); bão cấp 8–9 (62–88); bão mạnh cấp 10–11 (89–117); bão rất mạnh cấp 12–15 (118–183); siêu bão ≥ cấp 16 (≥ 184 km/h). Hình: bão nhìn từ trên, vòng quay nhanh dần theo cấp | 5 bậc, số km/h đúng như ghi; dòng nguồn "Quyết định 18/2021/QĐ-TTg" |
| S-06 | Nhãn-số-chữ | toàn bộ | Thêm dòng nguồn ở đáy sân khấu (≥ 22 px): "Nguồn: Gray (1968), Mon. Wea. Rev. 96; Quyết định 18/2021/QĐ-TTg" (chốt sau khi TS. Đạt trả lời `[CẦN NGUỒN]`) | Dòng nguồn hiện ở mọi cảnh |
| S-07 | Nhãn-số-chữ | dòng 2, 12; tiêu đề | `lang="vi"`; tiêu đề trang "Sự hình thành bão nhiệt đới"; thống nhất thuật ngữ theo Q-2 | `document.documentElement.lang === 'vi'`; `document.title` có dấu |
| S-08 | Hình ảnh | toàn bộ | Dựng lại trên sân khấu 1440 × 1080 theo màu HMO: biển Ocean → Navy, lớp nước ấm và dòng nhiệt Orange, gió tầng thấp Sky/Ocean, dòng thổi ra tầng cao Slate; thanh tiêu đề Navy + sọc cam. Bỏ chế độ sáng/tối theo máy. Tiêu đề ≥ 44 px, chú thích ≥ 36 px, nhãn trên hình ≥ 30 px | Đo cỡ chữ trong mã ≥ ngưỡng; không còn `light-dark(` hay `color-mix(` phụ thuộc theme |
| S-09 | Hình ảnh | dòng 1404 | Mỗi cảnh chỉ vẽ phần của cảnh đó (cảnh sau được giữ lại hình nền của cảnh trước ở dạng nét mảnh **không chữ**); bỏ kiểu làm mờ 12% | Ở bất kỳ cảnh nào không có hai chuỗi chữ chồng lên nhau (kiểm bằng ảnh chụp 3 khung) |
| S-10 | Tương tác | toàn bộ; dòng 1566–1640 | Ghép vào bộ khung chung: `HMO.dangKy({canh, thoiLuong, ve(t), datNhan, khoiTao, huy})`. Các cảnh là **cảnh tự do** `{id, lap}`: `bien-am` lap 3,6 s; `doi-luu` 3,6 s; `ap-thap` 3,6 s; `xoay` 7,2 s; `bao-truong-thanh` 7,2 s; (`cap-bao` 7,2 s nếu S-05 được duyệt). Bỏ nút Phát, 5 nút giai đoạn, thanh tiến trình, `setInterval` riêng | Space/chạm dừng thì hai ảnh chụp cách 1 s giống nhau; ←/→, PageUp/PageDown và vuốt đổi cảnh; không còn `setInterval`, `requestAnimationFrame`, `addEventListener('key…')` trong `src/su-hinh-thanh-bao/` |
| S-11 | Hiệu năng / Mã | dòng 1406–1409, 1429–1432 | Bỏ 4 keyframe CSS; mọi chuyển động là hàm của `t`: nhịp co giãn = `sin(2π·t/1,8)`, `stroke-dashoffset = −(t/1,2)·20`, góc quay = `−360°·t/7,2`. Cách làm đề xuất: vẽ lại bằng JS đặt thuộc tính SVG trong `ve(t)`. (Cách thay thế nếu giữ CSS: `animation-play-state: paused` + `animation-delay: calc(-1s * t)`; không khuyến nghị vì đằng nào cũng phải dựng lại bố cục 4:3.) Sửa luôn hai lỗi tâm quay (`.spin` lệch 26 đơn vị, `.pulse` quanh tâm khung) | `ve(3,0)` gọi hai lần cho cùng một hình (so ảnh); đổi tốc độ 0,25×–4× chuyển động vẫn liền |
| S-12 | Tương tác | cảnh 4–5 | Dùng `dieuKhien` của khung: một nút chọn `ban-cau` = "Bắc bán cầu" (mặc định) / "Nam bán cầu"; `khiDoi('ban-cau', v)` đảo chiều quay và hướng lệch Coriolis, đổi nhãn tương ứng | Chọn "Nam bán cầu": xoáy quay thuận kim đồng hồ, nhãn ghi "lệch sang trái"; chọn lại "Bắc bán cầu": ngược kim đồng hồ, "lệch sang phải" |
| S-13 | Truy cập / Hình ảnh | màn dọc | `datNhan('toi-gian')`: chỉ giữ ≤ 3 nhãn ngắn mỗi cảnh (ví dụ "≥ 26,5 °C", "L", "Mắt bão"); thẻ điều kiện, bảng cấp bão, dòng nguồn chuyển xuống khung Giải thích | Ở 390 × 844: vào chế độ Tự học, không tràn ngang, khung Giải thích có chữ ≥ 16 px |
| S-14 | Hiệu năng | dòng 1644–1645, 2017 và toàn bộ vỏ | Bỏ toàn bộ vỏ widget: 3 script unpkg, CSP, script `codex-visualization-*`, mã `window.openai`. Biểu tượng (nếu cần) tự vẽ bằng SVG | 0 request ra mạng, 0 lỗi console ở 3 khung; bản phát hành ≤ 500 KB (dự kiến < 150 KB kể cả khung và font) |
| S-15 | Truy cập | toàn bộ | Giữ `prefers-reduced-motion`: tắt nhịp co giãn trang trí, giữ chuyển động mang nội dung (dòng khí, chiều quay) ở tốc độ 0,5× | Bật reduced-motion: elip nước ấm đứng yên, mũi tên gió vẫn chạy |

**Câu hỏi cho TS. Đạt**
- **Q-1.** Có thêm cảnh 6 "Bão mạnh cỡ nào?" (S-05) không? Đề xuất: có, vì bản gốc chỉ có 1 con số nên khó ra câu hỏi vận dụng có tính số, và sinh viên Việt Nam cần biết thang cấp bão trong bản tin dự báo. Các ngưỡng km/h ở S-05 tôi ghi theo Quyết định 18/2021/QĐ-TTg, **nhờ thầy đối chiếu lại văn bản** trước khi phát hành.
- **Q-2.** Thuật ngữ: dùng "ẩn nhiệt ngưng kết" và "ngưng kết" (cách dùng phổ biến trong giáo trình khí tượng Việt Nam) thay cho "nhiệt ẩn" và "ngưng tụ" của bản gốc? Đề xuất: đổi sang "ẩn nhiệt ngưng kết"; phần câu hỏi và giải thích ở mục 7 đang viết theo đề xuất này.
- **Q-3.** Nguồn cho "lớp nước ấm dày ~50 m" và "đứt gió < 10 m/s": đề xuất ghi Gray (1968); thầy có nguồn giáo trình tiếng Việt muốn dùng thay không?

## 5. Phân tầng: **T2** (2D – Opus) · khối lượng **L** (> 4 giờ)

- **Q1 (chỉ sửa nhãn, số, chữ?)** Không. Phải sửa chiều quay và minh hoạ Coriolis (logic chuyển động), tách hai hình chiếu (cấu trúc cảnh), dựng lại toàn bộ trên sân khấu 4:3 và ghép khung.
- **Q2 (cấu trúc 3D thiết yếu, 2D làm mất ý chính?)** Không đủ mạnh. Bão đúng là cấu trúc 3D, nhưng ý chính của bài gồm hai hoàn lưu: hoàn lưu thứ cấp (vào – lên – ra – giáng) đọc rõ nhất trên **mặt cắt đứng**, hoàn lưu sơ cấp (xoáy) đọc rõ nhất trên **hình nhìn từ trên**. Đây cũng là cặp hình chuẩn trong mọi giáo trình. Hai hình 2D đặt cạnh nhau (S-03) truyền đạt đủ; 3D chỉ thêm được cảm nhận "dòng khí đi xoắn ốc lên", không đáng đổi lấy khối lượng dựng 3D từ đầu và 1 trong 2 suất 3D (suất kia đã thuộc `luc-tao-trieu`, suất còn lại nên để `khuc-xa-song` cạnh tranh).
- **Q3** → T2.
- Khối lượng L vì gần như dựng lại: bản gốc chỉ dùng được như kịch bản phân cảnh (5 giai đoạn, lời mô tả, toạ độ gợi ý), không tái dùng được mã vỏ, bố cục 16:9, màu, hay keyframe.

## 6. Kịch bản 3D

Không áp dụng (T2).

## 7. Nội dung tự học (nháp, chờ duyệt ở G1)

**Cảnh 1 — Biển tích nhiệt** (`bien-am`)
Giải thích: Bão nhiệt đới chỉ sinh ra trên vùng biển ấm: nhiệt độ nước mặt từ 26,5 °C trở lên, và lớp nước ấm phải dày khoảng 50 m. Nước ấm bốc hơi mạnh, đưa nhiệt và hơi ẩm từ đại dương vào khí quyển. Ngoài ra cần thêm bốn điều kiện: cách xích đạo ít nhất 5° vĩ, gió ít thay đổi theo độ cao, không khí tầng giữa ẩm, và có sẵn một nhiễu động.

**Cảnh 2 — Đối lưu phát triển** (`doi-luu`)
Giải thích: Không khí nóng ẩm sát mặt biển nhẹ hơn nên bốc lên cao. Lên cao thì lạnh đi, hơi nước ngưng kết thành mây và mưa. Khi ngưng kết, hơi nước trả lại lượng nhiệt đã nhận lúc bốc hơi, gọi là ẩn nhiệt ngưng kết. Nhiệt này làm cột khí ấm thêm, bốc lên mạnh hơn nữa. Đây là nguồn năng lượng chính của bão.

**Cảnh 3 — Áp thấp được nuôi dưỡng** (`ap-thap`)
Giải thích: Cột khí ấm bốc lên làm khí áp ở mặt biển giảm. Không khí ẩm xung quanh bị hút về tâm ở tầng thấp, rồi lại bốc lên, ngưng kết và toả nhiệt. Trên cao, không khí toả ra ngoài, nhờ đó dòng đi lên không bị nghẹt. Vòng tuần hoàn khép kín này tự khuếch đại: khí áp càng giảm thì gió hút vào càng mạnh.

**Cảnh 4 — Hoàn lưu bắt đầu xoáy** (`xoay`)
Giải thích: Vì Trái Đất tự quay, không khí thổi về tâm áp thấp không đi thẳng mà bị lực Coriolis làm lệch: sang phải ở Bắc bán cầu, sang trái ở Nam bán cầu. Luôn bị lệch phải, dòng khí vòng quanh tâm theo chiều ngược kim đồng hồ. Sát xích đạo lực Coriolis gần bằng không nên bão không hình thành ở đó. Hãy thử chọn Nam bán cầu để so sánh.

**Cảnh 5 — Bão trưởng thành** (`bao-truong-thanh`)
Giải thích: Khi xoáy đủ mạnh, bão có cấu trúc rõ ràng. Ở giữa là mắt bão: không khí giáng xuống, trời quang, gió gần như lặng. Bao quanh mắt là thành mắt bão, nơi không khí bốc lên mạnh nhất, gió và mưa dữ dội nhất. Bên ngoài là các dải mưa xoắn. Bão duy trì chừng nào biển còn ấm và gió ít đổi theo độ cao; vào đất liền hoặc vùng biển lạnh thì suy yếu.

**Cảnh 6 — Bão mạnh cỡ nào?** (`cap-bao`, chỉ khi Q-1 được duyệt)
Giải thích: Việt Nam phân cấp theo tốc độ gió mạnh nhất gần tâm. Gió cấp 6–7, từ 39 đến 61 km/h, gọi là áp thấp nhiệt đới. Từ cấp 8, tức 62 km/h trở lên, mới gọi là bão. Cấp 10–11 là bão mạnh, cấp 12–15 là bão rất mạnh, từ cấp 16 (184 km/h trở lên) là siêu bão. Gió càng mạnh thì khí áp ở tâm càng thấp.

**Câu hỏi tự kiểm tra**

- **su-hinh-thanh-bao-q1** (nhớ – hiểu). Nguồn năng lượng chính nuôi một cơn bão nhiệt đới là gì?
  A. Bức xạ Mặt Trời chiếu thẳng vào đỉnh mây · B. Ẩn nhiệt toả ra khi hơi nước ngưng kết · C. Ma sát giữa gió và mặt biển · D. Nhiệt từ lòng đất dưới đáy biển
  **Đáp án B.** Hơi nước bốc lên từ biển ấm, khi ngưng kết thành mây thì toả ẩn nhiệt, làm cột khí ấm lên và tiếp tục bốc lên.
- **su-hinh-thanh-bao-q2** (nhớ – hiểu). Ở Bắc bán cầu, gió tầng thấp trong một cơn bão thổi như thế nào?
  A. Xoáy vào tâm, ngược chiều kim đồng hồ · B. Xoáy vào tâm, thuận chiều kim đồng hồ · C. Thổi thẳng từ tâm ra ngoài · D. Thổi thẳng vào tâm, không xoáy
  **Đáp án A.** Không khí bị hút về tâm áp thấp và bị lực Coriolis làm lệch sang phải, nên vòng quanh tâm ngược chiều kim đồng hồ.
- **su-hinh-thanh-bao-q3** (vận dụng, tính số). Mỗi kilôgam hơi nước ngưng kết toả ra khoảng 2,5 × 10⁶ J. Một trận mưa bão 100 mm rơi trên 1 m² mặt biển (tức 100 kg nước) đã toả ra bao nhiêu nhiệt?
  A. 2,5 × 10⁴ J · B. 2,5 × 10⁶ J · C. 2,5 × 10⁸ J · D. 2,5 × 10¹⁰ J
  **Đáp án C.** 100 kg × 2,5 × 10⁶ J/kg = 2,5 × 10⁸ J, tương đương khoảng 69 kWh điện cho mỗi mét vuông.
- **su-hinh-thanh-bao-q4** (vận dụng, tính số; dùng khi có cảnh 6). Bản tin cho biết gió mạnh nhất gần tâm là 36 m/s. Theo thang cấp bão của Việt Nam, đây là gì?
  A. Áp thấp nhiệt đới · B. Bão mạnh (cấp 10–11) · C. Bão rất mạnh (cấp 12–15) · D. Siêu bão (từ cấp 16)
  **Đáp án C.** 36 m/s × 3,6 = 129,6 km/h ≈ 130 km/h, nằm trong khoảng 118–183 km/h của cấp 12–15.
- **su-hinh-thanh-bao-q4 (bản thay thế nếu KHÔNG có cảnh 6).** Tham số Coriolis f = 2Ω·sin φ. So với ở vĩ độ 5°N, f ở vĩ độ 20°N lớn gấp khoảng mấy lần? (sin 5° ≈ 0,087; sin 20° ≈ 0,342)
  A. 2 lần · B. 4 lần · C. 8 lần · D. 16 lần
  **Đáp án B.** 0,342 / 0,087 ≈ 3,9, tức khoảng 4 lần; càng xa xích đạo lực Coriolis càng lớn nên xoáy càng dễ hình thành.

(Kiểm tính: 2Ω·sin 5° = 1,27×10⁻⁵ s⁻¹; 2Ω·sin 20° = 4,99×10⁻⁵ s⁻¹; tỉ số 3,92. 2,5×10⁸ J = 69,4 kWh.)

**Giây chụp thumbnail:** cảnh 5 `bao-truong-thanh`, t = 2,0 s kể từ đầu cảnh, khung laptop, nhãn đầy đủ.

## 7b. Bản quyền

| Thành phần | Vị trí | Nguồn | Xử lý |
|---|---|---|---|
| Hình SVG bão (biển, mây, mũi tên, xoáy) | dòng 1465–1547 | Do công cụ AI sinh theo yêu cầu của tác giả; không sao chép hình sách | Vẽ lại theo S-03, S-08; không giữ nguyên bản |
| SVG data-URI dấu tích (17 × 17) | dòng 136 (`--checkmark-image`) | Thuộc vỏ hệ thống thiết kế của công cụ sinh widget; nội dung bão không dùng | Bỏ cùng vỏ (S-14) |
| Biểu tượng lucide (`play`, `pause`, `waves`, `cloud-rain-wind`, `arrow-down-to-line`, `rotate-ccw`, `hurricane`) | dòng 1551, 1562, 1571–1575 | Lucide, giấy phép ISC, tải từ unpkg | Bỏ; nút do khung dựng |
| `@floating-ui` (tooltip) | dòng 1644–1645 | MIT, tải từ unpkg; nội dung không có `data-tooltip` nào nên không dùng | Bỏ |
| CSS và script vỏ `codex-visualization` | dòng 20–1039, 1043–1328, 1646–2031, 2036–2234 | Mã hạ tầng của công cụ sinh widget (OpenAI) | **Không** mang sang bản phát hành |
| Ảnh raster, hình chụp từ sách | — | Không có | — |
| Font | dòng 112 | Font hệ thống | Thay bằng Be Vietnam Pro của khung |

Kết luận: không có hình nào phải xin phép; bản phát hành là bản vẽ lại nên không còn mã của bên thứ ba.

## 8. Checklist nghiệm thu

1. Ở 3 khung (1024 × 768, 390 × 844, 844 × 390): 0 lỗi console, 0 request ra ngoài; chuỗi `unpkg`, `openai`, `codex` xuất hiện 0 lần trong `animations/su-hinh-thanh-bao/index.html`.
2. Dung lượng bản phát hành ≤ 500 KB.
3. Cảnh 4 và 5, Bắc bán cầu: xoáy và thành mắt quay **ngược** chiều kim đồng hồ; chọn Nam bán cầu thì quay **thuận** và nhãn đổi thành "lệch sang trái".
4. Minh hoạ Coriolis: quỹ đạo liền nằm bên **phải** đường đứt hướng thẳng vào tâm (Bắc bán cầu).
5. Cảnh 5 có 2 nửa có nhãn "Mặt cắt đứng" và "Nhìn từ trên xuống"; mắt bão có mũi tên giáng, thành mắt có mũi tên bốc lên trên nửa mặt cắt.
6. Cảnh 1 có đủ 5 điều kiện với 3 ngưỡng số: 26,5 °C; 5° vĩ; 10 m/s.
7. Có 5 cảnh (hoặc 6 nếu Q-1 được duyệt); `ve(t)` thuần: dừng 1 s thì hai ảnh chụp giống nhau, phát lại thì khác.
8. `lang="vi"`; tiêu đề trang "Sự hình thành bão nhiệt đới"; cỡ chữ sân khấu: tiêu đề ≥ 44, chú thích ≥ 36, nhãn ≥ 30, nguồn ≥ 22 px; không có hai chuỗi chữ chồng nhau ở bất kỳ cảnh nào.
9. Mỗi cảnh có đoạn Giải thích 40–60 từ; 4 câu hỏi `su-hinh-thanh-bao-q1…q4` hiện ở mức Tự luyện.
10. Số lần xuất hiện "độ mặn", "South China Sea", "Biển Nam Trung Hoa" = 0; có dòng nguồn ở mọi cảnh.

## 9. Ngoài phạm vi

- Không dựng 3D, không dùng three.js.
- Không vẽ bản đồ, không vẽ quỹ đạo bão thật, không nêu tên cơn bão cụ thể. (Nếu về sau thêm bản đồ: chỉ dùng "Biển Đông", có quần đảo Hoàng Sa và Trường Sa của Việt Nam.)
- Không mô phỏng số trường gió hay khí áp; mọi chuyển động là minh hoạ định tính, ghi rõ "Sơ đồ, không theo tỉ lệ".
- Không nói về nước dâng do bão, sóng trong bão, dự báo quỹ đạo, biến đổi khí hậu.
- Không giữ chế độ sáng/tối theo máy, không giữ lưu trạng thái `widgetState`.
- Không thêm cảnh nào ngoài 5 cảnh gốc và cảnh 6 (nếu được duyệt).
