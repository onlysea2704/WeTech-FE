import React from "react";
import "./ForgotPassword.css";
import { Link, useNavigate } from "react-router-dom";
import LeftLoginRegisterForm from "../../../components/LeftLoginRegisterForm/LeftLoginRegisterForm";

const ForgotPassword = () => {

    const navigate = useNavigate();
    const handleClose = async () => {
        navigate("/");
    }

    return (
        <div className="forgot-password-background">
            <div className="forgot-password-wrapper">
                <LeftLoginRegisterForm />
                <div className="forgot-password-right">
                    <div className="forgot-password-box">
                        <div class="forgot-password-header">
                            <h2>Quên mật khẩu?</h2>
                            <button class="close-btn" onClick={handleClose}>
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <p className="register-text">
                            Đừng lo lắng! Chỉ cần nhập email của bạn và chúng tôi sẽ gửi cho bạn liên kết đặt lại mật khẩu.
                        </p>
                        <input type="email" placeholder="Email" />
                        <button className="btn-forgot-password">Gửi Email Khôi Phục</button>
                        <p className="text-register">
                            Tạo mới? <Link to="/register">Đăng Ký</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
