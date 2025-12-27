import { useState, useEffect } from "react";
import "./RegisterPayment.css";
import PaymentHeader from "../../../components/PaymentHeader/PaymentHeader";
import { useParams, useNavigate } from "react-router-dom";
import { authAxios, publicAxios } from "../../../services/axios-instance";

const RegisterPayment = () => {
    const { idTransaction } = useParams();
    const navigate = useNavigate();

    const [status, setStatus] = useState("edit");
    const [transactionDetail, setTransactionDetail] = useState(null);
    
    // 1. State tính toán giá
    const [paymentData, setPaymentData] = useState({
        listItems: [],
        totalRealPrice: 0,
        totalSalePrice: 0
    });

    // 2. State form (Đã sửa lại thống nhất fullName)
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        taxCode: "",
        companyName: "",
        companyAddress: "",
        province: "",
        district: "",
        ward: ""
    });
    const [needVAT, setNeedVAT] = useState(false);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price || 0);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // 3. Fetch dữ liệu và fill vào form
    useEffect(() => {
        const fetchTransactionDetails = async () => {
            try {
                const res = await publicAxios.get(
                    `/payment/get?idTransaction=${idTransaction}`
                );
                console.log("Chi tiết giao dịch:", res.data);

                if (res.data) {
                    setTransactionDetail(res.data);
                    
                    // === CẬP NHẬT: Fill dữ liệu từ API vào Form ===
                    setFormData({
                        fullName: res.data.userFullName || res.data.fullName || "", // Kiểm tra field trả về từ BE
                        email: res.data.userEmail || res.data.email || "",
                        phone: res.data.userPhone || res.data.phone || "",
                        taxCode: res.data.taxCode || "",
                        companyName: res.data.companyName || "",
                        companyAddress: res.data.companyAddress || "",
                        province: res.data.province || "",
                        district: res.data.district || "",
                        ward: res.data.ward || ""
                    });

                    // Nếu có mã số thuế thì tick sẵn vào VAT
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
                const res = await publicAxios.get(
                    `/payment/get-list-item-by-id?idTransaction=${idTransaction}`
                );
                const items = res.data || [];
                const totalReal = items.reduce((sum, item) => sum + (Number(item.realPrice) || 0), 0);
                const totalSale = items.reduce((sum, item) => sum + (Number(item.salePrice) || 0), 0);
                
                setPaymentData({
                    listItems: items,
                    totalRealPrice: totalReal,
                    totalSalePrice: totalSale
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
    const handleUpdateAndContinue = async () => {
        if (!formData.email || !formData.phone || !formData.fullName) {
            alert("Vui lòng điền đầy đủ Họ tên, Email và Số điện thoại");
            return;
        }
        try {
            await authAxios.post(`/payment/update-info?idTransaction=${idTransaction}`, {
                ...formData,
                needVAT: needVAT
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
            <PaymentHeader />
            <div className="register-container">
                {/* ===== BÊN TRÁI: DANH SÁCH KHÓA HỌC ===== */}
                <div className="register-left">
                    {listItems?.length > 0 ? (
                        listItems.map((item, index) => (
                            <div key={index} className="course-card-payment">
                                <img
                                    src={item.linkImage || "https://via.placeholder.com/150"}
                                    alt={item.title}
                                    className="course-img"
                                />
                                <div className="course-info-payment">
                                    <div className="course-header-payment">
                                        <div>
                                            <p className="course-title">{item.title}</p>
                                            <p className="course-subtitle">
                                                {item?.typeCourse}
                                            </p>
                                        </div>
                                        <div className="course-prices">
                                            <span className="price">{formatPrice(item.salePrice)}đ</span>
                                            {item.realPrice > item.salePrice && (
                                                <span className="old-price">{formatPrice(item.realPrice)}đ</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Đang tải thông tin đơn hàng...</p>
                    )}

                    <div className="price-detail">
                        <div className="row">
                            <span>Tạm tính ({listItems.length} sản phẩm)</span>
                            <span>{formatPrice(totalRealPrice)}đ</span>
                        </div>
                        <div className="row discount-payment">
                            <span>Giảm giá</span>
                            <span>-{formatPrice(totalRealPrice - totalSalePrice)}đ</span>
                        </div>
                        <div className="row total">
                            <span>Tổng thanh toán</span>
                            <span>{formatPrice(totalSalePrice)}đ</span>
                        </div>
                    </div>
                </div>

                {/* ===== BÊN PHẢI: FORM THÔNG TIN ===== */}
                <div className="register-right">
                    {status === "edit" ? (
                        <div className="register-right-form">
                            <h3>Thông tin đăng ký</h3>
                            <div className="form-row">
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Họ và tên"
                                    // Sửa lại binding value cho đúng state
                                    value={formData.fullName} 
                                    onChange={handleChange}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Số điện thoại"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                            {/* ===== VAT SECTION ===== */}
                            <div className="vat-section">
                                <label className="vat-toggle">
                                    <input className="input-checkbox-vat"
                                        style={{ width: "20px", margin: "0px" }}
                                        type="checkbox"
                                        checked={needVAT}
                                        onChange={(e) => setNeedVAT(e.target.checked)}
                                    />
                                    <span>Xuất hóa đơn VAT</span>
                                </label>

                                {needVAT && (
                                    <div className="vat-form">
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
                                        <div className="form-row">
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

                            <button
                                className="submit-btn"
                                // Đổi sự kiện onClick để gọi hàm update
                                onClick={handleUpdateAndContinue}
                            >
                                Tiếp tục
                            </button>
                        </div>
                    ) : (
                        // ===== CONFIRMATION VIEW =====
                        <div className="payment-container">
                            <h3>
                                Cảm ơn bạn đã lựa chọn sản phẩm của{" "}
                                <span className="brand">WETECH!</span>
                            </h3>
                            <div className="section">
                                <h4>XÁC NHẬN THÔNG TIN</h4>
                                <div className="info-card">
                                    <div className="info-item-payment">
                                        <span>Họ và Tên:</span>
                                        <span className="info-value">
                                            {/* Sửa lại hiển thị fullName */}
                                            {formData.fullName}
                                        </span>
                                        <i
                                            className="fa-regular fa-pen-to-square mr-2 pointer"
                                            onClick={() => setStatus("edit")}
                                        ></i>
                                    </div>
                                    <div className="info-item-payment">
                                        <span>Email:</span>
                                        <span className="info-value">{formData.email}</span>
                                        <i
                                            className="fa-regular fa-pen-to-square mr-2 pointer"
                                            onClick={() => setStatus("edit")}
                                        ></i>
                                    </div>
                                    <div className="info-item-payment">
                                        <span>Số điện thoại:</span>
                                        <span className="info-value">{formData.phone}</span>
                                        <i
                                            className="fa-regular fa-pen-to-square mr-2 pointer"
                                            onClick={() => setStatus("edit")}
                                        ></i>
                                    </div>
                                </div>
                            </div>

                            <div className="section">
                                <h4>PHƯƠNG THỨC THANH TOÁN</h4>
                                <div className="payment-method">
                                    <span>Quét QR & Thanh toán bằng ứng dụng ngân hàng</span>
                                    <i className="fa-brands fa-paypal mr-2"></i>
                                </div>
                            </div>

                            <div className="section">
                                <h4>ĐƠN HÀNG</h4>
                                <div className="order-summary">
                                    <span>Tổng số lượng:</span>
                                    <span>{listItems.length} sản phẩm</span>
                                </div>
                                <div className="order-summary">
                                    <span>Tổng thanh toán:</span>
                                    <span className="total-amount">
                                        {formatPrice(totalSalePrice)}đ
                                    </span>
                                </div>
                            </div>

                            <div className="buttons-payment">
                                <button className="back-btn" onClick={() => setStatus("edit")}>
                                    Quay lại
                                </button>
                                <button className="pay-btn" onClick={handlePayment}>
                                    Thanh toán ngay
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegisterPayment;