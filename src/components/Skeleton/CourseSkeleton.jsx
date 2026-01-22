import React from "react";
import styles from "./CourseSkeleton.module.css";

const CourseSkeleton = () => {
    return (
        <div className={styles.skeletonCard}>
            <div className={`${styles.skeleton} ${styles.skeletonImage}`}></div>
            <div className={styles.skeletonContent}>
                <div className={`${styles.skeleton} ${styles.skeletonTitle}`}></div>
                <div className={`${styles.skeleton} ${styles.skeletonTitleShort}`}></div>
                <div className={styles.skeletonAuthorRow}>
                    <div className={`${styles.skeleton} ${styles.skeletonAvatar}`}></div>
                    <div className={`${styles.skeleton} ${styles.skeletonAuthorName}`}></div>
                </div>
                <div className={`${styles.skeleton} ${styles.skeletonPrice}`}></div>
            </div>
        </div>
    );
};

export default CourseSkeleton;
