import { useRef } from "react";
import FormattedNumberInput from "../FormattedNumberInput/FormattedNumberInput";

export default function TaiSanGopVonSection({ dataJson, styles }) {
    const tableRef = useRef(null);

    const handleChange = () => {
        if (!tableRef.current) return;
        const table = tableRef.current;
        const prefixes = ["taiSan_dongVN", "taiSan_ngoaiTe", "taiSan_vang", "taiSan_qsdDat", "taiSan_shtt", "taiSan_khac"];
        let totalGiaTri = 0;
        let totalTyLe = 0;
        prefixes.forEach(p => {
            const gtInput = table.querySelector(`[name="${p}_giaTri"]`);
            const tlInput = table.querySelector(`[name="${p}_tyLe"]`);
            const gt = parseFloat(gtInput?.value.replace(/\./g, '').replace(/,/g, '.')) || 0;
            const tl = parseFloat(tlInput?.value.replace(/,/g, '.')) || 0;
            totalGiaTri += gt;
            totalTyLe += tl;
        });
        const tongGiaTriInput = table.querySelector('[name="taiSan_tongSo_giaTri"]');
        const tongTyLeInput = table.querySelector('[name="taiSan_tongSo_tyLe"]');
        if (tongGiaTriInput) tongGiaTriInput.value = totalGiaTri ? totalGiaTri.toLocaleString('vi-VN') : "";
        if (tongTyLeInput) tongTyLeInput.value = totalTyLe ? totalTyLe : "";
    };

    return (
        <div className={styles.sectionGroup}>
            <h3 className={styles.sectionTitle}>Tài sản góp vốn:</h3>
            <table ref={tableRef} className={styles.table} onChange={handleChange}>
                <thead>
                    <tr>
                        <th style={{ width: "50px" }}>STT</th>
                        <th>Tài sản góp vốn</th>
                        <th>Giá trị vốn của từng tài sản trong vốn điều lệ (bằng số, VNĐ)</th>
                        <th style={{ width: "100px" }}>Tỷ lệ (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        { stt: 1, label: "Đồng Việt Nam", namePrefix: "taiSan_dongVN" },
                        { stt: 2, label: "Ngoại tệ tự do chuyển đổi (ghi rõ loại ngoại tệ, số tiền được góp bằng mỗi loại ngoại tệ)", namePrefix: "taiSan_ngoaiTe" },
                        { stt: 3, label: "Vàng", namePrefix: "taiSan_vang" },
                        { stt: 4, label: "Quyền sử dụng đất", namePrefix: "taiSan_qsdDat" },
                        { stt: 5, label: "Quyền sở hữu trí tuệ", namePrefix: "taiSan_shtt" },
                        { stt: 6, label: "Các tài sản khác (ghi rõ loại tài sản, số lượng và giá trị còn lại của mỗi loại tài sản, có thể lập thành danh mục riêng kèm theo hồ sơ đăng ký doanh nghiệp)", namePrefix: "taiSan_khac" },
                    ].map(({ stt, label, namePrefix }) => (
                        <tr key={namePrefix}>
                            <td style={{ textAlign: "center", verticalAlign: "top", paddingTop: "10px" }}>{stt}</td>
                            <td>{label}</td>
                            <td>
                                {namePrefix === "taiSan_khac" ? (
                                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                            <span style={{ whiteSpace: "nowrap", width: "90px", fontSize: "0.9em" }}>Loại tài sản:</span>
                                            <input type="text" className={styles.input} name={`${namePrefix}_loaiTaiSan`} defaultValue={dataJson?.[`${namePrefix}_loaiTaiSan`] || ""} style={{ flex: 1 }} />
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                            <span style={{ whiteSpace: "nowrap", width: "90px", fontSize: "0.9em" }}>Số lượng:</span>
                                            <input type="text" className={styles.input} name={`${namePrefix}_soLuong`} defaultValue={dataJson?.[`${namePrefix}_soLuong`] || ""} style={{ flex: 1 }} />
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                            <span style={{ whiteSpace: "nowrap", width: "90px", fontSize: "0.9em" }}>Giá trị còn lại:</span>
                                            <FormattedNumberInput
                                                name={`${namePrefix}_giaTri`}
                                                defaultValue={dataJson?.[`${namePrefix}_giaTri`] || ""}
                                                onChange={handleChange}
                                                className={styles.input}
                                                style={{ flex: 1 }}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <FormattedNumberInput
                                        name={`${namePrefix}_giaTri`}
                                        defaultValue={dataJson?.[`${namePrefix}_giaTri`] || ""}
                                        onChange={handleChange}
                                        className={styles.input}
                                    />
                                )}
                            </td>
                            <td>
                                <input type="text" className={styles.input} name={`${namePrefix}_tyLe`} defaultValue={dataJson?.[`${namePrefix}_tyLe`] || ""} />
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={2} style={{ textAlign: "center", fontWeight: 600 }}>Tổng số</td>
                        <td><input type="text" className={styles.input} name="taiSan_tongSo_giaTri" defaultValue={dataJson?.taiSan_tongSo_giaTri || ""} style={{ background: "#f5f5f5" }} readOnly /></td>
                        <td><input type="text" className={styles.input} name="taiSan_tongSo_tyLe" defaultValue={dataJson?.taiSan_tongSo_tyLe || ""} style={{ background: "#f5f5f5" }} readOnly /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
