import React from "react";
import "./Course2.css";
import Navbar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const Course2 = () => {
    const courses = [
        {
            title: "Đăng ký thành lập mới - Công Ty TNHH 1 Tv",
            teacher: "Mộc Lan",
            desc: "Đăng ký thành lập mới đối với công ty TNHH một thành viên do cá nhân làm chủ sở hữu.",
            price: "399.000đ",
            oldPrice: "800.000đ",
            tag: "Best Seller",
            img: "https://via.placeholder.com/300x200"
        },
        {
            title: "Đăng ký thành lập mới - Công ty TNHH 2 Tv",
            teacher: "Mộc Lan",
            desc: "Đăng ký thành lập mới đối với công ty TNHH 2 thành viên trở lên.",
            price: "399.000đ",
            oldPrice: "800.000đ",
            tag: "Best Seller",
            img: "https://via.placeholder.com/300x200"
        },
        {
            title: "Đăng ký thành lập mới - Công ty Cổ phần",
            teacher: "Mộc Lan",
            desc: "Đăng ký thành lập mới đối với công ty cổ phần.",
            price: "399.000đ",
            oldPrice: "800.000đ",
            tag: "Best Seller",
            img: "https://via.placeholder.com/300x200"
        },
        {
            title: "Đăng ký thành lập Chi nhánh - Văn phòng",
            teacher: "Mộc Lan",
            desc: "Đăng ký thành lập chi nhánh - văn phòng đại diện.",
            price: "399.000đ",
            oldPrice: "800.000đ",
            tag: "Best Seller",
            img: "https://via.placeholder.com/300x200"
        }
    ];

    return (

        <div>
            <Navbar />
            <div className="courses-container">
                {/* Left Content */}
                <div className="courses-list-section">
                    <h1>Tất cả khoá học</h1>

                    <div className="category-title">Khóa Học: Thành lập Công ty</div>
                    <p className="category-desc">
                        Khoá học đăng ký thành lập mới công ty
                    </p>

                    <div className="courses-grid">
                        {courses.map((course, index) => (
                            <div key={index} className="course-card">
                                <img src={course.img} alt={course.title} />
                                <div className="tag">{course.tag}</div>
                                <h3>{course.title}</h3>
                                <p className="teacher">{course.teacher}</p>
                                <p className="desc">{course.desc}</p>
                                <div className="price">
                                    <span className="current">{course.price}</span>
                                    <span className="old">{course.oldPrice}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Filter */}
                <div className="filter-section">
                    <h3>Filter</h3>
                    <div className="filter-group">
                        <h4>Danh mục khoá học</h4>
                        <label>
                            <input type="checkbox" defaultChecked /> Thành lập Công ty
                        </label>
                        <label>
                            <input type="checkbox" /> Thành lập Hộ kinh doanh
                        </label>
                        <label>
                            <input type="checkbox" /> Giải thể Công ty
                        </label>
                        <label>
                            <input type="checkbox" /> Giải thể Hộ kinh doanh
                        </label>
                        <label>
                            <input type="checkbox" /> Đăng ký thay đổi
                        </label>
                        <label>
                            <input type="checkbox" /> Sáp nhập Tỉnh
                        </label>
                        <label>
                            <input type="checkbox" /> Cập nhật lên CCCD
                        </label>
                    </div>

                    <div className="filter-group">
                        <h4>Giá</h4>
                        <label>
                            <input type="radio" name="price" /> Trả phí
                        </label>
                        <label>
                            <input type="radio" name="price" defaultChecked /> Miễn phí
                        </label>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Course2;
