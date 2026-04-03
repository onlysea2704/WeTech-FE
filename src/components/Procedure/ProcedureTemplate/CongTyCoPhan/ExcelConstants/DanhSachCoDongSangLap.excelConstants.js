// ──────────────────────────────────────────────────────────────────────────────
// Excel constants cho Danh Sách Cổ Đông Sáng Lập (Công ty Cổ phần)
// ──────────────────────────────────────────────────────────────────────────────

export const CO_DONG_SANG_LAP_HEADERS = [
    "STT",
    "Tên cổ đông sáng lập",
    "Ngày, tháng, năm sinh",
    "Giới tính",
    "Giấy tờ pháp lý",
    "Quốc tịch",
    "Dân tộc",
    "Địa chỉ liên lạc",
    "Tổng số cổ phần - Số lượng",
    "Tổng số cổ phần - Giá trị",
    "Tỷ lệ (%)",
    "Cổ phần phổ thông - Số lượng",
    "Cổ phần phổ thông - Giá trị",
    "Cổ phần khác - Số lượng",
    "Cổ phần khác - Giá trị",
    "Loại tài sản, số lượng, giá trị",
    "Thời hạn góp vốn",
    "Ghi chú (nếu có)"
];

export const SENTINEL_CDSL = "[DANH SÁCH CỔ ĐÔNG SÁNG LẬP]";

export function buildExportRowsDanhSachCoDongSangLap(src) {
    const rows = [];
    rows.push(["Trường thông tin", "Giá trị"]);

    rows.push(["[THÔNG TIN KHÁC]", ""]);
    rows.push(["Tên loại cổ phần khác", src.loaiCoPhanKhac_ten || ""]);

    rows.push(["[CHỮ KÝ]", ""]);
    rows.push(["Chức danh người ký", src.chuKy_ten || ""]);
    rows.push(["Họ tên người ký", src.chuKy_hoTen || ""]);

    rows.push(["", ""]);
    rows.push([SENTINEL_CDSL, ""]);
    rows.push(CO_DONG_SANG_LAP_HEADERS);

    const ds = src.coDongList || [];
    ds.forEach((r, i) => {
        rows.push([
            i + 1,
            r.hoTen || "",
            r.ngaySinh || "",
            r.gioiTinh || "",
            r.giaTo || "",
            r.quocTich || "",
            r.danToc || "",
            r.diaChiLienLac || "",
            r.tongSoCoPhan_soLuong || "",
            r.tongSoCoPhan_giaTri || "",
            r.tyLe || "",
            r.loaiCoPhan_phoThong_soLuong || "",
            r.loaiCoPhan_phoThong_giaTri || "",
            r.loaiCoPhan_khac_soLuong || "",
            r.loaiCoPhan_khac_giaTri || "",
            r.loaiTaiSanGopVon || "",
            r.thoiHanGopVon || "",
            r.ghiChu || ""
        ]);
    });

    return rows;
}

export function parseImportRowsDanhSachCoDongSangLap(allRows) {
    const data = {};
    data.coDongList = [];
    let mode = "kv"; 

    for (const row of allRows) {
        const col0 = row[0] !== undefined ? String(row[0]).trim() : "";
        if (!col0) continue;

        if (col0 === SENTINEL_CDSL) {
            mode = "table";
            continue;
        }

        if (mode === "table") {
            if (col0 === "STT") continue;
            if (!row[1]) continue;
            data.coDongList.push({
                hoTen: String(row[1] || ""),
                ngaySinh: String(row[2] || ""),
                gioiTinh: String(row[3] || ""),
                giaTo: String(row[4] || ""),
                quocTich: String(row[5] || ""),
                danToc: String(row[6] || ""),
                diaChiLienLac: String(row[7] || ""),
                tongSoCoPhan_soLuong: String(row[8] || ""),
                tongSoCoPhan_giaTri: String(row[9] || ""),
                tyLe: String(row[10] || ""),
                loaiCoPhan_phoThong_soLuong: String(row[11] || ""),
                loaiCoPhan_phoThong_giaTri: String(row[12] || ""),
                loaiCoPhan_khac_soLuong: String(row[13] || ""),
                loaiCoPhan_khac_giaTri: String(row[14] || ""),
                loaiTaiSanGopVon: String(row[15] || ""),
                thoiHanGopVon: String(row[16] || ""),
                ghiChu: String(row[17] || ""),
            });
            continue;
        }

        // key-value
        const val = row[1] !== undefined && row[1] !== null ? String(row[1]) : "";
        if (col0 === "Tên loại cổ phần khác") data.loaiCoPhanKhac_ten = val;
        if (col0 === "Chức danh người ký") data.chuKy_ten = val;
        if (col0 === "Họ tên người ký") data.chuKy_hoTen = val;
    }

    return data;
}
