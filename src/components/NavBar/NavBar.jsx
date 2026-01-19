import React, { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.css";
import logoImage from "../../assets/logo.png";
import avatarImage from "../../assets/avatar_user.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [token, setToken] = useState(sessionStorage.getItem("authToken"));
    const [fullname, setFullname] = useState(localStorage.getItem("fullname") || "");
    const [email, setEmail] = useState(localStorage.getItem("email") || "");
    const [linkImage, setLinkImage] = useState(localStorage.getItem("linkImage") || avatarImage);

    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const userDropdownRef = useRef(null);
    const servicesDropdownRef = useRef(null);

    useEffect(() => {
        const storedFullname = localStorage.getItem("fullName");
        const storedEmail = localStorage.getItem("email");
        const storedLinkImage = localStorage.getItem("linkImage");
        if (storedFullname) setFullname(storedFullname);
        if (storedEmail) setEmail(storedEmail);
        if (storedLinkImage) setLinkImage(storedLinkImage);
    }, [token]);

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
        setIsServicesDropdownOpen(false);
    };

    const toggleServicesDropdown = () => {
        setIsServicesDropdownOpen(!isServicesDropdownOpen);
        setIsUserDropdownOpen(false);
    };

    const handleLogout = () => {
        sessionStorage.removeItem("authToken");
        localStorage.clear();
        setToken(null);
        setFullname("");
        setEmail("");
        setIsUserDropdownOpen(false);
        navigate("/login");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setIsUserDropdownOpen(false);
            }
        };
        if (isUserDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isUserDropdownOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
                setIsServicesDropdownOpen(false);
            }
        };
        if (isServicesDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isServicesDropdownOpen]);

    return (
        <div>
            <div className={styles["navbar-top-bar"]}></div>
            <div className={styles["navbar-container"]}>
                <ul className={styles["navbar-menu"]}>
                    <li>
                        <img src={logoImage} alt="WE-TECH Logo" className={styles.logo} />
                    </li>
                    <li>
                        <Link to="/">TRANG CHỦ</Link>
                    </li>
                    <li>
                        <Link to="/">GIỚI THIỆU</Link>
                    </li>

                    <li className={styles["menu-item-dropdown"]} ref={servicesDropdownRef}>
                        <div className={styles["dropdown-toggle"]} onClick={toggleServicesDropdown}>
                            LOẠI KHÓA HỌC <i className="fas fa-caret-down"></i>
                        </div>
                        {isServicesDropdownOpen && (
                            <div className={`${styles["dropdown-menu"]} ${styles["dropdown-service-menu"]}`}>
                                <ul>
                                    <li>
                                        <Link to="/course-filter/thanh-lap-cong-ty">Thành lập công ty</Link>
                                    </li>
                                    <li>
                                        <Link to="/course-filter/thanh-lap-ho-kinh-doanh">Thành lập Hộ kinh doanh</Link>
                                    </li>
                                    <li>
                                        <Link to="/course-filter/giai-the-cong-ty">Giải thể Công ty</Link>
                                    </li>
                                    <li>
                                        <Link to="/course-filter/giai-the-ho-kinh-doanh">Giải thể Hộ kinh doanh</Link>
                                    </li>
                                    <li>
                                        <Link to="/course-filter/dang-ky-thay-doi">Đăng kí thay đổi</Link>
                                    </li>
                                    <li>
                                        <Link to="/course-filter/sap-nhap-tinh">Sáp nhập Tỉnh</Link>
                                    </li>
                                    <li>
                                        <Link to="/course-filter/cap-nhat-len-cccd">Cập nhật lên CCCD</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </li>

                    <li>
                        <Link to="/list-courses">KHÓA HỌC</Link>
                    </li>
                    <li>
                        <Link to="/contact-us">LIÊN HỆ</Link>
                    </li>
                </ul>

                <div className={styles["navbar-right"]}>
                    <div className={styles["search-box"]}>
                        <i className={`fas fa-search ${styles["search-icon"]}`}></i>
                        <input className={styles["search-navbar"]} type="text" placeholder="Tìm kiếm" />
                    </div>

                    <Link to="/cart">
                        <i className={`fas fa-shopping-cart ${styles["cart-icon"]}`}></i>
                    </Link>

                    {!token ? (
                        <div className={styles["navbar-right-btn"]}>
                            <button className={styles["btn-outline"]}>
                                <Link to="/register">Đăng Ký</Link>
                            </button>
                            <button className={styles["btn-filled"]}>
                                <Link to="/login">Đăng Nhập</Link>
                            </button>
                        </div>
                    ) : (
                        <div className={styles["user-profile"]} ref={userDropdownRef}>
                            <div className={styles["avatar-container"]} onClick={toggleUserDropdown}>
                                <img src={linkImage} alt="User Avatar" className={styles["user-avatar-img"]} />
                                <i className={`fas fa-caret-down ${styles["dropdown-arrow"]}`}></i>
                            </div>
                            {isUserDropdownOpen && (
                                <div className={`${styles["dropdown-menu"]} ${styles["dropdown-user-menu"]}`}>
                                    <div className={styles["dropdown-user-info"]}>
                                        <h4>{fullname || "Người dùng"}</h4>
                                        <p>{email || "Chưa có email"}</p>
                                    </div>
                                    <hr className={styles["dropdown-divider"]} />
                                    <ul>
                                        <li>
                                            <Link to="/my-courses">Khóa học của tôi</Link>
                                        </li>
                                        <li>
                                            <Link>Thủ tục pháp lý</Link>
                                        </li>
                                        <li>
                                            <Link>Lịch sử</Link>
                                        </li>
                                    </ul>
                                    <hr className={styles["dropdown-divider"]} />
                                    <ul>
                                        <li>
                                            <Link to="/change-password">Đổi mật khẩu</Link>
                                        </li>
                                        <li>
                                            <Link to="/profile">Thiết lập tài khoản</Link>
                                        </li>
                                    </ul>
                                    <hr className={styles["dropdown-divider"]} />
                                    <ul>
                                        <li onClick={handleLogout} className={styles["logout-item"]}>
                                            Đăng xuất
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
