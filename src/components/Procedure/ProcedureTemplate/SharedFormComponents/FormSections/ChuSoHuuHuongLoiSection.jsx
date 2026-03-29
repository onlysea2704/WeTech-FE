export default function ChuSoHuuHuongLoiSection({ dataJson, styles }) {
    return (
        <div className={styles.sectionGroup}>
            <h3 className={styles.sectionTitle}>Thông tin về chủ sở hữu hưởng lợi của doanh nghiệp:</h3>
            <div className={styles.formGroup}>
                <label className={styles.label}>
                    Doanh nghiệp có chủ sở hữu hưởng lợi không? <span className={styles.required}>*</span>
                </label>
                <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="doanhNghiepCoCSHHuongLoi"
                            value="co"
                            className={styles.radioInput}
                            defaultChecked={!dataJson?.doanhNghiepCoCSHHuongLoi || dataJson.doanhNghiepCoCSHHuongLoi === "co"}
                            required
                        />
                        {" "}Có
                    </label>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="doanhNghiepCoCSHHuongLoi"
                            value="khong"
                            className={styles.radioInput}
                            defaultChecked={dataJson?.doanhNghiepCoCSHHuongLoi === "khong"}
                        />
                        {" "}Không
                    </label>
                </div>
            </div>
        </div>
    );
}
