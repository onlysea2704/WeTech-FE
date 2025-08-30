import React from 'react';
import './CourseFilter.css';
import Navbar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import FilterCourse from '../../../components/FilterCourse/FilterCourse';
import CourseCard from '../../../components/CourseCard/CourseCard';
import { useState } from 'react';

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
                        {/* Tiêu đề */}
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
                <FilterCourse />
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