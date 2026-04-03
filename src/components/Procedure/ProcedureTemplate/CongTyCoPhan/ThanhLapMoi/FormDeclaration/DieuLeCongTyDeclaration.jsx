import React, { forwardRef, useState, useEffect, useImperativeHandle, useRef } from "react";
import styles from "@/components/Procedure/ProcedureTemplate/CongTyTNHH1TV/ThanhLapMoi/FormDeclaration/SharedDeclaration.module.css";
import numberToVietnameseText from "@/utils/numberToVietnameseText";
import NganhNgheTable from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/NganhNgheTable/NganhNgheTable";
import Signature from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/Signature/Signature";
import deleteIcon from "@/assets/delete-icon.png";

import TenCongTySection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/TenCongTySection";
import DiaChiTruSoSection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/DiaChiTruSoSection";
import NguoiDaiDienPhapLuatSection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/NguoiDaiDienPhapLuatSection";
import VonDieuLeSection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/VonDieuLeSection";
import { useGetFormDataJsonFromName } from "@/pages/User/ProcessProcedure/ProcessProcedure";

const EMPTY_CO_DONG_ROW = {
    hoTen: "",
    tongSoCoPhan_soLuong: "",
    tongSoCoPhan_giaTri: "",
    tyLe: "",
    loaiCoPhan_phoThong_soLuong: "",
    loaiCoPhan_phoThong_giaTri: "",
    loaiCoPhan_khac_soLuong: "",
    loaiCoPhan_khac_giaTri: "",
    loaiTaiSan: "",
    thoiHan: "",
};

const DieuLeCongTyDeclaration = forwardRef(function DieuLeCongTyDeclaration(
    { formId, dataJson, onSubmit, formRef },
    componentRef,
) {
    const [nganhNgheRows, setNganhNgheRows] = useState([]);
    const [coDongRows, setCoDongRows] = useState([]);
    const [loaiCoPhanKhacTen, setLoaiCoPhanKhacTen] = useState("");
    
    // States for auto format Mệnh giá
    const [menhGiaSo, setMenhGiaSo] = useState("");
    const [menhGiaChu, setMenhGiaChu] = useState("");
    const [cursor, setCursor] = useState(null);
    const menhGiaRef = useRef(null);

    function formatNumber(val) {
        const raw = String(val).replace(/[^0-9]/g, "");
        if (!raw) return "";
        return Number(raw).toLocaleString("vi-VN");
    }

    const coDongList = useGetFormDataJsonFromName("Danh sách cổ đông sáng lập")?.coDongList || [];

    useEffect(() => {
        if (dataJson) {
            setNganhNgheRows(dataJson.nganhNgheList || []);
            setCoDongRows(dataJson.coDongRows || []);
            setLoaiCoPhanKhacTen(dataJson.loaiCoPhanKhacTen || "");
            
            const parsed = dataJson.menhGiaCoPhan_bangSo ? formatNumber(String(dataJson.menhGiaCoPhan_bangSo)) : "";
            setMenhGiaSo(parsed);
            
            if (dataJson.menhGiaCoPhan_bangChu) {
                setMenhGiaChu(dataJson.menhGiaCoPhan_bangChu);
            } else if (parsed) {
                setMenhGiaChu(numberToVietnameseText(parsed));
            } else {
                setMenhGiaChu("");
            }
        } else {
            setNganhNgheRows([]);
            setCoDongRows([]);
            setLoaiCoPhanKhacTen("");
            setMenhGiaSo("");
            setMenhGiaChu("");
        }
    }, [dataJson]);

    useEffect(() => {
        if (cursor !== null && menhGiaRef.current) {
            menhGiaRef.current.setSelectionRange(cursor, cursor);
            setCursor(null);
        }
    }, [menhGiaSo, cursor]);

    const handleChangeMenhGia = (e) => {
        const input = e.target;
        const val = input.value;
        const pos = input.selectionStart;
        const oldLen = val.length;

        const formatted = formatNumber(val);
        setMenhGiaSo(formatted);

        if (formatted) {
            setMenhGiaChu(numberToVietnameseText(formatted));
        } else {
            setMenhGiaChu("");
        }

        const diff = formatted.length - oldLen;
        setCursor(pos + diff);
    };

    useImperativeHandle(componentRef, () => ({
        getDraftData: () => {
            if (!formRef?.current) return null;
            const formData = new FormData(formRef.current);
            const data = Object.fromEntries(formData.entries());
            data.nganhNgheList = nganhNgheRows;
            data.coDongRows = coDongRows;
            data.loaiCoPhanKhacTen = loaiCoPhanKhacTen;
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
            data.coDongRows = coDongRows;
            data.loaiCoPhanKhacTen = loaiCoPhanKhacTen;
            return data;
        },
        importData: (importedData) => {
            if (!importedData) return;
            setNganhNgheRows(importedData.nganhNgheList || []);
            setCoDongRows(importedData.coDongRows || []);
            setLoaiCoPhanKhacTen(importedData.loaiCoPhanKhacTen || "");

            if (importedData.menhGiaCoPhan_bangSo !== undefined) {
                const parsed = formatNumber(String(importedData.menhGiaCoPhan_bangSo));
                setMenhGiaSo(parsed);
                
                if (importedData.menhGiaCoPhan_bangChu) {
                    setMenhGiaChu(importedData.menhGiaCoPhan_bangChu);
                } else if (parsed) {
                    setMenhGiaChu(numberToVietnameseText(parsed));
                } else {
                    setMenhGiaChu("");
                }
            }
        },
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        data.nganhNgheList = nganhNgheRows;
        data.coDongRows = coDongRows;
        data.loaiCoPhanKhacTen = loaiCoPhanKhacTen;
        if (onSubmit) onSubmit(data);
    };

    const handleAddRow = () => {
        setCoDongRows([...coDongRows, { ...EMPTY_CO_DONG_ROW }]);
    };

    const handleDeleteRow = (idx) => {
        setCoDongRows(coDongRows.filter((_, i) => i !== idx));
    };

    const handleRowChange = (idx, e) => {
        const { name, value } = e.target;
        const newRows = [...coDongRows];
        newRows[idx] = { ...newRows[idx], [name]: value };
        setCoDongRows(newRows);
    };

    return (
        <form onSubmit={handleSubmit} ref={formRef} key={dataJson ? "loaded" : "empty"}>
            <TenCongTySection dataJson={dataJson} styles={styles} />
            <DiaChiTruSoSection dataJson={dataJson} styles={styles} />

            <div className={styles.sectionGroup}>
                <h3 className={styles.sectionTitle}>Ngành, nghề kinh doanh:</h3>
                <NganhNgheTable rows={nganhNgheRows} onChangeRows={setNganhNgheRows} />
            </div>

            <NguoiDaiDienPhapLuatSection dataJson={dataJson} styles={styles} />

            <VonDieuLeSection dataJson={dataJson} styles={styles} />

            <div className={styles.sectionGroup}>
                <h3 className={styles.sectionTitle}>Thông tin cổ phần của cổ đông sáng lập đăng ký:</h3>
                <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tổng số cổ phần cổ đông sáng lập đăng ký mua:</label>
                        <input type="text" className={styles.input} name="soCoPhanCoDongSangLap" defaultValue={dataJson?.soCoPhanCoDongSangLap || ""} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Loại cổ phần:</label>
                        <select className={styles.select} name="loaiCoPhan" defaultValue={dataJson?.loaiCoPhan || "Phổ thông"}>
                            <option value="Phổ thông">Phổ thông</option>
                            <option value="Ưu đãi cổ tức">Ưu đãi cổ tức</option>
                            <option value="Ưu đãi hoàn lại">Ưu đãi hoàn lại</option>
                            <option value="Ưu đãi biểu quyết">Ưu đãi biểu quyết</option>
                        </select>
                    </div>
                </div>
                <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Mệnh giá cổ phần (bằng số):</label>
                        <input type="text" className={styles.input} ref={menhGiaRef} name="menhGiaCoPhan_bangSo" value={menhGiaSo} onChange={handleChangeMenhGia} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Mệnh giá cổ phần (bằng chữ):</label>
                        <input type="text" className={styles.input} name="menhGiaCoPhan_bangChu" value={menhGiaChu} readOnly />
                    </div>
                </div>
            </div>

            <div className={styles.sectionGroup}>
                <h3 className={styles.sectionTitle}>
                    Cổ đông sáng lập, số cổ phần, giá trị cổ phần của từng cổ đông sáng lập, thời hạn góp vốn:
                </h3>

                <div style={{ marginBottom: "10px" }}>
                    <button type="button" className={styles.btnPrimary} style={{ padding: "6px 16px", background: "#1b154b", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }} onClick={handleAddRow}>
                        Thêm dòng
                    </button>
                </div>

                <div className={styles.tableWrapper} style={{ overflowX: "auto" }}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th rowSpan={3} className={styles.th} style={{ minWidth: 40 }}>STT</th>
                                <th rowSpan={3} className={styles.th} style={{ minWidth: 150 }}>Tên cổ đông sáng lập</th>
                                <th colSpan={8} className={styles.th}>Vốn góp</th>
                                <th rowSpan={3} className={styles.th} style={{ minWidth: 120 }}>Thời hạn góp vốn</th>
                                <th rowSpan={3} className={styles.th} style={{ minWidth: 60 }}>Thao tác</th>
                            </tr>
                            <tr>
                                <th colSpan={2} className={styles.th}>Tổng số cổ phần</th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 60 }}>Tỷ lệ (%)</th>
                                <th colSpan={4} className={styles.th}>Loại cổ phần</th>
                                <th rowSpan={2} className={styles.th} style={{ minWidth: 160 }}>Loại tài sản, số lượng, giá trị tài sản góp vốn</th>
                            </tr>
                            <tr>
                                <th className={styles.th} style={{ minWidth: 80 }}>Số lượng</th>
                                <th className={styles.th} style={{ minWidth: 100 }}>Giá trị</th>
                                <th colSpan={2} className={styles.th}>Phổ thông</th>
                                <th colSpan={2} className={styles.th} style={{ padding: "4px" }}>
                                    <input
                                        type="text"
                                        className={styles.input}
                                        placeholder="Nhập loại cổ phần khác..."
                                        value={loaiCoPhanKhacTen}
                                        onChange={(e) => setLoaiCoPhanKhacTen(e.target.value)}
                                        style={{
                                            outline: "none",
                                            border: "none",
                                            color: "#fff",
                                            textAlign: "center",
                                            backgroundColor: "transparent",
                                            fontWeight: "bold",
                                            width: "100%"
                                        }}
                                    />
                                </th>
                            </tr>
                            <tr>
                                {/* Dummy row for Sub-Sub-headers */}
                                <th colSpan={5} className={styles.th}></th>
                                <th className={styles.th} style={{ minWidth: 80 }}>Số lượng</th>
                                <th className={styles.th} style={{ minWidth: 100 }}>Giá trị</th>
                                <th className={styles.th} style={{ minWidth: 80 }}>Số lượng</th>
                                <th className={styles.th} style={{ minWidth: 100 }}>Giá trị</th>
                                <th colSpan={3} className={styles.th}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {coDongRows.length === 0 ? (
                                <tr>
                                    <td colSpan={12} className={styles.td} style={{ textAlign: "center", padding: "20px" }}>
                                        Chưa có cổ đông. Nhấn "Thêm dòng" để bắt đầu.
                                    </td>
                                </tr>
                            ) : (
                                coDongRows.map((row, idx) => (
                                    <tr key={idx}>
                                        <td className={styles.td} style={{ textAlign: "center" }}>{idx + 1}</td>
                                        <td className={styles.td}>
                                            <input type="text" className={styles.input} name="hoTen" value={row.hoTen} onChange={(e) => handleRowChange(idx, e)} />
                                        </td>
                                        <td className={styles.td}>
                                            <input type="text" className={styles.input} name="tongSoCoPhan_soLuong" value={row.tongSoCoPhan_soLuong} onChange={(e) => handleRowChange(idx, e)} />
                                        </td>
                                        <td className={styles.td}>
                                            <input type="text" className={styles.input} name="tongSoCoPhan_giaTri" value={row.tongSoCoPhan_giaTri} onChange={(e) => handleRowChange(idx, e)} />
                                        </td>
                                        <td className={styles.td}>
                                            <input type="text" className={styles.input} name="tyLe" value={row.tyLe} onChange={(e) => handleRowChange(idx, e)} />
                                        </td>
                                        <td className={styles.td}>
                                            <input type="text" className={styles.input} name="loaiCoPhan_phoThong_soLuong" value={row.loaiCoPhan_phoThong_soLuong} onChange={(e) => handleRowChange(idx, e)} />
                                        </td>
                                        <td className={styles.td}>
                                            <input type="text" className={styles.input} name="loaiCoPhan_phoThong_giaTri" value={row.loaiCoPhan_phoThong_giaTri} onChange={(e) => handleRowChange(idx, e)} />
                                        </td>
                                        <td className={styles.td}>
                                            <input type="text" className={styles.input} name="loaiCoPhan_khac_soLuong" value={row.loaiCoPhan_khac_soLuong} onChange={(e) => handleRowChange(idx, e)} />
                                        </td>
                                        <td className={styles.td}>
                                            <input type="text" className={styles.input} name="loaiCoPhan_khac_giaTri" value={row.loaiCoPhan_khac_giaTri} onChange={(e) => handleRowChange(idx, e)} />
                                        </td>
                                        <td className={styles.td}>
                                            <input type="text" className={styles.input} name="loaiTaiSan" value={row.loaiTaiSan} onChange={(e) => handleRowChange(idx, e)} />
                                        </td>
                                        <td className={styles.td}>
                                            <input type="text" className={styles.input} name="thoiHan" value={row.thoiHan} onChange={(e) => handleRowChange(idx, e)} />
                                        </td>
                                        <td className={styles.tdAction}>
                                            <img
                                                src={deleteIcon}
                                                alt="Xóa"
                                                onClick={() => handleDeleteRow(idx)}
                                                width="18"
                                                height="18"
                                                style={{ cursor: "pointer", display: "block", margin: "0 auto" }}
                                            />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={styles.sectionGroup} style={{ paddingTop: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flexWrap: "wrap", gap: "20px" }}>
                    <div>
                        <div className={styles.sectionTitle} style={{ textTransform: "uppercase", fontWeight: 500 }}>Chữ ký của các cổ đông sáng lập:</div>
                        {coDongList.length > 0 ? (
                            coDongList.map((row, idx) => (
                                <div key={`member-sig-${idx}`} style={{ flex: 1, minWidth: "300px" }}>
                                    <Signature
                                        subject={`Chữ ký của ${row.hoTen || `Cổ đông ${idx + 1}`}`}
                                        dataJson={dataJson}
                                        namePrefix={`chuKyCoDong_${idx}`}
                                    />
                                </div>
                            ))
                        ) : (
                            <div style={{ flex: 1, minWidth: "300px" }}>
                                <Signature
                                    subject="Chữ ký của cổ đông sáng lập"
                                    dataJson={dataJson}
                                    namePrefix="chuKyCoDong_0"
                                />
                            </div>
                        )}
                    </div>
                    <div style={{ flex: 1, minWidth: "300px" }}>
                        <Signature
                            subject="NGƯỜI ĐẠI DIỆN THEO PHÁP LUẬT"
                            dataJson={dataJson}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
});

export default DieuLeCongTyDeclaration;
