import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
// Reusing styles from 1TV/2TV as they are identical
import styles from "@/components/Procedure/ProcedureTemplate/CongTyTNHH1TV/ThanhLapMoi/FormDeclaration/SharedDeclaration.module.css";
import NganhNgheTable from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/NganhNgheTable/NganhNgheTable";

import KinhGuiSection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/KinhGuiSection";
import ThongTinNguoiNopSection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/ThongTinNguoiNopSection";
import TinhTrangThanhLapSection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/TinhTrangThanhLapSection";
import TenCongTySection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/TenCongTySection";
import DiaChiTruSoSection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/DiaChiTruSoSection";
import VonDieuLeSection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/VonDieuLeSection";
import NguonVonDieuLeSection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/NguonVonDieuLeSection";
import NguoiDaiDienPhapLuatSection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/NguoiDaiDienPhapLuatSection";
import ThongTinDangKyThueSection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/ThongTinDangKyThueSection";
import BaoHiemXaHoiSection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/BaoHiemXaHoiSection";
import ChuSoHuuHuongLoiSection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/ChuSoHuuHuongLoiSection";

const GiayDeNghiDKDNDeclaration = forwardRef(function GiayDeNghiDKDNDeclaration(
    { formId, dataJson, onSubmit, formRef },
    componentRef,
) {
    const [nganhNgheRows, setNganhNgheRows] = useState([]);

    // Sync state from dataJson
    useEffect(() => {
        if (dataJson) {
            setNganhNgheRows(dataJson.nganhNgheList || []);
        } else {
            setNganhNgheRows([]);
        }
    }, [dataJson]);

    // Expose API
    useImperativeHandle(componentRef, () => ({
        getDraftData: () => {
            if (!formRef?.current) return null;
            const formData = new FormData(formRef.current);
            const data = Object.fromEntries(formData.entries());
            data.nganhNgheList = nganhNgheRows;
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
            return data;
        },
        importData: (importedData) => {
            if (!importedData) return;
            setNganhNgheRows(importedData.nganhNgheList || []);
        },
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        data.nganhNgheList = nganhNgheRows;
        if (onSubmit) onSubmit(data);
    };

    const baoHiemNote = (
        <>
            Lưu ý:<br />
            - Doanh nghiệp đăng ký ngành, nghề kinh doanh chính là nông nghiệp, lâm nghiệp, ngư nghiệp, diêm nghiệp và trả lương theo sản phẩm, theo khoán: có thể lựa chọn 1 trong 3 phương thức đóng bảo hiểm xã hội: hàng tháng, 03 tháng một lần, 06 tháng một lần.<br />
            - Doanh nghiệp đăng ký ngành, nghề kinh doanh chính khác: đánh dấu vào phương thức đóng bảo hiểm xã hội hàng tháng.
        </>
    );

    return (
        <form onSubmit={handleSubmit} ref={formRef} key={dataJson ? "loaded" : "empty"}>
            <div className={styles.sectionGroup}>
                <KinhGuiSection dataJson={dataJson} styles={styles} />
                <ThongTinNguoiNopSection dataJson={dataJson} styles={styles} />
            </div>

            <TinhTrangThanhLapSection dataJson={dataJson} styles={styles} />
            <TenCongTySection dataJson={dataJson} styles={styles} />
            <DiaChiTruSoSection dataJson={dataJson} styles={styles} />

            <div className={styles.sectionGroup}>
                <NganhNgheTable rows={nganhNgheRows} onChangeRows={setNganhNgheRows} />
            </div>

            <div className={styles.sectionGroup}>
                <h3 className={styles.sectionTitle}>Vốn điều lệ và Cổ phần:</h3>
                <VonDieuLeSection dataJson={dataJson} styles={styles} />
                
                <h4 className={styles.subTitle} style={{ marginTop: "16px", marginBottom: "8px", fontWeight: "bold" }}>Cổ phần:</h4>
                <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tổng số cổ phần:</label>
                        <input
                            type="text"
                            className={styles.input}
                            name="tongSoCoPhan"
                            defaultValue={dataJson?.tongSoCoPhan || ""}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Mệnh giá cổ phần (VNĐ):</label>
                        <input
                            type="text"
                            className={styles.input}
                            name="menhGiaCoPhan"
                            defaultValue={dataJson?.menhGiaCoPhan || "10.000"}
                        />
                    </div>
                </div>
                
                <p style={{ marginTop: "8px", fontWeight: "bold" }}>Số lượng cổ phần từng loại:</p>
                <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>- Cổ phần phổ thông:</label>
                        <input
                            type="text"
                            className={styles.input}
                            name="coPhanPhoThong"
                            defaultValue={dataJson?.coPhanPhoThong || ""}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>- Cổ phần ưu đãi (nếu có):</label>
                        <input
                            type="text"
                            className={styles.input}
                            name="coPhanUuDai"
                            defaultValue={dataJson?.coPhanUuDai || ""}
                        />
                    </div>
                </div>
            </div>

            <NguonVonDieuLeSection dataJson={dataJson} styles={styles} />
            <NguoiDaiDienPhapLuatSection dataJson={dataJson} styles={styles} />
            <ThongTinDangKyThueSection dataJson={dataJson} styles={styles} />
            <BaoHiemXaHoiSection dataJson={dataJson} styles={styles} note={baoHiemNote} />
            <ChuSoHuuHuongLoiSection dataJson={dataJson} styles={styles} />
        </form>
    );
});

export default GiayDeNghiDKDNDeclaration;
