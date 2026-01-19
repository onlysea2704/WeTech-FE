import React, { useState, useEffect, useRef } from "react"; // 1. Thêm useRef
import styles from "./Profile.module.css";
import avatarImage from "../../../assets/avatar_user.png";
import Footer from "../../../components/Footer/Footer";
import Navbar from "../../../components/NavBar/NavBar";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import { authAxios } from "../../../services/axios-instance";
import Popup from "../../../components/Popup/Popup";

const Profile = () => {
    const [avatar, setAvatar] = useState(avatarImage);
    const [avatarFile, setAvatarFile] = useState(null);
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    // 2. Tạo Refs để tham chiếu đến các ô input
    const fullNameRef = useRef(null);
    const phoneRef = useRef(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await authAxios.get("/api/auth/get-info");
                const data = res.data;
                setFullname(data.fullname || "");
                setPhone(data.sdt || "");
                setEmail(data.email || "");
                if (data.linkImage) {
                    setAvatar(data.linkImage);
                }
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng:", error);
            }
        };
        fetchUserProfile();
    }, []);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAvatarFile(file);
            const newAvatarUrl = URL.createObjectURL(file);
            setAvatar(newAvatarUrl);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const userData = {
                fullName: fullname,
                phone,
                email,
            };
            const formDataToSend = new FormData();
            formDataToSend.append("user", new Blob([JSON.stringify(userData)], { type: "application/json" }));
            if (avatarFile) {
                formDataToSend.append("avatar", avatarFile);
            }
            const res = await authAxios.post("/api/auth/update-profile", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Cập nhật thông tin thành công!");
        } catch (error) {
            console.error("Lỗi khi cập nhật thông tin:", error);
            alert("Có lỗi xảy ra khi cập nhật thông tin!");
        }
        setLoading(false);
    };

    // Hàm xử lý focus (để code gọn hơn)
    const handleFocusInput = (ref) => {
        if (ref.current) {
            ref.current.focus();
        }
    };

    return (
        <div>
            <Navbar />
            <Breadcrumb items={[{ label: "Trang chủ", link: "/" }, { label: "Tài khoản của tôi" }]} />
            <div className={styles["profile-page-container"]}>
                <h1 className={styles["main-title"]}>MY PROFILE</h1>

                <div className={styles["avatar-wrapper"]}>
                    <img src={avatar} alt="User Avatar" className={styles["avatar-img"]} />
                    <label htmlFor="avatar-upload" className={styles["camera-icon"]}>
                        <i className="fa-solid fa-camera"></i>
                    </label>
                    <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        style={{ display: "none" }}
                    />
                </div>

                <form className={styles["profile-form-card"]} onSubmit={handleSubmit}>
                    <div className={styles["form-group"]}>
                        <label htmlFor="fullName">Họ và Tên</label>
                        <div className={styles["input-wrapper"]}>
                            <input
                                id="fullName"
                                type="text"
                                value={fullname}
                                ref={fullNameRef} // 3. Gán ref vào input
                                onChange={(e) => setFullname(e.target.value)}
                            />
                            {/* 4. Thêm sự kiện onClick cho icon */}
                            <i
                                className={`fa-solid fa-pen-to-square ${styles["edit-icon"]}`}
                                onClick={() => handleFocusInput(fullNameRef)}
                                style={{ cursor: "pointer" }} // Thêm style pointer để người dùng biết click được
                            ></i>
                        </div>
                    </div>

                    <div className={styles["form-group"]}>
                        <label htmlFor="phone">Phone</label>
                        <div className={styles["input-wrapper"]}>
                            <input
                                id="phone"
                                type="tel"
                                value={phone}
                                ref={phoneRef} // 3. Gán ref vào input
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            {/* 4. Thêm sự kiện onClick cho icon */}
                            <i
                                className={`fa-solid fa-pen-to-square ${styles["edit-icon"]}`}
                                onClick={() => handleFocusInput(phoneRef)}
                                style={{ cursor: "pointer" }}
                            ></i>
                        </div>
                    </div>

                    <div className={styles["form-group"]}>
                        <label htmlFor="email">Email</label>
                        <div className={styles["input-wrapper"]}>
                            <input id="email" type="email" value={email} readOnly />
                            {/* Email thường không sửa được nên không cần icon edit */}
                        </div>
                    </div>

                    <button type="submit" className={styles["save-button"]}>
                        Lưu
                    </button>
                </form>
            </div>
            <Footer />
            {loading && <Popup message="Đang cập nhật thông tin cá nhân" />}
        </div>
    );
};

export default Profile;
