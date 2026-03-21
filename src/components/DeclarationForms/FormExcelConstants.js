// ──────────────────────────────────────────────────────────────────────────────
// Column headers cho 2 bảng (dùng cho cả export và import) của Giấy Đề Nghị
// ──────────────────────────────────────────────────────────────────────────────
export const NGANH_NGHE_HEADERS = ["STT", "Tên ngành (*)", "Chi tiết", "Mã ngành (*)", "Là ngành chính (Có/Để trống)"];
export const THANH_VIEN_HEADERS = [
    "STT",
    "Họ tên (*)",
    "Ngày sinh (dd/mm/yyyy)",
    "Số CCCD",
    "Giới tính (Nam/Nữ)",
    "Quốc tịch",
    "Dân tộc",
    "Nơi thường trú",
    "Nơi ở hiện tại",
    "Chữ ký",
];

export const SENTINEL_NGANH = "##DANH_SACH_NGANH_NGHE##";
export const SENTINEL_TV = "##DANH_SACH_THANH_VIEN##";

// ──────────────────────────────────────────────────────────────────────────────
// Map label → field key cho Giấy Đề Nghị
// ──────────────────────────────────────────────────────────────────────────────
export const FIELD_LABEL_MAP_DENGHI = {
    "Họ và tên (*)": "nguoiDaiDien_hoTen",
    "Ngày sinh (*) (yyyy-mm-dd)": "nguoiDaiDien_ngaySinh",
    "Giới tính (*) (Nam/Nữ)": "nguoiDaiDien_gioiTinh",
    "Số định danh cá nhân (*)": "nguoiDaiDien_cccd",
    "Dân tộc (*)": "nguoiDaiDien_danToc",
    "Quốc tịch (*)": "nguoiDaiDien_quocTich",
    "Điện thoại liên hệ (*)": "nguoiDaiDien_phone",
    Email: "nguoiDaiDien_email",
    "Tên tiếng Việt (*)": "hkd_tenVN",
    "Tên tiếng nước ngoài": "hkd_tenEN",
    "Tên viết tắt": "hkd_tenVietTat",
    "Điện thoại trụ sở (*)": "truSo_phone",
    "Email trụ sở": "truSo_email",
    "Vốn kinh doanh (số, VNĐ) (*)": "vonKinhDoanh",
    "Vốn kinh doanh (bằng chữ)": "vonKinhDoanh_bangChu",
    "Kính gửi": "kinhGui",
    "Ngày bắt đầu hoạt động (yyyy-mm-dd)": "ngayBatDau",
    "Tổng số lao động (dự kiến)": "soLaoDong",
    "Phương pháp thuế GTGT (ke_khai/khoan)": "vatMethod",
    "Chủ thể thành lập (ca_nhan/thanh_vien_gd)": "subject",
    "Tên (*)": "chuHo_ten",
    "Họ và Tên (*)": "chuHo_hoTen",
    "Địa chỉ thuế - Tỉnh/Thành phố": "thue_tinh",
    "Địa chỉ thuế - Xã/Phường": "thue_xa",
    "Địa chỉ thuế - Số nhà, đường": "thue_soNha",
    "Điện thoại thuế": "thue_phone",
    "Email thuế": "thue_email",
};

// Map section header → { label → fieldKey }
export const SECTION_FIELD_MAP_DENGHI = {
    "NƠI THƯỜNG TRÚ": {
        "Tỉnh/Thành phố": "thuongTru_tinh",
        "Xã/Phường": "thuongTru_xa",
        "Số nhà, đường": "thuongTru_soNha",
    },
    "NƠI Ở HIỆN TẠI": { "Tỉnh/Thành phố": "hienTai_tinh", "Xã/Phường": "hienTai_xa", "Số nhà, đường": "hienTai_soNha" },
    "TRỤ SỞ": { "Tỉnh/Thành phố": "truSo_tinh", "Xã/Phường": "truSo_xa", "Số nhà, đường": "truSo_soNha" },
};

// ──────────────────────────────────────────────────────────────────────────────
// Map label → field key cho Giấy Uỷ Quyền
// ──────────────────────────────────────────────────────────────────────────────
export const FIELD_LABEL_MAP_UYQUYEN = {
    "Họ và tên (*)": "uyQuyen_hoTen",
    "Ngày sinh (*) (yyyy-mm-dd)": "uyQuyen_ngaySinh",
    "Giới tính (*) (Nam/Nữ)": "uyQuyen_gioiTinh",
    "Số định danh cá nhân (*)": "uyQuyen_cccd",
    "Điện thoại liên hệ (*)": "uyQuyen_phone",
    Email: "uyQuyen_email",
    "Tên chủ hộ": "chuHo_ten",
    "Phường/Xã chủ hộ": "chuHo_xa_phuong",
};

export const SECTION_FIELD_MAP_UYQUYEN = {
    "ĐỊA CHỈ LIÊN LẠC": {
        "Tỉnh/Thành phố": "uyQuyen_tinh",
        "Xã/Phường": "uyQuyen_xa",
        "Số nhà, đường": "uyQuyen_soNha",
    },
};
