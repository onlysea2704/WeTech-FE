import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
// Reuse styles from HoKinhDoanh to avoid duplication
import styles from "@/components/Procedure/ProcedureTemplate/HoKinhDoanh/FormDeclaration/GiayDeNghi.module.css";
import UploadCCCD from "@/components/UploadCCCD/UploadCCCD";
import AddressSelect from "@/components/AddressSelect/AddressSelect";
import { useFetchAddress } from "@/hooks/useFetchAddress";
import numberToVietnameseText from "@/utils/numberToVietnameseText";
import NganhNgheTable from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/NganhNgheTable/NganhNgheTable";
import ThanhVienTable from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/ThanhVienTable/ThanhVienTable";
import Signature from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/Signature/Signature";
import { GioiTinhSelect, DanTocSelect, QuocTichSelect } from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/PersonalSelects/PersonalSelects";
import DateInput from "@/components/DateInput/DateInput";
import CapitalInput from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/CapitalInput/CapitalInput";
import CopyAddressCheckbox from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/CopyAddressCheckbox/CopyAddressCheckbox";

const GiayDeNghiDKHGDNDeclaration = forwardRef(function GiayDeNghiDKHGDNDeclaration({ formId, dataJson, onSubmit, formRef }, componentRef) {
    // ── State ────────────────────────────────────────────────────────────────
    const [nganhNgheRows, setNganhNgheRows] = useState([]);
    const [thanhVienRows, setThanhVienRows] = useState([]);

    // Province codes cho từng ô địa chỉ (dùng để trigger fetch communes)
    const [provCode_thuongTru, setProvCode_thuongTru] = useState("");
    const [provCode_hienTai, setProvCode_hienTai] = useState("");
    const [provCode_truSo, setProvCode_truSo] = useState("");
    const [provCode_thue, setProvCode_thue] = useState("");
    const [truSoXaValue, setTruSoXaValue] = useState("");
    const [kinhGuiInputValue, setKinhGuiInputValue] = useState("");

    const [thueAddressState, setThueAddressState] = useState({
        tinh: dataJson?.thue_tinh || "",
        xa: dataJson?.thue_xa || "",
        soNha: dataJson?.thue_soNha || "",
        phone: dataJson?.thue_phone || "",
        email: dataJson?.thue_email || ""
    });
    const [thueKey, setThueKey] = useState(0);

    const handleCopyTruSoToThue = (isChecked, e) => {
        if (isChecked) {
            if (!formRef?.current) return;
            const fd = new FormData(formRef.current);
            setThueAddressState({
                tinh: fd.get("truSo_tinh") || "",
                xa: fd.get("truSo_xa") || "",
                soNha: fd.get("truSo_soNha") || "",
                phone: fd.get("truSo_phone") || "",
                email: fd.get("truSo_email") || ""
            });
            setThueKey(prev => prev + 1);
        } else {
            setThueAddressState({
                tinh: dataJson?.thue_tinh || "",
                xa: dataJson?.thue_xa || "",
                soNha: dataJson?.thue_soNha || "",
                phone: dataJson?.thue_phone || "",
                email: dataJson?.thue_email || ""
            });
            setThueKey(prev => prev + 1);
        }
    };

    // ── useFetchAddress: provinces cache toàn cục → 1 lần fetch ─────────────
    const { provinces, communes: communes_thuongTru } = useFetchAddress(provCode_thuongTru);
    const { communes: communes_hienTai } = useFetchAddress(provCode_hienTai);
    const { communes: communes_truSo } = useFetchAddress(provCode_truSo);
    const { communes: communes_thue } = useFetchAddress(provCode_thue);

    // ── Sync từ dataJson ─────────────────────────────────────────────────────
    useEffect(() => {
        if (dataJson) {
            setNganhNgheRows(dataJson.nganhNgheList || []);
            setThanhVienRows(dataJson.thanhVienList || []);
            setTruSoXaValue(dataJson.truSo_xa || "");
            // Khởi tạo kinhGuiInputValue từ kinhGui đã lưu (bỏ prefix)
            const kg = dataJson.kinhGui || "";
            const phonePrefixes = [
                "Phòng Kinh tế xã ",
                "Phòng Kinh tế, Hạ tầng và Đô thị phường ",
                "Phòng Kinh tế, Hạ tầng và Đô thị thị trấn "
            ];
            let stripped = kg;
            for (const p of phonePrefixes) {
                if (kg.toLowerCase().startsWith(p.toLowerCase())) {
                    stripped = kg.substring(p.length).trim();
                    break;
                }
            }
            setKinhGuiInputValue(stripped);
            setThueAddressState({
                tinh: dataJson.thue_tinh || "",
                xa: dataJson.thue_xa || "",
                soNha: dataJson.thue_soNha || "",
                phone: dataJson.thue_phone || "",
                email: dataJson.thue_email || ""
            });
            setThueKey(prev => prev + 1);
        } else {
            setNganhNgheRows([]);
            setThanhVienRows([]);
            setTruSoXaValue("");
            setKinhGuiInputValue("");
            setThueAddressState({
                tinh: "",
                xa: "",
                soNha: "",
                phone: "",
                email: ""
            });
            setThueKey(prev => prev + 1);
        }
    }, [dataJson]);

    // Khi chọn xã/phường mới ở trụ sở → tự động lấy tên (bỏ loại) vào ô kính gửi
    useEffect(() => {
        if (!truSoXaValue) return;
        const wardTypes = ["Xã ", "Phường ", "Thị trấn "];
        let name = truSoXaValue;
        for (const t of wardTypes) {
            if (truSoXaValue.startsWith(t)) {
                name = truSoXaValue.substring(t.length).trim();
                break;
            }
        }
        setKinhGuiInputValue(name);
    }, [truSoXaValue]);

    // ── Expose API cho DeclarationForms ─────────────────────────────────────
    useImperativeHandle(componentRef, () => ({
        getDraftData: () => {
            if (!formRef?.current) return null;
            const formData = new FormData(formRef.current);
            const data = Object.fromEntries(formData.entries());
            data.nganhNgheList = nganhNgheRows;
            data.thanhVienList = thanhVienRows;
            data.kinhGui = currentKinhGuiPrefix + kinhGuiInputValue;
            localStorage.setItem("giayDeNghi_kinhGui", data.kinhGui);
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
            data.kinhGui = currentKinhGuiPrefix + kinhGuiInputValue;
            localStorage.setItem("giayDeNghi_kinhGui", data.kinhGui);
            return data;
        },
        importData: (importedData) => {
            if (!importedData) return;
            setNganhNgheRows(importedData.nganhNgheList || []);
            setThanhVienRows(importedData.thanhVienList || []);
            setTruSoXaValue(importedData.truSo_xa || "");
        },
    }));

    // ── Submit ───────────────────────────────────────────────────────────────
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        data.nganhNgheList = nganhNgheRows;
        data.thanhVienList = thanhVienRows;
        data.kinhGui = currentKinhGuiPrefix + kinhGuiInputValue;
        localStorage.setItem("giayDeNghi_kinhGui", data.kinhGui);
        if (onSubmit) onSubmit(data);
    };

    // Helpers
    const getKinhGuiPrefix = (ward) => {
        if (!ward) return "Phòng Kinh tế, Hạ tầng và Đô thị phường ";
        const w = ward.toLowerCase();
        if (w.startsWith("xã")) return "Phòng Kinh tế xã ";
        if (w.startsWith("thị trấn")) return "Phòng Kinh tế, Hạ tầng và Đô thị thị trấn ";
        return "Phòng Kinh tế, Hạ tầng và Đô thị phường ";
    };
    const currentKinhGuiPrefix = getKinhGuiPrefix(truSoXaValue);

    return (
        <form onSubmit={handleSubmit} ref={formRef} key={dataJson ? "loaded" : "empty"}>
            {/* ── Người đại diện & CCCD ── */}
            <div className={styles.row}>
                <div className={styles.colLeft}>
                    <h3 className={styles.sectionTitle}>Tên người đại diện:</h3>
                    <div className={styles.grid2}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Họ và tên <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                className={styles.input}
                                name="nguoiDaiDien_hoTen"
                                defaultValue={dataJson?.nguoiDaiDien_hoTen || ""}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Ngày sinh <span className={styles.required}>*</span>
                            </label>
                            <DateInput
                                className={styles.input}
                                name="nguoiDaiDien_ngaySinh"
                                defaultValue={dataJson?.nguoiDaiDien_ngaySinh || ""}
                                required
                            />
                        </div>
                        <GioiTinhSelect name="nguoiDaiDien_gioiTinh" defaultValue={dataJson?.nguoiDaiDien_gioiTinh} />
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Số định danh cá nhân <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                className={styles.input}
                                name="nguoiDaiDien_cccd"
                                defaultValue={dataJson?.nguoiDaiDien_cccd || ""}
                                required
                                pattern="[0-9]{9,12}"
                                title="Số CCCD phải có 9–12 chữ số"
                            />
                        </div>
                        <DanTocSelect name="nguoiDaiDien_danToc" defaultValue={dataJson?.nguoiDaiDien_danToc} />
                        <QuocTichSelect name="nguoiDaiDien_quocTich" defaultValue={dataJson?.nguoiDaiDien_quocTich} />
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Điện thoại <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="tel"
                                className={styles.input}
                                name="nguoiDaiDien_phone"
                                defaultValue={dataJson?.nguoiDaiDien_phone || ""}
                                required
                                pattern="(0|\+84)[0-9]{9,10}"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email:</label>
                            <input
                                type="email"
                                className={styles.input}
                                name="nguoiDaiDien_email"
                                defaultValue={dataJson?.nguoiDaiDien_email || ""}
                            />
                        </div>
                    </div>

                    <h3 className={styles.sectionTitle}>Nơi thường trú:</h3>
                    <AddressSelect
                        provinces={provinces}
                        communes={communes_thuongTru}
                        onProvinceChange={setProvCode_thuongTru}
                        provinceName="thuongTru_tinh"
                        wardName="thuongTru_xa"
                        houseNumberName="thuongTru_soNha"
                        provinceDefault={dataJson?.thuongTru_tinh || ""}
                        wardDefault={dataJson?.thuongTru_xa || ""}
                        houseNumberDefault={dataJson?.thuongTru_soNha || ""}
                    />

                    <h3 className={styles.sectionTitle}>Nơi ở hiện tại:</h3>
                    <AddressSelect
                        provinces={provinces}
                        communes={communes_hienTai}
                        onProvinceChange={setProvCode_hienTai}
                        provinceName="hienTai_tinh"
                        wardName="hienTai_xa"
                        houseNumberName="hienTai_soNha"
                        provinceDefault={dataJson?.hienTai_tinh || ""}
                        wardDefault={dataJson?.hienTai_xa || ""}
                        houseNumberDefault={dataJson?.hienTai_soNha || ""}
                    />
                </div>
                <div className={styles.colRight}>
                    <UploadCCCD onComplete={(front, back) => console.log("Extracted", front, back)} />
                </div>
            </div>

            {/* ── Tên HKD & Trụ sở ── */}
            <div className={styles.row}>
                <div className={styles.colHalf}>
                    <h3 className={styles.sectionTitle}>Tên hộ kinh doanh:</h3>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            Tên tiếng Việt <span className={styles.required}>*</span>
                        </label>
                        <div className={styles.inputPrefixWrapper}>
                            <p>HỘ KINH DOANH</p>
                            <input
                                type="text"
                                className={styles.inputNoBorder}
                                name="hkd_tenVN"
                                defaultValue={dataJson?.hkd_tenVN || ""}
                                required
                            />
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tên tiếng nước ngoài:</label>
                        <input
                            type="text"
                            className={styles.input}
                            name="hkd_tenEN"
                            defaultValue={dataJson?.hkd_tenEN || ""}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tên viết tắt:</label>
                        <input
                            type="text"
                            className={styles.input}
                            name="hkd_tenVietTat"
                            defaultValue={dataJson?.hkd_tenVietTat || ""}
                        />
                    </div>
                </div>
                <div className={styles.colHalf}>
                    <h3 className={styles.sectionTitle}>Trụ sở của hộ kinh doanh:</h3>
                    <AddressSelect
                        isRequired={false}
                        provinces={provinces}
                        communes={communes_truSo}
                        onProvinceChange={setProvCode_truSo}
                        onWardChange={setTruSoXaValue}
                        provinceName="truSo_tinh"
                        wardName="truSo_xa"
                        houseNumberName="truSo_soNha"
                        provinceDefault={dataJson?.truSo_tinh || ""}
                        wardDefault={dataJson?.truSo_xa || ""}
                        houseNumberDefault={dataJson?.truSo_soNha || ""}
                    />
                    <div className={styles.grid2}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Điện thoại <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="tel"
                                className={styles.input}
                                name="truSo_phone"
                                defaultValue={dataJson?.truSo_phone || ""}
                                required
                                pattern="(0|\+84)[0-9]{9,10}"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email:</label>
                            <input
                                type="email"
                                className={styles.input}
                                name="truSo_email"
                                defaultValue={dataJson?.truSo_email || ""}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Ngành nghề ── */}
            <NganhNgheTable rows={nganhNgheRows} onChangeRows={setNganhNgheRows} disabled={false} />

            {/* ── Vốn kinh doanh ── */}
            <CapitalInput
                title="Vốn kinh doanh"
                labelNumber="Tổng số (VNĐ)"
                labelText="Tổng số bằng chữ"
                nameNumber="vonKinhDoanh"
                nameText="vonKinhDoanh_bangChu"
                defaultNumber={dataJson?.vonKinhDoanh}
                defaultText={dataJson?.vonKinhDoanh_bangChu}
                required={true}
            />

            <div className={styles.formGroup}>
                <h3 className={styles.sectionTitle}>Kính gửi:</h3>
                <div className={styles.inputWithSuffixKinhGui}>
                    <p className={styles.inputSuffixKinhGui}>{currentKinhGuiPrefix}</p>
                    <input
                        type="text"
                        className={styles.inputKinhGui}
                        name="kinhGui"
                        value={kinhGuiInputValue}
                        onChange={(e) => setKinhGuiInputValue(e.target.value)}
                    />
                </div>
            </div>

            {/* ── Địa chỉ thuế ── */}
            <div className={styles.sectionGroup}>
                <h3 className={styles.sectionTitle}>
                    Địa chỉ nhận thông báo thuế (chỉ kê khai nếu khác địa chỉ trụ sở):
                </h3>
                <CopyAddressCheckbox onChange={handleCopyTruSoToThue} />
                <div key={`thue-group-${thueKey}`}>
                    <AddressSelect
                        isRequired={false}
                        provinces={provinces}
                        communes={communes_thue}
                        onProvinceChange={setProvCode_thue}
                        provinceName="thue_tinh"
                        wardName="thue_xa"
                        houseNumberName="thue_soNha"
                        provinceDefault={thueAddressState.tinh}
                        wardDefault={thueAddressState.xa}
                        houseNumberDefault={thueAddressState.soNha}
                    />
                    <div className={styles.grid2}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Điện thoại</label>
                            <input
                                type="tel"
                                className={styles.input}
                                name="thue_phone"
                                defaultValue={thueAddressState.phone}
                                pattern="(0|\+84)[0-9]{9,10}"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email:</label>
                            <input
                                type="email"
                                className={styles.input}
                                name="thue_email"
                                defaultValue={thueAddressState.email}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.grid2}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Ngày bắt đầu hoạt động:</label>
                    <DateInput
                        className={styles.input}
                        name="ngayBatDau"
                        defaultValue={dataJson?.ngayBatDau || ""}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Tổng số lao động (dự kiến):</label>
                    <input
                        type="number"
                        className={styles.input}
                        name="soLaoDong"
                        min="0"
                        defaultValue={dataJson?.soLaoDong || ""}
                    />
                </div>
            </div>

            <div className={styles.formGroup} style={{ marginTop: "20px" }}>
                <h3 className={styles.sectionTitle}>Phương pháp tính thuế GTGT:</h3>
                <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="vatMethod"
                            value="ke_khai"
                            className={styles.radioInput}
                            defaultChecked={dataJson?.vatMethod === "ke_khai"}
                        />{" "}
                        Phương pháp kê khai
                    </label>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="vatMethod"
                            value="khoan"
                            className={styles.radioInput}
                            defaultChecked={!dataJson?.vatMethod || dataJson?.vatMethod === "khoan"}
                        />{" "}
                        Phương pháp khoán
                    </label>
                </div>
            </div>

            <div className={styles.formGroup} style={{ marginTop: "20px" }}>
                <h3 className={styles.sectionTitle}>Chủ thể thành lập hộ kinh doanh:</h3>
                <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="subject"
                            value="ca_nhan"
                            className={styles.radioInput}
                            defaultChecked={!dataJson?.subject || dataJson?.subject === "ca_nhan"}
                        />{" "}
                        Cá nhân
                    </label>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="subject"
                            value="thanh_vien_gd"
                            className={styles.radioInput}
                            defaultChecked={dataJson?.subject === "thanh_vien_gd"}
                        />{" "}
                        Các thành viên hộ gia đình
                    </label>
                </div>
            </div>

            {/* ── Bảng thành viên ── */}
            <ThanhVienTable rows={thanhVienRows} onChangeRows={setThanhVienRows} disabled={false} />

            {/* ── Chủ hộ ── */}
            <Signature
                subject="Chủ hộ kinh doanh"
                dataJson={dataJson}
            />
        </form>
    );
});

export default GiayDeNghiDKHGDNDeclaration;
