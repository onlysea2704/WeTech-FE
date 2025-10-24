import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import imageAdmin from "../../assets/avatar_user.png";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hàm kiểm tra active
  const isActive = (path) => location.pathname === path;

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    sessionStorage.clear(); // hoặc sessionStorage.removeItem("tên_key");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      {/* User Info */}
      <div className="sidebar-header">
        <img src={imageAdmin} alt="avatar" className="sidebar-avatar" />
        <div>
          <h3 className="sidebar-title">Admin Panel</h3>
          <p className="sidebar-username">
            admin1 <i className="fa-solid fa-caret-down"></i>
          </p>
        </div>
      </div>

      {/* Menu */}
      <div className="sidebar-menu">
        <Link to="/dashboard" className={`menu-item ${isActive("/dashboard") ? "active" : ""}`}>
          <i className="fa-solid fa-table-cells-large menu-icon"></i>
          <span>Dashboard</span>
        </Link>

        <Link to="/list-course" className={`menu-item ${isActive("/list-course") ? "active" : ""}`}>
          <i className="fa-solid fa-graduation-cap menu-icon"></i>
          <span>Khóa học</span>
        </Link>

        <Link to="/list-course" className={`menu-item ${isActive("/renew") ? "active" : ""}`}>
          <i className="fa-solid fa-calendar-days menu-icon"></i>
          <span>Thủ tục pháp lý</span>
        </Link>

        <Link to="/list-customer" className={`menu-item ${isActive("/list-customer") ? "active" : ""}`}>
          <i className="fa-solid fa-user menu-icon"></i>
          <span>Khách hàng</span>
        </Link>

        <Link to="/sales" className={`menu-item ${isActive("/sales") ? "active" : ""}`}>
          <i className="fa-solid fa-clipboard-list menu-icon"></i>
          <span>Giao dịch</span>
        </Link>

        <Link to="/sales" className={`menu-item ${isActive("/consult") ? "active" : ""}`}>
          <i className="fa-solid fa-comments menu-icon"></i>
          <span>Tư vấn</span>
        </Link>

        <Link to="/sales" className={`menu-item ${isActive("/questions") ? "active" : ""}`}>
          <i className="fa-solid fa-circle-question menu-icon"></i>
          <span>Câu hỏi</span>
        </Link>

        {/* Đăng xuất */}
        <div className={`menu-item ${isActive("/questions") ? "active" : ""}`} onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket menu-icon"></i>
          <span>Đăng xuất</span>
        </div>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <h4>WETECH</h4>
        <p>Version: 1.0.0</p>
      </div>
    </div>
  );
};

export default Sidebar;
