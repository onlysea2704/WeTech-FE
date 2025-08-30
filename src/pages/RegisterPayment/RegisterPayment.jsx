import React, { useState } from "react";
import "./RegisterPayment.css";
import logoImage from "../../assets/logo.png";
import demoProcedure from "../../assets/demo-procedure.jpg"

const RegisterPayment = () => {
    const [discount] = useState(100000);
    const [price] = useState(399000);
    const [currentStep, setCurrentStep] = useState(1); // 1: Thông tin, 2: Thanh toán, 3: Thành công
    const [status, setStatus] = useState("edit");
    const total = price - discount;

    const changeStatus = (currentStatus) => {
        setStatus(currentStatus);
    }

    const steps = [
        { id: 1, label: "Thông tin" },
        { id: 2, label: "Thanh toán" },
        { id: 3, label: "Thành công" },
    ];

    return (
        <div>
            {/* HEADER với logo và steps */}
            <div className="header-payment">
                <div className="image-icon-payment">
                    <i className="fa fa-arrow-left back-icon"></i>
                    <img src={logoImage} alt="Logo" className="logo" />
                </div>
                <div className="steps">
                    {steps.map((step, index) => (
                        <div key={step.id} className="step-item">
                            <span
                                className={`step-label ${currentStep === step.id ? "active" : ""
                                    }`}
                            >
                                {step.label}
                            </span>
                            {index < steps.length - 1 && (
                                <span className="separator">—</span>
                            )}
                            {index < steps.length - 1 && (
                                <span className={`check ${currentStep > step.id ? "done" : ""}`}>
                                    ✓
                                </span>
                            )}
                            {index < steps.length - 1 && (
                                <span className="separator">—</span>
                            )}
                        </div>
                    ))}
                </div>
                <div></div>
            </div>

            {/* BODY */}
            <div className="register-container">
                {/* Bên trái */}
                <div className="register-left">
                    <div className="course-card-payment">
                        <img src={demoProcedure} alt="Khóa học" className="course-img" />
                        <div className="course-info-payment">
                            <div className="course-header-payment">
                                <div>
                                    <p className="course-title"> Đăng ký thành lập mới Công ty TNHH 1 thành viên </p>
                                    <p className="course-subtitle">Khóa học</p>
                                </div>
                                <div className="course-prices">
                                    <span className="price">399.000đ</span>
                                    <span className="old-price">800.000đ</span>
                                </div>
                            </div>
                            <div className="trash-icon">
                                <i className="fas fa-trash"></i>
                            </div>
                        </div>
                    </div>
                    <div className="promo-code">
                        <input type="text" placeholder="Code" />
                        <button>Sử dụng</button>
                    </div>

                    <div className="price-detail">
                        <div className="row">
                            <span>Phí đăng ký</span>
                            <span>399.000đ</span>
                        </div>
                        <div className="row discount-payment">
                            <span>Mã giảm giá</span>
                            <span>-100.000đ</span>
                        </div>
                        <div className="row total">
                            <span>Tổng thanh toán</span>
                            <span>{total.toLocaleString()}đ</span>
                        </div>
                    </div>
                </div>

                {/* Bên phải */}
                <div className="register-right">
                    {/* <div className="register-right-form">
                        <h3>Thông tin đăng ký</h3>
                        <div className="form-row">
                            <input type="text" placeholder="Họ" />
                            <input type="text" placeholder="Tên" />
                        </div>
                        <input type="email" placeholder="Email" />
                        <input type="tel" placeholder="Số điện thoại" />

                        <button
                            className="submit-btn"
                            onClick={() =>
                                setCurrentStep((prev) => (prev < 3 ? prev + 1 : prev))
                            }
                        >
                            Tiếp tục
                        </button>
                    </div> */}

                    {status === "edit" ?
                        (<div className="register-right-form">
                            <h3>Thông tin đăng ký</h3>
                            <div className="form-row">
                                <input type="text" placeholder="Họ" />
                                <input type="text" placeholder="Tên" />
                            </div>
                            <input type="email" placeholder="Email" />
                            <input type="tel" placeholder="Số điện thoại" />
                            <button className="submit-btn"
                                onClick={() => {
                                    setCurrentStep((prev) => (prev < 3 ? prev + 1 : prev));
                                    changeStatus("confirm");
                                }}
                            > Tiếp tục
                            </button>
                        </div>) : (<div className="payment-container">
                            <h3>
                                Cảm ơn bạn đã lựa chọn sản phẩm của{" "}
                                <span className="brand">WETECH!</span>
                            </h3>
                            <div className="section">
                                <h4>XÁC NHẬN THÔNG TIN</h4>
                                <div className="info-card">
                                    <div className="info-item-payment">
                                        <span>Họ và Tên:</span>
                                        <span className="info-value">Nguyễn Trường</span>
                                        <i className="fa-regular fa-pen-to-square mr-2" onClick={() => changeStatus("edit")}></i>
                                    </div>
                                    <div className="info-item-payment">
                                        <span>Email:</span>
                                        <span className="info-value">Truongnguyen@gmail.com</span>
                                        <i className="fa-regular fa-pen-to-square mr-2" onClick={() => changeStatus("edit")}></i>
                                    </div>
                                    <div className="info-item-payment">
                                        <span>Số điện thoại:</span>
                                        <span className="info-value">0834 085 578</span>
                                        <i className="fa-regular fa-pen-to-square mr-2" onClick={() => changeStatus("edit")}></i>
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
                                    <span className="total-amount">299.000đ</span>
                                </div>
                            </div>
                            <div className="buttons-payment">
                                <button className="back-btn" onClick={() => changeStatus("edit")}>Quay lại</button>
                                <button className="pay-btn">Thanh toán</button>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default RegisterPayment;
