import React, { useState, useEffect } from "react";
import './CourseFilter.css';
import Navbar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import FilterCourse from '../../../components/FilterCourse/FilterCourse';
import CourseCardMini from '../../../components/CourseCardMini/CourseCardMini';
import { publicAxios } from "../../../services/axios-instance";

const CourseFilter = () => {
    const [allCourses, setAllCourses] = useState([]); // Dữ liệu gốc (không bao giờ bị filter cắt bớt)
    const [courses, setCourses] = useState([]);       // Dữ liệu hiển thị (bị thay đổi bởi search/filter)
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const pageTitle = "Tất cả khóa học";

    useEffect(() => {
        const fetchProcedures = async () => {
            try {
                // Gọi API 1 lần duy nhất ở đây
                const res = await publicAxios.get("/api/course/get-all");
                setAllCourses(res.data);
                setCourses(res.data);
                console.log("Fetched all courses:", res.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách khóa học:", error);
            }
        };

        fetchProcedures();
    }, []);

    // Xử lý Search
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setCurrentPage(1);

        // Logic search cơ bản (Lưu ý: Search này đang tìm trên toàn bộ danh sách gốc)
        if (value.trim() === "") {
            setCourses(allCourses);
        } else {
            const filtered = allCourses.filter(course => 
                course.courseName?.toLowerCase().includes(value.toLowerCase()) || 
                course.title?.toLowerCase().includes(value.toLowerCase())
            );
            setCourses(filtered);
        }
    };

    const itemsPerPage = 16; 
    const totalPages = Math.ceil(courses.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentCourses = courses.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div>
            <Navbar />
            <Breadcrumb />

            <div className="courses-page-layout">
                <div className="main-content">
                    <div className="course-header">
                        <h2 className="course-title">{pageTitle}</h2>
                        <div className="search-box-filter">
                            <input 
                                className='input-filter' 
                                type="text" 
                                placeholder="Tìm kiếm khóa học..." 
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <i className="fa-solid fa-search"></i>
                        </div>
                    </div>
                    
                    <div className="courses-grid">
                        {currentCourses.length > 0 ? (
                            currentCourses.map((course, index) => (
                                <CourseCardMini key={index} index={index} course={course} />
                            ))
                        ) : (
                            <p>Không tìm thấy khóa học nào.</p>
                        )}
                    </div>
                </div>
                
                {/* Truyền allCourses vào props originalCourses */}
                <FilterCourse
                    originalCourses={allCourses} 
                    setCourses={setCourses}
                    setCurrentPage={setCurrentPage}
                    selectedCategory={[]} // Mặc định là mảng rỗng nếu không có category chọn trước
                />
            </div>

            {/* Pagination Logic... (Giữ nguyên như cũ) */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
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
                    <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                        <i className="fa-solid fa-angle-right"></i>
                    </button>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default CourseFilter;