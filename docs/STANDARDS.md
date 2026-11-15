# Chuẩn chung cho mọi animation trong Kho học liệu số HMO

Worker nhận ba thứ: file này, `specs/<slug>.md`, và file nguồn trong `_nguon/`. Mọi điều dưới đây là bắt buộc trừ khi spec ghi khác.

## 1. Sản phẩm của một animation

| Đường dẫn | Nội dung |
|---|---|
| `src/<slug>/main.js` (hoặc `main.jsx`) | Mã animation, gọi `HMO.dangKy({...})` đúng một lần. Có thể tách thêm module trong cùng thư mục. |
| `src/<slug>/style.css` (không bắt buộc) | CSS riêng, `import './style.css'` từ `main.js`. |
| `noidung/<slug>.json` | Tên, mô tả, các cảnh (tên + đoạn Giải thích), 4 câu hỏi, dòng nguồn. |
| `animations/<slug>/index.html` | Bản phát hành, sinh bằng `node tools/build.mjs <slug>`. Không sửa tay. |

Không sửa `lib/`, `tools/`, `tests/`, `config.js`, `_nguon/`, hay file của animation khác. Nếu bộ khung thiếu thứ bạn cần, dừng lại và báo `NEEDS_ESCALATION` kèm mô tả, không tự vá.

Bản phát hành là **một file HTML tự chứa**, mở được bằng `file://` khi không có mạng: không CDN, không tải font, ảnh hay script từ ngoài. Ngưỡng: 2D ≤ 500 KB, 3D ≤ 1,5 MB (bộ khung và font đã chiếm khoảng 96 KB).

## 2. Hợp đồng với bộ khung (`lib/khung.js`)

```js
HMO.dangKy({
  canh: [                                    // theo thứ tự hiển thị
    { id: 'ten-canh', batDau: 0, ketThuc: 20 },          // cảnh có giờ (giây hoạt hình)
    { id: 'thu-nghiem', lap: 8, dieuKhien: [...], giuCham: false }, // cảnh tự do, lặp mỗi 8 s
  ],
  thoiLuong: 20,                             // tổng giây của các cảnh có giờ
  khoiTao(sanKhau, moiTruong) {},            // dựng canvas/SVG bên trong sanKhau (div 1440 × 1080)
  ve(t, idCanh) {},                          // vẽ trạng thái tại t — HÀM THUẦN
  datNhan(muc) {},                           // 'day-du' | 'toi-gian' | 'tat'
  khiDoi(id, giaTri) {},                     // người xem đổi một điều khiển riêng
  doiCo(tiLe) {},                            // không bắt buộc: sân khấu vừa đổi hệ số co
  huy() {},
  canWebGL2: false, duPhong: null,           // chỉ T3: duPhong là một định nghĩa 2D cùng hợp đồng
});
```

- **`t`**: với cảnh có giờ, `t` chạy từ `batDau` đến `ketThuc`; với cảnh tự do, `t` chạy vòng trong `[0, lap)`.
- **`ve(t, idCanh)` là hàm thuần**: gọi hai lần với cùng `t`, cùng giá trị điều khiển và cùng mức nhãn phải ra cùng một hình, bất kể trước đó đã vẽ gì. Mô phỏng tích luỹ (hạt, tia, nghiệm số) phải tính trước hoặc viết dạng giải tích. Đây là điều kiện để tua lui, đổi tốc độ và test "khung hình đứng yên" hoạt động.
- **Animation không được** tự gọi `requestAnimationFrame`, `setInterval`, không bắt phím, không vẽ nút phát/dừng, thanh tua, nút toàn màn hình, màn hình chờ "Bắt đầu". Bộ khung làm những việc đó.
- **`moiTruong`** = `{ rong: 1440, cao: 1080, dpr, webgl2, giamChuyenDong }`. Dùng `dpr` này cho độ phân giải canvas (đã giới hạn 1,5 trên laptop, 1,0 trên điện thoại).
- **Trạng thái ngoài `t`** (góc camera 3D, điểm đang kéo): giữ trong animation, gọi `HMO.yeuCauVe()` sau khi đổi. Cảnh cần tự xử lý chạm trên sân khấu thì đặt `giuCham: true`; khi đó chạm sân khấu không còn là phát/dừng và vuốt không đổi cảnh.
- **`dieuKhien`**: thanh trượt và nút riêng của cảnh. **Không vẽ chúng trên sân khấu**; bộ khung dựng bằng HTML (cao ≥ 44 px, dùng được bằng bàn phím) và gọi `khiDoi`.

```js
dieuKhien: [
  { id: 'do-cao', loai: 'truot', nhan: 'Độ cao sóng', min: 0.5, max: 3, buoc: 0.5, giaTri: 2, donVi: 'm' },
  { id: 'quy-dao', loai: 'bat-tat', nhan: 'Hiện quỹ đạo', giaTri: true },
  { id: 'chu-ky', loai: 'chon', nhan: 'Chu kỳ', giaTri: 8, luaChon: [{ giaTri: 6, nhan: '6 s' }, { giaTri: 8, nhan: '8 s' }] },
]
```

Mẫu chạy được: `src/_mau/main.js` và `noidung/_mau.json`.

## 3. Nội dung tự học (`noidung/<slug>.json`)

```json
{
  "slug": "…", "ten": "…", "moTa": "một câu", "loai": "2D",
  "hocPhan": "", "bai": "", "tags": [], "phienBan": "1.0.0", "ngayCapNhat": "2026-11-15",
  "canhThumb": 0, "giayThumb": 0,
  "nguon": "Nguồn: …",
  "canh": [{ "id": "trùng id trong main.js", "ten": "Tên cảnh", "giaiThich": "40–60 từ" }],
  "cauHoi": [{ "id": "<slug>-q1", "hoi": "…", "phuongAn": ["…", "…", "…", "…"], "dapAn": 2, "giaiThich": "một câu" }]
}
```

- Lấy đoạn Giải thích và câu hỏi từ mục 7 của spec. Được sửa câu chữ cho khớp animation sau khi sửa; không đổi ý, không đổi ID câu hỏi.
- `dapAn` là chỉ số 0–3. Đúng 4 câu, mỗi câu 4 phương án.
- Mọi chữ dài trên sân khấu của bản gốc (đoạn văn, thẻ tổng kết, bảng nhiều dòng) chuyển vào `giaiThich`. Sinh viên xem màn dọc chỉ đọc được khung giải thích.

## 4. Sân khấu và hình ảnh

- Hệ toạ độ sân khấu **1440 × 1080** (4:3). Bộ khung co giãn; animation luôn vẽ theo toạ độ này.
- Cỡ chữ trên sân khấu: tiêu đề cảnh ≥ 44 px; chú thích ≥ 36 px; nhãn trên hình ≥ 30 px; riêng dòng nguồn và ghi chú tỉ lệ ≥ 22 px. Mỗi chú thích ≤ 20 từ, ≤ 2 dòng.
- Animation tự vẽ **tiêu đề cảnh** trên sân khấu (chế độ Trình chiếu không có khung giải thích).
- **Mức nhãn** (`datNhan`):
  - `day-du`: mọi nhãn.
  - `toi-gian`: sân khấu đang co dưới 50% (mọi điện thoại, cả dọc lẫn ngang). Chỉ giữ hình, chuyển động và tối đa vài nhãn then chốt vẽ to gấp đôi (≥ 60 px); ẩn chú thích, công thức, bảng số, dòng nguồn.
  - `tat`: không chữ nào trên hình.
- Màu HMO: Navy `#0A2E5C`, Ocean `#1B4E8F`, Sky `#60C0F0`, Orange `#F07800` (điểm nhấn), Ink `#0F1E3A`, Slate `#546E8F`. Tương phản chữ ≥ 4,5:1.
- Font: `"Be Vietnam Pro","Segoe UI",Arial,sans-serif`. Bộ khung đã nhúng Be Vietnam Pro 400/600/700 (Latin + tiếng Việt); không nhúng thêm font. Chỉ dùng ba độ đậm đó. Ký hiệu toán như √ ≈ → λ rơi về font hệ thống, chấp nhận được.
- Hình phóng đại phải ghi rõ, ví dụ "Không theo tỉ lệ: độ sâu phóng đại 25 lần".
- Không có thông tin nào chỉ hiện khi rê chuột.
- `moiTruong.giamChuyenDong` = true: tắt chuyển động trang trí (gợn sóng nền, hạt lấp lánh), giữ chuyển động mang nội dung.
- Không nhúng logo hay thanh tiêu đề của Khoa lên sân khấu.

## 5. Ngôn ngữ và quy tắc bắt buộc

- Tiếng Việt chuẩn thuật ngữ hải dương học: "độ muối" (không dùng từ đồng nghĩa dân dã), "sóng leo", "đới hút chìm", "nước lớn / nước ròng", "triều cường / triều kém".
- Chỉ dùng "Biển Đông" (tiếng Việt) và "East Vietnam Sea" (tiếng Anh). Mọi bản đồ có Biển Đông phải thể hiện quần đảo Hoàng Sa và quần đảo Trường Sa (Việt Nam). Test tự động quét các tên gọi bị cấm trong mã nguồn và DOM.
- Số thập phân dùng dấu phẩy, phân nhóm nghìn dùng dấu chấm: 1.483,5 m/s.
- Mọi số liệu phải có dòng nguồn (`nguon` trong noidung, và dòng nguồn ≥ 22 px trên sân khấu ở mức `day-du`). Không bịa số. Số nào spec ghi `[CẦN NGUỒN]` mà chưa có nguồn thì **không hiển thị**; ghi lại trong báo cáo.
- Không đưa MSSV, tên sinh viên hay điểm vào repo.

## 6. Kiểm tra trước khi báo xong

```bash
node tools/build.mjs <slug>
npx playwright test -g "<slug>"
```

Cả hai phải đạt. Sau đó tự xem ảnh chụp ở ba khung (1024 × 768, 390 × 844, 844 × 390) cho từng cảnh và đối chiếu từng mục của checklist trong spec. fps không đo được trong máy không màn hình: ghi "kiểm tay".

## 7. Git

- Làm trên nhánh `anim/<slug>`. Mỗi commit một việc, message tiếng Việt, ví dụ: `hat-nuoc-quay-vong: đổi "Nước nông" thành "Vùng chuyển tiếp" (S-03)`.
- Commit cả `src/`, `noidung/`, `animations/<slug>/index.html` và dòng tương ứng trong `manifest.json`.
- Không push, không merge; trưởng nhóm làm việc đó sau khi reviewer duyệt.

## 8. Báo cáo trả về

Một trong ba trạng thái: `DONE`, `DONE_WITH_CONCERNS`, `NEEDS_ESCALATION`. Kèm: bảng ID thay đổi (S-xx) → đã làm / chưa làm + lý do; dung lượng sau build; kết quả test; các số bị ẩn vì thiếu nguồn; điều cần người kiểm tay.
