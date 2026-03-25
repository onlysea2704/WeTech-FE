import React, { forwardRef, useState, useEffect, useImperativeHandle } from "react";
import styles from "./DieuLeCongTyDeclaration.module.css";
import NganhNgheTable from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/NganhNgheTable/NganhNgheTable";
import { GioiTinhSelect, DanTocSelect, QuocTichSelect } from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/PersonalSelects/PersonalSelects";
import AddressSelect from "@/components/AddressSelect/AddressSelect";
import { useFetchAddress } from "@/hooks/useFetchAddress";
import DateInput from "@/components/DateInput/DateInput";

const DieuLeCongTyDeclaration = forwardRef(function DieuLeCongTyDeclaration({ formId, dataJson, onSubmit, formRef }, componentRef) {
    const [nganhNgheRows, setNganhNgheRows] = useState(dataJson?.nganhNgheList || []);

    // Province codes
    const [provCode_chuSoHuu, setProvCode_chuSoHuu] = useState("");
    const [provCode_nguoiDaiDien, setProvCode_nguoiDaiDien] = useState("");

    const { provinces, communes: communes_chuSoHuu } = useFetchAddress(provCode_chuSoHuu);
    const { communes: communes_nguoiDaiDien } = useFetchAddress(provCode_nguoiDaiDien);

    useEffect(() => {
        if (dataJson) {
            setNganhNgheRows(dataJson.nganhNgheList || []);
        } else {
            setNganhNgheRows([]);
        }
    }, [dataJson]);

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
        <form onSubmit={handleSubmit} ref={formRef} key={dataJson > 0 ? "loaded" : "empty"}>
            {/* THÔNG TIN CÔNG TY */}
            <div className={styles.sectionGroup}>
                <h3 className={styles.sectionTitle}>Thông tin công ty</h3>
                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Tên công ty viết bằng tiếng Việt (ghi bằng chữ in hoa) <span className={styles.required}>*</span>
                    </label>
                    <input type="text" name="tenCongTyVN" className={styles.input} defaultValue={dataJson?.tenCongTyVN || ""} style={{ textTransform: "uppercase" }} required />
                </div>
                <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tên công ty viết bằng tiếng nước ngoài (nếu có)</label>
                        <input type="text" name="tenCongTyEN" className={styles.input} defaultValue={dataJson?.tenCongTyEN || ""} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tên công ty viết tắt (nếu có)</label>
                        <input type="text" name="tenCongTyVietTat" className={styles.input} defaultValue={dataJson?.tenCongTyVietTat || ""} />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Địa chỉ trụ sở chính <span className={styles.required}>*</span>
                    </label>
                    <input type="text" name="diaChiTruSo" className={styles.input} defaultValue={dataJson?.diaChiTruSo || ""} required />
                </div>
                <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Điện thoại <span className={styles.required}>*</span></label>
                        <input type="text" name="dienThoai" className={styles.input} defaultValue={dataJson?.dienThoai || ""} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Số fax (nếu có)</label>
                        <input type="text" name="fax" className={styles.input} defaultValue={dataJson?.fax || ""} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Thư điện tử (nếu có)</label>
                        <input type="email" name="email" className={styles.input} defaultValue={dataJson?.email || ""} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Website (nếu có)</label>
                        <input type="text" name="website" className={styles.input} defaultValue={dataJson?.website || ""} />
                    </div>
                </div>
            </div>

            {/* NGÀNH NGHỀ KINH DOANH */}
            <div className={styles.sectionGroup}>
                <h3 className={styles.sectionTitle}>Ngành, nghề kinh doanh <span className={styles.required}>*</span></h3>
                <div className={styles.tableWrapper}>
                    <NganhNgheTable rows={nganhNgheRows} onChangeRows={setNganhNgheRows} />
                </div>
            </div>

            {/* CHỦ SỞ HỮU CÔNG TY */}
            <div className={styles.sectionGroup}>
                <h3 className={styles.sectionTitle}>Chủ sở hữu công ty</h3>
                <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Họ và tên <span className={styles.required}>*</span></label>
                        <input type="text" name="chuSoHuu_hoTen" className={styles.input} defaultValue={dataJson?.chuSoHuu_hoTen || ""} required />
                    </div>
                    <GioiTinhSelect name="chuSoHuu_gioiTinh" defaultValue={dataJson?.chuSoHuu_gioiTinh} />
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Sinh ngày <span className={styles.required}>*</span></label>
                        <DateInput name="chuSoHuu_ngaySinh" className={styles.input} defaultValue={dataJson?.chuSoHuu_ngaySinh || ""} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Số định danh cá nhân <span className={styles.required}>*</span></label>
                        <input type="text" name="chuSoHuu_cccd" className={styles.input} defaultValue={dataJson?.chuSoHuu_cccd || ""} required />
                    </div>
                    <DanTocSelect name="chuSoHuu_danToc" defaultValue={dataJson?.chuSoHuu_danToc} />
                    <QuocTichSelect name="chuSoHuu_quocTich" defaultValue={dataJson?.chuSoHuu_quocTich} />
                </div>
                <h3 className={styles.sectionTitle} style={{ marginTop: "8px" }}>Địa chỉ liên lạc của chủ sở hữu:</h3>
                <AddressSelect
                    provinces={provinces}
                    communes={communes_chuSoHuu}
                    onProvinceChange={setProvCode_chuSoHuu}
                    provinceName="chuSoHuu_tinh"
                    wardName="chuSoHuu_xa"
                    houseNumberName="chuSoHuu_soNha"
                    provinceDefault={dataJson?.chuSoHuu_tinh || ""}
                    wardDefault={dataJson?.chuSoHuu_xa || ""}
                    houseNumberDefault={dataJson?.chuSoHuu_soNha || ""}
                />
            </div>

            {/* VỐN ĐIỀU LỆ */}
            <div className={styles.sectionGroup}>
                <h3 className={styles.sectionTitle}>Vốn điều lệ</h3>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Vốn bằng tiền mặt (VNĐ) <span className={styles.required}>*</span></label>
                    <input type="text" name="vonTienMat" className={styles.input} defaultValue={dataJson?.vonTienMat || ""} required />
                </div>
            </div>

            {/* NGƯỜI ĐẠI DIỆN THEO PHÁP LUẬT */}
            <div className={styles.sectionGroup}>
                <h3 className={styles.sectionTitle}>Người đại diện theo pháp luật của công ty</h3>
                <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Họ và tên <span className={styles.required}>*</span></label>
                        <input type="text" name="nguoiDaiDien_hoTen" className={styles.input} defaultValue={dataJson?.nguoiDaiDien_hoTen || ""} required />
                    </div>
                    <GioiTinhSelect name="nguoiDaiDien_gioiTinh" defaultValue={dataJson?.nguoiDaiDien_gioiTinh} />
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Sinh ngày <span className={styles.required}>*</span></label>
                        <DateInput name="nguoiDaiDien_ngaySinh" className={styles.input} defaultValue={dataJson?.nguoiDaiDien_ngaySinh || ""} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Số định danh cá nhân <span className={styles.required}>*</span></label>
                        <input type="text" name="nguoiDaiDien_cccd" className={styles.input} defaultValue={dataJson?.nguoiDaiDien_cccd || ""} required />
                    </div>
                    <DanTocSelect name="nguoiDaiDien_danToc" defaultValue={dataJson?.nguoiDaiDien_danToc} />
                    <QuocTichSelect name="nguoiDaiDien_quocTich" defaultValue={dataJson?.nguoiDaiDien_quocTich} />
                </div>
                <h3 className={styles.sectionTitle} style={{ marginTop: "8px" }}>Địa chỉ liên lạc của người đại diện:</h3>
                <AddressSelect
                    provinces={provinces}
                    communes={communes_nguoiDaiDien}
                    onProvinceChange={setProvCode_nguoiDaiDien}
                    provinceName="nguoiDaiDien_tinh"
                    wardName="nguoiDaiDien_xa"
                    houseNumberName="nguoiDaiDien_soNha"
                    provinceDefault={dataJson?.nguoiDaiDien_tinh || ""}
                    wardDefault={dataJson?.nguoiDaiDien_xa || ""}
                    houseNumberDefault={dataJson?.nguoiDaiDien_soNha || ""}
                />
                <div className={styles.formGroup} style={{ marginTop: "16px" }}>
                    <label className={styles.label}>Chức danh <span className={styles.required}>*</span></label>
                    <input type="text" name="nguoiDaiDien_chucDanh" className={styles.input} defaultValue={dataJson?.nguoiDaiDien_chucDanh || "Giám đốc"} required />
                </div>
            </div>

            {/* HIỆU LỰC */}
            <div className={styles.sectionGroup}>
                <h3 className={styles.sectionTitle}>Tổ chức thực hiện (Hiệu lực)</h3>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Ngày thông qua điều lệ <span className={styles.required}>*</span></label>
                    <DateInput name="ngayThongQua" className={styles.input} defaultValue={dataJson?.ngayThongQua || ""} required />
                </div>
            </div>

        </form>
    );
});

export default DieuLeCongTyDeclaration;
