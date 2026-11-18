// Gửi kết quả câu hỏi về Apps Script. Mất mạng thì xếp hàng trong localStorage và tự gửi lại.
const KHOA_HANG_DOI = 'hmo:hangdoi';
const KHOA_MSSV = 'hmo:mssv';
const GIAN_CACH = [2000, 4000, 8000, 16000, 32000];

const kho = {
  doc(khoa, macDinh) { try { const v = localStorage.getItem(khoa); return v == null ? macDinh : JSON.parse(v); } catch { return macDinh; } },
  ghi(khoa, v) { try { localStorage.setItem(khoa, JSON.stringify(v)); } catch { /* chế độ riêng tư: bỏ qua */ } },
  xoa(khoa) { try { localStorage.removeItem(khoa); } catch { /* bỏ qua */ } },
};

/**
 * @param {{url:string}} cauHinh  URL Web App của Apps Script; rỗng thì không gửi.
 * @param {(tt:{loai:'da-luu'|'cho'|'tu-choi'|'chua-cau-hinh', lyDo?:string, conLai:number})=>void} baoTrangThai
 */
export function taoSoDiem(cauHinh, baoTrangThai) {
  let hangDoi = kho.doc(KHOA_HANG_DOI, []);
  let dangGui = false;
  let henGio = null;
  const luu = () => kho.ghi(KHOA_HANG_DOI, hangDoi);
  const bao = (loai, lyDo) => baoTrangThai({ loai, lyDo, conLai: hangDoi.length });

  async function guiMot(muc) {
    const res = await fetch(cauHinh.url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // text/plain: không có preflight CORS
      body: JSON.stringify(muc.duLieu),
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  }

  async function xa() {
    if (dangGui || !hangDoi.length) return;
    if (!cauHinh.url) { bao('chua-cau-hinh'); return; }
    dangGui = true;
    clearTimeout(henGio);
    while (hangDoi.length) {
      const muc = hangDoi[0];
      try {
        const kq = await guiMot(muc);
        hangDoi.shift(); luu();
        if (kq && kq.ok) bao('da-luu'); else bao('tu-choi', (kq && kq.lyDo) || 'Máy chủ từ chối.');
      } catch {
        muc.lan = (muc.lan || 0) + 1; luu();
        bao('cho');
        if (muc.lan <= GIAN_CACH.length) henGio = setTimeout(xa, GIAN_CACH[muc.lan - 1]);
        break; // quá 5 lần: nằm trong hàng đợi, chờ sự kiện online hoặc lần mở sau
      }
    }
    dangGui = false;
  }

  window.addEventListener('online', () => { hangDoi.forEach((m) => { m.lan = 0; }); xa(); });

  return {
    /** @param {{mssv:string,maLop:string,slug:string,qid:string,chon:string,dung:boolean,lanThu:number,thoiGian:string}} duLieu */
    gui(duLieu) { hangDoi.push({ duLieu, lan: 0 }); luu(); return xa(); },
    xaHangDoi() { hangDoi.forEach((m) => { m.lan = 0; }); return xa(); },
    conLai: () => hangDoi.length,
    docMssv: () => kho.doc(KHOA_MSSV, ''),
    ghiMssv: (v) => kho.ghi(KHOA_MSSV, v),
    xoaMssv: () => kho.xoa(KHOA_MSSV),
  };
}
