import React, { useState } from "react";
import styles from "./ChangePassword.module.css";
import Footer from "../../../components/Footer/Footer";
import Navbar from "../../../components/NavBar/NavBar";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import { authAxios } from "../../../services/axios-instance";
import Popup from "../../../components/Popup/Popup";

const ChangePassword = () => {
    // 1. State cho 3 ô mật khẩu
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // 2. State để quản lý việc Ẩn/Hiện mật khẩu cho từng ô
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [loading, setLoading] = useState(false);

    // Xử lý submit form
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate cơ bản
        if (!currentPassword || !newPassword || !confirmPassword) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
            return;
        }

        if (newPassword.length < 6) {
            alert("Mật khẩu mới phải có ít nhất 6 ký tự!");
            return;
        }

        setLoading(true);
        try {
            // Chuẩn bị dữ liệu gửi đi (JSON)
            const payload = {
                oldPassword: currentPassword,
                newPassword: newPassword,
            };

            // Gọi API đổi mật khẩu (Thay đổi endpoint cho phù hợp với backend của bạn)
            await authAxios.post("/api/auth/change-password", payload);

            alert("Đổi mật khẩu thành công!");

            // Reset form sau khi thành công
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error("Lỗi khi đổi mật khẩu:", error);
            // Xử lý lỗi từ backend trả về (ví dụ: Mật khẩu cũ không đúng)
            const errorMessage = error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!";
            alert(errorMessage);
        }
        setLoading(false);
    };

    return (
        <div>
            <Navbar />
            <Breadcrumb
                items={[
                    { label: "Trang chủ", link: "/" },
                    { label: "Tài khoản", link: "/profile" },
                    { label: "Đổi mật khẩu" },
                ]}
            />
            <div className={styles["profile-page-container"]}>
                <h1 className={styles["main-title"]}>ĐỔI MẬT KHẨU</h1>

                {/* Form Card - Tận dụng class cũ để giữ giao diện */}
                <form className={styles["profile-form-card"]} onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
                    {/* 1. Mật khẩu hiện tại */}
                    <div className={styles["form-group"]}>
                        <label htmlFor="currentPassword">Mật khẩu hiện tại</label>
                        <div className={styles["input-wrapper"]}>
                            <input
                                id="currentPassword"
                                type={showCurrent ? "text" : "password"} // Toggle type
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                // placeholder="Nhập mật khẩu hiện tại"
                            />
                            <i
                                className={`fa-solid ${showCurrent ? "fa-eye" : "fa-eye-slash"} ${styles["edit-icon"]}`}
                                onClick={() => setShowCurrent(!showCurrent)}
                                style={{ cursor: "pointer" }}
                                title={showCurrent ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                            ></i>
                        </div>
                    </div>

                    {/* 2. Mật khẩu mới */}
                    <div className={styles["form-group"]}>
                        <label htmlFor="newPassword">Mật khẩu mới</label>
                        <div className={styles["input-wrapper"]}>
                            <input
                                id="newPassword"
                                type={showNew ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                // placeholder="Nhập mật khẩu mới"
                            />
                            <i
                                className={`fa-solid ${showNew ? "fa-eye" : "fa-eye-slash"} ${styles["edit-icon"]}`}
                                onClick={() => setShowNew(!showNew)}
                                style={{ cursor: "pointer" }}
                            ></i>
                        </div>
                    </div>

                    {/* 3. Xác nhận mật khẩu mới */}
                    <div className={styles["form-group"]}>
                        <label htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
                        <div className={styles["input-wrapper"]}>
                            <input
                                id="confirmPassword"
                                type={showConfirm ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                // placeholder="Nhập lại mật khẩu mới"
                            />
                            <i
                                className={`fa-solid ${showConfirm ? "fa-eye" : "fa-eye-slash"} ${styles["edit-icon"]}`}
                                onClick={() => setShowConfirm(!showConfirm)}
                                style={{ cursor: "pointer" }}
                            ></i>
                        </div>
                    </div>

                    <button type="submit" className={styles["save-button"]}>
                        Cập nhật mật khẩu
                    </button>
                </form>
            </div>
            <Footer />
            {loading && <Popup message="Đang xử lý..." />}
        </div>
    );
};

export default ChangePassword;
