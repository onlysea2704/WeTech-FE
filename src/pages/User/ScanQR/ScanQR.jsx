import React, { useState, useEffect } from "react";
import "./ScanQR.css";
import PaymentHeader from "../../../components/PaymentHeader/PaymentHeader";
import SuccessPayment from "../../../components/SuccessPayment/SuccessPayment";
import FailurePayment from "../../../components/FailurePayment/FailurePayment";
import { useParams, useNavigate } from "react-router-dom";
import { authAxios, publicAxios } from "../../../services/axios-instance";
import usePaymentSocket from "../../../services/usePaymentSocket";

const ScanQR = () => {

  const { code } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  // Countdown 10 phút = 600 giây
  const [timeLeft, setTimeLeft] = useState(600);
  const userId = localStorage.getItem('userId');
  usePaymentSocket(userId, (msg) => {
    setIsSuccess(true);
    setShowPopup(true);
  });

  const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        const res = await publicAxios.get(
          `/payment/get?code=${code}`
        );
        console.log(res.data);
        setAmount(res.data?.transferAmount || 0);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransactionDetails();

  }, [code]);

  // Hàm check giao dịch
  const handleCheckTransaction = async () => {
    try {
      const res = await publicAxios.get(`/payment/get?code=${code}`);
      if (res.data?.status === "SUCCESS") {
        setIsSuccess(true);
        setShowPopup(true);
        // Tự động chuyển sang trang khóa học sau 2 giây
        setTimeout(() => {
          navigate("/list-courses");
        }, 2000);
      } else {
        setIsSuccess(false);
        setShowPopup(true);
      }
    } catch (err) {
      console.error(err);
      setIsSuccess(false);
      setShowPopup(true);
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // clear interval khi unmount
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <PaymentHeader />
      <div className="payment-container-qr">
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
            <p>{code}</p>
          </div>
          <div className="amount">
            <p>Số tiền</p>
            <p>{formatPrice(amount)}đ</p>
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
              src={`https://qr.sepay.vn/img?acc=0918297371&bank=MBBank&amount=${amount}&des=${code}&template=compact`}
              alt="QR Code"
            />
            <p>Lê Thị Lan - 0989466992</p>
          </div>
          <p className="qr-note">Mở ứng dụng ngân hàng để Quét Mã QR</p>
          {/* Nút check giao dịch */}
          <button className="check-transaction-btn" onClick={handleCheckTransaction}>
            Kiểm tra giao dịch
          </button>
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
        <SuccessPayment onClose={() => { 
          setShowPopup(false);
          navigate("/list-courses"); 
        }} />
      )}
      {showPopup && !isSuccess && (
        <FailurePayment onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default ScanQR;
