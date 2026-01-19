import React, { useState } from "react";
import styles from "./CourseManager.module.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import CourseForm from "../../../components/CourseForm/CourseForm";
import VideoManager from "../../../components/VideoManager/VideoManager";
import ManageDocs from "../../../components/ManageDocs/ManageDocs";
import { Link } from "react-router-dom";

const CourseManager = () => {
    const [activeTab, setActiveTab] = useState("basic");

    const renderContent = () => {
        switch (activeTab) {
            case "basic":
                return <CourseForm />;
            case "advanced":
                return <VideoManager />;
            case "curriculum":
                return <ManageDocs />;
            case "materials":
                return <div className={styles["tab-content"]}>[Tài liệu khóa học]</div>;
            default:
                return null;
        }
    };

    return (
        <div className={styles["course-manager-page"]}>
            <Sidebar />

            <div className={styles["course-manager"]}>
                {/* Header */}
                <div className={styles["header-course-manager"]}>
                    <Link to="/list-course" className={styles["back-btn-course-manager"]}>
                        ← Quay lại
                    </Link>
                    <h1 className={styles.title}>Quản lý khóa học</h1>
                </div>

                {/* Navigator */}
                <div className={styles["navigator-course-manager"]}>
                    <button
                        className={`${styles["nav-btn"]} ${activeTab === "basic" ? styles.active : ""}`}
                        onClick={() => setActiveTab("basic")}
                    >
                        Thông tin cơ bản
                    </button>
                    <button
                        className={`${styles["nav-btn"]} ${activeTab === "advanced" ? styles.active : ""}`}
                        onClick={() => setActiveTab("advanced")}
                    >
                        Video bài học
                    </button>
                    <button
                        className={`${styles["nav-btn"]} ${activeTab === "curriculum" ? styles.active : ""}`}
                        onClick={() => setActiveTab("curriculum")}
                    >
                        Tài liệu bài học
                    </button>
                    {/* <button
            className={activeTab === "materials" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActiveTab("materials")}
          >
            Tài liệu khóa học
          </button> */}
                </div>

                {/* Nội dung */}
                <div className={styles["content-course-manager"]}>{renderContent()}</div>
            </div>
        </div>
    );
};

export default CourseManager;
