import React, { useState } from "react";
import "./RegisterForm.css";
import { Link, useNavigate } from "react-router-dom";
import LeftLoginRegisterForm from "../../../components/LeftLoginRegisterForm/LeftLoginRegisterForm";

const RegisterForm = () => {

    const navigate = useNavigate();
    const handleClose = () => {
        navigate("/");
    }

    return (
        <div className="register-background">
            <div className="register-wrapper">
                <LeftLoginRegisterForm />
                <div className="register-right">
                    <div className="register-box">
                        <div class="register-header">
                            <h2>Đăng nhập</h2>
                            <button class="close-btn" onClick={handleClose}>
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <p className="login-text">
                            Bạn đã có tài khoản? <Link to="/login">Đăng Nhập</Link>
                        </p>
                        <input type="email" placeholder="Email" />
                        <div class="name-row">
                            <input type="text" placeholder="Họ" class="name-input" />
                            <input type="text" placeholder="Tên" class="name-input" />
                        </div>
                        <input type="password" placeholder="Mật khẩu" />
                        <button className="btn-register">Tạo tài khoản</button>
                        <div className="divider">
                            <span className="line"></span>
                            <span>or</span>
                            <span className="line"></span>
                        </div>
                        <button className="btn-google">
                            <img
                                src="https://developers.google.com/identity/images/g-logo.png"
                                alt="Google"
                            />
                            Đăng nhập với Google
                        </button>
                        <p className="terms-register">
                            <input type="checkbox" id="acceptTerms" />
                            <label htmlFor="acceptTerms">
                                Bằng cách nhấp vào Tạo tài khoản, tôi đồng ý rằng tôi đã đọc và chấp nhận Điều khoản sử dụng và Chính sách bảo mật.
                            </label>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
