import React from "react";
import styles from "./FailurePayment.module.css";

const FailurePayment = ({ onClose }) => {
    return (
        <div className={styles["popup-overlay"]}>
            <div className={styles["popup-box"]}>
                {/* Nút đóng */}
                <button className={styles["close-btn"]} onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>

                {/* Icon lỗi */}
                <div className={styles["error-icon"]}>
                    <i className="fa-solid fa-xmark"></i>
                </div>

                <h2 className={styles["error-title"]}>Thanh toán thất bại!</h2>

                <p className={styles["error-message"]}>
                    Rất tiếc, chúng tôi gặp sự cố với khoản thanh toán của bạn, vui lòng thử lại sau.
                </p>

                <button className={styles["retry-btn"]} onClick={onClose}>
                    Thử lại
                </button>
            </div>
        </div>
    );
};

export default FailurePayment;
