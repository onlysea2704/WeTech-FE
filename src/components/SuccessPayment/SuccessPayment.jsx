import React from "react";
import "./SuccessPayment.css";

const SuccessPayment = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        {/* Nút đóng */}
        <button className="close-btn" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* Icon check */}
        <div className="checkmark">
          <i className="fa-solid fa-check"></i>
        </div>

        <h2 className="success-title">Thanh toán thành công!</h2>

        <div className="info">
          <div className="info-row">
            <span>Họ và Tên</span>
            <span>Nguyễn Trường</span>
          </div>
          <div className="info-row">
            <span>Số điện thoại</span>
            <span>0834 085 578</span>
          </div>
          <div className="info-row">
            <span>Email</span>
            <span>Truongnguyen@gmail.com</span>
          </div>
          <div className="info-row">
            <span>Đơn hàng</span>
            <span>WETECH1135</span>
          </div>
          <div className="info-row">
            <span>Số tiền</span>
            <span>299.000đ</span>
          </div>
        </div>

        <button className="done-btn" onClick={onClose}>
          Hoàn thành
        </button>
      </div>
    </div>
  );
};

export default SuccessPayment;
