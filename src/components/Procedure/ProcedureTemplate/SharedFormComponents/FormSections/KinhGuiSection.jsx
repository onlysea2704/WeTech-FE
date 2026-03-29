import { useState, useEffect } from "react";
import localStyles from "./KinhGuiSection.module.css";

export default function KinhGuiSection({ dataJson, styles }) {
    const prefix = "Cơ quan đăng ký kinh doanh cấp tỉnh ";
    const [userPart, setUserPart] = useState("");

    useEffect(() => {
        const full = dataJson?.kinhGui || "";
        if (full.startsWith(prefix)) {
            setUserPart(full.substring(prefix.length));
        } else if (full.startsWith("Cơ quan đăng ký kinh doanh cấp tỉnh")) {
            setUserPart(full.substring("Cơ quan đăng ký kinh doanh cấp tỉnh".length).trim());
        } else {
            setUserPart(full);
        }
    }, [dataJson]);

    return (
        <div className={styles.formGroup}>
            <h3 className={`${styles.sectionTitle}`}>
                Kính gửi:
            </h3>
            <div className={localStyles.inputWithSuffixKinhGui}>
                <p className={localStyles.inputSuffixKinhGui}>{prefix}</p>
                <input
                    type="text"
                    className={localStyles.inputKinhGui}
                    value={userPart}
                    onChange={(e) => setUserPart(e.target.value)}
                    required
                />
            </div>
            <input type="hidden" name="kinhGui" value={`${prefix}${userPart}`} />
        </div>
    );
}
