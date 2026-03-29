import { useState, useEffect, useRef } from "react";
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
    const [vonSo, setVonSo] = useState(() => defaultNumber ? formatNumber(String(defaultNumber)) : "");
    const [vonBangChu, setVonBangChu] = useState(() => {
        if (defaultText) return defaultText;
        if (defaultNumber) return numberToVietnameseText(defaultNumber);
        return "";
    });

    const inputRef = useRef(null);
    const [cursor, setCursor] = useState(null);

    // Sync from props (useful when importing Excel)
    useEffect(() => {
        const parsedVonSo = defaultNumber ? formatNumber(String(defaultNumber)) : "";
        setVonSo(parsedVonSo);
        
        if (defaultText) {
            setVonBangChu(defaultText);
        } else if (parsedVonSo) {
            setVonBangChu(numberToVietnameseText(parsedVonSo));
        } else {
            setVonBangChu("");
        }
    }, [defaultNumber, defaultText]);

    // Restore cursor position after render
    useEffect(() => {
        if (cursor !== null && inputRef.current) {
            inputRef.current.setSelectionRange(cursor, cursor);
            setCursor(null);
        }
    }, [vonSo, cursor]);

    const handleChange = (e) => {
        const input = e.target;
        const val = input.value;
        const pos = input.selectionStart;
        const oldLen = val.length;

        const formatted = formatNumber(val);
        setVonSo(formatted);

        if (formatted) {
            setVonBangChu(numberToVietnameseText(formatted));
        } else {
            setVonBangChu("");
        }

        // Calculate new cursor position
        const diff = formatted.length - oldLen;
        setCursor(pos + diff);
    };

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
                            ref={inputRef}
                            type="text"
                            className={styles.input}
                            style={{ textAlign: "right", paddingRight: "48px" }}
                            name={nameNumber}
                            required={required}
                            value={vonSo}
                            placeholder="0"
                            onChange={handleChange}
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
