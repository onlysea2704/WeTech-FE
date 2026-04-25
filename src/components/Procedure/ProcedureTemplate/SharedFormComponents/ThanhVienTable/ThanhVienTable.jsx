import { useState } from "react";
import styles from "./ThanhVienTable.module.css";
import deleteIcon from "@/assets/delete-icon.png";
import DateInput from "@/components/DateInput/DateInput";

const EMPTY_THANH_VIEN = {
    hoTen: "",
    ngaySinh: "",
    cccd: "",
    gioiTinh: "",
    quocTich: "Việt Nam",
    danToc: "",
    thuongTru: "",
    hienTai: "",
};

export default function ThanhVienTable({ rows, onChangeRows, disabled = false }) {
    const updateRow = (idx, field, value) => {
        const newRows = [...rows];
        newRows[idx] = { ...newRows[idx], [field]: value };
        onChangeRows(newRows);
    };

    const handleAdd = () => {
        onChangeRows([...rows, { ...EMPTY_THANH_VIEN }]);
    };

    const handleDelete = (idx) => {
        if (disabled) return;
        onChangeRows(rows.filter((_, i) => i !== idx));
    };

    return (
        <div className={styles.sectionGroup} style={{ marginTop: "20px" }}>
            <h3 className={styles.sectionTitle}>Thông tin về các thành viên hộ gia đình đăng ký hộ kinh doanh:</h3>
            <div className={styles.actionRow}>
                <button type="button" className={styles.btnPrimary} onClick={handleAdd} disabled={disabled}>
                    Thêm dòng
                </button>
            </div>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <colgroup>
                        <col style={{ width: "48px", minWidth: "48px" }} />
                        <col style={{ width: "160px", minWidth: "160px" }} />
                        <col style={{ width: "180px", minWidth: "180px" }} />
                        <col style={{ width: "140px", minWidth: "140px" }} />
                        <col style={{ width: "120px", minWidth: "120px" }} />
                        <col style={{ width: "140px", minWidth: "140px" }} />
                        <col style={{ width: "100px", minWidth: "100px" }} />
                        <col style={{ width: "190px", minWidth: "190px" }} />
                        <col style={{ width: "190px", minWidth: "190px" }} />
                        <col style={{ width: "100px", minWidth: "100px" }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Họ tên</th>
                            <th>Ngày sinh</th>
                            <th>Số định danh</th>
                            <th>Giới tính</th>
                            <th>Quốc tịch</th>
                            <th>Dân tộc</th>
                            <th>Nơi thường trú</th>
                            <th>Nơi ở hiện tại</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length === 0 && (
                            <tr>
                                <td colSpan={11} className={styles.emptyRow}>
                                    Chưa có thành viên nào. Nhấn "Thêm dòng" để thêm.
                                </td>
                            </tr>
                        )}
                        {rows.map((row, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>
                                    <input
                                        className={`${styles.input} ${styles.input}`}
                                        value={row.hoTen}
                                        onChange={(e) => updateRow(idx, "hoTen", e.target.value)}
                                        readOnly={disabled}
                                    />
                                </td>
                                <td>
                                    <DateInput
                                        className={`${styles.input} ${styles.input}`}
                                        value={row.ngaySinh}
                                        onChange={(e) => updateRow(idx, "ngaySinh", e.target.value)}
                                        readOnly={disabled}
                                    />
                                </td>
                                <td>
                                    <input
                                        className={`${styles.input} ${styles.input}`}
                                        value={row.cccd}
                                        onChange={(e) => updateRow(idx, "cccd", e.target.value)}
                                        readOnly={disabled}
                                    />
                                </td>
                                <td>
                                    <select
                                        className={`${styles.select} ${styles.input}`}
                                        value={row.gioiTinh}
                                        onChange={(e) => updateRow(idx, "gioiTinh", e.target.value)}
                                        disabled={disabled}
                                    >
                                        <option value=""></option>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                    </select>
                                </td>
                                <td>
                                    <select
                                        className={`${styles.select} ${styles.input}`}
                                        value={row.quocTich}
                                        onChange={(e) => updateRow(idx, "quocTich", e.target.value)}
                                        disabled={disabled}
                                    >
                                        <option value=""></option>
                                        <option value="Việt Nam">Việt Nam</option>
                                    </select>
                                </td>
                                <td>
                                    <select
                                        className={`${styles.select} ${styles.input}`}
                                        value={row.danToc}
                                        onChange={(e) => updateRow(idx, "danToc", e.target.value)}
                                        disabled={disabled}
                                    >
                                        <option value=""></option>
                                        <option value="Kinh">Kinh</option>
                                        <option value="Tày">Tày</option>
                                        <option value="Thái">Thái</option>
                                        <option value="Mường">Mường</option>
                                        <option value="Khmer">Khmer</option>
                                        <option value="Hoa">Hoa</option>
                                        <option value="Nùng">Nùng</option>
                                        <option value="H'Mông">H'Mông</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        className={`${styles.input} ${styles.input}`}
                                        value={row.thuongTru || ""}
                                        onChange={(e) => updateRow(idx, "thuongTru", e.target.value)}
                                        readOnly={disabled}
                                    />
                                </td>
                                <td>
                                    <input
                                        className={`${styles.input} ${styles.input}`}
                                        value={row.hienTai || ""}
                                        onChange={(e) => updateRow(idx, "hienTai", e.target.value)}
                                        readOnly={disabled}
                                    />
                                </td>
                                <td>
                                    {!disabled && (
                                        <div className={styles.tdActions}>
                                            <img
                                                src={deleteIcon}
                                                alt="xóa"
                                                onClick={() => handleDelete(idx)}
                                                width="18"
                                                height="18"
                                                style={{ cursor: "pointer" }}
                                            />
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
