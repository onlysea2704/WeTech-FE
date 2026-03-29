import CapitalInput from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/CapitalInput/CapitalInput";

export default function VonDieuLeSection({ dataJson, styles }) {
    return (
        <>
            <CapitalInput
                title="Vốn điều lệ"
                labelNumber="Vốn điều lệ (bằng số; VNĐ)"
                labelText="Vốn điều lệ (bằng chữ; VNĐ)"
                nameNumber="vonDieuLe"
                nameText="vonDieuLe_bangChu"
                defaultNumber={dataJson?.vonDieuLe}
                defaultText={dataJson?.vonDieuLe_bangChu}
                required={true}
            />
            <div className={styles.grid2} style={{ marginTop: "-30px" }}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Giá trị tương đương theo đơn vị tiền nước ngoài (nếu có; bằng số, loại ngoại tệ):</label>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <input
                            type="text"
                            className={styles.input}
                            style={{ width: "70%" }}
                            name="vonDieuLe_ngoaiTeBangSo"
                            defaultValue={dataJson?.vonDieuLe_ngoaiTeBangSo || ""}
                            placeholder="Tiền bằng số"
                        />
                        <input
                            type="text"
                            className={styles.input}
                            style={{ width: "30%" }}
                            name="vonDieuLe_ngoaiTeDonVi"
                            defaultValue={dataJson?.vonDieuLe_ngoaiTeDonVi || ""}
                            placeholder="Loại ngoại tệ"
                        />
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Có hiển thị thông tin về giá trị tương đương theo đơn vị tiền tệ nước ngoài trên Giấy chứng nhận đăng ký doanh nghiệp hay không?</label>
                    <div className={styles.radioGroup}>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                name="hienThiNgoaiTe"
                                value="co"
                                className={styles.radioInput}
                                defaultChecked={dataJson?.hienThiNgoaiTe === "co"}
                            />
                            {" "}Có
                        </label>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                name="hienThiNgoaiTe"
                                value="khong"
                                className={styles.radioInput}
                                defaultChecked={!dataJson?.hienThiNgoaiTe || dataJson?.hienThiNgoaiTe === "khong"}
                            />
                            {" "}Không
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
}
