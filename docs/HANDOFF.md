# HANDOFF: Kho học liệu số HMO (chuyển sang phiên mới)

Cập nhật: 18/11/2026. Người phụ trách: TS. Phạm Tiến Đạt (Phó Chủ nhiệm Khoa KTTV&HDH, HUS-VNU).

Phiên mới đọc file này trước tiên, rồi làm tiếp từ mục 6. **Không hỏi lại những gì đã chốt ở mục 3.**

---

## 1. Bối cảnh

- Repo `phamtiendat-135/HMO-Digital_Lectures` là repo **public**, xuất bản bằng GitHub Pages tại https://phamtiendat-135.github.io/HMO-Digital_Lectures/
- Nhánh làm việc là `claude/relaxed-meitner-q01202`, và chỉ được push lên nhánh này. PR nháp: https://github.com/phamtiendat-135/HMO-Digital_Lectures/pull/1
- Mục tiêu: chuyển 9 file HTML gốc trong `_nguon/` thành các animation học liệu dùng chung một bộ khung. Hai nhóm người dùng:
  - Sinh viên năm 1–3 tự học trên điện thoại Android tầm trung (màn dọc 360–430 px, mạng 4G).
  - Giảng viên trình chiếu trên máy chiếu 4:3 (1024×768).
- Quy trình gồm 4 cổng bắt buộc dừng lại chờ duyệt: G0 (thiết kế) → G1 (spec + phân tầng) → **G2 (3 pilot)** → G3 (trang kho + sổ điểm). Ngoài 4 cổng này thì làm tiếp, không hỏi lặt vặt.
- **Đang ở chặng 3: hoàn tất 3 pilot rồi dừng ở G2.**

## 2. Tài liệu phải đọc trước khi làm

| File | Nội dung |
|---|---|
| `docs/superpowers/specs/2026-11-13-kho-hoclieu-so-design.md` | Thiết kế đã duyệt ở G0 (slug, 3 mức dùng, kiến trúc khung, chấm điểm) |
| `docs/STANDARDS.md` | Chuẩn bắt buộc cho worker: hợp đồng `HMO.dangKy`, noidung, cỡ chữ, ngôn ngữ, test, git, báo cáo |
| `audit/TRIAGE.md` | Phân tầng T1/T2/T3, quyết định G1 ghi ở đầu file, 21 câu hỏi khoa học ở mục 7 |
| `audit/STATUS.md`, `audit/REVIEW_LOG.md` | Trạng thái từng slug, nhật ký nghiệm thu (hiện còn trống) |
| `audit/TECH.md`, `audit/screens/<slug>/` | Kiểm kê kỹ thuật bản gốc, ảnh chụp bằng chứng |
| `specs/<slug>.md` | Spec 9 mục cho 8 slug |
| `docs/superpowers/plans/2026-11-15-chang-2-3-khung-va-pilot.md` | Kế hoạch chặng 2–3 |
| `.claude/agents/anim-{3d,2d,label,reviewer}.md` | Định nghĩa 4 agent, gọi bằng `subagent_type` cùng tên |

## 3. Quyết định đã chốt (không hỏi lại)

1. **Không phân loại theo học phần.** Slug chỉ đặt theo chủ đề; `hocPhan` và `bai` là trường trong `manifest.json`, để trống cho TS. Đạt điền sau.
2. **Có 3 mức dùng:** Chỉ xem, Tự luyện (mở sau khi xem tới cảnh cuối), Tính điểm. Mức Tính điểm chỉ bật khi URL có `?lop=<mã lớp>`.
3. **Cách A:** bộ khung dùng chung (`lib/khung.js`) được ghép vào lúc build, mỗi animation ra một file HTML tự chứa.
4. `luc-tao-trieu` là **một** animation gồm 7 cảnh tự do (slide 06–12 của bản gốc).
5. G0 đã duyệt.
6. G1 đã duyệt, đồng ý cả ba đề xuất:
   - Pilot là `luc-tao-trieu` (T3), `kenh-sofar` (T2) và `hat-nuoc-quay-vong` (T2, thay cho một pilot T1).
   - `su-hinh-thanh-bao` được dựng lại và xếp cuối hàng.
   - `chu-ky-trieu-mat-trang` đổi slug thành `chu-ky-trieu-18-6-nam`, tên hiển thị "Chu kỳ triều 18,6 năm và 4,4 năm", tag "nâng cao".
7. Không phát hành `_nguon/Chu ky trieu Mat Trang.html`, vì đó là bản cũ đã có bản `-latest`.

## 4. Trạng thái 3 pilot

> ⚠️ Ba nhánh `anim/*` hiện **chỉ có trong container cũ** (worktree ở `/home/user/wt/`), chưa push. Xem mục 11.

| Slug | Tầng | Nhánh / commit cuối | Dung lượng | Test | Tình trạng |
|---|---|---|---|---|---|
| `hat-nuoc-quay-vong` | T2 | `anim/hat-nuoc-quay-vong` @ 524e0da | 112 KB | 15/15 | Worker báo `DONE`. **Chưa nghiệm thu**: reviewer trước bị dừng giữa chừng vì hết hạn mức. `canhThumb` 2, `giayThumb` 12. |
| `kenh-sofar` | T2 | `anim/kenh-sofar` @ e533b0b | 134 KB (137.105 B) | 15/15 | Worker báo `DONE_WITH_CONCERNS`. Có 7 điểm chờ quyết định, xem mục 5. Dùng Preact (`main.jsx`, `du-lieu.js`). `canhThumb` 4, `giayThumb` 70. |
| `luc-tao-trieu` | T3 | `anim/luc-tao-trieu` @ e6570dd | ≈ 620 KB (ngưỡng 1,5 MB) | chưa chạy đủ | Còn dở. Đã có đủ 7 cảnh, cảnh 3 là three.js kèm bản dự phòng 2D. Worker bị dừng vì hết hạn mức; e6570dd là commit WIP lưu lúc chuyển phiên. Chưa có báo cáo, chưa biết các mục S-xx còn thiếu. |

Trên nhánh chính (HEAD b99d29b) đã có: bộ khung `lib/`, `tools/build.mjs`, test Playwright, `docs/STANDARDS.md`, 4 agent, mẫu `src/_mau`.

## 5. Bảy điểm chờ quyết định (từ báo cáo `kenh-sofar`)

Phiên mới **làm theo khuyến nghị dưới đây**, trừ khi TS. Đạt nói khác. Các điểm (a)–(e) sửa ở nhánh chính trước, rồi merge vào các nhánh `anim/*`.

| # | Vấn đề | Khuyến nghị |
|---|---|---|
| (a) | Khung tự phát ở chế độ Tự học (`if (!giam && S.cheDo === 'tu-hoc') datPhat(true)` trong `lib/khung.js`), trái với spec S-05 "mở ở trạng thái dừng". | **Mọi chế độ đều mở ở trạng thái dừng.** Sinh viên bấm phát khi đã sẵn sàng; như vậy cũng đỡ tốn pin và 4G. Sửa khung, cập nhật test và STANDARDS. |
| (b) | Font nhúng không có ρ, →, ≈. | **Chấp nhận rơi về font hệ thống** như STANDARDS mục 4 đã cho phép. Sửa câu "không rơi font" trong spec S-02 của `kenh-sofar`. |
| (c) | Khung giải thích chỉ hiện chữ thuần (textContent), không dựng được bảng. Hệ quả: bảng 13 mức làm Giải thích cảnh 1 vượt 40–60 từ. | Thêm trường tuỳ chọn `bang: {cot:[…], dong:[[…]]}` cho mỗi cảnh trong noidung. Khung dựng `<table>` an toàn bằng `textContent`, **không dùng innerHTML**. Ghi vào STANDARDS mục 3. |
| (d) | Preact không tự đổi tên thuộc tính SVG camelCase. | Ghi vào STANDARDS: trong JSX dùng Preact, viết thuộc tính SVG dạng kebab-case (`stroke-width`, `text-anchor`…). |
| (e) | Móc gỡ lỗi `window.__sofar` còn trong bản phát hành. | Xoá trước khi merge. Thêm một test quét bản phát hành để chặn `window.__`. |
| (f) | Góc tia ở 1.300 m hiện 3,7° (công thức cho 3,654°), spec ghi 3,6°. | Chấp nhận 3,7°, vì làm tròn đúng là 3,7. Sửa spec cho khớp. |
| (g) | Tua 60 → 30 → 60 s cho DOM giống hệt nhưng ảnh lệch 6 điểm ảnh, do khử răng cưa. | Chấp nhận, không phải lỗi `ve(t)` thuần. Ghi chú vào REVIEW_LOG. |

## 6. Việc tiếp theo, theo thứ tự (chặng 3 → G2)

1. **Khôi phục nhánh `anim/*`** (xem mục 11). Nếu mất, phải làm lại từ spec.
2. Sửa khung theo (a)–(e), mỗi việc một commit. Chạy `node tools/build.mjs --test && npx playwright test`.
3. Merge nhánh chính vào `anim/hat-nuoc-quay-vong` và `anim/kenh-sofar`, rồi build lại từng slug.
4. Nghiệm thu `hat-nuoc-quay-vong` bằng `subagent_type: anim-reviewer` (agent mới, không dùng lại worker cũ).
5. Nghiệm thu `kenh-sofar` bằng `anim-reviewer`.
6. Làm xong `luc-tao-trieu` bằng `anim-3d`. Trước hết cho agent đọc `git log` và diff so với spec để lập bảng S-xx còn thiếu. Kiểm: ≤ 1,5 MB; bản dự phòng 2D chạy khi không có WebGL2; số tam giác; mức nhãn `toi-gian` trên điện thoại. Sau đó nghiệm thu bằng `anim-reviewer`.
7. Pilot nào được duyệt thì merge vào `claude/relaxed-meitner-q01202`, cập nhật `audit/STATUS.md` (approved) và `audit/REVIEW_LOG.md`, rồi chạy toàn bộ `npm test`.
8. Viết tóm tắt G2 cho TS. Đạt gồm: dung lượng từng file, số tam giác của cảnh 3D, các mục cần kiểm tay (fps trên máy thật, font ρ/→/≈ trên Windows và Android), cách mở trên điện thoại. Push, rồi **DỪNG ở G2**.

**Quy tắc chạy agent:** tối đa 3 agent song song. Dặn mỗi agent commit WIP sau từng nhóm S-xx, vì hạn mức 5 giờ và hạn mức tuần đã nhiều lần cắt ngang worker. Nếu một agent bị dừng, gửi tiếp bằng SendMessage sau khi hạn mức hồi lại, không tạo agent mới.

## 7. Các chặng sau G2

- **Chặng 4:** 5 animation T2 còn lại, theo thứ tự `song-than-hut-chim`, `bien-dang-song-vo`, `khuc-xa-song`, `chu-ky-trieu-18-6-nam`, và `su-hinh-thanh-bao` cuối cùng (dựng lại).
- **Chặng 5:**
  - Trang kho `index.html` gồm:
    - tìm kiếm không phân biệt dấu;
    - lọc theo tầng và tag;
    - nhãn dung lượng;
    - nút sao chép link và mã QR;
    - bộ tạo link/QR lớp `?lop=`.
  - Mỗi animation có `thumb.webp` (chụp theo `canhThumb`/`giayThumb`) và `qr.svg`.
  - Sổ điểm: `apps-script/Code.gs` và `docs/HUONG_DAN_SO_DIEM.md`. Kết quả ghi vào sheet DanhSach / KetQua / TongHop. TongHop chỉ tính lần làm đầu tiên; mã `lop` phải khớp cột "Mã lớp" trong sheet DanhSach.
  - Hạ tầng: `.github/workflows/pages.yml` (build, test, quét từ cấm trên bản phát hành), `.nojekyll`, README tiếng Việt có ghi giới hạn của sổ điểm.
  - Sau đó **dừng ở G3**.
- **Chặng 6:** kiểm cuối. Mọi URL trên Pages trả về 200, có link CI, STATUS cập nhật thành published, kèm bảng tổng kết.

## 8. Cần TS. Đạt cung cấp (`[CẦN NGUỒN]`)

1. Tên giáo trình cho `hat-nuoc-quay-vong`, Bài 5.
2. Câu trích dẫn Argo và DOI của GDAC cho `kenh-sofar` (C-4).
3. Độ sâu đáy tại 12,0°N, 114,5°E (C-2).
4. Cột độ muối S của phao Argo dùng trong `kenh-sofar` (C-3), lấy từ file phao gốc.
5. 21 câu hỏi khoa học trong `audit/TRIAGE.md` mục 7.
6. Bản đề bài gốc (prompt điều phối dài). Đề nghị tải lên `docs/DE_BAI_GOC.md` để phiên mới đọc được nguyên văn; hiện các phiên chỉ còn bản tóm tắt trong file này và trong design doc.

Số nào còn thiếu nguồn thì **không hiển thị** và phải ghi vào báo cáo; không được bịa.

## 9. Ràng buộc bắt buộc

- **Không bao giờ đưa danh sách sinh viên, MSSV hay điểm vào repo** (repo public). URL Web App của Apps Script nằm trong `config.js` (`soDiemUrl`); URL này không phải bí mật, nhưng dữ liệu điểm chỉ nằm trong Google Sheet.
- **Không xoá và không sửa gì trong `_nguon/`.**
- Thuật ngữ:
  - Dùng "**độ muối**", không dùng "độ mặn".
  - Chỉ dùng "**Biển Đông**" / "**East Vietnam Sea**".
  - Bản đồ có Biển Đông phải thể hiện **quần đảo Hoàng Sa và quần đảo Trường Sa (Việt Nam)**.
- Định dạng số: dấu phẩy thập phân, dấu chấm phân nhóm nghìn (1.483,5 m/s). Mọi số liệu phải có dòng nguồn.
- Git:
  - Mỗi commit một việc, message tiếng Việt, kết thúc bằng 2 dòng trailer (`Co-Authored-By: …` và `Claude-Session: …`) theo hướng dẫn của phiên.
  - Không ghi tên model trong commit, PR hay mã.
  - Không đưa email của TS. Đạt ra dịch vụ ngoài.
- Chỉ push lên `claude/relaxed-meitner-q01202`. Push nhánh khác phải được TS. Đạt cho phép rõ ràng.

## 10. Lệnh hay dùng

```bash
npm install                                  # lần đầu trong container mới
node tools/build.mjs --test && npx playwright test   # build mẫu + chạy toàn bộ test
node tools/build.mjs <slug>                  # build 1 animation → animations/<slug>/index.html + manifest.json
npx playwright test -g "<slug>"              # test 1 animation ở 3 khung (1024×768, 390×844, 844×390)
node tools/audit/chup.cjs                    # chụp ảnh bằng chứng
node tools/audit/tach-bundle.cjs <file.html> <thu-muc-ra>   # bung bundle Claude Design
git worktree add ../wt/<slug> -b anim/<slug> # tạo worktree cho worker (symlink node_modules)
```

## 11. Lưu ý về container: nhánh `anim/*` có thể bị mất

Worktree `/home/user/wt/*` và thư mục scratchpad chỉ tồn tại trong container hiện tại. Ba nhánh `anim/hat-nuoc-quay-vong`, `anim/kenh-sofar` và `anim/luc-tao-trieu` **chưa push**. Nếu phiên mới chạy trên container mới mà các nhánh này chưa được đẩy lên GitHub, toàn bộ công việc của 3 pilot sẽ mất.

Cách giữ lại, chọn một:

- **(Khuyến nghị)** TS. Đạt cho phép push 3 nhánh `anim/*` lên origin. Phiên mới chỉ cần `git fetch origin anim/<slug>`.
- Hoặc merge cả 3 nhánh vào `claude/relaxed-meitner-q01202` ngay, dù chưa nghiệm thu, và ghi rõ trong STATUS là `in-review`.

Phiên mới kiểm tra trước tiên:

```bash
git fetch origin && git branch -r | grep anim/
```
