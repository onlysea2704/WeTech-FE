import React from "react";
import { formatDate } from "@/utils/dateTimeUtils";
import styles from "@/components/Procedure/ProcedureTemplate/HoKinhDoanh/FormConfirmation/confirmation.module.css";
import CurrentDate from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/CurrentDate/CurrentDate";

export default function GiayUyQuyenConfirmation({ dataJson }) {
    if (!dataJson) return null;

    const {
        uyQuyen_hoTen = "",
        uyQuyen_ngaySinh = "",
        uyQuyen_gioiTinh = "",
        uyQuyen_cccd = "",
        uyQuyen_phone = "",
        uyQuyen_email = "",
        uyQuyen_soNha = "",
        uyQuyen_xa = "",
        uyQuyen_tinh = "",
        nhanUyQuyen_hoTen = "",
        nhanUyQuyen_ngaySinh = "",
        nhanUyQuyen_gioiTinh = "",
        nhanUyQuyen_cccd = "",
        nhanUyQuyen_phone = "",
        nhanUyQuyen_email = "",
        nhanUyQuyen_danToc = "",
        nhanUyQuyen_quocTich = "",
        nhanUyQuyen_thuongTru_soNha = "",
        nhanUyQuyen_thuongTru_xa = "",
        nhanUyQuyen_thuongTru_tinh = "",
        nhanUyQuyen_lienLac_soNha = "",
        nhanUyQuyen_lienLac_xa = "",
        nhanUyQuyen_lienLac_tinh = "",
        companyName = "doanh nghiệp",
        phongThucHien = "……………………………………………………………",
    } = dataJson;

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h2 className={styles.headerTitle}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h2>
                <h3 className={styles.headerSubtitle}>Độc lập - Tự do - Hạnh phúc</h3>
            </div>

            <div className={styles.docTitle} style={{ margin: "30px 0" }}>
                GIẤY UỶ QUYỀN
            </div>

            <div className={styles.sectionTitle} style={{ textDecoration: "underline", fontSize: "15px" }}>
                BÊN ỦY QUYỀN (BÊN A):
            </div>
            <div className={styles.infoRow}>
                <div className={styles.infoItem} style={{ flex: 1.5 }}>
                    <span className={styles.infoLabel}>Họ và tên: </span>
                    <span className={styles.infoValue} style={{ textTransform: "uppercase" }}>
                        {uyQuyen_hoTen}
                    </span>
                </div>
                <div className={styles.infoItem} style={{ flex: 1 }}>
                    <span className={styles.infoLabel}>Giới tính: </span>
                    <span className={styles.infoValue}>{uyQuyen_gioiTinh}</span>
                </div>
            </div>
            <div className={styles.infoLine}>
                <span className={styles.infoLabel}>Sinh ngày: </span>
                <span className={styles.infoValue}>{formatDate(uyQuyen_ngaySinh)}</span>
            </div>
            <div className={styles.infoLine}>
                <span className={styles.infoLabel}>Số định danh cá nhân: </span>
                <span className={styles.infoValue}>{uyQuyen_cccd}</span>
            </div>
            <div className={styles.infoLine}>
                <span className={styles.infoLabel}>Địa chỉ liên lạc: </span>
                <span className={styles.infoValue}>
                    {[uyQuyen_soNha, uyQuyen_xa, uyQuyen_tinh].filter(Boolean).join(", ")}
                </span>
            </div>
            <div className={styles.infoRow}>
                <div className={styles.infoItem} style={{ flex: 1 }}>
                    <span className={styles.infoLabel}>Số điện thoại: </span>
                    <span className={styles.infoValue}>{uyQuyen_phone}</span>
                </div>
                {uyQuyen_email && (
                    <div className={styles.infoItem} style={{ flex: 1 }}>
                        <span className={styles.infoLabel}>Email: </span>
                        <span className={styles.infoValue}>{uyQuyen_email}</span>
                    </div>
                )}
            </div>

            <div
                className={styles.sectionTitle}
                style={{ textDecoration: "underline", fontSize: "15px", marginTop: "20px" }}
            >
                BÊN NHẬN UỶ QUYỀN (BÊN B):
            </div>
            <div className={styles.infoRow}>
                <div className={styles.infoItem} style={{ flex: 1.5 }}>
                    <span className={styles.infoLabel}>Họ và tên: </span>
                    <span className={styles.infoValue} style={{ textTransform: "uppercase" }}>
                        {nhanUyQuyen_hoTen}
                    </span>
                </div>
                <div className={styles.infoItem} style={{ flex: 1 }}>
                    <span className={styles.infoLabel}>Giới tính: </span>
                    <span className={styles.infoValue}>{nhanUyQuyen_gioiTinh}</span>
                </div>
            </div>
            <div className={styles.infoRow}>
                <div className={styles.infoItem} style={{ flex: 1.5 }}>
                    <span className={styles.infoLabel}>Sinh ngày: </span>
                    <span className={styles.infoValue}>{formatDate(nhanUyQuyen_ngaySinh)}</span>
                </div>
                <div className={styles.infoItem} style={{ flex: 1 }}>
                    <span className={styles.infoLabel}>Dân tộc: </span>
                    <span className={styles.infoValue}>{nhanUyQuyen_danToc}</span>
                </div>
                <div className={styles.infoItem} style={{ flex: 1 }}>
                    <span className={styles.infoLabel}>Quốc tịch: </span>
                    <span className={styles.infoValue}>{nhanUyQuyen_quocTich}</span>
                </div>
            </div>
            <div className={styles.infoLine}>
                <span className={styles.infoLabel}>Số định danh cá nhân: </span>
                <span className={styles.infoValue}>{nhanUyQuyen_cccd}</span>
            </div>
            <div className={styles.infoLine}>
                <span className={styles.infoLabel}>Địa chỉ thường trú: </span>
                <span className={styles.infoValue}>
                    {[nhanUyQuyen_thuongTru_soNha, nhanUyQuyen_thuongTru_xa, nhanUyQuyen_thuongTru_tinh]
                        .filter(Boolean)
                        .join(", ")}
                </span>
            </div>
            <div className={styles.infoLine}>
                <span className={styles.infoLabel}>Địa chỉ liên lạc: </span>
                <span className={styles.infoValue}>
                    {[nhanUyQuyen_lienLac_soNha, nhanUyQuyen_lienLac_xa, nhanUyQuyen_lienLac_tinh]
                        .filter(Boolean)
                        .join(", ")}
                </span>
            </div>
            <div className={styles.infoRow}>
                <div className={styles.infoItem} style={{ flex: 1 }}>
                    <span className={styles.infoLabel}>Số điện thoại: </span>
                    <span className={styles.infoValue}>{nhanUyQuyen_phone}</span>
                </div>
                <div className={styles.infoItem} style={{ flex: 1 }}>
                    <span className={styles.infoLabel}>Email: </span>
                    <span className={styles.infoValue}>{nhanUyQuyen_email}</span>
                </div>
            </div>

            <div
                className={styles.sectionTitle}
                style={{ textDecoration: "underline", fontSize: "15px", marginTop: "20px", textAlign: "left" }}
            >
                NỘI DUNG ỦY QUYỀN:
            </div>
            <div className={styles.infoLine} style={{ marginBottom: "10px", textAlign: "left" }}>
                Bên A ủy quyền cho bên B thực hiện các công việc sau đây:
            </div>
            <div className={styles.infoLine} style={{ lineHeight: "1.8", textAlign: "left" }}>
                <span>Nộp hồ sơ và nhận kết quả thủ tục đăng ký mới {companyName} tại {phongThucHien}</span>
            </div>

            <div
                className={styles.sectionTitle}
                style={{ textDecoration: "underline", fontSize: "15px", marginTop: "20px", textAlign: "left" }}
            >
                THỜI HẠN UỶ QUYỀN:
            </div>
            <div className={styles.infoLine} style={{ textAlign: "left" }}>
                Từ ngày ký đến khi hoàn tất công việc.
            </div>
            <div className={styles.infoLine} style={{ textAlign: "left" }}>
                Thù lao ủy quyền: ủy quyền này không có thù lao
            </div>
            <div className={styles.infoLine} style={{ textAlign: "left" }}>
                Chúng tôi cam kết chịu trách nhiệm trước pháp luật về nội dung ủy quyền này.
            </div>
            <div className={styles.infoLine} style={{ textAlign: "left" }}>
                Giấy ủy quyền này được lập thành 02 bản chính, mỗi bên giữ 01 bản.
            </div>

            <div className={styles.dateLocation}>
                <CurrentDate />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", padding: "0 40px" }}>
                <div>
                    <div style={{ textAlign: "center", marginBottom: "10px" }}>
                        <span style={{ fontWeight: "bold", textDecoration: "underline" }}>BÊN NHẬN ỦY QUYỀN</span>
                    </div>
                </div>
                <div>
                    <div style={{ textAlign: "center", marginBottom: "10px" }}>
                        <span style={{ fontWeight: "bold", textDecoration: "underline" }}>BÊN ỦY QUYỀN</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
