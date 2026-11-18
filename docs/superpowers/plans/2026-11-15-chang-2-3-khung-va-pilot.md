# Chặng 2–3 — Bộ khung, chuẩn chung và ba pilot (đến CỔNG G2) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ba animation pilot (`luc-tao-trieu`, `kenh-sofar`, `hat-nuoc-quay-vong`) ghép vào bộ khung chung, qua nghiệm thu độc lập, sẵn sàng cho TS. Đạt thử ở G2.

**Architecture:** `lib/khung.js` giữ đồng hồ, điều khiển, hai chế độ hiển thị, ba mức sử dụng, khung giải thích và câu hỏi; `lib/so-diem.js` gửi điểm có hàng đợi. Mỗi animation là `src/<slug>/main.js(x)` gọi `HMO.dangKy`, nội dung chữ ở `noidung/<slug>.json`. `tools/build.mjs` (esbuild) ghép thành một file HTML tự chứa.

**Tech Stack:** Node 22, esbuild 0.28.2, @playwright/test 1.63.0, three 0.160.0, preact 10.29.8.

**Spec:** `docs/superpowers/specs/2026-11-13-kho-hoclieu-so-design.md`, `docs/STANDARDS.md`, `specs/<slug>.md`, `audit/TRIAGE.md`.

## Global Constraints

- Mọi điều trong `docs/STANDARDS.md`.
- Ngưỡng: 2D ≤ 500 KB, 3D ≤ 1,5 MB. Bộ khung + font hiện 96 KB.
- Worker chỉ đụng `src/<slug>/`, `noidung/<slug>.json`, `animations/<slug>/`, mục của mình trong `manifest.json`.
- Mỗi animation một nhánh `anim/<slug>` trong worktree riêng; tối đa 3 worker song song.
- Trượt nghiệm thu 2 lần hoặc `NEEDS_ESCALATION` → nâng một tầng, ghi `audit/REVIEW_LOG.md`.

## Review Focus

- `ve(t)` không thuần ở animation có mô phỏng tích luỹ: reviewer tua đi tua lại và so ảnh.
- Cảnh 3D giữ chạm làm mất phát/dừng bằng chạm: phải còn nút Phát trong thanh điều khiển và test dùng nút đó.
- Chữ sân khấu ở điện thoại: mức `toi-gian` áp dụng cho cả màn ngang (sân khấu cao 390 px chỉ co được 0,36, không phải 0,59 như đề bài tính theo chiều rộng).
- Hàng đợi sổ điểm khi `localStorage` bị chặn (chế độ riêng tư): không được làm hỏng việc xem và làm câu hỏi.
- Bundle React: vị trí phát cũ trong `localStorage` (`animstage-v3:t`) không được đọc lại.

---

### Task 1: Bộ khung, sổ điểm, build, test (XONG)

**Files:** `lib/khung.js`, `lib/khung.css`, `lib/so-diem.js`, `lib/fonts/`, `config.js`, `tools/build.mjs`, `src/_mau/`, `noidung/_mau.json`, `tests/chung.js`, `tests/smoke.spec.js`, `tests/khung.spec.js`, `playwright.config.js`, `package.json`.

- [x] `npm test`: 45 đạt, 3 bỏ qua (kiểm tra chỉ dành cho một loại màn hình) ở ba khung laptop / dọc / ngang.

### Task 2: Chuẩn chung và 4 agent (XONG)

**Files:** `docs/STANDARDS.md`, `.claude/agents/anim-3d.md`, `anim-2d.md`, `anim-label.md`, `anim-reviewer.md`.

### Task 3–5: Ba pilot

| Task | Slug | Agent | Nhánh |
|---|---|---|---|
| 3 | `hat-nuoc-quay-vong` | anim-2d | `anim/hat-nuoc-quay-vong` |
| 4 | `kenh-sofar` | anim-2d | `anim/kenh-sofar` |
| 5 | `luc-tao-trieu` | anim-3d | `anim/luc-tao-trieu` |

Mỗi task:
- [ ] Tạo worktree từ nhánh làm việc; `STATUS.md` → `in-progress`.
- [ ] Worker làm theo spec + STANDARDS, build, test, commit trên nhánh của mình.
- [ ] `STATUS.md` → `in-review`; anim-reviewer (phiên mới) nghiệm thu.
- [ ] ĐẠT → merge vào nhánh làm việc, `STATUS.md` → `approved`. KHÔNG ĐẠT → trả worker cũ kèm danh sách mục trượt.

### Task 6: Tổng hợp cho G2

- [ ] Chạy toàn bộ test sau khi merge cả ba.
- [ ] Bảng dung lượng thật, số tam giác, các mục kiểm tay; cách mở ba bản pilot trên điện thoại.
- [ ] Push, DỪNG ở G2.

Chặng 4 (5 animation còn lại), chặng 5 (trang kho, thumbnail, QR, Apps Script, CI → G3) và chặng 6 (nghiệm thu cuối) có kế hoạch riêng sau G2.
