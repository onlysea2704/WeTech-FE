import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import { Link, useNavigate } from "react-router-dom";
import LeftLoginRegisterForm from "../../../components/LeftLoginRegisterForm/LeftLoginRegisterForm";
import { publicAxios } from "../../../services/axios-instance";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const handleClose = async () => {
        navigate("/");
    };

    const [email, setEmail] = useState("");
    const [backgroundImage, setBackgroundImage] = useState("");

    const forgotPassword = async (email) => {
        const response = await publicAxios.post("/api/auth/forgot-password", {
            email: email,
        });
        console.log(response);
        if (response.data === true) {
            alert("Đã gửi email khôi phục mật khẩu! Vui lòng kiểm tra hộp thư đến.");
            navigate("/login");
        } else {
            alert("Có lỗi xảy ra khi gửi email. Vui lòng thử lại.");
        }
    };

    return (
        <div
            className={styles["forgot-password-background"]}
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className={styles["forgot-password-wrapper"]}>
                <LeftLoginRegisterForm onBackgroundChange={setBackgroundImage} />
                <div className={styles["forgot-password-right"]}>
                    <div className={styles["forgot-password-box"]}>
                        <div className={styles["forgot-password-header"]}>
                            <h2>Quên mật khẩu?</h2>
                            <button className={styles["close-btn"]} onClick={handleClose}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <p className={styles["register-text"]}>
                            Đừng lo lắng! Chỉ cần nhập email của bạn và chúng tôi sẽ gửi cho bạn liên kết đặt lại mật
                            khẩu.
                        </p>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className={styles["btn-forgot-password"]} onClick={() => forgotPassword(email)}>
                            Gửi Email Khôi Phục
                        </button>
                        <p className={styles["text-register"]}>
                            Tạo mới? <Link to="/register">Đăng Ký</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
