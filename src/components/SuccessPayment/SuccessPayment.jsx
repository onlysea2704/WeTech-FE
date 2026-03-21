import React from "react";
import styles from "./SuccessPayment.module.css";
import successIcon from "../../assets/success-icon.png";

const SuccessPayment = ({ onClose, txDetails }) => {
    const formatPrice = (price) => new Intl.NumberFormat("vi-VN").format(price || 0);

    return (
        <div className={styles["popup-overlay"]}>
            <div className={styles["popup-box"]}>
                {/* Nút đóng */}
                <button className={styles["close-btn"]} onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>

                {/* Icon check */}
                <div className={styles.checkmark}>
                    <img src={successIcon} alt="Success" />
                </div>

                <h2 className={styles["success-title"]}>Thanh toán thành công!</h2>

                <div className={styles.info}>
                    <div className={styles["info-row"]}>
                        <span>Họ và Tên</span>
                        <span>{txDetails?.fullName || ""}</span>
                    </div>
                    <div className={styles["info-row"]}>
                        <span>Số điện thoại</span>
                        <span>{txDetails?.phone || ""}</span>
                    </div>
                    <div className={styles["info-row"]}>
                        <span>Email</span>
                        <span>{txDetails?.email || ""}</span>
                    </div>
                    <div className={styles["info-row"]}>
                        <span>Đơn hàng</span>
                        <span>{txDetails?.code || ""}</span>
                    </div>
                    <div className={styles["info-row"]}>
                        <span>Số tiền</span>
                        <span>{formatPrice(txDetails?.amount)}đ</span>
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
