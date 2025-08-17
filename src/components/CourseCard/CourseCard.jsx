import React from "react";
import "./CourseCard.css";
import thumbnailCourse from '../../assets/thumbnail-course.png'
import { useNavigate } from "react-router-dom";

const CourseCard = ({ index, course }) => {

    const navigate = useNavigate();
    const handleClick = async () => {
        // navigate("/detail-course/" + course.id_course);
        navigate("/detail-course/" + 1);
    }

    return (
        <div className="course-card" key={index} onClick={handleClick}>
            <div
                className="course-image"
                style={{ backgroundColor: course.bgColor }}
            >
                <div className="badge-container">
                    {course.badges?.map((badge, idx) => (
                        <span
                            key={idx}
                            className={`badge ${idx === 1 ? "second-badge" : ""}`}
                        >
                            {badge}
                        </span>
                    ))}
                </div>
                <img src={thumbnailCourse} alt={course.courseName} />
            </div>
            <div className="course-info">
                <h4>{course.courseName}</h4>
                <p className="description">{course.description}</p>
                <div className="price">
                    <span className="new-price">{course.price}</span>
                    <span className="old-price">{course.oldPrice}</span>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
