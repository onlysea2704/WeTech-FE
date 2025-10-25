import React, { useState, useEffect } from "react";
import "./Transactions.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import TableComponent from "../../../components/TableComponent/TableComponent";
import StatsHeader from "../../../components/StatsHeader/StatsHeader";
import { publicAxios } from "../../../services/axios-instance"; // ✅ import axios instance

const Transactions = () => {
  const columns = [
    { headerName: "STT", field: "stt" },
    { headerName: "Họ tên", field: "fullname" },
    { headerName: "Liên hệ", field: "sdt" },
    { headerName: "Mã giao dịch", field: "code" },
    { headerName: "Doanh thu (VNĐ)", field: "transferAmount" },
    { headerName: "Ngày giao dịch", field: "transactionDate" },
    { headerName: "Trạng thái", field: "status" },
  ];

  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // 🧩 Gọi API lấy dữ liệu thật
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await publicAxios.get("/stats/transaction/get-data-table"); // ✅ Gọi API backend
        const transactions = res.data.map((item, index) => ({
          stt: index + 1,
          fullname: item.fullName,
          sdt: item.sdt,
          code: item.code,
          transferAmount: `${item.transferAmount?.toLocaleString("vi-VN") || "0"} đ`,
          transactionDate: new Date(item.transactionDate).toLocaleString("vi-VN"),
          status: item.status,
        }));
        setTotalItems(transactions.length);
        setData(transactions); // hiển thị page đầu tiên
      } catch (error) {
        console.error("Lỗi khi tải danh sách giao dịch:", error);
      }
    };
    fetchTransactions();
  }, []);

  // Tính toán phân trang
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginatedData = data.slice(start, end);

  return (
    <div className="dash-board-page">
      <Sidebar />
      <div className="dash-board-container">
        <StatsHeader api_url="/stats/monthly/get-info-card" />

        <div className="toolbar-container">
          <div className="toolbar-left">
            <h1 className="toolbar-title">Danh sách giao dịch</h1>
          </div>

          <div className="toolbar-right">
            <button className="export-button">
              <i className="fa-solid fa-file-excel"></i>
              <span>Export to Excel</span>
            </button>

            <div className="search-box-table">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Search" />
            </div>

            <div className="sort-dropdown-wrapper">
              <select className="sort-dropdown">
                <option value="newest">Sắp xếp: Mới nhất</option>
                <option value="oldest">Sắp xếp: Cũ nhất</option>
                <option value="name_asc">Sắp xếp: A-Z</option>
              </select>
            </div>
          </div>
        </div>

        <TableComponent
          columns={columns}
          data={paginatedData}
          pageSize={pageSize}
          currentPage={currentPage}
          totalItems={totalItems}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          showActions={false}
        />
      </div>
    </div>
  );
};

export default Transactions;
