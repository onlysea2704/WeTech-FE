import React, { useState, useEffect } from "react";
import './FilterCourse.css';
import { publicAxios } from "../../services/axios-instance";

const courseCategories = [
    'Thành lập Công ty',
    'Thành lập Hộ kinh doanh',
    'Giải thể Công ty',
    'Giải thể Hộ kinh doanh',
    'Đăng ký thay đổi',
    'Sáp nhập Tỉnh',
    'Cập nhật lên CCCD',
];

const priceOptions = ['Trả phí', 'Miễn phí'];

const FilterCourse = ({ courses, setCourses, setCurrentPage, selectedCategory }) => {
    // State để quản lý các mục được chọn
    const [selectedCategories, setSelectedCategories] = useState(selectedCategory);
    const [selectedPrice, setSelectedPrice] = useState('Miễn phí');

    // State để quản lý việc thu gọn/mở rộng các section
    const [isCategoryOpen, setCategoryOpen] = useState(true);
    const [isPriceOpen, setPriceOpen] = useState(true);

    // Hàm xử lý khi chọn một checkbox danh mục
    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(item => item !== category) // Bỏ chọn nếu đã được chọn
                : [...prev, category] // Thêm vào nếu chưa được chọn
        );
    };

    useEffect(() => {
        const fetchProcedures = async () => {
            try {
                const res = await publicAxios.post("/api/course/find-by-type", selectedCategories);
                setCourses(res.data);
                setCurrentPage(1);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProcedures();
    }, [selectedCategories]);

    // Hàm xử lý khi chọn một radio button giá
    const handlePriceChange = (event) => {
        setSelectedPrice(event.target.value);
    };

    // Hàm để xóa tất cả các filter
    const handleClearFilters = () => {
        setSelectedCategories([]);
        setSelectedPrice('');
    };

    return (
        <div className="filter-sidebar">
            <div className="filter-container">
                <div className="filter-header">
                    <h2 className="filter-title">Filter</h2>
                    <button onClick={handleClearFilters} className="clear-button">Xoá</button>
                </div>

                <div className="filter-divider"></div>

                {/* Section Danh mục khoá học */}
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