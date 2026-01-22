import React, { useState, useEffect } from "react";
import styles from "./ListCourses.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/NavBar/NavBar";
import Banner from "../../../components/Banner/Banner";
import Footer from "../../../components/Footer/Footer";
import CourseCard from "../../../components/CourseCard/CourseCard";
import { publicAxios, authAxios } from "../../../services/axios-instance";
import JoinCourses from "../../../components/JoinCourses/JoinCourses.jsx";
import CourseSkeleton from "../../../components/Skeleton/CourseSkeleton";

const Courses = ({ title, description, courses, loading }) => {
    const [visibleCount, setVisibleCount] = useState(4);

    const handleViewMore = () => {
        setVisibleCount((prev) => prev + 4); // mỗi lần bấm tăng thêm 4
    };

    return (
        <div className={styles["new-courses-container"]}>
            <div className={styles["header"]}>
                <div>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
                {!loading && visibleCount < courses.length && (
                    <button className={styles["view-more"]} onClick={handleViewMore}>
                        Xem thêm
                    </button>
                )}
            </div>

            <div className={styles["course-list"]}>
                {loading
                    ? Array.from({ length: 4 }).map((_, index) => <CourseSkeleton key={index} />)
                    : courses
                          .slice(0, visibleCount)
                          .map((course, index) => <CourseCard key={index} index={index} course={course} />)}
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

const ListCourses = () => {
    const isLogin = sessionStorage.getItem("authToken");
    const [myCourse, setMyCourse] = useState([]);
    const [newCourse, setNewCourse] = useState([]);
    const [topCourse, setTopCourse] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const handleClick = (slug) => {
        window.scrollTo(0, 0);
        navigate(`/course-filter/${slug}`);
    };

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            const token = sessionStorage.getItem("authToken");

            try {
                // Sử dụng Promise.allSettled để đảm bảo tất cả request chạy xong dù có lỗi
                const promises = [];

                if (token) {
                    promises.push(authAxios.get("/api/course/find-my-course").then((res) => setMyCourse(res.data)));
                }

                promises.push(publicAxios.get("/api/course/get-all").then((res) => setNewCourse(res.data)));

                promises.push(publicAxios.get("/api/course/get-top").then((res) => setTopCourse(res.data)));

                await Promise.allSettled(promises);
            } catch (error) {
                console.error("Lỗi khi load courses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div>
            <Navbar />

            <div className={styles["courses-page"]}>
                <Banner />

                {isLogin && (loading || myCourse.length > 0) && (
                    <Courses
                        title="HOÀN THÀNH KHÓA HỌC CỦA BẠN"
                        description="Các khoá học đã đăng ký"
                        courses={myCourse}
                        loading={loading}
                    />
                )}

                <div className={styles["category-bar"]}>
                    {Object.entries(categoryMap).map(([slug, label]) => (
                        <button key={slug} className={styles["category-btn"]} onClick={() => handleClick(slug)}>
                            {label}
                        </button>
                    ))}
                </div>

                <Courses
                    title="KHÓA HỌC MỚI"
                    description="Các khoá học mới nhất được update."
                    courses={newCourse}
                    loading={loading}
                />

                <Courses
                    title="KHÓA HỌC NỔI BẬT"
                    description="Khóa học có lượt đăng ký nhiều nhất."
                    courses={topCourse}
                    loading={loading}
                />

                {!isLogin && <JoinCourses />}
            </div>

            <Footer />
        </div>
    );
};

export default ListCourses;
