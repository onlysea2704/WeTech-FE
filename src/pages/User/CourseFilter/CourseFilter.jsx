import React, { useState, useEffect } from "react";
import styles from "./CourseFilter.module.css";
import Navbar from "../../../components/NavBar/NavBar";
import Footer from "../../../components/Footer/Footer";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import FilterCourse from "../../../components/FilterCourse/FilterCourse";
import CourseCardMini from "../../../components/CourseCardMini/CourseCardMini";
import { publicAxios } from "../../../services/axios-instance";

const CourseFilter = () => {
    const [allCourses, setAllCourses] = useState([]); // Dữ liệu gốc (không bao giờ bị filter cắt bớt)
    const [courses, setCourses] = useState([]); // Dữ liệu hiển thị (bị thay đổi bởi search/filter)
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState([]); // Moved state here

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
            const filtered = allCourses.filter(
                (course) =>
                    course.courseName?.toLowerCase().includes(value.toLowerCase()) ||
                    course.title?.toLowerCase().includes(value.toLowerCase()),
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
            <Breadcrumb
                items={[
                    { label: "Trang chủ", link: "/" },
                    { label: "Khóa học", link: "/list-courses" },
                    { label: "Tất cả khóa học" },
                ]}
            />

            <div className={styles["courses-page-layout"]}>
                {/* Left Column: Title + Filter */}
                <div className={styles["filter-column"]}>
                    <h2 className={styles["course-title-sidebar"]}>{pageTitle}</h2>
                    <FilterCourse
                        originalCourses={allCourses}
                        setCourses={setCourses}
                        setCurrentPage={setCurrentPage}
                        selectedCategory={selectedCategories} // Use state
                        setSelectedCategories={setSelectedCategories} // Pass setter
                    />
                </div>

                <div className={styles["main-content"]}>
                    <div className={styles["course-header"]}>
                        <div className={styles["header-controls"]}>
                            <div className={styles["search-box-custom"]}>
                                <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                        </div>
                    </div>

                    <div className={styles["courses-list-container"]}>
                        {courses.length > 0 ? (
                            selectedCategories.length > 0 ? (
                                // Grouped View (Filters Active)
                                Object.entries(
                                    courses.reduce((group, course) => {
                                        const type = course.typeCourse || "Khác";
                                        group[type] = group[type] ?? [];
                                        group[type].push(course);
                                        return group;
                                    }, {}),
                                ).map(([type, groupCourses]) => (
                                    <div key={type} className={styles["course-group-section"]}>
                                        <div className={styles["group-header"]}>
                                            <h3 className={styles["group-title"]}>Khoá Học: {type}</h3>
                                            <p className={styles["group-subtitle"]}>
                                                Khoá học đăng ký {type.toLowerCase()}
                                            </p>
                                        </div>
                                        <div className={styles["courses-grid"]}>
                                            {groupCourses.map((course, index) => (
                                                <CourseCardMini
                                                    key={course.courseId || index}
                                                    index={index}
                                                    course={course}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                // Flat View (No Category Filter)
                                <div className={styles["courses-grid"]}>
                                    {courses.map((course, index) => (
                                        <CourseCardMini key={course.courseId || index} index={index} course={course} />
                                    ))}
                                </div>
                            )
                        ) : (
                            <p>Không tìm thấy khóa học nào.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Pagination Hidden for Grouped View (or remove if no longer needed) */}
            {/* 
            {totalPages > 1 && (
                <div className="pagination">
                   ...
                </div>
            )} 
            */}
            <Footer />
        </div>
    );
};

export default CourseFilter;
