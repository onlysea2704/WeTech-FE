import React from "react";
import styles from "./Banner.module.css";
import ketoan from "../../assets/ketoan.svg";

const Banner = () => {
    return (
        <div className={styles["banner-container"]}>
            {/* Nút điều hướng trái */}
            <button className={`${styles["nav-btn"]} ${styles["left-btn"]}`}>
                <i className="fa-solid fa-chevron-left"></i>
            </button>

            {/* Nội dung banner */}
            <div className={styles["banner-content"]}>
                <div className={styles["banner-text"]}>
                    <h2>Tự Làm Thủ Tục Pháp Lý</h2>
                    <p>Become professionals and ready to join the world.</p>
                    <button className={styles["btn-primary"]}>Khám phá ngay</button>
                </div>

                <div className={styles["banner-image"]}>
                    <div className={styles["banner-image-info"]}>
                        <div className={styles["author-info"]}>
                            <img src={ketoan} alt="Mộc Lan" className={styles["author-avatar"]} />
                            <div>
                                <div className={styles["author-name"]}>Mộc Lan</div>
                                <div className={styles["author-job"]}>Kế Toán</div>
                            </div>
                        </div>
                        <div className={styles["award-info"]}>
                            Winner Photo 2017 Awards <br />
                            Joined Klevr since 2006
                        </div>
                    </div>
                </div>
            </div>

            {/* Nút điều hướng phải */}
            <button className={`${styles["nav-btn"]} ${styles["right-btn"]}`}>
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    );
};

export default Banner;
