import React, { useState } from "react";
import styles from "./ProcedureManager.module.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import ProcedureForm from "../../../components/Procedure/ProcedureForm/ProcedureForm";
import { Link, useParams } from "react-router-dom";

const ProcedureManager = () => {
    const { procedureId } = useParams();
    const [activeTab, setActiveTab] = useState("basic");

    const renderContent = () => {
        switch (activeTab) {
            case "basic":
                return <ProcedureForm procedureId={procedureId} />;
            default:
                return null;
        }
    };

    return (
        <div className={styles["procedure-manager-page"]}>
            <Sidebar />

            <div className={styles["procedure-manager"]}>
                {/* Header */}
                <div className={styles["header-procedure-manager"]}>
                    <Link to="/list-procedure" className={styles["back-btn-procedure-manager"]}>
                        ← Quay lại
                    </Link>
                    <h1 className={styles.title}>
                        {procedureId ? "Cập nhật thủ tục pháp lý" : "Tạo mới thủ tục pháp lý"}
                    </h1>
                </div>

                {/* Navigator */}
                <div className={styles["navigator-procedure-manager"]}>
                    <button
                        className={`${styles["nav-btn"]} ${activeTab === "basic" ? styles.active : ""}`}
                        onClick={() => setActiveTab("basic")}
                    >
                        Thông tin cơ bản
                    </button>
                    {/* Thêm các tab khác nếu sau này thủ tục cần quản lý tài liệu như khóa học */}
                </div>

                {/* Nội dung */}
                <div className={styles["content-procedure-manager"]}>{renderContent()}</div>
            </div>
        </div>
    );
};

export default ProcedureManager;
