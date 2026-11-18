# Tóm tắt cổng G2: ba pilot

Ngày: 18/11/2026. Gửi: TS. Phạm Tiến Đạt. Nhánh: `claude/relaxed-meitner-q01202`.

> **Trạng thái bản này: NHÁP.** `kenh-sofar` và `hat-nuoc-quay-vong` đã approved. `luc-tao-trieu` đang nghiệm thu lần 1; các ô `[chờ]` sẽ điền khi có kết quả.

## 1. Thầy cần làm gì ở G2

1. Mở 3 animation trên điện thoại và laptop (mục 3), kiểm tay theo mục 4.
2. Quyết 7 điểm ở mục 5. Điểm nào Thầy không ý kiến thì giữ phương án đang dùng.
3. Duyệt G2. Sau khi duyệt mới sang chặng 4 (5 animation T2 còn lại).

## 2. Ba pilot

| Slug | Tầng | Dung lượng (ngưỡng) | Test tự động | Nghiệm thu | Trạng thái |
|---|---|---|---|---|---|
| `kenh-sofar` | T2, Preact + SVG | 137.906 B (500 KB) | 15/15 | lần 1 trượt 4 mục, lần 2 đạt | approved |
| `hat-nuoc-quay-vong` | T2, Canvas 2D | 117.506 B (500 KB) | 15/15 | lần 1 trượt (tương phản chữ), lần 2 trượt (dấu nặng "Độ" bị che), lần 3 đạt | approved |
| `luc-tao-trieu` | T3, three.js + dự phòng 2D | 636.686 B (1,5 MB) | 18/18 (có test dự phòng 2D) | lần 1 trượt 3 mục, [chờ lần 2] | [chờ] |

Toàn bộ test trên nhánh chính sau khi merge 2 pilot: 87 đạt, 12 bỏ qua (test chỉ dành cho laptop, cho màn cảm ứng, hoặc cho 3D).

**Cảnh 3D của `luc-tao-trieu`:** tối đa 14.482 tam giác (ngưỡng 80.000). Theo đo của worker: mặc định 14.050; bật hoạt hoạ và Trái Đất bán trong suốt 14.482; phóng gần nhất 9.812. Reviewer lần 1 đo lại: mặc định 14.050; tắt vành 8.962; bật hoạt hoạ 14.482; phóng gần nhất 9.812; gần nhất + hoạt hoạ 13.010.

**Reviewer bắt được những gì** (lý do nghiệm thu nhiều vòng là đáng):
- `kenh-sofar`: hai đoạn Giải thích quá dài (83 và 76 tiếng); tên cảnh sai ở khung cuối mỗi cảnh; thumbnail chụp sai khung; "86 bar" phải là 87 bar (tính lại: 860 m × 1.034,7 kg/m³ × 9,78 m/s² = 87,0 bar).
- `hat-nuoc-quay-vong`: chữ bị sóng và hạt đè ở cảnh 5 khi H ≥ 2,5 m (tương phản 1,0–3,25:1); phao che nhãn; hai bộ nhãn chồng nhau khi chuyển cảnh; nhãn "4%" che dấu nặng chữ "Độ".
- Mọi số khoa học hiển thị được tính lại độc lập. Ví dụ `kenh-sofar` dùng Mackenzie (1981) và Snell: góc tới hạn 15,89° so với "≈ 16°" hiển thị; tia 18° chạm mặt ở 4,08 km so với "4,1 km". `hat-nuoc-quay-vong`: L₀ = 156,13 m; e^−π = 4,32%. Không có số nào sai.

## 3. Cách mở để xem

Mỗi animation là **một file HTML tự chứa**: mở được cả khi không có mạng, không tải gì từ ngoài.

**Cách A, khuyến nghị: bật GitHub Pages tạm từ nhánh làm việc.** Thầy làm một lần trên github.com:
- Vào repo `HMO-Digital_Lectures` → Settings → Pages → Build and deployment → Source: "Deploy from a branch" → Branch: `claude/relaxed-meitner-q01202`, thư mục `/ (root)` → Save.
- Sau khoảng 1–2 phút, các link sau mở được trên mọi điện thoại:
  - https://phamtiendat-135.github.io/HMO-Digital_Lectures/animations/kenh-sofar/
  - https://phamtiendat-135.github.io/HMO-Digital_Lectures/animations/hat-nuoc-quay-vong/
  - https://phamtiendat-135.github.io/HMO-Digital_Lectures/animations/luc-tao-trieu/ (khi đã merge)
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
| 5 | Xoay 3D | `luc-tao-trieu` cảnh 3: kéo 1 ngón, chụm 2 ngón, nút Phóng to/Thu nhỏ | Không quá nhạy (worker ghi nhận kéo 200 px quay khá mạnh) |

## 5. Điểm chờ Thầy quyết

| # | Slug | Vấn đề | Đang dùng |
|---|---|---|---|
| 1 | `luc-tao-trieu` | Dòng nguồn | "NASA Moon Fact Sheet; Pugh & Woodworth (2014), Sea-Level Science". Spec chỉ đề xuất NASA; Pugh & Woodworth do worker thêm. |
| 2 | `luc-tao-trieu` | Hằng số gắn `[CẦN NGUỒN]` nhưng checklist bắt buộc hiển thị: 384.400 km, 6.371 km, 81,3, 27,32 ngày, 29,53 ngày, 24 h 50 ph, 0,46 | Đang hiển thị; tất cả có trong NASA Moon Fact Sheet |
| 3 | `luc-tao-trieu` | Thuật ngữ | "nước lớn / nước ròng", "bất đẳng nhật triều", nhìn từ cực Bắc, quay ngược chiều kim đồng hồ |
| 4a | `luc-tao-trieu` | Chiều quay Mặt Trăng ở cảnh 6 | Bản gốc vẽ Mặt Trăng quay ngược chiều tự quay Trái Đất (sai). Đang sửa: cùng chiều, ngược chiều kim đồng hồ nhìn từ cực Bắc, khớp cảnh 1, 4, 7. Đây là sửa so với bài giảng gốc. |
| 4 | `luc-tao-trieu` | Màu chữ Ft | #8A5D0B (tương phản 5,5:1) thay cho #B07A1C của spec (3,6:1, không đạt 4,5:1) |
| 5 | `hat-nuoc-quay-vong` | Tên giáo trình cho Bài 5 | Chưa có, nên dòng nguồn không ghi tên giáo trình |
| 6 | `kenh-sofar` | C-2 độ sâu đáy tại 12,0°N 114,5°E; C-3 cột độ muối của phao 2902696; C-4 câu trích dẫn Argo và DOI GDAC | Chưa có nguồn, nên không hiển thị. C-3: nếu có file phao gốc, thêm được cột S vào bảng 13 mức. |
| 7 | chung | 21 câu hỏi khoa học trong `audit/TRIAGE.md` mục 7 | Các pilot đang theo phương án đề xuất trong spec |

## 6. Thay đổi bộ khung và chuẩn trong chặng 3

- Mọi chế độ mở ở trạng thái dừng, t = 0. Sinh viên tự bấm phát, đỡ tốn pin và 4G.
- Trường `bang` cho cảnh: bảng số hiện trong khung Giải thích, dựng an toàn bằng `textContent`.
- Test tự động chặn móc gỡ lỗi `window.__` và chạy bản dự phòng 2D cho mọi animation 3D.
- Thông báo "đang hiển thị bản 2D" tự ẩn sau 6 s, để không che dòng nguồn.
- Quy ước "40–60 từ" = tối đa 67 tiếng (từ ghép tính là một từ).
- Bốn agent: `anim-3d` và `anim-reviewer` đổi sang cùng model với `anim-2d`.
