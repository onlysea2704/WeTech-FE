import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./ScanQR.module.css";
import ProgressStepper from "../../../components/ProgressStepper/ProgressStepper";
import { useParams, useNavigate } from "react-router-dom";
import { publicAxios } from "../../../services/axios-instance";
import usePaymentSocket from "../../../services/usePaymentSocket";
import Footer from "../../../components/Footer/Footer";
import Navbar from "../../../components/NavBar/NavBar";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import PaymentQRCard from "../../../components/PaymentQRCard/PaymentQRCard";

const ScanQR = () => {
    const { idTransaction } = useParams();
    const [amount, setAmount] = useState(0);
    const [code, setCode] = useState("");
    const [txDetails, setTxDetails] = useState({ fullName: '', phone: '', email: '', code: '', amount: 0 });
    const navigate = useNavigate();

    // Countdown 10 phút = 600 giây
    const [timeLeft, setTimeLeft] = useState(600);
    const userId = localStorage.getItem("userId");
    const qrCardRef = useRef(null);

    const handleSuccess = useCallback(() => {
        qrCardRef.current?.triggerSuccess();
    }, []);
    usePaymentSocket(userId, handleSuccess);

    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchTransactionDetails = async () => {
            try {
                const res = await publicAxios.get(`/payment/get?idTransaction=${idTransaction}`);
                console.log(res.data);
                const data = res.data;
                setAmount(data?.transferAmount || 0);
                setCode(data?.code || "");
                setTxDetails({
                    fullName: data?.fullName || '',
                    phone: data?.phone || '',
                    email: data?.email || '',
                    code: data?.code || '',
                    amount: data?.transferAmount || 0
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchTransactionDetails();
    }, [idTransaction]);

    // Returns true if payment confirmed – PaymentQRCard handles popups
    const handleCheckTransaction = async () => {
        try {
            const res = await publicAxios.get(`/payment/get?idTransaction=${idTransaction}`);
            return res.data?.status === 'SUCCESS';
        } catch (err) {
            console.error(err);
            return false;
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
                <ProgressStepper
                    currentStep={2}
                    isSuccess={false}
                    steps={[
                        { id: 0, label: "Thông tin" },
                        { id: 1, label: "Xác nhận" },
                        { id: 2, label: "Thanh toán" },
                    ]}
                />
                <PaymentQRCard
                    ref={qrCardRef}
                    amount={amount}
                    code={code}
                    txDetails={txDetails}
                    timeLeft={timeLeft}
                    onCheckTransaction={handleCheckTransaction}
                    onPaymentSuccess={() => navigate('/my-courses')}
                />
                <Footer />
            </div>
        </div>
    );
};

export default ScanQR;
