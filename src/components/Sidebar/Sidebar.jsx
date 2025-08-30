import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* User Info */}
      <div className="sidebar-header">
        <img
          src="https://via.placeholder.com/50" // thay avatar thật vào
          alt="avatar"
          className="sidebar-avatar"
        />
        <div>
          <h3 className="sidebar-title">Admin Panel</h3>
          <p className="sidebar-username">admin1 <i className="fa-solid fa-caret-down"></i></p>
        </div>
      </div>

      {/* Menu */}
      <div className="sidebar-menu">
        <div className="menu-item active">
          <i className="fa-solid fa-table-cells-large menu-icon"></i>
          <span>Dash Board</span>
        </div>
        <div className="menu-item">
          <i className="fa-solid fa-users menu-icon"></i>
          <span>Khách hàng</span>
        </div>
        <div className="menu-item">
          <i className="fa-solid fa-clipboard-list menu-icon"></i>
          <span>Doanh số</span>
        </div>
        <div className="menu-item">
          <i className="fa-solid fa-calendar-days menu-icon"></i>
          <span>Gia hạn</span>
        </div>
        <div className="menu-item">
          <i className="fa-solid fa-comments menu-icon"></i>
          <span>Tư vấn</span>
        </div>
        <div className="menu-item">
          <i className="fa-solid fa-circle-question menu-icon"></i>
          <span>Câu hỏi</span>
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
