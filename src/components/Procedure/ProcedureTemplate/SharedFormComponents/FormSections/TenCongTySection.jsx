export default function TenCongTySection({ dataJson, styles, prefix }) {
    return (
        <div className={styles.sectionGroup}>
            <h3 className={styles.sectionTitle}>Tên công ty:</h3>
            <div className={styles.formGroup}>
                <label className={styles.label}>
                    Tên công ty viết bằng tiếng Việt (ghi bằng chữ in hoa): <span className={styles.required}>*</span>
                </label>
                {prefix ? (
                    <div className={styles.inputPrefixWrapper}>
                        <p>{prefix}</p>
                        <input
                            type="text"
                            className={styles.inputNoBorder}
                            name="tenCongTyVN"
                            defaultValue={dataJson?.tenCongTyVN || ""}
                            style={{ textTransform: "uppercase" }}
                            required
                        />
                    </div>
                ) : (
                    <input
                        type="text"
                        className={styles.input}
                        name="tenCongTyVN"
                        defaultValue={dataJson?.tenCongTyVN || ""}
                        style={{ textTransform: "uppercase" }}
                        required
                    />
                )}
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Tên công ty viết bằng tiếng nước ngoài (nếu có):</label>
                <input
                    type="text"
                    className={styles.input}
                    name="tenCongTyEN"
                    defaultValue={dataJson?.tenCongTyEN || ""}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Tên công ty viết tắt (nếu có):</label>
                <input
                    type="text"
                    className={styles.input}
                    name="tenCongTyVietTat"
                    defaultValue={dataJson?.tenCongTyVietTat || ""}
                />
            </div>
        </div>
    );
}
