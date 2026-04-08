import React, { useState, useEffect } from "react";
import Navbar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import styles from "./SearchProcedure.module.css";
import { useNavigate } from "react-router-dom";
import { publicAxios, authAxios } from "@/services/axios-instance";
import typeCompanyOptions from "@/consts/typeCompany";
import { downloadPdf } from "@/utils/downloadPdf";
import DateInput from "@/components/DateInput/DateInput";

export default function SearchProcedure() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0); // 0: Đã đăng ký, 1: Lưu tạm

    const [loading, setLoading] = useState(false);
    const [downloadingId, setDownloadingId] = useState(null);
    const [dataRegistered, setDataRegistered] = useState([]);
    const [dataDraft, setDataDraft] = useState([]);

    // Filter states
    const [typeCompany, setTypeCompany] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [code, setCode] = useState("");

    const fetchRegistered = async () => {
        setLoading(true);
        try {
            const res = await authAxios.get("/api/procedurer/search-registered", {
                params: {
                    typeCompany: typeCompany || undefined,
                    serviceType: serviceType || undefined,
                    startDate: formatISODate(startDate),
                    endDate: formatISODate(endDate),
                    code: code || undefined,
                },
            });
            setDataRegistered(res.data || []);
        } catch (error) {
            console.error("Error fetching registered procedures:", error);
            setDataRegistered([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchDrafts = async () => {
        setLoading(true);
        try {
            const res = await authAxios.get("/api/procedurer/search-drafts", {
                params: {
                    typeCompany: typeCompany || undefined,
                    serviceType: serviceType || undefined,
                    startDate: formatISODate(startDate),
                    endDate: formatISODate(endDate),
                },
            });
            setDataDraft(res.data || []);
        } catch (error) {
            console.error("Error fetching draft procedures:", error);
            setDataDraft([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (activeTab === 0) {
            fetchRegistered();
        } else {
            fetchDrafts();
        }
    };
    // Khi load trang hoặc đổi tab, fetch data
    useEffect(() => {
        handleSearch();
    }, [activeTab]);

    const formatISODate = (dateString) => {
        if (!dateString) return "";

        const date = new Date(dateString);
        return date.toISOString().replace("Z", "");
    };

    const handleDownloadFiles = async (procedureId, fallbackName = "files.zip") => {
        try {
            setDownloadingId(procedureId);
            const response = await authAxios.get("/api/procedurer/download-files", {
                params: { procedureId },
                responseType: "blob",
            });

            const blob = new Blob([response.data], { type: "application/zip" });

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = fallbackName;

            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading file:", error);
        } finally {
            setDownloadingId(null);
        }
    };

    const handleViewAgain = (procedureId) => {
        navigate(`/process-procedure/${procedureId}?tab=1&viewMode=see_again`);
    };

    const handleViewDetail = (procedureId) => {
        navigate(`/process-procedure/${procedureId}`);
    };

    const handleViewProcedure = (procedureId, status) => {
        if (status === "DRAFT" || status === "PAID") {
            handleViewDetail(procedureId);
        } else {
            handleViewAgain(procedureId);
        }
    };

    function getProcedureStatus(status) {
        switch (status) {
            case "DRAFT":
                return "Đang thực hiện";
            case "PAID":
                return "Đã thanh toán";
            case "PENDING":
                return "Đã tiếp nhận";
            case "SUCCESS":
                return "Thành công";
            case "FAILED":
                return "Thất bại";
            default:
                return "";
        }
    }

    function getProcedureStatusColor(status) {
        switch (status) {
            case "DRAFT":
                return "#FF782D";
            case "PAID":
                return "#10A142";
            case "PENDING":
                return "#FF782D";
            case "SUCCESS":
                return "#10A142";
            case "FAILED":
                return "#dc3545";
            default:
                return "";
        }
    }

    return (
        <div className={styles.pageContainer}>
            <Navbar />

            <div className={styles.mainContent}>
                <div className={styles.tabContainer}>
                    <button
                        className={`${styles.tabBtn} ${activeTab === 0 ? styles.active : ""}`}
                        onClick={() => setActiveTab(0)}
                    >
                        Tra cứu hồ sơ đã đăng ký
                    </button>
                    <button
                        className={`${styles.tabBtn} ${activeTab === 1 ? styles.active : ""}`}
                        onClick={() => setActiveTab(1)}
                    >
                        Tra cứu hồ sơ lưu tạm
                    </button>
                </div>

                <div className={styles.searchSection}>
                    <h2 className={styles.searchTitle}>
                        {activeTab === 0 ? "TRA CỨU HỒ SƠ ĐÃ ĐĂNG KÝ" : "TRA CỨU HỒ SƠ LƯU TẠM"}
                    </h2>

                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label>Loại thủ tục hành chính</label>
                            <select
                                className={styles.inputControl}
                                value={typeCompany}
                                onChange={(e) => setTypeCompany(e.target.value)}
                            >
                                <option value="">Tất cả</option>
                                {typeCompanyOptions.map((opt, i) => (
                                    <option key={i} value={opt.value}>
                                        {opt.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Tên thủ tục hành chính</label>
                            <select
                                className={styles.inputControl}
                                value={serviceType}
                                onChange={(e) => setServiceType(e.target.value)}
                            >
                                <option value="">Tất cả</option>
                                <option value="thanh_lap_cong_ty">Thành lập Công ty</option>
                                <option value="cap_nhat_thay_doi">Cập nhật thay đổi</option>
                                <option value="dang_ky_thay_doi">Đăng ký thay đổi</option>
                                <option value="tam_ngung_tiep_tuc_kd">Tạm ngừng - tiếp tục KD</option>
                                <option value="giai_the">Giải thể</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Từ ngày</label>
                            <DateInput
                                className={styles.inputControl}
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Đến ngày</label>
                            <DateInput
                                className={styles.inputControl}
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>

                        {activeTab === 0 && (
                            <>
                                <div className={styles.formGroup}>
                                    <label>Mã hồ sơ:</label>
                                    <input
                                        type="text"
                                        className={styles.inputControl}
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Mã bảo mật:</label>
                                    <div className={styles.captchaWrapper}>
                                        <input type="text" className={styles.inputControl} style={{ flex: 1 }} />
                                        <div className={styles.captchaBox}>d7wjof</div>
                                        <button className={styles.refreshCaptcha}>
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M12 4V1L8 5L12 9V6C15.31 6 18 8.69 18 12C18 13.01 17.75 13.97 17.3 14.8L18.76 16.26C19.54 15.03 20 13.57 20 12C20 7.58 16.42 4 12 4ZM12 18C8.69 18 6 15.31 6 12C6 10.99 6.25 10.03 6.7 9.2L5.24 7.74C4.46 8.97 4 10.43 4 12C4 16.42 7.58 20 12 20V23L16 19L12 15V18Z"
                                                    fill="#1e1b4b"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className={styles.buttonCenter}>
                        <button className={styles.searchSubmitBtn} onClick={handleSearch} disabled={loading}>
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ marginRight: "8px" }}
                            >
                                <path
                                    d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                                    fill="white"
                                />
                            </svg>
                            {loading ? "Đang tải..." : activeTab === 0 ? "Tra cứu" : "Tìm kiếm"}
                        </button>
                    </div>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.resultTable}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Xem</th>
                                <th>Mã hồ sơ</th>
                                <th>Tên Thủ tục pháp lý</th>
                                <th>Lần đăng ký</th>
                                <th>Cơ quan thuế tiếp nhận</th>
                                <th>{activeTab === 0 ? "Ngày nộp" : "Ngày thực hiện"}</th>
                                <th>Trạng thái</th>
                                <th>{activeTab === 0 ? "Tải xuống" : "Thực hiện tiếp"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(activeTab === 0 ? dataRegistered : dataDraft).length === 0 ? (
                                <tr>
                                    <td colSpan="9">Không có dữ liệu</td>
                                </tr>
                            ) : (
                                (activeTab === 0 ? dataRegistered : dataDraft).map((item, index) => (
                                    <tr key={item.procedureId || index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <button
                                                className={styles.iconBtn}
                                                onClick={() => handleViewProcedure(item.procedureId, item.status)}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M6.72461 14.5996H2.3496C1.3831 14.5996 0.599603 13.8161 0.599609 12.8496L0.599677 2.3496C0.599683 1.38311 1.38318 0.599609 2.34968 0.599609H10.2249C11.1914 0.599609 11.9749 1.38311 11.9749 2.34961V5.84962M11.5371 11.4999V11.4539M3.66238 4.09962H8.91238M3.66238 6.72463H8.91238M3.66238 9.34963H6.28738M14.5996 11.5371C14.5996 11.5371 13.8732 13.6807 11.5371 13.6432C9.20097 13.6058 8.47461 11.5371 8.47461 11.5371C8.47461 11.5371 9.17152 9.35618 11.5371 9.35618C13.9027 9.35618 14.5996 11.5371 14.5996 11.5371Z"
                                                        stroke="#1B154B"
                                                        strokeWidth="1.2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </button>
                                        </td>
                                        <td>{item.code || "-"}</td>
                                        <td>{item.serviceTypeTitle}</td>
                                        <td>{item.submissionCount}</td>
                                        <td>{item.taxAuthority || "-"}</td>
                                        <td>
                                            {item.submissionDate
                                                ? new Date(item.submissionDate).toLocaleDateString()
                                                : "-"}
                                        </td>
                                        <td style={{ color: getProcedureStatusColor(item.status) }}>
                                            {getProcedureStatus(item.status)}
                                        </td>
                                        <td className={styles.actionCell}>
                                            {activeTab === 0 ? (
                                                <button
                                                    className={styles.textBtn}
                                                    disabled={downloadingId === item.procedureId}
                                                    onClick={() =>
                                                        handleDownloadFiles(item.procedureId, item.title || "ho_so")
                                                    }
                                                >
                                                    {downloadingId === item.procedureId ? (
                                                        "Đang tải..."
                                                    ) : (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="15"
                                                            height="16"
                                                            viewBox="0 0 15 16"
                                                            fill="none"
                                                        >
                                                            <path
                                                                d="M6.17091 14.5996H2.4567C1.43105 14.5996 0.599603 13.8161 0.599609 12.8496L0.599681 2.3496C0.599688 1.38311 1.43114 0.599609 2.45678 0.599609H10.8139C11.8396 0.599609 12.671 1.38311 12.671 2.34961V7.16211M13.5996 12.8186L11.7005 14.5996M11.7005 14.5996L9.88541 12.8991M11.7005 14.5996V10.2246M3.84983 4.09961H9.42113M3.84983 6.72461H9.42113M3.84983 9.34961H6.63548"
                                                                stroke="#1B154B"
                                                                stroke-width="1.2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            />
                                                        </svg>
                                                    )}
                                                </button>
                                            ) : (
                                                <button
                                                    className={styles.textBtn}
                                                    onClick={() => handleViewDetail(item.procedureId)}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="15"
                                                        height="16"
                                                        viewBox="0 0 15 16"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M6.17091 14.5996H2.4567C1.43105 14.5996 0.599603 13.8161 0.599609 12.8496L0.599681 2.3496C0.599688 1.38311 1.43114 0.599609 2.45678 0.599609H10.8139C11.8396 0.599609 12.671 1.38311 12.671 2.34961V7.16211M13.5996 12.8186L11.7005 14.5996M11.7005 14.5996L9.88541 12.8991M11.7005 14.5996V10.2246M3.84983 4.09961H9.42113M3.84983 6.72461H9.42113M3.84983 9.34961H6.63548"
                                                            stroke="#1B154B"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Footer />
        </div>
    );
}
