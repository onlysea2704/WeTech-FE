import React from "react";
import styles from "./CourseIntro.module.css";

const CourseIntro = ({ courseDetails }) => {
    return (
        <div className={styles["intro-section"]}>
            <h2 className={styles["section-title"]}>Mô tả khoá học</h2>
            <p className={styles["course-description"]}>{courseDetails?.description}</p>

            <h2 className={styles["section-title"]}>Phương pháp học</h2>
            <p className={styles["course-description"]}>{courseDetails?.intro1}</p>

            <h2 className={styles["section-title"]}>Bạn sẽ học được gì ?</h2>
            <p className={styles["course-description"]}>{courseDetails?.intro2}</p>
        </div>
    );
};

export default CourseIntro;
