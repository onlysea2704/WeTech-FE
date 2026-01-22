import React from "react";
import styles from "./CourseCard.module.css";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ index, course }) => {
    const navigate = useNavigate();
    const handleClick = async () => {
        window.scrollTo(0, 0);
        navigate("/detail-course/" + course.courseId);
    };

    const discountPercentage = Math.round(((course?.realPrice - course?.salePrice) / course?.realPrice) * 100);
    // Hàm định dạng giá
    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price);
    };

    return (
        <div className={styles["course-card"]} key={index} onClick={handleClick}>
            <div className={styles["course-image"]}>
                <div className={styles["badge-container"]}>
                    <div className={`${styles.badge} ${styles["second-badge"]}`}>Best Seller</div>
                    <div className={styles.badge}>{discountPercentage}% OFF</div>
                </div>

                <img src={course?.linkImage} alt={course?.title} />
            </div>
            <div className={styles["course-info"]}>
                <h4>{course?.title}</h4>
                <p className={styles.description}>{course?.description}</p>
                <div className={styles.price}>
                    <span className={styles["new-price"]}>{formatPrice(course?.salePrice)}đ</span>
                    <span className={styles["old-price"]}>{formatPrice(course?.realPrice)}đ</span>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
