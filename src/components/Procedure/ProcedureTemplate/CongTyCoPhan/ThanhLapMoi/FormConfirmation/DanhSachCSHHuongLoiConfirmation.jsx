import React from "react";
import styles from "@/components/Procedure/ProcedureTemplate/CongTyTNHH1TV/ThanhLapMoi/FormConfirmation/DanhSachCSHHuongLoiConfirmation.module.css";
import CurrentDate from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/CurrentDate/CurrentDate";

function DanhSachCSHHuongLoiConfirmation({ dataJson }) {
    const rows = dataJson?.cshHuongLoiList || [];
    const {
        chuKy_ten = "",
        chuKy_hoTen = "",
    } = dataJson || {};

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.tableTitle}>DANH SÁCH CHỦ SỞ HỮU HƯỞNG LỢI CỦA DOANH NGHIỆP</h2>

            <div className={styles.tableScrollWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th rowSpan={2} className={styles.th}>STT</th>
                            <th rowSpan={2} className={styles.th}>Họ và tên</th>
                            <th rowSpan={2} className={styles.th}>Ngày, tháng, năm sinh</th>
                            <th rowSpan={2} className={styles.th}>Giới tính</th>
                            <th rowSpan={2} className={styles.th}>
                                Số, ngày cấp, cơ quan cấp Giấy tờ pháp lý của cá nhân
                            </th>
                            <th rowSpan={2} className={styles.th}>Quốc tịch</th>
                            <th rowSpan={2} className={styles.th}>Dân tộc</th>
                            <th rowSpan={2} className={styles.th}>Địa chỉ liên lạc</th>
                            <th colSpan={3} className={styles.th}>
                                Chủ sở hữu hưởng lợi của doanh nghiệp
                            </th>
                            <th rowSpan={2} className={styles.th}>Ghi chú (nếu có)</th>
                        </tr>
                        <tr>
                            <th className={styles.th}>Tỷ lệ sở hữu cổ phần vốn điều lệ</th>
                            <th className={styles.th}>Tỷ lệ sở hữu cổ phần co quyền biểu quyết</th>
                            <th className={styles.th}>Quyền chi phối</th>
                        </tr>
                        <tr className={styles.colNumberRow}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                                <td key={n} className={styles.colNumber}>{n}</td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td colSpan={12} className={styles.emptyCell}>
                                    Chưa có dữ liệu chủ sở hữu hưởng lợi.
                                </td>
                            </tr>
                        ) : (
                            rows.map((row, idx) => (
                                <tr key={idx}>
                                    <td className={styles.td} style={{ textAlign: "center" }}>{idx + 1}</td>
                                    <td className={styles.td}>{row.hoTen}</td>
                                    <td className={styles.td} style={{ textAlign: "center", whiteSpace: "nowrap" }}>{row.ngaySinh}</td>
                                    <td className={styles.td} style={{ textAlign: "center" }}>{row.gioiTinh}</td>
                                    <td className={styles.td}>{row.giaTo}</td>
                                    <td className={styles.td} style={{ textAlign: "center" }}>{row.quocTich}</td>
                                    <td className={styles.td} style={{ textAlign: "center" }}>{row.danToc}</td>
                                    <td className={styles.td} style={{ minWidth: 250 }}>{row.diaChiLienLac}</td>
                                    <td className={styles.td} style={{ textAlign: "center" }}>{row.tyLeSoHuuVon}</td>
                                    <td className={styles.td} style={{ textAlign: "center" }}>{row.tyLeSoHuuBieuQuyet}</td>
                                    <td className={styles.td} style={{ textAlign: "center" }}>{row.quyenChiPhoi}</td>
                                    <td className={styles.td}>{row.ghiChu}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: "20px", fontSize: "14px", lineHeight: "1.6", fontStyle: "italic" }}>
                <p>Nếu cột số 5 kê khai Số định danh cá nhân thì không phải kê khai các cột số 6, 7.</p>
                <p>Trường hợp CSHHL thông qua sở hữu vốn điều lệ hoặc tổng số cổ phần có quyền biểu quyết được xác định như sau:</p>
                <ul style={{ paddingLeft: "20px" }}>
                    <li>Cá nhân là cổ đông sở hữu từ 25% tổng số cổ phần có quyền biểu quyết trở lên;</li>
                    <li>Cá nhân là thành viên sở hữu từ 25% vốn điều lệ trở lên của công ty trách nhiệm hữu hạn hai thành viên trở lên;</li>
                    <li>Cá nhân là chủ sở hữu công ty trách nhiệm hữu hạn một thành viên;</li>
                    <li>Cá nhân là thành viên hợp danh công ty hợp danh.</li>
                </ul>
                <p>Tỷ lệ sở hữu cổ phần có quyền biểu quyết = Số cổ phần có quyền biểu quyết của chủ sở hữu hưởng lợi / tổng số cổ phần có quyền biểu quyết của công ty cổ phần.</p>
                <p>Nếu doanh nghiệp xác định được chủ sở hữu hưởng lợi của doanh nghiệp theo quy định tại điểm b khoản 1 Điều 17 Nghị định số 168/2025/NĐ-CP thông qua quyền chi phối, doanh nghiệp ghi rõ một trong các quyền chi phối sau: bổ nhiệm, miễn nhiệm hoặc bãi nhiệm đa số hoặc tất cả thành viên hội đồng quản trị, chủ tịch hội đồng quản trị, chủ tịch hội đồng thành viên; người đại diện theo pháp luật, giám đốc hoặc tổng giám đốc của doanh nghiệp; sửa đổi, bổ sung điều lệ của doanh nghiệp; thay đổi cơ cấu tổ chức quản lý công ty; tổ chức lại, giải thể công ty.</p>
            </div>

            <div className={styles.signatureBlock}>
                <p className={styles.signatureDate}><CurrentDate /></p>
                <p className={styles.signatureTitle}>NGƯỜI ĐẠI DIỆN THEO PHÁP LUẬT /<br />QUẢN TRỊ CỦA CÔNG TY</p>
                <p className={styles.signatureSubtitle}>(<em>Ký và ghi họ tên</em>)</p>

                <p style={{ marginTop: "20px" }}><strong>{chuKy_ten}</strong></p>
                <p style={{ marginTop: "20px", textTransform: "uppercase" }}><strong>{chuKy_hoTen}</strong></p>
            </div>
        </div>
    );
}

export default DanhSachCSHHuongLoiConfirmation;
