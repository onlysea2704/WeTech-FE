import React, { useState, useEffect } from "react";
import "./ListCustomer.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import TableComponent from "../../../components/TableComponent/TableComponent";
import StatsHeader from "../../../components/StatsHeader/StatsHeader";
import { publicAxios } from "../../../services/axios-instance";
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

  // --- STATE QUẢN LÝ DỮ LIỆU ---
  const [allUsers, setAllUsers] = useState([]); // Dữ liệu gốc từ API
  const [filteredData, setFilteredData] = useState([]); // Dữ liệu sau khi lọc/search (dùng để export Excel)
  const [displayedData, setDisplayedData] = useState([]); // Dữ liệu hiển thị trên bảng (đã phân trang)

  // --- STATE TÌM KIẾM, SẮP XẾP & PHÂN TRANG ---
  const [pageSize, setPageSize] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  // --- CORE LOGIC: SEARCH -> SORT -> PAGINATE ---
  useEffect(() => {
    let processed = [...allUsers];

    // 1. Tìm kiếm (Search)
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      processed = processed.filter((item) => {
        return (
          item.fullname?.toLowerCase().includes(lowerTerm) ||
          item.email?.toLowerCase().includes(lowerTerm) ||
          item.sdt?.includes(searchTerm) ||
          String(item.userId).includes(lowerTerm)
        );
      });
    }

    // 2. Sắp xếp (Sort)
    switch (sortOption) {
      case "newest":
        // Sử dụng rawCreated để so sánh thời gian chính xác
        processed.sort((a, b) => new Date(b.rawCreated) - new Date(a.rawCreated));
        break;
      case "oldest":
        processed.sort((a, b) => new Date(a.rawCreated) - new Date(b.rawCreated));
        break;
      case "name_asc":
        processed.sort((a, b) => {
          // Nếu fullname là null/undefined thì coi như là chuỗi rỗng ""
          const nameA = a.fullname || "";
          const nameB = b.fullname || "";
          return nameA.localeCompare(nameB);
        });
        break;
      default:
        break;
    }

    // Lưu dữ liệu đã lọc (nhưng chưa cắt trang) để dùng cho Export Excel
    setFilteredData(processed);
    setTotalItems(processed.length);

    // 3. Phân trang (Paginate)
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    setDisplayedData(processed.slice(start, end));

  }, [allUsers, searchTerm, sortOption, currentPage, pageSize]);

  // --- API CALL ---
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await publicAxios.get("/stats/user/get-all");
        const formattedData = res.data.map((user) => ({
          ...user,
          // Lưu giá trị gốc để sort cho đúng
          rawCreated: user.created,
          // Format lại để hiển thị đẹp
          created: new Date(user.created).toLocaleDateString("vi-VN"),
        }));
        setAllUsers(formattedData);
      } catch (error) {
        console.error("Lỗi khi tải danh sách user:", error);
      }
    };
    fetchUsers();
  }, []);

  // --- EXPORT EXCEL ---
  const exportToExcel = () => {
    // Xuất dữ liệu từ filteredData (kết quả tìm kiếm) thay vì chỉ trang hiện tại
    if (filteredData.length === 0) {
      alert("Không có dữ liệu để xuất!");
      return;
    }

    const worksheetData = filteredData.map((item) => ({
      ID: item.userId,
      "Họ tên": item.fullname,
      "Số điện thoại": item.sdt,
      Email: item.email,
      "Vai trò": item.role,
      "Ngày tạo": item.created,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DanhSachKhachHang");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `DanhSachKhachHang_${new Date().toLocaleDateString("vi-VN")}.xlsx`);
  };

  // --- HANDLERS ---
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1); // Reset về trang 1 khi sắp xếp
  };

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
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, email, sdt..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <div className="sort-dropdown-wrapper">
              <select
                className="sort-dropdown"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="newest">Sắp xếp: Mới nhất</option>
                <option value="oldest">Sắp xếp: Cũ nhất</option>
                <option value="name_asc">Sắp xếp: A-Z</option>
              </select>
            </div>
          </div>
        </div>

        <TableComponent
          columns={columns}
          data={displayedData} // Truyền dữ liệu đã xử lý
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