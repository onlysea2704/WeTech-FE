import React from "react";
import styles from "./CourseContentSkeleton.module.css";

const CourseContentSkeleton = () => {
    return (
        <div className={styles["skeleton-wrapper"]}>
            {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className={styles["skeleton-accordion"]}>
                    <div className={`${styles.skeleton} ${styles["skeleton-header"]}`}></div>
                </div>
            ))}
        </div>
    );
};

export default CourseContentSkeleton;
