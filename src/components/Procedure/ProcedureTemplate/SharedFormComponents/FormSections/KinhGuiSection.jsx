export default function KinhGuiSection({ dataJson, styles }) {
    return (
        <div className={styles.formGroup}>
            <h3 className={`${styles.sectionTitle}`}>
                Kính gửi: <span className={styles.required}>*</span>
            </h3>
            <input
                type="text"
                className={styles.input}
                name="kinhGui"
                defaultValue={dataJson?.kinhGui || ""}
                required
            />
        </div>
    );
}
