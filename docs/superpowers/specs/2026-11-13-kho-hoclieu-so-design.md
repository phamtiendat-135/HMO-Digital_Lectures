# Kho học liệu số HMO — Tài liệu thiết kế

Ngày: 13/11/2026 · Trạng thái: chờ duyệt (CỔNG G0)
Repo: `phamtiendat-135/HMO-Digital_Lectures` (public) · URL đích: https://phamtiendat-135.github.io/HMO-Digital_Lectures/

Tài liệu này ghi các quyết định thiết kế. Quy trình chi tiết từng bước (khung spec, cây phân tầng, chuẩn chung, test, sổ điểm) nằm trong đề bài gốc của TS. Phạm Tiến Đạt, được chép nguyên văn vào `docs/DE_BAI_GOC.md` khi bắt đầu thực thi và vẫn có hiệu lực, **trừ những điểm tài liệu này ghi là thay đổi** (mục 6).

## 1. Mục đích

Biến các animation HTML dạy Hải dương học của Khoa KTTV&HDH thành một kho công khai trên GitHub Pages để:

- **Sinh viên năm 1–3 tự xem, không có giảng viên bên cạnh**, phần lớn bằng điện thoại Android tầm trung (màn dọc 360–430 px, kiểu Galaxy A15, mạng 4G). Đây là người dùng chính; mọi đánh đổi ưu tiên nhóm này.
- **Giảng viên trình chiếu** từ laptop qua máy chiếu 4:3 (1024 × 768). Người dùng phụ.

Thành công nghĩa là: sinh viên bấm link trên điện thoại, animation mở trong vài giây, tự hiểu được nhờ đoạn giải thích từng cảnh, và khi giảng viên muốn thì làm 4 câu hỏi có ghi điểm.

## 2. Mục tiêu, ngoài phạm vi, điều phải tránh

**Mục tiêu**
- 8 animation đợt đầu được review khoa học, sửa lỗi, và phát hành theo một chuẩn chung.
- Mỗi bản phát hành là một file HTML tự chứa, không gọi mạng ngoài (trừ POST gửi điểm).
- Trang chủ kho có tìm kiếm không dấu, lọc, ghi dung lượng từng animation.
- Sổ điểm Google Sheet nhận kết quả qua Apps Script.
- Thêm animation mới về sau bằng cách chạy lại quy trình cho riêng file đó.

**Ngoài phạm vi**
- Đăng nhập, xác thực sinh viên. Sổ điểm chỉ dùng cho chuyên cần và tự học.
- Phân loại học phần – bài: TS. Đạt tự sắp xếp sau (xem 4.1).
- Bản tiếng Anh.

**Điều phải tránh (làm được vẫn coi là hỏng)**
- Danh sách sinh viên, MSSV hay điểm xuất hiện trong repo.
- "South China Sea", "Biển Nam Trung Hoa", "độ mặn" xuất hiện trong **phần phát hành** (`animations/`, `index.html`, `manifest.json`, `noidung/`, `src/`, `lib/`). Tài liệu quy trình (`docs/`, `specs/`, `audit/`) và `_nguon/` được nhắc tới các từ này vì chính chúng ghi lệnh cấm; CI chỉ quét phần phát hành. (Quyết định của Fable.)
- Số liệu không có nguồn, hoặc hình chụp từ sách còn nằm trong bản phát hành.
- Sinh viên bị bắt nhập MSSV mới được xem.
- Sửa hoặc xoá bất cứ thứ gì trong `_nguon/`.

## 3. Hiện trạng đã kiểm tra (13/11/2026)

Nguồn đã chuyển vào `_nguon/` (9 HTML) và `_nguon/prompts/` (4 prompt) ở commit `8d312bb`.

| File nguồn | KB | Công nghệ | Mạng ngoài | Prompt gốc |
|---|---|---|---|---|
| Bai5_song_bien_hat_nuoc_quay_vong.html | 38 | vanilla; 1 PNG nhúng | không | không |
| bien_dang_song_vo.html | 58 | vanilla | không | có |
| song_than_hut_chim_1.html | 74 | vanilla | không | có (tsunami) |
| su-hinh-thanh-bao-preview.html | 79 | widget xuất từ chat Claude, `lang="en"` | CSP cho phép cdnjs, jsdelivr, esm.sh, unpkg, Google/Bunny Fonts — cần xác nhận host nào thực sự được gọi | không |
| khuc_xa_song_HMO.html | 407 | canvas + svg; 2 SVG nhúng | không | có |
| Luc tao trieu - offline.html | 1.141 | bundle Claude Design (React + Babel) **+ three.js 0.160.0 qua importmap trỏ unpkg** + Google Fonts; 21 woff2. **Là bộ 12 slide 1920×1080 có ghi chú diễn giả, không phải một animation** (xem 4.5) | **có** (cần xác nhận bằng test chặn mạng) | không |
| Kenh SOFAR.html | 1.874 | bundle Claude Design; 27 woff2; 2 nguồn `text/jsx` | Google Fonts preconnect | có |
| Chu ky trieu Mat Trang.html | 2.004 | bundle Claude Design; 24 woff2 | chưa thấy | không |
| Chu ky trieu Mat Trang-latest.html | 2.005 | như trên; khác bản kia từ dòng 370 | chưa thấy | không |

Khác với bảng sơ bộ trong đề bài: (a) đã có 1 file dùng three.js; (b) file "offline" nhiều khả năng không offline; (c) 5/9 file không có prompt gốc, nên số liệu của chúng phải đối chiếu nguồn ngoài hoặc ghi `[CẦN NGUỒN]`.

Bundle Claude Design chứa manifest tài nguyên trong `<script type="__bundler/manifest">`, trong đó mã JSX gốc còn nguyên (`mime: text/jsx`). Vì vậy có thể tách JSX ra để biên dịch sẵn, không phải viết lại.

## 4. Các quyết định đã chốt với TS. Đạt

### 4.1 Slug và phân loại
- TS. Đạt quyết định: **không phân loại học phần lúc này**, sẽ sắp xếp sau.
- Đề xuất của Fable (chưa bị phản đối): slug chỉ theo chủ đề, chữ thường, không dấu, nối gạch ngang. Học phần và bài là hai trường `hocPhan`, `bai` trong `manifest.json`, để trống được. Lý do: xếp lại học phần không làm hỏng URL và mã QR đã in trên slide.

| File nguồn | Slug |
|---|---|
| Bai5_song_bien_hat_nuoc_quay_vong | `hat-nuoc-quay-vong` |
| bien_dang_song_vo | `bien-dang-song-vo` |
| song_than_hut_chim_1 | `song-than-hut-chim` |
| khuc_xa_song_HMO | `khuc-xa-song` |
| Kenh SOFAR | `kenh-sofar` |
| Luc tao trieu - offline | `luc-tao-trieu` |
| Chu ky trieu Mat Trang-latest | `chu-ky-trieu-mat-trang` |
| su-hinh-thanh-bao-preview | `su-hinh-thanh-bao` |

Bộ lọc "học phần" trên trang chủ tự ẩn khi chưa animation nào có `hocPhan`.

### 4.2 Ba mức sử dụng (TS. Đạt đã đồng ý)

| Mức | Nội dung | Gửi điểm |
|---|---|---|
| Chỉ xem | animation + giải thích từng cảnh | không |
| Tự luyện | thêm 4 câu hỏi, hiện đáp án và giải thích | không |
| Tính điểm | như Tự luyện + nhập MSSV | có |

- Mở từ trang kho: mặc định **Chỉ xem**; cuối animation có nút "Làm 4 câu tự kiểm tra (không bắt buộc)" → Tự luyện.
- **Tính điểm chỉ bật khi URL có `?lop=<mã lớp>`** (link/QR do giảng viên phát). Sinh viên không gõ mã lớp. Trang kho có công cụ tạo link và QR theo lớp cho từng animation.
- Chế độ Trình chiếu luôn là Chỉ xem.
- Ba mức này độc lập với hai chế độ hiển thị (Tự học / Trình chiếu) trong đề bài.

### 4.3 Cách dựng: một bộ khung dùng chung (TS. Đạt chọn A)

Ba cách đã cân nhắc:

- **A. Bộ khung dùng chung, ghép lúc build — được chọn.** Viết khung một lần; sửa lỗi câu hỏi hoặc gửi điểm một chỗ là mọi animation được sửa; nội dung chữ tách khỏi mã. Đổi lại: file 2D cũng phải qua bước build, và mỗi animation phải có đồng hồ toàn cục.
- **B. Sửa tay từng file theo STANDARDS.** Không cần build cho 2D, nhưng có 8 bản sao mã khung do 3 model khác nhau viết, sẽ lệch nhau.
- **C. Trang khung bọc animation trong iframe.** Ít đụng mã gốc, nhưng chạm/vuốt xuyên iframe dễ lỗi trên điện thoại, không ẩn được nhãn phụ ở màn dọc, khó giữ một file tự chứa.

Lý do chọn A: người dùng chính dùng điện thoại và có sổ điểm, nên khung phải giống hệt nhau ở mọi animation; kho còn nhận animation mới.

### 4.4 Các lựa chọn khác
- Chu kỳ triều: giữ bản `-latest` (mặc định trong đề bài). Bản kia nằm yên trong `_nguon/`, không phát hành.
- `su-hinh-thanh-bao`: đưa vào đợt này (đề xuất của Fable; TS. Đạt chưa xác nhận đây có phải bản nháp — hỏi lại ở G1 khi có ảnh chụp và điểm).
- Ngưỡng 3D đợt đầu: tối đa 2/8 animation (25%, dưới trần 30% của đề bài).
- Pilot tạm tính, chốt lại ở G1: T3 `luc-tao-trieu`, T2 `kenh-sofar`, T1 `song-than-hut-chim`. Nếu sau review không có file nào thật sự là T1 thì pilot T1 thay bằng một file T2 thứ hai và ghi rõ trong TRIAGE.

### 4.5 `luc-tao-trieu` là bộ 12 slide — CHỜ TS. ĐẠT QUYẾT ĐỊNH

Các slide: 01 Bìa · 02 Khối tâm chung · 03 Lực ly tâm Fc · 04 Lực hấp dẫn Fg · 05 Hợp lực Ft · 06 Tịnh tiến quanh CM · 07 Vì sao có lực ly tâm · 08 Mô hình 3D (duy nhất dùng three.js) · 09 Mặt Trăng quay quanh Trái Đất · 10 Xích vĩ và bán nhật triều · 11 Quỹ đạo nhìn ngang · 12 Triều cường – triều kém. Slide 1–5 chủ yếu là chữ và hình tĩnh; 6–12 là các mô hình tương tác riêng.

_(Quyết định sẽ được ghi vào đây.)_

### 4.6 Cảnh tự do (quyết định của Fable)

Ba nguồn không có dòng thời gian: `hat-nuoc-quay-vong` (vòng lặp vô hạn + thanh trượt độ cao sóng), `su-hinh-thanh-bao` (5 giai đoạn bấm chuyển), các mô hình tương tác của `luc-tao-trieu`. Không ép chúng thành kịch bản có giờ. Hợp đồng cho phép hai loại cảnh:

- **Cảnh có giờ** `{id, batDau, ketThuc}`: khung tự dừng cuối cảnh, có thanh tua.
- **Cảnh tự do** `{id, lap: <chu kỳ giây>}`: `ve(t)` nhận `t` chạy vòng trong chu kỳ; không tự dừng, không thanh tua; người xem bấm "Cảnh sau" để đi tiếp. Phát/dừng và tốc độ vẫn hoạt động, nên test "khung hình đứng yên" vẫn áp dụng.

Nút làm câu hỏi hiện ra khi người xem đã tới cảnh cuối (có giờ: hết cảnh; tự do: đã vào cảnh).

### 4.7 Điện thoại màn dọc (theo đề bài, nêu lại cho rõ)

Sân khấu 4:3 chỉ co nhỏ lại, **không dựng bố cục dọc riêng**. Ở màn dọc, `datNhan('toi-gian')` ẩn nhãn phụ, công thức và đoạn chữ trên sân khấu; nội dung đó phải có trong đoạn Giải thích của cảnh. Trên sân khấu chỉ cần còn nhận ra được hình và chuyển động. Có dải nhắc xoay ngang. Test khung 390×844 chỉ khẳng định: vào chế độ Tự học, sân khấu không trống, khung giải thích có chữ ≥ 16 px, không tràn ngang.

### 4.8 Mức Tính điểm hoạt động thế nào (theo Bước 5b của đề bài, nêu lại)

- Chọn phương án là hiện ngay đáp án và giải thích, và gửi một dòng về KetQua kèm `lanThu`.
- Được làm lại; mọi lần đều ghi vào KetQua. **TongHop chỉ tính lần đầu** (4 câu × 2,5 điểm).
- `lop` phải khớp cột "Mã lớp" của MSSV đó trong DanhSach; sai thì Apps Script từ chối và ghi Log. Công cụ tạo link trên trang kho chỉ là ô nhập chữ tự do, không chứa danh sách lớp.

## 5. Kiến trúc (cách A)

```
_nguon/                  bản gốc bất biến
src/<slug>/              mã nguồn animation sau khi sửa (2D: main.js + stage.html/css; React: *.jsx; 3D: ES module)
noidung/<slug>.json      tên cảnh, đoạn Giải thích, 4 câu hỏi, giây chụp thumbnail
lib/khung.js, khung.css  bộ khung: 2 chế độ hiển thị, 3 mức sử dụng, khung giải thích, điều khiển, câu hỏi
lib/so-diem.js           gửi điểm, hàng đợi, thử lại
config.js                URL Apps Script
tools/build.mjs          ghép src + noidung + lib → animations/<slug>/index.html (một file tự chứa)
animations/<slug>/       index.html, thumb.webp, qr.svg   (sản phẩm build, có commit)
index.html, manifest.json   trang chủ kho
```

**Hợp đồng giữa animation và khung.** Mỗi animation đăng ký một đối tượng duy nhất:

```js
HMO.dangKy({
  canh: [{ id, batDau, ketThuc } | { id, lap }],   // cảnh có giờ hoặc cảnh tự do (4.6)
  thoiLuong,                          // tổng giây
  ve(t),                              // vẽ trạng thái tại t_anim = t; hàm thuần, gọi lại bao nhiêu lần cũng ra cùng hình
  datNhan(muc),                       // 'day-du' | 'toi-gian' (màn dọc) | 'tat'
  khoiTao(sanKhau), huy()
});
```

Khung giữ **đồng hồ duy nhất** (`t_anim += dt × tốc_độ`), gọi `ve(t)`, xử lý phát/dừng, tua, đổi cảnh, tự dừng cuối cảnh, phím tắt, chạm, vuốt, `visibilitychange`, `prefers-reduced-motion`. Animation không tự gọi `requestAnimationFrame` và không tự bắt phím. Vì `ve(t)` là hàm thuần nên tua lui và test "khung hình đứng yên" đều đáng tin.

Animation có tương tác riêng (ví dụ xoay camera 3D, kéo thanh trượt tham số) được giữ trạng thái đó ngoài `t`, nhưng phải tự vẽ lại qua `HMO.yeuCauVe()`.

**Build.** `tools/build.mjs` dùng esbuild cho mọi loại: gộp JS, biên dịch JSX, nhúng CSS và font subset dạng base64. T3 dùng thêm three.js ghim phiên bản trong `package.json`. Đầu ra luôn là một `index.html`. (Đề bài nêu Vite + vite-plugin-singlefile cho T3; ở đây dùng một công cụ build duy nhất cho cả 2D và 3D để đỡ hai đường ống — đây là quyết định của Fable, người build được đổi lại Vite nếu esbuild không đáp ứng.)

**Bundle React.** Tách JSX từ manifest của bundle vào `src/<slug>/`, bỏ Babel, biên dịch sẵn. React 18 production (~140 KB chưa nén) chiếm phần lớn ngân sách 500 KB; worker T2 được chọn giữ React hoặc thay bằng Preact (~10 KB) nếu cần để đạt ngưỡng. Font: chỉ Be Vietnam Pro 400/600/700, cắt còn Latin + tiếng Việt.

**Dự phòng WebGL.** Animation T3 có thêm `src/<slug>/2d.js` cùng hợp đồng; khung chọn bản 2D khi không tạo được ngữ cảnh WebGL2 và hiện một dòng thông báo.

**Sổ điểm.** Như Bước 5b của đề bài, với hai thay đổi: mã lớp lấy từ `?lop=` thay vì sinh viên nhập; không có `?lop=` thì `lib/so-diem.js` không được gọi tới.

## 6. Những điểm thay đổi so với đề bài gốc

1. Slug bỏ tiền tố học phần (4.1).
2. Thêm 3 mức sử dụng; Tính điểm chỉ bật qua `?lop=` (4.2).
3. Mọi animation, kể cả 2D, đi qua `tools/build.mjs`; không còn "2D chép thẳng vào" (4.3, 5).
4. `luc-tao-trieu` là nâng cấp bản three.js sẵn có, không phải dựng 3D từ đầu.
5. Test mục 0 của Bước 4: ở khung điện thoại kiểm tra thêm mức mặc định là Chỉ xem và không có ô MSSV; test sổ điểm chạy với `?lop=TEST`.
6. `animations/` được commit vào repo (để xem lại lịch sử bản phát hành), CI vẫn build lại và so sánh.

Mọi phần khác của đề bài (khung spec 9 mục, cây phân tầng, 4 agent, vòng nghiệm thu, STANDARDS, 6 kiểm tra tự động, trang chủ, Apps Script, 4 cổng G0–G3, nguyên tắc commit) giữ nguyên.

## 7. Trình tự

1. **G0** — duyệt tài liệu này.
2. Viết kế hoạch thực thi (`docs/superpowers/plans/`).
3. **Bước 1** — quét công nghệ (`audit/TECH.md`), chụp Playwright 3 khung (1024×768, 390×844, 844×390) ở giây 0/5/15 có chặn mạng, viết 8 spec + `audit/TRIAGE.md`. **G1.**
4. Viết `docs/STANDARDS.md`, bộ khung `lib/`, `tools/build.mjs`, `tests/smoke.spec.js`, 4 agent.
5. Pilot 3 animation. **G2.**
6. 5 animation còn lại, tối đa 3 worker song song.
7. Trang chủ, sổ điểm, CI. **G3.**
8. Nghiệm thu cuối, phát hành.

Bộ khung (bước 4) phải xong trước pilot vì cả ba pilot đều ghép vào nó; pilot đồng thời là phép thử cho hợp đồng ở mục 5.

## 8. Để lại cho người thực thi

- Cấu trúc bên trong của `lib/khung.js` và giao diện cụ thể của khung giải thích, miễn đạt STANDARDS.
- Giữ React hay đổi Preact cho từng bundle.
- Thư viện sinh QR và cắt font (chạy lúc build, không vào bản phát hành).
- Cách worker chuyển từng animation sang `ve(t)` thuần.

## 9. Rủi ro đã biết

- **`ve(t)` thuần với animation có mô phỏng tích luỹ** (hạt nước, tia âm tính dần theo bước): phải tính trước quỹ đạo hoặc viết dạng giải tích. Nếu một animation không làm được trong khối lượng M, spec ghi rõ và tua lui sẽ tính lại từ đầu cảnh.
- **Ngưỡng 500 KB cho bundle React**: chưa được chứng minh; pilot `kenh-sofar` là phép thử. Nếu không đạt, báo ở G2 kèm con số thật.
- **fps trên điện thoại thật** không đo được trong CI; TS. Đạt kiểm tay ở G2.
- **5 file không có prompt gốc**: số liệu sẽ có nhiều mục `[CẦN NGUỒN]` cần TS. Đạt trả lời ở G1.
