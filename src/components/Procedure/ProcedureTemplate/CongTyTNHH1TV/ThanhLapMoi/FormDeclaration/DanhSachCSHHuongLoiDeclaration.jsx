import React, { forwardRef, useState, useEffect, useImperativeHandle } from "react";
import styles from "./DanhSachCSHHuongLoiDeclaration.module.css";
import {
    GioiTinhSelect,
    DanTocSelect,
    QuocTichSelect,
} from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/PersonalSelects/PersonalSelects";
import DateInput from "@/components/DateInput/DateInput";

const EMPTY_ROW = {
    hoTen: "",
    ngaySinh: "",
    gioiTinh: "",
    giaTo: "",
    quocTich: "Việt Nam",
    danToc: "",
    diaChiLienLac: "",
    tyLeSoHuuVon: "",
    tyLeSoHuuBieuQuyet: "",
    quyenChiPhoi: "",
    ghiChu: "",
};

const DanhSachCSHHuongLoiDeclaration = forwardRef(function DanhSachCSHHuongLoiDeclaration(
    { formId, dataJson, onSubmit, formRef },
    componentRef,
) {
    const [rows, setRows] = useState([]);
    const [editingIdx, setEditingIdx] = useState(null);
    const [editingRow, setEditingRow] = useState(null);
    const [nguoiDaiDienKy, setNguoiDaiDienKy] = useState("");

    useEffect(() => {
        if (dataJson?.cshHuongLoiList?.length) {
            setRows(dataJson.cshHuongLoiList);
        } else {
            setRows([]);
        }
        if (dataJson?.nguoiDaiDienKy) {
            setNguoiDaiDienKy(dataJson.nguoiDaiDienKy);
        }
    }, [dataJson]);

    useImperativeHandle(componentRef, () => ({
        getDraftData: () => ({ cshHuongLoiList: rows, nguoiDaiDienKy }),
        getExportData: () => {
            if (editingIdx !== null) {
                alert("Vui lòng lưu dòng đang sửa trước khi tiếp tục.");
                return null;
            }
            if (rows.length === 0) {
                alert("Vui lòng nhập ít nhất một chủ sở hữu hưởng lợi.");
                return null;
            }
            if (!nguoiDaiDienKy?.trim()) {
                alert("Vui lòng nhập tên Người đại diện theo pháp luật.");
                return null;
            }
            return { cshHuongLoiList: rows, nguoiDaiDienKy };
        },
        importData: (imported) => {
            if (imported?.cshHuongLoiList?.length) setRows(imported.cshHuongLoiList);
        },
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingIdx !== null) {
            alert("Vui lòng lưu dòng đang sửa trước khi tiếp tục.");
            return;
        }
        if (onSubmit) onSubmit({ cshHuongLoiList: rows, nguoiDaiDienKy });
    };

    const handleAdd = () => {
        setEditingIdx("new");
        setEditingRow({ ...EMPTY_ROW });
    };

    const handleEdit = (idx) => {
        setEditingIdx(idx);
        setEditingRow({ ...rows[idx] });
    };

    const handleSave = () => {
        if (editingIdx === "new") {
            setRows([...rows, editingRow]);
        } else {
            setRows(rows.map((r, i) => (i === editingIdx ? editingRow : r)));
        }
        setEditingIdx(null);
        setEditingRow(null);
    };

    const handleCancel = () => {
        setEditingIdx(null);
        setEditingRow(null);
    };

    const handleDelete = (idx) => {
        setRows(rows.filter((_, i) => i !== idx));
    };

    // Helper for onChange from components that wrap native selects or inputs
    const handleEditingRowChange = (e) => {
        const { name, value } = e.target;
        setEditingRow((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit} ref={formRef} key={dataJson ? "loaded" : "empty"}>
            <div className={styles.wrapper}>
                <div className={styles.actionRow}>
                    <button
                        type="button"
                        className={styles.addBtn}
                        onClick={handleAdd}
                        disabled={editingIdx !== null}
                    >
                        + Thêm dòng
                    </button>
                </div>

                <div className={styles.tableScrollWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th rowSpan={2} className={styles.th}>STT</th>
                                <th rowSpan={2} className={styles.th}>Họ và tên</th>
                                <th rowSpan={2} className={styles.th}>Ngày, tháng, năm sinh</th>
                                <th rowSpan={2} className={styles.th}>Giới tính</th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 150 }}>
                                    Số, ngày cấp, CQ cấp Giấy tờ PL
                                </th>
                                <th rowSpan={2} className={styles.th}>Quốc tịch</th>
                                <th rowSpan={2} className={styles.th}>Dân tộc</th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 150 }}>Địa chỉ liên lạc</th>
                                <th colSpan={3} className={styles.th}>Chủ sở hữu hưởng lợi của DN</th>
                                <th rowSpan={2} className={styles.th}>Ghi chú</th>
                                <th rowSpan={2} className={styles.th}>Thao tác</th>
                            </tr>
                            <tr>
                                <th className={styles.th}>Tỷ lệ sở hữu VĐL (%)</th>
                                <th className={styles.th}>Tỷ lệ sở hữu quyền BQ (%)</th>
                                <th className={styles.th}>Quyền chi phối</th>
                            </tr>
                            <tr className={styles.colNumberRow}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, ""].map((n, i) => (
                                    <td key={i} className={styles.colNumber}>{n}</td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.length === 0 && editingIdx === null && (
                                <tr>
                                    <td colSpan={13} className={styles.emptyRow}>
                                        Chưa có thành viên nào. Nhấn "+ Thêm dòng" để bắt đầu.
                                    </td>
                                </tr>
                            )}
                            {rows.map((row, idx) =>
                                editingIdx === idx ? (
                                    <tr key={idx} className={styles.trEdit}>
                                        <td className={styles.td} style={{ textAlign: "center" }}>{idx + 1}</td>
                                        <td className={styles.td}>
                                            <input
                                                className={styles.cellInput}
                                                name="hoTen"
                                                value={editingRow.hoTen}
                                                onChange={handleEditingRowChange}
                                            />
                                        </td>
                                        <td className={styles.td}>
                                            <DateInput
                                                className={styles.cellInput}
                                                name="ngaySinh"
                                                value={editingRow.ngaySinh}
                                                onChange={handleEditingRowChange}
                                            />
                                        </td>
                                        <td className={styles.tdWrapper} onChange={handleEditingRowChange}>
                                            <GioiTinhSelect name="gioiTinh" defaultValue={editingRow.gioiTinh} />
                                        </td>
                                        <td className={styles.td}>
                                            <textarea
                                                className={styles.cellInput}
                                                rows={3}
                                                name="giaTo"
                                                value={editingRow.giaTo}
                                                onChange={handleEditingRowChange}
                                            />
                                        </td>
                                        <td className={styles.tdWrapper} onChange={handleEditingRowChange}>
                                            <QuocTichSelect name="quocTich" defaultValue={editingRow.quocTich} />
                                        </td>
                                        <td className={styles.tdWrapper} onChange={handleEditingRowChange}>
                                            <DanTocSelect name="danToc" defaultValue={editingRow.danToc} />
                                        </td>
                                        <td className={styles.td}>
                                            <textarea
                                                className={styles.cellInput}
                                                rows={3}
                                                name="diaChiLienLac"
                                                value={editingRow.diaChiLienLac}
                                                onChange={handleEditingRowChange}
                                            />
                                        </td>
                                        <td className={styles.td}>
                                            <input
                                                className={styles.cellInput}
                                                name="tyLeSoHuuVon"
                                                value={editingRow.tyLeSoHuuVon}
                                                onChange={handleEditingRowChange}
                                            />
                                        </td>
                                        <td className={styles.td}>
                                            <input
                                                className={styles.cellInput}
                                                name="tyLeSoHuuBieuQuyet"
                                                value={editingRow.tyLeSoHuuBieuQuyet}
                                                onChange={handleEditingRowChange}
                                            />
                                        </td>
                                        <td className={styles.td}>
                                            <input
                                                className={styles.cellInput}
                                                name="quyenChiPhoi"
                                                value={editingRow.quyenChiPhoi}
                                                onChange={handleEditingRowChange}
                                            />
                                        </td>
                                        <td className={styles.td}>
                                            <input
                                                className={styles.cellInput}
                                                name="ghiChu"
                                                value={editingRow.ghiChu}
                                                onChange={handleEditingRowChange}
                                            />
                                        </td>
                                        <td className={styles.tdAction}>
                                            <button type="button" className={styles.saveBtn} onClick={handleSave}>Lưu</button>
                                            <button type="button" className={styles.cancelBtn} onClick={handleCancel}>Huỷ</button>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr key={idx} className={styles.trView}>
                                        <td className={styles.td} style={{ textAlign: "center" }}>{idx + 1}</td>
                                        <td className={styles.td}>{row.hoTen}</td>
                                        <td className={styles.td}>{row.ngaySinh}</td>
                                        <td className={styles.td}>{row.gioiTinh}</td>
                                        <td className={styles.td}>{row.giaTo}</td>
                                        <td className={styles.td}>{row.quocTich}</td>
                                        <td className={styles.td}>{row.danToc}</td>
                                        <td className={styles.td}>{row.diaChiLienLac}</td>
                                        <td className={styles.td}>{row.tyLeSoHuuVon}</td>
                                        <td className={styles.td}>{row.tyLeSoHuuBieuQuyet}</td>
                                        <td className={styles.td}>{row.quyenChiPhoi}</td>
                                        <td className={styles.td}>{row.ghiChu}</td>
                                        <td className={styles.tdAction}>
                                            <button type="button" className={styles.editBtn} onClick={() => handleEdit(idx)} disabled={editingIdx !== null}>Sửa</button>
                                            <button type="button" className={styles.delBtn} onClick={() => handleDelete(idx)} disabled={editingIdx !== null}>Xóa</button>
                                        </td>
                                    </tr>
                                )
                            )}

                            {/* Render New Row if Adding */}
                            {editingIdx === "new" && (
                                <tr className={styles.trEdit}>
                                    <td className={styles.td} style={{ textAlign: "center" }}>{rows.length + 1}</td>
                                    <td className={styles.td}>
                                        <input className={styles.cellInput} name="hoTen" value={editingRow.hoTen} onChange={handleEditingRowChange} />
                                    </td>
                                    <td className={styles.td}>
                                        <DateInput className={styles.cellInput} name="ngaySinh" value={editingRow.ngaySinh} onChange={handleEditingRowChange} />
                                    </td>
                                    <td className={styles.tdWrapper} onChange={handleEditingRowChange}>
                                        <GioiTinhSelect name="gioiTinh" defaultValue={editingRow.gioiTinh} />
                                    </td>
                                    <td className={styles.td}>
                                        <textarea className={styles.cellInput} rows={3} name="giaTo" value={editingRow.giaTo} onChange={handleEditingRowChange} />
                                    </td>
                                    <td className={styles.tdWrapper} onChange={handleEditingRowChange}>
                                        <QuocTichSelect name="quocTich" defaultValue={editingRow.quocTich} />
                                    </td>
                                    <td className={styles.tdWrapper} onChange={handleEditingRowChange}>
                                        <DanTocSelect name="danToc" defaultValue={editingRow.danToc} />
                                    </td>
                                    <td className={styles.td}>
                                        <textarea className={styles.cellInput} rows={3} name="diaChiLienLac" value={editingRow.diaChiLienLac} onChange={handleEditingRowChange} />
                                    </td>
                                    <td className={styles.td}>
                                        <input className={styles.cellInput} name="tyLeSoHuuVon" value={editingRow.tyLeSoHuuVon} onChange={handleEditingRowChange} />
                                    </td>
                                    <td className={styles.td}>
                                        <input className={styles.cellInput} name="tyLeSoHuuBieuQuyet" value={editingRow.tyLeSoHuuBieuQuyet} onChange={handleEditingRowChange} />
                                    </td>
                                    <td className={styles.td}>
                                        <input className={styles.cellInput} name="quyenChiPhoi" value={editingRow.quyenChiPhoi} onChange={handleEditingRowChange} />
                                    </td>
                                    <td className={styles.td}>
                                        <input className={styles.cellInput} name="ghiChu" value={editingRow.ghiChu} onChange={handleEditingRowChange} />
                                    </td>
                                    <td className={styles.tdAction}>
                                        <button type="button" className={styles.saveBtn} onClick={handleSave}>Lưu</button>
                                        <button type="button" className={styles.cancelBtn} onClick={handleCancel}>Huỷ</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className={styles.signatureBlockFull}>
                    <div className={styles.signatureInputWrapper}>
                        <label className={styles.signatureLabel}>
                            NGƯỜI ĐẠI DIỆN THEO PHÁP LUẬT<br />
                            QUẢN TRỊ CỦA CÔNG TY
                        </label>
                        <input
                            type="text"
                            className={styles.signatureInput}
                            name="nguoiDaiDienKy"
                            value={nguoiDaiDienKy}
                            onChange={(e) => setNguoiDaiDienKy(e.target.value)}
                            placeholder="Nhập họ tên người đại diện"
                            required
                        />
                    </div>
                </div>
            </div>
        </form>
    );
});

export default DanhSachCSHHuongLoiDeclaration;
