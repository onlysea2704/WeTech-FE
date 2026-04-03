// ──────────────────────────────────────────────────────────────────────────────
// Excel constants cho Danh Sách Thành Viên (Công ty TNHH 2TV)
// ──────────────────────────────────────────────────────────────────────────────

export const THANH_VIEN_TV2_HEADERS = [
    "STT",
    "Tên thành viên",
    "Ngày, tháng, năm sinh",
    "Giới tính",
    "Giấy tờ pháp lý",
    "Quốc tịch",
    "Dân tộc",
    "Địa chỉ liên lạc",
    "Phần vốn góp",
    "Tỷ lệ (%)",
    "Loại tài sản, số lượng, giá trị",
    "Thời hạn góp vốn",
    "Chữ ký của thành viên",
    "Ghi chú (nếu có)"
];

export const SENTINEL_TV_TV2 = "[DANH SÁCH THÀNH VIÊN]";

export function buildExportRowsDanhSachThanhVien(src) {
    const rows = [];
    rows.push(["Trường thông tin", "Giá trị"]);

    rows.push(["[CHỮ KÝ]", ""]);
    rows.push(["Chức danh người ký", src.chuKy_ten || ""]);
    rows.push(["Họ tên người ký", src.chuKy_hoTen || ""]);

    rows.push(["", ""]);
    rows.push([SENTINEL_TV_TV2, ""]);
    rows.push(THANH_VIEN_TV2_HEADERS);

    const ds = src.thanhVienList || [];
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
            r.phanVonGop || "",
            r.tyLe || "",
            r.loaiTaiSan || "",
            r.thoiHan || "",
            r.chuKy || "",
            r.ghiChu || ""
        ]);
    });

    return rows;
}

export function parseImportRowsDanhSachThanhVien(allRows) {
    const data = {};
    data.thanhVienList = [];
    let mode = "kv"; // 'kv' or 'table'

    for (const row of allRows) {
        const col0 = row[0] !== undefined ? String(row[0]).trim() : "";
        if (!col0) continue;

        if (col0 === SENTINEL_TV_TV2) {
            mode = "table";
            continue;
        }

        if (mode === "table") {
            if (col0 === "STT") continue;
            if (!row[1]) continue;
            data.thanhVienList.push({
                hoTen: String(row[1] || ""),
                ngaySinh: String(row[2] || ""),
                gioiTinh: String(row[3] || ""),
                giaTo: String(row[4] || ""),
                quocTich: String(row[5] || ""),
                danToc: String(row[6] || ""),
                diaChiLienLac: String(row[7] || ""),
                phanVonGop: String(row[8] || ""),
                tyLe: String(row[9] || ""),
                loaiTaiSan: String(row[10] || ""),
                thoiHan: String(row[11] || ""),
                chuKy: String(row[12] || ""),
                ghiChu: String(row[13] || ""),
            });
            continue;
        }

        // key-value mode
        const val = row[1] !== undefined && row[1] !== null ? String(row[1]) : "";
        if (col0 === "Chức danh người ký") data.chuKy_ten = val;
        if (col0 === "Họ tên người ký") data.chuKy_hoTen = val;
    }

    return data;
}
