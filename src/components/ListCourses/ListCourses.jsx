import React from "react";
import "./ListCourses.css";
import thumbnailCourse from '../../assets/thumbnail-course.png'

const courses = [
    {
        bgColor: "#FF5C5C",
        img: "https://via.placeholder.com/150",
        badges: ["Best Seller", "20% OFF"],
        title: "VUE JAVASCRIPT COURSE",
        author: "Kitani Studio",
        courseName: "VUE JS SCRATCH COURSE",
        description:
            "More than 8yr Experience as Illustrator. Learn how to becoming professional Illustrator Now...",
        price: "$24.92",
        oldPrice: "$32.90",
    },
    //   {
    //     bgColor: "#FF6E6E",
    //     img: "https://via.placeholder.com/150",
    //     badges: ["Best Seller", "20% OFF"],
    //     title: "UI DESIGN FOR BEGINNERS",
    //     author: "Kitani Studio",
    //     courseName: "VUE JS SCRATCH COURSE",
    //     description:
    //       "More than 8yr Experience as Illustrator. Learn how to becoming professional Illustrator Now...",
    //     price: "$24.92",
    //     oldPrice: "$32.90",
    //   },
    {
        bgColor: "#9C5CFF",
        img: "https://via.placeholder.com/150",
        badges: ["Best Seller", "20% OFF"],
        title: "WEBSITE DEV ZERO TO HERO",
        author: "Kitani Studio",
        courseName: "VUE JS SCRATCH COURSE",
        description:
            "More than 8yr Experience as Illustrator. Learn how to becoming professional Illustrator Now...",
        price: "$24.92",
        oldPrice: "$32.90",
    },
    {
        bgColor: "#9C5CFF",
        img: "https://via.placeholder.com/150",
        badges: ["Best Seller", "20% OFF"],
        title: "WEBSITE DEV ZERO TO HERO",
        author: "Kitani Studio",
        courseName: "VUE JS SCRATCH COURSE",
        description:
            "More than 8yr Experience as Illustrator. Learn how to becoming professional Illustrator Now...",
        price: "$24.92",
        oldPrice: "$32.90",
    },
    {
        bgColor: "#4CC96D",
        img: "https://via.placeholder.com/150",
        badges: ["Best Seller", "20% OFF"],
        title: "MOBILE DEV REACT NATIVE",
        author: "Kitani Studio",
        courseName: "VUE JS SCRATCH COURSE",
        description:
            "More than 8yr Experience as Illustrator. Learn how to becoming professional Illustrator Now...",
        price: "$24.92",
        oldPrice: "$32.90",
    },
];

const ListCourses = () => {
    return (
        <div className="new-courses-container">
            <div className="header">
                <div>
                    <h2>KHÓA HỌC MỚI</h2>
                    <p>Các khoá học mới nhất được update.</p>
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
                                <span className="badge">
                                    Best Seller
                                </span>
                                <span className="badge second-badge">
                                    20% OFF
                                </span>
                            </div>
                            <img src={thumbnailCourse} alt={course.title} />
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
