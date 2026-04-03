import React from "react";
import { formatDate } from "@/utils/dateTimeUtils";
import styles from "@/components/Procedure/ProcedureTemplate/CongTyTNHH1TV/ThanhLapMoi/FormConfirmation/DanhSachCSHHuongLoiConfirmation.module.css";
import CurrentDate from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/CurrentDate/CurrentDate";

function DanhSachCoDongSangLapConfirmation({ dataJson }) {
    const rows = dataJson?.coDongList || [];
    const loaiCoPhanKhacTen = dataJson?.loaiCoPhanKhac_ten || "........";
    const {
        chuKy_ten = "",
        chuKy_hoTen = "",
    } = dataJson || {};

    return (
        <div className={styles.wrapper}>
            <div style={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold", fontSize: "16px" }}>
                DANH SÁCH CỔ ĐÔNG SÁNG LẬP CÔNG TY CỔ PHẦN
            </div>

            <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
                I. Cổ đông sáng lập là cá nhân
            </div>

            <div className={styles.tableScrollWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th rowSpan={4} className={styles.th} style={{ minWidth: 40 }}>STT</th>
                            <th rowSpan={4} className={styles.th} style={{ minWidth: 150 }}>Tên cổ đông sáng lập</th>
                            <th rowSpan={4} className={styles.th} style={{ minWidth: 120 }}>Ngày, tháng, năm sinh</th>
                            <th rowSpan={4} className={styles.th} style={{ minWidth: 80 }}>Giới tính</th>
                            <th rowSpan={4} className={styles.th} style={{ minWidth: 180 }}>
                                Loại giấy tờ, số, ngày cấp, cơ quan cấp Giấy tờ pháp lý của cá nhân
                            </th>
                            <th rowSpan={4} className={styles.th} style={{ minWidth: 100 }}>Quốc tịch</th>
                            <th rowSpan={4} className={styles.th} style={{ minWidth: 100 }}>Dân tộc</th>
                            <th rowSpan={4} className={styles.th} style={{ minWidth: 150 }}>Địa chỉ liên lạc</th>
                            <th colSpan={8} className={styles.th}>Vốn góp²</th>
                            <th rowSpan={4} className={styles.th} style={{ minWidth: 120 }}>Thời hạn góp vốn⁴</th>
                            <th rowSpan={4} className={styles.th} style={{ minWidth: 100 }}>Chữ ký của cổ đông sáng lập⁵</th>
                            <th rowSpan={4} className={styles.th} style={{ minWidth: 120 }}>Ghi chú (nếu có)</th>
                        </tr>
                        <tr>
                            <th colSpan={2} className={styles.th}>Tổng số cổ phần</th>
                            <th rowSpan={3} className={styles.th} style={{ minWidth: 60 }}>Tỷ lệ (%)</th>
                            <th colSpan={4} className={styles.th}>Loại cổ phần</th>
                            <th rowSpan={3} className={styles.th} style={{ minWidth: 160 }}>Loại tài sản, số lượng, giá trị tài sản góp vốn³</th>
                        </tr>
                        <tr>
                            <th rowSpan={2} className={styles.th} style={{ minWidth: 100 }}>Số lượng</th>
                            <th rowSpan={2} className={styles.th} style={{ minWidth: 100 }}>Giá trị</th>
                            <th colSpan={2} className={styles.th}>Phổ thông</th>
                            <th colSpan={2} className={styles.th}>Khác (ghi rõ): {loaiCoPhanKhacTen}</th>
                        </tr>
                        <tr>
                            <th className={styles.th} style={{ minWidth: 100 }}>Số lượng</th>
                            <th className={styles.th} style={{ minWidth: 100 }}>Giá trị</th>
                            <th className={styles.th} style={{ minWidth: 100 }}>Số lượng</th>
                            <th className={styles.th} style={{ minWidth: 100 }}>Giá trị</th>
                        </tr>
                        <tr className={styles.colNumberRow}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((n) => (
                                <td key={n} className={styles.colNumber}>{n}</td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td colSpan={19} className={styles.emptyCell}>
                                    Chưa có dữ liệu cổ đông sáng lập.
                                </td>
                            </tr>
                        ) : (
                            rows.map((row, idx) => (
                                <tr key={idx}>
                                    <td className={styles.td} style={{ textAlign: "center" }}>{idx + 1}</td>
                                    <td className={styles.td}>{row.hoTen}</td>
                                    <td className={styles.td} style={{ textAlign: "center", whiteSpace: "nowrap" }}>{formatDate(row.ngaySinh)}</td>
                                    <td className={styles.td} style={{ textAlign: "center" }}>{row.gioiTinh}</td>
                                    <td className={styles.td}>{row.giaTo}</td>
                                    <td className={styles.td} style={{ textAlign: "center" }}>{row.quocTich}</td>
                                    <td className={styles.td} style={{ textAlign: "center" }}>{row.danToc}</td>
                                    <td className={styles.td} style={{ minWidth: 250 }}>{row.diaChiLienLac}</td>

                                    {/* Vốn góp */}
                                    <td className={styles.td} style={{ textAlign: "center" }}>{row.tongSoCoPhan_soLuong}</td>
                                    <td className={styles.td} style={{ textAlign: "center" }}>{row.tongSoCoPhan_giaTri}</td>
                                    <td className={styles.td} style={{ textAlign: "center" }}>{row.tyLe}</td>
                                    <td className={styles.td} style={{ textAlign: "center" }}>{row.loaiCoPhan_phoThong_soLuong}</td>
                                    <td className={styles.td} style={{ textAlign: "center" }}>{row.loaiCoPhan_phoThong_giaTri}</td>
                                    <td className={styles.td} style={{ textAlign: "center" }}>{row.loaiCoPhan_khac_soLuong}</td>
                                    <td className={styles.td} style={{ textAlign: "center" }}>{row.loaiCoPhan_khac_giaTri}</td>
                                    <td className={styles.td} style={{ textAlign: "center" }}>{row.loaiTaiSanGopVon}</td>

                                    <td className={styles.td} style={{ textAlign: "center" }}>{row.thoiHanGopVon}</td>
                                    <td className={styles.td} style={{ backgroundColor: "#fdfdfd" }}>
                                        {/* Physical Signature space */}
                                    </td>
                                    <td className={styles.td}>{row.ghiChu}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: "20px", fontSize: "14px", lineHeight: "1.6" }}>
                <p>² Ghi giá trị vốn cổ phần của từng cổ đông sáng lập. Tài sản hình thành giá trị vốn cổ phần cần được liệt kê cụ thể...</p>
                <p>³ Loại tài sản góp vốn bao gồm: Đồng Việt Nam; Ngoại tệ tự do chuyển đổi...</p>
                <p>⁴ Khi đăng ký thành lập doanh nghiệp, thời hạn góp vốn là thời hạn cổ đông dự kiến hoàn thành góp vốn.</p>
            </div>

            <div className={styles.signatureBlock}>
                <p className={styles.signatureDate}><CurrentDate /></p>
                <p className={styles.signatureTitle}>NGƯỜI ĐẠI DIỆN THEO PHÁP LUẬT<br />CỦA CÔNG TY</p>
                <p className={styles.signatureSubtitle}>(<em>Ký và ghi họ tên</em>)</p>

                <p style={{ marginTop: "40px", textTransform: "uppercase" }}><strong>{chuKy_hoTen}</strong></p>
                <p style={{ marginTop: "10px" }}><strong>{chuKy_ten}</strong></p>
            </div>
        </div>
    );
}

export default DanhSachCoDongSangLapConfirmation;
