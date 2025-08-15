import React, { useState } from "react";
import "./Course.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar/NavBar";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import CourseCard from "../../components/CourseCard/CourseCard";

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
                    <CourseCard key={index} index={index} course={course} />
                ))}
            </div>
        </div>
    );
};

const Courses = () => {

    // const navigate = useNavigate();
    // const handleClose = async () => {
    //     navigate("/");
    // }

    const categories = [
        "Tất cả khóa học",
        "Thành lập Công ty",
        "Giải thể Công ty",
        "Sáp nhập Tinh",
        "Cập nhật từ CMT lên CCCD",
        "Đăng ký Thay đổi",
        "Tạm ngưng - Tiếp tục KD"
    ];

    return (
        <div>
            <Navbar />

            <div className="courses-page">
                <Banner />

                <ListCourses
                    title="HOÀN THÀNH KHÓA HỌC CỦA BẠN"
                    description="Các khoá học đã đăng ký"
                    courses={courses}
                />

                <div className="category-bar">
                    {categories.map((cat) => (
                        <button className="category-btn">
                            {cat}
                        </button>
                    ))}
                </div>
                <ListCourses
                    title="KHÓA HỌC MỚI"
                    description="Các khoá học mới nhất được update."
                    courses={courses}
                />
                <ListCourses
                    title="KHÓA HỌC NỔI BẬT"
                    description="Khóa học có lượt đăng ký nhiều nhất."
                    courses={courses}
                />
            </div>

            <Footer />
        </div>
    );
};

export default Courses;
