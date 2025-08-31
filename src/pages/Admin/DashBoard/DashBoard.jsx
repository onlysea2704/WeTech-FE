import React, { useState, useEffect } from "react";
import "./DashBoard.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import TableComponent from "../../../components/TableComponent/TableComponent";
import StatsCard from "../../../components/StatsCard/StatsCard";
import StatsHeader from "../../../components/StatsHeader/StatsHeader";
import CourseTable from "../../../components/CourseTable/CourseTable";

const DashBoard = () => {

  const columns = [
    { headerName: "ID", field: "id" },
    { headerName: "Tên", field: "name" },
    { headerName: "Email", field: "email" },
    { headerName: "Address", field: "email" },
    { headerName: "Birthday", field: "email" },
  ];

  const allData = Array.from({ length: 42 }, (_, i) => ({
    id: i + 1,
    name: `Người dùng ${i + 1}`,
    email: `user${i + 1}@gmail.com`,
  }));

  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = allData.length;

  useEffect(() => {
    // Giả lập gọi API server: lấy slice dữ liệu theo page
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    setData(allData.slice(start, end));
  }, [currentPage, pageSize]);

  return (
    <div className="dash-board-page">
      <Sidebar />
      <div className="dash-board-container">
        <StatsHeader />
        <TableComponent
          columns={columns}
          data={data}
          pageSize={pageSize}
          currentPage={currentPage}
          totalItems={totalItems}
          onPageChange={(page) => setCurrentPage(page)}
          onPageSizeChange={(pageSize) => setPageSize(pageSize)}
        />
        {/* <CourseTable/> */}
      </div>
    </div>
  );
};

export default DashBoard;
