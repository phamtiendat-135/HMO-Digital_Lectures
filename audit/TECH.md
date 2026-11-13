# Quét công nghệ `_nguon/` (13/11/2026)

Lệnh quét: `grep -il "plotly\|three\|d3\.\|chart\.js\|cdn\|fonts.googleapis" _nguon/*.html` → khớp 5 file (4 bundle Claude Design và file bão). Cột "Host bị chặn" lấy từ `audit/screens/<slug>/log.json`: Playwright mở file bằng `file://`, chặn mọi request ra ngoài và ghi lại URL.

| Slug | File nguồn | KB | Công nghệ | Thư viện (phiên bản) | Nhúng hay CDN | Host bị chặn khi chạy | Offline |
|---|---|---|---|---|---|---|---|
| hat-nuoc-quay-vong | Bai5_song_bien_hat_nuoc_quay_vong.html | 38 | vanilla JS | không | — | không | chạy được |
| bien-dang-song-vo | bien_dang_song_vo.html | 58 | vanilla JS, Canvas 2D | không | — | không | chạy được |
| song-than-hut-chim | song_than_hut_chim_1.html | 74 | vanilla JS, Canvas 2D | không | — | không | chạy được |
| khuc-xa-song | khuc_xa_song_HMO.html | 407 | vanilla JS, Canvas + SVG | không | — | không | chạy được |
| kenh-sofar | Kenh SOFAR.html | 1.874 | bundle Claude Design, JSX dịch trên trình duyệt | React 18.3.1, ReactDOM 18.3.1, Babel standalone 7.29.0 (3,1 MB sau giải nén), 27 woff2 | nhúng | không | chạy được, nhưng Babel dịch JSX mỗi lần tải |
| chu-ky-trieu-mat-trang | Chu ky trieu Mat Trang-latest.html | 2.005 | như trên | React 18.3.1, ReactDOM 18.3.1, Babel standalone 7.29.0, 24 woff2, 1 PNG `hmoLogo` 38 KB | nhúng | không | chạy được, nhưng Babel dịch JSX mỗi lần tải |
| luc-tao-trieu | Luc tao trieu - offline.html | 1.141 | bundle Claude Design, bộ 12 slide; JS thường (không Babel) | React 18.3.1, ReactDOM 18.3.1 nhúng; **three.js 0.160.0 + OrbitControls gọi từ unpkg.com**; 21 woff2; 1 JPEG 91 KB | lẫn lộn | `unpkg.com/three@0.160.0/build/three.module.js`, `unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js` | **hỏng phần 3D** dù tên file ghi "offline" |
| su-hinh-thanh-bao | su-hinh-thanh-bao-preview.html | 79 | widget xuất từ chat Claude, hoạt hình CSS | @floating-ui/core 1.7.3, @floating-ui/dom 1.7.4, lucide 1.17.0 | **CDN** | 3 file trên `unpkg.com` | **thiếu thư viện** khi mất mạng |

## Kết luận

- **Plotly, d3, Chart.js: không file nào dùng.** Quy tắc Plotly của đề bài không phải áp dụng; không file nào được miễn ngưỡng dung lượng.
- **three.js: 1 file** (`luc-tao-trieu`, chỉ slide 8), gọi qua CDN. Khác với ghi nhận sơ bộ "chưa file nào dùng three.js".
- **Gọi mạng thật sự: 2 file** (`luc-tao-trieu`, `su-hinh-thanh-bao`). Bản phát hành phải nhúng hoặc bỏ các thư viện này.
- **Babel trên trình duyệt: 2 file** (`kenh-sofar`, `chu-ky-trieu-mat-trang`). Riêng Babel đã là 3,1 MB mã phải phân tích mỗi lần tải; biên dịch sẵn bằng esbuild là bắt buộc.
- Trong 3 bundle, mã riêng của từng animation chỉ 32–95 KB; phần còn lại là React, Babel và font. Hai bundle SOFAR và Chu kỳ triều dùng chung hai file JSX (55 KB + 25 KB) là bộ khung hoạt hình của Claude Design.
- Bản `Chu ky trieu Mat Trang.html` (không `-latest`) khác bản `-latest` ở mã riêng (47 KB so với 52 KB) và template; không phát hành.

Công cụ: `tools/audit/chup.cjs` (chụp + log mạng), `tools/audit/tach-bundle.cjs` (tách bundle Claude Design thành file rời).
