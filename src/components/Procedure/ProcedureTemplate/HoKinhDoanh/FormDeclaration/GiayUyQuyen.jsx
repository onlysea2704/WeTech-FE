import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import styles from "./GiayUyQuyen.module.css";
import AddressSelect from "../../../../AddressSelect/AddressSelect";
import UploadCCCD from "../../../../UploadCCCD/UploadCCCD";
import { useFetchAddress } from "../../../../../hooks/useFetchAddress";

const GiayUyQuyen = forwardRef(function GiayUyQuyen({ formId, dataJson, onSubmit, formRef }, componentRef) {
    // Province codes cho ô địa chỉ
    const [provCode_uyQuyen, setProvCode_uyQuyen] = useState("");

    // useFetchAddress: provinces cache toàn cục
    const { provinces, communes: communes_uyQuyen } = useFetchAddress(provCode_uyQuyen);

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
            // GiayUyQuyen has no dynamic tables
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
                                defaultValue={dataJson?.uyQuyen_hoTen || ""}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Ngày sinh <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="date"
                                className={styles.input}
                                name="uyQuyen_ngaySinh"
                                defaultValue={dataJson?.uyQuyen_ngaySinh || ""}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Giới tính <span className={styles.required}>*</span>
                            </label>
                            <select
                                className={styles.select}
                                name="uyQuyen_gioiTinh"
                                defaultValue={dataJson?.uyQuyen_gioiTinh || ""}
                                required
                            >
                                <option value="" disabled>
                                    --Chọn giới tính--
                                </option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Số định danh cá nhân <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                className={styles.input}
                                name="uyQuyen_cccd"
                                defaultValue={dataJson?.uyQuyen_cccd || ""}
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
                                defaultValue={dataJson?.uyQuyen_phone || ""}
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
                                defaultValue={dataJson?.uyQuyen_email || ""}
                            />
                        </div>
                    </div>

                    <h3 className={styles.sectionTitle} style={{ marginTop: "16px" }}>
                        Địa chỉ liên lạc:
                    </h3>
                    <AddressSelect
                        provinces={provinces}
                        communes={communes_uyQuyen}
                        onProvinceChange={setProvCode_uyQuyen}
                        provinceName="uyQuyen_tinh"
                        wardName="uyQuyen_xa"
                        houseNumberName="uyQuyen_soNha"
                        provinceDefault={dataJson?.uyQuyen_tinh || ""}
                        wardDefault={dataJson?.uyQuyen_xa || ""}
                        houseNumberDefault={dataJson?.uyQuyen_soNha || ""}
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
                                defaultValue={dataJson?.chuHo_ten || ""}
                            />
                            <span className={styles.greyText}>tại Phòng Kinh tế, Hạ tầng và Đô thị Phường</span>
                            <input
                                className={styles.spacer}
                                type="text"
                                name="chuHo_xa_phuong"
                                defaultValue={dataJson?.chuHo_xa_phuong || ""}
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
