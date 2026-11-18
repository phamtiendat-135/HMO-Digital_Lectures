# REVIEW LOG

Ghi mỗi lần nghiệm thu: ngày | slug | lần | kết luận | mục trượt | xử lý.

| Ngày | Slug | Lần | Kết luận | Mục trượt | Xử lý |
|---|---|---|---|---|---|
| 18/11/2026 | `kenh-sofar` | 1 | KHÔNG ĐẠT | (1) Giải thích cảnh `tia-4` 83 từ, `bo-tia` 76 từ (> 60). (2) Tên cảnh trên sân khấu sai ở khung cuối mỗi cảnh (main.jsx:160 so `T >= mốc`, bỏ qua `idCanh`). (3) Nhẹ: `giayThumb` 70 là giây tuyệt đối, phải là 15 (giây trong cảnh `bo-tia`). (4) Nhẹ: "khoảng 86 bar" ở câu 2, tính lại được 87,1 bar. | Giao `anim-2d` sửa cả 4 mục; spec câu 2 đã sửa thành 87 bar. Chấp nhận tên cảnh góc phải 30 px (tiêu đề chính 44 px). Còn lại 16/16 S-xx và 10/10 mục checklist đạt; 15/15 test; 138.134 byte. |
| 18/11/2026 | `hat-nuoc-quay-vong` | 1 | KHÔNG ĐẠT | (Chặn) Checklist 9 / S-09: cảnh 5, "Nước nông dần", H ≥ 2,5 m: nhãn "mốc ban đầu" và "Hướng truyền năng lượng" bị sóng, hạt, vectơ đè, tương phản 1,0–3,25:1. (Không chặn) phao che nhãn elip ở cảnh 4; vectơ đè nhãn ở cảnh 5; hai bộ nhãn chồng nhau khi hoà cảnh 48–49 s. | Giao `anim-2d` sửa cả 4 mục. Còn lại 16/17 S-xx và 9/10 mục checklist đạt; 15/15 test; 115.952 byte; mọi số khoa học tính lại đều khớp. Giải thích 53–66 tiếng: đạt theo quy ước mới ở STANDARDS mục 3. |
| 18/11/2026 | `kenh-sofar` | 2 | ĐẠT | Không. Cả 4 mục của lần 1 đã đạt; 16/16 S-xx, 10/10 checklist; 42/42 cặp tua đi tua lại cho innerHTML giống hệt; tính lại mọi số khoa học bằng Mackenzie (1981) và Snell đều khớp. | Merge vào `claude/relaxed-meitner-q01202`; STATUS: approved. Kiểm tay còn lại: fps máy thật, máy chiếu, ρ/→/≈/√ trên Windows và Android. |
| 18/11/2026 | `hat-nuoc-quay-vong` | 2 | KHÔNG ĐẠT | Checklist 9 / S-09: nhãn "4%" vẽ sau, che dấu nặng của "Độ" trong "Độ sâu tác động của sóng (L/2)…" (đọc thành "Đô sâu"), 231 khung ở cảnh 3, 4, 5. Lỗi có từ trước, lần 1 bỏ sót. | Cả 4 mục của lần 1 đạt; tương phản nhỏ nhất 5,01:1 trên 11.295 lượt chữ; mọi số khoa học khớp. Giao lại `anim-2d` sửa một chỗ. |

## Ghi chú nghiệm thu

- **(g) `kenh-sofar`, `ve(t)` thuần:** tua 60 → 30 → 60 s cho innerHTML sân khấu giống hệt; ảnh lệch 17–868 điểm ảnh (laptop), 0–7 (điện thoại), sai khác lớn nhất 46, đều do khử răng cưa SVG. Chấp nhận theo quyết định ngày 18/11/2026; tiêu chí của slug này là DOM giống hệt.
