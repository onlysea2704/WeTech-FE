import React, { useState } from "react";
import styles from "./ContactUs.module.css";
import Navbar from "../../../components/NavBar/NavBar";
import Footer from "../../../components/Footer/Footer";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import map from "../../../assets/map.png";
import { publicAxios } from "../../../services/axios-instance";
import Popup from "../../../components/Popup/Popup";
import { useNotification } from "../../../hooks/useNotification";

const ContactUs = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        service: "",
    });

    const [loading, setLoading] = useState(false);
    const { showSuccess, showError } = useNotification();

    // Hàm cập nhật input
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // Gửi API
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await publicAxios.post("/api/auth/contact", form);

            if (response.status === 200) {
                showSuccess("Đã gửi yêu cầu tư vấn thành công! Chúng tôi sẽ liên hệ với bạn sớm.");
                setForm({ name: "", email: "", phone: "", service: "" });
            }
        } catch (error) {
            console.error(error);
            showError("Có lỗi xảy ra, vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles["contact-page"]}>
            <Navbar />

            <div className={styles["contact-page-main"]}>
                <Breadcrumb items={[{ label: "Trang chủ", link: "/" }, { label: "Liên hệ chúng tôi" }]} />

                <div className={styles["contact-container"]}>
                    <h2>LIÊN HỆ VỚI CHÚNG TÔI</h2>

                    <div className={styles["contact-content"]}>
                        {/* Form Tư Vấn */}
                        <div className={styles["form-wrapper"]}>
                            <h2>Nhận Tư Vấn Miễn Phí</h2>
                            <p>Để lại thông tin để được tư vấn dịch vụ chi tiết!</p>

                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Họ và Tên"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Số điện thoại"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                />

                                <textarea
                                    name="service"
                                    placeholder="Dịch vụ bạn muốn tư vấn?"
                                    value={form.service}
                                    onChange={handleChange}
                                    required
                                />

                                <button type="submit" disabled={loading}>
                                    {loading ? "Đang gửi..." : "Đăng Ký Ngay"}
                                </button>
                            </form>

                            <p className={styles["terms-policy"]}>
                                Khi gửi thông tin, bạn đồng ý với <a href="#1">Điều khoản</a> và{" "}
                                <a href="#1">Chính sách bảo mật</a>.
                            </p>
                        </div>

                        {/* Thông Tin Liên Hệ */}
                        <div className={styles["info-wrapper"]}>
                            <h2>Thông Tin Liên Hệ</h2>

                            <div className={styles["info-item"]}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M4.82667 10.3867C6.74667 14.16 9.84 17.24 13.6133 19.1733L16.5467 16.24C16.9067 15.88 17.44 15.76 17.9067 15.92C19.4 16.4133 21.0133 16.68 22.6667 16.68C23.4 16.68 24 17.28 24 18.0133V22.6667C24 23.4 23.4 24 22.6667 24C10.1467 24 0 13.8533 0 1.33333C0 0.6 0.6 0 1.33333 0H6C6.73333 0 7.33333 0.6 7.33333 1.33333C7.33333 3 7.6 4.6 8.09333 6.09333C8.24 6.56 8.13333 7.08 7.76 7.45333L4.82667 10.3867Z" fill="#FF782D" />
                                </svg>
                                <div className={`${styles["info-item-detail"]} ${styles.phone}`}>
                                    <p>Phone</p>
                                    <p>0989 466 992</p>
                                </div>
                            </div>

                            <div className={styles["info-item"]}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="22" viewBox="0 0 27 22" fill="none">
                                    <path d="M24 0H2.66667C1.2 0 0.0133333 1.2 0.0133333 2.66667L0 18.6667C0 20.1333 1.2 21.3333 2.66667 21.3333H24C25.4667 21.3333 26.6667 20.1333 26.6667 18.6667V2.66667C26.6667 1.2 25.4667 0 24 0ZM24 5.33333L13.3333 12L2.66667 5.33333V2.66667L13.3333 9.33333L24 2.66667V5.33333Z" fill="#FF782D" />
                                </svg>
                                <div className={`${styles["info-item-detail"]} ${styles.email}`}>
                                    <p>Email</p>
                                    <p>wetechsoft.vn@gmail.com</p>
                                </div>
                            </div>

                            <div className={styles["map-container"]}>
                                <img src={map} alt="Bản đồ vị trí" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            {/* {loading && <Popup message='Đang gửi yêu cầu tư vấn' />} */}
        </div>
    );
};

export default ContactUs;
