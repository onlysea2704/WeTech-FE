import React, { forwardRef, useState, useEffect, useImperativeHandle } from "react";
// Reuse styles from the Shared component
import styles from "@/components/Procedure/ProcedureTemplate/CongTyTNHH1TV/ThanhLapMoi/FormDeclaration/SharedDeclaration.module.css";
import NganhNgheTable from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/NganhNgheTable/NganhNgheTable";
import Signature from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/Signature/Signature";
import deleteIcon from "@/assets/delete-icon.png";

// Import Shared Sections
import TenCongTySection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/TenCongTySection";
import DiaChiTruSoSection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/DiaChiTruSoSection";
import NguoiDaiDienPhapLuatSection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/NguoiDaiDienPhapLuatSection";
import VonDieuLeSection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/VonDieuLeSection";
import { useGetFormDataJsonFromName } from "@/pages/User/ProcessProcedure/ProcessProcedure";

const EMPTY_MEMBER_ROW = {
    hoTen: "",
    phanVonGop: "",
    tyLe: "",
    loaiTaiSan: "",
    thoiHan: "",
    ghiChu: "",
};

const DieuLeCongTyDeclaration = forwardRef(function DieuLeCongTyDeclaration(
    { formId, dataJson, onSubmit, formRef },
    componentRef,
) {
    const [nganhNgheRows, setNganhNgheRows] = useState([]);
    const [thanhVienRows, setThanhVienRows] = useState([]);
    const thanhVienList = useGetFormDataJsonFromName("Danh sách thành viên")?.thanhVienList || [];

    // Sync state from dataJson
    useEffect(() => {
        if (dataJson) {
            setNganhNgheRows(dataJson.nganhNgheList || []);
            setThanhVienRows(dataJson.thanhVienList || []);
        } else {
            setNganhNgheRows([]);
            setThanhVienRows([]);
        }
    }, [dataJson]);

    // Expose API
    useImperativeHandle(componentRef, () => ({
        getDraftData: () => {
            if (!formRef?.current) return null;
            const formData = new FormData(formRef.current);
            const data = Object.fromEntries(formData.entries());
            // Sync the data explicitly
            data.nganhNgheList = nganhNgheRows;
            data.thanhVienList = thanhVienRows;
            return data;
        },
        getExportData: () => {
            if (!formRef?.current) return null;
            if (!formRef.current.checkValidity()) {
                formRef.current.reportValidity();
                return null;
            }
            const formData = new FormData(formRef.current);
            const data = Object.fromEntries(formData.entries());
            data.nganhNgheList = nganhNgheRows;
            data.thanhVienList = thanhVienRows;
            return data;
        },
        importData: (importedData) => {
            if (!importedData) return;
            setNganhNgheRows(importedData.nganhNgheList || []);
            setThanhVienRows(importedData.thanhVienList || []);
        },
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        data.nganhNgheList = nganhNgheRows;
        data.thanhVienList = thanhVienRows;
        if (onSubmit) onSubmit(data);
    };

    const handleAddMember = () => {
        setThanhVienRows([...thanhVienRows, { ...EMPTY_MEMBER_ROW }]);
    };

    const handleDeleteMember = (idx) => {
        setThanhVienRows(thanhVienRows.filter((_, i) => i !== idx));
    };

    const handleMemberRowChange = (idx, e) => {
        const { name, value } = e.target;
        const newRows = [...thanhVienRows];
        newRows[idx] = { ...newRows[idx], [name]: value };
        setThanhVienRows(newRows);
    };

    return (
        <form onSubmit={handleSubmit} ref={formRef} key={dataJson ? "loaded" : "empty"}>
            {/* 1. TÊN CÔNG TY */}
            <TenCongTySection dataJson={dataJson} styles={styles} />

            {/* 2. ĐỊA CHỈ TRỤ SỞ */}
            <DiaChiTruSoSection dataJson={dataJson} styles={styles} />

            {/* 3. NGÀNH NGHỀ KINH DOANH */}
            <div className={styles.sectionGroup}>
                <h3 className={styles.sectionTitle}>Ngành, nghề kinh doanh:</h3>
                <NganhNgheTable rows={nganhNgheRows} onChangeRows={setNganhNgheRows} />
            </div>

            {/* 4. NGƯỜI ĐẠI DIỆN PHÁP LUẬT */}
            <NguoiDaiDienPhapLuatSection dataJson={dataJson} styles={styles} />

            {/* 5. VỐN ĐIỀU LỆ */}
            <VonDieuLeSection dataJson={dataJson} styles={styles} />

            {/* 6. PHẦN GÓP VỐN CỦA CÁC THÀNH VIÊN */}
            <div className={styles.sectionGroup}>
                <h3 className={styles.sectionTitle}>
                    Phần vốn góp, giá trị phần vốn góp của các thành viên, thời hạn góp vốn:
                </h3>

                <div style={{ marginBottom: "10px" }}>
                    <button type="button" className={styles.btnPrimary} style={{ padding: "6px 16px", background: "#1b154b", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }} onClick={handleAddMember}>
                        Thêm dòng
                    </button>
                </div>

                <div className={styles.tableWrapper} style={{ overflowX: "auto" }}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 50 }}>Stt</th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 200 }}>Tên thành viên</th>
                                <th colSpan={3} className={styles.th}>Vốn góp</th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 150 }}>Thời hạn góp vốn</th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 150 }}>Ghi chú</th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 80 }}>Thao tác</th>
                            </tr>
                            <tr>
                                <th className={styles.th} style={{ minWidth: 200 }}>
                                    Phần vốn góp (bằng số; VNĐ và giá trị tương đương theo đơn vị tiền nước ngoài: bằng số, loại ngoại tệ, nếu có)
                                </th>
                                <th className={styles.th} style={{ minWidth: 80 }}>Tỷ lệ (%)</th>
                                <th className={styles.th} style={{ minWidth: 180 }}>Loại tài sản, số lượng, giá trị tài sản góp vốn</th>
                            </tr>
                            <tr className={styles.colNumberRow}>
                                <td className={styles.colNumber}>1</td>
                                <td className={styles.colNumber}></td>
                                <td className={styles.colNumber}></td>
                                <td className={styles.colNumber}></td>
                                <td className={styles.colNumber}></td>
                                <td className={styles.colNumber}></td>
                                <td className={styles.colNumber}></td>
                                <td className={styles.colNumber}></td>
                            </tr>
                        </thead>
                        <tbody>
                            {thanhVienRows.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className={styles.td} style={{ textAlign: "center", padding: "20px" }}>
                                        Chưa có thông tin thành viên dự kiến. Nhấn "Thêm dòng" để bắt đầu.
                                    </td>
                                </tr>
                            ) : (
                                thanhVienRows.map((row, idx) => (
                                    <tr key={idx}>
                                        <td className={styles.td} style={{ textAlign: "center" }}>{idx + 1}</td>
                                        <td className={styles.td}>
                                            <input
                                                type="text"
                                                className={styles.input}
                                                name="hoTen"
                                                value={row.hoTen}
                                                onChange={(e) => handleMemberRowChange(idx, e)}
                                            />
                                        </td>
                                        <td className={styles.td}>
                                            <input
                                                type="text"
                                                className={styles.input}
                                                name="phanVonGop"
                                                value={row.phanVonGop}
                                                onChange={(e) => handleMemberRowChange(idx, e)}
                                            />
                                        </td>
                                        <td className={styles.td}>
                                            <input
                                                type="text"
                                                className={styles.input}
                                                name="tyLe"
                                                value={row.tyLe}
                                                onChange={(e) => handleMemberRowChange(idx, e)}
                                            />
                                        </td>
                                        <td className={styles.td}>
                                            <input
                                                type="text"
                                                className={styles.input}
                                                name="loaiTaiSan"
                                                value={row.loaiTaiSan}
                                                onChange={(e) => handleMemberRowChange(idx, e)}
                                            />
                                        </td>
                                        <td className={styles.td}>
                                            <input
                                                type="text"
                                                className={styles.input}
                                                name="thoiHan"
                                                value={row.thoiHan}
                                                onChange={(e) => handleMemberRowChange(idx, e)}
                                            />
                                        </td>
                                        <td className={styles.td}>
                                            <input
                                                type="text"
                                                className={styles.input}
                                                name="ghiChu"
                                                value={row.ghiChu}
                                                onChange={(e) => handleMemberRowChange(idx, e)}
                                            />
                                        </td>
                                        <td className={styles.td} style={{ textAlign: "center" }}>
                                            <img
                                                src={deleteIcon}
                                                alt="Xóa"
                                                onClick={() => handleDeleteMember(idx)}
                                                width="18"
                                                height="18"
                                                style={{ cursor: "pointer", display: "inline-block" }}
                                            />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 7. CHỮ KÝ */}
            <div className={styles.sectionGroup} style={{ paddingTop: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flexWrap: "wrap", gap: "20px" }}>
                    <div>
                        <div className={styles.sectionTitle} style={{ textTransform: "uppercase", fontWeight: 500 }}>Chữ ký của các thành viên:</div>
                        {thanhVienList.length > 0 ? (
                            thanhVienList.map((row, idx) => (
                                <div key={`member-sig-${idx}`} style={{ flex: 1, minWidth: "300px" }}>
                                    <Signature
                                        subject={`Chữ ký của ${row.hoTen || `Thành viên ${idx + 1}`}`}
                                        dataJson={dataJson}
                                        namePrefix={`chuKyThanhVien_${idx}`}
                                    />
                                </div>
                            ))
                        ) : (
                            <div style={{ flex: 1, minWidth: "300px" }}>
                                <Signature
                                    subject="Chữ ký của thành viên"
                                    dataJson={dataJson}
                                    namePrefix="chuKyThanhVien_0"
                                />
                            </div>
                        )}
                    </div>
                    <div style={{ flex: 1, minWidth: "300px" }}>
                        <Signature
                            subject="NGƯỜI ĐẠI DIỆN THEO PHÁP LUẬT CỦA DOANH NGHIỆP"
                            dataJson={dataJson}
                        />
                    </div>
                </div>
            </div>

        </form>
    );
});

export default DieuLeCongTyDeclaration;
