import { useState } from "react";
import AddressSelect from "@/components/AddressSelect/AddressSelect";
import { useFetchAddress } from "@/hooks/useFetchAddress";

export default function DiaChiTruSoSection({ dataJson, styles }) {
    const [provCode, setProvCode] = useState("");
    const { provinces, communes, loadingCommunes } = useFetchAddress(provCode);

    return (
        <div className={styles.sectionGroup}>
            <h3 className={styles.sectionTitle}>Địa chỉ trụ sở chính:</h3>
            <AddressSelect
                provinces={provinces}
                communes={communes}
                onProvinceChange={setProvCode}
                provinceName="truSo_tinh"
                wardName="truSo_xa"
                houseNumberName="truSo_soNha"
                provinceDefault={dataJson?.truSo_tinh || ""}
                wardDefault={dataJson?.truSo_xa || ""}
                houseNumberDefault={dataJson?.truSo_soNha || ""}
                isLoadingCommunes={loadingCommunes}
            />
            <div className={styles.grid2}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Điện thoại: <span className={styles.required}>*</span></label>
                    <input type="tel" className={styles.input} name="truSo_phone" defaultValue={dataJson?.truSo_phone || ""} required pattern="(0|\+84)[0-9]{9,10}" />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Số fax (nếu có):</label>
                    <input type="text" className={styles.input} name="truSo_fax" defaultValue={dataJson?.truSo_fax || ""} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Thư điện tử (nếu có):</label>
                    <input type="email" className={styles.input} name="truSo_email" defaultValue={dataJson?.truSo_email || ""} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Website (nếu có):</label>
                    <input type="text" className={styles.input} name="truSo_website" defaultValue={dataJson?.truSo_website || ""} />
                </div>
            </div>

            <div className={styles.formGroup} style={{ marginTop: "16px" }}>
                <p className={styles.label} style={{ fontSize: "14px", fontStyle: "italic", marginBottom: "8px" }}>
                    - Doanh nghiệp nằm trong (Doanh nghiệp phải đánh dấu X vào ô vuông tương ứng với khu công nghệ cao nếu nộp hồ sơ tới Ban quản lý khu công nghệ cao):
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginLeft: "10px" }}>
                    <label className={styles.radioLabel}>
                        <input type="checkbox" name="truSo_loaiKhu" value="Khu công nghiệp" className={styles.radioInput} defaultChecked={dataJson?.truSo_loaiKhu === "Khu công nghiệp"} />
                        Khu công nghiệp
                    </label>
                    <label className={styles.radioLabel}>
                        <input type="checkbox" name="truSo_loaiKhu" value="Khu chế xuất" className={styles.radioInput} defaultChecked={dataJson?.truSo_loaiKhu === "Khu chế xuất"} />
                        Khu chế xuất
                    </label>
                    <label className={styles.radioLabel}>
                        <input type="checkbox" name="truSo_loaiKhu" value="Khu kinh tế" className={styles.radioInput} defaultChecked={dataJson?.truSo_loaiKhu === "Khu kinh tế"} />
                        Khu kinh tế
                    </label>
                    <label className={styles.radioLabel}>
                        <input type="checkbox" name="truSo_loaiKhu" value="Khu công nghệ cao" className={styles.radioInput} defaultChecked={dataJson?.truSo_loaiKhu === "Khu công nghệ cao"} />
                        Khu công nghệ cao
                    </label>
                </div>
            </div>

            <div className={styles.formGroup} style={{ marginTop: "16px" }}>
                <p className={styles.label} style={{ fontSize: "14px", marginBottom: "8px" }}>
                    - Doanh nghiệp có Giấy chứng nhận quyền sử dụng đất tại đảo và xã, phường biên giới; xã, phường ven biển; khu vực khác có ảnh hưởng đến quốc phòng, an ninh:
                </p>
                <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                        <input type="radio" name="truSo_anNinhQuocPhong" value="Có" className={styles.radioInput} defaultChecked={dataJson?.truSo_anNinhQuocPhong === "Có"} /> Có
                    </label>
                    <label className={styles.radioLabel}>
                        <input type="radio" name="truSo_anNinhQuocPhong" value="Không" className={styles.radioInput} defaultChecked={dataJson?.truSo_anNinhQuocPhong === "Không" || !dataJson?.truSo_anNinhQuocPhong} /> Không
                    </label>
                </div>
            </div>
        </div>
    );
}
