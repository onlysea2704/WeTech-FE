export default function TinhTrangThanhLapSection({ dataJson, styles }) {
    return (
        <div className={styles.sectionGroup}>
            <h3 className={styles.sectionTitle}>Tình trạng thành lập:</h3>
            <div className={styles.formGroup}>
                <label className={styles.label}>Tình trạng thành lập (đánh dấu X vào ô thích hợp): <span className={styles.required}>*</span></label>
                <div className={styles.radioGroup} style={{ flexDirection: "column", gap: "8px", alignItems: "flex-start" }}>
                    {[
                        { value: "moi", label: "Thành lập mới" },
                        { value: "tach", label: "Thành lập trên cơ sở tách doanh nghiệp" },
                        { value: "chia", label: "Thành lập trên cơ sở chia doanh nghiệp" },
                        { value: "hop_nhat", label: "Thành lập trên cơ sở hợp nhất doanh nghiệp" },
                        { value: "chuyen_doi_loai_hinh", label: "Thành lập trên cơ sở chuyển đổi loại hình doanh nghiệp" },
                        { value: "chuyen_doi_hkd", label: "Thành lập trên cơ sở chuyển đổi từ hộ kinh doanh" },
                        { value: "chuyen_doi_quy", label: "Thành lập trên cơ sở chuyển đổi từ cơ sở bảo trợ xã hội/quỹ xã hội/quỹ từ thiện" }
                    ].map((option) => (
                        <label key={option.value} className={styles.radioLabel} style={{ marginBottom: "0", cursor: "pointer" }}>
                            <input
                                type="radio"
                                name="tinhTrangThanhLap"
                                value={option.value}
                                className={styles.radioInput}
                                defaultChecked={(dataJson?.tinhTrangThanhLap || "moi") === option.value}
                                required
                            />
                            {" "}{option.label}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}
