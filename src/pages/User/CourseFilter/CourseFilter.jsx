import React, { useState, useEffect } from "react";
import './CourseFilter.css';
import Navbar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import FilterCourse from '../../../components/FilterCourse/FilterCourse';
import CourseCard from '../../../components/CourseCard/CourseCard';
import { publicAxios } from "../../../services/axios-instance";

const CourseFilter = () => {
    
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchProcedures = async () => {
            try {
                // setLoading(true);
                const res = await publicAxios.get("/api/course/get-all");
                // 👆 sửa endpoint này cho đúng API backend của bạn
                setCourses(res.data);
                console.log(res.data);
            } catch (error) {
                console.error(error);
                // setErrorMsg("Không thể tải dữ liệu thủ tục.");
            }
        };
        fetchProcedures();
    }, []);

    const itemsPerPage = 16; // số khóa học / trang
    const [currentPage, setCurrentPage] = useState(1);
    // Tính tổng số trang
    const totalPages = Math.ceil(courses.length / itemsPerPage);
    // Lấy danh sách khóa học của trang hiện tại
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentCourses = courses.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div>
            <Navbar />
            <Breadcrumb />

            <div className="courses-page-layout">
                <div className="main-content">

                    <div className="course-header">
                        <h2 className="course-title">Tất cả khoá học</h2>

                        {/* Ô tìm kiếm */}
                        <div className="search-box-filter">
                            <input className='input-filter' type="text" placeholder="Search" />
                            <i className="fa-solid fa-search"></i>
                        </div>
                    </div>

                    {/* Grid khóa học */}
                    <div className="courses-grid">
                        {currentCourses.map((course, index) => (
                            <CourseCard key={index} index={index} course={course} />
                        ))}
                    </div>

                </div>
                <FilterCourse courses={courses} setCourses={setCourses}/>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <i className="fa-solid fa-angle-left"></i>
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            className={currentPage === i + 1 ? "active" : ""}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        <i className="fa-solid fa-angle-right"></i>
                    </button>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default CourseFilter;