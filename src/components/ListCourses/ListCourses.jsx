import React from "react";
import "./ListCourses.css";
import thumbnailCourse from '../../assets/thumbnail-course.png'

const ListCourses = ({ title, description, courses }) => {
    return (
        <div className="new-courses-container">
            <div className="header">
                <div>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
                <button className="view-more">Xem thêm</button>
            </div>

            <div className="course-list">
                {courses.map((course, index) => (
                    <div className="course-card" key={index}>
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
                ))}
            </div>
        </div>
    );
};


export default ListCourses;
