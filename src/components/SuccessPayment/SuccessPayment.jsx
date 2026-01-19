import React from "react";
import styles from "./SuccessPayment.module.css";

const SuccessPayment = ({ onClose }) => {
    return (
        <div className={styles["popup-overlay"]}>
            <div className={styles["popup-box"]}>
                {/* Nút đóng */}
                <button className={styles["close-btn"]} onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>

                {/* Icon check */}
                <div className={styles.checkmark}>
                    <i className="fa-solid fa-check"></i>
                </div>

                <h2 className={styles["success-title"]}>Thanh toán thành công!</h2>

                <div className={styles.info}>
                    <div className={styles["info-row"]}>
                        <span>Họ và Tên</span>
                        <span>Nguyễn Trường</span>
                    </div>
                    <div className={styles["info-row"]}>
                        <span>Số điện thoại</span>
                        <span>0834 085 578</span>
                    </div>
                    <div className={styles["info-row"]}>
                        <span>Email</span>
                        <span>Truongnguyen@gmail.com</span>
                    </div>
                    <div className={styles["info-row"]}>
                        <span>Đơn hàng</span>
                        <span>WETECH1135</span>
                    </div>
                    <div className={styles["info-row"]}>
                        <span>Số tiền</span>
                        <span>299.000đ</span>
                    </div>
                </div>

                <button className={styles["done-btn"]} onClick={onClose}>
                    Hoàn thành
                </button>
            </div>
        </div>
    );
};

export default SuccessPayment;
