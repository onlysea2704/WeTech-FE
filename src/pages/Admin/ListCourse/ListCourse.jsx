import React, { useState, useEffect } from "react";
import "./ListCourse.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import TableComponent from "../../../components/TableComponent/TableComponent";
import { authAxios, publicAxios } from "../../../services/axios-instance";
import { useNavigate } from "react-router-dom";

const ListCourse = () => {
    const navigate = useNavigate();

    const columns = [
        { headerName: "ID Khóa học", field: "courseId" },
        { headerName: "Tên khóa học", field: "title" },
        { headerName: "Loại khóa học", field: "typeCourse" },
        { headerName: "Giá gốc", field: "realPrice" },
        { headerName: "Giá bán", field: "salePrice" },
    ];

    const [allCourses, setAllCourses] = useState([]);
    const [data, setData] = useState([]);
    const [pageSize, setPageSize] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const onManageEditCourse = (courseId) => {
        window.scrollTo(0, 0);
        navigate(`/manage-course/${courseId}`);
    };

    useEffect(() => {
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        setData(allCourses.slice(start, end));
    }, [currentPage, pageSize, allCourses]);

    // Gọi API lấy danh sách khóa học
    const fetchCourses = async () => {
        try {
            const res = await publicAxios.get("/api/course/get-all");
            const courses = res.data || [];
            setTotalItems(courses.length);
            setAllCourses(courses);
            setData(courses.slice(0, pageSize));
        } catch (error) {
            console.error("Lỗi khi tải danh sách khóa học:", error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // Hàm tạo khóa học mới
    const handleCreateCourse = async () => {
        try {
            const res = await authAxios.get("/api/course/create-course");
            if (res.data && res.data.courseId) {
                navigate(`/manage-course/${res.data.courseId}`);
            }
        } catch (error) {
            console.error("Lỗi khi tạo khóa học:", error);
        }
    };

    // ✅ Hàm xóa khóa học có xác nhận
    const handleDeleteCourse = async (course) => {
        const confirmDelete = window.confirm(
            `Bạn có chắc chắn muốn xóa khóa học "${course.title}" không?`
        );
        if (!confirmDelete) return;

        try {
            const response = await publicAxios.get(`/api/course/delete-course?courseId=${course.courseId}`);
            if (response.data === true) {
                alert("Xóa khóa học thành công!");
                fetchCourses();
            } else {
                alert("Xóa khóa học thất bại!");
            }
        } catch (error) {
            alert("Xóa khóa học thất bại!");
        }
    };

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
                        <button className="export-button" onClick={handleCreateCourse}>
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
                    onEdit={onManageEditCourse}
                    onDelete={handleDeleteCourse}
                />
            </div>
        </div>
    );
};

export default ListCourse;
