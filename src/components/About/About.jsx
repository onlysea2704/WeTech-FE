import React from "react";
import styles from "./About.module.css";
import imageAbout from "../../assets/about.jpg";

const About = () => {
    return (
        <div className={styles.whychooseus}>
            {/* Left Image + Stats */}
            <div className={styles.left}>
                <div className={styles["image-container"]}>
                    <img src={imageAbout} alt="We-Tech" className={styles["main-image"]} />
                </div>

                <div className={styles["stats-box"]}>
                    <div className={styles["stat-item"]}>
                        <p className={styles["stat-number"]}>10+</p>
                        <p className={styles["stat-label"]}>Năm kinh nghiệm</p>
                    </div>
                    <div className={styles["stat-item"]}>
                        <p className={styles["stat-number"]}>1000+</p>
                        <p className={styles["stat-label"]}>Dịch vụ sử dụng</p>
                    </div>
                    <div className={styles["stat-item"]}>
                        <p className={styles["stat-number"]}>98%</p>
                        <p className={styles["stat-label"]}>Khách hàng hài lòng</p>
                    </div>
                </div>
            </div>

            {/* Right Content */}
            <div className={styles["right-about"]}>
                <h3 className={styles["subtitle-about"]}>Về Chúng Tôi</h3>
                <h2 className={styles["title-about"]}>Tại sao nên lựa chọn chúng tôi?</h2>
                <p className={styles["description-about"]}>
                    Chúng tôi cung cấp tổng hợp giải pháp hồ sơ pháp lý toàn diện cho doanh nghiệp, hỗ trợ kinh doanh
                    đảm bảo tuân thủ pháp luật và tối ưu quy trình.
                </p>
                <ul className={styles.benefits}>
                    {[
                        "Chuyên nghiệp – Nhanh chóng – Hiệu quả",
                        "Dịch vụ trọn gói – Đơn giản hóa quy trình",
                        "Tối ưu chi phí – Minh bạch rõ ràng",
                        "Hỗ trợ chính xác – Hạn chế tối đa sai sót",
                        "Bảo mật thông tin tuyệt đối",
                    ].map((text, idx) => (
                        <li key={idx} className={styles["benefit-item"]}>
                            <i className={`fas fa-check-circle ${styles["check-icon"]}`}></i>
                            <span>{text}</span>
                        </li>
                    ))}
                </ul>
                <button className={styles["learn-more-btn"]}>Tìm hiểu thêm</button>
            </div>
        </div>
    );
};

export default About;
