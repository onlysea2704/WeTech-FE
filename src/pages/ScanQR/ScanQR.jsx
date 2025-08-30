import React from "react";
import "./ScanQR.css";
import PaymentHeader from "../../components/PaymentHeader/PaymentHeader";
// import qrImage from "./qr.png";

const ScanQR = () => {
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
                            <span className="time-box">10</span>
                            <span>Phút</span>
                            <span className="time-box">00</span>
                            <span>Giây</span>
                        </div>
                    </div>
                </div>

                {/* QR thanh toán */}
                <div className="qr-section">
                    <h3>Quét mã QR thanh toán trực tiếp</h3>
                    <div className="qr-box">
                        <img src='https://qr.sepay.vn/img?acc=0918297371&bank=MBBank&amount=2000&des=sdf1111111112&template=compact' alt="QR Code" />
                        <p>Lê Thị Lan</p>
                        <p>0989466992</p>
                    </div>
                    <p className="qr-note">Mở ứng dụng ngân hàng để Quét Mã QR</p>
                </div>
            </div>
        </div>


    );
};

export default ScanQR;
