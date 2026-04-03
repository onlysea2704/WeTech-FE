import React from 'react';

export default function CoDongNhaDauTuNuocNgoaiSection({ dataJson, styles }) {
    return (
        <div className={styles.sectionGroup}>
            <h3 className={styles.sectionTitle}>
                Cổ đông là nhà đầu tư nước ngoài
            </h3>

            <p className={styles.sectionTitle} style={{ marginTop: "16px", marginBottom: "8px" }}>
                - Thông tin về Giấy chứng nhận đăng ký đầu tư <span style={{ fontStyle: "italic", fontWeight: "normal" }}>(kê khai trong trường hợp cổ đông là nhà đầu tư nước ngoài được cấp Giấy chứng nhận đăng ký đầu tư theo quy định của Luật Đầu tư)</span>:
            </p>

            <div className={styles.formGroup}>
                <label className={styles.label}>Mã số dự án:</label>
                <input
                    type="text"
                    className={styles.input}
                    name="maSoDuAn"
                    defaultValue={dataJson?.maSoDuAn || ""}
                />
            </div>

            <div className={styles.grid2}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Ngày cấp:</label>
                    <input
                        type="date"
                        className={styles.input}
                        name="ngayCapDuAn"
                        defaultValue={dataJson?.ngayCapDuAn || ""}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Cơ quan cấp:</label>
                    <input
                        type="text"
                        className={styles.input}
                        name="coQuanCapDuAn"
                        defaultValue={dataJson?.coQuanCapDuAn || ""}
                    />
                </div>
            </div>
        </div>
    );
}
