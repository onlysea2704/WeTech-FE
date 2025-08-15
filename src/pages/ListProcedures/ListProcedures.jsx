import React, { useState } from "react";
import "./ListProcedures.css";
import ProcedureCard from "../../components/ProcedureCard/ProcedureCard";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/NavBar/NavBar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

const tabs = [
    "Công ty TNHH một thành viên",
    "Công ty TNHH hai thành viên trở lên",
    "Công ty Cổ phần",
];

// Dữ liệu demo
const servicesData = [
    Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        title: `Đăng ký thành lập DN-Công ty TNHH 2 thành viên trở lên`,
        desc: "Đăng ký thành lập mới đối với công ty TNHH một thành viên do cá nhân làm chủ sở hữu.",
        price: "300.000",
    })),
    Array.from({ length: 8 }, (_, i) => ({
        id: i + 101,
        title: `Đăng ký thành lập DN-Công ty TNHH 2 thành viên trở lên`,
        img: "https://via.placeholder.com/200x150",
        desc: "Đăng ký thành lập mới đối với công ty TNHH một thành viên do cá nhân làm chủ sở hữu.",
        price: "300.000",
    })),
    Array.from({ length: 5 }, (_, i) => ({
        id: i + 201,
        title: `Đăng ký thành lập DN-Công ty TNHH 2 thành viên trở lên`,
        img: "https://via.placeholder.com/200x150",
        desc: "Đăng ký thành lập mới đối với công ty TNHH một thành viên do cá nhân làm chủ sở hữu.",
        price: "300.000",
    })),
];

const ListProcedures = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 12;

    // Reset về page 1 khi đổi tab
    const handleTabChange = (index) => {
        setActiveTab(index);
        setCurrentPage(1);
    };

    const currentTabData = servicesData[activeTab];
    const totalPages = Math.ceil(currentTabData.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = currentTabData.slice(startIndex, startIndex + itemsPerPage);

    return (

        <div>
            <Navbar />
            <Breadcrumb/>
            <div className="company-services">
                <h2 className="title">DỊCH VỤ THÀNH LẬP CÔNG TY</h2>

                {/* Tabs */}
                <div className="tabs">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            className={activeTab === index ? "active" : ""}
                            onClick={() => handleTabChange(index)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Grid hiển thị dịch vụ */}
                <div className="services-grid">
                    {currentItems.map((item, index) => (
                        <ProcedureCard key={index} {...item} />
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="pagination">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <i className="fa-solid fa-angle-left"></i>
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                className={currentPage === i + 1 ? "active" : ""}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            <i className="fa-solid fa-angle-right"></i>
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </div>

    );
}

export default ListProcedures;