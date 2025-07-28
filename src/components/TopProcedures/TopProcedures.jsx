import React, { useState } from "react";
import ProcedureCard from "../ProcedureCard/ProcedureCard";
import "./TopProcedures.css";

const procedures = [
    {
        title: "Đăng ký thành lập DN-Công ty TNHH 1 thành viên do cá nhân làm chủ sở hữu",
        desc: "Đăng ký thành lập mới đối với công ty TNHH một thành viên do cá nhân làm chủ sở hữu.",
        price: "300.000",
    },
    {
        title: "Đăng ký thành lập DN-Công ty TNHH 2 thành viên trở lên",
        desc: "Đăng ký thành lập mới đối với công ty TNHH hai thành viên trở lên.",
        price: "300.000",
    },
    {
        title: "Đăng ký thành lập DN-Công ty cổ phần",
        desc: "Đăng ký thành lập mới đối với công ty cổ phần.",
        price: "300.000",
    },
    {
        title: "Đăng ký thành lập Hộ Kinh Doanh",
        desc: "Đăng ký ra giấy phép cho Hộ Kinh Doanh",
        price: "300.000",
    },
    {
        title: "Đăng ký thành lập DN-Công ty TNHH 1 thành viên do cá nhân làm chủ sở hữu",
        desc: "Đăng ký thành lập mới đối với công ty TNHH một thành viên do cá nhân làm chủ sở hữu.",
        price: "300.000",
    },
    {
        title: "Đăng ký thành lập DN-Công ty TNHH 2 thành viên trở lên",
        desc: "Đăng ký thành lập mới đối với công ty TNHH hai thành viên trở lên.",
        price: "300.000",
    },
    {
        title: "Đăng ký thành lập DN-Công ty cổ phần",
        desc: "Đăng ký thành lập mới đối với công ty cổ phần.",
        price: "300.000",
    },
    {
        title: "Đăng ký thành lập Hộ Kinh Doanh",
        desc: "Đăng ký ra giấy phép cho Hộ Kinh Doanh",
        price: "300.000",
    },
    {
        title: "Đăng ký thành lập DN-Công ty TNHH 1 thành viên do cá nhân làm chủ sở hữu",
        desc: "Đăng ký thành lập mới đối với công ty TNHH một thành viên do cá nhân làm chủ sở hữu.",
        price: "300.000",
    },
    {
        title: "Đăng ký thành lập DN-Công ty TNHH 2 thành viên trở lên",
        desc: "Đăng ký thành lập mới đối với công ty TNHH hai thành viên trở lên.",
        price: "300.000",
    },
    {
        title: "Đăng ký thành lập DN-Công ty TNHH 1 thành viên do cá nhân làm chủ sở hữu",
        desc: "Đăng ký thành lập mới đối với công ty TNHH một thành viên do cá nhân làm chủ sở hữu.",
        price: "300.000",
    },
    {
        title: "Đăng ký thành lập DN-Công ty TNHH 2 thành viên trở lên",
        desc: "Đăng ký thành lập mới đối với công ty TNHH hai thành viên trở lên.",
        price: "300.000",
    },
    {
        title: "Đăng ký thành lập DN-Công ty cổ phần",
        desc: "Đăng ký thành lập mới đối với công ty cổ phần.",
        price: "300.000",
    },
    {
        title: "Đăng ký thành lập DN-Công ty cổ phần",
        desc: "Đăng ký thành lập mới đối với công ty cổ phần.",
        price: "300.000",
    },
    {
        title: "Đăng ký thành lập Hộ Kinh Doanh",
        desc: "Đăng ký ra giấy phép cho Hộ Kinh Doanh",
        price: "300.000",
    },
    {
        title: "Đăng ký thành lập Hộ Kinh Doanh",
        desc: "Đăng ký ra giấy phép cho Hộ Kinh Doanh",
        price: "300.000",
    },
    {
        title: "Đăng ký thành lập DN-Công ty TNHH 1 thành viên do cá nhân làm chủ sở hữu",
        desc: "Đăng ký thành lập mới đối với công ty TNHH một thành viên do cá nhân làm chủ sở hữu.",
        price: "300.000",
    },
    {
        title: "Đăng ký thành lập DN-Công ty TNHH 2 thành viên trở lên",
        desc: "Đăng ký thành lập mới đối với công ty TNHH hai thành viên trở lên.",
        price: "300.000",
    },
    {
        title: "Đăng ký thành lập DN-Công ty cổ phần",
        desc: "Đăng ký thành lập mới đối với công ty cổ phần.",
        price: "300.000",
    },
    {
        title: "Đăng ký thành lập DN-Công ty TNHH 2 thành viên trở lên",
        desc: "Đăng ký thành lập mới đối với công ty TNHH hai thành viên trở lên.",
        price: "300.000",
    },
    {
        title: "Đăng ký thành lập DN-Công ty cổ phần",
        desc: "Đăng ký thành lập mới đối với công ty cổ phần.",
        price: "300.000",
    },
    {
        title: "Đăng ký thành lập Hộ Kinh Doanh",
        desc: "Đăng ký ra giấy phép cho Hộ Kinh Doanh",
        price: "300.000",
    },
    {
        title: "Đăng ký thành lập Hộ Kinh Doanh",
        desc: "Đăng ký ra giấy phép cho Hộ Kinh Doanh",
        price: "300.000",
    },
    {
        title: "Đăng ký thành lập DN-Công ty TNHH 1 thành viên do cá nhân làm chủ sở hữu",
        desc: "Đăng ký thành lập mới đối với công ty TNHH một thành viên do cá nhân làm chủ sở hữu.",
        price: "300.000",
    },
];

const ITEMS_PER_PAGE = 8;

const TopProcedures = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(procedures.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const visibleItems = procedures.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="featured-wrapper">
            <h2 className="featured-title">THỦ TỤC NỔI BẬT</h2>
            <div className="procedure-grid">
                {visibleItems.map((item, index) => (
                    <ProcedureCard key={index} {...item} />
                ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <span
                        key={i}
                        className={`page-dot ${i + 1 === currentPage ? "active" : ""}`}
                        onClick={() => setCurrentPage(i + 1)}
                    ></span>
                ))}
            </div>
        </div>
    );
};


export default TopProcedures;
