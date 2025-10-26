import React from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import LeftLoginRegisterForm from "../../../components/LeftLoginRegisterForm/LeftLoginRegisterForm";
import { useState } from 'react';
import { authAxios } from '../../../services/axios-instance';
import { publicAxios } from "../../../services/axios-instance";

const LoginForm = () => {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleClose = async () => {
        navigate("/");
    }

    const login = async (email, password) => {
        try {
            const token = await publicAxios.post('/api/auth/login', { username: email, password });

            console.log(token.data.token);
            sessionStorage.setItem('authToken', token.data.token);

            const userInfo = await authAxios.get('/api/auth/get-info');
            console.log("Thông tin người dùng:", userInfo.data);
            localStorage.setItem('fullName', userInfo.data.fullname);
            localStorage.setItem('email', userInfo.data.email);
            if (userInfo.data.linkImage){
                localStorage.setItem('linkImage', userInfo.data.linkImage);
            }
            localStorage.setItem('userId', userInfo.data.userId);
            if (userInfo.data.role === 'USER') {
                navigate("/");
            }
            else {
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error.message);
            alert("Lỗi đăng nhập:", error.message);
        }
    };

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
                        <input
                            type="email"
                            placeholder="Email / Tên đăng nhập"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <p className="forgot-password"> <Link to="/forgot-password">Quên mật khẩu?</Link> </p>
                        <button
                            className="btn-login"
                            onClick={() => login(email, password)}
                            disabled={loading}
                        >
                            Đăng Nhập
                        </button>
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
                            <a href="a">Privacy Policy</a> and{" "}
                            <a href="a">Terms of Service</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
