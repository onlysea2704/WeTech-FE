import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import styles from "./GiayUyQuyen.module.css";
import AddressSelect from "@/components/AddressSelect/AddressSelect";
import UploadCCCD from "@/components/UploadCCCD/UploadCCCD";
import { useFetchAddress } from "@/hooks/useFetchAddress";
import { GioiTinhSelect, DanTocSelect, QuocTichSelect } from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/PersonalSelects/PersonalSelects";
import DateInput from "@/components/DateInput/DateInput";
import { useGetFormDataJsonFromName } from "@/pages/User/ProcessProcedure/ProcessProcedure";

const GiayUyQuyen = forwardRef(function GiayUyQuyen({ formId, dataJson, onSubmit, formRef }, componentRef) {
    const [provCode_uyQuyen, setProvCode_uyQuyen] = useState("");
    const giayDeNghiData = useGetFormDataJsonFromName("Giấy đề nghị đăng ký hộ kinh doanh");
    const hkd_tenVN = giayDeNghiData?.hkd_tenVN;
    const [provCode_nhanUyQuyen_thuongTru, setProvCode_nhanUyQuyen_thuongTru] = useState("");
    const [provCode_nhanUyQuyen_lienLac, setProvCode_nhanUyQuyen_lienLac] = useState("");
    // Helper: tách prefix và tên từ chuỗi kinhGui đã lưu
    const parseKinhGui = (kg = "") => {
        const knownPrefixes = [
            "Phòng Kinh tế xã ",
            "Phòng Kinh tế, Hạ tầng và Đô thị phường ",
            "Phòng Kinh tế, Hạ tầng và Đô thị thị trấn ",
        ];
        for (const p of knownPrefixes) {
            if (kg.toLowerCase().startsWith(p.toLowerCase())) {
                return { prefix: p.trimEnd(), name: kg.substring(p.length).trim() };
            }
        }
        return { prefix: kg, name: "" };
    };

    const _initParsed = parseKinhGui(localStorage.getItem("giayDeNghi_kinhGui") || "");
    const [kinhGuiPrefix, setKinhGuiPrefix] = useState(
        () => _initParsed.prefix || "Phòng Kinh tế, Hạ tầng và Đô thị phường"
    );
    const [kinhGuiName, setKinhGuiName] = useState(() => _initParsed.name);

    // useFetchAddress: provinces cache toàn cục
    const { provinces, communes: communes_uyQuyen } = useFetchAddress(provCode_uyQuyen);
    const { communes: communes_nhanUyQuyen_thuongTru } = useFetchAddress(provCode_nhanUyQuyen_thuongTru);
    const { communes: communes_nhanUyQuyen_lienLac } = useFetchAddress(provCode_nhanUyQuyen_lienLac);

    // Expose API cho DeclarationForms
    useImperativeHandle(componentRef, () => ({
        getDraftData: () => {
            if (!formRef?.current) return null;
            const formData = new FormData(formRef.current);
            return Object.fromEntries(formData.entries());
        },
        getExportData: () => {
            if (!formRef?.current) return null;
            if (!formRef.current.checkValidity()) {
                formRef.current.reportValidity();
                return null;
            }
            const formData = new FormData(formRef.current);
            return Object.fromEntries(formData.entries());
        },
        importData: (importedData) => {
            // Re-read kinhGui from localStorage in case GiayDeNghi just saved it
            const saved = localStorage.getItem("giayDeNghi_kinhGui") || "";
            const parsed = parseKinhGui(saved);
            setKinhGuiPrefix(parsed.prefix || "Ph\u00f2ng Kinh t\u1ebf, H\u1ea1 t\u1ea7ng v\u00e0 \u0110\u00f4 th\u1ecb ph\u01b0\u1eddng");
            setKinhGuiName(parsed.name);
        },
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        if (onSubmit) {
            onSubmit(data);
        }
    };


    return (
        <form onSubmit={handleSubmit} ref={formRef} key={dataJson ? "loaded" : "empty"}>
            <input type="hidden" name="kinhGuiPrefix" value={kinhGuiPrefix} />
            <div className={styles.row}>
                {/* Left side: Form fields */}
                <div className={styles.colLeft}>
                    <h3 className={styles.sectionTitle}>Bên uỷ quyền (Bên A):</h3>

                    <div className={styles.grid2}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Họ và tên <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                className={styles.input}
                                name="uyQuyen_hoTen"
                                defaultValue={dataJson?.uyQuyen_hoTen || giayDeNghiData?.nguoiDaiDien_hoTen?.toUpperCase() || ""}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Ngày sinh <span className={styles.required}>*</span>
                            </label>
                            <DateInput
                                className={styles.input}
                                name="uyQuyen_ngaySinh"
                                defaultValue={dataJson?.uyQuyen_ngaySinh || giayDeNghiData?.nguoiDaiDien_ngaySinh || ""}
                                required
                            />
                        </div>

                        <GioiTinhSelect name="uyQuyen_gioiTinh" defaultValue={dataJson?.uyQuyen_gioiTinh || giayDeNghiData?.nguoiDaiDien_gioiTinh} />
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Số định danh cá nhân <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                className={styles.input}
                                name="uyQuyen_cccd"
                                defaultValue={dataJson?.uyQuyen_cccd || giayDeNghiData?.nguoiDaiDien_cccd || ""}
                                required
                                pattern="[0-9]{9,12}"
                                title="Số CCCD phải có 9–12 chữ số"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Điện thoại liên hệ <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="tel"
                                className={styles.input}
                                name="uyQuyen_phone"
                                defaultValue={dataJson?.uyQuyen_phone || giayDeNghiData?.nguoiDaiDien_phone || ""}
                                required
                                pattern="(0|\+84)[0-9]{9,10}"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email:</label>
                            <input
                                type="email"
                                className={styles.input}
                                name="uyQuyen_email"
                                defaultValue={dataJson?.uyQuyen_email || giayDeNghiData?.nguoiDaiDien_email || ""}
                            />
                        </div>
                    </div>

                    <h3 className={styles.sectionTitle} style={{ marginTop: "16px" }}>
                        Địa chỉ liên lạc của bên uỷ quyền:
                    </h3>
                    <AddressSelect
                        provinces={provinces}
                        communes={communes_uyQuyen}
                        onProvinceChange={setProvCode_uyQuyen}
                        provinceName="uyQuyen_tinh"
                        wardName="uyQuyen_xa"
                        houseNumberName="uyQuyen_soNha"
                        provinceDefault={dataJson?.uyQuyen_tinh || giayDeNghiData?.hienTai_tinh || giayDeNghiData?.thuongTru_tinh || ""}
                        wardDefault={dataJson?.uyQuyen_xa || giayDeNghiData?.hienTai_xa || giayDeNghiData?.thuongTru_xa || ""}
                        houseNumberDefault={dataJson?.uyQuyen_soNha || giayDeNghiData?.hienTai_soNha || giayDeNghiData?.thuongTru_soNha || ""}
                    />

                    <h3 className={styles.sectionTitle} style={{ marginTop: "40px" }}>Bên nhận uỷ quyền (Bên B):</h3>

                    <div className={styles.grid2}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Họ và tên <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                className={styles.input}
                                name="nhanUyQuyen_hoTen"
                                defaultValue={dataJson?.nhanUyQuyen_hoTen || ""}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Ngày sinh <span className={styles.required}>*</span>
                            </label>
                            <DateInput
                                className={styles.input}
                                name="nhanUyQuyen_ngaySinh"
                                defaultValue={dataJson?.nhanUyQuyen_ngaySinh || ""}
                                required
                            />
                        </div>
                        <GioiTinhSelect name="nhanUyQuyen_gioiTinh" defaultValue={dataJson?.nhanUyQuyen_gioiTinh} />
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Số định danh cá nhân <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                className={styles.input}
                                name="nhanUyQuyen_cccd"
                                defaultValue={dataJson?.nhanUyQuyen_cccd || ""}
                                required
                                pattern="[0-9]{9,12}"
                                title="Số CCCD phải có 9–12 chữ số"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Điện thoại liên hệ <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="tel"
                                className={styles.input}
                                name="nhanUyQuyen_phone"
                                defaultValue={dataJson?.nhanUyQuyen_phone || ""}
                                required
                                pattern="(0|\+84)[0-9]{9,10}"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email:</label>
                            <input
                                type="email"
                                className={styles.input}
                                name="nhanUyQuyen_email"
                                defaultValue={dataJson?.nhanUyQuyen_email || ""}
                            />
                        </div>
                        <DanTocSelect name="nhanUyQuyen_danToc" defaultValue={dataJson?.nhanUyQuyen_danToc} required={false} />
                        <QuocTichSelect name="nhanUyQuyen_quocTich" defaultValue={dataJson?.nhanUyQuyen_quocTich || "Việt Nam"} required={false} />
                    </div>

                    <h3 className={styles.sectionTitle} style={{ marginTop: "16px" }}>Địa chỉ thường trú của bên nhận uỷ quyền:</h3>
                    <AddressSelect
                        provinces={provinces}
                        communes={communes_nhanUyQuyen_thuongTru}
                        onProvinceChange={setProvCode_nhanUyQuyen_thuongTru}
                        provinceName="nhanUyQuyen_thuongTru_tinh"
                        wardName="nhanUyQuyen_thuongTru_xa"
                        houseNumberName="nhanUyQuyen_thuongTru_soNha"
                        provinceDefault={dataJson?.nhanUyQuyen_thuongTru_tinh || ""}
                        wardDefault={dataJson?.nhanUyQuyen_thuongTru_xa || ""}
                        houseNumberDefault={dataJson?.nhanUyQuyen_thuongTru_soNha || ""}
                    />

                    <h3 className={styles.sectionTitle} style={{ marginTop: "16px" }}>Địa chỉ liên lạc của bên nhận uỷ quyền:</h3>
                    <AddressSelect
                        provinces={provinces}
                        communes={communes_nhanUyQuyen_lienLac}
                        onProvinceChange={setProvCode_nhanUyQuyen_lienLac}
                        provinceName="nhanUyQuyen_lienLac_tinh"
                        wardName="nhanUyQuyen_lienLac_xa"
                        houseNumberName="nhanUyQuyen_lienLac_soNha"
                        provinceDefault={dataJson?.nhanUyQuyen_lienLac_tinh || ""}
                        wardDefault={dataJson?.nhanUyQuyen_lienLac_xa || ""}
                        houseNumberDefault={dataJson?.nhanUyQuyen_lienLac_soNha || ""}
                    />

                    {/* The grey text box */}
                    <div className={styles.greyBox}>
                        <div className={styles.greyBoxContent}>
                            <span className={styles.greyText}>
                                Là chủ hộ kinh doanh đăng ký thành lập <b>HỘ KINH DOANH</b>
                            </span>
                            <input
                                className={styles.spacer}
                                type="text"
                                name="chuHo_ten"
                                defaultValue={dataJson?.chuHo_ten || hkd_tenVN}
                            />
                            <span className={styles.greyText}>tại {kinhGuiPrefix}</span>
                            <input
                                className={styles.spacer}
                                type="text"
                                name="chuHo_xa_phuong"
                                value={kinhGuiName}
                                onChange={(e) => setKinhGuiName(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Right side: Upload CCCD */}
                <div className={styles.colRight}>
                    <UploadCCCD onComplete={(front, back) => console.log("Extracted", front, back)} />
                </div>
            </div>
        </form>
    );
});

export default GiayUyQuyen;
