import { useState, useEffect } from "react";
import styles from "./RegisterPayment.module.css";
import PaymentHeader from "../../../components/PaymentHeader/PaymentHeader";
import { useParams, useNavigate } from "react-router-dom";
import { authAxios, publicAxios } from "../../../services/axios-instance";
import Navbar from "../../../components/NavBar/NavBar";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import qrCode from "../../../assets/qr-code.png";

const RegisterPayment = () => {
    const { idTransaction } = useParams();
    const navigate = useNavigate();

    const [status, setStatus] = useState("edit");
    const [editingValue, setEditingValue] = useState(null);
    const [transactionDetail, setTransactionDetail] = useState(null);

    // === THÊM: State lưu lỗi validation ===
    const [errors, setErrors] = useState({});

    // 1. State tính toán giá
    const [paymentData, setPaymentData] = useState({
        listItems: [],
        totalRealPrice: 0,
        totalSalePrice: 0,
    });

    // 2. State form
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        taxCode: "",
        companyName: "",
        companyAddress: "",
        province: "",
        district: "",
        ward: "",
    });
    const [needVAT, setNeedVAT] = useState(false);

    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price || 0);
    };

    // === CẬP NHẬT: HandleChange xóa lỗi khi user nhập liệu ===
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Xóa lỗi của trường đang nhập (nếu có)
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    // 3. Fetch dữ liệu
    useEffect(() => {
        const fetchTransactionDetails = async () => {
            try {
                const res = await publicAxios.get(`/payment/get?idTransaction=${idTransaction}`);

                if (res.data) {
                    setTransactionDetail(res.data);
                    setFormData({
                        fullName: res.data.userFullName || res.data.fullName || "",
                        email: res.data.userEmail || res.data.email || "",
                        phone: res.data.userPhone || res.data.phone || "",
                        taxCode: res.data.taxCode || "",
                        companyName: res.data.companyName || "",
                        companyAddress: res.data.companyAddress || "",
                        province: res.data.province || "",
                        district: res.data.district || "",
                        ward: res.data.ward || "",
                    });

                    if (res.data.taxCode) {
                        setNeedVAT(true);
                    }
                }
            } catch (error) {
                console.error("Lỗi lấy thông tin giao dịch:", error);
            }
        };

        const fetchAndCalculate = async () => {
            if (!idTransaction) return;
            try {
                const res = await publicAxios.get(`/payment/get-list-item-by-id?idTransaction=${idTransaction}`);
                let items = res.data || [];
                items = items.filter((item) => item !== null && item !== undefined);
                const totalReal = items.reduce((sum, item) => sum + (Number(item.realPrice) || 0), 0);
                const totalSale = items.reduce((sum, item) => sum + (Number(item.salePrice) || 0), 0);

                setPaymentData({
                    listItems: items,
                    totalRealPrice: totalReal,
                    totalSalePrice: totalSale,
                });
            } catch (error) {
                console.error("Lỗi lấy danh sách sản phẩm:", error);
            }
        };

        if (idTransaction) {
            fetchTransactionDetails();
            fetchAndCalculate();
        }
    }, [idTransaction]);

    const { listItems, totalRealPrice, totalSalePrice } = paymentData;

    // === THÊM: Hàm Validate ===
    const validateForm = () => {
        const newErrors = {};

        // Validate Họ tên
        if (!formData.fullName.trim()) {
            newErrors.fullName = "Vui lòng nhập họ tên.";
        }

        // Validate Email (Regex chuẩn)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = "Vui lòng nhập Email.";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Email không đúng định dạng.";
        }

        // Validate Số điện thoại (Regex số Việt Nam: 10 số, bắt đầu bằng 03, 05, 07, 08, 09)
        const phoneRegex = /^(03|05|07|08|09)+([0-9]{8})\b/;
        if (!formData.phone.trim()) {
            newErrors.phone = "Vui lòng nhập số điện thoại.";
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = "Số điện thoại không hợp lệ (cần 10 số).";
        }

        setErrors(newErrors);
        // Trả về true nếu không có lỗi nào (Object keys length === 0)
        return Object.keys(newErrors).length === 0;
    };

    // === CẬP NHẬT: Hàm xử lý submit ===
    const handleUpdateAndContinue = async () => {
        // Gọi hàm validate trước
        if (!validateForm()) {
            return; // Dừng lại nếu có lỗi
        }

        try {
            await authAxios.post(`/payment/update-info?idTransaction=${idTransaction}`, {
                ...formData,
                needVAT: needVAT,
            });
            setStatus("confirm");
        } catch (error) {
            console.error("Lỗi cập nhật thông tin:", error);
            alert("Cập nhật thông tin thất bại, vui lòng thử lại!");
        }
    };

    const handlePayment = async () => {
        try {
            navigate(`/scan-qr/${idTransaction}`);
        } catch (error) {
            console.error(error);
            alert("Có lỗi xảy ra, vui lòng thử lại.");
        }
    };

    return (
        <div>
            <Navbar />
            <Breadcrumb
                items={[
                    { label: "Trang chủ", link: "/" },
                    { label: "Khóa học", link: "/list-courses" },
                    { label: "Thanh toán" },
                ]}
            />
            <PaymentHeader currentStep={status === "edit" ? 1 : 2} isSuccess={status === "confirm"} />
            <div className={styles.registerContainer}>
                {/* ===== BÊN TRÁI: FORM THÔNG TIN ===== */}
                <div className={styles.registerLeft}>
                    {status === "edit" ? (
                        <div>
                            <h3>Thông tin mua hàng</h3>

                            {/* === CẬP NHẬT: Hiển thị lỗi ngay dưới input === */}
                            <div className={styles.formRow}>
                                <div style={{ width: "100%" }} className={`${styles.formRowBox} ${styles.fullNameBox}`}>
                                    <label htmlFor="fullName">Họ*</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Họ và tên"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        onFocus={() => setEditingValue("fullName")}
                                        onBlur={() => setEditingValue(null)}
                                        autoFocus={editingValue === "fullName"}
                                        className={errors.fullName ? styles.inputError : ""}
                                    />
                                    {errors.fullName && <span className={styles.errorMessage}>{errors.fullName}</span>}
                                </div>

                                <div style={{ width: "100%" }} className={`${styles.formRowBox} ${styles.emailBox}`}>
                                    <label htmlFor="email">Email*</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onFocus={() => setEditingValue("email")}
                                        onBlur={() => setEditingValue(null)}
                                        autoFocus={editingValue === "email"}
                                        className={errors.email ? styles.inputError : ""}
                                    />
                                    {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
                                </div>
                            </div>

                            <div style={{ width: "100%" }} className={`${styles.formRowBox} ${styles.phoneBox}`}>
                                <label htmlFor="phone">Số điện thoại*</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Số điện thoại"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onFocus={() => setEditingValue("phone")}
                                    onBlur={() => setEditingValue(null)}
                                    autoFocus={editingValue === "phone"}
                                    className={errors.phone ? styles.inputError : ""}
                                />
                                {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
                            </div>

                            {/* ===== VAT SECTION ===== */}
                            <div className={styles.vatSection}>
                                <label className={styles.vatToggle}>
                                    <input
                                        style={{ width: "15px", margin: "0px" }}
                                        type="checkbox"
                                        checked={needVAT}
                                        onChange={(e) => setNeedVAT(e.target.checked)}
                                    />
                                    <span>Xuất hóa đơn VAT</span>
                                </label>

                                {needVAT && (
                                    <div className={styles.vatForm}>
                                        <input
                                            type="text"
                                            name="taxCode"
                                            placeholder="Mã số thuế"
                                            value={formData.taxCode}
                                            onChange={handleChange}
                                        />
                                        <input
                                            type="text"
                                            name="companyName"
                                            placeholder="Tên đơn vị"
                                            value={formData.companyName}
                                            onChange={handleChange}
                                        />
                                        <input
                                            type="text"
                                            name="companyAddress"
                                            placeholder="Địa chỉ"
                                            value={formData.companyAddress}
                                            onChange={handleChange}
                                        />
                                        <div className={styles.formRow}>
                                            <input
                                                type="text"
                                                name="province"
                                                placeholder="Tỉnh / Thành phố"
                                                value={formData.province}
                                                onChange={handleChange}
                                            />
                                            <input
                                                type="text"
                                                name="district"
                                                placeholder="Quận / Huyện"
                                                value={formData.district}
                                                onChange={handleChange}
                                            />
                                            <input
                                                type="text"
                                                name="ward"
                                                placeholder="Phường / Xã"
                                                value={formData.ward}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        // ===== CONFIRMATION VIEW (Không đổi) =====
                        <div className={styles.paymentContainer}>
                            <h3>
                                Cảm ơn bạn đã lựa chọn sản phẩm của <span className={styles.brand}>WETECH!</span>
                            </h3>
                            <div className={styles.section}>
                                <h4>Thông tin mua hàng</h4>
                                <div className={styles.infoTable}>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Họ và Tên</span>
                                        <span className={styles.value}>{formData.fullName}</span>
                                        <i
                                            className="fa-regular fa-pen-to-square"
                                            onClick={() => {
                                                setStatus("edit");
                                                setEditingValue("fullName");
                                            }}
                                        ></i>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Email</span>
                                        <span className={styles.value}>{formData.email}</span>
                                        <i
                                            className="fa-regular fa-pen-to-square"
                                            onClick={() => {
                                                setStatus("edit");
                                                setEditingValue("email");
                                            }}
                                        ></i>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Số điện thoại</span>
                                        <span className={styles.value}>{formData.phone}</span>
                                        <i
                                            className="fa-regular fa-pen-to-square"
                                            onClick={() => {
                                                setStatus("edit");
                                                setEditingValue("phone");
                                            }}
                                        ></i>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.section}>
                                <h4>Đơn hàng</h4>
                                <div className={styles.infoTable}>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Mã đơn hàng</span>
                                        <span className={styles.value}>
                                            {transactionDetail?.idTransaction || idTransaction}
                                        </span>
                                        <span></span> {/* Empty span for grid alignment if needed */}
                                    </div>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Tổng thanh toán</span>
                                        <span className={styles.value + " " + styles.infoRowPrice}>
                                            {formatPrice(totalSalePrice)}đ
                                        </span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.section}>
                                <h4>Phương thức thanh toán</h4>
                                <div className={styles.infoTable}>
                                    <div className={styles.infoRow}>
                                        <div className={styles.paymentMethodContent}>
                                            <img src={qrCode} alt="" className={styles.paypalIcon} />
                                            <span>Quét QR & Thanh toán bằng ứng dụng ngân hàng</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* ===== BÊN PHẢI: DANH SÁCH KHÓA HỌC ===== */}
                <div className={styles.registerRight}>
                    <h3>Thanh toán</h3>
                    {listItems?.length > 0 ? (
                        listItems.map((item, index) => (
                            <div key={index} className={styles.courseCardPayment}>
                                <img
                                    src={item.linkImage || "https://via.placeholder.com/150"}
                                    alt={item.title}
                                    className={styles.courseImg}
                                />
                                <div className={styles.courseInfoPayment}>
                                    <div className={styles.courseHeaderPayment}>
                                        <div>
                                            <p className={styles.courseTitle}>{item.title}</p>
                                            <p className={styles.courseSubtitle}>{item?.typeCourse}</p>
                                        </div>
                                        <div className={styles.coursePrices}>
                                            <span className={styles.price}>{formatPrice(item.salePrice)}đ</span>
                                            {item.realPrice > item.salePrice && (
                                                <span className={styles.oldPrice}>{formatPrice(item.realPrice)}đ</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Đang tải thông tin đơn hàng...</p>
                    )}

                    <div className={styles.priceDetail}>
                        <div className={styles.row}>
                            <span className={styles.labelRow}>Số lượng khoá học</span>
                            <span>{listItems.length} Khoá học</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.labelRow}>Số tiền</span>
                            <span>{formatPrice(totalRealPrice)}đ</span>
                        </div>
                        <div className={`${styles.row} ${styles.discountPayment}`}>
                            <span className={styles.labelRow}>Giảm giá</span>
                            <span>-{formatPrice(totalRealPrice - totalSalePrice)}đ</span>
                        </div>
                        <div className={`${styles.row} ${styles.total}`}>
                            <span className={styles.totalLabelRow}>Tổng</span>
                            <div>{formatPrice(totalSalePrice)}đ</div>
                        </div>
                    </div>

                    {status === "edit" ? (
                        <button className={`primary-color ${styles.submitBtn}`} onClick={handleUpdateAndContinue}>
                            Mua hàng
                        </button>
                    ) : (
                        <div className={styles.buttonsPayment}>
                            <button className={styles.backBtn} onClick={() => setStatus("edit")}>
                                Quay lại
                            </button>
                            <button className={styles.payBtn} onClick={handlePayment}>
                                Thanh toán ngay
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegisterPayment;
