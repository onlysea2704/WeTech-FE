import React, { useState, useEffect } from "react";
import './FilterCourse.css';
// Không cần import publicAxios nữa vì lọc local

const courseCategories = [
    'Thành lập Công ty',
    'Thành lập Hộ kinh doanh',
    'Giải thể Công ty',
    'Giải thể Hộ kinh doanh',
    'Đăng ký thay đổi',
    'Sáp nhập Tỉnh',
    'Cập nhật lên CCCD',
];

const priceOptions = ['Tất cả', 'Trả phí', 'Miễn phí']; // Thêm 'Tất cả' để dễ reset

const FilterCourse = ({ originalCourses, setCourses, setCurrentPage, selectedCategory }) => {
    // Nếu selectedCategory truyền vào là string, chuyển thành mảng, nếu không giữ nguyên
    const initialCategories = Array.isArray(selectedCategory) ? selectedCategory : (selectedCategory ? [selectedCategory] : []);
    
    const [selectedCategories, setSelectedCategories] = useState(initialCategories);
    const [selectedPrice, setSelectedPrice] = useState('Tất cả');

    const [isCategoryOpen, setCategoryOpen] = useState(true);
    const [isPriceOpen, setPriceOpen] = useState(true);

    // Xử lý thay đổi checkbox danh mục
    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(item => item !== category)
                : [...prev, category]
        );
    };

    // Xử lý thay đổi radio giá
    const handlePriceChange = (event) => {
        setSelectedPrice(event.target.value);
    };

    // Xử lý xóa filter
    const handleClearFilters = () => {
        setSelectedCategories([]);
        setSelectedPrice('Tất cả');
    };

    // --- LOGIC LỌC LOCAL (Thay thế cho call API) ---
    useEffect(() => {
        // Luôn bắt đầu lọc từ danh sách gốc (originalCourses)
        let result = [...originalCourses];
        // 1. Lọc theo Danh mục (Category)
        if (selectedCategories.length > 0) {
            result = result.filter(course => 
                course.typeCourse && selectedCategories.includes(course.typeCourse)
            );
        }

        // 2. Lọc theo Giá (Price)
        if (selectedPrice !== 'Tất cả') {
            if (selectedPrice === 'Miễn phí') {
                // Giả định giá bằng 0 là miễn phí
                result = result.filter(course => course.price === 0);
            } else if (selectedPrice === 'Trả phí') {
                result = result.filter(course => course.price > 0);
            }
        }

        // Cập nhật lại danh sách hiển thị và reset về trang 1
        setCourses(result);
        setCurrentPage(1);

    }, [selectedCategories, selectedPrice, originalCourses]); // Chạy lại khi danh sách gốc, category hoặc price thay đổi

    return (
        <div className="filter-sidebar">
            <div className="filter-container">
                <div className="filter-header">
                    <h2 className="filter-title">Filter</h2>
                    <button onClick={handleClearFilters} className="clear-button">Xoá</button>
                </div>

                <div className="filter-divider"></div>

                {/* Section Danh mục */}
                <div className="filter-section">
                    <div className="section-header" onClick={() => setCategoryOpen(!isCategoryOpen)}>
                        <span>Danh mục khoá học</span>
                        <span className={`chevron ${isCategoryOpen ? 'up' : 'down'}`}></span>
                    </div>
                    {isCategoryOpen && (
                        <div className="section-content">
                            {courseCategories.map(category => (
                                <label key={category} className="filter-option checkbox-label">
                                    <input
                                        type="checkbox"
                                        value={category}
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => handleCategoryChange(category)}
                                    />
                                    <span className="custom-checkbox"></span>
                                    {category}
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                <div className="filter-divider"></div>

                {/* Section Giá */}
                <div className="filter-section">
                    <div className="section-header" onClick={() => setPriceOpen(!isPriceOpen)}>
                        <span>Giá</span>
                        <span className={`chevron ${isPriceOpen ? 'up' : 'down'}`}></span>
                    </div>
                    {isPriceOpen && (
                        <div className="section-content">
                            {priceOptions.map(option => (
                                <label key={option} className="filter-option radio-label">
                                    <input
                                        type="radio"
                                        name="price"
                                        value={option}
                                        checked={selectedPrice === option}
                                        onChange={handlePriceChange}
                                    />
                                    <span className="custom-radio"></span>
                                    {option}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilterCourse;