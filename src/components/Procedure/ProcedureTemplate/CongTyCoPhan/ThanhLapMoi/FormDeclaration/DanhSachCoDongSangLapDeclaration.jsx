import React, { forwardRef, useState, useEffect, useImperativeHandle } from "react";
import styles from "@/components/Procedure/ProcedureTemplate/CongTyTNHH1TV/ThanhLapMoi/FormDeclaration/DanhSachCSHHuongLoiDeclaration.module.css";
import {
    GioiTinhSelect,
    DanTocSelect,
    QuocTichSelect,
} from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/PersonalSelects/PersonalSelects";
import DateInput from "@/components/DateInput/DateInput";
import Signature from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/Signature/Signature";
import InfoTooltip from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/InfoTooltip/InfoTooltip";
import deleteIcon from "@/assets/delete-icon.png";

const EMPTY_ROW = {
    hoTen: "",
    ngaySinh: "",
    gioiTinh: "",
    giaTo: "",
    quocTich: "Việt Nam",
    danToc: "",
    diaChiLienLac: "",
    tongSoCoPhan_soLuong: "",
    tongSoCoPhan_giaTri: "",
    tyLe: "",
    loaiCoPhan_phoThong_soLuong: "",
    loaiCoPhan_phoThong_giaTri: "",
    loaiCoPhan_khac_soLuong: "",
    loaiCoPhan_khac_giaTri: "",
    loaiTaiSanGopVon: "",
    thoiHanGopVon: "",
    ghiChu: "",
};

const DanhSachCoDongSangLapDeclaration = forwardRef(function DanhSachCoDongSangLapDeclaration(
    { formId, dataJson, onSubmit, formRef },
    componentRef,
) {
    const [rows, setRows] = useState([]);
    const [loaiCoPhanKhacTen, setLoaiCoPhanKhacTen] = useState("");

    useEffect(() => {
        if (dataJson?.coDongList?.length) {
            setRows(dataJson.coDongList);
        } else {
            setRows([]);
        }
        if (dataJson?.loaiCoPhanKhac_ten) {
            setLoaiCoPhanKhacTen(dataJson.loaiCoPhanKhac_ten);
        }
    }, [dataJson]);

    useImperativeHandle(componentRef, () => ({
        getDraftData: () => {
            if (!formRef?.current) return null;
            const formData = new FormData(formRef.current);
            return {
                coDongList: rows,
                loaiCoPhanKhac_ten: loaiCoPhanKhacTen,
                chuKy_ten: formData.get("chuKy_ten") || "",
                chuKy_hoTen: formData.get("chuKy_hoTen") || ""
            };
        },
        getExportData: () => {
            if (rows.length === 0) {
                alert("Vui lòng nhập ít nhất một cổ đông sáng lập.");
                return null;
            }
            if (!formRef?.current) return null;
            if (!formRef.current.checkValidity()) {
                formRef.current.reportValidity();
                return null;
            }
            const formData = new FormData(formRef.current);
            return {
                coDongList: rows,
                loaiCoPhanKhac_ten: loaiCoPhanKhacTen,
                chuKy_ten: formData.get("chuKy_ten") || "",
                chuKy_hoTen: formData.get("chuKy_hoTen") || ""
            };
        },
        importData: (imported) => {
            if (imported?.coDongList?.length) setRows(imported.coDongList);
            if (imported?.loaiCoPhanKhac_ten) setLoaiCoPhanKhacTen(imported.loaiCoPhanKhac_ten);
        },
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (onSubmit) onSubmit({
            coDongList: rows,
            loaiCoPhanKhac_ten: loaiCoPhanKhacTen,
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
                <div style={{ textAlign: "center", marginTop: "10px", fontWeight: "bold", fontSize: "16px", textTransform: "uppercase" }}>
                    DANH SÁCH CỔ ĐÔNG SÁNG LẬP CÔNG TY CỔ PHẦN
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
                                <th rowSpan={4} className={styles.th} style={{ minWidth: 40 }}>STT</th>
                                <th rowSpan={4} className={styles.th} style={{ minWidth: 150 }}>Tên cổ đông sáng lập</th>
                                <th rowSpan={4} className={styles.th} style={{ minWidth: 120 }}>Ngày, tháng, năm sinh</th>
                                <th rowSpan={4} className={styles.th} style={{ minWidth: 80 }}>Giới tính</th>
                                <th rowSpan={4} className={styles.th} style={{ minWidth: 180 }}>
                                    Loại giấy tờ, số, ngày cấp, cơ quan cấp Giấy tờ pháp lý của cá nhân
                                </th>
                                <th rowSpan={4} className={styles.th} style={{ minWidth: 100 }}>Quốc tịch</th>
                                <th rowSpan={4} className={styles.th} style={{ minWidth: 100 }}>Dân tộc</th>
                                <th rowSpan={4} className={styles.th} style={{ minWidth: 150 }}>Địa chỉ liên lạc</th>
                                <th colSpan={8} className={styles.th}>
                                    Vốn góp
                                    <InfoTooltip color="#fff" content="Ghi giá trị vốn cổ phần của từng cổ đông sáng lập. Tài sản hình thành giá trị vốn cổ phần cần được liệt kê cụ thể" />
                                </th>
                                <th rowSpan={4} className={styles.th} style={{ minWidth: 120 }}>
                                    Thời hạn góp vốn
                                    <InfoTooltip color="#fff" content="Khi đăng ký thành lập doanh nghiệp, thời hạn góp vốn là thời hạn cổ đông dự kiến hoàn thành góp vốn" />
                                </th>
                                <th rowSpan={4} className={styles.th} style={{ minWidth: 120 }}>Ghi chú (nếu có)</th>
                                <th rowSpan={4} className={styles.th} style={{ minWidth: 60 }}>Thao tác</th>
                            </tr>
                            <tr>
                                <th colSpan={2} className={styles.th}>Tổng số cổ phần</th>
                                <th rowSpan={3} className={styles.th} style={{ minWidth: 60 }}>Tỷ lệ (%)</th>
                                <th colSpan={4} className={styles.th}>Loại cổ phần</th>
                                <th rowSpan={3} className={styles.th} style={{ minWidth: 160 }}>
                                    Loại tài sản, số lượng, giá trị tài sản góp vốn
                                    <InfoTooltip color="#fff" content="Loại tài sản góp vốn bao gồm: Đồng Việt Nam; Ngoại tệ tự do chuyển đổi; Vàng; Quyền sử dụng đất; Quyền sở hữu trí tuệ; Công nghệ; Bí quyết kỹ thuật; Tài sản khác" />
                                </th>
                            </tr>
                            <tr>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 100 }}>Số lượng</th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 100 }}>Giá trị</th>
                                <th colSpan={2} className={styles.th}>Phổ thông</th>
                                <th colSpan={2} className={styles.th} style={{ padding: "4px" }}>
                                    <input
                                        type="text"
                                        className={styles.input}
                                        placeholder="Nhập loại cổ phần khác..."
                                        value={loaiCoPhanKhacTen}
                                        onChange={(e) => setLoaiCoPhanKhacTen(e.target.value)}
                                        style={{
                                            color: "#fff",
                                            textAlign: "center", backgroundColor: "transparent",
                                            border: "none",
                                            outline: "none"
                                        }}
                                    />
                                </th>
                            </tr>
                            <tr>
                                <th className={styles.th} style={{ minWidth: 100 }}>Số lượng</th>
                                <th className={styles.th} style={{ minWidth: 100 }}>Giá trị</th>
                                <th className={styles.th} style={{ minWidth: 100 }}>Số lượng</th>
                                <th className={styles.th} style={{ minWidth: 100 }}>Giá trị</th>
                            </tr>
                            <tr className={styles.colNumberRow}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, ""].map((n, i) => (
                                    <td key={i} className={styles.colNumber}>{n}</td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.length === 0 && (
                                <tr>
                                    <td colSpan={20} className={styles.emptyRow}>
                                        Chưa có cổ đông sáng lập. Nhấn "Thêm dòng" để bắt đầu.
                                    </td>
                                </tr>
                            )}
                            {rows.map((row, idx) => (
                                <tr key={idx} className={styles.trEdit}>
                                    <td className={styles.td} style={{ textAlign: "center" }}>{idx + 1}</td>
                                    <td className={styles.td}>
                                        <input
                                            className={styles.input}
                                            name="hoTen"
                                            value={row.hoTen}
                                            onChange={(e) => handleRowChange(idx, e)}
                                        />
                                    </td>
                                    <td className={styles.td}>
                                        <DateInput
                                            className={styles.input}
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
                                            className={styles.input}
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
                                            className={styles.input}
                                            name="diaChiLienLac"
                                            value={row.diaChiLienLac}
                                            onChange={(e) => handleRowChange(idx, e)}
                                        />
                                    </td>

                                    {/* 9 - 16: Vốn góp */}
                                    <td className={styles.td}>
                                        <input className={styles.input} name="tongSoCoPhan_soLuong" value={row.tongSoCoPhan_soLuong} onChange={(e) => handleRowChange(idx, e)} />
                                    </td>
                                    <td className={styles.td}>
                                        <input className={styles.input} name="tongSoCoPhan_giaTri" value={row.tongSoCoPhan_giaTri} onChange={(e) => handleRowChange(idx, e)} />
                                    </td>
                                    <td className={styles.td}>
                                        <input className={styles.input} name="tyLe" value={row.tyLe} onChange={(e) => handleRowChange(idx, e)} />
                                    </td>
                                    <td className={styles.td}>
                                        <input className={styles.input} name="loaiCoPhan_phoThong_soLuong" value={row.loaiCoPhan_phoThong_soLuong} onChange={(e) => handleRowChange(idx, e)} />
                                    </td>
                                    <td className={styles.td}>
                                        <input className={styles.input} name="loaiCoPhan_phoThong_giaTri" value={row.loaiCoPhan_phoThong_giaTri} onChange={(e) => handleRowChange(idx, e)} />
                                    </td>
                                    <td className={styles.td}>
                                        <input className={styles.input} name="loaiCoPhan_khac_soLuong" value={row.loaiCoPhan_khac_soLuong} onChange={(e) => handleRowChange(idx, e)} />
                                    </td>
                                    <td className={styles.td}>
                                        <input className={styles.input} name="loaiCoPhan_khac_giaTri" value={row.loaiCoPhan_khac_giaTri} onChange={(e) => handleRowChange(idx, e)} />
                                    </td>
                                    <td className={styles.td}>
                                        <input className={styles.input} name="loaiTaiSanGopVon" value={row.loaiTaiSanGopVon} onChange={(e) => handleRowChange(idx, e)} />
                                    </td>

                                    {/* 17 - 19 */}
                                    <td className={styles.td}>
                                        <input className={styles.input} name="thoiHanGopVon" value={row.thoiHanGopVon} onChange={(e) => handleRowChange(idx, e)} />
                                    </td>
                                    <td className={styles.td}>
                                        <input className={styles.input} name="ghiChu" value={row.ghiChu} onChange={(e) => handleRowChange(idx, e)} />
                                    </td>

                                    {/* Actions */}
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
            </div>
        </form>
    );
});

export default DanhSachCoDongSangLapDeclaration;
