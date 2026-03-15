import React from "react";
import styles from "./CourseListSkeleton.module.css";

const CourseListSkeleton = () => {
    return (
        <div className={styles.skeletonCard}>
            <div className={`${styles.skeleton} ${styles.skeletonImage}`}></div>
            <div className={styles.skeletonContent}>
                <div className={`${styles.skeleton} ${styles.skeletonTitle}`}></div>
                <div className={`${styles.skeleton} ${styles.skeletonSubtitle}`}></div>
                <div className={`${styles.skeleton} ${styles.skeletonPrice}`}></div>
            </div>
        </div>
    );
};

export default CourseListSkeleton;
