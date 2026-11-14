# Chặng 1 — Review, spec và phân tầng (đến CỔNG G1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Có bằng chứng (ảnh chụp, log mạng), 8 spec theo khung 9 mục và bảng `audit/TRIAGE.md` để TS. Đạt duyệt ở G1.

**Architecture:** Chặng này chỉ đọc `_nguon/` và sinh tài liệu. Một script Playwright chụp mỗi file ở 3 khung có chặn mạng; một script tách bundle Claude Design ra thư mục tạm để đọc JSX. Fable tự đọc toàn bộ từng file và viết spec (đề bài: "Fable tự làm").

**Tech Stack:** Node 22, Playwright + Chromium cài sẵn, không thêm phụ thuộc.

**Spec:** `docs/superpowers/specs/2026-11-13-kho-hoclieu-so-design.md` và `docs/DE_BAI_GOC.md` (Bước 1).

Kế hoạch các chặng sau (2: khung + build + test + agent; 3: pilot → G2; 4: cả loạt; 5: trang kho + sổ điểm → G3; 6: nghiệm thu) viết sau G1 vì phụ thuộc bảng phân tầng.

## Global Constraints

- Không sửa, không xoá gì trong `_nguon/`. Không sửa HTML ở chặng này.
- Slug theo bảng 4.1 của tài liệu thiết kế (8 slug; bản Chu kỳ triều không `-latest` không có spec).
- Mỗi lỗi khoa học phải có số dòng và phép tính cụ thể. Số không có nguồn ghi `[CẦN NGUỒN]`.
- Thuật ngữ: "độ muối", "Biển Đông" / "East Vietnam Sea".
- Mỗi commit một việc, message tiếng Việt.
- Ngưỡng 3D: tối đa 2/8.

## Review Focus

- File gọi mạng nhưng vẫn "trông như chạy được" khi offline (font rơi về mặc định): log phải liệt kê từng request bị chặn, không chỉ nhìn ảnh.
- Animation không có dòng thời gian: ảnh giây 0/5/15 có thể giống nhau; ghi rõ trong spec thay vì kết luận "đứng hình".
- Bundle Claude Design hiện thumbnail SVG trước khi dựng xong: chờ thẻ `#__bundler_thumbnail` biến mất rồi mới tính giây 0.
- Lỗi khoa học nằm trong chuỗi chữ hiển thị chứ không trong công thức mã: đối chiếu cả hai.
- Số liệu trong prompt gốc có thể đã sai từ đầu: tính lại độc lập, không coi prompt là chân lý.

---

### Task 1: Script chụp bằng chứng

**Files:**
- Create: `tools/audit/chup.cjs`
- Output: `audit/screens/<slug>/<khung>-t<giây>.jpg`, `audit/screens/<slug>/log.json`

**Interfaces:**
- Produces: `node tools/audit/chup.cjs [slug…]`; `log.json` = `{ slug, file, khung: { "<tên>": { consoleErrors: [], pageErrors: [], blocked: ["<url>"] } } }`.

- [ ] Viết script: bảng slug → file nguồn; 3 khung `laptop` 1024×768, `doc` 390×844 (cảm ứng, mobile), `ngang` 844×390 (cảm ứng, mobile); chặn mọi request không phải `file:`/`data:`/`blob:` và ghi URL; chờ `#__bundler_thumbnail` biến mất (tối đa 20 s); chụp JPEG chất lượng 70 ở giây 0, 5, 15.
- [ ] Chạy cho 8 slug. Kỳ vọng: 72 ảnh, 8 `log.json`.
- [ ] Commit `audit: script chụp bằng chứng và ảnh 3 khung`.

### Task 2: Quét công nghệ

**Files:** Create `audit/TECH.md`

- [ ] Chạy `grep -il "plotly\|three\|d3\.\|chart\.js\|cdn\|fonts.googleapis" _nguon/*.html`, kết hợp `log.json`: mỗi file một dòng gồm thư viện + phiên bản, nhúng hay CDN, các host bị chặn, kết luận chạy offline.
- [ ] Commit `audit: TECH.md`.

### Task 3: Tách bundle để đọc

**Files:** Create `tools/audit/tach-bundle.cjs` (ghi ra thư mục tạm ngoài repo)

- [ ] Giải mã `__bundler/manifest` + `__bundler/template` của 3 bundle (luc-tao-trieu, kenh-sofar, chu-ky-trieu-mat-trang) thành các file JSX/JS/HTML rời; in bảng tên, mime, dung lượng từng tài nguyên.
- [ ] Commit `audit: script tách bundle Claude Design`.

### Task 4–11: Một spec cho mỗi animation

Thứ tự: `song-than-hut-chim`, `bien-dang-song-vo`, `khuc-xa-song`, `kenh-sofar` (4 file có prompt gốc), rồi `hat-nuoc-quay-vong`, `chu-ky-trieu-mat-trang`, `luc-tao-trieu`, `su-hinh-thanh-bao`.

**Files:** Create `specs/<slug>.md` theo đúng khung 9 mục của Bước 1.

Mỗi task:
- [ ] Đọc toàn bộ file nguồn (bundle: đọc JSX đã tách) và prompt gốc nếu có.
- [ ] Tính lại độc lập mọi con số hiển thị (bằng Python khi cần) và ghi kết quả vào mục 3.
- [ ] Xem 9 ảnh chụp và `log.json`.
- [ ] Viết spec đủ 9 mục; đi qua cây phân tầng Q1→Q3; soạn đoạn Giải thích 40–60 từ mỗi cảnh và 4 câu hỏi `<slug>-q1…q4`.
- [ ] Commit `<slug>: spec review`.

### Task 12: TRIAGE và STATUS

**Files:** Create `audit/TRIAGE.md`, `audit/STATUS.md`

- [ ] Bảng slug | điểm TB | số lỗi khoa học | tầng | khối lượng | lý do 1 dòng; thống kê số file mỗi tầng và % 3D; danh sách `[CẦN NGUỒN]` và câu hỏi cho TS. Đạt; pilot chốt.
- [ ] `STATUS.md`: 8 slug ở trạng thái `audited`.
- [ ] Commit, push, DỪNG ở G1.
