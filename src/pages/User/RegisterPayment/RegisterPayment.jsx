import React, { useState, useEffect } from "react";
import "./RegisterPayment.css";
import demoProcedure from "../../../assets/demo-procedure.jpg";
import PaymentHeader from "../../../components/PaymentHeader/PaymentHeader";
import { useParams, useNavigate } from "react-router-dom";
import { authAxios, publicAxios } from "../../../services/axios-instance";

const RegisterPayment = () => {
    const { courseId } = useParams();
    const [status, setStatus] = useState("edit");
    const [courseDetails, setCourseDetails] = useState(null);
    const navigate = useNavigate();

    // ✅ State cho form
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });

    const changeStatus = (currentStatus) => {
        setStatus(currentStatus);
    };

    // Hàm định dạng giá
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    // ✅ Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const res = await publicAxios.get(
                    `/api/course/find-by-course-id?courseId=${courseId}`
                );
                setCourseDetails(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCourseDetails();

        const token = sessionStorage.getItem("authToken");
        if (token) {
            // const fetchCheckMyCourse = async () => {
            //     try {
            //         const res = await authAxios.get(
            //             `/api/course/check-have-course?courseId=${courseId}`
            //         );
            //         if (res.data) {
            //             const videoOfCourse = await publicAxios.get(
            //                 `/api/video/find-by-courseId?courseId=${courseId}`
            //             );
            //             console.log(videoOfCourse.data);
            //         }
            //     } catch (error) {
            //         console.error(error);
            //     }
            // };
            // fetchCheckMyCourse();
        }
    }, [courseId]);

    // xử lý thanh toán
    const handlePayment = async () => {

        const payload = {
            transaction: {
                transferAmount: courseDetails?.salePrice,
                code: "WT" + Date.now()
            },
            listItems: [
                {
                    idCourse: courseId,
                    typeItem: "COURSE"
                }
            ]
        };

        try {
            const res = await authAxios.post("/payment/create", payload);
            console.log(res.data);
            if (res.data?.code) {
                navigate(`/scan-qr/${res.data?.code}`);
            } else {
                alert("Thanh toán thất bại, vui lòng thử lại!");
            }
        } catch (error) {
            console.error(error);
            alert("Có lỗi xảy ra khi tạo thanh toán.");
        }
    };

    return (
        <div>
            <PaymentHeader />
            <div className="register-container">
                {/* Bên trái */}
                <div className="register-left">
                    <div className="course-card-payment">
                        <img src={demoProcedure} alt="Khóa học" className="course-img" />
                        <div className="course-info-payment">
                            <div className="course-header-payment">
                                <div>
                                    <p className="course-title"> {courseDetails?.title} </p>
                                    <p className="course-subtitle">Khóa học</p>
                                </div>
                                <div className="course-prices">
                                    <span className="price">{formatPrice(courseDetails?.salePrice)}đ</span>
                                    <span className="old-price">{formatPrice(courseDetails?.realPrice)}đ</span>
                                </div>
                            </div>
                            <div className="trash-icon">
                                <i className="fas fa-trash"></i>
                            </div>
                        </div>
                    </div>

                    <div className="price-detail">
                        <div className="row">
                            <span>Phí đăng ký</span>
                            <span>{formatPrice(courseDetails?.realPrice)}đ</span>
                        </div>
                        <div className="row discount-payment">
                            <span>Mã giảm giá</span>
                            <span>
                                {formatPrice(courseDetails?.realPrice - courseDetails?.salePrice)}đ
                            </span>
                        </div>
                        <div className="row total">
                            <span>Tổng thanh toán</span>
                            <span>{formatPrice(courseDetails?.salePrice)}đ</span>
                        </div>
                    </div>
                </div>

                {/* Bên phải */}
                <div className="register-right">
                    {status === "edit" ? (
                        <div className="register-right-form">
                            <h3>Thông tin đăng ký</h3>
                            <div className="form-row">
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Họ"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Tên"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Số điện thoại"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            <button
                                className="submit-btn"
                                onClick={() => changeStatus("confirm")}
                            >
                                Tiếp tục
                            </button>
                        </div>
                    ) : (
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
                                            {formData.lastName} {formData.firstName}
                                        </span>
                                        <i
                                            className="fa-regular fa-pen-to-square mr-2"
                                            onClick={() => changeStatus("edit")}
                                        ></i>
                                    </div>
                                    <div className="info-item-payment">
                                        <span>Email:</span>
                                        <span className="info-value">{formData.email}</span>
                                        <i
                                            className="fa-regular fa-pen-to-square mr-2"
                                            onClick={() => changeStatus("edit")}
                                        ></i>
                                    </div>
                                    <div className="info-item-payment">
                                        <span>Số điện thoại:</span>
                                        <span className="info-value">{formData.phone}</span>
                                        <i
                                            className="fa-regular fa-pen-to-square mr-2"
                                            onClick={() => changeStatus("edit")}
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
                                    <span>Tổng thanh toán:</span>
                                    <span className="total-amount">
                                        {formatPrice(courseDetails?.salePrice)}đ
                                    </span>
                                </div>
                            </div>
                            <div className="buttons-payment">
                                <button className="back-btn" onClick={() => changeStatus("edit")}>
                                    Quay lại
                                </button>
                                <button className="pay-btn" onClick={handlePayment}>Thanh toán</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegisterPayment;
