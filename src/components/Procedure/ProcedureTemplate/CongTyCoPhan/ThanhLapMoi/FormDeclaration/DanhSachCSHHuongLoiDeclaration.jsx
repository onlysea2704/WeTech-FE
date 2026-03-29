import React, { forwardRef, useState, useEffect, useImperativeHandle } from "react";
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

    useEffect(() => {
        if (dataJson?.cshHuongLoiList?.length) {
            setRows(dataJson.cshHuongLoiList);
        } else {
            setRows([]);
        }
    }, [dataJson]);

    useImperativeHandle(componentRef, () => ({
        getDraftData: () => {
            if (!formRef?.current) return null;
            const formData = new FormData(formRef.current);
            return {
                cshHuongLoiList: rows,
                chuKy_ten: formData.get("chuKy_ten") || "",
                chuKy_hoTen: formData.get("chuKy_hoTen") || ""
            };
        },
        getExportData: () => {
            if (rows.length === 0) {
                alert("Vui lòng nhập ít nhất một chủ sở hữu hưởng lợi.");
                return null;
            }
            if (!formRef?.current) return null;
            if (!formRef.current.checkValidity()) {
                formRef.current.reportValidity();
                return null;
            }
            const formData = new FormData(formRef.current);
            return {
                cshHuongLoiList: rows,
                chuKy_ten: formData.get("chuKy_ten") || "",
                chuKy_hoTen: formData.get("chuKy_hoTen") || ""
            };
        },
        importData: (imported) => {
            if (imported?.cshHuongLoiList?.length) setRows(imported.cshHuongLoiList);
        },
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (onSubmit) onSubmit({
            cshHuongLoiList: rows,
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
                                <th rowSpan={2} className={styles.th}>STT</th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 180 }}>Họ và tên</th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 150 }}>Ngày, tháng, năm sinh</th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 60 }}>Giới tính</th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 200 }}>
                                    Số, ngày cấp, cơ quan cấp Giấy tờ pháp lý của cá nhân
                                </th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 100 }}>Quốc tịch</th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 100 }}>Dân tộc</th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 150 }}>Địa chỉ liên lạc</th>
                                <th colSpan={3} className={styles.th}>Chủ sở hữu hưởng lợi của doanh nghiệp</th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 150 }}>Ghi chú</th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 150 }}>Thao tác</th>
                            </tr>
                            <tr>
                                <th className={styles.th} style={{ minWidth: 50 }}>Tỷ lệ sở hữu vốn điều lệ (%)</th>
                                <th className={styles.th} style={{ minWidth: 50 }}>Tỷ lệ sở hữu quyền biểu quyết (%)</th>
                                <th className={styles.th} style={{ minWidth: 100 }}>Quyền chi phối</th>
                            </tr>
                            <tr className={styles.colNumberRow}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, ""].map((n, i) => (
                                    <td key={i} className={styles.colNumber}>{n}</td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.length === 0 && (
                                <tr>
                                    <td colSpan={13} className={styles.emptyRow}>
                                        Chưa có chủ sở hữu hưởng lợi. Nhấn "Thêm dòng" để bắt đầu.
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
                                            name="tyLeSoHuuVon"
                                            value={row.tyLeSoHuuVon}
                                            onChange={(e) => handleRowChange(idx, e)}
                                        />
                                    </td>
                                    <td className={styles.td}>
                                        <input
                                            className={styles.cellInput}
                                            name="tyLeSoHuuBieuQuyet"
                                            value={row.tyLeSoHuuBieuQuyet}
                                            onChange={(e) => handleRowChange(idx, e)}
                                        />
                                    </td>
                                    <td className={styles.td}>
                                        <input
                                            className={styles.cellInput}
                                            name="quyenChiPhoi"
                                            value={row.quyenChiPhoi}
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

                <div style={{ marginTop: "20px", fontSize: "14px", lineHeight: "1.6", fontStyle: "italic", background: "#f9f9f9", padding: "15px", borderRadius: "5px", border: "1px dashed #ccc" }}>
                    <p>Nếu cột số 5 kê khai Số định danh cá nhân thì không phải kê khai các cột số 6, 7.</p>
                    <p>Trường hợp CSHHL thông qua sở hữu vốn điều lệ hoặc tổng số cổ phần có quyền biểu quyết được xác định như sau:</p>
                    <ul>
                        <li>Cá nhân là cổ đông sở hữu từ 25% tổng số cổ phần có quyền biểu quyết trở lên;</li>
                        <li>Cá nhân là thành viên sở hữu từ 25% vốn điều lệ trở lên của công ty trách nhiệm hữu hạn hai thành viên trở lên;</li>
                        <li>Cá nhân là chủ sở hữu công ty trách nhiệm hữu hạn một thành viên;</li>
                        <li>Cá nhân là thành viên hợp danh công ty hợp danh.</li>
                    </ul>
                    <p>Tỷ lệ sở hữu cổ phần có quyền biểu quyết = Số cổ phần có quyền biểu quyết của chủ sở hữu hưởng lợi / tổng số cổ phần có quyền biểu quyết của công ty cổ phần.</p>
                    <p>Nếu doanh nghiệp xác định được chủ sở hữu hưởng lợi của doanh nghiệp theo quy định tại điểm b khoản 1 Điều 17 Nghị định số 168/2025/NĐ-CP thông qua quyền chi phối, doanh nghiệp ghi rõ một trong các quyền chi phối sau: bổ nhiệm, miễn nhiệm hoặc bãi nhiệm đa số hoặc tất cả thành viên hội đồng quản trị, chủ tịch hội đồng quản trị, chủ tịch hội đồng thành viên; người đại diện theo pháp luật, giám đốc hoặc tổng giám đốc của doanh nghiệp; sửa đổi, bổ sung điều lệ của doanh nghiệp; thay đổi cơ cấu tổ chức quản lý công ty; tổ chức lại, giải thể công ty.</p>
                </div>

                <Signature
                    subject="NGƯỜI ĐẠI DIỆN THEO PHÁP LUẬT"
                    dataJson={dataJson}
                />
            </div>
        </form>
    );
});

export default DanhSachCSHHuongLoiDeclaration;
