import React from "react";

export default function CopyAddressCheckbox({
    label = "Tích chọn nếu địa chỉ nhận thông báo thuế trùng với địa chỉ trụ sở chính",
    onChange,
    style
}) {
    return (
        <div style={{ marginBottom: "16px", ...style }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", cursor: "pointer" }}>
                <input
                    type="checkbox"
                    onChange={(e) => {
                        if (onChange) onChange(e.target.checked, e);
                    }}
                    style={{
                        margin: 0,
                        width: "16px",
                        height: "16px",
                        cursor: "pointer",
                        accentColor: "#10a142"
                    }}
                />
                <span style={{ fontWeight: 500, color: "var(--secondary-content)", fontSize: "14px" }}>{label}</span>
            </label>
        </div>
    );
}
