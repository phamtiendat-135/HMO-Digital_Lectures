# Đề bài gốc (prompt điều phối)

Đây là nguyên văn prompt điều phối TS. Phạm Tiến Đạt dán vào phiên làm việc ngày 13/11/2026, lưu lại để các phiên sau đọc được. Có hai chỗ đổi so với bản dán:

- Tên model được thay bằng nhãn bậc, theo quy tắc không ghi tên model trong repo. "[mô hình bậc 1]" là model mạnh nhất (làm T3, review, nghiệm thu), "[mô hình bậc 2]" làm T2, "[mô hình bậc 3]" làm T1. Model thật của từng agent ghi trong frontmatter `.claude/agents/*.md`.
- Không sửa gì khác.

**Đề bài này đã được điều chỉnh bởi các quyết định ở G0 và G1.** Khi đề bài mâu thuẫn với các tài liệu dưới đây, theo tài liệu dưới đây:

| Đề bài gốc | Đã đổi thành | Ở đâu |
|---|---|---|
| Slug `<hocphan>-<bai>-<chude>` | Slug chỉ theo chủ đề; `hocPhan` và `bai` là trường trong manifest | Design doc §4.1 |
| T3 build bằng Vite + vite-plugin-singlefile | Mọi animation build bằng esbuild (`tools/build.mjs`), bộ khung ghép lúc build (cách A) | Design doc §4.3 và §5 |
| Tự học / Trình chiếu, luôn có câu hỏi và sổ điểm | Thêm 3 mức: Chỉ xem / Tự luyện / Tính điểm (chỉ khi URL có `?lop=`) | Design doc §4.2 |
| `luc-tao-trieu` (12 slide) | Một animation 7 cảnh tự do, nâng cấp từ bản three.js sẵn có | Design doc §4.5 |
| `animations/` sinh ở `dist/` | `animations/` được commit vào repo; CI build lại và so sánh | Design doc §6 |

Xem thêm: `docs/superpowers/specs/2026-11-13-kho-hoclieu-so-design.md` (§6 liệt kê đủ các thay đổi), `docs/HANDOFF.md`, `audit/TRIAGE.md`.

---

~~~~text
Prompt [mô hình bậc 1] – Kho học liệu số animation HMO trên GitHub
Cách dùng

1. Tải HTML ra khỏi Claude Design: mở từng animation, dùng chức năng xuất/tải về dạng HTML độc lập, đặt tên file theo slug (ví dụ `hdhdc-b5-song-than.html`).
2. Tạo repo GitHub (đề xuất tên `hmo-hoclieu-so`). Trên web GitHub, vào Add file → Upload files, kéo thả toàn bộ HTML vào thư mục `_nguon/`, và các file `prompt_*_animation.md` vào `_nguon/prompts/` (đó là ý đồ thiết kế và số liệu chuẩn của từng animation). Mỗi lần tải lên được tối đa 100 file, mỗi file ≤ 25 MB.
3. Mở Claude Code, chọn repo vừa tạo, chọn model [mô hình bậc 1], kiểm tra plugin superpowers đã cài. Có 2 cách chạy:
   * Khuyến nghị: bản web claude.ai/code. Chạy trên máy chủ đám mây, máy nhà tắt cũng không sao, theo dõi và duyệt cổng bằng app Claude trên điện thoại.
   * Remote Control (chạy trên máy nhà, điều khiển từ điện thoại): cần Claude Code ≥ v2.1.51; trong thư mục repo chạy `claude --remote-control`; máy phải luôn bật, không ngủ, có mạng suốt quá trình (có thể 1–2 ngày). Máy ngủ là phiên bị ngắt.
4. Dán toàn bộ khối dưới vào (đã điền sẵn tên repo và hiện trạng 9 file).


```
Bạn là trưởng nhóm (orchestrator) cho dự án "Kho học liệu số HMO": một repo GitHub chứa các animation HTML dạy Hải dương học của TS. Phạm Tiến Đạt (Khoa Khí tượng Thủy văn và Hải dương học, ĐHKHTN – ĐHQGHN), công bố qua GitHub Pages để giảng viên và sinh viên bấm vào là mở được animation.

Thông tin:
- GitHub user: phamtiendat-135
- Tên repo: HMO-Digital_Lectures (public)   URL đích: https://phamtiendat-135.github.io/HMO-Digital_Lectures/
- Nguồn: 9 file HTML hiện đang nằm ở GỐC repo (commit "Add files via upload"). Ngay sau CỔNG G0, việc đầu tiên là `git mv` toàn bộ sang _nguon/ (giữ nguyên tên và nội dung), từ đó coi _nguon/ là bản gốc bất biến. Prompt thiết kế gốc (nếu có) nằm ở _nguon/prompts/*.md.
- Người dùng CHÍNH: sinh viên năm 1–3 TỰ XEM trên GitHub Pages, không có giảng viên bên cạnh, phần lớn bằng ĐIỆN THOẠI (màn dọc 360–430 px, điện thoại Android tầm trung kiểu Galaxy A15, dùng 4G). Một phần xem bằng laptop.
- Người dùng PHỤ: giảng viên trình chiếu từ laptop cá nhân qua máy chiếu 4:3 (1024 × 768).
- Hệ quả thiết kế: thiết kế ưu tiên điện thoại (mobile-first), điều khiển bằng chạm, và mỗi animation phải tự giải thích được khi không có giảng viên.

HIỆN TRẠNG ĐÃ KIỂM TRA SƠ BỘ (ngày 13/11/2026) — [mô hình bậc 1] kiểm tra lại, không tin mù quáng:
| File | Dung lượng | Ghi chú |
| Bai5_song_bien_hat_nuoc_quay_vong.html | 38 KB | vanilla; có 1 ảnh PNG nhúng ~7 KB (282×176) → kiểm tra bản quyền |
| bien_dang_song_vo.html | 59 KB | vanilla, chạy offline |
| song_than_hut_chim_1.html | 75 KB | vanilla, chạy offline |
| su-hinh-thanh-bao-preview.html | 80 KB | GỌI MẠNG: cdn.jsdelivr.net, cdnjs.cloudflare.com, fonts.googleapis → hỏng khi offline; tên có "preview", hỏi tôi đây có phải bản nháp |
| khuc_xa_song_HMO.html | 417 KB | canvas + svg, chạy offline |
| Luc tao trieu - offline.html | 1,17 MB | bundle Claude Design: React + Babel dịch JSX NGAY TRÊN TRÌNH DUYỆT, 21 font woff2 nhúng |
| Kenh SOFAR.html | 1,92 MB | như trên, 27 font woff2 |
| Chu ky trieu Mat Trang.html | 2,05 MB | như trên; TRÙNG chủ đề với file -latest |
| Chu ky trieu Mat Trang-latest.html | 2,05 MB | như trên; hai file KHÁC nhau → hỏi tôi giữ bản nào (mặc định giữ -latest) |
Không file nào dùng three.js hay Plotly. Không tìm thấy "độ mặn" hay tên gọi biển sai.

QUY TẮC CHO 4 FILE BUNDLE REACT + BABEL: Babel dịch JSX lúc tải trang làm điện thoại tầm trung chậm thêm vài giây, và 21–27 font nhúng chiếm phần lớn dung lượng. Trong spec, bắt buộc có mục: (1) biên dịch sẵn JSX lúc build (esbuild), bỏ Babel khỏi bản phát hành; (2) chỉ giữ font Be Vietnam Pro, cắt còn bộ ký tự Latin + tiếng Việt, tối đa 3 độ đậm (400/600/700); (3) mục tiêu ≤ 500 KB. Việc này tối thiểu là T2.

=====================================================================
BƯỚC 0 — BRAINSTORMING (BẮT BUỘC, TRƯỚC MỌI VIỆC KHÁC)
=====================================================================
Gọi skill superpowers:brainstorming. Làm đúng quy trình của skill: hỏi tôi từng câu một, đưa 2–3 hướng tiếp cận để tôi chọn, trình bày thiết kế theo từng phần, ghi tài liệu thiết kế vào docs/superpowers/specs/YYYY-MM-DD-kho-hoclieu-so-design.md, rồi chuyển sang superpowers:writing-plans.
Chưa được sửa, tạo hay di chuyển file HTML nào cho tới khi tôi duyệt tài liệu thiết kế (CỔNG G0).

Trong brainstorming, phải chốt được ít nhất các điểm sau với tôi:
1. Phân loại học phần dùng trong kho (ví dụ HDHDC, Thủy triều, Mô hình hoá đại dương) và quy ước đặt tên slug: <hocphan>-<bai>-<chude>, chữ thường, không dấu, nối bằng gạch ngang. Ví dụ: hdhdc-b5-song-than, thuytrieu-t6-dong-luc-trieu.
2. Repo là PUBLIC (đã chốt: GitHub Pages miễn phí yêu cầu public, và sinh viên cần mở được). Vì vậy ở bước 1, mỗi spec BẮT BUỘC có mục "Bản quyền": liệt kê mọi ảnh hoặc hình nhúng trong HTML kèm nguồn. Hình chụp từ sách (ví dụ Segar) phải thay bằng hình tự vẽ trước khi phát hành.
3. Ngưỡng tối đa số animation được nâng lên 3D ở đợt đầu (đề xuất ≤ 30% tổng số).
4. Danh sách 3 animation thử nghiệm (pilot), mỗi tầng một cái.
5. Giữ bản nào trong hai file "Chu ky trieu Mat Trang"; su-hinh-thanh-bao-preview có đưa vào kho đợt này không.

=====================================================================
BƯỚC 1 — REVIEW TỪNG FILE, CHỈ REVIEW VÀ VIẾT SPEC ([mô hình bậc 1] tự làm)
=====================================================================
Đọc TOÀN BỘ từng file trong _nguon/, lần lượt từng file một, không đọc lướt. Với mỗi file, nếu có prompt gốc tương ứng trong _nguon/prompts/ thì đối chiếu animation với prompt đó: kịch bản cảnh, số liệu, công thức, cỡ chữ, phím tắt.
Ở bước này KHÔNG sửa HTML. Đầu ra chỉ gồm spec và bảng phân tầng.

Trước khi review, quét nhanh toàn bộ _nguon/ (grep -il "plotly\|three\|d3\.\|chart\.js\|cdn\|fonts.googleapis") và ghi vào audit/TECH.md: file nào dùng thư viện gì, nhúng sẵn hay gọi CDN. Hiện chưa file nào dùng three.js, nên mọi file xếp T3 đều là dựng lại 3D từ đầu (khối lượng L).
Quy tắc Plotly: nếu Plotly gọi qua CDN thì file hỏng khi mất mạng; nếu nhúng sẵn thì nặng khoảng 3,5 MB. Nếu Plotly chỉ dùng để vẽ đồ thị đường, cột hay bản đồ màu 2D → ghi vào spec yêu cầu thay bằng SVG/Canvas tự vẽ (xếp T2). Chỉ giữ Plotly khi cần mặt 3D tương tác, và khi đó file được miễn giới hạn dung lượng 500 KB, ghi rõ lý do.
Nếu chạy được Playwright (npx playwright), mở mỗi file ở khung 1024 × 768 và khung điện thoại dọc 390 × 844, chụp màn hình ở giây 0, 5, 15 và ghi lỗi console để làm bằng chứng. Lưu ảnh vào audit/screens/<slug>/.

Với mỗi file, viết specs/<slug>.md theo đúng khung sau:

  # <slug> — <tên tiếng Việt>
  ## 1. Định danh
  File gốc | Học phần | Bài | Dung lượng (KB) | Công nghệ (SVG / Canvas 2D / WebGL / thư viện + phiên bản) | Chạy offline được không
  Mục tiêu học tập: 1–3 ý, mỗi ý bắt đầu bằng động từ đo được (giải thích, tính, so sánh, nhận biết…)
  ## 2. Chấm điểm hiện trạng (0–5, mỗi điểm kèm bằng chứng: số dòng hoặc ảnh chụp)
  | Tiêu chí | Điểm | Bằng chứng |
  - Đúng khoa học (công thức, số liệu, đơn vị, hướng chuyển động)
  - Sư phạm (trình tự cảnh, ý chính rõ, phù hợp năm học)
  - Hình ảnh (bố cục, màu brand HMO, chữ đọc được trên điện thoại dọc 390 px và trên máy chiếu)
  - Tương tác (phát/dừng, tốc độ, tua, cảnh trước/sau; dùng được bằng chạm trên điện thoại; phím tắt, clicker PageUp/PageDown)
  - Tự học (sinh viên xem một mình có hiểu được không, khi không có giảng viên giải thích)
  - Hiệu năng (fps, thời gian tải, dung lượng)
  - Khả năng truy cập (cỡ chữ, tương phản ≥ 4,5:1, prefers-reduced-motion, dùng được bằng bàn phím)
  - Chất lượng mã (một đồng hồ hoạt hình toàn cục, không có số "ma" rải rác, không lỗi console)
  ## 3. Lỗi khoa học — có số cụ thể
  Ví dụ đúng cách viết: "Dòng 214: tốc độ sóng ở h = 4.000 m hiển thị 650 km/h; đúng là c = √(9,81 × 4.000) = 198 m/s = 713 km/h."
  Ví dụ sai cách viết (không chấp nhận): "Cần kiểm tra lại công thức tốc độ sóng."
  ## 4. Danh sách thay đổi
  Mỗi mục: ID (S-01, S-02…) | Loại (Khoa học / Sư phạm / Hình ảnh / Tương tác / Hiệu năng / Truy cập / Nhãn-số-chữ) | Vị trí (dòng, cảnh) | Mô tả | Tiêu chí nghiệm thu kiểm được bằng mắt hoặc bằng máy
  ## 5. Phân tầng: T3 (3D – [mô hình bậc 1]) / T2 (2D – [mô hình bậc 2]) / T1 (nhãn, số, chữ – [mô hình bậc 3])
  Ghi rõ đi qua cây quyết định ở dưới như thế nào, và ước lượng khối lượng: S (< 1 giờ) / M (1–4 giờ) / L (> 4 giờ).
  ## 6. Nếu là T3: kịch bản 3D
  Đối tượng 3D, góc camera từng cảnh, cách người xem xoay hoặc zoom, và cách dự phòng khi máy không có WebGL2 (bắt buộc: tự chuyển sang bản 2D hiện có, kèm một dòng thông báo).
  ## 7. Nội dung tự học ([mô hình bậc 1] soạn nháp, tôi duyệt ở CỔNG G1)
  Mỗi cảnh viết 1 đoạn "Giải thích" 40–60 từ, nói thay phần giảng viên vẫn nói trên lớp. Cuối animation có 4 câu hỏi tự kiểm tra trắc nghiệm (2 câu nhớ – hiểu, 2 câu vận dụng có tính số), mỗi câu 4 phương án, kèm đáp án và 1 câu giải thích. Câu hỏi có ID cố định (<slug>-q1 … q4) để theo dõi điểm.
  Ví dụ câu hỏi: "Ở độ sâu 4.000 m, sóng thần đi nhanh khoảng bao nhiêu? A. 36 km/h  B. 159 km/h  C. 713 km/h  D. 3.000 km/h" — đáp án C, vì c = √(g·h) = √(9,81 × 4.000) ≈ 198 m/s.
  ## 7b. Bản quyền: danh sách ảnh hoặc hình nhúng, nguồn, giữ hay thay
  ## 8. Checklist nghiệm thu (5–10 mục, có số)
  ## 9. Ngoài phạm vi (những gì KHÔNG làm, để worker không tự mở rộng)

CÂY QUYẾT ĐỊNH PHÂN TẦNG (áp dụng đúng thứ tự):
Q1. Mọi thay đổi chỉ là số liệu, nhãn, thuật ngữ, chính tả, cỡ chữ, màu, dòng nguồn, không đụng logic chuyển động hay cấu trúc cảnh?  → T1 ([mô hình bậc 3]).
Q2. Hiện tượng có cấu trúc 3D thiết yếu, và mặt cắt 2D làm mất ý chính của bài?  → xét T3. Ví dụ đủ điều kiện: xoắn ốc Ekman (hướng dòng xoay theo độ sâu), hai bướu triều trong hệ Trái Đất – Mặt Trăng, băng chuyền nhiệt muối toàn cầu, khúc xạ sóng trên địa hình đáy 2 chiều. Ví dụ KHÔNG đủ điều kiện: profile nhiệt độ – độ muối theo độ sâu, mặt cắt sóng thần 1D, đồ thị mực nước theo thời gian. Những cái này để 2D mới rõ hơn.
    Nếu Q2 là CÓ, phải đạt thêm 2 điều kiện: (a) chạy được ≥ 30 fps trên điện thoại Android tầm trung (GPU kiểu Mali-G52 hoặc Adreno 610) và ≥ 50 fps trên laptop GPU tích hợp, với ≤ 80.000 tam giác, devicePixelRatio giới hạn 1,5 trên laptop và 1,0 trên điện thoại; (b) vẫn nằm trong ngưỡng % 3D đã chốt ở bước 0. Đạt cả hai → T3 ([mô hình bậc 1]). Không đạt → T2.
Q3. Các trường hợp còn lại (sửa vật lý, dựng lại cảnh, thêm tương tác, tối ưu hiệu năng ở 2D)  → T2 ([mô hình bậc 2]).
Quy tắc "một file một chủ": nếu một file vừa cần sửa nhãn vừa cần làm lại 2D thì giao toàn bộ cho tầng cao hơn. Không chia một file cho hai model, để tránh xung đột khi gộp code.

Kết thúc bước 1, viết audit/TRIAGE.md gồm một bảng: slug | điểm trung bình | số lỗi khoa học | tầng | khối lượng | lý do 1 dòng, cùng thống kê số file mỗi tầng và % 3D.
DỪNG LẠI chờ tôi duyệt TRIAGE.md (CỔNG G1).

=====================================================================
BƯỚC 2 — KIẾN TRÚC GIAO VIỆC
=====================================================================
Tạo 4 agent trong .claude/agents/, mỗi file có frontmatter `model:` để Claude Code chạy đúng model:
- anim-3d.md       model: [mô hình bậc 1]    — làm T3. Dựng bằng three.js (ghim cứng một phiên bản ổn định trong package.json, ghi phiên bản vào README).
- anim-2d.md       model: [mô hình bậc 2]     — làm T2. Vanilla JS + SVG/Canvas 2D, không thêm thư viện nếu không thật cần.
- anim-label.md    model: [mô hình bậc 3]   — làm T1. CHỈ được sửa chuỗi chữ, số, màu, cỡ chữ. Nếu thấy cần sửa logic thì dừng, trả về trạng thái NEEDS_ESCALATION kèm lý do, không tự sửa.
- anim-reviewer.md model: [mô hình bậc 1]    — nghiệm thu. Mỗi lần duyệt là một phiên mới, chưa từng thấy quá trình làm, để không có chuyện "tự chấm bài mình". Áp dụng cả với file T3 do anim-3d làm.

Mỗi worker chỉ nhận: specs/<slug>.md + file nguồn + docs/STANDARDS.md (chuẩn chung, viết ở bước 3). Không đưa cả lịch sử hội thoại.
Thực thi bằng superpowers:subagent-driven-development, gọi Agent tool với subagent_type tương ứng. Mỗi animation làm trên nhánh riêng anim/<slug>, trong git worktree riêng. Chạy song song tối đa 3 worker một lúc.

Vòng nghiệm thu: anim-reviewer kiểm tra từng mục của checklist trong spec và chạy test tự động (bước 4).
- ĐẠT → merge vào main.
- KHÔNG ĐẠT → trả về đúng worker cũ, kèm danh sách mục trượt.
- Trượt 2 lần, hoặc worker báo NEEDS_ESCALATION → nâng một tầng (T1→T2, T2→T3) và ghi lý do vào audit/REVIEW_LOG.md.

Theo dõi tiến độ trong audit/STATUS.md với các trạng thái: audited → spec-approved → in-progress → in-review → approved → published.

Chạy PILOT trước: 3 animation đã chốt ở bước 0, mỗi tầng một cái, đi hết vòng làm → duyệt. DỪNG cho tôi xem 3 bản pilot (CỔNG G2), rồi mới chạy cả loạt.

=====================================================================
BƯỚC 3 — CHUẨN CHUNG (docs/STANDARDS.md, mọi worker phải tuân theo)
=====================================================================
Kỹ thuật
- Bản phát hành của mỗi animation là MỘT file HTML tự chứa, mở trực tiếp bằng file:// khi không có mạng (không CDN, không tải font hay ảnh từ mạng ngoài).
- Với T3: mã nguồn để ở src/<slug>/ dạng ES module import three.js cục bộ; build bằng Vite + vite-plugin-singlefile ra dist/animations/<slug>/index.html. Ghi lại dung lượng sau build (thường khoảng 0,7–1 MB, chấp nhận được).
- Sân khấu vẽ 1440 × 1080 (4:3), tự co giãn giữ tỉ lệ. Mọi chuyển động phụ thuộc MỘT đồng hồ hoạt hình toàn cục (t_anim += dt × tốc_độ), để đổi tốc độ và tua lui vẫn mượt.
- HAI CHẾ ĐỘ, tự chọn theo màn hình, có nút chuyển tay:
  · Tự học (mặc định khi màn hình rộng < 1024 px, hoặc khi mở bằng thiết bị cảm ứng): sân khấu ở trên; bên dưới (màn dọc) hoặc bên phải (màn ngang) là khung HTML gồm tên cảnh, đoạn "Giải thích" của cảnh, nút điều khiển. Tự dừng cuối mỗi cảnh. Cuối animation hiện 4 câu hỏi tự kiểm tra, bấm chọn là hiện đáp án và giải thích, rồi gửi kết quả về sổ điểm (bước 5b).
  · Trình chiếu (mặc định trên laptop ≥ 1024 px, hoặc bấm F): sân khấu toàn màn hình, ẩn khung giải thích, thanh điều khiển tự ẩn sau 3 s.
- Điện thoại màn dọc: sân khấu rộng 390 px thì hệ số co chỉ còn 0,27, nhãn 30 px trên sân khấu sẽ còn khoảng 8 px, không đọc được. Vì vậy ở màn dọc: ẩn nhãn phụ trên hình, chuyển nội dung nhãn xuống khung giải thích, và hiện một dải nhắc "Xoay ngang điện thoại để xem rõ hơn". Ở màn ngang 844 px, hệ số co 0,59, nhãn 30 px còn khoảng 18 px, đủ đọc.
- Chạm: nút bấm cao ≥ 44 px; chạm vào sân khấu = phát/dừng; vuốt trái/phải = đổi cảnh. Không có thông tin nào chỉ hiện khi rê chuột (điện thoại không rê chuột được).
- Bàn phím (cho trình chiếu): Space phát/dừng; ←/→ đổi cảnh; ↑/↓ đổi tốc độ (0,25× / 0,5× / 1× / 2× / 4×); F toàn màn hình; L bật/tắt nhãn; PageUp/PageDown cho bút trình chiếu.
- Tiết kiệm pin và dữ liệu: tự dừng khi tab bị ẩn (sự kiện visibilitychange); không tải gì thêm sau lần tải đầu.
- Có nút nhỏ "← Kho học liệu" ở góc trên trái, trỏ về trang chủ của kho; nút tự ẩn khi toàn màn hình.
- Tôn trọng prefers-reduced-motion: tắt chuyển động trang trí, giữ chuyển động mang nội dung.
Hình ảnh
- Màu HMO: Navy #0A2E5C, Ocean #1B4E8F, Sky #60C0F0, Orange #F07800 (điểm nhấn), Ink #0F1E3A, Slate #546E8F. Font "Be Vietnam Pro", "Segoe UI", Arial, nhúng sẵn nếu cần.
- Cỡ chữ trên sân khấu (tính theo khung 1440 × 1080): tiêu đề ≥ 44 px; chú thích ≥ 36 px; nhãn trên hình ≥ 30 px; riêng dòng nguồn và ghi chú tỉ lệ được ≥ 22 px. Mỗi chú thích ≤ 20 từ, ≤ 2 dòng.
- Cỡ chữ trong khung giải thích HTML: ≥ 16 CSS px, giãn dòng 1,5.
- Hình phóng đại phải ghi rõ, ví dụ: "Không theo tỉ lệ: độ sâu phóng đại 25 lần".
Ngôn ngữ và quy tắc bắt buộc
- Tiếng Việt chuẩn thuật ngữ hải dương học: "độ muối" (KHÔNG dùng "độ mặn"), "sóng leo", "đới hút chìm"…
- Chỉ dùng "Biển Đông" (tiếng Việt) và "East Vietnam Sea" (tiếng Anh). Không bao giờ dùng "South China Sea" hay "Biển Nam Trung Hoa". Mọi bản đồ có Biển Đông phải thể hiện quần đảo Hoàng Sa và quần đảo Trường Sa (Việt Nam).
- Mọi số liệu phải có dòng nguồn. Không bịa số. Nếu thiếu nguồn thì ghi [CẦN NGUỒN] trong spec và hỏi tôi.

=====================================================================
BƯỚC 4 — KIỂM TRA TỰ ĐỘNG (tests/, chạy trong CI)
=====================================================================
Viết tests/smoke.spec.js bằng Playwright. Mỗi animation phải qua:
0. Chạy MỌI kiểm tra dưới đây ở 3 khung: laptop 1024 × 768; điện thoại dọc 390 × 844 (giả lập iPhone 13, bật cảm ứng); điện thoại ngang 844 × 390. Ở 2 khung điện thoại, dùng chạm (tap) thay cho phím Space ở mục 3, và kiểm tra trang tự vào chế độ Tự học.
1. Tải trang: 0 lỗi console, 0 request ra mạng ngoài (chặn mọi host khác localhost và kiểm tra). Ngoại lệ duy nhất: POST tới URL Apps Script khi gửi điểm.
2. Canvas hoặc SVG không trống ở giây 3 (so sánh với ảnh trắng).
3. Bấm Space rồi chờ 1 s: khung hình đứng yên (hai ảnh chụp giống nhau). Bấm Space lần nữa: khung hình thay đổi.
4. Quét văn bản DOM và mã nguồn: số lần xuất hiện "độ mặn", "South China Sea", "Biển Nam Trung Hoa" phải bằng 0.
5. Dung lượng: 2D ≤ 500 KB, 3D ≤ 1,5 MB (sau build). Ngoại lệ duy nhất: file được duyệt giữ Plotly theo audit/TECH.md.
6. Chụp thumbnail 1440 × 1080 ở cảnh tiêu biểu (giây do spec chỉ định), nén WebP rộng 480 px, lưu thành thumb.webp.
Phần fps không đo được tin cậy trong máy headless: reviewer ghi đây là mục kiểm tay, tôi sẽ kiểm trên điện thoại Android tầm trung và laptop.

=====================================================================
BƯỚC 5 — TRANG KHO HỌC LIỆU TRÊN GITHUB PAGES
=====================================================================
Cấu trúc repo đích:
  index.html                    trang chủ kho (gallery)
  manifest.json                 danh mục: slug, tên, học phần, bài, mô tả 1 câu, tags, loại 2D/3D, ngày cập nhật, phiên bản
  animations/<slug>/index.html  bản phát hành (2D chép thẳng vào; 3D lấy từ dist/)
  animations/<slug>/thumb.webp
  animations/<slug>/qr.svg      mã QR dẫn tới URL animation, để chèn vào slide bài giảng
  src/<slug>/                   mã nguồn T3
  lib/so-diem.js, config.js     module gửi điểm dùng chung, URL Apps Script
  apps-script/Code.gs           mã sổ điểm (không chứa dữ liệu sinh viên)
  specs/, audit/, docs/, tests/, _nguon/ (giữ nguyên bản gốc, không xoá)
  .github/workflows/pages.yml   build + test + deploy
  .nojekyll

Trang chủ index.html:
- Tiêu đề "Kho học liệu số – Khoa Khí tượng Thủy văn và Hải dương học", thanh Navy và sọc cam theo brand HMO, tiếng Việt.
- Thiết kế ưu tiên điện thoại: 1 cột khi màn hình < 600 px, 2 cột từ 600–1024 px, 3–4 cột khi > 1024 px.
- Lưới thẻ đọc từ manifest.json. Mỗi thẻ có thumbnail, tên, học phần · bài, nhãn 2D/3D, mô tả 1 câu, và DUNG LƯỢNG (ví dụ "0,9 MB") để sinh viên dùng 4G biết trước. Bấm vào thẻ mở animations/<slug>/ ở tab mới.
- Lọc theo học phần, lọc 2D/3D, ô tìm kiếm không phân biệt dấu (gõ "song than" vẫn ra "Sóng thần").
- Mỗi thẻ có nút "Sao chép link" và "Tải QR".
- Lighthouse chế độ Mobile: Performance ≥ 85, Accessibility ≥ 90. Trang chủ (chưa tính thumbnail) ≤ 150 KB, thumbnail tải lười (loading="lazy").

Workflow pages.yml: khi push lên main → npm ci → build T3 → chạy Playwright → sinh thumb + QR → deploy bằng actions/upload-pages-artifact và actions/deploy-pages. Test trượt thì không deploy.
Hướng dẫn tôi bật Settings → Pages → Source: GitHub Actions (tôi tự bấm).
README.md tiếng Việt gồm: link trang kho, bảng animation kèm link trực tiếp, cách thêm một animation mới (chép file HTML vào _nguon/ rồi chạy lại quy trình bước 1 cho riêng file đó).

=====================================================================
BƯỚC 5b — SỔ ĐIỂM: GOOGLE SHEET + GOOGLE APPS SCRIPT
=====================================================================
GitHub Pages chỉ phục vụ trang tĩnh, không lưu được điểm. Sổ điểm dùng một Google Sheet riêng tư của tôi, nhận dữ liệu qua Apps Script Web App.

Google Sheet "Sổ điểm Kho học liệu số", 4 trang tính:
- DanhSach: MSSV | Họ tên | Lớp học phần | Mã lớp. Tôi tự dán danh sách vào.
- KetQua: mỗi lần trả lời là một dòng: Thời gian | MSSV | Lớp | slug | ID câu | Phương án chọn | Đúng/Sai | Lần thử thứ mấy.
- TongHop: bảng MSSV × slug, mỗi ô là điểm lần làm đầu tiên trên thang 10 (4 câu, mỗi câu 2,5 điểm), kèm số animation đã hoàn thành. Tính bằng công thức (QUERY/PIVOT), không dùng script.
- Log: các lần gửi bị từ chối và lý do.

Apps Script (apps-script/Code.gs trong repo, KHÔNG chứa dữ liệu sinh viên):
- doPost nhận JSON {mssv, maLop, slug, qid, chon, dung, lanThu, thoiGian}.
- Từ chối khi: MSSV không có trong DanhSach, mã lớp sai, hoặc một MSSV gửi > 20 lần/phút. Dùng LockService khi ghi để không mất dòng lúc nhiều sinh viên gửi cùng lúc.
- Trả về {ok:true} hoặc {ok:false, lyDo:"…"} bằng tiếng Việt.
- Viết docs/HUONG_DAN_SO_DIEM.md từng bước để TÔI tự dán Code.gs vào script.google.com và bấm Deploy → Web app (Execute as: Me; Who has access: Anyone). Tôi sẽ dán lại URL Web App cho bạn; bạn ghi URL đó vào config.js, không ghi cứng trong từng animation.

Phía animation (module dùng chung lib/so-diem.js, nhúng vào lúc build):
- Lần đầu làm câu hỏi: hiện ô nhập MSSV và mã lớp, lưu vào localStorage (bọc try/catch) để lần sau không phải nhập lại. Có nút "Không phải tôi" để nhập lại.
- Gửi bằng fetch POST với Content-Type text/plain (tránh preflight CORS của Apps Script).
- Mất mạng hoặc gửi lỗi: đưa vào hàng đợi trong localStorage, tự gửi lại khi có mạng (sự kiện online) và khi mở animation lần sau. Thử lại tối đa 5 lần, giãn cách 2–4–8–16–32 s, vì Apps Script chỉ chạy đồng thời khoảng 30 yêu cầu: cả lớp 100 sinh viên bấm cùng lúc sẽ có lượt bị từ chối tạm thời.
- Hiện trạng thái rõ ràng: "Đã lưu điểm ✓" / "Chưa gửi được, sẽ tự gửi lại".
- Không chặn việc học: không nhập MSSV vẫn xem animation và làm câu hỏi bình thường, chỉ không lưu điểm.
- Test (bổ sung bước 4): giả lập Apps Script bằng route của Playwright; kiểm tra gửi thành công, gửi khi mất mạng rồi gửi lại, và bị từ chối khi MSSV sai.

Giới hạn phải ghi rõ trong README: sinh viên tự nhập MSSV, không đăng nhập, nên về lý thuyết có thể làm hộ. Sổ điểm này phù hợp cho điểm chuyên cần và tự học, không dùng cho điểm thi.

DỪNG cho tôi xem trang kho trên máy (npx serve dist) và thử gửi điểm bằng một MSSV mẫu trước khi push lên main lần đầu (CỔNG G3).

=====================================================================
BƯỚC 6 — NGHIỆM THU CUỐI (anim-reviewer, phiên mới)
=====================================================================
Gọi superpowers:verification-before-completion. Chỉ báo "xong" khi có bằng chứng:
- URL Pages trả về 200 cho trang chủ và cho từng animation (liệt kê đủ từng URL).
- Toàn bộ test trong CI xanh (dán link lần chạy CI).
- audit/STATUS.md: mọi animation ở trạng thái published; animation nào bị loại thì ghi lý do.
- Bảng tổng kết: số file theo tầng, điểm trung bình trước và sau theo 8 tiêu chí, số lỗi khoa học đã sửa.

=====================================================================
NGUYÊN TẮC LÀM VIỆC
=====================================================================
- Không bao giờ đưa danh sách sinh viên, MSSV hay điểm vào repo (repo là public).
- 4 cổng G0 (thiết kế), G1 (TRIAGE), G2 (pilot), G3 (trang kho và sổ điểm) là chỗ BẮT BUỘC dừng lại chờ tôi. Ngoài 4 cổng này cứ làm tiếp, không hỏi lặt vặt.
- Không xoá và không sửa gì trong _nguon/.
- Mỗi commit một việc, message tiếng Việt, ví dụ: "hdhdc-b5-song-than: sửa tốc độ sóng ở h = 4.000 m (S-03)".
- Gặp chỗ mơ hồ về khoa học thì hỏi tôi, kèm 1 phương án đề xuất. Không tự đoán.

```

Việc của Đạt ở mỗi cổng (≈ 15 phút/cổng)

* G0 – Thiết kế: kiểm tra slug, ngưỡng % 3D, chọn 3 pilot.
* G1 – TRIAGE.md và nội dung tự học: xem cột "tầng". Mỗi file T3 phải trả lời được câu "3D làm sinh viên hiểu điều gì mà 2D không làm được?". Không trả lời được thì hạ xuống T2. Đọc kỹ các đoạn "Giải thích" và câu hỏi tự kiểm tra, vì đây là phần nói thay thầy.
* G2 – Pilot: mở 3 bản pilot trên điện thoại của thầy (cả dọc lẫn ngang) và một điện thoại Android rẻ (mượn sinh viên), rồi chiếu thử từ laptop. Bản 3D phải mượt trên điện thoại Android, và tự chuyển sang 2D khi tắt WebGL (Chrome: `chrome://flags` → tắt WebGL).
* G3 – Trang kho và sổ điểm: mở bằng điện thoại, tìm "song than" không dấu ra kết quả, bấm thẻ mở được animation, thẻ có ghi dung lượng. Làm 4 câu hỏi bằng một MSSV có trong DanhSach: Sheet phải có thêm 4 dòng ở KetQua và điểm ở TongHop. Thử bật chế độ máy bay khi gửi, tắt đi: điểm phải tự gửi lại.
~~~~
