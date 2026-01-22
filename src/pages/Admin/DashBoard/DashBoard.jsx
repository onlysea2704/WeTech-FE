import React, { useState, useEffect } from "react";
import styles from "./DashBoard.module.css";
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

    // ✅ Thêm state cho tháng (Mặc định lấy tháng hiện tại của máy tính)
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // ✅ Truyền tham số tháng vào API
                const res = await publicAxios.get("/stats/dashboard/stats-by-category", {
                    params: {
                        month: selectedMonth,
                    },
                });

                const totalRevenue = res.data.reduce((sum, item) => sum + (item.revenue || 0), 0);

                const formattedData = res.data.map((item, index) => {
                    const percentage = totalRevenue > 0 ? (item.revenue / totalRevenue) * 100 : 0;

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
                // Có thể set data rỗng nếu lỗi để tránh bảng bị treo dữ liệu cũ
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedMonth]); // ✅ Thêm selectedMonth vào dependency để gọi lại khi chọn tháng khác

    // ✅ Tạo mảng 12 tháng [1, 2, ..., 12]
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
        <div className={styles["dash-board-page"]}>
            <Sidebar />
            <div className={styles["dash-board-container"]}>
                <StatsHeader api_url={"/stats/dashboard/get-info-card"} />

                <div className={styles["toolbar-container"]}>
                    <div className={styles["toolbar-left"]}>
                        <h1 className={styles["toolbar-title"]}>Thống kê danh mục khóa học</h1>
                    </div>
                    <div className={styles["toolbar-right"]}>
                        <div className={styles["sort-dropdown-wrapper"]}>
                            {/* ✅ Dropdown chọn tháng */}
                            <select
                                className={styles["sort-dropdown"]}
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                            >
                                {months.map((m) => (
                                    <option key={m} value={m}>
                                        Tháng {m}
                                    </option>
                                ))}
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
                    onPageChange={() => {}}
                    onPageSizeChange={() => {}}
                    showActions={false}
                />
            </div>
        </div>
    );
};

export default DashBoard;
