import React, { useState, useEffect } from "react";
import "./ListCustomer.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import TableComponent from "../../../components/TableComponent/TableComponent";
import StatsHeader from "../../../components/StatsHeader/StatsHeader";
import { publicAxios } from "../../../services/axios-instance";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


const ListCustomer = () => {
  const columns = [
    { headerName: "ID", field: "userId" },
    { headerName: "Họ tên", field: "fullname" },
    { headerName: "Số điện thoại", field: "sdt" },
    { headerName: "Email", field: "email" },
    { headerName: "Vai trò", field: "role" },
    { headerName: "Ngày tạo", field: "created" },
  ];

  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 Hàm xuất dữ liệu ra Excel
  const exportToExcel = () => {
    if (data.length === 0) {
      alert("Không có dữ liệu để xuất!");
      return;
    }

    // Tạo dữ liệu theo cấu trúc bảng
    const worksheetData = data.map((item) => ({
      ID: item.userId,
      "Họ tên": item.fullname,
      "Số điện thoại": item.sdt,
      Email: item.email,
      "Vai trò": item.role,
      "Ngày tạo": item.created,
    }));

    // Tạo worksheet và workbook
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DanhSachKhachHang");

    // Xuất file
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `DanhSachKhachHang_${new Date().toLocaleDateString("vi-VN")}.xlsx`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await publicAxios.get("/stats/user/get-all");
        const formattedData = res.data.map((user) => ({
          ...user,
          created: new Date(user.created).toLocaleDateString("vi-VN"), // 🔹 chỉ hiển thị ngày-tháng-năm
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Lỗi khi tải danh sách user:", error);
      }
    };
    fetchUsers();
  }, []);

  // Tính toán phân trang
  const totalItems = data.length;
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginatedData = data.slice(start, end);

  return (
    <div className="dash-board-page">
      <Sidebar />
      <div className="dash-board-container">
        <StatsHeader api_url='/stats/customer/get-info-card' />

        <div className="toolbar-container">
          <div className="toolbar-left">
            <h1 className="toolbar-title">Danh sách khách hàng</h1>
          </div>

          <div className="toolbar-right">
            <button className="export-button" onClick={exportToExcel}>
              <i className="fa-solid fa-file-excel"></i>
              <span>Export to Excel</span>
            </button>

            <div className="search-box-table">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Tìm kiếm..." />
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

export default ListCustomer;
