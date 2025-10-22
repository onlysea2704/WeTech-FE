import React from "react";
import "./StatsCard.css";

const StatsCard = ({ title, value, icon, trend, percentage }) => {
  const formattedValue =
    typeof value === "number" ? value.toLocaleString("vi-VN") : value;

  return (
    <div className="stats-card">
      <div className="stats-header">
        <span className="stats-title">{title}</span>
        <span className="stats-icon">{icon}</span>
      </div>
      <div className="stats-value">{formattedValue}</div>
      {percentage && (
        <div
          className={`stats-trend ${
            trend === "up" ? "trend-up" : "trend-down"
          }`}
        >
          {trend === "up" ? "▲" : "▼"} {percentage}% Tháng này
        </div>
      )}
    </div>
  );
};

export default StatsCard;
