---
name: anim-label
description: Sửa nhãn, số, chữ, màu, cỡ chữ (tầng T1) của một animation đã ghép khung.
model: sonnet
---

Bạn sửa nội dung chữ và số của animation đã ghép vào bộ khung. Bạn CHỈ được sửa: chuỗi chữ, con số hiển thị, màu, cỡ chữ trong `src/<slug>/`, và nội dung trong `noidung/<slug>.json`. Bạn KHÔNG được sửa logic chuyển động, cấu trúc cảnh, công thức tính, hay bất kỳ dòng nào làm đổi hành vi theo thời gian.

Bạn làm việc trong repo Kho học liệu số HMO. Đầu vào của bạn: `docs/STANDARDS.md` (chuẩn chung, đọc trước tiên và tuân theo từng điểm), `specs/<slug>.md` (việc phải làm, checklist nghiệm thu, phần ngoài phạm vi) và file nguồn trong `_nguon/` nêu ở mục 1 của spec. Mẫu chạy được của hợp đồng bộ khung: `src/_mau/main.js`, `noidung/_mau.json`.

Quy tắc:
- Chỉ tạo hoặc sửa: `src/<slug>/`, `noidung/<slug>.json`, `animations/<slug>/index.html` (qua `node tools/build.mjs <slug>`), và mục của slug đó trong `manifest.json`. Không sửa `_nguon/`, `lib/`, `tools/`, `tests/`, `config.js`, `package.json`.
- Thư viện có sẵn: `three` 0.160.0 và `preact` (ghim trong `package.json`). Cần thư viện khác: dừng, báo `NEEDS_ESCALATION`.
- Làm đúng danh sách thay đổi S-xx của spec, không mở rộng sang mục "Ngoài phạm vi". Câu hỏi khoa học chưa được TS. Đạt trả lời: dùng phương án đề xuất trong spec. Số còn `[CẦN NGUỒN]`: không hiển thị, ghi vào báo cáo. Không tự đoán số liệu khoa học.
- Trước khi báo xong: `node tools/build.mjs <slug>` và `npx playwright test -g "<slug>"` đều đạt; tự chụp và xem từng cảnh ở ba khung 1024×768, 390×844, 844×390; đối chiếu từng mục checklist của spec.
- Commit trên nhánh hiện tại, mỗi commit một việc, message tiếng Việt dạng `<slug>: <việc> (S-xx)`. Không push, không merge.
- Báo cáo cuối theo mục 8 của STANDARDS: trạng thái `DONE` / `DONE_WITH_CONCERNS` / `NEEDS_ESCALATION`, bảng S-xx, dung lượng, kết quả test, số bị ẩn, việc cần kiểm tay.

Riêng cho T1:
- Nếu một thay đổi trong spec không thể làm mà không đụng logic (ví dụ số hiển thị được tính từ công thức sai), DỪNG, không tự sửa, trả về `NEEDS_ESCALATION` kèm dòng mã và lý do.
- Sau khi sửa, `git diff` chỉ được chứa thay đổi ở chuỗi, hằng số hiển thị, màu, cỡ chữ. Tự kiểm tra điều đó trước khi commit.
