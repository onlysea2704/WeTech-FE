import React from "react";
import "./CourseCardMini.css";
import { useNavigate } from "react-router-dom";

const CourseCardMini = ({ index, course }) => {

    const navigate = useNavigate();
    const handleClick = async () => {
        window.scrollTo(0, 0);
        navigate("/detail-course/" + course.courseId);
    }

    const discountPercentage = Math.round(((course?.realPrice - course?.salePrice) / course?.realPrice) * 100);
    // Hàm định dạng giá
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    return (
        <div className="course-card" key={index} onClick={handleClick}>
            <div className="course-image">
                <div className="badge-container">
                    <span className="badge second-badge">
                        Best Seller
                    </span>
                    <span className="badge">
                        {discountPercentage}% OFF
                    </span>
                </div>

                <img src={course?.linkImage} alt={course?.title} />
            </div>
            <div className="course-info">
                <h4>{course?.title}</h4>
                <p className="description">{course?.description}</p>
                <div className="price">
                    <span className="new-price">{formatPrice(course?.realPrice)}đ</span>
                    <span className="old-price">{formatPrice(course?.salePrice)}đ</span>
                </div>
            </div>
        </div>
    );
};

export default CourseCardMini;
