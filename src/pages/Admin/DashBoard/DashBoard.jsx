import React, { useState, useEffect } from "react";
import "./DashBoard.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import TableComponent from "../../../components/TableComponent/TableComponent";
import StatsHeader from "../../../components/StatsHeader/StatsHeader";
import { publicAxios } from "../../../services/axios-instance";

const DashBoard = () => {
  // ✅ Cột tương ứng với CourseCategoryStatsDTO
  const columns = [
    { headerName: "Danh mục", field: "categoryName" },
    { headerName: "Số khóa học", field: "courseCount" },
    { headerName: "Số khách hàng", field: "buyerCount" },
    { headerName: "Doanh thu (VNĐ)", field: "revenue" },
    { headerName: "Tỷ lệ (%)", field: "percentage" },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // ✅ Gọi API trả về danh sách CourseCategoryStatsDTO
        const res = await publicAxios.get("/stats/dashboard/stats-by-category");

        const totalRevenue = res.data.reduce(
          (sum, item) => sum + (item.revenue || 0),
          0
        );
        const formattedData = res.data.map((item, index) => {
          const percentage =
            totalRevenue > 0 ? (item.revenue / totalRevenue) * 100 : 0;

          return {
            id: index + 1,
            categoryName: item.categoryName,
            courseCount: item.courseCount,
            buyerCount: item.buyerCount,
            revenue: item.revenue?.toLocaleString("vi-VN") || 0,
            percentage: `${percentage.toFixed(2)}%`,
          };
        });

        setData(formattedData);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu CourseCategoryStatsDTO:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dash-board-page">
      <Sidebar />
      <div className="dash-board-container">
        <StatsHeader api_url={'/stats/dashboard/get-info-card'} />

        <div className="toolbar-container">
          <div className="toolbar-left">
            <h1 className="toolbar-title">Thống kê danh mục khóa học</h1>
          </div>
          <div className="toolbar-right">
            <div className="sort-dropdown-wrapper">
              <select className="sort-dropdown">
                <option value="1">Tháng 1</option>
                <option value="2">Tháng 2</option>
                <option value="3">Tháng 3</option>
              </select>
            </div>
          </div>
        </div>

        <TableComponent
          columns={columns}
          data={data}
          pageSize={7}
          currentPage={1}
          totalItems={data.length}
          loading={loading}
          onPageChange={() => { }}
          onPageSizeChange={() => { }}
          showActions={false}
        />
      </div>
    </div>
  );
};

export default DashBoard;
