import InfoTooltip from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/InfoTooltip/InfoTooltip";

export default function TinhTrangThanhLapSection({ dataJson, styles, isNote = false }) {
    const tooltipChuyenDoiQuy = "Trường hợp đăng ký thành lập công ty cổ phần trên cơ sở chuyển đổi từ cơ sở bảo trợ xã hội/quỹ xã hội/quỹ từ thiện qua mạng thông tin điện tử thì người nộp hồ sơ scan Giấy chứng nhận đăng ký thành lập (đối với cơ sở bảo trợ xã hội)/Giấy phép thành lập và công nhận điều lệ quỹ (đối với quỹ xã hội/quỹ từ thiện) trong hồ sơ đăng ký doanh nghiệp qua mạng thông tin điện tử và nộp bản chính Giấy này tới Cơ quan đăng ký kinh doanh cấp tỉnh để được cấp Giấy chứng nhận đăng ký doanh nghiệp theo quy định tại khoản 7 Điều 28 Nghị định số 168/2025/NĐ-CP ngày 30/6/2025 của Chính phủ về đăng ký doanh nghiệp.";

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
                        <label key={option.value} className={styles.radioLabel} style={{ marginBottom: "0", cursor: "pointer", display: "flex", alignItems: "center" }}>
                            <input
                                type="radio"
                                name="tinhTrangThanhLap"
                                value={option.value}
                                className={styles.radioInput}
                                defaultChecked={(dataJson?.tinhTrangThanhLap || "moi") === option.value}
                                required
                            />
                            {" "}{option.label}
                            {option.value === "chuyen_doi_quy" && isNote && <InfoTooltip content={tooltipChuyenDoiQuy} />}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}
