# REVIEW LOG

Ghi mỗi lần nghiệm thu: ngày | slug | lần | kết luận | mục trượt | xử lý.

| Ngày | Slug | Lần | Kết luận | Mục trượt | Xử lý |
|---|---|---|---|---|---|
| 18/11/2026 | `kenh-sofar` | 1 | KHÔNG ĐẠT | (1) Giải thích cảnh `tia-4` 83 từ, `bo-tia` 76 từ (> 60). (2) Tên cảnh trên sân khấu sai ở khung cuối mỗi cảnh (main.jsx:160 so `T >= mốc`, bỏ qua `idCanh`). (3) Nhẹ: `giayThumb` 70 là giây tuyệt đối, phải là 15 (giây trong cảnh `bo-tia`). (4) Nhẹ: "khoảng 86 bar" ở câu 2, tính lại được 87,1 bar. | Giao `anim-2d` sửa cả 4 mục; spec câu 2 đã sửa thành 87 bar. Chấp nhận tên cảnh góc phải 30 px (tiêu đề chính 44 px). Còn lại 16/16 S-xx và 10/10 mục checklist đạt; 15/15 test; 138.134 byte. |

## Ghi chú nghiệm thu

- **(g) `kenh-sofar`, `ve(t)` thuần:** tua 60 → 30 → 60 s cho innerHTML sân khấu giống hệt; ảnh lệch 17–868 điểm ảnh (laptop), 0–7 (điện thoại), sai khác lớn nhất 46, đều do khử răng cưa SVG. Chấp nhận theo quyết định ngày 18/11/2026; tiêu chí của slug này là DOM giống hệt.
