import React from "react";
import "./CourseTable.css";

const CourseTable = () => {
  const data = [
    {
      name: "Thành lập Công ty",
      customers: "50 Khách hàng",
      orders: "70 Đơn hàng",
      revenue: "7M",
      percent: 32,
      color: "#f97316", // cam
    },
    {
      name: "Thành lập HKD",
      customers: "35 Khách hàng",
      orders: "30 Đơn hàng",
      revenue: "4M",
      percent: 18,
      color: "#3b82f6", // xanh dương
    },
    {
      name: "Giải thể Công ty",
      customers: "30 Khách hàng",
      orders: "24 Đơn hàng",
      revenue: "3,7M",
      percent: 17,
      color: "#eab308", // vàng
    },
    {
      name: "Giải thể HKD",
      customers: "30 Khách hàng",
      orders: "16 Đơn hàng",
      revenue: "2,3M",
      percent: 10,
      color: "#22c55e", // xanh lá
    },
    {
      name: "Đăng ký thay đổi",
      customers: "25 Khách hàng",
      orders: "35 Đơn hàng",
      revenue: "1,4M",
      percent: 6,
      color: "#14b8a6", // teal
    },
    {
      name: "Sáp nhập Tỉnh",
      customers: "42 Khách hàng",
      orders: "25 Đơn hàng",
      revenue: "1,6M",
      percent: 7,
      color: "#10b981", // xanh lá nhạt
    },
  ];

  return (
    <div className="course-table-container">
      <div className="table-header">
        <h3>Thống kê chi tiết khoá học</h3>
        <select className="year-select">
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
      </div>
      <table className="course-table">
        <thead>
          <tr>
            <th>Danh mục</th>
            <th>Khách hàng</th>
            <th>Dịch vụ đăng ký</th>
            <th>Doanh thu</th>
            <th>Thống kê</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>
                <div className="category-cell">
                  <img
                    src="https://via.placeholder.com/32" // icon minh hoạ
                    alt="icon"
                    className="category-icon"
                  />
                  {row.name}
                </div>
              </td>
              <td>{row.customers}</td>
              <td>{row.orders}</td>
              <td>{row.revenue}</td>
              <td>
                <div
                  className="stat-box"
                  style={{ backgroundColor: row.color }}
                >
                  {row.percent}%
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
