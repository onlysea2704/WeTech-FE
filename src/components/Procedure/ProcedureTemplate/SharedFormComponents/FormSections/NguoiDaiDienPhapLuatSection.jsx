import { useEffect, useState } from "react";
import AddressSelect from "@/components/AddressSelect/AddressSelect";
import { useFetchAddress } from "@/hooks/useFetchAddress";
import { GioiTinhSelect, DanTocSelect, QuocTichSelect } from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/PersonalSelects/PersonalSelects";
import DateInput from "@/components/DateInput/DateInput";
import InfoTooltip from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/InfoTooltip/InfoTooltip";
import UploadCCCD from "@/components/UploadCCCD/UploadCCCD";

export default function NguoiDaiDienPhapLuatSection({ dataJson, styles, isNote = false }) {
    const [provCode_lienLac, setProvCode_lienLac] = useState("");
    const [provCode_thuongTru, setProvCode_thuongTru] = useState("");
    const { provinces, communes: communes_lienLac } = useFetchAddress(provCode_lienLac);
    const { communes: communes_thuongTru } = useFetchAddress(provCode_thuongTru);

    const tooltipNguoiDaiDien = "Ghi thông tin của tất cả người đại diện theo pháp luật trong trường hợp công ty có nhiều hơn 01 người đại diện theo pháp luật.";

    const predefinedChucDanh = ["Giám đốc", "Tổng giám đốc"];

    const defaultChucDanh = dataJson?.nguoiDaiDien_chucDanh || "";
    const isPredefined = predefinedChucDanh.includes(defaultChucDanh);
    const initialChucDanhType = defaultChucDanh ? (isPredefined ? defaultChucDanh : "Khác") : "";
    const initialChucDanhOther = isPredefined ? "" : defaultChucDanh;

    const [chucDanhType, setChucDanhType] = useState(initialChucDanhType);
    const [chucDanhOther, setChucDanhOther] = useState(initialChucDanhOther);
    const [hasUserEditedChucDanh, setHasUserEditedChucDanh] = useState(false);

    // Keep select/input in sync when parent dataJson changes (ex: Giấy đề nghị cập nhật -> Điều lệ).
    useEffect(() => {
        if (hasUserEditedChucDanh) return;

        const nextChucDanh = dataJson?.nguoiDaiDien_chucDanh || "";
        const nextIsPredefined = predefinedChucDanh.includes(nextChucDanh);
        const nextType = nextChucDanh ? (nextIsPredefined ? nextChucDanh : "Khác") : "";
        const nextOther = nextIsPredefined ? "" : nextChucDanh;

        setChucDanhType(nextType);
        setChucDanhOther(nextOther);
    }, [dataJson?.nguoiDaiDien_chucDanh, hasUserEditedChucDanh]);    

    return (
        <div className={styles.sectionGroup}>
            <h3 className={styles.sectionTitle}>
                Người đại diện theo pháp luật:
                {isNote && <InfoTooltip content={tooltipNguoiDaiDien} />}
            </h3>
            <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
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
                            <label className={styles.label}>Chức danh:<span className={styles.required}>*</span></label>
                            <select
                                className={styles.input}
                                value={chucDanhType}
                                onChange={(e) => {
                                    setHasUserEditedChucDanh(true);
                                    const nextType = e.target.value;
                                    setChucDanhType(nextType);
                                    if (nextType !== "Khác") setChucDanhOther("");
                                }}
                                name={chucDanhType === "Khác" ? undefined : "nguoiDaiDien_chucDanh"}
                                required={chucDanhType !== "Khác"}
                            >
                                <option value="" disabled>-- Chọn chức danh --</option>
                                <option value="Giám đốc">Giám đốc</option>
                                <option value="Tổng giám đốc">Tổng giám đốc</option>
                                <option value="Khác">Khác</option>
                            </select>
                            {chucDanhType === "Khác" && (
                                <input
                                    type="text"
                                    className={styles.input}
                                    style={{ marginTop: "8px" }}
                                    name="nguoiDaiDien_chucDanh"
                                    value={chucDanhOther}
                                    onChange={(e) => {
                                        setHasUserEditedChucDanh(true);
                                        setChucDanhOther(e.target.value);
                                    }}
                                    placeholder="Nhập chức danh khác"
                                    required
                                />
                            )}
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
                        communes={communes_thuongTru}
                        onProvinceChange={setProvCode_thuongTru}
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
                <div style={{ width: "320px", flexShrink: 0, marginTop: "22px" }}>
                    <UploadCCCD />
                </div>
            </div>
        </div>
    );
}
