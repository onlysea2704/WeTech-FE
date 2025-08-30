import React, { useState } from "react";
import "./UpdatePassword.css";
import { Link, useNavigate } from "react-router-dom";
import LeftLoginRegisterForm from "../../../components/LeftLoginRegisterForm/LeftLoginRegisterForm";

const UpdatePassword = () => {

    const navigate = useNavigate();
    const handleClose = async () => {
        navigate("/");
    }

    return (
        <div className="update-password-background">
            <div className="update-password-wrapper">
                <LeftLoginRegisterForm />
                <div className="update-password-right">
                    <div className="update-password-box">
                        <div class="update-password-header">
                            <h2>Đổi Mật Khẩu</h2>
                            <button class="close-btn" onClick={handleClose}>
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <p className="register-text">
                            Vui lòng tạo mật khẩu mới
                        </p>
                        <input type="password" placeholder="Mật khẩu mới" />
                        <input type="password" placeholder="Nhập lại mật khẩu mới" />
                        <button className="btn-update-password">Gửi Xác Nhận Email</button>
                        <p className="text-register">
                            Tạo mới? <Link to="/register">Đăng Ký</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePassword;
