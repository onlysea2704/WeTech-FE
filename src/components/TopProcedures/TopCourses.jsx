import React, { useState, useEffect } from "react";
import CourseCard from "../CourseCard/CourseCard"; // ✅ đổi sang component hiển thị khóa học
import "./TopCourses.css"; // ✅ đổi tên file CSS
import { publicAxios } from "../../services/axios-instance";

const ITEMS_PER_PAGE = 8;

const TopCourses = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await publicAxios.get("/api/course/get-top"); 
                setCourses(res.data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách khóa học:", error);
            }
        };

        fetchCourses();
    }, []);

    const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const visibleItems = courses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="featured-wrapper">
            <h2 className="featured-title">KHÓA HỌC NỔI BẬT</h2>
            <div className="course-grid">
                {visibleItems.map((item, index) => (
                    <CourseCard key={index} index={index} course={item} />
                ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <span
                        key={i}
                        className={`page-dot ${i + 1 === currentPage ? "active" : ""}`}
                        onClick={() => setCurrentPage(i + 1)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default TopCourses;
