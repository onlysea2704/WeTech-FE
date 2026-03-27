import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import styles from "./SharedDeclaration.module.css";
import AddressSelect from "@/components/AddressSelect/AddressSelect";
import { useFetchAddress } from "@/hooks/useFetchAddress";
import numberToVietnameseText from "@/utils/numberToVietnameseText";
import NganhNgheTable from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/NganhNgheTable/NganhNgheTable";
import { GioiTinhSelect, DanTocSelect, QuocTichSelect } from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/PersonalSelects/PersonalSelects";
import DateInput from "@/components/DateInput/DateInput";
import Signature from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/Signature/Signature";
import CapitalInput from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/CapitalInput/CapitalInput";

const GiayDeNghiDKDNDeclaration = forwardRef(function GiayDeNghiDKDNDeclaration(
    { formId, dataJson, onSubmit, formRef },
    componentRef,
) {
    const [nganhNgheRows, setNganhNgheRows] = useState([]);

    // Province codes for each address block
    const [provCode_lienLac, setProvCode_lienLac] = useState("");
    const [provCode_truSo, setProvCode_truSo] = useState("");
    const [provCode_chuSoHuu, setProvCode_chuSoHuu] = useState("");
    const [provCode_nguoiNopThuongTru, setProvCode_nguoiNopThuongTru] = useState("");
    const [provCode_chuSoHuuThuongTru, setProvCode_chuSoHuuThuongTru] = useState("");
    const [provCode_nguoiDaiDienThuongTru, setProvCode_nguoiDaiDienThuongTru] = useState("");
    const [provCode_thongBaoThue, setProvCode_thongBaoThue] = useState("");

    const { provinces, communes: communes_lienLac } = useFetchAddress(provCode_lienLac);
    const { communes: communes_truSo } = useFetchAddress(provCode_truSo);
    const { communes: communes_chuSoHuu } = useFetchAddress(provCode_chuSoHuu);
    const { communes: communes_nguoiNopThuongTru } = useFetchAddress(provCode_nguoiNopThuongTru);
    const { communes: communes_chuSoHuuThuongTru } = useFetchAddress(provCode_chuSoHuuThuongTru);
    const { communes: communes_nguoiDaiDienThuongTru } = useFetchAddress(provCode_nguoiDaiDienThuongTru);
    const { communes: communes_thongBaoThue } = useFetchAddress(provCode_thongBaoThue);

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

    const handleNguonVonChange = () => {
        if (!formRef?.current) return;
        const form = formRef.current;
        const prefixes = ["nguonVon_nganSach", "nguonVon_tuNhan", "nguonVon_nuocNgoai", "nguonVon_khac"];
        let totalSoTien = 0;
        let totalTyLe = 0;
        prefixes.forEach(p => {
            const st = parseFloat(form[`${p}_soTien`]?.value.replace(/\./g, '').replace(/,/g, '.')) || 0;
            const tl = parseFloat(form[`${p}_tyLe`]?.value.replace(/,/g, '.')) || 0;
            totalSoTien += st;
            totalTyLe += tl;
        });
        if (form["nguonVon_tongCong_soTien"]) form["nguonVon_tongCong_soTien"].value = totalSoTien ? totalSoTien.toLocaleString('vi-VN') : "";
        if (form["nguonVon_tongCong_tyLe"]) form["nguonVon_tongCong_tyLe"].value = totalTyLe ? totalTyLe : "";
    };

    const handleTaiSanChange = () => {
        if (!formRef?.current) return;
        const form = formRef.current;
        const prefixes = ["taiSan_dongVN", "taiSan_ngoaiTe", "taiSan_vang", "taiSan_qsdDat", "taiSan_shtt", "taiSan_khac"];
        let totalGiaTri = 0;
        let totalTyLe = 0;
        prefixes.forEach(p => {
            const gt = parseFloat(form[`${p}_giaTri`]?.value.replace(/\./g, '').replace(/,/g, '.')) || 0;
            const tl = parseFloat(form[`${p}_tyLe`]?.value.replace(/,/g, '.')) || 0;
            totalGiaTri += gt;
            totalTyLe += tl;
        });
        if (form["taiSan_tongSo_giaTri"]) form["taiSan_tongSo_giaTri"].value = totalGiaTri ? totalGiaTri.toLocaleString('vi-VN') : "";
        if (form["taiSan_tongSo_tyLe"]) form["taiSan_tongSo_tyLe"].value = totalTyLe ? totalTyLe : "";
    };

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
                <div className={styles.formGroup}>
                    <h3 className={`${styles.sectionTitle}`}>
                        Kính gửi: <span className={styles.required}>*</span>
                    </h3>
                    <input
                        type="text"
                        className={styles.input}
                        name="kinhGui"
                        defaultValue={dataJson?.kinhGui || ""}
                        required
                    />
                </div>

                <h3 className={styles.sectionTitle}>Thông tin người đại diện:</h3>
                <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            Tôi là (ghi họ tên bằng chữ IN HOA): <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="text"
                            className={styles.input}
                            name="nguoiNop_hoTen"
                            defaultValue={dataJson?.nguoiNop_hoTen || ""}
                            style={{ textTransform: "uppercase" }}
                            placeholder="HỌ VÀ TÊN"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            Ngày, tháng, năm sinh: <span className={styles.required}>*</span>
                        </label>
                        <DateInput
                            className={styles.input}
                            name="nguoiNop_ngaySinh"
                            defaultValue={dataJson?.nguoiNop_ngaySinh || ""}
                            required
                        />
                    </div>
                    <GioiTinhSelect name="nguoiNop_gioiTinh" defaultValue={dataJson?.nguoiNop_gioiTinh} required />
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            Số định danh cá nhân: <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="text"
                            className={styles.input}
                            name="nguoiNop_cccd"
                            defaultValue={dataJson?.nguoiNop_cccd || ""}
                            required
                            pattern="[0-9]{9,12}"
                            title="Số CCCD phải có 9–12 chữ số"
                        />
                    </div>
                </div>

                <h3 className={styles.sectionTitle}>Địa chỉ liên lạc:</h3>
                <AddressSelect
                    provinces={provinces}
                    communes={communes_lienLac}
                    onProvinceChange={setProvCode_lienLac}
                    provinceName="lienLac_tinh"
                    wardName="lienLac_xa"
                    houseNumberName="lienLac_soNha"
                    provinceDefault={dataJson?.lienLac_tinh || ""}
                    wardDefault={dataJson?.lienLac_xa || ""}
                    houseNumberDefault={dataJson?.lienLac_soNha || ""}
                />

                <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Điện thoại (nếu có):</label>
                        <input
                            type="tel"
                            className={styles.input}
                            name="nguoiNop_phone"
                            defaultValue={dataJson?.nguoiNop_phone || ""}
                            pattern="(0|\+84)[0-9]{9,10}"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Thư điện tử (nếu có):</label>
                        <input
                            type="email"
                            className={styles.input}
                            name="nguoiNop_email"
                            defaultValue={dataJson?.nguoiNop_email || ""}
                        />
                    </div>
                </div>

                <h3 className={styles.sectionTitle}>Thông tin cá nhân khác:</h3>
                <p className={styles.subLabel} style={{ marginTop: "16px", fontStyle: "italic", fontSize: "14px" }}>Trường hợp không có số định danh cá nhân hoặc việc kết nối giữa Cơ sở dữ liệu quốc gia về đăng ký doanh nghiệp với Cơ sở dữ liệu quốc gia về dân cư bị gián đoạn thì đề nghị kê khai các thông tin cá nhân dưới đây:</p>
                <div className={styles.grid2} style={{ marginTop: "8px" }}>
                    <DanTocSelect name="nguoiNop_danToc" defaultValue={dataJson?.nguoiNop_danToc} required={false} />
                    <QuocTichSelect name="nguoiNop_quocTich" defaultValue={dataJson?.nguoiNop_quocTich} required={false} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Số hộ chiếu (đối với cá nhân Việt Nam không có định danh cá nhân) / Số hộ chiếu nước ngoài hoặc giấy tờ có giá trị thay thế (đối với người nước ngoài):</label>
                    <input type="text" className={styles.input} name="nguoiNop_soHoChieu" defaultValue={dataJson?.nguoiNop_soHoChieu || ""} />
                </div>
                <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Ngày cấp:</label>
                        <DateInput name="nguoiNop_ngayCapHoChieu" className={styles.input} defaultValue={dataJson?.nguoiNop_ngayCapHoChieu || ""} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Nơi cấp:</label>
                        <input type="text" className={styles.input} name="nguoiNop_noiCapHoChieu" defaultValue={dataJson?.nguoiNop_noiCapHoChieu || ""} />
                    </div>
                </div>
                <h3 className={styles.sectionTitle} style={{ marginTop: "8px" }}>Nơi thường trú:</h3>
                <AddressSelect
                    isRequired={false}
                    provinces={provinces}
                    communes={communes_nguoiNopThuongTru}
                    onProvinceChange={setProvCode_nguoiNopThuongTru}
                    provinceName="nguoiNop_thuongTru_tinh"
                    wardName="nguoiNop_thuongTru_xa"
                    houseNumberName="nguoiNop_thuongTru_soNha"
                    provinceDefault={dataJson?.nguoiNop_thuongTru_tinh || ""}
                    wardDefault={dataJson?.nguoiNop_thuongTru_xa || ""}
                    houseNumberDefault={dataJson?.nguoiNop_thuongTru_soNha || ""}
                />
                <div className={styles.formGroup} style={{ marginTop: "8px" }}>
                    <label className={styles.label}>Quốc gia:</label>
                    <input type="text" className={styles.input} name="nguoiNop_thuongTru_quocGia" defaultValue={dataJson?.nguoiNop_thuongTru_quocGia || ""} />
                </div>
            </div>

            {/* TÌNH TRẠNG THÀNH LẬP */}
            <div className={styles.sectionGroup}>
                <h3 className={styles.sectionTitle}>Tình trạng thành lập:</h3>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Tình trạng thành lập (đánh dấu X vào ô thích hợp): <span className={styles.required}>*</span></label>
                    <div className={styles.radioGroup} style={{ flexDirection: "column", gap: "8px", alignItems: "flex-start" }}>
                        {[
                            { value: "moi", label: "Thành lập mới" },
                            { value: "tach", label: "Thành lập trên cơ sở tách doanh nghiệp" },
                            { value: "chia", label: "Thành lập trên cơ sở chia doanh nghiệp" },
                            { value: "hop_nhat", label: "Thành lập trên cơ sở hợp nhất doanh nghiệp" },
                            { value: "chuyen_doi_loai_hinh", label: "Thành lập trên cơ sở chuyển đổi loại hình doanh nghiệp" },
                            { value: "chuyen_doi_hkd", label: "Thành lập trên cơ sở chuyển đổi từ hộ kinh doanh" },
                            { value: "chuyen_doi_quy", label: "Thành lập trên cơ sở chuyển đổi từ cơ sở bảo trợ xã hội/quỹ xã hội/quỹ từ thiện" }
                        ].map((option) => (
                            <label key={option.value} className={styles.radioLabel} style={{ marginBottom: "0", cursor: "pointer" }}>
                                <input
                                    type="radio"
                                    name="tinhTrangThanhLap"
                                    value={option.value}
                                    className={styles.radioInput}
                                    defaultChecked={(dataJson?.tinhTrangThanhLap || "moi") === option.value}
                                    required
                                />
                                {" "}{option.label}
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* TÊN CÔNG TY */}
            <div className={styles.sectionGroup}>
                <h3 className={styles.sectionTitle}>Tên công ty:</h3>
                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Tên công ty viết bằng tiếng Việt (ghi bằng chữ in hoa): <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="text"
                        className={styles.input}
                        name="tenCongTyVN"
                        defaultValue={dataJson?.tenCongTyVN || ""}
                        style={{ textTransform: "uppercase" }}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Tên công ty viết bằng tiếng nước ngoài (nếu có):</label>
                    <input
                        type="text"
                        className={styles.input}
                        name="tenCongTyEN"
                        defaultValue={dataJson?.tenCongTyEN || ""}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Tên công ty viết tắt (nếu có):</label>
                    <input
                        type="text"
                        className={styles.input}
                        name="tenCongTyVietTat"
                        defaultValue={dataJson?.tenCongTyVietTat || ""}
                    />
                </div>
            </div>

            {/* ĐỊA CHỈ TRỤ SỞ */}
            <div className={styles.sectionGroup}>
                <h3 className={styles.sectionTitle}>Địa chỉ trụ sở chính:</h3>
                <AddressSelect
                    provinces={provinces}
                    communes={communes_truSo}
                    onProvinceChange={setProvCode_truSo}
                    provinceName="truSo_tinh"
                    wardName="truSo_xa"
                    houseNumberName="truSo_soNha"
                    provinceDefault={dataJson?.truSo_tinh || ""}
                    wardDefault={dataJson?.truSo_xa || ""}
                    houseNumberDefault={dataJson?.truSo_soNha || ""}
                />
                <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Điện thoại: <span className={styles.required}>*</span></label>
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
                        <label className={styles.label}>Số fax (nếu có):</label>
                        <input
                            type="text"
                            className={styles.input}
                            name="truSo_fax"
                            defaultValue={dataJson?.truSo_fax || ""}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Thư điện tử (nếu có):</label>
                        <input
                            type="email"
                            className={styles.input}
                            name="truSo_email"
                            defaultValue={dataJson?.truSo_email || ""}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Website (nếu có):</label>
                        <input
                            type="text"
                            className={styles.input}
                            name="truSo_website"
                            defaultValue={dataJson?.truSo_website || ""}
                        />
                    </div>
                </div>
            </div>

            {/* NGÀNH NGHỀ KINH DOANH */}
            <div className={styles.sectionGroup}>
                <NganhNgheTable rows={nganhNgheRows} onChangeRows={setNganhNgheRows} />
            </div>

            {/* CHỦ SỞ HỮU */}
            <div className={styles.sectionGroup}>
                <h3 className={styles.sectionTitle}>Thông tin về chủ sở hữu:</h3>
                <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            Họ, chữ đệm và tên (ghi bằng chữ in hoa): <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="text"
                            className={styles.input}
                            name="chuSoHuu_hoTen"
                            defaultValue={dataJson?.chuSoHuu_hoTen || ""}
                            style={{ textTransform: "uppercase" }}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            Ngày, tháng, năm sinh: <span className={styles.required}>*</span>
                        </label>
                        <DateInput
                            className={styles.input}
                            name="chuSoHuu_ngaySinh"
                            defaultValue={dataJson?.chuSoHuu_ngaySinh || ""}
                            required
                        />
                    </div>
                    <GioiTinhSelect name="chuSoHuu_gioiTinh" defaultValue={dataJson?.chuSoHuu_gioiTinh} required />
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            Số định danh cá nhân: <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="text"
                            className={styles.input}
                            name="chuSoHuu_cccd"
                            defaultValue={dataJson?.chuSoHuu_cccd || ""}
                            required
                            pattern="[0-9]{9,12}"
                        />
                    </div>
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
                <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Điện thoại (nếu có):</label>
                        <input
                            type="tel"
                            className={styles.input}
                            name="chuSoHuu_phone"
                            defaultValue={dataJson?.chuSoHuu_phone || ""}
                            pattern="(0|\+84)[0-9]{9,10}"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Thư điện tử (nếu có):</label>
                        <input
                            type="email"
                            className={styles.input}
                            name="chuSoHuu_email"
                            defaultValue={dataJson?.chuSoHuu_email || ""}
                        />
                    </div>
                </div>

                <h3 className={styles.sectionTitle}>Thông tin cá nhân khác của chủ sở hữu:</h3>
                <p className={styles.subLabel} style={{ marginTop: "16px", fontStyle: "italic", fontSize: "14px" }}>Trường hợp không có số định danh cá nhân hoặc việc kết nối giữa Cơ sở dữ liệu quốc gia về đăng ký doanh nghiệp với Cơ sở dữ liệu quốc gia về dân cư bị gián đoạn thì đề nghị kê khai các thông tin cá nhân dưới đây:</p>
                <div className={styles.grid2} style={{ marginTop: "8px" }}>
                    <DanTocSelect name="chuSoHuu_danToc" defaultValue={dataJson?.chuSoHuu_danToc} required={false} />
                    <QuocTichSelect name="chuSoHuu_quocTich" defaultValue={dataJson?.chuSoHuu_quocTich} required={false} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Số hộ chiếu (đối với cá nhân Việt Năm không có định danh cá nhân) / Số hộ chiếu nước ngoài hoặc giấy tờ có giá trị thay thế (đối với người nước ngoài):</label>
                    <input type="text" className={styles.input} name="chuSoHuu_soHoChieu" defaultValue={dataJson?.chuSoHuu_soHoChieu || ""} />
                </div>
                <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Ngày cấp:</label>
                        <DateInput name="chuSoHuu_ngayCapHoChieu" className={styles.input} defaultValue={dataJson?.chuSoHuu_ngayCapHoChieu || ""} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Nơi cấp:</label>
                        <input type="text" className={styles.input} name="chuSoHuu_noiCapHoChieu" defaultValue={dataJson?.chuSoHuu_noiCapHoChieu || ""} />
                    </div>
                </div>
                <h3 className={styles.sectionTitle} style={{ marginTop: "8px" }}>Nơi thường trú:</h3>
                <AddressSelect
                    isRequired={false}
                    provinces={provinces}
                    communes={communes_chuSoHuuThuongTru}
                    onProvinceChange={setProvCode_chuSoHuuThuongTru}
                    provinceName="chuSoHuu_thuongTru_tinh"
                    wardName="chuSoHuu_thuongTru_xa"
                    houseNumberName="chuSoHuu_thuongTru_soNha"
                    provinceDefault={dataJson?.chuSoHuu_thuongTru_tinh || ""}
                    wardDefault={dataJson?.chuSoHuu_thuongTru_xa || ""}
                    houseNumberDefault={dataJson?.chuSoHuu_thuongTru_soNha || ""}
                />
                <div className={styles.formGroup} style={{ marginTop: "8px" }}>
                    <label className={styles.label}>Quốc gia:</label>
                    <input type="text" className={styles.input} name="chuSoHuu_thuongTru_quocGia" defaultValue={dataJson?.chuSoHuu_thuongTru_quocGia || ""} />
                </div>

                <h3 className={styles.sectionTitle} style={{ marginTop: "25px" }}>Thông tin về Giấy chứng nhận đăng ký đầu tư <span style={{ fontWeight: "normal", fontStyle: "italic" }}>(chỉ kê khai nếu chủ sở hữu là nhà đầu tư nước ngoài)</span>:</h3>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Mã số dự án:</label>
                    <input type="text" className={styles.input} name="chuSoHuu_maSoDuAn" defaultValue={dataJson?.chuSoHuu_maSoDuAn || ""} />
                </div>
                <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Ngày cấp:</label>
                        <DateInput name="chuSoHuu_ngayCapDuAn" className={styles.input} defaultValue={dataJson?.chuSoHuu_ngayCapDuAn || ""} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Cơ quan cấp:</label>
                        <input type="text" className={styles.input} name="chuSoHuu_coQuanCapDuAn" defaultValue={dataJson?.chuSoHuu_coQuanCapDuAn || ""} />
                    </div>
                </div>
            </div>

            {/* VỐN ĐIỀU LỆ */}
            <CapitalInput
                title="Vốn điều lệ"
                labelNumber="Vốn điều lệ (bằng số; VNĐ)"
                labelText="Vốn điều lệ (bằng chữ; VNĐ)"
                nameNumber="vonDieuLe"
                nameText="vonDieuLe_bangChu"
                defaultNumber={dataJson?.vonDieuLe}
                defaultText={dataJson?.vonDieuLe_bangChu}
                required={true}
            />
            <div className={styles.grid2} style={{ marginTop: "-30px" }}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Giá trị tương đương theo đơn vị tiền nước ngoài (nếu có; bằng số, loại ngoại tệ):</label>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <input
                            type="text"
                            className={styles.input}
                            style={{ width: "70%" }}
                            name="vonDieuLe_ngoaiTeBangSo"
                            defaultValue={dataJson?.vonDieuLe_ngoaiTeBangSo || ""}
                            placeholder="Tiền bằng số"
                        />
                        <input
                            type="text"
                            className={styles.input}
                            style={{ width: "30%" }}
                            name="vonDieuLe_ngoaiTeDonVi"
                            defaultValue={dataJson?.vonDieuLe_ngoaiTeDonVi || ""}
                            placeholder="Loại ngoại tệ"
                        />
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Có hiển thị thông tin về giá trị tương đương theo đơn vị tiền tệ nước ngoài trên Giấy chứng nhận đăng ký doanh nghiệp hay không?</label>
                    <div className={styles.radioGroup}>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                name="hienThiNgoaiTe"
                                value="co"
                                className={styles.radioInput}
                                defaultChecked={dataJson?.hienThiNgoaiTe === "co"}
                            />
                            {" "}Có
                        </label>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                name="hienThiNgoaiTe"
                                value="khong"
                                className={styles.radioInput}
                                defaultChecked={!dataJson?.hienThiNgoaiTe || dataJson?.hienThiNgoaiTe === "khong"}
                            />
                            {" "}Không
                        </label>
                    </div>
                </div>
            </div>
            <div className={styles.sectionGroup}>
                <h3 className={styles.sectionTitle} style={{ marginTop: "12px" }}>Nguồn vốn điều lệ:</h3>
                <table className={styles.table} onChange={handleNguonVonChange}>
                    <thead>
                        <tr>
                            <th>Loại nguồn vốn</th>
                            <th>Số tiền (bằng số; VNĐ và giá trị tương đương theo đơn vị tiền nước ngoài, nếu có)</th>
                            <th style={{ width: "100px" }}>Tỷ lệ (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { label: "Vốn ngân sách nhà nước", namePrefix: "nguonVon_nganSach" },
                            { label: "Vốn tư nhân", namePrefix: "nguonVon_tuNhan" },
                            { label: "Vốn nước ngoài", namePrefix: "nguonVon_nuocNgoai" },
                            { label: "Vốn khác", namePrefix: "nguonVon_khac" },
                            { label: "Tổng cộng", namePrefix: "nguonVon_tongCong", readOnly: true },
                        ].map(({ label, namePrefix, readOnly }) => (
                            <tr key={namePrefix}>
                                <td>{label}</td>
                                <td>
                                    <input
                                        type="text"
                                        className={styles.tableInput}
                                        name={`${namePrefix}_soTien`}
                                        defaultValue={dataJson?.[`${namePrefix}_soTien`] || ""}
                                        readOnly={readOnly}
                                        style={readOnly ? { background: "#f5f5f5", fontWeight: 600 } : {}}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className={styles.tableInput}
                                        name={`${namePrefix}_tyLe`}
                                        defaultValue={dataJson?.[`${namePrefix}_tyLe`] || ""}
                                        readOnly={readOnly}
                                        style={readOnly ? { background: "#f5f5f5", fontWeight: 600 } : {}}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



            {/* TÀI SẢN GÓP VỐN */}
            <div className={styles.sectionGroup}>
                <h3 className={styles.sectionTitle}>Tài sản góp vốn:</h3>
                <table className={styles.table} onChange={handleTaiSanChange}>
                    <thead>
                        <tr>
                            <th style={{ width: "50px" }}>STT</th>
                            <th>Tài sản góp vốn</th>
                            <th>Giá trị vốn của từng tài sản trong vốn điều lệ (bằng số, VNĐ)</th>
                            <th style={{ width: "100px" }}>Tỷ lệ (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { stt: 1, label: "Đồng Việt Nam", namePrefix: "taiSan_dongVN" },
                            { stt: 2, label: "Ngoại tệ tự do chuyển đổi (ghi rõ loại ngoại tệ, số tiền được góp bằng mỗi loại ngoại tệ)", namePrefix: "taiSan_ngoaiTe" },
                            { stt: 3, label: "Vàng", namePrefix: "taiSan_vang" },
                            { stt: 4, label: "Quyền sử dụng đất", namePrefix: "taiSan_qsdDat" },
                            { stt: 5, label: "Quyền sở hữu trí tuệ", namePrefix: "taiSan_shtt" },
                            { stt: 6, label: "Các tài sản khác (ghi rõ loại tài sản, số lượng và giá trị còn lại của mỗi loại tài sản, có thể lập thành danh mục riêng kèm theo hồ sơ đăng ký doanh nghiệp)", namePrefix: "taiSan_khac" },
                        ].map(({ stt, label, namePrefix }) => (
                            <tr key={namePrefix}>
                                <td style={{ textAlign: "center", verticalAlign: "top", paddingTop: "10px" }}>{stt}</td>
                                <td>{label}</td>
                                <td>
                                    <input type="text" className={styles.tableInput} name={`${namePrefix}_giaTri`} defaultValue={dataJson?.[`${namePrefix}_giaTri`] || ""} />
                                </td>
                                <td>
                                    <input type="text" className={styles.tableInput} name={`${namePrefix}_tyLe`} defaultValue={dataJson?.[`${namePrefix}_tyLe`] || ""} />
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={2} style={{ textAlign: "center", fontWeight: 600 }}>Tổng số</td>
                            <td><input type="text" className={styles.tableInput} name="taiSan_tongSo_giaTri" defaultValue={dataJson?.taiSan_tongSo_giaTri || ""} style={{ background: "#f5f5f5" }} readOnly /></td>
                            <td><input type="text" className={styles.tableInput} name="taiSan_tongSo_tyLe" defaultValue={dataJson?.taiSan_tongSo_tyLe || ""} style={{ background: "#f5f5f5" }} readOnly /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* NGƯỜI ĐẠI DIỆN THEO PHÁP LUẬT */}
            <div className={styles.sectionGroup}>
                <h3 className={styles.sectionTitle}>Người đại diện theo pháp luật:</h3>
                <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Họ, chữ đệm và tên (ghi bằng chữ in hoa): <span className={styles.required}>*</span></label>
                        <input type="text" className={styles.input} name="nguoiDaiDien_hoTen" defaultValue={dataJson?.nguoiDaiDien_hoTen || ""} style={{ textTransform: "uppercase" }} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Ngày, tháng, năm sinh: <span className={styles.required}>*</span></label>
                        <DateInput className={styles.input} name="nguoiDaiDien_ngaySinh" defaultValue={dataJson?.nguoiDaiDien_ngaySinh || ""} required />
                    </div>
                    <GioiTinhSelect name="nguoiDaiDien_gioiTinh" defaultValue={dataJson?.nguoiDaiDien_gioiTinh} required />
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Số định danh cá nhân: <span className={styles.required}>*</span></label>
                        <input type="text" className={styles.input} name="nguoiDaiDien_cccd" defaultValue={dataJson?.nguoiDaiDien_cccd || ""} required pattern="[0-9]{9,12}" />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Chức danh: <span className={styles.required}>*</span></label>
                        <input type="text" className={styles.input} name="nguoiDaiDien_chucDanh" defaultValue={dataJson?.nguoiDaiDien_chucDanh || ""} required />
                    </div>
                </div>
                <h3 className={styles.sectionTitle} style={{ marginTop: "8px" }}>Địa chỉ liên lạc của người đại diện:</h3>
                <AddressSelect
                    provinces={provinces}
                    communes={communes_lienLac}
                    onProvinceChange={setProvCode_lienLac}
                    provinceName="nguoiDaiDien_tinh"
                    wardName="nguoiDaiDien_xa"
                    houseNumberName="nguoiDaiDien_soNha"
                    provinceDefault={dataJson?.nguoiDaiDien_tinh || ""}
                    wardDefault={dataJson?.nguoiDaiDien_xa || ""}
                    houseNumberDefault={dataJson?.nguoiDaiDien_soNha || ""}
                />

                <h3 className={styles.sectionTitle} style={{ marginTop: "25px" }}>Thông tin cá nhân khác của người đại diện theo pháp luật:</h3>
                <p className={styles.subLabel} style={{ marginTop: "16px", fontStyle: "italic", fontSize: "14px" }}>Trường hợp không có số định danh cá nhân hoặc việc kết nối giữa Cơ sở dữ liệu quốc gia về đăng ký doanh nghiệp với Cơ sở dữ liệu quốc gia về dân cư bị gián đoạn thì đề nghị kê khai các thông tin cá nhân dưới đây:</p>
                <div className={styles.grid2} style={{ marginTop: "8px" }}>
                    <DanTocSelect name="nguoiDaiDien_danToc" defaultValue={dataJson?.nguoiDaiDien_danToc} required={false} />
                    <QuocTichSelect name="nguoiDaiDien_quocTich" defaultValue={dataJson?.nguoiDaiDien_quocTich} required={false} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Số hộ chiếu (đối với cá nhân VN không có định danh cá nhân) / Số hộ chiếu nước ngoài hoặc giấy tờ có giá trị thay thế (đối với người nước ngoài):</label>
                    <input type="text" className={styles.input} name="nguoiDaiDien_soHoChieu" defaultValue={dataJson?.nguoiDaiDien_soHoChieu || ""} />
                </div>
                <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Ngày cấp:</label>
                        <DateInput name="nguoiDaiDien_ngayCapHoChieu" className={styles.input} defaultValue={dataJson?.nguoiDaiDien_ngayCapHoChieu || ""} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Nơi cấp:</label>
                        <input type="text" className={styles.input} name="nguoiDaiDien_noiCapHoChieu" defaultValue={dataJson?.nguoiDaiDien_noiCapHoChieu || ""} />
                    </div>
                </div>
                <h3 className={styles.sectionTitle} style={{ marginTop: "8px" }}>Nơi thường trú:</h3>
                <AddressSelect
                    isRequired={false}
                    provinces={provinces}
                    communes={communes_nguoiDaiDienThuongTru}
                    onProvinceChange={setProvCode_nguoiDaiDienThuongTru}
                    provinceName="nguoiDaiDien_thuongTru_tinh"
                    wardName="nguoiDaiDien_thuongTru_xa"
                    houseNumberName="nguoiDaiDien_thuongTru_soNha"
                    provinceDefault={dataJson?.nguoiDaiDien_thuongTru_tinh || ""}
                    wardDefault={dataJson?.nguoiDaiDien_thuongTru_xa || ""}
                    houseNumberDefault={dataJson?.nguoiDaiDien_thuongTru_soNha || ""}
                />
                <div className={styles.formGroup} style={{ marginTop: "8px" }}>
                    <label className={styles.label}>Quốc gia:</label>
                    <input type="text" className={styles.input} name="nguoiDaiDien_thuongTru_quocGia" defaultValue={dataJson?.nguoiDaiDien_thuongTru_quocGia || "Việt Nam"} />
                </div>
            </div>

            {/* THÔNG TIN ĐĂNG KÝ THUẾ */}
            <div className={styles.sectionGroup}>
                <h3 className={styles.sectionTitle}>Thông tin đăng ký thuế:</h3>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th style={{ width: "80px" }}>STT</th>
                            <th>Các chỉ tiêu thông tin đăng ký thuế</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ textAlign: "center" }}>10.1</td>
                            <td>
                                <p className={styles.sectionTitle}>Thông tin về Giám đốc/Tổng giám đốc (nếu có):</p>
                                <div className={styles.grid2}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Họ, chữ đệm và tên Giám đốc/Tổng giám đốc: <span className={styles.required}>*</span></label>
                                        <input type="text" className={styles.input} name="giamDoc_hoTen" defaultValue={dataJson?.giamDoc_hoTen || ""} style={{ textTransform: "uppercase" }} required />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Ngày, tháng, năm sinh: <span className={styles.required}>*</span></label>
                                        <DateInput className={styles.input} name="giamDoc_ngaySinh" defaultValue={dataJson?.giamDoc_ngaySinh || ""} required />
                                    </div>
                                    <GioiTinhSelect name="giamDoc_gioiTinh" defaultValue={dataJson?.giamDoc_gioiTinh} required />
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Số định danh cá nhân: <span className={styles.required}>*</span></label>
                                        <input type="text" className={styles.input} name="giamDoc_cccd" defaultValue={dataJson?.giamDoc_cccd || ""} pattern="[0-9]{9,12}" required />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Điện thoại: <span className={styles.required}>*</span></label>
                                        <input type="tel" className={styles.input} name="giamDoc_phone" defaultValue={dataJson?.giamDoc_phone || ""} pattern="(0|\+84)[0-9]{9,10}" required />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center" }}>10.2</td>
                            <td>
                                <p className={styles.sectionTitle}>Thông tin về Kế toán trưởng/Phụ trách kế toán (nếu có):</p>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Họ, chữ đệm và tên Kế toán trưởng/Phụ trách kế toán:</label>
                                    <input type="text" className={styles.input} name="keToan_hoTen" defaultValue={dataJson?.keToan_hoTen || ""} style={{ textTransform: "uppercase" }} />
                                </div>
                                <div className={styles.grid2}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Ngày, tháng, năm sinh:</label>
                                        <DateInput className={styles.input} name="keToan_ngaySinh" defaultValue={dataJson?.keToan_ngaySinh || ""} />
                                    </div>
                                    <GioiTinhSelect name="keToan_gioiTinh" defaultValue={dataJson?.keToan_gioiTinh} />
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Số định danh cá nhân:</label>
                                        <input type="text" className={styles.input} name="keToan_cccd" defaultValue={dataJson?.keToan_cccd || ""} pattern="[0-9]{9,12}" />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Điện thoại:</label>
                                        <input type="tel" className={styles.input} name="keToan_phone" defaultValue={dataJson?.keToan_phone || ""} pattern="(0|\+84)[0-9]{9,10}" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center" }}>10.3</td>
                            <td>
                                <p className={styles.sectionTitle}>Địa chỉ nhận thông báo thuế (chỉ kê khai nếu địa chỉ nhận thông báo thuế khác địa chỉ trụ sở chính):</p>
                                <AddressSelect
                                    isRequired={false}
                                    provinces={provinces}
                                    communes={communes_thongBaoThue}
                                    onProvinceChange={setProvCode_thongBaoThue}
                                    provinceName="thongBaoThue_tinh"
                                    wardName="thongBaoThue_xa"
                                    houseNumberName="thongBaoThue_soNha"
                                    provinceDefault={dataJson?.thongBaoThue_tinh || ""}
                                    wardDefault={dataJson?.thongBaoThue_xa || ""}
                                    houseNumberDefault={dataJson?.thongBaoThue_soNha || ""}
                                />
                                <div className={styles.grid2} style={{ marginTop: "16px" }}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Điện thoại (nếu có):</label>
                                        <input type="tel" className={styles.input} name="thongBaoThue_phone" defaultValue={dataJson?.thongBaoThue_phone || ""} pattern="(0|\+84)[0-9]{9,10}" />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Số fax (nếu có):</label>
                                        <input type="text" className={styles.input} name="thongBaoThue_fax" defaultValue={dataJson?.thongBaoThue_fax || ""} />
                                    </div>
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Thư điện tử (nếu có):</label>
                                    <input type="email" className={styles.input} name="thongBaoThue_email" defaultValue={dataJson?.thongBaoThue_email || ""} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center" }}>10.4</td>
                            <td>
                                <div className={styles.formGroup}>
                                    <div className={styles.label}>Ngày bắt đầu hoạt động <span style={{ fontStyle: "italic", fontWeight: 400 }}>
                                        (trường hợp doanh nghiệp dự kiến bắt đầu hoạt động kể từ ngày được cấp Giấy chứng nhận đăng ký doanh nghiệp thì không cần kê khai nội dung này):</span>
                                    </div>
                                    <DateInput name="ngayBatDauHoatDong" className={styles.input} defaultValue={dataJson?.ngayBatDauHoatDong || ""} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center" }}>10.5</td>
                            <td>
                                <p className={styles.label}>
                                    Hình thức hạch toán
                                    <span style={{ fontStyle: "italic", fontWeight: 400 }}>(Đánh dấu X vào một trong hai ô "Hạch toán độc lập" hoặc "Hạch toán phụ thuộc". Trường hợp chọn ô "Hạch toán độc lập" mà thuộc đối tượng phải lập và gửi báo cáo tài chính hợp nhất cho cơ quan có thẩm quyền theo quy định thì chọn thêm ô "Có báo cáo tài chính hợp nhất")</span>:
                                </p>
                                <div style={{ display: "flex", flexWrap: "wrap", rowGap: "8px", columnGap: "40px", maxWidth: "600px" }}>
                                    <label className={styles.radioLabel} style={{ justifyContent: "space-between", width: "200px" }}>
                                        <span>Hạch toán độc lập</span>
                                        <input type="radio" name="hinhThucHachToan" value="doc_lap" className={styles.radioInput} defaultChecked={!dataJson || dataJson.hinhThucHachToan !== "phu_thuoc"} />
                                    </label>
                                    <label className={styles.radioLabel} style={{ justifyContent: "space-between", width: "250px" }}>
                                        <span>Có báo cáo tài chính hợp nhất</span>
                                        <input type="checkbox" name="baoCaoTaiChinhHopNhat" value="co" className={styles.radioInput} defaultChecked={dataJson?.baoCaoTaiChinhHopNhat === "co"} />
                                    </label>
                                    <label className={styles.radioLabel} style={{ justifyContent: "space-between", width: "200px" }}>
                                        <span>Hạch toán phụ thuộc</span>
                                        <input type="radio" name="hinhThucHachToan" value="phu_thuoc" className={styles.radioInput} defaultChecked={dataJson?.hinhThucHachToan === "phu_thuoc"} />
                                    </label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center" }}>10.6</td>
                            <td>
                                <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                                    <div className={styles.label}>Năm tài chính:</div>
                                    <p style={{ marginTop: "4px" }}>Áp dụng từ ngày <input type="text" className={styles.input} style={{ width: "60px", display: "inline-block", padding: "4px", minHeight: "30px", textAlign: "center" }} name="namTaiChinh_tuNgay" defaultValue={dataJson?.namTaiChinh_tuNgay || "01/01"} /> đến ngày <input type="text" className={styles.input} style={{ width: "60px", display: "inline-block", padding: "4px", minHeight: "30px", textAlign: "center" }} name="namTaiChinh_denNgay" defaultValue={dataJson?.namTaiChinh_denNgay || "31/12"} /></p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center" }}>10.7</td>
                            <td>
                                <div className={styles.formGroup} style={{ marginBottom: 0, display: "flex", alignItems: "center", gap: "10px" }}>
                                    <div className={styles.label} style={{ marginBottom: 0 }}>Tổng số lao động <span style={{ fontStyle: "italic", fontWeight: "normal" }}>(dự kiến)</span>:</div>
                                    <input type="number" className={styles.input} style={{ width: "100px", minHeight: "30px", padding: "4px 8px" }} name="tongSoLaoDong" defaultValue={dataJson?.tongSoLaoDong || "01"} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center" }}>10.8</td>
                            <td>
                                <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                                    <div className={styles.label}>Hoạt động theo dự án BOT/BTO/BT/BOO, BLT, BTL, O&M:</div>
                                    <div className={styles.radioGroup} style={{ padding: "4px 0 0 0" }}>
                                        <label className={styles.radioLabel} style={{ justifyContent: "center", width: "70px", gap: "10px" }}>
                                            <span>Có</span>
                                            <input type="radio" name="hoatDongDuAn" value="co" className={styles.radioInput} defaultChecked={dataJson?.hoatDongDuAn === "co"} />
                                        </label>
                                        <label className={styles.radioLabel} style={{ justifyContent: "center", width: "70px", gap: "10px" }}>
                                            <span>Không</span>
                                            <input type="radio" name="hoatDongDuAn" value="khong" className={styles.radioInput} defaultChecked={!dataJson || dataJson.hoatDongDuAn !== "co"} />
                                        </label>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center" }}>10.9</td>
                            <td>
                                <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                                    <div className={styles.label}>Phương pháp tính thuế GTGT <span style={{ fontStyle: "italic", fontWeight: "normal" }}>(chọn 1 trong 4 phương pháp)</span>:</div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "400px" }}>
                                        <label className={styles.radioLabel} style={{ justifyContent: "space-between" }}>
                                            <span>Khấu trừ</span>
                                            <input type="radio" name="phuongPhapTinhThueGTGT" value="khau_tru" className={styles.radioInput} defaultChecked={!dataJson || dataJson.phuongPhapTinhThueGTGT !== "truc_tiep_gtgt" && dataJson.phuongPhapTinhThueGTGT !== "truc_tiep_doanh_so" && dataJson.phuongPhapTinhThueGTGT !== "khong_nop"} />
                                        </label>
                                        <label className={styles.radioLabel} style={{ justifyContent: "space-between" }}>
                                            <span>Trực tiếp trên GTGT</span>
                                            <input type="radio" name="phuongPhapTinhThueGTGT" value="truc_tiep_gtgt" className={styles.radioInput} defaultChecked={dataJson?.phuongPhapTinhThueGTGT === "truc_tiep_gtgt"} />
                                        </label>
                                        <label className={styles.radioLabel} style={{ justifyContent: "space-between" }}>
                                            <span>Trực tiếp trên doanh số</span>
                                            <input type="radio" name="phuongPhapTinhThueGTGT" value="truc_tiep_doanh_so" className={styles.radioInput} defaultChecked={dataJson?.phuongPhapTinhThueGTGT === "truc_tiep_doanh_so"} />
                                        </label>
                                        <label className={styles.radioLabel} style={{ justifyContent: "space-between" }}>
                                            <span>Không phải nộp thuế GTGT</span>
                                            <input type="radio" name="phuongPhapTinhThueGTGT" value="khong_nop" className={styles.radioInput} defaultChecked={dataJson?.phuongPhapTinhThueGTGT === "khong_nop"} />
                                        </label>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </form>
    );
});

export default GiayDeNghiDKDNDeclaration;
