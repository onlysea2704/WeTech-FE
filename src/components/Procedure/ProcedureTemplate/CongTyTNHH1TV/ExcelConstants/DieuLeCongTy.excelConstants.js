import { parseDateExcel } from "@/components/Procedure/ParentForm/FormExcelConstants";
export const SENTINEL_DIEULE = "[ĐIỀU LỆ CÔNG TY TNHH 1 THÀNH VIÊN]";
export const SENTINEL_NGANH_DIEULE = "[NGÀNH NGHỀ CAO]";


export const buildExportRowsDieuLeCongTy = (src) => {
    const rows = [];
    rows.push([SENTINEL_DIEULE, ""]);
    rows.push(["Tên công ty tiếng Việt", src.tenCongTyVN || ""]);
    rows.push(["Tên công ty tiếng Anh", src.tenCongTyEN || ""]);
    rows.push(["Tên công ty viết tắt", src.tenCongTyVietTat || ""]);
    rows.push(["Địa chỉ trụ sở", src.diaChiTruSo || ""]);
    rows.push(["Điện thoại", src.dienThoai || ""]);
    rows.push(["Fax", src.fax || ""]);
    rows.push(["Email", src.email || ""]);
    rows.push(["Website", src.website || ""]);

    rows.push(["Họ tên chủ sở hữu", src.chuSoHuu_hoTen || ""]);
    rows.push(["Giới tính CSH", src.chuSoHuu_gioiTinh || ""]);
    rows.push(["Ngày sinh CSH", src.chuSoHuu_ngaySinh || ""]);
    rows.push(["CCCD CSH", src.chuSoHuu_cccd || ""]);
    rows.push(["Dân tộc CSH", src.chuSoHuu_danToc || ""]);
    rows.push(["Quốc tịch CSH", src.chuSoHuu_quocTich || ""]);
    rows.push(["Tỉnh thành CSH", src.chuSoHuu_tinh || ""]);
    rows.push(["Quận huyện xã CSH", src.chuSoHuu_xa || ""]);
    rows.push(["Số nhà CSH", src.chuSoHuu_soNha || ""]);

    rows.push(["Vốn tiền mặt (VNĐ)", src.vonTienMat || ""]);

    rows.push(["Họ tên NDD", src.nguoiDaiDien_hoTen || ""]);
    rows.push(["Giới tính NDD", src.nguoiDaiDien_gioiTinh || ""]);
    rows.push(["Ngày sinh NDD", src.nguoiDaiDien_ngaySinh || ""]);
    rows.push(["CCCD NDD", src.nguoiDaiDien_cccd || ""]);
    rows.push(["Dân tộc NDD", src.nguoiDaiDien_danToc || ""]);
    rows.push(["Quốc tịch NDD", src.nguoiDaiDien_quocTich || ""]);
    rows.push(["Tỉnh thành NDD", src.nguoiDaiDien_tinh || ""]);
    rows.push(["Quận huyện xã NDD", src.nguoiDaiDien_xa || ""]);
    rows.push(["Số nhà NDD", src.nguoiDaiDien_soNha || ""]);
    rows.push(["Chức danh NDD", src.nguoiDaiDien_chucDanh || ""]);

    rows.push(["Ngày thông qua", src.ngayThongQua || ""]);

    // Nganh nghe array
    rows.push(["", ""]);
    rows.push([SENTINEL_NGANH_DIEULE, ""]);
    rows.push(["STT", "Tên ngành", "Chi tiết", "Mã ngành", "Ngành chính"]);
    const list = src.nganhNgheList || [];
    list.forEach((item, index) => {
        rows.push([
            index + 1,
            item.tenNganh || "",
            item.chiTiet || "",
            item.maNganh || "",
            item.laNganhChinh ? "Có" : ""
        ]);
    });

    return rows;
};

export const parseImportRowsDieuLeCongTy = (rows) => {
    let result = null;
    let foundSentinel = false;
    let inNganhNghe = false;
    const nganhNgheList = [];

    for (const rw of rows) {
        if (!Array.isArray(rw)) continue;
        const col0 = String(rw[0] || "").trim();
        const col1 = String(rw[1] || "").trim();
        const col2 = String(rw[2] || "").trim();
        const col3 = String(rw[3] || "").trim();
        const col4 = String(rw[4] || "").trim();

        if (col0 === SENTINEL_DIEULE) {
            foundSentinel = true;
            result = {};
            continue;
        }

        if (foundSentinel) {
            if (col0 === SENTINEL_NGANH_DIEULE) {
                inNganhNghe = true;
                continue;
            }

            if (inNganhNghe) {
                if (col0 === "STT") continue;
                // column indices: 0:STT, 1:Tên ngành, 2:Chi tiết, 3:Mã ngành, 4:Ngành chính
                if (!col1 && !col2) continue;
                nganhNgheList.push({
                    tenNganh: col1,
                    chiTiet: col2,
                    maNganh: col3,
                    laNganhChinh: col4.trim().toLowerCase() === "có"
                });
                continue;
            }

            switch (col0) {
                case "Tên công ty tiếng Việt": result.tenCongTyVN = col1; break;
                case "Tên công ty tiếng Anh": result.tenCongTyEN = col1; break;
                case "Tên công ty viết tắt": result.tenCongTyVietTat = col1; break;
                case "Địa chỉ trụ sở": result.diaChiTruSo = col1; break;
                case "Điện thoại": result.dienThoai = col1; break;
                case "Fax": result.fax = col1; break;
                case "Email": result.email = col1; break;
                case "Website": result.website = col1; break;
                
                case "Họ tên chủ sở hữu": result.chuSoHuu_hoTen = col1; break;
                case "Giới tính CSH": result.chuSoHuu_gioiTinh = col1; break;
                case "Ngày sinh CSH": result.chuSoHuu_ngaySinh = parseDateExcel(col1); break;
                case "CCCD CSH": result.chuSoHuu_cccd = col1; break;
                case "Dân tộc CSH": result.chuSoHuu_danToc = col1; break;
                case "Quốc tịch CSH": result.chuSoHuu_quocTich = col1; break;
                case "Tỉnh thành CSH": result.chuSoHuu_tinh = String(rw[1] || ""); break;
                case "Quận huyện xã CSH": result.chuSoHuu_xa = String(rw[1] || ""); break;
                case "Số nhà CSH": result.chuSoHuu_soNha = String(rw[1] || ""); break;

                case "Vốn tiền mặt (VNĐ)": result.vonTienMat = col1; break;

                case "Họ tên NDD": result.nguoiDaiDien_hoTen = col1; break;
                case "Giới tính NDD": result.nguoiDaiDien_gioiTinh = col1; break;
                case "Ngày sinh NDD": result.nguoiDaiDien_ngaySinh = parseDateExcel(col1); break;
                case "CCCD NDD": result.nguoiDaiDien_cccd = col1; break;
                case "Dân tộc NDD": result.nguoiDaiDien_danToc = col1; break;
                case "Quốc tịch NDD": result.nguoiDaiDien_quocTich = col1; break;
                case "Tỉnh thành NDD": result.nguoiDaiDien_tinh = String(rw[1] || ""); break;
                case "Quận huyện xã NDD": result.nguoiDaiDien_xa = String(rw[1] || ""); break;
                case "Số nhà NDD": result.nguoiDaiDien_soNha = String(rw[1] || ""); break;
                case "Chức danh NDD": result.nguoiDaiDien_chucDanh = col1; break;

                case "Ngày thông qua": result.ngayThongQua = parseDateExcel(col1); break;
            }
        }
    }

    if (result) {
        result.nganhNgheList = nganhNgheList;
    }
    return result;
};
