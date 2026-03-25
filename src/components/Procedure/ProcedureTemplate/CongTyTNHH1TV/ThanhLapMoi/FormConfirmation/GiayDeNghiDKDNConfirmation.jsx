import React from "react";
import styles from "./GiayDeNghiDKDNConfirmation.module.css";
import NganhNgheTable from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/NganhNgheTable/NganhNgheTable";

function GiayDeNghiDKDNConfirmation({ dataJson }) {
    if (!dataJson) {
        return <div className={styles.emptyMessage}>Chưa có dữ liệu để hiển thị.</div>;
    }

    const {
        kinhGui = "",
        nguoiNop_hoTen = "",
        nguoiNop_ngaySinh = "",
        nguoiNop_gioiTinh = "",
        nguoiNop_cccd = "",
        lienLac_soNha = "",
        lienLac_xa = "",
        lienLac_tinh = "",
        nguoiNop_phone = "",
        nguoiNop_email = "",

        nguoiNop_danToc = "",
        nguoiNop_quocTich = "",
        nguoiNop_soHoChieu = "",
        nguoiNop_ngayCapHoChieu = "",
        nguoiNop_noiCapHoChieu = "",
        nguoiNop_thuongTru_soNha = "",
        nguoiNop_thuongTru_xa = "",
        nguoiNop_thuongTru_tinh = "",
        nguoiNop_thuongTru_quocGia = "Việt Nam",

        tenCongTyVN = "",
        tenCongTyEN = "",
        tenCongTyVietTat = "",

        truSo_soNha = "",
        truSo_xa = "",
        truSo_tinh = "",
        truSo_phone = "",
        truSo_fax = "",
        truSo_email = "",
        truSo_website = "",

        nganhNgheList = [],

        chuSoHuu_hoTen = "",
        chuSoHuu_ngaySinh = "",
        chuSoHuu_gioiTinh = "",
        chuSoHuu_cccd = "",
        chuSoHuu_soNha = "",
        chuSoHuu_xa = "",
        chuSoHuu_tinh = "",
        chuSoHuu_phone = "",
        chuSoHuu_email = "",

        chuSoHuu_danToc = "",
        chuSoHuu_quocTich = "",
        chuSoHuu_soHoChieu = "",
        chuSoHuu_ngayCapHoChieu = "",
        chuSoHuu_noiCapHoChieu = "",
        chuSoHuu_thuongTru_soNha = "",
        chuSoHuu_thuongTru_xa = "",
        chuSoHuu_thuongTru_tinh = "",
        chuSoHuu_thuongTru_quocGia = "Việt Nam",
        chuSoHuu_maSoDuAn = "",
        chuSoHuu_ngayCapDuAn = "",
        chuSoHuu_coQuanCapDuAn = "",

        vonDieuLe = "",
        vonDieuLe_bangChu = "",
        vonDieuLe_ngoaiTe = "",

        nguonVon_nganSach_soTien = "",
        nguonVon_nganSach_tyLe = "",
        nguonVon_tuNhan_soTien = "",
        nguonVon_tuNhan_tyLe = "",
        nguonVon_nuocNgoai_soTien = "",
        nguonVon_nuocNgoai_tyLe = "",
        nguonVon_khac_soTien = "",
        nguonVon_khac_tyLe = "",
        nguonVon_tongCong_soTien = "",
        nguonVon_tongCong_tyLe = "",

        taiSan_dongVN_giaTri = "",
        taiSan_dongVN_tyLe = "",
        taiSan_ngoaiTe_giaTri = "",
        taiSan_ngoaiTe_tyLe = "",
        taiSan_vang_giaTri = "",
        taiSan_vang_tyLe = "",
        taiSan_qsdDat_giaTri = "",
        taiSan_qsdDat_tyLe = "",
        taiSan_shtt_giaTri = "",
        taiSan_shtt_tyLe = "",
        taiSan_khac_giaTri = "",
        taiSan_khac_tyLe = "",
        taiSan_tongSo_giaTri = "",
        taiSan_tongSo_tyLe = "",

        nguoiDaiDien_hoTen = "",
        nguoiDaiDien_ngaySinh = "",
        nguoiDaiDien_gioiTinh = "",
        nguoiDaiDien_cccd = "",
        nguoiDaiDien_chucDanh = "",
        nguoiDaiDien_soNha = "",
        nguoiDaiDien_xa = "",
        nguoiDaiDien_tinh = "",

        nguoiDaiDien_danToc = "",
        nguoiDaiDien_quocTich = "",
        nguoiDaiDien_soHoChieu = "",
        nguoiDaiDien_ngayCapHoChieu = "",
        nguoiDaiDien_noiCapHoChieu = "",
        nguoiDaiDien_thuongTru_soNha = "",
        nguoiDaiDien_thuongTru_xa = "",
        nguoiDaiDien_thuongTru_tinh = "",
        nguoiDaiDien_thuongTru_quocGia = "Việt Nam",

        giamDoc_hoTen = "",
        giamDoc_ngaySinh = "",
        giamDoc_gioiTinh = "",
        giamDoc_cccd = "",
        giamDoc_phone = "",

        keToan_hoTen = "",
        keToan_ngaySinh = "",
        keToan_gioiTinh = "",
        keToan_cccd = "",
        keToan_phone = "",
        thongBaoThue_soNha = "",
        thongBaoThue_xa = "",
        thongBaoThue_tinh = "",
        thongBaoThue_phone = "",
        thongBaoThue_fax = "",
        thongBaoThue_email = "",
        ngayBatDauHoatDong = "",
    } = dataJson;

    const addressToString = (soNha, xa, tinh) => {
        return [soNha, xa, tinh].filter(Boolean).join(", ");
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3 className={styles.nationTitle}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h3>
                <p className={styles.motto}>Độc lập - Tự do - Hạnh phúc</p>
                <div className={styles.line}></div>
                <p className={styles.dateRight}>
                    ......., ngày ....... tháng ....... năm .......
                </p>
            </div>

            <h2 className={styles.docTitle}>GIẤY ĐỀ NGHỊ ĐĂNG KÝ DOANH NGHIỆP<br/>CÔNG TY TRÁCH NHIỆM HỮU HẠN MỘT THÀNH VIÊN</h2>

            <div className={styles.content}>
                <p><strong>Kính gửi:</strong> {kinhGui}</p>

                <p>Tôi là (ghi họ tên bằng chữ in hoa): <strong style={{ textTransform: "uppercase" }}>{nguoiNop_hoTen}</strong></p>
                <div className={styles.flexRow}>
                    <p>Ngày, tháng, năm sinh: <strong>{nguoiNop_ngaySinh}</strong></p>
                    <p>Giới tính: <strong>{nguoiNop_gioiTinh}</strong></p>
                </div>
                <p>Số định danh cá nhân: <strong>{nguoiNop_cccd}</strong></p>
                <p>Địa chỉ liên lạc: <strong>{addressToString(lienLac_soNha, lienLac_xa, lienLac_tinh)}</strong></p>
                <div className={styles.flexRow}>
                    <p>Điện thoại: <strong>{nguoiNop_phone}</strong></p>
                    <p>Thư điện tử: <strong>{nguoiNop_email}</strong></p>
                </div>

                <p style={{ marginTop: "16px", fontStyle: "italic", fontSize: "14px" }}>
                    Trường hợp không có số định danh cá nhân hoặc việc kết nối giữa Cơ sở dữ liệu quốc gia về đăng ký doanh nghiệp với Cơ sở dữ liệu quốc gia về dân cư bị gián đoạn thì đề nghị kê khai các thông tin cá nhân dưới đây:
                </p>
                <div className={styles.flexRow}>
                    <p>Dân tộc: <strong>{nguoiNop_danToc}</strong></p>
                    <p>Quốc tịch: <strong>{nguoiNop_quocTich}</strong></p>
                </div>
                <p>Số hộ chiếu: <strong>{nguoiNop_soHoChieu}</strong></p>
                <div className={styles.flexRow}>
                    <p>Ngày cấp: <strong>{nguoiNop_ngayCapHoChieu}</strong></p>
                    <p>Nơi cấp: <strong>{nguoiNop_noiCapHoChieu}</strong></p>
                </div>
                <p>Nơi thường trú: <strong>{addressToString(nguoiNop_thuongTru_soNha, nguoiNop_thuongTru_xa, nguoiNop_thuongTru_tinh)}, Quốc gia: {nguoiNop_thuongTru_quocGia}</strong></p>

                <p style={{ marginTop: "16px", textIndent: "20px" }}>
                    Đăng ký công ty trách nhiệm hữu hạn một thành viên do tôi là người đại diện theo pháp luật với các nội dung sau:
                </p>

                <div className={styles.sectionBlock}>
                    <p className={styles.sectionTitle}>1. Tình trạng thành lập:</p>
                    <p className={styles.indent}>Thành lập mới [ <strong>X</strong> ]</p>
                </div>

                <div className={styles.sectionBlock}>
                    <p className={styles.sectionTitle}>2. Tên công ty:</p>
                    <p className={styles.indent}>Tên công ty viết bằng tiếng Việt (ghi bằng chữ in hoa): <strong style={{ textTransform: "uppercase" }}>{tenCongTyVN}</strong></p>
                    <p className={styles.indent}>Tên công ty viết bằng tiếng nước ngoài: <strong>{tenCongTyEN}</strong></p>
                    <p className={styles.indent}>Tên công ty viết tắt: <strong>{tenCongTyVietTat}</strong></p>
                </div>

                <div className={styles.sectionBlock}>
                    <p className={styles.sectionTitle}>3. Địa chỉ trụ sở chính:</p>
                    <p className={styles.indent}>Địa chỉ: <strong>{addressToString(truSo_soNha, truSo_xa, truSo_tinh)}</strong></p>
                    <div className={styles.flexRow} style={{ paddingLeft: "20px" }}>
                        <p>Điện thoại: <strong>{truSo_phone}</strong></p>
                        <p>Số fax: <strong>{truSo_fax}</strong></p>
                    </div>
                    <div className={styles.flexRow} style={{ paddingLeft: "20px" }}>
                        <p>Thư điện tử: <strong>{truSo_email}</strong></p>
                        <p>Website: <strong>{truSo_website}</strong></p>
                    </div>
                </div>

                <div className={styles.sectionBlock}>
                    <p className={styles.sectionTitle}>4. Ngành, nghề kinh doanh:</p>
                    {(nganhNgheList || []).length > 0 ? (
                        <div className={styles.indent}>
                            <NganhNgheTable data={nganhNgheList || []} readOnly />
                        </div>
                    ) : (
                        <p className={styles.indent}><i>Chưa khai báo ngành nghề kinh doanh.</i></p>
                    )}
                </div>

                <div className={styles.sectionBlock}>
                    <p className={styles.sectionTitle}>5. Chủ sở hữu:</p>
                    <p className={styles.indent}>Họ, chữ đệm và tên (ghi bằng chữ in hoa): <strong style={{ textTransform: "uppercase" }}>{chuSoHuu_hoTen}</strong></p>
                    <div className={styles.flexRow} style={{ paddingLeft: "20px" }}>
                        <p>Ngày, tháng, năm sinh: <strong>{chuSoHuu_ngaySinh}</strong></p>
                        <p>Giới tính: <strong>{chuSoHuu_gioiTinh}</strong></p>
                    </div>
                    <p className={styles.indent}>Số định danh cá nhân: <strong>{chuSoHuu_cccd}</strong></p>
                    <p className={styles.indent}>Địa chỉ liên lạc: <strong>{addressToString(chuSoHuu_soNha, chuSoHuu_xa, chuSoHuu_tinh)}</strong></p>
                    <div className={styles.flexRow} style={{ paddingLeft: "20px" }}>
                        <p>Điện thoại: <strong>{chuSoHuu_phone}</strong></p>
                        <p>Thư điện tử: <strong>{chuSoHuu_email}</strong></p>
                    </div>

                    <p style={{ marginTop: "16px", fontStyle: "italic", fontSize: "14px" }}>
                        Trường hợp không có số định danh cá nhân hoặc việc kết nối giữa Cơ sở dữ liệu quốc gia về đăng ký doanh nghiệp với Cơ sở dữ liệu quốc gia về dân cư bị gián đoạn thì đề nghị kê khai các thông tin cá nhân dưới đây:
                    </p>
                    <div className={styles.flexRow}>
                        <p>Dân tộc: <strong>{chuSoHuu_danToc}</strong></p>
                        <p>Quốc tịch: <strong>{chuSoHuu_quocTich}</strong></p>
                    </div>
                    <p>Số hộ chiếu: <strong>{chuSoHuu_soHoChieu}</strong></p>
                    <div className={styles.flexRow}>
                        <p>Ngày cấp: <strong>{chuSoHuu_ngayCapHoChieu}</strong></p>
                        <p>Nơi cấp: <strong>{chuSoHuu_noiCapHoChieu}</strong></p>
                    </div>
                    <p>Nơi thường trú: <strong>{addressToString(chuSoHuu_thuongTru_soNha, chuSoHuu_thuongTru_xa, chuSoHuu_thuongTru_tinh)}, Quốc gia: {chuSoHuu_thuongTru_quocGia}</strong></p>

                    <p style={{ marginTop: "16px", fontStyle: "italic", fontSize: "14px" }}>
                        Thông tin về Giấy chứng nhận đăng ký đầu tư (chỉ kê khai nếu chủ sở hữu là nhà đầu tư nước ngoài):
                    </p>
                    <p>Mã số dự án: <strong>{chuSoHuu_maSoDuAn}</strong></p>
                    <div className={styles.flexRow}>
                        <p>Ngày cấp: <strong>{chuSoHuu_ngayCapDuAn}</strong></p>
                        <p>Cơ quan cấp: <strong>{chuSoHuu_coQuanCapDuAn}</strong></p>
                    </div>
                </div>

                <div className={styles.sectionBlock}>
                    <p className={styles.sectionTitle}>6. Vốn điều lệ:</p>
                    <p className={styles.indent}>Vốn điều lệ (bằng số; VNĐ): <strong>{vonDieuLe}</strong></p>
                    <p className={styles.indent}>Vốn điều lệ (bằng chữ; VNĐ): <strong>{vonDieuLe_bangChu}</strong></p>
                    <p className={styles.indent}>Giá trị tương đương theo đơn vị ngoại tệ: <strong>{vonDieuLe_ngoaiTe}</strong></p>
                </div>

                <div className={styles.sectionBlock}>
                    <p className={styles.sectionTitle}>7. Nguồn vốn điều lệ:</p>
                    <table className={styles.normalTable}>
                        <thead>
                            <tr>
                                <th>Loại nguồn vốn</th>
                                <th>Số tiền (VNĐ)</th>
                                <th>Tỷ lệ (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Vốn ngân sách nhà nước</td>
                                <td>{nguonVon_nganSach_soTien}</td>
                                <td>{nguonVon_nganSach_tyLe}</td>
                            </tr>
                            <tr>
                                <td>Vốn tư nhân</td>
                                <td>{nguonVon_tuNhan_soTien}</td>
                                <td>{nguonVon_tuNhan_tyLe}</td>
                            </tr>
                            <tr>
                                <td>Vốn nước ngoài</td>
                                <td>{nguonVon_nuocNgoai_soTien}</td>
                                <td>{nguonVon_nuocNgoai_tyLe}</td>
                            </tr>
                            <tr>
                                <td>Vốn khác</td>
                                <td>{nguonVon_khac_soTien}</td>
                                <td>{nguonVon_khac_tyLe}</td>
                            </tr>
                            <tr>
                                <td><strong>Tổng cộng</strong></td>
                                <td><strong>{nguonVon_tongCong_soTien}</strong></td>
                                <td><strong>{nguonVon_tongCong_tyLe}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={styles.sectionBlock}>
                    <p className={styles.sectionTitle}>8. Tài sản góp vốn:</p>
                    <table className={styles.normalTable}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tài sản góp vốn</th>
                                <th>Giá trị vốn (VNĐ)</th>
                                <th>Tỷ lệ (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>1</td><td>Đồng Việt Nam</td><td>{taiSan_dongVN_giaTri}</td><td>{taiSan_dongVN_tyLe}</td></tr>
                            <tr><td>2</td><td>Ngoại tệ tự do chuyển đổi</td><td>{taiSan_ngoaiTe_giaTri}</td><td>{taiSan_ngoaiTe_tyLe}</td></tr>
                            <tr><td>3</td><td>Vàng</td><td>{taiSan_vang_giaTri}</td><td>{taiSan_vang_tyLe}</td></tr>
                            <tr><td>4</td><td>Quyền sử dụng đất</td><td>{taiSan_qsdDat_giaTri}</td><td>{taiSan_qsdDat_tyLe}</td></tr>
                            <tr><td>5</td><td>Quyền sở hữu trí tuệ</td><td>{taiSan_shtt_giaTri}</td><td>{taiSan_shtt_tyLe}</td></tr>
                            <tr><td>6</td><td>Các tài sản khác</td><td>{taiSan_khac_giaTri}</td><td>{taiSan_khac_tyLe}</td></tr>
                            <tr>
                                <td colSpan={2}><strong>Tổng số</strong></td>
                                <td><strong>{taiSan_tongSo_giaTri}</strong></td>
                                <td><strong>{taiSan_tongSo_tyLe}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={styles.sectionBlock}>
                    <p className={styles.sectionTitle}>9. Người đại diện theo pháp luật:</p>
                    <p className={styles.indent}>Họ, chữ đệm và tên (ghi bằng chữ in hoa): <strong style={{ textTransform: "uppercase" }}>{nguoiDaiDien_hoTen}</strong></p>
                    <div className={styles.flexRow} style={{ paddingLeft: "20px" }}>
                        <p>Ngày, tháng, năm sinh: <strong>{nguoiDaiDien_ngaySinh}</strong></p>
                        <p>Giới tính: <strong>{nguoiDaiDien_gioiTinh}</strong></p>
                    </div>
                    <p className={styles.indent}>Số định danh cá nhân: <strong>{nguoiDaiDien_cccd}</strong></p>
                    <p className={styles.indent}>Chức danh: <strong>{nguoiDaiDien_chucDanh}</strong></p>
                    <p className={styles.indent}>Địa chỉ liên lạc: <strong>{addressToString(nguoiDaiDien_soNha, nguoiDaiDien_xa, nguoiDaiDien_tinh)}</strong></p>

                    <p style={{ marginTop: "16px", fontStyle: "italic", fontSize: "14px" }}>
                        Trường hợp không có số định danh cá nhân hoặc việc kết nối giữa Cơ sở dữ liệu quốc gia về đăng ký doanh nghiệp với Cơ sở dữ liệu quốc gia về dân cư bị gián đoạn thì đề nghị kê khai các thông tin cá nhân dưới đây:
                    </p>
                    <div className={styles.flexRow}>
                        <p>Dân tộc: <strong>{nguoiDaiDien_danToc}</strong></p>
                        <p>Quốc tịch: <strong>{nguoiDaiDien_quocTich}</strong></p>
                    </div>
                    <p>Số hộ chiếu: <strong>{nguoiDaiDien_soHoChieu}</strong></p>
                    <div className={styles.flexRow}>
                        <p>Ngày cấp: <strong>{nguoiDaiDien_ngayCapHoChieu}</strong></p>
                        <p>Nơi cấp: <strong>{nguoiDaiDien_noiCapHoChieu}</strong></p>
                    </div>
                    <p>Nơi thường trú: <strong>{addressToString(nguoiDaiDien_thuongTru_soNha, nguoiDaiDien_thuongTru_xa, nguoiDaiDien_thuongTru_tinh)}, Quốc gia: {nguoiDaiDien_thuongTru_quocGia}</strong></p>
                </div>

                <div className={styles.sectionBlock}>
                    <p className={styles.sectionTitle}>10. Thông tin đăng ký thuế:</p>
                    <div className={styles.indent}>
                        <p><strong>10.1 Thông tin về Giám đốc/Tổng giám đốc (nếu có):</strong></p>
                        <p style={{ paddingLeft: "20px" }}>Họ, chữ đệm và tên: <strong>{giamDoc_hoTen}</strong></p>
                        <p style={{ paddingLeft: "20px" }}>Ngày sinh: <strong>{giamDoc_ngaySinh}</strong> | Giới tính: <strong>{giamDoc_gioiTinh}</strong></p>
                        <p style={{ paddingLeft: "20px" }}>Số định danh cá nhân: <strong>{giamDoc_cccd}</strong> | Điện thoại: <strong>{giamDoc_phone}</strong></p>

                        <p style={{ marginTop: "10px" }}><strong>10.2 Thông tin về Kế toán trưởng/Phụ trách kế toán (nếu có):</strong></p>
                        <p style={{ paddingLeft: "20px" }}>Họ, chữ đệm và tên: <strong>{keToan_hoTen}</strong></p>
                        <p style={{ paddingLeft: "20px" }}>Ngày sinh: <strong>{keToan_ngaySinh}</strong> | Giới tính: <strong>{keToan_gioiTinh}</strong></p>
                        <p style={{ paddingLeft: "20px" }}>Số định danh cá nhân: <strong>{keToan_cccd}</strong> | Điện thoại: <strong>{keToan_phone}</strong></p>

                        <p style={{ marginTop: "10px" }}><strong>10.3 Địa chỉ nhận thông báo thuế:</strong></p>
                        <p style={{ paddingLeft: "20px" }}>Địa chỉ: <strong>{addressToString(thongBaoThue_soNha, thongBaoThue_xa, thongBaoThue_tinh)}</strong></p>
                        <p style={{ paddingLeft: "20px" }}>Điện thoại: <strong>{thongBaoThue_phone}</strong> | Fax: <strong>{thongBaoThue_fax}</strong> | Email: <strong>{thongBaoThue_email}</strong></p>

                        <p style={{ marginTop: "10px" }}><strong>10.4 Ngày bắt đầu hoạt động:</strong> <strong>{ngayBatDauHoatDong}</strong></p>
                    </div>
                </div>

            </div>

            <div className={styles.signatureBlock}>
                <p className={styles.signatureTitle}>NGƯỜI ĐẠI DIỆN THEO PHÁP LUẬT CỦA CÔNG TY</p>
                <p className={styles.signatureSubtitle}>(Ký và ghi họ tên)</p>
            </div>
        </div>
    );
}

export default GiayDeNghiDKDNConfirmation;
