import React from "react";

/**
 * Lấy last name (tên) từ chuỗi họ và tên đầy đủ.
 * VD: "Nguyễn Văn An" → "An"
 */
export function getLastName(fullName) {
    if (!fullName) return "";
    const parts = fullName.trim().split(/\s+/);
    return parts[parts.length - 1];
}

/**
 * SignatureBlock – Khối chữ ký cho một bên trong văn bản uỷ quyền.
 *
 * @param {string} title       - Tên tiêu đề khối (VD: "BÊN UỶ QUYỀN")
 * @param {string} fullName    - Họ và tên đầy đủ
 * @param {object} styles      - CSS module styles từ file cha (cần: signatureBlock, signatureTitle, signatureName)
 * @param {object} titleStyle  - Style tuỳ chỉnh thêm cho phần tên tiêu đề
 * @param {number} topSpacing  - Khoảng cách top trước last name (default 80px)
 */
export default function SignatureBlock({ title, fullName, styles, titleStyle = {}, topSpacing = 20 }) {
    const lastName = getLastName(fullName);

    return (
        <div className={styles.signatureBlock}>
            <div
                className={styles.signatureTitle}
                style={{ textDecoration: "underline", ...titleStyle }}
            >
                {title}
            </div>
            {lastName && (
                <div
                    className={styles.signatureName}
                    style={{ marginTop: `${topSpacing}px`, fontSize: "15px", textTransform: "uppercase" }}
                >
                    {lastName}
                </div>
            )}
            <div
                className={styles.signatureName}
                style={{ fontSize: "15px", textTransform: "uppercase" }}
            >
                {fullName}
            </div>
        </div>
    );
}
