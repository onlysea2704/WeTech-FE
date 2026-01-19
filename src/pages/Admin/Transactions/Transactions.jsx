import React, { useState, useEffect } from "react";
import styles from "./Transactions.module.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import TableComponent from "../../../components/TableComponent/TableComponent";
import StatsHeader from "../../../components/StatsHeader/StatsHeader";
import { publicAxios } from "../../../services/axios-instance";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Transactions = () => {
    const columns = [
        { headerName: "STT", field: "stt" },
        { headerName: "Họ tên", field: "fullname" },
        { headerName: "Liên hệ", field: "phone" },
        { headerName: "Mã GD", field: "code" },
        { headerName: "Doanh thu", field: "transferAmount" },
        { headerName: "Ngày", field: "transactionDate" },
        { headerName: "Mã Thuế", field: "taxCode" },
        { headerName: "Tên công ty", field: "companyName" },
        { headerName: "Địa chỉ", field: "companyAddress" },
        { headerName: "Trạng thái", field: "status" },
    ];

    // --- STATE QUẢN LÝ DỮ LIỆU ---
    const [allTransactions, setAllTransactions] = useState([]); // Dữ liệu gốc
    const [filteredData, setFilteredData] = useState([]); // Dữ liệu sau khi lọc (dùng export Excel)
    const [displayedData, setDisplayedData] = useState([]); // Dữ liệu hiển thị (đã phân trang)

    // --- STATE TÌM KIẾM, SẮP XẾP & PHÂN TRANG ---
    const [pageSize, setPageSize] = useState(7);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("newest");

    // --- CORE LOGIC: SEARCH -> SORT -> PAGINATE ---
    useEffect(() => {
        let processed = [...allTransactions];

        // 1. Tìm kiếm (Search)
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            processed = processed.filter((item) => {
                return (
                    item.fullname?.toLowerCase().includes(lowerTerm) ||
                    item.code?.toLowerCase().includes(lowerTerm) ||
                    item.sdt?.includes(searchTerm)
                );
            });
        }

        // 2. Sắp xếp (Sort)
        switch (sortOption) {
            case "newest":
                // Sắp xếp theo ngày giảm dần (Mới nhất lên đầu)
                processed.sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));
                break;
            case "oldest":
                // Sắp xếp theo ngày tăng dần
                processed.sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate));
                break;
            case "name_asc":
                // Sắp xếp tên A-Z
                processed.sort((a, b) => a.fullname.localeCompare(b.fullname));
                break;
            case "amount_desc":
                // Sắp xếp tiền giảm dần (Option thêm nếu cần)
                processed.sort((a, b) => b.rawAmount - a.rawAmount);
                break;
            default:
                break;
        }

        // Cập nhật dữ liệu lọc & tổng số item
        setFilteredData(processed);
        setTotalItems(processed.length);

        // 3. Phân trang (Paginate)
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;

        // Cập nhật lại STT cho trang hiện tại nếu muốn STT chạy liên tục (optional)
        // Hoặc giữ nguyên STT gốc từ API. Ở đây mình giữ nguyên item đã map.
        setDisplayedData(processed.slice(start, end));
    }, [allTransactions, searchTerm, sortOption, currentPage, pageSize]);

    // --- API CALL ---
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await publicAxios.get("/stats/transaction/get-data-table");
                const transactions = res.data.map((item, index) => ({
                    stt: item.idTransaction,
                    fullname: item.fullName,
                    phone: item.phone,
                    code: item.code,
                    status: item.status,
                    taxCode: item.taxCode || "",
                    companyName: item.companyName || "",
                    companyAddress: item.companyAddress || "",
                    // Dữ liệu hiển thị (Display Strings)
                    transferAmount: `${item.transferAmount?.toLocaleString("vi-VN") || "0"} đ`,
                    transactionDate: new Date(item.transactionDate).toLocaleString("vi-VN"),

                    // Dữ liệu thô để Sort (Raw Data)
                    rawAmount: item.transferAmount || 0,
                    rawDate: item.transactionDate,
                }));
                setAllTransactions(transactions);
            } catch (error) {
                console.error("Lỗi khi tải danh sách giao dịch:", error);
            }
        };
        fetchTransactions();
    }, []);

    // --- EXPORT EXCEL ---
    const exportToExcel = () => {
        if (filteredData.length === 0) {
            alert("Không có dữ liệu để xuất!");
            return;
        }

        // Export dữ liệu đang hiển thị (sau khi lọc)
        const worksheetData = filteredData.map((item) => ({
            STT: item.idTransaction,
            "Họ tên": item.fullname,
            "Liên hệ": item.phone,
            "Mã giao dịch": item.code,
            "Doanh thu": item.transferAmount, // Xuất chuỗi đã format hoặc rawAmount tùy nhu cầu
            Ngày: item.transactionDate,
            "Mã Thuế": item.taxCode,
            "Tên công ty": item.companyName,
            "Địa chỉ": item.companyAddress,
            "Trạng thái": item.status,
        }));

        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "DanhSachGiaoDich");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, `DanhSachGiaoDich_${new Date().toLocaleDateString("vi-VN")}.xlsx`);
    };

    // --- HANDLERS ---
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
            <div className={styles["dash-board-container"]}>
                <StatsHeader api_url="/stats/monthly/get-info-card" />

                <div className={styles["toolbar-container"]}>
                    <div className={styles["toolbar-left"]}>
                        <h1 className={styles["toolbar-title"]}>Danh sách giao dịch</h1>
                    </div>

                    <div className={styles["toolbar-right"]}>
                        <button className={styles["export-button"]} onClick={exportToExcel}>
                            <i className="fa-solid fa-file-excel"></i>
                            <span>Export to Excel</span>
                        </button>

                        <div className={styles["search-box-table"]}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input
                                type="text"
                                placeholder="Tìm Mã GD, Tên, SĐT..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>

                        <div className={styles["sort-dropdown-wrapper"]}>
                            <select className={styles["sort-dropdown"]} value={sortOption} onChange={handleSortChange}>
                                <option value="newest">Sắp xếp: Mới nhất</option>
                                <option value="oldest">Sắp xếp: Cũ nhất</option>
                                <option value="amount_desc">Sắp xếp: Doanh thu cao nhất</option>
                                <option value="name_asc">Sắp xếp: A-Z</option>
                            </select>
                        </div>
                    </div>
                </div>

                <TableComponent
                    columns={columns}
                    data={displayedData} // Truyền dữ liệu đã qua xử lý
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
