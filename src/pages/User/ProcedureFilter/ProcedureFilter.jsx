import React, { useState, useEffect } from "react";
import styles from "./ProcedureFilter.module.css";
import Navbar from "../../../components/NavBar/NavBar";
import Footer from "../../../components/Footer/Footer";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import CourseSkeleton from "../../../components/Loading/Skeleton/CourseSkeleton";
import { publicAxios } from "../../../services/axios-instance";
import { useNavigate, useSearchParams } from "react-router-dom";

// ===== Danh mục pháp lý (serviceType => label) =====
const CATEGORIES = [
    { label: "Thành lập Công ty", value: "thanh_lap_cong_ty" },
    { label: "Cập nhật thay đổi", value: "cap_nhat_thay_doi" },
    { label: "Đăng ký thay đổi", value: "dang_ky_thay_doi" },
    { label: "Tạm ngừng - tiếp tục KD", value: "tam_ngung_tiep_tuc_kd" },
    { label: "Giải thể", value: "giai_the" },
];

const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price || 0).replace("₫", "đ");

// ===== Procedure Card =====
function ProcedureCard({ procedure, onClick }) {
    const discount =
        procedure.realPrice > procedure.salePrice
            ? Math.round(((procedure.realPrice - procedure.salePrice) / procedure.realPrice) * 100)
            : 0;

    return (
        <div className={styles.procedureCard} onClick={onClick}>
            <div className={styles.cardImg}>
                {procedure.linkImage ? (
                    <img src={procedure.linkImage} alt={procedure.title} />
                ) : (
                    <div className={styles.cardImgPlaceholder}>
                        <svg
                            viewBox="0 0 24 24"
                            width="40"
                            height="40"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                            />
                        </svg>
                    </div>
                )}
                {discount > 0 && <span className={styles.discountBadge}>-{discount}%</span>}
            </div>
            <div className={styles.cardBody}>
                <p className={styles.cardCategory}>{procedure.typeCompanyTitle || procedure.serviceTypeTitle || "—"}</p>
                <h3 className={styles.cardTitle}>{procedure.title}</h3>
                <p className={styles.cardDesc}>{procedure.description}</p>
                <div className={styles.cardPrices}>
                    <span className={styles.salePrice}>{formatPrice(procedure.salePrice)}</span>
                    {procedure.realPrice > procedure.salePrice && (
                        <span className={styles.realPrice}>{formatPrice(procedure.realPrice)}</span>
                    )}
                </div>
            </div>
        </div>
    );
}

// ===== Main Page =====
const ProcedureFilter = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const queryParam = searchParams.get("query") || "";

    const [allProcedures, setAllProcedures] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState(queryParam);
    const [loading, setLoading] = useState(true);

    const pageTitle = "Tất cả thủ tục pháp lý";

    // --- Fetch all ---
    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const res = await publicAxios.get("/api/procedurer/get-all");
                setAllProcedures(res.data || []);
            } catch (err) {
                console.error("Lỗi lấy danh sách thủ tục:", err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    // --- Apply filters ---
    useEffect(() => {
        let result = allProcedures;

        if (searchTerm.trim()) {
            result = result.filter(
                (p) =>
                    p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.description?.toLowerCase().includes(searchTerm.toLowerCase()),
            );
        }

        if (selectedCategories.length > 0) {
            result = result.filter((p) => selectedCategories.includes(p.serviceType));
        }

        setFiltered(result);
    }, [allProcedures, searchTerm, selectedCategories]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const toggleCategory = (value) => {
        setSelectedCategories((prev) => (prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]));
    };

    // Count per category from allProcedures
    const countFor = (value) => allProcedures.filter((p) => p.serviceType === value).length;

    // Group result by serviceTypeTitle for display
    const grouped = filtered.reduce((acc, p) => {
        const key = p.serviceTypeTitle || p.typeCompanyTitle;
        acc[key] = acc[key] ?? [];
        acc[key].push(p);
        return acc;
    }, {});

    return (
        <div className={styles.procedureFilter}>
            <Navbar />
            <div className={styles["procedures-filter-main"]}>
                <Breadcrumb items={[{ label: "Trang chủ", link: "/" }, { label: "Thủ tục pháp lý" }]} />

                <div className={styles["procedures-page-layout"]}>
                    {/* Left Column: Title + Filter */}
                    <div className={styles["filter-column"]}>
                        <h2 className={styles["procedure-title-sidebar"]}>{pageTitle}</h2>
                        <div className={styles["filter-container"]}>
                            <div className={styles["filter-section"]}>
                                <div className={styles["section-header"]}>
                                    <span>Danh mục pháp lý</span>
                                </div>
                                <div className={styles["section-content"]}>
                                    {CATEGORIES.map((cat) => (
                                        <label key={cat.value} className={styles["filter-option"]}>
                                            <div className={styles["option-left"]}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCategories.includes(cat.value)}
                                                    onChange={() => toggleCategory(cat.value)}
                                                />
                                                <span className={styles["custom-checkbox"]}></span>
                                                <span className={styles["option-text"]}>{cat.label}</span>
                                            </div>
                                            <span className={styles["option-count"]}>{countFor(cat.value)}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className={styles["main-content"]}>
                        <div className={styles["procedure-header"]}>
                            <div className={styles["header-controls"]}>
                                <div className={styles["search-box-custom"]}>
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={searchTerm}
                                        onChange={handleSearch}
                                    />
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </div>
                            </div>
                        </div>

                        <div className={styles["procedures-list-container"]}>
                            {loading ? (
                                <div className={styles["procedures-grid"]}>
                                    {Array.from({ length: 8 }).map((_, index) => (
                                        <CourseSkeleton key={index} />
                                    ))}
                                </div>
                            ) : filtered.length > 0 ? (
                                selectedCategories.length > 0 ? (
                                    // Grouped View
                                    Object.entries(grouped).map(([groupTitle, items]) => (
                                        <div key={groupTitle} className={styles["procedure-group-section"]}>
                                            <div className={styles["group-header"]}>
                                                <h3 className={styles["group-title"]}>Thủ tục: {groupTitle}</h3>
                                                <p className={styles["group-subtitle"]}>{items.length} thủ tục</p>
                                            </div>
                                            <div className={styles["procedures-grid"]}>
                                                {items.map((p) => (
                                                    <ProcedureCard
                                                        key={p.procedureId}
                                                        procedure={p}
                                                        onClick={() => navigate(`/process-procedure/${p.procedureId}`)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    // Flat View
                                    <div className={styles["procedures-grid"]}>
                                        {filtered.map((p) => (
                                            <ProcedureCard
                                                key={p.procedureId}
                                                procedure={p}
                                                onClick={() => navigate(`/process-procedure/${p.procedureId}`)}
                                            />
                                        ))}
                                    </div>
                                )
                            ) : (
                                <p className={styles["empty"]}>Không tìm thấy thủ tục nào phù hợp.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProcedureFilter;
