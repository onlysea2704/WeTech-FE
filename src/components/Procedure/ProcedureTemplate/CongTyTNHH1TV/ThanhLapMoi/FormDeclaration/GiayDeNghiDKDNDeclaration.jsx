import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import styles from "./SharedDeclaration.module.css";
import NganhNgheTable from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/NganhNgheTable/NganhNgheTable";
import Signature from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/Signature/Signature";

import KinhGuiSection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/KinhGuiSection";
import ThongTinNguoiNopSection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/ThongTinNguoiNopSection";
import TinhTrangThanhLapSection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/TinhTrangThanhLapSection";
import TenCongTySection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/TenCongTySection";
import DiaChiTruSoSection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/DiaChiTruSoSection";
import ThongTinChuSoHuuSection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/ThongTinChuSoHuuSection";
import VonDieuLeSection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/VonDieuLeSection";
import NguonVonDieuLeSection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/NguonVonDieuLeSection";
import TaiSanGopVonSection from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/FormSections/TaiSanGopVonSection";
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

    return (
        <form onSubmit={handleSubmit} ref={formRef} key={dataJson ? "loaded" : "empty"}>

            {/* KÍNH GỬI + NGƯỜI NỘP HỒ SƠ */}
            <div className={styles.sectionGroup}>
                <KinhGuiSection dataJson={dataJson} styles={styles} />
                <ThongTinNguoiNopSection dataJson={dataJson} styles={styles} />
            </div>

            {/* TÌNH TRẠNG THÀNH LẬP */}
            <TinhTrangThanhLapSection dataJson={dataJson} styles={styles} />

            {/* TÊN CÔNG TY */}
            <TenCongTySection dataJson={dataJson} styles={styles} prefix="CÔNG TY TNHH" />

            {/* ĐỊA CHỈ TRỤ SỞ */}
            <DiaChiTruSoSection dataJson={dataJson} styles={styles} />

            {/* NGÀNH NGHỀ KINH DOANH */}
            <div className={styles.sectionGroup}>
                <NganhNgheTable rows={nganhNgheRows} onChangeRows={setNganhNgheRows} />
            </div>

            {/* CHỦ SỞ HỮU */}
            <ThongTinChuSoHuuSection dataJson={dataJson} styles={styles} />

            {/* VỐN ĐIỀU LỆ */}
            <VonDieuLeSection dataJson={dataJson} styles={styles} />

            {/* NGUỒN VỐN ĐIỀU LỆ */}
            <NguonVonDieuLeSection dataJson={dataJson} styles={styles} />

            {/* TÀI SẢN GÓP VỐN */}
            <TaiSanGopVonSection dataJson={dataJson} styles={styles} />

            {/* NGƯỜI ĐẠI DIỆN THEO PHÁP LUẬT */}
            <NguoiDaiDienPhapLuatSection dataJson={dataJson} styles={styles} />

            {/* THÔNG TIN ĐĂNG KÝ THUẾ */}
            <ThongTinDangKyThueSection dataJson={dataJson} styles={styles} />

            {/* THÔNG TIN VỀ VIỆC ĐÓNG BẢO HIỂM XÃ HỘI */}
            <BaoHiemXaHoiSection dataJson={dataJson} styles={styles} />

            {/* THÔNG TIN VỀ CHỦ SỞ HỮU HƯỞNG LỢI */}
            <ChuSoHuuHuongLoiSection dataJson={dataJson} styles={styles} />
        </form>
    );
});

export default GiayDeNghiDKDNDeclaration;
