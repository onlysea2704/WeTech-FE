import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
// Reuse styles from HoKinhDoanh
import styles from "@/components/Procedure/ProcedureTemplate/HoKinhDoanh/FormDeclaration/GiayUyQuyen.module.css";
import AddressSelect from "@/components/AddressSelect/AddressSelect";
import UploadCCCD from "@/components/UploadCCCD/UploadCCCD";
import { useFetchAddress } from "@/hooks/useFetchAddress";
import {
    GioiTinhSelect,
    DanTocSelect,
    QuocTichSelect,
} from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/PersonalSelects/PersonalSelects";
import { useGetFormDataJsonFromName } from "@/pages/User/ProcessProcedure/ProcessProcedure";
import DateInput from "@/components/DateInput/DateInput";

const GiayUyQuyenDeclaration = forwardRef(function GiayUyQuyenDeclaration(
    { formId, dataJson, onSubmit, formRef },
    componentRef,
) {
    const giayDeNghiData = useGetFormDataJsonFromName("Giấy đề nghị đăng ký doanh nghiệp");

    const [provCode_uyQuyen, setProvCode_uyQuyen] = useState("");
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
    const [kinhGuiPrefix, setKinhGuiPrefix] = useState(() => _initParsed.prefix || "Phòng Đăng ký kinh doanh");
    const [kinhGuiName, setKinhGuiName] = useState(() => _initParsed.name);

    // State for nhanUyQuyen contact address to sync from corporate form
    const [nhanUyQuyenLienLacAddressState, setNhanUyQuyenLienLacAddressState] = useState({
        tinh: dataJson?.nhanUyQuyen_lienLac_tinh || giayDeNghiData?.lienLac_tinh || "",
        xa: dataJson?.nhanUyQuyen_lienLac_xa || giayDeNghiData?.lienLac_xa || "",
        soNha: dataJson?.nhanUyQuyen_lienLac_soNha || giayDeNghiData?.lienLac_soNha || "",
    });
    const [nhanUyQuyenLienLacKey, setNhanUyQuyenLienLacKey] = useState(0);

    // useFetchAddress: provinces cache toàn cục
    const { provinces, communes: communes_uyQuyen } = useFetchAddress(provCode_uyQuyen);
    const { communes: communes_nhanUyQuyen_thuongTru } = useFetchAddress(provCode_nhanUyQuyen_thuongTru);
    const { communes: communes_nhanUyQuyen_lienLac } = useFetchAddress(provCode_nhanUyQuyen_lienLac);

    // Sync nhanUyQuyen contact address when corporate form or saved data changes
    useEffect(() => {
        setNhanUyQuyenLienLacAddressState({
            tinh: dataJson?.nhanUyQuyen_lienLac_tinh || giayDeNghiData?.lienLac_tinh || "",
            xa: dataJson?.nhanUyQuyen_lienLac_xa || giayDeNghiData?.lienLac_xa || "",
            soNha: dataJson?.nhanUyQuyen_lienLac_soNha || giayDeNghiData?.lienLac_soNha || "",
        });
        setNhanUyQuyenLienLacKey((prev) => prev + 1);
    }, [giayDeNghiData, dataJson]);

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
            setKinhGuiPrefix(parsed.prefix || "Phòng Đăng ký kinh doanh");
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
        <form onSubmit={handleSubmit} ref={formRef} key={dataJson || giayDeNghiData ? "loaded" : "empty"}>
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
                                defaultValue={
                                    dataJson?.uyQuyen_hoTen || giayDeNghiData?.nguoiDaiDien_hoTen?.toUpperCase() || ""
                                }
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

                        <GioiTinhSelect
                            name="uyQuyen_gioiTinh"
                            defaultValue={dataJson?.uyQuyen_gioiTinh || giayDeNghiData?.nguoiDaiDien_gioiTinh}
                        />
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

                        <DanTocSelect
                            name="uyQuyen_danToc"
                            defaultValue={dataJson?.uyQuyen_danToc || giayDeNghiData?.nguoiDaiDien_danToc || "Kinh"}
                            required={false}
                        />
                        <QuocTichSelect
                            name="uyQuyen_quocTich"
                            defaultValue={
                                dataJson?.uyQuyen_quocTich || giayDeNghiData?.nguoiDaiDien_quocTich || "Việt Nam"
                            }
                            required={false}
                        />

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Điện thoại liên hệ <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="tel"
                                className={styles.input}
                                name="uyQuyen_phone"
                                defaultValue={dataJson?.uyQuyen_phone || giayDeNghiData?.giamDoc_phone || ""}
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
                        Địa chỉ liên lạc:
                    </h3>
                    <AddressSelect
                        provinces={provinces}
                        communes={communes_uyQuyen}
                        onProvinceChange={setProvCode_uyQuyen}
                        provinceName="uyQuyen_tinh"
                        wardName="uyQuyen_xa"
                        houseNumberName="uyQuyen_soNha"
                        provinceDefault={
                            dataJson?.uyQuyen_tinh ||
                            giayDeNghiData?.nguoiDaiDien_tinh ||
                            giayDeNghiData?.nguoiDaiDien_thuongTru_tinh ||
                            ""
                        }
                        wardDefault={
                            dataJson?.uyQuyen_xa ||
                            giayDeNghiData?.nguoiDaiDien_xa ||
                            giayDeNghiData?.nguoiDaiDien_thuongTru_xa ||
                            ""
                        }
                        houseNumberDefault={
                            dataJson?.uyQuyen_soNha ||
                            giayDeNghiData?.nguoiDaiDien_soNha ||
                            giayDeNghiData?.nguoiDaiDien_thuongTru_soNha ||
                            ""
                        }
                    />

                    <h3 className={styles.sectionTitle} style={{ marginTop: "24px" }}>
                        Bên nhận uỷ quyền (Bên B):
                    </h3>

                    <div className={styles.grid2}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Họ và tên <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                className={styles.input}
                                name="nhanUyQuyen_hoTen"
                                defaultValue={
                                    dataJson?.nhanUyQuyen_hoTen || giayDeNghiData?.nguoiNop_hoTen?.toUpperCase() || ""
                                }
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
                                defaultValue={dataJson?.nhanUyQuyen_ngaySinh || giayDeNghiData?.nguoiNop_ngaySinh || ""}
                                required
                            />
                        </div>
                        <GioiTinhSelect
                            name="nhanUyQuyen_gioiTinh"
                            defaultValue={dataJson?.nhanUyQuyen_gioiTinh || giayDeNghiData?.nguoiNop_gioiTinh || ""}
                        />
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Số định danh cá nhân <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                className={styles.input}
                                name="nhanUyQuyen_cccd"
                                defaultValue={dataJson?.nhanUyQuyen_cccd || giayDeNghiData?.nguoiNop_cccd || ""}
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
                                defaultValue={dataJson?.nhanUyQuyen_phone || giayDeNghiData?.nguoiNop_phone || ""}
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
                                defaultValue={dataJson?.nhanUyQuyen_email || giayDeNghiData?.nguoiNop_email || ""}
                            />
                        </div>
                        <DanTocSelect
                            name="nhanUyQuyen_danToc"
                            defaultValue={dataJson?.nhanUyQuyen_danToc || giayDeNghiData?.nguoiNop_danToc || "Kinh"}
                            required={false}
                        />
                        <QuocTichSelect
                            name="nhanUyQuyen_quocTich"
                            defaultValue={
                                dataJson?.nhanUyQuyen_quocTich || giayDeNghiData?.nguoiNop_quocTich || "Việt Nam"
                            }
                            required={false}
                        />
                    </div>

                    <h3 className={styles.sectionTitle} style={{ marginTop: "16px" }}>
                        Địa chỉ thường trú:
                    </h3>
                    <AddressSelect
                        provinces={provinces}
                        communes={communes_nhanUyQuyen_thuongTru}
                        onProvinceChange={setProvCode_nhanUyQuyen_thuongTru}
                        provinceName="nhanUyQuyen_thuongTru_tinh"
                        wardName="nhanUyQuyen_thuongTru_xa"
                        houseNumberName="nhanUyQuyen_thuongTru_soNha"
                        provinceDefault={
                            dataJson?.nhanUyQuyen_thuongTru_tinh || giayDeNghiData?.nguoiNop_thuongTru_tinh || ""
                        }
                        wardDefault={dataJson?.nhanUyQuyen_thuongTru_xa || giayDeNghiData?.nguoiNop_thuongTru_xa || ""}
                        houseNumberDefault={
                            dataJson?.nhanUyQuyen_thuongTru_soNha || giayDeNghiData?.nguoiNop_thuongTru_soNha || ""
                        }
                        isRequired={false}
                    />

                    <h3 className={styles.sectionTitle} style={{ marginTop: "16px" }}>
                        Địa chỉ liên lạc:
                    </h3>
                    <div key={`nhanUyQuyen-lienLac-group-${nhanUyQuyenLienLacKey}`}>
                        <AddressSelect
                            provinces={provinces}
                            communes={communes_nhanUyQuyen_lienLac}
                            onProvinceChange={setProvCode_nhanUyQuyen_lienLac}
                            provinceName="nhanUyQuyen_lienLac_tinh"
                            wardName="nhanUyQuyen_lienLac_xa"
                            houseNumberName="nhanUyQuyen_lienLac_soNha"
                            provinceDefault={nhanUyQuyenLienLacAddressState.tinh}
                            wardDefault={nhanUyQuyenLienLacAddressState.xa}
                            houseNumberDefault={nhanUyQuyenLienLacAddressState.soNha}
                        />
                    </div>

                    {/* The grey text box */}
                    <div className={styles.greyBox}>
                        <div className={styles.greyBoxContent}>
                            <span className={styles.greyText}>
                                Là người đại diện đăng ký thành lập <b>CÔNG TY TNHH</b>
                            </span>
                            <input
                                className={styles.spacer}
                                type="text"
                                name="chuHo_ten"
                                defaultValue={dataJson?.chuHo_ten || giayDeNghiData?.tenCongTyVN?.toUpperCase()}
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

export default GiayUyQuyenDeclaration;
