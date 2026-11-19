# Tóm tắt cổng G2: ba pilot

Ngày: 18/11/2026. Gửi: TS. Phạm Tiến Đạt. Nhánh: `claude/relaxed-meitner-q01202`.

> **Trạng thái: HOÀN TẤT, chờ Thầy duyệt.** Cả 3 pilot đã approved và đã merge vào nhánh `claude/relaxed-meitner-q01202` (19/11/2026).

## 1. Thầy cần làm gì ở G2

1. Mở 3 animation trên điện thoại và laptop (mục 3), kiểm tay theo mục 4.
2. Quyết 9 điểm ở mục 5. Điểm nào Thầy không ý kiến thì giữ phương án đang dùng.
3. Duyệt G2. Sau khi duyệt mới sang chặng 4 (5 animation T2 còn lại).

## 2. Ba pilot

| Slug | Tầng | Dung lượng (ngưỡng) | Test tự động | Nghiệm thu | Trạng thái |
|---|---|---|---|---|---|
| `kenh-sofar` | T2, Preact + SVG | 137.906 B (500 KB) | 15/15 | lần 1 trượt 4 mục, lần 2 đạt | approved |
| `hat-nuoc-quay-vong` | T2, Canvas 2D | 117.506 B (500 KB) | 15/15 | lần 1 trượt (tương phản chữ), lần 2 trượt (dấu nặng "Độ" bị che), lần 3 đạt | approved |
| `luc-tao-trieu` | T3, three.js + dự phòng 2D | 638.724 B (1,5 MB) | 22/22 + 2 bỏ qua (test cảm ứng không chạy ở khung laptop); có test dự phòng 2D, kéo và chụm 2 ngón | lần 1 trượt 3 mục, lần 2 và 3 trượt vì nhãn, lần 4 trượt 2 lỗi nhỏ, lần 5 đạt | approved |

Toàn bộ test trên nhánh chính sau khi merge cả 3 pilot: **109 đạt, 14 bỏ qua** (test chỉ dành cho laptop, cho màn cảm ứng, hoặc cho 3D).

**Cảnh 3D của `luc-tao-trieu`:** tối đa 14.482 tam giác (ngưỡng 80.000, spec S-20 đặt 20.000). Reviewer lần 5 đo: mặc định 14.050; bật hoạt hoạ 14.482 ở mọi góc nhìn và mức phóng.

**Reviewer bắt được những gì** (lý do nghiệm thu nhiều vòng là đáng):
- `kenh-sofar`: hai đoạn Giải thích quá dài (83 và 76 tiếng); tên cảnh sai ở khung cuối mỗi cảnh; thumbnail chụp sai khung; "86 bar" phải là 87 bar (tính lại: 860 m × 1.034,7 kg/m³ × 9,78 m/s² = 87,0 bar).
- `hat-nuoc-quay-vong`: chữ bị sóng và hạt đè ở cảnh 5 khi H ≥ 2,5 m (tương phản 1,0–3,25:1); phao che nhãn; hai bộ nhãn chồng nhau khi chuyển cảnh; nhãn "4%" che dấu nặng chữ "Độ".
- `luc-tao-trieu`: Mặt Trăng ở cảnh 6 quay ngược chiều tự quay Trái Đất (lỗi có sẵn trong bài giảng gốc); camera tự trôi sau mỗi lần vẽ, làm tua lại không ra cùng hình; nhãn nhảy chỗ (nhãn P cảnh 4 lật 271 lần mỗi chu kỳ); nhãn đè Mặt Trăng tới 35 px; trên điện thoại, kéo từ tâm Trái Đất lại kéo nhầm điểm đặt, và chụm 2 ngón không phóng khi ngón đầu chạm trúng điểm đặt; Mặt Trăng bị dải đáy che khi phóng ở góc nhìn cực Bắc. Sau 5 vòng, quét 1.440 trạng thái 3D không còn vi phạm.
- Mọi số khoa học hiển thị được tính lại độc lập. `luc-tao-trieu`: khối tâm chung 384.400 / 82,3 = 4.670,7 km (hiển thị 4.671 km); ngày triều 24,841 h (24 h 50 ph); triều cường/kém 1,46/0,54 = 2,70. Ví dụ `kenh-sofar` dùng Mackenzie (1981) và Snell: góc tới hạn 15,89° so với "≈ 16°" hiển thị; tia 18° chạm mặt ở 4,08 km so với "4,1 km". `hat-nuoc-quay-vong`: L₀ = 156,13 m; e^−π = 4,32%. Không có số nào sai.

## 3. Cách mở để xem

Mỗi animation là **một file HTML tự chứa**: mở được cả khi không có mạng, không tải gì từ ngoài.

**Cách A, khuyến nghị: bật GitHub Pages tạm từ nhánh làm việc.** Thầy làm một lần trên github.com:
- Vào repo `HMO-Digital_Lectures` → Settings → Pages → Build and deployment → Source: "Deploy from a branch" → Branch: `claude/relaxed-meitner-q01202`, thư mục `/ (root)` → Save.
- Sau khoảng 1–2 phút, các link sau mở được trên mọi điện thoại:
  - https://phamtiendat-135.github.io/HMO-Digital_Lectures/animations/kenh-sofar/
  - https://phamtiendat-135.github.io/HMO-Digital_Lectures/animations/hat-nuoc-quay-vong/
  - https://phamtiendat-135.github.io/HMO-Digital_Lectures/animations/luc-tao-trieu/
- Ở chặng 5, nguồn Pages sẽ chuyển sang workflow `.github/workflows/pages.yml` (build và test rồi mới xuất bản).

**Cách B: tải file về máy.** Trên GitHub, mở `animations/<slug>/index.html` ở nhánh trên → Download raw file → mở bằng Chrome hoặc Edge. Trên laptop dùng được ngay. Trên Android, tuỳ máy, trình quản lý tệp có thể không mở HTML bằng Chrome, nên cách A chắc hơn.

**Tham số URL để thử:**
- `?che-do=trinh-chieu`: chế độ máy chiếu, thanh điều khiển tự ẩn sau 3 s. Mặc định: laptop vào Trình chiếu, điện thoại vào Tự học.
- `?lop=TEST`: mức Tính điểm. Hiện chưa cấu hình sổ điểm (`soDiemUrl` rỗng), nên sẽ hiện "Sổ điểm chưa được cấu hình — điểm không được lưu". Như vậy là đúng ở giai đoạn này.
- Phím trên laptop: Space phát/dừng, ← → đổi cảnh, ↑ ↓ tốc độ, F toàn màn hình, L bật/tắt nhãn.

## 4. Kiểm tay (máy không màn hình không đo được)

| # | Kiểm | Cách làm | Đạt khi |
|---|---|---|---|
| 1 | Độ mượt trên điện thoại Android tầm trung | `kenh-sofar` cảnh 5 (6 tia); `hat-nuoc-quay-vong` lúc chuyển cảnh 3 → 4 (giây 48–49); `luc-tao-trieu` cảnh 3, xoay bằng ngón tay | Không giật thấy rõ (≥ 30 fps) |
| 2 | Ký hiệu toán | Trên Windows và Android, xem ρ, →, ≈, √ (`kenh-sofar`) và Ø, × (`hat-nuoc-quay-vong`) | Hiện đúng ký tự, không thành ô vuông |
| 3 | Máy chiếu 1024×768 | Mở `?che-do=trinh-chieu`, đứng cuối phòng đọc dòng nguồn (22–24 px, màu Slate) | Đọc được |
| 4 | Chạm và vuốt | Vuốt ngang đổi cảnh; chạm sân khấu phát/dừng; kéo thanh trượt H ở `hat-nuoc-quay-vong` cảnh 5 | Đúng thao tác |
| 5 | Xoay 3D | `luc-tao-trieu` cảnh 3: kéo 1 ngón, chụm 2 ngón (thử cả khi ngón đầu chạm trúng điểm cam), nút Phóng to/Thu nhỏ ở 3 góc nhìn | Không quá nhạy (kéo 200 px quay khá mạnh); ở góc cực Bắc phóng gần nhất dừng ở khoảng cách 12 là chủ ý |

## 5. Điểm chờ Thầy quyết

| # | Slug | Vấn đề | Đang dùng |
|---|---|---|---|
| 1 | `luc-tao-trieu` | Dòng nguồn | "NASA Moon Fact Sheet; Pugh & Woodworth (2014), Sea-Level Science". Spec chỉ đề xuất NASA; Pugh & Woodworth do worker thêm. |
| 2 | `luc-tao-trieu` | Hằng số gắn `[CẦN NGUỒN]` nhưng checklist bắt buộc hiển thị: 384.400 km, 6.371 km, 81,3, 27,32 ngày, 29,53 ngày, 24 h 50 ph, 0,46 | Đang hiển thị; tất cả có trong NASA Moon Fact Sheet |
| 3 | `luc-tao-trieu` | Thuật ngữ | "nước lớn / nước ròng", "bất đẳng nhật triều", nhìn từ cực Bắc, quay ngược chiều kim đồng hồ |
| 4 | `luc-tao-trieu` | Chiều quay Mặt Trăng ở cảnh 6 | Bản gốc vẽ Mặt Trăng quay ngược chiều tự quay Trái Đất (sai). **Đã sửa:** cùng chiều, ngược chiều kim đồng hồ nhìn từ cực Bắc, khớp cảnh 1, 4, 7. Đây là sửa so với bài giảng gốc. |
| 5 | `luc-tao-trieu` | Màu chữ Ft | #8A5D0B (tương phản 5,5:1) thay cho #B07A1C của spec (3,6:1, không đạt 4,5:1) |
| 6 | `luc-tao-trieu` | Cách trình bày đổi so với spec để nhãn không nhảy, không đè (nội dung khoa học giữ đủ, reviewer đã xét) | Cảnh 1 bỏ số 1–8 trên tám vị trí vòng mờ, thay bằng một dòng ghi chú. Cảnh 2 và 3: tên lực Fc, Fg, Ft, CM và tên Trái Đất, Mặt Trăng (ở cảnh 3D) nằm trong chú giải cố định, không bám theo hình. Cảnh 7: loại triều chỉ còn "Kỳ triều cường"/"Kỳ triều kém", bỏ "Trung gian". Cảnh 3 góc nhìn cực Bắc: phóng gần nhất dừng ở khoảng cách 12 (các góc khác 10) để Mặt Trăng không bị dải đáy che. |
| 7 | `hat-nuoc-quay-vong` | Tên giáo trình cho Bài 5 | Chưa có, nên dòng nguồn không ghi tên giáo trình |
| 8 | `kenh-sofar` | C-2 độ sâu đáy tại 12,0°N 114,5°E; C-3 cột độ muối của phao 2902696; C-4 câu trích dẫn Argo và DOI GDAC | Chưa có nguồn, nên không hiển thị. C-3: nếu có file phao gốc, thêm được cột S vào bảng 13 mức. |
| 9 | chung | 21 câu hỏi khoa học trong `audit/TRIAGE.md` mục 7 | Các pilot đang theo phương án đề xuất trong spec |

## 6. Thay đổi bộ khung và chuẩn trong chặng 3

- Mọi chế độ mở ở trạng thái dừng, t = 0. Sinh viên tự bấm phát, đỡ tốn pin và 4G.
- Trường `bang` cho cảnh: bảng số hiện trong khung Giải thích, dựng an toàn bằng `textContent`.
- Test tự động chặn móc gỡ lỗi `window.__` và chạy bản dự phòng 2D cho mọi animation 3D.
- Thông báo "đang hiển thị bản 2D" tự ẩn sau 6 s, để không che dòng nguồn.
- Quy ước "40–60 từ" = tối đa 67 tiếng (từ ghép tính là một từ).
- **Quy tắc đặt nhãn trên hình động** (STANDARDS mục 4): nhãn gắn cố định theo hình, không dò chỗ theo từng khung; cấm chữ đè chữ và đè vật chính; được chồng nét phụ nếu chữ có viền sáng ≥ 4 px. Ở cảnh 3D có camera tự do, tên vật nằm trong chú giải cố định. Quy tắc này rút ra từ 4 vòng nghiệm thu `luc-tao-trieu`, sẽ áp dụng ngay từ đầu cho 5 animation chặng 4.
- Bốn agent: `anim-3d` và `anim-reviewer` đổi sang cùng model với `anim-2d`.
