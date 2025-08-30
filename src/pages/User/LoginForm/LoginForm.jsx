import React, { useState } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import LeftLoginRegisterForm from "../../../components/LeftLoginRegisterForm/LeftLoginRegisterForm";

const LoginForm = () => {

    const navigate = useNavigate();
    const handleClose = async () => {
        navigate("/");
    }

    return (
        <div className="login-background">
            <div className="login-wrapper">
                <LeftLoginRegisterForm />
                <div className="login-right">
                    <div className="login-box">
                        <div class="login-header">
                            <h2>Đăng nhập</h2>
                            <button class="close-btn" onClick={handleClose}>
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <p className="register-text">
                            Bạn chưa có tài khoản? <Link to="/register">Đăng Ký</Link>
                        </p>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Mật khẩu" />
                        <p className="forgot-password"> <Link to="/forgot-password">Quên mật khẩu?</Link> </p>
                        <button className="btn-login">Đăng Nhập</button>
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
                        <p className="terms">
                            Protected by reCAPTCHA and subject to the Prism{" "}
                            <a href="#">Privacy Policy</a> and{" "}
                            <a href="#">Terms of Service</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
