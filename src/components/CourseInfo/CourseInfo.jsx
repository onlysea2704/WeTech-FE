import React, { useState } from "react";
import styles from "./CourseInfo.module.css";
import CourseContent from "../CourseContent/CourseContent";
import CourseIntro from "../CourseIntro/CourseIntro";
import Faq from "../Faq/Faq";

const CourseInfo = ({ courseDetail, isPurchased }) => {
    const [activeTab, setActiveTab] = useState("intro"); // 'intro' hoặc 'content'

    return (
        <div className={styles["course-container"]}>
            <div className={styles["course-tabs"]}>
                <button
                    className={`${styles["tab-button"]} ${activeTab === "intro" ? styles.active : ""}`}
                    onClick={() => setActiveTab("intro")}
                >
                    Giới Thiệu
                </button>
                <button
                    className={`${styles["tab-button"]} ${activeTab === "content" ? styles.active : ""}`}
                    onClick={() => setActiveTab("content")}
                >
                    Nội dung
                </button>
            </div>

            <div className={styles["course-content"]}>
                {activeTab === "intro" ? (
                    <CourseIntro courseDetails={courseDetail} />
                ) : (
                    <CourseContent courseDetails={courseDetail} isPurchased={isPurchased} />
                )}
            </div>
            <Faq />
        </div>
    );
};

export default CourseInfo;
