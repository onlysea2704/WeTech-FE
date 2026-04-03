// ──────────────────────────────────────────────────────────────────────────────
// Excel constants cho Giấy đề nghị đăng ký doanh nghiệp (Công ty TNHH 1TV)
// ──────────────────────────────────────────────────────────────────────────────

// Tái sử dụng NGANH_NGHE_HEADERS từ constants chung
export { NGANH_NGHE_HEADERS, SENTINEL_NGANH } from "@/components/Procedure/ParentForm/FormExcelConstants";

// ── Field label → key map ────────────────────────────────────────────────────
export const FIELD_LABEL_MAP_GIAY_DKDN = {
    "Kính gửi": "kinhGui",
    // Người nộp hồ sơ
    "Họ và tên người nộp (*) (chữ in hoa)": "nguoiNop_hoTen",
    "Ngày sinh người nộp (*) (yyyy-mm-dd)": "nguoiNop_ngaySinh",
    "Giới tính người nộp (*) (Nam/Nữ)": "nguoiNop_gioiTinh",
    "CCCD người nộp (*)": "nguoiNop_cccd",
    "Điện thoại người nộp": "nguoiNop_phone",
    "Email người nộp": "nguoiNop_email",
    // Tên công ty
    "Tên tiếng Việt (*) (chữ in hoa)": "tenCongTyVN",
    "Tên tiếng nước ngoài": "tenCongTyEN",
    "Tên viết tắt": "tenCongTyVietTat",
    // Trụ sở
    "Điện thoại trụ sở (*)": "truSo_phone",
    "Số fax trụ sở": "truSo_fax",
    "Email trụ sở": "truSo_email",
    "Website": "truSo_website",
    // Chủ sở hữu
    "Họ tên chủ sở hữu (*) (chữ in hoa)": "chuSoHuu_hoTen",
    "Ngày sinh chủ sở hữu (*) (yyyy-mm-dd)": "chuSoHuu_ngaySinh",
    "Giới tính chủ sở hữu (*) (Nam/Nữ)": "chuSoHuu_gioiTinh",
    "CCCD chủ sở hữu (*)": "chuSoHuu_cccd",
    "Điện thoại chủ sở hữu": "chuSoHuu_phone",
    "Email chủ sở hữu": "chuSoHuu_email",
    // Vốn điều lệ
    "Vốn điều lệ (số, VNĐ) (*)": "vonDieuLe",
    "Vốn điều lệ (bằng chữ)": "vonDieuLe_bangChu",
    "Giá trị tương đương ngoại tệ": "vonDieuLe_ngoaiTe",
    "Hiển thị ngoại tệ trên GCNĐKDN (co/khong)": "hienThiNgoaiTe",
    // Thông tin cổ phần
    "Mệnh giá cổ phần (VNĐ)": "menhGiaCoPhan",
    "Cổ phần phổ thông - Số lượng": "cp_cptt_soLuong",
    "Cổ phần phổ thông - Tổng giá trị": "cp_cptt_giaTri",
    "Cổ phần phổ thông - Tỷ lệ (%)": "cp_cptt_tiLe",
    "Cổ phần ưu đãi biểu quyết - Số lượng": "cp_cpudbq_soLuong",
    "Cổ phần ưu đãi biểu quyết - Tổng giá trị": "cp_cpudbq_giaTri",
    "Cổ phần ưu đãi biểu quyết - Tỷ lệ (%)": "cp_cpudbq_tiLe",
    "Cổ phần ưu đãi cổ tức - Số lượng": "cp_cpudct_soLuong",
    "Cổ phần ưu đãi cổ tức - Tổng giá trị": "cp_cpudct_giaTri",
    "Cổ phần ưu đãi cổ tức - Tỷ lệ (%)": "cp_cpudct_tiLe",
    "Cổ phần ưu đãi hoàn lại - Số lượng": "cp_cpudhl_soLuong",
    "Cổ phần ưu đãi hoàn lại - Tổng giá trị": "cp_cpudhl_giaTri",
    "Cổ phần ưu đãi hoàn lại - Tỷ lệ (%)": "cp_cpudhl_tiLe",
    "Cổ phần ưu đãi khác - Tên": "cp_cpudk_ten",
    "Cổ phần ưu đãi khác - Số lượng": "cp_cpudk_soLuong",
    "Cổ phần ưu đãi khác - Tổng giá trị": "cp_cpudk_giaTri",
    "Cổ phần ưu đãi khác - Tỷ lệ (%)": "cp_cpudk_tiLe",
    // Nhà đầu tư nước ngoài
    "Mã số dự án đầu tư": "maSoDuAn",
    "Ngày cấp dự án (yyyy-mm-dd)": "ngayCapDuAn",
    "Cơ quan cấp dự án": "coQuanCapDuAn",
    // Nguồn vốn
    "Vốn ngân sách nhà nước - Số tiền": "nguonVon_nganSach_soTien",
    "Vốn ngân sách nhà nước - Tỷ lệ (%)": "nguonVon_nganSach_tyLe",
    "Vốn tư nhân - Số tiền": "nguonVon_tuNhan_soTien",
    "Vốn tư nhân - Tỷ lệ (%)": "nguonVon_tuNhan_tyLe",
    "Vốn nước ngoài - Số tiền": "nguonVon_nuocNgoai_soTien",
    "Vốn nước ngoài - Tỷ lệ (%)": "nguonVon_nuocNgoai_tyLe",
    "Vốn khác - Số tiền": "nguonVon_khac_soTien",
    "Vốn khác - Tỷ lệ (%)": "nguonVon_khac_tyLe",
    "Tổng cộng vốn - Số tiền": "nguonVon_tongCong_soTien",
    "Tổng cộng vốn - Tỷ lệ (%)": "nguonVon_tongCong_tyLe",
    // Thông tin đăng ký thuế - Giám đốc
    "Họ tên Giám đốc/TGĐ (nếu có)": "giamDoc_hoTen",
    "Ngày sinh Giám đốc (yyyy-mm-dd)": "giamDoc_ngaySinh",
    "Giới tính Giám đốc (Nam/Nữ)": "giamDoc_gioiTinh",
    "CCCD Giám đốc": "giamDoc_cccd",
    "Điện thoại Giám đốc": "giamDoc_phone",
    // Tài sản góp vốn
    "Đồng Việt Nam - Giá trị": "taiSan_dongVN_giaTri",
    "Đồng Việt Nam - Tỷ lệ (%)": "taiSan_dongVN_tyLe",
    "Ngoại tệ - Giá trị": "taiSan_ngoaiTe_giaTri",
    "Ngoại tệ - Tỷ lệ (%)": "taiSan_ngoaiTe_tyLe",
    "Vàng - Giá trị": "taiSan_vang_giaTri",
    "Vàng - Tỷ lệ (%)": "taiSan_vang_tyLe",
    "Quyền sử dụng đất - Giá trị": "taiSan_qsdDat_giaTri",
    "Quyền sử dụng đất - Tỷ lệ (%)": "taiSan_qsdDat_tyLe",
    "Quyền SHTT - Giá trị": "taiSan_shtt_giaTri",
    "Quyền SHTT - Tỷ lệ (%)": "taiSan_shtt_tyLe",
    "Tài sản khác - Giá trị": "taiSan_khac_giaTri",
    "Tài sản khác - Tỷ lệ (%)": "taiSan_khac_tyLe",
    "Tổng tài sản góp vốn - Giá trị": "taiSan_tongSo_giaTri",
    "Tổng tài sản góp vốn - Tỷ lệ (%)": "taiSan_tongSo_tyLe",
    // Người đại diện
    "Họ tên người đại diện (*) (chữ in hoa)": "nguoiDaiDien_hoTen",
    "Ngày sinh người đại diện (*) (yyyy-mm-dd)": "nguoiDaiDien_ngaySinh",
    "Giới tính người đại diện (*) (Nam/Nữ)": "nguoiDaiDien_gioiTinh",
    "CCCD người đại diện (*)": "nguoiDaiDien_cccd",
    "Chức danh người đại diện (*)": "nguoiDaiDien_chucDanh",
};

// ── Section-based address map ────────────────────────────────────────────────
export const SECTION_FIELD_MAP_GIAY_DKDN = {
    "ĐỊA CHỈ LIÊN LẠC (NGƯỜI NỘP)": {
        "Tỉnh/Thành phố": "lienLac_tinh",
        "Xã/Phường": "lienLac_xa",
        "Số nhà, đường": "lienLac_soNha",
    },
    "ĐỊA CHỈ TRỤ SỞ CHÍNH": {
        "Tỉnh/Thành phố": "truSo_tinh",
        "Xã/Phường": "truSo_xa",
        "Số nhà, đường": "truSo_soNha",
    },
    "ĐỊA CHỈ CHỦ SỞ HỮU": {
        "Tỉnh/Thành phố": "chuSoHuu_tinh",
        "Xã/Phường": "chuSoHuu_xa",
        "Số nhà, đường": "chuSoHuu_soNha",
    },
    "ĐỊA CHỈ NGƯỜI ĐẠI DIỆN": {
        "Tỉnh/Thành phố": "nguoiDaiDien_tinh",
        "Xã/Phường": "nguoiDaiDien_xa",
        "Số nhà, đường": "nguoiDaiDien_soNha",
    },
};

// ── Build export rows ────────────────────────────────────────────────────────
export function buildExportRowsGiayDKDN(src, SENTINEL_NGANH, NGANH_NGHE_HEADERS) {
    const rows = [];
    rows.push(["Trường thông tin", "Giá trị"]);

    rows.push(["[THÔNG TIN NGƯỜI NỘP HỒ SƠ]", ""]);
    rows.push(["Kính gửi", src.kinhGui || ""]);
    rows.push(["Họ và tên người nộp (*) (chữ in hoa)", src.nguoiNop_hoTen || ""]);
    rows.push(["Ngày sinh người nộp (*) (yyyy-mm-dd)", src.nguoiNop_ngaySinh || ""]);
    rows.push(["Giới tính người nộp (*) (Nam/Nữ)", src.nguoiNop_gioiTinh || ""]);
    rows.push(["CCCD người nộp (*)", src.nguoiNop_cccd || ""]);
    rows.push(["Điện thoại người nộp", src.nguoiNop_phone || ""]);
    rows.push(["Email người nộp", src.nguoiNop_email || ""]);

    rows.push(["[ĐỊA CHỈ LIÊN LẠC (NGƯỜI NỘP)]", ""]);
    rows.push(["Tỉnh/Thành phố", src.lienLac_tinh || ""]);
    rows.push(["Xã/Phường", src.lienLac_xa || ""]);
    rows.push(["Số nhà, đường", src.lienLac_soNha || ""]);

    rows.push(["[TÊN CÔNG TY]", ""]);
    rows.push(["Tên tiếng Việt (*) (chữ in hoa)", src.tenCongTyVN || ""]);
    rows.push(["Tên tiếng nước ngoài", src.tenCongTyEN || ""]);
    rows.push(["Tên viết tắt", src.tenCongTyVietTat || ""]);

    rows.push(["[ĐỊA CHỈ TRỤ SỞ CHÍNH]", ""]);
    rows.push(["Tỉnh/Thành phố", src.truSo_tinh || ""]);
    rows.push(["Xã/Phường", src.truSo_xa || ""]);
    rows.push(["Số nhà, đường", src.truSo_soNha || ""]);
    rows.push(["Điện thoại trụ sở (*)", src.truSo_phone || ""]);
    rows.push(["Số fax trụ sở", src.truSo_fax || ""]);
    rows.push(["Email trụ sở", src.truSo_email || ""]);
    rows.push(["Website", src.truSo_website || ""]);

    rows.push(["[CHỦ SỞ HỮU]", ""]);
    rows.push(["Họ tên chủ sở hữu (*) (chữ in hoa)", src.chuSoHuu_hoTen || ""]);
    rows.push(["Ngày sinh chủ sở hữu (*) (yyyy-mm-dd)", src.chuSoHuu_ngaySinh || ""]);
    rows.push(["Giới tính chủ sở hữu (*) (Nam/Nữ)", src.chuSoHuu_gioiTinh || ""]);
    rows.push(["CCCD chủ sở hữu (*)", src.chuSoHuu_cccd || ""]);
    rows.push(["Điện thoại chủ sở hữu", src.chuSoHuu_phone || ""]);
    rows.push(["Email chủ sở hữu", src.chuSoHuu_email || ""]);

    rows.push(["[ĐỊA CHỈ CHỦ SỞ HỮU]", ""]);
    rows.push(["Tỉnh/Thành phố", src.chuSoHuu_tinh || ""]);
    rows.push(["Xã/Phường", src.chuSoHuu_xa || ""]);
    rows.push(["Số nhà, đường", src.chuSoHuu_soNha || ""]);

    rows.push(["[VỐN ĐIỀU LỆ]", ""]);
    rows.push(["Vốn điều lệ (số, VNĐ) (*)", src.vonDieuLe || ""]);
    rows.push(["Vốn điều lệ (bằng chữ)", src.vonDieuLe_bangChu || ""]);
    rows.push(["Giá trị tương đương ngoại tệ", src.vonDieuLe_ngoaiTe || ""]);
    rows.push(["Hiển thị ngoại tệ trên GCNĐKDN (co/khong)", src.hienThiNgoaiTe || "khong"]);

    rows.push(["[THÔNG TIN CỔ PHẦN (Công ty Cổ phần)]", ""]);
    rows.push(["Mệnh giá cổ phần (VNĐ)", src.menhGiaCoPhan || ""]);
    rows.push(["Cổ phần phổ thông - Số lượng", src.cp_cptt_soLuong || ""]);
    rows.push(["Cổ phần phổ thông - Tổng giá trị", src.cp_cptt_giaTri || ""]);
    rows.push(["Cổ phần phổ thông - Tỷ lệ (%)", src.cp_cptt_tiLe || ""]);
    rows.push(["Cổ phần ưu đãi biểu quyết - Số lượng", src.cp_cpudbq_soLuong || ""]);
    rows.push(["Cổ phần ưu đãi biểu quyết - Tổng giá trị", src.cp_cpudbq_giaTri || ""]);
    rows.push(["Cổ phần ưu đãi biểu quyết - Tỷ lệ (%)", src.cp_cpudbq_tiLe || ""]);
    rows.push(["Cổ phần ưu đãi cổ tức - Số lượng", src.cp_cpudct_soLuong || ""]);
    rows.push(["Cổ phần ưu đãi cổ tức - Tổng giá trị", src.cp_cpudct_giaTri || ""]);
    rows.push(["Cổ phần ưu đãi cổ tức - Tỷ lệ (%)", src.cp_cpudct_tiLe || ""]);
    rows.push(["Cổ phần ưu đãi hoàn lại - Số lượng", src.cp_cpudhl_soLuong || ""]);
    rows.push(["Cổ phần ưu đãi hoàn lại - Tổng giá trị", src.cp_cpudhl_giaTri || ""]);
    rows.push(["Cổ phần ưu đãi hoàn lại - Tỷ lệ (%)", src.cp_cpudhl_tiLe || ""]);
    rows.push(["Cổ phần ưu đãi khác - Tên", src.cp_cpudk_ten || ""]);
    rows.push(["Cổ phần ưu đãi khác - Số lượng", src.cp_cpudk_soLuong || ""]);
    rows.push(["Cổ phần ưu đãi khác - Tổng giá trị", src.cp_cpudk_giaTri || ""]);
    rows.push(["Cổ phần ưu đãi khác - Tỷ lệ (%)", src.cp_cpudk_tiLe || ""]);

    rows.push(["[NGUỒN VỐN ĐIỀU LỆ]", ""]);
    rows.push(["Vốn ngân sách nhà nước - Số tiền", src.nguonVon_nganSach_soTien || ""]);
    rows.push(["Vốn ngân sách nhà nước - Tỷ lệ (%)", src.nguonVon_nganSach_tyLe || ""]);
    rows.push(["Vốn tư nhân - Số tiền", src.nguonVon_tuNhan_soTien || ""]);
    rows.push(["Vốn tư nhân - Tỷ lệ (%)", src.nguonVon_tuNhan_tyLe || ""]);
    rows.push(["Vốn nước ngoài - Số tiền", src.nguonVon_nuocNgoai_soTien || ""]);
    rows.push(["Vốn nước ngoài - Tỷ lệ (%)", src.nguonVon_nuocNgoai_tyLe || ""]);
    rows.push(["Vốn khác - Số tiền", src.nguonVon_khac_soTien || ""]);
    rows.push(["Vốn khác - Tỷ lệ (%)", src.nguonVon_khac_tyLe || ""]);
    rows.push(["Tổng cộng vốn - Số tiền", src.nguonVon_tongCong_soTien || ""]);
    rows.push(["Tổng cộng vốn - Tỷ lệ (%)", src.nguonVon_tongCong_tyLe || ""]);

    rows.push(["[THÔNG TIN ĐĂNG KÝ THUẾ - GIÁM ĐỐC]", ""]);
    rows.push(["Họ tên Giám đốc/TGĐ (nếu có)", src.giamDoc_hoTen || ""]);
    rows.push(["Ngày sinh Giám đốc (yyyy-mm-dd)", src.giamDoc_ngaySinh || ""]);
    rows.push(["Giới tính Giám đốc (Nam/Nữ)", src.giamDoc_gioiTinh || ""]);
    rows.push(["CCCD Giám đốc", src.giamDoc_cccd || ""]);
    rows.push(["Điện thoại Giám đốc", src.giamDoc_phone || ""]);

    rows.push(["[TÀI SẢN GÓP VỐN]", ""]);
    rows.push(["Đồng Việt Nam - Giá trị", src.taiSan_dongVN_giaTri || ""]);
    rows.push(["Đồng Việt Nam - Tỷ lệ (%)", src.taiSan_dongVN_tyLe || ""]);
    rows.push(["Ngoại tệ - Giá trị", src.taiSan_ngoaiTe_giaTri || ""]);
    rows.push(["Ngoại tệ - Tỷ lệ (%)", src.taiSan_ngoaiTe_tyLe || ""]);
    rows.push(["Vàng - Giá trị", src.taiSan_vang_giaTri || ""]);
    rows.push(["Vàng - Tỷ lệ (%)", src.taiSan_vang_tyLe || ""]);
    rows.push(["Quyền sử dụng đất - Giá trị", src.taiSan_qsdDat_giaTri || ""]);
    rows.push(["Quyền sử dụng đất - Tỷ lệ (%)", src.taiSan_qsdDat_tyLe || ""]);
    rows.push(["Quyền SHTT - Giá trị", src.taiSan_shtt_giaTri || ""]);
    rows.push(["Quyền SHTT - Tỷ lệ (%)", src.taiSan_shtt_tyLe || ""]);
    rows.push(["Tài sản khác - Giá trị", src.taiSan_khac_giaTri || ""]);
    rows.push(["Tài sản khác - Tỷ lệ (%)", src.taiSan_khac_tyLe || ""]);
    rows.push(["Tổng tài sản góp vốn - Giá trị", src.taiSan_tongSo_giaTri || ""]);
    rows.push(["Tổng tài sản góp vốn - Tỷ lệ (%)", src.taiSan_tongSo_tyLe || ""]);

    rows.push(["[NHÀ ĐẦU TƯ / CỔ ĐÔNG NƯỚC NGOÀI]", ""]);
    rows.push(["Mã số dự án đầu tư", src.maSoDuAn || ""]);
    rows.push(["Ngày cấp dự án (yyyy-mm-dd)", src.ngayCapDuAn || ""]);
    rows.push(["Cơ quan cấp dự án", src.coQuanCapDuAn || ""]);

    rows.push(["[NGƯỜI ĐẠI DIỆN THEO PHÁP LUẬT]", ""]);
    rows.push(["Họ tên người đại diện (*) (chữ in hoa)", src.nguoiDaiDien_hoTen || ""]);
    rows.push(["Ngày sinh người đại diện (*) (yyyy-mm-dd)", src.nguoiDaiDien_ngaySinh || ""]);
    rows.push(["Giới tính người đại diện (*) (Nam/Nữ)", src.nguoiDaiDien_gioiTinh || ""]);
    rows.push(["CCCD người đại diện (*)", src.nguoiDaiDien_cccd || ""]);
    rows.push(["Chức danh người đại diện (*)", src.nguoiDaiDien_chucDanh || ""]);

    rows.push(["[ĐỊA CHỈ NGƯỜI ĐẠI DIỆN]", ""]);
    rows.push(["Tỉnh/Thành phố", src.nguoiDaiDien_tinh || ""]);
    rows.push(["Xã/Phường", src.nguoiDaiDien_xa || ""]);
    rows.push(["Số nhà, đường", src.nguoiDaiDien_soNha || ""]);

    // Bảng ngành nghề
    rows.push(["", ""]);
    rows.push([SENTINEL_NGANH, ""]);
    rows.push(NGANH_NGHE_HEADERS);
    const nganhList = src.nganhNgheList || [];
    nganhList.forEach((r, i) =>
        rows.push([i + 1, r.tenNganh || "", r.chiTiet || "", r.maNganh || "", r.laNganhChinh ? "Có" : ""]),
    );

    return rows;
}
