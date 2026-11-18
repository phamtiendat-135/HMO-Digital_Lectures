# HANDOFF: Kho học liệu số HMO (chuyển sang phiên mới)

Cập nhật: 18/11/2026 (chiều, phiên điều phối thứ hai). Người phụ trách: TS. Phạm Tiến Đạt (Phó Chủ nhiệm Khoa KTTV&HDH, HUS-VNU).

Phiên mới đọc file này trước tiên, rồi làm tiếp từ mục 6. **Không hỏi lại những gì đã chốt ở mục 3.**

---

## 1. Bối cảnh

- Repo `phamtiendat-135/HMO-Digital_Lectures` là repo **public**, xuất bản bằng GitHub Pages tại https://phamtiendat-135.github.io/HMO-Digital_Lectures/
- Nhánh làm việc là `claude/relaxed-meitner-q01202`, và chỉ được push lên nhánh này. PR nháp: https://github.com/phamtiendat-135/HMO-Digital_Lectures/pull/1
- Mục tiêu: chuyển 9 file HTML gốc trong `_nguon/` thành các animation học liệu dùng chung một bộ khung. Hai nhóm người dùng:
  - Sinh viên năm 1–3 tự học trên điện thoại Android tầm trung (màn dọc 360–430 px, mạng 4G).
  - Giảng viên trình chiếu trên máy chiếu 4:3 (1024×768).
- Quy trình gồm 4 cổng bắt buộc dừng lại chờ duyệt: G0 (thiết kế) → G1 (spec + phân tầng) → **G2 (3 pilot)** → G3 (trang kho + sổ điểm). Ngoài 4 cổng này thì làm tiếp, không hỏi lặt vặt.
- **Đang ở chặng 3: hoàn tất 3 pilot rồi dừng ở G2.** 1/3 pilot đã approved (`kenh-sofar`).

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
| `hat-nuoc-quay-vong` | T2 | `anim/hat-nuoc-quay-vong` @ 7de817b | 115 KB | 87 passed / 12 skipped (toàn bộ) | Lần 1 KHÔNG ĐẠT (tương phản chữ cảnh 5 + 3 chỗ chữ bị che). `anim-2d` đã sửa đủ 4 mục (1a5be74…941223f; tương phản nhỏ nhất worker đo được 5,01:1). **Đang nghiệm thu lần 2** bằng `anim-reviewer` mới. |
| `luc-tao-trieu` | T3 | `anim/luc-tao-trieu` @ 32ba88b (WIP) | 636 KB (ngưỡng 1,5 MB) | 18/18 slug (trước WIP) | `anim-3d` báo đủ 26/26 S-xx, 14.482 tam giác tối đa, dự phòng 2D chạy đủ 7 cảnh. Sau đó trưởng nhóm giao thêm 2 việc: (1) rút Giải thích cảnh 3 và 5 về ≤ 67 tiếng: **xong** (881bce1); (2) nút "Phóng to"/"Thu nhỏ" cho cảnh 3: **đang làm**, phần dở lưu ở WIP 32ba88b. Chưa nghiệm thu lần nào. |

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
- Spec kenh-sofar câu 2: 87 bar, không phải 86 (759aa9d).

## 6. Việc tiếp theo, theo thứ tự (chặng 3 → G2)

Bước 1–5 của bản HANDOFF trước đã xong. Còn lại:

1. **`luc-tao-trieu`:** chờ `anim-3d` báo xong nút thu phóng (việc 2). Nếu phiên mới không liên lạc được với worker cũ, tạo `anim-3d` mới:
   - giao đọc `git show 32ba88b` và làm nốt: 2 nút `loai: 'nut'` trong `dieuKhien` cảnh 3, mỗi lần bấm đổi khoảng cách camera một bậc trong giới hạn OrbitControls, rồi gọi `HMO.yeuCauVe()`; `ve(t)` vẫn thuần; nút ≥ 44 px;
   - kiểm bằng 3 lệnh build/test, chụp ảnh, đo số tam giác ở mức phóng gần nhất.
2. **Nghiệm thu `luc-tao-trieu` lần 1** bằng `anim-reviewer` mới. Phải thử dự phòng 2D và ghi số tam giác. Báo cho reviewer biết 2 quyết định đã chốt: màu Ft là #8A5D0B, và dòng nguồn chờ TS. Đạt.
3. **`hat-nuoc-quay-vong`:** đọc báo cáo nghiệm thu lần 2. Nếu ĐẠT thì merge.
4. Pilot nào ĐẠT thì merge vào `claude/relaxed-meitner-q01202`:
   - `manifest.json` có thể xung đột: giải bằng `node tools/build.mjs` (build lại toàn bộ);
   - cập nhật `audit/STATUS.md` (approved) và `audit/REVIEW_LOG.md`;
   - chạy `npm test`, push.
5. Viết tóm tắt G2 cho TS. Đạt gồm:
   - dung lượng từng file;
   - số tam giác cảnh 3D;
   - các mục kiểm tay: fps máy thật, máy chiếu, ρ/→/≈/√ trên Windows và Android;
   - cách mở trên điện thoại;
   - các điểm chờ quyết ở mục 6b.

   Push, rồi **DỪNG ở G2**.

## 6b. Điểm chờ TS. Đạt quyết ở G2

1. **Dòng nguồn `luc-tao-trieu`:** "NASA Moon Fact Sheet; Pugh & Woodworth (2014), Sea-Level Science". Spec chỉ đề xuất NASA; Pugh & Woodworth do worker tự thêm.
2. **Hằng số `luc-tao-trieu` gắn `[CẦN NGUỒN]` nhưng checklist bắt buộc hiển thị:** 384.400 km, 6.371 km, 81,3, 27,32 ngày, 29,53 ngày, 24 h 50 ph, 0,46. Tất cả có trong NASA Moon Fact Sheet.
3. **Thuật ngữ `luc-tao-trieu`** (phương án đề xuất của spec, chưa duyệt): "nước lớn / nước ròng", "bất đẳng nhật triều", nhìn từ cực Bắc, quay ngược chiều kim đồng hồ.
4. **Màu Ft `luc-tao-trieu`:** #8A5D0B (5,5:1) thay cho #B07A1C (3,6:1, trượt tiêu chí tương phản). Trưởng nhóm đã chấp nhận tạm.
5. **Kết hợp Codex/ChatGPT (gói Business), dự kiến sau G2:**
   - Codex review chéo PR, hoặc làm một slug riêng ở chặng 4, kèm `AGENTS.md` trỏ tới STANDARDS;
   - ChatGPT dùng cho phác cảnh và ảnh truyền thông; không dùng cho số liệu hay bản đồ.

**Phân vai (TS. Đạt chốt ngày 18/11/2026):**
- Phiên chính chạy [mô hình bậc 1] ở mức effort **high**, giữ vai trưởng nhóm: chỉ huy, điều phối, giao việc, đọc báo cáo, merge, push, ghi STATUS/REVIEW_LOG. Việc dựng animation và nghiệm thu giao cho agent.
- Bốn agent giữ nguyên vai trò. `anim-3d` và `anim-reviewer` đổi sang cùng model với `anim-2d` (alias trong frontmatter), bỏ hẳn model cũ vì model đó đòi usage credits và làm cả 3 agent dừng ngay lúc khởi động. `anim-label` giữ nguyên.
- Nếu `subagent_type: anim-*` báo không tìm thấy (phiên khởi động trước khi có `.claude/agents/`), dùng `general-purpose`, chép nguyên văn phần thân file định nghĩa agent vào đầu prompt và đặt `model` đúng như frontmatter.

**Quy tắc chạy agent:** tối đa 3 agent song song. Phiên này đã chạm hạn mức 5 giờ một lần (05:53 UTC); worker bị dừng thì trưởng nhóm lưu phần dở thành commit WIP rồi gửi tiếp bằng SendMessage. Dặn mỗi agent commit WIP sau từng nhóm S-xx, vì hạn mức 5 giờ và hạn mức tuần đã nhiều lần cắt ngang worker. Nếu một agent bị dừng, gửi tiếp bằng SendMessage sau khi hạn mức hồi lại, không tạo agent mới.

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
