import { useState, useEffect } from "react";
import localStyles from "./KinhGuiSection.module.css";

export default function KinhGuiSection({ dataJson, styles, autoKinhGui }) {
    // autoKinhGui: string passed from parent when province is selected in DiaChiTruSo
    // e.g. "Kính gửi Phòng Đăng ký kinh doanh Thành phố Hà Nội"
    const [manualValue, setManualValue] = useState(dataJson?.kinhGui || "");

    useEffect(() => {
        setManualValue(dataJson?.kinhGui || "");
    }, [dataJson]);

    const displayValue = autoKinhGui !== undefined && autoKinhGui !== null
        ? autoKinhGui
        : manualValue;

    return (
        <div className={styles.formGroup}>
            <h3 className={`${styles.sectionTitle}`}>
                Kính gửi:
            </h3>
            <div className={localStyles.inputWithSuffixKinhGui}>
                {autoKinhGui !== undefined && autoKinhGui !== null ? (
                    // Auto-filled from province selection – show as read-only styled text
                    <p
                        style={{
                            margin: 0,
                            fontSize: "14px",
                            color: "#505050",
                            borderBottom: "1px dashed #1e1b4b",
                            flex: 1,
                            paddingBottom: "2px",
                        }}
                    >
                        {autoKinhGui || <span style={{ color: "#999" }}>Chọn tỉnh/thành phố trụ sở để tự động điền</span>}
                    </p>
                ) : (
                    // Manual input fallback
                    <input
                        type="text"
                        className={localStyles.inputKinhGui}
                        value={manualValue}
                        onChange={(e) => setManualValue(e.target.value)}
                        placeholder="Nhập kính gửi"
                        required
                    />
                )}
            </div>
            <input type="hidden" name="kinhGui" value={displayValue} />
        </div>
    );
}
