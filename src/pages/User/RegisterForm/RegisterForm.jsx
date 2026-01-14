import React, { use, useState } from "react";
import "./RegisterForm.css";
import { Link, useNavigate } from "react-router-dom";
import LeftLoginRegisterForm from "../../../components/LeftLoginRegisterForm/LeftLoginRegisterForm";
import { publicAxios } from "../../../services/axios-instance";
import GoogleLoginButton from "../../../components/GoogleLoginButton/GoogleLoginButton";

const RegisterForm = () => {
    const [user, setUser] = useState({
        ho: "",
        name: "",
        email: "",
        password: "",
        phone: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/");
    };

    // Cập nhật state khi nhập input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const isValidEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };
    const isValidPhone = (value) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(value);
    };

    const register = async () => {
        try {
            // Validate inputs
            if (isValidPhone(user.phone) === false || isValidEmail(user.email) === false) {
                alert("Email không hợp lệ hoặc số điện thoại phải gồm đúng 10 chữ số");
                return;
            }

            setLoading(true);
            const response = await publicAxios.post("/api/auth/register", {
                email: user.email,
                password: user.password,
                fullName: user.ho + " " + user.name,
                phone: user.phone,
            });

            if (response.data.userId) {
                alert("Đăng ký thành công! Vui lòng đăng nhập.");
                navigate("/login");
            } else {
                alert("Đăng ký thất bại. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Lỗi đăng ký. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-background">
            <div className="register-wrapper">
                <LeftLoginRegisterForm />
                <div className="register-right-form">
                    <div className="register-box">
                        <div className="register-header">
                            <h2>Đăng ký</h2>
                            <button className="close-btn" onClick={handleClose}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <p className="login-text">
                            Bạn đã có tài khoản? <Link to="/login">Đăng Nhập</Link>
                        </p>
                        <div className="name-row">
                            <input
                                type="text"
                                name="ho"
                                placeholder="Họ"
                                className="name-input"
                                value={user.ho}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="name"
                                placeholder="Tên"
                                className="name-input"
                                value={user.name}
                                onChange={handleChange}
                            />
                        </div>
                        <input
                            type="phone"
                            name="phone"
                            placeholder="Số điện thoại"
                            value={user.phone}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email / Tên đăng nhập"
                            value={user.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Mật khẩu"
                            value={user.password}
                            onChange={handleChange}
                        />
                        <button className="btn-register" onClick={register} disabled={loading}>
                            {loading ? "Đang xử lý..." : "Tạo tài khoản"}
                        </button>

                        <div className="divider">
                            <span className="line"></span>
                            <span>or</span>
                            <span className="line"></span>
                        </div>

                        <GoogleLoginButton />

                        <p className="terms-register">
                            <input type="checkbox" id="acceptTerms" />
                            <label htmlFor="acceptTerms">
                                Bằng cách nhấp vào Tạo tài khoản, tôi đồng ý rằng tôi đã đọc và chấp nhận Điều khoản sử
                                dụng và Chính sách bảo mật.
                            </label>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
