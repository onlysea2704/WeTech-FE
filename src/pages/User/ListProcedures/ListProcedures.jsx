import React, { useState, useEffect } from "react";
import "./ListProcedures.css";
import ProcedureCard from "../../../components/ProcedureCard/ProcedureCard";
import Footer from "../../../components/Footer/Footer";
import Navbar from "../../../components/NavBar/NavBar";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import { useParams, useNavigate } from "react-router-dom";
import { publicAxios } from "../../../services/axios-instance";

const tabs = [
    { label: "Công ty TNHH một thành viên", value: "cong_ty_tnhh_mot_thanh_vien" },
    { label: "Công ty TNHH hai thành viên trở lên", value: "cong_ty_tnhh_hai_thanh_vien_tro_len" },
    { label: "Công ty Cổ phần", value: "cong_ty_co_phan" },
];

const ListProcedures = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [listProcedures, setListProcedures] = useState([]);

    const itemsPerPage = 12;
    const { typeProcedure } = useParams();

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const res = await publicAxios.get(`/api/procedurer/find-by-type?type=${typeProcedure}`);
                setListProcedures(res.data);
                console.log(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCourseDetails();
    }, [typeProcedure]);

    // Reset về page 1 khi đổi tab
    const handleTabChange = (index) => {
        setActiveTab(index);
        setCurrentPage(1);
    };

    // Lọc dữ liệu theo tab
    const filteredProcedures = listProcedures.filter(
        (item) => item.typeCompany === tabs[activeTab].value
    );

    const totalPages = Math.ceil(filteredProcedures.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredProcedures.slice(startIndex, startIndex + itemsPerPage);

    return (

        <div>
            <Navbar />
            <Breadcrumb />
            <div className="company-services">
                <h2 className="title-type-procedure">DỊCH VỤ THÀNH LẬP CÔNG TY</h2>

                {/* Tabs */}
                <div className="tabs">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            className={activeTab === index ? "active" : ""}
                            onClick={() => handleTabChange(index)}
                        >
                            {tab.label}
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