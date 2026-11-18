# HANDOFF: Kho học liệu số HMO (chuyển sang phiên mới)

Cập nhật: 18/11/2026, 17:10 UTC (cuối phiên điều phối thứ hai, viết để phiên mới bắt đầu ngày 19/11). Người phụ trách: TS. Phạm Tiến Đạt (Phó Chủ nhiệm Khoa KTTV&HDH, HUS-VNU).

Phiên mới đọc file này trước tiên, rồi làm tiếp từ mục 6. **Không hỏi lại những gì đã chốt ở mục 3.**

---

## 1. Bối cảnh

- Repo `phamtiendat-135/HMO-Digital_Lectures` là repo **public**, xuất bản bằng GitHub Pages tại https://phamtiendat-135.github.io/HMO-Digital_Lectures/
- Nhánh làm việc là `claude/relaxed-meitner-q01202`, và chỉ được push lên nhánh này. PR nháp: https://github.com/phamtiendat-135/HMO-Digital_Lectures/pull/1
- Mục tiêu: chuyển 9 file HTML gốc trong `_nguon/` thành các animation học liệu dùng chung một bộ khung. Hai nhóm người dùng:
  - Sinh viên năm 1–3 tự học trên điện thoại Android tầm trung (màn dọc 360–430 px, mạng 4G).
  - Giảng viên trình chiếu trên máy chiếu 4:3 (1024×768).
- Quy trình gồm 4 cổng bắt buộc dừng lại chờ duyệt: G0 (thiết kế) → G1 (spec + phân tầng) → **G2 (3 pilot)** → G3 (trang kho + sổ điểm). Ngoài 4 cổng này thì làm tiếp, không hỏi lặt vặt.
- **Đang ở chặng 3: hoàn tất 3 pilot rồi dừng ở G2.** 2/3 pilot đã approved (`kenh-sofar`, `hat-nuoc-quay-vong`). `luc-tao-trieu` trượt nghiệm thu lần 1 và 2; worker đã viết lại xong nhãn cả 7 cảnh và bản 2D, đang tự kiểm. Còn đúng 1 việc trước G2: nghiệm thu lần 3 rồi merge.

## 2. Tài liệu phải đọc trước khi làm

| File | Nội dung |
|---|---|
| `docs/DE_BAI_GOC.md` | Nguyên văn đề bài gốc (prompt điều phối), có bảng các điểm đã đổi ở G0/G1 |
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

## 4. Trạng thái 3 pilot (cập nhật phiên 18/11/2026, buổi chiều)

> Ba nhánh `anim/*` đã push lên origin. Cách tạo lại worktree: xem mục 11. Mọi commit của phiên này đã push.

| Slug | Tầng | Nhánh / commit cuối | Dung lượng | Test | Tình trạng |
|---|---|---|---|---|---|
| `kenh-sofar` | T2 | đã merge vào nhánh chính (94484e6) | 137.906 B | 15/15 | **approved**. Lần 1 KHÔNG ĐẠT (4 mục), lần 2 ĐẠT. |
| `hat-nuoc-quay-vong` | T2 | đã merge vào nhánh chính | 117.506 B | 15/15 | **approved**. Lần 1 và 2 KHÔNG ĐẠT, lần 3 ĐẠT. |
| `luc-tao-trieu` | T3 | `anim/luc-tao-trieu` @ 3538e91 (đã push) | 639.606 B | 18/18 luc; toàn bộ 105 đạt, 12 bỏ qua | Lần 1, 2, **3** KHÔNG ĐẠT. Lần 3: 6 cảnh 2D và bản dự phòng 2D đã sạch (0 nhảy, 0 chồng); trượt ở cảnh 3 bản 3D (nhãn bám thiên thể nhảy và đè Mặt Trăng tới 35 px), cảnh 7 chữ đè Mặt Trời, S-16 cỡ 24 px, S-17 mất "Trái Đất" ở tối giản, S-21 kéo điểm cam trên điện thoại (chi tiết: REVIEW_LOG). Trưởng nhóm thêm STANDARDS mục 4 quy tắc 4–6 (50efe2e): cảnh 3D camera tự do đưa tên thiên thể vào chú giải cố định. 22:05 UTC đã giao `anim-3d` sửa đúng 5 mục. Xong thì nghiệm thu lần 4 bằng reviewer mới, dùng bộ quét `review-luc-3/r3-quet.cjs`, `chung3.cjs` (scratchpad cũ). |

## 5. Bảy điểm (a)–(g) từ báo cáo `kenh-sofar`: ĐÃ XỬ LÝ XONG

| # | Đã làm | Commit |
|---|---|---|
| (a) | Mọi chế độ mở ở trạng thái dừng; test + STANDARDS mục 2 | 4548519 |
| (b) | Spec S-02: ρ, →, ≈ rơi font hệ thống được chấp nhận ("°", "³" vẫn trong font nhúng) | d984fd9 |
| (c) | Trường `bang` cho cảnh, dựng `<table>` bằng textContent, build kiểm cấu trúc; kenh-sofar chuyển bảng 13 mức sang `bang` | a88e69c, dc96df9 |
| (d) | STANDARDS: thuộc tính SVG trong JSX viết kebab-case | 240aab9 |
| (e) | Test chặn `window.__` (trừ `__THREE__`); xoá `window.__sofar` | e1dbbaf, bc42819 |
| (f) | Spec: 3,7° ở 1.300 m | 3bf59c1 |
| (g) | Ghi chú vào REVIEW_LOG | 07e8a36 |

**Thay đổi khung và chuẩn khác trong phiên này:**
- Thông báo "đang hiển thị bản 2D" tự ẩn sau 6 s; có test tự động chạy bản dự phòng 2D cho mọi animation 3D (5c60c96).
- STANDARDS mục 3: "40–60 từ" = **tối đa 67 tiếng** theo `split(/\s+/)` (db254d1).
- STANDARDS mục 4: cảnh có `dieuKhien` thì từ y = 900 trở xuống chỉ đặt nội dung hiện suốt cảnh.
- STANDARDS mục 4: **quy tắc đặt nhãn trên hình động** (1519f8d): nhãn gắn ổn định theo hình học, không dò chỗ theo khung; cấm chồng chữ và vật chính; được chồng nét phụ nếu có viền sáng ≥ 4 px.
- Spec kenh-sofar câu 2: 87 bar, không phải 86 (759aa9d).

## 6. Việc tiếp theo, theo thứ tự (chặng 3 → G2)

Mọi việc khác của chặng 3 đã xong. Phiên mới làm đúng 5 bước sau.

**Bước 0. Kiểm tình trạng.** Agent `anim-3d` của phiên cũ không còn (agent chạy nền chết theo phiên), nên không gửi SendMessage cho nó được.
```bash
git fetch origin anim/luc-tao-trieu
git log --oneline -5 origin/anim/luc-tao-trieu    # 5b5a98a trở lên
```
Nếu `../wt/luc-tao-trieu` còn: `git -C ../wt/luc-tao-trieu status`. Có thay đổi ở `src/` chưa commit thì xem diff; hợp lý thì commit WIP rồi push. Nếu worktree mất: tạo lại theo mục 11.

**Bước 1. Sửa sau lần 3 (đã giao `anim-3d` lúc 22:05 UTC 18/11, 5 mục, xem REVIEW_LOG dòng lần 3).** Phiên mới: nếu commit cuối trên `origin/anim/luc-tao-trieu` chưa ghi đã sửa đủ 5 mục, giao `anim-3d` mới đúng 5 mục đó. Dưới đây là mô tả bước tự kiểm cũ, vẫn áp dụng sau khi sửa. (Chỉ cần nếu commit cuối trên `origin/anim/luc-tao-trieu` chưa ghi "đã quét"/"tự kiểm xong". Giao việc: *không viết lại nhãn nữa*; chỉ kiểm và sửa lỗi nhỏ nếu có:
- quét nhảy nhãn ở 1/30 s, cả 7 cảnh và bản 2D, 3 khung, 2 mức nhãn (≤ 1 lần nhảy/ẩn mỗi 2 s; 0 lần lật A→B→A trong 1 s);
- quét chồng cấm (chữ–chữ, chữ trên vật chính, điểm có tên, đầu mũi tên; bảng/tiêu đề/dải đáy che vật chính);
- tương phản p5 ≥ 4,5:1 cho mọi chữ không có viền sáng ≥ 4 px;
- `ve(t)` thuần: tua ≥ 5 lần ở cảnh 3, t = 6,1, ảnh giống hệt;
- 3 lệnh: `node tools/build.mjs luc-tao-trieu`, `npx playwright test -g "luc-tao-trieu"`, `node tools/build.mjs --test && npx playwright test`;
- đếm tam giác; chụp ảnh khung mở đầu và giữa mỗi cảnh.
Commit, push, báo cáo theo STANDARDS mục 8.)

**Bước 2. Nghiệm thu lần 4 (agent `anim-reviewer` MỚI, không dùng lại reviewer cũ).** Lần 3 đã chạy xong (KHÔNG ĐẠT). Dùng prompt lần 3 làm mẫu, thêm: kiểm theo STANDARDS mục 4 quy tắc 4–6, kiểm lại đúng 5 mục trượt lần 3, test cảm ứng S-21 ở khung dọc. Nếu phiên mới không thấy kết quả: đọc `review-luc-3/ghichu.md` trong scratchpad cũ (nếu còn); không có thì giao reviewer mới với nội dung dưới đây. Reviewer được dặn: nếu vi phạm duy nhất còn lại là nhãn "Trái Đất" 12,2 px thì kết luận "ĐẠT có điều kiện" để trưởng nhóm quyết; khi đó đề nghị chấp nhận và ghi vào điểm chờ G2. Prompt gồm:
- slug `luc-tao-trieu`, nhánh `anim/luc-tao-trieu`, worktree `../wt/luc-tao-trieu`;
- kiểm lại 2 mục trượt lần 2 (nhảy nhãn; chồng cấm) theo đúng STANDARDS mục 4 bản mới, **và** toàn bộ S-01…S-26, checklist 10 mục, `ve(t)`, dự phòng 2D, số tam giác, mọi số khoa học;
- quyết định đã chốt: màu Ft #8A5D0B; dòng nguồn chờ TS. Đạt; cảnh 5 mức tối giản không cần nhãn "Trái Đất"; chiều Mặt Trăng cùng chiều tự quay Trái Đất;
- các thay đổi worker tự làm khi viết lại nhãn, reviewer phải xét có làm mất nội dung spec không: cảnh 1 bỏ số 1–8; cảnh 5 bỏ nhãn trùng "phía Mặt Trăng"; cảnh 4 thu nhỏ quỹ đạo vừa khung; cảnh 3 bản 2D chuyển tên lực và CM vào bảng số/chú giải;
- công cụ tham khảo: bộ quét của reviewer lần 2 (`r2-quet.cjs`, `chung2.cjs` trong scratchpad cũ, có thể đã mất; nếu mất thì tự viết lại);
- ghi kết quả dở vào `ghichu.md` trong scratchpad sau mỗi bước.

**Bước 3. Nếu ĐẠT:** merge `anim/luc-tao-trieu` vào `claude/relaxed-meitner-q01202`:
- `manifest.json` xung đột thì `git checkout --theirs manifest.json && node tools/build.mjs` (build lại toàn bộ);
- `audit/STATUS.md` → approved, kèm dung lượng; `audit/REVIEW_LOG.md` thêm dòng lần 3;
- `npm test` (lần trước: 87 đạt, 12 bỏ qua; sau merge sẽ thêm test của luc);
- push.

Nếu KHÔNG ĐẠT: giao lại `anim-3d` đúng các mục trượt, rồi lặp bước 2. Nếu lần 4 vẫn trượt chỉ vì nhãn, báo TS. Đạt trước khi chạy tiếp, vì đó là dấu hiệu quy tắc nhãn cần nới.

**Bước 4. Hoàn tất `docs/G2_TOM_TAT.md`:** bỏ dòng "NHÁP"; điền các ô `[chờ]` của luc (dung lượng, test, số vòng nghiệm thu, tam giác đo lại); thêm vào mục 2 "Reviewer bắt được những gì" các lỗi của luc (chiều Mặt Trăng ngược ở bản gốc; camera trôi do `controls.update()`; nhãn nhảy 271 lần/chu kỳ). Cập nhật HANDOFF, push, rồi **DỪNG ở G2**, trình TS. Đạt: link tóm tắt G2, hướng dẫn bật GitHub Pages (mục 3 của tóm tắt), 7 điểm chờ quyết.

**Bài học cho chặng 4** (5 animation T2): giao worker kèm quy tắc nhãn STANDARDS mục 4 ngay từ đầu và yêu cầu nộp bộ quét nhảy nhãn + tương phản cùng bản đầu tiên. Ở chặng 3, luc mất 2 vòng nghiệm thu chỉ vì nhãn.

## 6b. Điểm chờ TS. Đạt quyết ở G2

1. **Dòng nguồn `luc-tao-trieu`:** "NASA Moon Fact Sheet; Pugh & Woodworth (2014), Sea-Level Science". Spec chỉ đề xuất NASA; Pugh & Woodworth do worker tự thêm.
2. **Hằng số `luc-tao-trieu` gắn `[CẦN NGUỒN]` nhưng checklist bắt buộc hiển thị:** 384.400 km, 6.371 km, 81,3, 27,32 ngày, 29,53 ngày, 24 h 50 ph, 0,46. Tất cả có trong NASA Moon Fact Sheet.
3. **Thuật ngữ `luc-tao-trieu`** (phương án đề xuất của spec, chưa duyệt): "nước lớn / nước ròng", "bất đẳng nhật triều", nhìn từ cực Bắc, quay ngược chiều kim đồng hồ.
4. **Chiều quay Mặt Trăng ở cảnh 6 `luc-tao-trieu`:** bản gốc vẽ ngược chiều tự quay Trái Đất; đang sửa cho cùng chiều (ngược chiều kim đồng hồ nhìn từ cực Bắc). Báo TS. Đạt vì là sửa so với bài giảng gốc.
5. **Màu Ft `luc-tao-trieu`:** #8A5D0B (5,5:1) thay cho #B07A1C (3,6:1, trượt tiêu chí tương phản). Trưởng nhóm đã chấp nhận tạm.
6. **Kết hợp Codex/ChatGPT (gói Business), dự kiến sau G2:**
   - Codex review chéo PR, hoặc làm một slug riêng ở chặng 4, kèm `AGENTS.md` trỏ tới STANDARDS;
   - ChatGPT dùng cho phác cảnh và ảnh truyền thông; không dùng cho số liệu hay bản đồ.

**Phân vai (TS. Đạt chốt ngày 18/11/2026):**
- Phiên chính chạy [mô hình bậc 1] ở mức effort **high**, giữ vai trưởng nhóm: chỉ huy, điều phối, giao việc, đọc báo cáo, merge, push, ghi STATUS/REVIEW_LOG. Việc dựng animation và nghiệm thu giao cho agent.
- Bốn agent giữ nguyên vai trò. `anim-3d` và `anim-reviewer` đổi sang cùng model với `anim-2d` (alias trong frontmatter), bỏ hẳn model cũ vì model đó đòi usage credits và làm cả 3 agent dừng ngay lúc khởi động. `anim-label` giữ nguyên.
- Nếu `subagent_type: anim-*` báo không tìm thấy (phiên khởi động trước khi có `.claude/agents/`), dùng `general-purpose`, chép nguyên văn phần thân file định nghĩa agent vào đầu prompt và đặt `model` đúng như frontmatter.

**Quy tắc chạy agent:** tối đa 3 agent song song. Phiên 18/11 đã chạm hạn mức 5 giờ 5 lần (lần đầu 05:53 UTC); worker bị dừng thì trưởng nhóm lưu phần dở thành commit WIP rồi gửi tiếp bằng SendMessage. Container cũng đã khởi động lại một lần và làm mất 2 reviewer đang chạy: dặn reviewer ghi kết quả dở vào `ghichu.md` trong thư mục scratchpad của nó sau mỗi bước. Worktree `../wt/*` và scratchpad vẫn còn sau khi container khởi động lại. Dặn mỗi agent commit WIP sau từng nhóm S-xx, vì hạn mức 5 giờ và hạn mức tuần đã nhiều lần cắt ngang worker. Nếu một agent bị dừng, gửi tiếp bằng SendMessage sau khi hạn mức hồi lại, không tạo agent mới.

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
- Chỉ push lên `claude/relaxed-meitner-q01202` và 3 nhánh `anim/*` của pilot (đã được cho phép). Push nhánh khác phải được TS. Đạt cho phép rõ ràng.

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

## 11. Khôi phục nhánh pilot trong container mới

Ba nhánh `anim/hat-nuoc-quay-vong`, `anim/kenh-sofar` và `anim/luc-tao-trieu` đã được **push lên origin ngày 18/11/2026**, có sự đồng ý của TS. Đạt. Worktree cũ ở `/home/user/wt/` không còn, nên phải tạo lại:

```bash
git fetch origin anim/hat-nuoc-quay-vong anim/kenh-sofar anim/luc-tao-trieu
mkdir -p ../wt
for s in hat-nuoc-quay-vong kenh-sofar luc-tao-trieu; do
  git worktree add ../wt/$s -B anim/$s origin/anim/$s
  ln -s "$PWD/node_modules" ../wt/$s/node_modules
done
echo node_modules >> .git/info/exclude
```

Push các nhánh `anim/*` này khi có commit mới là được phép. Mọi nhánh khác vẫn cần xin phép.
