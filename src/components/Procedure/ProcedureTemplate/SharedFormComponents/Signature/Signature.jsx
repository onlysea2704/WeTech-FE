import styles from "@/components/Procedure/ProcedureTemplate/HoKinhDoanh/FormDeclaration/GiayDeNghi.module.css";

export default function Signature({ subject, dataJson }) {
    return (
        <div className={styles.sectionGroup}>
            <h3 className={styles.sectionTitle}>{subject}:</h3>
            <div className={styles.grid2}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Tên <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="text"
                        className={styles.input}
                        name="chuKy_ten"
                        defaultValue={dataJson?.chuKy_ten || ""}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Họ và Tên <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="text"
                        className={styles.input}
                        name="chuKy_hoTen"
                        defaultValue={dataJson?.chuKy_hoTen || ""}
                        required
                    />
                </div>
            </div>
        </div>
    )
}