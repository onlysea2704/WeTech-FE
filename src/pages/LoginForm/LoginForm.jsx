import React, { useState } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const [index, setIndex] = useState(0);

    const texts = [
        {
            title: "Giải Pháp Vượt Trội...",
            content:
                "Sự hài lòng của Quý khách hàng chính là động lực để chúng tôi không ngừng cải tiến và nâng cao chất lượng dịch vụ.",
        },
        {
            title: "Chuyên Nghiệp Dẫn Đầu",
            content:
                "We-tech tự hào đồng hành cùng quý khách hàng trên hành trình phát triển bền vững.",
        },
    ];

    return (
        <div className="login-background">
            <div className="login-wrapper">
                <div className="login-left">
                    <div className="text-slider">
                        <h2>{texts[index].title}</h2>
                        <p>{texts[index].content}</p>
                        <div className="slider-dots">
                            {texts.map((_, i) => (
                                <span
                                    key={i}
                                    className={`dot ${i === index ? "active" : ""}`}
                                    onClick={() => setIndex(i)}
                                ></span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="login-right">
                    <div className="login-box">
                        <h2>Đăng Nhập</h2>
                        <p>
                            Bạn chưa có tài khoản? <a href="#">Đăng Ký</a>
                        </p>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Mật khẩu" />
                        <p className="forgot-password">Quên mật khẩu?</p>
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

export default Login;
