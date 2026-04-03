import { useState } from "react";
import AddressSelect from "@/components/AddressSelect/AddressSelect";
import { useFetchAddress } from "@/hooks/useFetchAddress";
import { GioiTinhSelect, DanTocSelect, QuocTichSelect } from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/PersonalSelects/PersonalSelects";
import DateInput from "@/components/DateInput/DateInput";
import UploadCCCD from "@/components/UploadCCCD/UploadCCCD";

export default function ThongTinChuSoHuuSection({ dataJson, styles }) {
    const [provCode_chuSoHuu, setProvCode_chuSoHuu] = useState("");
    const [provCode_thuongTru, setProvCode_thuongTru] = useState("");
    const { provinces, communes: communes_chuSoHuu } = useFetchAddress(provCode_chuSoHuu);
    const { communes: communes_thuongTru } = useFetchAddress(provCode_thuongTru);

    return (
        <div className={styles.sectionGroup}>
            <h3 className={styles.sectionTitle}>Thông tin về chủ sở hữu:</h3>
            <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                    <div className={styles.grid2}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Họ, chữ đệm và tên (ghi bằng chữ in hoa): <span className={styles.required}>*</span>
                            </label>
                            <input type="text" className={styles.input} name="chuSoHuu_hoTen" defaultValue={dataJson?.chuSoHuu_hoTen || ""} style={{ textTransform: "uppercase" }} required />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Ngày, tháng, năm sinh: <span className={styles.required}>*</span>
                            </label>
                            <DateInput className={styles.input} name="chuSoHuu_ngaySinh" defaultValue={dataJson?.chuSoHuu_ngaySinh || ""} required />
                        </div>
                        <GioiTinhSelect name="chuSoHuu_gioiTinh" defaultValue={dataJson?.chuSoHuu_gioiTinh} required />
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Số định danh cá nhân: <span className={styles.required}>*</span>
                            </label>
                            <input type="text" className={styles.input} name="chuSoHuu_cccd" defaultValue={dataJson?.chuSoHuu_cccd || ""} required pattern="[0-9]{9,12}" />
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
                            <input type="tel" className={styles.input} name="chuSoHuu_phone" defaultValue={dataJson?.chuSoHuu_phone || ""} pattern="(0|\+84)[0-9]{9,10}" />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Thư điện tử (nếu có):</label>
                            <input type="email" className={styles.input} name="chuSoHuu_email" defaultValue={dataJson?.chuSoHuu_email || ""} />
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
                        communes={communes_thuongTru}
                        onProvinceChange={setProvCode_thuongTru}
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
                <div style={{ width: "320px", flexShrink: 0, marginTop: "22px" }}>
                    <UploadCCCD />
                </div>
            </div>
        </div>
    );
}
