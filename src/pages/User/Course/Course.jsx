import React, { useState, useEffect } from "react";
import "./Course.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/NavBar/NavBar";
import Banner from "../../../components/Banner/Banner";
import Footer from "../../../components/Footer/Footer";
import CourseCard from "../../../components/CourseCard/CourseCard";
import { publicAxios, authAxios } from "../../../services/axios-instance";

const ListCourses = ({ title, description, courses }) => {
    const [visibleCount, setVisibleCount] = useState(4);

    const handleViewMore = () => {
        setVisibleCount((prev) => prev + 4); // mỗi lần bấm tăng thêm 4
    };

    return (
        <div className="new-courses-container">
            <div className="header">
                <div>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
                {visibleCount < courses.length && (
                    <button className="view-more" onClick={handleViewMore}>
                        Xem thêm
                    </button>
                )}
            </div>

            <div className="course-list">
                {courses.slice(0, visibleCount).map((course, index) => (
                    <CourseCard key={index} index={index} course={course} />
                ))}
            </div>
        </div>
    );
};

// ✅ Map slug ↔ tên danh mục
const categoryMap = {
    "thanh-lap-cong-ty": "Thành lập Công ty",
    "thanh-lap-ho-kinh-doanh": "Thành lập Hộ kinh doanh",
    "giai-the-cong-ty": "Giải thể Công ty",
    "giai-the-ho-kinh-doanh": "Giải thể Hộ kinh doanh",
    "dang-ky-thay-doi": "Đăng ký thay đổi",
    "sap-nhap-tinh": "Sáp nhập Tỉnh",
    "cap-nhat-len-cccd": "Cập nhật lên CCCD",
};

const Courses = () => {
    const [myCourse, setMyCourse] = useState([]);
    const [newCourse, setNewCourse] = useState([]);
    const [topCourse, setTopCourse] = useState([]);

    const navigate = useNavigate();

    const handleClick = (slug) => {
        window.scrollTo(0, 0);
        navigate(`/course-filter/${slug}`);
    };

    useEffect(() => {
        const fetchCourses = async () => {
            const token = sessionStorage.getItem("authToken");

            if (token) {
                try {
                    const myCourseResponse = await authAxios.get("/api/course/find-my-course");
                    setMyCourse(myCourseResponse.data);
                } catch (error) {
                    console.error("Lỗi khi load courses:", error);
                }
            }

            try {
                const newCourseResponse = await publicAxios.get("/api/course/get-all");
                setNewCourse(newCourseResponse.data);
            } catch (error) {
                console.error("Lỗi khi load courses:", error);
            }

            try {
                const topCourseResponse = await publicAxios.get("/api/course/get-top");
                setTopCourse(topCourseResponse.data);
            } catch (error) {
                console.error("Lỗi khi load courses:", error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div>
            <Navbar />

            <div className="courses-page">
                <Banner />

                {myCourse.length > 0 && (
                    <ListCourses
                        title="HOÀN THÀNH KHÓA HỌC CỦA BẠN"
                        description="Các khoá học đã đăng ký"
                        courses={myCourse}
                    />
                )}

                <div className="category-bar">
                    {Object.entries(categoryMap).map(([slug, label]) => (
                        <button
                            key={slug}
                            className="category-btn"
                            onClick={() => handleClick(slug)}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <ListCourses
                    title="KHÓA HỌC MỚI"
                    description="Các khoá học mới nhất được update."
                    courses={newCourse}
                />

                <ListCourses
                    title="KHÓA HỌC NỔI BẬT"
                    description="Khóa học có lượt đăng ký nhiều nhất."
                    courses={topCourse}
                />
            </div>

            <Footer />
        </div>
    );
};

export default Courses;
