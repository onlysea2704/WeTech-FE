import React from "react";
import "./DashBoard.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import CourseTable from "../../../components/CourseTable/CourseTable";

const DashBoard = () => {
  return (
    <div>
      <Sidebar />
      <CourseTable />
    </div>
  );
};

export default DashBoard;
