import React from "react";
import styles from "./DetailCourseSkeleton.module.css";

const DetailCourseSkeleton = () => {
    return (
        <div className={styles["skeleton-container"]}>
            <div className={`${styles.skeleton} ${styles["skeleton-price"]}`}></div>
            <div className={`${styles.skeleton} ${styles["skeleton-btn"]}`}></div>
            <div className={`${styles.skeleton} ${styles["skeleton-btn"]}`}></div>
            <div className={`${styles.skeleton} ${styles["skeleton-text"]}`}></div>
            <div className={`${styles.skeleton} ${styles["skeleton-list-item"]}`}></div>
            <div className={`${styles.skeleton} ${styles["skeleton-list-item"]}`}></div>
            <div className={`${styles.skeleton} ${styles["skeleton-list-item"]}`}></div>
        </div>
    );
};

export default DetailCourseSkeleton;
