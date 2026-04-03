import { useState } from "react";
import AddressSelect from "@/components/AddressSelect/AddressSelect";
import { useFetchAddress } from "@/hooks/useFetchAddress";
import { GioiTinhSelect, DanTocSelect, QuocTichSelect } from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/PersonalSelects/PersonalSelects";
import DateInput from "@/components/DateInput/DateInput";
import InfoTooltip from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/InfoTooltip/InfoTooltip";
import UploadCCCD from "@/components/UploadCCCD/UploadCCCD";

export default function ThongTinNguoiNopSection({ dataJson, styles, isNote = false }) {
    const [provCode_lienLac, setProvCode_lienLac] = useState("");
    const [provCode_thuongTru, setProvCode_thuongTru] = useState("");
    const { provinces, communes: communes_lienLac } = useFetchAddress(provCode_lienLac);
    const { communes: communes_thuongTru } = useFetchAddress(provCode_thuongTru);

    const tooltipToiLa = "Trường hợp Tòa án hoặc Trọng tài chỉ định người thực hiện thủ tục đăng ký doanh nghiệp thì người được chỉ định kê khai thông tin vào phần này. Trường hợp đăng ký chuyển đổi loại hình doanh nghiệp đồng thời đăng ký thay đổi người đại diện theo pháp luật thì Chủ tịch Hội đồng quản trị của công ty sau chuyển đổi kê khai thông tin vào phần này.";

    return (
        <>
            <h3 className={styles.sectionTitle}>Thông tin người đại diện:</h3>
            <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                    <div className={styles.grid2}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Tôi là (ghi họ tên bằng chữ IN HOA):
                                {isNote && <InfoTooltip content={tooltipToiLa} />}
                                <span className={styles.required}>*</span>
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
                            <input type="tel" className={styles.input} name="nguoiNop_phone" defaultValue={dataJson?.nguoiNop_phone || ""} pattern="(0|\+84)[0-9]{9,10}" />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Thư điện tử (nếu có):</label>
                            <input type="email" className={styles.input} name="nguoiNop_email" defaultValue={dataJson?.nguoiNop_email || ""} />
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
                        communes={communes_thuongTru}
                        onProvinceChange={setProvCode_thuongTru}
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
                <div style={{ width: "320px", flexShrink: 0, marginTop: "22px" }}>
                    <UploadCCCD />
                </div>
            </div>
        </>
    );
}
