import React, { useState, useEffect } from "react";
import styles from "./ScanQR.module.css";
import PaymentHeader from "../../../components/PaymentHeader/PaymentHeader";
import SuccessPayment from "../../../components/SuccessPayment/SuccessPayment";
import FailurePayment from "../../../components/FailurePayment/FailurePayment";
import { useParams, useNavigate } from "react-router-dom";
import { publicAxios } from "../../../services/axios-instance";
import usePaymentSocket from "../../../services/usePaymentSocket";
import Footer from "../../../components/Footer/Footer";
import Navbar from "../../../components/NavBar/NavBar";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import qrThanhToan from "../../../assets/qr-thanh-toan.png";
import Tooltip from "../../../components/Tooltip/Tooltip";

const ScanQR = () => {
    const { idTransaction } = useParams();
    const [showPopup, setShowPopup] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [amount, setAmount] = useState(0);
    const [code, setCode] = useState("");
    const navigate = useNavigate();

    // Countdown 10 phút = 600 giây
    const [timeLeft, setTimeLeft] = useState(600);
    const userId = localStorage.getItem("userId");
    usePaymentSocket(userId, (msg) => {
        setIsSuccess(true);
        setShowPopup(true);
    });

    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchTransactionDetails = async () => {
            try {
                const res = await publicAxios.get(`/payment/get?idTransaction=${idTransaction}`);
                console.log(res.data);
                setAmount(res.data?.transferAmount || 0);
                setCode(res.data?.code || "");
            } catch (error) {
                console.error(error);
            }
        };
        fetchTransactionDetails();
    }, [idTransaction]);

    // Hàm check giao dịch
    const handleCheckTransaction = async () => {
        try {
            const res = await publicAxios.get(`/payment/get?code=${idTransaction}`);
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
            <Navbar />
            <div className={styles["scan-qr-container"]}>
                <Breadcrumb
                    items={[
                        { label: "Trang chủ", link: "/" },
                        { label: "Khóa học", link: "/list-courses" },
                        { label: "Thanh toán" },
                    ]}
                />
                <PaymentHeader currentStep={3} isSuccess={isSuccess} />
                <div className={styles["payment-container-qr"]}>
                    <div className={styles["payment-info-container"]}>
                        <h3>Thông tin thanh toán</h3>
                        <table className={styles["order-info"]}>
                            <tbody>
                                <tr className={styles["info-item-qr-page"]}>
                                    <td>Nhà cung cấp</td>
                                    <td>LE THI LAN</td>
                                </tr>
                                <tr className={styles["info-item-qr-page"]}>
                                    <td>Số điện thoại</td>
                                    <Tooltip text="Nhấn để sao chép" copyValue="0989466992">
                                        <td>0989466992</td>
                                    </Tooltip>
                                </tr>
                                <tr className={styles["info-item-qr-page"]}>
                                    <td>Ngân hàng</td>
                                    <td>MB Bank</td>
                                </tr>
                                <tr className={styles["info-item-qr-page"]}>
                                    <td>Nội dung</td>
                                    <Tooltip text="Nhấn để sao chép" copyValue={code}>
                                        <td>{code}</td>
                                    </Tooltip>
                                </tr>
                                <tr className={styles.amount}>
                                    <td>Số tiền</td>
                                    <td>{formatPrice(amount)}đ</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="2">
                                        <div className={styles["countdown"]}>
                                            <p>Đơn hàng sẽ hết hạn sau:</p>
                                            <div className={styles["timer"]}>
                                                <div className={styles["time-box"]}>
                                                    <span className={styles["time-value"]}>
                                                        {minutes.toString().padStart(2, "0")}
                                                    </span>
                                                    <span className={styles["time-label"]}>Phút</span>
                                                </div>
                                                <div className={styles["time-box"]}>
                                                    <span className={styles["time-value"]}>
                                                        {seconds.toString().padStart(2, "0")}
                                                    </span>
                                                    <span className={styles["time-label"]}>Giây</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* QR thanh toán */}
                    <div className={styles["qr-section"]}>
                        <h3>Quét mã QR thanh toán trực tiếp</h3>
                        <div className={styles["qr-box"]}>
                            {/* <img
              src={`https://qr.sepay.vn/img?acc=0918297371&bank=MBBank&amount=${amount}&des=${code}&template=compact`}
              alt="QR Code"
            /> */}
                            <img src={qrThanhToan} alt="QR Code" />
                            <p>Lê Thị Lan - 0989466992</p>
                        </div>
                        <p className={styles["qr-note"]}>Mở ứng dụng ngân hàng để Quét Mã QR</p>
                        {/* Nút check giao dịch */}
                        <button className={styles["check-transaction-btn"]} onClick={handleCheckTransaction}>
                            Kiểm tra giao dịch
                        </button>
                    </div>
                </div>
                <Footer />

                {showPopup && isSuccess && (
                    <SuccessPayment
                        onClose={() => {
                            setShowPopup(false);
                            navigate("/my-courses");
                        }}
                    />
                )}
                {showPopup && !isSuccess && <FailurePayment onClose={() => setShowPopup(false)} />}
            </div>
        </div>
    );
};

export default ScanQR;
