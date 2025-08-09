import React, { useState } from "react";
import "./Course.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar/NavBar";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import ListCourses from "../../components/ListCourses/ListCourses";

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
                <div className="category-bar">
                    {categories.map((cat) => (
                        <button className="category-btn">
                            {cat}
                        </button>
                    ))}
                </div>
                <ListCourses/>

                <ListCourses/>
            </div>

            <Footer />
        </div>
    );
};

export default Courses;
