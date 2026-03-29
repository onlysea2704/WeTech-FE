import { useRef } from "react";

export default function NguonVonDieuLeSection({ dataJson, styles }) {
    const tableRef = useRef(null);

    const handleChange = () => {
        if (!tableRef.current) return;
        const table = tableRef.current;
        const prefixes = ["nguonVon_nganSach", "nguonVon_tuNhan", "nguonVon_nuocNgoai", "nguonVon_khac"];
        let totalSoTien = 0;
        let totalTyLe = 0;
        prefixes.forEach(p => {
            const stInput = table.querySelector(`[name="${p}_soTien"]`);
            const tlInput = table.querySelector(`[name="${p}_tyLe"]`);
            const st = parseFloat(stInput?.value.replace(/\./g, '').replace(/,/g, '.')) || 0;
            const tl = parseFloat(tlInput?.value.replace(/,/g, '.')) || 0;
            totalSoTien += st;
            totalTyLe += tl;
        });
        const tongSoTienInput = table.querySelector('[name="nguonVon_tongCong_soTien"]');
        const tongTyLeInput = table.querySelector('[name="nguonVon_tongCong_tyLe"]');
        if (tongSoTienInput) tongSoTienInput.value = totalSoTien ? totalSoTien.toLocaleString('vi-VN') : "";
        if (tongTyLeInput) tongTyLeInput.value = totalTyLe ? totalTyLe : "";
    };

    return (
        <div className={styles.sectionGroup}>
            <h3 className={styles.sectionTitle} style={{ marginTop: "12px" }}>Nguồn vốn điều lệ:</h3>
            <table ref={tableRef} className={styles.table} onChange={handleChange}>
                <thead>
                    <tr>
                        <th>Loại nguồn vốn</th>
                        <th>Số tiền (bằng số; VNĐ và giá trị tương đương theo đơn vị tiền nước ngoài, nếu có)</th>
                        <th style={{ width: "100px" }}>Tỷ lệ (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        { label: "Vốn ngân sách nhà nước", namePrefix: "nguonVon_nganSach" },
                        { label: "Vốn tư nhân", namePrefix: "nguonVon_tuNhan" },
                        { label: "Vốn nước ngoài", namePrefix: "nguonVon_nuocNgoai" },
                        { label: "Vốn khác", namePrefix: "nguonVon_khac" },
                        { label: "Tổng cộng", namePrefix: "nguonVon_tongCong", readOnly: true },
                    ].map(({ label, namePrefix, readOnly }) => (
                        <tr key={namePrefix}>
                            <td>{label}</td>
                            <td>
                                <input
                                    type="text"
                                    className={styles.tableInput}
                                    name={`${namePrefix}_soTien`}
                                    defaultValue={dataJson?.[`${namePrefix}_soTien`] || ""}
                                    readOnly={readOnly}
                                    style={readOnly ? { background: "#f5f5f5", fontWeight: 600 } : {}}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className={styles.tableInput}
                                    name={`${namePrefix}_tyLe`}
                                    defaultValue={dataJson?.[`${namePrefix}_tyLe`] || ""}
                                    readOnly={readOnly}
                                    style={readOnly ? { background: "#f5f5f5", fontWeight: 600 } : {}}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
