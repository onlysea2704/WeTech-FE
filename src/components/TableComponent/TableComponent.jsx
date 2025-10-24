import React from "react";
import "./TableComponent.css";
import { Link, useNavigate } from "react-router-dom";

const TableComponent = ({
  columns,
  data,
  pageSize = 5,
  currentPage,
  totalItems,
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDelete,
  showActions = true,
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
            {showActions && (
              <th style={{ width: "100px", textAlign: "center" }}>Hành động</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col) => (
                  <td key={col.field}>{row[col.field]}</td>
                ))}
                {showActions && (
                  <td className="action-cell">
                    <button
                      className="action-btn edit"
                      onClick={() => onEdit && onEdit(row[columns[0].field])}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => onDelete && onDelete(row)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} style={{ textAlign: "center" }}>
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination + Selectbox */}
      <div className="pagination-container">

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
          <span>({totalItems} bản ghi)</span>
        </div>

      </div>
    </div>
  );
};

export default TableComponent;
