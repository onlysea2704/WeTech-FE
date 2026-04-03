// ──────────────────────────────────────────────────────────────────────────────
// Excel constants cho Danh sách chủ sở hữu hưởng lợi (CongTyTNHH1TV)
// ──────────────────────────────────────────────────────────────────────────────

import { formatDateExcel, parseDateExcel } from "@/components/Procedure/ParentForm/FormExcelConstants";
export const SENTINEL_CSH = "##DANH_SACH_CSH_HUONG_LOI##";

export const CSH_HUONG_LOI_HEADERS = [
    "STT",
    "Họ và tên",
    "Ngày, tháng, năm sinh (dd/mm/yyyy)",
    "Giới tính (Nam/Nữ)",
    "Số, ngày cấp, cơ quan cấp Giấy tờ pháp lý",
    "Quốc tịch",
    "Dân tộc",
    "Địa chỉ liên lạc",
    "Tỷ lệ sở hữu vốn điều lệ (%)",
    "Tỷ lệ sở hữu quyền biểu quyết (%)",
    "Quyền chi phối",
    "Ghi chú",
];

// ── Build export rows ────────────────────────────────────────────────────────
export function buildExportRowsCSHHuongLoi(src) {
    const rows = [];
    rows.push(["DANH SÁCH CHỦ SỞ HỮU HƯỞNG LỢI CỦA DOANH NGHIỆP"]);
    rows.push([]);
    rows.push([SENTINEL_CSH]);
    rows.push(CSH_HUONG_LOI_HEADERS);

    const list = src.cshHuongLoiList || [];
    list.forEach((r, i) =>
        rows.push([
            i + 1,
            r.hoTen || "",
            formatDateExcel(r.ngaySinh),
            r.gioiTinh || "",
            r.giaTo || "",
            r.quocTich || "",
            r.danToc || "",
            r.diaChiLienLac || "",
            r.tyLeSoHuuVon || "",
            r.tyLeSoHuuBieuQuyet || "",
            r.quyenChiPhoi || "",
            r.ghiChu || "",
        ]),
    );

    return rows;
}

// ── Parse import rows ────────────────────────────────────────────────────────
export function parseImportRowsCSHHuongLoi(allRows) {
    const importedData = { cshHuongLoiList: [] };
    let inTable = false;

    for (const row of allRows) {
        const col0 = row[0] !== undefined ? String(row[0]).trim() : "";

        if (col0 === SENTINEL_CSH) {
            inTable = true;
            continue;
        }
        if (!inTable) continue;
        if (col0 === "STT") continue; // header row
        if (!row[1]) continue;       // skip empty rows

        importedData.cshHuongLoiList.push({
            hoTen: String(row[1] || ""),
            ngaySinh: parseDateExcel(String(row[2] || "")),
            gioiTinh: String(row[3] || ""),
            giaTo: String(row[4] || ""),
            quocTich: String(row[5] || ""),
            danToc: String(row[6] || ""),
            diaChiLienLac: String(row[7] || ""),
            tyLeSoHuuVon: String(row[8] || ""),
            tyLeSoHuuBieuQuyet: String(row[9] || ""),
            quyenChiPhoi: String(row[10] || ""),
            ghiChu: String(row[11] || ""),
        });
    }

    return importedData;
}
