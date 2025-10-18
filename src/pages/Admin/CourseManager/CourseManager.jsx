import React, { useState } from "react";
import "./CourseManager.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import CourseForm from "../../../components/CourseForm/CourseForm";
import CourseContentManager from "../../../components/CourseContentManager/CourseContentManager";
import ManageDocs from "../../../components/ManageDocs/ManageDocs";
import { Link } from "react-router-dom";

const CourseManager = () => {
  const [activeTab, setActiveTab] = useState("basic");

  const renderContent = () => {
    switch (activeTab) {
      case "basic":
        return <CourseForm />;
      case "advanced":
        return <CourseContentManager />;
      case "curriculum":
        return <ManageDocs />;
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
          <Link to='/list-course' className="back-btn-course-manager">← Quay lại</Link>
          <h1 className="title">Quản lý khóa học</h1>
        </div>

        {/* Navigator */}
        <div className="navigator-course-manager">
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
            Video bài học
          </button>
          <button
            className={activeTab === "curriculum" ? "nav-btn active" : "nav-btn"}
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
        <div className="content-course-manager">{renderContent()}</div>
      </div>
    </div>
  );
};

export default CourseManager;
