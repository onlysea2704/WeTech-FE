import React, { useState, useEffect } from "react";
import "./ScanQR.css";
import PaymentHeader from "../../components/PaymentHeader/PaymentHeader";
import SuccessPayment from "../../components/SuccessPayment/SuccessPayment";
import FailurePayment from "../../components/FailurePayment/FailurePayment";

const ScanQR = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Countdown 10 phút = 600 giây
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // clear interval khi unmount
  }, [timeLeft]);

  // Chia giây thành phút:giây
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <PaymentHeader />
      <div className="payment-container">
        {/* Thông tin đơn hàng */}
        <div className="order-info">
          <h3>Thông tin đơn hàng</h3>
          <div className="info-item-qr-page">
            <p>Nhà cung cấp</p>
            <p>LE THI LAN</p>
          </div>
          <div className="info-item-qr-page">
            <p>Số tài khoản</p>
            <p>0989466992</p>
          </div>
          <div className="info-item-qr-page">
            <p>Ngân hàng</p>
            <p>MB Bank</p>
          </div>
          <div className="info-item-qr-page">
            <p>Nội dung</p>
            <p>WETECH1135</p>
          </div>
          <div className="amount">
            <p>Số tiền</p>
            <p>299.000đ</p>
          </div>
          <div className="countdown">
            <p>Đơn hàng sẽ hết hạn sau:</p>
            <div className="timer">
              <span className="time-box">{minutes.toString().padStart(2, "0")}</span>
              <span>Phút</span>
              <span className="time-box">{seconds.toString().padStart(2, "0")}</span>
              <span>Giây</span>
            </div>
          </div>
        </div>

        {/* QR thanh toán */}
        <div className="qr-section">
          <h3>Quét mã QR thanh toán trực tiếp</h3>
          <div className="qr-box">
            <img
              src="https://qr.sepay.vn/img?acc=0918297371&bank=MBBank&amount=2000&des=sdf1111111112&template=compact"
              alt="QR Code"
            />
            <p>Lê Thị Lan</p>
            <p>0989466992</p>
          </div>
          <p className="qr-note">Mở ứng dụng ngân hàng để Quét Mã QR</p>
        </div>
      </div>

      <button
        onClick={() => {
          setIsSuccess(true); // test: set true/false
          setShowPopup(true);
        }}
      >
        Mở popup thanh toán
      </button>

      {showPopup && isSuccess && (
        <SuccessPayment onClose={() => setShowPopup(false)} />
      )}
      {showPopup && !isSuccess && (
        <FailurePayment onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default ScanQR;
