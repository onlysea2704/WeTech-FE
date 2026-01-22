import React, { useEffect, useState } from "react";
import styles from "./StatsHeader.module.css";
import StatsCard from "../../components/StatsCard/StatsCard";
import { publicAxios } from "../../services/axios-instance";

const StatsHeader = ({ api_url }) => {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await publicAxios.get(api_url);
                const data = res.data; // ✅ axios trả data ở res.data
                const dataArray = [
                    {
                        title: data.card1?.title,
                        value: data.card1?.value ?? 0,
                        percentage: data.card1?.changePercent?.toFixed(2),
                        trend: data.card1?.changePercent >= 0 ? "up" : "down",
                        icon: "👥",
                    },
                    {
                        title: data.card2?.title,
                        value: data.card2?.value ?? 0,
                        percentage: data.card2?.changePercent?.toFixed(2),
                        trend: data.card2?.changePercent >= 0 ? "up" : "down",
                        icon: "📦",
                    },
                    {
                        title: data.card3?.title,
                        value: data.card3?.value ?? 0,
                        percentage: data.card3?.changePercent?.toFixed(2),
                        trend: data.card3?.changePercent >= 0 ? "up" : "down",
                        icon: "📈",
                    },
                    {
                        title: data.card4?.title,
                        value: data.card4?.value ?? 0,
                        icon: "⏱️",
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
            {/* <div className={styles["header-stat"]}>
                <div className={styles["customer-info"]}>
                    <i className={`fa-solid fa-user ${styles["customer-icon"]}`}></i>
                    <h1 className={styles["customer-name"]}>Khách Hàng</h1>
                </div>

                <nav className={styles["navigation-tabs"]}>
                    <button className={`${styles["nav-button"]} ${styles.active}`}>Khoá học</button>
                    <button className={styles["nav-button"]}>Thủ tục</button>
                </nav>

                <div className={styles["notification-area"]}>
                    <div className={styles["notification-bell"]}>
                        <i className="fa-regular fa-bell"></i>
                        <span className={styles["notification-dot"]}></span>
                    </div>
                </div>
            </div> */}
            <div style={{ height: "40px" }}></div>
            <div className={styles["list-stat-card"]}>
                {stats.map((item, index) => (
                    <StatsCard key={index} {...item} />
                ))}
            </div>
        </div>
    );
};

export default StatsHeader;
