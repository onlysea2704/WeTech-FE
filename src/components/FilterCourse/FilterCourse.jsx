import React, { useState, useEffect } from "react";
import "./FilterCourse.css";
// Không cần import publicAxios nữa vì lọc local

const courseCategories = [
    "Thành lập Công ty",
    "Thành lập Hộ kinh doanh",
    "Giải thể Công ty",
    "Giải thể Hộ kinh doanh",
    "Đăng ký thay đổi",
    "Sáp nhập Tỉnh",
    "Cập nhật lên CCCD",
];

const priceOptions = ["Tất cả", "Trả phí", "Miễn phí"]; // Thêm 'Tất cả' để dễ reset

const FilterCourse = ({ originalCourses, setCourses, setCurrentPage, selectedCategory, setSelectedCategories }) => {
    // selectedCategory prop is renamed or mapped.
    // Actually, in the parent I passed: selectedCategory={selectedCategories} and setSelectedCategories={setSelectedCategories}
    // So let's align names. I will treat 'selectedCategory' as the array here.

    // const [selectedCategories, setSelectedCategories] = useState(initialCategories); // REMOVED
    const selectedCategories = selectedCategory; // Alias for clarity if needed, or just use selectedCategory

    const [selectedPrice, setSelectedPrice] = useState("Tất cả");

    const [isCategoryOpen, setCategoryOpen] = useState(true);
    const [isPriceOpen, setPriceOpen] = useState(true);

    // Xử lý thay đổi checkbox danh mục
    const handleCategoryChange = (category) => {
        if (setSelectedCategories) {
            setSelectedCategories((prev) =>
                prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category],
            );
        }
    };

    // Xử lý thay đổi radio giá (chuyển sang logic toggle cho checkbox visual)
    const handlePriceChange = (value) => {
        if (selectedPrice === value) {
            setSelectedPrice("Tất cả"); // Uncheck -> Reset to All
        } else {
            setSelectedPrice(value);
        }
    };

    // Xử lý xóa filter
    const handleClearFilters = () => {
        setSelectedCategories([]);
        setSelectedPrice("Tất cả");
    };

    // --- LOGIC LỌC LOCAL (Thay thế cho call API) ---
    useEffect(() => {
        // Luôn bắt đầu lọc từ danh sách gốc (originalCourses)
        let result = [...originalCourses];
        // 1. Lọc theo Danh mục (Category)
        if (selectedCategories.length > 0) {
            result = result.filter((course) => course.typeCourse && selectedCategories.includes(course.typeCourse));
        }

        // 2. Lọc theo Giá (Price)
        if (selectedPrice !== "Tất cả") {
            if (selectedPrice === "Miễn phí") {
                // Giả định giá bằng 0 là miễn phí
                result = result.filter((course) => course.price === 0);
            } else if (selectedPrice === "Trả phí") {
                result = result.filter((course) => course.price > 0);
            }
        }

        // Cập nhật lại danh sách hiển thị và reset về trang 1
        setCourses(result);
        setCurrentPage(1);
    }, [selectedCategories, selectedPrice, originalCourses]); // Chạy lại khi danh sách gốc, category hoặc price thay đổi

    return (
        <div className="filter-sidebar">
            <div className="filter-container">
                {/* Section Danh mục */}
                <div className="filter-section">
                    <div className="section-header">
                        <span>Danh mục khoá học</span>
                    </div>
                    <div className="section-content">
                        {courseCategories.map((category) => {
                            const count = originalCourses.filter((c) => c.typeCourse === category).length;
                            return (
                                <label key={category} className="filter-option checkbox-label">
                                    <div className="option-left">
                                        <input
                                            type="checkbox"
                                            value={category}
                                            checked={selectedCategories.includes(category)}
                                            onChange={() => handleCategoryChange(category)}
                                        />
                                        <span className="custom-checkbox"></span>
                                        <span className="option-text">{category}</span>
                                    </div>
                                    <span className="option-count">{count}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* Section Giá */}
                <div className="filter-section">
                    <div className="section-header">
                        <span>Giá</span>
                    </div>
                    <div className="section-content">
                        {["Miễn phí", "Trả phí"].map((option) => {
                            let count = 0;
                            if (option === "Miễn phí") count = originalCourses.filter((c) => c.price === 0).length;
                            if (option === "Trả phí") count = originalCourses.filter((c) => c.price > 0).length;

                            return (
                                <label key={option} className="filter-option checkbox-label">
                                    <div className="option-left">
                                        <input
                                            type="checkbox" // Changed to checkbox visual as per design (squares) even if logic is radio/toggle-ish
                                            value={option}
                                            checked={selectedPrice === option}
                                            onChange={() => handlePriceChange(option)}
                                        />
                                        <span className="custom-checkbox"></span>
                                        <span className="option-text">{option}</span>
                                    </div>
                                    <span className="option-count">{count}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterCourse;
