import React, { forwardRef, useState, useEffect, useImperativeHandle } from "react";
// Import styles from CongTyTNHH1TV
import styles from "@/components/Procedure/ProcedureTemplate/CongTyTNHH1TV/ThanhLapMoi/FormDeclaration/DanhSachCSHHuongLoiDeclaration.module.css";
import {
    GioiTinhSelect,
    DanTocSelect,
    QuocTichSelect,
} from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/PersonalSelects/PersonalSelects";
import DateInput from "@/components/DateInput/DateInput";
import Signature from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/Signature/Signature";
import deleteIcon from "@/assets/delete-icon.png";

const EMPTY_ROW = {
    hoTen: "",
    ngaySinh: "",
    gioiTinh: "",
    giaTo: "",
    quocTich: "Việt Nam",
    danToc: "",
    diaChiLienLac: "",
    phanVonGop: "",
    tyLe: "",
    loaiTaiSan: "",
    thoiHan: "",
    chuKy: "",
    ghiChu: "",
};

const DanhSachThanhVienDeclaration = forwardRef(function DanhSachThanhVienDeclaration(
    { formId, dataJson, onSubmit, formRef },
    componentRef,
) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (dataJson?.thanhVienList?.length) {
            setRows(dataJson.thanhVienList);
        } else {
            setRows([]);
        }
    }, [dataJson]);

    useImperativeHandle(componentRef, () => ({
        getDraftData: () => {
            if (!formRef?.current) return null;
            const formData = new FormData(formRef.current);
            return {
                thanhVienList: rows,
                chuKy_ten: formData.get("chuKy_ten") || "",
                chuKy_hoTen: formData.get("chuKy_hoTen") || ""
            };
        },
        getExportData: () => {
            if (rows.length === 0) {
                alert("Vui lòng nhập ít nhất một thành viên.");
                return null;
            }
            if (!formRef?.current) return null;
            if (!formRef.current.checkValidity()) {
                formRef.current.reportValidity();
                return null;
            }
            const formData = new FormData(formRef.current);
            return {
                thanhVienList: rows,
                chuKy_ten: formData.get("chuKy_ten") || "",
                chuKy_hoTen: formData.get("chuKy_hoTen") || ""
            };
        },
        importData: (imported) => {
            if (imported?.thanhVienList?.length) setRows(imported.thanhVienList);
        },
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (onSubmit) onSubmit({
            thanhVienList: rows,
            chuKy_ten: formData.get("chuKy_ten") || "",
            chuKy_hoTen: formData.get("chuKy_hoTen") || ""
        });
    };

    const handleAdd = () => {
        setRows([...rows, { ...EMPTY_ROW }]);
    };

    const handleDelete = (idx) => {
        setRows(rows.filter((_, i) => i !== idx));
    };

    const handleRowChange = (idx, e) => {
        const { name, value } = e.target;
        const newRows = [...rows];
        newRows[idx] = { ...newRows[idx], [name]: value };
        setRows(newRows);
    };

    return (
        <form onSubmit={handleSubmit} ref={formRef} key={dataJson ? "loaded" : "empty"}>
            <div className={styles.wrapper}>
                <div style={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold", fontSize: "16px" }}>
                    DANH SÁCH THÀNH VIÊN CÔNG TY TRÁCH NHIỆM HỮU HẠN HAI THÀNH VIÊN TRỞ LÊN
                </div>

                <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
                    I. Thành viên là cá nhân
                </div>

                <div className={styles.actionRow}>
                    <button
                        type="button"
                        className={styles.btnPrimary}
                        onClick={handleAdd}
                    >
                        Thêm dòng
                    </button>
                </div>

                <div className={styles.tableScrollWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 40 }}>STT</th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 150 }}>Tên thành viên</th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 120 }}>Ngày, tháng, năm sinh đối với thành viên là cá nhân</th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 80 }}>Giới tính</th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 180 }}>
                                    Loại giấy tờ, số, ngày cấp, cơ quan cấp Giấy tờ pháp lý của cá nhân
                                </th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 100 }}>Quốc tịch</th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 100 }}>Dân tộc</th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 150 }}>Địa chỉ liên lạc</th>
                                <th colSpan={3} className={styles.th}>Vốn góp</th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 120 }}>Thời hạn góp vốn</th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 120 }}>Chữ ký của thành viên</th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 120 }}>Ghi chú (nếu có)</th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 100 }}>Thao tác</th>
                            </tr>
                            <tr>
                                <th className={styles.th} style={{ minWidth: 160 }}>Phần vốn góp (bằng số; VNĐ và giá trị tương đương theo đơn vị tiền nước ngoài: bằng số, loại ngoại tệ, nếu có)</th>
                                <th className={styles.th} style={{ minWidth: 60 }}>Tỷ lệ (%)</th>
                                <th className={styles.th} style={{ minWidth: 160 }}>Loại tài sản, số lượng, giá trị tài sản góp vốn</th>
                            </tr>
                            <tr className={styles.colNumberRow}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, ""].map((n, i) => (
                                    <td key={i} className={styles.colNumber}>{n}</td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.length === 0 && (
                                <tr>
                                    <td colSpan={15} className={styles.emptyRow}>
                                        Chưa có thành viên nào. Nhấn "Thêm dòng" để bắt đầu.
                                    </td>
                                </tr>
                            )}
                            {rows.map((row, idx) => (
                                <tr key={idx} className={styles.trEdit}>
                                    <td className={styles.td} style={{ textAlign: "center" }}>{idx + 1}</td>
                                    <td className={styles.td}>
                                        <input
                                            className={styles.cellInput}
                                            name="hoTen"
                                            value={row.hoTen}
                                            onChange={(e) => handleRowChange(idx, e)}
                                        />
                                    </td>
                                    <td className={styles.td}>
                                        <DateInput
                                            className={styles.cellInput}
                                            name="ngaySinh"
                                            value={row.ngaySinh}
                                            onChange={(e) => handleRowChange(idx, e)}
                                        />
                                    </td>
                                    <td className={styles.tdWrapper} onChange={(e) => handleRowChange(idx, e)}>
                                        <GioiTinhSelect name="gioiTinh" defaultValue={row.gioiTinh} />
                                    </td>
                                    <td className={styles.td}>
                                        <input
                                            type="text"
                                            className={styles.cellInput}
                                            name="giaTo"
                                            value={row.giaTo}
                                            onChange={(e) => handleRowChange(idx, e)}
                                        />
                                    </td>
                                    <td className={styles.tdWrapper} onChange={(e) => handleRowChange(idx, e)}>
                                        <QuocTichSelect name="quocTich" defaultValue={row.quocTich} />
                                    </td>
                                    <td className={styles.tdWrapper} onChange={(e) => handleRowChange(idx, e)}>
                                        <DanTocSelect name="danToc" defaultValue={row.danToc} />
                                    </td>
                                    <td className={styles.td}>
                                        <input
                                            type="text"
                                            className={styles.cellInput}
                                            name="diaChiLienLac"
                                            value={row.diaChiLienLac}
                                            onChange={(e) => handleRowChange(idx, e)}
                                        />
                                    </td>
                                    <td className={styles.td}>
                                        <input
                                            className={styles.cellInput}
                                            name="phanVonGop"
                                            value={row.phanVonGop}
                                            onChange={(e) => handleRowChange(idx, e)}
                                        />
                                    </td>
                                    <td className={styles.td}>
                                        <input
                                            className={styles.cellInput}
                                            name="tyLe"
                                            value={row.tyLe}
                                            onChange={(e) => handleRowChange(idx, e)}
                                        />
                                    </td>
                                    <td className={styles.td}>
                                        <input
                                            className={styles.cellInput}
                                            name="loaiTaiSan"
                                            value={row.loaiTaiSan}
                                            onChange={(e) => handleRowChange(idx, e)}
                                        />
                                    </td>
                                    <td className={styles.td}>
                                        <input
                                            className={styles.cellInput}
                                            name="thoiHan"
                                            value={row.thoiHan}
                                            onChange={(e) => handleRowChange(idx, e)}
                                        />
                                    </td>
                                    <td className={styles.td}>
                                        <input
                                            className={styles.cellInput}
                                            name="chuKy"
                                            value={row.chuKy}
                                            onChange={(e) => handleRowChange(idx, e)}
                                        />
                                    </td>
                                    <td className={styles.td}>
                                        <input
                                            className={styles.cellInput}
                                            name="ghiChu"
                                            value={row.ghiChu}
                                            onChange={(e) => handleRowChange(idx, e)}
                                        />
                                    </td>
                                    <td className={styles.tdAction}>
                                        <img
                                            src={deleteIcon}
                                            alt="xóa"
                                            onClick={() => handleDelete(idx)}
                                            width="18"
                                            height="18"
                                            style={{ cursor: "pointer", display: "block", margin: "0 auto" }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Signature
                    subject="NGƯỜI ĐẠI DIỆN THEO PHÁP LUẬT CỦA CÔNG TY"
                    dataJson={dataJson}
                />
            </div>
        </form>
    );
});

export default DanhSachThanhVienDeclaration;
