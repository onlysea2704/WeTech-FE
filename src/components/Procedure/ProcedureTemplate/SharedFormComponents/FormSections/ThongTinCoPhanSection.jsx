import React from "react";

export default function ThongTinCoPhanSection({ dataJson, styles }) {
    const table1Rows = [
        { label: "Cổ phần phổ thông", key: "cptt" },
        { label: "Cổ phần ưu đãi biểu quyết", key: "cpudbq" },
        { label: "Cổ phần ưu đãi cổ tức", key: "cpudct" },
        { label: "Cổ phần ưu đãi hoàn lại", key: "cpudhl" },
        { label: "Các cổ phần ưu đãi khác", key: "cpudk" },
    ];

    const table2Rows = [
        { label: "Cổ phần phổ thông", key: "cb_cptt" },
        { label: "Cổ phần ưu đãi biểu quyết", key: "cb_cpudbq" },
        { label: "Cổ phần ưu đãi cổ tức", key: "cb_cpudct" },
        { label: "Cổ phần ưu đãi hoàn lại", key: "cb_cpudhl" },
        { label: "Cổ phần ưu đãi khác", key: "cb_cpudk" },
    ];

    return (
        <div className={styles.sectionGroup}>
            <h3 className={styles.sectionTitle}>Thông tin về cổ phần:</h3>

            <div className={styles.formGroup} style={{ marginBottom: "16px" }}>
                <label className={styles.label}>Mệnh giá cổ phần (VNĐ):</label>
                <input
                    type="text"
                    className={styles.input}
                    name="menhGiaCoPhan"
                    defaultValue={dataJson?.menhGiaCoPhan || ""}
                    style={{ maxWidth: "300px" }}
                />
            </div>

            <div className={styles.tableScrollWrapper} style={{ marginBottom: "20px" }}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Loại cổ phần</th>
                            <th>Số lượng</th>
                            <th>Giá trị (bằng số, VNĐ)</th>
                            <th>Tỉ lệ so với vốn điều lệ (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table1Rows.map((row, idx) => (
                            <tr key={idx}>
                                <td style={{ textAlign: "center" }}>{idx + 1}</td>
                                <td>{row.label}</td>
                                <td>
                                    <input
                                        type="text"
                                        className={styles.input}
                                        name={`cp_${row.key}_soLuong`}
                                        defaultValue={dataJson?.[`cp_${row.key}_soLuong`] || ""}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className={styles.input}
                                        name={`cp_${row.key}_giaTri`}
                                        defaultValue={dataJson?.[`cp_${row.key}_giaTri`] || ""}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className={styles.input}
                                        name={`cp_${row.key}_tiLe`}
                                        defaultValue={dataJson?.[`cp_${row.key}_tiLe`] || ""}
                                    />
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={2} style={{ textAlign: "center", fontWeight: "bold" }}>Tổng số</td>
                            <td>
                                <input
                                    type="text"
                                    className={styles.input}
                                    name="cp_tongSoLuong"
                                    defaultValue={dataJson?.cp_tongSoLuong || ""}
                                    style={{ fontWeight: "bold" }}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className={styles.input}
                                    name="cp_tongGiaTri"
                                    defaultValue={dataJson?.cp_tongGiaTri || ""}
                                    style={{ fontWeight: "bold" }}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className={styles.input}
                                    name="cp_tongTiLe"
                                    defaultValue={dataJson?.cp_tongTiLe || ""}
                                    style={{ fontWeight: "bold" }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p className={styles.sectionTitle} style={{ fontWeight: "500", marginBottom: "8px" }}>Thông tin về cổ phần được quyền chào bán:</p>
            <div className={styles.tableScrollWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th style={{ width: "60px" }}>STT</th>
                            <th>Loại cổ phần được quyền chào bán</th>
                            <th>Số lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table2Rows.map((row, idx) => (
                            <tr key={idx}>
                                <td style={{ textAlign: "center" }}>{idx + 1}</td>
                                <td>{row.label}</td>
                                <td>
                                    <input
                                        type="text"
                                        className={styles.input}
                                        name={`cp_${row.key}_soLuong`}
                                        defaultValue={dataJson?.[`cp_${row.key}_soLuong`] || ""}
                                    />
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={2} style={{ textAlign: "center", fontWeight: "bold" }}>Tổng số</td>
                            <td>
                                <input
                                    type="text"
                                    className={styles.input}
                                    name="cp_cb_tongSoLuong"
                                    defaultValue={dataJson?.cp_cb_tongSoLuong || ""}
                                    style={{ fontWeight: "bold" }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
