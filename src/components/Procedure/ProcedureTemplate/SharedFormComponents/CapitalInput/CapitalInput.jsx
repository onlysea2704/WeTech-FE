import { useState, useEffect } from "react";
import styles from "./CapitalInput.module.css";
import numberToVietnameseText from "@/utils/numberToVietnameseText";

function formatNumber(val) {
    const raw = String(val).replace(/[^0-9]/g, "");
    if (!raw) return "";
    return Number(raw).toLocaleString("vi-VN");
}

export default function CapitalInput({
    title = "Vốn điều lệ",
    labelNumber = "Vốn điều lệ (bằng số; VNĐ)",
    labelText = "Vốn điều lệ (bằng chữ; VNĐ)",
    nameNumber = "vonDieuLe",
    nameText = "vonDieuLe_bangChu",
    defaultNumber = "",
    defaultText = "",
    required = true,
}) {
    const [vonBangChu, setVonBangChu] = useState(defaultText || "");

    useEffect(() => {
        setVonBangChu(defaultText || "");
    }, [defaultText]);

    return (
        <div className={styles.sectionGroup}>
            <h3 className={styles.sectionTitle}>{title}:</h3>
            <div className={styles.grid2}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        {labelNumber} {required && <span className={styles.required}>*</span>}
                    </label>
                    <div className={styles.inputWithSuffix}>
                        <input
                            type="text"
                            className={styles.input}
                            style={{ textAlign: "right", paddingRight: "48px" }}
                            name={nameNumber}
                            required={required}
                            defaultValue={defaultNumber ? formatNumber(String(defaultNumber)) : ""}
                            placeholder="0"
                            onInput={(e) => {
                                const pos = e.target.selectionStart;
                                const oldLen = e.target.value.length;
                                const formatted = formatNumber(e.target.value);
                                e.target.value = formatted;
                                const diff = formatted.length - oldLen;
                                e.target.setSelectionRange(pos + diff, pos + diff);
                            }}
                            onBlur={(e) => {
                                if (e.target.value) {
                                    setVonBangChu(numberToVietnameseText(e.target.value));
                                } else {
                                    setVonBangChu("");
                                }
                            }}
                        />
                        <span className={styles.inputSuffix}>VNĐ</span>
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>{labelText}</label>
                    <input
                        type="text"
                        className={styles.input}
                        name={nameText}
                        value={vonBangChu}
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
}
