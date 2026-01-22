import React, { useState, useEffect } from "react";
import styles from "./ListCourse.module.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import TableComponent from "../../../components/TableComponent/TableComponent";
import { authAxios, publicAxios } from "../../../services/axios-instance";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../hooks/useNotification";

const ListCourse = () => {
    const navigate = useNavigate();
    const { showSuccess, showError } = useNotification();

    const columns = [
        { headerName: "ID Khóa học", field: "courseId" },
        { headerName: "Tên khóa học", field: "title" },
        { headerName: "Loại khóa học", field: "typeCourse" },
        { headerName: "Giá gốc", field: "realPrice" },
        { headerName: "Giá bán", field: "salePrice" },
    ];

    // --- STATE QUẢN LÝ DỮ LIỆU ---
    const [allCourses, setAllCourses] = useState([]); // Dữ liệu gốc từ API
    const [data, setData] = useState([]); // Dữ liệu hiển thị trên bảng (sau khi filter/page)

    // --- STATE PHÂN TRANG & TÌM KIẾM ---
    const [pageSize, setPageSize] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
    const [sortOption, setSortOption] = useState("newest"); // Tùy chọn sắp xếp

    const onManageEditCourse = (courseId) => {
        window.scrollTo(0, 0);
        navigate(`/manage-course/${courseId}`);
    };

    // --- CORE LOGIC: SEARCH -> SORT -> PAGINATE ---
    useEffect(() => {
        let processedData = [...allCourses];

        // 1. Xử lý Tìm kiếm (Search)
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            processedData = processedData.filter((course) => {
                // Tìm theo tên khóa học hoặc ID (bạn có thể thêm field khác nếu muốn)
                return course.title?.toLowerCase().includes(lowerTerm) || String(course.courseId).includes(lowerTerm);
            });
        }

        // 2. Xử lý Sắp xếp (Sort)
        switch (sortOption) {
            case "newest":
                // Giả sử ID lớn hơn là mới hơn (hoặc dùng field ngày tháng nếu có)
                processedData.sort((a, b) => b.courseId - a.courseId);
                break;
            case "oldest":
                processedData.sort((a, b) => a.courseId - b.courseId);
                break;
            case "name_asc":
                processedData.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                break;
        }

        // 3. Cập nhật tổng số item sau khi lọc (để phân trang đúng)
        setTotalItems(processedData.length);

        // 4. Xử lý Phân trang (Paginate)
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        setData(processedData.slice(start, end));
    }, [allCourses, searchTerm, sortOption, currentPage, pageSize]);

    // --- API CALLS ---
    const fetchCourses = async () => {
        try {
            const res = await publicAxios.get("/api/course/get-all");
            const courses = res.data || [];
            // Lưu vào allCourses, useEffect ở trên sẽ tự động tính toán data hiển thị
            setAllCourses(courses);
        } catch (error) {
            console.error("Lỗi khi tải danh sách khóa học:", error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // --- HANDLERS ---
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

    const handleDeleteCourse = async (course) => {
        const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa khóa học "${course.title}" không?`);
        if (!confirmDelete) return;

        try {
            const response = await publicAxios.get(`/api/course/delete-course?courseId=${course.courseId}`);
            if (response.data === true) {
                showSuccess("Xóa khóa học thành công!");
                fetchCourses();
            } else {
                showError("Xóa khóa học thất bại!");
            }
        } catch (error) {
            showError("Xóa khóa học thất bại!");
        }
    };

    // Reset về trang 1 khi search hoặc sort thay đổi
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className={styles["dash-board-page"]}>
            <Sidebar />
            <div className={styles["manage-course-container"]}>
                <div className={styles["toolbar-container"]}>
                    {/* Phần bên trái */}
                    <div className={styles["toolbar-left"]}>
                        <h1 className={styles["toolbar-title"]}>Danh sách khóa học</h1>
                    </div>

                    {/* Phần bên phải */}
                    <div className={styles["toolbar-right"]}>
                        <button className={styles["export-button"]} onClick={handleCreateCourse}>
                            <span>Tạo khóa học mới</span>
                        </button>

                        <div className={styles["search-box-table"]}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input
                                type="text"
                                placeholder="Search by name or ID..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>

                        <div className={styles["sort-dropdown-wrapper"]}>
                            <select className={styles["sort-dropdown"]} value={sortOption} onChange={handleSortChange}>
                                <option value="newest">Sort: Mới nhất</option>
                                <option value="oldest">Sort: Cũ nhất</option>
                                <option value="name_asc">Sort: A-Z</option>
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
