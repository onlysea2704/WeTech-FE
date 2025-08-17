import React, { useState, useRef, useEffect } from 'react';
import './NavBar.css';
import logoImage from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    
    // SỬA: Đổi tên state để rõ ràng hơn
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    // MỚI: State để quản lý dropdown của Dịch vụ pháp lý
    const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

    const navigate = useNavigate();

    // SỬA: Đổi tên ref để rõ ràng hơn
    const userDropdownRef = useRef(null); 
    // MỚI: Ref cho dropdown của Dịch vụ pháp lý
    const servicesDropdownRef = useRef(null);

    // SỬA: Đổi tên hàm để rõ ràng hơn
    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
        setIsServicesDropdownOpen(false); // Đóng dropdown kia khi mở dropdown này
    };

    // MỚI: Hàm để bật/tắt dropdown Dịch vụ pháp lý
    const toggleServicesDropdown = () => {
        setIsServicesDropdownOpen(!isServicesDropdownOpen);
        setIsUserDropdownOpen(false); // Đóng dropdown kia khi mở dropdown này
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsUserDropdownOpen(false);
        navigate('/login');
    };

    // SỬA: useEffect này giờ chỉ quản lý việc click ngoài dropdown của user
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

    // MỚI: useEffect để quản lý việc click ngoài dropdown của Dịch vụ pháp lý
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
            {/* Dải màu xanh đậm phía trên */}
            <div className="navbar-top-bar"></div>

            {/* Phần navbar chính */}
            <div className="navbar-container">
                <div className="navbar-left">
                    <img src={logoImage} alt="WE-TECH Logo" className="logo" />
                </div>

                <ul className="navbar-menu">
                    <li><Link to="/">TRANG CHỦ</Link></li>
                    <li><Link to="/about">GIỚI THIỆU</Link></li>

                    {/* SỬA: Thay thế Link bằng cấu trúc dropdown */}
                    <li className="menu-item-dropdown" ref={servicesDropdownRef}>
                        <div className="dropdown-toggle" onClick={toggleServicesDropdown}>
                            DỊCH VỤ PHÁP LÝ <i className="fas fa-caret-down"></i>
                        </div>
                        {isServicesDropdownOpen && (
                            <div className="dropdown-menu">
                                <ul>
                                    {/* Thay thế bằng các link dịch vụ của bạn */}
                                    <li><Link to="/list-procedures/business-setup">Thành lập doanh nghiệp</Link></li>
                                    <li><Link to="/list-procedures/intellectual-property">Sở hữu trí tuệ</Link></li>
                                    <li><Link to="/list-procedures/investment-consulting">Tư vấn đầu tư</Link></li>
                                    <li><Link to="/list-procedures/all">Xem tất cả dịch vụ</Link></li>
                                </ul>
                            </div>
                        )}
                    </li>

                    <li><Link to="/list-courses">KHÓA HỌC</Link></li>
                    <li><Link to="/contact-us">LIÊN HỆ</Link></li>
                </ul>

                <div className="navbar-right">
                    <div className="search-box">
                        <i className="fas fa-search search-icon"></i>
                        <input className='search-navbar' type="text" placeholder="Tìm kiếm" />
                    </div>

                    <i className="fas fa-shopping-cart cart-icon"></i>

                    {/* SỬA: Sửa lại logic hiển thị. Nếu KHÔNG có token -> hiện nút Đăng nhập */}
                    {token ? (
                        <>
                            <button className="btn-outline"> <Link to='/register'>Đăng Ký</Link></button>
                            <button className="btn-filled"> <Link to='/login'>Đăng Nhập</Link></button>
                        </>
                    ) : (
                        // Nếu CÓ token -> hiện avatar người dùng
                        <div className="user-profile" ref={userDropdownRef}>
                            <div className="avatar-container" onClick={toggleUserDropdown}>
                                <img
                                    src={logoImage} // Thay bằng avatar thật của user
                                    alt="User Avatar"
                                    className="user-avatar-img"
                                />
                                <i className="fas fa-caret-down dropdown-arrow"></i>
                            </div>
                            {isUserDropdownOpen && (
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