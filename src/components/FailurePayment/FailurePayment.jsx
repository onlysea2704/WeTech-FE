import React from "react";
import "./FailurePayment.css";

const FailurePayment = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        {/* Nút đóng */}
        <button className="close-btn" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* Icon lỗi */}
        <div className="error-icon">
          <i className="fa-solid fa-xmark"></i>
        </div>

        <h2 className="error-title">Thanh toán thất bại!</h2>

        <p className="error-message">
          Rất tiếc, chúng tôi gặp sự cố với khoản thanh toán của bạn, vui lòng
          thử lại sau.
        </p>

        <button className="retry-btn" onClick={onClose}>
          Thử lại
        </button>
      </div>
    </div>
  );
};

export default FailurePayment;
