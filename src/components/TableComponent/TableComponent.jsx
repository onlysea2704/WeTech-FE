import React from "react";
import "./TableComponent.css";

const TableComponent = ({
  columns,
  data,
  pageSize = 8,
  currentPage,
  totalItems,
  onPageChange,
  onPageSizeChange, // thêm prop
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.field}>{col.headerName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col) => (
                  <td key={col.field}>{row[col.field]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center" }}>
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination + Selectbox */}
      <div className="pagination-container">

        {/* Selectbox item per page */}
        <div className="page-size">
          <label htmlFor="pageSize">Hiển thị:</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            <option value={7}>7</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span>/ trang</span>
        </div>

        <div className="pagination-table">
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            <i className="fas fa-angle-double-left"></i>
          </button>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="fas fa-angle-left"></i>
          </button>
          <span>
            Trang <b>{currentPage}</b> / {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <i className="fas fa-angle-right"></i>
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <i className="fas fa-angle-double-right"></i>
          </button>
          <span> ({totalItems} bản ghi)</span>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
