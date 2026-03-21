import React, { useState, useEffect } from "react";
import styles from "./ListProcedure.module.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import TableComponent from "../../../components/TableComponent/TableComponent";
import { authAxios, publicAxios } from "../../../services/axios-instance";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../hooks/useNotification";

const ListProcedure = () => {
    const navigate = useNavigate();
    const { showSuccess, showError } = useNotification();

    const columns = [
        { headerName: "ID Thủ tục", field: "procedureId" },
        { headerName: "Tên thủ tục", field: "title" },
        { headerName: "Loại công ty", field: "typeCompany" },
        { headerName: "Giá", field: "realPrice" },
    ];

    // --- STATE QUẢN LÝ DỮ LIỆU ---
    const [allProcedures, setAllProcedures] = useState([]); // Dữ liệu gốc từ API
    const [data, setData] = useState([]); // Dữ liệu hiển thị trên bảng (sau khi filter/page)

    // --- STATE PHÂN TRANG & TÌM KIẾM ---
    const [pageSize, setPageSize] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
    const [sortOption, setSortOption] = useState("newest"); // Tùy chọn sắp xếp

    const onManageEditProcedure = (procedureId) => {
        window.scrollTo(0, 0);
        navigate(`/manage-procedure/${procedureId}`);
    };

    // --- CORE LOGIC: SEARCH -> SORT -> PAGINATE ---
    useEffect(() => {
        let processedData = [...allProcedures];

        // 1. Xử lý Tìm kiếm (Search)
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            processedData = processedData.filter((procedure) => {
                // Tìm theo tên thủ tục hoặc ID (bạn có thể thêm field khác nếu muốn)
                return procedure.title?.toLowerCase().includes(lowerTerm) || String(procedure.procedureId).includes(lowerTerm);
            });
        }

        // 2. Xử lý Sắp xếp (Sort)
        switch (sortOption) {
            case "newest":
                // Giả sử ID lớn hơn là mới hơn (hoặc dùng field ngày tháng nếu có)
                processedData.sort((a, b) => b.procedureId - a.procedureId);
                break;
            case "oldest":
                processedData.sort((a, b) => a.procedureId - b.procedureId);
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
    }, [allProcedures, searchTerm, sortOption, currentPage, pageSize]);

    // --- API CALLS ---
    const fetchProcedures = async () => {
        try {
            const res = await publicAxios.get("/api/procedurer/get-all");
            const procedures = res.data || [];
            // Lưu vào allProcedures, useEffect ở trên sẽ tự động tính toán data hiển thị
            setAllProcedures(procedures);
        } catch (error) {
            console.error("Lỗi khi tải danh sách thủ tục:", error);
        }
    };

    useEffect(() => {
        fetchProcedures();
    }, []);

    // --- HANDLERS ---
    const handleCreateProcedure = () => {
        navigate("/create-procedure");
    };

    const handleDeleteProcedure = async (procedure) => {
        const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa thủ tục "${procedure.title}" không?`);
        if (!confirmDelete) return;

        try {
            const response = await publicAxios.post(`/api/procedurer/delete?procedureId=${procedure.procedureId}`);
            if (response.data === true && response.status === 200) {
                showSuccess("Xóa thủ tục thành công!");
                fetchProcedures();
            } else {
                showError("Xóa thủ tục thất bại!");
            }
        } catch (error) {
            showError("Xóa thủ tục thất bại!");
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
            <div className={styles["manage-procedure-container"]}>
                <div className={styles["toolbar-container"]}>
                    {/* Phần bên trái */}
                    <div className={styles["toolbar-left"]}>
                        <h1 className={styles["toolbar-title"]}>Danh sách thủ tục pháp lý</h1>
                    </div>

                    {/* Phần bên phải */}
                    <div className={styles["toolbar-right"]}>
                        <button className={styles["export-button"]} onClick={handleCreateProcedure}>
                            <span>Tạo thủ tục mới</span>
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
                    onEdit={onManageEditProcedure}
                    onDelete={handleDeleteProcedure}
                />
            </div>
        </div>
    );
};

export default ListProcedure;
