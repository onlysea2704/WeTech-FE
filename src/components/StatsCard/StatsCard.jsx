import React from "react";
import styles from "./StatsCard.module.css";

const StatsCard = ({ title, value, icon, trend, percentage }) => {
    const formattedValue = typeof value === "number" ? value.toLocaleString("vi-VN") : value;

    return (
        <div className={styles["stats-card"]}>
            <div className={styles["stats-header"]}>
                <span className={styles["stats-title"]}>{title}</span>
                <span className={styles["stats-icon"]}>{icon}</span>
            </div>
            <div className={styles["stats-value"]}>{formattedValue}</div>
            {percentage && (
                <div
                    className={`${styles["stats-trend"]} ${trend === "up" ? styles["trend-up"] : styles["trend-down"]}`}
                >
                    {trend === "up" ? "▲" : "▼"} {percentage}% Tháng này
                </div>
            )}
        </div>
    );
};

export default StatsCard;
