import React from "react";
import "./DashBoard.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import CourseTable from "../../../components/CourseTable/CourseTable";
import StatsCard from "../../../components/StatsCard/StatsCard";
import StatsHeader from "../../../components/StatsHeader/StatsHeader";

const DashBoard = () => {

  return (
    <div className="dash-board-page">
      <Sidebar />
      <div className="dash-board-container">
        <StatsHeader />
        <CourseTable />
      </div>
    </div>
  );
};

export default DashBoard;
