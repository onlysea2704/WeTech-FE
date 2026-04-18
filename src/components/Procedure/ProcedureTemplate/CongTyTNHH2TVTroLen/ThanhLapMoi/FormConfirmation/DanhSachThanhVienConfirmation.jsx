import React from "react";
import { formatDate } from "@/utils/dateTimeUtils";
// Import styles from CongTyTNHH1TV
import styles from "@/components/Procedure/ProcedureTemplate/CongTyTNHH1TV/ThanhLapMoi/FormConfirmation/DanhSachCSHHuongLoiConfirmation.module.css";
import CurrentDate from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/CurrentDate/CurrentDate";

function DanhSachThanhVienConfirmation({ dataJson }) {
    const rows = dataJson?.thanhVienList || [];
    const {
        chuKy_ten = "",
        chuKy_hoTen = "",
    } = dataJson || {};

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.tableTitle} style={{ textAlign: "center", marginTop: "12px", marginBottom: "6px" }}>DANH SÁCH THÀNH VIÊN CÔNG TY TRÁCH NHIỆM HỮU HẠN HAI THÀNH VIÊN TRỞ LÊN</h2>

            <div className={styles.tableScrollWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th rowSpan={2} className={styles.th}>STT</th>
                            <th rowSpan={2} className={styles.th}>Tên thành viên</th>
                            <th rowSpan={2} className={styles.th}>Ngày, tháng, năm sinh đối với thành viên là cá nhân</th>
                            <th rowSpan={2} className={styles.th}>Giới tính</th>
                            <th rowSpan={2} className={styles.th}>
                                Loại giấy tờ, số, ngày cấp, cơ quan cấp Giấy tờ pháp lý của cá nhân
                            </th>
                            <th rowSpan={2} className={styles.th}>Quốc tịch</th>
                            <th rowSpan={2} className={styles.th}>Dân tộc</th>
                            <th rowSpan={2} className={styles.th}>Địa chỉ liên lạc</th>
                            <th colSpan={3} className={styles.th}>
                                Vốn góp
                            </th>
                            <th rowSpan={2} className={styles.th}>Thời hạn góp vốn</th>
                            <th rowSpan={2} className={styles.th}>Chữ ký của thành viên</th>
                            <th rowSpan={2} className={styles.th}>Ghi chú (nếu có)</th>
                        </tr>
                        <tr>
                            <th className={styles.th}>Phần vốn góp (bằng số; VNĐ và giá trị tương đương theo đơn vị tiền nước ngoài: bằng số, loại ngoại tệ, nếu có)</th>
                            <th className={styles.th}>Tỷ lệ (%)</th>
                            <th className={styles.th}>Loại tài sản, số lượng, giá trị tài sản góp vốn</th>
                        </tr>
                        <tr className={styles.colNumberRow}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((n) => (
                                <td key={n} className={styles.colNumber}>{n}</td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td colSpan={14} className={styles.emptyCell}>
                                    Chưa có dữ liệu thành viên.
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

                                    <td className={styles.td} style={{ textAlign: "center" }}>
                                        {row.phanVonGop ? `${row.phanVonGop} VNĐ` : ""}
                                        {row.phanVonGopNgoaiTe_GiaTri ? <><br />({row.phanVonGopNgoaiTe_GiaTri} {row.phanVonGopNgoaiTe_Loai})</> : ""}
                                    </td>
                                    <td className={styles.td} style={{ textAlign: "center" }}>{row.tyLe ? row.tyLe + '%' : ''}</td>
                                    <td className={styles.td} style={{ textAlign: "center" }}>{row.loaiTaiSan}</td>

                                    <td className={styles.td} style={{ textAlign: "center" }}>{row.thoiHan}</td>
                                    <td className={styles.td}>{row.chuKy}</td>
                                    <td className={styles.td}>{row.ghiChu}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className={styles.signatureBlock}>
                <p className={styles.signatureDate}><CurrentDate /></p>
                <p className={styles.signatureTitle}>NGƯỜI ĐẠI DIỆN THEO PHÁP LUẬT<br />CỦA CÔNG TY</p>
                <p className={styles.signatureSubtitle}>(<em>Ký và ghi họ tên</em>)</p>
            </div>
        </div>
    );
}

export default DanhSachThanhVienConfirmation;
