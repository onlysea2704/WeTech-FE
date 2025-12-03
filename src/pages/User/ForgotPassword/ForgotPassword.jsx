import React, { useState } from "react";
import "./ForgotPassword.css";
import { Link, useNavigate } from "react-router-dom";
import LeftLoginRegisterForm from "../../../components/LeftLoginRegisterForm/LeftLoginRegisterForm";
import { publicAxios } from "../../../services/axios-instance";

const ForgotPassword = () => {

    const navigate = useNavigate();
    const handleClose = async () => {
        navigate("/");
    }

    const [email, setEmail] = useState("");

    const forgotPassword = async (email) => {
        const response = await publicAxios.post('/api/auth/forgot-password', {
            email: email,
        });
        if (response.status === 200) {
            alert("Đã gửi email khôi phục mật khẩu! Vui lòng kiểm tra hộp thư đến.");
            navigate("/login");
        } else {
            alert("Có lỗi xảy ra. Vui lòng thử lại.");
        }
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
                        <input type="email" placeholder="Email" value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <button className="btn-forgot-password" onClick={() => forgotPassword(email)}>Gửi Email Khôi Phục</button>
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
