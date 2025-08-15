import React from 'react';
import './CourseFilter.css';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

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

const courses = [
    {
        bgColor: "#FF5C5C",
        img: "https://via.placeholder.com/150",
        badges: ["Best Seller", "20% OFF"],
        title: "VUE JAVASCRIPT COURSE",
        author: "Kitani Studio",
        courseName: "VUE JS SCRATCH COURSE",
        description:
            "More than 8yr Experience as Illustrator. Learn how to becoming professional Illustrator Now...",
        price: "$24.92",
        oldPrice: "$32.90",
    },
    {
        bgColor: "#9C5CFF",
        img: "https://via.placeholder.com/150",
        badges: ["Best Seller", "20% OFF"],
        title: "WEBSITE DEV ZERO TO HERO",
        author: "Kitani Studio",
        courseName: "VUE JS SCRATCH COURSE",
        description:
            "More than 8yr Experience as Illustrator. Learn how to becoming professional Illustrator Now...",
        price: "$24.92",
        oldPrice: "$32.90",
    },
    {
        bgColor: "#9C5CFF",
        img: "https://via.placeholder.com/150",
        badges: ["Best Seller", "20% OFF"],
        title: "WEBSITE DEV ZERO TO HERO",
        author: "Kitani Studio",
        courseName: "VUE JS SCRATCH COURSE",
        description:
            "More than 8yr Experience as Illustrator. Learn how to becoming professional Illustrator Now...",
        price: "$24.92",
        oldPrice: "$32.90",
    },
    {
        bgColor: "#4CC96D",
        img: "https://via.placeholder.com/150",
        badges: ["Best Seller", "20% OFF"],
        title: "MOBILE DEV REACT NATIVE",
        author: "Kitani Studio",
        courseName: "VUE JS SCRATCH COURSE",
        description:
            "More than 8yr Experience as Illustrator. Learn how to becoming professional Illustrator Now...",
        price: "$24.92",
        oldPrice: "$32.90",
    },
];

const CourseFilter = () => {
    // State để quản lý các mục được chọn
    const [selectedCategories, setSelectedCategories] = React.useState(['Thành lập Công ty']);
    const [selectedPrice, setSelectedPrice] = React.useState('Miễn phí');

    // State để quản lý việc thu gọn/mở rộng các section
    const [isCategoryOpen, setCategoryOpen] = React.useState(true);
    const [isPriceOpen, setPriceOpen] = React.useState(true);

    // Hàm xử lý khi chọn một checkbox danh mục
    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(item => item !== category) // Bỏ chọn nếu đã được chọn
                : [...prev, category] // Thêm vào nếu chưa được chọn
        );
    };

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

        <div>
            <Navbar />
            <Breadcrumb/>
            <div className="courses-page-layout">
                <div className="main-content">
                    {/* <ListCourses
                        title="KHÓA HỌC MỚI"
                        description="Các khoá học mới nhất được update."
                        courses={courses}
                    /> */}
                </div>
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
            </div>
            <Footer />
        </div>
    );
};

export default CourseFilter;