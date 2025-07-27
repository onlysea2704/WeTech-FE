import React from 'react';
import './NavBar.css';
import logoImage from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
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
                    <li>TRANG CHỦ</li>
                    <li>GIỚI THIỆU</li>
                    <li>DỊCH VỤ PHÁP LÝ</li>
                    <li>KHÓA HỌC</li>
                    <li>LIÊN HỆ</li>
                </ul>

                <div className="navbar-right">
                    <div className="search-box">
                        <i className="fas fa-search search-icon"></i>
                        <input className='search-navbar' type="text" placeholder="Tìm kiếm" />
                    </div>

                    <i className="fas fa-shopping-cart cart-icon"></i>

                    <button className="btn-outline"> <Link to='/register'>Đăng Ký</Link></button>
                    <button className="btn-filled"> <Link to='/login'>Đăng Nhập</Link></button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
