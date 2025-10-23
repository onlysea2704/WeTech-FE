import React, { useEffect, useState } from "react";
import "./StatsHeader.css";
import StatsCard from "../../components/StatsCard/StatsCard";
import { publicAxios } from "../../services/axios-instance";

const StatsHeader = ({api_url}) => {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await publicAxios.get(api_url);
                const data = res.data; // ✅ axios trả data ở res.data
                
                console.log("Dữ liệu nhận được từ API:", data);

                const dataArray = [
                    {
                        title: data.courseRevenue?.title,
                        value: data.courseRevenue?.value ?? 0,
                        percentage: data.courseRevenue?.changePercent?.toFixed(2),
                        trend: data.courseRevenue?.changePercent >= 0 ? "up" : "down",
                        icon: "👥"
                    },
                    {
                        title: data.procedureRevenue?.title,
                        value: data.procedureRevenue?.value ?? 0,
                        percentage: data.procedureRevenue?.changePercent?.toFixed(2),
                        trend: data.procedureRevenue?.changePercent >= 0 ? "up" : "down",
                        icon: "📦"
                    },
                    {
                        title: data.totalRevenue?.title,
                        value: data.totalRevenue?.value ?? 0,
                        percentage: data.totalRevenue?.changePercent?.toFixed(2),
                        trend: data.totalRevenue?.changePercent >= 0 ? "up" : "down",
                        icon: "📈"
                    },
                    {
                        title: "Tổng số khóa học",
                        value: data.totalCourses ?? 0,
                        icon: "⏱️"
                    },
                ];

                setStats(dataArray);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        fetchStats();
    }, []);

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
