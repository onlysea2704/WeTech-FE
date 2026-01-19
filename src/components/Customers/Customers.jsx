import React, { useState } from "react";
import custom1 from "../../assets/customer1.jpg";
import custom2 from "../../assets/customer2.jpg";
import custom3 from "../../assets/customer3.png";
import custom4 from "../../assets/customer4.png";
import custom5 from "../../assets/customer5.jpg";
import starIcon from "../../assets/star-icon.png";
import styles from "./Customers.module.css";

const testimonials = [
    {
        name: "Duy Hải",
        role: "Chủ doanh nghiệp",
        rating: 5,
        feedback:
            "Mọi thủ tục được xử lý nhanh chóng, không rườm rà, không mất thời gian chờ đợi. Nếu biết sớm thì đã không phải loay hoay tìm cách tự xử lý mệt mỏi như trước. Rất hài lòng!",
        img: custom1,
    },
    {
        name: "Mai Nguyễn",
        role: "Giám đốc điều hành",
        rating: 5,
        feedback:
            "Thủ tục gọn gàng, làm việc chuyên nghiệp, không phải chạy tới lui hay lo thủ tục rắc rối. Dịch vụ nhanh chóng, hỗ trợ nhiệt tình, thực sự yên tâm!",
        img: custom2,
    },
    {
        name: "Vân Nguyên",
        role: "Kế toán viên",
        rating: 5,
        feedback:
            "Thực sự hài lòng! Lần đầu sử dụng nhưng phải nói là quá bất ngờ. Xử lý nhanh chóng, hỗ trợ tận tình, tiết kiệm được bao nhiêu thời gian. Nhờ kế biết đến sớm thì tốt quá!",
        img: custom3,
    },
    {
        name: "Anh Tuấn",
        role: "Giám đốc Marketing",
        rating: 5,
        feedback:
            "Dịch vụ tuyệt vời, đội ngũ hỗ trợ rất chuyên nghiệp và giải đáp thắc mắc nhanh chóng. Sẽ tiếp tục hợp tác lâu dài với công ty.",
        img: custom4,
    },
    {
        name: "Chị Mai",
        role: "Trưởng phòng nhân sự",
        rating: 4,
        feedback:
            "Quy trình làm việc rõ ràng, minh bạch. Mọi thứ đều được xử lý đúng hẹn và hiệu quả. Rất đáng tin cậy.",
        img: custom5,
    },
];

const Customers = () => {
    // State để theo dõi chỉ số của bình luận đầu tiên đang hiển thị
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState("next"); // 'next' or 'prev'

    // Hàm xử lý khi nhấn nút "tiếp theo"
    const handleNext = () => {
        setDirection("next");
        setIsAnimating(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    // Hàm xử lý khi nhấn nút "quay lại"
    const handlePrev = () => {
        setDirection("prev");
        setIsAnimating(true);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    // Hàm xử lý khi nhấn vào các dấu chấm
    const goToTestimonial = (index) => {
        setDirection(index > currentIndex ? "next" : "prev");
        setIsAnimating(true);
        setCurrentIndex(index);
        setTimeout(() => setIsAnimating(false), 500);
    };

    // Lấy ra 3 bình luận để hiển thị dựa trên currentIndex
    const getVisibleTestimonials = () => {
        // Nếu có 3 bình luận trở xuống, hiển thị tất cả
        if (testimonials.length <= 3) {
            return testimonials;
        }
        const visible = [];
        for (let i = 0; i < 3; i++) {
            const index = (currentIndex + i) % testimonials.length;
            visible.push(testimonials[index]);
        }
        return visible;
    };

    const visibleTestimonials = getVisibleTestimonials();

    return (
        <div className={styles["testimonials"]}>
            <h2 className={styles["title"]}>Khách hàng của chúng tôi</h2>
            <h1> </h1>
            <div className={styles["comments-container"]}>
                <i className="fas fa-chevron-left" onClick={handlePrev}></i>

                <div className={`${styles["cards-container"]} ${isAnimating ? styles[`animating-${direction}`] : ""}`}>
                    {visibleTestimonials.map((item, index) => (
                        <div className={`${styles["card"]} ${index === 1 ? styles["active"] : ""}`} key={index}>
                            <div className={styles["user-info"]}>
                                {/* Lưu ý: Code gốc của bạn dùng imageCustomer cho tất cả, nên tôi giữ nguyên.
                    Nếu muốn dùng ảnh riêng, hãy đổi src thành {item.img} */}
                                <img src={item.img} alt={item.name} className={styles["avatar"]} />
                                <div>
                                    <h4 className={styles["customer-name"]}>{item.name}</h4>
                                    <div className={styles["role-stars"]}>
                                        <p className={styles["role"]}>{item.role}</p>
                                        <div className={styles["stars"]}>
                                            {Array(Math.round(item.rating))
                                                .fill(null)
                                                .map((_, index) => (
                                                    <img key={index} src={starIcon} alt="" />
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className={styles["feedback"]}>{item.feedback}</p>
                        </div>
                    ))}
                </div>

                <i className="fas fa-chevron-right" onClick={handleNext}></i>
            </div>

            {/* Chỉ hiển thị các dấu chấm nếu có nhiều hơn 3 bình luận */}
            {testimonials.length > 3 && (
                <div className={styles["dots"]}>
                    {testimonials.map((_, index) => (
                        <span
                            key={index}
                            className={`${styles["dot"]} ${currentIndex === index ? styles["active"] : ""}`}
                            onClick={() => goToTestimonial(index)}
                        ></span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Customers;
