import React, { useState, useRef, useEffect } from 'react';
import './NavBar.css';
import logoImage from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null); // tham chiếu dropdown

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsDropdownOpen(false);
        navigate('/login');
    };

    // Đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <div>
            {/* Dải màu xanh đậm phía trên */}
            <div className="navbar-top-bar"></div>

            {/* Phần navbar chính */}
            <div className="navbar-container">
                <div className="navbar-left">
                    <img src={logoImage} alt="WE-TECH Logo" className="logo" />
                </div>

                <ul className="navbar-menu">
                    <li><Link to="/">TRANG CHỦ</Link></li>
                    <li><Link to="/my-courses">GIỚI THIỆU</Link></li>
                    <li><Link to="/list-procedures">DỊCH VỤ PHÁP LÝ</Link></li>
                    <li><Link to="/list-courses">KHÓA HỌC</Link></li>
                    <li><Link to="/contact-us">LIÊN HỆ</Link></li>
                </ul>

                <div className="navbar-right">
                    <div className="search-box">
                        <i className="fas fa-search search-icon"></i>
                        <input className='search-navbar' type="text" placeholder="Tìm kiếm" />
                    </div>

                    <i className="fas fa-shopping-cart cart-icon"></i>

                    {/* Kiểm tra nếu không có token thì hiển thị nút Đăng ký/Đăng nhập */}
                    {token ? (
                        <>
                            <button className="btn-outline"> <Link to='/register'>Đăng Ký</Link></button>
                            <button className="btn-filled"> <Link to='/login'>Đăng Nhập</Link></button>
                        </>
                    ) : (
                        <div className="user-profile" ref={dropdownRef}>
                            <div className="avatar-container" onClick={toggleDropdown}>
                                <img
                                    src={logoImage}
                                    alt="User Avatar"
                                    className="user-avatar-img"
                                />
                                <i className="fas fa-caret-down dropdown-arrow"></i>
                            </div>
                            {isDropdownOpen && (
                                <div className="dropdown-menu">
                                    <div className="dropdown-user-info">
                                        <h4>Hải</h4>
                                        <p>phamduyhai2k3@gmail.com</p>
                                    </div>
                                    <hr className="dropdown-divider" />
                                    <ul>
                                        <li><Link to="/my-courses">Khóa học của tôi</Link></li>
                                        <li><Link to="/legal-procedures">Thủ tục pháp lý</Link></li>
                                        <li><Link to="/history">Lịch sử</Link></li>
                                    </ul>
                                    <hr className="dropdown-divider" />
                                    <ul>
                                        <li><Link to="/notifications">Thông báo</Link></li>
                                        <li><Link to="/account-settings">Thiết lập tài khoản</Link></li>
                                    </ul>
                                    <hr className="dropdown-divider" />
                                    <ul>
                                        <li onClick={handleLogout} className="logout-item">Đăng xuất</li>
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
