# HANDOFF: Kho học liệu số HMO (chuyển sang phiên mới)

Cập nhật: 19/11/2026. **G2 ĐÃ DUYỆT (19/11). Đang ở chặng 4.** Người phụ trách: TS. Phạm Tiến Đạt (Phó Chủ nhiệm Khoa KTTV&HDH, HUS-VNU).

Phiên mới đọc file này trước tiên, rồi làm tiếp từ mục 6. **Không hỏi lại những gì đã chốt ở mục 3.**

---

## 1. Bối cảnh

- Repo `phamtiendat-135/HMO-Digital_Lectures` là repo **public**, xuất bản bằng GitHub Pages tại https://phamtiendat-135.github.io/HMO-Digital_Lectures/
- Nhánh làm việc là `claude/relaxed-meitner-q01202`, và chỉ được push lên nhánh này. PR nháp: https://github.com/phamtiendat-135/HMO-Digital_Lectures/pull/1
- Mục tiêu: chuyển 9 file HTML gốc trong `_nguon/` thành các animation học liệu dùng chung một bộ khung. Hai nhóm người dùng:
  - Sinh viên năm 1–3 tự học trên điện thoại Android tầm trung (màn dọc 360–430 px, mạng 4G).
  - Giảng viên trình chiếu trên máy chiếu 4:3 (1024×768).
- Quy trình gồm 4 cổng bắt buộc dừng lại chờ duyệt: G0 (thiết kế) → G1 (spec + phân tầng) → **G2 (3 pilot)** → G3 (trang kho + sổ điểm). Ngoài 4 cổng này thì làm tiếp, không hỏi lặt vặt.
- **G2 đã duyệt ngày 19/11/2026** (cả 9 điểm theo phương án đang dùng; đã ghi vào spec 3 pilot và TRIAGE mục 7, commit 52e8868…effd378). **Đang ở chặng 4:** 5 animation T2 còn lại. Sau chặng 4 là chặng 5 rồi dừng ở G3.

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

## 4. Trạng thái 3 pilot (cập nhật 19/11/2026: cả 3 approved, đã merge)

> Ba nhánh `anim/*` đã push lên origin. Cách tạo lại worktree: xem mục 11. Mọi commit của phiên này đã push.

| Slug | Tầng | Nhánh / commit cuối | Dung lượng | Test | Tình trạng |
|---|---|---|---|---|---|
| `kenh-sofar` | T2 | đã merge vào nhánh chính (94484e6) | 137.906 B | 15/15 | **approved**. Lần 1 KHÔNG ĐẠT (4 mục), lần 2 ĐẠT. |
| `hat-nuoc-quay-vong` | T2 | đã merge vào nhánh chính | 117.506 B | 15/15 | **approved**. Lần 1 và 2 KHÔNG ĐẠT, lần 3 ĐẠT. |
| `luc-tao-trieu` | T3 | đã merge vào nhánh chính (19/11, từ 0954a70) | 638.724 B | 22 đạt + 2 bỏ qua | **approved**. Lần 1–4 KHÔNG ĐẠT, lần 5 ĐẠT (1.440 trạng thái 3D, 0 vi phạm). Chi tiết 5 vòng: REVIEW_LOG. |

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

## 6. Việc tiếp theo: chặng 4

**Trạng thái các luồng việc (19/11/2026, khoảng 09:00 UTC).** Tối đa 3 agent song song; đang chạy đủ 3:

| Luồng | Agent | Worktree / nhánh cục bộ | Ghi tiến độ (scratchpad) | Tình trạng |
|---|---|---|---|---|
| Bộ quét nhãn chung | general-purpose | `../wt/quet-nhan`, `tools/quet-nhan` | `quet-nhan/ghichu.md` | đang làm |
| `song-than-hut-chim` (1/5) | anim-2d | `../wt/song-than-hut-chim`, `anim/song-than-hut-chim` | `lam-song-than-hut-chim/ghichu.md` | đang làm |
| `bien-dang-song-vo` (2/5) | anim-2d | `../wt/bien-dang-song-vo`, `anim/bien-dang-song-vo` | `lam-bien-dang-song-vo/ghichu.md` | đang làm |

Các nhánh `anim/*` của chặng 4 và `tools/quet-nhan` **chưa được phép push** (chỉ 3 nhánh pilot và nhánh chính được phép); chỉ nằm trong worktree. Nếu container bị thu hồi thì mất phần chưa merge: đã hỏi TS. Đạt cho push các nhánh này.

**Thứ tự việc:**
1. Bộ quét xong: trưởng nhóm chạy `npm test` (≤ 4 phút) và `npm run quet-nhan` trên nhánh `tools/quet-nhan`, kiểm 3 trang mẫu lỗi làm test trượt đúng; merge vào nhánh chính, push; báo 2 worker merge nhánh chính vào nhánh của họ và chạy `npm run quet-nhan -- <slug>`.
2. Mỗi worker xong: nghiệm thu bằng `anim-reviewer` MỚI (prompt theo mẫu các lần nghiệm thu luc-tao-trieu: spec, STANDARDS mục 4 quy tắc 1–6, bộ quét chung, quét chữ đè vật chính bằng tay, tính lại số, ve(t), 3 lệnh). ĐẠT thì merge vào nhánh chính (manifest xung đột: `git checkout --theirs manifest.json && node tools/build.mjs`), STATUS approved, REVIEW_LOG, `npm test`, push.
3. Khi có chỗ trống: `khuc-xa-song` (3/5), rồi `chu-ky-trieu-18-6-nam` (4/5), cuối cùng `su-hinh-thanh-bao` (5/5, dựng lại). Prompt worker: theo mẫu đã giao cho `song-than-hut-chim` (quy tắc nhãn từ đầu, tự quét, commit WIP, ghichu.md).
4. Xong 5/5: sang chặng 5 (mục 7), rồi **DỪNG ở G3**.

**Bài học từ chặng 3** (đã đưa vào prompt worker):
- Quy tắc nhãn STANDARDS mục 4 (1–6) áp dụng từ bản đầu; worker nộp kết quả quét nhãn cùng bản đầu tiên.
- Reviewer phải quét phóng/điều khiển ở **mọi** trạng thái đặt sẵn, không chỉ trạng thái ban đầu.
- `luc-tao-trieu` mất 5 vòng nghiệm thu: 2 vòng vì quy tắc nhãn chốt muộn, 1 vòng vì nhãn bám vật trong 3D, 1 vòng vì lỗi nhỏ còn sót.

## 6b. G2: ĐÃ DUYỆT (19/11/2026)

TS. Đạt duyệt cả 9 điểm theo phương án đang dùng (xem `docs/G2_TOM_TAT.md` mục 5). Đã ghi vào: `specs/luc-tao-trieu.md`, `specs/hat-nuoc-quay-vong.md`, `specs/kenh-sofar.md` (mục "Quyết định ở G2") và `audit/TRIAGE.md` mục 7 (mọi phương án đề xuất được duyệt; số còn chờ "Thầy xác nhận/cho số" vẫn là `[CẦN NGUỒN]`, không hiển thị).

Việc TS. Đạt tự làm: bật GitHub Pages từ nhánh `claude/relaxed-meitner-q01202` (hướng dẫn ở tóm tắt G2 mục 3) để cho sinh viên xem 3 pilot. Từ container không kiểm được Pages (github.io bị chặn).

Kết hợp Codex/ChatGPT (gói Business), dự kiến sau: Codex review chéo PR hoặc làm một slug riêng, kèm `AGENTS.md` trỏ tới STANDARDS; ChatGPT cho phác cảnh, ảnh truyền thông, không cho số liệu hay bản đồ.

**Phân vai (TS. Đạt chốt ngày 18/11/2026):**
- Phiên chính chạy [mô hình bậc 1] ở mức effort **high**, giữ vai trưởng nhóm: chỉ huy, điều phối, giao việc, đọc báo cáo, merge, push, ghi STATUS/REVIEW_LOG. Việc dựng animation và nghiệm thu giao cho agent.
- Bốn agent giữ nguyên vai trò. `anim-3d` và `anim-reviewer` đổi sang cùng model với `anim-2d` (alias trong frontmatter), bỏ hẳn model cũ vì model đó đòi usage credits và làm cả 3 agent dừng ngay lúc khởi động. `anim-label` giữ nguyên.
- Nếu `subagent_type: anim-*` báo không tìm thấy (phiên khởi động trước khi có `.claude/agents/`), dùng `general-purpose`, chép nguyên văn phần thân file định nghĩa agent vào đầu prompt và đặt `model` đúng như frontmatter.

**Quy tắc chạy agent:** tối đa 3 agent song song. Phiên 18–19/11 đã chạm hạn mức 5 giờ 7 lần (lần đầu 05:53 UTC); worker bị dừng thì trưởng nhóm lưu phần dở thành commit WIP rồi gửi tiếp bằng SendMessage. Container cũng đã khởi động lại một lần và làm mất 2 reviewer đang chạy: dặn reviewer ghi kết quả dở vào `ghichu.md` trong thư mục scratchpad của nó sau mỗi bước. Worktree `../wt/*` và scratchpad vẫn còn sau khi container khởi động lại. Dặn mỗi agent commit WIP sau từng nhóm S-xx, vì hạn mức 5 giờ và hạn mức tuần đã nhiều lần cắt ngang worker. Nếu một agent bị dừng, gửi tiếp bằng SendMessage sau khi hạn mức hồi lại, không tạo agent mới.

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
