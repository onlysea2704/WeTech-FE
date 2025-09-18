import React, { useState } from "react";
import "./CourseManager.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import CourseForm from "../../../components/CourseForm/CourseForm";

const CourseManager = () => {
  const [activeTab, setActiveTab] = useState("basic");

  const renderContent = () => {
    switch (activeTab) {
      case "basic":
        return <CourseForm />;
      case "advanced":
        return <div className="tab-content">[Thông tin nâng cao]</div>;
      case "curriculum":
        return <div className="tab-content">[Chương trình giảng dạy]</div>;
      case "materials":
        return <div className="tab-content">[Tài liệu khóa học]</div>;
      default:
        return null;
    }
  };

  return (

    <div className="course-manager-page">
      <Sidebar />

      <div className="course-manager">
        {/* Header */}
        <div className="header-course-manager">
          <button className="back-btn-course-manager">← Quay lại</button>
          <h1 className="title">Quản lý khóa học</h1>
        </div>

        {/* Navigator */}
        <nav className="navigator">
          <button
            className={activeTab === "basic" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActiveTab("basic")}
          >
            Thông tin cơ bản
          </button>
          <button
            className={activeTab === "advanced" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActiveTab("advanced")}
          >
            Thông tin nâng cao
          </button>
          <button
            className={activeTab === "curriculum" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActiveTab("curriculum")}
          >
            Chương trình giảng dạy
          </button>
          <button
            className={activeTab === "materials" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActiveTab("materials")}
          >
            Tài liệu khóa học
          </button>
        </nav>

        {/* Nội dung */}
        <div className="content-course-manager">{renderContent()}</div>
      </div>
    </div>
  );
};

export default CourseManager;
