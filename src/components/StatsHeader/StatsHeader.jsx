import React from "react";
import "./StatsHeader.css";
import StatsCard from "../../components/StatsCard/StatsCard";

const StatsHeader = () => {

    const stats = [
        { title: "Khóa học", value: "230", icon: "👥", trend: "up", percentage: 8.5 },
        { title: "Thủ tục pháp lý", value: "215", icon: "📦", trend: "up", percentage: 1.3 },
        { title: "Tổng doanh thu", value: "22M", icon: "📈", trend: "down", percentage: 4.3 },
        { title: "Thủ tục hoàn thành", value: "35", icon: "⏱️" },
    ];

    return (

        <div>
            <div className="header-stat">
                {/* Phần thông tin khách hàng bên trái */}
                <div className="customer-info">
                    <i className="fa-solid fa-user customer-icon"></i>
                    <h1 className="customer-name">Khách Hàng</h1>
                </div>

                {/* Phần điều hướng ở giữa */}
                <nav className="navigation-tabs">
                    <button className="nav-button active">Khoá học</button>
                    <button className="nav-button">Thủ tục</button>
                </nav>

                {/* Phần thông báo bên phải */}
                <div className="notification-area">
                    <div className="notification-bell">
                        <i className="fa-regular fa-bell"></i>
                        <span className="notification-dot"></span>
                    </div>
                </div>
            </div>
            <div className="list-stat-card">
                {stats.map((item, index) => (
                    <StatsCard key={index} {...item} />
                ))}
            </div>
        </div>
    );
};

export default StatsHeader;
