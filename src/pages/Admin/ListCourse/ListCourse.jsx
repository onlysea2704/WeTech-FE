import React, { useState, useEffect } from "react";
import "./ListCourse.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import TableComponent from "../../../components/TableComponent/TableComponent";

const ListCourse = () => {

    const columns = [
        { headerName: "Họ tên", field: "name" },
        { headerName: "Số điện thoại", field: "name" },
        { headerName: "Email", field: "email" },
        { headerName: "Khóa học", field: "email" },
        { headerName: "Ngày đăng ký", field: "email" },
    ];

    const allData = Array.from({ length: 42 }, (_, i) => ({
        id: i + 1,
        name: `Người dùng ${i + 1}`,
        email: `user${i + 1}@gmail.com`,
    }));

    const [data, setData] = useState([]);
    const [pageSize, setPageSize] = useState(9);
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
            <div className="manage-course-container">
                <div className="toolbar-container">
                    {/* Phần bên trái */}
                    <div className="toolbar-left">
                        <h1 className="toolbar-title">Danh sách khóa học</h1>
                    </div>

                    {/* Phần bên phải */}
                    <div className="toolbar-right">
                        <button className="export-button">
                            <span>Tạo khóa học mới</span>
                        </button>

                        <div className="search-box-table">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input type="text" placeholder="Search" />
                        </div>

                        <div className="sort-dropdown-wrapper">
                            <select className="sort-dropdown">
                                <option value="newest">Short : Mới nhất</option>
                                <option value="oldest">Short : Cũ nhất</option>
                                <option value="name_asc">Short : A-Z</option>
                            </select>
                        </div>
                    </div>
                </div>

                <TableComponent
                    columns={columns}
                    data={data}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    totalItems={totalItems}
                    onPageChange={(page) => setCurrentPage(page)}
                    onPageSizeChange={(pageSize) => setPageSize(pageSize)}
                />
            </div>
        </div>
    );
};

export default ListCourse;
