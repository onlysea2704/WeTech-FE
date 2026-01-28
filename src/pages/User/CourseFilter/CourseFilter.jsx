import React, { useState, useEffect } from "react";
import styles from "./CourseFilter.module.css";
import Navbar from "../../../components/NavBar/NavBar";
import Footer from "../../../components/Footer/Footer";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import FilterCourse from "../../../components/FilterCourse/FilterCourse";
import CourseCardMini from "../../../components/CourseCardMini/CourseCardMini";
import CourseSkeleton from "../../../components/Skeleton/CourseSkeleton";
import { publicAxios } from "../../../services/axios-instance";
import { useSearchParams, useParams } from "react-router-dom";

const CourseFilter = () => {
    const { category } = useParams();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "";
    const [allCourses, setAllCourses] = useState([]); // Dữ liệu gốc (không bao giờ bị filter cắt bớt)
    const [courses, setCourses] = useState([]); // Dữ liệu hiển thị (bị thay đổi bởi search/filter)
    const [searchTerm, setSearchTerm] = useState(query);
    const [currentPage, setCurrentPage] = useState(1);
    const categoryMap = {
        "thanh-lap-cong-ty": "Thành lập Công ty",
        "thanh-lap-ho-kinh-doanh": "Thành lập Hộ kinh doanh",
        "giai-the-cong-ty": "Giải thể Công ty",
        "giai-the-ho-kinh-doanh": "Giải thể Hộ kinh doanh",
        "dang-ky-thay-doi": "Đăng ký thay đổi",
        "sap-nhap-tinh": "Sáp nhập Tỉnh",
        "cap-nhat-len-cccd": "Cập nhật lên CCCD",
    };

    const initialCategory = category && categoryMap[category] ? [categoryMap[category]] : [];
    const [selectedCategories, setSelectedCategories] = useState(initialCategory); // Moved state here
    const [loading, setLoading] = useState(true);

    const pageTitle = "Tất cả khóa học";

    useEffect(() => {
        const fetchProcedures = async () => {
            setLoading(true);
            try {
                const res = await publicAxios.get("/api/course/get-all");
                setAllCourses(res.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách khóa học:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProcedures();
    }, []);

    // Re-run filter when query, category, or allCourses changes
    useEffect(() => {
        if (allCourses.length === 0) return;

        let filtered = allCourses;

        // Filter by Query
        if (query) {
            filtered = filtered.filter(
                (course) =>
                    course.courseName?.toLowerCase().includes(query.toLowerCase()) ||
                    course.title?.toLowerCase().includes(query.toLowerCase()),
            );
            setSearchTerm(query);
        }

        // Filter by Category (slug from URL)
        if (category && categoryMap[category]) {
            const mappedCategoryName = categoryMap[category];
            filtered = filtered.filter((course) => course.typeCourse === mappedCategoryName);
            // Update selected categories state to match URL
            if (activeCategorySource === "url") {
                setSelectedCategories([mappedCategoryName]);
            }
        } else if (selectedCategories.length > 0) {
            // If manual selection differs from URL or no URL category, filter by selectedCategories state
            // Note: Implementation of FilterCourse component sync needs care.
            // For now, let's treat URL category as primary filter if present.
            // Actually, clearer logic:
            // 1. If category param exists -> filter by that.
            // 2. If valid manual selection exists (and no category param or we want to support both), filter by that.
            // Let's stick to the requested requirement: apply filter from URL category.
        }

        if (category && categoryMap[category]) {
            const categoryName = categoryMap[category];
            filtered = filtered.filter((course) => course.typeCourse === categoryName);
        }

        setCourses(filtered);
    }, [query, category, allCourses]);

    // Update selectedCategories when category param changes
    const [activeCategorySource] = useState("url"); // simple tracking

    useEffect(() => {
        if (category && categoryMap[category]) {
            setSelectedCategories([categoryMap[category]]);
        } else {
            if (!category) setSelectedCategories([]);
        }
    }, [category]);

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
        <div className={styles.courseFilter}>
            <Navbar />
            <div className={styles["courses-filter-main"]}>
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
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={searchTerm}
                                        onChange={handleSearch}
                                    />
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </div>
                            </div>
                        </div>

                        <div className={styles["courses-list-container"]}>
                            {loading ? (
                                <div className={styles["courses-grid"]}>
                                    {Array.from({ length: 8 }).map((_, index) => (
                                        <CourseSkeleton key={index} />
                                    ))}
                                </div>
                            ) : courses.length > 0 ? (
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
                                            <CourseCardMini
                                                key={course.courseId || index}
                                                index={index}
                                                course={course}
                                            />
                                        ))}
                                    </div>
                                )
                            ) : (
                                <p>Không tìm thấy khóa học nào.</p>
                            )}
                        </div>
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
