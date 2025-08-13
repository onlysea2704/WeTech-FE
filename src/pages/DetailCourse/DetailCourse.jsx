import React from "react";
import "./DetailCourse.css";
import Navbar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

const DetailCourse = () => {
    return (

        <div className="detail-course-container">
            <Navbar />
            <Breadcrumb />
            <h2>Đăng ký thành lập mới - Công ty TNHH 1 thành viên</h2>
            <div className="course-card">
                {/* Phần bên trái: hình + tiêu đề */}
                <div className="course-left">
                    {/* <img
                        src="https://via.placeholder.com/500x300" // thay bằng ảnh thật
                        alt="Course"
                        className="course-image"
                    /> */}
                    <div className="video-container">
                        <video
                            className="course-video"
                            controls
                        >
                            <source src="https://www.youtube.com/embed/yYX4bvQSqbo" type="video/mp4" />
                        </video>
                    </div>
                </div>

                {/* Phần bên phải: thông tin mua hàng */}
                <div className="course-right">
                    <h3 className="course-price">
                        399.000đ <span className="old-price">800.000đ</span>
                    </h3>
                    <span className="discount">50% OFF</span>

                    <button className="buy-now">MUA NGAY</button>
                    <button className="add-to-cart">THÊM VÀO GIỎ HÀNG</button>

                    <div className="course-info">
                        <p>📹 Bài giảng: 5 Videos</p>
                        <p>📄 Tài Liệu: Hồ sơ thủ tục</p>
                        <p>⏱ Thời lượng: 01h 30m</p>
                        <p>💬 Phụ Đề</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DetailCourse;
